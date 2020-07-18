import * as fs from "fs";
import * as path from "path";
import { createCanvas } from "canvas";
import { Grid, copyGrid, Color } from "@snk/compute/grid";
import { Point } from "@snk/compute/point";
import { copySnake } from "@snk/compute/snake";
import { drawWorld } from "@snk/draw/drawWorld";
import { step } from "@snk/compute/step";

// @ts-ignore
import * as mkdirp from "mkdirp";

export const createGif = (
  grid0: Grid,
  snake0: Point[],
  commands: Point[],
  drawOptions: Parameters<typeof drawWorld>[4],
  gameOptions: Parameters<typeof step>[4]
) => {
  const grid = copyGrid(grid0);
  const snake = copySnake(snake0);
  const stack: Color[] = [];

  const width = drawOptions.sizeCell * (grid.width + 4);
  const height = drawOptions.sizeCell * (grid.height + 4) + 100;

  const dir = path.join(__dirname, "tmp", Math.random().toString(36).slice(2));
  mkdirp.sync(dir);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d")!;

  const writeImage = (i: number) => {
    ctx.clearRect(0, 0, 99999, 99999);
    drawWorld(ctx, grid, snake, stack, drawOptions);

    const buffer = canvas.toBuffer("image/png", {
      compressionLevel: 0,
      filters: canvas.PNG_FILTER_NONE,
    });

    const filename = path.join(dir, `${i.toString().padStart(4, "0")}.png`);

    console.log(filename);

    fs.writeFileSync(filename, buffer);
  };

  writeImage(0);

  for (let i = 0; i < commands.length; i++) {
    step(grid, snake, stack, commands[i], gameOptions);
    writeImage(i + 1);
  }
};
