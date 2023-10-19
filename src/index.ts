import { Model } from "./model/model";

import {
  fastButton,
  fastDialog,
  fastRadio,
  fastRadioGroup,
  fastSlider,
  fastSliderLabel,
  provideFASTDesignSystem,
} from "@microsoft/fast-components";

import "./appSelector";
import { RaceTrackCountryView } from "./raceTrack/raceTrackCountryView";
import { RaceTrackMatrixFactories } from "./raceTrack/raceTrackMatrixFactories";
import {registerApp, startGraphApp, startRaceTrackApp} from "./appSelector";
import { GraphMatrixFactories } from "./graph/graphMatrixFactories";
import { GraphCountryView } from "./graph/graphCountryView";
import { View } from "./view/view";
import { Country } from "./model/country";
import { RegionViews } from "./graph/regionViews";

provideFASTDesignSystem().register(
  fastButton(),
  fastRadio(),
  fastRadioGroup(),
  fastDialog(),
  fastSlider({
    thumb: `<div style="background-color: #fff; border: 1px solid #777;border-radius: 3px; width: 16px; height: 16px; "></div>`,
  }),
  fastSliderLabel(),
);

const view = new View();
const country = new Country(600, 600, 0.2, 2.0, 4.0);

const raceTrackCountryView = new RaceTrackCountryView();
const raceTrackModel = new Model(
  new RaceTrackMatrixFactories(country),
  country,
  1.0,
  0.5,
);

raceTrackModel.addNotifyFocusRegionEventListener(() => {
  raceTrackCountryView.draw();
  view.barChartView.draw();
});

raceTrackModel.addFocusRouteEventListener(() => {
  raceTrackCountryView.draw();
  view.barChartView.draw();
});

raceTrackModel.addCountryEventListener(async () => {
  country.matrices.adjacencyMatrix =
    raceTrackModel.matrixFactories.createAdjacencyMatrix();
  [country.matrices.distanceMatrix, country.matrices.predecessorMatrix] =
    await raceTrackModel.matrixFactories.createDistanceMatrix();
  country.matrices.transportCostMatrix =
    raceTrackModel.matrixFactories.createTransportCostMatrix();
  raceTrackModel.country.reset();
  raceTrackCountryView.draw();
  view.notifyUpdateCountry();
});
raceTrackModel.setTransportCostEventListener(async () => {
  country.matrices.transportCostMatrix =
    raceTrackModel.matrixFactories.createTransportCostMatrix();
  raceTrackCountryView.draw();
  view.notifyUpdateCountry();
});

raceTrackModel.addTimeEventListener(() => {
  raceTrackCountryView.draw();
  view.barChartView.draw();
});
raceTrackCountryView.setModel(raceTrackModel);
raceTrackModel.setNumRegions(12);
registerApp(
  "raceTrack",
  () => {
    view.setModel(raceTrackModel);
    view.visualizerTypeSelector.priceIndexVisualizer.disabled = false;
    view.visualizerTypeSelector.nominalWageVisualizer.disabled = false;
    view.visualizerTypeSelector.realWageVisualizer.disabled = false;
    view.visualizerTypeSelector.avgRealWageVisualizer.disabled = false;
    raceTrackModel.notifyUpdateCountry();
  },
  () => {
    raceTrackModel?.stop();
  },
);

const graphCountryCanvas = document.getElementById(
  "graphCountryCanvas",
) as HTMLCanvasElement;
const regionViews = new RegionViews(
  graphCountryCanvas.width,
  graphCountryCanvas.height,
);
const graphCountryView = new GraphCountryView(graphCountryCanvas, regionViews);
const graphModel = new Model(
  new GraphMatrixFactories(country, regionViews, graphCountryCanvas),
  country,
  1.0,
  0.5,
);

regionViews.updateRegionViewsBySize(12);

graphModel.addNotifyFocusRegionEventListener(() => {
  graphCountryView.draw();
  view.barChartView.draw();
});

graphModel.addFocusRouteEventListener(() => {
  graphCountryView.draw();
  view.barChartView.draw();
});
graphModel.addCountryEventListener(async () => {
  regionViews.updateRegionViewsBySize(graphModel.country.regions.length);
  country.matrices.adjacencyMatrix =
    graphModel.matrixFactories.createAdjacencyMatrix();
  [country.matrices.distanceMatrix, country.matrices.predecessorMatrix] =
    await graphModel.matrixFactories.createDistanceMatrix();
  country.matrices.transportCostMatrix =
    graphModel.matrixFactories.createTransportCostMatrix();
  graphModel.country.reset();
  graphCountryView.draw();
  view.notifyUpdateCountry();
});

graphModel.setTransportCostEventListener(async () => {
  country.matrices.transportCostMatrix =
    raceTrackModel.matrixFactories.createTransportCostMatrix();
  graphCountryView.draw();
  view.notifyUpdateCountry();
});
graphModel.addTimeEventListener(() => {
  graphCountryView.draw();
  view.notifyUpdateTime();
});

graphCountryView.setModel(graphModel);
graphCountryView.fitToScreen();

registerApp(
  "graph",
  () => {
    view.setModel(graphModel);
    view.visualizerTypeSelector.priceIndexVisualizer.disabled = true;
    view.visualizerTypeSelector.nominalWageVisualizer.disabled = true;
    view.visualizerTypeSelector.realWageVisualizer.disabled = true;
    view.visualizerTypeSelector.avgRealWageVisualizer.disabled = true;
    graphModel.notifyUpdateCountry();
  },
  () => {
    graphModel?.stop();
  },
);

startGraphApp(false);
//startRaceTrackApp(false);
