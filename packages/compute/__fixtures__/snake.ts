// @ts-ignore
import { createSnake } from "../snake";

const create = (length: number) =>
  createSnake(Array.from({ length }, (_, i) => ({ x: i, y: -1 })));

export const snake1 = create(1);
export const snake3 = create(3);
export const snake5 = create(5);
export const snake9 = create(9);
