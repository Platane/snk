mod _test_grid_samples;
mod astar;
mod astar_snake;
// mod astar_snake_tunnel;
mod cave;
mod exit_cost_grid;
mod exitable;
mod grid;
mod grid_ascii;
mod pocket;
mod snake;
mod snake_self_locked;
mod snake_walk;
mod solver;

use std::usize;

use _test_grid_samples::{get_grid_sample, SampleGrid};
use grid::{Color, Grid, Point};
use js_sys;
use log::info;
use solver::get_path_to_eat_everything;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    init_panic_hook();
    console_log::init_with_level(log::Level::Debug).unwrap();

    log::info!("It works!");
    // alert("Hello, wasm-game-of-life!");
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct IColorGrid {
    pub width: u8,
    pub height: u8,
    cells: Vec<Color>,
}

#[wasm_bindgen]
impl IColorGrid {
    pub fn create(width: u8, height: u8, data: js_sys::Uint8Array) -> IColorGrid {
        let cells = data
            .to_vec()
            .iter()
            .map(|u| match u {
                0 => Color::Empty,
                1 => Color::Color1,
                2 => Color::Color2,
                3 => Color::Color3,
                4 => Color::Color4,
                _ => panic!("unknown cell"),
            })
            .collect();

        IColorGrid {
            width,
            height,
            cells,
        }
    }

    #[wasm_bindgen(getter)]
    pub fn data(&self) -> js_sys::Uint8Array {
        let o: Vec<u8> = self.cells.iter().map(|u| *u as u8).collect();
        js_sys::Uint8Array::from(&o[..])
    }
}

impl From<IColorGrid> for Grid<Color> {
    fn from(value: IColorGrid) -> Self {
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
impl From<Point> for IPoint {
    fn from(value: Point) -> Self {
        Self {
            x: value.x,
            y: value.y,
        }
    }
}
impl From<&Point> for IPoint {
    fn from(value: &Point) -> Self {
        Self {
            x: value.x,
            y: value.y,
        }
    }
}
impl From<IPoint> for Point {
    fn from(value: IPoint) -> Self {
        Self {
            x: value.x,
            y: value.y,
        }
    }
}
impl From<&IPoint> for Point {
    fn from(value: &IPoint) -> Self {
        Self {
            x: value.x,
            y: value.y,
        }
    }
}

type ISnake = Vec<IPoint>;

#[wasm_bindgen]
pub fn get_color_grid_sample(sample: SampleGrid) -> IColorGrid {
    let g = get_grid_sample(sample);
    IColorGrid {
        width: g.width,
        height: g.height,
        cells: g.cells,
    }
}

#[wasm_bindgen]
pub fn solve(grid: &IColorGrid, snake: ISnake) -> Vec<IPoint> {
    let grid = Grid::from(grid.clone());
    let snake: Vec<Point> = snake.iter().map(Point::from).collect();

    let path = get_path_to_eat_everything(&grid, &snake);

    path.iter().map(IPoint::from).collect()
}

#[wasm_bindgen]
pub fn get_snake_path(grid: &IColorGrid, snake: ISnake, end: IPoint) -> Option<Vec<IPoint>> {
    let grid = Grid::from(grid.clone());
    let snake: Vec<Point> = snake.iter().map(Point::from).collect();
    let end = Point::from(end);

    let margin = (snake.len() / 2) as i8;
    let res = astar_snake::get_snake_path(
        |p| grid.is_walkable(Color::Color1, &p) && grid.is_inside_margin(&p, margin),
        &snake,
        &end,
        usize::MAX,
    );

    res.map(|path| path.into_iter().map(IPoint::from).collect())
}
