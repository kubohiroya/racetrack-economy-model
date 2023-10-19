import { Slider } from "@microsoft/fast-foundation";
import { Model } from "../model/model";

export class SliderSet {
  numRegionsSlider: Slider;
  piSlider: Slider;
  transportCostSlider: Slider;
  sigmaSlider: Slider;

  numRegionsElem: HTMLElement;
  piElem: HTMLElement;
  transportCostElem: HTMLElement;
  sigmaElem: HTMLElement;

  model: Model | undefined;

  listeners: ((numRegions: number) => void)[];

  constructor() {
    this.numRegionsSlider = document.getElementById(
      "numRegionsSlider",
    ) as Slider;
    this.piSlider = document.getElementById("piSlider") as Slider;
    this.transportCostSlider = document.getElementById("tcostSlider") as Slider;
    this.sigmaSlider = document.getElementById("sigmaSlider") as Slider;

    this.numRegionsElem = document.getElementById("numRegions") as HTMLElement;
    this.piElem = document.getElementById("pi") as HTMLElement;
    this.transportCostElem = document.getElementById("tcost") as HTMLElement;
    this.sigmaElem = document.getElementById("sigma") as HTMLElement;

    this.numRegionsSlider.addEventListener("change", () =>
      this.onNCitiesChanged(),
    );
    this.piSlider.addEventListener("change", () => this.onPiChanged());
    this.transportCostSlider.addEventListener("change", () =>
      this.onTcostChanged(),
    );
    this.sigmaSlider.addEventListener("change", () => this.onSigmaChanged());
    this.listeners = [];
  }

  setModel(model: Model) {
    this.model = model;
    this.piSlider.valueAsNumber = model.country.pi;
    this.transportCostSlider.valueAsNumber = model.country.transportCost;
    this.sigmaSlider.valueAsNumber = model.country.sigma;

    this.numRegionsElem.innerText = this.numRegionsSlider.value;
    this.transportCostElem.innerText = this.transportCostSlider.value;
    this.sigmaElem.innerText = this.sigmaSlider.value;
    this.piElem.innerText = this.piSlider.value;
  }

  onNCitiesChanged() {
    if (!this.model) throw new Error();
    this.numRegionsElem.innerText = this.numRegionsSlider.value;
    const numRegions = this.numRegionsSlider.valueAsNumber;
    this.model.setNumRegions(numRegions);
    this.model.notifyUpdateCountry();
  }

  onPiChanged() {
    if (!this.model) throw new Error();
    this.piElem.innerText = this.piSlider.valueAsNumber.toPrecision(2);
    this.model.setPi(this.piSlider.valueAsNumber);
  }

  onTcostChanged() {
    if (!this.model) throw new Error();
    this.transportCostElem.innerText =
      this.transportCostSlider.valueAsNumber.toPrecision(2);
    this.model.setTransportCost(this.transportCostSlider.valueAsNumber);
  }

  onSigmaChanged() {
    if (!this.model) throw new Error();
    this.sigmaElem.innerText = this.sigmaSlider.valueAsNumber.toPrecision(3);
    this.model.setSigma(this.sigmaSlider.valueAsNumber);
  }
}
