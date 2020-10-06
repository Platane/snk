import { getAvailableInterestingRoutes } from "../getAvailableRoutes";
import { small as grid } from "../__fixtures__/grid";
import { snake3 } from "../__fixtures__/snake";
import { performance } from "perf_hooks";
import { getAvailableRoutes } from "../getAvailableRoutes2";

const m = 1000;
{
  const s = performance.now();
  for (let k = m; k--; ) {
    const solutions = [];

    getAvailableInterestingRoutes(
      grid,
      snake3,
      (snakes) => {
        solutions.push(snakes);
        return false;
      },
      2
    );
  }
  console.log((performance.now() - s) / m, "ms");
}

{
  const s = performance.now();
  for (let k = m; k--; ) {
    getAvailableRoutes(grid, snake3, 2);
  }

  console.log((performance.now() - s) / m, "ms");
}
