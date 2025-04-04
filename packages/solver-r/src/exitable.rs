use std::collections::HashSet;

use crate::grid::{Point, WalkableGrid, DIRECTIONS};

pub fn propagate_exitable(exitable_cells: &mut HashSet<Point>, grid: &WalkableGrid) -> () {
    for x in 0..(grid.grid.width as i8) {
        {
            let p = Point { x, y: 0 };
            if grid.is_cell_walkable(&p) {
                exitable_cells.insert(p);
            }
        }
        {
            let p = Point {
                x,
                y: (grid.grid.height as i8) - 1,
            };
            if grid.is_cell_walkable(&p) {
                exitable_cells.insert(p);
            }
        }
    }
    for y in 0..(grid.grid.height as i8) {
        {
            let p = Point { x: 0, y };
            if grid.is_cell_walkable(&p) {
                exitable_cells.insert(p);
            }
        }
        {
            let p = Point {
                x: (grid.grid.width as i8) - 1,
                y,
            };
            if grid.is_cell_walkable(&p) {
                exitable_cells.insert(p);
            }
        }
    }

    let mut open_list: Vec<Point> = exitable_cells.iter().map(|p| p.clone()).collect();

    while let Some(p) = open_list.pop() {
        for dir in DIRECTIONS {
            let u = Point {
                x: p.x + dir.x,
                y: p.y + dir.y,
            };

            if !exitable_cells.contains(&u) && grid.is_inside(&u) && grid.is_cell_walkable(&u) {
                open_list.push(u);
                exitable_cells.insert(u);
            }
        }
    }
}
