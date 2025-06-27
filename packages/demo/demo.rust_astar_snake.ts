import { snakeToCells } from "@snk/types/snake";
import { createCanvas } from "./canvas";
import "./menu";
import { grid, snake } from "./sample";

(async () => {
  const { IColorGrid, IPoint, get_snake_path,greet } = await import("@snk/solver-r");

  greet();

  const colorGrid = IColorGrid.create(grid.width, grid.height, grid.data);

  const { canvas, draw, getPointedCell, highlightCell } =
    createCanvas(colorGrid);
  document.body.appendChild(canvas);

  let end = { x: 5, y: -1 };
  const onChange = () => {
    const isnake = snakeToCells(snake).map((p) => IPoint.create(p.x, p.y));

    const path = get_snake_path(colorGrid, isnake, IPoint.create(end.x, end.y));


    draw(
      {
        width: colorGrid.width,
        height: colorGrid.height,
        data: colorGrid.data,
      },
      snake,
      [],
    );

    if (path)
      for (const p of path) {
        highlightCell(p.x, p.y);
      }
  };
  canvas.addEventListener("mousemove", (e) => {
    const p = getPointedCell(e);
    if( p.x === end.x && p.y === end.y) return

    end = p;
    onChange();
  });
  onChange();
})();
