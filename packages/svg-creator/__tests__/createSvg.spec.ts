import * as fs from "fs";
import * as path from "path";
import { createSvg, DrawOptions as DrawOptions } from "..";
import * as grids from "@snk/types/__fixtures__/grid";
import { snake3 as snake } from "@snk/types/__fixtures__/snake";
import { getBestRoute } from "@snk/solver/getBestRoute";
import { AnimationOptions } from "@snk/gif-creator";

const drawOptions: DrawOptions = {
  sizeDotBorderRadius: 2,
  sizeCell: 16,
  sizeDot: 12,
  colorDotBorder: "#1b1f230a",
  colorDots: { 1: "#B6E3FF", 2: "#54AEFF", 3: "#0969DA", 4: "#0A3069" },
  colorEmpty: "#ebedf0",
  colorSnake: "purple",
  dark: {
    colorEmpty: "#161b22",
    colorDots: { 1: "#0A3069", 2: "#0969DA", 3: "#54AEFF", 4: "#B6E3FF" },
  },
};

const animationOptions: AnimationOptions = { frameDuration: 100, step: 1 };

const dir = path.resolve(__dirname, "__snapshots__");

try {
  fs.mkdirSync(dir);
} catch (err) {}

for (const [key, grid] of Object.entries(grids))
  it(`should generate ${key} svg`, async () => {
    const chain = [snake, ...getBestRoute(grid, snake)!];

    const svg = await createSvg(
      grid,
      null,
      chain,
      drawOptions,
      animationOptions
    );

    expect(svg).toBeDefined();

    fs.writeFileSync(path.resolve(dir, key + ".svg"), svg);
  });
