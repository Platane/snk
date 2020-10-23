import { isInsideLarge, getColor, isInside, isEmpty } from "@snk/types/grid";
import { around4 } from "@snk/types/point";
import {
  getHeadX,
  getHeadY,
  nextSnake,
  snakeEquals,
  snakeWillSelfCollide,
} from "@snk/types/snake";
import { sortPush } from "./utils/sortPush";
import type { Snake } from "@snk/types/snake";
import type { Grid, Color } from "@snk/types/grid";

/**
 * get routes leading to non-empty cells until onSolution returns true
 */
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

    const cx = getHeadX(snake);
    const cy = getHeadY(snake);

    for (let i = 0; i < around4.length; i++) {
      const { x: dx, y: dy } = around4[i];

      const nx = cx + dx;
      const ny = cy + dy;

      if (
        isInsideLarge(grid, 2, nx, ny) &&
        !snakeWillSelfCollide(snake, dx, dy)
      ) {
        const nsnake = nextSnake(snake, dx, dy);

        if (!closeList.some((s) => snakeEquals(nsnake, s))) {
          const color = isInside(grid, nx, ny) && getColor(grid, nx, ny);

          if (!color || isEmpty(color)) {
            sortPush(openList, [nsnake, ...c], (a, b) => a.length - b.length);
            closeList.push(nsnake);
          } else {
            if (onSolution([nsnake, ...c.slice(0, -1)], color)) return;
          }
        }
      }
    }
  }
};
