import init, {
  get_best_tunnel_to_collect_point,
  get_grid_sample,
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
const { canvas, draw, getPointedCell, highlightCell } = createCanvas(grid);
document.body.appendChild(canvas);

const drawBestTunnel = ({ x, y }: { x: number; y: number }) => {
  draw(
    { width: grid.width, height: grid.height, data: grid.cells },
    [] as any,
    [],
  );

  const path = get_best_tunnel_to_collect_point(grid, IPoint.create(x, y));

  for (const { x, y } of path) highlightCell(x, y);
};

canvas.onmousemove = (event) => {
  const p = getPointedCell(event);
  drawBestTunnel(p);
};

drawBestTunnel({ x: 2, y: 3 });
