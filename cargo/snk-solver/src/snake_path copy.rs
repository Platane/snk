use snk_grid::{
    color::Color,
    direction::{Direction, iter_directions},
    grid::Grid,
    grid_samples::get_grid_sample,
    point::{Point, get_distance},
    snake::{Snake, Snake4, snake_will_self_collide},
};
use std::collections::{BinaryHeap, HashMap};

use crate::cost::Cost;

#[derive(Clone, Debug)]
struct Node {
    pub snake: Snake4,
    pub cost: Cost,
    pub f: Cost,
    pub path: Vec<Direction>,
}

impl Eq for Node {}
impl PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.path == other.path
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

// TODO: when the snake have moved at least it's length, it's useless to come back to a cell of it's body
// -> we could likely get away with moving cell by cell rather than the whole snake
pub fn get_snake_path(
    grid: &Grid<Color>,
    from: &Snake4,
    to: Point,
    max_cost: Cost,
) -> Option<(Vec<Direction>, Cost)> {
    let mut open_list: BinaryHeap<Node> = BinaryHeap::new();
    let mut close_list: HashMap<Snake4, Cost> = HashMap::new();

    open_list.push(Node {
        snake: from.clone(),
        cost: Cost::zero(),
        f: Cost::zero(),
        path: Vec::new(),
    });

    let mut loop_count = 0;

    while let Some(node) = open_list.pop() {
        loop_count += 1;

        if loop_count > 20_000 {
            panic!("loop_count exceeded")
        }

        {
            let head = node.snake.get_head();

            if to == head {
                return Some((node.path, node.cost));
            }
        }

        for dir in iter_directions() {
            // log::info!(
            //     " -  snake {:?} dir {:?}, {:?}",
            //     node.snake,
            //     dir,
            //     snake_will_self_collide(&node.snake, dir)
            // );

            if snake_will_self_collide(&node.snake, dir) {
                continue;
            }
            let snake = node.snake.clone_and_move(dir);
            let head = snake.get_head();

            if !grid.is_inside_margin(head, 2) {
                continue;
            }

            let cost = node.cost + grid.get_color(head).into();
            let distance = get_distance(head, to);

            let f = cost + Cost::from(Color::Empty) * (distance as u64);
            if f > max_cost {
                continue;
            }

            if let Some(last_cost) = close_list.get(&snake)
                && *last_cost <= cost
            {
                continue;
            }

            close_list.insert(snake.clone(), node.cost);

            let mut path = node.path.clone();
            path.push(dir);
            open_list.push(Node {
                snake,
                cost,
                f,
                path,
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
#########
       .#
#########
"#,
    );

    assert_eq!(grid.get_color(Point { x: 7, y: 1 }), Color::Color1);

    let (path, cost) = get_snake_path(&grid, &snake, Point { x: 7, y: 1 }, Cost::max()).unwrap();

    println!("{:?} {:?}", path, cost);

    assert!(cost < Cost::from(Color::Color4));
    assert!(cost > Cost::from(Color::Color1) + Cost::from(Color::Empty) * 5);
}
