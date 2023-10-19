import { DiagonalMatrixView } from "./diagonalMatrixView";
import { Model } from "../model/model";

const max = 21;

export class DiagonalMatrixViewSet {
  adjacencyMatrix: DiagonalMatrixView;
  distanceMatrix: DiagonalMatrixView;
  transportCostMatrix: DiagonalMatrixView;
  model: Model | undefined;

  constructor() {
    this.adjacencyMatrix = new DiagonalMatrixView("adjacencyMatrix");
    this.distanceMatrix = new DiagonalMatrixView("distanceMatrix");
    this.transportCostMatrix = new DiagonalMatrixView("transportCostMatrix");
  }

  setModel(model: Model) {
    this.model = model;
    this.adjacencyMatrix.setModel(model);
    this.distanceMatrix.setModel(model);
    this.transportCostMatrix.setModel(model);
    this.updateTableSize(model.country.regions.length);
    this.updateTableContent();
  }

  updateTableSize(numRegions: number) {
    this.adjacencyMatrix.adjustTableSize(numRegions, numRegions, max, max);
    this.distanceMatrix.adjustTableSize(numRegions, numRegions, max, max);
    this.transportCostMatrix.adjustTableSize(numRegions, numRegions, max, max);
  }

  async updateTableContent() {
    if (!this.model) return;
    const adjacencyMatrix = this.model.country.matrices.adjacencyMatrix;
    this.adjacencyMatrix.setTableContent(
      adjacencyMatrix,
      max,
      max,
      (value: number) =>
        value == Number.POSITIVE_INFINITY ? "Inf" : value.toFixed(1),
    );

    const distanceMatrix = this.model.country.matrices.distanceMatrix;
    if (!this.model) return;
    this.distanceMatrix.setTableContent(
      distanceMatrix,
      max,
      max,
      (value: number) =>
        value == Number.POSITIVE_INFINITY ? "Inf" : value?.toFixed(1),
    );

    const transportCostMatrix = this.model.country.matrices.transportCostMatrix;
    this.transportCostMatrix.setTableContent(
      transportCostMatrix,
      max,
      max,
      (value: number) =>
        value == Number.POSITIVE_INFINITY
          ? "Inf"
          : Number.isNaN(value)
          ? ""
          : value?.toFixed(2),
    );
  }

  async update() {
    this.updateTableSize(this.model!.country.regions.length);
    await this.updateTableContent();
  }
}
