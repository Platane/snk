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
#[derive(Copy, Clone, Debug, PartialEq)]
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
    pub fn create_empty(width: i8, height: i8) -> Grid {
        let n = (width as usize) * (height as usize);
        let cells = (0..n).map(|_| Cell::Empty).collect();

        Grid {
            width,
            height,
            cells,
        }
    }
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
    return (x as usize) * (grid.height as usize) + (y as usize);
}

pub fn get_cell(grid: &Grid, p: &Point) -> Cell {
    let i = get_index(grid, p.x, p.y);
    return grid.cells[i];
}
pub fn set_cell(grid: &mut Grid, p: &Point, value: Cell) -> () {
    let i = get_index(&grid, p.x, p.y);
    grid.cells[i] = value;
}

#[test]
fn grid_create() {
    let grid = Grid::create_empty(30, 10);

    assert_eq!(grid.width, 30);
    assert_eq!(grid.height, 10);
    assert_eq!(get_cell(&grid, &Point { x: 2, y: 3 }), Cell::Empty);
}
#[test]
fn grid_setter() {
    let mut grid = Grid::create_empty(20, 10);

    set_cell(&mut grid, &Point { x: 12, y: 3 }, Cell::Color1);

    assert_eq!(get_cell(&grid, &Point { x: 12, y: 3 }), Cell::Color1);
}
