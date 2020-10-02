import { Grid, Color, setColor, setColorEmpty } from "./grid";

const defaultRand = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a)) + a;

export const fillRandomGrid = (
  grid: Grid,
  {
    colors = [1, 2, 3] as Color[],
    emptyP = 2,
  }: { colors?: Color[]; emptyP?: number } = {},
  rand = defaultRand
) => {
  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      const k = rand(-emptyP, colors.length);

      if (k >= 0) setColor(grid, x, y, colors[k]);
      else setColorEmpty(grid, x, y);
    }
};
