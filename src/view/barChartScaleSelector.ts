import { Model } from "@/model/model";

export class BarChartScaleSelector {
  scaleSelector: HTMLSelectElement;
  model: Model | undefined;

  constructor() {
    this.scaleSelector = document.getElementById("scale") as HTMLSelectElement;
    this.scaleSelector.addEventListener("change", (ev) => this.changeScale(ev));
  }

  setModel(model: Model) {
    this.model = model;
  }

  changeScale(ev: Event) {
    if (!this.model) throw new Error();
    const value = (ev.target as HTMLOptionElement).value;
    const scale = parseFloat(value.split(" ")[1]);
    this.model.setBarChartScale(scale);
  }
}
