use snk_grid::{
    direction::{Direction, iter_directions},
    point::Point,
    snake::{Snake, Snake4, snake_will_self_collide},
};
use std::collections::{BinaryHeap, HashSet};

use crate::cost::Cost;

#[derive(Clone, Debug)]
struct Node {
    pub snake: Snake4,
    pub cost: Cost,
    pub path: Vec<Direction>,
}

impl Eq for Node {}
impl PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.snake == other.snake
    }
}
impl Ord for Node {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        other.cost.cmp(&self.cost)
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}
pub fn get_snake_path_to_outside<FnOutside, FnCost>(
    is_outside: FnOutside,
    get_walk_cost: FnCost,
    snake: &Snake4,
) -> (Vec<Direction>, Cost)
where
    FnOutside: Fn(Point) -> bool,
    FnCost: Fn(Point) -> Cost,
{
    let mut open_list: BinaryHeap<Node> = BinaryHeap::new();
    let mut close_list: HashSet<Snake4> = HashSet::new();

    open_list.push(Node {
        snake: snake.clone(),
        cost: Cost::zero(),
        path: Vec::new(),
    });

    while let Some(node) = open_list.pop() {
        let head = node.snake.get_head();
        if is_outside(head) {
            return (node.path, node.cost);
        }

        for dir in iter_directions() {
            if snake_will_self_collide(&node.snake, dir) {
                continue;
            }

            let snake = node.snake.clone_and_move(dir);

            if close_list.contains(&snake) {
                // usually we want to update the open list here
                // but since we traverse breadth first, we are sure that previous candidate are better
                continue;
            }

            let head = snake.get_head();

            let cost = node.cost + get_walk_cost(head);
            let mut path = node.path.clone();
            path.push(dir);

            open_list.push(Node { cost, path, snake });
        }

        close_list.insert(node.snake);
    }

    assert!(false, "should have terminated");
    (vec![], Cost::zero())
}
#[cfg(test)]
mod tests {
    use super::*;

    use snk_grid::{
        color::Color, grid::Grid, grid_samples::get_grid_sample, point::Point, snake::Snake4,
    };

    use crate::exit_grid::ExitGrid;

    #[test]
    fn it_should_get_snake_path_to_outside() {
        let grid = Grid::<_>::from(
            r#"
_########  _
_#    .  . _
_#      # _
_########  _

"#,
        );
        let exit_grid = ExitGrid::create_from_grid_color(&grid);
        let snake = Snake4::from_points([
            Point { x: 2, y: 2 },
            Point { x: 3, y: 2 },
            Point { x: 4, y: 2 },
            Point { x: 5, y: 2 },
        ]);

        let (path, cost) = get_snake_path_to_outside(
            |p| exit_grid.is_outside(p),
            |p| grid.get_color(p).into(),
            &snake,
        );

        println!("{:?} {:?}", path, cost);

        assert_eq!(
            cost.get_color_count(Color::Color4),
            0,
            "should have taken the smallest path"
        );
    }

    #[test]
    fn it_should_get_snake_path_to_outside_2() {
        let mut grid = Grid::<_>::from(
            r#"
_          _
_  #####   _
_  #   #   _
_  #   #   _
_  #####   _
_          _

"#,
        );

        assert_eq!(grid.get_color(Point { x: 5, y: 4 }), Color::Color4);

        let exit_grid = ExitGrid::create_from_grid_color(&grid);
        let snake = Snake4::from_points([
            Point { x: 5, y: 4 },
            Point { x: 5, y: 5 },
            Point { x: 5, y: 6 },
            Point { x: 5, y: 7 },
        ]);

        grid.set(Point { x: 5, y: 4 }, Color::Empty);

        let (path, cost) = get_snake_path_to_outside(
            |p| exit_grid.is_outside(p),
            |p| grid.get_color(p).into(),
            &snake,
        );

        println!("{:?} {:?}", path, cost);
        assert_eq!(
            cost.get_color_count(Color::Color4),
            0,
            "should have taken the smallest path"
        );
    }
}
