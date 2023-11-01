import { DiagonalMatrixView } from "./diagonalMatrixView";
import { Model } from "@/model/model";
import { SelectType } from "@/model/selectType";

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
    this.update();
  }

  updateTableSize(numRegions: number) {
    this.adjacencyMatrix.adjustTableSize(numRegions, numRegions, max, max);
    this.distanceMatrix.adjustTableSize(numRegions, numRegions, max, max);
    this.transportCostMatrix.adjustTableSize(numRegions, numRegions, max, max);
  }

  async updateTableContent() {
    if (!this.model) return;
    [
      {
        table: this.adjacencyMatrix,
        matrix: this.model.country.matrices.adjacencyMatrix,
      },
      {
        table: this.distanceMatrix,
        matrix: this.model.country.matrices.distanceMatrix,
      },
      {
        table: this.transportCostMatrix,
        matrix: this.model.country.matrices.transportCostMatrix,
      },
    ].forEach((entry) => {
      const { table, matrix } = entry;
      table.setTableContent(matrix, max, max, (value: number) =>
        value == Number.POSITIVE_INFINITY ? "Inf" : value?.toFixed(1),
      );
    });
  }

  decorateTable(
    sourceId: string,
    rowIndex: number,
    columnIndex: number,
    type: SelectType,
    set: boolean,
  ): void {
    this.adjacencyMatrix.decorateTable(type, rowIndex, columnIndex, set);
    this.distanceMatrix.decorateTable(type, rowIndex, columnIndex, set);
    this.transportCostMatrix.decorateTable(type, rowIndex, columnIndex, set);
  }

  async update() {
    if (this.model) {
      this.updateTableSize(this.model.country.regions.length);
      await this.updateTableContent();
    }
  }
}
