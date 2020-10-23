import { getColor, isEmpty, isInside, setColorEmpty } from "@snk/types/grid";
import { around4 } from "@snk/types/point";
import { sortPush } from "./utils/sortPush";
import type { Color, Grid } from "@snk/types/grid";
import type { Point } from "@snk/types/point";
import {
  createSnakeFromCells,
  getHeadX,
  getHeadY,
  nextSnake,
  Snake,
  snakeEquals,
  snakeWillSelfCollide,
} from "@snk/types/snake";

type M = Point & { parent: M | null; h: number };

const unwrap = (grid: Grid, m: M | null): Point[] =>
  m ? [...unwrap(grid, m.parent), m] : [];

const getEscapePath = (grid: Grid, x: number, y: number, color: Color) => {
  const openList: M[] = [{ x, y, h: 0, parent: null }];
  const closeList: Point[] = [];

  while (openList.length) {
    const c = openList.shift()!;

    if (c.y === -1 || c.y === grid.height) return unwrap(grid, c);

    for (const a of around4) {
      const x = c.x + a.x;
      const y = c.y + a.y;

      if (!isInside(grid, x, y))
        return unwrap(grid, { x, y, parent: c } as any);

      const u = getColor(grid, x, y);

      if (
        (isEmpty(u) || u <= color) &&
        !closeList.some((cl) => cl.x === x && cl.y === y)
      ) {
        const h = Math.abs(grid.height / 2 - y);
        const o = { x, y, parent: c, h };

        sortPush(openList, o, (a, b) => a.h - b.h);
        closeList.push(o);
      }
    }
  }

  return null;
};

const snakeCanEscape = (grid: Grid, snake: Snake, color: Color) => {
  const openList: Snake[] = [snake];
  const closeList: Snake[] = [];

  while (openList.length) {
    const s = openList.shift()!;

    for (const a of around4) {
      const x = getHeadX(s) + a.x;
      const y = getHeadY(s) + a.y;

      if (!isInside(grid, x, y)) return true;

      const u = getColor(grid, x, y);

      if ((isEmpty(u) || u <= color) && !snakeWillSelfCollide(s, a.x, a.y)) {
        const sn = nextSnake(s, a.x, a.y);

        if (!closeList.some((s0) => snakeEquals(s0, sn))) {
          openList.push(sn);
          closeList.push(sn);
        }
      }
    }
  }

  return false;
};

/**
 * returns true if the cell can be reached by the snake from anywhere, and the snake can go back to anywhere
 */
const isFree = (
  grid: Grid,
  x: number,
  y: number,
  color: Color,
  snakeN: number
) => {
  // get the first path to escape
  const firstPath = getEscapePath(grid, x, y, color);

  if (!firstPath) return false;

  // build a snake from the path
  // /!\ it might be not a valid snake as we stack up the queue if the path is too short
  const s = firstPath.slice(0, snakeN);
  while (s.length < snakeN) s.push(s[s.length - 1]);
  const snake1 = createSnakeFromCells(s);

  // check for a second route, considering snake collision
  return snakeCanEscape(grid, snake1, color);
};

/**
 * returns free cells
 * and removes them from the grid
 */
export const pruneLayer = (grid: Grid, color: Color, snakeN: number) => {
  const chunk: Point[] = [];

  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      const c = getColor(grid, x, y);

      if (!isEmpty(c) && c <= color && isFree(grid, x, y, color, snakeN)) {
        setColorEmpty(grid, x, y);
        chunk.push({ x, y });
      }
    }

  return chunk;
};
