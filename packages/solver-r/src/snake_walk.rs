use std::collections::HashSet;

use crate::astar::get_path;
use crate::grid::{Cell, Grid, Point, DIRECTIONS};
use crate::snake::{
    get_next_snake_head, get_snake_head, move_snake, snake_will_self_collide, Snake,
};

struct Node {
    point: Point,
    weight: u8,
    h: u8,
    parent: Option<Point>,
}

pub fn get_route_to_eat_all(
    grid: &Grid,
    walkable: Cell,
    initial_snake: &Snake,
    cells_to_eat: HashSet<Point>,
) -> Vec<Point> {
    // let mut targets: Vec<Point> = cells_to_eat.iter().map(|p| p.clone()).collect();

    // let open_list = get_path(|p|);

    let mut targets: Vec<&Point> = cells_to_eat.iter().collect();

    let mut path: Vec<Point> = Vec::new();

    let mut initial_snake = initial_snake.clone();

    while let Some(target) = targets.pop() {
        // prepare
        let mut open_list: HashSet<(Snake, Vec<Point>)> = HashSet::new();
        open_list.insert((initial_snake.clone(), Vec::new()));

        while let Some(x) = open_list.iter().next().cloned() {
            open_list.remove(&x);

            let snake = x.0;
            let mut sub_path = x.1;

            if get_snake_head(&snake) == *target {
                path.append(&mut sub_path);
                initial_snake = snake;
                break;
            }

            for dir in DIRECTIONS {
                if {
                    let h = get_next_snake_head(&snake, &dir);
                    grid.get_cell(&h) <= walkable
                } && !snake_will_self_collide(&snake, &dir)
                {
                    let mut next_snake = snake.clone();
                    move_snake(&mut next_snake, &dir);

                    let mut next_sub_path = sub_path.clone();
                    next_sub_path.push(dir.clone());

                    open_list.insert((next_snake, next_sub_path));
                }
            }
        }
    }

    path
}
