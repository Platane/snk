import { createCanvas } from "./canvas";
import { Color, copyGrid } from "@snk/types/grid";
import { grid, snake } from "./sample";
import { pruneLayer } from "@snk/compute/pruneLayer";

const colors = [1, 2, 3] as Color[];

const snakeN = snake.length / 2;

const layers = [{ grid, chunk: [] as { x: number; y: number }[] }];
let grid0 = copyGrid(grid);
for (const color of colors) {
  const chunk = pruneLayer(grid0, color, snakeN);
  layers.push({ chunk, grid: copyGrid(grid0) });
}

const { canvas, ctx, draw } = createCanvas(grid);
document.body.appendChild(canvas);

let k = 0;

const loop = () => {
  const { grid, chunk } = layers[k];

  draw(grid, snake, []);

  ctx.fillStyle = "orange";
  chunk.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.fillRect((1 + x + 0.5) * 16 - 2, (2 + y + 0.5) * 16 - 2, 4, 4);
  });
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
document.body.addEventListener("click", () => input.focus());
