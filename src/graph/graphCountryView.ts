import {
  Gesture,
  NormalizedWheelEvent,
  twoFingers,
} from "@skilitics/two-fingers";

import { Model } from "@/model/model";
import { Region } from "@/model/region";
import { RegionViews } from "@/graph/regionViews";
import { NodeViewMode } from "@/graph/nodeViewMode";

export class GraphCountryView {
  canvas: HTMLCanvasElement;
  addNodeButton: HTMLButtonElement;
  removeNodeButton: HTMLButtonElement;
  addEdgeButton: HTMLButtonElement;
  removeEdgeButton: HTMLButtonElement;

  ctx: CanvasRenderingContext2D;
  init_m: DOMMatrix = new DOMMatrix();
  origin: { x: number; y: number } | null = null;

  isDragging = false;

  model: Model | undefined;
  regionViews: RegionViews;
  mouseDownPoint: DOMPoint | null = null;

  constructor(canvas: HTMLCanvasElement, regionViews: RegionViews) {
    this.canvas = canvas;
    this.regionViews = regionViews;
    this.addNodeButton = document.getElementById(
      "addNodeButton",
    ) as HTMLButtonElement;
    this.removeNodeButton = document.getElementById(
      "removeNodeButton",
    ) as HTMLButtonElement;
    this.addEdgeButton = document.getElementById(
      "addEdgeButton",
    ) as HTMLButtonElement;
    this.removeEdgeButton = document.getElementById(
      "removeEdgeButton",
    ) as HTMLButtonElement;

    const fitButton = document.getElementById("fitButton");

    fitButton!.addEventListener("click", () => {
      this.fitToScreen();
    });

    this.addNodeButton!.disabled = true;
    this.removeNodeButton!.disabled = true;
    this.addEdgeButton!.disabled = true;
    this.removeEdgeButton!.disabled = true;

    this.ctx = this.canvas.getContext("2d")!;

    if (this.canvas instanceof HTMLElement) {
      this.canvas.style.transformOrigin = "0 0";
    }
    this.canvas.addEventListener(
      "mousedown",
      (ev: MouseEvent) => this.onMouseDown(ev),
      { passive: false },
    );
    this.canvas.addEventListener(
      "mousemove",
      (ev: MouseEvent) => this.onMouseMove(ev),
      { passive: false },
    );
    this.canvas.addEventListener(
      "mouseup",
      (ev: MouseEvent) => this.onMouseUp(ev),
      { passive: false },
    );
    this.canvas.addEventListener(
      "mouseout",
      () => {
        if (!this.model) return;
        this.model.focusedRegionIndex = -1;
        this.model.notifyFocusRegion();
      },
      { passive: false },
    );

    /*
    function rawScaleToRealScale(sliderValue: number): number {
      if (sliderValue <= 1.0) {
        return 0.5 + 1.5 * sliderValue; // 0.5 to 2.0 for slider values from 0.0 to 1.0
      } else {
        return 2.0 + 2.0 * Math.pow(sliderValue - 1, 2); // 2.0 to 4.0 for slider values from 1.0 to 2.0
      }
    }

    function getMaxScale(matrix: DOMMatrix): number {
      return Math.max(Math.abs(matrix.a), Math.abs(matrix.d));
    }
     */

    function getOrigin(el: Element, gesture: Gesture) {
      if (el instanceof HTMLElement) {
        let rect = el.getBoundingClientRect();
        return {
          x: gesture.origin.x - rect.x,
          y: gesture.origin.y - rect.y,
        };
      }
      if (el instanceof SVGElement && el.ownerSVGElement) {
        const domMatrix = el.ownerSVGElement.getScreenCTM();
        if (domMatrix) {
          let matrix = domMatrix.inverse();
          let pt = new DOMPoint(gesture.origin.x, gesture.origin.y);
          return pt.matrixTransform(matrix);
        }
      }
      throw new Error("Expected HTML or SVG element");
    }

    function gestureToMatrix(
      gesture: Gesture,
      origin: { x: number; y: number },
    ) {
      return new DOMMatrix()
        .translate(origin.x, origin.y)
        .translate(
          gesture.translation.x / 5 || 0,
          gesture.translation.y / 5 || 0,
        )
        .rotate(gesture.rotation || 0)
        .scale(gesture.scale || 1)
        .translate(-origin.x, -origin.y);
    }

    function applyMatrixToContext(
      ctx: CanvasRenderingContext2D,
      matrix: DOMMatrix,
    ) {
      //ctx.transform(matrix.m11, matrix.m12, matrix.m21, matrix.m22, matrix.m41, matrix.m42);
      ctx.setTransform(matrix);
    }

    twoFingers(
      this.canvas,
      {
        onGestureStart: (g: Gesture) => {
          if (
            this.canvas.offsetLeft < g.origin.x &&
            g.origin.x < this.canvas.offsetLeft + this.canvas.width &&
            this.canvas.offsetTop < g.origin.y &&
            g.origin.y < this.canvas.offsetTop + this.canvas.height
          ) {
            this.origin = getOrigin(this.canvas, g);
            if (this.origin) {
              this.init_m = this.ctx.getTransform(); //gestureToMatrix(g, this.origin).multiply(this.init_m);
            }
          }
        },

        onGestureChange: (g: Gesture) => {
          if (this.origin) {
            applyMatrixToContext(
              this.ctx,
              gestureToMatrix(g, g.origin).multiply(this.init_m),
            );

            // requestAnimationFrame(this.draw.bind(this));
          }
        },
        onGestureEnd: () => {
          if (this.origin) {
          }
        },
      },
      (wheelEvent: WheelEvent): NormalizedWheelEvent => ({
        dx: wheelEvent.deltaX,
        dy: wheelEvent.deltaY,
      }),
    );
    // requestAnimationFrame(this.draw.bind(this));
    this.addNodeButton.addEventListener("click", () => this.addNode());
    this.removeNodeButton.addEventListener("click", () => {
      this.removeNode();
    });
    this.addEdgeButton.addEventListener("click", () => this.addEdge());
    this.removeEdgeButton.addEventListener("click", () => this.removeEdge());
  }

