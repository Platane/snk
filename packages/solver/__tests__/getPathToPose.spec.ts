import { createSnakeFromCells } from "@snk/types/snake";
import { getPathToPose } from "../getPathToPose";

it("should fing path to pose", () => {
  const snake0 = createSnakeFromCells([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ]);
  const target = createSnakeFromCells([
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ]);

  const path = getPathToPose(snake0, target);

  expect(path).toBeDefined();
});
