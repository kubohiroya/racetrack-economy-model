import {Model} from "./model";
import {View} from "./view";

import {
    defineComponents,
    IgcButtonComponent,
    IgcIconComponent,
    IgcSliderComponent,
    IgcDropdownComponent,
    IgcDropdownItemComponent,
    registerIconFromText
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SliderStyle.css';

defineComponents(IgcSliderComponent);
defineComponents(IgcButtonComponent);
defineComponents(IgcIconComponent);
defineComponents(IgcDropdownComponent);
defineComponents(IgcDropdownItemComponent);

const startIcon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';

const stopIcon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';

const resetIcon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" /></svg>';

registerIconFromText("start", startIcon, "material");
registerIconFromText("stop", stopIcon, "material");
registerIconFromText("reset", resetIcon, "material");

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const scaleButton = document.getElementById("scale") as IgcDropdownComponent;

const nCitiesSlider = document.getElementById("nCitiesSlider") as IgcSliderComponent;
const tmaxSlider = document.getElementById("tmaxSlider") as IgcSliderComponent;
const sigmaSlider = document.getElementById("sigmaSlider") as IgcSliderComponent;
const muSlider = document.getElementById("muSlider") as IgcSliderComponent;

const nCitiesElem = document.getElementById("nCities") as HTMLElement;
const tmaxElem = document.getElementById("tmax") as HTMLElement;
const sigmaElem = document.getElementById("sigma") as HTMLElement;
const muElem = document.getElementById("mu") as HTMLElement;

const startButton = document.getElementById("start") as IgcButtonComponent;
const stopButton = document.getElementById("stop") as IgcButtonComponent;
const resetButton = document.getElementById("reset") as IgcButtonComponent;

const model = new Model(50, 5, 10, 0.4, 1.0);
const view = new View(canvas, model);

model.addUpdateEventListener(() => {
        view.repaint();
    }
);

startButton.disabled = false;
stopButton.disabled = true;
tmaxSlider.value = model.country.tmax;
sigmaSlider.value = model.country.sigma;
muSlider.value = model.country.mu;

nCitiesElem.innerText = nCitiesSlider.value.toString();
tmaxElem.innerText = tmaxSlider.value.toString();
sigmaElem.innerText = sigmaSlider.value.toString();
muElem.innerText = muSlider.value.toString();

function start() {
    startButton.disabled = true;
    stopButton.disabled = false;
    model.start(tmaxSlider.value, sigmaSlider.value, muSlider.value);
}

function stop() {
    startButton.disabled = false;
    stopButton.disabled = true;
    model.stop();
}

function reset() {
    model.reset(tmaxSlider.value, sigmaSlider.value, muSlider.value);
}

function onNCitiesChanged() {
    nCitiesElem.innerText = nCitiesSlider.value.toString();
    model.changeNCities(nCitiesSlider.value, tmaxSlider.value, sigmaSlider.value, muSlider.value);
    model.reset(tmaxSlider.value, sigmaSlider.value, muSlider.value);
}

function onTmaxChanged() {
    tmaxElem.innerText = tmaxSlider.value.toPrecision(2);
    model.changeTmax(tmaxSlider.value);
}

function onSigmaChanged() {
    sigmaElem.innerText = sigmaSlider.value.toPrecision(3);
    model.changeSigma(sigmaSlider.value);
}

function onMuChanged() {
    muElem.innerText = muSlider.value.toPrecision(2);
    model.changeMu(muSlider.value);
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
nCitiesSlider.addEventListener('igcChange', onNCitiesChanged);
tmaxSlider.addEventListener('igcChange', onTmaxChanged);
sigmaSlider.addEventListener('igcChange', onSigmaChanged);
muSlider.addEventListener('igcChange', onMuChanged);

export class DropDownTarget {
    dropdown: IgcDropdownComponent;
    constructor() {
        this.dropdown = document.getElementById('scaleDropdown') as IgcDropdownComponent;
        scaleButton!.addEventListener('click', this.handleClick);
        this.dropdown.addEventListener('igcChange', (ev)=>{
            const value = ((ev.target as any).selectedItem  as IgcDropdownItemComponent).value;
            scaleButton.innerText = value;
            const scale = parseFloat(value.split(" ")[1]);
            model.setScale(scale);
        });
    }

    private handleClick = (event: MouseEvent) => {
        this.dropdown.toggle(event.target as HTMLElement);
    };
}

new DropDownTarget();
reset();