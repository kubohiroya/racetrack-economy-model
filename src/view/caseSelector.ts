import { RadioGroup } from "@microsoft/fast-components";
import { Model } from "@/model/model";
import { SliderSet } from "./sliderSet";

export class CaseSelector {
  sliderSet: SliderSet;
  caseSelector: RadioGroup;
  model: Model | undefined;

  constructor(sliderSet: SliderSet) {
    this.sliderSet = sliderSet;
    this.caseSelector = document.getElementById("caseSelector") as RadioGroup;
    this.caseSelector.addEventListener("change", () => this.onCaseChanged());
  }

  onCaseChanged() {
    if (!this.model) return;
    switch (this.caseSelector.value) {
      case "0":
        //π=0.2, τ=2, σ=4
        this.sliderSet.numRegionsSlider.value = "12";
        this.sliderSet.piSlider.value = "0.2";
        this.sliderSet.transportCostSlider.value = "2";
        this.sliderSet.sigmaSlider.value = "4";
        this.model.notifyUpdateTime();
        return;
      case "1":
        //σ=2, τ=0.2, π=0.2
        this.sliderSet.numRegionsSlider.value = "12";
        this.sliderSet.piSlider.value = "0.2";
        this.sliderSet.transportCostSlider.value = "2";
        this.sliderSet.sigmaSlider.value = "2";
        this.model.notifyUpdateTime();
        return;
      case "2":
        //σ=4, τ=0.2, π=0.4
        this.sliderSet.numRegionsSlider.value = "12";
        this.sliderSet.piSlider.value = "0.4";
        this.sliderSet.transportCostSlider.value = "2";
        this.sliderSet.sigmaSlider.value = "4";
        this.model.notifyUpdateTime();
        return;
      case "3":
        //σ=4, τ=0.1, π=0.2
        this.sliderSet.numRegionsSlider.value = "12";
        this.sliderSet.piSlider.value = "0.2";
        this.sliderSet.transportCostSlider.value = "1";
        this.sliderSet.sigmaSlider.value = "4";
        this.model.notifyUpdateTime();
        return;
      default:
      // do nothing
    }
  }

  setModel(model: Model) {
    this.model = model;
  }
}
