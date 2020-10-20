import { realistic as grid } from "@snk/types/__fixtures__/grid";
import { snake3 } from "@snk/types/__fixtures__/snake";
import { performance } from "perf_hooks";
import { getAvailableRoutes } from "../getAvailableRoutes";
import { getBestRoute } from "../getBestRoute";

{
  const m = 100;
  const s = performance.now();
  for (let k = m; k--; ) {
    const solutions = [];

    getAvailableRoutes(grid, snake3, (snakes) => {
      solutions.push(snakes);
      return false;
    });
  }
  console.log("getAvailableRoutes", (performance.now() - s) / m, "ms");
}

{
  const m = 10;
  const s = performance.now();
  for (let k = m; k--; ) {
    getBestRoute(grid, snake3);
  }

  console.log("getBestRoute", (performance.now() - s) / m, "ms");
}
