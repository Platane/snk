use std::{collections::HashSet, usize};

use snk_grid::{
    direction::{Direction, add_direction, iter_directions},
    grid::{Color, Grid, iter_rectangle_hull},
    point::Point,
    snake::Snake4,
};

pub struct Cave {
    cells: HashSet<Point>,
    cost_in: u8,
    cost_out: u8,
    value: u8,
}

pub fn get_caves(grid: Grid<Color>, snake_len: usize, walkable: Color) -> HashSet<Cave> {
    let cost_to_outside = get_cost_to_outside(&grid);

    let mut reverse_cave = Grid::<usize>::create(grid.width, grid.height);

    let mut caves = Vec::<Cave>::new();

    caves.push(Cave {
        cells: HashSet::new(),
        cost_in: 0,
        cost_out: 0,
        value: 0,
    });
    let outside = caves.get(0).unwrap();

    for p in iter_rectangle_hull(grid.width as i8, grid.height as i8)
        .filter(|p| grid.get(&p) <= walkable)
    {
        if cost_to_outside.get(&p) <= (edible as usize) * 100 {
            // can reach outside
        }
    }

    caves
}

pub fn get_cost_to_outside(grid: &Grid<Color>) -> Grid<usize> {
    let mut cost_to_outside = Grid::<usize>::create(grid.width, grid.height);
    cost_to_outside.fill(usize::MAX);

    let mut open_list = HashSet::<Point>::new();

    for p in iter_rectangle_hull(grid.width as i8, grid.height as i8) {
        let cost = (grid.get(&p) as usize) * 100;
        cost_to_outside.set(&p, cost);
        open_list.insert(p);
    }

    while let Some(p) = {
        let next = open_list.iter().next();
        next.map(|p| *p)
    } {
        open_list.remove(&p);

        // p changed, propagate the change to its neightbourn
        let c = cost_to_outside.get(&p);

        for pn in iter_directions().map(|dir| add_direction(&p, *dir)) {
            if cost_to_outside.is_inside(&pn) {
                let new_cost = c + (grid.get(&pn) as usize) * 100;
                if new_cost < cost_to_outside.get(&pn) {
                    cost_to_outside.set(&pn, new_cost);
                    open_list.insert(pn);
                }
            }
        }
    }

    cost_to_outside
}
