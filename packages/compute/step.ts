import { Grid, Color, getColor, isInside, setColor } from "./grid";
import { Point } from "./point";

export const moveSnake = (snake: Point[], headx: number, heady: number) => {
  for (let k = snake.length - 1; k > 0; k--) {
    snake[k].x = snake[k - 1].x;
    snake[k].y = snake[k - 1].y;
  }
  snake[0].x = headx;
  snake[0].y = heady;
};

export const stepSnake = (
  snake: Point[],
  direction: Point,
  options: { maxSnakeLength: number }
) => {
  const headx = snake[0].x + direction.x;
  const heady = snake[0].y + direction.y;

  if (snake.length === options.maxSnakeLength) {
    moveSnake(snake, headx, heady);
  } else {
    snake.unshift({ x: headx, y: heady });
  }
};

export const stepPicking = (grid: Grid, snake: Point[], stack: Color[]) => {
  if (isInside(grid, snake[0].x, snake[0].y)) {
    const c = getColor(grid, snake[0].x, snake[0].y);

    if (c) {
      setColor(grid, snake[0].x, snake[0].y, null);
      stack.push(c);
    }
  }
};

export const step = (
  grid: Grid,
  snake: Point[],
  stack: Color[],
  direction: Point,
  options: { maxSnakeLength: number }
) => {
  stepSnake(snake, direction, options);
  stepPicking(grid, snake, stack);
};
