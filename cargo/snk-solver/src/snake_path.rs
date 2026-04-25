use snk_grid::{
    color::Color,
    direction::{Direction, iter_directions, sub_direction},
    grid::Grid,
    grid_samples::get_grid_sample,
    point::{Point, get_distance},
    snake::{Snake, Snake4, snake_will_self_collide},
};
use std::hash::{Hash, Hasher};
use std::{
    collections::{BinaryHeap, HashMap, HashSet},
    rc::Rc,
};

use crate::cost::Cost;

#[derive(Clone, Debug)]
struct Node {
    pub point: Point,
    pub cost: Cost,
    pub n: u8,
    pub f: Cost,
    pub parent: Option<Rc<Node>>,
}

impl Hash for Node {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.point.hash(state);
        if let Some(ref parent) = self.parent {
            parent.point.hash(state);
        }
    }
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
        other.f.cmp(&self.f)
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

// move a snake from a position to a point (that it reaches with its head)
//
// it should be the same as path finding from cell to cell
// with the caveat that is might block it-self in the first N step (for a snake of size N)
pub fn get_snake_path(
    grid: &Grid<Color>,
    from: &Snake4,
    to: Point,
    max_cost: Cost,
) -> Option<(Vec<Direction>, Cost)> {
    let mut open_list: BinaryHeap<Node> = BinaryHeap::new();
    let mut close_list: HashSet<(Point, Point)> = HashSet::new();

    let forbidden_cells: Vec<_> = from.iter_head_to_tail().collect();
    let n_max = forbidden_cells.len() as u8;

    open_list.push(Node {
        point: from.get_head(),
        cost: Cost::zero(),
        f: Cost::zero(),
        n: 0,
        // parent: first_parent.map(|p| Rc::new(p)),
        parent: None,
    });

    let mut loop_count = 0;

    while let Some(node) = open_list.pop() {
        loop_count += 1;
        debug_assert!(loop_count < 20_000, "invariant: loop out of control");

        let node_cost = node.cost;

        if to == node.point {
            println!("{:?}", loop_count);

            let mut path = Vec::new();

            let mut u = Rc::new(node);
            while let Some(ref parent) = u.parent {
                let dir = sub_direction(parent.point, u.point);
                path.push(dir);
                u = Rc::clone(parent);
            }
            return Some((path, node_cost));
        }

        let n = node.n + 1;

        let node_point = node.point;
        let b = Rc::new(node);

        for dir in iter_directions() {
            let next_point = node_point + dir.to_point();

            if close_list.contains(&(next_point, node_point)) {
                continue;
            } else {
                close_list.insert((next_point, node_point));
            }

            if !grid.is_inside_margin(next_point, 2) {
                continue;
            }

            if (n as usize) + 1 < (n_max as usize) {
                let collide = forbidden_cells
                    .iter()
                    .take((n_max as usize) - (n as usize) + 1)
                    .any(|p| *p == next_point);

                if collide {
                    continue;
                }
            }

            let cost = node_cost + grid.get_color(next_point).into();
            let distance = get_distance(next_point, to);

            // best case: only empty cells from here
            let f = cost + Cost::from(Color::Empty) * (distance as u64);
            if f > max_cost {
                continue;
            }

            open_list.push(Node {
                point: next_point,
                cost,
                n,
                f,
                parent: Some(Rc::clone(&b)),
            });
        }
    }

    None
}

#[test]
fn it_should_find_simple_path() {
    let snake = Snake4::from_points([
        Point { x: 0, y: 0 },
        Point { x: 1, y: 0 },
        Point { x: 2, y: 0 },
        Point { x: 3, y: 0 },
    ]);
    let grid = Grid::<_>::from(
        r#"
_    _
_    _
_    _
_    _
"#,
    );
    let (path, cost) = get_snake_path(&grid, &snake, Point { x: 0, y: 3 }, Cost::max()).unwrap();

    assert_eq!(
        path,
        vec![
            //
            Direction::DOWN,
            Direction::DOWN,
            Direction::DOWN,
        ]
    )
}

#[test]
fn it_should_find_path_out_of_labyrinth() {
    let snake = Snake4::from_points([
        Point { x: 0, y: -1 },
        Point { x: 1, y: -1 },
        Point { x: 2, y: -1 },
        Point { x: 3, y: -1 },
    ]);
    let grid = get_grid_sample(snk_grid::grid_samples::SampleGrid::Labyrinth);

    assert_eq!(grid.get_color(Point { x: 1, y: 5 }), Color::Color1);

    let (path, cost) = get_snake_path(&grid, &snake, Point { x: 1, y: 5 }, Cost::max()).unwrap();

    println!("{:?} {:?}", path, cost);

    assert!(cost < Cost::from(Color::Color1) * 2)
}

#[test]
fn it_should_not_self_collide() {
    let snake = Snake4::from_points([
        Point { x: 0, y: 1 },
        Point { x: 1, y: 1 },
        Point { x: 2, y: 1 },
        Point { x: 3, y: 1 },
    ]);
    let grid = Grid::<_>::from(
        r#"
########
       .
########
"#,
    );

    assert_eq!(grid.get_color(Point { x: 7, y: 1 }), Color::Color1);

    let (path, cost) = get_snake_path(&grid, &snake, Point { x: 7, y: 1 }, Cost::max()).unwrap();

    println!("{:?} {:?}", path, cost);

    assert!(cost < Cost::from(Color::Color4));
    assert!(cost > Cost::from(Color::Color1) + Cost::from(Color::Empty) * 5);
}
