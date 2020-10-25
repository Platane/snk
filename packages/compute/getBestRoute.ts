import { copyGrid } from "@snk/types/grid";
import { pruneLayer } from "./pruneLayer";
import { cleanLayer } from "./cleanLayer-monobranch";
import { getSnakeLength, Snake } from "@snk/types/snake";
import { cleanIntermediateLayer } from "./cleanIntermediateLayer";
import type { Color, Grid } from "@snk/types/grid";

export const getBestRoute = (grid0: Grid, snake0: Snake) => {
  const grid = copyGrid(grid0);
  const colors = extractColors(grid0);
  const snakeN = getSnakeLength(snake0);

  const chain: Snake[] = [snake0];

  for (const color of colors) {
    const gridN = copyGrid(grid);

    // clear the free colors
    const chunk = pruneLayer(grid, color, snakeN);
    chain.unshift(...cleanLayer(gridN, chain[0], chunk));

    // clear the remaining colors, allowing to eat color+1
    const nextColor = (color + 1) as Color;
    chain.unshift(...cleanIntermediateLayer(grid, nextColor, chain[0]));
  }

  return chain.reverse().slice(1);
};

const extractColors = (grid: Grid): Color[] => {
  // @ts-ignore
  let maxColor = Math.max(...grid.data);
  return Array.from({ length: maxColor }, (_, i) => (i + 1) as Color);
};
