// @ts-ignore
import * as ParkMiller from "park-miller";
import { generateRandomGrid } from "../generateGrid";
import { Snake } from "../snake";
import { Grid } from "../grid";
import { computeBestRun } from "..";
import { performance } from "perf_hooks";

const snake0 = [
  { x: 4, y: -1 },
  { x: 3, y: -1 },
  { x: 2, y: -1 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
];

const gameOptions = {
  maxSnakeLength: 5,
  colors: [1, 2, 3, 4],
};

const run = (grid: Grid, snake0: Snake, k: number) => {
  const stats: number[] = [];
  const s0 = performance.now();

  const M = 60 * 1000;
  let n = 40;

  while (performance.now() - s0 < M && n-- > 0) {
    const s = performance.now();
    computeBestRun(grid, snake0, gameOptions, k);

    stats.push(performance.now() - s);
  }

  return stats;
};

const report = (arr: number[]) => {
  const average = (arr: number[]) =>
    arr.reduce((s, x) => s + x, 0) / arr.length;

  const spread = (arr: number[]) => {
    const m = average(arr);
    const v = average(arr.map((x) => Math.pow(x - m, 2)));
    return Math.sqrt(v) / m;
  };

  const format = (x: number): string => {
    const u = Math.floor(x / 1000);
    const d = Math.floor(x % 1000).toString();
    return u === 0 ? d : format(u) + " " + d.padEnd(3, "0");
  };

  return `${format(average(arr)).padStart(12)} ms  ±${(spread(arr) * 100)
    .toFixed(2)
    .padStart(5)}%  (x${arr.length.toString().padStart(3)})`;
};

[
  //
  [10, 10, 1000],
  [21, 7, 1000],
  [42, 7, 1000],
  [42, 7, 5000],
  [42, 7, 14000],
  [42, 7, 30000],
].forEach(([w, h, k]) => {
  const random = new ParkMiller(1);
  const grid = generateRandomGrid(w, h, { ...gameOptions, emptyP: 3 }, (a, b) =>
    random.integerInRange(a, b)
  );
  const stats = run(grid, snake0, k);
  console.log(`${w}x${h} : ${k}\n  ${report(stats)}\n`);
});
