import {City} from './city';

export class Country {

    /*  ratio of workers */
    pi: number;

    /* average real wage of the country */
    avgRealWage: number;

    /* maximum value of the distance */
    tcost: number;

    /* elasticity of substitution */
    sigma: number;

    /* distance between cities */
    distanceMatrix: Array<Array<number>>;

    /* a country has her cities in this vector */
    cities: Array<City>;

    /* speed of adjustment */
    gamma: number = 1.0;

    constructor(numCities: number, pi: number, tcost: number, sigma: number) {
        this.pi = pi;
        this.tcost = tcost;
        this.sigma = sigma;
        this.avgRealWage = 1.0;
        this.cities = new Array<City>(numCities);
        this.distanceMatrix = new Array<Array<number>>(numCities);
        for (let i = 0; i < numCities; i++) {
            this.distanceMatrix[i] = new Array<number>(numCities).fill(0);
            this.cities[i] = new City(i, 0.0, 0.0);
        }
        this.equalize();
        this.calcDistanceMatrix();
    }

    reset(){
        const numCities = this.cities.length;
        for (let i = 0; i < numCities; i++) {
            this.distanceMatrix[i] = new Array<number>(numCities).fill(0);
            this.cities[i] = new City(i, 0.0, 0.0);
        }
        this.equalize();
        this.calcDistanceMatrix();
        this.disturb();
    }

    /* setters of global params */

    setSigma(d: number): void {
        this.sigma = d; //  + 0.1
    }

    setTcost(d: number): void {
        this.tcost = d;
    }

    setPi(mu: number): void {
        this.pi = mu;
    }

    /* calc and print distance matrix */
    calcDistanceMatrix(): void {
        const numCities = this.cities.length;
        for (let i = 0; i < numCities; i++) {
            for (let j = i; j < numCities; j++) {
                const dist = (i == j) ? 0 : 2.0 * Math.min(j - i, i + numCities - j) / numCities;
                this.distanceMatrix[j][i] = this.distanceMatrix[i][j] = Math.exp(Math.log(this.tcost) * dist);
            }
        }
    }

    /* set manufacturing shares equal/disturb/rescale */
    equalize(): void {
        const numCities = this.cities.length;
        this.cities.forEach((city) => {
            city.setMShare(1.0 / numCities);
            city.setAShare(1.0 / numCities);
        });
    }

    disturb(): void {
        const numCities = this.cities.length;
        const dd = 1.0 / numCities * 0.05;
        for (let i = 0; i < numCities; i++) {
            const index = Math.floor(Math.random() * numCities);
            this.cities[index].changeMShare(dd);
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
            city.setMShare(city.MShare / m);
            city.setAShare(city.AShare / a);
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
            city.calcIncome(this);
        });
    }

    calcPriceIndex(): void {
        this.cities.forEach((city) => {
            city.calcPriceIndex(this);
        });
    }

    calcNominalWage(): void {
        this.cities.forEach((city) => {
            city.calcNominalWage(this);
        });
    }

    calcRealWage(): void {
        this.cities.forEach((city) => {
            city.calcRealWage(this);
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
            city.calcDynamics(this);
        });
    }

    applyDynamics(): void {
        this.cities.forEach((city) => {
            city.applyDynamics(this);
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
