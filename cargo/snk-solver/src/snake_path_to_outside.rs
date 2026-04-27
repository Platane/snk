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
) -> (Vec<Direction>, Cost) {
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

        let node_cost = node.cost;
    }

    // open_list.push(Node {
    //     snake: snake.clone(),
    //     cost: Cost::zero(),
    //     path: Vec::new(),
    // });

    // while let Some(node) = open_list.pop() {
    //     let head = node.snake.get_head();
    //     if is_outside(head) {
    //         return (node.path, node.cost);
    //     }

    //     for dir in iter_directions() {
    //         if snake_will_self_collide(&node.snake, dir) {
    //             continue;
    //         }

    //         let snake = node.snake.clone_and_move(dir);

    //         if close_list.contains(&snake) {
    //             // usually we want to update the open list here
    //             // but since we traverse breadth first, we are sure that previous candidate are better
    //             continue;
    //         }

    //         let head = snake.get_head();

    //         let cost = node.cost + get_walk_cost(head);
    //         let mut path = node.path.clone();
    //         path.push(dir);

    //         open_list.push(Node { cost, path, snake });
    //     }

    //     close_list.insert(node.snake);
    // }

    assert!(false, "should have terminated");
    (vec![], Cost::zero())
}

fn distance_to_outside<T: Copy>(grid: &Grid<T>, p: Point) -> i8 {
    (1 - p.y).min(p.y - grid.height + 2)
    // .min(p.x)
    // .min(grid.width - 1 - p.x)
}
#[test]
fn it_should_return_distance_to_outside() {
    let grid = Grid::<bool>::create_with_default(30, 10);
    assert_eq!(distance_to_outside(&grid, Point { x: 15, y: 0 }), 1);
    // assert_eq!(distance_to_outside(&grid, Point { x: 15, y: 9 }), 1);

    assert_eq!(distance_to_outside(&grid, Point { x: 15, y: -1 }), 0);
    assert!(grid.is_inside_margin(Point { x: 15, y: -1 }, 0));
    assert!(!grid.is_inside_margin(Point { x: 15, y: -1 }, 1));
    // assert_eq!(distance_to_outside(&grid, Point { x: 15, y: 12 }), 3);
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

// #[cfg(test)]
// mod tests {
//     use super::*;

//     use snk_grid::{color::Color, point::Point, snake::Snake4};

//     use crate::{debug_world::read_world, exit_grid::ExitGrid};

//     #[test]
//     fn it_should_find_simple_exit() {
//         let (grid, snake_path, _, _) = read_world(
//             r#"
//             ·······
//             ···@─┐·
//             ·······
//             "#,
//         );
//         let exit_grid = ExitGrid::create_from_grid_color(&grid);
//         let snake =
//             Snake4::from_points(snake_path[..].try_into().expect("snake should be 4 points"));

//         let (path, cost) = get_snake_path_to_outside(
//             |p| exit_grid.is_outside(p),
//             |p| grid.get_color(p).into(),
//             &snake,
//         );

//         println!("{:?} {:?}", path, cost);

//         assert_eq!(
//             cost.get_color_count(Color::Color4),
//             0,
//             "should have taken the smallest path"
//         );
//     }

//     #[test]
//     fn it_should_get_snake_path_to_outside() {
//         let (grid, snake_path, _, _) = read_world(
//             r#"
//                 ·████████···
//                 ·█····░··░··
//                 ·█@──╴··█···
//                 ·████████···
//             "#,
//         );
//         let exit_grid = ExitGrid::create_from_grid_color(&grid);
//         let snake =
//             Snake4::from_points(snake_path[..].try_into().expect("snake should be 4 points"));

//         let (path, cost) = get_snake_path_to_outside(
//             |p| exit_grid.is_outside(p),
//             |p| grid.get_color(p).into(),
//             &snake,
//         );

//         println!("{:?} {:?}", path, cost);

//         assert_eq!(
//             cost.get_color_count(Color::Color4),
//             0,
//             "should have taken the smallest path"
//         );
//     }

//     #[test]
//     fn it_should_find_no_path_to_exit_itself() {
//         let (grid, snake_path, _, _) = read_world(
//             r#"
//             ···············
//             ···┌───────┐···
//             ···│··@─┐··│···
//             ···└────┘··│···
//             ···············
//             "#,
//         );
//         let exit_grid = ExitGrid::create_from_grid_color(&grid);
//         let snake =
//             Snake4::from_points(snake_path[..].try_into().expect("snake should be 4 points"));

//         let (path, cost) = get_snake_path_to_outside(
//             |p| exit_grid.is_outside(p),
//             |p| grid.get_color(p).into(),
//             &snake,
//         );

//         println!("{:?} {:?}", path, cost);

//         assert_eq!(
//             cost.get_color_count(Color::Color4),
//             0,
//             "should have taken the smallest path"
//         );
//     }

//     #[test]
//     fn it_should_get_snake_path_to_outside_2() {
//         let (grid, snake_path, _, _) = read_world(
//             r#"
//             ············
//             ···█████····
//             ···█···█····
//             ···█···█····
//             ···██@██····
//             ·····│······
//             ·····│······
//             ·····╵······
//             "#,
//         );
//         let snake =
//             Snake4::from_points(snake_path[..].try_into().expect("snake should be 4 points"));

//         let exit_grid = ExitGrid::create_from_grid_color(&grid);

//         let (path, cost) = get_snake_path_to_outside(
//             |p| exit_grid.is_outside(p),
//             |p| grid.get_color(p).into(),
//             &snake,
//         );

//         println!("{:?} {:?}", path, cost);
//         assert_eq!(
//             cost.get_color_count(Color::Color4),
//             0,
//             "should have taken the smallest path"
//         );
//     }
// }
