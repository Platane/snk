import { Color, Grid } from "@snk/types/grid";
import { drawLerpWorld, drawWorld } from "@snk/draw/drawWorld";
import { Snake } from "@snk/types/snake";
import type { DrawOptions as DrawOptions } from "@snk/svg-creator";

export const drawOptions: DrawOptions = {
  sizeDotBorderRadius: 2,
  sizeCell: 16,
  sizeDot: 12,
  colorDotBorder: "#1b1f230a",
  colorDots: {
    1: "#9be9a8",
    2: "#40c463",
    3: "#30a14e",
    4: "#216e39",
  },
  colorEmpty: "#ebedf0",
  colorSnake: "purple",
  dark: {
    colorEmpty: "#161b22",
    colorDots: { 1: "#01311f", 2: "#034525", 3: "#0f6d31", 4: "#00c647" },
  },
};

const getPointedCell =
  (canvas: HTMLCanvasElement) =>
  ({ pageX, pageY }: MouseEvent) => {
    const { left, top } = canvas.getBoundingClientRect();

    const x = Math.floor((pageX - left) / drawOptions.sizeCell) - 1;
    const y = Math.floor((pageY - top) / drawOptions.sizeCell) - 2;

    return { x, y };
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
  canvas.style.display = "block";
  // canvas.style.pointerEvents = "none";

  const cellInfo = document.createElement("div");
  cellInfo.style.height = "20px";

  document.body.appendChild(cellInfo);
  document.body.appendChild(canvas);
  canvas.addEventListener("mousemove", (e) => {
    const { x, y } = getPointedCell(canvas)(e);
    cellInfo.innerText = [x, y]
      .map((u) => u.toString().padStart(2, " "))
      .join(" / ");
  });

  const ctx = canvas.getContext("2d")!;
  ctx.scale(upscale, upscale);

  const draw = (grid: Grid, snake: Snake, stack: Color[]) => {
    ctx.clearRect(0, 0, 9999, 9999);
    drawWorld(ctx, grid, null, snake, stack, drawOptions);
  };

  const drawLerp = (
    grid: Grid,
    snake0: Snake,
    snake1: Snake,
    stack: Color[],
    k: number
  ) => {
    ctx.clearRect(0, 0, 9999, 9999);
    drawLerpWorld(ctx, grid, null, snake0, snake1, stack, k, drawOptions);
  };

  const highlightCell = (x: number, y: number, color = "orange") => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillRect((1 + x + 0.5) * 16 - 2, (2 + y + 0.5) * 16 - 2, 4, 4);
  };

  return {
    draw,
    drawLerp,
    highlightCell,
    canvas,
    getPointedCell: getPointedCell(canvas),
    ctx,
  };
};
