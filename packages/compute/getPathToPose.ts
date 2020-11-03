import {
  getHeadX,
  getHeadY,
  getSnakeLength,
  nextSnake,
  snakeEquals,
  snakeToCells,
  snakeWillSelfCollide,
} from "@snk/types/snake";
import type { Snake } from "@snk/types/snake";
import {
  getColor,
  Grid,
  isEmpty,
  isInside,
  isInsideLarge,
} from "@snk/types/grid";
import { getTunnelPath } from "./tunnel";
import { around4 } from "@snk/types/point";
import { sortPush } from "./utils/sortPush";

const isEmptySafe = (grid: Grid, x: number, y: number) =>
  !isInside(grid, x, y) || isEmpty(getColor(grid, x, y));

type M = { snake: Snake; parent: M | null; w: number; f: number };
export const getPathToPose = (snake0: Snake, target: Snake, grid?: Grid) => {
  if (snakeEquals(snake0, target)) return [];

  const targetCells = snakeToCells(target).reverse();

  const snakeN = getSnakeLength(snake0);
  const box = {
    min: {
      x: Math.min(getHeadX(snake0), getHeadX(target)) - snakeN - 1,
      y: Math.min(getHeadY(snake0), getHeadY(target)) - snakeN - 1,
    },
    max: {
      x: Math.max(getHeadX(snake0), getHeadX(target)) + snakeN + 1,
      y: Math.max(getHeadY(snake0), getHeadY(target)) + snakeN + 1,
    },
  };

  const [t0, ...forbidden] = targetCells;

  forbidden.slice(0, 3);

  const openList: M[] = [{ snake: snake0, w: 0 } as any];
  const closeList: Snake[] = [];

  while (openList.length) {
    const o = openList.shift()!;

    const x = getHeadX(o.snake);
    const y = getHeadY(o.snake);

    if (x === t0.x && y === t0.y) {
      const path: Snake[] = [];
      let e: M["parent"] = o;
      while (e) {
        path.push(e.snake);
        e = e.parent;
      }
      path.unshift(...getTunnelPath(path[0], targetCells));
      path.pop();
      path.reverse();
      return path;
    }

    for (let i = 0; i < around4.length; i++) {
      const { x: dx, y: dy } = around4[i];

      const nx = x + dx;
      const ny = y + dy;

      if (
        !snakeWillSelfCollide(o.snake, dx, dy) &&
        (!grid || isEmptySafe(grid, nx, ny)) &&
        (grid
          ? isInsideLarge(grid, 2, nx, ny)
          : box.min.x <= nx &&
            nx <= box.max.x &&
            box.min.y <= ny &&
            ny <= box.max.y) &&
        !forbidden.some((p) => p.x === nx && p.y === ny)
      ) {
        const snake = nextSnake(o.snake, dx, dy);

        if (!closeList.some((s) => snakeEquals(snake, s))) {
          const w = o.w + 1;
          const h = Math.abs(nx - x) + Math.abs(ny - y);
          const f = w + h;

          sortPush(openList, { f, w, snake, parent: o }, (a, b) => a.f - b.f);
          closeList.push(snake);
        }
      }
    }
  }
};
