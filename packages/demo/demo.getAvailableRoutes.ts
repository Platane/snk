import { createCanvas } from "./canvas";
import { samples } from "./samples";
import { getInterestingAvailableRoutes } from "@snk/compute/getAvailableRoutes";
import { createSnake, Snake, snakeToCells } from "@snk/compute/snake";
import { GUI } from "dat.gui";
import { Point } from "@snk/compute/point";

//
// init

const label = new URLSearchParams(window.location.search).get("sample");
const { grid: grid0 } = samples.find((s) => s.label === label) || samples[0];

//
// compute

const snake0 = createSnake([
  //
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: -1, y: 2 },
  { x: -1, y: 3 },
]);
const routes: Snake[][] = [];
getInterestingAvailableRoutes(
  grid0,
  snake0,
  (snakes) => {
    routes.push(snakes);
    return routes.length > 10;
  },
  2
);

const config = { routeN: 0, routeK: 0 };

//
// draw

const { canvas, ctx, draw } = createCanvas(grid0);
document.body.appendChild(canvas);

draw(grid0, snake0, []);

let cancel: number;

const mod = (x: number, m: number) => ((x % m) + m) % m;

const onChange = () => {
  const t = Math.floor(Date.now() / 300);

  cancelAnimationFrame(cancel);
  cancel = requestAnimationFrame(onChange);

  const chain = routes[config.routeN] || [snake0];

  draw(grid0, chain[mod(-t, chain.length)], []);

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
