import * as fs from "fs";
import * as path from "path";
import { createCanvas } from "canvas";
import { Grid, copyGrid, Color } from "@snk/compute/grid";
import { Snake } from "@snk/compute/snake";
import { Options, drawLerpWorld } from "@snk/draw/drawWorld";
import { step } from "@snk/compute/step";
import * as tmp from "tmp";
import * as execa from "execa";

const withTmpDir = async <T>(
  handler: (dir: string) => Promise<T>
): Promise<T> => {
  const { name: dir, removeCallback: cleanUp } = tmp.dirSync({
    unsafeCleanup: true,
  });

  try {
    return await handler(dir);
  } finally {
    cleanUp();
  }
};

export const createGif = async (
  grid0: Grid,
  chain: Snake[],
  drawOptions: Options,
  gifOptions: { frameDuration: number; step: number }
) =>
  withTmpDir(async (dir) => {
    const width = drawOptions.sizeCell * (grid0.width + 2);
    const height = drawOptions.sizeCell * (grid0.height + 4) + 100;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d")!;

    const grid = copyGrid(grid0);
    const stack: Color[] = [];

    for (let i = 0; i < chain.length; i += 1) {
      const snake0 = chain[i];
      const snake1 = chain[Math.min(chain.length - 1, i + 1)];
      step(grid, stack, snake0);

      for (let k = 0; k < gifOptions.step; k++) {
        ctx.clearRect(0, 0, 99999, 99999);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, 99999, 99999);
        drawLerpWorld(
          ctx,
          grid,
          snake0,
          snake1,
          stack,
          k / gifOptions.step,
          drawOptions
        );

        const buffer = canvas.toBuffer("image/png", {
          compressionLevel: 0,
          filters: canvas.PNG_FILTER_NONE,
        });

        const fileName = path.join(
          dir,
          `${(i * gifOptions.step + k).toString().padStart(4, "0")}.png`
        );

        fs.writeFileSync(fileName, buffer);
      }
    }

    const outFileName = path.join(dir, "out.gif");
    const optimizedFileName = path.join(dir, "out.optimized.gif");

    await execa(
      "gm",
      [
        "convert",
        ["-loop", "0"],
        ["-delay", gifOptions.frameDuration.toString()],
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
  });
