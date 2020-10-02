import * as fs from "fs";
import * as path from "path";
import { createCanvas } from "canvas";
import { Grid, copyGrid, Color } from "@snk/compute/grid";
import { Snake } from "@snk/compute/snake";
import { drawWorld } from "@snk/draw/drawWorld";
import { step } from "@snk/compute/step";
import * as tmp from "tmp";
import * as execa from "execa";

export const createGif = async (
  grid0: Grid,
  chain: Snake[],
  drawOptions: Parameters<typeof drawWorld>[4],
  gifOptions: { delay: number }
) => {
  let snake = chain[0];
  const grid = copyGrid(grid0);
  const stack: Color[] = [];

  const width = drawOptions.sizeCell * (grid.width + 2);
  const height = drawOptions.sizeCell * (grid.height + 4) + 100;

  const { name: dir, removeCallback: cleanUp } = tmp.dirSync({
    unsafeCleanup: true,
  });

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d")!;

  const writeImage = (i: number) => {
    ctx.clearRect(0, 0, 99999, 99999);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 99999, 99999);
    drawWorld(ctx, grid, snake, stack, drawOptions);

    const buffer = canvas.toBuffer("image/png", {
      compressionLevel: 0,
      filters: canvas.PNG_FILTER_NONE,
    });

    const fileName = path.join(dir, `${i.toString().padStart(4, "0")}.png`);

    fs.writeFileSync(fileName, buffer);
  };

  try {
    for (let i = 0; i < chain.length; i++) {
      snake = chain[i];

      step(grid, stack, snake);
      writeImage(i);
    }

    const outFileName = path.join(dir, "out.gif");
    const optimizedFileName = path.join(dir, "out.optimized.gif");

    await execa(
      "gm",
      [
        "convert",
        ["-loop", "0"],
        ["-delay", gifOptions.delay.toString()],
        ["-dispose", "2"],
        // ["-layers", "OptimizeFrame"],
        ["-compress", "LZW"],
        ["-strip"],

        path.join(dir, "*.png"),
        outFileName,
      ].flat()
    );

    await execa(
      "gifsicle",
      [
        //
        "--optimize=3",
        outFileName,
        ["--output", optimizedFileName],
      ].flat()
    );

    return fs.readFileSync(optimizedFileName);
  } finally {
    cleanUp();
  }
};
