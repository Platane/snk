import { pathRoundedRect } from "./pathRoundedRect";
import { Snake, snakeToCells } from "@snk/compute/snake";

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
