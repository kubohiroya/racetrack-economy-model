import {Model} from '@/model'

type PolygonCanvasOptions = {
  canvas: HTMLCanvasElement;
  left: number,
  top: number,
  diameter: number;
  vertices: number;
  vertexCircleRadiusBase: number;
  src: number[][];
  model: Model
};

export function updateView({
  canvas,
  left, top,
  diameter,
  vertices,
                                      vertexCircleRadiusBase,
  src,
                       model
}: PolygonCanvasOptions): void {

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const radius = diameter / 2;
  const center = { x: radius + left, y: radius + top};
  const angleIncrement = (2 * Math.PI) / vertices;

  ctx.beginPath();
  ctx.strokeStyle = `black`;
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.stroke();

  for (let i = 0; i < vertices; i++) {
    const angle = i * angleIncrement

    drawVertexCircleSet(ctx, center, radius, vertexCircleRadiusBase, angle, src, i, i === model.selectedCityIndex);

    const tx = center.x + (radius + 30) * Math.cos(angle) - 7;
    const ty = center.y + (radius + 30) * Math.sin(angle);
    drawCityLabel(ctx, tx, ty, vertices, i);
  }

  if(model.selectedCityIndex >= 0){
    const offsetX = -70;
    const offsetY = -60;
    drawVertexCircleSet(ctx, {x: center.x, y: center.y + 30}, 0, vertexCircleRadiusBase, 0, src, model.selectedCityIndex, false);

    const city = model.country.cities[model.selectedCityIndex];

    ctx.fillStyle = `black`;
    ctx.fillText("share of manufacturing = "+city.MShare.toFixed(4), center.x + offsetX, center.y + offsetY);
    ctx.fillText("price index = "+city.priceIndex.toFixed(4), center.x + offsetX, center.y + offsetY + 15 );
    ctx.fillText("nominal wage = "+city.nominalWage.toFixed(4), center.x + offsetX, center.y + offsetY +30 );
    ctx.fillText("real wage = "+city.realWage.toFixed(4), center.x + offsetX, center.y + offsetY + 45);

    ctx.beginPath();
    ctx.fillStyle = `rgb(255, 0, 0, ${src[model.selectedCityIndex][0]})`;
    ctx.arc(center.x + offsetX - 12, center.y + offsetY - 5, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath()
    ctx.beginPath();
    ctx.strokeStyle = `rgb(255, 0, 0, 0.5)`;
    ctx.arc(center.x + offsetX - 12, center.y + offsetY + 10, 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath()
    ctx.beginPath();
    ctx.fillStyle = '';
    ctx.strokeStyle = `rgb(255, 0, 0, 0.5)`;
    ctx.arc(center.x + offsetX - 12, center.y + offsetY + 25, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath()
    ctx.beginPath();
    ctx.strokeStyle = `rgb(5, 5, 5, 0.3)`;
    ctx.arc(center.x + offsetX - 12, center.y + offsetY + 40, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath()

  }
}

export function computeSegmentIndex(x: number, y: number, n: number): number {
  // (x, y)から原点(0, 0)までのベクトルの向きを計算
  const angle = Math.atan2(y, x);

  // 角度を[0, 2π)の範囲に正規化
  const segmentSize = 2 * Math.PI / n;

  const normalizedAngle = (angle + 2 * Math.PI + segmentSize / 2) % (2 * Math.PI);

  // 角度をn分割し、どのセグメントに該当するかを計算
  const index = Math.floor(normalizedAngle / segmentSize);

  return index;
}

export function drawVertexCircleSet(ctx: CanvasRenderingContext2D, center: {x: number, y: number}, radius: number, vertexCircleRadiusBase: number, angle: number, src: number[][], i: number, selected: boolean){
  /*
  const x = center.x + radius * Math.cos(angle);
  const y = center.y + radius * Math.sin(angle);
  if (i === 0) {
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
  }
   */
  const vertexCircleRadius = vertexCircleRadiusBase * src[i][1] // priceIndex

  //ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);

  const x = center.x + radius * Math.cos(angle);
  const y = center.y + radius * Math.sin(angle);
  drawVertexCircle(ctx, x, y, vertexCircleRadius, src[i][0], selected); // MShare

  const radius2 = (radius - vertexCircleRadius * src[i][2] + vertexCircleRadius) // nominalWage
  const x2 = center.x + radius2 * Math.cos(angle);
  const y2 = center.y + radius2 * Math.sin(angle);
  drawVertexCircle2(ctx, x2, y2, vertexCircleRadius);

  const radius3 = (radius - vertexCircleRadius * src[i][3] + vertexCircleRadius) // realWage
  const x3 = center.x + radius3 * Math.cos(angle);
  const y3 = center.y + radius3 * Math.sin(angle);
  drawVertexCircle3(ctx, x3, y3, vertexCircleRadius);

}

function drawCityLabel (ctx: CanvasRenderingContext2D, tx:number, ty: number, vertices: number, i: number){
  if ((vertices < 100 && i % 5 == 0) || (100 <= vertices && i % 50 == 0)) {
    ctx.fillStyle = `rgb(5, 5, 5, .5)`;
    ctx.fillText(`${i}`, tx, ty + 3);
  }
}
function drawVertexCircle(ctx: CanvasRenderingContext2D, cx: number, cy: number, vertexCircleRadius: number, src: number, selected?: boolean) {
  ctx.strokeStyle = ``;
  if(selected){
    ctx.beginPath();
    ctx.fillStyle = `rgb(255, 255, 0, 0.5)`;
    ctx.arc(cx, cy, 40, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
  ctx.beginPath();
  ctx.fillStyle = `rgb(255, 0, 0, ${src})`;
  ctx.arc(cx, cy, vertexCircleRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

function drawVertexCircle2(ctx: CanvasRenderingContext2D, cx: number, cy: number, vertexCircleRadius: number) {
  ctx.beginPath();
  ctx.fillStyle = ''
  ctx.strokeStyle = `rgb(255, 0, 0, 0.5)`;
  ctx.arc(cx, cy, vertexCircleRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function drawVertexCircle3(ctx: CanvasRenderingContext2D, cx: number, cy: number, vertexCircleRadius: number) {
  ctx.beginPath();
  ctx.fillStyle = ''
  ctx.strokeStyle = `rgb(5, 5, 5, 0.3)`;
  ctx.arc(cx, cy, vertexCircleRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

