import "./menu";
import { createCanvas } from "./canvas";
import { snakeToCells } from "@snk/types/snake";
import { grid, snake } from "./sample";
import { getColor } from "@snk/types/grid";
import { getPathTo } from "@snk/compute/getPathTo";
import type { Point } from "@snk/types/point";

const { canvas, ctx, draw, highlightCell } = createCanvas(grid);
document.body.appendChild(canvas);

const ones: Point[] = [];

for (let x = 0; x < grid.width; x++)
  for (let y = 0; y < grid.height; y++)
    if (getColor(grid, x, y) === 1) ones.push({ x, y });

const chains = ones.map((p) => {
  const chain = getPathTo(grid, snake, p.x, p.y);
  return chain && [...chain, snake];
});

let k = 0;
let i = 0;

const onChange = () => {
  ctx.clearRect(0, 0, 9999, 9999);

  const chain = chains[k];

  if (chain) {
    draw(grid, chain[i], []);
    chain
      .map(snakeToCells)
      .flat()
      .forEach(({ x, y }) => highlightCell(x, y));
  } else draw(grid, snake, []);
};

onChange();

const inputK = document.createElement("input") as any;
inputK.type = "range";
inputK.value = k;
inputK.step = 1;
inputK.min = 0;
inputK.max = chains.length - 1;
inputK.style.width = "90%";
inputK.style.padding = "20px 0";
inputK.addEventListener("input", () => {
  k = +inputK.value;
  i = inputI.value = 0;
  inputI.max = chains[k] ? chains[k]!.length - 1 : 0;
  onChange();
});
document.body.append(inputK);

const inputI = document.createElement("input") as any;
inputI.type = "range";
inputI.value = 0;
inputI.max = chains[k] ? chains[k]!.length - 1 : 0;
inputI.step = 1;
inputI.min = 0;
inputI.style.width = "90%";
inputI.style.padding = "20px 0";
inputI.addEventListener("input", () => {
  i = +inputI.value;
  onChange();
});
document.body.append(inputI);

window.addEventListener("click", (e) => {
  if (e.target === document.body || e.target === document.body.parentElement)
    inputK.focus();
});
