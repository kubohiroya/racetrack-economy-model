import { Region } from "./region";
import { Matrices } from "./matrices";

export class Country {
  width: number;
  height: number;

  /* a country has her regions in this vector */
  regions: Array<Region>;
  matrices: Matrices;

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
    width: number,
    height: number,
    pi: number,
    transportCost: number,
    sigma: number,
  ) {
    this.width = width;
    this.height = height;
    this.pi = pi;
    this.transportCost = transportCost;
    this.sigma = sigma;
    this.gamma = 1.0;
    this.avgRealWage = 1.0;
    this.regions = this.createRegions(0);
    this.matrices = new Matrices(0);
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

  reset() {
    this.regions = this.createRegions(this.regions.length);
    this.disturb();
  }

  disturb(): void {
    const numCities = this.regions.length;
    const dd = (1.0 / numCities) * 0.05;
    for (let i = 0; i < numCities; i++) {
      const index = Math.floor(Math.random() * numCities);
      this.regions[index].changeManufacturingShare(dd);
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

  procedure(): void {
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

  createRegion(
    id: number,
    manufacturingShare: number,
    agricultureShare: number,
  ): Region {
    return new Region(id, manufacturingShare, agricultureShare);
  }

  createRegions(numRegions: number) {
    const regions = new Array<Region>(numRegions);
    for (let i = 0; i < numRegions; i++) {
      regions[i] = this.createRegion(i, 1.0 / numRegions, 1.0 / numRegions);
    }
    return regions;
  }

  /*
  updateNumRegions(numRegions: number){
    this.regions = this.createRegions(numRegions);
    this.matrices = new Matrices(numRegions);
    this.disturb();
  }
   */

  updateRegions(numRegions: number) {
    if (this.regions.length < numRegions) {
      for (const region of this.regions) {
        region.manufacturingShare = 1.0 / numRegions;
        region.agricultureShare = 1.0 / numRegions;
      }
      while (this.regions.length < numRegions) {
        this.addNode(
          this.createRegion(
            this.regions.length,
            1.0 / numRegions,
            1.0 / numRegions,
          ),
        );
      }
    } else if (numRegions < this.regions.length) {
      this.regions = this.regions.slice(0, numRegions - 1);
    }
    this.disturb();
  }

  addNode(region: Region) {
    this.regions.push(region);
  }

  removeNode(id: number) {
    const removingGeoRegion = this.regions.find((region) => region.id == id);
    if (!removingGeoRegion) {
      return;
    }
    this.regions = this.regions
      .map((geoRegion, index) => {
        if (index < removingGeoRegion.id) {
          return geoRegion;
        } else if (index == removingGeoRegion.id) {
          return null;
        } else {
          geoRegion.id = geoRegion.id - 1;
          return geoRegion;
        }
      })
      .filter((region) => region != null) as Region[];

    for (const region of this.regions) {
      region.manufacturingShare = 1.0 / this.regions.length;
      region.agricultureShare = 1.0 / this.regions.length;
    }
  }
}
