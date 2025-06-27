use std::collections::{BinaryHeap, HashSet};

use crate::grid::{add, get_distance, Point, DIRECTIONS};

struct Node {
    w: usize,
    h: usize,
    f: usize,
    snake: Vec<Point>,
}

impl Eq for Node {}
impl PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.snake == other.snake
    }
}
impl Ord for Node {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.f.cmp(&other.f)
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

// the snake is not self locked if it can find a way for this head to reach the current tail position
pub fn is_snake_self_locked<F>(walkable: F, snake: &[Point]) -> bool
where
    F: Fn(&Point) -> bool,
{
    let end = &snake[snake.len() - 1];
    let snake_len = snake.len();

    let mut open_list = BinaryHeap::new();
    let mut close_list: HashSet<Vec<Point>> = HashSet::new();

    open_list.push({
        let h = get_distance(&snake[0], &end) as usize;
        Node {
            snake: snake.to_vec(),
            h,
            f: h,
            w: 0,
        }
    });

    while let Some(node) = open_list.pop() {
        for dir in DIRECTIONS {
            let next_head = add(&node.snake[0], &dir);

            if !walkable(&next_head) {
                continue;
            }

            let head_collide_with_body = (0..snake_len).any(|i| node.snake[i] == next_head);

            if head_collide_with_body {
                continue;
            }

            if &next_head == end {
                return true;
            }

            let next_snake = {
                let mut snake = node.snake.clone();
                snake.insert(0, next_head);
                snake.truncate(snake_len);
                snake
            };

            if close_list.contains(&next_snake) {
                continue;
            }

            open_list.push({
                let h = get_distance(&next_head, &end) as usize;
                let w = node.w + 1;
                let f = h + w;
                Node {
                    snake: next_snake,
                    h,
                    f,
                    w,
                }
            });
        }

        close_list.insert(node.snake);
    }

    false
}
