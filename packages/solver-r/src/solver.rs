use std::collections::HashSet;

use crate::exitable::propagate_exitable;
use crate::grid::{Color, Grid, Point, DIRECTIONS};
use crate::snake_walk::get_path_to_eat_all;

pub fn get_path_to_eat_everything(color_grid: &Grid<Color>, snake: &[Point]) -> Vec<Point> {
    let mut color_grid = color_grid.clone();

    // cell from which the outside is reachable
    let mut exitable_cells = HashSet::new();

    let snake_len = snake.len();
    let mut path = snake.to_vec();

    for walkable in [Color::Color1, Color::Color2, Color::Color3, Color::Color4] {
        propagate_exitable(&mut exitable_cells, &color_grid, walkable);

        //
        // let's eat the one that don't require to traverse walls
        let mut exitable_eatable = exitable_cells.clone();
        exitable_eatable.retain(|p| color_grid.get(p) == walkable);

        let snake = &path[0..snake_len];
        let (mut sub_path, cells_unexitable) =
            get_path_to_eat_all(&color_grid, walkable, snake, &exitable_eatable);

        sub_path.append(&mut path);
        path = sub_path;

        //
        // let's eat the one that are reachable but not exitable
    }

    path
}
