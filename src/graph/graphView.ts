import { NodeViewMode } from "@/graph/nodeViewMode";
import { Node } from "@/graph/node";
import { GraphModel } from "@/graph/graphModel";
import { drawRegionDetail } from "@/view/drawRegionDetail";
import { SelectType } from "@/model/selectType";

function deferred(ms: number) {
  let cancel,
    promise = new Promise((resolve, reject) => {
      cancel = reject;
      setTimeout(resolve, ms);
    });
  return { promise, cancel };
}

function debounceWheelEventHandler(
  func: (event: WheelEvent) => void,
  timeout = 10,
) {
  // A slot to save timer id for current debounced function
  let timer: NodeJS.Timeout | null = null;
  // Return a function that conditionally calls the original function
  return (event: WheelEvent) => {
    // Immediately cancel the timer when called
    if (timer) {
      clearTimeout(timer);
    }
    // Start another timer that will call the original function
    timer = setTimeout(() => {
      func(event);
    }, timeout);
  };
}

/*
let disabledScrollHandler = (e: WheelEvent) => {
  e.preventDefault();
}

document.querySelector('.disable-scroll')?.addEventListener('click', () =>
  document.addEventListener('wheel', disabledScrollHandler, { passive: false }));

document.querySelector('.enable-scroll')?.addEventListener('click', () =>
  document.removeEventListener('wheel', disabledScrollHandler));

document.querySelector('.disable-scroll')?.addEventListener('click', function() {
  document.body.classList.add('disable-scroll');
});

document.querySelector('.enable-scroll')?.addEventListener('click', function() {
  document.body.classList.remove('disable-scroll');
});
 */

abstract class CanvasView {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  isDragging = false;
  mouseDownPoint: DOMPoint | null = null;
  path: Set<string> = new Set();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    if (this.canvas instanceof HTMLElement) {
      this.canvas.style.transformOrigin = "0 0";
    }

    setInterval(() => {
      this.draw();
    }, 100);

    const handleWheelEvent = (event: WheelEvent) => {
      const scale = event.deltaY < 0 ? 1.1 : 0.9;
      const zoom = this.ctx.getTransform().a * scale;
      if (
        event.clientY > 0 &&
        event.clientY < this.canvas.height &&
        event.clientX > 0 &&
        event.clientX < this.canvas.width &&
        0.1 < zoom &&
        zoom < 10
      ) {
        const currentTransformedCursor = this.getTransformedPoint(
          this.ctx,
          event.offsetX,
          event.offsetY,
        );
        this.ctx.translate(
          currentTransformedCursor.x,
          currentTransformedCursor.y,
        );

        this.ctx.scale(scale, scale);
        this.ctx.translate(
          -currentTransformedCursor.x,
          -currentTransformedCursor.y,
        );
        this.draw();
        event.preventDefault();
        event.stopPropagation();
      }
    };
    debounceWheelEventHandler(handleWheelEvent, 10);

    window.addEventListener(
      "wheel",
      (event: WheelEvent) => {
        handleWheelEvent(event);
      },
      {
        passive: false,
      },
    );

    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this), {
      passive: false,
    });
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this), {
      passive: false,
    });
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this), {
      passive: false,
    });
    this.canvas.addEventListener("mouseout", this.onMouseOut.bind(this), {
      passive: false,
    });
  }

  getTransformedPoint(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ): DOMPoint {
    const originalPoint = new DOMPoint(x, y);
    return this.ctx.getTransform().invertSelf().transformPoint(originalPoint);
  }

  onMouseDown(ev: MouseEvent) {
    this.mouseDownPoint = new DOMPoint(ev.offsetX, ev.offsetY).matrixTransform(
      this.ctx.getTransform().invertSelf(),
    );
  }

  onMouseMove(ev: MouseEvent) {}

  onMouseUp(ev: MouseEvent) {}

  onMouseOut(ev: MouseEvent) {}

  abstract draw(): void;
}

