// import { generateGrid } from "@snk/compute/generateGrid";

import { generateGrid } from "@snk/compute/generateGrid";

console.log("hello world");

export const run = async (a: number) => {
  generateGrid(100, 100);

  console.log(a, generateGrid(100, 100));
};

run(1);
