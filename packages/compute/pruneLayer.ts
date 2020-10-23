import { getColor, isEmpty, isInside, setColorEmpty } from "@snk/types/grid";
import { around4 } from "@snk/types/point";
import { sortPush } from "./utils/sortPush";
import type { Color, Grid } from "@snk/types/grid";
import type { Point } from "@snk/types/point";

type M = Point & { parent: M | null; h: number; w: number };

const unwrap = (grid: Grid, m: M | null): Point[] =>
  m ? [...unwrap(grid, m.parent), m] : [];

const contains = (arr: Point[], x: number, y: number, limit: number) => {
  for (let i = Math.max(0, arr.length - limit); i--; )
    if (arr[i].x === x && arr[i].y === y) return true;
  return false;
};

const getEscapePath = (
  grid: Grid,
  x: number,
  y: number,
  color: Color,
  previousSnake: Point[] = []
) => {
  const openList: M[] = [{ x, y, h: 0, w: 0, parent: null }];
  const closeList: Point[] = [];

  while (openList.length) {
    const c = openList.shift()!;

    if (c.y === -1 || c.y === grid.height) return unwrap(grid, c);

    for (const a of around4) {
      const x = c.x + a.x;
      const y = c.y + a.y;

      if (!contains(previousSnake, x, y, c.w)) {
        if (!isInside(grid, x, y))
          return unwrap(grid, { x, y, parent: c } as any);

        const u = getColor(grid, x, y);

        if (
          (isEmpty(u) || u <= color) &&
          !closeList.some((cl) => cl.x === x && cl.y === y)
        ) {
          const h = Math.abs(grid.height / 2 - y);
          const o = { x, y, parent: c, h, w: c.w + 1 };

          sortPush(openList, o, (a, b) => a.h - b.h);
          closeList.push(o);
          openList.push(o);
        }
      }
    }
  }

  return null;
};

const isFree = (
  grid: Grid,
  x: number,
  y: number,
  color: Color,
  snakeN: number
) => {
  const one = getEscapePath(grid, x, y, color);

  if (!one) return false;

  const two = getEscapePath(grid, x, y, color, one.slice(0, snakeN));

  return !!two;
};

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
