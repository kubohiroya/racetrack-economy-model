import {Model} from "./model";

function drawVerticalScales(ctx: CanvasRenderingContext2D, width: number, height: number, hScale: number, verticalMargin: number, labelWidth: number) {
    const tickLength1 = width - labelWidth;
    const tickLength2 = 6;
    const step = 0.1;
    ctx.textAlign = 'right';

    let numDrawnHorizontalLines = 0;

    for (let h = 0; h <= 1.0; h += step) {
        const y = height - verticalMargin - h * hScale;
        if (y >= 0) {
            ctx.fillStyle = '#ddd';
            ctx.fillRect(labelWidth, y - 1, tickLength1, 1);
            ctx.fillStyle = '#888';
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

function drawHorizontalScales(ctx: CanvasRenderingContext2D, width: number, wScale: number, labelWidth: number, numCities: number, yBase: number) {
    const tickLength1 = 8;
    const tickLength2 = 6;

    ctx.fillStyle = '#888';
    ctx.textAlign = 'left';

    let numDrawnHorizontalLines = 0;

    if(numCities <= 100) {
        const step = 5;
        for (let w = 5; w <= numCities; w += step) {
            const x = labelWidth + w * wScale;
            ctx.fillText(w.toString(),  x, yBase);
            numDrawnHorizontalLines++;
        }
    }else{
        const step = 50;
        for (let w = 50; w <= numCities; w += step) {
            const x = labelWidth + w * wScale;
            ctx.fillText(w.toString(),  x, yBase);
            numDrawnHorizontalLines++;
        }
    }
}

export class View {

    model: Model;

    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, model: Model) {
        this.canvas = canvas;
        this.model = model;
    }

    repaint() {
        const labelWidth = 25;
        const verticalMargin = 10;
        const ctx = this.canvas.getContext("2d");
        if (!ctx || !this.model) return;
        const wScale = (this.canvas.width - labelWidth) / this.model.country.cities.length;
        const hScale = (this.canvas.height - verticalMargin * 2) * this.model.scale;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, labelWidth, this.canvas.height);
        ctx.fillStyle = '#f4f4f4';
        ctx.fillRect(labelWidth, verticalMargin, this.canvas.width - labelWidth, this.canvas.height - verticalMargin * 2);

        drawVerticalScales(ctx, this.canvas.width, this.canvas.height, hScale, verticalMargin, labelWidth);

        this.model.country.cities.forEach((city, index) => {
            if (city.dMShare < 0) {
                ctx.fillStyle = '#ee8888'
            } else {
                ctx.fillStyle = '#dd0000';
            }
            ctx.fillRect(labelWidth + index * wScale,
                this.canvas.height - verticalMargin - city.MShare * hScale,
                Math.max(wScale - 1, 1),
                city.MShare * hScale);
        });

        ctx.fillStyle = '#fff';
        ctx.fillRect(labelWidth, this.canvas.height - verticalMargin, this.canvas.width - labelWidth, verticalMargin);
        drawHorizontalScales(ctx, this.canvas.width, wScale, labelWidth, this.model.numCities, this.canvas.height - verticalMargin + 10);

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, this.canvas.width, verticalMargin);

    }
}
