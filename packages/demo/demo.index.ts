import * as grid from "@snk/compute/__fixtures__/grid";
// import { greet } from "@snk/compute-rust";

// @ts-ignore
import("./index").catch((e) => console.error("Error importing `index.js`:", e));

const container = document.createElement("div");
container.style.fontFamily = "helvetica";
document.body.appendChild(container);

for (const demo of ["getAvailableRoutes", "getBestRoute"]) {
  const title = document.createElement("h1");
  title.innerText = demo;

  container.appendChild(title);

  for (const g of Object.keys(grid)) {
    const a = document.createElement("a");
    a.style.display = "block";
    a.innerText = `${demo} - ${g}`;
    a.href = `./demo-${demo}.html?grid=${g}`;

    container.appendChild(a);
  }
}
