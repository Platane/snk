// import { generateGrid } from "@snk/compute/generateGrid";

import { generateGrid } from "@snk/compute/generateGrid";
import { Color, copyGrid } from "@snk/compute/grid";
import { computeBestRun } from "@snk/compute";
import { step } from "@snk/compute/step";
import { drawWorld } from "@snk/draw/drawWorld";
import { Point } from "@snk/compute/point";

const copySnake = (x: Point[]) => x.map((p) => ({ ...p }));

export const run = async () => {
  const drawOptions = {
    sizeBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
    colorBorder: "#1b1f230a",
    colorDots: { 1: "#9be9a8", 2: "#40c463", 3: "#30a14e", 4: "#216e39" },
    colorEmpty: "#ebedf0",
    colorSnake: "purple",
  };

  const gameOptions = { maxSnakeLength: 5 };

  const grid0 = generateGrid(14, 7, { colors: [1, 2, 3, 4], emptyP: 3 });

  const snake0 = [
    { x: 4, y: -1 },
    { x: 3, y: -1 },
    { x: 2, y: -1 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
  ];
  const stack0: Color[] = [];

  const chain = computeBestRun(grid0, snake0, gameOptions);

  const canvas = document.createElement("canvas");
  canvas.width = drawOptions.sizeCell * (grid0.width + 4);
  canvas.height = drawOptions.sizeCell * (grid0.height + 4) + 100;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;

  const update = (n: number) => {
    const snake = copySnake(snake0);
    const stack = stack0.slice();
    const grid = copyGrid(grid0);

    for (let i = 0; i < n; i++) step(grid, snake, stack, chain[i], gameOptions);

    ctx.clearRect(0, 0, 9999, 9999);
    drawWorld(ctx, grid, snake, stack, drawOptions);
  };

  const input: any = document.createElement("input");
  input.type = "range";
  input.style.width = "100%";
  input.min = 0;
  input.max = chain.length;
  input.step = 1;
  input.value = 0;
  input.addEventListener("input", () => update(+input.value));
  document.addEventListener("click", () => input.focus());

  document.body.appendChild(input);

  update(+input.value);

  // while (chain.length) {
  //   await wait(100);

  //   step(grid, snake, stack, chain.shift()!, gameOptions);

  //   ctx.clearRect(0, 0, 9999, 9999);
  //   drawWorld(ctx, grid, snake, stack, options);
  // }

  // const wait = (delay = 0) => new Promise((r) => setTimeout(r, delay));
};

run();
