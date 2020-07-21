import { snakeSelfCollide, snakeWillSelfCollide } from "../snake";

test.each([
  [[{ x: 0, y: 0 }], false],
  [
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    true,
  ],
  [
    [
      { x: 1, y: 7 },
      { x: 0, y: 6 },
      { x: 2, y: 8 },
      { x: 1, y: 7 },
      { x: 3, y: 9 },
    ],
    true,
  ],
])("should report snake collision", (snake, collide) => {
  expect(snakeSelfCollide(snake)).toBe(collide);
});

test.each([
  [
    [
      { x: 1, y: 7 },
      { x: 0, y: 7 },
      { x: 0, y: 8 },
      { x: 0, y: 9 },
      { x: 1, y: 9 },
    ],
    { x: 1, y: 7 },
    true,
  ],
  [
    [
      { x: 1, y: 7 },
      { x: 0, y: 7 },
      { x: 0, y: 8 },
      { x: 0, y: 9 },
      { x: 1, y: 9 },
    ],
    { x: 1, y: 8 },
    false,
  ],
  [
    [
      { x: 1, y: 7 },
      { x: 0, y: 7 },
      { x: 0, y: 8 },
      { x: 0, y: 9 },
      { x: 1, y: 9 },
    ],
    { x: 1, y: 8 },
    false,
  ],
])("should report snake collision next", (snake, { x, y }, collide) => {
  expect(snakeWillSelfCollide(snake, x, y)).toBe(collide);
});
