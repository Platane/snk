import "./menu";
import { createCanvas } from "./canvas";
import { copySnake, snakeToCells } from "@snk/types/snake";
import { grid, snake as snake0 } from "./sample";
import { getPathTo } from "@snk/solver/getPathTo";

const { canvas, ctx, draw, getPointedCell, highlightCell } = createCanvas(grid);
canvas.style.pointerEvents = "auto";

let snake = copySnake(snake0);
let chain = [snake];

canvas.addEventListener("mousemove", (e) => {
  const { x, y } = getPointedCell(e);

  chain = [...(getPathTo(grid, snake, x, y) || []), snake].reverse();

  inputI.max = chain.length - 1;
  i = inputI.value = chain.length - 1;

  onChange();
});

canvas.addEventListener("click", () => {
  snake = chain.slice(-1)[0];

  chain = [snake];
  inputI.max = chain.length - 1;
  i = inputI.value = chain.length - 1;

  onChange();
});

let i = 0;
const onChange = () => {
  ctx.clearRect(0, 0, 9999, 9999);

  draw(grid, chain[i], []);
  chain
    .map(snakeToCells)
    .flat()
    .forEach(({ x, y }) => highlightCell(x, y));
};

onChange();

const inputI = document.createElement("input") as any;
inputI.type = "range";
inputI.value = 0;
inputI.max = chain ? chain.length - 1 : 0;
inputI.step = 1;
inputI.min = 0;
inputI.style.width = "90%";
inputI.style.padding = "20px 0";
inputI.addEventListener("input", () => {
  i = +inputI.value;
  onChange();
});
document.body.append(inputI);
