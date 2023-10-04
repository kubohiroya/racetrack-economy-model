import { Country } from "./country";

export class Model {
  numCities: number;
  country: Country;
  counter: number;

  scale: number;

  started: boolean = false;

  listeners: Array<(model: Model) => void> = new Array<
    (model: Model) => void
  >();
  timer: NodeJS.Timeout | null = null;

  constructor(
    numCities: number,
    scale: number,
    pi: number,
    tcost: number,
    sigma: number,
    gamma: number,
  ) {
    this.numCities = numCities;
    this.country = this.createCountry(numCities, pi, tcost, sigma, gamma);
    this.scale = scale;
    this.counter = 0;
  }

  createCountry(
    numCities: number,
    pi: number,
    tcost: number,
    sigma: number,
    gamma: number,
  ) {
    return new Country(numCities, pi, tcost, sigma, gamma);
  }

  reset() {
    this.counter = 0;
    this.country.reset();
    this.update();
  }

  stop() {
    this.started = false;
    if (this.timer != null) {
      clearInterval(this.timer);
    }
    this.timer = null;
  }

  start() {
    if (!this.started) {
      this.started = true;
      this.timer = setInterval(() => {
        this.country.procedure();
        this.counter++;
        this.update();
      }, 10);
    }
  }

  calcDistanceMatrix() {
    this.country.calcDistanceMatrix();
  }

  setNumCities(
    numCities: number,
    pi: number,
    tcost: number,
    sigma: number,
    gamma: number,
  ) {
    this.numCities = numCities;
    this.country = this.createCountry(this.numCities, pi, tcost, sigma, gamma);
  }

  setScale(scale: number) {
    this.scale = scale;
    this.update();
  }

  setPi(mu: number) {
    this.country.setPi(mu);
  }

  setTcost(tcost: number) {
    this.country.setTcost(tcost);
  }

  setSigma(sigma: number) {
    this.country.setSigma(sigma);
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
