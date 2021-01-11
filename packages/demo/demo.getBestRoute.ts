import "./menu";
import { createCanvas } from "./canvas";
import { getBestRoute } from "@snk/solver/getBestRoute";
import { Color, copyGrid } from "@snk/types/grid";
import { grid, snake } from "./sample";
import { step } from "@snk/solver/step";

const chain = getBestRoute(grid, snake)!;

//
// draw
let k = 0;

const { canvas, draw } = createCanvas(grid);
document.body.appendChild(canvas);

const onChange = () => {
  const gridN = copyGrid(grid);
  const stack: Color[] = [];
  for (let i = 0; i <= k; i++) step(gridN, stack, chain[i]);

  draw(gridN, chain[k], stack);
};
onChange();

const input = document.createElement("input") as any;
input.type = "range";
input.value = 0;
input.step = 1;
input.min = 0;
input.max = chain.length - 1;
input.style.width = "90%";
input.addEventListener("input", () => {
  k = +input.value;
  onChange();
});
document.body.append(input);
window.addEventListener("click", (e) => {
  if (e.target === document.body || e.target === document.body.parentElement)
    input.focus();
});
