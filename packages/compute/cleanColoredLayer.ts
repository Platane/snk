import { Color, getColor, isEmpty, setColorEmpty } from "@snk/types/grid";
import {
  getHeadX,
  getHeadY,
  getSnakeLength,
  nextSnake,
} from "@snk/types/snake";
import type { Snake } from "@snk/types/snake";
import type { Grid } from "@snk/types/grid";
import type { Point } from "@snk/types/point";
import { getBestTunnel, trimTunnelEnd, trimTunnelStart } from "./getBestTunnel";
import { getPathTo } from "./getPathTo";
import { getTunnels } from "./getTunnels";

/**
 * eat all the cell for which the color is smaller or equals to color and are reachable without going though cells with color+1 or higher
 * attempt to eat the smaller color first
 */
export const cleanColoredLayer = (grid: Grid, snake0: Snake, color: Color) => {
  const chain: Snake[] = [snake0];

  const snakeN = getSnakeLength(snake0);

  const tunnels = getTunnels(grid, getSnakeLength(snake0), color)
    .map((tunnel) => ({ tunnel, f: tunnelScore(grid, color, tunnel) }))
    .sort((a, b) => a.f - b.f);

  while (tunnels.length) {
    // get the best candidates
    const candidates = tunnels.filter((a, _, [a0]) => a.f === a0.f);

    // get the closest one
    {
      const x = getHeadX(chain[0]);
      const y = getHeadY(chain[0]);

      candidates.sort(
        ({ tunnel: [a] }, { tunnel: [b] }) =>
          distanceSq(x, y, a.x, a.y) - distanceSq(x, y, b.x, b.y)
      );
    }

    // pick tunnel and recompute it
    // it might not be relevant since the grid changes
    // in some edge case, it could lead to the snake reaching the first cell from the initial exit side
    // causing it to self collide when on it's way through the tunnel
    const { tunnel: tunnelCandidate } = candidates[0];
    const tunnel = getBestTunnel(
      grid,
      tunnelCandidate[0].x,
      tunnelCandidate[0].y,
      color,
      snakeN
    )!;

    // move to the start of the tunnel
    chain.unshift(...getPathTo(grid, chain[0], tunnel[0].x, tunnel[0].y)!);

    // move into the tunnel
    chain.unshift(...getTunnelPath(chain[0], tunnel));

    // update grid
    for (const { x, y } of tunnel) setColorEmpty(grid, x, y);

    // update other tunnels
    // eventually remove the ones made empty
    for (let i = tunnels.length; i--; ) {
      updateTunnel(grid, tunnels[i].tunnel, tunnel);

      if (tunnels[i].tunnel.length === 0) tunnels.splice(i, 1);
      else tunnels[i].f = tunnelScore(grid, color, tunnels[i].tunnel);
    }
    tunnels.sort((a, b) => a.f - b.f);
  }

  return chain.slice(0, -1);
};

/**
 * get the score of the tunnel
 * prioritize tunnel with maximum color smaller than <color> and with minimum <color>
 * with some tweaks
 */
const tunnelScore = (grid: Grid, color: Color, tunnel: Point[]) => {
  let nColor = 0;
  let nLess = 0;
  let nLessLead = -1;

  for (const { x, y } of tunnel) {
    const c = getColor(grid, x, y);

    if (!isEmpty(c)) {
      if (c === color) {
        nColor++;
        if (nLessLead === -1) nLessLead = nLess;
      } else nLess += color - c;
    }
  }

  if (nLess === 0) return 999999;

  return -nLessLead * 100 + (1 - nLess / nColor);
};

const distanceSq = (ax: number, ay: number, bx: number, by: number) =>
  (ax - bx) ** 2 + (ay - by) ** 2;

/**
 * get the sequence of snake to cross the tunnel
 */
const getTunnelPath = (snake0: Snake, tunnel: Point[]) => {
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
const updateTunnel = (grid: Grid, tunnel: Point[], toDelete: Point[]) => {
  trimTunnelStart(grid, tunnel);
  trimTunnelEnd(grid, tunnel);

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
