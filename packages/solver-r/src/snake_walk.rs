use std::collections::HashSet;

use crate::astar_snake::get_snake_path;
use crate::grid::{get_distance, Point, WalkableGrid, DIRECTIONS};
use crate::snake::Snake;

pub fn can_snake_reach_outside(grid: &WalkableGrid, snake: &Snake) -> bool {
    let mut open_list: Vec<Snake> = Vec::new();
    open_list.push(snake.clone());

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

        cells_to_eat.sort_by(|a, b| get_distance(a, &head).cmp(&get_distance(b, &head)));

        for p in cells_to_eat.iter() {
            if path.contains(&p) {
                continue;
            }

            let snake = &path[0..snake_length];
            let max_weight = match best_route.as_ref() {
                None => usize::MAX,
                Some(path) => path.len() - snake_length,
            };

            let res = get_snake_path(|c| grid.is_cell_walkable(c), snake, p, max_weight);

            if let Some(sub_path) = res {
                if match best_route.as_ref() {
                    None => true,
                    Some(r) => sub_path.len() < r.len(),
                } {
                    best_route = Some(sub_path);
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