  setModel(model: Model) {
    this.model = model;
  }

  addNode() {
    if (!this.model) {
      throw new Error();
    }
    this.model.country.updateRegions(this.model.country.regions.length + 1);
  }

  removeNode() {
    if (!this.model) {
      throw new Error();
    }
    this.model.country.updateRegions(this.model.country.regions.length - 1);
  }

  addEdge() {
    // TODO: エッジを追加
    // this.country?.addEdge();
  }

  removeEdge() {
    // TODO：エッジを削除
    // this.country?.removeEdge();
  }

  onMouseDown(ev: MouseEvent) {
    if (!this.model) {
      throw new Error();
    }

    ev.preventDefault();
    const p = new DOMPoint(ev.offsetX, ev.offsetY).matrixTransform(
      this.ctx.getTransform().invertSelf(),
    );
    this.mouseDownPoint = p;
    const id = this.regionViews.findClosestElementId(p.x, p.y);
    if (id != null) {
      const node = this.model.country.regions[id];
      this.isDragging = true;

      if (this.model.selectedNodes.some((n) => node.id == n.id)) {
        this.model.selectedNodes = this.model.selectedNodes.filter(
          (_node: Region | null) => _node?.id != node.id,
        );
      } else {
        this.model.selectedNodes.push(node);
      }
    } else {
      this.isDragging = false;
      this.model.selectedNodes.splice(-1, 1);
    }

    // requestAnimationFrame(this.draw.bind(this));

    if (this.model.selectedNodes.length > 0) {
      this.addNodeButton!.disabled = false;
      this.removeNodeButton!.disabled = false;
      if (this.model.selectedNodes.length > 1) {
        this.addEdgeButton!.disabled = false;
        this.removeEdgeButton!.disabled = false;
      }
    }
  }

  onMouseMove(ev: MouseEvent) {
    if (!this.model || !this.model.country || !this.ctx) {
      return;
    }
    ev.preventDefault();
    const p = new DOMPoint(ev.offsetX, ev.offsetY).matrixTransform(
      this.ctx.getTransform().invertSelf(),
    );
    if (this.model.selectedNodes.length > 0 && this.isDragging) {
      const id = this.model.selectedNodes.at(-1)!.id;
      this.regionViews.regionViews[id].x = p.x;
      this.regionViews.regionViews[id].y = p.y;
      // requestAnimationFrame(this.draw.bind(this));
      return;
    }
    const id = this.regionViews.findClosestElementId(p.x, p.y);
    if (id != null) {
      this.model.focusedRegionIndex = id;
      //this.model.focusedRegionIndex = id;
      this.canvas.style.cursor = "pointer";
      this.model.notifyFocusRegion();
      // requestAnimationFrame(this.draw.bind(this));
    } else {
      this.model.focusedRegionIndex = -1;
      this.canvas.style.cursor = "default";
      this.model.notifyFocusRegion();
    }
  }

