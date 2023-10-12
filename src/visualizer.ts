import { Model, SourceType, VisualizerType } from "./model";
import { City } from "./city";

const mappers = [
  { mapper: (city: City) => city.MShare, ratioToMax: true },
  { mapper: (city: City) => city.priceIndex, ratioToMax: false },
  { mapper: (city: City) => city.nominalWage, ratioToMax: false },
  { mapper: (city: City) => city.realWage, ratioToMax: false },
];

type PolygonCanvasOptions = {
  canvas: HTMLCanvasElement;
  left: number;
  top: number;
  diameter: number;
  vertices: number;
  vertexCircleRadiusBase: number;
  vertexCircleColorBase: number;
  model: Model;
};

function extractKeysByValue(map: Map<SourceType, VisualizerType|undefined>, targetValue: VisualizerType): SourceType|undefined {
  for(const key of [SourceType.mshare, SourceType.priceIndex, SourceType.nominalWage, SourceType.realWage]){
    if(map.get(key) == targetValue){
      return key;
    }
  }
  return undefined;
}

export function computeSegmentIndex(x: number, y: number, n: number): number {
  // (x, y)から原点(0, 0)までのベクトルの向きを計算
  const angle = Math.atan2(y, x);

  // 角度を[0, 2π)の範囲に正規化
  const segmentSize = (2 * Math.PI) / n;

  const normalizedAngle =
    (angle + 2 * Math.PI + segmentSize / 2) % (2 * Math.PI);

  // 角度をn分割し、どのセグメントに該当するかを計算
  const index = Math.floor(normalizedAngle / segmentSize);

  return index;
}

function drawCircle(
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
  ctx.arc(cx, cy, vertexCircleRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

export function drawVertexCity(
  ctx: CanvasRenderingContext2D,
  center: { x: number; y: number },
  radius: number,
  angle: number,
  radiusType: SourceType | undefined,
  colorType: SourceType | undefined,
  vertexCircleRadiusBase: number,
  vertexCircleAlphaColorBase: number,
  citySrc: number[],
  selected: boolean,
) {
  const x = center.x + radius * Math.cos(angle);
  const y = center.y + radius * Math.sin(angle);

  const vertexCircleRadius = radiusType != undefined
    ? vertexCircleRadiusBase * citySrc[radiusType]
    : vertexCircleRadiusBase;

  const vertexCircleColor = colorType != undefined ? citySrc[colorType] : vertexCircleAlphaColorBase;

  if (radiusType != undefined || colorType != undefined) {
    drawCircle(ctx, x, y, vertexCircleRadius, vertexCircleColor, selected); // MShare
  }
}

function drawCityLabel(
  ctx: CanvasRenderingContext2D,
  tx: number,
  ty: number,
  vertices: number,
  i: number,
) {
  if ((vertices < 100 && i % 5 == 0) || (100 <= vertices && i % 50 == 0)) {
    ctx.fillStyle = `rgb(5, 5, 5, .5)`;
    ctx.fillText(`${i}`, tx, ty + 3);
  }
}

function drawVertexCitiesAndLabels(
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
  const radiusType: SourceType | undefined = extractKeysByValue(model.bindings, VisualizerType.radius);
  const colorType: SourceType | undefined = extractKeysByValue(model.bindings, VisualizerType.color);

  for (let i = 0; i < vertices; i++) {
    const angle = i * angleIncrement;
    drawVertexCity(
      ctx,
      center,
      radius,
      angle,
      radiusType,
      colorType,
      vertexCircleRadiusBase,
      vertexCircleColorBase,
      src[i],
      i === model.selectedCityIndex,
    );

    const tx = center.x + (radius + 30) * Math.cos(angle) - 7;
    const ty = center.y + (radius + 30) * Math.sin(angle);
    drawCityLabel(ctx, tx, ty, vertices, i);
  }
}

function drawCityState(
  model: Model,
  ctx: CanvasRenderingContext2D,
  center: { x: number; y: number },
) {
  if (model.selectedCityIndex >= 0) {
    const offsetX = -70;
    const offsetY = -60;

    const city = model.country.cities[model.selectedCityIndex];

    ctx.fillStyle = `black`;
    ctx.fillText(
      "share of manufacturing = " + city.MShare.toFixed(4),
      center.x + offsetX,
      center.y + offsetY,
    );
    ctx.fillText(
      "price index = " + city.priceIndex.toFixed(4),
      center.x + offsetX,
      center.y + offsetY + 15,
    );
    ctx.fillText(
      "nominal wage = " + city.nominalWage.toFixed(4),
      center.x + offsetX,
      center.y + offsetY + 30,
    );
    ctx.fillText(
      "real wage = " + city.realWage.toFixed(4),
      center.x + offsetX,
      center.y + offsetY + 45,
    );

  }
}


function drawBaseCircle(
  ctx: CanvasRenderingContext2D,
  center: { x: number; y: number },
  radius: number,
) {
  ctx.beginPath();
  ctx.strokeStyle = `black`;
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function drawOuterCircle(
  ctx: CanvasRenderingContext2D,
  vertices: number,
  angleIncrement: number,
  radius: number,
  center: { x: number; y: number },
  offsetBase: number,
  type: SourceType | undefined,
  src: number[][],
  strokeStyle: string,
) {
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  for (let i = 0; i < vertices; i++) {
    const angle = i * angleIncrement;

    if (type != undefined) {
      const radius2 = radius + src[i][type] * offsetBase;
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

export function updateView({
                             canvas,
                             left,
                             top,
                             diameter,
                             vertices,
                             vertexCircleRadiusBase,
                             vertexCircleColorBase,
                             model,
                           }: PolygonCanvasOptions): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const max = mappers.map((mapper) =>
    model.country.cities
      .map(mapper.mapper)
      .reduce(
        (max: number, current: number) => (current > max ? current : max),
        0,
      ),
  );

  const src = model.country.cities.map((city) =>
    mappers.map((mapper, index) =>
      mapper.ratioToMax
        ? mapper.mapper(city) / max[index]
        : mapper.mapper(city),
    ),
  );

  const radius = diameter / 2;
  const center = { x: radius + left, y: radius + top };
  const angleIncrement = (2 * Math.PI) / vertices;

  drawBaseCircle(ctx, center, radius);

  drawVertexCitiesAndLabels(
    vertices,
    angleIncrement,
    ctx,
    center,
    radius,
    model,
    vertexCircleRadiusBase,
    vertexCircleColorBase,
    src,
  );

  const grayOuterCircleType: SourceType | undefined = extractKeysByValue(
    model.bindings,
    VisualizerType.grayOuterCircle,
  );
  const redOuterCircleType: SourceType | undefined = extractKeysByValue(
    model.bindings,
    VisualizerType.redOuterCircle,
  );

  drawOuterCircle(
    ctx,
    vertices,
    angleIncrement,
    radius,
    center,
    20,
    redOuterCircleType,
    src,
    "rgb(255,0,0,0.5)",
  );

  drawOuterCircle(
    ctx,
    vertices,
    angleIncrement,
    radius,
    center,
    20,
    grayOuterCircleType,
    src,
    "rgb(0,0,0,0.5)",
  );

  drawCityState(model, ctx, center);
}
