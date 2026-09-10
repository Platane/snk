import { it, expect } from "bun:test";
import { createSvg, type DrawOptions } from "..";
import { createEmptyGrid, setColor, type Color } from "@snk/types/grid";
import { snake3 as snake } from "@snk/types/__fixtures__/snake";
import { getBestRoute } from "@snk/solver/getBestRoute";
import {
  colorForCell,
  INTENSITY_LEGEND_COLORS,
  SOURCE_COLORS,
  strokeForCell,
} from "../../generate-snake-animation/palettes";

it("should render calendar chrome and per-cell oklch strokes", async () => {
  const grid = createEmptyGrid(8, 7);
  setColor(grid, 1, 1, 2 as Color);
  setColor(grid, 2, 2, 4 as Color);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cells = [];
  let x = 0;
  const cursor = new Date(today);
  cursor.setDate(cursor.getDate() - 50);
  cursor.setDate(cursor.getDate() - cursor.getDay());
  while (cells.length < 56) {
    const y = cursor.getDay();
    const date = cursor.toLocaleDateString("en-CA");
    const level = x === 1 && y === 1 ? 2 : x === 2 && y === 2 ? 4 : 0;
    const sources = level > 0 ? 1 : 0;
    cells.push({
      x,
      y,
      date,
      level,
      sources,
      fill: colorForCell(sources, level),
      stroke: strokeForCell(sources, level),
      emptyFill: colorForCell(0, 0),
      emptyStroke: strokeForCell(0, 0),
    });
    cursor.setDate(cursor.getDate() + 1);
    if (y === 6) x++;
  }

  const drawOptions: DrawOptions = {
    sizeDotBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
    colorDotBorder: strokeForCell(0, 0),
    colorDots: {
      1: colorForCell(1, 1),
      2: colorForCell(1, 2),
      3: colorForCell(1, 3),
      4: colorForCell(1, 4),
    },
    colorEmpty: colorForCell(0, 0),
    colorSnake: "purple",
    calendarChrome: true,
    sourcesLegend: [
      { label: "GitHub", color: SOURCE_COLORS.github },
      { label: "WakaTime", color: SOURCE_COLORS.wakatime },
      { label: "GitLab", color: SOURCE_COLORS.gitlab },
    ],
    intensityLegendColors: [...INTENSITY_LEGEND_COLORS],
  };

  const chain = [snake, ...getBestRoute(grid, snake)!];
  const svg = createSvg(grid, cells, chain, drawOptions, {
    stepDurationMs: 100,
  });

  expect(svg).toContain("Mon");
  expect(svg).toContain("Wed");
  expect(svg).toContain("Fri");
  expect(svg).toContain("Less");
  expect(svg).toContain("More");
  expect(svg).toContain("GitHub");
  expect(svg).toContain("WakaTime");
  expect(svg).toContain("GitLab");
  expect(svg).toContain("oklch(");
  expect(svg).toMatch(/stroke-width:\s*1px/);
  // month abbreviation present
  expect(svg).toMatch(/>Jan<|>Feb<|>Mar<|>Apr<|>May<|>Jun<|>Jul<|>Aug<|>Sep<|>Oct<|>Nov<|>Dec</);
});
