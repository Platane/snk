import { getAvailableInterestingRoutes } from "./getAvailableRoutes";
import {
  Color,
  copyGrid,
  getColor,
  Grid,
  gridEquals,
  isEmpty,
  setColorEmpty,
} from "./grid";
import { copySnake, getHeadX, getHeadY, Snake, snakeEquals } from "./snake";

const createHeuristic = (grid0: Grid) => {
  const colorCount: Record<Color, number> = [];
  for (let x = grid0.width; x--; )
    for (let y = grid0.height; y--; ) {
      const color = getColor(grid0, x, y);
      if (!isEmpty(color))
        // @ts-ignore
        colorCount[color] = (0 | colorCount[color]) + 1;
    }

  const target = Object.entries(colorCount)
    .sort(([a], [b]) => +a - +b)
    .map(([color, length]: any) => Array.from({ length }, () => +color))
    .flat();

  const getHeuristic = (_grid: Grid, _snake: Snake, stack: Color[]) =>
    stack.reduce((s, x, i) => s + (target[i] === x ? 1 : 0), 0);

  const getNextColorHeuristic = (
    _grid: Grid,
    _snake: Snake,
    stack: Color[]
  ) => {
    const x = target[stack.length];

    return (c: Color) => (x === c ? 1 : 0);
  };

  const isEnd = (_grid: Grid, _snake: Snake, stack: Color[]) =>
    stack.length === target.length;

  return { isEnd, getHeuristic, getNextColorHeuristic };
};

type OpenListItem = {
  grid: Grid;
  snake: Snake;
  chain: Snake[];
  stack: Color[];
  weight: number;
  heuristic: number;
  parent: OpenListItem | null;
};

const unroll = (o: OpenListItem | null): Snake[] =>
  !o ? [] : [...unroll(o.parent), ...o.chain.slice().reverse()];

const itemEquals = (
  a: { grid: Grid; snake: Snake },
  b: { grid: Grid; snake: Snake }
) => snakeEquals(a.snake, b.snake) && gridEquals(a.grid, b.grid);

export const getBestRoute = (grid0: Grid, snake0: Snake) => {
  const { isEnd, getNextColorHeuristic } = createHeuristic(grid0);

  let grid = copyGrid(grid0);
  let snake = copySnake(snake0);
  let stack: Color[] = [];

  const fullChain: Snake[] = [];

  while (!isEnd(grid, snake, stack)) {
    const getColorHeuristic = getNextColorHeuristic(grid, snake, stack);

    let solution: {
      heuristic: number;
      chain: Snake[];
      color: Color;
    } | null = null;

    getAvailableInterestingRoutes(
      grid,
      snake,
      (chain: Snake[], color: Color) => {
        const heuristic = getColorHeuristic(color);

        if (!solution || solution.heuristic < heuristic)
          solution = { heuristic, chain, color };

        return solution.heuristic === 1;
      },
      2
    );

    if (!solution) return null;

    const { chain, color } = solution!;

    snake = chain[0];
    const x = getHeadX(snake);
    const y = getHeadY(snake);

    setColorEmpty(grid, x, y);

    stack.push(color);

    for (let i = chain.length; i--; ) fullChain.push(chain[i]);
  }

  return fullChain;
};

export const getBestRoute2 = (grid0: Grid, snake0: Snake) => {
  const { isEnd, getHeuristic, getNextColorHeuristic } = createHeuristic(grid0);

  const closeList: { grid: Grid; snake: Snake }[] = [];

  const openList: OpenListItem[] = [
    {
      grid: grid0,
      stack: [],
      snake: snake0,
      parent: null,
      weight: 0,
      heuristic: getHeuristic(grid0, snake0, []),
      chain: [],
    },
  ];

  while (openList.length) {
    const parent = openList.shift()!;

    if (isEnd(parent.grid, parent.snake, parent.stack)) return unroll(parent);

    const solutions: { snake: Snake; chain: Snake[]; color: Color }[] = [];
    const getColorHeuristic = getNextColorHeuristic(
      parent.grid,
      parent.snake,
      parent.stack
    );

    getAvailableInterestingRoutes(
      parent.grid,
      parent.snake,
      (chain: Snake[], color: Color) => {
        if (
          !solutions[0] ||
          getColorHeuristic(solutions[0].color) <= getColorHeuristic(color)
        )
          solutions.unshift({ snake: chain[0], chain, color });

        return solutions.length >= 3;
      },
      2
    );

    for (const { snake, chain, color } of solutions) {
      const x = getHeadX(snake);
      const y = getHeadY(snake);

      const grid = copyGrid(parent.grid);
      setColorEmpty(grid, x, y);

      const stack = [...parent.stack, color];

      const weight = parent.weight + chain.length;
      const heuristic = getHeuristic(grid, snake, stack);

      const item = { grid, stack, snake, chain, weight, heuristic, parent };

      if (!closeList.some((c) => itemEquals(c, item))) {
        closeList.push(item);
        openList.push(item);
      } else console.log("hit");
    }

    openList.sort((a, b) => a.heuristic - b.heuristic);
  }

  return null;
};
