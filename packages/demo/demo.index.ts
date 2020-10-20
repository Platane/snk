import * as grid from "@snk/types/__fixtures__/grid";

const container = document.createElement("div");
container.style.fontFamily = "helvetica";
document.body.appendChild(container);

for (const demo of require("./demo.json").filter(
  (x: any) => !["index"].includes(x)
)) {
  const title = document.createElement("h1");
  title.innerText = demo;

  container.appendChild(title);

  if (["interactive"].includes(demo)) {
    const a = document.createElement("a");
    a.style.display = "block";
    a.innerText = demo;
    a.href = `./${demo}.html`;

    container.appendChild(a);
  } else
    for (const g of Object.keys(grid)) {
      const a = document.createElement("a");
      a.style.display = "block";
      a.innerText = `${demo} - ${g}`;
      a.href = `./${demo}.html?grid=${g}`;

      container.appendChild(a);
    }
}
