import {Country} from "./country";

export class Model {

    numCities: number;
    country: Country;

    scale: number;

    initialized: boolean = false;
    started: boolean = false;

    listeners: Array<(model: Model) => void> = new Array<(model: Model) => void>();
    timer: NodeJS.Timer | null = null;

    constructor(numCities: number, tmax: number, sigma: number, mu: number, scale: number) {
        this.numCities = numCities;
        this.scale = scale;
        this.country = this.createCountry(numCities, tmax, sigma, mu);
    }

    startTimer(): NodeJS.Timer {
        return setInterval(() => {
            this.country.procedure();
            this.update();
        }, 10);
    }

    cancelTimer(timer: NodeJS.Timer) {
        clearInterval(timer);
    }

    createCountry(numCities:number, tmax: number, sigma: number, mu: number){
        return new Country(numCities, tmax, sigma, mu);
    }

    init(tmax: number, sigma: number, mu: number) {
        this.initialized = true;
        this.country = this.createCountry(this.numCities, tmax, sigma, mu);
        this.update();
    }

    reset(tmax: number, sigma: number, mu: number) {
        this.init(tmax, sigma, mu);
        this.country.disturb();
    }

    stop() {
        this.started = false;
        if (this.initialized && this.timer) {
            this.cancelTimer(this.timer);
        }
        this.timer = null;
    }

    start(tmax: number, sigma: number, mu: number) {
        if (!this.initialized) {
            this.init(tmax, sigma, mu);
        }
        if (!this.started) {
            this.country.disturb();
            this.started = true;
            this.timer = this.startTimer();
        }
    }

    changeNCities(numCities: number, tmax: number, sigma: number, mu: number) {
        this.numCities = numCities;
        this.country = this.createCountry(this.numCities, tmax, sigma, mu);
        this.country.disturb();
    }

    changeTmax(tmax: number) {
        this.country.setTmax(tmax);
    }

    changeSigma(sigma: number) {
        this.country.setSigma(sigma);
    }

    changeMu(mu: number) {
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
