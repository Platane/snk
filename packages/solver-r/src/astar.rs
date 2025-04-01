use crate::grid::{get_distance, Point, DIRECTIONS};
use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

struct Node {
    point: Point,
    weight: u8,
    h: u8,
    parent: Option<Point>,
}

impl Eq for Node {}
impl PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.parent == other.parent && self.point == other.point
    }
}
impl Ord for Node {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        let f1 = self.h + self.weight;
        let f2 = other.h + other.weight;
        f1.cmp(&f2)
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

fn get_heuristic(a: &Point, b: &Point) -> u8 {
    get_distance(a, b)
}

pub fn get_path<F>(mut walkable: F, start: &Point, end: &Point) -> Option<Vec<Point>>
where
    F: FnMut(&Point) -> bool,
{
    let mut open_list = BinaryHeap::new();
    let mut close_list: HashMap<Point, Node> = HashMap::new();

    open_list.push(Reverse(Node {
        point: start.clone(),
        parent: None,
        h: get_heuristic(start, end),
        weight: 0,
    }));

    while let Some(n) = open_list.pop() {
        let node = n.0;

        for dir in DIRECTIONS {
            let point = Point {
                x: node.point.x + dir.x,
                y: node.point.y + dir.y,
            };

            if !walkable(&point) {
                continue;
            }

            let weight = node.weight + 1;
            let parent = node.point;

            if let Some(closed) = close_list.get_mut(&point) {
                if weight < closed.weight {
                    closed.parent = Some(parent);
                    closed.weight = weight;
                }

                continue;
            }

            if &point == end {
                let mut path = Vec::new();
                let mut e = &node;

                path.push(point);
                path.push(e.point);

                while let Some(p) = e.parent {
                    e = close_list.get(&p).unwrap();
                    path.push(e.point);
                }

                path.reverse();

                return Some(path);
            }

            open_list.push(Reverse(Node {
                h: get_heuristic(&point, end),
                parent: Some(parent),
                point,
                weight,
            }));
        }

        close_list.insert(node.point, node);
    }

    None
}

#[test]
fn it_should_find_path() {
    let path = get_path(|_| true, &Point { x: 0, y: 0 }, &Point { x: 5, y: 0 });

    assert_eq!(
        path,
        Some(vec![
            //
            Point { x: 0, y: 0 },
            Point { x: 1, y: 0 },
            Point { x: 2, y: 0 },
            Point { x: 3, y: 0 },
            Point { x: 4, y: 0 },
            Point { x: 5, y: 0 },
        ])
    );
}
#[test]
fn it_should_find_path_2() {
    let walls = vec![
        //
        Point { x: 1, y: 0 },
        Point { x: 1, y: 1 },
        Point { x: 1, y: 2 },
    ];
    let path = get_path(
        |p| !walls.contains(p),
        &Point { x: 0, y: 0 },
        &Point { x: 5, y: 0 },
    );

    assert_eq!(
        path,
        Some(vec![
            //
            Point { x: 0, y: 0 },
            Point { x: 0, y: -1 },
            Point { x: 1, y: -1 },
            Point { x: 2, y: -1 },
            Point { x: 2, y: 0 },
            Point { x: 3, y: 0 },
            Point { x: 4, y: 0 },
            Point { x: 5, y: 0 }
        ])
    );
}
