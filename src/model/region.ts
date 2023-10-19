import { Country } from "./country";

export class Region {
  id: number;
  manufacturingShare: number;
  manufacturingShare0: number;
  agricultureShare: number;
  priceIndex: number;
  priceIndex0: number;
  nominalWage: number;
  nominalWage0: number;
  realWage: number;
  income: number;
  income0: number;
  deltaManufacturingShare: number;

  constructor(
    id: number,
    manufacturingShare: number,
    agricultureShare: number,
  ) {
    this.id = id;
    this.manufacturingShare = manufacturingShare;
    this.manufacturingShare0 = manufacturingShare;
    this.agricultureShare = agricultureShare;
    this.priceIndex = 1.0;
    this.priceIndex0 = 1.0;
    this.nominalWage = 1.0;
    this.nominalWage0 = 1.0;
    this.realWage = 1.0;
    this.income = 1.0;
    this.income0 = 1.0;
    this.deltaManufacturingShare = 0.0;
  }

  /* setters */
  setManufacturingShare(d: number): void {
    this.manufacturingShare = d;
  }

  setAgricultureShare(d: number): void {
    this.agricultureShare = d;
  }

  changeManufacturingShare(d: number): void {
    this.deltaManufacturingShare = d;
    this.manufacturingShare += this.deltaManufacturingShare;
  }

  backupPreviousValues(): void {
    this.income0 = this.income;
    this.nominalWage0 = this.nominalWage;
    this.priceIndex0 = this.priceIndex;
    this.manufacturingShare0 = this.manufacturingShare;
  }

  calcIncome(country: Country): void {
    this.income =
      country.pi * this.manufacturingShare * this.nominalWage +
      (1 - country.pi) * this.agricultureShare;
  }

  calcPriceIndex(country: Country): void {
    let priceIndex = 0;
    country.regions.forEach((region) => {
      priceIndex +=
        region.manufacturingShare *
        Math.pow(
          region.nominalWage0 *
            country.matrices.transportCostMatrix[this.id][region.id],
          1 - country.sigma,
        );
    });
    this.priceIndex = Math.pow(priceIndex, 1 / (1 - country.sigma));
  }

  calcRealWage(country: Country): void {
    this.realWage = this.nominalWage * Math.pow(this.priceIndex, -country.pi);
  }

  calcNominalWage(country: Country): void {
    let nominalWage = 0;
    country.regions.forEach((region) => {
      nominalWage +=
        region.income0 *
        Math.pow(
          country.matrices.transportCostMatrix[this.id][region.id],
          1 - country.sigma,
        ) *
        Math.pow(region.priceIndex0, country.sigma - 1);
    });
    this.nominalWage = Math.pow(nominalWage, 1 / country.sigma);
  }

  calcDynamics(country: Country): void {
    this.deltaManufacturingShare =
      country.gamma *
      (this.realWage - country.avgRealWage) *
      this.manufacturingShare;
  }

  applyDynamics(country: Country): void {
    if (this.manufacturingShare > 1.0 / country.regions.length / 10.0) {
      this.manufacturingShare += this.deltaManufacturingShare;
    } else {
      this.manufacturingShare = 1.0 / country.regions.length / 10.0;
    }
  }
}
