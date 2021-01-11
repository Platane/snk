# @snk/solver

Contains the algorithm to compute the best route given a grid and a starting position for the snake.

## Implementation

- for each color in the grid

- 1\ **clear residual color** phase

  - find all the cells of a previous color that are "tunnel-able" ( ie: the snake can find a path from the outside of the grid to the cell, and can go back to the outside without colliding ). The snake is allowed to pass thought current and previous color. Higher colors are walls

  - sort the "tunnel-able" cell, there is penalty for passing through current color, as previous color should be eliminated as soon as possible.

  - for cells with the same score, take the closest one ( determined with a quick mathematic distance, which is not accurate but fast at least )

  - navigate to the cell, and through the tunnel.

  - re-compute the list of tunnel-able cells ( as eating cells might have freed better tunnel ) as well as the score

  - iterate

- 2\ **clear clean color** phase

  - find all the cells of the current color that are "tunnel-able"

  - no need to consider scoring here. In order to improve efficiency, get the closest cell by doing a tree search ( instead of a simple mathematic distance like in the previous phase )

  - navigate to the cell, and through the tunnel.

  - iterate

- go back to the starting point
