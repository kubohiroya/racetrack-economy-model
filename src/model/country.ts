import { Region } from "./region";
import { Matrices } from "./matrices";
import { Timer, TimerEvent } from "@/model/timer";
import { random } from "@/model/random";

export class Country {
  /* a country has her regions in this vector */
  regions: Array<Region>;
  matrices: Matrices;

  numRegions: number;

  /*  ratio of workers */
  pi: number;

  /* maximum transport cost between ach pair of cities */
  transportCost: number;

  /* elasticity of substitution */
  sigma: number;

  /* speed of adjustment */
  gamma: number;

  /* average real wage of the country */
  avgRealWage: number;

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
    this.avgRealWage = 1.0;
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

  setSigma(d: number): void {
    this.sigma = d + 0.1;
  }

  setTransportCost(d: number): void {
    this.transportCost = d;
  }

  setPi(mu: number): void {
    this.pi = mu;
  }

  resetRegions() {
    for (let region of this.regions) {
      region.manufacturingShare = 1 / this.regions.length;
      region.agricultureShare = 1 / this.regions.length;
      region.reset();
    }
    this.disturb();
  }

  disturb(): void {
    const numCities = this.regions.length;
    if (numCities > 0) {
      const dd = (1.0 / numCities) * 0.05;
      for (let i = 0; i < numCities; i++) {
        const index = Math.floor(random() * numCities);
        //const to = Math.floor(random() * numCities);
        this.regions[index].changeManufacturingShare(dd);
        //this.regions[to].changeManufacturingShare(-1 * dd);
      }
    }
    this.rescale();
  }

  rescale(): void {
    let m = 0,
      a = 0;
    this.regions.forEach((region) => {
      m += region.manufacturingShare;
      a += region.agricultureShare;
    });
    this.regions.forEach((region) => {
      region.setManufacturingShare(region.manufacturingShare / m);
      region.setAgricultureShare(region.agricultureShare / a);
    });
  }

  /* simulation body */
  backupPreviousValues(): void {
    this.regions.forEach((region) => {
      region.backupPreviousValues();
    });
  }

  calcIncome(): void {
    this.regions.forEach((region) => {
      region.calcIncome(this);
    });
  }

  calcPriceIndex(): void {
    this.regions.forEach((region) => {
      region.calcPriceIndex(this);
    });
  }

  calcNominalWage(): void {
    this.regions.forEach((region) => {
      region.calcNominalWage(this);
    });
  }

  calcRealWage(): void {
    this.regions.forEach((region) => {
      region.calcRealWage(this);
    });
  }

  calcAvgRealWage(): void {
    let avgRealWage = 0;
    this.regions.forEach((region) => {
      avgRealWage += region.realWage * region.manufacturingShare;
    });
    this.avgRealWage = avgRealWage;
  }

  calcDynamics(): void {
    this.regions.forEach((region) => {
      region.calcDynamics(this);
    });
  }

  applyDynamics(): void {
    this.regions.forEach((region) => {
      region.applyDynamics(this);
    });
    this.rescale();
  }

  tick(): void {
    /* simulation procedure */
    this.backupPreviousValues();
    this.calcIncome();
    this.calcPriceIndex();
    this.calcNominalWage();
    this.calcRealWage();
    this.calcAvgRealWage();
    this.calcDynamics();
    this.applyDynamics();
  }
}
