import {
  Color,
  getColor,
  Grid,
  isEmpty,
  isInside,
  setColorEmpty,
} from "./grid";
import { getHeadX, getHeadY, Snake } from "./snake";

export const step = (grid: Grid, stack: Color[], snake: Snake) => {
  const x = getHeadX(snake);
  const y = getHeadY(snake);
  const color = getColor(grid, x, y);

  if (isInside(grid, x, y) && !isEmpty(color)) {
    stack.push(color);
    setColorEmpty(grid, x, y);
  }
};
