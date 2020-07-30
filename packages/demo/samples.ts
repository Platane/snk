// @ts-ignore
import * as ParkMiller from "park-miller";
import { generateRandomGrid } from "@snk/compute/generateGrid";
import { createEmptyGrid, setColor } from "@snk/compute/grid";

export const samples: any[] = [];

{
  const gameOptions = {
    colors: [1, 2, 3],
    maxSnakeLength: 1,
  };
  const snake = [{ x: 0, y: -1 }];
  const grid = createEmptyGrid(6, 6);
  samples.push({
    label: "empty",
    grid,
    snake,
    gameOptions,
  });
}

{
  const gameOptions = {
    colors: [1, 2, 3],
    maxSnakeLength: 1,
  };
  const snake = [{ x: 0, y: -1 }];
  const grid = createEmptyGrid(6, 6);
  setColor(grid, 2, 2, 2);
  samples.push({
    label: "small",
    grid,
    snake,
    gameOptions,
  });
}

{
  const gameOptions = {
    colors: [1, 2, 3],
    maxSnakeLength: 5,
  };
  const random = new ParkMiller(10);
  const rand = (a: number, b: number) => random.integerInRange(a, b - 1);
  const grid = generateRandomGrid(52, 7, { ...gameOptions, emptyP: 2 }, rand);
  const snake = [
    { x: 4, y: -1 },
    { x: 3, y: -1 },
    { x: 2, y: -1 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
  ];

  samples.push({
    label: "realistic",
    grid,
    snake,
    gameOptions,
  });
}

{
  const gameOptions = {
    colors: [1, 2, 3],
    maxSnakeLength: 5,
  };
  const random = new ParkMiller(10);
  const rand = (a: number, b: number) => random.integerInRange(a, b - 1);
  const grid = generateRandomGrid(20, 7, { ...gameOptions, emptyP: 2 }, rand);
  const snake = [
    { x: 4, y: -1 },
    { x: 3, y: -1 },
    { x: 2, y: -1 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
  ];

  samples.push({
    label: "realistic-small",
    grid,
    snake,
    gameOptions,
  });
}
