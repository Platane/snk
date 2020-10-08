import { getGithubUserContribution, Cell } from "@snk/github-user-contribution";
import { setColor, createEmptyGrid, Color } from "@snk/compute/grid";
import { createGif } from "@snk/gif-creator";
import { getBestRoute } from "@snk/compute/getBestRoute";
import { createSnake } from "@snk/compute/snake";

export const userContributionToGrid = (cells: Cell[]) => {
  const width = Math.max(0, ...cells.map((c) => c.x)) + 1;
  const height = Math.max(0, ...cells.map((c) => c.y)) + 1;

  const grid = createEmptyGrid(width, height);
  for (const c of cells) if (c.k) setColor(grid, c.x, c.y, c.k as Color);

  return grid;
};

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

  const gifOptions = { frameDuration: 10, step: 1 };

  const chain = getBestRoute(grid0, snake0)!;

  const buffer = await createGif(grid0, chain, drawOptions, gifOptions);

  return buffer;
};
