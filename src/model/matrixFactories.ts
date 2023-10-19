export interface MatrixFactories {
  createAdjacencyMatrix: () => number[][];
  createDistanceMatrix: () => Promise<number[][][]>;
  createTransportCostMatrix: () => number[][];
}
