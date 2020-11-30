import ParkMiller from "park-miller";
import { Color, createEmptyGrid, setColor } from "../grid";
import { randomlyFillGrid } from "../randomlyFillGrid";
import { createFromAscii } from "./createFromAscii";

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

export const enclaveN = createFromAscii(`

  #.#  
   #

`);
export const enclaveBorder = createFromAscii(`
  #.#  
   #

`);
export const enclaveM = createFromAscii(`

   ###  
  #   #
  # . #
  #   #
   # #
`);

export const enclaveK = createFromAscii(`

  ####  
  # .#
  #  #
   # #
   # #
`);
export const enclaveU = createFromAscii(`

  ####  
  #..#
  #..#
   #.#
   # #          .
`);
export const closedP = createFromAscii(`

   ### 
  ##.#
  ## #
   ##
`);
export const closedU = createFromAscii(`

  ####  
  #..#
  #..#
   #.#
   ###
`);
export const closedO = createFromAscii(`

  #######  
  #     #
  #  .  #
  #     #
  #######
`);
export const tunnels = createFromAscii(`

  ###   ###   ###    
  #.#   #.#   #.#
  #.#   ###   # #
`);

const createRandom = (width: number, height: number, emptyP: number) => {
  const grid = createEmptyGrid(width, height);
  const pm = new ParkMiller(10);
  const random = pm.integerInRange.bind(pm);
  randomlyFillGrid(grid, { colors, emptyP }, random);
  return grid;
};

// small realistic
export const small = createRandom(10, 7, 3);
export const smallPacked = createRandom(10, 7, 1);
export const smallFull = createRandom(10, 7, 0);

// small realistic
export const realistic = createRandom(52, 7, 3);
export const realisticFull = createRandom(52, 7, 0);
