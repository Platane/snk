use crate::grid::Point;

#[derive(Copy, Clone, Debug, PartialEq, PartialOrd)]
pub enum Direction {
    Left = 0,
    Right = 1,
    Up = 2,
    Down = 3,
}

fn get_direction_vector(dir: Direction) -> Point {
    match dir {
        Direction::Down => Point { x: 0, y: -1 },
        Direction::Up => Point { x: 0, y: 1 },
        Direction::Left => Point { x: -1, y: 0 },
        Direction::Right => Point { x: 1, y: 0 },
    }
}
fn get_direction_from_vector(v: &Point) -> Direction {
    match v {
        Point { x: 0, y: -1 } => Direction::Down,
        Point { x: 0, y: 1 } => Direction::Up,
        Point { x: -1, y: 0 } => Direction::Left,
        Point { x: 1, y: 0 } => Direction::Right,
        _ => panic!(),
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
            let v = get_direction_vector(*dir);
            e.x -= v.x;
            e.y -= v.y;
            out.push(e.clone());
        }

        out
    }

    pub fn is_head_self_colliding(&self) -> bool {
        self.get_cells()[1..].contains(&self.head)
    }

    pub fn advance(&mut self, dir: Direction) -> () {
        let v = get_direction_vector(dir);

        self.head.x += v.x;
        self.head.y += v.y;

        self.body.pop();
        self.body.insert(0, dir);
    }
}

impl From<Vec<Point>> for SnakeC {
    fn from(value: Vec<Point>) -> Self {
        let head = value.get(0).unwrap().clone();
        let body = value
            .windows(2)
            .map(|w| {
                let v = Point {
                    x: w[0].x - w[1].x,
                    y: w[0].y - w[1].y,
                };
                get_direction_from_vector(&v)
            })
            .collect();

        Self { head, body }
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

#[test]
fn it_should_get_snake_from_point_list() {
    let s = SnakeC::from(vec![
        //
        Point { x: 10, y: 5 },
        Point { x: 10, y: 4 },
        Point { x: 10, y: 3 },
        Point { x: 11, y: 3 },
        Point { x: 12, y: 3 },
        Point { x: 12, y: 2 },
    ]);

    assert_eq!(
        s.get_cells(),
        vec![
            //
            Point { x: 10, y: 5 },
            Point { x: 10, y: 4 },
            Point { x: 10, y: 3 },
            Point { x: 11, y: 3 },
            Point { x: 12, y: 3 },
            Point { x: 12, y: 2 },
        ]
    );
}

#[test]
fn it_should_advance_snake() {
    let mut s = SnakeC::from(vec![
        //
        Point { x: 10, y: 3 },
        Point { x: 11, y: 3 },
        Point { x: 12, y: 3 },
        Point { x: 12, y: 2 },
    ]);

    s.advance(Direction::Up);

    assert_eq!(
        s.get_cells(),
        vec![
            //
            Point { x: 10, y: 4 },
            Point { x: 10, y: 3 },
            Point { x: 11, y: 3 },
            Point { x: 12, y: 3 },
        ]
    );
}

#[test]
fn it_should_detect_self_collision() {
    let mut s = SnakeC::from(vec![
        //
        Point { x: 0, y: 0 },
        Point { x: 0, y: 1 },
        Point { x: 0, y: 2 },
        Point { x: 0, y: 3 },
        Point { x: 0, y: 4 },
        Point { x: 0, y: 5 },
        Point { x: 0, y: 6 },
    ]);

    assert_eq!(s.is_head_self_colliding(), false);

    s.advance(Direction::Right);
    s.advance(Direction::Up);
    s.advance(Direction::Up);

    assert_eq!(s.is_head_self_colliding(), false);

    s.advance(Direction::Left);

    assert_eq!(s.is_head_self_colliding(), true);
}
