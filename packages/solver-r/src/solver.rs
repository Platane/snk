use std::collections::HashSet;

use crate::exitable::propagate_exitable;
use crate::grid::{Cell, Grid, Point, WalkableGrid, DIRECTIONS};
use crate::snake_walk::get_path_to_eat_all;

pub fn get_path_to_eat_everything(grid: &Grid, snake: &[Point]) -> Vec<Point> {
    let mut grid = WalkableGrid::create(grid.clone(), Cell::Color1);

    // cell from which the outside is reachable
    let mut exitable_cells = HashSet::new();

    let snake_len = snake.len();
    let mut path = snake.to_vec();

    for walkable in [Cell::Color1] {
        grid.set_walkable(walkable);

        propagate_exitable(&mut exitable_cells, &grid);

        //
        // let's eat the one that don't require to traverse walls
        let mut exitable_eatable = exitable_cells.clone();
        exitable_eatable.retain(|p| grid.get_cell(p) == walkable);

        let snake = &path[0..snake_len];
        let (mut sub_path, cells_unexitable) = get_path_to_eat_all(&grid, snake, &exitable_eatable);

        sub_path.append(&mut path);
        path = sub_path;

        //
        // let's eat the one that are reachable but not exitable
    }

    path
}
