import {Country} from "./country";

export class Model {

    numCities: number;
    country: Country;

    initialized: boolean = false;
    started: boolean = false;

    listeners: Array<(model: Model) => void> = new Array<(model: Model) => void>();
    timer: NodeJS.Timer | null = null;

    constructor(numCities: number, tmax: number, sigma: number) {
        this.numCities = numCities;
        this.country = new Country(this.numCities);
        this.country.disturb();
        this.country.setTmax(tmax);
        this.country.setSigma(sigma);
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

    init(tmax: number, sigma: number) {
        this.initialized = true;
        this.country = new Country(this.numCities);
        this.country.disturb();
        this.country.setTmax(tmax);
        this.country.setSigma(sigma);
        this.country.calcDistanceMatrix();
        this.country.procedure();
        this.update();
    }

    reset(tmax: number, sigma: number) {
        this.init(tmax, sigma);
    }

    stop() {
        this.started = false;
        if (this.initialized && this.timer) {
            this.cancelTimer(this.timer);
        }
        this.timer = null;
    }

    start(tmax: number, sigma: number) {
        if (!this.initialized) {
            this.init(tmax, sigma);
        }
        if (!this.started) {
            this.started = true;
            this.timer = this.startTimer();
        }
    }

    changeTmax(tmax: number) {
        this.country.setTmax(tmax);
        this.country.calcDistanceMatrix();
        this.country.procedure();
    }

    changeSigma(sigma: number) {
        this.country.setSigma(sigma);
        this.country.procedure();
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
