import { Country } from "./country";
import { MatrixFactories } from "./matrixFactories";
import { VisualizerType } from "./visualizerType";
import { SourceType } from "./sourceType";
import {Region} from '@/model/region'

export class Model {
  country: Country;
  timeCounter: number;
  timer: NodeJS.Timeout | null;
  barChartScale: number;
  timeSpeed: number;
  simulationStarted: boolean;
  bindings: Map<SourceType, VisualizerType | undefined>;

  matrixFactories: MatrixFactories;

  focusedRegionIndex: number;
  selectedRegionIndex: number;
  focusedRouteIndex: number[] | null;
  focusedRouteSource: string | null;

  selectedNodes: Array<Region> = [];
  //focusedNode: Region | null = null;

  countryEventListeners: Array<(model: Model) => void>;
  timeEventListeners: Array<(model: Model) => void>;

  focusRegionEventListener: (() => void)[];
  selectRegionEventListener: (() => void)[];
  focusedRouteEventListener: (() => void)[];

  transportCostUpdateEventListener: ((model: Model) => void) | undefined;
  timerCounterUpdater: (() => void) | undefined;

  constructor(
    matrixFactories: MatrixFactories,
    country: Country,
    scale: number,
    speed: number,
  ) {
    this.country = country;
    this.matrixFactories = matrixFactories;

    this.barChartScale = scale;
    this.timeSpeed = speed;

    this.timeCounter = 0;
    this.timer = null;
    this.simulationStarted = false;

    this.bindings = new Map<SourceType, VisualizerType | undefined>();

    this.focusedRegionIndex = -1;
    this.selectedRegionIndex = -1;
    this.focusedRouteIndex = null;
    this.focusedRouteSource = null;

    this.focusRegionEventListener = [];
    this.selectRegionEventListener = [];
    this.focusedRouteEventListener = [];
    this.countryEventListeners = new Array<(model: Model) => void>();
    this.timeEventListeners = new Array<(model: Model) => void>();
  }

  reset() {
    this.timeCounter = 0;
    this.selectedRegionIndex = -1;
    this.country.reset();
    this.updateTime();
  }

  stop() {
    this.simulationStarted = false;
    if (this.timer != null) {
      clearInterval(this.timer);
    }
    this.timer = null;
  }

  start() {
    const expScale = (value: number): number => {
      const minLog = Math.log(10);
      const maxLog = Math.log(3000);
      const scale = minLog + (1 - value) * (maxLog - minLog);
      // 指数関数を取得
      return Math.exp(scale);
    };

    if (!this.simulationStarted) {
      this.simulationStarted = true;
      const interval = expScale(this.timeSpeed);
      this.timer = setInterval(() => {
        this.country.procedure();
        this.timeCounter++;
        this.updateTime();
      }, interval);
    }
  }

  setScale(scale: number) {
    this.barChartScale = scale;
    this.updateTime();
  }

  setSpeed(speed: number) {
    this.timeSpeed = speed;
  }

  setNumRegions(numRegions: number) {
    this.country.updateRegions(numRegions);
  }

  setPi(mu: number) {
    this.country.setPi(mu);
  }

  setTransportCost(transportCost: number) {
    this.country.setTransportCost(transportCost);
    (async () => {
      this.country.matrices.transportCostMatrix =
        await this.matrixFactories.createTransportCostMatrix();
      this.transportCostUpdateEventListener &&
        this.transportCostUpdateEventListener(this);
    })();
  }

  setSigma(sigma: number) {
    this.country.setSigma(sigma);
  }

  setFocusedRegionIndex(index: number) {
    this.focusedRegionIndex = index;
  }

  setFocusedRouteIndex(route: number[] | null, source: string | null) {
    this.focusedRouteIndex = route;
    this.focusedRouteSource = source;
  }

  isFocusedRouteIndex(index0: number, index1: number) {
    if (this.focusedRouteIndex === null) {
      return false;
    }
    return (
      Math.min(this.focusedRouteIndex[0], this.focusedRouteIndex[1]) ===
        Math.min(index0, index1) &&
      Math.max(this.focusedRouteIndex[0], this.focusedRouteIndex[1]) ===
        Math.max(index0, index1)
    );
  }

  addNotifyFocusRegionEventListener(listener: () => void) {
    this.focusRegionEventListener.push(listener);
  }

  notifyFocusRegion(){
    this.focusRegionEventListener.forEach((listener) => {
      listener();
    });
  }

  addSelectRegionEventListener(listener: () => void) {
    this.selectRegionEventListener.push(listener);
  }

  notifySelectRegion(){
    this.selectRegionEventListener.forEach((listener) => {
      listener();
    });
  }

  addFocusRouteEventListener(listener: () => void) {
    this.focusedRouteEventListener.push(listener);
  }

  notifyFocusRoute(){
    this.focusedRouteEventListener.forEach((listener) => {
      listener();
    });
  }

  addTimeEventListener(listener: (model: Model) => void) {
    this.timeEventListeners.push(listener);
  }

  setTransportCostEventListener(listener: (model: Model) => void) {
    this.transportCostUpdateEventListener = listener;
  }

  addCountryEventListener(listener: (model: Model) => void) {
    this.countryEventListeners.push(listener);
  }

  notifyUpdateCountry() {
    this.countryEventListeners.forEach((listener) => {
      listener(this);
    });
  }

  updateTime() {
    this.timerCounterUpdater && this.timerCounterUpdater();
    this.timeEventListeners.forEach((listener) => {
      listener(this);
    });
  }

  setTimerCounterUpdater(timerCounterUpdater: () => void) {
    this.timerCounterUpdater = timerCounterUpdater;
  }
}
