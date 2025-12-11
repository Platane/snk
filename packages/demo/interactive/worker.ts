import { getBestRoute } from "@snk/solver/getBestRoute";
import { getPathToPose } from "@snk/solver/getPathToPose";
import { snake4 as snake } from "@snk/types/__fixtures__/snake";
import type { Grid } from "@snk/types/grid";
import { createRpcServer } from "./worker-utils";

const getChain = (grid: Grid) => {
  const chain = getBestRoute(grid, snake)!;
  chain.push(...getPathToPose(chain.slice(-1)[0], snake)!);

  return chain;
};

const api = { getChain };
export type API = typeof api;

createRpcServer(api);
