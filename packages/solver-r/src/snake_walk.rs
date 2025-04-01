use std::collections::HashSet;

use crate::astar::get_path;
use crate::grid::{get_distance, Cell, Grid, Point, WalkableGrid, DIRECTIONS};
use crate::snake::{
    get_next_snake_head, get_snake_head, move_snake, snake_will_self_collide, Snake,
};

struct Node {
    cells_eaten: u8,
    path: Vec<Point>,
}

pub fn can_snake_reach_outside(
    grid: &WalkableGrid,
    free_cells: &HashSet<Point>,
    snake: &Snake,
) -> bool {
    let mut open_list: Vec<Snake> = Vec::new();
    open_list.push(snake.clone());

    let mut close_list: HashSet<Snake> = HashSet::new();

    while let Some(s) = open_list.pop() {
        for dir in DIRECTIONS {
            if snake_will_self_collide(&s, &dir) {
                continue;
            }

            let next_head = get_next_snake_head(&s, &dir);

            if !grid.is_inside(&next_head) {
                return true;
            }

            if !free_cells.contains(&next_head) {
                continue;
            }

            let mut next_snake = s.clone();
            move_snake(&mut next_snake, &dir);

            if close_list.contains(&next_snake) {
                continue;
            }

            open_list.push(next_snake);
        }

        close_list.insert(s);
    }

    false
}

pub fn get_route_to_eat_all(
    grid: &WalkableGrid,
    free_cells: &HashSet<Point>,
    initial_snake: &Snake,
    cells_to_eat: Vec<Point>,
) -> Vec<Point> {
    // element 0 is the snake head
    let mut path: Vec<Point> = Vec::new();

    // path.append(&mut initial_snake.clone());

    // while true {
    //     let head = path[0];

    //     let forbidden_direction = Point {
    //         x: path[1].x - head.x,
    //         y: path[1].y - head.y,
    //     };

    //     // get best route to best target
    //     let route = vec![];
    // }

    path
}

/*
* snake astar
*/

pub fn get_route_to_cell(grid: &WalkableGrid, snake: &Snake, target: &Point) -> Vec<Point> {
    let mut open_list: Vec<Node> = Vec::new();

    vec![]
}

pub fn get_route_to_eat_all_2(
    grid: &WalkableGrid,
    free_cells: &HashSet<Point>,
    initial_snake: &Snake,
    cells_to_eat: Vec<Point>,
) -> Vec<Point> {
    let mut open_list: Vec<Node> = Vec::new();

    let mut path: Vec<Point> = Vec::new();

    let mut initial_snake = initial_snake.clone();

    open_list.push(Node {
        cells_eaten: 0,
        path: {
            let mut initial_path = initial_snake.clone();
            initial_path.reverse();
            initial_path
        },
    });

    while let Some(n) = open_list.pop() {
        // determine next target

        let mut best_target = None;
        let mut min_score: u8 = 200;
        for t in cells_to_eat.iter() {
            // if already visited ignore
            if n.path.contains(t) {
                continue;
            }

            let head = n.path.last().unwrap();

            let distance = get_distance(head, t);

            let score = distance;

            if score < min_score {
                min_score = score;
                best_target = Some(t);
            }
        }
    }

    path
}
