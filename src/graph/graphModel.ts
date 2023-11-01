import { Node } from "./node";
import { Model } from "@/model/model";
import { createRandomNode } from "@/graph/createRandomNode";
import { Country } from "@/model/country";
import { ShortestPathAlgorithm } from "@/apsp/shortestPathAlgorithm";
import { ShortestPathCalculator } from "@/apsp/shortestPathCalculator";
import { Route } from "@/graph/route";
import { Region } from "@/model/region";
import {
  createEdgesBetweenSelectedNodes,
  createRandomEdges,
  removeEdgesBetweenSelectedNodes,
} from "@/graph/createRandomEdges";

const calculator = new ShortestPathCalculator();

export class GraphModel extends Model {
  nodes: Node[];
  routes: Route[];
  graphUpdateListeners: (() => void)[];
  adjacencyMatrixChangeListeners: (() => void)[];
  private canvas: HTMLCanvasElement;

  constructor(
    country: Country,
    barChartScale: number,
    canvas: HTMLCanvasElement,
  ) {
    super(country, barChartScale);
    this.canvas = canvas;
    this.nodes = [];
    this.routes = [];
    this.graphUpdateListeners = [];
    this.adjacencyMatrixChangeListeners = [];
  }

  /**
   *
   * @param listener
   */

  addGraphUpdateListener(listener: () => void) {
    this.graphUpdateListeners.push(listener);
  }

  notifyGraphUpdate() {
    this.graphUpdateListeners.forEach((listener) => listener());
  }

  addAdjacencyMatrixListener(listener: () => void) {
    this.adjacencyMatrixChangeListeners.push(listener);
  }

  notifyAdjacencyMatrixChanged() {
    this.adjacencyMatrixChangeListeners.forEach((listener) => listener());
  }

  findClosestElementId(ox: number, oy: number): number | null {
    if (this.nodes.length === 0) return null;

    let closestPoint: Node | null = null;
    let minDistance = Number.POSITIVE_INFINITY;

    for (let point of this.nodes) {
      const currentDistance = this.distance(ox, oy, point.x, point.y);
      if (currentDistance < point.radius + 2 && currentDistance < minDistance) {
        minDistance = currentDistance;
        closestPoint = point;
      }
    }
    return closestPoint ? closestPoint.id : null;
  }

  createAdjacencyMatrix(desiredNumRegions: number): number[][] {
    const prevNumRegions = this.country.regions.length;
    // create new matrix with copied block storing old nodes and empty margins for new nodes
    const newAdjacencyMatrix = new Array<Array<number>>(desiredNumRegions);
    for (let i = 0; i < desiredNumRegions; i++) {
      const row = new Array<number>(desiredNumRegions);
      row.fill(Number.POSITIVE_INFINITY);
      if (i < prevNumRegions) {
        for (let j = 0; j < desiredNumRegions; j++) {
          if (
            this.country.matrices.adjacencyMatrix &&
            this.country.matrices.adjacencyMatrix[i] &&
            this.country.matrices.adjacencyMatrix[i][j]
          ) {
            if (
              0 < this.country.matrices.adjacencyMatrix[i][j] &&
              this.country.matrices.adjacencyMatrix[i][j] <
                Number.POSITIVE_INFINITY &&
              this.nodes[i] &&
              this.nodes[j]
            ) {
              const distance = Math.sqrt(
                (this.nodes[i].x - this.nodes[j].x) ** 2 +
                  (this.nodes[i].y - this.nodes[j].y) ** 2,
              );
              row[j] = distance;
            }
          }
        }
      }
      row[i] = 0;
      newAdjacencyMatrix[i] = row;
    }

    const autoConnectToPrevNode = true;
    if (autoConnectToPrevNode && 1 < prevNumRegions && 1 < this.nodes.length) {
      for (let i = prevNumRegions; 1 <= i && i < desiredNumRegions; i++) {
        if (this.nodes[i] && this.nodes[i - 1]) {
          const distance = Math.sqrt(
            (this.nodes[i].x - this.nodes[i - 1].x) ** 2 +
              (this.nodes[i].y - this.nodes[i - 1].y) ** 2,
          );
          newAdjacencyMatrix[i][i - 1] = distance;
          newAdjacencyMatrix[i - 1][i] = distance;
        }
      }
    }
    return newAdjacencyMatrix;
  }

  async createDistanceMatrix(): Promise<number[][][]> {
    const matrix = this.country.matrices.adjacencyMatrix;
    const matrixSize = matrix.length;
    return calculator.computeShortestPaths(
      ShortestPathAlgorithm.FloydWarshall,
      matrix,
      matrixSize,
    );
  }

  createTransportCostMatrix(): number[][] {
    const numRegions = this.country.matrices.distanceMatrix.length;
    let max = 0;
    for (let i = 0; i < numRegions; i++) {
      if (
        this.country.matrices.distanceMatrix &&
        i < this.country.matrices.distanceMatrix.length
      ) {
        for (let j = 0; j < numRegions; j++) {
          if (j < this.country.matrices.distanceMatrix[i].length) {
            if (
              this.country.matrices.distanceMatrix[i][j] !=
              Number.POSITIVE_INFINITY
            ) {
              max = Math.max(this.country.matrices.distanceMatrix[i][j], max);
            }
          }
        }
      }
    }

    const matrix: number[][] = new Array<number[]>(numRegions);
    for (let i = 0; i < numRegions; i++) {
      matrix[i] = new Array<number>(numRegions);
    }

    if (max == 0) {
      return matrix;
    }

    const logTransportCost = Math.log(this.country.transportCost);

    for (let i = 0; i < numRegions; i++) {
      if (
        this.country.matrices.distanceMatrix &&
        i < this.country.matrices.distanceMatrix.length
      ) {
        for (let j = i; j < numRegions; j++) {
          if (j < this.country.matrices.distanceMatrix[i].length) {
            if (
              this.country.matrices.distanceMatrix[i][j] !=
              Number.POSITIVE_INFINITY
            ) {
              const dist = this.country.matrices.distanceMatrix[i][j] / max;
              matrix[j][i] = matrix[i][j] = Math.exp(logTransportCost * dist);
            } else {
              matrix[j][i] = matrix[i][j] = Number.POSITIVE_INFINITY;
            }
          }
        }
      }
    }
    return matrix;
  }

