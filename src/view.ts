import {Model} from "./model";

export class View {

    model: Model | null = null;

    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, model: Model) {
        this.canvas = canvas;
        this.model = model;
	}

    repaint() {
        const ctx = this.canvas.getContext("2d");
        if(! ctx || ! this.model) return;
        const wScale = this.canvas.width / this.model.country.cities.length;
        const hScale = this.canvas.height / 0.5;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.model.country.cities.forEach((city, index)=>{
            if (city.dMShare < 0) {
                ctx.fillStyle = '#ff0000'
            } else {
                ctx.fillStyle = '#0000ff';
            }
            ctx.fillRect(index * wScale,
                this.canvas.height - city.MShare * hScale,
                wScale - 1,
                city.MShare * hScale);
        });
    }
}
