import { snakeToCells } from "@snk/types/snake";
import { createCanvas } from "./canvas";
import "./menu";
import { grid, snake } from "./sample";

(async () => {
	const api = await import("@snk/solver-r");

	const g = api.IGrid.create(grid.width, grid.height, grid.data);
	const path = api.iastar_snake(
		g,
		snakeToCells(snake).map((p) => api.IPoint.create(p.x, p.y)),
		api.IPoint.create(7, 2),
	);

	console.log(snakeToCells(snake).map((p) => api.IPoint.create(p.x, p.y)));

	{
		const { canvas, draw, highlightCell } = createCanvas(g);
		document.body.appendChild(canvas);

		draw({ width: g.width, height: g.height, data: g.data }, [] as any, []);

		console.log(path);

		if (path)
			for (const p of path) {
				highlightCell(p.x, p.y);
			}
	}
})();
