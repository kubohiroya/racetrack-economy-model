import { Model } from "../model/model";

export class BarChartScaleSelector {
  scaleSelector: HTMLSelectElement;
  model: Model | undefined;

  constructor() {
    this.scaleSelector = document.getElementById("scale") as HTMLSelectElement;
  }

  setModel(model: Model) {
    this.scaleSelector.addEventListener("change", (ev) => this.changeScale(ev));
  }

  changeScale(ev: Event) {
    const value = (ev.target as HTMLOptionElement).value;
    const scale = parseFloat(value.split(" ")[1]);
    this.model!.setScale(scale);
  }
}
