import { ShortestPathAlgorithm } from "@/apsp/shortestPathAlgorithm";
import { FloydWarshallGPU } from "@/apsp/floydWarshallGPU";
import { FloydWarshall } from "@/apsp/floydWarshall";

export class ShortestPathCalculator {
  private floydWarshall: FloydWarshall | undefined;
  private floydWarshallGPU: FloydWarshallGPU | undefined;

  constructor() {}

  async computeShortestPaths(
    algorithm: ShortestPathAlgorithm,
    matrix: number[][],
    matrixSize: number,
  ): Promise<number[][][]> {
    switch (algorithm) {
      case ShortestPathAlgorithm.FloydWarshall:
        if (!this.floydWarshall) {
          this.floydWarshall = new FloydWarshall();
        }
        return this.floydWarshall.computeShortestPaths(matrix);
      case ShortestPathAlgorithm.FloydWarshallGPU:
        if (!this.floydWarshallGPU) {
          this.floydWarshallGPU = new FloydWarshallGPU();
        }
        return await this.floydWarshallGPU.computeShortestPaths(
          matrix,
          matrixSize,
        );
      case ShortestPathAlgorithm.Johnson:
        return Promise.resolve([]); // 簡略化のため空の配列を返す
      default:
        throw new Error("Unsupported algorithm");
    }
  }
}
