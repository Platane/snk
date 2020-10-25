import { getColor, isEmpty, setColorEmpty } from "@snk/types/grid";
import {
  getHeadX,
  getHeadY,
  getSnakeLength,
  nextSnake,
} from "@snk/types/snake";
import { getPathTo } from "./getPathTo";
import { getBestTunnel, trimTunnelEnd, trimTunnelStart } from "./getBestTunnel";
import type { Snake } from "@snk/types/snake";
import type { Color, Grid } from "@snk/types/grid";
import type { Point } from "@snk/types/point";

/**
 * - list the cells lesser than <color> that are reachable going through <color>
 * - for each cell of the list
 *      compute the best tunnel to get to the cell and back to the outside ( best = less usage of <color> )
 * - for each tunnel*
 *      make the snake go to the start of the tunnel from where it was, traverse the tunnel
 *      repeat
 *
 *  *sort the tunnel:
 *    - first one to go is the tunnel with the longest line on less than <color>
 *    - then the ones with the best ratio ( N of less than <color> ) / ( N of <color> )
 */
export const cleanIntermediateLayer = (
  grid: Grid,
  color: Color,
  snake0: Snake
) => {
  const tunnels: Point[][] = [];
  const chain: Snake[] = [snake0];

  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      const c = getColor(grid, x, y);

      if (!isEmpty(c) && c < color) {
        const tunnel = getBestTunnel(grid, x, y, color, getSnakeLength(snake0));
        if (tunnel) tunnels.push(tunnel);
      }
    }

  // find the best first tunnel
  let i = -1;
  for (let j = tunnels.length; j--; )
    if (
      i === -1 ||
      scoreFirst(grid, color, tunnels[i]) < scoreFirst(grid, color, tunnels[j])
    )
      i = j;

  while (i >= 0) {
    const [tunnel] = tunnels.splice(i, 1);

    // push to chain
    // 1\ the path to the start on the tunnel
    const path = getPathTo(grid, chain[0], tunnel[0].x, tunnel[0].y)!;
    chain.unshift(...path);
    // 2\ the path into the tunnel
    for (let i = 1; i < tunnel.length; i++) {
      const dx = tunnel[i].x - getHeadX(chain[0]);
      const dy = tunnel[i].y - getHeadY(chain[0]);
      const snake = nextSnake(chain[0], dx, dy);
      chain.unshift(snake);
    }

    // mutate grid
    for (const { x, y } of tunnel) setColorEmpty(grid, x, y);

    // remove the cell that we eat
    for (let j = tunnels.length; j--; ) {
      updateTunnel(grid, tunnels[j], tunnel);
      if (!tunnels[j].length) tunnels.splice(j, 1);
    }

    // select the next one
    i = -1;
    for (let j = tunnels.length; j--; )
      if (
        i === -1 ||
        score(grid, color, tunnels[i]) < score(grid, color, tunnels[j])
      )
        i = j;
  }

  return chain;
};

const scoreFirst = (grid: Grid, color: Color, tunnel: Point[]) =>
  tunnel.findIndex(({ x, y }) => getColor(grid, x, y) === color);

const score = (grid: Grid, color: Color, tunnel: Point[]) => {
  let nColor = 0;
  let nLessColor = 0;

  for (let i = 0; i < tunnel.length; i++) {
    const { x, y } = tunnel[i];

    const j = tunnel.findIndex((u) => x === u.x && y === u.y);

    if (i !== j) {
      const c = getColor(grid, x, y);
      if (c === color) nColor++;
      else if (!isEmpty(c)) nLessColor++;
    }
  }

  return nLessColor / nColor;
};

/**
 * assuming the grid change and the colors got deleted, update the tunnel
 */
const updateTunnel = (grid: Grid, tunnel: Point[], toDelete: Point[]) => {
  while (tunnel.length) {
    const { x, y } = tunnel[0];
    if (toDelete.some((p) => p.x === x && p.y === y)) {
      tunnel.shift();
      trimTunnelStart(grid, tunnel);
    } else break;
  }

  while (tunnel.length) {
    const { x, y } = tunnel[tunnel.length - 1];
    if (toDelete.some((p) => p.x === x && p.y === y)) {
      tunnel.pop();
      trimTunnelEnd(grid, tunnel);
    } else break;
  }
};
