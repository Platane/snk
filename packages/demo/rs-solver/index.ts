import { getColor, isInside, setColorEmpty } from "@snk/types/grid";
import {
  createSnakeFromCells,
  getHeadX,
  getHeadY,
  nextSnake,
} from "@snk/types/snake";
import init, {
  get_grid_sample,
  IPoint,
  init_log,
  init_panic_hook,
  solve,
} from "snk-js";
import wasmUrl from "snk-js/snk_js_bg.wasm";
import { createCanvas } from "../utils/canvas";

await init(wasmUrl);
init_panic_hook();
init_log();

const igrid = get_grid_sample(
  // "caves",
  // "labyrinth",
  "realistic",
  // "cave",
  // "one-dot",
);
const { ctx, canvas, draw } = createCanvas(igrid);
document.body.appendChild(canvas);

const isnake = [
  IPoint.create(0, -1),
  IPoint.create(1, -1),
  IPoint.create(2, -1),
  IPoint.create(3, -1),
];
const snake0 = createSnakeFromCells(isnake.map(({ x, y }) => ({ x, y })));

const path = solve(igrid, isnake);

let i = 0;
const onChange = () => {
  ctx.clearRect(0, 0, 9999, 9999);

  const grid = {
    width: igrid.width,
    height: igrid.height,
    data: new Uint8Array(igrid.cells),
  };

  let snake = snake0;

  for (let k = 0; k < i && k < path.length; k++) {
    snake = nextSnake(snake, path[k].x, path[k].y);
    if (isInside(grid, getHeadX(snake), getHeadY(snake))) {
      setColorEmpty(grid, getHeadX(snake), getHeadY(snake));
    }
  }

  draw(grid, snake, []);
};

onChange();

const inputI = document.createElement("input") as any;
inputI.type = "range";
inputI.value = 0;
inputI.max = path ? path.length : 0;
inputI.step = 1;
inputI.min = 0;
inputI.style.width = "90%";
inputI.style.padding = "20px 0";
inputI.addEventListener("input", () => {
  i = +inputI.value;
  onChange();
});
document.body.append(inputI);
document.body.onclick = () => {
  inputI.focus();
};
