import { Color, Grid } from "@snk/types/grid";
import { drawLerpWorld, drawWorld } from "@snk/draw/drawWorld";
import { Snake } from "@snk/types/snake";

export const drawOptions = {
  sizeBorderRadius: 2,
  sizeCell: 16,
  sizeDot: 12,
  colorBorder: "#1b1f230a",
  colorDots: {
    1: "#9be9a8",
    2: "#40c463",
    3: "#30a14e",
    4: "#216e39",
    5: "orange",
  },
  colorEmpty: "#ebedf0",
  colorSnake: "purple",
};

export const createCanvas = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const canvas = document.createElement("canvas");
  const upscale = 2;
  const w = drawOptions.sizeCell * (width + 4);
  const h = drawOptions.sizeCell * (height + 4) + 200;
  canvas.width = w * upscale;
  canvas.height = h * upscale;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";

  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d")!;
  ctx.scale(upscale, upscale);

  const draw = (grid: Grid, snake: Snake, stack: Color[]) => {
    ctx.clearRect(0, 0, 9999, 9999);
    drawWorld(ctx, grid, snake, stack, drawOptions);
  };

  const drawLerp = (
    grid: Grid,
    snake0: Snake,
    snake1: Snake,
    stack: Color[],
    k: number
  ) => {
    ctx.clearRect(0, 0, 9999, 9999);
    drawLerpWorld(ctx, grid, snake0, snake1, stack, k, drawOptions);
  };

  return { draw, drawLerp, canvas, ctx };
};
