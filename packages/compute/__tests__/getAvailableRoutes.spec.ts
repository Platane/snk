import { createEmptyGrid, setColor } from "../grid";
import { getAvailableRoutes } from "../getAvailableRoutes";

it("should find no routes in empty grid", () => {
  const grid = createEmptyGrid(10, 10);
  const snake = [{ x: 2, y: 2 }];
  const options = { maxSnakeLength: 1 };

  expect(getAvailableRoutes(grid, snake, options)).toEqual([]);
});

it("should find one route in single cell grid", () => {
  const grid = createEmptyGrid(10, 10);
  setColor(grid, 3, 2, 3);
  const snake = [{ x: 2, y: 2 }];
  const options = { maxSnakeLength: 1 };

  expect(getAvailableRoutes(grid, snake, options)).toEqual([
    { color: 3, snakeN: [{ x: 3, y: 2 }], directions: [{ x: 1, y: 0 }] },
  ]);
});
