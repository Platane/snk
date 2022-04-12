import { getColor } from "@snk/types/grid";
import { pathRoundedRect } from "./pathRoundedRect";
import type { Grid, Color } from "@snk/types/grid";
import type { Point } from "@snk/types/point";

type Options = {
  colorDots: Record<Color, string>;
  colorEmpty: string;
  colorDotBorder: string;
  sizeCell: number;
  sizeDot: number;
  sizeDotBorderRadius: number;
};

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  cells: Point[] | null,
  o: Options
) => {
  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      if (!cells || cells.some((c) => c.x === x && c.y === y)) {
        const c = getColor(grid, x, y);
        // @ts-ignore
        const color = !c ? o.colorEmpty : o.colorDots[c];
        ctx.save();
        ctx.translate(
          x * o.sizeCell + (o.sizeCell - o.sizeDot) / 2,
          y * o.sizeCell + (o.sizeCell - o.sizeDot) / 2
        );

        ctx.fillStyle = color;
        ctx.strokeStyle = o.colorDotBorder;
        ctx.lineWidth = 1;
        ctx.beginPath();

        pathRoundedRect(ctx, o.sizeDot, o.sizeDot, o.sizeDotBorderRadius);

        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
      }
    }
};
