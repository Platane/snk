import { h } from "./xml-utils";

export type SourceLegendItem = {
  label: string;
  color: string;
};

export type LegendOptions = {
  sizeCell: number;
  sizeDot: number;
  sizeDotBorderRadius: number;
};

/**
 * @deprecated Prefer createCalendarChrome bottom-left sources.
 * Kept for tests that draw a compact header legend.
 */
export const createSourcesLegend = (
  items: SourceLegendItem[],
  { sizeCell, sizeDot, sizeDotBorderRadius }: LegendOptions,
) => {
  if (items.length === 0) {
    return { svgElements: [] as string[], styles: [] as string[], height: 0 };
  }

  const swatch = Math.min(sizeDot, 10);
  const fontSize = 11;
  const gap = 16;
  const textGap = 6;
  const charWidth = fontSize * 0.62;

  const styles = [
    `.sl{font:600 ${fontSize}px ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;fill:#57606a}`,
    `@media (prefers-color-scheme:dark){.sl{fill:#8b949e}}`,
  ];

  const svgElements: string[] = [];
  let x = 0;
  const y = 0;

  for (const item of items) {
    svgElements.push(
      h("rect", {
        x,
        y: y + (fontSize - swatch) / 2,
        width: swatch,
        height: swatch,
        rx: sizeDotBorderRadius,
        ry: sizeDotBorderRadius,
        fill: item.color,
      }),
    );

    const textX = x + swatch + textGap;
    svgElements.push(
      `<text class="sl" x="${textX}" y="${y + fontSize - 1}">${escapeXml(
        item.label,
      )}</text>`,
    );

    x = textX + item.label.length * charWidth + gap;
  }

  const height = sizeCell;

  return { svgElements, styles, height };
};

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
