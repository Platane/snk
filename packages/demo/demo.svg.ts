import "./menu";
import { getBestRoute } from "@snk/solver/getBestRoute";
import { createSvg } from "@snk/svg-creator";
import { grid, snake } from "./sample";
import { drawOptions } from "./canvas";
import { getPathToPose } from "@snk/solver/getPathToPose";
import type { AnimationOptions } from "@snk/gif-creator";

const chain = getBestRoute(grid, snake);
chain.push(...getPathToPose(chain.slice(-1)[0], snake)!);

(async () => {
  const svg = await createSvg(grid, null, chain, drawOptions, {
    frameDuration: 200,
  } as AnimationOptions);

  const container = document.createElement("div");
  container.innerHTML = svg;
  document.body.appendChild(container);
})();
