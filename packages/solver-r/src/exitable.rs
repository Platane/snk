use std::collections::HashSet;

use crate::grid::{Color, Grid, Point, DIRECTIONS};

/**
* mark as exitable all the cells from which a path can be found to the outside
*/
pub fn propagate_exitable(
    exitable_cells: &mut HashSet<Point>,
    grid: &Grid<Color>,
    walkable: Color,
) -> () {
    for p in grid.iter_hull() {
        if grid.get(&p) <= walkable || !grid.is_inside(&p) {
            exitable_cells.insert(p);
        }
    }

    let mut open_list: Vec<Point> = exitable_cells.iter().map(|p| *p).collect();

    while let Some(p) = open_list.pop() {
        for dir in DIRECTIONS {
            let u = Point {
                x: p.x + dir.x,
                y: p.y + dir.y,
            };

            if !exitable_cells.contains(&u) && grid.is_inside(&u) && grid.get(&u) <= walkable {
                open_list.push(u);
                exitable_cells.insert(u);
            }
        }
    }
}
