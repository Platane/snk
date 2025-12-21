use crate::{color::Color, point::Point};

pub fn iter_rectangle_fill(width: i8, height: i8) -> impl Iterator<Item = Point> {
    (0..height).flat_map(move |y| (0..width).map(move |x| Point { x, y }))
}
pub fn iter_rectangle_hull(width: i8, height: i8) -> impl Iterator<Item = Point> {
    (1..(width - 1))
        .map(|x| Point { x, y: 0 })
        .chain((1..(width - 1)).map(move |x| Point { x, y: height - 1 }))
        .chain((0..height).map(move |y| Point { x: 0, y }))
        .chain((0..height).map(move |y| Point { x: width - 1, y }))
}

#[derive(Clone, Debug, PartialEq)]
pub struct Grid<T: Copy> {
    pub width: i8,
    pub height: i8,
    pub cells: Vec<T>,
}
impl<T: Copy> Grid<T> {
    fn get_index(&self, x: i8, y: i8) -> usize {
        return (x as usize) * (self.height as usize) + (y as usize);
    }

    pub fn copy(&mut self, other: &Self) -> () {
        self.cells.clone_from_slice(&other.cells);
    }
    pub fn fill(&mut self, value: T) -> () {
        self.cells.fill(value);
    }
    pub fn get(&self, p: Point) -> T {
        let i = self.get_index(p.x, p.y);
        return self.cells[i];
    }
    pub fn get_mut(&mut self, p: Point) -> &mut T {
        let i = self.get_index(p.x, p.y);
        return self.cells.get_mut(i).unwrap();
    }
    pub fn set(&mut self, p: Point, value: T) -> () {
        let i = self.get_index(p.x, p.y);
        self.cells[i] = value;
    }
    pub fn is_inside(&self, p: Point) -> bool {
        0 <= p.x && p.x < (self.width as i8) && 0 <= p.y && p.y < (self.height as i8)
    }
    pub fn is_inside_margin(&self, p: Point, m: i8) -> bool {
        -m <= p.x && p.x < (self.width as i8) + m && -m <= p.y && p.y < (self.height as i8) + m
    }

    /// ⚠️ assuming the point is inside the grid
    pub fn distance_from_outside(&self, p: Point) -> i8 {
        p.y.min(self.height - 1 - p.y)
            .min(p.x)
            .min(self.width - 1 - p.x)
    }

    pub fn create_with_value(width: i8, height: i8, value: T) -> Grid<T> {
        let n = (width as usize) * (height as usize);
        let cells = (0..n).map(|_| value).collect();

        Grid {
            width,
            height,
            cells,
        }
    }

    pub fn iter_fill(&mut self) -> impl Iterator<Item = Point> {
        iter_rectangle_fill(self.width as i8, self.height as i8)
    }

    pub fn iter_hull(&mut self) -> impl Iterator<Item = Point> {
        iter_rectangle_hull(self.width as i8, self.height as i8)
    }
}
impl<T: Default + Copy> Grid<T> {
    pub fn create_with_default(width: i8, height: i8) -> Grid<T> {
        let n = (width as usize) * (height as usize);
        let cells = (0..n).map(|_| T::default()).collect();

        Grid {
            width,
            height,
            cells,
        }
    }
}

impl Grid<Color> {
    pub fn is_walkable(&self, walkable: Color, p: Point) -> bool {
        self.get_color(p).is_walkable(walkable)
    }
    pub fn get_color(&self, p: Point) -> Color {
        if !self.is_inside(p) {
            Color::Empty
        } else {
            self.get(p)
        }
    }
}

#[test]
fn it_should_grid_create() {
    let grid = Grid::<Color>::create_with_default(30, 10);

    assert_eq!(grid.width, 30);
    assert_eq!(grid.height, 10);
    assert_eq!(grid.get(Point { x: 2, y: 3 }), Color::Empty);
}
#[test]
fn it_should_grid_setter() {
    let mut grid = Grid::<Color>::create_with_default(20, 10);

    grid.set(Point { x: 12, y: 3 }, Color::Color1);

    assert_eq!(grid.get(Point { x: 12, y: 3 }), Color::Color1);
}
#[test]
fn it_should_iterate() {
    assert_eq!(
        iter_rectangle_fill(2, 2).collect::<std::collections::HashSet<_>>(),
        std::collections::HashSet::from([
            Point { x: 0, y: 0 },
            Point { x: 0, y: 1 },
            Point { x: 1, y: 0 },
            Point { x: 1, y: 1 },
        ])
    );
}

#[test]
fn it_should_iterate_hull() {
    assert_eq!(
        iter_rectangle_hull(3, 3).collect::<std::collections::HashSet<_>>(),
        std::collections::HashSet::from([
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