  async onMouseUp(ev: MouseEvent) {
    if (!this.model || !this.ctx) {
      return;
    }
    this.mouseDownPoint = null;
    ev.preventDefault();

    if (this.model.selectedNodes.length > 0) {
      this.model.country.matrices.adjacencyMatrix =
        this.model.matrixFactories.createAdjacencyMatrix();
      this.model.notifyUpdateCountry();
    }

    // this.graphCountry.geoRegions,
    // this.model.country.matrices.adjacencyMatrixSource,

    this.isDragging = false;
    const p = new DOMPoint(ev.offsetX, ev.offsetY).matrixTransform(
      this.ctx.getTransform().invertSelf(),
    );
    const id = this.regionViews.findClosestElementId(p.x, p.y);
    if (id == null) {
      // requestAnimationFrame(this.draw.bind(this));
    }

    if (this.model.selectedNodes.length == 0) {
      this.addNodeButton!.disabled = true;
      this.removeNodeButton!.disabled = true;
    }
    if (this.model.selectedNodes.length <= 1) {
      this.addEdgeButton!.disabled = true;
      this.removeEdgeButton!.disabled = true;
    }
  }

  draw(): void {
    if (!this.model) {
      return;
    }

    // Update node positions based on forces
    for (const regionA of this.model.country.regions) {
      for (const regionB of this.model.country.regions) {
        if (regionA === regionB) continue;
        const viewA = this.regionViews.regionViews[regionA.id];
        const viewB = this.regionViews.regionViews[regionB.id];
        if (
          !viewA ||
          !viewB ||
          !this.model.country.matrices.adjacencyMatrix[regionA.id]
        )
          continue;
        const dx = viewB.x - viewA.x;
        const dy = viewB.y - viewA.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const force =
          ((this.model.country.matrices.adjacencyMatrix[regionA.id][regionB.id]
            ? 0.06
            : 0.02) *
            (distance - 300)) /
          distance ** 2;

        const fx = force * dx;
        const fy = force * dy;

        viewA.vx += fx;
        viewA.vy += fy;
        viewB.vx -= fx;
        viewB.vy -= fy;
      }
    }

    for (const region of this.model.country.regions) {
      const view = this.regionViews.regionViews[region.id];
      if (!view) continue;
      if (
        !this.model.selectedNodes ||
        !this.model.selectedNodes.some(
          (regionView) => region.id == regionView.id,
        )
      ) {
        view.x += view.vx;
        view.y += view.vy;
      }
      view.vx *= 0.9; // damping
      view.vy *= 0.9; // damping
    }

    this.ctx.save();
    this.ctx.resetTransform();
    this.ctx.fillStyle = "#fafafa";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
    for (let i = 0; i < this.regionViews.regionViews.length; i++) {
      const viewA = this.regionViews.regionViews[i];
      for (let j = 0; j < this.regionViews.regionViews.length; j++) {
        const adjacencyValue =
          this.model.country.matrices.adjacencyMatrix[i] &&
          this.model.country.matrices.adjacencyMatrix[i][j];
        if (0 < adjacencyValue && adjacencyValue < Number.POSITIVE_INFINITY) {
          const viewB = this.regionViews.regionViews[j];
          this.ctx.beginPath();
          if (this.model.isFocusedRouteIndex(i, j)) {
            this.ctx.strokeStyle = "rgb(255,255,0,0.3)";
            this.ctx.lineWidth = 5;
          } else {
            this.ctx.strokeStyle = "#ccc";
            this.ctx.lineWidth = 1;
          }
          this.ctx.moveTo(viewA.x, viewA.y);
          this.ctx.lineTo(viewB.x, viewB.y);
          this.ctx.stroke();
          this.ctx.fillStyle = "#ccc";
          this.ctx.fillText(
            adjacencyValue.toFixed(1),
            (viewA.x + viewB.x) / 2,
            (viewA.y + viewB.y) / 2,
          );
        }
      }
    }

    if (this.model.focusedRouteIndex) {
      let start = this.model.focusedRouteIndex[0];
      const end = this.model.focusedRouteIndex[1];
      const distance =
        this.model.country.matrices.distanceMatrix[start] &&
        this.model.country.matrices.distanceMatrix[start][end];
      if (0 < distance && distance < Number.POSITIVE_INFINITY) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "rgb(255,255,0,0.3)";
        this.ctx.lineWidth = 5;

        const startRegionView = this.regionViews.regionViews[start];
        this.ctx.moveTo(startRegionView.x, startRegionView.y);
        //const path = new Array<number>();
        //path.push(start);
        while (start != end) {
          const next =
            this.model.country.matrices.predecessorMatrix[start][end];
          start = next;
          const nextRegionView = this.regionViews.regionViews[next];
          this.ctx.lineTo(nextRegionView.x, nextRegionView.y);
          //path.push(next);
        }
        this.ctx.stroke();
      }
    }

