import { performance } from "perf_hooks";
import { createSnake, nextSnake } from "@snk/compute/snake";
import { realistic as grid } from "@snk/compute/__fixtures__/grid";
import { createGif } from "..";

let snake = createSnake(Array.from({ length: 6 }, (_, i) => ({ x: i, y: -1 })));

const chain = [snake];
for (let y = -1; y < grid.height; y++) {
  snake = nextSnake(snake, 0, 1);
  chain.push(snake);

  for (let x = grid.width - 1; x--; ) {
    snake = nextSnake(snake, (y + 100) % 2 ? 1 : -1, 0);
    chain.push(snake);
  }
}

const drawOptions = {
  sizeBorderRadius: 2,
  sizeCell: 16,
  sizeDot: 12,
  colorBorder: "#1b1f230a",
  colorDots: { 1: "#9be9a8", 2: "#40c463", 3: "#30a14e", 4: "#216e39" },
  colorEmpty: "#ebedf0",
  colorSnake: "purple",
};

const gifOptions = { frameDuration: 20, step: 1 };

(async () => {
  const m = 3;
  const s = performance.now();
  for (let k = m; k--; )
    await createGif(grid, chain.slice(0, 50), drawOptions, gifOptions);

  console.log((performance.now() - s) / m, "ms");
})();
