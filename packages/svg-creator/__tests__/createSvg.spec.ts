import * as fs from "fs";
import * as path from "path";
import { createSvg } from "..";
import * as grids from "@snk/types/__fixtures__/grid";
import { snake3 as snake } from "@snk/types/__fixtures__/snake";
import { getBestRoute } from "@snk/compute/getBestRoute";

const drawOptions = {
  sizeBorderRadius: 2,
  sizeCell: 16,
  sizeDot: 12,
  colorBorder: "#1b1f230a",
  colorDots: { 1: "#9be9a8", 2: "#40c463", 3: "#30a14e", 4: "#216e39" },
  colorEmpty: "#ebedf0",
  colorSnake: "purple",
};

const gifOptions = { frameDuration: 100, step: 1 };

const dir = path.resolve(__dirname, "__snapshots__");

try {
  fs.mkdirSync(dir);
} catch (err) {}

for (const [key, grid] of Object.entries(grids))
  it(`should generate ${key} svg`, () => {
    const chain = [snake, ...getBestRoute(grid, snake)!];

    const gif = createSvg(grid, chain, drawOptions, gifOptions);

    expect(gif).toBeDefined();

    fs.writeFileSync(path.resolve(dir, key + ".svg"), gif);
  });
