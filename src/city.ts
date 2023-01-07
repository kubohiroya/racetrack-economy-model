import {Country} from './country';

export class City {

    country: Country;
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

    constructor(c: Country, i: number, ms: number, as: number) {
        this.country = c;
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

    calcIncome(): void {
        this.income = this.country.mu * this.MShare * this.nominalWage + (1 - this.country.mu) * this.AShare;
    }

    calcPriceIndex(): void {
        let priceIndex = 0;
        this.country.cities.forEach(city => {
            priceIndex += city.MShare * Math.pow((city.nominalWage0 * this.country.distanceMatrix[this.id][city.id]), 1 - this.country.sigma);
        });
        this.priceIndex = Math.pow(priceIndex, (1 / (1 - this.country.sigma)));
    }

    calcRealWage(): void {
        this.realWage = this.nominalWage * Math.pow(this.priceIndex, - this.country.mu);
    }

    calcNominalWage(): void {
        let nominalWage = 0;
        this.country.cities.forEach(city => {
            nominalWage += city.income0 * Math.pow(this.country.distanceMatrix[this.id][city.id], 1 - this.country.sigma) * Math.pow(city.priceIndex0, this.country.sigma - 1);
        });
        this.nominalWage = Math.pow(nominalWage, (1 / this.country.sigma));
    }

    calcDynamics(): void {
        this.dMShare = this.country.gamma * (this.realWage - this.country.avgRealWage) * this.MShare;
    }

    applyDynamics(): void {
        if (this.MShare > 1.0 / this.country.cities.length / 10.0) {
            this.MShare += this.dMShare;
        } else {
            this.MShare = 1.0 / this.country.cities.length / 10.0;
        }
    }
}
