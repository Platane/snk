import {
  getColor,
  isEmpty,
  isInside,
  isInsideLarge,
  setColorEmpty,
} from "@snk/types/grid";
import {
  getHeadX,
  getHeadY,
  getSnakeLength,
  nextSnake,
  snakeEquals,
  snakeWillSelfCollide,
} from "@snk/types/snake";
import { around4, Point } from "@snk/types/point";
import { getBestTunnel } from "./getBestTunnel";
import { fillOutside } from "./outside";
import type { Outside } from "./outside";
import type { Snake } from "@snk/types/snake";
import type { Color, Empty, Grid } from "@snk/types/grid";

export const clearCleanColoredLayer = (
  grid: Grid,
  outside: Outside,
  snake0: Snake,
  color: Color
) => {
  const snakeN = getSnakeLength(snake0);

  const points = getTunnellablePoints(grid, outside, snakeN, color);

  const chain: Snake[] = [snake0];

  while (points.length) {
    const path = getPathToNextPoint(grid, chain[0], color, points)!;
    path.pop();

    for (const snake of path)
      setEmptySafe(grid, getHeadX(snake), getHeadY(snake));

    chain.unshift(...path);
  }

  fillOutside(outside, grid);

  chain.pop();
  return chain;
};

type M = { snake: Snake; parent: M | null };
const unwrap = (m: M | null): Snake[] =>
  !m ? [] : [m.snake, ...unwrap(m.parent)];
const getPathToNextPoint = (
  grid: Grid,
  snake0: Snake,
  color: Color,
  points: Point[]
) => {
  const closeList: Snake[] = [];
  const openList: M[] = [{ snake: snake0 } as any];

  while (openList.length) {
    const o = openList.shift()!;

    const x = getHeadX(o.snake);
    const y = getHeadY(o.snake);

    const i = points.findIndex((p) => p.x === x && p.y === y);
    if (i >= 0) {
      points.splice(i, 1);
      return unwrap(o);
    }

    for (const { x: dx, y: dy } of around4) {
      if (
        isInsideLarge(grid, 2, x + dx, y + dy) &&
        !snakeWillSelfCollide(o.snake, dx, dy) &&
        getColorSafe(grid, x + dx, y + dy) <= color
      ) {
        const snake = nextSnake(o.snake, dx, dy);

        if (!closeList.some((s0) => snakeEquals(s0, snake))) {
          closeList.push(snake);
          openList.push({ snake, parent: o });
        }
      }
    }
  }
};

/**
 * get all cells that are tunnellable
 */
export const getTunnellablePoints = (
  grid: Grid,
  outside: Outside,
  snakeN: number,
  color: Color
) => {
  const points: Point[] = [];

  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      const c = getColor(grid, x, y);
      if (
        !isEmpty(c) &&
        c <= color &&
        !points.some((p) => p.x === x && p.y === y)
      ) {
        const tunnel = getBestTunnel(grid, outside, x, y, color, snakeN);

        if (tunnel)
          for (const p of tunnel)
            if (!isEmptySafe(grid, p.x, p.y)) points.push(p);
      }
    }

  return points;
};

const getColorSafe = (grid: Grid, x: number, y: number) =>
  isInside(grid, x, y) ? getColor(grid, x, y) : (0 as Empty);

const setEmptySafe = (grid: Grid, x: number, y: number) => {
  if (isInside(grid, x, y)) setColorEmpty(grid, x, y);
};

const isEmptySafe = (grid: Grid, x: number, y: number) =>
  !isInside(grid, x, y) && isEmpty(getColor(grid, x, y));
