use snk_grid::{
    color::{self, Color},
    direction::{Direction, iter_directions},
    grid::Grid,
    point::Point,
    snake::{Snake, Snake4, snake_will_self_collide},
};
use std::{
    collections::{BinaryHeap, HashMap, HashSet},
    rc::Rc,
};

use crate::{cost::Cost, exit_grid::ExitGrid};

// a snake of size N is outside when it walk for N consecutive free cell
pub fn get_snake_path_to_outside(
    color_grid: &Grid<Color>,
    exit_grid: &ExitGrid,
    starting_snake_head_to_tail: &[Point],
) -> Option<Cost> {
    // if the snake head reach this level of outside, it's done
    let m = starting_snake_head_to_tail
        .iter()
        .fold(0, |max, p| max.max(-color_grid.distance_from_outside(*p)));

    let mut open_list: BinaryHeap<Node> = BinaryHeap::new();
    let mut close_list: HashMap<Point, CloseEntry> = HashMap::new();

    let snake_len = starting_snake_head_to_tail.len();

    open_list.push(Node {
        point: starting_snake_head_to_tail[0],
        n_free: 0,
        cost: Cost::zero(),
        f: Cost::zero(),
        n: 0,
        parent: None,
    });

    let mut loop_count = 0;

    while let Some(node) = open_list.pop() {
        loop_count += 1;
        debug_assert!(loop_count < 20_000, "invariant: loop out of control");

        println!("{:?} {:?} ", node.point, node.cost);

        if !color_grid.is_inside_margin(node.point, m) || node.n_free >= snake_len {
            return Some(node.cost);
        }

        let n = node.n + 1;

        let node_cost = node.cost;
        let node_point = node.point;
        let node_n_free = node.n_free;

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

            let cell_cost: Cost = color_grid.get_color(next_point).into();
            let cost = node_cost + cell_cost;
            // let distance = color_grid.distance_from_outside(next_point) + 20;
            let distance = 0;

            // best case: only empty cells from here
            let f = cost + Cost::from(Color::Empty) * (distance as u64);

            debug_assert!(f >= cost, "heuristic must be admissible");

            open_list.push(Node {
                point: next_point,
                n_free: if exit_grid.is_outside(next_point) {
                    node_n_free + 1
                } else {
                    0
                },
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
    pub n_free: usize,
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

    use snk_grid::color::Color;

    use crate::{debug_world::read_world, exit_grid::ExitGrid};

    #[test]
    fn it_should_find_simple_exit() {
        let (grid, snake_path, _, _) = read_world(
            r#"
                ·······
                ···@─┐·
                ·······
                "#,
        );
        let exit_grid = ExitGrid::create_from_grid_color(&grid);

        let cost = get_snake_path_to_outside(&grid, &exit_grid, &snake_path).unwrap();

        assert!(
            cost < Cost::from(Color::Color1),
            "should have taken the smallest path"
        );
    }

    #[test]
    fn it_should_get_snake_path_to_outside() {
        let (grid, snake_path, _, _) = read_world(
            r#"
                    ·████████···
                    ·█····░··░··
                    ·█@──╴··█···
                    ·████████···
            "#,
        );
        let exit_grid = ExitGrid::create_from_grid_color(&grid);

        let cost = get_snake_path_to_outside(&grid, &exit_grid, &snake_path).unwrap();

        assert!(
            cost < Cost::from(Color::Color1) * 2,
            "should have taken the smallest path"
        );
    }

    #[test]
    fn it_should_find_no_path_to_exit_itself() {
        let (grid, snake_path, _, _) = read_world(
            r#"
                ···············
                ···┌───────┐···
                ···│··@─┐··│···
                ···└────┘··╵···
                ···············
            "#,
        );
        let exit_grid = ExitGrid::create_from_grid_color(&grid);

        assert_eq!(
            get_snake_path_to_outside(&grid, &exit_grid, &snake_path),
            None,
        );
    }

    #[test]
    fn it_should_get_snake_path_to_outside_2() {
        let (grid, snake_path, _, _) = read_world(
            r#"
                ····█████·····
                ····█···█·····
                ····█···█·····
                ····██@██·····
                ······│╷······
                ······└┘······
            "#,
        );

        // TODO it should be able to go out without eating the wall

        let exit_grid = ExitGrid::create_from_grid_color(&grid);

        println!("{:?}", snake_path[0]);
        let cost = get_snake_path_to_outside(&grid, &exit_grid, &snake_path).unwrap();

        println!("{:?}", cost);

        assert!(
            cost < Cost::from(Color::Color1),
            "should have taken the smallest path"
        );
    }
}
