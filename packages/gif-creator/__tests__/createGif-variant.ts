import fs from "node:fs";
import path from "node:path";
import { execFileSync, execSync } from "node:child_process";
import { Canvas, createCanvas } from "canvas";
import { Grid, copyGrid, Color } from "@snk/types/grid";
import { Snake } from "@snk/types/snake";
import {
  type Options as DrawOptions,
  drawLerpWorld,
  getCanvasWorldSize,
} from "@snk/draw/drawWorld";
import type { Point } from "@snk/types/point";
import { step } from "@snk/solver/step";
import gifsicle from "gifsicle";
// @ts-ignore
import GIFEncoder from "gif-encoder-2";
import { withTmpDir } from "..";

export type { Options as DrawOptions } from "@snk/draw/drawWorld";

export type AnimationOptions = { stepDurationMs: number; frameByStep: number };

const traverse = async (
  grid0: Grid,
  cells: Point[] | null,
  chain: Snake[],
  drawOptions: DrawOptions,
  animationOptions: AnimationOptions,
  onFrame: (
    canvas: Canvas,
    ctx: CanvasRenderingContext2D,
  ) => void | Promise<void>,
) => {
  const { width, height } = getCanvasWorldSize(grid0, drawOptions);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d", {
    alpha: true,
  }) as any as CanvasRenderingContext2D;

  const grid = copyGrid(grid0);
  const stack: Color[] = [];

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

      await onFrame(canvas, ctx);
    }
  }
};

const generateImageSequence = async (
  grid0: Grid,
  cells: Point[] | null,
  chain: Snake[],
  drawOptions: DrawOptions,
  animationOptions: AnimationOptions,
  dir: string,
) => {
  let h = 0;

  await traverse(
    grid0,
    cells,
    chain,
    drawOptions,
    animationOptions,
    async (canvas) => {
      const stream = canvas
        .createPNGStream({ compressionLevel: 0 })
        .pipe(
          fs.createWriteStream(
            path.join(dir, `img_${(h++).toString().padStart(5, "0")}.png`),
          ),
        );

      await new Promise<void>((resolve) => {
        if (stream.closed) resolve();
        else stream.addListener("close", resolve);
      });
    },
  );
};

export const createGif_gifEncoder = async (
  grid0: Grid,
  cells: Point[] | null,
  chain: Snake[],
  drawOptions: DrawOptions,
  animationOptions: AnimationOptions,
) => {
  const { width, height } = getCanvasWorldSize(grid0, drawOptions);

  const encoder = new GIFEncoder(width, height, "neuquant", true);
  encoder.setRepeat(0);
  encoder.setDelay(
    animationOptions.stepDurationMs / animationOptions.frameByStep,
  );
  encoder.start();

  await traverse(grid0, cells, chain, drawOptions, animationOptions, (_, ctx) =>
    encoder.addFrame(ctx),
  );

  encoder.finish();

  return new Uint8Array(encoder.out.getData());
};

export const canvasDrawNoOutput = async (
  grid0: Grid,
  cells: Point[] | null,
  chain: Snake[],
  drawOptions: DrawOptions,
  animationOptions: AnimationOptions,
) => {
  await traverse(grid0, cells, chain, drawOptions, animationOptions, () => {});

  return new Uint8Array([]);
};

export const createPngImageSequenceNoOutput = async (
  grid0: Grid,
  cells: Point[] | null,
  chain: Snake[],
  drawOptions: DrawOptions,
  animationOptions: AnimationOptions,
) =>
  withTmpDir(async (dir) => {
    await generateImageSequence(
      grid0,
      cells,
      chain,
      drawOptions,
      animationOptions,
      dir,
    );

    return new Uint8Array([]);
  });

export const createGif_ffmpeg = async (
  grid0: Grid,
  cells: Point[] | null,
  chain: Snake[],
  drawOptions: DrawOptions,
  animationOptions: AnimationOptions,
) =>
  withTmpDir(async (dir) => {
    await generateImageSequence(
      grid0,
      cells,
      chain,
      drawOptions,
      animationOptions,
      dir,
    );

    const outFileName = path.join(dir, "out.gif");

    execSync(
      [
        "ffmpeg",
        ["-i", path.join(dir, "img_%05d.png")],
        ["-filter_complex", `"palettegen"`],
        path.join(dir, "palette.png"),
      ]
        .flat()
        .join(" "),
      { stdio: ["ignore", "pipe", "pipe"] },
    );

    execSync(
      [
        "ffmpeg",
        [
          "-framerate",
          (
            1000 /
            (animationOptions.stepDurationMs / animationOptions.frameByStep)
          ).toFixed(3),
        ],
        ["-i", path.join(dir, "img_%05d.png")],
        ["-i", path.join(dir, "palette.png")],
        ["-filter_complex", `"paletteuse"`],
        outFileName,
      ]
        .flat()
        .join(" "),
      { stdio: ["ignore", "pipe", "pipe"] },
    );

    return new Uint8Array(fs.readFileSync(outFileName));
  });

export const createGif_ffmpeg_gifslice = async (
  grid0: Grid,
  cells: Point[] | null,
  chain: Snake[],
  drawOptions: DrawOptions,
  animationOptions: AnimationOptions,
) =>
  withTmpDir(async (dir) => {
    await generateImageSequence(
      grid0,
      cells,
      chain,
      drawOptions,
      animationOptions,
      dir,
    );

    const outFileName = path.join(dir, "out.gif");

    execSync(
      [
        "ffmpeg",
        ["-i", path.join(dir, "img_%05d.png")],
        ["-filter_complex", `"palettegen"`],
        path.join(dir, "palette.png"),
      ]
        .flat()
        .join(" "),
      { stdio: ["ignore", "pipe", "pipe"] },
    );

    execSync(
      [
        "ffmpeg",
        [
          "-framerate",
          (
            1000 /
            (animationOptions.stepDurationMs / animationOptions.frameByStep)
          ).toFixed(3),
        ],
        ["-i", path.join(dir, "img_%05d.png")],
        ["-i", path.join(dir, "palette.png")],
        ["-filter_complex", `"paletteuse"`],
        outFileName,
      ]
        .flat()
        .join(" "),
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    const optimizedFileName = path.join(dir, "out.optimized.gif");

    execFileSync(
      gifsicle,
      [
        //
        "--optimize=3",
        "--color-method=diversity",
        // "--colors=16",
        outFileName,
        ["--output", optimizedFileName],
      ].flat(),
    );

    return new Uint8Array(fs.readFileSync(optimizedFileName));
  });

export const createGif_graphicMagic = async (
  grid0: Grid,
  cells: Point[] | null,
  chain: Snake[],
  drawOptions: DrawOptions,
  animationOptions: AnimationOptions,
) =>
  withTmpDir(async (dir) => {
    await generateImageSequence(
      grid0,
      cells,
      chain,
      drawOptions,
      animationOptions,
      dir,
    );

    const outFileName = path.join(dir, "out.gif");

    execSync(
      [
        "convert",
        ["-loop", "0"],
        [
          "-delay",
          (
            animationOptions.stepDurationMs /
            animationOptions.frameByStep /
            10
          ).toFixed(3),
        ],
        ["-dispose", "2"],
        // ["-layers", "OptimizeFrame"],
        ["-compress", "LZW"],
        ["-strip"],

        path.join(dir, "img_*.png"),
        outFileName,
      ]
        .flat()
        .join(" "),
      { stdio: ["ignore", "pipe", "pipe"] },
    );

    return new Uint8Array(fs.readFileSync(outFileName));
  });

export const createGif = createGif_gifEncoder;
