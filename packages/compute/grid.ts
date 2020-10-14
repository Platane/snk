export type Color = (1 | 2 | 3 | 4 | 5 | 6) & { _tag: "__Color__" };
export type Empty = 0 & { _tag: "__Empty__" };

export type Grid = {
  width: number;
  height: number;
  data: Uint8Array;
};

export const getIndex = (grid: Grid, x: number, y: number) =>
  x * grid.height + y;

export const isInside = (grid: Grid, x: number, y: number) =>
  x >= 0 && y >= 0 && x < grid.width && y < grid.height;

export const isInsideLarge = (grid: Grid, m: number, x: number, y: number) =>
  x >= -m && y >= -m && x < grid.width + m && y < grid.height + m;

export const copyGrid = ({ width, height, data }: Grid) => ({
  width,
  height,
  data: Uint8Array.from(data),
});

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

/**
 * extract colors
 * return a list of the colors found in the grid
 */
export const extractColors = (grid: Grid): Color[] => {
  const colors = new Set<Color>();
  grid.data.forEach((c: any) => {
    if (!isEmpty(c)) colors.add(c);
  });
  return Array.from(colors.keys()).sort();
};

/**
 * extract colors count
 * return a list of the colors and their occurrences found in the grid
 */
export const extractColorCount = (grid: Grid) => {
  const colors = new Map<Color, number>();
  grid.data.forEach((c: any) => {
    if (!isEmpty(c)) colors.set(c, 1 + (colors.get(c) || 0));
  });
  return Array.from(colors.entries()).map(([color, count]) => ({
    color,
    count,
  }));
};

/**
 *  return true if the both are equals
 */
export const gridEquals = (a: Grid, b: Grid) =>
  a.data.every((_, i) => a.data[i] === b.data[i]);

/**
 * return a unique string for the grid
 */
export const getGridKey = ({ data }: Grid) => {
  let key = "";
  const n = 5;
  const radius = 1 << n;
  for (let k = 0; k < data.length; k += n) {
    let u = 0;
    for (let i = n; i--; ) u += (1 << i) * +!!data[k + i];

    key += u.toString(radius);
  }
  return key;
};

export const createEmptyGrid = (width: number, height: number) => ({
  width,
  height,
  data: new Uint8Array(width * height),
});
