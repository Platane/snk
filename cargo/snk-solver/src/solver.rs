use std::{collections::HashMap, iter::once};

use snk_grid::{
    color::Color,
    direction::Direction,
    grid::{Grid, iter_rectangle_fill},
    point::{Point, get_distance},
    snake::{Snake, Snake4},
};

use crate::{
    best_tunnel::{Tunnel, get_best_tunnel_to_collect_point},
    cost::Cost,
    exit_grid::ExitGrid,
    snake_path::get_snake_path,
};

pub const COLORS: [Color; 4] = [Color::Color1, Color::Color2, Color::Color3, Color::Color4];

//
//
fn pop_min<T, F, V>(vec: &mut Vec<T>, get_score: F) -> Option<T>
where
    F: Fn(&T) -> V,
    V: Ord + Copy,
{
    vec.iter()
        .enumerate()
        .fold(None, |min, (i, candidate)| {
            let score = get_score(candidate);

            if let Some((_, min_score)) = min
                && min_score <= score
            {
                min
            } else {
                Some((i, score))
            }
        })
        .map(|(i, _)| vec.swap_remove(i))
}

pub fn solve(color_grid: &Grid<Color>, snake: &Snake4) -> Vec<Direction> {
    let mut exit_grid = ExitGrid::create_from_grid_color(color_grid);
    let mut color_grid = color_grid.clone();

    let mut snake = snake.clone();
    let mut path = Vec::new();

    let add_sub_path = |sub_path: Vec<Direction>| {};

    for color in COLORS.into_iter() {
        let to_collect = iter_rectangle_fill(color_grid.width, color_grid.height)
            .filter(|p| color_grid.get_color(*p) == color)
            .map(|p| {
                let tunnel = get_best_tunnel_to_collect_point(&color_grid, &exit_grid, p);
                (p, tunnel)
            });

        let (mut free_to_collect, mut rest): (Vec<_>, Vec<_>) = to_collect
            .partition(|(_, tunnel)| tunnel.in_cost + tunnel.out_cost < Cost::from(color) * 64);

        // this is a  Travelling Salesman problem
        // (that i am not interested in solving)
        loop {
            let head = snake.get_head();

            // take the point with the lowest distance to the head
            if let Some((point, _)) = pop_min(&mut free_to_collect, |(point, _)| {
                get_distance(*point, head)
            }) {
                log::info!("{:?} {:?}", color_grid, point);

                // path find from the snake to the point
                // (it should be able to do so without eating walls)
                let (sub_path, _) =
                    get_snake_path(&color_grid, &snake, point, Cost::from(color) * 64).unwrap();

                // traverse the path to update the grid
                for dir in sub_path.into_iter() {
                    snake.move_snake(dir);
                    path.push(dir);

                    let p = snake.get_head();
                    if !color_grid.get_color(p).is_empty() {
                        color_grid.set(p, Color::Empty);
                        exit_grid.update_after_grid_change(&color_grid, once(p));
                    }
                }
            } else {
                break;
            }
        }

        loop {
            // todo group the point with the same score and take the closest
            if let Some((point, tunnel)) = pop_min(&mut rest, |(_, tunnel)| {
                tunnel.in_cost * 3 + tunnel.out_cost * 2
            }) {
                // path find from the snake to the point
                let (sub_path, _) = get_snake_path(
                    &color_grid,
                    &snake,
                    point,
                    Cost::max(),
                    // tunnel.in_cost + Cost::from(Color::Color1) ,
                )
                .unwrap();

                // traverse the path to update the grid
                for dir in sub_path.into_iter() {
                    snake.move_snake(dir);
                    path.push(dir);

                    let p = snake.get_head();

                    if !color_grid.get_color(p).is_empty() {
                        color_grid.set(p, Color::Empty);
                        exit_grid.update_after_grid_change(&color_grid, once(p));
                    }
                }
            } else {
                break;
            }

            rest = rest
                .iter()
                .filter_map(|(p, tunnel)| {
                    if color_grid.get_color(*p).is_empty() {
                        return None;
                    }

                    // TODO avoid recomputing if the tunnel is the same
                    // we can probably infer that from the exit_grid (?)
                    let tunnel = get_best_tunnel_to_collect_point(&color_grid, &exit_grid, *p);
                    Some((*p, tunnel))
                })
                .collect();
        }
    }

    path
}

#[cfg(test)]
mod tests {
    use crate::fitness::get_solution_fitness;

    use super::*;
    use snk_grid::{
        grid_samples::{SAMPLEGRIDS, SampleGrid, get_grid_sample},
        point::Point,
        snake::Snake4,
    };

