import { Grid, Color } from "@snk/compute/grid";
import { pathRoundedRect } from "./pathRoundedRect";
import { Point } from "@snk/compute/point";
import { drawGrid } from "./drawGrid";

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
  snake: Point[],
  o: Options
) => {
  for (let i = 0; i < snake.length; i++) {
    const u = (i + 1) * 0.6;

    ctx.save();
    ctx.fillStyle = o.colorSnake;
    ctx.translate(snake[i].x * o.sizeCell + u, snake[i].y * o.sizeCell + u);
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
  snake: Point[],
  stack: Color[],
  o: Options
) => {
  ctx.save();

  ctx.translate(2 * o.sizeCell, 2 * o.sizeCell);
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
};
