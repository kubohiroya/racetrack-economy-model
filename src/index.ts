import {Model, SourceType, VisualizerType} from "./model";
import {View} from "./view";
import {computeSegmentIndex, updateView} from "./visualizer";

import {
  fastButton,
  fastDialog,
  fastRadio,
  fastRadioGroup,
  fastSlider,
  fastSliderLabel,
  provideFASTDesignSystem,
  RadioGroup,
} from "@microsoft/fast-components";

import {Dialog, Slider} from "@microsoft/fast-foundation";
import {DynamicTable} from "./dynamicTable"

provideFASTDesignSystem().register(
  fastButton(),
  fastRadio(),
  fastRadioGroup(),
  fastDialog(),
  fastSlider({
    thumb: `<div style="background-color: #fff; border: solid; border-color: #777; border-width: 1px; border-radius: 3px; width: 16px; height: 16px; "></div>`,
  }),
  fastSliderLabel(),
);

const barChartCanvas = document.getElementById("barChartCanvas") as HTMLCanvasElement;
const infoDialogOpenButton = document.getElementById(
  "infoDialogOpenButton",
) as HTMLCanvasElement;
const infoDialogCloseButton = document.getElementById(
  "infoDialogCloseButton",
) as HTMLCanvasElement;
const infoDialog = document.getElementById("infoDialog") as Dialog;
const nCitiesSlider = document.getElementById("nCitiesSlider") as Slider;
const piSlider = document.getElementById("piSlider") as Slider;
const tcostSlider = document.getElementById("tcostSlider") as Slider;
const sigmaSlider = document.getElementById("sigmaSlider") as Slider;
const speedSlider = document.getElementById("speedSlider") as Slider;
const caseSelector = document.getElementById("caseSelector") as RadioGroup;

const visualizerCanvas = document.getElementById("visualizerCanvas") as HTMLCanvasElement;

const distanceMatrixHeaderElem = document.getElementById("distanceMatrixHeader") as HTMLElement;
const distanceMatrixBodyElem = document.getElementById("distanceMatrixBody") as HTMLElement;

/*
interface RGBColor {
    r: number;
    g: number;
    b: number;
    createCSS(): string;
}
const extraSpecialColor = DesignToken.create<RGBColor>("extra-special-color");
const value = {
    r: 255,
    g: 0,
    b: 0,
    createCSS() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}

const specialColor = DesignToken.create<string>("special-color");
extraSpecialColor.setValueFor(nCitiesSlider, value)
specialColor.setValueFor(nCitiesSlider, "#ff0000");
*/

const nCitiesElem = document.getElementById("nCities") as HTMLElement;
const piElem = document.getElementById("pi") as HTMLElement;
const tcostElem = document.getElementById("tcost") as HTMLElement;
const sigmaElem = document.getElementById("sigma") as HTMLElement;

const startButton = document.getElementById("start") as HTMLButtonElement;
const stopButton = document.getElementById("stop") as HTMLButtonElement;
const resetButton = document.getElementById("reset") as HTMLButtonElement;

const counterElem = document.getElementById("counter") as HTMLDivElement;

const mshareVisualizer = document.getElementById("mshareVisualizer") as HTMLSelectElement;
const priceIndexVisualizer = document.getElementById("priceIndexVisualizer") as HTMLSelectElement;
const nominalWageVisualizer = document.getElementById("nominalWageVisualizer") as HTMLSelectElement;
const realWageVisualizer = document.getElementById("realWageVisualizer") as HTMLSelectElement;
const scaleSelector = document.getElementById("scale") as HTMLSelectElement;

const transportCostElem = document.getElementById("transportCost") as HTMLElement;

const gammaValue = 1.0;
const numCities = 12;
const model = new Model(1.0, 0.5, numCities, 0.2, 2.0, 4, gammaValue);
const barChartView = new View(barChartCanvas, model);

const left = 40
const top = 40
const diameter = 320
const vertexCircleRadiusBase= 14
const vertexCircleColorBase= 0.1

