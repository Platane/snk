use std::collections::HashSet;

use crate::grid_ascii::{grid_from_ascii, grid_to_ascii};

pub const DIRECTION_RIGHT: Point = Point { x: 1, y: 0 };
pub const DIRECTION_LEFT: Point = Point { x: -1, y: 0 };
pub const DIRECTION_UP: Point = Point { x: 0, y: 1 };
pub const DIRECTION_DOWN: Point = Point { x: 0, y: -1 };
pub const DIRECTIONS: [Point; 4] = [
    DIRECTION_RIGHT,
    DIRECTION_LEFT,
    DIRECTION_UP,
    DIRECTION_DOWN,
];

#[derive(Copy, Clone, Hash, Eq, PartialEq, Debug)]
pub struct Point {
    pub x: i8,
    pub y: i8,
}
pub fn iter_neighbour4(p: &Point) -> impl Iterator<Item = Point> {
    let mut i: usize = 0;
    let px = p.x;
    let py = p.y;
    std::iter::from_fn(move || {
        let out = DIRECTIONS.get(i).map(|dir| Point {
            x: px + dir.x,
            y: py + dir.y,
        });

        i += 1;
        out
    })
}
pub fn add(a: &Point, b: &Point) -> Point {
    Point {
        x: a.x + b.x,
        y: a.y + b.y,
    }
}
pub fn get_distance(a: &Point, b: &Point) -> u8 {
    (a.x - b.x).abs() as u8 + (a.y - b.y).abs() as u8
}

#[derive(Copy, Clone, Debug, PartialEq, PartialOrd)]
#[repr(u8)]
pub enum Color {
    Empty = 0,
    Color1 = 1,
    Color2 = 2,
    Color3 = 3,
    Color4 = 4,
}
impl Default for Color {
    fn default() -> Self {
        Color::Empty
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct Grid<T: Copy> {
    pub width: u8,
    pub height: u8,
    pub cells: Vec<T>,
}
impl<T: Copy> Grid<T> {
    fn get_index(&self, x: i8, y: i8) -> usize {
        return (x as usize) * (self.height as usize) + (y as usize);
    }

    pub fn fill(&mut self, value: T) -> () {
        let n = (self.width as usize) * (self.height as usize);
        for i in 0..n {
            self.cells[i] = value;
        }
    }
    pub fn get(&self, p: &Point) -> T {
        let i = self.get_index(p.x, p.y);
        return self.cells[i];
    }
    pub fn set(&mut self, p: &Point, value: T) -> () {
        let i = self.get_index(p.x, p.y);
        self.cells[i] = value;
    }
    pub fn is_inside(&self, p: &Point) -> bool {
        0 <= p.x && p.x < (self.width as i8) && 0 <= p.y && p.y < (self.height as i8)
    }
    pub fn is_inside_margin(&self, p: &Point, m: i8) -> bool {
        -m <= p.x && p.x < (self.width as i8) + m && -m <= p.y && p.y < (self.height as i8) + m
    }

    /**
     * ⚠️ assuming the point is inside the grid
     */
    pub fn distance_from_outside(&self, p: &Point) -> u8 {
        let x = p.x as u8;
        let y = p.y as u8;
        y.min(self.height - 1 - y).min(x).min(self.width - 1 - x)
    }
    pub fn iter(&self) -> impl Iterator<Item = Point> {
        let mut i = 0;
        let width = self.width;
        let height = self.height as usize;
        std::iter::from_fn(move || {
            let p = Point {
                x: (i / height) as i8,
                y: (i % height) as i8,
            };

            i += 1;

            if p.x >= (width as i8) {
                None
            } else {
                Some(p)
            }
        })
    }
    pub fn iter_hull(&self) -> impl Iterator<Item = Point> {
        let mut i: usize = 0;
        let width = self.width as usize;
        let height = self.height as usize;
        std::iter::from_fn(move || {
            let mut p = Point { x: 0, y: 0 };

            let mut k = i;

            if k < width {
                p.x = k as i8;
                p.y = 0;
            } else {
                k -= width;
                if k < width {
                    p.x = k as i8;
                    p.y = (height - 1) as i8;
                } else {
                    k -= width;
                    if k < height {
                        p.x = 0;
                        p.y = k as i8;
                    } else {
                        k -= height;
                        if k < height {
                            p.x = (width - 1) as i8;
                            p.y = k as i8;
                        } else {
                            return None;
                        }
                    }
                }
            }

            i += 1;

            Some(p)
        })
    }
}
impl<T: Default + Copy> Grid<T> {
    pub fn create(width: u8, height: u8) -> Grid<T> {
        let n = (width as usize) * (height as usize);
        let cells = (0..n).map(|_| T::default()).collect();

        Grid {
            width,
            height,
            cells,
        }
    }
}
impl<T: Copy> Grid<T> {
    pub fn create_with(width: u8, height: u8, item: T) -> Grid<T> {
        let n = (width as usize) * (height as usize);
        let cells = (0..n).map(|_| item).collect();

        Grid {
            width,
            height,
            cells,
        }
    }
}

impl Grid<Color> {
    pub fn is_walkable(&self, walkable: Color, p: &Point) -> bool {
        !self.is_inside(p) || self.get(p) <= walkable
    }
}

#[test]
fn it_should_sort_cell() {
    assert_eq!(Color::Empty < Color::Color1, true);
    assert_eq!(Color::Color1 < Color::Color2, true);
    assert_eq!(Color::Color2 < Color::Color3, true);
    assert_eq!(Color::Color3 < Color::Color4, true);
}
#[test]
fn it_should_grid_create() {
    let grid = Grid::<Color>::create(30, 10);

    assert_eq!(grid.width, 30);
    assert_eq!(grid.height, 10);
    assert_eq!(grid.get(&Point { x: 2, y: 3 }), Color::Empty);
}
#[test]
fn it_should_grid_setter() {
    let mut grid = Grid::<Color>::create(20, 10);

    grid.set(&Point { x: 12, y: 3 }, Color::Color1);

    assert_eq!(grid.get(&Point { x: 12, y: 3 }), Color::Color1);
}
#[test]
fn it_should_iterate() {
    let grid = Grid::<Color>::create(2, 2);

    assert_eq!(
        grid.iter().collect::<HashSet<_>>(),
        HashSet::from([
            Point { x: 0, y: 0 },
            Point { x: 0, y: 1 },
            Point { x: 1, y: 0 },
            Point { x: 1, y: 1 },
        ])
    );
}
#[test]
fn it_should_iterate_hull() {
    let grid = Grid::<Color>::create(3, 3);

    assert_eq!(
        grid.iter_hull().collect::<HashSet<_>>(),
        HashSet::from([
            Point { x: 0, y: 0 },
            Point { x: 0, y: 1 },
            Point { x: 0, y: 2 },
            Point { x: 2, y: 0 },
            Point { x: 2, y: 1 },
            Point { x: 2, y: 2 },
            Point { y: 0, x: 0 },
            Point { y: 0, x: 1 },
            Point { y: 0, x: 2 },
            Point { y: 2, x: 0 },
            Point { y: 2, x: 1 },
            Point { y: 2, x: 2 },
        ])
    );
}
