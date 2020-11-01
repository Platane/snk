import {
  copyGrid,
  getColor,
  isEmpty,
  isInside,
  setColorEmpty,
} from "@snk/types/grid";
import { getHeadX, getHeadY } from "@snk/types/snake";
import type { Snake } from "@snk/types/snake";
import type { Grid, Color, Empty } from "@snk/types/grid";
import type { Point } from "@snk/types/point";
import { createSnake } from "./snake";
import { createGrid } from "./grid";
import { createStack } from "./stack";
import { toAttribute } from "./utils";

export type Options = {
  colorDots: Record<Color, string>;
  colorEmpty: string;
  colorBorder: string;
  colorSnake: string;
  sizeCell: number;
  sizeDot: number;
  sizeBorderRadius: number;
  cells?: Point[];
};

const createCells = ({ width, height }: Grid) =>
  Array.from({ length: width }, (_, x) =>
    Array.from({ length: height }, (_, y) => ({ x, y }))
  ).flat();

export const createSvg = (
  grid0: Grid,
  chain: Snake[],
  drawOptions: Options,
  gifOptions: { frameDuration: number }
) => {
  const width = (grid0.width + 2) * drawOptions.sizeCell;
  const height = (grid0.height + 5) * drawOptions.sizeCell;

  const duration = gifOptions.frameDuration * chain.length;

  const cells: (Point & {
    t: number | null;
    color: Color | Empty;
  })[] = (drawOptions.cells ?? createCells(grid0)).map(({ x, y }) => ({
    x,
    y,
    t: null,
    color: getColor(grid0, x, y),
  }));

  const grid = copyGrid(grid0);
  for (let i = 0; i < chain.length; i++) {
    const snake = chain[i];
    const x = getHeadX(snake);
    const y = getHeadY(snake);

    if (isInside(grid, x, y) && !isEmpty(getColor(grid, x, y))) {
      setColorEmpty(grid, x, y);
      const cell = cells.find((c) => c.x === x && c.y === y)!;
      cell.t = i / chain.length;
    }
  }

  const elements = [
    createGrid(cells, drawOptions, duration),
    createStack(
      cells,
      drawOptions,
      grid0.width * drawOptions.sizeCell,
      (grid0.height + 2) * drawOptions.sizeCell,
      duration
    ),
    createSnake(chain, drawOptions, duration),
  ];

  const viewBox = [
    -drawOptions.sizeCell,
    -drawOptions.sizeCell * 2,
    width,
    height,
  ].join(" ");

  return [
    `<svg 
      ${toAttribute({
        viewBox,
        width,
        height,
        xmlns: "http://www.w3.org/2000/svg",
      })}
    >`,

    "<style>",
    ...elements.map((e) => e.styles).flat(),
    "</style>",
    ...elements.map((e) => e.svgElements).flat(),

    "</svg>",
  ].join("\n");
};
