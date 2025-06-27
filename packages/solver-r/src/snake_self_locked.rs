use crate::grid::{add, Point, DIRECTIONS};

// the snake is not self locked if it can move mo
pub fn is_snake_self_locked<F>(walkable: F, snake: &[Point]) -> bool
where
    F: Fn(&Point) -> bool,
{
    let snake_len = snake.len();

    let mut open_list: Vec<Vec<Point>> = Vec::new();

    open_list.push(snake.to_vec());

    while let Some(path) = open_list.pop() {
        for dir in DIRECTIONS {
            let next_head = add(&path[0], &dir);

            if !walkable(&next_head) {
                continue;
            }

            let head_collide_with_body = (0..snake_len).any(|i| path[i] == next_head);

            if head_collide_with_body {
                continue;
            }

            if path.len() >= snake_len * 2 {
                return false;
            }

            let next_path = {
                let mut next_path = Vec::with_capacity(path.len() + 1);
                next_path.clone_from(&path);
                next_path.insert(0, next_head);
                next_path
            };

            open_list.push(next_path);
        }
    }

    true
}
