import { copyGrid } from "@snk/compute/grid";
import { copySnake } from "@snk/compute/snake";
import { createCanvas } from "./canvas";
import { step } from "@snk/compute/step";
import { getBestRoute } from "@snk/compute/getBestRoute";
import { samples } from "./samples";

//
// init

const label = "realistic";
const { grid: grid0, snake: snake0, gameOptions } = samples.find(
  (s) => s.label === label
);

//
// compute

const s0 = performance.now();
const bestRoute = getBestRoute(grid0, snake0, gameOptions, 120);
console.log(performance.now() - s0);
//
// draw

const { draw } = createCanvas(grid0);

//
// controls

const inputK: any = document.createElement("input");
inputK.type = "range";
inputK.style.width = "100%";
inputK.min = 0;
inputK.max = bestRoute.length;
inputK.step = 1;
inputK.value = 0;
inputK.addEventListener("input", () => {
  const snake = copySnake(snake0);
  const grid = copyGrid(grid0);
  const stack: any[] = [];

  for (let i = 0; i < +inputK.value; i++)
    step(grid, snake, stack, bestRoute[i], gameOptions);

  draw(grid, snake, stack);
});
document.body.appendChild(inputK);
draw(grid0, snake0, []);
