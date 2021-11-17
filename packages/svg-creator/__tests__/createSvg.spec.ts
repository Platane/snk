import * as fs from "fs";
import * as path from "path";
import { createSvg } from "..";
import * as grids from "@snk/types/__fixtures__/grid";
import { snake3 as snake } from "@snk/types/__fixtures__/snake";
import { getBestRoute } from "@snk/solver/getBestRoute";

const drawOptions = {
  sizeBorderRadius: 2,
  sizeCell: 16,
  sizeDot: 12,
  colorBorder: "#1b1f230a",
  colorDots: { 1: "#9be9a8", 2: "#40c463", 3: "#30a14e", 4: "#216e39" },
  colorEmpty: "#ebedf0",
  colorSnake: "pink",
  dark: {
    colorEmpty: "#1C1C1C",
    colorDots: { 1: "#ADD8E6", 2: "#87CEEB", 3: "#1E90FF", 4: "#00BFFF" },
  },
};

const gifOptions = { frameDuration: 100, step: 1 };

const dir = path.resolve(__dirname, "__snapshots__");

try {
  fs.mkdirSync(dir);
} catch (err) {}

for (const [key, grid] of Object.entries(grids))
  it(`should generate ${key} svg`, async () => {
    const chain = [snake, ...getBestRoute(grid, snake)!];

    const svg = await createSvg(grid, chain, drawOptions, gifOptions);

    expect(svg).toBeDefined();

    fs.writeFileSync(path.resolve(dir, key + ".svg"), svg);
  });
