import "./menu";
import { createCanvas } from "./canvas";
import { Color, copyGrid } from "@snk/types/grid";
import { grid, snake } from "./sample";
import { pruneLayer } from "@snk/compute/pruneLayer";
import { getSnakeLength } from "@snk/types/snake";

const colors = [1, 2, 3] as Color[];

const snakeN = getSnakeLength(snake);

const layers = [{ grid, chunk: [] as { x: number; y: number }[] }];
let grid0 = copyGrid(grid);
for (const color of colors) {
  const chunk = pruneLayer(grid0, color, snakeN);
  layers.push({ chunk, grid: copyGrid(grid0) });
}

const { canvas, ctx, highlightCell, draw } = createCanvas(grid);
document.body.appendChild(canvas);

let k = 0;

const loop = () => {
  const { grid, chunk } = layers[k];

  draw(grid, snake, []);

  ctx.fillStyle = "orange";
  chunk.forEach(({ x, y }) => highlightCell(x, y));
};

loop();

const input = document.createElement("input") as any;
input.type = "range";
input.value = 0;
input.step = 1;
input.min = 0;
input.max = layers.length - 1;
input.style.width = "90%";
input.addEventListener("input", () => {
  k = +input.value;
  loop();
});
document.body.append(input);

window.addEventListener("click", (e) => {
  if (e.target === document.body || e.target === document.body.parentElement)
    input.focus();
});
