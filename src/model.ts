import {Country} from "./country";

export class Model {

    numCities: number;
    country: Country;
    started: boolean = false;
    listeners: Array<(model: Model) => void> = new Array<(model: Model) => void>();
    timer: number = -1;

    constructor(numCities: number, tmax: number, sigma: number) {
        this.numCities = numCities;
        this.country = new Country(this.numCities);
        this.country.disturb();
        this.country.setTmax(tmax);
        this.country.setSigma(sigma);
    }

    startTimer(): number{
        return setInterval(() => {
            this.country.procedure();
            this.update();
        }, 10);
    }

    cancelTimer(timer: number){
        clearInterval(timer);
    }

    init(tmax: number, sigma: number){
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
        if(this.timer > 0){
            this.cancelTimer(this.timer);
        }
        this.timer = 0;
    }

    start(tmax: number, sigma: number) {
        if(this.timer < 0){
            this.init(tmax, sigma);
        }
        if (!this.started) {
            this.started = true;
            this.timer = this.startTimer();
        }
    }

    changeTmax(tmax: number) {
        let r = false;
        if (this.started) {
            this.started = false;
            r = true;
        }
        this.country.setTmax(tmax);
        this.country.calcDistanceMatrix();
        this.country.procedure();
        //update();
        if (r) {
            this.started = true;
        }
    }

    changeSigma(sigma: number) {
        let r = false;
        if (this.started) {
            this.started = false;
            r = true;
        }
        this.country.setSigma(sigma);
        this.country.procedure();
        //update();
        if (r) {
            this.started = true;
        }
    }

    addUpdateEventListener(listener: (model: Model) => void) {
        this.listeners.push(listener);
    }

    update() {
        this.listeners.forEach((listener) => {
            listener(this);
        });
    }
}
