import { Grid, isInsideLarge, getColor, isInside, Color } from "./grid";
import { around4 } from "./point";
import {
  getHeadX,
  getHeadY,
  nextSnake,
  Snake,
  snakeEquals,
  snakeWillSelfCollide,
} from "./snake";

export const getAvailableRoutes = (
  grid: Grid,
  snake0: Snake,
  onSolution: (snakes: Snake[], color: Color) => boolean
) => {
  const openList: Snake[][] = [[snake0]];
  const closeList: Snake[] = [];

  while (openList.length) {
    const c = openList.shift()!;
    const [snake] = c;

    closeList.push(snake);

    const cx = getHeadX(snake);
    const cy = getHeadY(snake);

    for (let i = 0; i < around4.length; i++) {
      const { x: dx, y: dy } = around4[i];

      const nx = cx + dx;
      const ny = cy + dy;

      if (
        isInsideLarge(grid, 1, nx, ny) &&
        !snakeWillSelfCollide(snake, dx, dy)
      ) {
        const nsnake = nextSnake(snake, dx, dy);

        if (!closeList.some((s) => snakeEquals(nsnake, s))) {
          const color = isInside(grid, nx, ny) && getColor(grid, nx, ny);

          const chain = [nsnake, ...c];

          if (color) {
            if (onSolution(chain, color)) return;
          } else {
            if (!openList.some(([s]) => snakeEquals(nsnake, s))) {
              openList.push(chain);
              openList.sort((a, b) => a.length - b.length);
            }
          }
        }
      }
    }
  }
};

export const getInterestingAvailableRoutes = (
  grid: Grid,
  snake0: Snake,
  onSolution: (snakes: Snake[], color: Color) => boolean,
  n = snake0.length
) => {
  const solutions: Snake[] = [];

  getAvailableRoutes(grid, snake0, (snakes, color) => {
    const [snake] = snakes;

    for (let j = solutions.length; j--; ) {
      let same = true;
      for (let i = 0; i < n * 2; i++)
        same = same && solutions[j][i] === snake[i];

      if (same) return false;
    }

    solutions.push(snake);

    return onSolution(snakes, color);
  });
};
