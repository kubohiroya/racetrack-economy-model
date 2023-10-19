import { Country } from "@/model/country";
import { RegionViews } from "@/graph/regionViews";
import { RegionView } from "@/graph/regionView";
import { ShortestPathCalculator } from "@/apsp/shortestPathCalculator";
import { ShortestPathAlgorithm } from "@/apsp/shortestPathAlgorithm";
import { MatrixFactories } from "@/model/matrixFactories";
import {Route} from '@/graph/route'
import {generateTrafficRoutes} from '@/graph/generateTrafficRoutes'

const calculator = new ShortestPathCalculator();

// const cities: RegionView[] = [];
//const
//const desiredCityCount = 5;
//const desiredRouteCount = 8;
//const candidateCityCount = 3;

export class GraphMatrixFactories implements MatrixFactories {
  country: Country;
  regionViews: RegionViews;
  canvas: HTMLCanvasElement;
  routes: Route[];
  //private adjacencyMatrixSource: boolean[][] = [];

  constructor(
    country: Country,
    regionViews: RegionViews,
    canvas: HTMLCanvasElement,
  ) {
    this.country = country;
    this.regionViews = regionViews;
    this.canvas = canvas;
    this.routes = [];
  }

  /*
  private createAdjacencyMatrixSource(): boolean[][] {
    const numRegions = this.country.regions.length;

    const matrix: boolean[][] = new Array<boolean[]>(numRegions);
    for (let i = 0; i < numRegions; i++) {
      matrix[i] = new Array<boolean>(numRegions);
    }

    for (let i = 0; i < numRegions; i++) {
      for (let j = i; j < numRegions; j++) {
        if (i == j) {
          matrix[i][j] = false;
        } else if (
          i < this.adjacencyMatrixSource.length &&
          j < this.adjacencyMatrixSource.length
        ) {
          matrix[i][j] = matrix[j][i] = this.adjacencyMatrixSource[i][j];
        } else {
          matrix[i][j] = matrix[j][i] = Math.random() < 0.05;
        }
      }
    }
    return matrix;
  }
     */

  createAdjacencyMatrix(): number[][] {
    /*
    if (
      !this.adjacencyMatrixSource ||
      this.adjacencyMatrixSource.length != this.regionViews.regionViews.length
    ) {
      this.adjacencyMatrixSource = this.createAdjacencyMatrixSource();
    }
     */
    const {cities:updatedCities, routes: updatedRoutes} = generateTrafficRoutes(
      this.canvas.width,
      this.canvas.height,
      this.regionViews.regionViews,
      this.routes,
      this.regionViews.regionViews.length,
      this.regionViews.regionViews.length * 1.1,
    4,
    );

    const numRegions = this.regionViews.regionViews.length;
    const matrix = new Array<Array<number>>(numRegions);
    for (let i = 0; i < updatedCities.length; i++) {
      matrix[i] = new Array<number>(numRegions);
      matrix[i].fill(Number.POSITIVE_INFINITY);
      matrix[i][i] = 0;
    }

    for(const route of updatedRoutes){
      const view1 = this.regionViews.regionViews[route.start];
      const view2 = this.regionViews.regionViews[route.end];
      const distance = 1 +
        Math.round(
          Math.sqrt((view1.x - view2.x) ** 2 + (view1.y - view2.y) ** 2) /
          50,
        )
      matrix[route.start][route.end] = distance;
      matrix[route.end][route.start] = distance;
    }
    this.routes = updatedRoutes;
    return matrix;
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
}
