import { Color, copyGrid, Grid } from "@snk/types/grid";
import { step } from "@snk/solver/step";
import { isStableAndBound, stepSpring } from "./springUtils";
import type { Res } from "@snk/github-user-contribution";
import type { Snake } from "@snk/types/snake";
import type { Point } from "@snk/types/point";
import {
  drawLerpWorld,
  getCanvasWorldSize,
  Options as DrawOptions,
} from "@snk/draw/drawWorld";
import { userContributionToGrid } from "@snk/action/userContributionToGrid";
import { createSvg } from "@snk/svg-creator";
import { createRpcClient } from "./worker-utils";
import type { API as WorkerAPI } from "./demo.interactive.worker";
import { AnimationOptions } from "@snk/gif-creator";

const createForm = ({
  onSubmit,
  onChangeUserName,
}: {
  onSubmit: (s: string) => Promise<void>;
  onChangeUserName: (s: string) => void;
}) => {
  const form = document.createElement("form");
  form.style.position = "relative";
  form.style.display = "flex";
  form.style.flexDirection = "row";
  const input = document.createElement("input");
  input.addEventListener("input", () => onChangeUserName(input.value));
  input.style.padding = "16px";
  input.placeholder = "github user";
  const submit = document.createElement("button");
  submit.style.padding = "16px";
  submit.type = "submit";
  submit.innerText = "ok";

  const label = document.createElement("label");
  label.style.position = "absolute";
  label.style.textAlign = "center";
  label.style.top = "60px";
  label.style.left = "0";
  label.style.right = "0";

  form.appendChild(input);
  form.appendChild(submit);
  document.body.appendChild(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    onSubmit(input.value)
      .finally(() => {
        clearTimeout(timeout);
      })
      .catch((err) => {
        label.innerText = "error :(";
        throw err;
      });

    input.disabled = true;
    submit.disabled = true;
    form.appendChild(label);
    label.innerText = "loading ...";

    const timeout = setTimeout(() => {
      label.innerText = "loading ( it might take a while ) ... ";
    }, 5000);
  });

  //
  // dispose
  const dispose = () => {
    document.body.removeChild(form);
  };

  return { dispose };
};

const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

const createGithubProfile = () => {
  const container = document.createElement("div");
  container.style.padding = "20px";
  container.style.opacity = "0";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.height = "120px";
  container.style.alignItems = "flex-start";
  const image = document.createElement("img");
  image.style.width = "100px";
  image.style.height = "100px";
  image.style.borderRadius = "50px";
  const name = document.createElement("a");
  name.style.padding = "4px 0 0 0";

  document.body.appendChild(container);
  container.appendChild(image);
  container.appendChild(name);

  image.addEventListener("load", () => {
    container.style.opacity = "1";
  });
  const onChangeUser = (userName: string) => {
    container.style.opacity = "0";
    name.innerText = userName;
    name.href = `https://github.com/${userName}`;
    image.src = `https://github.com/${userName}.png`;
  };

  const dispose = () => {
    document.body.removeChild(container);
  };

  return { dispose, onChangeUser };
};

const createViewer = ({
  grid0,
  chain,
  cells,
  drawOptions,
}: {
  grid0: Grid;
  chain: Snake[];
  cells: Point[];
  drawOptions: DrawOptions;
}) => {
  //
  // canvas
  const canvas = document.createElement("canvas");
  const { width, height } = getCanvasWorldSize(grid0, drawOptions);
  canvas.width = width;
  canvas.height = height;

  const w = Math.min(width, window.innerWidth);
  const h = (height / width) * w;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  canvas.style.pointerEvents = "none";

  document.body.appendChild(canvas);

  //
  // draw
  let animationFrame: number;
  const spring = { x: 0, v: 0, target: 0 };
  const springParams = { tension: 120, friction: 20, maxVelocity: 50 };
  const ctx = canvas.getContext("2d")!;
  const loop = () => {
    cancelAnimationFrame(animationFrame);

    stepSpring(spring, springParams, spring.target);
    const stable = isStableAndBound(spring, spring.target);

    const grid = copyGrid(grid0);
    const stack: Color[] = [];
    for (let i = 0; i < Math.min(chain.length, spring.x); i++)
      step(grid, stack, chain[i]);

    const snake0 = chain[clamp(Math.floor(spring.x), 0, chain.length - 1)];
    const snake1 = chain[clamp(Math.ceil(spring.x), 0, chain.length - 1)];
    const k = spring.x % 1;

    ctx.clearRect(0, 0, 9999, 9999);
    drawLerpWorld(ctx, grid, cells, snake0, snake1, stack, k, drawOptions);

    if (!stable) animationFrame = requestAnimationFrame(loop);
  };
  loop();

  //
  // controls
  const input = document.createElement("input") as any;
  input.type = "range";
  input.value = 0;
  input.step = 1;
  input.min = 0;
  input.max = chain.length;
  input.style.width = "calc( 100% - 20px )";
  input.addEventListener("input", () => {
    spring.target = +input.value;
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(loop);
  });
  const onClickBackground = (e: MouseEvent) => {
    if (e.target === document.body || e.target === document.body.parentElement)
      input.focus();
  };
  window.addEventListener("click", onClickBackground);
  document.body.append(input);

  //
  // svg
  const svgLink = document.createElement("a");
  const svgString = createSvg(grid0, cells, chain, drawOptions, {
    frameDuration: 100,
  } as AnimationOptions);
  const svgImageUri = `data:image/*;charset=utf-8;base64,${btoa(svgString)}`;
  svgLink.href = svgImageUri;
  svgLink.innerText = "github-user-contribution.svg";
  svgLink.download = "github-user-contribution.svg";
  svgLink.addEventListener("click", (e) => {
    const w = window.open("")!;
    w.document.write(
      `<a href="${svgImageUri}" download="github-user-contribution.svg">` +
        svgString +
        "<a/>"
    );
    e.preventDefault();
  });
  svgLink.style.padding = "20px";
  svgLink.style.paddingTop = "60px";
  svgLink.style.alignSelf = "flex-start";
  document.body.append(svgLink);

  //
  // dispose
  const dispose = () => {
    window.removeEventListener("click", onClickBackground);
    cancelAnimationFrame(animationFrame);
    document.body.removeChild(canvas);
    document.body.removeChild(input);
    document.body.removeChild(svgLink);
  };

  return { dispose };
};

const onSubmit = async (userName: string) => {
  const res = await fetch(
    process.env.GITHUB_USER_CONTRIBUTION_API_ENDPOINT + userName
  );
  const cells = (await res.json()) as Res;

  const drawOptions: DrawOptions = {
    sizeDotBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
    colorDotBorder: "#1b1f230a",
    colorDots: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    colorEmpty: "#ebedf0",
    colorSnake: "purple",
  };

  const grid = userContributionToGrid(cells);

  const chain = await getChain(grid);

  dispose();

  createViewer({ grid0: grid, chain, cells, drawOptions });
};

const worker = new Worker(
  new URL(
    "./demo.interactive.worker.ts",
    // @ts-ignore
    import.meta.url
  )
);

const { getChain } = createRpcClient<WorkerAPI>(worker);

const profile = createGithubProfile();
const { dispose } = createForm({
  onSubmit,
  onChangeUserName: profile.onChangeUser,
});

document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100%";
document.body.style.width = "100%";
document.body.style.position = "absolute";
