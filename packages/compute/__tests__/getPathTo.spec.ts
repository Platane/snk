import { createEmptyGrid } from "@snk/types/grid";
import { getHeadX, getHeadY } from "@snk/types/snake";
import { snake3 } from "@snk/types/__fixtures__/snake";
import { getPathTo } from "../getPathTo";

it("should find it's way in vaccum", () => {
  const grid = createEmptyGrid(5, 0);

  const path = getPathTo(grid, snake3, 5, -1)!;

  expect([getHeadX(path[0]), getHeadY(path[0])]).toEqual([5, -1]);
});
