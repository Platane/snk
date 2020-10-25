export type Color = (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) & { _tag: "__Color__" };
export type Empty = 0 & { _tag: "__Empty__" };

export type Grid = {
  width: number;
  height: number;
  data: Uint8Array;
};

export const isInside = (grid: Grid, x: number, y: number) =>
  x >= 0 && y >= 0 && x < grid.width && y < grid.height;

export const isInsideLarge = (grid: Grid, m: number, x: number, y: number) =>
  x >= -m && y >= -m && x < grid.width + m && y < grid.height + m;

export const copyGrid = ({ width, height, data }: Grid) => ({
  width,
  height,
  data: Uint8Array.from(data),
});

const getIndex = (grid: Grid, x: number, y: number) => x * grid.height + y;

export const getColor = (grid: Grid, x: number, y: number) =>
  grid.data[getIndex(grid, x, y)] as Color | Empty;

export const isEmpty = (color: Color | Empty): color is Empty => color === 0;

export const setColor = (
  grid: Grid,
  x: number,
  y: number,
  color: Color | Empty
) => {
  grid.data[getIndex(grid, x, y)] = color || 0;
};

export const setColorEmpty = (grid: Grid, x: number, y: number) => {
  setColor(grid, x, y, 0 as Empty);
};

/**
 * return true if the grid is empty
 */
export const isGridEmpty = (grid: Grid) => grid.data.every((x) => x === 0);

export const gridEquals = (a: Grid, b: Grid) =>
  a.data.every((_, i) => a.data[i] === b.data[i]);

export const createEmptyGrid = (width: number, height: number) => ({
  width,
  height,
  data: new Uint8Array(width * height),
});
