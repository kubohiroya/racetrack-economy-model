import {
  fastButton,
  fastDialog,
  fastRadio,
  fastRadioGroup,
  fastSlider,
  fastSliderLabel,
  fastTooltip,
  provideFASTDesignSystem,
} from "@microsoft/fast-components";

import "./appSelector";
import { RaceTrackView } from "./raceTrack/raceTrackView";
import { registerApp, startGraphApp, startRaceTrackApp } from "./appSelector";
import { GraphView } from "./graph/graphView";
import { View } from "./view/view";
import { Country } from "./model/country";
import { GraphModel } from "@/graph/graphModel";
import { Timer } from "@/model/timer";
import { RaceTrackModel } from "@/raceTrack/raceTrackModel";
import { SpringGraphLayout } from "@/graph/springGraphLayout";
import { SelectType } from "@/model/selectType";

provideFASTDesignSystem().register(
  fastTooltip(),
  fastButton(),
  fastRadio(),
  fastRadioGroup(),
  fastDialog(),
  fastSlider({
    thumb: `<div style="background-color: #fff; border: 1px solid #777;border-radius: 3px; width: 16px; height: 16px; "></div>`,
  }),
  fastSliderLabel(),
);

const params = new URLSearchParams(location.search);
const app = params.get("app") || "raceTrack";//"graph"; //;
const numRegions = parseInt(params.get("K") || "12");
const pi = parseFloat(params.get("pi") || "0.2");
const tau = parseFloat(params.get("tau") || "2");
const sigma = parseFloat(params.get("sigma") || "4");

const view = new View();

function layout() {
  const canvasDivContainer = document.getElementById(
    "canvasDivContainer",
  ) as HTMLDivElement;

  const raceTrackCanvas = document.getElementById("raceTrackCanvas");
  const graphCanvas = document.getElementById("graphCanvas");

  const barChartCanvas = document.getElementById("barChartCanvas");

  const w = canvasDivContainer.clientWidth - 30;
  raceTrackCanvas!.setAttribute("width", `${w * 0.65}`);
  graphCanvas!.setAttribute("width", `${w * 0.65}`);
  barChartCanvas!.setAttribute("width", `${w * 0.35}`);

  const h = 500;
  raceTrackCanvas!.setAttribute("height", `${h}`);
  graphCanvas!.setAttribute("height", `${h}`);
  barChartCanvas!.setAttribute("height", `${h}`);
}

function decorateTableSet(
  sourceId: string,
  regionIds: number[],
  type: SelectType,
  set: boolean,
) {
  for (let i = 0; i < regionIds.length; i++) {
    for (let j = 0; j < regionIds.length; j++) {
      view.diagonalTableViewSet.decorateTable(
        sourceId,
        regionIds[i] + 1,
        regionIds[j] + 1,
        type,
        set,
      );
    }
  }
}

function initRaceTrack() {
  const country = new Country(numRegions, pi, tau, sigma);
  const raceTrackModel = new RaceTrackModel(country, 1.0);

  const raceTrackView = new RaceTrackView();
  raceTrackView.setModel(raceTrackModel);

  raceTrackModel.addResetListener(() => {
    raceTrackView.draw();
    view.barChartView.draw();
  });

  raceTrackModel.addRegionSelectListener(
    (sourceId: string, regionIds: number[], type: SelectType, set: boolean) => {
      decorateTableSet(sourceId, regionIds, type, set);
      if (set) {
        raceTrackModel.focusedRegionIds = regionIds;
      } else {
        raceTrackModel.focusedRegionIds = [];
      }
      view.barChartView.draw();
      raceTrackView.draw();
    },
  );

  raceTrackModel.addNumRegionsChangedListener(async () => {
    const numRegions = view.sliderSet.numRegionsSlider.valueAsNumber;
    await raceTrackModel.adjustRegions(numRegions);
    raceTrackModel.updateAdjacencyMatrix();
    await raceTrackModel.updateDistanceMatrixAndTransportCostMatrix();

    raceTrackModel.country.resetRegions();
    raceTrackView.draw();
    await view.update();
  });

  raceTrackModel.addTransportCostChangeListener(async () => {
    country.matrices.transportCostMatrix =
      raceTrackModel.createTransportCostMatrix();
    raceTrackView.draw();
    await view.update();
  });

  raceTrackModel.timer?.addTimeEventListener(() => {
    raceTrackView.draw();
    view.barChartView.draw();
  });

  window.addEventListener("resize", () => {
    raceTrackView.draw();
  });

  registerApp(
    "raceTrack",
    () => {
      view.setModel(raceTrackModel);
      raceTrackModel.notifyNumRegionsChanged();
      view.visualizerTypeSelector.priceIndexVisualizer.disabled = false;
      view.visualizerTypeSelector.nominalWageVisualizer.disabled = false;
      view.visualizerTypeSelector.realWageVisualizer.disabled = false;
      view.visualizerTypeSelector.avgRealWageVisualizer.disabled = false;
      view.update();
    },
    () => {
      raceTrackModel?.stop();
    },
  );
}

