import { Dialog } from "@microsoft/fast-foundation";

const raceTrackTitle = document.getElementById(
  "raceTrackTitle",
) as HTMLCanvasElement;
const graphTitle = document.getElementById("graphTitle") as HTMLCanvasElement;
const infoDialogCloseButton = document.getElementById(
  "infoDialogCloseButton",
) as HTMLCanvasElement;

const raceTrack = document.getElementById("raceTrack") as HTMLCanvasElement;
const graphCountry = document.getElementById("graphCountry") as HTMLDivElement;

const raceTrackDialog = document.getElementById(
  "raceTrackDialog",
) as HTMLDivElement;
const graphDialog = document.getElementById("graphDialog") as HTMLDivElement;
const infoDialog = document.getElementById("infoDialog") as Dialog;

export function startRaceTrackApp(openDialog: boolean) {
  raceTrackTitle.className = "enabled";
  graphTitle.className = "disabled";
  raceTrack.style.display = "block";
  graphCountry.style.display = "none";
  raceTrackDialog.style.display = "block";
  graphDialog.style.display = "none";
  const appName = "raceTrack";
  startApp(appName);
  openDialog && infoDialog.show();
}

export function startGraphApp(openDialog: boolean) {
  raceTrackTitle.className = "disabled";
  graphTitle.className = "enabled";
  raceTrack.style.display = "none";
  graphCountry.style.display = "block";
  raceTrackDialog.style.display = "none";
  graphDialog.style.display = "block";
  const appName = "graph";
  startApp(appName);
  openDialog && infoDialog.show();
}

function closeInfoDialog() {
  infoDialog.hide();
}

raceTrackTitle.addEventListener("click", () => startRaceTrackApp(true));
graphTitle.addEventListener("click", () => startGraphApp(true));
infoDialogCloseButton.addEventListener("click", closeInfoDialog);

const applications = new Map<
  string,
  { startFunc: () => void; stopFunc: () => void }
>();

export function registerApp(
  name: string,
  startFunc: () => void,
  stopFunc: () => void,
) {
  applications.set(name, { startFunc, stopFunc });
}

export function startApp(name: string) {
  const app = applications.get(name);
  if (app) {
    app.startFunc();
  }
}

export function stopApp(name: string) {
  const app = applications.get(name);
  if (app) {
    app.stopFunc();
  }
}
