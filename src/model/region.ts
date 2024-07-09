import { Matrices } from "@/model/matrices";

export class Region {
  static MINIMUM_MANUFACTURING_SHARE_NUMERATOR: number = 0.1;

  id: number;
  agricultureShare: number;
  manufacturingShare: number;

  income: number = 0;
  priceIndex: number = 1.0;
  realWage: number = 1.0;
  nominalWage: number = 1.0;

  constructor(
    id: number,
    manufacturingShare: number,
    agricultureShare: number,
  ) {
    this.id = id;
    this.manufacturingShare = manufacturingShare;
    this.agricultureShare = agricultureShare;
    this.reset();
  }

  reset() {
    this.income = 0;
    this.priceIndex = 1.0;
    this.realWage = 1.0;
    this.nominalWage = 1.0;
  }

  setManufacturingShare(value: number): void {
    this.manufacturingShare = value;
  }

  setAgricultureShare(value: number): void {
    this.agricultureShare = value;
  }

  updateIncome(pi: number): void {
    this.income =
      pi * this.manufacturingShare * this.nominalWage +
      (1 - pi) * this.agricultureShare;
  }

  updatePriceIndex(
    regions: Array<Region>,
    matrices: Matrices,
    sigma: number,
  ): void {
    const priceIndexBase = regions.reduce((acc, region) => {
      if (!matrices.transportCostMatrix[this.id]) {
        return acc;
      }
      return (
        acc +
        region.manufacturingShare *
          Math.pow(
            region.nominalWage *
              matrices.transportCostMatrix[this.id][region.id],
            1 - sigma,
          )
      );
    }, 0);
    this.priceIndex = Math.pow(priceIndexBase, 1 / (1 - sigma));
  }

  updateNominalWage(
    regions: Array<Region>,
    matrices: Matrices,
    sigma: number,
  ): void {
    const nominalWageBase = regions.reduce((acc, region) => {
      if (!matrices.transportCostMatrix[this.id]) {
        return acc;
      }
      return (
        acc +
        region.income *
          Math.pow(
            matrices.transportCostMatrix[this.id][region.id],
            1 - sigma,
          ) *
          Math.pow(region.priceIndex, sigma - 1)
      );
    }, 0);
    this.nominalWage = Math.pow(nominalWageBase, 1 / sigma);
  }

  updateRealWage(pi: number): void {
    this.realWage = this.nominalWage * Math.pow(this.priceIndex, -1 * pi);
  }

  updateDynamics(
    gamma: number,
    averageRealWage: number,
    numRegions: number,
  ): void {
    const newManufacturingShare =
      this.manufacturingShare +
      gamma * (this.realWage - averageRealWage) * this.manufacturingShare;
    const minimumShare =
      Region.MINIMUM_MANUFACTURING_SHARE_NUMERATOR / numRegions;
    this.manufacturingShare = Math.max(newManufacturingShare, minimumShare);
  }
}
