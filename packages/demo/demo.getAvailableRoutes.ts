import { createCanvas } from "./canvas";
import { getHeadX, getHeadY, snakeToCells } from "@snk/types/snake";
import { grid, snake } from "./sample";
import { getColor } from "@snk/types/grid";
import { getAvailableRoutes } from "@snk/compute/getAvailableRoutes";
import type { Snake } from "@snk/types/snake";
import type { Color, Empty } from "@snk/types/grid";

//
// compute

const solutions: {
  x: number;
  y: number;
  chain: Snake[];
  color: Color | Empty;
}[] = [];
getAvailableRoutes(grid, snake, (chain) => {
  const x = getHeadX(chain[0]);
  const y = getHeadY(chain[0]);

  if (!solutions.some((s) => x === s.x && y === s.y))
    solutions.push({
      x,
      y,
      chain: [snake, ...chain.slice().reverse()],
      color: getColor(grid, x, y),
    });

  return false;
});
solutions.sort((a, b) => a.color - b.color);

const { canvas, ctx, draw } = createCanvas(grid);
document.body.appendChild(canvas);

let k = 0;
let i = solutions[k].chain.length - 1;

const onChange = () => {
  const { chain } = solutions[k];

  ctx.clearRect(0, 0, 9999, 9999);

  draw(grid, chain[i], []);

  ctx.fillStyle = "orange";
  chain
    .map(snakeToCells)
    .flat()
    .forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.fillRect((1 + x + 0.5) * 16 - 2, (2 + y + 0.5) * 16 - 2, 4, 4);
    });
};

onChange();

const inputK = document.createElement("input") as any;
inputK.type = "range";
inputK.value = 0;
inputK.step = 1;
inputK.min = 0;
inputK.max = solutions.length - 1;
inputK.style.width = "90%";
inputK.style.padding = "20px 0";
inputK.addEventListener("input", () => {
  k = +inputK.value;
  i = inputI.value = inputI.max = solutions[k].chain.length - 1;
  onChange();
});
document.body.append(inputK);

const inputI = document.createElement("input") as any;
inputI.type = "range";
inputI.value = inputI.max = solutions[k].chain.length - 1;
inputI.step = 1;
inputI.min = 0;
inputI.style.width = "90%";
inputI.style.padding = "20px 0";
inputI.addEventListener("input", () => {
  i = +inputI.value;
  onChange();
});
document.body.append(inputI);
