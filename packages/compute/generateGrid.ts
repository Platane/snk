import { Grid, Color, setColor, createEmptyGrid } from "./grid";

const defaultRand = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a)) + a;

export const generateRandomGrid = (
  width: number,
  height: number,
  options: { colors: Color[]; emptyP: number } = {
    colors: [1, 2, 3],
    emptyP: 2,
  },
  rand = defaultRand
): Grid => {
  const grid = createEmptyGrid(width, height);

  for (let x = width; x--; )
    for (let y = height; y--; ) {
      const k = rand(-options.emptyP, options.colors.length);

      if (k >= 0) setColor(grid, x, y, options.colors[k]);
    }

  return grid;
};
