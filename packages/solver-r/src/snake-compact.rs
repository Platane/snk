use crate::grid::Point;

#[derive(Copy, Clone, Debug, PartialEq, PartialOrd)]
pub enum Direction {
    Left = 0,
    Right = 1,
    Up = 2,
    Down = 3,
}

fn get_direction_vector(dir: &Direction) -> Point {
    match dir {
        Direction::Down => Point { x: 0, y: -1 },
        Direction::Up => Point { x: 0, y: 1 },
        Direction::Left => Point { x: -1, y: 0 },
        Direction::Right => Point { x: 1, y: 0 },
    }
}

#[derive(Clone)]
pub struct SnakeC {
    pub head: Point,
    pub body: Vec<Direction>,
}
impl SnakeC {
    pub fn get_cells(&self) -> Vec<Point> {
        let mut e = self.head.clone();
        let mut out = Vec::new();

        out.push(e.clone());
        for dir in self.body.iter() {
            let v = get_direction_vector(dir);
            e.x -= v.x;
            e.y -= v.y;
            out.push(e.clone());
        }

        out
    }
}

#[test]
fn it_should_get_the_snake_cell() {
    let s = SnakeC {
        head: Point { x: 10, y: 5 },
        body: vec![Direction::Up, Direction::Up, Direction::Left],
    };

    assert_eq!(
        s.get_cells(),
        vec![
            //
            Point { x: 10, y: 5 },
            Point { x: 10, y: 4 },
            Point { x: 10, y: 3 },
            Point { x: 11, y: 3 },
        ]
    );
}
