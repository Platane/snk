use snk_grid::{
    color::Color,
    direction::Direction,
    grid::{Grid, iter_rectangle_fill},
    snake::{Snake, Snake4},
};

pub struct SolutionFitness {
    pub remaining_color_count: u32,
    pub stack_fitness: u32,
    pub solution_fitness: u32,
}

pub fn get_solution_fitness(
    grid: &Grid<Color>,
    snake: Snake4,
    solution: Vec<Direction>,
) -> SolutionFitness {
    let mut grid = grid.clone();
    let mut snake = snake.clone();
    let mut stack = Vec::new();

    let solution_length = solution.len() as u32;

    for direction in solution {
        step(&mut grid, &mut snake, &mut stack, direction);
    }

    println!("{:?}", stack);

    let remaining_color_count = iter_rectangle_fill(grid.width as i8, grid.height as i8)
        .fold(0, |sum, p| {
            sum + if grid.get_color(p).is_empty() { 0 } else { 1 }
        });
    let stack_fitness = get_stack_fitness(&stack);
    let solution_fitness = remaining_color_count * 100_000 + stack_fitness * 1000 + solution_length;

    SolutionFitness {
        remaining_color_count,
        stack_fitness,
        solution_fitness,
    }
}

// a fitness that count the number of permutation to order the stack
// 0 = perfect
// the bigger fitness is, the worse the stack
pub fn get_stack_fitness(stack: &Vec<Color>) -> u32 {
    let mut stack = stack.clone();
    let mut fitness = 0;

    stack.push(Color::Color4);

    for i in 0..(stack.len() - 1) {
        while stack[i] > stack[i + 1] {
            let mut j = 0;
            while stack[i + j] > stack[i + j + 1] {
                let tmp = stack[i + j + 1];
                stack[i + j + 1] = stack[i + j];
                stack[i + j] = tmp;
                j += 1;
                fitness += 1;
            }
        }
    }

    fitness
}

fn step(
    grid: &mut Grid<Color>,
    snake: &mut Snake4,
    stack: &mut Vec<Color>,
    direction: Direction,
) -> () {
    snake.move_snake(direction);

    let head = snake.get_head();

    let c = grid.get_color(head);

    if !c.is_empty() {
        grid.set(head, Color::Empty);
        stack.push(c);
    }
}

#[test]
fn it_should_compute_stack_fitness_for_empty_stack() {
    let stack = vec![];
    assert_eq!(get_stack_fitness(&stack), 0);
}

#[test]
fn it_should_compute_stack_fitness_for_orderer_stack() {
    let stack = vec![Color::Color1, Color::Color2, Color::Color2, Color::Color4];
    assert_eq!(get_stack_fitness(&stack), 0);
}

#[test]
fn it_should_compute_stack_fitness_for_unperfect_stack() {
    let stack = vec![Color::Color1, Color::Color2, Color::Color1];
    assert_eq!(get_stack_fitness(&stack), 1);
}

#[test]
fn it_should_compute_stack_fitness_for_unperfect_stack_2() {
    let stack = vec![
        Color::Color1,
        Color::Color2,
        Color::Color1,
        Color::Color1,
        Color::Color3,
    ];
    assert_eq!(get_stack_fitness(&stack), 2);

    let stack = vec![
        Color::Color1,
        Color::Color3,
        Color::Color2,
        Color::Color1,
        Color::Color1,
    ];
    assert_eq!(get_stack_fitness(&stack), 5);
}