mshareVisualizer.value = 'radius';
priceIndexVisualizer.value = 'color';
nominalWageVisualizer.value = 'grayOuterCircle';
realWageVisualizer.value = 'redOuterCircle';

function updateVisualizerView(){

  updateView({
    canvas: visualizerCanvas,
    left,
    top,
    diameter,
    vertices: model.numCities,
    vertexCircleRadiusBase,
    vertexCircleColorBase,
    model,
  });
}

model.addUpdateEventListener(() => {
  counterElem.innerText = model.counter.toLocaleString();
  barChartView.repaint();
  updateVisualizerView();
});

startButton.className = "";
stopButton.className = "disabled";
piSlider.valueAsNumber = model.country.pi;
tcostSlider.valueAsNumber = model.country.tcost;
sigmaSlider.valueAsNumber = model.country.sigma;

nCitiesElem.innerText = nCitiesSlider.value;
tcostElem.innerText = tcostSlider.value;
sigmaElem.innerText = sigmaSlider.value;
piElem.innerText = piSlider.value;

function start() {
  startButton.className = "disabled";
  stopButton.className = "started";
  resetButton.className = "started";
  model.start();
}

function stop() {
  startButton.className = "";
  stopButton.className = "disabled";
  resetButton.className = "";
  model.stop();
}

function reset() {
  model.reset();
  updateTableSize(model.numCities);
  updateDistanceMatrix();
}

function onNCitiesChanged() {
  nCitiesElem.innerText = nCitiesSlider.value;
  model.setNumCities(
    nCitiesSlider.valueAsNumber,
    piSlider.valueAsNumber,
    tcostSlider.valueAsNumber,
    sigmaSlider.valueAsNumber,
    gammaValue,
  );
  model.reset();
  updateTableSize(model.numCities);
  updateDistanceMatrix();
}

function onPiChanged() {
  piElem.innerText = piSlider.valueAsNumber.toPrecision(2);
  model.setPi(piSlider.valueAsNumber);
  model.calcDistanceMatrix();
}

function onTcostChanged() {
  tcostElem.innerText = tcostSlider.valueAsNumber.toPrecision(2);
  model.setTransportCost(tcostSlider.valueAsNumber);
  model.calcDistanceMatrix();
  updateDistanceMatrix();
}

function onSigmaChanged() {
  sigmaElem.innerText = sigmaSlider.valueAsNumber.toPrecision(3);
  model.setSigma(sigmaSlider.valueAsNumber);
  model.calcDistanceMatrix();
}

function onSpeedChanged() {
  model.stop();
  model.setSpeed(speedSlider.valueAsNumber);
  model.start();
}

function onCaseChanged(){
  switch(caseSelector.value){
    case "0":
      //π=0.2, τ=2, σ=4
      nCitiesSlider.value = "12"
      piSlider.value = "0.2"
      tcostSlider.value = "2"
      sigmaSlider.value = "4"
      model.calcDistanceMatrix();
      return;
    case "1":
      //σ=2, τ=0.2, π=0.2
      nCitiesSlider.value = "12"
      piSlider.value = "0.2"
      tcostSlider.value = "2"
      sigmaSlider.value = "2"
      model.calcDistanceMatrix();
      return;
    case "2":
      //σ=4, τ=0.2, π=0.4
      nCitiesSlider.value = "12"
      piSlider.value = "0.4"
      tcostSlider.value = "2"
      sigmaSlider.value = "4"
      model.calcDistanceMatrix();
      return;
    case "3":
      //σ=4, τ=0.1, π=0.2
      nCitiesSlider.value = "12"
      piSlider.value = "0.2"
      tcostSlider.value = "1"
      sigmaSlider.value = "4"
      model.calcDistanceMatrix();
      return;
    default:
    // do nothing
  }
}

