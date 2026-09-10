import { h } from "./xml-utils";

export type ChromeCell = {
  x: number;
  y: number;
  date?: string;
};

export type CalendarChromeOptions = {
  sizeCell: number;
  sizeDot: number;
  sizeDotBorderRadius: number;
  gridWidth: number;
  gridHeight: number;
  intensityColors: string[];
  sourcesLegend: { label: string; color: string }[];
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * GitHub-style calendar chrome: month labels, Mon/Wed/Fri, source + intensity legends.
 * Coordinate origin is the top-left of the contribution grid (y=0 = Sunday row).
 */
export const createCalendarChrome = (
  cells: ChromeCell[],
  {
    sizeCell,
    sizeDot,
    sizeDotBorderRadius,
    gridWidth,
    intensityColors,
    sourcesLegend,
  }: CalendarChromeOptions,
) => {
  const fontSize = 10;
  const swatch = Math.min(sizeDot, 10);
  const labelFill = "#8b949e";
  const styles = [
    `.cal{font:${fontSize}px ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;fill:${labelFill}}`,
  ];

  const svgElements: string[] = [];

  // Day labels — Mon / Wed / Fri (rows 1, 3, 5 when Sunday = 0)
  const dayLabels: { y: number; text: string }[] = [
    { y: 1, text: "Mon" },
    { y: 3, text: "Wed" },
    { y: 5, text: "Fri" },
  ];
  for (const { y, text } of dayLabels) {
    svgElements.push(
      `<text class="cal" text-anchor="end" x="${-sizeCell * 0.35}" y="${
        y * sizeCell + sizeCell * 0.7
      }">${text}</text>`,
    );
  }

  // Month labels — first week column of each month
  const monthAtX = new Map<number, string>();
  for (const c of cells) {
    if (!c.date) continue;
    const month = Number(c.date.slice(5, 7)) - 1;
    if (!monthAtX.has(c.x)) monthAtX.set(c.x, MONTHS[month]!);
  }
  let prevMonth = "";
  for (let x = 0; x < gridWidth; x++) {
    const m = monthAtX.get(x);
    if (!m || m === prevMonth) continue;
    prevMonth = m;
    svgElements.push(
      `<text class="cal" x="${x * sizeCell}" y="${-sizeCell * 0.35}">${m}</text>`,
    );
  }

  const footerY = 7 * sizeCell + sizeCell * 1.15;
  const swatchY = footerY - swatch + 2;

  // Source legend — bottom left
  let sx = 0;
  for (const item of sourcesLegend) {
    svgElements.push(
      h("rect", {
        x: sx,
        y: swatchY,
        width: swatch,
        height: swatch,
        rx: sizeDotBorderRadius,
        ry: sizeDotBorderRadius,
        fill: item.color,
        stroke: item.color,
        "stroke-width": 1,
      }),
    );
    const tx = sx + swatch + 5;
    svgElements.push(
      `<text class="cal" x="${tx}" y="${footerY}">${escapeXml(item.label)}</text>`,
    );
    sx = tx + item.label.length * fontSize * 0.62 + 14;
  }

  // Intensity legend — bottom right: Less [5 swatches] More
  const gap = 3;
  const moreW = 28;
  const lessW = 28;
  const stripW =
    lessW + intensityColors.length * (swatch + gap) + moreW;
  let ix = gridWidth * sizeCell - stripW;

  svgElements.push(
    `<text class="cal" x="${ix}" y="${footerY}">Less</text>`,
  );
  ix += lessW;
  for (const color of intensityColors) {
    svgElements.push(
      h("rect", {
        x: ix,
        y: swatchY,
        width: swatch,
        height: swatch,
        rx: sizeDotBorderRadius,
        ry: sizeDotBorderRadius,
        fill: color,
        stroke: color,
        "stroke-width": 1,
      }),
    );
    ix += swatch + gap;
  }
  svgElements.push(
    `<text class="cal" x="${ix}" y="${footerY}">More</text>`,
  );

  const padLeft = sizeCell * 2.2;
  const padTop = sizeCell * 1.2;
  const padBottom = sizeCell * 2.2;

  return {
    svgElements,
    styles,
    padLeft,
    padTop,
    padBottom,
  };
};
