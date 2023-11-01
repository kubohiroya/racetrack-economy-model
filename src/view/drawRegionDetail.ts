import { Model } from "@/model/model";

export function drawRegionDetail(
  model: Model,
  ctx: CanvasRenderingContext2D,
  center: { x: number; y: number },
) {
  if (model.focusedRegionIds.length > 0) {
    ctx.save();

    const offsetX = -80;
    const offsetY = -60;

    const region = model.country.regions[model.focusedRegionIds[0]];

    if (!region) return;

    const highlow: string =
      region.realWage > model.country.avgRealWage
        ? "↑"
        : region.realWage < model.country.avgRealWage
        ? "↓"
        : "";

    ctx.fillStyle = `black`;
    [
      "Region #" + region.id,
      " Share of manufacturing = " + region.manufacturingShare.toFixed(4),
      " Share of agriculture = " + region.agricultureShare.toFixed(4),
      " Price index = " + region.priceIndex.toFixed(4),
      " Income = " + region.income.toFixed(4),
      " Nominal wage = " + region.nominalWage.toFixed(4),
      " Real wage = " + region.realWage.toFixed(4) + " " + highlow,
      " Average real wage = " + model.country.avgRealWage.toFixed(4),
    ].forEach((text, index) => {
      const c = new DOMPoint(
        center.x + offsetX,
        center.y + offsetY + index * 15,
      );
      ctx.fillText(text, c.x, c.y);
    });

    ctx.restore();
  }
}
