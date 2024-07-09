import { Model } from "@/model/model";
import { Region } from "@/model/region";
import { VisualizerType } from "@/model/visualizerType";
import { SourceType } from "@/model/sourceType";
import { extractKeysByValue } from "@/view/visualizerTypeSelector";
import { ValueType } from "@/model/valueType";
import { createMapper } from "@/createMapper";
import { drawRegionDetail } from "@/view/drawRegionDetail";
import { SelectType } from "@/model/selectType";

export class RaceTrackView {
  canvas: HTMLCanvasElement;
  model: Model | undefined;
  diameter: number = 0;

  mappers:
    | { mapper: (region: Region) => number; type: ValueType }[]
    | undefined;

  constructor() {
    this.canvas = document.getElementById(
      "raceTrackCanvas",
    ) as HTMLCanvasElement;
    this.canvas.addEventListener("mousemove", (ev) => this.onMouseMove(ev));
    this.canvas.addEventListener("mouseenter", (ev) => this.onMouseMove(ev));
    this.canvas.addEventListener("mouseleave", (ev) => this.onMouseMove(ev));
    this.canvas.addEventListener("mouseover", (ev) => this.onMouseMove(ev));
  }

  setModel(model: Model): void {
    this.model = model;
    this.mappers = createMapper(model);
  }

  onMouseMove(event: MouseEvent) {
    if (!this.canvas || !this.model) return;
    const rect = this.canvas.getBoundingClientRect();

    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const canvasX = (event.clientX - rect.left) * scaleX;
    const canvasY = (event.clientY - rect.top) * scaleY;

    const center = new DOMPoint(
      (this.canvas.width - this.diameter) / 2 + this.diameter / 2,
      (this.canvas.height - this.diameter) / 2 + this.diameter / 2,
    );

    const x = canvasX - center.x;
    const y = canvasY - center.y;

    const distance = Math.sqrt(x * x + y * y);
    if (
      distance < this.diameter / 2 - 30 ||
      this.diameter / 2 + 30 < distance
    ) {
      // this.model!.setFocusedRegionId(null, null);
      this.model.notifyRegionSelect(
        "raceTrackView",
        this.model.focusedRegionIds,
        SelectType.FOCUSED,
        false,
      );
      return;
    }

    const computeSegmentIndex = (x: number, y: number, n: number): number => {
      const angle = Math.atan2(y, x);

      const segmentSize = (2 * Math.PI) / n;

      const normalizedAngle =
        (angle + 2 * Math.PI + segmentSize / 2) % (2 * Math.PI);

      return Math.floor(normalizedAngle / segmentSize);
    };

    const segment = computeSegmentIndex(
      x,
      y,
      this.model.country.regions.length,
    );

    // this.model.setFocusedRegionId(null, segment);
    this.model.notifyRegionSelect(
      "raceTrackView",
      this.model.focusedRegionIds,
      SelectType.FOCUSED,
      false,
    );
    this.model.notifyRegionSelect(
      "raceTrackView",
      [segment],
      SelectType.FOCUSED,
      true,
    );
  }

