use std::collections::HashSet;

use crate::grid::{Cell, Grid, Point};

pub fn get_free_cell(grid: &Grid, walkable: Cell) -> HashSet<Point> {
    let mut free: HashSet<Point> = HashSet::new();
    let mut open_list: HashSet<Point> = HashSet::new();
    let mut changed = true;

    open_list.insert(Point { x: 0, y: 0 });

    while changed {
        changed = false
    }

    open_list
}

#[test]
fn it_should_collect_free_cell() {
    let mut grid = Grid::create_empty(2, 2);

    grid.set_cell(&Point { x: 1, y: 1 }, Cell::Color2);

    let free_cells = get_free_cell(&grid, Cell::Color1);

    assert_eq!(
        free_cells,
        HashSet::from([
            //
            Point { x: 0, y: 0 }
        ])
    );
}