  async addEdge(selectedRegionIds: number[]) {
    if (this.selectedRegionIds.length < 2) {
      return;
    }
    for (let i = 0; i < this.selectedRegionIds.length; i++) {
      const node0 = this.nodes[this.selectedRegionIds[i]];
      const node1 =
        i != this.selectedRegionIds.length - 1
          ? this.nodes[this.selectedRegionIds[i + 1]]
          : this.nodes[0];
      this.country.matrices.adjacencyMatrix = createEdgesBetweenSelectedNodes(
        node0,
        node1,
        this.country.matrices.adjacencyMatrix,
      );
    }
    this.updateMatrices();
  }

  async removeEdge(selectedRegionIds: number[]) {
    if (this.selectedRegionIds.length == 0) {
      return;
    }
    for (let i = 0; i < this.selectedRegionIds.length; i++) {
      const node0 = this.nodes[this.selectedRegionIds[i]];
      const node1 =
        i != this.selectedRegionIds.length - 1
          ? this.nodes[this.selectedRegionIds[i + 1]]
          : this.nodes[0];
      this.country.matrices.adjacencyMatrix = removeEdgesBetweenSelectedNodes(
        node0,
        node1,
        this.country.matrices.adjacencyMatrix,
      );
    }
    this.updateMatrices();
  }

  appendRegions(numAddingRegions: number, initialize?: boolean) {
    const inverseTransform = this.canvas
      .getContext("2d")!
      .getTransform()
      .inverse();
    const center = inverseTransform.transformPoint(
      new DOMPoint(this.canvas.width / 2, this.canvas.height / 2),
    );
    const topLeft = inverseTransform.transformPoint(new DOMPoint(0, 0));
    const bottomRight = inverseTransform.transformPoint(
      new DOMPoint(this.canvas.width, this.canvas.height),
    );

    const desiredNumRegions = numAddingRegions + this.country.regions.length;
    for (let i = this.nodes.length; i < desiredNumRegions; i++) {
      const node = createRandomNode(
        i,
        topLeft,
        bottomRight,
        i == 0 ? center : this.nodes[i - 1],
      );
      this.nodes.push(node);
    }

    for (let i = 0; i < this.country.regions.length; i++) {
      this.country.regions[i].manufacturingShare = 1.0 / desiredNumRegions;
      this.country.regions[i].agricultureShare = 1.0 / desiredNumRegions;
    }
    for (let i = this.country.regions.length; i < desiredNumRegions; i++) {
      this.country.regions.push(
        new Region(i, 1.0 / desiredNumRegions, 1.0 / desiredNumRegions),
      );
    }

    this.country.disturb();
    this.country.matrices.adjacencyMatrix = this.country.matrices.create2DArray(
      desiredNumRegions,
      this.country.matrices.adjacencyMatrix,
    );

    const numAddingEdges = initialize
      ? Math.ceil(Math.sqrt(this.country.regions.length * 2)) * 5
      : 1;
    if (numAddingRegions > 1) {
      createRandomEdges(
        this.country.regions,
        this.nodes,
        this.country.matrices.adjacencyMatrix,
        numAddingEdges,
      );
    } else {
      if (this.selectedRegionIds.length > 0) {
        const sourceNodeId =
          this.selectedRegionIds[this.selectedRegionIds.length - 1];
        const sourceNode = this.nodes[sourceNodeId];
        const addedNode = this.nodes[this.nodes.length - 1];
        this.country.matrices.adjacencyMatrix = createEdgesBetweenSelectedNodes(
          sourceNode,
          addedNode,
          this.country.matrices.adjacencyMatrix,
        );
      }
    }
    this.updateMatrices();
  }

  extractRegions(extractingRegionIds: number[]) {
    this.nodes = this.nodes.filter((node) =>
      extractingRegionIds.includes(node.id),
    );
    this.nodes.forEach((node, index) => (node.id = index));
    this.country.regions = this.country.regions.filter((region) =>
      extractingRegionIds.includes(region.id),
    );
    this.country.regions.forEach((region, index) => (region.id = index));
    this.country.matrices.adjacencyMatrix =
      this.country.matrices.extractDiagonal(
        this.country.matrices.adjacencyMatrix,
        extractingRegionIds,
      );
    this.updateMatrices();
  }

  private distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  updateMatrices() {
    (async () => {
      [
        this.country.matrices.distanceMatrix,
        this.country.matrices.predecessorMatrix,
      ] = await this.createDistanceMatrix();
      this.country.matrices.transportCostMatrix =
        this.createTransportCostMatrix();
      this.notifyAdjacencyMatrixChanged();
      // this.notifyGraphUpdate();
    })();
  }
}
