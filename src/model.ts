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

    startTimer(){
        this.timer = setInterval(() => {
            this.country.procedure();
            this.update();
        }, 10);
    }

    cancelTimer(){
        if(this.timer > 0){
            clearInterval(this.timer);
        }
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
        this.cancelTimer();
        this.timer = 0;
    }

    start(tmax: number, sigma: number) {
        if(this.timer < 0){
            this.init(tmax, sigma);
        }
        if (!this.started) {
            this.started = true;
            this.startTimer();
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
        this.listeners.forEach(function (listener) {
            listener(this);
        });
    }
}
