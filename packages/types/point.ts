export type Point = { x: number; y: number };

export const around4 = [
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
] as const;

export const pointEquals = (a: Point, b: Point) => a.x === b.x && a.y === b.y;