export class GraphView extends CanvasView {
  addNodeButton: HTMLButtonElement;
  removeNodeButton: HTMLButtonElement;
  addEdgeButton: HTMLButtonElement;
  removeEdgeButton: HTMLButtonElement;
  importButton: HTMLButtonElement;
  exportButton: HTMLButtonElement;
  model: GraphModel;

  constructor(canvas: HTMLCanvasElement, model: GraphModel) {
    super(canvas);
    this.model = model;
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
    this.importButton = document.getElementById(
      "importButton",
    ) as HTMLButtonElement;
    this.exportButton = document.getElementById(
      "exportButton",
    ) as HTMLButtonElement;

    const fitButton = document.getElementById("fitButton");

    fitButton!.addEventListener("click", () => {
      this.fitToScreen();
    });
    this.addNodeButton.addEventListener("click", () => this.addNode());
    this.removeNodeButton.addEventListener("click", () => {
      this.doExtractNodes();
    });
    this.addEdgeButton.addEventListener("click", () => this.addEdge());
    this.removeEdgeButton.addEventListener("click", () => this.removeEdge());
    this.updateGraphEditorButtonState();
  }

  setModel(model: GraphModel) {
    this.model = model;
  }

  updateGraphEditorButtonState() {
    if (this.model.timer?.isStarted()) {
      this.addNodeButton.disabled = true;
      this.addEdgeButton.disabled = true;
      this.removeNodeButton.disabled = true;
      this.removeEdgeButton.disabled = true;
      this.importButton.disabled = true;
      this.exportButton.disabled = true;
      return;
    }

    this.importButton.disabled = false;
    this.exportButton.disabled = false;

    if (this.model.selectedRegionIds.length > 0) {
      this.addNodeButton.disabled = false;
      this.removeNodeButton.disabled = false;

      let numEdges = 0;
      for (let i = 0; i < this.model.selectedRegionIds.length; i++) {
        const id0 = this.model.selectedRegionIds[i];
        for (let j = i + 1; j < this.model.selectedRegionIds.length; j++) {
          const id1 = this.model.selectedRegionIds[j];
          const distance =
            this.model.country.matrices.adjacencyMatrix[id0][id1];
          if (0 < distance && distance < Number.POSITIVE_INFINITY) {
            numEdges++;
          }
        }
      }
      this.addEdgeButton.disabled = !(
        2 <= this.model.selectedRegionIds.length &&
        numEdges <
          ((1 + this.model.selectedRegionIds.length - 1) *
            (this.model.selectedRegionIds.length - 1)) /
            2
      );
      this.removeEdgeButton.disabled = 0 == numEdges;
      return;
    }

    if (
      this.model.selectedRegionIds.length == 0 ||
      this.model.selectedRegionIds.length == 0
    ) {
      this.addNodeButton.disabled = true;
      this.addEdgeButton.disabled = true;
      this.removeNodeButton.disabled = true;
      this.removeEdgeButton.disabled = true;
      return;
    }

    this.addNodeButton.disabled = false;
    this.addEdgeButton.disabled = true;
    this.removeNodeButton.disabled = true;
    this.removeEdgeButton.disabled = true;
  }

  onMouseOut(ev: MouseEvent) {
    if (!this.model) return;
    //this.model.focusedRegionId = null;
    this.model.notifyRegionSelect("graphView", [], SelectType.FOCUSED, false);
  }

  onMouseDown(ev: MouseEvent) {
    if (!this.model) {
      throw new Error();
    }

    super.onMouseDown(ev);

    if (!this.mouseDownPoint) {
      throw new Error();
    }

    const id = this.model.findClosestElementId(
      this.mouseDownPoint.x,
      this.mouseDownPoint.y,
    );
    if (id != null) {
      const region = this.model.country.regions[id];
      this.isDragging = true;
      if (this.model.selectedRegionIds.includes(region.id)) {
      } else {
        this.model.selectedRegionIds = [
          ...this.model.selectedRegionIds,
          region.id,
        ];
        this.model.notifyRegionSelect(
          "graphView",
          this.model.selectedRegionIds,
          SelectType.SELECTED,
          true,
        );
      }
    } else {
      this.isDragging = false;
      this.model.notifyRegionSelect(
        "graphView",
        this.model.selectedRegionIds,
        SelectType.SELECTED,
        false,
      );
      this.model.selectedRegionIds = [];
    }

    requestAnimationFrame(this.draw.bind(this));
  }

