import { Point } from "./point";

export type Snake = Point[];

export const snakeSelfCollideNext = (
  snake: Snake,
  direction: Point,
  options: { maxSnakeLength: number }
) => {
  const hx = snake[0].x + direction.x;
  const hy = snake[0].y + direction.y;

  for (let i = 0; i < Math.min(options.maxSnakeLength, snake.length); i++)
    if (snake[i].x === hx && snake[i].y === hy) return true;

  return false;
};

export const snakeSelfCollide = (snake: Snake) => {
  for (let i = 1; i < snake.length; i++)
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;

  return false;
};

export const copySnake = (x: Snake) => x.map((p) => ({ ...p }));
