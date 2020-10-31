import { getColor, isEmpty, isInside } from "@snk/types/grid";
import { getHeadX, getHeadY, nextSnake } from "@snk/types/snake";
import type { Snake } from "@snk/types/snake";
import type { Grid } from "@snk/types/grid";
import type { Point } from "@snk/types/point";

/**
 * get the sequence of snake to cross the tunnel
 */
export const getTunnelPath = (snake0: Snake, tunnel: Point[]) => {
  const chain: Snake[] = [];
  let snake = snake0;

  for (let i = 1; i < tunnel.length; i++) {
    const dx = tunnel[i].x - getHeadX(snake);
    const dy = tunnel[i].y - getHeadY(snake);
    snake = nextSnake(snake, dx, dy);
    chain.unshift(snake);
  }

  return chain;
};

/**
 * assuming the grid change and the colors got deleted, update the tunnel
 */
export const updateTunnel = (
  grid: Grid,
  tunnel: Point[],
  toDelete: Point[]
) => {
  while (tunnel.length) {
    const { x, y } = tunnel[0];
    if (
      isEmptySafe(grid, x, y) ||
      toDelete.some((p) => p.x === x && p.y === y)
    ) {
      tunnel.shift();
    } else break;
  }

  while (tunnel.length) {
    const { x, y } = tunnel[tunnel.length - 1];
    if (
      isEmptySafe(grid, x, y) ||
      toDelete.some((p) => p.x === x && p.y === y)
    ) {
      tunnel.pop();
    } else break;
  }
};

const isEmptySafe = (grid: Grid, x: number, y: number) =>
  !isInside(grid, x, y) || isEmpty(getColor(grid, x, y));

/**
 * remove empty cell from start
 */
export const trimTunnelStart = (grid: Grid, tunnel: Point[]) => {
  while (tunnel.length) {
    const { x, y } = tunnel[0];
    if (isEmptySafe(grid, x, y)) tunnel.shift();
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
      isEmptySafe(grid, x, y) ||
      tunnel.findIndex((p) => p.x === x && p.y === y) < i
    )
      tunnel.pop();
    else break;
  }
};
