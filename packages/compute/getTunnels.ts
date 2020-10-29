import { Color, getColor, isEmpty } from "@snk/types/grid";
import type { Grid } from "@snk/types/grid";
import type { Point } from "@snk/types/point";
import { getBestTunnel } from "./getBestTunnel";

/**
 * get all the tunnels for all the cells accessible
 */
export const getTunnels = (grid: Grid, snakeN: number, color: Color) => {
  const tunnels: Point[][] = [];
  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      const c = getColor(grid, x, y);
      if (!isEmpty(c) && c <= color) {
        const tunnel = getBestTunnel(grid, x, y, color, snakeN);
        if (tunnel) tunnels.push(tunnel);
      }
    }

  return tunnels;
};
