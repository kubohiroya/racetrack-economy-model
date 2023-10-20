const BLOCK_SIZE = 16;

export class FloydWarshall {
  computeShortestPaths(adjacencyMatrix: number[][]): number[][][] {
    const n = adjacencyMatrix.length;
    const distanceMatrix: number[][] = new Array(n);
    const predecessor: number[][] = new Array(n);

    for (let i = 0; i < n; i++) {
      distanceMatrix[i] = new Array(n);
      predecessor[i] = new Array(n);
      for (let j = 0; j < n; j++) {
        distanceMatrix[i][j] = adjacencyMatrix[i][j];
        predecessor[i][j] = j;
      }
    }

    for (let kBlock = 0; kBlock < n; kBlock += BLOCK_SIZE) {
      for (let iBlock = 0; iBlock < n; iBlock += BLOCK_SIZE) {
        for (let jBlock = 0; jBlock < n; jBlock += BLOCK_SIZE) {
          for (let k = kBlock; k < Math.min(n, kBlock + BLOCK_SIZE); k++) {
            for (let i = iBlock; i < Math.min(n, iBlock + BLOCK_SIZE); i++) {
              for (let j = jBlock; j < Math.min(n, jBlock + BLOCK_SIZE); j++) {
                if (
                  distanceMatrix[i][k] + distanceMatrix[k][j] <
                  distanceMatrix[i][j]
                ) {
                  distanceMatrix[i][j] =
                    distanceMatrix[i][k] + distanceMatrix[k][j];
                  predecessor[i][j] = predecessor[i][k];
                }
              }
            }
          }
        }
      }
    }

    // 境界ブロックの処理
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (
            distanceMatrix[i][k] + distanceMatrix[k][j] <
            distanceMatrix[i][j]
          ) {
            distanceMatrix[i][j] = distanceMatrix[i][k] + distanceMatrix[k][j];
            predecessor[i][j] = predecessor[i][k];
          }
        }
      }
    }

    return [distanceMatrix, predecessor];
  }
}
