import type { Color, Empty } from "@snk/types/grid";
import { h } from "./utils";

export type Options = {
  sizeDot: number;
};

const percent = (x: number) => (x * 100).toFixed(2);

export const createStack = (
  cells: { t: number | null; color: Color | Empty }[],
  { sizeDot }: Options,
  width: number,
  y: number,
  duration: number
) => {
  const svgElements: string[] = [];
  const styles = [
    `.u{ 
      transform-origin: 0 0;
      transform: scale(0,1);
      animation: none linear ${duration}ms infinite;
    }`,
  ];

  const stack = cells
    .slice()
    .filter((a) => a.t !== null)
    .sort((a, b) => a.t! - b.t!) as any[];

  const blocks: { color: Color; ts: number[] }[] = [];
  stack.forEach(({ color, t }) => {
    const latest = blocks[blocks.length - 1];
    if (latest?.color === color) latest.ts.push(t);
    else blocks.push({ color, ts: [t] });
  });

  const m = width / stack.length;
  let i = 0;
  let nx = 0;
  for (const { color, ts } of blocks) {
    const id = "u" + (i++).toString(36);
    const animationName = id;
    const x = (nx * m).toFixed(1);

    nx += ts.length;

    svgElements.push(
      h("rect", {
        class: `u ${id}`,
        height: sizeDot,
        width: (ts.length * m + 0.6).toFixed(1),
        x,
        y,
      })
    );

    styles.push(
      `@keyframes ${animationName} {` +
        [
          ...ts.map((t, i, { length }) => [
            { scale: i / length, t: t - 0.0001 },
            { scale: (i + 1) / length, t: t + 0.0001 },
          ]),
          [{ scale: 1, t: 1 }],
        ]
          .flat()
          .map(
            ({ scale, t }) =>
              `${percent(t)}%{transform:scale(${scale.toFixed(2)},1)}`
          )
          .join("\n") +
        "}",

      `.u.${id}{fill:var(--c${color});animation-name:${animationName};transform-origin:${x}px 0}`
    );
  }

  return { svgElements, styles };
};
