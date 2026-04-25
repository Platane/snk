use snk_grid::{
    color::Color,
    direction::{Direction, add_direction, sub_direction},
    grid::{Grid, iter_rectangle_fill},
    point::Point,
};
use std::collections::HashMap;

const DOT_BLOCKS: &'static str = "·░▒▓█";

fn get_dot_block(color: Color) -> char {
    DOT_BLOCKS.chars().skip(color as usize).next().unwrap()
}

pub fn render_world(
    grid: &Grid<Color>,
    snake_head_to_tail: &[Point],
    poi_opt: Option<HashMap<Point, char>>,
) -> String {
    let mut out: String = String::new();
    for y in 0..grid.height {
        for x in 0..grid.width {
            let p = Point {
                x: x as i8,
                y: y as i8,
            };

            let char: char = if let Some(c) = poi_opt.as_ref().and_then(|poi| poi.get(&p)) {
                *c
            } else if let Some(i) = snake_head_to_tail.iter().position(|s| p.eq(s)) {
                if i == 0 {
                    '@'
                } else {
                    let p0 = snake_head_to_tail[i - 1];
                    let dir0 = sub_direction(p0, p);

                    let dir1 = snake_head_to_tail
                        .get(i + 1)
                        .map(|p1| sub_direction(*p1, p))
                        .unwrap_or(dir0.get_opposite());

                    match (dir0, dir1) {
                        (Direction::DOWN, Direction::UP) | (Direction::UP, Direction::DOWN) => '│',
                        (Direction::LEFT, Direction::RIGHT)
                        | (Direction::RIGHT, Direction::LEFT) => '─',
                        (Direction::LEFT, Direction::DOWN) | (Direction::DOWN, Direction::LEFT) => {
                            '┘'
                        }
                        (Direction::RIGHT, Direction::DOWN)
                        | (Direction::DOWN, Direction::RIGHT) => '└',
                        (Direction::RIGHT, Direction::UP) | (Direction::UP, Direction::RIGHT) => {
                            '┌'
                        }
                        (Direction::LEFT, Direction::UP) | (Direction::UP, Direction::LEFT) => '┐',
                        _ => panic!("Invalid path {:?} {:?}", dir0, dir1),
                    }
                }
            } else {
                get_dot_block(grid.get_color(p))
            };

            out.push(char);
        }
        out.push('\n');
    }

    out.pop();
    out
}

pub fn read_world(w: &str) -> (Grid<Color>, Vec<Point>, HashMap<Point, char>) {
    let w = normalize_world(w);
    let lines = w
        .split('\n')
        .map(|line| line.trim_ascii().chars().collect::<Vec<_>>())
        .filter(|line| !line.is_empty())
        .collect::<Vec<_>>();

    let width = lines[0].len() as i8;
    let height = lines.len() as i8;
    let mut grid = Grid::<Color>::create_with_default(width, height);

    let mut poi = HashMap::new();

    let mut links = Vec::<(Point, Point)>::new();
    let mut head = None;
    for p in iter_rectangle_fill(width, height) {
        let char = lines[p.y as usize][p.x as usize];

        if let Some(color) = DOT_BLOCKS
            .chars()
            .position(|c| c == char)
            .and_then(|i| match i {
                0 => Some(Color::Empty),
                1 => Some(Color::Color1),
                2 => Some(Color::Color2),
                3 => Some(Color::Color3),
                4 => Some(Color::Color4),
                _ => None,
            })
        {
            grid.set(p, color)
        } else if let Some((l1, l2)) = match char {
            '┌' => Some((Direction::DOWN, Direction::RIGHT)),
            '└' => Some((Direction::UP, Direction::RIGHT)),
            '┐' => Some((Direction::DOWN, Direction::LEFT)),
            '┘' => Some((Direction::UP, Direction::LEFT)),
            '─' => Some((Direction::RIGHT, Direction::LEFT)),
            '│' => Some((Direction::UP, Direction::DOWN)),
            _ => None,
        } {
            links.push((p, add_direction(p, l1)));
            links.push((p, add_direction(p, l2)));
        } else if char == '@' {
            head = Some(p);
        } else {
            poi.insert(p, char);
        }
    }

    let path = head
        .map(|head| {
            let mut path = Vec::new();

            let mut p = head;

            path.push(p);

            loop {
                let Some((p1, p2)) = links
                    .extract_if(.., move |(p1, p2)| *p1 == p || *p2 == p)
                    .next()
                else {
                    break;
                };

                if head != p {
                    path.push(p);
                }
                p = if p1 == p { p2 } else { p1 };

                links.retain(|(pa, pb)| !((*pa == p1 && *pb == p2) || (*pb == p1 && *pa == p2)));
            }

            path
        })
        .unwrap_or_default();

    (grid, path, poi)
}

