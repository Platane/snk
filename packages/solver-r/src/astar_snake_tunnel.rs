use crate::exit_cost_grid::ExitCostGrid;
use crate::grid::{get_distance, Color, Grid, Point, DIRECTIONS};
use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashSet};

struct Node {
    distance_to_end: usize,
    weight_to_end: usize,
    // eaten: bool,
    path: Vec<Point>,
}
impl Node {
    pub fn f(&self) -> usize {
        self.distance_to_end
            + self.weight_to_end
            + if self.distance_to_end == 0 {
                // is already at the end

                // depth first approach
                let weight_after_end = self.path.len() - self.weight_to_end;

                256 - weight_after_end
            } else {
                // penalty for not be at the end

                512
            }
    }
}
impl Eq for Node {}
impl PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.path == other.path && (self.distance_to_end == 0) == (other.distance_to_end == 0)
    }
}
impl Ord for Node {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.f().cmp(&other.f())
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

pub fn get_snake_tunnel<F>(
    color_grid: &Grid<Color>,
    exit_cost_grid: &ExitCostGrid,
    walkable: Color,
    snake: &[Point],
    end: &Point,
    max_weight: usize,
) -> Option<Vec<Point>> {
    let snake_length = snake.len();

    let mut open_list: BinaryHeap<Node> = BinaryHeap::new();
    let mut close_list: HashSet<(&[Point], bool)> = HashSet::new();

    open_list.push({
        let h = get_distance(&snake[0], &end) as usize;
        Node {
            path: snake.to_vec(),
            distance_to_end: h,
            weight_to_end: 0,
        }
    });

    while let Some(node) = open_list.pop() {
        if node.f() > max_weight {
            return None;
        }

        for dir in DIRECTIONS {
            let next_head = Point {
                x: node.path[0].x + dir.x,
                y: node.path[0].y + dir.y,
            };

            let head_collide_with_body = (0..snake_length).any(|i| node.path[i] == next_head);

            if head_collide_with_body {
                continue;
            }

            if !color_grid.is_walkable(walkable, &next_head) {
                continue;
            }

            // if &next_head == end {
            //     let mut path = node.path.clone();
            //     path.insert(0, next_head);
            //     return Some(path);
            // }
            //
            let reach = node.distance_to_end == 0 || &next_head == end;

            let next_path = {
                let mut path = node.path.clone();
                path.insert(0, next_head);
                path
            };

            let next_snake = &next_path[0..snake_length];

            if close_list.contains(&(next_snake, reach)) {
                continue;
            }

            open_list.push(Reverse({
                let h = get_distance(&next_head, &end) as usize;
                let f = h + next_path.len() - snake_length;
                Node {
                    path: next_path,
                    distance_to_end: h,
                    f,
                }
            }));
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
        10,
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
        10,
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
