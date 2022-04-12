import * as fs from "fs";
import { performance } from "perf_hooks";
import { createSnakeFromCells } from "@snk/types/snake";
import { realistic as grid } from "@snk/types/__fixtures__/grid";
import { AnimationOptions, createGif } from "..";
import { getBestRoute } from "@snk/solver/getBestRoute";
import { getPathToPose } from "@snk/solver/getPathToPose";
import type { Options as DrawOptions } from "@snk/draw/drawWorld";

let snake = createSnakeFromCells(
  Array.from({ length: 4 }, (_, i) => ({ x: i, y: -1 }))
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
  colorDotBorder: "#1b1f230a",
  colorDots: { 1: "#9be9a8", 2: "#40c463", 3: "#30a14e", 4: "#216e39" },
  colorEmpty: "#ebedf0",
  colorSnake: "purple",
};

const animationOptions: AnimationOptions = { frameDuration: 100, step: 1 };

(async () => {
  for (
    let length = 10;
    length < chain.length;
    length += Math.floor((chain.length - 10) / 3 / 10) * 10
  ) {
    const stats: number[] = [];

    let buffer: Buffer;
    const start = Date.now();
    const chainL = chain.slice(0, length);
    for (let k = 0; k < 10 && (Date.now() - start < 10 * 1000 || k < 2); k++) {
      const s = performance.now();
      buffer = await createGif(
        grid,
        null,
        chainL,
        drawOptions,
        animationOptions
      );
      stats.push(performance.now() - s);
    }

    console.log(
      [
        "---",
        `grid dimension:  ${grid.width}x${grid.height}`,
        `chain length:  ${length}`,
        `resulting size:  ${(buffer!.length / 1024).toFixed(1)}ko`,
        `generation duration (mean):  ${(
          stats.reduce((s, x) => x + s) / stats.length
        ).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}ms`,
        "",
      ].join("\n"),
      stats
    );

    fs.writeFileSync(
      `__tests__/__snapshots__/benchmark-output-${length}.gif`,
      buffer!
    );
  }
})();
