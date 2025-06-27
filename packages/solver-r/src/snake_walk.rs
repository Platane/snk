use std::collections::HashSet;

use crate::astar_snake::get_snake_path;
use crate::grid::{get_distance, Color, Grid, Point, DIRECTIONS};
use crate::snake::Snake;

pub fn can_snake_reach_outside(color_grid: &Grid<Color>, walkable: Color, snake: &[Point]) -> bool {
    let mut open_list: Vec<Snake> = Vec::new();
    open_list.push(snake.to_vec());

    let mut close_list: HashSet<Snake> = HashSet::new();

    while let Some(snake) = open_list.pop() {
        for dir in DIRECTIONS {
            let next_head = Point {
                x: snake[0].x + dir.x,
                y: snake[0].y + dir.y,
            };

            let head_collide_with_body = snake.contains(&next_head);

            if head_collide_with_body {
                continue;
            }

            if !color_grid.is_inside(&next_head) {
                return true;
            }

            if !(color_grid.is_walkable(walkable, &next_head)) {
                continue;
            }

            let next_snake = {
                let mut s = snake.clone();
                s.truncate(s.len() - 1);
                s.insert(0, next_head);
                s
            };

            if close_list.contains(&next_snake) {
                continue;
            }

            open_list.push(next_snake);
        }

        close_list.insert(snake);
    }

    false
}

pub fn get_snake_path_to_outside(
    color_grid: &Grid<Color>,
    walkable: Color,
    snake: &[Point],
) -> Option<Vec<Point>> {
    let snake_length = snake.len();

    let mut open_list: Vec<Snake> = Vec::new();
    open_list.push(snake.to_vec());

    let mut close_list: HashSet<Snake> = HashSet::new();

    while let Some(path) = open_list.pop() {
        for dir in DIRECTIONS {
            let next_head = Point {
                x: path[0].x + dir.x,
                y: path[0].y + dir.y,
            };

            let head_collide_with_body = (0..snake_length).any(|i| path[i] == next_head);

            if head_collide_with_body {
                continue;
            }

            if !color_grid.is_inside(&next_head) {
                let mut path = path.clone();
                path.insert(0, next_head);
                return Some(path);
            }

            if color_grid.get(&next_head) <= walkable {
                continue;
            }

            let next_path = {
                let mut path = path.clone();
                path.insert(0, next_head);
                path
            };

            let next_snake = &next_path[0..snake_length];

            if close_list.contains(next_snake) {
                continue;
            }

            open_list.push(next_path);
        }

        let snake = &path[0..snake_length];
        close_list.insert(snake.to_vec());
    }

    None
}

pub fn get_exitable_snake_path(
    color_grid: &Grid<Color>,
    walkable: Color,
    snake: &[Point],
    end: &Point,
    max_weight: usize,
    grid_margin: i8,
) -> Option<Vec<Point>> {
    let snake_len = snake.len();

    let res_sub_path = get_snake_path(
        |c| {
            (!color_grid.is_inside(c) || color_grid.get(c) <= walkable)
                && color_grid.is_inside_margin(c, grid_margin)
        },
        snake,
        end,
        max_weight,
    );

    if let Some(sub_path) = res_sub_path {
        let next_snake = &sub_path[0..snake_len];

        if can_snake_reach_outside(color_grid, walkable, next_snake) {
            return Some(sub_path);
        }
    }

    //
    let mut path_to_outside = get_snake_path_to_outside(color_grid, walkable, snake)
        .expect("Snake could not reach the outside");
    let outside_direction = {
        if path_to_outside[0].y < 0 {
            Point { x: 0, y: -1 }
        } else if path_to_outside[0].y >= color_grid.height as i8 {
            Point { x: 0, y: 1 }
        } else if path_to_outside[0].x < 0 {
            Point { x: -1, y: 0 }
        } else if path_to_outside[0].x >= color_grid.width as i8 {
            Point { x: 1, y: 0 }
        } else {
            panic!("get_snake_path_to_outside did not lead to outside");
        }
    };
    for _ in 0..((snake_len + 1) / 2) {
        let p = Point {
            x: path_to_outside[0].x + outside_direction.x,
            y: path_to_outside[0].y + outside_direction.y,
        };
        path_to_outside.insert(0, p);
    }

    let snake_outside = &path_to_outside[0..snake_len];
    let mut sub_path = get_snake_path(
        |c| !color_grid.is_inside(c) || color_grid.get(c) <= walkable,
        snake_outside,
        &end,
        max_weight,
    )
    .expect("Some cell is not reachable, again");

    let next_snake = &sub_path[0..snake_len];
    if can_snake_reach_outside(color_grid, walkable, next_snake) {
        sub_path.truncate(sub_path.len() - snake_len);
        sub_path.append(&mut path_to_outside);
        return Some(sub_path);
    }

    None
}

// const MAX_ROUTE_LENGTH: usize = usize::MAX;
const MAX_ROUTE_LENGTH: usize = 260;

