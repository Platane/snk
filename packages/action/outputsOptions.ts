import { Options as DrawOptions } from "@snk/svg-creator";
import { palettes } from "./palettes";

export const parseOutputsOption = (lines: string[]) => lines.map(parseEntry);

export const parseEntry = (entry: string) => {
  const m = entry.trim().match(/^(.+\.(svg|gif))(\?.*)?$/);
  if (!m) return null;

  const [_, filename, format, query] = m;

  const sp = new URLSearchParams(query || "");

  const drawOptions: DrawOptions = {
    sizeDotBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
    ...palettes["default"],
  };
  const gifOptions = { step: 1, frameDuration: 100 };

  {
    const palette = palettes[sp.get("palette")!];
    if (palette) {
      Object.assign(drawOptions, palette);
      drawOptions.dark = palette.dark && { ...palette.dark };
    }
  }

  if (sp.has("color_snake")) drawOptions.colorSnake = sp.get("color_snake")!;
  if (sp.has("color_dots")) {
    const colors = sp.get("color_dots")!.split(/[,;]/);
    drawOptions.colorDots = colors;
    drawOptions.colorEmpty = colors[0];
    drawOptions.dark = undefined;
  }
  if (sp.has("color_dot_border"))
    drawOptions.colorDotBorder = sp.get("color_dot_border")!;

  if (sp.has("dark_color_dots")) {
    const colors = sp.get("dark_color_dots")!.split(/[,;]/);
    drawOptions.dark = {
      ...drawOptions.dark,
      colorDots: colors,
      colorEmpty: colors[0],
    };
  }
  if (sp.has("dark_color_dot_border") && drawOptions.dark)
    drawOptions.dark.colorDotBorder = sp.get("color_dot_border")!;
  if (sp.has("dark_color_snake") && drawOptions.dark)
    drawOptions.dark.colorSnake = sp.get("color_snake")!;

  return { filename, format: format as "svg" | "gif", drawOptions, gifOptions };
};
