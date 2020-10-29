import {
  copyGrid,
  getColor,
  isEmpty,
  isInside,
  setColorEmpty,
} from "@snk/types/grid";
import { around4 } from "@snk/types/point";
import { sortPush } from "./utils/sortPush";
import {
  createSnakeFromCells,
  getHeadX,
  getHeadY,
  nextSnake,
  snakeEquals,
  snakeWillSelfCollide,
} from "@snk/types/snake";
import type { Snake } from "@snk/types/snake";
import type { Color, Grid } from "@snk/types/grid";
import type { Point } from "@snk/types/point";

type M = {
  snake: Snake;
  grid: Grid;
  parent: M | null;
  w: number;
  h: number;
  f: number;
};

/**
 * returns the path to reach the outside which contains the least color cell
 */
const getSnakeEscapePath = (grid0: Grid, snake0: Snake, color: Color) => {
  const openList: M[] = [
    { snake: snake0, grid: grid0, w: 0, h: 0, f: 0, parent: null },
  ];
  const closeList: Snake[] = [];

  while (openList.length) {
    const o = openList.shift()!;

    for (const a of around4) {
      if (!snakeWillSelfCollide(o.snake, a.x, a.y)) {
        const y = getHeadY(o.snake) + a.y;
        const x = getHeadX(o.snake) + a.x;

        if (!isInside(grid0, x, y)) {
          // unwrap and return
          const points: Point[] = [];

          points.push({ x, y });
          let e: M["parent"] = o;
          while (e) {
            points.unshift({
              x: getHeadX(e.snake),
              y: getHeadY(e.snake),
            });
            e = e.parent;
          }

          return points;
        }

        const u = getColor(grid0, x, y);

        if (isEmpty(u) || u <= color) {
          const snake = nextSnake(o.snake, a.x, a.y);

          if (!closeList.some((s0) => snakeEquals(s0, snake))) {
            let grid = o.grid;
            if (!isEmpty(u)) {
              grid = copyGrid(grid);
              setColorEmpty(grid, x, y);
            }

            const h = Math.abs(grid.height / 2 - y);
            const w = o.w + (u === color ? 1 : 0);
            const f = w * 1000 - h;
            sortPush(
              openList,
              { snake, grid, parent: o, h, w, f },
              (a, b) => a.f - b.f
            );
            closeList.push(snake);
          }
        }
      }
    }
  }

  return null;
};

/**
 * compute the best tunnel to get to the cell and back to the outside ( best = less usage of <color> )
 *
 * notice that it's one of the best tunnels, more with the same score could exist
 */
export const getBestTunnel = (
  grid: Grid,
  x: number,
  y: number,
  color: Color,
  snakeN: number
) => {
  const c = { x, y };
  const snake = createSnakeFromCells(Array.from({ length: snakeN }, () => c));

  const one = getSnakeEscapePath(grid, snake, color);

  if (!one) return null;

  // get the position of the snake if it was going to leave the x,y cell
  const snakeICells = one.slice(0, snakeN);
  while (snakeICells.length < snakeN)
    snakeICells.push(snakeICells[snakeICells.length - 1]);
  const snakeI = createSnakeFromCells(snakeICells);

  // remove from the grid the colors that one eat
  const gridI = copyGrid(grid);
  for (const { x, y } of one)
    if (isInside(grid, x, y)) setColorEmpty(gridI, x, y);

  const two = getSnakeEscapePath(gridI, snakeI, color);

  if (!two) return null;

  one.shift();
  one.reverse();
  one.push(...two);
  trimTunnelStart(grid, one);
  trimTunnelEnd(grid, one);

  return one;
};

/**
 * remove empty cell from start
 */
export const trimTunnelStart = (grid: Grid, tunnel: Point[]) => {
  while (tunnel.length) {
    const { x, y } = tunnel[0];
    if (!isInside(grid, x, y) || isEmpty(getColor(grid, x, y))) tunnel.shift();
    else break;
  }
};

/**
 * remove empty cell from end
 */
export const trimTunnelEnd = (grid: Grid, tunnel: Point[]) => {
  while (tunnel.length) {
    const i = tunnel.length - 1;
    const { x, y } = tunnel[i];
    if (
      !isInside(grid, x, y) ||
      isEmpty(getColor(grid, x, y)) ||
      tunnel.findIndex((p) => p.x === x && p.y === y) < i
    )
      tunnel.pop();
    else break;
  }
};
