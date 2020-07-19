import { getGithubUserContribution, Cell } from "@snk/github-user-contribution";
import { generateEmptyGrid } from "@snk/compute/generateGrid";
import { setColor } from "@snk/compute/grid";
import { computeBestRun } from "@snk/compute";
import { createGif } from "../gif-creator";

export const userContributionToGrid = (cells: Cell[]) => {
  const width = Math.max(...cells.map((c) => c.x));
  const height = Math.max(...cells.map((c) => c.y));

  const grid = generateEmptyGrid(width, height);
  for (const c of cells) setColor(grid, c.x, c.y, c.k === 0 ? null : c.k);

  return grid;
};

export const generateContributionSnake = async (userName: string) => {
  const { cells, colorScheme } = await getGithubUserContribution(userName);

  const grid0 = userContributionToGrid(cells);

  const snake0 = [
    { x: 4, y: -1 },
    { x: 3, y: -1 },
    { x: 2, y: -1 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
  ];

  const drawOptions = {
    sizeBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
    colorBorder: "#1b1f230a",
    colorDots: colorScheme,
    colorEmpty: colorScheme[0],
    colorSnake: "purple",
  };

  const gameOptions = { maxSnakeLength: 5 };

  const gifOptions = { delay: 20 };

  const commands = computeBestRun(grid0, snake0, gameOptions).slice(0, 50);

  const buffer = await createGif(
    grid0,
    snake0,
    commands,
    drawOptions,
    gameOptions,
    gifOptions
  );

  return buffer;
};
