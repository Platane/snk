use snk_grid::{
    color::Color, grid::Grid, grid_samples::get_grid_sample, point::Point, snake::Snake4,
};

use crate::{cost::Cost, exit_grid::ExitGrid, snake_path_to_outside::get_snake_path_to_outside};

#[derive(Debug)]
pub struct Tunnel {
    pub path: Vec<Point>,
    pub in_cost: Cost,
    pub out_cost: Cost,
}

///
/// it's not accurate and might report worse tunnel
pub fn get_best_tunnel_to_collect_point(
    grid: &Grid<Color>,
    exit_grid: &ExitGrid,
    dot: Point,
) -> Tunnel {
    let in_cost = exit_grid.get_cost_to_outside(dot);

    let mut grid = grid.clone();

    // first path, from the dot to the outside, it should be at least snake length long and ends in outside
    let mut path_out_1 = Vec::new();

    let mut p = dot;

    loop {
        path_out_1.push(p);
        if grid.is_inside(p) {
            grid.set(p, Color::Empty);
        }

        if path_out_1.len() >= 6 && exit_grid.is_outside(p) {
            break;
        }

        p += exit_grid.get_exit_direction(p).into();
    }

    // path from the outside to the dot
    let mut path = path_out_1
        .iter()
        .map(|p| *p)
        .take_while(|p| !exit_grid.is_outside(*p))
        .collect::<Vec<_>>();
    path.reverse();

    // snake arriving from the outside to the dot
    let snake = Snake4::from_points(
        path_out_1[0..4]
            .try_into()
            .expect("snake should be 4 points"),
    );

    // /!\
    // at this stage the exit grid is not in sync with the grid_color
    // since we modified the grid_color

    // from that snake, seek the outside without self-colliding
    let (path_out, out_cost) = get_snake_path_to_outside(
        |p| exit_grid.is_outside(p),
        |p| grid.get_color(p).into(),
        &snake,
    );
    for dir in path_out {
        let p = *path.last().unwrap();
        path.push(p + dir.into());
    }
    path.pop();

    Tunnel {
        path,
        in_cost,
        out_cost,
    }
}

#[test]
fn it_should_compute_the_tunnel_for_enclaved_dot() {
    let grid = Grid::<_>::from(
        r#"
_        _
_  ###   _
_  #.#   _
_  ###   _
_        _

"#,
    );
    assert_eq!(grid.get_color(Point { x: 4, y: 2 }), Color::Color1);

    let exit_grid = ExitGrid::create_from_grid_color(&grid);

    let tunnel = get_best_tunnel_to_collect_point(&grid, &exit_grid, Point { x: 4, y: 2 });

    assert_eq!(tunnel.in_cost.get_color_count(Color::Color4), 1);
    assert_eq!(tunnel.out_cost.get_color_count(Color::Color4), 1);

    assert_eq!(tunnel.in_cost.get_color_count(Color::Color1), 1);
    assert_eq!(tunnel.out_cost.get_color_count(Color::Color1), 0);
}

#[test]
fn it_should_compute_the_tunnel_for_enclaved_dot_in_large_cave() {
    let grid = Grid::<_>::from(
        r#"
_          _
_  #####   _
_  #   #   _
_  # . #   _
_  #   #   _
_  #####   _
_        _

"#,
    );

    assert_eq!(grid.get_color(Point { x: 5, y: 3 }), Color::Color1);

    let exit_grid = ExitGrid::create_from_grid_color(&grid);

    let tunnel = get_best_tunnel_to_collect_point(&grid, &exit_grid, Point { x: 5, y: 3 });
    assert_eq!(tunnel.in_cost.get_color_count(Color::Color4), 1);
    assert_eq!(tunnel.out_cost.get_color_count(Color::Color4), 0);

    assert_eq!(tunnel.in_cost.get_color_count(Color::Color1), 1);
    assert_eq!(tunnel.out_cost.get_color_count(Color::Color1), 0);
}

#[test]
fn it_should_compute_the_tunnel_for_enclaved_dot_in_large_cave_2() {
    let grid = Grid::<_>::from(
        r#"
_           _
_  ######   _
_  ##   #   _
_  ## . #   _
_  ######   _
_           _

"#,
    );

    assert_eq!(grid.get_color(Point { x: 6, y: 3 }), Color::Color1);

    let exit_grid = ExitGrid::create_from_grid_color(&grid);

    let tunnel = get_best_tunnel_to_collect_point(&grid, &exit_grid, Point { x: 6, y: 3 });
    assert_eq!(tunnel.in_cost.get_color_count(Color::Color4), 1);
    assert_eq!(tunnel.out_cost.get_color_count(Color::Color4), 0);

    assert_eq!(tunnel.in_cost.get_color_count(Color::Color1), 1);
    assert_eq!(tunnel.out_cost.get_color_count(Color::Color1), 0);
}

#[test]
fn it_should_get_snake_path_to_outside_3() {
    let grid = get_grid_sample(snk_grid::grid_samples::SampleGrid::Caves);

    assert_eq!(grid.get_color(Point { x: 29, y: 3 }), Color::Empty);
    assert_eq!(grid.get_color(Point { x: 29, y: 4 }), Color::Color4);

    let exit_grid = ExitGrid::create_from_grid_color(&grid);

    let tunnel = get_best_tunnel_to_collect_point(&grid, &exit_grid, Point { x: 29, y: 3 });

    println!("{:?}", tunnel);

    assert_eq!(tunnel.in_cost.get_color_count(Color::Color4), 1);
    assert_eq!(tunnel.out_cost.get_color_count(Color::Color4), 0);

    assert_eq!(tunnel.in_cost.get_color_count(Color::Color1), 1);
    assert_eq!(tunnel.out_cost.get_color_count(Color::Color1), 0);
}
