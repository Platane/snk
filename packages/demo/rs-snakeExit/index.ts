import init, {
  get_best_tunnel_to_collect_point,
  get_grid_sample,
  get_snake_path_to_outside,
  IPoint,
  init_log,
  init_panic_hook,
} from "snk-js";
import wasmUrl from "snk-js/snk_js_bg.wasm";
import { createCanvas } from "../utils/canvas";

await init(wasmUrl);
init_panic_hook();
init_log();

const grid = get_grid_sample("caves");
grid.set(29, 4, 0);

const snake = [
  { x: 29, y: 4 },
  { x: 29, y: 5 },
  { x: 29, y: 6 },
  { x: 29, y: 7 },
];

const path = get_snake_path_to_outside(
  grid,
  snake.map(({ x, y }) => IPoint.create(x, y)),
);

console.log(path);

const { canvas, draw, getPointedCell, highlightCell } = createCanvas(grid);
document.body.appendChild(canvas);
draw(
  { width: grid.width, height: grid.height, data: grid.cells },
  snake.flatMap(({ x, y }) => [x + 2, y + 2]) as any,
  [],
);

for (const { x, y } of path) highlightCell(x, y);
