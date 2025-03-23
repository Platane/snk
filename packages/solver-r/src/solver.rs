use std::collections::HashSet;

use crate::grid::{Cell, Grid, Point};

pub fn get_free_cell(grid: &Grid, walkable: Cell) -> HashSet<Point> {
    let mut free: HashSet<Point> = HashSet::new();
    let mut open_list: HashSet<Point> = HashSet::new();

    for x in -1..((grid.width as i8) + 1) {
        open_list.insert(Point { x, y: 0 });
        open_list.insert(Point {
            x,
            y: (grid.height as i8) - 1,
        });
    }

    let directions = [
        Point { x: 1, y: 0 },
        Point { x: -1, y: 0 },
        Point { x: 0, y: 1 },
        Point { x: 0, y: -1 },
    ];

    while let Some(p) = open_list.iter().next().cloned() {
        open_list.remove(&p);

        let exit_count: u8 = directions.iter().fold(0, |sum, dir| {
            let neighbour = Point {
                x: p.x + dir.x,
                y: p.y + dir.y,
            };

            if !grid.is_inside(&neighbour) {
                sum + 2
            } else if free.contains(&neighbour) {
                sum + 1
            } else {
                sum
            }
        });

        if exit_count >= 2 {
            if grid.is_inside(&p) && grid.get_cell(&p) <= walkable {
                free.insert(p);
            }

            for dir in directions {
                let neighbour = Point {
                    x: p.x + dir.x,
                    y: p.y + dir.y,
                };

                if grid.is_inside(&neighbour)
                    && (grid.get_cell(&neighbour) <= walkable)
                    && !free.contains(&neighbour)
                {
                    open_list.insert(neighbour);
                }
            }
        }
    }

    free
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
            Point { x: 0, y: 0 },
            Point { x: 0, y: 1 },
            Point { x: 1, y: 0 },
        ])
    );
}
