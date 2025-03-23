#[derive(Copy, Clone, Hash, Eq, PartialEq, Debug)]
pub struct Point {
    pub x: u8,
    pub y: u8,
}

#[derive(Copy, Clone, Debug, PartialEq)]
#[repr(u8)]
pub enum Cell {
    Empty = 0,
    Color1 = 1,
    Color2 = 2,
    Color3 = 3,
    Color4 = 4,
}

#[derive(Clone)]
pub struct Grid {
    pub width: u8,
    pub height: u8,
    pub cells: Vec<Cell>,
}
impl Grid {
    pub fn create_empty(width: u8, height: u8) -> Grid {
        let n = (width as usize) * (height as usize);
        let cells = (0..n).map(|_| Cell::Empty).collect();

        Grid {
            width,
            height,
            cells,
        }
    }

    pub fn get_index(&self, x: u8, y: u8) -> usize {
        return (x as usize) * (self.height as usize) + (y as usize);
    }
    pub fn get_cell(&self, p: &Point) -> Cell {
        let i = self.get_index(p.x, p.y);
        return self.cells[i];
    }
    pub fn set_cell(&mut self, p: &Point, value: Cell) -> () {
        let i = self.get_index(p.x, p.y);
        self.cells[i] = value;
    }
}

#[test]
fn it_should_grid_create() {
    let grid = Grid::create_empty(30, 10);

    assert_eq!(grid.width, 30);
    assert_eq!(grid.height, 10);
    assert_eq!(grid.get_cell(&Point { x: 2, y: 3 }), Cell::Empty);
}
#[test]
fn it_should_grid_setter() {
    let mut grid = Grid::create_empty(20, 10);

    grid.set_cell(&Point { x: 12, y: 3 }, Cell::Color1);

    assert_eq!(grid.get_cell(&Point { x: 12, y: 3 }), Cell::Color1);
}
