export class Matrices {
  adjacencyMatrix: number[][];
  predecessorMatrix: number[][];
  distanceMatrix: number[][];
  transportCostMatrix: number[][];

  constructor(numRegions: number /*, matrices?: Matrices*/) {
    this.adjacencyMatrix = this.create2DArray(numRegions);
    this.predecessorMatrix = this.create2DArray(numRegions);
    this.distanceMatrix = this.create2DArray(numRegions);
    this.transportCostMatrix = this.create2DArray(numRegions);
  }

  create2DArray(n: number, defaultValues?: number[][]) {
    const ret = new Array<Array<number>>(n);
    for (let i = 0; i < n; i++) {
      ret[i] = new Array<number>(n);
      if (defaultValues && defaultValues[i]) {
        for (let j = 0; j < n; j++) {
          if (defaultValues[i][j]) {
            ret[i][j] = defaultValues[i][j];
          }
        }
      }
    }
    return ret;
  }
}
