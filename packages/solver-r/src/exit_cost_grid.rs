use crate::grid::{iter_neighbour4, Color, Grid, Point};

pub type ExitCostGrid = Grid<u32>;

impl ExitCostGrid {
    pub fn is_freely_exitable_with_walkable(&self, walkable: Color, p: &Point) -> bool {
        self.get(p) <= get_color_weight(walkable) * (1 << 4)
    }
}

pub fn is_freely_exitable_with_walkable(
    exit_cost_grid: &ExitCostGrid,
    walkable: Color,
    p: &Point,
) -> bool {
    exit_cost_grid.get(p) <= get_color_weight(walkable) * (1 << 4)
}

fn get_color_weight(color: Color) -> u32 {
    match color {
        Color::Empty => 0,
        Color::Color1 => 1 << 0,
        Color::Color2 => 1 << 4,
        Color::Color3 => 1 << 8,
        Color::Color4 => 1 << 12,
    }
}

pub fn create_empty_exit_cost_grid(color_grid: &Grid<Color>) -> ExitCostGrid {
    let mut exit_cost_grid = Grid::<u32>::create(color_grid.width, color_grid.height);
    exit_cost_grid.fill(u32::MAX);
    exit_cost_grid
}

pub fn propagate_exit_cost_grid(exit_cost_grid: &mut ExitCostGrid, color_grid: &Grid<Color>) -> () {
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

        let self_cost = get_color_weight(color_grid.get(&p));

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
}

#[test]
fn it_should_compute_exist_cost_grid_1() {
    let color_grid = Grid::<Color>::from(
        r#"
_._
"#,
    );
    let mut exit_grid = create_empty_exit_cost_grid(&color_grid);
    propagate_exit_cost_grid(&mut exit_grid, &color_grid);

    assert_eq!(
        exit_grid.to_string(),
        r#"
010
"#
        .trim(),
    )
}

#[test]
fn it_should_compute_exist_cost_grid_2() {
    let color_grid = Grid::<Color>::from(
        r#"
_ ....      _
 .    ......
 .    ...  .
  ....
"#,
    );
    let mut exit_grid = create_empty_exit_cost_grid(&color_grid);
    propagate_exit_cost_grid(&mut exit_grid, &color_grid);

    assert_eq!(
        exit_grid.to_string(),
        r#"
0011110000000
0111111111110
0111111110010
0011110000000
"#
        .trim(),
    )
}

#[test]
fn it_should_compute_exist_cost_grid_3() {
    let color_grid = Grid::<Color>::from(
        r#"
#####
#####
## ##
#####
#####
"#,
    );
    let mut exit_grid = create_empty_exit_cost_grid(&color_grid);
    propagate_exit_cost_grid(&mut exit_grid, &color_grid);

    assert_eq!(exit_grid.get(&Point { x: 2, y: 2 }), 256 * 256 * 256 * 2)
}