    /*
    const distanceValue =
      this.model.country.matrices.distanceMatrix[i] &&
      this.model.country.matrices.distanceMatrix[i][j];
      if (0 < distanceValue && distanceValue < Number.POSITIVE_INFINITY) {

      }
    }
     */

    this.ctx.strokeStyle = "#000";
    for (let region of this.model.country.regions) {
      const node = this.model.country.regions[region.id];
      const radius = (1 + node.manufacturingShare * 3) * 10;
      const view = this.regionViews.regionViews[region.id];
      if (!view) continue;
      view.draw(this.ctx, radius, NodeViewMode.none);
    }

    for (let region of this.model.selectedNodes) {
      const node = this.model.country.regions[region.id];
      const radius = (1 + node.manufacturingShare) * 10;
      const view = this.regionViews.regionViews[region.id];
      view?.draw(this.ctx, radius, NodeViewMode.selected);
    }

    if (this.model.focusedRegionIndex != -1) {
      const node = this.model.country.regions[this.model.focusedRegionIndex];
      if (node) {
        const radius = (1 + node.manufacturingShare) * 10;
        const view =
          this.regionViews.regionViews[this.model.focusedRegionIndex];
        if (view) {
          view.draw(this.ctx, radius, NodeViewMode.focused);
        }
      }
    }
    this.ctx.restore();

    requestAnimationFrame(this.draw.bind(this));
  }

  computeTransformMatrix(
    width: number,
    height: number,
    xmin: number,
    xmax: number,
    ymin: number,
    ymax: number,
    horizontalMarginRatio: number = 0.2,
    verticalMarginRatio: number = 0.2,
  ): DOMMatrix {
    const viewBoxWidth = xmax - xmin;
    const viewBoxHeight = ymax - ymin;

    const effectiveWidth = width * (1 - horizontalMarginRatio);
    const effectiveHeight = height * (1 - verticalMarginRatio);

    // canvasと図形のアスペクト比を計算
    const canvasAspect = effectiveWidth / effectiveHeight;
    const viewBoxAspect = viewBoxWidth / viewBoxHeight;

    const scale: number =
      canvasAspect > viewBoxAspect
        ? effectiveHeight / viewBoxHeight
        : effectiveWidth / viewBoxWidth;

    // 変換のオフセットを計算
    const offsetX = (width - viewBoxWidth * scale) * 0.5 - xmin * scale;
    const offsetY = (height - viewBoxHeight * scale) * 0.5 - ymin * scale;

    const matrix = new DOMMatrix();
    matrix.translateSelf(offsetX, offsetY).scaleSelf(scale, scale);
    return matrix;
  }

  fitToScreen() {
    const bounds = this.getGraphBounds();
    const matrix = this.computeTransformMatrix(
      this.canvas.width,
      this.canvas.height,
      bounds.minX,
      bounds.maxX,
      bounds.minY,
      bounds.maxY,
    );
    this.init_m = matrix;
    this.ctx.setTransform(matrix);
    requestAnimationFrame(this.draw.bind(this));
  }

  getGraphBounds(): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  } {
    if (!this.model) {
      throw new Error();
    }

    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (let view of this.regionViews.regionViews) {
      minX = Math.min(minX, view.x);
      minY = Math.min(minY, view.y);
      maxX = Math.max(maxX, view.x);
      maxY = Math.max(maxY, view.y);
    }

    return { minX, minY, maxX, maxY };
  }
}
