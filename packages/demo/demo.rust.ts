import { createSnakeFromCells, snakeToCells } from "@snk/types/snake";
import { createCanvas } from "./canvas";
import "./menu";
import { grid, snake } from "./sample";

(async () => {
	const api = await import("@snk/solver-r");

	const g = api.IGrid.create(grid.width, grid.height, grid.data);

	const { canvas, draw, highlightCell } = createCanvas(g);
	document.body.appendChild(canvas);
	draw({ width: g.width, height: g.height, data: g.data }, snake, []);

	api.greet();

	const a = performance.now();
	const path = api.ieat_free_cells(
		g,
		snakeToCells(snake).map((p) => api.IPoint.create(p.x, p.y)),
	);
	console.log(performance.now() - a);

	{
		const snakeLength = snake.length / 2;

		const onChange = () => {
			const i = +input.value;
			const s = createSnakeFromCells(path.slice(i, i + snakeLength).reverse());

			draw({ width: g.width, height: g.height, data: g.data }, s, []);

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
