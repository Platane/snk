import "./menu";
import { createCanvas } from "./canvas";
import { getBestRoute } from "@snk/compute/getBestRoute";
import { Color, copyGrid } from "@snk/types/grid";
import { grid, snake } from "./sample";
import { step } from "@snk/compute/step";
import { isStableAndBound, stepSpring } from "./springUtils";

const chain = [snake, ...getBestRoute(grid, snake)!];

//
// draw

const spring = { x: 0, v: 0, target: 0 };
const springParams = { tension: 120, friction: 20, maxVelocity: 50 };
let animationFrame: number;

const { canvas, highlightCell, drawLerp } = createCanvas(grid);
document.body.appendChild(canvas);

const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

const loop = () => {
  cancelAnimationFrame(animationFrame);

  stepSpring(spring, springParams, spring.target);
  const stable = isStableAndBound(spring, spring.target);

  const grid0 = copyGrid(grid);
  const stack0: Color[] = [];
  for (let i = 0; i < Math.min(chain.length, spring.x); i++)
    step(grid0, stack0, chain[i]);

  const snake0 = chain[clamp(Math.floor(spring.x), 0, chain.length - 1)];
  const snake1 = chain[clamp(Math.ceil(spring.x), 0, chain.length - 1)];
  const k = spring.x % 1;

  drawLerp(grid0, snake0, snake1, stack0, k);

  if (!stable) animationFrame = requestAnimationFrame(loop);
};

loop();

const input = document.createElement("input") as any;
input.type = "range";
input.value = 0;
input.step = 1;
input.min = 0;
input.max = chain.length;
input.style.width = "90%";
input.addEventListener("input", () => {
  spring.target = +input.value;
  cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(loop);
});
document.body.append(input);
window.addEventListener("click", (e) => {
  if (e.target === document.body || e.target === document.body.parentElement)
    input.focus();
});
