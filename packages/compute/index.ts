import { Grid, Color, copyGrid, isInsideLarge, getColor } from "./grid";
import { Point, around4 } from "./point";
import { step } from "./step";
import { copySnake, snakeSelfCollide, Snake } from "./snake";

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
  const weights = colors
    .map((k) =>
      Array.from({ length: colorCount[k] }).map(
        (_, i, arr) => i / (arr.length - 1)
      )
    )
    .flat();

  return (_grid: Grid, _snake: Snake, stack: Color[]) => {
    let score = 0;

    for (let i = 0; i < stack.length; i++) {
      const u = stack[i] - values[i];

      if (u !== 0) debugger;

      if (u > 0) score -= 100 * u * (1 + 1 - weights[i]);
      else if (u < 0) score -= 100 * -u * (1 + weights[i]);
      else score += 100;
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

const createCell = (
  key: string,
  grid: Grid,
  snake: Snake,
  stack: Color[],
  parent: any | null,
  heuristic: number
) => ({
  key,
  parent,
  grid,
  snake,
  stack,
  weight: 1 + (parent?.weight || 0),
  f: heuristic - 0 * (1 + (parent?.weight || 0)),
});

const unwrap = (c: ReturnType<typeof createCell> | null): Point[] =>
  c && c.parent
    ? [
        ...unwrap(c.parent),
        { x: c.snake[0].x - c.snake[1].x, y: c.snake[0].y - c.snake[1].y },
      ]
    : [];

export const computeBestRun = (
  grid0: Grid,
  snake0: Snake,
  options: { maxSnakeLength: number; colors: Color[] }
) => {
  // const grid = copyGrid(grid0);
  // const snake = copySnake(snake0);
  // const stack: Color[] = [];

  const computeHeuristic = createComputeHeuristic(
    grid0,
    snake0,
    options.colors
  );

  const closeList: any = {};
  const openList = [
    createCell(
      computeKey(grid0, snake0, []),
      grid0,
      snake0,
      [],
      null,
      computeHeuristic(grid0, snake0, [])
    ),
  ];

  let u = 8000;

  let best = openList[0];

  while (openList.length && u-- > 0) {
    openList.sort((a, b) => b.f - a.f);
    const c = openList.shift()!;

    closeList[c.key] = true;

    if (isGridEmpty(c.grid)) return unwrap(c);

    if (c.f > best.f) best = c;

    for (const direction of around4) {
      const snake = copySnake(c.snake);
      const stack = c.stack.slice();
      const grid = copyGrid(c.grid);

      step(grid, snake, stack, direction, options);

      const key = computeKey(grid, snake, stack);

      if (
        !closeList[key] &&
        isInsideLarge(grid, 1, snake[0].x, snake[0].y) &&
        !snakeSelfCollide(snake)
      ) {
        openList.push(
          createCell(
            key,
            grid,
            snake,
            stack,
            c,
            computeHeuristic(grid, snake, stack)
          )
        );
      }
    }
  }

  return unwrap(best);

  // while (!isGridEmpty(g) && u-- > 0) {
  //   let direction;

  //   for (let k = 10; k--; ) {
  //     direction = around4[Math.floor(Math.random() * around4.length)];

  //     const sn = copySnake(s);
  //     stepSnake(sn, direction, options);

  //     if (isInsideLarge(g, 1, sn[0].x, sn[0].y) && !snakeSelfCollide(sn)) {
  //       break;
  //     } else {
  //       direction = undefined;
  //     }
  //   }

  //   if (direction !== undefined) {
  //     step(g, s, q, direction, options);
  //     commands.push(direction);
  //   }
  // }

  // return commands;
};
