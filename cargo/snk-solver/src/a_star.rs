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
// this is a naive a quite brutal algorithm
// it kind of sucks because if the snake has to eat a wall, i will prefer visiting ALL the cells before doing that
// which will likely explode the loop_count
//
// there must be a better solution
pub fn get_path(
    grid: &Grid<Color>,
    from: Point,
    to: Point,
    max_cost: Cost,
) -> Option<(Vec<Direction>, Cost)> {
    let mut open_list: BinaryHeap<Node> = BinaryHeap::new();
    let mut close_list: HashMap<Point, Cost> = HashMap::new();

    let mut best_solution = Node {
        distance: 0,
        cost: max_cost,
        point: from,
        f: 0.0,
        parent: None,
        n: 0,
    };

    open_list.push(Node {
        distance: 0,
        point: from,
        n: 0,
        cost: Cost::zero(),
        f: 0.0,
        parent: None,
    });

    let mut loop_count = 0;

    while let Some(node) = open_list.pop() {
        loop_count += 1;
        debug_assert!(loop_count < 10_000, "invariant: loop out of control");

        if node.distance as u64 + Into::<u64>::into(node.cost) >= best_solution.cost.into() {
            continue;
        }

        if to == node.point {
            best_solution = node;
            continue;
        }

        let node_cost = node.cost;
        let node_point = node.point;
        let node_n = node.n;

        let rc_parent = Rc::new(node);

        for dir in iter_directions() {
            let next_point = node_point + dir.to_point();

            if !grid.is_inside_margin(next_point, 1) {
                continue;
            }

            let next_cost = node_cost + grid.get_color(next_point).into();
            let next_n = node_n + 1;

            if let Some(previous_cost) = close_list.get(&next_point) {
                if *previous_cost <= next_cost {
                    continue;
                }

                // put it back to the open_list
                // or we might get away with swapping the parent and updating the cost / f in openlist
                // sounds painful
            }

            close_list.insert(next_point, next_cost);

            let distance = get_distance(next_point, to);

            let f: u64 = (next_cost + Cost::from(Color::Empty) * (distance as u64)).into();

            open_list.push(Node {
                distance,
                cost: next_cost,
                f: f as f64,
                n: next_n,
                parent: Some(Rc::clone(&rc_parent)),
                point: next_point,
            });
        }
    }

    if best_solution.point == to {
        // unwrap
        let mut path = Vec::new();

        let cost = best_solution.cost;

        let mut u = &Rc::new(best_solution);
        while let Some(ref parent) = u.parent {
            let dir: Direction = (u.point - parent.point).try_into().unwrap();
            path.push(dir);

            u = &parent;
        }
        path.reverse();

        debug_assert_eq!(
            path.iter().fold(from, |p, &dir| p + dir),
            to,
            "path should lead to target"
        );

        Some((path, cost))
    } else {
        None
    }
}

#[derive(Debug)]
struct Node {
    pub cost: Cost,
    pub f: f64,
    pub distance: u8,
    pub n: u16,
    pub parent: Option<Rc<Node>>,
    pub point: Point,
}
impl Eq for Node {}
impl PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.point.eq(&other.point)
    }
}
impl Ord for Node {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        other.f.cmp(&self.f)
        // // this act as tie-breaker, to make the binaryheap (and the whole alg) determinist
        // .then(self.point.x.cmp(&other.point.x))
        // .then(self.point.y.cmp(&other.point.y))
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
        let (grid, _, _, poi) = read_world(
            r#"
                ··········
                ····@·····
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
