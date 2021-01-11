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
import { h } from "./utils";
import csso from "csso";

export type Options = {
  colorDots: Record<Color, string>;
  colorEmpty: string;
  colorBorder: string;
  colorSnake: string;
  sizeCell: number;
  sizeDot: number;
  sizeBorderRadius: number;
  cells?: Point[];
  dark?: {
    colorDots: Record<Color, string>;
    colorEmpty: string;
    colorBorder?: string;
    colorSnake?: string;
  };
};

const getCellsFromGrid = ({ width, height }: Grid) =>
  Array.from({ length: width }, (_, x) =>
    Array.from({ length: height }, (_, y) => ({ x, y }))
  ).flat();

const createLivingCells = (
  grid0: Grid,
  chain: Snake[],
  drawOptions: Options
) => {
  const cells: (Point & {
    t: number | null;
    color: Color | Empty;
  })[] = (drawOptions.cells ?? getCellsFromGrid(grid0)).map(({ x, y }) => ({
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

  return cells;
};

export const createSvg = (
  grid: Grid,
  chain: Snake[],
  drawOptions: Options,
  gifOptions: { frameDuration: number }
) => {
  const width = (grid.width + 2) * drawOptions.sizeCell;
  const height = (grid.height + 5) * drawOptions.sizeCell;

  const duration = gifOptions.frameDuration * chain.length;

  const cells = createLivingCells(grid, chain, drawOptions);

  const elements = [
    createGrid(cells, drawOptions, duration),
    createStack(
      cells,
      drawOptions,
      grid.width * drawOptions.sizeCell,
      (grid.height + 2) * drawOptions.sizeCell,
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

  const style =
    generateColorVar(drawOptions) +
    elements
      .map((e) => e.styles)
      .flat()
      .join("\n");

  const svg = [
    h("svg", {
      viewBox,
      width,
      height,
      xmlns: "http://www.w3.org/2000/svg",
    }).replace("/>", ">"),

    "<style>",
    optimizeCss(style),
    "</style>",

    ...elements.map((e) => e.svgElements).flat(),

    "</svg>",
  ].join("");

  return optimizeSvg(svg);
};

const optimizeCss = (css: string) => csso.minify(css).css;
const optimizeSvg = (svg: string) => svg;

const generateColorVar = (drawOptions: Options) =>
  `
    :root {
    --cb: ${drawOptions.colorBorder};
    --cs: ${drawOptions.colorSnake};
    --ce: ${drawOptions.colorEmpty};
    ${Object.entries(drawOptions.colorDots)
      .map(([i, color]) => `--c${i}:${color};`)
      .join("")}
    }
    ` +
  (drawOptions.dark
    ? `
    @media (prefers-color-scheme: dark) {
      :root {
        --cb: ${drawOptions.dark.colorBorder || drawOptions.colorBorder};
        --cs: ${drawOptions.dark.colorSnake || drawOptions.colorSnake};
        --ce: ${drawOptions.dark.colorEmpty};
        ${Object.entries(drawOptions.dark.colorDots)
          .map(([i, color]) => `--c${i}:${color};`)
          .join("")}
      }
    }
`
    : "");
