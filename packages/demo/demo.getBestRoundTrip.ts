import "./menu";
import { createCanvas } from "./canvas";
import { getSnakeLength } from "@snk/types/snake";
import { grid, snake } from "./sample";
import { getColor } from "@snk/types/grid";
import { getBestTunnel } from "@snk/compute/getBestTunnel";
import type { Color } from "@snk/types/grid";
import type { Point } from "@snk/types/point";

const { canvas, ctx, draw, highlightCell } = createCanvas(grid);
document.body.appendChild(canvas);

const ones: Point[] = [];

for (let x = 0; x < grid.width; x++)
  for (let y = 0; y < grid.height; y++)
    if (getColor(grid, x, y) === 1) ones.push({ x, y });

const points = getBestTunnel(
  grid,
  ones[0].x,
  ones[0].y,
  3 as Color,
  getSnakeLength(snake)
);

let k = 0;

const onChange = () => {
  ctx.clearRect(0, 0, 9999, 9999);

  draw(grid, [] as any, []);

  if (points) {
    points.forEach(({ x, y }) => highlightCell(x, y));
    highlightCell(points[k].x, points[k].y, "blue");
  }
};

onChange();

const inputK = document.createElement("input") as any;
inputK.type = "range";
inputK.value = 0;
inputK.step = 1;
inputK.min = 0;
inputK.max = points ? points.length - 1 : 0;
inputK.style.width = "90%";
inputK.style.padding = "20px 0";
inputK.addEventListener("input", () => {
  k = +inputK.value;
  onChange();
});
document.body.append(inputK);
