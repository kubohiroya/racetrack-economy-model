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
    SourceType.priceIndex,
    SourceType.nominalWage,
    SourceType.realWage,
    SourceType.avgRealWage,
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
  priceIndexVisualizer: HTMLSelectElement;
  nominalWageVisualizer: HTMLSelectElement;
  realWageVisualizer: HTMLSelectElement;
  avgRealWageVisualizer: HTMLSelectElement;

  priceIndexLabel: HTMLSpanElement;
  nominalWageLabel: HTMLSpanElement;
  realWageLabel: HTMLSpanElement;
  avgRealWageLabel: HTMLSpanElement;

  constructor() {
    this.manufacturingShareVisualizer = document.getElementById(
      "mshareVisualizer",
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
    this.avgRealWageVisualizer = document.getElementById(
      "avgRealWageVisualizer",
    ) as HTMLSelectElement;

    this.priceIndexLabel = document.getElementById(
      "priceIndexLabel",
    ) as HTMLSpanElement;
    this.nominalWageLabel = document.getElementById(
      "nominalWageLabel",
    ) as HTMLSpanElement;
    this.realWageLabel = document.getElementById(
      "realWageLabel",
    ) as HTMLSpanElement;
    this.avgRealWageLabel = document.getElementById(
      "avgRealWageLabel",
    ) as HTMLSpanElement;

    this.manufacturingShareVisualizer.value = "radius";
    this.priceIndexVisualizer.value = "gray";
    this.nominalWageVisualizer.value = "";
    this.realWageVisualizer.value = "";
    this.avgRealWageVisualizer.value = "";

    this.manufacturingShareVisualizer.addEventListener("change", (ev) => {
      const value = getValueOfSelector(ev);
      this.changeAvgRealWageVisualizer(value);
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
    this.avgRealWageVisualizer.addEventListener("change", (ev) => {
      const value = getValueOfSelector(ev);
      this.changeAvgRealWageVisualizer(value);
    });
  }

  changeManufacturingShareVisualizer(value: string) {
    const type = getVisualizerTypeOfSelector(value);
    this.model!.bindings.set(SourceType.manufacturingShare, type);
    this.priceIndexLabel.style.textDecoration =
      this.priceIndexVisualizer.value == value ? "line-through" : "";
    this.nominalWageLabel.style.textDecoration =
      this.nominalWageVisualizer.value == value ? "line-through" : "";
    this.realWageLabel.style.textDecoration =
      this.realWageVisualizer.value == value ? "line-through" : "";
    this.avgRealWageLabel.style.textDecoration =
      this.avgRealWageVisualizer.value == value ? "line-through" : "";
    this.model!.notifyUpdateTime();
  }

  changePriceIndexVisualizer(value: string) {
    const type = getVisualizerTypeOfSelector(value);
    this.model!.bindings.set(SourceType.priceIndex, type);
    this.priceIndexLabel.style.textDecoration =
      this.manufacturingShareVisualizer.value == value ? "line-through" : "";
    this.nominalWageLabel.style.textDecoration =
      this.nominalWageVisualizer.value == value ? "line-through" : "";
    this.realWageLabel.style.textDecoration =
      this.realWageVisualizer.value == value ? "line-through" : "";
    this.avgRealWageLabel.style.textDecoration =
      this.avgRealWageVisualizer.value == value ? "line-through" : "";
    this.model!.notifyUpdateTime();
  }

  changeNominalWageVisualizer(value: string) {
    const type = getVisualizerTypeOfSelector(value);
    this.model!.bindings.set(SourceType.nominalWage, type);
    this.nominalWageLabel.style.textDecoration =
      this.manufacturingShareVisualizer.value == value ||
      this.priceIndexVisualizer.value == value
        ? "line-through"
        : "";
    this.realWageLabel.style.textDecoration =
      this.realWageVisualizer.value == value ? "line-through" : "";
    this.avgRealWageLabel.style.textDecoration =
      this.avgRealWageVisualizer.value == value ? "line-through" : "";
    this.model!.notifyUpdateTime();
  }

  changeRealWageVisualizer(value: string) {
    const type = getVisualizerTypeOfSelector(value);
    this.model!.bindings.set(SourceType.realWage, type);
    this.realWageLabel.style.textDecoration =
      this.manufacturingShareVisualizer.value == value ||
      this.priceIndexVisualizer.value == value ||
      this.nominalWageVisualizer.value == value
        ? "line-through"
        : "";
    this.avgRealWageLabel.style.textDecoration =
      this.avgRealWageVisualizer.value == value ? "line-through" : "";
    this.model!.notifyUpdateTime();
  }

  changeAvgRealWageVisualizer(value: string) {
    const type = getVisualizerTypeOfSelector(value);
    this.model!.bindings.set(SourceType.avgRealWage, type);
    this.avgRealWageLabel.style.textDecoration =
      this.manufacturingShareVisualizer.value == value ||
      this.priceIndexVisualizer.value == value ||
      this.nominalWageVisualizer.value == value ||
      this.realWageVisualizer.value == value
        ? "line-through"
        : "";
    this.model!.notifyUpdateTime();
  }

  setModel(model: Model) {
    this.model = model;

    model.bindings.set(SourceType.manufacturingShare, VisualizerType.radius);
    model.bindings.set(SourceType.priceIndex, VisualizerType.gray);
    model.bindings.set(SourceType.nominalWage, undefined);
    model.bindings.set(SourceType.realWage, undefined);
    model.bindings.set(SourceType.avgRealWage, undefined);
  }
}
