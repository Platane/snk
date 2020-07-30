import { Grid, isInsideLarge, getColor, isInside, Color } from "./grid";
import { around4, Point, pointEquals } from "./point";
import {
  // copySnake,
  // snakeSelfCollide,
  snakeWillSelfCollide,
  Snake,
  copySnake,
} from "./snake";

const computeSnakeKey = (snake: Snake) =>
  snake.map((p) => p.x + "." + p.y).join(",");

type I = {
  h: number;
  f: number;
  w: number;
  key: string;
  snake: Snake;
  parent: I | null;
};

const unwrap = (o: I | null, headN: Point): Point[] => {
  if (!o) return [];

  const head0 = o.snake[0];

  return [
    ...unwrap(o.parent, head0),
    { x: headN.x - head0.x, y: headN.y - head0.y },
  ];
};

const snakeEquals = (a: Snake, b: Snake, n = 99999) => {
  for (let i = 0; i < Math.min(a.length, b.length, n); i++)
    if (!pointEquals(a[i], b[i])) return false;
  return true;
};

export const getAvailableRoutes = (
  grid: Grid,
  snake0: Snake,
  options: any,
  maxSolutions: number = 10,
  maxLengthEquality: number = 1
) => {
  const openList: I[] = [
    {
      key: computeSnakeKey(snake0),
      snake: snake0,

      // weight, step from origin
      w: 0,

      // heuristic
      h: 0,

      // fitness, more is better
      f: 0,
      parent: null,
    },
  ];
  const closeList: Record<string, I> = {};

  const solutions: { color: Color; snakeN: Snake; directions: Point[] }[] = [];

  let i = 0;

  debugger;

  while (openList.length && i++ < 5000 && solutions.length < maxSolutions) {
    openList.sort((a, b) => b.f - a.f);
    const c = openList.shift()!;

    closeList[c.key] = c;

    snakeSteps.push(copySnake(c.snake));

    const [head] = c.snake;
    const color =
      isInside(grid, head.x, head.y) && getColor(grid, head.x, head.y);

    if (color) {
      const solution = {
        color,
        snakeN: c.snake,
        directions: unwrap(c.parent, c.snake[0]),
      };

      const s0 = solutions.find((s) =>
        snakeEquals(s.snakeN, solution.snakeN, maxLengthEquality + 1)
      );

      if (!s0 || solution.directions.length < s0.directions.length)
        solutions.push(solution);
    } else {
      for (const direction of around4) {
        const x = head.x + direction.x;
        const y = head.y + direction.y;

        if (
          isInsideLarge(grid, 1, x, y) &&
          !snakeWillSelfCollide(c.snake, x, y)
        ) {
          const snake = c.snake.slice(0, options.maxSnakeLength - 1);
          snake.unshift({ x, y });

          const key = computeSnakeKey(snake);

          if (!closeList[key] && !openList.some((s) => s.key === key)) {
            const h =
              Math.abs(snake[0].x - snake0[0].x) +
              Math.abs(snake[0].y - snake0[0].y);

            const w = 1 + c.w;

            const f = -w;
            // const f = h * 0.6 - w;

            openList.push({ key, snake, f, w, h, parent: c });
          } else {
            // console.log(key, closeList);
            // debugger;
          }
        }
      }
    }
  }

  return solutions;
};

export const snakeSteps: Snake[] = [];
