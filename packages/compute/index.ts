import { Grid, Color, copyGrid, isInsideLarge } from "./grid";
import { Point, around4 } from "./point";
import { stepSnake, step } from "./step";
import { copySnake, snakeSelfCollide } from "./snake";

const isGridEmpty = (grid: Grid) => grid.data.every((x) => x === null);

export const computeBestRun = (
  grid: Grid,
  snake: Point[],
  options: { maxSnakeLength: number }
) => {
  const g = copyGrid(grid);
  const s = copySnake(snake);
  const q: Color[] = [];

  const commands: Point[] = [];

  let u = 100;

  while (!isGridEmpty(g) && u-- > 0) {
    let direction;

    for (let k = 10; k--; ) {
      direction = around4[Math.floor(Math.random() * around4.length)];

      const sn = copySnake(s);
      stepSnake(sn, direction, options);

      if (isInsideLarge(g, 1, sn[0].x, sn[0].y) && !snakeSelfCollide(sn)) {
        break;
      } else {
        direction = undefined;
      }
    }

    if (direction !== undefined) {
      step(g, s, q, direction, options);
      commands.push(direction);
    }
  }

  return commands;
};
