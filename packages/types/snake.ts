import type { Point } from "./point";

export type Snake = Uint8Array & { _tag: "__Snake__" };

export const getHeadX = (snake: Snake) => snake[0] - 2;
export const getHeadY = (snake: Snake) => snake[1] - 2;

export const getSnakeLength = (snake: Snake) => snake.length / 2;

export const copySnake = (snake: Snake) => snake.slice() as Snake;

export const snakeEquals = (a: Snake, b: Snake) => {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
};

/**
 * return a copy of the next snake, considering that dx, dy is the direction
 */
export const nextSnake = (snake: Snake, dx: number, dy: number) => {
  const copy = new Uint8Array(snake.length);
  for (let i = 2; i < snake.length; i++) copy[i] = snake[i - 2];
  copy[0] = snake[0] + dx;
  copy[1] = snake[1] + dy;
  return copy as Snake;
};

/**
 * return true if the next snake will collide with itself
 */
export const snakeWillSelfCollide = (snake: Snake, dx: number, dy: number) => {
  const nx = snake[0] + dx;
  const ny = snake[1] + dy;

  for (let i = 2; i < snake.length - 2; i += 2)
    if (snake[i + 0] === nx && snake[i + 1] === ny) return true;

  return false;
};

export const snakeToCells = (snake: Snake): Point[] =>
  Array.from({ length: snake.length / 2 }, (_, i) => ({
    x: snake[i * 2 + 0] - 2,
    y: snake[i * 2 + 1] - 2,
  }));

export const createSnakeFromCells = (points: Point[]) => {
  const snake = new Uint8Array(points.length * 2);
  for (let i = points.length; i--; ) {
    snake[i * 2 + 0] = points[i].x + 2;
    snake[i * 2 + 1] = points[i].y + 2;
  }
  return snake as Snake;
};
