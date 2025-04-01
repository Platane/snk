use std::collections::HashSet;

use crate::grid::{Cell, Grid, Point};

pub fn get_free_cells(grid: &Grid, walkable: Cell) -> (HashSet<Point>, HashSet<Point>) {
    let mut free_cells: HashSet<Point> = HashSet::new();
    let mut one_way_cells: HashSet<Point> = HashSet::new();
    let mut open_list: HashSet<Point> = HashSet::new();

    for x in 0..(grid.width as i8) {
        open_list.insert(Point { x, y: 0 });
        open_list.insert(Point {
            x,
            y: (grid.height as i8) - 1,
        });
    }
    for y in 0..(grid.height as i8) {
        open_list.insert(Point { x: 0, y });
        open_list.insert(Point {
            x: (grid.width as i8) - 1,
            y,
        });
    }
    open_list.retain(|p| grid.get_cell(&p) <= walkable);

    let directions = [
        Point { x: 1, y: 0 },
        Point { x: -1, y: 0 },
        Point { x: 0, y: 1 },
        Point { x: 0, y: -1 },
    ];

    while let Some(p) = open_list.iter().next().cloned() {
        open_list.remove(&p);

        let has_enough_free_exits = {
            let mut exit_count = 0;
            let mut visited: HashSet<Point> = HashSet::new();

            for dir in directions {
                let neighbour = Point {
                    x: p.x + dir.x,
                    y: p.y + dir.y,
                };

                if !visited.contains(&neighbour)
                    && (free_cells.contains(&neighbour) || !grid.is_inside(&neighbour))
                {
                    visited.insert(neighbour);
                    exit_count += 1;
                }

                if grid.is_inside(&neighbour) && grid.get_cell(&neighbour) <= walkable {
                    for alt in [-1, 1] {
                        let corner = {
                            if neighbour.x != 0 {
                                Point {
                                    x: neighbour.x,
                                    y: neighbour.y + alt,
                                }
                            } else {
                                Point {
                                    x: neighbour.x + alt,
                                    y: neighbour.y,
                                }
                            }
                        };

                        if !visited.contains(&neighbour)
                            && !visited.contains(&corner)
                            && (free_cells.contains(&corner) || !grid.is_inside(&corner))
                        {
                            visited.insert(neighbour);
                            visited.insert(corner);
                            exit_count += 1;
                        }
                    }
                }
            }

            exit_count >= 2
        };

        if has_enough_free_exits {
            free_cells.insert(p);

            for dir in directions {
                let neighbour = Point {
                    x: p.x + dir.x,
                    y: p.y + dir.y,
                };

                if !free_cells.contains(&neighbour)
                    && grid.is_inside(&neighbour)
                    && grid.get_cell(&neighbour) <= walkable
                {
                    open_list.insert(neighbour);
                }
            }
        } else {
            one_way_cells.insert(p);
        }
    }

    one_way_cells.retain(|p| !free_cells.contains(&p));

    (free_cells, one_way_cells)
}

#[test]
fn it_should_collect_free_cell() {
    let mut grid = Grid::create_empty(2, 2);

    grid.set_cell(&Point { x: 1, y: 1 }, Cell::Color2);

    let (free_cells, _) = get_free_cells(&grid, Cell::Color1);

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
