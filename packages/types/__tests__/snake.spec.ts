import {
  createSnakeFromCells,
  nextSnake,
  snakeToCells,
  snakeWillSelfCollide,
} from "../snake";

it("should convert to point", () => {
  const snk0 = [
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ];

  expect(snakeToCells(createSnakeFromCells(snk0))).toEqual(snk0);
});

it("should return next snake", () => {
  const snk0 = [
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ];

  const snk1 = [
    { x: 2, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
  ];

  expect(snakeToCells(nextSnake(createSnakeFromCells(snk0), 1, 0))).toEqual(
    snk1
  );
});

it("should test snake collision", () => {
  const snk0 = [
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ];

  expect(snakeWillSelfCollide(createSnakeFromCells(snk0), 1, 0)).toBe(false);
  expect(snakeWillSelfCollide(createSnakeFromCells(snk0), 0, -1)).toBe(true);
});
