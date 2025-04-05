use wasm_bindgen::prelude::wasm_bindgen;

use crate::grid::{Color, Grid, Point};

fn grid_from_ascii(ascii: &str) -> Grid<Color> {
    let rows: Vec<_> = ascii.trim().split('\n').collect();

    let width = rows.iter().fold(0, |max_len, r| max_len.max(r.len()));
    let height = rows.len();

    let mut grid = Grid::<Color>::create(width as u8, height as u8);

    for x in 0..width {
        for y in 0..height {
            let c = rows[y].chars().nth(x).unwrap_or(' ');
            let cell = match c {
                ' ' => Color::Empty,
                '_' => Color::Empty,
                '1' => Color::Color1,
                '2' => Color::Color2,
                '3' => Color::Color3,
                '4' => Color::Color4,

                '.' => Color::Color1,
                'o' => Color::Color2,
                'O' => Color::Color3,
                '#' => Color::Color4,
                _ => panic!("unknow char \"{}\"", c),
            };
            grid.set(
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

fn randomly_fill_grid(grid: &mut Grid<Color>, probability: &[Color], seed: u32) -> () {
    // Pseudorandom number generator from the "Xorshift RNGs" paper by George Marsaglia.
    // https://github.com/rust-lang/rust/blob/1.55.0/library/core/src/slice/sort.rs#L559-L573
    fn random_numbers(seed: u32) -> impl Iterator<Item = u32> {
        let mut random = seed;
        std::iter::repeat_with(move || {
            random ^= random << 13;
            random ^= random >> 17;
            random ^= random << 5;
            random
        })
    }

    let mut rng = random_numbers(seed);

    for x in 0..(grid.width as i8) {
        for y in 0..(grid.height as i8) {
            let random = rng.next().unwrap();
            let cell = probability[random as usize % probability.len()];
            grid.set(&Point { x, y }, cell);
        }
    }
}

#[wasm_bindgen]
pub enum SampleGrid {
    Empty,
    OneDot,
    Realistic,
    Labyrinthe,
    RandomPack,
}
pub fn get_grid_sample(g: SampleGrid) -> Grid<Color> {
    match g {
        SampleGrid::Empty => grid_from_ascii(
            &r#"
           _
           _
           _
           _
"#,
        ),

        SampleGrid::OneDot => grid_from_ascii(
            &r#"
           _
           _
    .      _
           _
           _
"#,
        ),

        SampleGrid::Realistic => grid_from_ascii(
            &r#"
231 412 12213  13  213  421  121131   32123112 332 _
412  12 4   331213 12214431 412  413 42133123  23 21
123 2143 21211 2423    213 123 1233123432 223331233_
 31  33 4  21 4 3321123 12331  3213133123 31 4 231 1
34122 3 2144 31 31234 212 2121 211 12 3 123  3123 12
442 12122122 12331123  33443  3311121 111  223  333_
31413 31231 2  213321 123  32123 3332 12312 3 33 2 3
"#,
        ),

        SampleGrid::Labyrinthe => grid_from_ascii(
            &r#"
################################################## #
#                                                  #
# ##################################################
#                                                  #
################################################## #
#.                                                 #
####################################################
"#,
        ),

        SampleGrid::RandomPack => {
            let mut grid = Grid::<Color>::create(52, 7);
            randomly_fill_grid(
                &mut grid,
                &[Color::Empty, Color::Empty, Color::Color1, Color::Color4],
                92u32,
            );
            grid
        }
    }
}
