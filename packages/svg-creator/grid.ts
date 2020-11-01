import type { Color, Empty } from "@snk/types/grid";
import type { Point } from "@snk/types/point";
import { h } from "./utils";

export type Options = {
  colorDots: Record<Color, string>;
  colorEmpty: string;
  colorBorder: string;
  sizeCell: number;
  sizeDot: number;
  sizeBorderRadius: number;
};

const percent = (x: number) => (x * 100).toFixed(2);

export const createGrid = (
  cells: (Point & { t: number | null; color: Color | Empty })[],
  {
    colorEmpty,
    colorBorder,
    sizeBorderRadius,
    colorDots,
    sizeDot,
    sizeCell,
  }: Options,
  duration: number
) => {
  const svgElements: string[] = [];
  const styles = [
    `rect.c{
      shape-rendering: geometricPrecision;
      outline: 1px solid ${colorBorder};
      outline-offset: -1px;
      rx: ${sizeBorderRadius};
      ry: ${sizeBorderRadius};
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
          `${percent(t - 0.0001)}%{fill:${fill}}` +
          `${percent(t + 0.0001)}%,100%{fill:${colorEmpty}}` +
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
