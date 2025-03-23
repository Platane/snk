import { createCanvas } from "./canvas";
import "./menu";
import { grid } from "./sample";

(async () => {
	const api = await import("@snk/solver-r");

	const g = api.IGrid.create(grid.width, grid.height, grid.data);

	const freeCells = api.iget_free_cell(g);

	{
		const { canvas, draw, highlightCell } = createCanvas(g);
		document.body.appendChild(canvas);

		draw({ width: g.width, height: g.height, data: g.data }, [] as any, []);

		for (let i = freeCells.length / 2; i--; ) {
			const x = freeCells[i * 2 + 0];
			const y = freeCells[i * 2 + 1];
			highlightCell(x, y);
		}
	}
})();
