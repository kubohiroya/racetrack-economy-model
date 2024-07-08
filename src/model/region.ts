import { Matrices } from "@/model/matrices";

export class Region {
  id: number;
  manufacturingShare: number;
  deltaManufacturingShare: number = 0.0;
  agricultureShare: number;

  realWage: number = 1.0;

  priceIndex: number = 1.0;
  nominalWage: number = 1.0;
  income: number = 1.0;

  private _priceIndex: number = 1.0;
  private _nominalWage: number = 1.0;
  private _income: number = 1.0;

  constructor(
    id: number,
    manufacturingShare: number,
    agricultureShare: number,
  ) {
    this.id = id;
    this.manufacturingShare = manufacturingShare;
    this.agricultureShare = agricultureShare;
  }

  reset() {
    this.deltaManufacturingShare = 0.0;
    this.priceIndex = 1.0;
    this.nominalWage = 1.0;
    this.realWage = 1.0;
    this.income = 1.0;
    this._priceIndex = 1.0;
    this._nominalWage = 1.0;
    this._income = 1.0;
  }

  /* setters */
  setManufacturingShare(value: number): void {
    this.manufacturingShare = value;
  }

  setAgricultureShare(value: number): void {
    this.agricultureShare = value;
  }

  backupPreviousValues(): void {
    this._nominalWage = this.nominalWage;
    this._priceIndex = this.priceIndex;
    this._income = this.income;
  }

  updateIncomeWithPi(pi: number): void {
    this.income =
      pi * this.manufacturingShare * this.nominalWage +
      (1 - pi) * this.agricultureShare;
  }

  updatePriceIndex(
    regions: Array<Region>,
    matrices: Matrices,
    sigma: number,
  ): void {
    const priceIndex = regions.reduce((acc, region) => {
      if (matrices.transportCostMatrix[this.id]) {
        return (
          acc +
          region.manufacturingShare *
            Math.pow(
              region._nominalWage *
                matrices.transportCostMatrix[this.id][region.id],
              1 - sigma,
            )
        );
      } else {
        return acc;
      }
    }, 0);
    this.priceIndex = Math.pow(priceIndex, 1 / (1 - sigma));
  }

  updateRealWage(pi: number): void {
    this.realWage = this.nominalWage * Math.pow(this.priceIndex, -1 * pi);
  }

  updateNominalWage(
    regions: Array<Region>,
    matrices: Matrices,
    sigma: number,
  ): void {
    const nominalWage = regions.reduce((acc, region) => {
      if (matrices.transportCostMatrix[this.id]) {
        return (
          acc +
          region._income *
            Math.pow(
              matrices.transportCostMatrix[this.id][region.id],
              1 - sigma,
            ) *
            Math.pow(region._priceIndex, sigma - 1)
        );
      } else {
        return acc;
      }
    }, 0);
    this.nominalWage = Math.pow(nominalWage, 1 / sigma);
  }

  updateDynamics(gamma: number, averageRealWage: number): void {
    this.deltaManufacturingShare =
      gamma * (this.realWage - averageRealWage) * this.manufacturingShare;
  }

  applyDynamics(regions: Array<Region>): void {
    if (this.manufacturingShare > 1.0 / regions.length / 10.0) {
      this.manufacturingShare += this.deltaManufacturingShare;
    } else {
      this.manufacturingShare = 1.0 / regions.length / 10.0;
    }
  }
}