fn normalize_world(w: &str) -> String {
    w.split('\n')
        .map(|line| line.trim_ascii())
        .filter(|line| !line.is_empty())
        .collect::<Vec<_>>()
        .join("\n")
}
pub fn assert_world_equal(actual: &str, expected: &str) -> () {
    let actual = normalize_world(actual);
    let expected = normalize_world(expected);

    if actual.ne(&expected) {
        panic!("\nexpected:\n{expected}\ngot:\n{actual}")
    }
}

#[test]
fn it_should_render_world() {
    let mut grid = Grid::<Color>::create_with_default(12, 4);
    grid.set(Point { x: 2, y: 1 }, Color::Color1);
    grid.set(Point { x: 4, y: 1 }, Color::Color2);
    grid.set(Point { x: 6, y: 1 }, Color::Color3);
    grid.set(Point { x: 8, y: 1 }, Color::Color4);
    assert_world_equal(
        render_world(
            &grid,
            &[],
            Some(HashMap::from([(Point { x: 8, y: 2 }, '9')])),
        )
        .as_str(),
        r#"
        ············
        ··░·▒·▓·█···
        ········9···
        ············"#,
    );
}

#[test]
fn it_should_read_render_world() {
    let g = r#"
    ············
    ··░·▒·▓·█···
    ········▓···
    ············"#;
    let (grid, path, poi) = read_world(g);
    assert_world_equal(render_world(&grid, &path, Some(poi)).as_str(), g);
}

#[test]
fn it_should_render_snake() {
    let grid = Grid::<Color>::create_with_default(12, 5);

    let path = [
        Point { x: 2, y: 0 },
        Point { x: 3, y: 0 },
        Point { x: 4, y: 0 },
        Point { x: 5, y: 0 },
        Point { x: 6, y: 0 },
        Point { x: 6, y: 1 },
        Point { x: 6, y: 2 },
        Point { x: 6, y: 3 },
        Point { x: 5, y: 3 },
        Point { x: 4, y: 3 },
        Point { x: 3, y: 3 },
        Point { x: 2, y: 3 },
        Point { x: 1, y: 3 },
        Point { x: 0, y: 3 },
        Point { x: 0, y: 2 },
        Point { x: 0, y: 1 },
        Point { x: 1, y: 1 },
        Point { x: 2, y: 1 },
        Point { x: 2, y: 2 },
        Point { x: 3, y: 2 },
    ];

    assert_world_equal(
        render_world(&grid, &path, None).as_str(),
        r#"
        ··@───┐·····
        ┌─┐···│·····
        │·└─··│·····
        └─────┘·····
        ············"#,
    );
}

#[test]
fn it_should_read_render_snake() {
    let g = r#"
    ··@───┐·····
    ┌─┐···│·····
    │·└─··│·····
    └─────┘·····
    ············"#;
    let (grid, path, poi) = read_world(g);

    assert_world_equal(render_world(&grid, &path, Some(poi)).as_str(), g);
}
