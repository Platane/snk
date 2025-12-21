use crate::{
    direction::{Direction, add_direction},
    point::Point,
};

pub trait Snake {
    fn get_head(&self) -> Point;
    fn iter_head_to_tail(&self) -> impl Iterator<Item = Point>;
    fn move_snake(&mut self, dir: Direction) -> ();
}

pub fn snake_will_self_collide(snake: &Snake4, dir: Direction) -> bool {
    let next_head = add_direction(snake.get_head(), dir);
    snake.iter_head_to_tail().any(|p| p == next_head)
}

#[derive(Clone, PartialEq, Eq, Hash, Debug)]
pub struct Snake4 {
    body: [Point; 4],
}

impl Snake4 {
    pub fn from_points(points: [Point; 4]) -> Self {
        Snake4 { body: points }
    }
    pub fn clone_and_move(&self, dir: Direction) -> Self {
        let mut s = self.clone();
        s.move_snake(dir);
        s
    }
}

impl Snake for Snake4 {
    fn get_head(&self) -> Point {
        self.body[0]
    }

    fn iter_head_to_tail(&self) -> impl Iterator<Item = Point> {
        self.body.iter().map(|p| p.clone())
    }

    fn move_snake(&mut self, dir: Direction) -> () {
        let next_head = add_direction(self.get_head(), dir);
        self.body[3] = self.body[2];
        self.body[2] = self.body[1];
        self.body[1] = self.body[0];
        self.body[0] = next_head;
    }
}
