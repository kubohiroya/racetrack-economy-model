import { NodeViewMode } from "@/graph/nodeViewMode";

export class RegionView {
  id: number;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;

  constructor(id: number, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius= 0;
    this.vx = 0;
    this.vy = 0;
  }

  draw(ctx: CanvasRenderingContext2D, radius: number, mode: NodeViewMode) {
    ctx.beginPath();
    //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    switch (mode) {
      case NodeViewMode.none:
        ctx.fillStyle = `rgb(128, 0, 0, 0.2)`;
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        break;
      case NodeViewMode.focused:
        ctx.fillStyle = `rgb(255, 0, 0, 0.2)`;
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(255, 255, 0, 0.2)`;
        ctx.arc(this.x, this.y, radius * 3, 0, Math.PI * 2);
        break;
      case NodeViewMode.selected:
        ctx.fillStyle = `rgb(235, 10, 0, 0.4)`;
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        break;
    }

    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "rgb(40,40,40,0.6)";
    ctx.fillText(this.id.toString(), this.x + 15, this.y - 15);
    this.radius = radius;
  }
}
