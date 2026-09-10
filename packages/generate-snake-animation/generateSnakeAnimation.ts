import { getForgejoUserContribution } from "@snk/forgejo-user-contribution";
import type { AnimationOptions } from "@snk/gif-creator";
import { getGithubUserContribution } from "@snk/github-user-contribution";
import { getGitlabUserContribution } from "@snk/gitlab-user-contribution";
import { getBestRoute } from "@snk/solver/getBestRoute";
import { getPathToPose } from "@snk/solver/getPathToPose";
import type { DrawOptions } from "@snk/svg-creator";
import { snake4 } from "@snk/types/__fixtures__/snake";
import { getWakatimeUserContribution } from "@snk/wakatime-user-contribution";
import { cellsToGrid } from "./cellsToGrid";
import {
  mergeContributionCells,
  PLATFORM_BITS,
  type ContributionCell,
} from "./mergeContributionCells";
import {
  buildIntensityColorDots,
  buildIntensityLegendColors,
  colorForCell,
  dominantHueFromCells,
  SOURCE_COLORS,
  SOURCE_LABELS,
  SOURCE_LEGEND_ORDER,
  strokeForCell,
  type SourceColorKey,
} from "./palettes";

export { basePalettes, palettes } from "./palettes";
export { mergeContributionCells, PLATFORM_BITS } from "./mergeContributionCells";
export {
  blendHex,
  blendOklch,
  buildSourcesColorDots,
  buildIntensityColorDots,
  buildIntensityLegendColors,
  colorForCell,
  dominantHueFromCells,
  strokeForCell,
  INTENSITY_LEGEND_COLORS,
  SOURCE_COLORS,
  SOURCE_LABELS,
  SOURCE_LEGEND_ORDER,
} from "./palettes";

export type Source =
  | {
      platform: "github";
      username: string;
      githubToken: string;
      baseUrl?: string;
    }
  | { platform: "gitlab"; username: string; baseUrl?: string }
  | { platform: "forgejo"; username: string; baseUrl: string }
  | { platform: "wakatime"; apiKey: string };
// bitbucket reserved for later

export type Output = {
  format: "svg" | "gif";
  drawOptions: DrawOptions;
  animationOptions: AnimationOptions;
};

export const getUserContribution = async (
  source: Source,
): Promise<ContributionCell[]> => {
  const cells = await (async () => {
    switch (source.platform) {
      case "github":
        return getGithubUserContribution(source.username, {
          githubToken: source.githubToken,
          baseUrl: source.baseUrl,
        });
      case "gitlab":
        return getGitlabUserContribution(source.username, {
          baseUrl: source.baseUrl,
        });
      case "forgejo":
        return getForgejoUserContribution(source.username, {
          baseUrl: source.baseUrl,
        });
      case "wakatime":
        return getWakatimeUserContribution({ apiKey: source.apiKey });
    }
  })();

  const bit =
    PLATFORM_BITS[source.platform as keyof typeof PLATFORM_BITS] ?? 0;

  return cells.map((c) => ({
    ...c,
    sources: c.level > 0 ? bit : 0,
  }));
};

const platformToSourceKey = (
  platform: Source["platform"],
): SourceColorKey | null => {
  if (platform === "github" || platform === "gitlab" || platform === "wakatime")
    return platform;
  return null;
};

export const buildSourcesLegend = (sources: Source[]) => {
  const enabled = new Set<SourceColorKey>();

  for (const s of sources) {
    const key = platformToSourceKey(s.platform);
    if (key) enabled.add(key);
  }

  return SOURCE_LEGEND_ORDER.filter((key) => enabled.has(key)).map((key) => ({
    label: SOURCE_LABELS[key],
    color: SOURCE_COLORS[key],
  }));
};

const withCellStyles = (
  cells: ContributionCell[],
  emptyFill: string,
  emptyStroke: string,
) =>
  cells.map((c) => {
    const sources = c.sources ?? 0;
    const level = c.level ?? 0;
    if (level <= 0 || sources === 0) {
      return {
        ...c,
        fill: emptyFill,
        stroke: emptyStroke,
        emptyFill,
        emptyStroke,
      };
    }
    return {
      ...c,
      fill: colorForCell(sources, level),
      stroke: strokeForCell(sources, level),
      emptyFill,
      emptyStroke,
    };
  });

const applyMultiSourceDrawOptions = (
  drawOptions: DrawOptions,
  sources: Source[],
  cells: ContributionCell[],
): DrawOptions => {
  const legend = buildSourcesLegend(sources);
  const empty = drawOptions.colorEmpty;
  const hue = dominantHueFromCells(
    cells.map((c) => ({ sources: c.sources ?? 0, level: c.level ?? 0 })),
  );
  const colorDots = buildIntensityColorDots(
    empty,
    hue,
  ) as unknown as DrawOptions["colorDots"];

  const intensityLegendColors =
    drawOptions.intensityLegendColors ??
    buildIntensityLegendColors(hue, empty);

  return {
    ...drawOptions,
    colorDots,
    colorDotBorder: drawOptions.colorDotBorder || strokeForCell(0, 0),
    sourcesLegend: drawOptions.sourcesLegend ?? legend,
    intensityLegendColors,
    calendarChrome: drawOptions.calendarChrome ?? true,
  };
};

/**
 * Generate snake animation from one or more contribution sources.
 * Multiple sources merge by date: source mask (hue) + max intensity (ladder).
 */
export const generateSnakeAnimation = async (
  sources: Source | Source[],
  outputs: (Output | null)[],
) => {
  const sourceList = Array.isArray(sources) ? sources : [sources];
  if (sourceList.length === 0) throw new Error("No sources provided");

  const multi = sourceList.length > 1;

  console.log(
    `🎣 fetching user contribution from ${sourceList
      .map((s) => s.platform)
      .join(" + ")}`,
  );

  const fetched = await Promise.all(sourceList.map(getUserContribution));

  let cells: ContributionCell[];
  if (multi) {
    const labeled = sourceList.map((s, i) => {
      const bit =
        PLATFORM_BITS[s.platform as keyof typeof PLATFORM_BITS] ??
        (() => {
          throw new Error(
            `Platform ${s.platform} cannot be used in multi-source merge`,
          );
        })();
      return { bit, cells: fetched[i]! };
    });
    cells = mergeContributionCells(labeled);
  } else {
    cells = fetched[0]!;
  }

  const grid = cellsToGrid(cells);
  const snake = snake4;

  console.log("📡 computing best route");
  const chain = getBestRoute(grid, snake)!;
  chain.push(...getPathToPose(chain.slice(-1)[0], snake)!);

  return Promise.all(
    outputs.map(async (out, i) => {
      if (!out) return;
      const { format, animationOptions } = out;
      const drawOptions = multi
        ? applyMultiSourceDrawOptions(out.drawOptions, sourceList, cells)
        : out.drawOptions;

      const emptyStroke =
        drawOptions.colorDotBorder || strokeForCell(0, 0);
      const drawCells = multi
        ? withCellStyles(cells, drawOptions.colorEmpty, emptyStroke)
        : cells;

      switch (format) {
        case "svg": {
          console.log(`🖌 creating svg (outputs[${i}])`);
          const { createSvg } = await import("@snk/svg-creator");
          return createSvg(
            grid,
            drawCells,
            chain,
            drawOptions,
            animationOptions,
          );
        }
        case "gif": {
          console.log(`📹 creating gif (outputs[${i}])`);
          const { createGif } = await import("@snk/gif-creator");
          return createGif(grid, cells, chain, drawOptions, animationOptions);
        }
      }
    }),
  );
};
