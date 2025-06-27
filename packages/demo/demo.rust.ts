import { createSnakeFromCells, snakeToCells } from "@snk/types/snake";
import { createCanvas } from "./canvas";
import "./menu";
import { grid, snake } from "./sample";

(async () => {
  const {IColorGrid,IPoint,greet,solve} = await import("@snk/solver-r");
  greet();

  const iColorGrid = IColorGrid.create(grid.width, grid.height, grid.data);
  const iSnake = snakeToCells(snake).map((p) => IPoint.create(p.x, p.y));


  const { canvas, draw, highlightCell } = createCanvas(iColorGrid);
  document.body.appendChild(canvas);
  draw(iColorGrid, snake, []);


  const a = performance.now();
  const path = solve(iColorGrid, iSnake).reverse();
  console.log(performance.now() - a);

  {
    const snakeLength = snake.length / 2;

    const onChange = () => {
      const i = +input.value;
      const s = createSnakeFromCells(path.slice(i, i + snakeLength).reverse());

      const g = {
        width: iColorGrid.width,
        height: iColorGrid.height,
        data: new Uint8Array([...iColorGrid.data as any]),
      };
      for (let j = i; j--; ) {
        const { x, y } = path[j];
        if (x >= 0 && y >= 0 && x < iColorGrid.width && y < iColorGrid.height) {
          const index = x * g.height + y;
          g.data[index] = 0;
        }
      }

      draw(g, s, []);

      for (let j = i + snakeLength; j--; ) {
        highlightCell(path[j].x, path[j].y, "#123bde");
      }
    };

    const input = document.createElement("input") as any;
    input.type = "range";
    input.value = 0;
    input.step = 1;
    input.min = 0;
    input.max = path.length - snakeLength;
    input.style.width = "90%";
    input.style.padding = "20px 0";
    input.addEventListener("input", onChange);
    document.body.append(input);

    onChange();
  }
})();
