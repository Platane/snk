import { Grid } from "@snk/compute/grid";
import { Snake } from "@snk/compute/snake";
import * as grids from "@snk/compute/__fixtures__/grid";
import * as snakes from "@snk/compute/__fixtures__/snake";

const sp = new URLSearchParams(window.location.search);

const gLabel = sp.get("grid") || "simple";
const sLabel = sp.get("snake") || "snake3";

//@ts-ignore
export const grid: Grid = grids[gLabel] || grids.simple;
//@ts-ignore
export const snake: Snake = snakes[sLabel] || snakes.snake3;
