import type { AnimationOptions } from "@snk/gif-creator";
import type { DrawOptions as DrawOptionsSvg } from "@snk/svg-creator";
import type { DrawOptions as DrawOptionsGif } from "@snk/gif-creator";
import { palettes } from "./palettes";

type DrawOptions = DrawOptionsSvg & DrawOptionsGif;

export const parseOutputsOption = (lines: string[]) => lines.map(parseEntry);

export const parseEntry = (entry: string) => {
  const m = entry.trim().match(/^(.+\.(svg|gif))(\?(.*)|\s*({.*}))?$/);

  if (!m) return null;

  const [, filename, format, _, q1, q2] = m;

  const query = q1 ?? q2;

  let sp = new URLSearchParams(query || "");

  try {
    const o = JSON.parse(query);

    if (Array.isArray(o.color_dots)) o.color_dots = o.color_dots.join(",");

    sp = new URLSearchParams(o);
  } catch (err) {
    if (!(err instanceof SyntaxError)) throw err;
  }

  const drawOptions: DrawOptions = {
    sizeDotBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
    ...palettes["default"],
  };
  const animationOptions: AnimationOptions = {
    frameByStep: 1,
    stepDurationMs: 100,
  };

  {
    const palette = palettes[sp.get("palette") as keyof typeof palettes];
    if (palette) {
      Object.assign(drawOptions, palette);
    }
  }

  if (sp.has("color_dots")) {
    const colors = sp.get("color_dots")!.split(/[,;]/);
    drawOptions.colorDots = colors;
    drawOptions.colorEmpty = colors[0];
  }
  if (sp.has("color_snake")) drawOptions.colorSnake = sp.get("color_snake")!;
  if (sp.has("color_background"))
    drawOptions.colorBackground = sp.get("color_background")!;
  if (sp.has("color_dot_border"))
    drawOptions.colorDotBorder = sp.get("color_dot_border")!;

  return {
    filename,
    format: format as "svg" | "gif",
    drawOptions,
    animationOptions,
  };
};
