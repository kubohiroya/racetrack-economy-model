import {Model} from "./model";

export class View {

    model: Model;

    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, model: Model) {
        this.canvas = canvas;
        this.model = model;
    }

    repaint() {
        const ctx = this.canvas.getContext("2d");
        if (!ctx || !this.model) return;
        const wScale = this.canvas.width / this.model.country.cities.length;
        const hScale = this.canvas.height * this.model.numCities / 64 * this.model.scale;
        ctx.fillStyle = '#f8f8f8';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.model.country.cities.forEach((city, index) => {
            if (city.dMShare < 0) {
                ctx.fillStyle = '#8888ff'
            } else {
                ctx.fillStyle = '#0000ff';
            }
            ctx.fillRect(index * wScale,
                this.canvas.height - city.MShare * hScale,
                wScale - 1,
                city.MShare * hScale );
        });
    }
}
