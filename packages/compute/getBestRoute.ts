import { Grid, Color, copyGrid, getColor, setColor } from "./grid";
import { Point } from "./point";
import { Snake } from "./snake";
import { getAvailableRoutes } from "./getAvailableRoutes";

const isGridEmpty = (grid: Grid) => grid.data.every((x) => x === null);

const createComputeHeuristic = (
  grid0: Grid,
  _snake0: Snake,
  colors: Color[]
) => {
  const colorCount: Record<Color, number> = {};
  for (let x = grid0.width; x--; )
    for (let y = grid0.height; y--; ) {
      const c = getColor(grid0, x, y);
      if (c !== null) colorCount[c] = 1 + (colorCount[c] || 0);
    }

  const values = colors
    .map((k) => Array.from({ length: colorCount[k] }, () => k))
    .flat();

  return (_grid: Grid, _snake: Snake, stack: Color[]) => {
    let score = 0;

    for (let i = 0; i < stack.length; i++) {
      if (stack[i] === values[i]) {
        score += 52;
      } else {
        const u = Math.abs(stack[i] - values[i]);

        score += 5 - u;
      }
    }

    return score;
  };
};

const computeKey = (grid: Grid, snake: Snake, stack: Color[]) =>
  grid.data.map((x) => x || 0).join("") +
  "|" +
  snake.map((p) => p.x + "." + p.y).join(",") +
  "|" +
  stack.join("");

type I = {
  h: number;
  f: number;
  w: number;
  key: string;
  snake: Snake;
  grid: Grid;
  stack: Color[];
  parent: I | null;
  directions: Point[];
};

export const getBestRoute = (
  grid0: Grid,
  snake0: Snake,
  options: { maxSnakeLength: number; colors: Color[] },
  maxIterations = 500
) => {
  const computeHeuristic = createComputeHeuristic(
    grid0,
    snake0,
    options.colors
  );

  const closeList: Record<string, I> = {};
  const openList: I[] = [];

  {
    const h = computeHeuristic(grid0, snake0, []);
    const w = 0;
    const f = h + w;
    openList.push({
      key: computeKey(grid0, snake0, []),
      grid: grid0,
      snake: snake0,
      stack: [],
      parent: null,
      f,
      h,
      w,
      directions: [],
    });
  }

  let best = openList[0];

  while (openList.length && maxIterations-- > 0) {
    openList.sort((a, b) => a.f - b.f);
    const c = openList.shift()!;

    closeList[c.key] = c;

    if (c.f < best.f) best = c;

    if (!isGridEmpty(c.grid)) {
      const availableRoutes = getAvailableRoutes(
        c.grid,
        c.snake,
        options,
        30,
        1,
        20,
        500
      );

      for (const route of availableRoutes) {
        const stack = c.stack.slice();
        const grid = copyGrid(c.grid);
        const snake = route.snakeN;

        const { x, y } = route.snakeN[0];

        stack.push(getColor(grid, x, y)!);
        setColor(grid, x, y, null);

        const key = computeKey(grid, snake, stack);

        if (!closeList[key] && !openList.some((s) => s.key === key)) {
          const h = computeHeuristic(grid, snake, stack);
          const w = c.w + route.directions.length;
          const f = w - h;

          openList.push({
            key,
            grid,
            snake,
            stack,
            parent: c,
            h,
            w,
            f,
            directions: route.directions,
          });
        }
      }
    }
  }

  return unwrap(best);
};

const unwrap = (o: I | null): Point[] => {
  if (!o) return [];
  return [...unwrap(o.parent), ...o.directions];
};
