import { getBestRoute } from "../getBestRoute";
import { Color, createEmptyGrid } from "@snk/types/grid";
import { snake3 } from "@snk/types/__fixtures__/snake";
import { randomlyFillGrid } from "@snk/types/randomlyFillGrid";
import ParkMiller from "park-miller";

const n = 1000;
const width = 5;
const height = 5;
it(`should find solution for ${n} ${width}x${height} generated grids`, () => {
  const results = Array.from({ length: n }, (_, seed) => {
    const grid = createEmptyGrid(width, height);
    const pm = new ParkMiller(seed);
    const random = pm.integerInRange.bind(pm);
    randomlyFillGrid(grid, { colors: [1, 2] as Color[], emptyP: 2 }, random);

    try {
      getBestRoute(grid, snake3);
      return { seed };
    } catch (error) {
      return { seed, error };
    }
  });

  expect(results.filter((x) => x.error)).toEqual([]);
});
