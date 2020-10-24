/**
 * clean layer is too expensive with solution branching
 * do not branch for faster result ( at the cost of finding a minimal step number )
 */

import { copyGrid, setColorEmpty } from "@snk/types/grid";
import { getHeadX, getHeadY } from "@snk/types/snake";
import { getAvailableRoutes } from "./getAvailableRoutes";
import type { Snake } from "@snk/types/snake";
import type { Grid } from "@snk/types/grid";
import type { Point } from "@snk/types/point";

export const getAvailableWhiteListedRoute = (
  grid: Grid,
  snake: Snake,
  whiteList: Point[]
) => {
  let solution: Snake[] | null;

  getAvailableRoutes(grid, snake, (chain) => {
    const hx = getHeadX(chain[0]);
    const hy = getHeadY(chain[0]);

    if (!whiteList.some(({ x, y }) => hx === x && hy === y)) return false;

    solution = chain;

    return true;
  });

  // @ts-ignore
  return solution;
};

export const cleanLayer = (grid0: Grid, snake0: Snake, chunk0: Point[]) => {
  const chunk = chunk0.slice();
  const grid = copyGrid(grid0);
  let snake = snake0;
  const chain: Snake[] = [];

  while (chunk.length) {
    const chainN = getAvailableWhiteListedRoute(grid, snake, chunk);

    if (!chainN) throw new Error("some cells are unreachable");

    chain.unshift(...chainN);
    snake = chain[0];

    const x = getHeadX(snake);
    const y = getHeadY(snake);

    setColorEmpty(grid, x, y);

    const i = chunk.findIndex((c) => c.x === x && c.y === y);
    chunk.splice(i, 1);
  }

  return chain;
};
