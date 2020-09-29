import { Grid, getColor, Color } from "@snk/compute/grid";
import { pathRoundedRect } from "./pathRoundedRect";

type Options = {
  colorDots: Record<Color, string>;
  colorEmpty: string;
  colorBorder: string;
  sizeCell: number;
  sizeDot: number;
  sizeBorderRadius: number;
};

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  o: Options
) => {
  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      const c = getColor(grid, x, y);
      // @ts-ignore
      const color = !c ? o.colorEmpty : o.colorDots[c];
      ctx.save();
      ctx.translate(
        x * o.sizeCell + (o.sizeCell - o.sizeDot) / 2,
        y * o.sizeCell + (o.sizeCell - o.sizeDot) / 2
      );

      ctx.fillStyle = color;
      ctx.strokeStyle = o.colorBorder;
      ctx.lineWidth = 1;
      ctx.beginPath();

      pathRoundedRect(ctx, o.sizeDot, o.sizeDot, o.sizeBorderRadius);

      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.restore();
    }
};
