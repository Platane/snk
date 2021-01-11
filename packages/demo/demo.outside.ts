import "./menu";
import { createCanvas } from "./canvas";
import { grid } from "./sample";
import type { Color } from "@snk/types/grid";
import { createOutside, isOutside } from "@snk/solver/outside";

const { canvas, ctx, draw, highlightCell } = createCanvas(grid);
document.body.appendChild(canvas);

let k = 0;

const onChange = () => {
  ctx.clearRect(0, 0, 9999, 9999);

  draw(grid, [] as any, []);

  const outside = createOutside(grid, k as Color);

  for (let x = outside.width; x--; )
    for (let y = outside.height; y--; )
      if (isOutside(outside, x, y)) highlightCell(x, y);
};

onChange();

const inputK = document.createElement("input") as any;
inputK.type = "range";
inputK.value = 0;
inputK.step = 1;
inputK.min = 0;
inputK.max = 4;
inputK.style.width = "90%";
inputK.style.padding = "20px 0";
inputK.addEventListener("input", () => {
  k = +inputK.value;
  onChange();
});
document.body.append(inputK);
window.addEventListener("click", (e) => {
  if (e.target === document.body || e.target === document.body.parentElement)
    inputK.focus();
});