let prevSegment = -1;
function onMouseMove(event: MouseEvent){
  const rect = visualizerCanvas.getBoundingClientRect();

  const scaleX = visualizerCanvas.width / rect.width;
  const scaleY = visualizerCanvas.height / rect.height;

  const canvasX = (event.clientX - rect.left) * scaleX;
  const canvasY = (event.clientY - rect.top) * scaleY;

  const x = canvasX - left - diameter / 2
  const y = canvasY - top - diameter / 2


  const distance = Math.sqrt(x * x + y * y);
  if(distance < diameter/2 - 30 || diameter/2 + 30 < distance) {
    model.setSelectedCityIndex(-1);
    prevSegment = -1;
    updateVisualizerView();
    return;
  }

  const segment = computeSegmentIndex(x, y, model.numCities)

  if(prevSegment != segment){
    model.setSelectedCityIndex(segment);
    updateVisualizerView();
    prevSegment = segment
  }
}

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
nCitiesSlider.addEventListener("change", onNCitiesChanged);
piSlider.addEventListener("change", onPiChanged);
tcostSlider.addEventListener("change", onTcostChanged);
sigmaSlider.addEventListener("change", onSigmaChanged);
speedSlider.addEventListener("change", onSpeedChanged);
caseSelector.addEventListener("change", onCaseChanged);

visualizerCanvas.addEventListener("mousemove", onMouseMove)
visualizerCanvas.addEventListener("mouseenter", onMouseMove)
visualizerCanvas.addEventListener("mouseleave", onMouseMove)
visualizerCanvas.addEventListener("mouseover", onMouseMove)


function getVisualizerTypeOfSelector(ev: Event): VisualizerType|undefined{
  switch((ev.target as HTMLOptionElement).value){
    case "radius":
      return VisualizerType.radius;
    case "color":
      return VisualizerType.color;
    case "grayOuterCircle":
      return VisualizerType.grayOuterCircle;
    case "redOuterCircle":
      return VisualizerType.redOuterCircle;
    default:
      return undefined;
  }
}
mshareVisualizer.addEventListener("change", (ev) => {
  const value = getVisualizerTypeOfSelector(ev)
  model.bindings.set(SourceType.mshare, value);
  updateVisualizerView();
});
priceIndexVisualizer.addEventListener("change", (ev) => {
  model.bindings.set(SourceType.priceIndex, getVisualizerTypeOfSelector(ev));
  updateVisualizerView();
});
nominalWageVisualizer.addEventListener("change", (ev) => {
  model.bindings.set(SourceType.nominalWage, getVisualizerTypeOfSelector(ev));
  updateVisualizerView();
});
realWageVisualizer.addEventListener("change", (ev) => {
  model.bindings.set(SourceType.realWage, getVisualizerTypeOfSelector(ev));
  updateVisualizerView();
});

scaleSelector.addEventListener("change", (ev) => {
  const value = (ev.target as HTMLOptionElement).value;
  const scale = parseFloat(value.split(" ")[1]);
  model.setScale(scale);
});

function openInfoDialog() {
  infoDialog.show();
}

function closeInfoDialog() {
  infoDialog.hide();
}

const distanceTable = new DynamicTable("distanceTable");
const transportCostTable = new DynamicTable("tCostTable");

function updateTableSize(numCities: number){
  distanceTable.adjustTableSize(numCities, numCities, 25, 25);
  transportCostTable.adjustTableSize(numCities, numCities, 25, 25);
}

function updateDistanceMatrix(){
  const tCostMatrix = model.country.tConstMatrix;
  distanceTable.setTableContent(generateDistanceMatrix(model.numCities), (value:number)=>value.toString());
  transportCostTable.setTableContent(tCostMatrix, (value:number)=>value.toFixed(2));
}

function generateDistanceMatrix(n: number): number[][] {
  const matrix: number[][] = [];

  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) {
        row.push(0);
      } else {
        // 時計回りの距離と反時計回りの距離を計算し、短い方を選ぶ
        const clockwiseDistance = Math.abs(j - i);
        const counterClockwiseDistance = n - clockwiseDistance;
        row.push(Math.min(clockwiseDistance, counterClockwiseDistance));
      }
    }
    matrix.push(row);
  }
  return matrix;
}
infoDialogOpenButton.addEventListener("click", openInfoDialog);
infoDialogCloseButton.addEventListener("click", closeInfoDialog);


reset();
