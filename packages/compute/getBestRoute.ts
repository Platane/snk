import { copyGrid } from "@snk/types/grid";
import { createOutside } from "./outside";
import { clearResidualColoredLayer } from "./clearResidualColoredLayer";
import { clearCleanColoredLayer } from "./clearCleanColoredLayer";
import type { Color, Grid } from "@snk/types/grid";
import type { Snake } from "@snk/types/snake";

export const getBestRoute = (grid0: Grid, snake0: Snake) => {
  const grid = copyGrid(grid0);
  const outside = createOutside(grid);
  const chain: Snake[] = [snake0];

  for (const color of extractColors(grid)) {
    if (color > 1)
      chain.unshift(
        ...clearResidualColoredLayer(grid, outside, chain[0], color)
      );
    chain.unshift(...clearCleanColoredLayer(grid, outside, chain[0], color));
  }

  return chain.reverse();
};

const extractColors = (grid: Grid): Color[] => {
  // @ts-ignore
  let maxColor = Math.max(...grid.data);
  return Array.from({ length: maxColor }, (_, i) => (i + 1) as Color);
};
