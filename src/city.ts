import { Country } from "./country";

export class City {
  realWage: number;
  priceIndex: number;
  priceIndex0: number;
  income: number;
  income0: number;
  AShare: number;
  MShare: number;
  MShare0: number;
  nominalWage: number;
  nominalWage0: number;
  dMShare: number;
  id: number;

  constructor(i: number, ms: number, as: number) {
    this.id = i;
    this.MShare = ms;
    this.MShare0 = ms;
    this.dMShare = 0.0;
    this.AShare = as;
    this.priceIndex = 1.0;
    this.priceIndex0 = 1.0;
    this.income = 1.0;
    this.income0 = 1.0;
    this.nominalWage = 1.0;
    this.nominalWage0 = 1.0;
    this.realWage = 1.0;
  }

  /* setters */
  setMShare(d: number): void {
    this.MShare = d;
  }

  setAShare(d: number): void {
    this.AShare = d;
  }

  changeMShare(d: number): void {
    this.dMShare = d;
    this.MShare += this.dMShare;
  }

  push(): void {
    this.income0 = this.income;
    this.nominalWage0 = this.nominalWage;
    this.priceIndex0 = this.priceIndex;
    this.MShare0 = this.MShare;
  }

  calcIncome(country: Country): void {
    this.income =
      country.pi * this.MShare * this.nominalWage +
      (1 - country.pi) * this.AShare;
  }

  calcPriceIndex(country: Country): void {
    let priceIndex = 0;
    country.cities.forEach((city) => {
      priceIndex +=
        city.MShare *
        Math.pow(
          city.nominalWage0 * country.tConstMatrix[this.id][city.id],
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
    country.cities.forEach((city) => {
      nominalWage +=
        city.income0 *
        Math.pow(country.tConstMatrix[this.id][city.id], 1 - country.sigma) *
        Math.pow(city.priceIndex0, country.sigma - 1);
    });
    this.nominalWage = Math.pow(nominalWage, 1 / country.sigma);
  }

  calcDynamics(country: Country): void {
    this.dMShare =
      country.gamma * (this.realWage - country.avgRealWage) * this.MShare;
  }

  applyDynamics(country: Country): void {
    if (this.MShare > 1.0 / country.cities.length / 10.0) {
      this.MShare += this.dMShare;
    } else {
      this.MShare = 1.0 / country.cities.length / 10.0;
    }
  }
}
