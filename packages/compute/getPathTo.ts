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
import type { Grid } from "@snk/types/grid";

type M = { parent: M | null; snake: Snake; w: number; h: number; f: number };

/**
 * starting from snake0, get to the cell x,y
 * return the snake chain (reversed)
 */
export const getPathTo = (grid: Grid, snake0: Snake, x: number, y: number) => {
  const openList: M[] = [{ snake: snake0, w: 0 } as any];
  const closeList: Snake[] = [];

  while (openList.length) {
    const c = openList.shift()!;

    const cx = getHeadX(c.snake);
    const cy = getHeadY(c.snake);

    for (let i = 0; i < around4.length; i++) {
      const { x: dx, y: dy } = around4[i];

      const nx = cx + dx;
      const ny = cy + dy;

      if (nx === x && ny === y) {
        // unwrap
        const path = [nextSnake(c.snake, dx, dy)];
        let e: M["parent"] = c;
        while (e.parent) {
          path.push(e.snake);
          e = e.parent;
        }
        return path;
      }

      if (
        isInsideLarge(grid, 2, nx, ny) &&
        !snakeWillSelfCollide(c.snake, dx, dy) &&
        (!isInside(grid, nx, ny) || isEmpty(getColor(grid, nx, ny)))
      ) {
        const nsnake = nextSnake(c.snake, dx, dy);

        if (!closeList.some((s) => snakeEquals(nsnake, s))) {
          const w = c.w + 1;
          const h = Math.abs(nx - x) + Math.abs(ny - y);
          const f = w + h;
          const o = { snake: nsnake, parent: c, w, h, f };

          sortPush(openList, o, (a, b) => a.f - b.f);
          closeList.push(nsnake);
        }
      }
    }
  }
};
