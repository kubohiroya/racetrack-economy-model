import { Model } from "@/model/model";

export class BarChartTypeSelector {
  typeSelector: HTMLSelectElement;
  model: Model | undefined;

  constructor() {
    this.typeSelector = document.getElementById(
      "barChartSelector",
    ) as HTMLSelectElement;
    this.typeSelector.addEventListener("change", (ev) => this.changeScale(ev));
  }

  setModel(model: Model) {
    this.model = model;
    this.typeSelector.value = this.model.barChartType || "";
  }

  changeScale(ev: Event) {
    if (!this.model) throw new Error();
    this.model.barChartType = (ev.target as HTMLOptionElement).value;
  }
}
