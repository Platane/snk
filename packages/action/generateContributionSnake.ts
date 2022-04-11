import { getGithubUserContribution } from "@snk/github-user-contribution";
import { userContributionToGrid } from "./userContributionToGrid";
import { getBestRoute } from "@snk/solver/getBestRoute";
import { snake4 } from "@snk/types/__fixtures__/snake";
import { getPathToPose } from "@snk/solver/getPathToPose";
import { Options as DrawOptions } from "@snk/svg-creator";

export const generateContributionSnake = async (
  userName: string,
  outputs: ({
    format: "svg" | "gif";
    drawOptions: DrawOptions;
    gifOptions: {
      frameDuration: number;
      step: number;
    };
  } | null)[]
) => {
  console.log("🎣 fetching github user contribution");
  const { cells, colorScheme } = await getGithubUserContribution(userName);

  const grid = userContributionToGrid(cells, colorScheme);
  const snake = snake4;

  console.log("📡 computing best route");
  const chain = getBestRoute(grid, snake)!;
  chain.push(...getPathToPose(chain.slice(-1)[0], snake)!);

  return Promise.all(
    outputs.map(async (out, i) => {
      if (!out) return;
      const { format, drawOptions, gifOptions } = out;
      switch (format) {
        case "svg": {
          console.log(`🖌 creating svg (outputs[${i}])`);
          const { createSvg } = await import("@snk/svg-creator");
          return createSvg(grid, chain, drawOptions, gifOptions);
        }
        case "gif": {
          console.log(`📹 creating gif (outputs[${i}])`);
          const { createGif } = await import("@snk/gif-creator");
          return await createGif(grid, chain, drawOptions, gifOptions);
        }
      }
    })
  );
};
