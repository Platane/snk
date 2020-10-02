// @ts-ignore
import * as ParkMiller from "park-miller";
import { Color, createEmptyGrid, setColor } from "@snk/compute/grid";
import { fillRandomGrid } from "../generateGrid";

const colors = [1, 2, 3] as Color[];

// empty small grid
export const empty = createEmptyGrid(5, 5);

// empty small grid with a unique color at the middle
export const simple = createEmptyGrid(5, 5);
setColor(simple, 2, 2, 1 as Color);

// empty small grid with color at each corner
export const corner = createEmptyGrid(5, 5);
setColor(corner, 0, 4, 1 as Color);
setColor(corner, 4, 0, 1 as Color);
setColor(corner, 4, 4, 1 as Color);
setColor(corner, 0, 0, 1 as Color);

const create = (width: number, height: number, emptyP: number) => {
  const grid = createEmptyGrid(width, height);
  const random = new ParkMiller(10);
  const rand = (a: number, b: number) => random.integerInRange(a, b - 1);
  fillRandomGrid(grid, { colors, emptyP }, rand);
  return grid;
};

// small realistic
export const small = create(10, 7, 3);
export const smallPacked = create(10, 7, 1);
export const smallFull = create(10, 7, 0);
