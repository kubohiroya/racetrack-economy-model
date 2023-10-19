import { Model } from "../model/model";

const labelWidth = 25;
const verticalMargin = 10;

export class BarChartView {
  canvas: HTMLCanvasElement;
  model: Model | undefined;

  constructor() {
    this.canvas = document.getElementById(
      "barChartCanvas",
    ) as HTMLCanvasElement;

    this.canvas.addEventListener("mousemove", (event) => {
      if (!this.model) return;
      const getIndex = (event: MouseEvent): number => {
        if (!this.model) return -1;
        const wScale =
          (this.canvas.width - labelWidth) / this.model.country.regions.length;
        if (event.offsetX < labelWidth) {
          return -1;
        }
        for (
          let index = 0;
          index < this.model.country.regions.length;
          index++
        ) {
          if (event.offsetX < labelWidth + (index + 1) * wScale) {
            return index;
          }
        }
        return -1;
      };
      const index = getIndex(event);
      if (this.model?.focusedRegionIndex != index) {
        this.model.focusedRegionIndex = index;
        this.model.notifyFocusRegion()
        this.draw();
      }
    });
    this.canvas.addEventListener("mouseout", (event) => {
      if (!this.model) return;
      this.model.focusedRegionIndex = -1;
      this.model.notifyFocusRegion()
      this.draw();
    });
  }

  setModel(model: Model) {
    this.model = model;
  }

  drawVerticalScales(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    hScale: number,
    verticalMargin: number,
    labelWidth: number,
  ) {
    const tickLength1 = width - labelWidth;
    const tickLength2 = 6;
    const step = 0.1;
    ctx.textAlign = "right";

    let numDrawnHorizontalLines = 0;

    for (let h = 0; h <= 1.0; h += step) {
      const y = height - verticalMargin - h * hScale;
      if (y >= 0) {
        ctx.fillStyle = "#ddd";
        ctx.fillRect(labelWidth, y - 1, tickLength1, 1);
        ctx.fillStyle = "#888";
        ctx.fillText(h.toFixed(1), labelWidth - 2, y + 3);
        numDrawnHorizontalLines++;
      }
    }

    if (numDrawnHorizontalLines < 5) {
      for (let h = 0.05; h <= 1.0; h += step) {
        const y = height - verticalMargin - h * hScale;
        if (y >= 0) {
          ctx.fillRect(labelWidth, y - 1, tickLength2, 1);
          ctx.fillText(h.toFixed(2), labelWidth - 2, y + 4);
        }
      }
    }

    if (numDrawnHorizontalLines < 2) {
      for (let h = 0.01; h <= 1.0; h += 0.01) {
        const y = height - verticalMargin - h * hScale;
        if (y >= 0) {
          ctx.fillRect(labelWidth, y - 1, tickLength2, 1);
          ctx.fillText(h.toFixed(2), labelWidth - 2, y + 4);
          numDrawnHorizontalLines++;
        }
      }
    }
  }

  drawHorizontalScales(
    ctx: CanvasRenderingContext2D,
    width: number,
    wScale: number,
    labelWidth: number,
    numRegions: number,
    yBase: number,
  ) {
    const tickLength1 = 8;
    const tickLength2 = 6;

    ctx.fillStyle = "#888";
    ctx.textAlign = "left";

    let numDrawnHorizontalLines = 0;

    if (numRegions <= 100) {
      const step = 5;
      for (let w = 5; w <= numRegions; w += step) {
        const x = labelWidth + w * wScale;
        ctx.fillText(w.toString(), x, yBase);
        numDrawnHorizontalLines++;
      }
    } else {
      const step = 50;
      for (let w = 50; w <= numRegions; w += step) {
        const x = labelWidth + w * wScale;
        ctx.fillText(w.toString(), x, yBase);
        numDrawnHorizontalLines++;
      }
    }
  }

  draw() {
    const ctx = this.canvas.getContext("2d");
    if (!ctx || !this.model) return;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, labelWidth, this.canvas.height);
    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(
      labelWidth,
      verticalMargin,
      this.canvas.width - labelWidth,
      this.canvas.height - verticalMargin * 2,
    );

    const wScale =
      (this.canvas.width - labelWidth) / this.model.country.regions.length;
    const hScale =
      (this.canvas.height - verticalMargin * 2) * this.model.barChartScale;

    this.drawVerticalScales(
      ctx,
      this.canvas.width,
      this.canvas.height,
      hScale,
      verticalMargin,
      labelWidth,
    );

    this.model.country.regions.forEach((city, index) => {
      if (city.deltaManufacturingShare < 0) {
        ctx.fillStyle = "#ee8888";
      } else {
        ctx.fillStyle = "#dd0000";
      }

      ctx.fillRect(
        labelWidth + index * wScale,
        this.canvas.height - verticalMargin - city.manufacturingShare * hScale,
        Math.max(wScale - 1, 1),
        city.manufacturingShare * hScale,
      );

      if (this.model!.focusedRegionIndex == index) {
        ctx.fillStyle = "rgb(255,255,0,0.3)";
        ctx.fillRect(
          labelWidth + index * wScale,
          verticalMargin,
          Math.max(wScale - 1, 1),
          this.canvas.height,
        );
      }
    });

    ctx.fillStyle = "#fff";
    ctx.fillRect(
      labelWidth,
      this.canvas.height - verticalMargin,
      this.canvas.width - labelWidth,
      verticalMargin,
    );
    this.drawHorizontalScales(
      ctx,
      this.canvas.width,
      wScale,
      labelWidth,
      this.model.country.regions.length,
      this.canvas.height - verticalMargin + 10,
    );

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, this.canvas.width, verticalMargin);
  }
}
