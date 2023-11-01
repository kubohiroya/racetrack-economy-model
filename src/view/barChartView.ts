import { Model } from "@/model/model";
import { Region } from "@/model/region";
import { SelectType } from "@/model/selectType";

const labelWidth = 32;
const rightMargin = 16;
const labelHeight = 24;

export class BarChartView {
  canvas: HTMLCanvasElement;
  barChartSelector: HTMLSelectElement;
  model: Model | undefined;

  config: Record<
    string,
    {
      min: number;
      max: number;
      oy: number;
      ticks: Array<{ min: number; max: number; step: number }>;
      bar?: (region: Region) => number;
      line?: (region: Region) => number;
      toFixed: number;
    }
  > = {
    "Share of Manufacturing": {
      min: 0,
      max: 1,
      oy: 0,
      ticks: [
        { min: 0, max: 1, step: 0.1 },
        { min: 0, max: 0.25, step: 0.05 },
        { min: 0, max: 0.1, step: 0.02 },
      ],
      bar: (region: Region) => region.manufacturingShare,
      toFixed: 2,
    },
    "Price Index": {
      min: 0,
      max: 4,
      oy: 0,
      ticks: [
        { min: 0, max: 4, step: 0.2 },
        { min: 0, max: 0.2, step: 0.05 },
      ],
      line: (region: Region) => region.priceIndex,
      toFixed: 2,
    },
    "Nominal Wage": {
      min: 0.8,
      max: 1.2,
      oy: 1,
      ticks: [
        { min: 0.8, max: 1.2, step: 0.05 },
        { min: 0.95, max: 1.05, step: 0.005 },
      ],
      line: (region: Region) => region.nominalWage,
      toFixed: 3,
    },
    "Real Wage": {
      min: 0.8,
      max: 1.2,
      oy: 1,
      ticks: [
        { min: 0.8, max: 1.2, step: 0.05 },
        { min: 0.9, max: 1.1, step: 0.01 },
        { min: 0.95, max: 1.05, step: 0.005 },
      ],
      line: (region: Region) => region.realWage,
      toFixed: 3,
    },
  };

  constructor() {
    this.canvas = document.getElementById(
      "barChartCanvas",
    ) as HTMLCanvasElement;

    this.barChartSelector = document.getElementById(
      "barChartSelector",
    ) as HTMLSelectElement;

    this.barChartSelector.addEventListener("change", () => {
      if (!this.model) return;
      this.model.barChartType = this.barChartSelector.value;
      this.draw();
    });

    const getIndex = (event: MouseEvent): number | null => {
      if (!this.model) return null;

      const wScale =
        (this.canvas.width - labelWidth - rightMargin) /
        this.model.country.regions.length;

      if (event.offsetX < labelWidth) {
        return null;
      }

      for (let index = 0; index < this.model.country.regions.length; index++) {
        if (event.offsetX < labelWidth + (index + 1) * wScale) {
          return index;
        }
      }
      return null;
    };

    this.canvas.addEventListener("mousemove", (event) => {
      if (!this.model) return;
      const index = getIndex(event);
      if (index == null || !this.model.focusedRegionIds.includes(index)) {
        this.model.notifyRegionSelect(
          "barChatView",
          this.model.focusedRegionIds,
          SelectType.FOCUSED,
          false,
        );
      }
      if (index != null) {
        this.model.notifyRegionSelect(
          "barChatView",
          [index],
          SelectType.FOCUSED,
          true,
        );
        this.canvas.style.cursor = "pointer";
      } else {
        this.canvas.style.cursor = "default";
      }
    });
    this.canvas.addEventListener("mousedown", (event) => {
      if (!this.model) return;
      const index = getIndex(event);
      if (index != null) {
        this.model.notifyRegionSelect(
          "barChatView",
          this.model.selectedRegionIds,
          SelectType.SELECTED,
          false,
        );
        this.model.notifyRegionSelect(
          "barChatView",
          [index],
          SelectType.SELECTED,
          true,
        );
      }
    });
    this.canvas.addEventListener("mouseout", () => {
      if (!this.model) return;
      this.model.notifyRegionSelect(
        "barChatView",
        this.model.focusedRegionIds,
        SelectType.FOCUSED,
        false,
      );
    });
  }

  setModel(model: Model) {
    this.model = model;
  }

