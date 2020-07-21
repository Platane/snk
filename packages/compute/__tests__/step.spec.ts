import { step } from "../step";
import { around4 } from "../point";
import { createEmptyGrid, setColor, getColor } from "../grid";

it("should move snake", () => {
  const grid = createEmptyGrid(4, 3);
  const snake = [{ x: 1, y: 1 }];
  const direction = around4[0];
  const stack: number[] = [];
  const options = { maxSnakeLength: 5 };

  step(grid, snake, stack, direction, options);

  expect(snake).toEqual([
    { x: 2, y: 1 },
    { x: 1, y: 1 },
  ]);

  step(grid, snake, stack, direction, options);

  expect(snake).toEqual([
    { x: 3, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 1 },
  ]);

  step(grid, snake, stack, direction, options);

  expect(snake).toEqual([
    { x: 4, y: 1 },
    { x: 3, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 1 },
  ]);
});

it("should move short snake", () => {
  const grid = createEmptyGrid(8, 3);
  const snake = [{ x: 1, y: 1 }];
  const direction = around4[0];
  const stack: number[] = [];
  const options = { maxSnakeLength: 3 };

  step(grid, snake, stack, direction, options);

  expect(snake).toEqual([
    { x: 2, y: 1 },
    { x: 1, y: 1 },
  ]);

  step(grid, snake, stack, direction, options);

  expect(snake).toEqual([
    { x: 3, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 1 },
  ]);

  step(grid, snake, stack, direction, options);

  expect(snake).toEqual([
    { x: 4, y: 1 },
    { x: 3, y: 1 },
    { x: 2, y: 1 },
  ]);

  step(grid, snake, stack, direction, options);

  expect(snake).toEqual([
    { x: 5, y: 1 },
    { x: 4, y: 1 },
    { x: 3, y: 1 },
  ]);
});

it("should pick up fruit", () => {
  const grid = createEmptyGrid(4, 3);
  const snake = [{ x: 1, y: 1 }];
  const direction = around4[0];
  const stack: number[] = [];
  const options = { maxSnakeLength: 2 };
  setColor(grid, 3, 1, 9);

  step(grid, snake, stack, direction, options);

  expect(getColor(grid, 3, 1)).toBe(9);
  expect(stack).toEqual([]);

  step(grid, snake, stack, direction, options);

  expect(getColor(grid, 3, 1)).toBe(null);
  expect(stack).toEqual([9]);
});
