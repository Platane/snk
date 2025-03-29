mod astar;
mod grid;
mod snake;
mod snake_compact;
mod snake_walk;
mod solver;

use astar::get_path;
use grid::{Cell, Grid, Point};
use js_sys;
use solver::get_free_cell;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-game-of-life!");
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct IGrid {
    pub width: u8,
    pub height: u8,
    cells: Vec<Cell>,
}

#[wasm_bindgen]
impl IGrid {
    pub fn create(width: u8, height: u8, data: js_sys::Uint8Array) -> IGrid {
        let cells = data
            .to_vec()
            .iter()
            .map(|u| match u {
                0 => Cell::Empty,
                1 => Cell::Color1,
                2 => Cell::Color2,
                3 => Cell::Color3,
                4 => Cell::Color4,
                _ => panic!("unknown cell"),
            })
            .collect();

        IGrid {
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

impl From<IGrid> for Grid {
    fn from(value: IGrid) -> Self {
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
impl From<IPoint> for Point {
    fn from(value: IPoint) -> Self {
        Self {
            x: value.x,
            y: value.y,
        }
    }
}

#[wasm_bindgen]
pub fn iget_free_cell(grid: &IGrid) -> js_sys::Uint8Array {
    let g = Grid::from(grid.clone());

    let (_, out) = get_free_cell(&g, Cell::Color1);

    let o: Vec<u8> = out.iter().flat_map(|p| [p.x as u8, p.y as u8]).collect();

    js_sys::Uint8Array::from(&o[..])
}

#[wasm_bindgen]
pub fn iastar(grid: &IGrid, start: IPoint, end: IPoint) -> Option<js_sys::Array> {
    let g = Grid::from(grid.clone());
    let res = get_path(
        |p| {
            (!g.is_inside(p) || g.get_cell(p) <= Cell::Color1)
                && (-3 <= p.x
                    && p.x <= grid.width as i8 + 4
                    && -3 <= p.y
                    && p.y <= grid.height as i8 + 4)
        },
        &Point::from(start),
        &Point::from(end),
    );

    res.map(|l| l.into_iter().map(IPoint::from).map(JsValue::from).collect())
}
