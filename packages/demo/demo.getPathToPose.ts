import "./menu";
import { createCanvas } from "./canvas";
import { createSnakeFromCells, snakeToCells } from "@snk/types/snake";
import { grid, snake } from "./sample";
import { getPathToPose } from "@snk/solver/getPathToPose";

const { canvas, ctx, draw, highlightCell } = createCanvas(grid);
canvas.style.pointerEvents = "auto";

const target = createSnakeFromCells(
  snakeToCells(snake).map((p) => ({ ...p, x: p.x - 1 }))
);

let chain = [snake, ...getPathToPose(snake, target)!];

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
