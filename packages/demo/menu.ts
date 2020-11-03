import { GUI } from "dat.gui";
import * as grids from "@snk/types/__fixtures__/grid";
import * as snakes from "@snk/types/__fixtures__/snake";
import { grid, snake } from "./sample";

const demos: string[] = require("./demo.json");

export const gui = new GUI();

const config = {
  snake: Object.entries(snakes).find(([_, s]) => s === snake)![0],
  grid: Object.entries(grids).find(([_, s]) => s === grid)![0],
  demo: demos[0],
};
{
  const d = window.location.pathname.match(/(\w+)\.html/);
  if (d && demos.includes(d[1])) config.demo = d[1];
}

const onChange = () => {
  const search = new URLSearchParams({
    snake: config.snake,
    grid: config.grid,
  }).toString();

  const url = new URL(
    config.demo + ".html?" + search,
    window.location.href
  ).toString();

  window.location.href = url;
};

gui.add(config, "demo", demos).onChange(onChange);
gui.add(config, "grid", Object.keys(grids)).onChange(onChange);
gui.add(config, "snake", Object.keys(snakes)).onChange(onChange);