    #[test]
    fn it_should_find_solution_for_empty_grid() {
        let grid = get_grid_sample(SampleGrid::Empty);
        let snake = Snake4::from_points([
            Point { x: 0, y: -1 },
            Point { x: 1, y: -1 },
            Point { x: 2, y: -1 },
            Point { x: 3, y: -1 },
        ]);
        let solution = solve(&grid, &snake);

        println!("{:?}", solution);

        let fitness = get_solution_fitness(&grid, snake, solution);

        assert_eq!(
            fitness.remaining_color_count, 0,
            "Remaining color count should be 0"
        );
        assert_eq!(
            fitness.stack_fitness, 0,
            "Stack should be perfectly orderer"
        );
    }

    #[test]
    fn it_should_find_solution_for_one_dot() {
        let grid = get_grid_sample(SampleGrid::OneDot);
        let snake = Snake4::from_points([
            Point { x: 0, y: -1 },
            Point { x: 1, y: -1 },
            Point { x: 2, y: -1 },
            Point { x: 3, y: -1 },
        ]);
        let solution = solve(&grid, &snake);

        println!("{:?}", solution);

        let fitness = get_solution_fitness(&grid, snake, solution);

        assert_eq!(
            fitness.remaining_color_count, 0,
            "Remaining color count should be 0"
        );
        assert_eq!(
            fitness.stack_fitness, 0,
            "Stack should be perfectly orderer"
        );
    }

    #[test]
    fn it_should_find_solution_for_some_colors() {
        let grid = Grid::<_>::from(
            r#"
_            _
_  4 2 3 1   _
_            _
    "#,
        );
        let snake = Snake4::from_points([
            Point { x: 0, y: -1 },
            Point { x: 1, y: -1 },
            Point { x: 2, y: -1 },
            Point { x: 3, y: -1 },
        ]);
        let solution = solve(&grid, &snake);

        println!("{:?}", solution);

        let fitness = get_solution_fitness(&grid, snake, solution);

        assert_eq!(
            fitness.remaining_color_count, 0,
            "Remaining color count should be 0"
        );
        assert_eq!(
            fitness.stack_fitness, 0,
            "Stack should be perfectly orderer"
        );
    }

    #[test]
    fn it_should_find_solution_for_one_cave() {
        let grid = get_grid_sample(SampleGrid::OneCave);
        let snake = Snake4::from_points([
            Point { x: 0, y: -1 },
            Point { x: 1, y: -1 },
            Point { x: 2, y: -1 },
            Point { x: 3, y: -1 },
        ]);
        let solution = solve(&grid, &snake);

        println!("{:?}", solution);

        let fitness = get_solution_fitness(&grid, snake, solution);

        assert_eq!(
            fitness.remaining_color_count, 0,
            "Remaining color count should be 0"
        );
        assert_eq!(
            fitness.stack_fitness, 0,
            "Stack should be perfectly orderer"
        );
    }

    #[test]
    fn it_should_find_solution_for_one_small_cave() {
        let grid = get_grid_sample(SampleGrid::OneSmallCave);
        let snake = Snake4::from_points([
            Point { x: 0, y: -1 },
            Point { x: 1, y: -1 },
            Point { x: 2, y: -1 },
            Point { x: 3, y: -1 },
        ]);
        let solution = solve(&grid, &snake);

        println!("{:?}", solution);

        let fitness = get_solution_fitness(&grid, snake, solution);

        assert_eq!(
            fitness.remaining_color_count, 0,
            "Remaining color count should be 0"
        );
    }

    #[test]
    #[ignore]
    fn it_should_found_solution_for_labyrinth() {
        let grid = get_grid_sample(SampleGrid::Labyrinth);
        let snake = Snake4::from_points([
            Point { x: 0, y: -1 },
            Point { x: 1, y: -1 },
            Point { x: 2, y: -1 },
            Point { x: 3, y: -1 },
        ]);
        let solution = solve(&grid, &snake);

        println!("{:?}", solution);

        let fitness = get_solution_fitness(&grid, snake, solution);

        assert_eq!(
            fitness.remaining_color_count, 0,
            "Remaining color count should be 0"
        );
        assert_eq!(
            fitness.stack_fitness, 0,
            "Stack should be perfectly orderer"
        );
    }

    #[test]
    #[ignore]
    fn it_should_found_solution_with_no_remaining_colors() {
        for s in SAMPLEGRIDS {
            let grid = get_grid_sample(s);
            let snake = Snake4::from_points([
                Point { x: 0, y: -1 },
                Point { x: 1, y: -1 },
                Point { x: 2, y: -1 },
                Point { x: 3, y: -1 },
            ]);
            let solution = solve(&grid, &snake);

            let fitness = get_solution_fitness(&grid, snake, solution);

            assert_eq!(
                fitness.remaining_color_count, 0,
                "Remaining color count should be 0"
            );
        }
    }
}
