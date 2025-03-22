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
pub enum Cell {
    Empty,
    Color1,
    Color2,
    Color3,
    Color4,
    Color5,
}

#[wasm_bindgen]
pub struct Grid {
    width: i8,
    height: i8,
    cells: Vec<Cell>,
}

#[wasm_bindgen]
impl Grid {
    pub fn create(width: i8, height: i8) -> Grid {
        let cells = (0..width * height).map(|_| Cell::Empty).collect();

        Grid {
            width,
            height,
            cells,
        }
    }
}

type Snake = [Point; 5];

pub fn get_index(grid: &Grid, x: i8, y: i8) -> usize {
    return (x * grid.height + y) as usize;
}

// pub fn setCell(grid:&Grid,x:i8,y:i8,c:Cell) {
//     // grid.data[getIndex(grid,x,y)]=c;
// }

pub fn get_cell(grid: &Grid, p: &Point) -> Cell {
    let i = get_index(grid, p.x, p.y);

    return grid.cells[i];
}

#[test]
fn it_works() {
    assert_eq!(2 + 2, 4);
}