  onMouseMove(ev: MouseEvent) {
    if (!this.model || !this.model.country || !this.ctx) {
      return;
    }

    super.onMouseMove(ev);
    const p = this.getTransformedPoint(this.ctx, ev.offsetX, ev.offsetY);
    const scale = this.ctx.getTransform().a;

    function distance(
      a: { x: number; y: number },
      b: { x: number; y: number },
    ): number {
      return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
    }

    if (this.isDragging) {
      if (this.model.selectedRegionIds.length > 0) {
        const id = this.model.nodes.reduce(
          (previousNode: Node, currentNode: Node) =>
            distance(previousNode, p) < distance(currentNode, p)
              ? previousNode
              : currentNode,
        ).id;
        const dx = p.x - this.model.nodes[id].x;
        const dy = p.y - this.model.nodes[id].y;
        this.model.selectedRegionIds
          .map((regionId) => this.model.nodes[regionId])
          .forEach((node) => {
            node.x += dx;
            node.y += dy;
          });
        requestAnimationFrame(this.draw.bind(this));
        return;
      }
    }

    if (this.mouseDownPoint) {
      const matrix = new DOMMatrix();
      matrix.translateSelf(
        p.x - this.mouseDownPoint.x,
        p.y - this.mouseDownPoint.y,
      );
      this.ctx.setTransform(this.ctx.getTransform().multiply(matrix));
      requestAnimationFrame(this.draw.bind(this));
      return;
    }

    const id = this.model.findClosestElementId(p.x, p.y);
    if (id != null) {
      /*
      this.model.focusedRegionId = id;
      this.model.focusEventSource = null;
       */
      this.canvas.style.cursor = "pointer";
      this.model.notifyRegionSelect(
        "graphView",
        [id],
        SelectType.FOCUSED,
        true,
      );
    } else {
      /*
      this.model.focusedRegionId = null;
      this.model.focusEventSource = null;
       */
      this.canvas.style.cursor = "default";
      this.model.notifyRegionSelect(
        "graphView",
        this.model.focusedRegionIds,
        SelectType.FOCUSED,
        false,
      );
    }
  }

  async onMouseUp(ev: MouseEvent) {
    if (!this.model || !this.ctx) {
      return;
    }
    this.mouseDownPoint = null;
    this.onMouseMove(ev);

    if (this.model.selectedRegionIds.length > 0) {
      this.model.notifyGraphUpdate();
    }

    this.isDragging = false;

    this.updateGraphEditorButtonState();
  }

  getRadius(radius: number, mode: NodeViewMode) {
    switch (mode) {
      case NodeViewMode.none:
        return radius;
      case NodeViewMode.focused:
        return radius * 3;
      case NodeViewMode.selected:
        return radius + 2;
      default:
        return radius;
    }
  }

