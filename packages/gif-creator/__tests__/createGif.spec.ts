import { expect, it } from "bun:test";
import { getBestRoute } from "@snk/solver/getBestRoute";
import * as grids from "@snk/types/__fixtures__/grid";
import { snake3 as snake } from "@snk/types/__fixtures__/snake";
import { createSnakeFromCells, nextSnake } from "@snk/types/snake";
import * as fs from "fs";
import * as path from "path";
import { basePalettes } from "../../action/palettes";
import { type AnimationOptions, createGif, type DrawOptions } from "..";

const upscale = 1;
const drawOptions: DrawOptions = {
  sizeDotBorderRadius: 2 * upscale,
  sizeCell: 16 * upscale,
  sizeDot: 12 * upscale,
  ...basePalettes["github-dark"],
};

const animationOptions: AnimationOptions = {
  stepDurationMs: 200,
  frameByStep: 1,
};

const dir = path.resolve(__dirname, "__snapshots__");

fs.mkdirSync(dir, { recursive: true });

for (const key of [
  "empty",
  "simple",
  "corner",
  "small",
  "smallPacked",
] as const)
  it(
    `should generate ${key} gif`,
    async () => {
      const grid = grids[key];

      const chain = [snake, ...getBestRoute(grid, snake)!];

      const gif = await createGif(
        grid,
        null,
        chain,
        drawOptions,
        animationOptions,
      );

      expect(gif).toBeDefined();

      fs.writeFileSync(path.resolve(dir, key + ".gif"), gif);
    },
    { timeout: 20 * 1000 },
  );

it(
  `should generate swipper`,
  async () => {
    const grid = grids.smallFull;
    let snk = createSnakeFromCells(
      Array.from({ length: 6 }, (_, i) => ({ x: i, y: -1 })),
    );

    const chain = [snk];
    for (let y = -1; y < grid.height; y++) {
      snk = nextSnake(snk, 0, 1);
      chain.push(snk);

      for (let x = grid.width - 1; x--; ) {
        snk = nextSnake(snk, (y + 100) % 2 ? 1 : -1, 0);
        chain.push(snk);
      }
    }

    const gif = await createGif(
      grid,
      null,
      chain,
      drawOptions,
      animationOptions,
    );

    expect(gif).toBeDefined();

    fs.writeFileSync(path.resolve(dir, "swipper.gif"), gif);
  },
  { timeout: 20 * 1000 },
);
