import { setColor, createEmptyGrid, setColorEmpty } from "@snk/types/grid";
import type { Cell } from "@snk/github-user-contribution";
import type { Color } from "@snk/types/grid";

export const userContributionToGrid = (cells: Cell[]) => {
  const width = Math.max(0, ...cells.map((c) => c.x)) + 1;
  const height = Math.max(0, ...cells.map((c) => c.y)) + 1;

  const grid = createEmptyGrid(width, height);
  for (const c of cells) {
    if (c.level > 0) setColor(grid, c.x, c.y, c.level as Color);
    else setColorEmpty(grid, c.x, c.y);
  }

  return grid;
};
