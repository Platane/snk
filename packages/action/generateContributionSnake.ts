import { getGithubUserContribution } from "@snk/github-user-contribution";
import { createGif } from "@snk/gif-creator";
import { getBestRoute } from "@snk/compute/getBestRoute";
import { createSnakeFromCells } from "@snk/types/snake";
import { userContributionToGrid } from "./userContributionToGrid";

export const generateContributionSnake = async (userName: string) => {
  console.log("🎣 fetching github user contribution");
  const { cells, colorScheme } = await getGithubUserContribution(userName);

  const grid0 = userContributionToGrid(cells);

  const snake0 = createSnakeFromCells([
    { x: 3, y: -1 },
    { x: 2, y: -1 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
  ]);

  // const upscale = 815 / (grid0.width + 2) / 16;
  const upscale = 2;
  const drawOptions = {
    sizeBorderRadius: 2 * upscale,
    sizeCell: 16 * upscale,
    sizeDot: 12 * upscale,
    colorBorder: "#1b1f230a",
    colorDots: colorScheme as any,
    colorEmpty: colorScheme[0],
    colorSnake: "purple",
    cells,
  };

  const gifOptions = { frameDuration: 100, step: 1 };

  console.log("📡 computing best route");
  const chain = getBestRoute(grid0, snake0)!;

  console.log("📹 creating gif");
  const buffer = await createGif(grid0, chain, drawOptions, gifOptions);

  return buffer;
};
