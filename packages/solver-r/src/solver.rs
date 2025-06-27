use std::collections::HashSet;

use crate::astar_snake::get_snake_path;
use crate::cave::{get_cave_map, Cave};
use crate::exit_cost_grid::{create_empty_exit_cost_grid, propagate_exit_cost_grid, ExitCostGrid};
use crate::exitable::propagate_exitable;
use crate::grid::{get_distance, Color, Grid, Point};

const MAX_ROUTE_LENGTH: usize = 260;

pub fn get_path_to_eat_everything(color_grid: &Grid<Color>, snake: &[Point]) -> Vec<Point> {
    let snake_len = snake.len();
    let mut path = snake.to_vec();

    let mut color_grid = color_grid.clone();
    let mut exit_cost_grid: ExitCostGrid = create_empty_exit_cost_grid(&color_grid);
    propagate_exit_cost_grid(&mut exit_cost_grid, &color_grid);

    for walkable in [Color::Color1, Color::Color2, Color::Color3, Color::Color4] {
        let caves = get_cave_map(&color_grid, walkable);

        //
        // first clean the outside cave
        //
        let mut cells_to_eat: Vec<_> = caves[0]
            .cells
            .iter()
            .filter(|p| color_grid.get(p) == walkable)
            .collect();

        while !cells_to_eat.is_empty() {
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
                        .is_none_or(|best| sub_path.len() < best.len())
                    {
                        best_cell_route = Some(sub_path);
                    }
                }
            }

            if let Some(mut sub_path) = best_cell_route {
                //
                // remove the eaten cell
                let eaten_cell = sub_path[0];
                cells_to_eat.retain(|p| eaten_cell.ne(p));

                color_grid.set(&eaten_cell, Color::Empty);

                //
                // add the path (on the beginning)
                sub_path.truncate(sub_path.len() - snake_len);
                sub_path.append(&mut path);
                path = sub_path;
            } else {
                break;
                log::info!("break without eating all {:?}", cells_to_eat);
            }
        }

        //
        // then determine the next bests cave to open
        //
        let mut best_cave: Option<(&Cave,i32)> = None;

        let head = &path[0];

        for cave in caves {

            let cell_inside_count = cave.cells.iter().fold(0, |sum,p| sum + (color_grid.get(p) == walkable) as i32 );

            let cell0 = &cave.cells[0];
            let distance = get_distance(cell0, head);

            let cost_enter = exit_cost_grid.get(cell0);

            let score = cell_inside_count - (cost_enter as i32) * 8    - (distance as i32);

            if best_cave.is_none_or(| (_,s) | s < score ) {
                best_cave = Some( (&cave,score) );
            }
        }

                log::info!("caves {:?}", caves);
    }

    path
}
