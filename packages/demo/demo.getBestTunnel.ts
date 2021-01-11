import "./menu";
import { createCanvas } from "./canvas";
import { getSnakeLength } from "@snk/types/snake";
import { grid, snake } from "./sample";
import { getColor } from "@snk/types/grid";
import { getBestTunnel } from "@snk/solver/getBestTunnel";
import { createOutside } from "@snk/solver/outside";
import type { Color } from "@snk/types/grid";
import type { Point } from "@snk/types/point";

const { canvas, ctx, draw, highlightCell } = createCanvas(grid);
document.body.appendChild(canvas);

const ones: Point[] = [];

for (let x = 0; x < grid.width; x++)
  for (let y = 0; y < grid.height; y++)
    if (getColor(grid, x, y) === 1) ones.push({ x, y });

const tunnels = ones.map(({ x, y }) => ({
  x,
  y,
  tunnel: getBestTunnel(
    grid,
    createOutside(grid),
    x,
    y,
    3 as Color,
    getSnakeLength(snake)
  ),
}));

const onChange = () => {
  const k = +inputK.value;
  const i = +inputI.value;

  ctx.clearRect(0, 0, 9999, 9999);

  if (!tunnels[k]) return;

  const { x, y, tunnel } = tunnels[k]!;

  draw(grid, snake, []);

  highlightCell(x, y, "red");

  if (tunnel) {
    tunnel.forEach(({ x, y }) => highlightCell(x, y));
    highlightCell(x, y, "red");
    highlightCell(tunnel[i].x, tunnel[i].y, "blue");
  }
};

const inputK = document.createElement("input") as any;
inputK.type = "range";
inputK.value = 0;
inputK.step = 1;
inputK.min = 0;
inputK.max = tunnels ? tunnels.length - 1 : 0;
inputK.style.width = "90%";
inputK.style.padding = "20px 0";
inputK.addEventListener("input", () => {
  inputI.value = 0;
  inputI.max = (tunnels[+inputK.value]?.tunnel?.length || 1) - 1;
  onChange();
});
document.body.append(inputK);

const inputI = document.createElement("input") as any;
inputI.type = "range";
inputI.value = 0;
inputI.step = 1;
inputI.min = 0;
inputI.max = (tunnels[+inputK.value]?.tunnel?.length || 1) - 1;
inputI.style.width = "90%";
inputI.style.padding = "20px 0";
inputI.addEventListener("input", onChange);
document.body.append(inputI);

onChange();
