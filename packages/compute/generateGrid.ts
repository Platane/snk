import { Grid, Color } from "./grid";

const rand = (a: number, b: number) => Math.floor(Math.random() * (b - a)) + a;

export const generateEmptyGrid = (width: number, height: number) =>
  generateGrid(width, height, { colors: [], emptyP: 1 });

export const generateGrid = (
  width: number,
  height: number,
  options: { colors: Color[]; emptyP: number } = {
    colors: [1, 2, 3],
    emptyP: 2,
  }
): Grid => {
  const g = {
    width,
    height,
    data: Array.from({ length: width * height }, () => {
      const x = rand(-options.emptyP, options.colors.length);

      return x < 0 ? null : options.colors[x];
    }),
  };

  return g;
};
