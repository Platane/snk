use std::u32;

use crate::grid::{iter_neighbour4, Color, Grid};

pub fn get_exit_cost_grid(color_grid: &Grid<Color>) -> Grid<u32> {
    let mut exit_cost_grid = Grid::<u32>::create(color_grid.width, color_grid.height);
    exit_cost_grid.fill(u32::MAX);

    let mut open_list = color_grid.iter_hull().collect::<Vec<_>>();

    while let Some(p) = open_list.pop() {
        let neighbour_cost_min = iter_neighbour4(&p)
            .map(|u| {
                if !color_grid.is_inside(&u) {
                    0
                } else {
                    exit_cost_grid.get(&u)
                }
            })
            .min()
            .unwrap();
        let self_cost = (10 as u32).pow(color_grid.get(&p) as u32);

        let cost = neighbour_cost_min + self_cost;

        if exit_cost_grid.get(&p) != cost {
            exit_cost_grid.set(&p, cost);

            open_list.append(
                &mut iter_neighbour4(&p)
                    .filter(|u| color_grid.is_inside(u))
                    .collect(),
            );
        }
    }

    exit_cost_grid
}
