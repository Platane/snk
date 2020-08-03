import { Grid, isInsideLarge, getColor, isInside } from "./grid";
import { around4, Point, pointEquals } from "./point";
import { snakeWillSelfCollide, Snake } from "./snake";

const computeSnakeKey = (snake: Snake) => {
  let key = "";
  for (let i = 0; i < snake.length; i++) key += snake[i].x + "," + snake[i].y;
  return key;
};

type I = {
  // h: number;
  // f: number;
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
  options: { maxSnakeLength: number },
  maxSolutions = 10,
  maxLengthEquality = 1,
  maxWeight = 30,
  maxIterations = 500
) => {
  const openList: I[] = [
    {
      key: computeSnakeKey(snake0),
      snake: snake0,
      w: 0,
      parent: null,
    },
  ];
  const closeList: Record<string, I> = {};

  const solutions: { snakeN: Snake; directions: Point[] }[] = [];

  while (
    openList.length &&
    maxIterations-- > 0 &&
    openList[0].w <= maxWeight &&
    solutions.length < maxSolutions
  ) {
    openList.sort((a, b) => a.w - b.w);
    const c = openList.shift()!;

    closeList[c.key] = c;

    const [head] = c.snake;
    const color =
      isInside(grid, head.x, head.y) && getColor(grid, head.x, head.y);

    if (color) {
      const s0 = solutions.find((s) =>
        snakeEquals(s.snakeN, c.snake, maxLengthEquality + 1)
      );

      const directions = unwrap(c.parent, c.snake[0]);

      if (!s0 || directions.length < s0.directions.length)
        solutions.push({ snakeN: c.snake, directions });
    } else {
      for (let i = 0; i < around4.length; i++) {
        const x = head.x + around4[i].x;
        const y = head.y + around4[i].y;

        if (
          isInsideLarge(grid, 1, x, y) &&
          !snakeWillSelfCollide(c.snake, x, y)
        ) {
          const snake = c.snake.slice(0, options.maxSnakeLength - 1);
          snake.unshift({ x, y });

          const key = computeSnakeKey(snake);

          if (!closeList[key] && !openList.some((s) => s.key === key)) {
            const w = 1 + c.w;
            openList.push({ key, snake, w, parent: c });
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
