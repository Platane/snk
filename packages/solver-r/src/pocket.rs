use crate::grid::{add, Color, Grid, Point, DIRECTIONS};
use std::collections::{HashMap, HashSet};

pub fn get_pocket_size(color_grid: &Grid<Color>, walkable: Color, p: &Point) -> usize {
    let mut filled: HashSet<Point> = HashSet::new();
    let mut open_list: Vec<Point> = Vec::new();
    open_list.push(*p);

    while let Some(p) = open_list.pop() {
        if filled.contains(&p) {
            continue;
        }
        if !color_grid.is_inside(&p) {
            return usize::MAX;
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

    filled.len()
}

#[test]
fn it_should_compute_pocket_size_round_small_hole() {
    let color_grid = Grid::<Color>::from(
        r#"
_####   _
 #  #
 #  #
 ####
"#,
    );

    assert_eq!(
        get_pocket_size(&color_grid, Color::Color1, &Point { x: 3, y: 1 }),
        4
    );
}

#[test]
fn it_should_compute_pocket_size_round_hole() {
    let color_grid = Grid::<Color>::from(
        r#"
_#####   _
 #....#
 #....#
 #####
"#,
    );

    assert_eq!(
        get_pocket_size(&color_grid, Color::Color1, &Point { x: 3, y: 1 }),
        8
    );
}

#[test]
fn it_should_compute_pocket_size_open() {
    let color_grid = Grid::<Color>::from(
        r#"
_#####...
 #.......
 #.......
 ########
"#,
    );

    assert!(get_pocket_size(&color_grid, Color::Color1, &Point { x: 3, y: 1 }) > 100);
}

#[test]
fn it_should_compute_pocket_size_loop() {
    let color_grid = Grid::<Color>::from(
        r#"
######   _
#....#
#.##.#
#....#
######
"#,
    );

    assert_eq!(
        get_pocket_size(&color_grid, Color::Color1, &Point { x: 3, y: 1 }),
        10
    );
}

#[test]
fn it_should_compute_pocket_size_dead_end() {
    let color_grid = Grid::<Color>::from(
        r#"
###########
##  #######
##   ######
###########
"#,
    );

    assert_eq!(
        get_pocket_size(&color_grid, Color::Color1, &Point { x: 3, y: 1 }),
        4
    );
}

#[test]
fn it_should_compute_pocket_size_dead_end_2() {
    let color_grid = Grid::<Color>::from(
        r#"
###########
##....#####
##.......##
###########
"#,
    );

    assert_eq!(
        get_pocket_size(&color_grid, Color::Color1, &Point { x: 3, y: 1 }),
        8
    );
}

#[test]
fn it_should_compute_pocket_size_dead_end_3() {
    let color_grid = Grid::<Color>::from(
        r#"
###########
##  #######
##
###########
"#,
    );

    assert_eq!(
        get_pocket_size(&color_grid, Color::Color1, &Point { x: 3, y: 1 }),
        4
    );
}

#[test]
fn it_should_compute_pocket_size_dead_end_4() {
    let color_grid = Grid::<Color>::from(
        r#"
#########
##....###
##.....##
##.....##
#.....###
###..####
#########
"#,
    );

    assert_eq!(
        get_pocket_size(&color_grid, Color::Color1, &Point { x: 3, y: 1 }),
        20
    );
}