  draw(): void {
    if (!this.model || !this.mappers) {
      throw new Error();
    }

    const vertexCircleRadiusBase = 14;
    const vertexCircleColorBase = 0.5;

    const vertices = this.model.country.regions.length;

    console.log(
      "draw:",
      this.model.country.numRegions,
      this.model.country.regions.length,
    );

    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const diameter = Math.min(this.canvas.width, this.canvas.height) - 80;
    this.diameter = diameter;
    const radius = diameter / 2;
    const center = new DOMPoint(
      (this.canvas.width - diameter) / 2 + radius,
      (this.canvas.height - diameter) / 2 + radius,
    );

    const max = this.mappers.map((mapper) =>
      this.model!.country.regions.map(mapper.mapper).reduce(
        (max: number, current: number) => (current > max ? current : max),
        0,
      ),
    );

    const valueConverter = (
      mapper: {
        mapper: (region: Region) => number;
        type: ValueType;
      },
      type: ValueType,
      region: Region,
      max: number,
    ) => {
      const value = mapper.mapper(region);
      switch (type) {
        case ValueType.passThrough:
          return value;
        case ValueType.multiply100:
          return value * 100.0;
        case ValueType.priceIndex:
          return Math.max(0, value - 1.0);
        case ValueType.ratioToMax:
          return value / max;
        case ValueType.multiply1000aroundOne:
          return (value - 1.0) * 1000.0;
        case ValueType.multiply100aroundOne:
          return (value - 1.0) * 100.0;
        default:
          return 0;
      }
    };

    const src = this.model.country.regions.map((region) =>
      this.mappers!.map((mapper, index) =>
        valueConverter(mapper, mapper.type, region, max[index]),
      ),
    );

    const angleIncrement = (2 * Math.PI) / vertices;

    this.drawBaseCircle(ctx, center, radius);
    this.drawVertexCitiesAndLabels(
      vertices,
      angleIncrement,
      ctx,
      center,
      radius,
      this.model,
      vertexCircleRadiusBase,
      vertexCircleColorBase,
      src,
    );

    const grayOuterCircleType: SourceType | undefined = extractKeysByValue(
      this.model.bindings,
      VisualizerType.gray,
    );
    const redOuterCircleType: SourceType | undefined = extractKeysByValue(
      this.model.bindings,
      VisualizerType.red,
    );
    const dotOuterCircleType: SourceType | undefined = extractKeysByValue(
      this.model.bindings,
      VisualizerType.dot,
    );

    this.drawPolygon(
      ctx,
      vertices,
      angleIncrement,
      radius,
      center,
      grayOuterCircleType,
      src,
      "rgb(0,0,0,0.3)",
    );

    this.drawPolygon(
      ctx,
      vertices,
      angleIncrement,
      radius,
      center,
      redOuterCircleType,
      src,
      "rgb(255,0,0,0.5)",
    );

    ctx.setLineDash([4, 8]);
    this.drawPolygon(
      ctx,
      vertices,
      angleIncrement,
      radius,
      center,
      dotOuterCircleType,
      src,
      "rgb(255,0,0,0.5)",
    );
    ctx.setLineDash([]);

    drawRegionDetail(this.model, ctx, center);
  }

