import { createEmptyGrid, setColor, getColor, isInside, Color } from "../grid";

it("should set / get cell", () => {
  const grid = createEmptyGrid(2, 3);

  expect(getColor(grid, 0, 1)).toBe(0);

  setColor(grid, 0, 1, 1 as Color);

  expect(getColor(grid, 0, 1)).toBe(1);
});

test.each([
  [0, 1, true],
  [1, 2, true],

  [-1, 1, false],
  [0, -1, false],
  [2, 1, false],
  [0, 3, false],
])("isInside", (x, y, output) => {
  const grid = createEmptyGrid(2, 3);

  expect(isInside(grid, x, y)).toBe(output);
});
