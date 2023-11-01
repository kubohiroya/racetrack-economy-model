import { Country } from "./country";
import { VisualizerType } from "./visualizerType";
import { SourceType } from "./sourceType";
import { Timer } from "@/model/timer";
import { SelectType } from "@/model/selectType";

export abstract class Model {
  timer: Timer | null;
  country: Country;

  barChartType: string | null = null;
  barChartScale: number;
  bindings: Map<SourceType, VisualizerType | undefined>;

  focusEventSource: string | null;
  focusedRegionIds: number[] = [];
  selectedRegionIds: number[] = [];

  numRegionsChangedListeners: (() => void)[];
  transportCostChangeListeners: ((model: Model) => void)[];

  selectRegionEventListeners: ((
    tableId: string,
    regionIds: number[],
    type: SelectType,
    set: boolean,
  ) => void)[];

  startEventListeners: (() => void)[];
  stopEventListeners: (() => void)[];
  resetEventListeners: (() => void)[];

  constructor(country: Country, barChartScale: number) {
    this.timer = Timer.getSimulationTimer();
    this.country = country;
    this.barChartScale = barChartScale;
    this.bindings = new Map<SourceType, VisualizerType | undefined>();

    this.focusedRegionIds = [];
    this.focusEventSource = null;

    this.selectRegionEventListeners = [];

    this.startEventListeners = [];
    this.stopEventListeners = [];
    this.resetEventListeners = [];

    this.numRegionsChangedListeners = [];
    this.transportCostChangeListeners = [];

    this.barChartType = "Share of Manufacturing";
  }

  reset() {
    this.selectedRegionIds = [];
    this.country.disturb();
    this.country.reset();
    this.timer?.reset();
    this.notifyReset();
  }

  start() {
    this.timer?.start();
    Timer.getLayoutTimer().stop();
    this.notifyStart();
  }

  stop() {
    this.timer?.stop();
    this.notifyStop();
  }

  setBarChartScale(scale: number) {
    this.barChartScale = scale;
  }

  setNumRegions(numRegions: number) {
    this.country.setNumRegions(numRegions);
    this.notifyNumRegionsChanged();
  }

  setPi(mu: number) {
    this.country.setPi(mu);
  }

  setTransportCost(transportCost: number) {
    this.country.setTransportCost(transportCost);
    this.notifyTransportCostChange();
  }

  setSigma(sigma: number) {
    this.country.setSigma(sigma);
  }

  setFocusedRegionId(source: string | null, regionIds: number[]) {
    this.focusEventSource = source;
    this.focusedRegionIds = regionIds;
  }

  setFocusedRouteIds(source: string | null, route: number[]) {
    this.focusEventSource = source;
    this.focusedRegionIds = route;
  }

  isFocusedRegionIds(id0: number, id1: number) {
    if (this.focusedRegionIds.length == 0) {
      return false;
    }
    return (
      Math.min(this.focusedRegionIds[0], this.focusedRegionIds[1]) ==
        Math.min(id0, id1) &&
      Math.max(this.focusedRegionIds[0], this.focusedRegionIds[1]) ==
        Math.max(id0, id1)
    );
  }

  addStartListener(listener: () => void) {
    this.startEventListeners.push(listener);
  }

  notifyStart() {
    this.startEventListeners.forEach((listener) => {
      listener();
    });
  }

  addStopListener(listener: () => void) {
    this.stopEventListeners.push(listener);
  }

  notifyStop() {
    this.stopEventListeners.forEach((listener) => {
      listener();
    });
  }

  addResetListener(listener: () => void) {
    this.resetEventListeners.push(listener);
  }

  notifyReset() {
    this.resetEventListeners.forEach((listener) => {
      listener();
    });
  }

  addRegionSelectListener(
    listener: (
      tableId: string,
      regionIds: number[],
      type: SelectType,
      set: boolean,
    ) => void,
  ) {
    this.selectRegionEventListeners.push(listener);
  }

  notifyRegionSelect(
    tableId: string,
    regionIds: number[],
    type: SelectType,
    set: boolean,
  ) {
    this.selectRegionEventListeners.forEach((listener) => {
      listener(tableId, regionIds, type, set);
    });
  }

  addTransportCostChangeListener(listener: () => void) {
    this.transportCostChangeListeners.push(listener);
  }

  notifyTransportCostChange() {
    this.transportCostChangeListeners.forEach((listener) => {
      listener(this);
    });
  }

  addNumRegionsChangedListener(listener: () => void) {
    this.numRegionsChangedListeners.push(listener);
  }

  notifyNumRegionsChanged() {
    this.numRegionsChangedListeners.forEach((listener) => {
      listener();
    });
  }

  updateAdjacencyMatrix(): void {
    this.country.matrices.adjacencyMatrix = this.createAdjacencyMatrix(
      this.country.numRegions,
    );
  }

  async updateDistanceMatrixAndTransportCostMatrix() {
    [
      this.country.matrices.distanceMatrix,
      this.country.matrices.predecessorMatrix,
    ] = await this.createDistanceMatrix();
    this.country.matrices.transportCostMatrix =
      this.createTransportCostMatrix();
  }

  async adjustRegions(numRegions: number): Promise<void> {
    if (this.country.regions.length < numRegions) {
      this.appendRegions(numRegions - this.country.regions.length);
    }
    if (this.country.regions.length > numRegions) {
      this.extractRegions([...Array(numRegions).keys()]);
    }
  }

  abstract createAdjacencyMatrix(numRegions: number): number[][];

  abstract createDistanceMatrix(): Promise<number[][][]>;

  abstract createTransportCostMatrix(): number[][];

  abstract appendRegions(desiredNumRegions: number): void;

  abstract extractRegions(selectedRegionIds: number[]): void;
}
