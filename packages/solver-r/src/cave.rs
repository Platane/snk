use crate::grid::{add, Color, Grid, Point, DIRECTIONS};
use std::{
    collections::{HashMap, HashSet},
    usize,
};

#[derive(Debug, PartialEq, Eq)]
enum Pocket {
    Cave(HashSet<Point>),
    Outside(HashSet<Point>),
}
pub fn get_pocket_at_cell(color_grid: &Grid<Color>, walkable: Color, p: &Point) -> Pocket {
    let mut filled: HashSet<Point> = HashSet::new();
    let mut open_list: Vec<Point> = Vec::new();
    open_list.push(*p);

    while let Some(p) = open_list.pop() {
        if filled.contains(&p) {
            continue;
        }
        if !color_grid.is_inside(&p) {
            return Pocket::Outside(filled);
        }
        if !(color_grid.get(&p) <= walkable) {
            continue;
        }

        let reachable: bool = 'outer: {
            let mut open_list: Vec<Point> = Vec::new();
            let mut close_list: HashSet<Point> = HashSet::new();
            let mut color: HashMap<Point, i8> = HashMap::new();

            for (i, dir) in DIRECTIONS.iter().enumerate() {
                let q = add(&p, &dir);
                if color_grid.is_walkable(walkable, &q) {
                    color.insert(q, i as i8);
                    open_list.push(q);
                }
            }

            while let Some(u) = open_list.pop() {
                if close_list.contains(&u) {
                    continue;
                }

                let i = *color.get(&u).unwrap();

                for dir in DIRECTIONS {
                    let q = add(&u, &dir);

                    if q == p {
                        continue;
                    }

                    if color.get(&q).is_some_and(|j| *j != i) {
                        break 'outer true;
                    }

                    if !close_list.contains(&q)
                        && color_grid.is_walkable(walkable, &q)
                        && color_grid.is_inside_margin(&q, 1)
                    {
                        open_list.push(q);
                        color.insert(q, i);
                    }
                }

                close_list.insert(u);
            }

            false
        };

        if reachable {
            filled.insert(p);
            for dir in DIRECTIONS {
                let q = add(&p, &dir);
                open_list.push(q);
            }
        }
    }

    Pocket::Cave(filled)
}

// return the number of cell a snake can occupy without being stuck
pub fn get_max_coil(cells: &Vec<Point>) -> usize {
    // brute force approach

    let mut open_list: Vec<Vec<Point>> = Vec::new();

    let s = &cells[0];
    open_list.push(vec![*s]);

    let mut max_coil = 0;

    while let Some(path) = open_list.pop() {
        let p = path.last().unwrap();

        for dir in DIRECTIONS {
            let q = add(p, &dir);

            if s == &q && path.len() > 2 {
                max_coil = max_coil.max(path.len())

                // optimization (?) : early exit when max_coil is maximal value pocket_size
            }

            // TODO use hashmap for faster contains ?
            if !cells.contains(&q) {
                continue;
            }

            if path.contains(&q) {
                continue;
            }

            let mut next_path = Vec::with_capacity(path.len() + 1);
            next_path.clone_from(&path);
            next_path.push(q);

            open_list.push(next_path);
        }
    }

    max_coil
}

#[derive(Debug)]
pub struct Cave {
    pub cells: Vec<Point>,
    pub max_coil: usize,
}
pub fn get_cave_map(color_grid: &Grid<Color>, walkable: Color) -> Vec<Cave> {
    let mut caves: Vec<Cave> = vec![Cave {
        cells: vec![],
        max_coil: usize::MAX,
    }];

    for p in color_grid.iter() {
        if !{
            let c = color_grid.get(&p);
            c > Color::Empty && c <= walkable
        } {
            continue;
        }

        if caves.iter().any(|cave| cave.cells.contains(&p)) {
            continue;
        }

        let pocket = get_pocket_at_cell(color_grid, walkable, &p);

        if let Pocket::Outside(cells) = pocket {
            for c in cells {
                if !caves[0].cells.contains(&c) {
                    caves[0].cells.push(c);
                }
            }
        } else if let Pocket::Cave(cells) = pocket {
            if cells.is_empty() {
                let cave = Cave {
                    max_coil: 0,
                    cells: vec![p],
                };
                caves.push(cave);
            } else {
                let cells: Vec<_> = cells.into_iter().collect();
                let max_coil = get_max_coil(&cells);
                let cave = Cave {
                    max_coil,
                    cells: cells.clone(),
                };
                caves.push(cave);
            }
        }
    }

    caves
}

#[test]
fn it_should_compute_pocket_for_simple_small_cave() {
    let color_grid = Grid::<Color>::from(
        r#"
_####   _
 #  #
 #  #
 ####
"#,
    );

    assert_eq!(
        get_pocket_at_cell(&color_grid, Color::Color1, &Point { x: 3, y: 1 }),
        Pocket::Cave(HashSet::from([
            Point { x: 3, y: 2 },
            Point { x: 3, y: 1 },
            Point { x: 2, y: 2 },
            Point { x: 2, y: 1 },
        ]))
    );
}

#[test]
fn it_should_compute_max_coil_for_simple_small_cave() {
    assert_eq!(
        get_max_coil(&vec![
            Point { x: 3, y: 2 },
            Point { x: 3, y: 1 },
            Point { x: 2, y: 2 },
            Point { x: 2, y: 1 },
        ]),
        4
    );
}

#[test]
fn it_should_compute_pocket_for_a_eight() {
    let color_grid = Grid::<Color>::from(
        r#"
#####
#   #
# # ####
#      #
#### # #
   #.  #
   #####
"#,
    );

    assert_eq!(
        get_pocket_at_cell(&color_grid, Color::Color1, &Point { x: 3, y: 1 }),
        Pocket::Cave(HashSet::from([
            Point { x: 1, y: 1 },
            Point { x: 2, y: 1 },
            Point { x: 3, y: 1 },
            Point { x: 1, y: 2 },
            Point { x: 3, y: 2 },
            Point { x: 1, y: 3 },
            Point { x: 2, y: 3 },
            Point { x: 3, y: 3 },
            Point { x: 4, y: 3 },
            Point { x: 5, y: 3 },
            Point { x: 6, y: 3 },
            Point { x: 4, y: 4 },
            Point { x: 6, y: 4 },
            Point { x: 4, y: 5 },
            Point { x: 5, y: 5 },
            Point { x: 6, y: 5 },
        ]))
    );
}

#[test]
fn it_should_compute_max_coil_for_a_eight() {
    assert_eq!(
        get_max_coil(&vec![
            Point { x: 1, y: 1 },
            Point { x: 2, y: 1 },
            Point { x: 3, y: 1 },
            Point { x: 1, y: 2 },
            Point { x: 3, y: 2 },
            Point { x: 1, y: 3 },
            Point { x: 2, y: 3 },
            Point { x: 3, y: 3 },
            Point { x: 4, y: 3 },
            Point { x: 5, y: 3 },
            Point { x: 6, y: 3 },
            Point { x: 4, y: 4 },
            Point { x: 6, y: 4 },
            Point { x: 4, y: 5 },
            Point { x: 5, y: 5 },
            Point { x: 6, y: 5 },
        ]),
        8
    );
}

#[test]
fn it_should_compute_pocket_outside() {
    let color_grid = Grid::<Color>::from(
        r#"
_#####...
 #.......
 #.......
 ########
"#,
    );

    assert!(
        match get_pocket_at_cell(&color_grid, Color::Color1, &Point { x: 3, y: 1 }) {
            Pocket::Cave(_) => false,
            Pocket::Outside(_) => true,
        }
    );
}