/**
* return a path that make the snake traverse all the cells to eat
* except the cells that the snake could reach, but not exit freely without hitting a wall
* those "unexitable" cell will be returned too
*
* ensure that all the cells to eat are at least "reachable" by the snake (ie not inside a hull) or the get_snake_path will take a while (and will panic)
*
*/
pub fn get_path_to_eat_all(
    color_grid: &Grid<Color>,
    walkable: Color,
    snake: &[Point],
    cells_to_eat: &HashSet<Point>,
) -> (Vec<Point>, HashSet<Point>) {
    let snake_length = snake.len();

    // element 0 is the snake head
    let mut path: Vec<Point> = Vec::new();

    let mut cells_to_eat: Vec<_> = cells_to_eat.into_iter().collect();
    let mut cells_unexitable: HashSet<Point> = HashSet::new();

    path.append(&mut snake.to_vec());

    while !cells_to_eat.is_empty() {
        let snake = &path[0..snake_length];
        let head = path[0];

        let mut best_route: Option<Vec<Point>> = None;

        // sort the list of cells to eat by distance to the current head of the snake
        cells_to_eat.sort_by(|a, b| get_distance(a, &head).cmp(&get_distance(b, &head)));

        // to speed up the pathfinding, forbid the snake to go too far outside the grid
        // it should still be able to maneuver so let's give it some margin depending on its length
        let grid_margin = (snake_length as i8 + 1) / 2;

        for p in cells_to_eat.iter() {
            // limit the maximal length of an accepted solution
            // if a path as already been found for another target, not need to find a worse one
            let max_weight = match best_route.as_ref() {
                None => MAX_ROUTE_LENGTH,
                Some(path) => path.len() - snake_length,
            };

            let res_sub_path = get_snake_path(
                |c| {
                    (!color_grid.is_inside(c) || color_grid.get(c) <= walkable)
                        && color_grid.is_inside_margin(c, grid_margin)
                },
                snake,
                p,
                max_weight,
            );

            if let Some(sub_path) = res_sub_path {
                //
                // is it the route better yet ?
                let sub_path_is_better =
                    best_route.as_ref().is_none_or(|r| sub_path.len() < r.len());

                if sub_path_is_better {
                    //
                    // ensure this does not lead to a position where the snake is stuck
                    let next_snake = &sub_path[0..snake_length];

                    if !can_snake_reach_outside(color_grid, walkable, next_snake) {
                        best_route = Some(sub_path);
                    }
                }
            }
        }

        // at this stage if best_route is still none,
        // it's because all the remaining cells_to_eat are reachable (or we would have panic) but not exitable when starting from the current snake
        // let's move the snake and try again
        // NOTE: we could do that as part of the previous loop, but I am afraid it's way more costly
        if best_route.is_none() {
            // for p in cells_to_eat.iter() {
            for i in (0..cells_to_eat.len()).rev() {
                let p = cells_to_eat[i];

                // let's got to the outside
                // and check again

                let mut path_to_outside = get_snake_path_to_outside(color_grid, walkable, snake)
                    .expect("Snake could not reach the outside");
                let outside_direction = {
                    if path_to_outside[0].y < 0 {
                        Point { x: 0, y: -1 }
                    } else if path_to_outside[0].y >= color_grid.height as i8 {
                        Point { x: 0, y: 1 }
                    } else if path_to_outside[0].x < 0 {
                        Point { x: -1, y: 0 }
                    } else if path_to_outside[0].x >= color_grid.width as i8 {
                        Point { x: 1, y: 0 }
                    } else {
                        panic!("get_snake_path_to_outside did not lead to outside");
                    }
                };
                for _ in 0..((snake_length + 1) / 2) {
                    let p = Point {
                        x: path_to_outside[0].x + outside_direction.x,
                        y: path_to_outside[0].y + outside_direction.y,
                    };
                    path_to_outside.insert(0, p);
                }

                let snake_outside = &path_to_outside[0..snake_length];
                let mut sub_path = get_snake_path(
                    |c| !color_grid.is_inside(c) || color_grid.get(c) <= walkable,
                    snake_outside,
                    &p,
                    MAX_ROUTE_LENGTH,
                )
                .expect("Some cell is not reachable, again");

                let next_snake = &sub_path[0..snake_length];
                if can_snake_reach_outside(color_grid, walkable, next_snake) {
                    sub_path.truncate(sub_path.len() - snake_length);
                    sub_path.append(&mut path_to_outside);
                    best_route = Some(sub_path);
                    break;
                } else {
                    let p = cells_to_eat.remove(i);
                    cells_unexitable.insert(*p);
                }
            }
        }

        if let Some(mut sub_path) = best_route {
            let eaten = sub_path[0];
            cells_to_eat.retain(|p| **p != eaten);

            // remove the cell traversed
            // it should only be the first one (unless the pathfinding fucked up?)
            // cells_to_eat.retain(|p| !sub_path.contains(p));

            sub_path.truncate(sub_path.len() - snake_length);
            sub_path.append(&mut path);
            path = sub_path;
        }
    }

    path.truncate(path.len() - snake_length);

    (path, cells_unexitable)
}
