import { Color, copyGrid } from "@snk/types/grid";
import type { Grid } from "@snk/types/grid";
import { cleanColoredLayer } from "./cleanColoredLayer";
import type { Snake } from "@snk/types/snake";

export const getBestRoute = (grid0: Grid, snake0: Snake) => {
  const grid = copyGrid(grid0);
  const chain: Snake[] = [snake0];

  for (const color of extractColors(grid))
    chain.unshift(...cleanColoredLayer(grid, chain[0], color));

  return chain.reverse();
};

const extractColors = (grid: Grid): Color[] => {
  // @ts-ignore
  let maxColor = Math.max(...grid.data);
  return Array.from({ length: maxColor }, (_, i) => (i + 1) as Color);
};
