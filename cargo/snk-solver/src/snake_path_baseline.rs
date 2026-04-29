use snk_grid::{
    color::Color,
    direction::{Direction, iter_directions},
    grid::Grid,
    point::{Point, get_distance},
};
use std::{
    collections::{BinaryHeap, HashSet},
    rc::Rc,
};

use crate::cost::Cost;

// move a snake from a position to a point (that it reaches with its head)
pub fn get_snake_path(
    grid: &Grid<Color>,
    starting_snake_head_to_tail: &[Point],
    to: Point,
    max_cost: Cost,
) -> Option<(Vec<Direction>, Cost)> {
    let mut open_list: BinaryHeap<Node> = BinaryHeap::new();
    let mut close_list: HashSet<Vec<Point>> = HashSet::new();

    let snake_len = starting_snake_head_to_tail.len();

    open_list.push(Node {
        snake: starting_snake_head_to_tail.iter().map(|p| *p).collect(),
        cost: Cost::zero(),
        f: Cost::zero(),
        parent: None,
    });

    let mut loop_count = 0;

    while let Some(node) = open_list.pop() {
        loop_count += 1;
        debug_assert!(loop_count < 10_000, "invariant: loop out of control");

        let node_cost = node.cost;
        let node_head = node.snake[0];

        if to == node_head {
            // unwrap
            let mut path = Vec::new();

            let mut u = &Rc::new(node);
            while let Some(ref parent) = u.parent {
                let dir: Direction = (u.snake[0] - parent.snake[0]).try_into().unwrap();
                path.push(dir);

                u = &parent;
            }
            path.reverse();

            debug_assert_eq!(
                path.iter()
                    .fold(starting_snake_head_to_tail[0], |p, &dir| p + dir.to_point()),
                to,
                "path should lead to target"
            );

            return Some((path, node_cost));
        }

        let rc_parent = Rc::new(node);

        for dir in iter_directions() {
            let next_head = node_head + dir.to_point();

            if !grid.is_inside_margin(next_head, 2) {
                continue;
            }

            if rc_parent
                .snake
                .iter()
                .take(snake_len - 1)
                .any(|p| *p == next_head)
            {
                continue;
            }

            let mut next_snake = Vec::with_capacity(snake_len);
            next_snake.push(next_head);
            next_snake.extend_from_slice(&rc_parent.snake[0..(snake_len - 1)]);

            if close_list.contains(&next_snake) {
                continue;
            }

            close_list.insert(next_snake.clone());

            let cost = node_cost + grid.get_color(next_head).into();
            let distance = get_distance(next_head, to);

            // best case: only empty cells from here
            let f = cost + Cost::from(Color::Empty) * (distance as u64);
            if f > max_cost {
                continue;
            }

            open_list.push(Node {
                snake: next_snake,
                cost,
                f,
                parent: Some(Rc::clone(&rc_parent)),
            });
        }
    }

    None
}

#[derive(Debug)]
struct Node {
    pub cost: Cost,
    pub f: Cost,
    pub parent: Option<Rc<Node>>,
    pub snake: Vec<Point>,
}
impl Eq for Node {}
impl PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.snake.eq(&other.snake)
    }
}
impl Ord for Node {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        other
            .f
            .cmp(&self.f)
            // this act as tie-breaker, to make the binaryheap (and the whole alg) determinist
            .then(self.snake[0].x.cmp(&other.snake[0].x))
            .then(self.snake[0].y.cmp(&other.snake[0].y))
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::debug_world::{
        assert_world_equal, get_full_path, get_last_snake, read_world, render_world,
    };

    #[test]
    fn it_should_find_simple_path__() {
        let (grid, snake, _, poi) = read_world(
            r#"
                ··········
                ···╶@█····
                ·······x··
            "#,
        );
        let target = *poi.get(&'x').unwrap();

        let (path, _cost) = get_snake_path(&grid, &snake, target, Cost::max()).unwrap();

        assert_world_equal(
            &render_world(&grid, &get_full_path(&snake, &path), None),
            r#"
                ··········
                ···╶┐█····
                ····└──@··
            "#,
        );
    }

    #[test]
    fn it_should_find_path_out_of_labyrinth() {
        let (grid, snake, _, poi) = read_world(
            r#"
                ··╶─@···············································
                ██████████████████████████████████████████████████·█
                █··················································█
                █·██████████████████████████████████████████████████
                █··················································█
                ██████████████████████████████████████████████████·█
                █x·················································█
                ████████████████████████████████████████████████████
            "#,
        );
        let target = *poi.get(&'x').unwrap();

        let (path, _cost) = get_snake_path(&grid, &snake, target, Cost::max()).unwrap();

        assert_world_equal(
            &render_world(&grid, &get_full_path(&snake, &path), None),
            r#"
                ··╶───────────────────────────────────────────────┐·
                ██████████████████████████████████████████████████│█
                █┌────────────────────────────────────────────────┘█
                █│██████████████████████████████████████████████████
                █└────────────────────────────────────────────────┐█
                ██████████████████████████████████████████████████│█
                █@────────────────────────────────────────────────┘█
                ████████████████████████████████████████████████████
            "#,
        );
    }

    #[test]
    fn it_should_be_able_to_coil_the_snake() {
        let (grid, snake, _, poi) = read_world(
            r#"
                ····x·····
                ████·█····
                █@──┐█····
                █╷┌┐│█····
                █└┘└┘█····
                ██████····
                ··········
            "#,
        );
        let target = *poi.get(&'x').unwrap();

        let (path, _cost) = get_snake_path(&grid, &snake, target, Cost::max()).unwrap();

        assert_world_equal(
            &render_world(&grid, &get_last_snake(&snake, &path), None),
            r#"
                ····@·····
                ████│█····
                █╷··│█····
                █│┌┐│█····
                █└┘└┘█····
                ██████····
                ··········
            "#,
        );
    }

    #[test]
    fn it_should_avoid_self_colliding_the_snake() {
        let (grid, snake, _, poi) = read_world(
            r#"
                ·┌──────────┐···
                ·│··┌┐······│···
                ·│┌─┘└─@····│···
                ·│└─────────┘···
                ·╵·······x······
            "#,
        );
        let target = *poi.get(&'x').unwrap();

        let (path, _cost) = get_snake_path(&grid, &snake, target, Cost::max()).unwrap();

        assert_world_equal(
            &render_world(&grid, &get_last_snake(&snake, &path), None),
            r#"
                ······┌─────┐···
                ····┌┐└────┐│···
                ··┌─┘└─────┘│···
                ··└───╴·····│···
                ·········@──┘···
            "#,
        );
    }

    #[test]
    fn it_should_coil_to_exit() {
        let (grid, snake, _, poi) = read_world(
            r#"
                ······x·········
                ····█████·······
                ····█···█·······
                ····█···█·······
                ····██·██·······
                ·····█·█········
                ·····█·@───╴····
                ·····███········
            "#,
        );
        let target = *poi.get(&'x').unwrap();

        let (path, _cost) = get_snake_path(&grid, &snake, target, Cost::max()).unwrap();

        assert_world_equal(
            &render_world(&grid, &get_full_path(&snake, &path), None),
            r#"
            ······@──┐······
            ····█████│······
            ····█┌─┐█│······
            ····█└┌┘█│······
            ····██│██│······
            ·····█│█┌┘······
            ·····█└─┘──╴····
            ·····███········
            "#,
        );
    }
}
