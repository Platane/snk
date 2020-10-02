import { createCanvas } from "./canvas";
import { getBestRoute } from "../compute/getBestRoute";
import { Color, copyGrid } from "../compute/grid";
import { grid, snake } from "./sample";
import { step } from "@snk/compute/step";

const chain = [snake, ...getBestRoute(grid, snake)!];

//
// draw

let k = 0;

const { canvas, draw } = createCanvas(grid);
document.body.appendChild(canvas);

const onChange = () => {
  debugger;

  const grid0 = copyGrid(grid);
  const stack0: Color[] = [];
  let snake0 = snake;
  chain.slice(0, k).forEach((s) => {
    snake0 = s;
    step(grid0, stack0, snake0);
  });

  draw(grid0, snake0, stack0);
};

onChange();

const input = document.createElement("input") as any;
input.type = "range";
input.value = 0;
input.step = 1;
input.min = 0;
input.max = chain.length;
input.style.width = "90%";
input.addEventListener("input", () => {
  k = +input.value;
  onChange();
});
document.body.append(input);
document.body.addEventListener("click", () => input.focus());
