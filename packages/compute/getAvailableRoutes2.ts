import { Grid, isInsideLarge, getColor, isInside, isEmpty } from "./grid";
import { around4 } from "./point";
import {
  getHeadX,
  getHeadY,
  nextSnake,
  Snake,
  snakeEquals,
  snakeWillSelfCollide,
} from "./snake";

const snakeEqualsN = (a: Snake, b: Snake, n = a.length / 2) => {
  for (let i = 0; i < n * 2; i++) if (a[i] !== b[i]) return false;
  return true;
};

export const getAvailableRoutes = (grid: Grid, snake0: Snake, n?: number) => {
  const openList: Snake[][] = [[snake0]];
  const closeList: Snake[] = [];

  const solutions: Snake[][] = [];

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

          if (color && !isEmpty(color)) {
            if (solutions.every(([s]) => !snakeEqualsN(s, nsnake, n))) {
              const solution = [nsnake, ...c.slice(0, -1)];
              solutions.push(solution);
            }
          } else {
            if (!openList.some(([s]) => snakeEquals(nsnake, s))) {
              const chain = [nsnake, ...c];
              openList.push(chain);
              openList.sort((a, b) => a.length - b.length);
            }
          }
        }
      }
    }
  }

  return solutions;
};
