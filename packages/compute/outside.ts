import {
  createEmptyGrid,
  getColor,
  isEmpty,
  isInside,
  setColor,
  setColorEmpty,
} from "@snk/types/grid";
import { around4 } from "@snk/types/point";
import type { Color, Grid } from "@snk/types/grid";

export type Outside = Grid & { __outside: true };

export const createOutside = (grid: Grid, color: Color = 0 as Color) => {
  const outside = createEmptyGrid(grid.width, grid.height) as Outside;
  for (let x = outside.width; x--; )
    for (let y = outside.height; y--; ) setColor(outside, x, y, 1 as Color);

  fillOutside(outside, grid, color);

  return outside;
};

export const fillOutside = (
  outside: Outside,
  grid: Grid,
  color: Color = 0 as Color
) => {
  let changed = true;
  while (changed) {
    changed = false;
    for (let x = outside.width; x--; )
      for (let y = outside.height; y--; )
        if (
          getColor(grid, x, y) <= color &&
          !isOutside(outside, x, y) &&
          around4.some((a) => isOutside(outside, x + a.x, y + a.y))
        ) {
          changed = true;
          setColorEmpty(outside, x, y);
        }
  }

  return outside;
};

export const isOutside = (outside: Outside, x: number, y: number) =>
  !isInside(outside, x, y) || isEmpty(getColor(outside, x, y));
