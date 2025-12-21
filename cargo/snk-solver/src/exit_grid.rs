use snk_grid::{
    color::Color,
    direction::{Direction, add_direction, iter_directions},
    grid::{Grid, iter_rectangle_hull},
    grid_ascii::{get_ascii_grid, grid_to_ascii_transformed},
    grid_samples::{SampleGrid, get_grid_sample},
    point::Point,
};
use std::collections::HashSet;

use crate::cost::Cost;

#[derive(Copy, Clone, Debug)]
struct ExitDirection {
    pub cost: Cost,
    pub exit_direction: Direction,
}

#[derive(Clone, Debug)]
pub struct ExitGrid(Grid<ExitDirection>);

impl ExitGrid {
    pub fn create_from_grid_color(grid_color: &Grid<Color>) -> Self {
        let grid_exit = Grid::<ExitDirection>::create_with_value(
            grid_color.width,
            grid_color.height,
            ExitDirection {
                cost: Cost::very_large(),
                exit_direction: Direction::UP,
            },
        );

        let mut out = Self(grid_exit);

        let changed = iter_rectangle_hull(grid_color.width as i8, grid_color.height as i8);

        out.update_after_grid_change(grid_color, changed);

        out
    }

    pub fn is_outside(&self, p: Point) -> bool {
        self.get_cost_to_outside(p).is_free()
    }

    pub fn get_cost_to_outside(&self, p: Point) -> Cost {
        if self.0.is_inside(p) {
            self.0.get(p).cost
        } else {
            Cost::zero()
        }
    }

    pub fn get_exit_direction(&self, p: Point) -> Direction {
        if p.x < 0 {
            Direction::LEFT
        } else if p.y < 0 {
            Direction::UP
        } else if (p.x) >= self.0.width {
            Direction::RIGHT
        } else if (p.y) >= self.0.height {
            Direction::DOWN
        } else {
            self.0.get(p).exit_direction
        }
    }

    pub fn update_after_grid_change(
        &mut self,
        grid: &Grid<Color>,
        changed: impl Iterator<Item = Point>, // must be points inside the grid
    ) -> () {
        let mut changed: HashSet<Point> = changed.collect();

        while let Some(p) = changed.iter().next() {
            let p = *p;
            changed.remove(&p);

            let color = grid.get_color(p);
            let (new_cost, new_direction) = iter_directions()
                .map(|dir| {
                    let p = p + dir.into();
                    let cost = self.get_cost_to_outside(p) + color.into();
                    (cost, dir)
                })
                .reduce(|(cost1, dir1), (cost2, dir2)| {
                    if cost1 < cost2 {
                        (cost1, dir1)
                    } else {
                        (cost2, dir2)
                    }
                })
                .unwrap();

            let e = self.0.get_mut(p);
            if new_cost < e.cost {
                e.cost = new_cost;
                e.exit_direction = new_direction;

                for dir in iter_directions() {
                    let p = p + dir.into();
                    if self.0.is_inside(p) {
                        changed.insert(p);
                    }
                }
            }
        }
    }
}

#[test]
fn it_should_compute_the_cost_to_outside() {
    let grid = Grid::<_>::from(
        r#"
_...._
_.  ._
_.. ._
_.   _
"#,
    );
    let pto = ExitGrid::create_from_grid_color(&grid);

    assert_eq!(
        get_ascii_grid(grid.width, grid.height, |p| {
            let cost = pto.get_cost_to_outside(p);
            if cost.is_free() {
                cost.0.to_string()
            } else {
                "#".to_string()
            }
        }),
        r#"
1####1
1#43#1
1##2#1
1#1111
"#
        .trim(),
    );
}
