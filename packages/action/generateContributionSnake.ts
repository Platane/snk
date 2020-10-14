import { getGithubUserContribution } from "@snk/github-user-contribution";
import { createGif } from "@snk/gif-creator";
import { createSnake } from "@snk/compute/snake";
import { getBestRoute } from "@snk/compute/getBestRoute";
import { userContributionToGrid } from "./userContributionToGrid";

export const generateContributionSnake = async (userName: string) => {
  const { cells, colorScheme } = await getGithubUserContribution(userName);

  const grid0 = userContributionToGrid(cells);

  const snake0 = createSnake([
    { x: 4, y: -1 },
    { x: 3, y: -1 },
    { x: 2, y: -1 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
  ]);

  const drawOptions = {
    sizeBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
    colorBorder: "#1b1f230a",
    colorDots: colorScheme,
    colorEmpty: colorScheme[0],
    colorSnake: "purple",
  };

  const gifOptions = { frameDuration: 100, step: 2 };

  const chain = getBestRoute(grid0, snake0)!;

  const buffer = await createGif(grid0, chain, drawOptions, gifOptions);

  return buffer;
};
