use crate::grid::{iter_neighbour4, Color, Grid, Point};

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

        let self_cost = match color_grid.get(&p) {
            Color::Empty => 0,
            c => (256 as u32).pow((c as u32) - 1),
        };
        println!("color: {:?} cost:{}", color_grid.get(&p), self_cost);

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

#[test]
fn it_should_compute_exist_cost_grid_1() {
    let color_grid = Grid::<Color>::from(
        r#"
_._
"#,
    );
    let exit_grid = get_exit_cost_grid(&color_grid);

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
    let exit_grid = get_exit_cost_grid(&color_grid);

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
    let exit_grid = get_exit_cost_grid(&color_grid);

    assert_eq!(exit_grid.get(&Point { x: 2, y: 2 }), 256 * 256 * 256 * 2)
}
