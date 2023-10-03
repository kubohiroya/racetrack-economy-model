type PolygonCanvasOptions = {
  canvas: HTMLCanvasElement,
  diameter: number;
  vertices: number;
  vertexCircleRadius: number;
  vertexCircleValueSource: number[]
};
export function drawPolygonOnCanvas({ canvas, diameter, vertices, vertexCircleRadius, vertexCircleValueSource }: PolygonCanvasOptions): void {
  const top = 20
  const left = 20

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const radius = diameter / 2;
  const center = { x: radius, y: radius };
  const angleIncrement = (2 * Math.PI) / vertices;

  ctx.beginPath();
  ctx.arc(left+center.x, top+center.y, radius, 0, 2 * Math.PI);
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

    ctx.beginPath();
    ctx.arc(left + x, top + y, vertexCircleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgb(255, 0, 0, ${vertexCircleValueSource[i]})`;
    ctx.fill();

    const tx = center.x + (radius+15) * Math.cos(i * angleIncrement) - 7;
    const ty = center.y + (radius+15) * Math.sin(i * angleIncrement);

    ctx.fillStyle = `rgb(5, 5, 5, .5)`;
    if((vertices < 100 && i % 5 == 0) || (100 <= vertices && i % 50 == 0)){
      ctx.fillText(`${i}`, left + tx, top + ty + 3)
    }
  }

  ctx.closePath();
}

