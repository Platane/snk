import {
  copyGrid,
  getColor,
  isEmpty,
  isInside,
  setColorEmpty,
} from "@snk/types/grid";
import {
  getHeadX,
  getHeadY,
  getSnakeLength,
  snakeToCells,
} from "@snk/types/snake";
import type { Snake } from "@snk/types/snake";
import type { Grid, Color, Empty } from "@snk/types/grid";
import type { Point } from "@snk/types/point";

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

const percent = (x: number) => (x * 100).toFixed(2);

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

  const { svgElements: snakeSvgElements, styles: snakeStyles } = createSnake(
    chain,
    drawOptions,
    duration
  );
  const { svgElements: gridSvgElements, styles: gridStyles } = createGrid(
    cells,
    drawOptions,
    duration
  );
  const { svgElements: stackSvgElements, styles: stackStyles } = createStack(
    cells,
    drawOptions,
    grid0.width * drawOptions.sizeCell,
    (grid0.height + 2) * drawOptions.sizeCell,
    duration
  );

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
    ...snakeStyles,
    ...gridStyles,
    ...stackStyles,
    "</style>",

    ...gridSvgElements,
    ...snakeSvgElements,
    ...stackSvgElements,

    "</svg>",
  ].join("\n");
};

const h = (element: string, attributes: any) =>
  `<${element} ${toAttribute(attributes)}/>`;

const toAttribute = (o: any) =>
  Object.entries(o)
    .filter(([, value]) => value !== null)
    .map(([name, value]) => `${name}="${value}"`)
    .join(" ");

const createSnake = (
  chain: Snake[],
  { sizeCell, colorSnake, sizeDot }: Options,
  duration: number
) => {
  const snakeN = chain[0] ? getSnakeLength(chain[0]) : 0;

  const snakeParts: Point[][] = Array.from({ length: snakeN }, () => []);

  for (const snake of chain) {
    const cells = snakeToCells(snake);
    for (let i = cells.length; i--; ) snakeParts[i].push(cells[i]);
  }

  const svgElements = snakeParts.map((_, i) => {
    const s = sizeCell;
    const u = Math.min((i - 1) * 1.6 * (s / 16), s * 0.2);
    const d = sizeDot - u;
    const m = (s - d) / 2;

    return h("rect", {
      class: "s",
      id: `s${i}`,
      x: m,
      y: m,
      width: d,
      height: d,
    });
  });

  const transform = ({ x, y }: Point) =>
    `transform:translate(${x * sizeCell}px,${y * sizeCell}px)`;

  const styles = [
    `rect.s{ 
      shape-rendering: geometricPrecision;
      rx: 4;
      ry: 4;
      fill:${colorSnake};
    }`,

    ...snakeParts.map((positions, i) => {
      const id = `s${i}`;
      const animationName = "a" + id;

      return [
        `@keyframes ${animationName} {` +
          positions
            .map(transform)
            .map((tr, i, { length }) => `${percent(i / length)}%{${tr}}`)
            .join("") +
          "}",

        `#${id}{` +
          `${transform(positions[0])};` +
          `animation: ${animationName} linear ${duration}ms infinite` +
          "}",
      ];
    }),
  ].flat();

  return { svgElements, styles };
};

const createGrid = (
  cells: (Point & { t: number | null; color: Color | Empty })[],
  { colorEmpty, colorBorder, colorDots, sizeDot, sizeCell }: Options,
  duration: number
) => {
  const svgElements: string[] = [];
  const styles = [
    `rect.c{
      shape-rendering: geometricPrecision;
      outline: 1px solid ${colorBorder};
      outline-offset: -1px;
      rx: 2;
      ry: 2;
      fill:${colorEmpty}
    }`,
  ];

  let i = 0;
  for (const { x, y, color, t } of cells) {
    const id = t && "c" + (i++).toString(36);
    const s = sizeCell;
    const d = sizeDot;
    const m = (s - d) / 2;

    if (t !== null) {
      const animationName = "a" + id;
      // @ts-ignore
      const fill = colorDots[color];

      styles.push(
        `@keyframes ${animationName} {` +
          `${percent(t - 0.001)}%{fill:${fill}}` +
          `${percent(t + 0.001)}%,100%{fill:${colorEmpty}}` +
          "}",

        `#${id}{fill:${fill};animation: ${animationName} linear ${duration}ms infinite}`
      );
    }

    svgElements.push(
      h("rect", {
        id,
        class: "c",
        x: x * s + m,
        y: y * s + m,
        width: d,
        height: d,
      })
    );
  }

  return { svgElements, styles };
};

const createStack = (
  cells: { t: number | null; color: Color | Empty }[],
  { colorDots, sizeDot }: Options,
  width: number,
  y: number,
  duration: number
) => {
  const svgElements: string[] = [];
  const styles = [];

  const stack = cells
    .slice()
    .filter((a) => a.t !== null)
    .sort((a, b) => a.t! - b.t!) as any[];

  const m = width / stack.length;
  let i = 0;
  for (const { color, t } of stack) {
    const x = ((i * width) / stack.length).toFixed(2);
    const id = "t" + (i++).toString(36);
    const animationName = "a" + id;
    // @ts-ignore
    const fill = colorDots[color];

    svgElements.push(
      h("rect", { id, height: sizeDot, width: (m + 0.6).toFixed(2), x, y })
    );
    styles.push(
      `@keyframes ${animationName} {` +
        `${percent(t - 0.001)}%{fill:transparent}` +
        `${percent(t + 0.001)}%,100%{fill:${fill}}` +
        "}",

      `#${id}{fill:transparent;animation: ${animationName} linear ${duration}ms infinite}`
    );
  }

  return { svgElements, styles };
};
