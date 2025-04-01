use crate::grid::{Point, DIRECTIONS, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_UP};

/**
*  head is at 0
*/
pub type Snake = Vec<Point>;

pub fn move_snake(s: &mut Snake, dir: &Point) -> () {
    let mut e = s.pop().unwrap();
    e.x = s[0].x + dir.x;
    e.y = s[0].y + dir.y;
    s.insert(0, e);
}
pub fn snake_will_self_collide(s: &[Point], dir: &Point) -> bool {
    let next_head = get_next_snake_head(s, dir);

    (&s[0..(s.len() - 1)]).contains(&next_head)
}
pub fn get_snake_head(s: &[Point]) -> Point {
    s[0]
}
pub fn get_next_snake_head(s: &[Point], dir: &Point) -> Point {
    Point {
        x: s[0].x + dir.x,
        y: s[0].y + dir.y,
    }
}

#[test]
fn it_should_return_head() {
    let s = vec![
        //
        Point { x: 3, y: 0 },
        Point { x: 2, y: 0 },
        Point { x: 1, y: 0 },
    ];

    assert_eq!(get_snake_head(&s), Point { x: 3, y: 0 });
}
#[test]
fn it_should_detect_self_collide() {
    let mut s = vec![
        //
        Point { x: 6, y: 0 },
        Point { x: 5, y: 0 },
        Point { x: 4, y: 0 },
        Point { x: 3, y: 0 },
        Point { x: 2, y: 0 },
        Point { x: 1, y: 0 },
    ];

    move_snake(&mut s, &DIRECTION_UP);
    move_snake(&mut s, &DIRECTION_LEFT);

    assert_eq!(snake_will_self_collide(&s, &DIRECTION_DOWN), true);

    move_snake(&mut s, &DIRECTION_LEFT);

    assert_eq!(snake_will_self_collide(&s, &DIRECTION_DOWN), false);
}
#[test]
fn it_should_detect_self_collide_2() {
    let s = vec![
        //
        Point { x: 3, y: 0 },
        Point { x: 2, y: 0 },
        Point { x: 1, y: 0 },
    ];

    assert_eq!(snake_will_self_collide(&s, &DIRECTION_LEFT), true);
}
#[test]
fn it_should_move_snake() {
    let mut s = vec![
        //
        Point { x: 3, y: 0 },
        Point { x: 2, y: 0 },
        Point { x: 1, y: 0 },
    ];

    move_snake(&mut s, &DIRECTION_UP);

    assert_eq!(
        s,
        vec![
            //
            Point { x: 3, y: 1 },
            Point { x: 3, y: 0 },
            Point { x: 2, y: 0 },
        ]
    );
}
