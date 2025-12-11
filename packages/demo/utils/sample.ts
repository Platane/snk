import * as grids from "@snk/types/__fixtures__/grid";
import * as snakes from "@snk/types/__fixtures__/snake";
import type { Snake } from "@snk/types/snake";
import type { Grid } from "@snk/types/grid";

const sp = new URLSearchParams(window.location.search);

const gLabel = sp.get("grid") || "simple";
const sLabel = sp.get("snake") || "snake3";

//@ts-ignore
export const grid: Grid = grids[gLabel] || grids.simple;
//@ts-ignore
export const snake: Snake = snakes[sLabel] || snakes.snake3;
