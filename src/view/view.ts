import { BarChartView } from "./barChartView";
import { VisualizerTypeSelector } from "./visualizerTypeSelector";
import { BarChartScaleSelector } from "./barChartScaleSelector";
import { SliderSet } from "./sliderSet";
import { CaseSelector } from "./caseSelector";
import { CommandButtonSet } from "./commandButtonSet";
import { DiagonalMatrixViewSet } from "./diagonalMatrixViewSet";
import { Model } from "@/model/model";
import { BarChartTypeSelector } from "@/view/barChartTypeSelector";

export class View {
  barChartView: BarChartView;
  visualizerTypeSelector: VisualizerTypeSelector;
  barChartScaleSelector: BarChartScaleSelector;
  barChartTypeSelector: BarChartTypeSelector;
  sliderSet: SliderSet;
  caseSelector: CaseSelector;
  commandButtonSet: CommandButtonSet;
  diagonalTableViewSet: DiagonalMatrixViewSet;

  constructor() {
    this.barChartView = new BarChartView();
    this.visualizerTypeSelector = new VisualizerTypeSelector();
    this.barChartScaleSelector = new BarChartScaleSelector();
    this.barChartTypeSelector = new BarChartTypeSelector();
    this.sliderSet = new SliderSet();
    this.caseSelector = new CaseSelector(this.sliderSet);
    this.commandButtonSet = new CommandButtonSet();
    this.diagonalTableViewSet = new DiagonalMatrixViewSet();
  }

  setModel(model: Model) {
    this.barChartView.setModel(model);
    this.visualizerTypeSelector.setModel(model);
    this.barChartScaleSelector.setModel(model);
    this.barChartTypeSelector.setModel(model);
    this.sliderSet.setModel(model);
    this.caseSelector.setModel(model);
    this.commandButtonSet.setModel(model);
    this.diagonalTableViewSet.setModel(model);
  }

  async update() {
    await this.diagonalTableViewSet.update();
    this.barChartView.draw();
  }

  tick() {
    this.barChartView.draw();
  }
}
