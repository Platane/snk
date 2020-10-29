import { Color, createEmptyGrid, setColor } from "../grid";

export const createFromAscii = (ascii: string) => {
  const a = ascii.split("\n");
  if (a[0] === "") a.shift();
  const height = a.length;
  const width = Math.max(...a.map((r) => r.length));

  const grid = createEmptyGrid(width, height);
  for (let x = width; x--; )
    for (let y = height; y--; ) {
      const c = a[y][x];
      const color =
        (c === "#" && 3) || (c === "@" && 2) || (c === "." && 1) || +c;
      if (c) setColor(grid, x, y, color as Color);
    }

  return grid;
};
