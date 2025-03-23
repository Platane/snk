mod grid;
mod solver;

use grid::{Cell, Grid};
use js_sys;
use solver::get_free_cell;
use wasm_bindgen::prelude::*;

use log::info;
use log::Level;

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
pub fn iget_free_cell(grid: &IGrid) -> js_sys::Uint8Array {
    let g = Grid::from(grid.clone());

    let out = get_free_cell(&g, Cell::Color1);

    let o: Vec<u8> = out.iter().flat_map(|p| [p.x as u8, p.y as u8]).collect();

    js_sys::Uint8Array::from(&o[..])
}
