import { Grid, Color } from "@snk/compute/grid";
import { drawGrid } from "./drawGrid";
import { Snake } from "@snk/compute/snake";
import { drawSnake } from "./drawSnake";

type Options = {
  colorDots: Record<Color, string>;
  colorEmpty: string;
  colorBorder: string;
  colorSnake: string;
  sizeCell: number;
  sizeDot: number;
  sizeBorderRadius: number;
};

export const drawWorld = (
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  snake: Snake,
  stack: Color[],
  o: Options
) => {
  ctx.save();

  ctx.translate(1 * o.sizeCell, 2 * o.sizeCell);
  drawGrid(ctx, grid, o);
  drawSnake(ctx, snake, o);

  ctx.restore();

  const m = 5;

  ctx.save();
  ctx.translate(o.sizeCell, (grid.height + 4) * o.sizeCell);
  for (let i = 0; i < stack.length; i++) {
    ctx.fillStyle = o.colorDots[stack[i]];
    ctx.fillRect(i * m, 0, m, 10);
  }
  ctx.restore();

  // ctx.save();
  // ctx.translate(o.sizeCell + 100, (grid.height + 4) * o.sizeCell + 100);
  // ctx.scale(0.6, 0.6);
  // drawCircleStack(ctx, stack, o);
  // ctx.restore();
};
