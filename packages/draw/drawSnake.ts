import { pathRoundedRect } from "./pathRoundedRect";
import { snakeToCells } from "@snk/types/snake";
import type { Snake } from "@snk/types/snake";

type Options = {
  colorSnake: string;
  sizeCell: number;
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

const lerp = (k: number, a: number, b: number) => (1 - k) * a + k * b;
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

export const drawSnakeLerp = (
  ctx: CanvasRenderingContext2D,
  snake0: Snake,
  snake1: Snake,
  k: number,
  o: Options
) => {
  const m = 0.8;
  const n = snake0.length / 2;
  for (let i = 0; i < n; i++) {
    const u = (i + 1) * 0.6 * (o.sizeCell / 16);

    const a = (1 - m) * (i / Math.max(n - 1, 1));
    const ki = clamp((k - a) / m, 0, 1);

    const x = lerp(ki, snake0[i * 2 + 0], snake1[i * 2 + 0]) - 2;
    const y = lerp(ki, snake0[i * 2 + 1], snake1[i * 2 + 1]) - 2;

    ctx.save();
    ctx.fillStyle = o.colorSnake;
    ctx.translate(x * o.sizeCell + u, y * o.sizeCell + u);
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