  drawNode(
    ctx: CanvasRenderingContext2D,
    node: Node,
    radius: number,
    mode: NodeViewMode,
  ) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    const r = this.getRadius(radius, mode);
    if (r < 0) {
      return;
    }
    ctx.beginPath();
    switch (mode) {
      case NodeViewMode.none:
        ctx.fillStyle = `rgb(128, 0, 0, 0.2)`;
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        node.radius = r;
        break;
      case NodeViewMode.focused:
        ctx.fillStyle = `rgb(255, 0, 0, 0.2)`;
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(255, 255, 0, 0.2)`;
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        node.radius = radius;
        break;
      case NodeViewMode.selected:
        ctx.strokeStyle = `rgb(255, 220, 0, 0.8)`;
        ctx.fillStyle = "";
        ctx.arc(node.x, node.y, r + 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = `rgb(255, 220, 0, 0.4)`;
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        node.radius = r;
        break;
    }

    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "rgb(20,20,20,0.6)";
    ctx.fillText(node.id.toString(), node.x - 3.5, node.y + 3.5);
  }

  drawShortestPathEdges(start: number, end: number) {
    if (!this.model) {
      return;
    }
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgb(255,0,0,0.5)";
    this.ctx.lineWidth = 5;

    const startNode = this.model.nodes[start];
    this.ctx.moveTo(startNode.x, startNode.y);

    this.path.clear();

    while (start != end) {
      const next = this.model.country.matrices.predecessorMatrix[start][end];
      this.path.add(start < next ? `${start}:${next}` : `${next}:${start}`);
      const nextNode = this.model.nodes[next];
      this.ctx.lineTo(nextNode.x, nextNode.y);
      start = next;
    }
    this.ctx.stroke();
  }

  draw(): void {
    if (!this.model) {
      return;
    }

    this.ctx.save();

    this.ctx.resetTransform();
    this.ctx.fillStyle = "#fafafa";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();

    if (this.model.focusedRegionIds.length > 0) {
      const i = this.model.focusedRegionIds[0];
      const j = this.model.focusedRegionIds[1];
      const adjacencyValue =
        this.model.country.matrices.adjacencyMatrix[i] &&
        this.model.country.matrices.adjacencyMatrix[i][j];
      const distance =
        this.model.country.matrices.distanceMatrix[i] &&
        this.model.country.matrices.distanceMatrix[i][j];
      if (
        adjacencyValue == Number.POSITIVE_INFINITY &&
        0 < distance &&
        distance < Number.POSITIVE_INFINITY
      ) {
        this.drawShortestPathEdges.call(this, i, j);
      } else {
        this.path.clear();
      }
    }

    for (let i = 0; i < this.model.nodes.length; i++) {
      const node0 = this.model.nodes[i];
      for (let j = i + 1; j < this.model.nodes.length; j++) {
        const adjacencyValue =
          this.model.country.matrices.adjacencyMatrix[i] &&
          this.model.country.matrices.adjacencyMatrix[i][j];
        if (0 < adjacencyValue && adjacencyValue < Number.POSITIVE_INFINITY) {
          const node1 = this.model.nodes[j];
          this.drawEdge(i, j, node0, node1, adjacencyValue);
        }
      }
    }

    this.ctx.strokeStyle = "#000";
    for (let region of this.model.country.regions) {
      const node0 = this.model.country.regions[region.id];
      if (!node0) continue;
      const radius = 1 + node0.manufacturingShare * 3 * 10;
      const node1 = this.model.nodes[region.id];
      if (!node1) continue;
      this.drawNode(this.ctx, node1, radius, NodeViewMode.none);
    }

    for (let regionId of this.model.selectedRegionIds) {
      const node0 = this.model.country.regions[regionId];
      if (!node0) continue;
      const radius = (1 + node0.manufacturingShare) * 10;
      const node2 = this.model.nodes[regionId];
      if (!node2) continue;
      this.drawNode(this.ctx, node2, radius, NodeViewMode.selected);
    }

    if (this.model.focusedRegionIds.length > 0) {
      for (let id of this.model.focusedRegionIds) {
        const node = this.model.nodes[id];
        const region = this.model.country.regions[id];
        if (node && region) {
          const radius = (1 + region.manufacturingShare) * 10;
          this.drawNode(this.ctx, node, radius, NodeViewMode.focused);
          this.ctx.save();
          this.ctx.resetTransform();
        }
      }
      const id =
        this.model.focusedRegionIds[this.model.focusedRegionIds.length - 1];
      const region = this.model.country.regions[id];
      if (region) {
        const node1 = this.model.nodes[id];
        if (node1) {
          drawRegionDetail(this.model, this.ctx, {
            x: this.canvas.width - 120,
            y: this.canvas.height - 80,
          });
        }
      }
    }
    this.ctx.restore();
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
    //this.init_m = matrix;
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

    for (let view of this.model.nodes) {
      minX = Math.min(minX, view.x);
      minY = Math.min(minY, view.y);
      maxX = Math.max(maxX, view.x);
      maxY = Math.max(maxY, view.y);
    }

    return { minX, minY, maxX, maxY };
  }

  async addNode() {
    if (!this.model || this.model.selectedRegionIds.length == 0) {
      throw new Error();
    }

    const prevSelectedRegionIds = [...this.model.selectedRegionIds];

    const numAddingRegions = 1;
    console.log("  setNumRegions");
    this.model.setNumRegions(this.model.nodes.length + numAddingRegions);
    console.log("  appendRegions");
    // this.model.appendRegions(numAddingRegions);
    console.log("  notifyNumRegionsChanged");
    this.model.notifyNumRegionsChanged();
    this.model.notifyAdjacencyMatrixChanged();

    this.model.notifyRegionSelect(
      "graph",
      prevSelectedRegionIds,
      SelectType.SELECTED,
      false,
    );

    this.model.notifyRegionSelect(
      "graph",
      [this.model.nodes.length - 1],
      SelectType.SELECTED,
      true,
    );

    /*
    this.model.notifyRegionSelect(
      "graphView",
      this.model.selectedRegionIds,
      SelectType.SELECTED,
      false,
    );

    this.model.selectedRegionIds = [this.model.nodes.length - 1];
    this.model.notifyRegionSelect(
      "graphView",
      [this.model.country.regions.length - 1],
      SelectType.SELECTED,
      true,
    );
     */
  }

  doExtractNodes() {
    this.extractNodes(this.model.selectedRegionIds);
  }

  extractNodes(nodeIds: number[]) {
    if (!this.model) {
      throw new Error();
    }
    const extractingRegionIds = [];
    for (let i = 0; i < this.model.country.regions.length; i++) {
      if (nodeIds.includes(i)) {
        continue;
      }
      extractingRegionIds.push(i);
    }
    this.model.extractRegions(this.model.nodes.length, extractingRegionIds);
  }

  private drawEdge(
    i: number,
    j: number,
    node0: Node,
    node1: Node,
    adjacencyValue: number,
  ) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#ccc";
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(node0.x, node0.y);
    this.ctx.lineTo(node1.x, node1.y);
    this.ctx.stroke();

    if (this.model?.isFocusedRegionIds(i, j)) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "rgb(255, 255, 0, 0.3)";
      this.ctx.lineWidth = 10;
      this.ctx.moveTo(node0.x, node0.y);
      this.ctx.lineTo(node1.x, node1.y);
      this.ctx.stroke();
      this.ctx.fillStyle = "rgb(255,0,0,0.5)";
    } else {
      this.ctx.fillStyle = "rgb(0,0,0,0.3)";
    }

    const key = i < j ? `${i}:${j}` : `${j}:${i}`;
    if (this.path.has(key)) {
      this.ctx.fillStyle = "rgb(255,0,255,0.5)";
    }

    this.ctx.lineWidth = 1;

    if (
      this.isDragging &&
      ((this.model.selectedRegionIds.length >= 1 &&
        (this.model.selectedRegionIds[0] == i ||
          this.model.selectedRegionIds[0] == j)) ||
        (this.model.selectedRegionIds.length >= 2 &&
          (this.model.selectedRegionIds[1] == i ||
            this.model.selectedRegionIds[1] == j)))
    ) {
      return;
    }
    this.ctx.fillText(
      adjacencyValue.toFixed(1),
      (node0.x + node1.x) / 2,
      (node0.y + node1.y) / 2,
    );
  }

  addEdge() {
    if (!this.model) {
      throw new Error();
    }
    this.model.addEdge(this.model.selectedRegionIds);
  }

  removeEdge() {
    if (!this.model) {
      throw new Error();
    }
    this.model.removeEdge(this.model.selectedRegionIds);
  }
}
