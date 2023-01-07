import {Model} from "./model";

export class View {

    model: Model | null = null;

    width: number;
    height: number;

    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, model: Model) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.model = model;
	}

    repaint() {
        const ctx = this.canvas.getContext("2d");
        if(! ctx || !this.model) return;
        const wScale = this.width / this.model.country.numCities;
        const hScale = this.height / 0.5;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.width, this.height);
        this.model.country.cities.forEach((city, index)=>{
            if (city.dMShare < 0) {
                ctx.fillStyle = '#ff0000'
            } else {
                ctx.fillStyle = '#0000ff';
            }
            ctx.fillRect(index * wScale,
                this.height - city.MShare * hScale,
                wScale - 1,
                city.MShare * hScale);
        });
    }
}
