import { createSnakeFromCells, snakeToCells } from "@snk/types/snake";
import { createCanvas } from "./canvas";
import "./menu";
import { grid, snake } from "./sample";

(async () => {
	const api = await import("@snk/solver-r");

	const g = api.IGrid.create(grid.width, grid.height, grid.data);

	const freeCells = api.iget_free_cells(g);

	api.greet();

	const path = api.ieat_free_cells(
		g,
		snakeToCells(snake).map((p) => api.IPoint.create(p.x, p.y)),
	);

	{
		const { canvas, draw, highlightCell } = createCanvas(g);
		document.body.appendChild(canvas);

		const snakeLength = snake.length / 2;

		const onChange = () => {
			const i = +input.value;
			const s = createSnakeFromCells(path.slice(i, i + snakeLength).reverse());

			draw({ width: g.width, height: g.height, data: g.data }, s, []);

			// for (let i = freeCells.length / 2; i--; ) {
			// 	const x = freeCells[i * 2 + 0];
			// 	const y = freeCells[i * 2 + 1];
			// 	highlightCell(x, y);
			// }
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
