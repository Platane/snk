import { setColor, createEmptyGrid } from "@snk/types/grid";
import type { Cell } from "@snk/github-user-contribution";
import type { Color } from "@snk/types/grid";

export const userContributionToGrid = (cells: Cell[]) => {
  const width = Math.max(0, ...cells.map((c) => c.x)) + 1;
  const height = Math.max(0, ...cells.map((c) => c.y)) + 1;

  const grid = createEmptyGrid(width, height);
  for (const c of cells) if (c.k) setColor(grid, c.x, c.y, c.k as Color);

  return grid;
};
