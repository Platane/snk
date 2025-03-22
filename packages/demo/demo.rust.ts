import { createCanvas } from "./canvas";
import "./menu";
import { grid } from "./sample";

(async () => {
	const api = await import("@snk/solver-r");

	const g = api.Grid.create(grid.width, grid.height, grid.data);

	const { canvas, draw, highlightCell } = createCanvas(g);
	document.body.appendChild(canvas);

	draw({ width: g.width, height: g.height, data: g.cells }, [] as any, []);
})();
