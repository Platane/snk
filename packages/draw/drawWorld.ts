import { Grid, Color } from "@snk/compute/grid";
import { pathRoundedRect } from "./pathRoundedRect";
import { drawGrid } from "./drawGrid";
import { Snake, snakeToCells } from "@snk/compute/snake";

type Options = {
  colorDots: Record<Color, string>;
  colorEmpty: string;
  colorBorder: string;
  colorSnake: string;
  sizeCell: number;
  sizeDot: number;
  sizeBorderRadius: number;
};

export const drawSnake = (
  ctx: CanvasRenderingContext2D,
  snake: Snake,
  o: Options
) => {
  const cells = snakeToCells(snake);

  for (let i = 0; i < cells.length; i++) {
    const u = (i + 1) * 0.6;

    ctx.save();
    ctx.fillStyle = o.colorSnake;
    ctx.translate(cells[i].x * o.sizeCell + u, cells[i].y * o.sizeCell + u);
    ctx.beginPath();
    pathRoundedRect(
      ctx,
      o.sizeCell - u * 2,
      o.sizeCell - u * 2,
      (o.sizeCell - u * 2) * 0.25
    );
    ctx.fill();
    ctx.restore();
  }
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
