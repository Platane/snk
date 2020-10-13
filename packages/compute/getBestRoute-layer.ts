import {
  Color,
  copyGrid,
  getColor,
  Grid,
  isEmpty,
  isInside,
  isInsideLarge,
  setColorEmpty,
} from "./grid";
import { around4 } from "./point";
import {
  getHeadX,
  getHeadY,
  nextSnake,
  Snake,
  snakeEquals,
  snakeWillSelfCollide,
} from "./snake";
import { sortPush } from "./utils/sortPush";

type M = { x: number; y: number; parent: M | null; h: number };

const unwrap = (grid: Grid, m: M | null): { x: number; y: number }[] =>
  m ? [...unwrap(grid, m.parent), m] : [];

const getEscapePath = (
  grid: Grid,
  x: number,
  y: number,
  color: Color,
  forbidden: { x: number; y: number }[] = []
) => {
  const openList: M[] = [{ x, y, h: 0, parent: null }];
  const closeList: { x: number; y: number }[] = [];

  while (openList.length) {
    const c = openList.shift()!;

    if (c.y === -1 || c.y === grid.height) return unwrap(grid, c);

    for (const a of around4) {
      const x = c.x + a.x;
      const y = c.y + a.y;

      if (!forbidden.some((cl) => cl.x === x && cl.y === y)) {
        if (!isInside(grid, x, y))
          return unwrap(grid, { x, y, parent: c } as any);

        const u = getColor(grid, x, y);

        if (
          (isEmpty(u) || u <= color) &&
          !closeList.some((cl) => cl.x === x && cl.y === y)
        ) {
          const h = Math.abs(grid.height / 2 - y);
          const o = { x, y, parent: c, h };

          closeList.push(o);
          openList.push(o);
        }
      }
    }

    openList.sort((a, b) => a.h - b.h);
  }

  return null;
};

const isFree = (
  grid: Grid,
  x: number,
  y: number,
  color: Color,
  snakeN: number
) => {
  const one = getEscapePath(grid, x, y, color);

  if (!one) return false;

  const two = getEscapePath(grid, x, y, color, one.slice(0, snakeN));

  return !!two;
};

export const pruneLayer = (grid: Grid, color: Color, snakeN: number) => {
  const chunk: { x: number; y: number }[] = [];

  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      const c = getColor(grid, x, y);

      if (!isEmpty(c) && c <= color && isFree(grid, x, y, color, snakeN)) {
        setColorEmpty(grid, x, y);
        chunk.push({ x, y });
      }
    }

  return chunk;
};

const extractColors = (grid: Grid): Color[] => {
  const colors = new Set<Color>();
  grid.data.forEach((c: any) => {
    if (!isEmpty(c)) colors.add(c);
  });
  return Array.from(colors.keys()).sort();
};

export const getAvailableRoutes = (
  grid: Grid,
  snake0: Snake,
  onSolution: (snakes: Snake[], color: Color) => boolean
) => {
  const openList: Snake[][] = [[snake0]];
  const closeList: Snake[] = [];

  while (openList.length) {
    const c = openList.shift()!;
    const [snake] = c;

    const cx = getHeadX(snake);
    const cy = getHeadY(snake);

    for (let i = 0; i < around4.length; i++) {
      const { x: dx, y: dy } = around4[i];

      const nx = cx + dx;
      const ny = cy + dy;

      if (
        isInsideLarge(grid, 1, nx, ny) &&
        !snakeWillSelfCollide(snake, dx, dy)
      ) {
        const nsnake = nextSnake(snake, dx, dy);

        if (!closeList.some((s) => snakeEquals(nsnake, s))) {
          const color = isInside(grid, nx, ny) && getColor(grid, nx, ny);

          if (!color || isEmpty(color)) {
            sortPush(openList, [nsnake, ...c], (a, b) => a.length - b.length);
            closeList.push(nsnake);
          } else {
            if (onSolution([nsnake, ...c.slice(0, -1)], color)) return;
          }
        }
      }
    }
  }
};

export const getAvailableWhiteListedRoutes = (
  grid: Grid,
  snake: Snake,
  whiteList0: { x: number; y: number }[],
  n = 3
) => {
  const whiteList = whiteList0.slice();
  const solutions: Snake[][] = [];

  getAvailableRoutes(grid, snake, (chain) => {
    const hx = getHeadX(chain[0]);
    const hy = getHeadY(chain[0]);

    const i = whiteList.findIndex(({ x, y }) => hx === x && hy === y);

    if (i >= 0) {
      whiteList.splice(i, 1);
      solutions.push(chain);

      if (solutions.length >= n || whiteList.length === 0) return true;
    }

    return false;
  });

  return solutions;
};

const arrayEquals = <T>(a: T[], b: T[]) =>
  a.length === b.length && a.every((_, i) => a[i] === b[i]);

type O = {
  snake: Snake;
  chain: Snake[];
  chunk: { x: number; y: number }[];
  grid: Grid;
  parent: O | null;
};
const uunwrap = (o: O | null): Snake[] =>
  !o ? [] : [...uunwrap(o.parent), ...o.chain.reverse()];

export const cleanLayer = (
  grid0: Grid,
  snake0: Snake,
  chunk0: { x: number; y: number }[]
) => {
  const next = {
    grid: grid0,
    snake: snake0,
    chain: [snake0],
    chunk: chunk0,
    parent: null,
  };

  const openList: O[] = [next];
  const closeList: O[] = [next];

  while (openList.length) {
    const o = openList.shift()!;

    if (o.chunk.length === 0) return uunwrap(o);

    for (const chain of getAvailableWhiteListedRoutes(
      o.grid,
      o.snake,
      o.chunk,
      1
    )) {
      const snake = chain[0];
      const x = getHeadX(snake);
      const y = getHeadY(snake);

      const chunk = o.chunk.filter((u) => u.x !== x || u.y !== y);

      if (
        !closeList.some(
          (u) => snakeEquals(u.snake, snake) && arrayEquals(u.chunk, chunk)
        )
      ) {
        const grid = copyGrid(o.grid);
        setColorEmpty(grid, x, y);

        const next = { snake, chain, chunk, grid, parent: o };
        openList.push(next);
        closeList.push(next);
      }
    }
  }
};

export const getBestRoute = (grid0: Grid, snake0: Snake) => {
  // for (const color of colors) {
  //   const chunk = pruneLayer(grid0, color, snakeN);
  //   layers.push({ chunk, grid: copyGrid(grid0) });
  // }

  const grid = copyGrid(grid0);
  const colors = extractColors(grid0);

  const chunk = pruneLayer(grid, colors[0], snake0.length / 2);

  console.log(extractColors(grid0));

  return cleanLayer(grid0, snake0, chunk);
};
