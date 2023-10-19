import { Country } from "./model/country";

export class TransportCostService {
  country: Country;

  constructor(country: Country) {
    this.country = country;
  }

  updateCosts(): void {
    throw new Error("please implement this method");
  }
}
