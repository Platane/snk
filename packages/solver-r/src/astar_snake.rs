use crate::grid::{get_distance, Point, DIRECTIONS};
use crate::snake::Snake;
use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashSet};

struct Node {
    h: usize,
    path: Vec<Point>,
}

impl Eq for Node {}
impl PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.path == other.path
    }
}
impl Ord for Node {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        let f1 = self.h + self.path.len();
        let f2 = other.h + other.path.len();
        f1.cmp(&f2)
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

pub fn get_snake_path<F>(mut walkable: F, snake: &Snake, end: &Point) -> Option<Vec<Point>>
where
    F: FnMut(&Point) -> bool,
{
    let snake_length = snake.len();

    let mut open_list = BinaryHeap::new();
    let mut close_list: HashSet<Vec<Point>> = HashSet::new();

    open_list.push(Reverse(Node {
        path: snake.clone(),
        h: get_distance(&snake[0], &end) as usize,
    }));

    while let Some(n) = open_list.pop() {
        let node = n.0;

        for dir in DIRECTIONS {
            let next_head = Point {
                x: node.path[0].x + dir.x,
                y: node.path[0].y + dir.y,
            };

            let head_collide_with_body = (0..snake_length).any(|i| node.path[i] == next_head);

            if head_collide_with_body {
                continue;
            }

            if &next_head == end {
                let mut path = node.path.clone();
                path.insert(0, next_head);
                return Some(path);
            }

            if !walkable(&next_head) {
                continue;
            }

            let next_path = {
                let mut path = node.path.clone();
                path.insert(0, next_head);
                path
            };

            let next_snake = &next_path[0..snake_length];

            if close_list.contains(next_snake) {
                continue;
            }

            let h = get_distance(&next_head, &end) as usize;

            open_list.push(Reverse(Node { path: next_path, h }));
        }

        let snake = {
            // TODO : avoid cloning the whole vec
            let mut s = node.path.clone();
            s.truncate(snake_length);
            s
        };

        close_list.insert(snake);
    }

    None
}

#[test]
fn it_should_find_path() {
    let path = get_snake_path(
        |_| true,
        &vec![Point { x: 0, y: 0 }, Point { x: -1, y: 0 }],
        &Point { x: 3, y: 0 },
    );

    assert_eq!(
        path,
        Some(vec![
            //
            Point { x: 3, y: 0 },
            Point { x: 2, y: 0 },
            Point { x: 1, y: 0 },
            Point { x: 0, y: 0 },
            Point { x: -1, y: 0 },
        ])
    );
}

#[test]
fn it_should_180_to_find_path() {
    let path = get_snake_path(
        |_| true,
        &vec![Point { x: 0, y: 0 }, Point { x: -1, y: 0 }],
        &Point { x: -2, y: 0 },
    );

    assert_eq!(
        path,
        Some(vec![
            Point { x: -2, y: 0 },
            Point { x: -2, y: 1 },
            Point { x: -1, y: 1 },
            Point { x: 0, y: 1 },
            Point { x: 0, y: 0 },
            Point { x: -1, y: 0 }
        ])
    );
}
