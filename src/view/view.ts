import { BarChartView } from "./barChartView";
import { VisualizerTypeSelector } from "./visualizerTypeSelector";
import { BarChartScaleSelector } from "./barChartScaleSelector";
import { SliderSet } from "./sliderSet";
import { CaseSelector } from "./caseSelector";
import { CommandButtonSet } from "./commandButtonSet";
import { DiagonalMatrixViewSet } from "./diagonalMatrixViewSet";
import { Model } from "@/model/model";

export class View {
  barChartView: BarChartView;
  visualizerTypeSelector: VisualizerTypeSelector;
  barChartScaleSelector: BarChartScaleSelector;
  sliderSet: SliderSet;
  caseSelector: CaseSelector;
  commandButtonSet: CommandButtonSet;
  diagonalTableViewSet: DiagonalMatrixViewSet;

  constructor() {
    this.barChartView = new BarChartView();
    this.visualizerTypeSelector = new VisualizerTypeSelector();
    this.barChartScaleSelector = new BarChartScaleSelector();
    this.sliderSet = new SliderSet();
    this.caseSelector = new CaseSelector(this.sliderSet);
    this.commandButtonSet = new CommandButtonSet();
    this.diagonalTableViewSet = new DiagonalMatrixViewSet();
  }

  setModel(model: Model) {
    this.barChartView.setModel(model);
    this.visualizerTypeSelector.setModel(model);
    this.barChartScaleSelector.setModel(model);
    this.sliderSet.setModel(model);
    this.caseSelector.setModel(model);
    this.commandButtonSet.setModel(model);
    this.diagonalTableViewSet.setModel(model);
  }

  notifyUpdateCountry() {
    this.barChartView.draw();
    this.diagonalTableViewSet.update();
  }

  notifyUpdateTime() {
    this.barChartView.draw();
  }
}
