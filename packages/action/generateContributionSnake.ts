import { getGithubUserContribution } from "@snk/github-user-contribution";
import { userContributionToGrid } from "./userContributionToGrid";
import { getBestRoute } from "@snk/solver/getBestRoute";
import { createGif } from "@snk/gif-creator";
import { createSvg } from "../svg-creator";
import { snake4 } from "@snk/types/__fixtures__/snake";
import { getPathToPose } from "@snk/solver/getPathToPose";

export const generateContributionSnake = async (
  userName: string,
  format: { svg?: boolean; gif?: boolean }
) => {
  console.log("🎣 fetching github user contribution");
  const { cells, colorScheme } = await getGithubUserContribution(userName);

  const grid = userContributionToGrid(cells, colorScheme);
  const snake = snake4;

  const drawOptions = {
    sizeBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
    colorBorder: "#1b1f230a",
    colorDots: colorScheme as any,
    colorEmpty: colorScheme[0],
    colorSnake: "purple",
    cells,
    dark: {
      colorEmpty: "#161b22",
      colorDots: { 1: "#01311f", 2: "#034525", 3: "#0f6d31", 4: "#00c647" },
    },
  };

  const gifOptions = { frameDuration: 100, step: 1 };

  console.log("📡 computing best route");
  const chain = getBestRoute(grid, snake)!;
  chain.push(...getPathToPose(chain.slice(-1)[0], snake)!);

  const output: Record<string, Buffer | string> = {};

  if (format.gif) {
    console.log("📹 creating gif");
    output.gif = await createGif(grid, chain, drawOptions, gifOptions);
  }

  if (format.svg) {
    console.log("🖌 creating svg");
    output.svg = createSvg(grid, chain, drawOptions, gifOptions);
  }

  return output;
};
