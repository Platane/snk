use std::collections::HashSet;

use crate::point::{Point, add};

#[derive(Copy, Clone, Hash, Eq, PartialEq, Debug)]
#[repr(u8)]
pub enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

pub const DIRECTIONS: [Direction; 4] = [
    Direction::UP,
    Direction::DOWN,
    Direction::LEFT,
    Direction::RIGHT,
];

impl Into<Point> for Direction {
    fn into(self) -> Point {
        match self {
            Direction::UP => Point { x: 0, y: -1 },
            Direction::DOWN => Point { x: 0, y: 1 },
            Direction::LEFT => Point { x: -1, y: 0 },
            Direction::RIGHT => Point { x: 1, y: 0 },
        }
    }
}

impl Direction {
    pub fn to_point(&self) -> Point {
        match self {
            Direction::UP => Point { x: 0, y: -1 },
            Direction::DOWN => Point { x: 0, y: 1 },
            Direction::LEFT => Point { x: -1, y: 0 },
            Direction::RIGHT => Point { x: 1, y: 0 },
        }
    }

    pub fn get_opposite(&self) -> Direction {
        match self {
            Direction::UP => Direction::DOWN,
            Direction::DOWN => Direction::UP,
            Direction::LEFT => Direction::RIGHT,
            Direction::RIGHT => Direction::LEFT,
        }
    }

    pub fn iter() -> impl Iterator<Item = Direction> {
        DIRECTIONS.iter().map(|dir| dir.clone())
    }
}

impl ToString for Direction {
    fn to_string(&self) -> String {
        match self {
            Direction::UP => "↑".to_string(),
            Direction::DOWN => "↓".to_string(),
            Direction::LEFT => "←".to_string(),
            Direction::RIGHT => "→".to_string(),
        }
    }
}

pub fn add_direction(a: Point, dir: Direction) -> Point {
    add(a, dir.to_point())
}

pub fn iter_directions() -> impl Iterator<Item = Direction> {
    DIRECTIONS.iter().map(|dir| dir.clone())
}

pub fn iter_neighbour(p: Point) -> impl Iterator<Item = Point> {
    iter_directions().map(move |dir| add_direction(p, dir))
}

pub fn sub_direction(a: Point, b: Point) -> Direction {
    let x = a.x - b.x;
    let y = a.y - b.y;
    match (x, y) {
        (0, 1) => Direction::UP,
        (0, -1) => Direction::DOWN,
        (-1, 0) => Direction::LEFT,
        (1, 0) => Direction::RIGHT,
        _ => panic!("Invalid direction"),
    }
}

#[test]
fn it_should_iter_direction() {
    let directions: HashSet<_> = iter_directions().collect();

    assert_eq!(
        directions,
        HashSet::from([
            Direction::UP,
            Direction::DOWN,
            Direction::LEFT,
            Direction::RIGHT,
        ])
    );
}

#[test]
fn it_should_iter_direction_point() {
    let directions: HashSet<_> = iter_directions().map(|d| d.to_point()).collect();

    assert_eq!(
        directions,
        HashSet::from([
            Point { x: 0, y: 1 },
            Point { x: 0, y: -1 },
            Point { x: -1, y: 0 },
            Point { x: 1, y: 0 }
        ])
    );
}
