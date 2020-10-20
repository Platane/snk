import { Grid, Color, setColor, setColorEmpty } from "./grid";

const defaultRand = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a + 1)) + a;

export const randomlyFillGrid = (
  grid: Grid,
  {
    colors = [1, 2, 3] as Color[],
    emptyP = 2,
  }: { colors?: Color[]; emptyP?: number } = {},
  rand = defaultRand
) => {
  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      const k = rand(-emptyP, colors.length - 1);

      if (k >= 0) setColor(grid, x, y, colors[k]);
      else setColorEmpty(grid, x, y);
    }
};
