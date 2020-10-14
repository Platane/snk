import { copyGrid, extractColors } from "./grid";
import type { Snake } from "./snake";
import type { Grid } from "./grid";
import { pruneLayer } from "./pruneLayer";
import { cleanLayer } from "./cleanLayer";

export const getBestRoute = (grid0: Grid, snake0: Snake) => {
  const grid = copyGrid(grid0);
  const colors = extractColors(grid0);
  const snakeN = snake0.length / 2;

  const chain: Snake[] = [snake0];

  for (const color of colors) {
    const gridN = copyGrid(grid);
    const chunk = pruneLayer(grid, color, snakeN);
    const c = cleanLayer(gridN, chain[0], chunk);
    if (c) chain.unshift(...c);
  }

  return chain.reverse().slice(1);
};
