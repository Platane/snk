import { getGithubUserContribution, Cell } from "@snk/github-user-contribution";
import { generateEmptyGrid } from "@snk/compute/generateGrid";
import { setColor } from "@snk/compute/grid";
import { computeBestRun } from "@snk/compute";
import { createGif } from "../gif-creator";

export const userContributionToGrid = (cells: Cell[]) => {
  const width = Math.max(0, ...cells.map((c) => c.x)) + 1;
  const height = Math.max(0, ...cells.map((c) => c.y)) + 1;

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

  const gameOptions = {
    maxSnakeLength: 5,
    colors: Array.from({ length: colorScheme.length - 1 }, (_, i) => i + 1),
  };

  const gifOptions = { delay: 3 };

  const commands = computeBestRun(grid0, snake0, gameOptions);

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
