import {City} from './city';

export class Country {

    tmax: number = 5.0;
    /* maximum value of the distance */
    mu: number = 0.4;

    gamma: number = 1.0;

    /*  mu=ratio of manuf. workers */
    sigma: number = 10;
    /* elasticity of substitution */

    /* speed of adjustment */
    distanceMatrix: Array<Array<number>>;
    /* distance between cities */

    /* ordinary methods and variables */
    cities: Array<City>;
    /* a country has her cities in this vector */
    avgRealWage: number;
    /* average real wage of the country */
    numCities: number;
    /* the number of the cities in the county */


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

    setMu(d: number): void {
        this.mu = d;
    }

    setGamma(d: number): void {
        this.gamma = d;
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

    printDM(): void {
        const n = this.distanceMatrix.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                console.log(this.distanceMatrix[i][j] + " ");
            }
            console.log();
        }
    }

    /* print tool for debug */
    static printAll(d: number[]): void {
        for (let i = 0; i < d.length; i++) {
            console.log(d[i] + " ");
        }
        console.log();
    }

    getAvgRealWage(): number {
        return this.avgRealWage;
    }

    /* set manufacturing shares equal/disturb/rescale */
    equalize(): void {
        this.cities.forEach((city, index) => {
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
        this.cities.forEach((city, index) => {
            m += city.MShare;
            a += city.AShare;
        });
        this.cities.forEach((city, index) => {
            city.MShare /= m;
            city.AShare /= a;
        });
    }

    /* simulation body */
    push(): void {
        this.cities.forEach((city, index) => {
            city.push();
        });
    }

    calcIncome(): void {
        this.cities.forEach((city, index) => {
            city.calcIncome();
        });
    }

    calcPriceIndex(): void {
        this.cities.forEach((city, index) => {
            city.calcPriceIndex();
        });
    }

    calcNominalWage(): void {
        this.cities.forEach((city, index) => {
            city.calcNominalWage();
        });
    }

    calcRealWage(): void {
        this.cities.forEach((city, index) => {
            city.calcRealWage();
        });
    }

    calcAvgRealWage(): void {
        let avgRealWage = 0;
        this.cities.forEach((city, index) => {
            avgRealWage += (city.realWage * city.MShare);
        });
        this.avgRealWage = avgRealWage;
    }

    calcDynamics(): void {
        this.cities.forEach((city, index) => {
            city.calcDynamics();
        });
    }

    applyDynamics(): void {
        this.cities.forEach((city, index) => {
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
