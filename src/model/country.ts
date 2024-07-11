import { Region } from "./region";
import { Matrices } from "./matrices";
import { Timer, TimerEvent } from "@/model/timer";
import { random } from "@/model/random";
import { URL_SEARCH_PARAMS } from "@/model/urlSearchParams";

export class Country {
  static SPEED_OF_ADJUSTMENT: number = parseFloat(
    URL_SEARCH_PARAMS.get("speed") || "0.1",
  );
  static DIFF_SCALE: number = parseFloat(
    URL_SEARCH_PARAMS.get("diffScale") || "0.05",
  );
  static DIFF_RATIO: number = parseFloat(
    URL_SEARCH_PARAMS.get("diffRatio") || "0.1",
  );
  static SIGMA_BASE: number = parseFloat(
    URL_SEARCH_PARAMS.get("sigmaBase") || "0.1",
  );

  /* a country has her regions in this Array */
  numRegions: number;
  regions: Array<Region>;
  matrices: Matrices;

  /*  ratio of workers */
  pi: number;

  /* maximum transport cost between each pair of regions */
  transportCost: number;

  /* elasticity of substitution */
  sigma: number;

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
    this.regions = [];
    this.matrices = new Matrices(numRegions);

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
    this.sigma = sigma + Country.SIGMA_BASE;
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
    if (this.numRegions > 0) {
      const d = (1.0 / this.numRegions) * Country.DIFF_SCALE;
      for (let i = 0; i < this.numRegions * Country.DIFF_RATIO; i++) {
        const target = this.regions[Math.floor(random() * this.numRegions)];
        if (target) {
          target.manufacturingShare += d;
        }
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

  updateIncome(): void {
    this.regions.forEach((region) => {
      region.updateIncome(this.pi);
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

  calculateAverageRealWage(): number {
    return this.regions.reduce((acc, region) => {
      return acc + region.realWage * region.manufacturingShare;
    }, 0);
  }

  updateDynamics(): void {
    const averageRealWage = this.calculateAverageRealWage();
    this.regions.forEach((region) => {
      region.updateDynamics(
        Country.SPEED_OF_ADJUSTMENT,
        averageRealWage,
        this.numRegions,
      );
    });
    this.rescale();
  }

  tick(): void {
    this.updateIncome();
    this.updatePriceIndex();
    this.updateNominalWage();
    this.updateRealWage();
    this.updateDynamics();
  }
}
