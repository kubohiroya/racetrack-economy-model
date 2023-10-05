type PolygonCanvasOptions = {
  canvas: HTMLCanvasElement;
  diameter: number;
  vertices: number;
  vertexCircleRadiusSrc: number;
  src: number[][];
};

export function drawPolygonOnCanvas({
  canvas,
  diameter,
  vertices,
  vertexCircleRadiusSrc,
  src,
}: PolygonCanvasOptions): void {
  const top = 40;
  const left = 40;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const radius = diameter / 2;
  const center = { x: radius, y: radius };
  const angleIncrement = (2 * Math.PI) / vertices;

  ctx.beginPath();
  ctx.strokeStyle = `black`;
  ctx.arc(left + center.x, top + center.y, radius, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  for (let i = 0; i < vertices; i++) {
    const x = center.x + radius * Math.cos(i * angleIncrement);
    const y = center.y + radius * Math.sin(i * angleIncrement);
    if (i === 0) {
      ctx.moveTo(left + x, top + y);
    } else {
      ctx.lineTo(left + x, top + y);
    }

    const vertexCircleRadius = vertexCircleRadiusSrc * src[i][0]

    const x1 = center.x + radius * Math.cos(i * angleIncrement);
    const y1 = center.y + radius * Math.sin(i * angleIncrement);
    ctx.beginPath();
    ctx.strokeStyle = `rgb(255, 0, 0, 0.4)`;
    ctx.fillStyle = `rgb(255, 0, 0, ${src[i][1]})`;
    ctx.arc(left + x1, top + y1, vertexCircleRadius, 0, 2 * Math.PI);
    ctx.fill();

    const radius2 = (radius - vertexCircleRadius * src[i][2] + vertexCircleRadius)
    const x2 = center.x + radius2 * Math.cos(i * angleIncrement);
    const y2 = center.y + radius2 * Math.sin(i * angleIncrement);
    ctx.beginPath();
    ctx.fillStyle = ''
    ctx.strokeStyle = `rgb(255, 0, 0, 0.4)`;
    ctx.arc(left + x2, top + y2, vertexCircleRadius, 0, 2 * Math.PI);
    ctx.stroke();

    const radius3 = (radius - vertexCircleRadius * src[i][3]+vertexCircleRadius)
    const x3 = center.x + radius3 * Math.cos(i * angleIncrement);
    const y3 = center.y + radius3 * Math.sin(i * angleIncrement);
    ctx.beginPath();
    ctx.fillStyle = ''
    ctx.strokeStyle = `rgb(5, 5, 5, 0.3)`;
    ctx.arc(left + x3, top + y3, vertexCircleRadius, 0, 2 * Math.PI);
    ctx.stroke();

    if ((vertices < 100 && i % 5 == 0) || (100 <= vertices && i % 50 == 0)) {
      const tx = center.x + (radius + 30) * Math.cos(i * angleIncrement) - 7;
      const ty = center.y + (radius + 30) * Math.sin(i * angleIncrement);
      ctx.fillStyle = `rgb(5, 5, 5, .5)`;
      ctx.fillText(`${i}`, left + tx, top + ty + 3);
    }
  }

  ctx.closePath();
}
