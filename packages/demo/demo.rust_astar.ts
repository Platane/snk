import { createCanvas } from "./canvas";
import "./menu";
import { grid } from "./sample";

(async () => {
  const api = await import("@snk/solver-r");

  const g = api.IGrid.create(grid.width, grid.height, grid.data);
  const path = api.iastar(
    g,
    api.IPoint.create(-1, 0),
    api.IPoint.create(47, 4),
  );

  {
    const { canvas, draw, highlightCell } = createCanvas(g);
    document.body.appendChild(canvas);

    draw({ width: g.width, height: g.height, data: g.data }, [] as any, []);

    if (path)
      for (const p of path) {
        highlightCell(p.x, p.y);
      }
  }
})();
