import { Country } from "./country";

export enum VisualizerType {
  radius,
  color,
  grayOuterCircle,
  redOuterCircle,
}
export enum SourceType {
  mshare,
  priceIndex,
  nominalWage,
  realWage,
}

export class Model {
  numCities: number;
  country: Country;
  counter: number;

  scale: number;
  speed: number;
  started: boolean = false;

  selectedCityIndex: number;

  listeners: Array<(model: Model) => void> = new Array<
    (model: Model) => void
  >();
  timer: NodeJS.Timeout | null = null;

  bindings: Map<SourceType, VisualizerType|undefined> = new Map()

  constructor(
    numCities: number,
    scale: number,
    pi: number,
    tcost: number,
    sigma: number,
    speed: number,
    gamma: number,
  ) {
    this.numCities = numCities;
    this.country = this.createCountry(numCities, pi, tcost, sigma, gamma);
    this.scale = scale;
    this.speed= speed;
    this.selectedCityIndex = -1;
    this.counter = 0;
    this.bindings.set(SourceType.mshare, VisualizerType.radius);
    this.bindings.set(SourceType.priceIndex, VisualizerType.color);
    this.bindings.set(SourceType.nominalWage, VisualizerType.grayOuterCircle);
    this.bindings.set(SourceType.realWage, VisualizerType.redOuterCircle);
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
    this.selectedCityIndex = -1;
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
      const interval = this.expScale(this.speed);
      this.timer = setInterval(() => {
        this.country.procedure();
        this.counter++;
        this.update();
      }, interval);
    }
  }

  expScale(value: number): number {
    const minLog = Math.log(10);
    const maxLog = Math.log(3000);

    const p = 10000;
    const powValue = Math.pow(value, p);
    const scale = minLog + (1-value) * (maxLog - minLog);

    // 指数関数を取得
    const expValue = Math.exp(scale);

    return expValue;
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

  setSpeed(speed: number) {
    this.speed = speed;
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

  setSelectedCityIndex(index: number){
    this.selectedCityIndex = index;
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
