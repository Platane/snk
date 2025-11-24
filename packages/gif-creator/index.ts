import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  type Options as DrawOptions,
  drawLerpWorld,
  getCanvasWorldSize,
} from "@snk/draw/drawWorld";
import { step } from "@snk/solver/step";
import { Color, copyGrid, Grid } from "@snk/types/grid";
import type { Point } from "@snk/types/point";
import { Snake } from "@snk/types/snake";
import { createCanvas } from "canvas";
// @ts-ignore
import GIFEncoder from "gif-encoder-2";
import gifsicle from "gifsicle";

export type { Options as DrawOptions } from "@snk/draw/drawWorld";

export type AnimationOptions = { stepDurationMs: number; frameByStep: number };

export const createGif = async (
  grid0: Grid,
  cells: Point[] | null,
  chain: Snake[],
  drawOptions: DrawOptions,
  animationOptions: AnimationOptions,
) =>
  withTmpDir(async (dir) => {
    const { width, height } = getCanvasWorldSize(grid0, drawOptions);

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d", {
      alpha: true,
    }) as any as CanvasRenderingContext2D;

    const grid = copyGrid(grid0);
    const stack: Color[] = [];

    const encoder = new GIFEncoder(
      width,
      height,
      "neuquant",
      true,
      chain.length * animationOptions.frameByStep,
    );
    encoder.setRepeat(0);
    encoder.setDelay(
      animationOptions.stepDurationMs / animationOptions.frameByStep,
    );
    // transparency does not look good, let's not
    // encoder.setTransparent("0x000000");
    encoder.start();

    for (let i = 0; i < chain.length; i += 1) {
      const snake0 = chain[i];
      const snake1 = chain[Math.min(chain.length - 1, i + 1)];
      step(grid, stack, snake0);

      for (let k = 0; k < animationOptions.frameByStep; k++) {
        ctx.clearRect(0, 0, width, height);
        drawLerpWorld(
          ctx,
          grid,
          cells,
          snake0,
          snake1,
          stack,
          k / animationOptions.frameByStep,
          drawOptions,
        );

        encoder.addFrame(ctx);
      }
    }

    const outFileName = path.join(dir, "out.gif");
    const optimizedFileName = path.join(dir, "out.optimized.gif");

    // generate palette file
    const paletteFileName = path.join(dir, "palette.txt");
    {
      const colors = [
        drawOptions.colorBackground,
        drawOptions.colorEmpty,
        drawOptions.colorSnake,
        drawOptions.colorDotBorder,
        ...Object.values(drawOptions.colorDots),
      ].filter(Boolean) as string[];

      const canvas = createCanvas(colors.length, 1);
      const ctx = canvas.getContext("2d") as any as CanvasRenderingContext2D;
      for (let i = colors.length; i--; ) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(i, 0, 1, 1);
      }

      const imgData = ctx.getImageData(0, 0, colors.length, 1);

      fs.writeFileSync(
        paletteFileName,
        Array.from({ length: colors.length }, (_, i) =>
          [
            imgData.data[i * 4 + 0],
            imgData.data[i * 4 + 1],
            imgData.data[i * 4 + 2],
          ].join(" "),
        ).join("\n"),
      );
    }

    encoder.finish();
    fs.writeFileSync(outFileName, encoder.out.getData());

    execFileSync(
      gifsicle,
      [
        //
        "--optimize=3",
        "--color-method=diversity",
        `--use-colormap=${paletteFileName}`,
        // "--colors=16",
        outFileName,
        ["--output", optimizedFileName],
      ].flat(),
    );

    return new Uint8Array(fs.readFileSync(optimizedFileName));
  });

export const withTmpDir = async <T>(
  handler: (dir: string) => Promise<T>,
): Promise<T> => {
  const dir = path.join(tmpdir(), Math.random().toString(16).slice(2));

  fs.mkdirSync(dir, { recursive: true });

  try {
    return await handler(dir);
  } finally {
    fs.rmdirSync(dir, { recursive: true });
  }
};
