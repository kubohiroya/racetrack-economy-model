import { RegionView } from "./regionView";

export class RegionViews {
  width: number;
  height: number;
  regionViews: RegionView[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.regionViews = [];
  }

  createRegionView(id: number): RegionView {
    return new RegionView(
      id,
      this.width * Math.random(),
      this.height * Math.random(),
    );
  }

  updateRegionViewsBySize(numRegions: number) {
    if (this.regionViews.length < numRegions) {
      while (this.regionViews.length < numRegions) {
        this.regionViews.push(this.createRegionView(this.regionViews.length));
      }
    } else if (numRegions < this.regionViews.length) {
      this.regionViews = this.regionViews.slice(0, numRegions - 1);
    }
    // this.matrices = new Matrices(numRegions);
    // this.disturb();
  }

  findClosestElementId(ox: number, oy: number): number | null {
    if (this.regionViews.length === 0) return null;

    let closestPoint: RegionView | null = null;
    let minDistance = Number.POSITIVE_INFINITY;

    for (let point of this.regionViews) {
      const currentDistance = this.distance(ox, oy, point.x, point.y);
      if (currentDistance < point.radius && currentDistance < minDistance) {
        minDistance = currentDistance;
        closestPoint = point;
      }
    }
    return closestPoint ? closestPoint.id : null;
  }

  distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
