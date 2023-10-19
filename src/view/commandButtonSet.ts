import { Model } from "../model/model";
import { Slider } from "@microsoft/fast-foundation";

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
    this.speedSlider.addEventListener("change", () => this.onSpeedChanged());

    this.startButton.className = "";
    this.stopButton.className = "disabled";
  }

  setModel(model: Model) {
    this.model = model;
    model.setTimerCounterUpdater(() => this.updateTimerCounter());
  }

  updateTimerCounter() {
    this.counterElem.innerText = this.model!.timeCounter.toLocaleString();
  }

  start() {
    this.startButton.className = "disabled";
    this.stopButton.className = "started";
    this.resetButton.className = "started";
    this.model!.start();
  }

  stop() {
    this.startButton.className = "";
    this.stopButton.className = "disabled";
    this.resetButton.className = "";
    this.model!.stop();
  }

  reset() {
    this.model!.reset();
  }

  onSpeedChanged() {
    this.model!.stop();
    this.model!.setSpeed(this.speedSlider.valueAsNumber);
    this.model!.start();
  }
}
