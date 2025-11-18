import * as fs from "fs";
import { performance } from "perf_hooks";
import { createSnakeFromCells } from "@snk/types/snake";
import { realistic as grid } from "@snk/types/__fixtures__/grid";
import {
  type AnimationOptions,
  type DrawOptions,
  createGif as createGif_gifencore_gifslice,
} from "..";
import { getBestRoute } from "@snk/solver/getBestRoute";
import { getPathToPose } from "@snk/solver/getPathToPose";
import {
  canvasDrawNoOutput,
  createGif_ffmpeg,
  createGif_ffmpeg_gifslice,
  createGif_gifEncoder,
  createGif_graphicMagic,
  createPngImageSequenceNoOutput,
} from "./createGif-variant";

let snake = createSnakeFromCells(
  Array.from({ length: 4 }, (_, i) => ({ x: i, y: -1 })),
);

// const chain = [snake];
// for (let y = -1; y < grid.height; y++) {
//   snake = nextSnake(snake, 0, 1);
//   chain.push(snake);

//   for (let x = grid.width - 1; x--; ) {
//     snake = nextSnake(snake, (y + 100) % 2 ? 1 : -1, 0);
//     chain.push(snake);
//   }
// }

const chain = getBestRoute(grid, snake)!;
chain.push(...getPathToPose(chain.slice(-1)[0], snake)!);

const drawOptions: DrawOptions = {
  sizeDotBorderRadius: 2,
  sizeCell: 16,
  sizeDot: 12,
  colorBackground: "#ffffff",
  colorDotBorder: "#1b1f230a",
  colorDots: { 1: "#9be9a8", 2: "#40c463", 3: "#30a14e", 4: "#216e39" },
  colorEmpty: "#ebedf0",
  colorSnake: "purple",
};

const animationOptions: AnimationOptions = {
  stepDurationMs: 100,
  frameByStep: 1,
};

(async () => {
  const runs: any[] = [];

  for (const [implementation, createGif] of [
    ["draw steps on canvas (no output)", canvasDrawNoOutput],
    ["create png image sequence (no output)", createPngImageSequenceNoOutput],
    ["gifEncoder", createGif_gifEncoder],
    ["gifEncoder+gifslice", createGif_gifencore_gifslice],
    ["ffmpeg", createGif_ffmpeg],
    ["ffmpeg+gifslice", createGif_ffmpeg_gifslice],
    ["graphicMagic", createGif_graphicMagic],
  ] as const)
    for (const colorBackground of [
      //
      "transparent",
      "white",
    ])
      for (const frameByStep of [
        //
        1, 2, 3,
      ])
        for (const maxChainLength of [
          //
          1_000,
        ]) {
          let buffer: Uint8Array;
          const start = Date.now();
          const chainL = chain.slice(0, maxChainLength);
          const chainLength = chainL.length;
          const gridDimension = `${grid.width}x${grid.height}`;

          drawOptions.colorBackground = colorBackground;
          animationOptions.frameByStep = frameByStep;

          const filename = `benchmark-output-${implementation}-${chainLength}-${animationOptions.frameByStep}-${colorBackground}.gif`;

          for (
            let k = 0;
            k < 10 && (Date.now() - start < 12_000 || k < 2);
            k++
          ) {
            const s = performance.now();
            buffer = await createGif(
              grid,
              null,
              chainL,
              drawOptions,
              animationOptions,
            );
            runs.push({
              durationMs: performance.now() - s,
              colorBackground,
              implementation,
              chainLength,
              gridDimension,
              frameByStep,
              fileSizeByte: buffer.length,
              filename,
            });
          }

          if (buffer!.length > 0)
            fs.writeFileSync(__dirname + `/__snapshots__/${filename}`, buffer!);

          fs.writeFileSync(
            __dirname + `/__snapshots__/benchmark-result.json`,
            "[\n" + runs.map((r) => JSON.stringify(r)).join(",\n") + "\n]",
          );
        }
})();
