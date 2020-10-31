import "./menu";
import { getBestRoute } from "@snk/compute/getBestRoute";
import { createSvg } from "../svg-creator";
import { grid, snake } from "./sample";
import { drawOptions } from "./canvas";

const chain = getBestRoute(grid, snake);
const svg = createSvg(grid, chain, drawOptions, { frameDuration: 200 });

const container = document.createElement("div");
container.innerHTML = svg;
document.body.appendChild(container);
