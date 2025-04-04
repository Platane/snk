use crate::grid::{Cell, Grid, Point};

fn grid_from_ascii(ascii: &str) -> Grid {
    let rows: Vec<_> = ascii.trim().split('\n').collect();

    let width = rows.iter().fold(0, |max_len, r| max_len.max(r.len()));
    let height = rows.len();

    let mut grid = Grid::create_empty(width as u8, height as u8);

    for x in 0..width {
        for y in 0..height {
            let c = rows[y].chars().nth(x).unwrap_or(' ');
            let cell = match c {
                ' ' => Cell::Empty,
                '_' => Cell::Empty,
                '1' => Cell::Color1,
                '2' => Cell::Color2,
                '3' => Cell::Color3,
                '4' => Cell::Color4,

                '.' => Cell::Color1,
                'o' => Cell::Color2,
                'O' => Cell::Color3,
                '#' => Cell::Color4,
                _ => panic!("unknow char \"{}\"", c),
            };
            grid.set_cell(
                &Point {
                    x: x as i8,
                    y: y as i8,
                },
                cell,
            );
        }
    }

    grid
}

pub enum SampleGrid {
    Empty,
    OneDot,
    Realistic,
    Labyrinthe,
}
pub fn get_grid_sample(g: SampleGrid) -> Grid {
    grid_from_ascii(match g {
        SampleGrid::Empty => {
            &r#"
           _
           _
           _
           _
"#
        }
        SampleGrid::OneDot => {
            &r#"
           _
           _
    .      _
           _
           _
"#
        }
        SampleGrid::Realistic => {
            &r#"
231 412 12213  13  213  421  121131   32123112 332 _
412  12 4   331213 12214431 412  413 42133123  23 21
123 2143 21211 2423    213 123 1233123432 223331233_
 31  33 4  21 4 3321123 12331  3213133123 31 4 231 1
34122 3 2144 31 31234 212 2121 211 12 3 123  3123 12
442 12122122 12331123  33443  3311121 111  223  333_
31413 31231 2  213321 123  32123 3332 12312 3 33 2 3
"#
        }
        SampleGrid::Labyrinthe => {
            &r#"
################################################## #
#                                                  #
# ##################################################
#                                                  #
################################################## #
#.                                                 #
####################################################
"#
        }
    })
}
