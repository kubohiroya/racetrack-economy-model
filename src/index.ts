import {Model} from "./model";
import {View} from "./view";

import {
  defineComponents,
  IgcButtonComponent,
  IgcIconComponent,
  IgcSliderComponent,
  registerIconFromText
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SliderStyle.css';

defineComponents(IgcSliderComponent);
defineComponents(IgcButtonComponent);
defineComponents(IgcIconComponent);

const startIcon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';

const stopIcon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';

const resetIcon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" /></svg>';

registerIconFromText("start", startIcon, "material");
registerIconFromText("stop", stopIcon, "material");
registerIconFromText("reset", resetIcon, "material");

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const startButton = document.getElementById("start") as IgcButtonComponent;
const stopButton = document.getElementById("stop") as IgcButtonComponent;
const resetButton = document.getElementById("reset") as IgcButtonComponent;
const tmaxSlider = document.getElementById("tmaxSlider") as IgcSliderComponent;
const sigmaSlider = document.getElementById("sigmaSlider") as IgcSliderComponent;

const model = new Model(100, 5, 10);
const view = new View(canvas, model);
model.addUpdateEventListener(() => {
        view.repaint();
    }
);

startButton.disabled = false;
stopButton.disabled = true;
tmaxSlider.value = model.country.tmax;
sigmaSlider.value = model.country.sigma;

function start() {
    startButton.disabled = true;
    stopButton.disabled = false;
    model.start(tmaxSlider.value, sigmaSlider.value);
}

function stop() {
    startButton.disabled = false;
    stopButton.disabled = true;
    model.stop();
}

function reset() {
    model.reset(tmaxSlider.value, sigmaSlider.value);
}

function onTmaxChanged() {
    model.changeTmax(tmaxSlider.value);
}

function onSigmaChanged() {
    model.changeSigma(sigmaSlider.value);
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
tmaxSlider.addEventListener('igcChange', onTmaxChanged);
sigmaSlider.addEventListener('igcChange', onSigmaChanged);
