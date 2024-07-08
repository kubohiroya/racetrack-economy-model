import { Region } from "./region";
import { Matrices } from "./matrices";
import { Timer, TimerEvent } from "@/model/timer";
import { random } from "@/model/random";

export class Country {
  /* a country has her regions in this Array */
  regions: Array<Region>;
  matrices: Matrices;

  numRegions: number;

  /*  ratio of workers */
  pi: number;

  /* maximum transport cost between ach pair of regions */
  transportCost: number;

  /* elasticity of substitution */
  sigma: number;

  /* speed of adjustment */
  gamma: number;

  /* average real wage of the country */
  averageRealWage: number;

  constructor(
    numRegions: number,
    pi: number,
    transportCost: number,
    sigma: number,
  ) {
    this.numRegions = numRegions;
    this.pi = pi;
    this.transportCost = transportCost;
    this.sigma = sigma;
    this.gamma = 1.0;
    this.averageRealWage = 1.0;
    this.regions = [];
    this.matrices = new Matrices(0);

    Timer.getSimulationTimer().addTimeEventListener((event: TimerEvent) => {
      switch (event.type) {
        case "tick":
          this.tick();
          break;
        case "start":
          break;
        case "stop":
          break;
        case "reset":
          this.resetRegions();
          break;
      }
    });
  }

  setNumRegions(numRegions: number) {
    this.numRegions = numRegions;
  }

  setSigma(sigma: number): void {
    this.sigma = sigma + 0.1;
  }

  setTransportCost(transportCost: number): void {
    this.transportCost = transportCost;
  }

  setPi(pi: number): void {
    this.pi = pi;
  }

  resetRegions() {
    this.regions.forEach((region) => {
      region.manufacturingShare = 1 / this.regions.length;
      region.agricultureShare = 1 / this.regions.length;
      region.reset();
    });
    this.disturb();
  }

  disturb(): void {
    const numRegions = this.regions.length;
    if (numRegions > 0) {
      const dd = (1.0 / numRegions) * 0.05;
      for (let i = 0; i < numRegions; i++) {
        const target = this.regions[Math.floor(random() * numRegions)];
        target.deltaManufacturingShare = dd;
        target.manufacturingShare += target.deltaManufacturingShare;
      }
    }
    this.rescale();
  }

  rescale(): void {
    const manufacturingShareTotal = this.regions.reduce((acc, region) => {
      return acc + region.manufacturingShare;
    }, 0);
    const agricultureShareTotal = this.regions.reduce((acc, region) => {
      return acc + region.agricultureShare;
    }, 0);
    this.regions.forEach((region) => {
      region.setManufacturingShare(
        region.manufacturingShare / manufacturingShareTotal,
      );
      region.setAgricultureShare(
        region.agricultureShare / agricultureShareTotal,
      );
    });
  }

  /* simulation body */
  backupPreviousValues(): void {
    this.regions.forEach((region) => {
      region.backupPreviousValues();
    });
  }

  updateIncome(): void {
    this.regions.forEach((region) => {
      region.updateIncomeWithPi(this.pi);
    });
  }

  updatePriceIndex(): void {
    this.regions.forEach((region) => {
      region.updatePriceIndex(this.regions, this.matrices, this.sigma);
    });
  }

  updateNominalWage(): void {
    this.regions.forEach((region) => {
      region.updateNominalWage(this.regions, this.matrices, this.sigma);
    });
  }

  updateRealWage(): void {
    this.regions.forEach((region) => {
      region.updateRealWage(this.pi);
    });
  }

  updateAverageRealWage(): void {
    this.averageRealWage = this.regions.reduce((acc, region) => {
      return acc + region.realWage * region.manufacturingShare;
    }, 0);
  }

  updateDynamics(): void {
    this.regions.forEach((region) => {
      region.updateDynamics(this.gamma, this.averageRealWage);
    });
  }

  applyDynamics(): void {
    this.regions.forEach((region) => {
      region.applyDynamics(this.regions);
    });
    this.rescale();
  }

  tick(): void {
    this.backupPreviousValues();
    this.updateIncome();
    this.updatePriceIndex();
    this.updateNominalWage();
    this.updateRealWage();
    this.updateAverageRealWage();
    this.updateDynamics();
    this.applyDynamics();
  }
}
