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
      ret[i].fill(Number.POSITIVE_INFINITY);
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

  extractDiagonal(matrix: number[][], indices: number[]): number[][] {
    const result: number[][] = [];
    indices.forEach((i, rowIndex) => {
      const newRow: number[] = Array(indices.length);
      indices.forEach((j, columnIndex) => {
        if (matrix[i] && matrix[i][j]) {
          newRow[columnIndex] = matrix[i][j];
        }
      });
      newRow[i] = 0;
      result.push(newRow);
    });
    return result;
  }

  resizeMatrix(source: number[][], num: number): number[][] {
    const ret = new Array<Array<number>>(num);
    for (let i = 0; i < num; i++) {
      ret[i] = new Array<number>(num);
      for (let j = 0; j < num; j++) {
        if (i < source.length && j < source[i].length) {
          ret[i][j] = source[i][j];
        } else if (i == j) {
          ret[i][j] = 0;
        } else {
          ret[i][j] = Number.POSITIVE_INFINITY;
        }
      }
    }
    return ret;
  }
}
