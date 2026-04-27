use snk_grid::{
    color::Color,
    direction::{Direction, iter_directions},
    grid::Grid,
    point::{Point, get_distance},
};
use std::{
    collections::{BinaryHeap, HashMap},
    rc::Rc,
};

use crate::cost::Cost;

// move a snake from a position to a point (that it reaches with its head)
//
// it should be the same as path finding from cell to cell
// with the caveat that is might block it-self in the first N step (for a snake of size N)
pub fn get_snake_path(
    grid: &Grid<Color>,
    starting_snake_head_to_tail: &[Point],
    to: Point,
    max_cost: Cost,
) -> Option<(Vec<Direction>, Cost)> {
    let mut open_list: BinaryHeap<Node> = BinaryHeap::new();
    let mut close_list: HashMap<Point, CloseEntry> = HashMap::new();

    let snake_len = starting_snake_head_to_tail.len();

    open_list.push(Node {
        point: starting_snake_head_to_tail[0],
        cost: Cost::zero(),
        f: Cost::zero(),
        n: 0,
        parent: None,
    });

    let mut loop_count = 0;

    while let Some(node) = open_list.pop() {
        loop_count += 1;
        debug_assert!(loop_count < 20_000, "invariant: loop out of control");

        let node_cost = node.cost;

        if to == node.point {
            // println!("found solution {:?}", loop_count);

            // unwrap
            let mut path = Vec::new();

            let mut u = &Rc::new(node);
            while let Some(ref parent) = u.parent {
                let dir: Direction = (u.point - parent.point).try_into().unwrap();
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

        let n = node.n + 1;

        let node_point = node.point;

        let rc_parent = Rc::new(node);

        // invariant check
        // make sure the path is valid so far
        #[cfg(debug_assertions)]
        {
            // construct the path so far
            let mut path = Vec::new();

            let mut u = &rc_parent;
            path.push(node_point);
            while let Some(ref parent) = u.parent {
                u = &parent;
                path.push(u.point);
            }
            let mut o = starting_snake_head_to_tail
                .iter()
                .skip(1)
                .map(|p| *p)
                .collect::<Vec<_>>();

            path.append(&mut o);

            // println!("---\npath:{:?}", path);

            // for each step of the path, the snake should not self collide
            for i in 0..(path.len() - snake_len + 1) {
                let snake = &path[i..(i + snake_len)];
                // println!("  {:?}", snake);

                let head = snake[0];
                for i in 1..(snake_len) {
                    debug_assert_ne!(head, snake[i], "snake should not self collide");
                }
            }
        }

        for dir in iter_directions() {
            let next_point = node_point + dir.to_point();

            if !grid.is_inside_margin(next_point, 2) {
                continue;
            }

            // if the path is smaller than the snake length,
            // it can self collide
            if n < snake_len {
                // we might have already tried with a greater n,
                // no need to retry then
                if let Some(o) = close_list.get(&next_point) {
                    // we already processed this point,

                    // it safe to ignore if we tried with a greater n
                    // because the case where the snake self collide would already have been tested
                    if o.n >= n {
                        continue;
                    }

                    // it stills forbidden to go self collide, so check that
                    // walk the ancestor and check
                    let mut ancestor = &rc_parent;
                    let mut collision = false;
                    while let Some(parent) = ancestor.parent.as_ref()
                        && !collision
                    {
                        if parent.point == next_point {
                            collision = true
                        }
                        ancestor = &parent;
                    }
                    if collision {
                        continue;
                    }
                }

                // check if it self collide
                let collide = starting_snake_head_to_tail
                    .iter()
                    .take(snake_len - n)
                    .any(|p| *p == next_point);

                if collide {
                    continue;
                }
            } else {
                // the snake can no longer self collide because it can't go back

                // check if the cell was already processed
                if close_list.contains_key(&next_point) {
                    continue;
                }
            }

            close_list.insert(next_point, CloseEntry { n });

            let cost = node_cost + grid.get_color(next_point).into();
            let distance = get_distance(next_point, to);

            // best case: only empty cells from here
            let f = cost + Cost::from(Color::Empty) * (distance as u64);
            if f > max_cost {
                continue;
            }

            debug_assert!(f >= cost, "heuristic must be admissible");

            open_list.push(Node {
                point: next_point,
                cost,
                n,
                f,
                parent: Some(Rc::clone(&rc_parent)),
            });
        }
    }

    None
}

#[derive(Debug)]
struct Node {
    pub point: Point,
    pub cost: Cost,
    pub n: usize,
    pub f: Cost,
    pub parent: Option<Rc<Node>>,
}
impl Eq for Node {}
impl PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.point.eq(&other.point)
            && match self.parent {
                Some(ref parent) => match other.parent {
                    Some(ref other_parent) => parent.point.eq(&other_parent.point),
                    None => false,
                },
                None => other.parent.is_none(),
            }
    }
}
impl Ord for Node {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        other
            .f
            .cmp(&self.f)
            // this act as tie-breaker, to make the binaryheap (and the whole alg) determinist
            .then(self.point.x.cmp(&other.point.x))
            .then(self.point.y.cmp(&other.point.y))
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

struct CloseEntry {
    n: usize,
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::debug_world::{assert_world_equal, read_world, render_world};

    // make the snake walk all the instruction directions (from start to end)
    // return the list of cells visited in snake order (head first)
    fn get_full_path(snake: &[Point], directions: &[Direction]) -> Vec<Point> {
        let mut full_path = snake.iter().map(|p| *p).collect::<Vec<_>>();
        full_path.reverse();
        for dir in directions.iter() {
            let p = full_path.last().unwrap();
            full_path.push(*p + *dir);
        }
        full_path.reverse();
        full_path
    }

    fn get_last_snake(snake: &[Point], directions: &[Direction]) -> Vec<Point> {
        let mut s = get_full_path(snake, directions);
        s.truncate(snake.len());
        s
    }

    fn print_sequence(grid: &Grid<Color>, snake: &[Point], directions: &[Direction]) {
        let full = get_full_path(snake, directions);
        println!("{}", render_world(grid, snake, None));
        for i in (0..directions.len()).rev() {
            println!(
                "\n{}",
                render_world(grid, &full[i..(i + snake.len())], None)
            );
        }
    }

    #[test]
    fn it_should_find_simple_path() {
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

        print_sequence(&grid, &snake, &path);

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

        print_sequence(&grid, &snake, &path);

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
}
