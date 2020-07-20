import { createGif } from "..";
import { generateRandomGrid } from "@snk/compute/generateGrid";
import { computeBestRun } from "@snk/compute";

const drawOptions = {
  sizeBorderRadius: 2,
  sizeCell: 16,
  sizeDot: 12,
  colorBorder: "#1b1f230a",
  colorDots: { 1: "#9be9a8", 2: "#40c463", 3: "#30a14e", 4: "#216e39" },
  colorEmpty: "#ebedf0",
  colorSnake: "purple",
};

const gameOptions = { maxSnakeLength: 5, colors: [1, 2, 3, 4] };

const gifOptions = { delay: 200 };

it("should generate gif", async () => {
  const grid = generateRandomGrid(14, 7, { ...gameOptions, emptyP: 3 });

  const snake = [
    { x: 4, y: -1 },
    { x: 3, y: -1 },
    { x: 2, y: -1 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
  ];

  const commands = computeBestRun(grid, snake, gameOptions).slice(0, 9);

  const gif = await createGif(
    grid,
    snake,
    commands,
    drawOptions,
    gameOptions,
    gifOptions
  );

  expect(gif).toBeDefined();
});
