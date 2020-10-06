import * as fs from "fs";
import * as path from "path";
import { createGif } from "..";
import { getBestRoute } from "@snk/compute/getBestRoute";
import * as grids from "@snk/compute/__fixtures__/grid";
import { snake3 as snake } from "@snk/compute/__fixtures__/snake";

const drawOptions = {
  sizeBorderRadius: 2,
  sizeCell: 16,
  sizeDot: 12,
  colorBorder: "#1b1f230a",
  colorDots: { 1: "#9be9a8", 2: "#40c463", 3: "#30a14e", 4: "#216e39" },
  colorEmpty: "#ebedf0",
  colorSnake: "purple",
};

const gifOptions = { delay: 18 };

const dir = path.resolve(__dirname, "__snapshots__");

try {
  fs.mkdirSync(dir);
} catch (err) {}

for (const key of [
  "empty",
  "simple",
  "corner",
  "small",
  "smallPacked",
  "enclave",
] as const)
  it(`should generate ${key} gif`, async () => {
    const grid = grids[key];

    const chain = [snake, ...getBestRoute(grid, snake)!];

    const gif = await createGif(grid, chain, drawOptions, gifOptions);

    expect(gif).toBeDefined();

    fs.writeFileSync(path.resolve(dir, key + ".gif"), gif);
  });