  drawHorizontalLabels(
    ctx: CanvasRenderingContext2D,
    wScale: number,
    labelWidth: number,
    numRegions: number,
    yBase: number,
  ) {
    ctx.fillStyle = "#888";
    ctx.textAlign = "left";

    let numDrawnHorizontalLines = 0;

    if (numRegions <= 20) {
      const step = 1;
      for (let w = 0; w < numRegions; w += step) {
        const x = labelWidth + w * wScale;
        ctx.fillText(w.toString(), x + 1, yBase);
        numDrawnHorizontalLines++;
      }
    } else {
      const step = 10;
      for (let w = 10; w < numRegions; w += step) {
        const x = labelWidth + w * wScale;
        ctx.fillText(w.toString(), x + 1, yBase);
        numDrawnHorizontalLines++;
      }
    }
  }

  draw() {
    const ctx = this.canvas.getContext("2d");
    if (!ctx || !this.model) return;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(
      labelWidth,
      0,
      this.canvas.width - labelWidth - rightMargin,
      this.canvas.height - labelHeight,
    );

    const config = this.config[this.model?.barChartType!];
    const wScale =
      (this.canvas.width - labelWidth - rightMargin) /
      this.model.country.regions.length;

    ctx.textAlign = "right";
    const w = this.canvas.width - labelWidth - rightMargin;

    const scale = this.model?.barChartScale || 1;
    const graphHeight = this.canvas.height - labelHeight;

    const convertY = (value: number): number => {
      return _convertY(
        value,
        config.max,
        config.min,
        graphHeight,
        config.oy,
        scale,
      );
    };

    const _convertY = (
      value: number,
      max: number,
      min: number,
      graphHeight: number,
      oy: number = 0,
      scale: number = 1,
    ): number => {
      const relativeY = (value - oy) / (max - min);
      return graphHeight * scale * relativeY + (oy * graphHeight) / 2;
    };

    for (let i = 0; i < config.ticks.length; i++) {
      const { min, max, step } = config.ticks[i];
      let numDrawn = 0;
      for (let value = min; value <= max; value += step) {
        ctx.fillStyle = "#ddd";
        const y = this.canvas.height - labelHeight - convertY(value);
        if (0 <= y && y <= this.canvas.height - labelHeight) {
          ctx.fillRect(labelWidth, y, w, 1);
          ctx.fillStyle = "#888";
          ctx.fillText(value.toFixed(config.toFixed), labelWidth - 2, y);
          numDrawn++;
          // console.log(i, value)
        }
      }
      if (numDrawn > 1) {
        break;
      }
    }

    this.model.country.regions.forEach((region, index) => {
      if (this.model!.focusedRegionIds.includes(index)) {
        ctx.fillStyle = "rgb(255,255,0,0.3)";
        ctx.fillRect(
          labelWidth + index * wScale,
          0,
          Math.max(wScale - 1, 1),
          this.canvas.height,
        );
      }

      const barValue = config.bar ? config.bar(region) : null;
      if (barValue != null) {
        const style = barValue < 0 ? "#e88" : "#d00";
        ctx.strokeStyle = ctx.fillStyle = style;

        const y = convertY(barValue);

        if (0 <= y && y <= this.canvas.height - labelHeight) {
          ctx.fillRect(
            labelWidth + index * wScale,
            this.canvas.height - labelHeight - y,
            Math.max(wScale - 1, 1),
            y,
          );
        } else if (this.canvas.height - labelHeight < y) {
          ctx.fillRect(
            labelWidth + index * wScale,
            0,
            Math.max(wScale - 1, 1),
            this.canvas.height - labelHeight,
          );
        }

        if (this.model!.selectedRegionIds.includes(index)) {
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#ff0";
          if (0 <= y && y <= this.canvas.height - labelHeight) {
            ctx.strokeRect(
              labelWidth + index * wScale + 2,
              this.canvas.height - labelHeight - y + 2,
              Math.max(wScale - 1, 1) - 4,
              y - 4,
            );
          } else if (this.canvas.height - labelHeight < y) {
            ctx.strokeRect(
              labelWidth + index * wScale,
              0,
              Math.max(wScale - 1, 1),
              this.canvas.height - labelHeight,
            );
          }
          ctx.strokeStyle = style;
        }
      }
    });

    ctx.beginPath();
    this.model.country.regions.forEach((region, index) => {
      const lineValue = config.line ? config.line(region) : null;
      if (lineValue != null) {
        const y = this.canvas.height - labelHeight - convertY(lineValue);
        ctx.strokeStyle = "#e88";
        ctx.lineWidth = 2;
        if (index == 0) {
          ctx.moveTo(labelWidth + (index + 0.5) * wScale, y);
        } else {
          ctx.lineTo(labelWidth + (index + 0.5) * wScale, y);
        }
      }
    });
    ctx.stroke();

    this.drawHorizontalLabels(
      ctx,
      wScale,
      labelWidth,
      this.model.country.regions.length,
      this.canvas.height - 12,
    );
  }
}
