import {
  copyGrid,
  getColor,
  isEmpty,
  isInside,
  setColorEmpty,
} from "@snk/types/grid";
import { getHeadX, getHeadY } from "@snk/types/snake";
import type { Snake } from "@snk/types/snake";
import type { Grid, Color } from "@snk/types/grid";
import type { Point } from "@snk/types/point";
import { createSnake } from "./snake";
import { createGrid, type GridCell } from "./grid";
import { createStack } from "./stack";
import { createCalendarChrome } from "./calendarChrome";
import type { SourceLegendItem } from "./legend";
import { h } from "./xml-utils";
import { minifyCss } from "./css-utils";

export type ContributionDrawCell = Point & {
  date?: string;
  level?: number;
  sources?: number;
  /** Precomputed multi-source OKLCH fill */
  fill?: string;
  stroke?: string;
  emptyFill?: string;
  emptyStroke?: string;
};

export type DrawOptions = {
  colorDots: Record<Color, string>;
  colorEmpty: string;
  colorDotBorder: string;
  colorSnake: string;
  sizeCell: number;
  sizeDot: number;
  sizeDotBorderRadius: number;
  sourcesLegend?: SourceLegendItem[];
  intensityLegendColors?: string[];
  /** Draw month/day labels and bottom legends (multi-source calendar). */
  calendarChrome?: boolean;
  dark?: {
    colorDots: Record<Color, string>;
    colorEmpty: string;
    colorDotBorder?: string;
    colorSnake?: string;
  };
};

const getCellsFromGrid = ({ width, height }: Grid) =>
  Array.from({ length: width }, (_, x) =>
    Array.from({ length: height }, (_, y) => ({ x, y })),
  ).flat();

const createLivingCells = (
  grid0: Grid,
  chain: Snake[],
  cells: ContributionDrawCell[] | null,
): GridCell[] => {
  const byKey = new Map(
    (cells ?? []).map((c) => [`${c.x},${c.y}`, c] as const),
  );

  const livingCells: GridCell[] = (cells ?? getCellsFromGrid(grid0)).map(
    ({ x, y }) => {
      const meta = byKey.get(`${x},${y}`);
      const color = getColor(grid0, x, y);
      return {
        x,
        y,
        t: null as number | null,
        color,
        fill: meta?.fill,
        stroke: meta?.stroke,
        emptyFill: meta?.emptyFill,
        emptyStroke: meta?.emptyStroke,
      };
    },
  );

  const grid = copyGrid(grid0);
  for (let i = 0; i < chain.length; i++) {
    const snake = chain[i];
    const x = getHeadX(snake);
    const y = getHeadY(snake);

    if (isInside(grid, x, y) && !isEmpty(getColor(grid, x, y))) {
      setColorEmpty(grid, x, y);
      const cell = livingCells.find((c) => c.x === x && c.y === y)!;
      cell.t = i / chain.length;
    }
  }

  return livingCells;
};

export const createSvg = (
  grid: Grid,
  cells: ContributionDrawCell[] | null,
  chain: Snake[],
  drawOptions: DrawOptions,
  animationOptions: { stepDurationMs: number },
) => {
  const useChrome =
    !!drawOptions.calendarChrome &&
    (drawOptions.sourcesLegend?.length ||
      drawOptions.intensityLegendColors?.length);

  const chrome = useChrome
    ? createCalendarChrome(cells ?? [], {
        sizeCell: drawOptions.sizeCell,
        sizeDot: drawOptions.sizeDot,
        sizeDotBorderRadius: drawOptions.sizeDotBorderRadius,
        gridWidth: grid.width,
        gridHeight: grid.height,
        intensityColors:
          drawOptions.intensityLegendColors ??
          (Object.values(drawOptions.colorDots) as string[]).slice(0, 5),
        sourcesLegend: drawOptions.sourcesLegend ?? [],
      })
    : {
        svgElements: [] as string[],
        styles: [] as string[],
        padLeft: drawOptions.sizeCell,
        padTop: drawOptions.sizeCell * 2,
        padBottom: drawOptions.sizeCell * 5,
      };

  const width =
    grid.width * drawOptions.sizeCell +
    chrome.padLeft +
    drawOptions.sizeCell;
  const height =
    grid.height * drawOptions.sizeCell +
    chrome.padTop +
    chrome.padBottom +
    drawOptions.sizeCell * 3;

  const duration = animationOptions.stepDurationMs * chain.length;

  const livingCells = createLivingCells(grid, chain, cells);

  const elements = [
    createGrid(livingCells, drawOptions, duration),
    createStack(
      livingCells,
      drawOptions,
      grid.width * drawOptions.sizeCell,
      (grid.height + 2) * drawOptions.sizeCell,
      duration,
    ),
    createSnake(chain, drawOptions, duration),
  ];

  const viewBoxX = -chrome.padLeft;
  const viewBoxY = -chrome.padTop;
  const viewBox = [viewBoxX, viewBoxY, width, height].join(" ");

  const style =
    generateColorVar(drawOptions) +
    [...chrome.styles, ...elements.map((e) => e.styles).flat()].join("\n");

  const svg = [
    h("svg", {
      viewBox,
      width,
      height,
      xmlns: "http://www.w3.org/2000/svg",
    }).replace("/>", ">"),

    "<desc>",
    "Generated with https://github.com/Platane/snk",
    "</desc>",

    "<style>",
    optimizeCss(style),
    "</style>",

    ...chrome.svgElements,
    ...elements.map((e) => e.svgElements).flat(),

    "</svg>",
  ].join("");

  return optimizeSvg(svg);
};

const optimizeCss = (css: string) => minifyCss(css);
const optimizeSvg = (svg: string) => svg;

const generateColorVar = (drawOptions: DrawOptions) =>
  `
    :root {
    --cb: ${drawOptions.colorDotBorder};
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
        --cb: ${drawOptions.dark.colorDotBorder || drawOptions.colorDotBorder};
        --cs: ${drawOptions.dark.colorSnake || drawOptions.colorSnake};
        --ce: ${drawOptions.dark.colorEmpty};
        ${Object.entries(drawOptions.dark.colorDots)
          .map(([i, color]) => `--c${i}:${color};`)
          .join("")}
      }
    }
`
    : "");
