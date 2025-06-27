use std::collections::HashSet;

use crate::astar_snake::get_snake_path;
use crate::exit_cost_grid::{
    create_empty_exit_cost_grid, is_freely_exitable_with_walkable, propagate_exit_cost_grid,
    ExitCostGrid,
};
use crate::exitable::propagate_exitable;
use crate::grid::{get_distance, Color, Grid, Point};
use crate::snake_walk::{can_snake_reach_outside, get_path_to_eat_all};

const MAX_ROUTE_LENGTH: usize = 260;

pub fn get_path_to_eat_everything(color_grid: &Grid<Color>, snake: &[Point]) -> Vec<Point> {
    let snake_len = snake.len();
    let mut path = snake.to_vec();

    let mut color_grid = color_grid.clone();
    let mut exit_cost_grid: ExitCostGrid = create_empty_exit_cost_grid(&color_grid);
    propagate_exit_cost_grid(&mut exit_cost_grid, &color_grid);

    for walkable in [Color::Color1, Color::Color2, Color::Color3, Color::Color4] {
        //
        // go through all the editable as long are it's free to access and to exit
        //

        // list the cells that can be exited with 0 cost
        // Notice that there is no guarantee that the snake can go to the cell and back
        let mut cells_to_eat: Vec<_> = color_grid
            .iter()
            .filter(|p| {
                color_grid.get(p) > Color::Empty
                    && color_grid.get(p) <= walkable
                    && is_freely_exitable_with_walkable(&exit_cost_grid, walkable, p)
            })
            .collect();

        while true {
            let snake = &path[0..snake_len];
            let head = path[0];

            //
            // given the current snake position,
            // get the route to the best cell
            //
            let mut best_cell_route: Option<Vec<Point>> = None;

            // sort the list of cells to eat by distance to the current head of the snake
            cells_to_eat.sort_by(|a, b| get_distance(a, &head).cmp(&get_distance(b, &head)));

            // to speed up the pathfinding, forbid the snake to go too far outside the grid
            // it should still be able to maneuver so let's give it some margin depending on its length
            let grid_margin = (snake_len as i8 + 1) / 2;

            for p in cells_to_eat.iter() {
                // limit the maximal length of an accepted solution
                // if a path as already been found for another target, not need to find a worse one
                let max_weight = match best_cell_route.as_ref() {
                    None => MAX_ROUTE_LENGTH,
                    Some(path) => path.len() - snake_len,
                };

                let res_sub_path = get_snake_path(
                    |c| {
                        color_grid.is_walkable(walkable, c)
                            && color_grid.is_inside_margin(c, grid_margin)
                    },
                    snake,
                    p,
                    max_weight,
                );

                if let Some(sub_path) = res_sub_path {
                    if best_cell_route
                        .as_ref()
                        .is_none_or(|r| sub_path.len() < r.len())
                    {
                        let next_snake = &sub_path[0..snake_len];
                        if can_snake_reach_outside(&color_grid, walkable, next_snake) {
                            best_cell_route = Some(sub_path);
                        }
                    }
                }
            }

            if let Some(mut sub_path) = best_cell_route {
                //
                // remove the eaten cell
                let eaten_cell = sub_path[0];
                cells_to_eat.retain(|p| *p != eaten_cell);

                color_grid.set(&eaten_cell, Color::Empty);

                //
                // add the path (on the beginning)
                sub_path.truncate(sub_path.len() - snake_len);
                sub_path.append(&mut path);
                path = sub_path;
            } else {
                break;
            }
        }

        //
        // go through all the editable as long are it's free to access and to exit
        //
        let mut cells_to_eat: Vec<_> = color_grid
            .iter()
            .filter(|p| color_grid.get(p) > Color::Empty && color_grid.get(p) <= walkable)
            .collect();

        log::info!("cells_to_eat {:?}", cells_to_eat);
    }

    path
}

pub fn get_snake_exitable_path<F>(
    walkable: F,
    outside: F,
    snake: &[Point],
    end: &Point,
    max_weight: usize,
) -> Option<Vec<Point>>
where
    F: Fn(&Point) -> bool,
{
    let res_sub_path = get_snake_path(walkable, snake, end, max_weight);

    if res_sub_path.is_some() {
        return res_sub_path;
    }

    None
}

pub fn _get_path_to_eat_everything(color_grid: &Grid<Color>, snake: &[Point]) -> Vec<Point> {
    let mut color_grid = color_grid.clone();

    // cell from which the outside is reachable
    let mut exitable_cells = HashSet::new();

    let snake_len = snake.len();
    let mut path = snake.to_vec();

    for walkable in [Color::Color1, Color::Color2, Color::Color3, Color::Color4] {
        propagate_exitable(&mut exitable_cells, &color_grid, walkable);

        log::info!("hola");

        //
        // let's eat the one that don't require to traverse walls
        let mut exitable_eatable = exitable_cells.clone();
        exitable_eatable.retain(|p| color_grid.get(p) == walkable);

        log::info!("exitable_eatable {:?}", exitable_eatable);

        let snake = &path[0..snake_len];
        let (mut sub_path, cells_unexitable) =
            get_path_to_eat_all(&color_grid, walkable, snake, &exitable_eatable);

        for p in sub_path.iter() {
            color_grid.set(&p, Color::Empty);
        }

        log::info!("cells_unexitable {:?}", cells_unexitable);
        println!("{:?}", cells_unexitable);

        sub_path.append(&mut path);
        path = sub_path;

        //
        // let's eat the one that are reachable but not exitable

        // let exit_cost_grid = get_exit_cost_grid(&color_grid);

        return path;
    }

    path
}
