import "../utils/menu";
import { getBestRoute } from "@snk/solver/getBestRoute";
import { getPathToPose } from "@snk/solver/getPathToPose";
import { createSvg } from "@snk/svg-creator";
import { drawOptions } from "../utils/canvas";
import { grid, snake } from "../utils/sample";

const chain = getBestRoute(grid, snake);
chain.push(...getPathToPose(chain.slice(-1)[0], snake)!);

(async () => {
  const svg = await createSvg(grid, null, chain, drawOptions, {
    stepDurationMs: 200,
  });

  const container = document.createElement("div");
  container.innerHTML = svg;
  document.body.appendChild(container);
})();
