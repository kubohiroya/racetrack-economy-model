import {Country} from "./country";

export class Model {

    numCities: number;
    country: Country;
    counter: number;

    scale: number;

    initialized: boolean = false;
    started: boolean = false;

    listeners: Array<(model: Model) => void> = new Array<(model: Model) => void>();
    timer: NodeJS.Timer | null = null;

    constructor(numCities: number, tmax: number, sigma: number, mu: number, scale: number) {
        this.numCities = numCities;
        this.country = this.createCountry(numCities, tmax, sigma, mu);
        this.counter = 0;
        this.scale = scale;
    }

    createCountry(numCities:number, tmax: number, sigma: number, mu: number){
        return new Country(numCities, tmax, sigma, mu);
    }

    init(tmax: number, sigma: number, mu: number) {
        this.initialized = true;
        this.country = this.createCountry(this.numCities, tmax, sigma, mu);
    }

    reset(tmax: number, sigma: number, mu: number) {
        this.init(tmax, sigma, mu);
        this.counter = 0;
        this.country.disturb();
        this.update();
    }

    stop() {
        this.started = false;
        if (this.initialized && this.timer) {
            clearInterval(this.timer);
        }
        this.timer = null;
    }

    start(tmax: number, sigma: number, mu: number) {
        if (! this.initialized) {
            this.init(tmax, sigma, mu);
        }
        if (! this.started) {
            this.started = true;
            this.timer = setInterval(() => {
                this.country.procedure();
                this.counter++;
                this.update();
            }, 10);
        }
    }

    setNumCities(numCities: number, tmax: number, sigma: number, mu: number) {
        this.numCities = numCities;
        this.country = this.createCountry(this.numCities, tmax, sigma, mu);
    }

    setTmax(tmax: number) {
        this.country.setTmax(tmax);
    }

    setSigma(sigma: number) {
        this.country.setSigma(sigma);
    }

    setMu(mu: number) {
        this.country.setMu(mu);
    }

    setScale(scale: number){
        this.scale = scale;
        this.update();
    }

    addUpdateEventListener(listener: (model: Model) => void) {
        this.listeners.push(listener);
    }

    update() {
        this.listeners.forEach(listener => {
            listener(this);
        });
    }
}
