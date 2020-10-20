# implementation

## target

The goal is have the stack of eaten color as sorted as possible.

The number of step is not very optimized as for now.

## algorithm

- for each type of color in the grid

  - determine all the "free" cell of that color.

  > a free cell can be reached by going through only empty cell ( or cell of the same color )
  >
  > basically, grabbing those cells have no penalty since we don't touch other color to get to the cell and to leave the cell

  - eat all the free cells (without optimizing the path for the sake of performance)

  - repeat for the next color, consider the current color as the same color

## future

- have an intermediate phase where we eat the remaining cell that are not free, to get rid of them before the next "eat free cells" phase

- use a better heuristic to allows to optimize the number of steps in the "eat free cells" phase
