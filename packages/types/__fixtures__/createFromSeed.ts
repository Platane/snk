import ParkMiller from "park-miller";
import { Color, createEmptyGrid } from "../grid";
import { randomlyFillGrid } from "../randomlyFillGrid";

export const createFromSeed = (seed: number, width = 5, height = 5) => {
  const grid = createEmptyGrid(width, height);
  const pm = new ParkMiller(seed);
  const random = pm.integerInRange.bind(pm);
  randomlyFillGrid(grid, { colors: [1, 2] as Color[], emptyP: 2 }, random);
  return grid;
};
