use js_sys;
use snk_grid::{
    color::Color,
    grid_samples::SampleGrid,
    point::Point,
    snake::{Snake, Snake4},
};
use snk_solver::cost::Cost;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn init_log() {
    console_log::init_with_level(log::Level::Debug).unwrap();
    log::info!("It works!");
}

#[wasm_bindgen]
pub fn get_snake_path(grid: IColorGrid, snake: Vec<IPoint>, to: IPoint) -> Option<Vec<IPoint>> {
    let grid = snk_grid::grid::Grid::from(grid);
    let snake = Snake4::from_points(
        snake
            .into_iter()
            .map(|p| Point::from(p))
            .collect::<Vec<_>>()
            .try_into()
            .expect("snake should be 4 points"),
    );
    let res = snk_solver::snake_path::get_snake_path(&grid, &snake, to.into(), Cost::max());

    res.map(|(d, _)| {
        d.into_iter()
            .map(|dir| dir.to_point())
            .map(IPoint::from)
            .collect()
    })
}
#[wasm_bindgen]
pub fn get_best_tunnel_to_collect_point(grid: &IColorGrid, to: &IPoint) -> Vec<IPoint> {
    let grid = snk_grid::grid::Grid::from(grid);
    let exit_grid = snk_solver::exit_grid::ExitGrid::create_from_grid_color(&grid);
    let res =
        snk_solver::best_tunnel::get_best_tunnel_to_collect_point(&grid, &exit_grid, to.into());

    log::info!("{:?} {:?} {:?}", res.path, res.in_cost, res.out_cost);

    res.path.into_iter().map(IPoint::from).collect()
}
#[wasm_bindgen]
pub fn get_snake_path_to_outside(grid: &IColorGrid, snake: Vec<IPoint>) -> Vec<IPoint> {
    let grid = snk_grid::grid::Grid::from(grid);
    let exit_grid = snk_solver::exit_grid::ExitGrid::create_from_grid_color(&grid);
    let snake = Snake4::from_points(
        snake
            .into_iter()
            .map(|p| Point::from(p))
            .collect::<Vec<_>>()
            .try_into()
            .expect("snake should be 4 points"),
    );
    let res = snk_solver::snake_path_to_outside::get_snake_path_to_outside(
        |p| exit_grid.is_outside(p),
        |p| grid.get_color(p).into(),
        &snake,
    );

    let mut p = snake.get_head();
    res.0
        .into_iter()
        .map(|dir| {
            p = p + dir.to_point();
            p
        })
        .map(IPoint::from)
        .collect()
}

#[wasm_bindgen]
pub fn solve(grid: &IColorGrid, snake: Vec<IPoint>) -> Vec<IPoint> {
    let grid = snk_grid::grid::Grid::from(grid);
    let snake = Snake4::from_points(
        snake
            .into_iter()
            .map(|p| Point::from(p))
            .collect::<Vec<_>>()
            .try_into()
            .expect("snake should be 4 points"),
    );
    let res = snk_solver::solver::solve(&grid, &snake);

    log::info!("{:?}", res);

    res.into_iter()
        .map(|dir| dir.to_point())
        .map(IPoint::from)
        .collect()
}

#[wasm_bindgen]
pub fn get_grid_sample(sample_name: String) -> IColorGrid {
    snk_grid::grid_samples::get_grid_sample(match &sample_name[..] {
        "empty" => SampleGrid::Empty,
        "labyrinth" => SampleGrid::Labyrinth,
        "caves" => SampleGrid::Caves,
        "cave" => SampleGrid::OneCave,
        "cave2" => SampleGrid::OneSmallCave,
        "realistic" => SampleGrid::Realistic,
        "one-dot" => SampleGrid::OneDot,
        "solid-block" => SampleGrid::SolidBlock,
        _ => panic!("unknown sample"),
    })
    .into()
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct IColorGrid {
    pub width: i8,
    pub height: i8,
    cells: Vec<Color>,
}

#[wasm_bindgen]
impl IColorGrid {
    pub fn create(width: i8, height: i8, data: js_sys::Uint8Array) -> IColorGrid {
        if (width as usize) * (height as usize) != (data.length() as usize) {
            panic!(
                "grid {}x{} should have {} elements, found {}",
                width,
                height,
                (width as usize) * (height as usize),
                data.length()
            );
        }

        let cells: Vec<Color> = data.to_vec().iter().map(|u| Color::from(*u)).collect();

        IColorGrid {
            width,
            height,
            cells,
        }
    }

    #[wasm_bindgen(getter)]
    pub fn cells(&self) -> js_sys::Uint8Array {
        let o: Vec<u8> = self.cells.iter().map(|u| *u as u8).collect();
        js_sys::Uint8Array::from(&o[..])
    }

    pub fn set(&mut self, x: i8, y: i8, color: u8) {
        self.cells[(x as usize) * (self.height as usize) + (y as usize)] = color.into();
    }
}

impl From<IColorGrid> for snk_grid::grid::Grid<Color> {
    fn from(value: IColorGrid) -> Self {
        Self {
            width: value.width,
            height: value.height,
            cells: value.cells,
        }
    }
}
impl From<&IColorGrid> for snk_grid::grid::Grid<Color> {
    fn from(value: &IColorGrid) -> Self {
        Self {
            width: value.width,
            height: value.height,
            cells: value.cells.clone(),
        }
    }
}
impl From<snk_grid::grid::Grid<Color>> for IColorGrid {
    fn from(value: snk_grid::grid::Grid<Color>) -> Self {
        Self {
            width: value.width,
            height: value.height,
            cells: value.cells,
        }
    }
}

#[wasm_bindgen]
pub struct IPoint {
    pub x: i8,
    pub y: i8,
}
#[wasm_bindgen]
impl IPoint {
    pub fn create(x: i8, y: i8) -> IPoint {
        IPoint { x, y }
    }
}
impl From<snk_grid::point::Point> for IPoint {
    fn from(value: snk_grid::point::Point) -> Self {
        Self {
            x: value.x,
            y: value.y,
        }
    }
}
impl From<&snk_grid::point::Point> for IPoint {
    fn from(value: &snk_grid::point::Point) -> Self {
        Self {
            x: value.x,
            y: value.y,
        }
    }
}
impl From<IPoint> for snk_grid::point::Point {
    fn from(value: IPoint) -> Self {
        Self {
            x: value.x,
            y: value.y,
        }
    }
}
impl From<&IPoint> for snk_grid::point::Point {
    fn from(value: &IPoint) -> Self {
        Self {
            x: value.x,
            y: value.y,
        }
    }
}
