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
  buildSourcesColorDots,
  SOURCE_COLORS,
  SOURCE_LABELS,
  type SourceColorKey,
} from "./palettes";

export { basePalettes, palettes } from "./palettes";
export { mergeContributionCells, PLATFORM_BITS } from "./mergeContributionCells";
export {
  blendHex,
  buildSourcesColorDots,
  SOURCE_COLORS,
  SOURCE_LABELS,
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
};

const platformToSourceKey = (
  platform: Source["platform"],
): SourceColorKey | null => {
  if (platform === "github" || platform === "gitlab" || platform === "wakatime")
    return platform;
  return null;
};

export const buildSourcesLegend = (sources: Source[]) => {
  const seen = new Set<SourceColorKey>();
  const legend: { label: string; color: string }[] = [];

  for (const s of sources) {
    const key = platformToSourceKey(s.platform);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    legend.push({ label: SOURCE_LABELS[key], color: SOURCE_COLORS[key] });
  }

  return legend;
};

const applyMultiSourceDrawOptions = (
  drawOptions: DrawOptions,
  sources: Source[],
): DrawOptions => {
  const legend = buildSourcesLegend(sources);
  const dots = drawOptions.colorDots as unknown as string[] | Record<string, string>;
  const len = Array.isArray(dots)
    ? dots.length
    : Object.keys(dots ?? {}).length;

  // Ensure bitmask palette (empty + 7 combos) unless caller already provided one.
  const colorDots =
    len >= 8
      ? drawOptions.colorDots
      : (buildSourcesColorDots(drawOptions.colorEmpty) as unknown as DrawOptions["colorDots"]);

  return {
    ...drawOptions,
    colorDots,
    sourcesLegend: drawOptions.sourcesLegend ?? legend,
  };
};

/**
 * Generate snake animation from one or more contribution sources.
 * Multiple sources are merged by date with presence bitmasks and source colors.
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
        ? applyMultiSourceDrawOptions(out.drawOptions, sourceList)
        : out.drawOptions;

      switch (format) {
        case "svg": {
          console.log(`🖌 creating svg (outputs[${i}])`);
          const { createSvg } = await import("@snk/svg-creator");
          return createSvg(grid, cells, chain, drawOptions, animationOptions);
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
