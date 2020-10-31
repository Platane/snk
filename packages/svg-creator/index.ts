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

export const createSvg = (
  grid0: Grid,
  chain: Snake[],
  drawOptions: Options,
  gifOptions: { frameDuration: number }
) => {
  const width = (grid0.width + 2) * drawOptions.sizeCell;
  const height = (grid0.height + 4) * drawOptions.sizeCell;

  const grid = copyGrid(grid0);

  const snakeParts: Point[][] = Array.from(
    { length: chain[0] ? getSnakeLength(chain[0]) : 0 },
    () => []
  );
  for (const snake of chain) {
    const cells = snakeToCells(snake);
    for (let i = cells.length; i--; ) snakeParts[i].push(cells[i]);
  }

  const duration = gifOptions.frameDuration * chain.length;

  const percent = (x: number) => (x * 100).toFixed(3);

  const cells: (Point & {
    t: number | null;
    color: Color | Empty;
  })[] = (
    drawOptions.cells ??
    Array.from({ length: grid.width }, (_, x) =>
      Array.from({ length: grid.height }, (_, y) => ({
        x,
        y,
      }))
    ).flat()
  ).map(({ x, y }) => ({
    x,
    y,
    t: null,
    color: getColor(grid, x, y),
  }));

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

  return [
    `<svg 
      ${toAttribute({
        viewBox: [
          -drawOptions.sizeCell,
          -drawOptions.sizeCell * 2,
          width,
          height,
        ].join(" "),
        width,
        height,
        xmlns: "http://www.w3.org/2000/svg",
      })}
    >`,

    `<style>`,

    `rect.c{ 
      shape-rendering: geometricPrecision;
      outline: 1px solid ${drawOptions.colorBorder};
      outline-offset: -1px;
      rx: 2;
      ry: 2;
    }
    rect.s{ 
      shape-rendering: geometricPrecision;
      rx: 4;
      ry: 4;
      fill:${drawOptions.colorSnake};
    }
    `,

    ...snakeParts
      .map((positions, i) => {
        const animationName = `s${i}`;
        const id = `s${i}`;

        return [
          `@keyframes ${animationName} {`,
          ...positions.map(({ x, y }, i, { length, [0]: { x: x0, y: y0 } }) => [
            `${percent(i / length)}%`,
            "{",
            "transform:translate(",
            [(x - x0) * drawOptions.sizeCell, (y - y0) * drawOptions.sizeCell]
              .map((u) => u + "px")
              .join(","),
            ")",
            "}",
          ]),
          "}",
          `#${id}{animation: ${animationName} linear ${duration}ms infinite}`,
        ];
      })
      .flat(Infinity),

    ...cells
      .map(({ t, color }, i) => {
        const animationName = `c${i}`;
        const id = `c${i}`;

        if (t === null || isEmpty(color)) return [];

        // @ts-ignore
        const fill = drawOptions.colorDots[color];

        return [
          `@keyframes ${animationName} {`,
          `${percent(t - 0.0001)}%{fill:${fill}}`,
          `${percent(t + 0.0001)}%{fill:${drawOptions.colorEmpty}}`,
          `100%{fill:${drawOptions.colorEmpty}}`,
          "}",
          `#${id}{animation: ${animationName} linear ${duration}ms infinite}`,
        ];
      })
      .flat(Infinity),

    `</style>`,

    ...cells.map(({ x, y, color }, i) => {
      const s = drawOptions.sizeCell;
      const d = drawOptions.sizeDot;
      const m = (s - d) / 2;
      const fill = isEmpty(color)
        ? drawOptions.colorEmpty
        : // @ts-ignore
          drawOptions.colorDots[color];

      return h("rect", {
        class: "c",
        id: `c${i}`,
        x: x * s + m,
        y: y * s + m,
        width: d,
        height: d,
        fill: fill,
      });
    }),

    ...snakeParts.map(([{ x, y }], i) => {
      const s = drawOptions.sizeCell;
      const u = Math.min((i - 1) * 1.6 * (s / 16), s * 0.2);
      const d = drawOptions.sizeDot - u;
      const m = (s - d) / 2;

      return h("rect", {
        class: "s",
        id: `s${i}`,
        x: x * s + m,
        y: y * s + m,
        width: d,
        height: d,
      });
    }),

    "</svg>",
  ].join("");
};

const h = (element: string, attributes: any) =>
  `<${element} ${toAttribute(attributes)}/>`;

const toAttribute = (o: any) =>
  Object.entries(o)
    .map(([name, value]) => `${name}="${value}"`)
    .join(" ");
