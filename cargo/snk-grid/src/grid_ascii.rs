use crate::{
    color::Color,
    grid::{Grid, iter_rectangle_fill},
    point::Point,
};

pub fn grid_from_ascii<T: Copy + Default + From<char>>(ascii: &str) -> Grid<T> {
    let rows: Vec<_> = ascii.trim().split('\n').collect();

    let width = rows.iter().fold(0, |max_len, r| max_len.max(r.len()));
    let height = rows.len();

    let mut grid = Grid::<T>::create_with_default(width as i8, height as i8);

    for p in iter_rectangle_fill(width as i8, height as i8) {
        let mut c = rows[p.y as usize].chars().nth(p.x as usize).unwrap_or(' ');
        if c == '_' {
            c = ' '
        }

        grid.set(p, T::from(c));
    }

    grid
}

pub fn grid_to_ascii_transformed<T: Copy, F>(grid: &Grid<T>, to_string: F) -> String
where
    F: Fn(T) -> String,
{
    let mut out: String = String::new();
    for y in 0..grid.height {
        for x in 0..grid.width {
            let value = grid.get(Point {
                x: x as i8,
                y: y as i8,
            });
            out.push(to_string(value).chars().nth(0).unwrap());
        }
        if match out.chars().last() {
            Some(c) => c == ' ',
            _ => false,
        } {
            out.pop();
            out.push('_');
        }
        out.push('\n');
    }

    out.pop();
    out
}

pub fn get_ascii_grid<F>(grid_width: i8, grid_height: i8, to_string: F) -> String
where
    F: Fn(Point) -> String,
{
    let mut out: String = String::new();
    for y in 0..grid_height {
        for x in 0..grid_width {
            let p = Point { x, y };
            let s = to_string(p);
            let fist_char = s.chars().nth(0).unwrap();
            out.push(fist_char);
        }
        out.push('\n');
    }

    out.pop();
    out
}

pub fn grid_to_ascii<T: Copy + ToString>(grid: &Grid<T>) -> String {
    grid_to_ascii_transformed(grid, |value| value.to_string())
}

impl<T: ToString + Copy> ToString for Grid<T> {
    fn to_string(&self) -> String {
        grid_to_ascii(self)
    }
}
impl<T: From<char> + Default + Copy> From<&str> for Grid<T> {
    fn from(value: &str) -> Self {
        grid_from_ascii(value)
    }
}

impl From<u8> for Color {
    fn from(value: u8) -> Self {
        match value {
            0 => Color::Empty,
            1 => Color::Color1,
            2 => Color::Color2,
            3 => Color::Color3,
            4 => Color::Color4,
            _ => panic!("unknow number \"{}\"", value),
        }
    }
}
impl From<char> for Color {
    fn from(value: char) -> Self {
        match value {
            ' ' => Color::Empty,
            '_' => Color::Empty,
            '1' => Color::Color1,
            '2' => Color::Color2,
            '3' => Color::Color3,
            '4' => Color::Color4,

            '.' => Color::Color1,
            'o' => Color::Color2,
            'O' => Color::Color3,
            '0' => Color::Color3,
            '#' => Color::Color4,
            _ => panic!("unknow char \"{}\"", value),
        }
    }
}
impl From<Color> for char {
    fn from(value: Color) -> Self {
        match value {
            Color::Empty => ' ',
            Color::Color1 => '.',
            Color::Color2 => 'o',
            Color::Color3 => 'O',
            Color::Color4 => '#',
        }
    }
}
impl ToString for Color {
    fn to_string(&self) -> String {
        char::from(*self).to_string()
    }
}

#[test]
fn it_should_to_string_color_grid() {
    let mut grid = Grid::<Color>::create_with_default(4, 2);
    grid.set(Point { x: 1, y: 0 }, Color::Color2);
    grid.set(Point { x: 2, y: 0 }, Color::Color3);
    grid.set(Point { x: 3, y: 0 }, Color::Color4);
    grid.set(Point { x: 0, y: 0 }, Color::Color1);

    println!("{}", grid.to_string());

    assert_eq!(
        grid.to_string(),
        r#"
.oO#
   _
"#
        .trim(),
    );
}

#[test]
fn it_should_parse_color_grid() {
    let mut grid = Grid::<Color>::create_with_default(4, 2);
    grid.set(Point { x: 0, y: 0 }, Color::Color1);
    grid.set(Point { x: 1, y: 0 }, Color::Color2);
    grid.set(Point { x: 2, y: 0 }, Color::Color3);
    grid.set(Point { x: 3, y: 0 }, Color::Color4);

    let grid2 = Grid::<Color>::from(
        r#"
.oO#
   _
"#,
    );

    assert_eq!(grid2, grid);
}

#[test]
fn it_should_to_string_number_grid() {
    let mut grid = Grid::<u8>::create_with_default(4, 2);
    grid.set(Point { x: 0, y: 0 }, 1);
    grid.set(Point { x: 1, y: 0 }, 2);
    grid.set(Point { x: 2, y: 0 }, 3);
    grid.set(Point { x: 3, y: 0 }, 4);

    assert_eq!(
        grid.to_string(),
        r#"
1234
0000
"#
        .trim(),
    );
}
