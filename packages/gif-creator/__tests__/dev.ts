import { createGif } from "..";
import { generateGrid } from "@snk/compute/generateGrid";
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

const gameOptions = { maxSnakeLength: 5 };

const gifOptions = { delay: 100 };

const grid = generateGrid(42, 7, { colors: [1, 2, 3, 4], emptyP: 3 });

const snake = [
  { x: 4, y: -1 },
  { x: 3, y: -1 },
  { x: 2, y: -1 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
];

const commands = computeBestRun(grid, snake, gameOptions);

createGif(grid, snake, commands, drawOptions, gameOptions, gifOptions).then(
  (buffer) => {
    process.stdout.write(buffer);
  }
);
