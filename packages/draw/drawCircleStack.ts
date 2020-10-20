import { pathRoundedRect } from "./pathRoundedRect";
import type { Color } from "@snk/types/grid";
import type { Point } from "@snk/types/point";

type Options = {
  colorDots: Record<Color, string>;
  colorBorder: string;
  sizeCell: number;
  sizeDot: number;
  sizeBorderRadius: number;
};

const isInsideCircle = (x: number, y: number, r: number) => {
  const l = 6;
  let k = 0;
  for (let dx = 0; dx < l; dx++)
    for (let dy = 0; dy < l; dy++) {
      const ux = x + (dx + 0.5) / l;
      const uy = y + (dy + 0.5) / l;

      if (ux * ux + uy * uy < r * r) k++;
    }

  return k > l * l * 0.6;
};

export const getCellPath = (n: number): Point[] => {
  const l = Math.ceil(Math.sqrt(n));

  const cells = [];

  for (let x = -l; x <= l; x++)
    for (let y = -l; y <= l; y++) {
      const a = (Math.atan2(y, x) + (5 * Math.PI) / 2) % (Math.PI * 2);

      let r = 0;

      while (!isInsideCircle(x, y, r + 0.5)) r++;

      cells.push({ x, y, f: r * 100 + a });
    }

  return cells.sort((a, b) => a.f - b.f).slice(0, n);
};

export const cellPath = getCellPath(52 * 7 + 5);

export const getCircleSize = (n: number) => {
  const c = cellPath.slice(0, n);
  const xs = c.map((p) => p.x);
  const ys = c.map((p) => p.y);

  return {
    max: { x: Math.max(0, ...xs), y: Math.max(0, ...ys) },
    min: { x: Math.min(0, ...xs), y: Math.min(0, ...ys) },
  };
};

export const drawCircleStack = (
  ctx: CanvasRenderingContext2D,
  stack: Color[],
  o: Options
) => {
  for (let i = stack.length; i--; ) {
    const { x, y } = cellPath[i];

    ctx.save();
    ctx.translate(
      x * o.sizeCell + (o.sizeCell - o.sizeDot) / 2,
      y * o.sizeCell + (o.sizeCell - o.sizeDot) / 2
    );

    //@ts-ignore
    ctx.fillStyle = o.colorDots[stack[i]];
    ctx.strokeStyle = o.colorBorder;
    ctx.lineWidth = 1;
    ctx.beginPath();

    pathRoundedRect(ctx, o.sizeDot, o.sizeDot, o.sizeBorderRadius);

    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
};
