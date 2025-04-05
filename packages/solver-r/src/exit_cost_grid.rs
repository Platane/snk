use crate::grid::{Color, Grid};

pub fn get_exit_cost_grid(color_grid: &Grid<Color>) -> Grid<u8> {
    let mut exit_cost_grid = Grid::<u8>::create(color_grid.width, color_grid.height);

    exit_cost_grid
}
