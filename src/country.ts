import {City} from './city';

export class Country {

    /* maximum value of the distance */
    tmax: number = 5.0;

    /*  ratio of workers */
    mu: number = 0.4;

    gamma: number = 1.0;

    /* elasticity of substitution */
    sigma: number = 10;

    /* distance between cities */
    distanceMatrix: Array<Array<number>>;

    /* ordinary methods and variables */
    /* a country has her cities in this vector */
    cities: Array<City>;

    /* average real wage of the country */
    avgRealWage: number;

    /* the number of the cities in the county */
    numCities: number;

    /* speed of adjustment */

    constructor(numCities: number) {
        this.avgRealWage = 1.0;
        this.cities = new Array<City>();
        this.numCities = numCities;
        this.distanceMatrix = new Array<Array<number>>(numCities);
        for (let i = 0; i < this.numCities; i++) {
            // @ts-ignore
            this.distanceMatrix[i] = new Array<number>(numCities).fill(0);
            this.cities.push(new City(this, i, 0.0, 0.0));
        }
        this.equalize();
    }

    /* setters of global params */

    setSigma(d: number): void {
        this.sigma = d + 0.1;
    }

    setTmax(d: number): void {
        this.tmax = d;
    }

    /* calc and print distance matrix */
    calcDistanceMatrix(): void {
        const n = this.numCities;
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                const dist = (i == j)? 0 : 2.0 * Math.min(j - i, i + n - j) / n;
                this.distanceMatrix[j][i] = this.distanceMatrix[i][j] = Math.exp(Math.log(this.tmax) * dist);
            }
        }
    }

    /* set manufacturing shares equal/disturb/rescale */
    equalize(): void {
        this.cities.forEach((city) => {
            city.setMShare(1.0 / this.numCities);
            city.setAShare(1.0 / this.numCities);
        });
    }

    disturb(): void {
        let dd = 1.0 / this.numCities * 0.05;
        for (let i = 0; i < this.numCities; i++) {
            this.cities[Math.floor(Math.random() * this.numCities)].changeMShare(dd);
        }
        this.rescale();
    }

    rescale(): void {
        let m = 0, a = 0;
        this.cities.forEach((city) => {
            m += city.MShare;
            a += city.AShare;
        });
        this.cities.forEach((city) => {
            city.MShare /= m;
            city.AShare /= a;
        });
    }

    /* simulation body */
    push(): void {
        this.cities.forEach((city) => {
            city.push();
        });
    }

    calcIncome(): void {
        this.cities.forEach((city) => {
            city.calcIncome();
        });
    }

    calcPriceIndex(): void {
        this.cities.forEach((city) => {
            city.calcPriceIndex();
        });
    }

    calcNominalWage(): void {
        this.cities.forEach((city) => {
            city.calcNominalWage();
        });
    }

    calcRealWage(): void {
        this.cities.forEach((city) => {
            city.calcRealWage();
        });
    }

    calcAvgRealWage(): void {
        let avgRealWage = 0;
        this.cities.forEach((city) => {
            avgRealWage += (city.realWage * city.MShare);
        });
        this.avgRealWage = avgRealWage;
    }

    calcDynamics(): void {
        this.cities.forEach((city) => {
            city.calcDynamics();
        });
    }

    applyDynamics(): void {
        this.cities.forEach((city) => {
            city.applyDynamics();
        });
        this.rescale();
    }

    procedure(): void {
        /* simulation procedure */
        this.push();
        this.calcIncome();
        this.calcPriceIndex();
        this.calcNominalWage();
        this.calcRealWage();
        this.calcAvgRealWage();
        this.calcDynamics();
        this.applyDynamics();
    }

}
