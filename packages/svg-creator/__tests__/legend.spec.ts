import { it, expect } from "bun:test";
import { createSvg, type DrawOptions } from "..";
import { createEmptyGrid, setColor, type Color } from "@snk/types/grid";
import { snake3 as snake } from "@snk/types/__fixtures__/snake";
import { getBestRoute } from "@snk/solver/getBestRoute";
import {
  buildSourcesColorDots,
  SOURCE_COLORS,
} from "../../generate-snake-animation/palettes";

it("should render sources legend in the svg header", async () => {
  const grid = createEmptyGrid(5, 7);
  setColor(grid, 1, 1, 1 as Color);
  setColor(grid, 2, 2, 3 as Color);
  setColor(grid, 3, 3, 4 as Color);

  const dots = buildSourcesColorDots("#ebedf0");
  const drawOptions: DrawOptions = {
    sizeDotBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
    colorDotBorder: "#1b1f230a",
    colorDots: Object.fromEntries(
      dots.map((c, i) => [i, c]).filter(([i]) => Number(i) > 0),
    ) as DrawOptions["colorDots"],
    colorEmpty: "#ebedf0",
    colorSnake: "purple",
    sourcesLegend: [
      { label: "GitHub", color: SOURCE_COLORS.github },
      { label: "WakaTime", color: SOURCE_COLORS.wakatime },
      { label: "GitLab", color: SOURCE_COLORS.gitlab },
    ],
  };

  const chain = [snake, ...getBestRoute(grid, snake)!];
  const svg = createSvg(grid, null, chain, drawOptions, {
    stepDurationMs: 100,
  });

  expect(svg).toContain("GitHub");
  expect(svg).toContain("WakaTime");
  expect(svg).toContain("GitLab");
  expect(svg).toContain(SOURCE_COLORS.github);
  expect(svg).toContain(SOURCE_COLORS.wakatime);
  expect(svg).toContain(SOURCE_COLORS.gitlab);
  expect(svg.indexOf("GitHub")).toBeLessThan(svg.indexOf("WakaTime"));
  expect(svg.indexOf("WakaTime")).toBeLessThan(svg.indexOf("GitLab"));
});
