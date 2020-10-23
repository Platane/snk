import ParkMiller from "park-miller";
import { Color, createEmptyGrid, setColor } from "../grid";
import { randomlyFillGrid } from "../randomlyFillGrid";

const colors = [1, 2, 3] as Color[];

// empty small grid
export const empty = createEmptyGrid(5, 5);

// empty small grid with a unique color at the middle
export const simple = createEmptyGrid(5, 5);
setColor(simple, 2, 2, 1 as Color);

// empty small grid with color at each corner
export const corner = createEmptyGrid(5, 5);
setColor(corner, 0, 4, 1 as Color);
setColor(corner, 4, 0, 1 as Color);
setColor(corner, 4, 4, 1 as Color);
setColor(corner, 0, 0, 1 as Color);

export const enclave = createEmptyGrid(7, 7);
setColor(enclave, 3, 4, 2 as Color);
setColor(enclave, 2, 3, 2 as Color);
setColor(enclave, 2, 4, 2 as Color);
setColor(enclave, 4, 4, 2 as Color);
setColor(enclave, 4, 3, 2 as Color);
setColor(enclave, 3, 3, 1 as Color);
setColor(enclave, 5, 5, 1 as Color);

export const enclaveBorder = createEmptyGrid(7, 7);
setColor(enclaveBorder, 1, 0, 3 as Color);
setColor(enclaveBorder, 2, 1, 3 as Color);
setColor(enclaveBorder, 3, 0, 3 as Color);
setColor(enclaveBorder, 2, 0, 1 as Color);

export const enclaveM = createEmptyGrid(7, 7);
setColor(enclaveM, 1, 0, 3 as Color);
setColor(enclaveM, 2, 0, 3 as Color);
setColor(enclaveM, 3, 0, 3 as Color);
setColor(enclaveM, 1, 4, 3 as Color);
setColor(enclaveM, 3, 4, 3 as Color);
setColor(enclaveM, 4, 1, 3 as Color);
setColor(enclaveM, 4, 2, 3 as Color);
setColor(enclaveM, 4, 3, 3 as Color);
setColor(enclaveM, 0, 1, 3 as Color);
setColor(enclaveM, 0, 2, 3 as Color);
setColor(enclaveM, 0, 3, 3 as Color);
setColor(enclaveM, 2, 2, 1 as Color);

export const enclaveK = createEmptyGrid(7, 7);
setColor(enclaveK, 1, 1, 3 as Color);
setColor(enclaveK, 2, 1, 3 as Color);
setColor(enclaveK, 3, 1, 3 as Color);
setColor(enclaveK, 0, 1, 3 as Color);
setColor(enclaveK, 0, 2, 3 as Color);
setColor(enclaveK, 0, 3, 3 as Color);
setColor(enclaveK, 3, 1, 3 as Color);
setColor(enclaveK, 3, 2, 3 as Color);
setColor(enclaveK, 3, 3, 3 as Color);
setColor(enclaveK, 1, 4, 3 as Color);
setColor(enclaveK, 3, 4, 3 as Color);
setColor(enclaveK, 3, 5, 3 as Color);
setColor(enclaveK, 1, 5, 3 as Color);
setColor(enclaveK, 2, 2, 1 as Color);

export const enclaveU = createEmptyGrid(17, 9);
setColor(enclaveU, 1, 1, 3 as Color);
setColor(enclaveU, 2, 1, 3 as Color);
setColor(enclaveU, 3, 1, 3 as Color);
setColor(enclaveU, 0, 1, 3 as Color);
setColor(enclaveU, 0, 2, 3 as Color);
setColor(enclaveU, 0, 3, 3 as Color);
setColor(enclaveU, 3, 1, 3 as Color);
setColor(enclaveU, 3, 2, 3 as Color);
setColor(enclaveU, 3, 3, 3 as Color);
setColor(enclaveU, 1, 4, 3 as Color);
setColor(enclaveU, 3, 4, 3 as Color);
setColor(enclaveU, 3, 5, 3 as Color);
setColor(enclaveU, 1, 5, 3 as Color);
setColor(enclaveU, 2, 2, 1 as Color);
setColor(enclaveU, 1, 2, 1 as Color);
setColor(enclaveU, 2, 3, 1 as Color);
setColor(enclaveU, 1, 3, 1 as Color);
setColor(enclaveU, 2, 4, 1 as Color);
setColor(enclaveU, 16, 8, 1 as Color);

const create = (width: number, height: number, emptyP: number) => {
  const grid = createEmptyGrid(width, height);
  const pm = new ParkMiller(10);
  const random = pm.integerInRange.bind(pm);
  randomlyFillGrid(grid, { colors, emptyP }, random);
  return grid;
};

// small realistic
export const small = create(10, 7, 3);
export const smallPacked = create(10, 7, 1);
export const smallFull = create(10, 7, 0);

// small realistic
export const realistic = create(52, 7, 3);
export const realisticFull = create(52, 7, 0);
