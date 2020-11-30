import {
  Empty,
  getColor,
  isEmpty,
  isInside,
  setColorEmpty,
} from "@snk/types/grid";
import { getHeadX, getHeadY, getSnakeLength } from "@snk/types/snake";
import { getBestTunnel } from "./getBestTunnel";
import { fillOutside, Outside } from "./outside";
import { getTunnelPath } from "./tunnel";
import { getPathTo } from "./getPathTo";
import type { Snake } from "@snk/types/snake";
import type { Color, Grid } from "@snk/types/grid";
import type { Point } from "@snk/types/point";

type T = Point & { tunnel: Point[]; priority: number };

export const clearResidualColoredLayer = (
  grid: Grid,
  outside: Outside,
  snake0: Snake,
  color: Color
) => {
  const snakeN = getSnakeLength(snake0);

  const tunnels = getTunnellablePoints(grid, outside, snakeN, color);

  // sort
  tunnels.sort((a, b) => b.priority - a.priority);

  const chain: Snake[] = [snake0];

  while (tunnels.length) {
    // get the best next tunnel
    let t = getNextTunnel(tunnels, chain[0]);

    // goes to the start of the tunnel
    chain.unshift(...getPathTo(grid, chain[0], t[0].x, t[0].y)!);

    // goes to the end of the tunnel
    chain.unshift(...getTunnelPath(chain[0], t));

    // update grid
    for (const { x, y } of t) setEmptySafe(grid, x, y);

    // update outside
    fillOutside(outside, grid);

    // update tunnels
    for (let i = tunnels.length; i--; )
      if (isEmpty(getColor(grid, tunnels[i].x, tunnels[i].y)))
        tunnels.splice(i, 1);
      else {
        const t = tunnels[i];
        const tunnel = getBestTunnel(grid, outside, t.x, t.y, color, snakeN);

        if (!tunnel) tunnels.splice(i, 1);
        else {
          t.tunnel = tunnel;
          t.priority = getPriority(grid, color, tunnel);
        }
      }

    // re-sort
    tunnels.sort((a, b) => b.priority - a.priority);
  }

  chain.pop();
  return chain;
};

const getNextTunnel = (ts: T[], snake: Snake) => {
  let minDistance = Infinity;
  let closestTunnel: Point[] | null = null;

  const x = getHeadX(snake);
  const y = getHeadY(snake);

  const priority = ts[0].priority;

  for (let i = 0; ts[i] && ts[i].priority === priority; i++) {
    const t = ts[i].tunnel;

    const d = distanceSq(t[0].x, t[0].y, x, y);
    if (d < minDistance) {
      minDistance = d;
      closestTunnel = t;
    }
  }

  return closestTunnel!;
};

/**
 * get all the tunnels for all the cells accessible
 */
export const getTunnellablePoints = (
  grid: Grid,
  outside: Outside,
  snakeN: number,
  color: Color
) => {
  const points: T[] = [];

  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      const c = getColor(grid, x, y);
      if (!isEmpty(c) && c < color) {
        const tunnel = getBestTunnel(grid, outside, x, y, color, snakeN);
        if (tunnel) {
          const priority = getPriority(grid, color, tunnel);
          points.push({ x, y, priority, tunnel });
        }
      }
    }

  return points;
};

/**
 * get the score of the tunnel
 * prioritize tunnel with maximum color smaller than <color> and with minimum <color>
 * with some tweaks
 */
export const getPriority = (grid: Grid, color: Color, tunnel: Point[]) => {
  let nColor = 0;
  let nLess = 0;

  for (let i = 0; i < tunnel.length; i++) {
    const { x, y } = tunnel[i];
    const c = getColorSafe(grid, x, y);

    if (!isEmpty(c) && i === tunnel.findIndex((p) => p.x === x && p.y === y)) {
      if (c === color) nColor += 1;
      else nLess += color - c;
    }
  }

  if (nColor === 0) return 99999;
  return nLess / nColor;
};

const distanceSq = (ax: number, ay: number, bx: number, by: number) =>
  (ax - bx) ** 2 + (ay - by) ** 2;

const getColorSafe = (grid: Grid, x: number, y: number) =>
  isInside(grid, x, y) ? getColor(grid, x, y) : (0 as Empty);

const setEmptySafe = (grid: Grid, x: number, y: number) => {
  if (isInside(grid, x, y)) setColorEmpty(grid, x, y);
};
