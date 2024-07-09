import { Model } from "@/model/model";
import { Region } from "@/model/region";

export class RaceTrackModel extends Model {
  createAdjacencyMatrix(numRegions: number): number[][] {
    //const numRegions = this.country.regions.length;
    const matrix: number[][] = new Array<number[]>(numRegions);

    if (numRegions == 0) {
      return [[]];
    }

    for (let i = 0; i < numRegions; i++) {
      matrix[i] = new Array<number>(numRegions);
    }

    matrix[0].fill(Number.POSITIVE_INFINITY);
    matrix[0][0] = 0;

    for (let i = 1; i < numRegions; i++) {
      matrix[i].fill(Number.POSITIVE_INFINITY);
      matrix[i][i] = 0;
      matrix[i - 1][i] = 1;
      matrix[i][i - 1] = 1;
    }
    matrix[numRegions - 1][0] = 1;
    matrix[0][numRegions - 1] = 1;
    return matrix;
  }

  async createDistanceMatrix(): Promise<number[][][]> {
    const numRegions = this.country.regions.length;
    const matrix: number[][] = new Array<number[]>(numRegions);
    const predecessor: number[][] = new Array<number[]>(numRegions);
    for (let i = 0; i < numRegions; i++) {
      matrix[i] = new Array<number>(numRegions);
      predecessor[i] = new Array<number>(numRegions);
      for (let j = 0; j < numRegions; j++) {
        if (i === j) {
          matrix[i][j] = 0;
          predecessor[i][j] = i;
        } else {
          // 時計回りの距離と反時計回りの距離を計算し、短い方を選ぶ
          const clockwiseDistance = Math.abs(j - i);
          const counterClockwiseDistance = numRegions - clockwiseDistance;
          matrix[i][j] = Math.min(clockwiseDistance, counterClockwiseDistance);

          predecessor[i][j] =
            clockwiseDistance < counterClockwiseDistance ? i + 1 : i - 1;
          predecessor[i][j] =
            predecessor[i][j] == -1
              ? numRegions - 1
              : predecessor[i][j] == numRegions
              ? 0
              : predecessor[i][j];
        }
      }
    }
    return [matrix, predecessor];
  }

  createTransportCostMatrix(): number[][] {
    const numRegions = this.country.regions.length;
    const matrix: number[][] = new Array<number[]>(numRegions);
    for (let i = 0; i < numRegions; i++) {
      matrix[i] = new Array<number>(numRegions);
    }
    const logTransportCost = Math.log(this.country.transportCost);
    for (let i = 0; i < numRegions; i++) {
      if (this.country.matrices.distanceMatrix[i]) {
        for (let j = i; j < numRegions; j++) {
          const dist =
            (2.0 * this.country.matrices.distanceMatrix[i][j]) / numRegions;
          matrix[i][j] = matrix[j][i] = Math.exp(logTransportCost * dist);
        }
      }
    }
    return matrix;
  }

  appendRegions(numRegions: number): void {
    const regions = new Array<Region>();
    if (this.country.regions) {
      for (const region of this.country.regions) {
        region.manufacturingShare = 1.0 / numRegions;
        region.agricultureShare = 1.0 / numRegions;
        regions.push(region);
      }
    }
    for (let i = regions.length; i < numRegions; i++) {
      regions.push(
        new Region(regions.length, 1.0 / numRegions, 1.0 / numRegions),
      );
    }
    this.country.regions = regions;
  }

  extractRegions(numRegions: number): void {
    const regions = this.country.regions.slice(0, numRegions);
    for (const region of regions) {
      region.manufacturingShare = 1.0 / numRegions;
      region.agricultureShare = 1.0 / numRegions;
    }
    this.country.regions = regions;
    console.log(
      " extractRegions",
      numRegions,
      regions.length,
      this.country.regions.length,
    );
  }
}