async function initGraph() {
  const graphCanvas = document.getElementById(
    "graphCanvas",
  ) as HTMLCanvasElement;

  const country = new Country(numRegions, pi, tau, sigma);

  const model = new GraphModel(country, 1.0, graphCanvas);

  const graphView = new GraphView(graphCanvas, model);

  const graphLayout = new SpringGraphLayout(
    model,
    model.nodes,
    graphCanvas.width,
    graphCanvas.height,
  );

  model.addStartListener(() => {
    graphView.updateGraphEditorButtonState();
  });
  model.addStopListener(() => {
    graphView.updateGraphEditorButtonState();
  });
  model.addResetListener(() => {
    graphView.draw();
    view.barChartView.draw();
  });

  model.addRegionSelectListener(
    (sourceId: string, regionIds: number[], type: SelectType, set: boolean) => {
      decorateTableSet(sourceId, regionIds, type, set);

      if (set) {
        if (type == SelectType.FOCUSED) {
          model.focusedRegionIds = regionIds;
        } else if (type == SelectType.SELECTED) {
          model.selectedRegionIds = regionIds;
        }
      } else {
        if (type == SelectType.FOCUSED) {
          model.focusedRegionIds = [];
        } else {
          model.selectedRegionIds = [];
        }
      }

      graphView.draw();
      view.barChartView.draw();
    },
  );

  model.addNumRegionsChangedListener(async () => {
    await model.adjustRegions(country.numRegions);
    model.updateAdjacencyMatrix();
    await model.updateDistanceMatrixAndTransportCostMatrix();
    await view.diagonalTableViewSet.updateTableContent();
    model.country.resetRegions();
    graphView.draw();
    view.sliderSet.numRegionsElem.innerText = `${model.nodes.length}`;
    await view.update();
  });

  model.addGraphUpdateListener(async () => {
    model.updateAdjacencyMatrix();
    await model.updateDistanceMatrixAndTransportCostMatrix();
    await view.diagonalTableViewSet.updateTableContent();

    /*
    model.notifyRegionSelect(
      "graphView",
      model.selectedRegionIds,
      SelectType.SELECTED,
      false,
    );
    model.selectedRegionIds = [];
     */

    graphView.draw();
    await view.update();
  });

  model.addAdjacencyMatrixListener(async () => {
    await view.diagonalTableViewSet.updateTableContent();
    await view.update();
    graphView.draw();
  });

  model.addTransportCostChangeListener(async () => {
    await view.diagonalTableViewSet.updateTableContent();
    await view.update();
    graphView.draw();
  });

  model.timer?.addTimeEventListener(async () => {
    graphView.draw();
    view.tick();
  });

  graphView.setModel(model);
  model.appendRegions(country.numRegions, true);
  graphView.fitToScreen();
  graphView.draw();

  window.addEventListener("resize", () => {
    graphLayout.reset();
    graphView.draw();
  });

  registerApp(
    "graph",
    () => {
      view.setModel(model);
      model.setNumRegions(numRegions);

      view.visualizerTypeSelector.priceIndexVisualizer.disabled = true;
      view.visualizerTypeSelector.nominalWageVisualizer.disabled = true;
      view.visualizerTypeSelector.realWageVisualizer.disabled = true;
      view.visualizerTypeSelector.avgRealWageVisualizer.disabled = true;

      Timer.getLayoutTimer().start();
      view.update();
    },
    () => {
      model?.stop();
    },
  );
}

window.addEventListener("resize", () => {
  layout();
  view.barChartView.draw();
});

window.addEventListener("load", async () => {
  layout();
  initRaceTrack();
  await initGraph();

  switch (app) {
    case "raceTrack":
      startRaceTrackApp(false);
      break;
    case "graph":
    default:
      startGraphApp(false);
      break;
  }
});
