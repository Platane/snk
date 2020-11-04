import type { Color, Empty } from "@snk/types/grid";
import { h } from "./utils";

export type Options = {
  colorDots: Record<Color, string>;
  sizeDot: number;
};

const percent = (x: number) => (x * 100).toFixed(2);

export const createStack = (
  cells: { t: number | null; color: Color | Empty }[],
  { colorDots, sizeDot }: Options,
  width: number,
  y: number,
  duration: number
) => {
  const svgElements: string[] = [];
  const styles = [
    `.u{ 
      animation: none linear ${duration}ms infinite;
      fill:transparent;
    }`,
  ];

  const stack = cells
    .slice()
    .filter((a) => a.t !== null)
    .sort((a, b) => a.t! - b.t!) as any[];

  const m = width / stack.length;
  let i = 0;
  for (const { color, t } of stack) {
    const x = (i * width) / stack.length;
    const id = "u" + (i++).toString(36);
    const animationName = "a" + id;
    // @ts-ignore
    const fill = colorDots[color];

    svgElements.push(
      h("rect", {
        class: `u ${id}`,
        height: sizeDot,
        width: (m + 0.6).toFixed(1),
        x: x.toFixed(1),
        y,
      })
    );
    styles.push(
      `@keyframes ${animationName} {` +
        `${percent(t - 0.0001)}%{fill:transparent}` +
        `${percent(t + 0.0001)}%,100%{fill:${fill}}` +
        "}",

      `.u.${id}{animation-name:${animationName}}`
    );
  }

  return { svgElements, styles };
};
