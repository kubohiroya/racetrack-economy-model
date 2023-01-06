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
    setMu(d: number): void {
        this.mu = d;
    }

    setSigma(d: number): void {
        this.sigma = d + 0.1;
    }

    setTmax(d: number): void {
        this.tmax = d;
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
                this.distanceMatrix[i][j] = Math.exp(Math.log(this.tmax) * dist);
                this.distanceMatrix[j][i] = this.distanceMatrix[i][j];
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

    getMShare(): number[] {
        const d = new Array<number>(this.numCities);
        for (let i = 0; i < this.numCities; i++) {
            d[i] = this.cities[i].MShare;
        }
        return d;
    }

    getDelta(): number[] {
        const d = new Array<number>(this.numCities);
        for (let i = 0; i < this.numCities; i++) {
            d[i] = this.cities[i].dMShare;
        }
        return d;
    }

    /* set manufacturing shares equal/disturb/rescale */
    equalize(): void {
        for (let i = 0; i < this.numCities; i++) {
            this.cities[i].setMShare(1.0 / this.numCities);
            this.cities[i].setAShare(1.0 / this.numCities);
        }
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
        for (let i = 0; i < this.numCities; i++) {
            m += this.cities[i].MShare;
            a += this.cities[i].AShare;
        }
        for (let i = 0; i < this.numCities; i++) {
            this.cities[i].MShare /= m;
            this.cities[i].AShare /= a;
        }
    }

    /* simulation body */
    push(): void {
        for (let i = 0; i < this.numCities; i++) {
            this.cities[i].push();
        }
    }

    calcIncome(): void {
        for (let i = 0; i < this.numCities; i++) {
            this.cities[i].calcIncome();
        }
    }

    calcPriceIndex(): void {
        for (let i = 0; i < this.numCities; i++) {
            this.cities[i].calcPriceIndex();
        }
    }

    calcNominalWage(): void {
        for (let i = 0; i < this.numCities; i++) {
            this.cities[i].calcNominalWage();
        }
    }

    calcRealWage(): void {
        for (let i = 0; i < this.numCities; i++) {
            this.cities[i].calcRealWage();
        }
    }

    calcAvgRealWage(): void {
        let avgRealWage = 0;
        for (let i = 0; i < this.numCities; i++) {
            avgRealWage += (this.cities[i].realWage * this.cities[i].MShare);
        }
        this.avgRealWage = avgRealWage;
    }

    calcDynamics(): void {
        for (let i = 0; i < this.numCities; i++) {
            this.cities[i].calcDynamics();
        }
    }

    applyDynamics(): void {
        for (let i = 0; i < this.numCities; i++) {
            this.cities[i].applyDynamics();
        }
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