  private drawCircle(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    vertexCircleRadius: number,
    alpha: number,
    selected?: boolean,
  ) {
    ctx.strokeStyle = ``;
    if (selected) {
      ctx.beginPath();
      ctx.fillStyle = `rgb(255, 255, 0, 0.5)`;
      ctx.arc(cx, cy, 40, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
    ctx.beginPath();
    ctx.fillStyle = `rgb(255, 0, 0, ${alpha})`;
    ctx.arc(cx, cy, Math.max(0, vertexCircleRadius), 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  private drawVertexRegion(
    ctx: CanvasRenderingContext2D,
    center: { x: number; y: number },
    radius: number,
    angle: number,
    radiusType: SourceType | undefined,
    colorType: SourceType | undefined,
    vertexCircleRadiusBase: number,
    vertexCircleAlphaColorBase: number,
    regionSrc: number[],
    selected: boolean,
  ) {
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);

    const vertexCircleRadius =
      radiusType != undefined
        ? vertexCircleRadiusBase * regionSrc[radiusType]
        : vertexCircleRadiusBase;

    const vertexCircleColor =
      colorType != undefined
        ? regionSrc[colorType]
        : vertexCircleAlphaColorBase;

    if (radiusType != undefined || colorType != undefined) {
      this.drawCircle(
        ctx,
        x,
        y,
        vertexCircleRadius,
        vertexCircleColor,
        selected,
      ); // MShare
    }
  }

  private drawRegionLabel(
    ctx: CanvasRenderingContext2D,
    tx: number,
    ty: number,
    vertices: number,
    i: number,
  ) {
    if (
      vertices < 21 ||
      (vertices < 101 && i % 5 == 0) ||
      (101 < vertices && i % 50 == 0)
    ) {
      ctx.fillStyle = `rgb(5, 5, 5, .5)`;
      ctx.fillText(`${i}`, tx, ty + 3);
    }
  }

  private drawVertexCitiesAndLabels(
    vertices: number,
    angleIncrement: number,
    ctx: CanvasRenderingContext2D,
    center: {
      x: number;
      y: number;
    },
    radius: number,
    model: Model,
    vertexCircleRadiusBase: number,
    vertexCircleColorBase: number,
    src: number[][],
  ) {
    const radiusType: SourceType | undefined = extractKeysByValue(
      model.bindings,
      VisualizerType.radius,
    );
    const colorType: SourceType | undefined = extractKeysByValue(
      model.bindings,
      VisualizerType.color,
    );

    for (let i = 0; i < vertices; i++) {
      const angle = i * angleIncrement;
      this.drawVertexRegion(
        ctx,
        center,
        radius,
        angle,
        radiusType,
        colorType,
        vertexCircleRadiusBase,
        vertexCircleColorBase,
        src[i],
        model.focusedRegionIds.includes(i),
      );

      const marginToText = 30;
      const marginToTextHorizontal = 7;
      const tx =
        center.x +
        (radius + marginToText) * Math.cos(angle) -
        marginToTextHorizontal;
      const ty = center.y + (radius + marginToText) * Math.sin(angle);
      this.drawRegionLabel(ctx, tx, ty, vertices, i);
    }
  }

  private drawBaseCircle(
    ctx: CanvasRenderingContext2D,
    center: { x: number; y: number },
    radius: number,
  ) {
    if (!this.model) return;

    const focusedRegionIds = this.model.focusedRegionIds;

    const angle = (2.0 * Math.PI) / this.model.country.regions.length;

    if (
      focusedRegionIds != null &&
      focusedRegionIds.length == 2 &&
      0 <= focusedRegionIds[0] &&
      0 <= focusedRegionIds[1]
    ) {
      const index =
        focusedRegionIds[0] < focusedRegionIds[1]
          ? [focusedRegionIds[0], focusedRegionIds[1]]
          : [focusedRegionIds[1], focusedRegionIds[0]];
      if (
        this.model.focusEventSource != "adjacencyMatrix" ||
        (this.model.focusEventSource == "adjacencyMatrix" &&
          index[1] - index[0] == 1) ||
        index[1] - index[0] == this.model.country.regions.length - 1
      ) {
        if (index[1] - index[0] < this.model.country.regions.length / 2) {
          ctx.strokeStyle = `rgb(0, 0, 0, 0.1)`;
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.arc(center.x, center.y, radius, 0, angle * index[0]);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = `rgb(255, 255, 0)`;
          ctx.lineWidth = 15;
          ctx.arc(
            center.x,
            center.y,
            radius,
            angle * index[0],
            angle * index[1],
          );
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = `rgb(0, 0, 0, 0.1)`;
          ctx.lineWidth = 1;
          ctx.arc(center.x, center.y, radius, angle * index[1], 2.0 * Math.PI);
          ctx.stroke();
          return;
        } else {
          ctx.strokeStyle = `rgb(255, 255, 0)`;
          ctx.beginPath();
          ctx.lineWidth = 15;
          ctx.arc(center.x, center.y, radius, 0, angle * index[0]);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = `rgb(0, 0, 0, 0.1)`;
          ctx.lineWidth = 1;
          ctx.arc(
            center.x,
            center.y,
            radius,
            angle * index[0],
            angle * index[1],
          );
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = `rgb(255, 255, 0)`;
          ctx.lineWidth = 15;
          ctx.arc(center.x, center.y, radius, angle * index[1], 2.0 * Math.PI);
          ctx.stroke();
          ctx.lineWidth = 1;
          return;
        }
      }
    }

    ctx.beginPath();
    ctx.strokeStyle = `rgb(0, 0, 0, 0.1)`;
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  private drawPolygon(
    ctx: CanvasRenderingContext2D,
    vertices: number,
    angleIncrement: number,
    radius: number,
    center: { x: number; y: number },
    type: SourceType | undefined,
    src: number[][],
    strokeStyle: string,
  ) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    for (let i = 0; i < vertices; i++) {
      const angle = i * angleIncrement;

      if (type != undefined) {
        const radius2 = radius + src[i][type];
        const x2 = center.x + radius2 * Math.cos(angle);
        const y2 = center.y + radius2 * Math.sin(angle);
        //const a = radius2 * Math.PI / model.numCities * 2;
        if (i == 0) {
          ctx.moveTo(x2, y2);
        }
        ctx.lineTo(x2, y2);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }
}
