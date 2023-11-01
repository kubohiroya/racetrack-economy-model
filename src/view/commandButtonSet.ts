import { Model } from "@/model/model";
import { Slider } from "@microsoft/fast-foundation";
import { Timer } from "@/model/timer";

export class CommandButtonSet {
  model: Model | undefined;
  startButton: HTMLButtonElement;
  stopButton: HTMLButtonElement;
  resetButton: HTMLButtonElement;

  counterElem: HTMLDivElement;
  speedSlider: Slider;

  constructor() {
    this.startButton = document.getElementById("start") as HTMLButtonElement;
    this.stopButton = document.getElementById("stop") as HTMLButtonElement;
    this.resetButton = document.getElementById("reset") as HTMLButtonElement;
    this.counterElem = document.getElementById("counter") as HTMLDivElement;
    this.speedSlider = document.getElementById("speedSlider") as Slider;

    this.startButton.addEventListener("click", () => this.start());
    this.stopButton.addEventListener("click", () => this.stop());
    this.resetButton.addEventListener("click", () => this.reset());
    this.speedSlider.addEventListener("change", () => {
      Timer.getSimulationTimer().changeSpeed(this.speedSlider.valueAsNumber);
    });

    //this.stopButton.classList.add("disabled");
    this.stopButton.disabled = true;

    Timer.getSimulationTimer().addTimeEventListener((event) => {
      this.counterElem.innerText =
        this.model?.timer?.timeCounter.toLocaleString() || "";
    });
  }

  setModel(model: Model) {
    this.model = model;
  }

  start() {
    //this.startButton.classList.add("disabled");
    this.startButton.disabled = true;
    this.stopButton.disabled = false;
    this.stopButton.classList.add("started");
    this.resetButton.classList.add("started");
    this.model!.start();
  }

  stop() {
    this.startButton.disabled = false;
    this.stopButton.disabled = true;
    this.startButton.classList.remove("started");
    this.resetButton.classList.remove("started");
    this.model!.stop();
  }

  reset() {
    this.model!.reset();
  }
}
