import type { Color, Empty } from "@snk/types/grid";
import type { Point } from "@snk/types/point";
import { createAnimation } from "./css-utils";
import { h } from "./xml-utils";

export type GridCell = Point & {
  t: number | null;
  color: Color | Empty;
  fill?: string;
  stroke?: string;
  emptyFill?: string;
  emptyStroke?: string;
};

export type Options = {
  colorDots: Record<Color, string>;
  colorEmpty: string;
  colorDotBorder: string;
  sizeCell: number;
  sizeDot: number;
  sizeDotBorderRadius: number;
};

export const createGrid = (
  cells: GridCell[],
  { sizeDotBorderRadius, sizeDot, sizeCell, colorDots, colorEmpty, colorDotBorder }: Options,
  duration: number,
) => {
  const svgElements: string[] = [];
  const styles = [
    `.c{
      shape-rendering: geometricPrecision;
      stroke-width: 1px;
      animation: none ${duration}ms linear infinite;
      width: ${sizeDot}px;
      height: ${sizeDot}px;
    }`,
  ];

  let i = 0;
  for (const cell of cells) {
    const { x, y, color, t } = cell;
    const id = t !== null && t !== undefined ? "c" + (i++).toString(36) : null;
    const m = (sizeCell - sizeDot) / 2;

    const fill =
      cell.fill ??
      (color === 0
        ? colorEmpty
        : ((colorDots as Record<number, string>)[color as number] ??
          colorEmpty));
    const stroke =
      cell.stroke ??
      (color === 0
        ? colorDotBorder
        : ((colorDots as Record<number, string>)[color as number] ??
          colorDotBorder));
    const emptyFill = cell.emptyFill ?? colorEmpty;
    const emptyStroke = cell.emptyStroke ?? colorDotBorder;

    if (t !== null && id) {
      const animationName = id;

      styles.push(
        createAnimation(animationName, [
          {
            t: t - 0.0001,
            style: `fill:${fill};stroke:${stroke}`,
          },
          {
            t: t + 0.0001,
            style: `fill:${emptyFill};stroke:${emptyStroke}`,
          },
          {
            t: 1,
            style: `fill:${emptyFill};stroke:${emptyStroke}`,
          },
        ]),

        `.c.${id}{
          fill: ${fill};
          stroke: ${stroke};
          animation-name: ${animationName}
        }`,
      );
    }

    const className = ["c", id].filter(Boolean).join(" ");
    const attrs: Record<string, string | number> = {
      class: className,
      x: x * sizeCell + m,
      y: y * sizeCell + m,
      rx: sizeDotBorderRadius,
      ry: sizeDotBorderRadius,
    };

    // Static (uneaten / empty) cells need inline colors when not animated
    if (!id) {
      attrs.fill = fill;
      attrs.stroke = stroke;
    }

    svgElements.push(h("rect", attrs));
  }

  return { svgElements, styles };
};
