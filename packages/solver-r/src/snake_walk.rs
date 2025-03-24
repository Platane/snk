use std::collections::HashSet;

use crate::grid::{Cell, Grid, Point, DIRECTIONS};
use crate::snake::Snake;

pub fn get_route_to_eat_all(
    grid: &Grid,
    walkable: Cell,
    initial_snake: &Snake,
    cells_to_eat: HashSet<Point>,
) -> Vec<Snake> {
    let mut targets = cells_to_eat.clone();

    while let Some(p) = targets.iter().next().cloned() {
        targets.remove(&p);

        let mut open_list: HashSet<Snake> = HashSet::new();
    }
    for dir in DIRECTIONS {}
    Vec::new()
}
