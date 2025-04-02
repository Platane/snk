use std::collections::HashSet;

use log::info;

use crate::astar_snake::get_snake_path;
use crate::grid::{get_distance, Point, WalkableGrid, DIRECTIONS};
use crate::snake::Snake;

pub fn can_snake_reach_outside(grid: &WalkableGrid, snake: &[Point]) -> bool {
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

            if !grid.is_inside(&next_head) {
                return true;
            }

            if !grid.is_cell_walkable(&next_head) {
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

pub fn get_snake_path_to_outside(grid: &WalkableGrid, snake: &[Point]) -> Option<Vec<Point>> {
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

            if !grid.is_inside(&next_head) {
                let mut path = path.clone();
                path.insert(0, next_head);
                return Some(path);
            }

            if !grid.is_cell_walkable(&next_head) {
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

// const MAX_ROUTE_LENGTH: usize = usize::MAX;
const MAX_ROUTE_LENGTH: usize = 160;

pub fn get_path_to_eat_all(
    grid: &WalkableGrid,
    snake: &[Point],
    cells_to_eat: &HashSet<Point>,
) -> Vec<Point> {
    let snake_length = snake.len();

    // element 0 is the snake head
    let mut path: Vec<Point> = Vec::new();

    let mut cells_to_eat: Vec<_> = cells_to_eat.into_iter().collect();

    path.append(&mut snake.to_vec());

    while !cells_to_eat.is_empty() {
        let head = path[0];

        let mut best_route: Option<Vec<Point>> = None;
        let mut best_target_unescapable: Option<Point> = None;

        cells_to_eat.sort_by(|a, b| get_distance(a, &head).cmp(&get_distance(b, &head)));

        let snake = &path[0..snake_length];

        for p in cells_to_eat.iter() {
            let max_weight = match best_route.as_ref() {
                None => MAX_ROUTE_LENGTH,
                Some(path) => path.len() - snake_length,
            };

            let res = get_snake_path(|c| grid.is_cell_walkable(c), snake, p, max_weight);

            if let Some(sub_path) = res {
                //
                // is it the route better yet ?
                let sub_path_is_better =
                    best_route.as_ref().is_none_or(|r| sub_path.len() < r.len());
                if sub_path_is_better {
                    //
                    // ensure this does not lead to a position where the snake is stuck
                    let next_snake = &sub_path[0..snake_length];
                    if can_snake_reach_outside(grid, next_snake) {
                        best_route = Some(sub_path);
                    } else {
                        // let's retain only the first target unescapable
                        // as the cells_to_eat list is sorted by distance, it should be the closest
                        if best_target_unescapable.is_none() {
                            best_target_unescapable = Some(**p);
                        }
                    }
                }
            }
        }

        if best_route.is_none() {
            if let Some(p) = best_target_unescapable {
                // let's got to the outside
                // and check again

                let mut path_to_outside = get_snake_path_to_outside(grid, snake).unwrap();
                let outside_direction = {
                    if path_to_outside[0].y < 0 {
                        Point { x: 0, y: -1 }
                    } else if path_to_outside[0].y >= grid.grid.height as i8 {
                        Point { x: 0, y: 1 }
                    } else if path_to_outside[0].x < 0 {
                        Point { x: -1, y: 0 }
                    } else if path_to_outside[0].x >= grid.grid.width as i8 {
                        Point { x: 1, y: 0 }
                    } else {
                        panic!("not outside");
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
                let res = get_snake_path(
                    |c| grid.is_cell_walkable(c),
                    snake_outside,
                    &p,
                    MAX_ROUTE_LENGTH,
                );

                if let Some(mut sub_path) = res {
                    let next_snake = &sub_path[0..snake_length];
                    if can_snake_reach_outside(grid, next_snake) {
                        sub_path.truncate(sub_path.len() - snake_length);
                        sub_path.append(&mut path_to_outside);
                        best_route = Some(sub_path);
                    }
                }
            }
        }

        if let Some(mut sub_path) = best_route {
            let eaten = sub_path[0];

            cells_to_eat.retain(|p| **p != eaten);

            sub_path.truncate(sub_path.len() - snake_length);
            sub_path.append(&mut path);
            path = sub_path;
        } else {
            panic!("impossible to path to cell to eat");
        }
    }

    path.reverse();
    path
}

// pub fn get_route_to_eat_all_2(
//     grid: &WalkableGrid,
//     free_cells: &HashSet<Point>,
//     initial_snake: &Snake,
//     cells_to_eat: Vec<Point>,
// ) -> Vec<Point> {
//     let mut open_list: Vec<Node> = Vec::new();

//     let mut path: Vec<Point> = Vec::new();

//     let mut initial_snake = initial_snake.clone();

//     open_list.push(Node {
//         cells_eaten: 0,
//         path: {
//             let mut initial_path = initial_snake.clone();
//             initial_path.reverse();
//             initial_path
//         },
//     });

//     while let Some(n) = open_list.pop() {
//         // determine next target

//         let mut best_target = None;
//         let mut min_score: u8 = 200;
//         for t in cells_to_eat.iter() {
//             // if already visited ignore
//             if n.path.contains(t) {
//                 continue;
//             }

//             let head = n.path.last().unwrap();

//             let distance = get_distance(head, t);

//             let score = distance;

//             if score < min_score {
//                 min_score = score;
//                 best_target = Some(t);
//             }
//         }
//     }

//     path
// }
