import { Model } from "@/model/model";
import { VisualizerType } from "@/model/visualizerType";
import { SourceType } from "@/model/sourceType";

const getValueOfSelector = (ev: Event): string => {
  return (ev.target as HTMLOptionElement).value;
};

const getVisualizerTypeOfSelector = (
  value: string,
): VisualizerType | undefined => {
  switch (value) {
    case "radius":
      return VisualizerType.radius;
    case "color":
      return VisualizerType.color;
    case "gray":
      return VisualizerType.gray;
    case "red":
      return VisualizerType.red;
    case "dot":
      return VisualizerType.dot;
    default:
      return undefined;
  }
};

export function extractKeysByValue(
  map: Map<SourceType, VisualizerType | undefined>,
  targetValue: VisualizerType,
): SourceType | undefined {
  for (const key of [
    SourceType.manufacturingShare,
    SourceType.income,
    SourceType.priceIndex,
    SourceType.nominalWage,
    SourceType.realWage,
  ]) {
    if (map.get(key) == targetValue) {
      return key;
    }
  }
  return undefined;
}

export class VisualizerTypeSelector {
  model: Model | undefined;

  manufacturingShareVisualizer: HTMLSelectElement;
  incomeVisualizer: HTMLSelectElement;
  priceIndexVisualizer: HTMLSelectElement;
  nominalWageVisualizer: HTMLSelectElement;
  realWageVisualizer: HTMLSelectElement;

  incomeLabel: HTMLSpanElement;
  priceIndexLabel: HTMLSpanElement;
  nominalWageLabel: HTMLSpanElement;
  realWageLabel: HTMLSpanElement;

  constructor() {
    this.manufacturingShareVisualizer = document.getElementById(
      "mshareVisualizer",
    ) as HTMLSelectElement;
    this.incomeVisualizer = document.getElementById(
      "incomeVisualizer",
    ) as HTMLSelectElement;
    this.priceIndexVisualizer = document.getElementById(
      "priceIndexVisualizer",
    ) as HTMLSelectElement;
    this.nominalWageVisualizer = document.getElementById(
      "nominalWageVisualizer",
    ) as HTMLSelectElement;
    this.realWageVisualizer = document.getElementById(
      "realWageVisualizer",
    ) as HTMLSelectElement;

    this.incomeLabel = document.getElementById(
      "incomeLabel",
    ) as HTMLSpanElement;
    this.priceIndexLabel = document.getElementById(
      "priceIndexLabel",
    ) as HTMLSpanElement;
    this.nominalWageLabel = document.getElementById(
      "nominalWageLabel",
    ) as HTMLSpanElement;
    this.realWageLabel = document.getElementById(
      "realWageLabel",
    ) as HTMLSpanElement;

    this.manufacturingShareVisualizer.value = "radius";
    this.incomeVisualizer.value = "gray";
    this.priceIndexVisualizer.value = "";
    this.nominalWageVisualizer.value = "";
    this.realWageVisualizer.value = "";

    this.manufacturingShareVisualizer.addEventListener("change", (ev) => {
      const value = getValueOfSelector(ev);
      this.changeManufacturingShareVisualizer(value);
    });

    this.incomeVisualizer.addEventListener("change", (ev) => {
      const value = getValueOfSelector(ev);
      this.changeIncomeVisualizer(value);
    });

    this.priceIndexVisualizer.addEventListener("change", (ev) => {
      const value = getValueOfSelector(ev);
      this.changePriceIndexVisualizer(value);
    });

    this.nominalWageVisualizer.addEventListener("change", (ev) => {
      const value = getValueOfSelector(ev);
      this.changeNominalWageVisualizer(value);
    });
    this.realWageVisualizer.addEventListener("change", (ev) => {
      const value = getValueOfSelector(ev);
      this.changeRealWageVisualizer(value);
    });
  }

  updateTextDecoration(value: string, type: SourceType) {
    if (type !== SourceType.manufacturingShare)
      this.manufacturingShareVisualizer.style.textDecoration =
        this.incomeVisualizer.value == value ? "line-through" : "";
    if (type !== SourceType.income)
      this.incomeVisualizer.style.textDecoration =
        this.incomeVisualizer.value == value ? "line-through" : "";
    if (type !== SourceType.priceIndex)
      this.priceIndexLabel.style.textDecoration =
        this.priceIndexVisualizer.value == value ? "line-through" : "";
    if (type !== SourceType.nominalWage)
      this.nominalWageLabel.style.textDecoration =
        this.nominalWageVisualizer.value == value ? "line-through" : "";
    if (type !== SourceType.realWage)
      this.realWageLabel.style.textDecoration =
        this.realWageVisualizer.value == value ? "line-through" : "";
  }

  changeManufacturingShareVisualizer(value: string) {
    const type = getVisualizerTypeOfSelector(value);
    this.model!.bindings.set(SourceType.manufacturingShare, type);
    this.updateTextDecoration(value, SourceType.manufacturingShare);
  }

  changeIncomeVisualizer(value: string) {
    const type = getVisualizerTypeOfSelector(value);
    this.model!.bindings.set(SourceType.income, type);
    this.updateTextDecoration(value, SourceType.income);
  }

  changePriceIndexVisualizer(value: string) {
    const type = getVisualizerTypeOfSelector(value);
    this.model!.bindings.set(SourceType.priceIndex, type);
    this.updateTextDecoration(value, SourceType.priceIndex);
  }

  changeNominalWageVisualizer(value: string) {
    const type = getVisualizerTypeOfSelector(value);
    this.model!.bindings.set(SourceType.nominalWage, type);
    this.updateTextDecoration(value, SourceType.nominalWage);
  }

  changeRealWageVisualizer(value: string) {
    const type = getVisualizerTypeOfSelector(value);
    this.model!.bindings.set(SourceType.realWage, type);
    this.updateTextDecoration(value, SourceType.realWage);
  }

  setModel(model: Model) {
    this.model = model;

    model.bindings.set(SourceType.manufacturingShare, VisualizerType.radius);
    model.bindings.set(SourceType.income, VisualizerType.gray);
    model.bindings.set(SourceType.priceIndex, undefined);
    model.bindings.set(SourceType.nominalWage, undefined);
    model.bindings.set(SourceType.realWage, undefined);
  }
}
