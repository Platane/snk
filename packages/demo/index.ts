import { generateRandomGrid } from "@snk/compute/generateGrid";
import { Color, copyGrid } from "@snk/compute/grid";
import { computeBestRun } from "@snk/compute";
import { step } from "@snk/compute/step";
import { drawWorld } from "@snk/draw/drawWorld";
import { copySnake } from "@snk/compute/snake";

const drawOptions = {
  sizeBorderRadius: 2,
  sizeCell: 16,
  sizeDot: 12,
  colorBorder: "#1b1f230a",
  colorDots: { 1: "#9be9a8", 2: "#40c463", 3: "#30a14e", 4: "#216e39" },
  colorEmpty: "#ebedf0",
  colorSnake: "purple",
};

const gameOptions = { colors: [1, 2, 3], maxSnakeLength: 5 };

const grid0 = generateRandomGrid(42, 7, { ...gameOptions, emptyP: 2 });

const snake0 = [
  { x: 4, y: -1 },
  { x: 3, y: -1 },
  { x: 2, y: -1 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
];
const stack0: Color[] = [];

const chain = computeBestRun(grid0, snake0, gameOptions);

//
// draw

const canvas = document.createElement("canvas");
const upscale = 2;
const width = drawOptions.sizeCell * (grid0.width + 4);
const height = drawOptions.sizeCell * (grid0.height + 4) + 100;
canvas.width = width * upscale;
canvas.height = height * upscale;
canvas.style.width = width + "px";
canvas.style.height = height + "px";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d")!;
ctx.scale(upscale, upscale);

const update = (n: number) => {
  const snake = copySnake(snake0);
  const stack = stack0.slice();
  const grid = copyGrid(grid0);

  for (let i = 0; i < n; i++) step(grid, snake, stack, chain[i], gameOptions);

  ctx.clearRect(0, 0, 9999, 9999);
  drawWorld(ctx, grid, snake, stack, drawOptions);
};

//
// controls

const input: any = document.createElement("input");
input.type = "range";
input.style.width = "100%";
input.min = 0;
input.max = chain.length;
input.step = 1;
input.value = 0;
input.addEventListener("input", () => {
  setAutoPlay(false);
  update(+input.value);
});
document.addEventListener("click", () => input.focus());

document.body.appendChild(input);

const autoplayButton = document.createElement("button");
let cancel: any;
const loop = () => {
  input.value = (+input.value + 1) % +input.max;
  update(+input.value);
  cancelAnimationFrame(cancel);
  cancel = requestAnimationFrame(loop);
};
const setAutoPlay = (a: boolean) => {
  autoplayButton.innerHTML = a ? "pause" : "play";
  if (a) loop();
  else cancelAnimationFrame(cancel);
};
autoplayButton.addEventListener("click", () => {
  debugger;
  setAutoPlay(autoplayButton.innerHTML === "play");
});
document.body.appendChild(autoplayButton);

setAutoPlay(true);
update(+input.value);
