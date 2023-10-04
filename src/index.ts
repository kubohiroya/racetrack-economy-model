import { Model } from "./model";
import { View } from "./view";
import { drawPolygonOnCanvas } from "./visualizer";

import {
  fastButton,
  fastRadio,
  fastRadioGroup,
  fastDialog,
  fastSlider,
  fastSliderLabel,
  provideFASTDesignSystem, RadioGroup,
} from "@microsoft/fast-components";

import { Dialog, Slider } from "@microsoft/fast-foundation";

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

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
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
const caseSelector = document.getElementById("caseSelector") as RadioGroup;

const visualizer = document.getElementById("visualizer") as HTMLCanvasElement;

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

const gammaValue = 1.0;
const model = new Model(12, 1.0, 0.2, 2.0, 4, gammaValue);
const view = new View(canvas, model);

model.addUpdateEventListener(() => {
  counterElem.innerText = model.counter.toLocaleString();
  view.repaint();
  const max = model.country.cities
    .map((city) => city.MShare)
    .reduce(
      (max: number, current: number) => (current > max ? current : max),
      0,
    );

  drawPolygonOnCanvas({
    canvas: visualizer,
    diameter: 340,
    vertices: model.numCities,
    vertexCircleRadius: 5,
    vertexCircleValueSource: model.country.cities.map(
      (city) => city.MShare / max,
    ),
  });
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
}

function onPiChanged() {
  piElem.innerText = piSlider.valueAsNumber.toPrecision(2);
  model.setPi(piSlider.valueAsNumber);
  model.calcDistanceMatrix();
}

function onTcostChanged() {
  tcostElem.innerText = tcostSlider.valueAsNumber.toPrecision(2);
  model.setTcost(tcostSlider.valueAsNumber);
  model.calcDistanceMatrix();
}

function onSigmaChanged() {
  sigmaElem.innerText = sigmaSlider.valueAsNumber.toPrecision(3);
  model.setSigma(sigmaSlider.valueAsNumber);
  model.calcDistanceMatrix();
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

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
nCitiesSlider.addEventListener("change", onNCitiesChanged);
piSlider.addEventListener("change", onPiChanged);
tcostSlider.addEventListener("change", onTcostChanged);
sigmaSlider.addEventListener("change", onSigmaChanged);
caseSelector.addEventListener("change", onCaseChanged);

const dropdown = document.getElementById("scale") as HTMLSelectElement;
dropdown.addEventListener("change", (ev) => {
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

infoDialogOpenButton.addEventListener("click", openInfoDialog);
infoDialogCloseButton.addEventListener("click", closeInfoDialog);

reset();
