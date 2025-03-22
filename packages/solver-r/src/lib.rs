use js_sys;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-game-of-life!");
}

#[derive(Copy, Clone)]
pub struct Point {
    x: i8,
    y: i8,
}

#[wasm_bindgen]
#[derive(Copy, Clone)]
#[repr(u8)]
pub enum Cell {
    Empty = 0,
    Color1 = 1,
    Color2 = 2,
    Color3 = 3,
    Color4 = 4,
    Color5 = 5,
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct Grid {
    pub width: i8,
    pub height: i8,
    cells: Vec<Cell>,
}

#[wasm_bindgen]
impl Grid {
    pub fn create(width: i8, height: i8, data: js_sys::Uint8Array) -> Grid {
        let cells = data
            .to_vec()
            .iter()
            .map(|u| match u {
                0 => Cell::Empty,
                1 => Cell::Color1,
                2 => Cell::Color2,
                3 => Cell::Color3,
                4 => Cell::Color4,
                5 => Cell::Color5,
                _ => panic!("unknown cell"),
            })
            .collect();

        Grid {
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
}

type Snake = [Point; 5];

pub fn get_index(grid: &Grid, x: i8, y: i8) -> usize {
    return (x * grid.height + y) as usize;
}

#[wasm_bindgen]
pub fn get_cell(grid: &Grid, x: i8, y: i8) -> Cell {
    let i = get_index(grid, x, y);

    return grid.cells[i];
}

#[test]
fn it_works() {
    assert_eq!(2 + 2, 4);
}
