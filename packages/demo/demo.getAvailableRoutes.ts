import { copyGrid } from "@snk/compute/grid";
import { copySnake } from "@snk/compute/snake";
import { createCanvas } from "./canvas";
import { stepSnake } from "@snk/compute/step";
import { samples } from "./samples";
import { getAvailableRoutes } from "@snk/compute/getAvailableRoutes";

//
// init

const label = new URLSearchParams(window.location.search).get("sample");
const { grid: grid0, snake: snake0, gameOptions } =
  samples.find((s) => s.label === label) || samples[0];

//
// compute

const routes = getAvailableRoutes(grid0, snake0, gameOptions, 20);

//
// draw

const { canvas, draw } = createCanvas(grid0);

const update = (n: number, k: number) => {
  const snake = copySnake(snake0);
  const grid = copyGrid(grid0);
  const route = routes[n];

  const trace = [{ ...snake[0] }];

  for (let i = 0; i < k; i++) {
    stepSnake(snake, route.directions[i], gameOptions);
    trace.push({ ...snake[0] });
  }

  draw(grid, snake, []);

  const [cell] = route.snakeN;

  const ctx = canvas.getContext("2d")!;

  for (let i = 0; i < routes.length; i++) {
    ctx.fillStyle = "orange";
    ctx.fillRect(
      16 * (routes[i].snakeN[0].x + 1) + 6,
      16 * (routes[i].snakeN[0].y + 2) + 6,
      4,
      4
    );
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(16 * (cell.x + 1) + 4, 16 * (cell.y + 2) + 4, 8, 8);

  for (let i = 0; i < trace.length; i++) {
    ctx.fillStyle = "purple";
    ctx.fillRect(16 * (trace[i].x + 1) + 6, 16 * (trace[i].y + 2) + 6, 4, 4);
  }
};

//
// controls

// const input0: any = document.createElement("input");
// input0.type = "range";
// input0.style.width = "100%";
// input0.min = 0;
// input0.max = snakeSteps.length - 1;
// input0.step = 1;
// input0.value = 0;
// input0.addEventListener("input", () => {
//   const grid = copyGrid(grid0);
//   draw(grid, snakeSteps[+input0.value], []);
// });
// document.body.appendChild(input0);

const inputA: any = document.createElement("input");
inputA.type = "range";
inputA.style.width = "100%";
inputA.min = 0;
inputA.max = routes.length - 1;
inputA.step = 1;
inputA.value = 0;
inputA.addEventListener("input", () => {
  inputB.value = inputB.max = routes[+inputA.value].directions.length;
  update(+inputA.value, +inputB.value);
});
document.body.appendChild(inputA);

const inputB: any = document.createElement("input");
inputB.type = "range";
inputB.style.width = "100%";
inputB.min = 0;
inputB.step = 1;
inputB.value = 0;
inputB.addEventListener("input", () => {
  update(+inputA.value, +inputB.value);
});
document.body.appendChild(inputB);

if (routes[+inputA.value]) {
  inputB.value = inputB.max = routes[+inputA.value].directions.length;
  update(+inputA.value, +inputB.value);
}
