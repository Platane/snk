import { createCanvas } from "./canvas";
import { snakeToCells } from "@snk/types/snake";
import { GUI } from "dat.gui";
import { grid, snake } from "./sample";
import { getAvailableRoutes } from "@snk/compute/getAvailableRoutes";
import type { Point } from "@snk/types/point";
import type { Snake } from "@snk/types/snake";

//
// compute

const routes: Snake[][] = [];
getAvailableRoutes(grid, snake, (chain) => {
  routes.push(chain);
  return routes.length > 10;
});

const config = { routeN: 0, routeK: 0 };

//
// draw

const { canvas, ctx, draw } = createCanvas(grid);
document.body.appendChild(canvas);

draw(grid, snake, []);

let cancel: number;

const mod = (x: number, m: number) => ((x % m) + m) % m;

const onChange = () => {
  const t = Math.floor(Date.now() / 300);

  cancelAnimationFrame(cancel);
  cancel = requestAnimationFrame(onChange);

  const chain = routes[config.routeN] || [snake];

  draw(grid, chain[mod(-t, chain.length)], []);

  const cells: Point[] = [];
  chain.forEach((s) => cells.push(...snakeToCells(s)));

  ctx.fillStyle = "orange";
  ctx.fillRect(0, 0, 1, 1);

  cells
    .filter((x, i, arr) => i === arr.indexOf(x))
    .forEach((c) => {
      ctx.beginPath();
      ctx.fillRect((1 + c.x + 0.5) * 16 - 2, (2 + c.y + 0.5) * 16 - 2, 4, 4);
    });
};

//
// ui

const gui = new GUI();
gui.add(config, "routeN", 0, routes.length - 1, 1).onChange(onChange);

onChange();
