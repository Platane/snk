import "./menu";
import { getBestRoute } from "@snk/compute/getBestRoute";
import { createSvg } from "../svg-creator";
import { grid, snake } from "./sample";
import { drawOptions } from "./canvas";
import { getPathToPose } from "@snk/compute/getPathToPose";

const chain = getBestRoute(grid, snake);
chain.push(...getPathToPose(chain.slice(-1)[0], snake)!);
const svg = createSvg(grid, chain, drawOptions, { frameDuration: 200 });

const container = document.createElement("div");
container.innerHTML = svg;
document.body.appendChild(container);
