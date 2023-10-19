import { ShortestPathAlgorithm } from "@/apsp/shortestPathAlgorithm";
import { ShortestPathCalculator } from "@/apsp/shortestPathCalculator";

async function test() {
  const INF = Number.POSITIVE_INFINITY;
  const matrix: number[][] = [
    [0, INF, 5],
    [INF, 0, 2],
    [INF, INF, 0],
  ];
  const matrixSize = matrix.length;
  const calculator = new ShortestPathCalculator();
  const results = await calculator.computeShortestPaths(
    ShortestPathAlgorithm.FloydWarshallGPU,
    matrix,
    matrixSize,
  );
}
