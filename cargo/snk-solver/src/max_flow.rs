use std::{
    collections::{HashMap, VecDeque},
    vec,
};

use snk_grid::{
    direction::{DIRECTIONS, add_direction},
    grid::Grid,
    point::Point,
};

//

pub fn get_max_flow(grid: &Grid<bool>, sink: Point, source: Point) -> u32 {
    let mut flow_map: FlowMap = HashMap::new();

    let get_capacity = |from: FlowNode, to: FlowNode| {
        if let FlowNode::IN(p1) = from
            && let FlowNode::OUT(p2) = to
            && p1 == p2
        {
            return 1;
        }

        if let FlowNode::OUT(p1) = from
            && let FlowNode::IN(p2) = to
            && p1 != p2
        // assuming p1 and p2 are neightbourn
        {
            return 1;
        }
        0
    };
    let get_edges = |from: FlowNode| {
        let p = match from {
            FlowNode::IN(p) => p,
            FlowNode::OUT(p) => p,
        };

        DIRECTIONS
            .iter()
            .map(move |dir| add_direction(p, *dir))
            .filter(|next_point| grid.get_inside(*next_point) == Some(true))
            .chain(std::iter::once(p))
            .map(move |next_point| match from {
                FlowNode::IN(_) => FlowNode::OUT(next_point),
                FlowNode::OUT(_) => FlowNode::IN(next_point),
            })
    };

    let sink_node = FlowNode::IN(sink);
    let source_node = FlowNode::OUT(source);

    while let Some(path) = {
        let mut predecessor = HashMap::<FlowNode, FlowNode>::new();
        let mut open_list = VecDeque::<FlowNode>::new();

        open_list.push_back(source_node);
        predecessor.insert(source_node, source_node);

        while let Some(from) = open_list.pop_front() {
            if from == sink_node {
                break;
            }

            for to in get_edges(from) {
                if predecessor.contains_key(&to) {
                    continue;
                }

                let residual_flow = get_capacity(from, to) + get_flow(&flow_map, to, from);
                if residual_flow >= 1 {
                    open_list.push_back(to);
                    predecessor.insert(to, from);
                }
            }
        }

        predecessor.get(&sink_node).map(|_| {
            let mut p = sink_node;
            let mut out = vec![sink_node];
            while let Some(n) = predecessor.get(&p) {
                out.push(*n);
                p = *n;
                if p == source_node {
                    break;
                }
            }
            out.reverse();
            out
        })
    } {
        let path_flow = path
            .iter()
            .zip(path.iter().skip(1))
            .fold(9999, |min, (from, to)| {
                let residual_flow = get_capacity(*from, *to) + get_flow(&flow_map, *to, *from);

                min.min(residual_flow)
            });
        for (from, to) in path.iter().zip(path.iter().skip(1)) {
            add_flow(&mut flow_map, *from, *to, path_flow);
        }
    }

    get_edges(sink_node).fold(0, |sum, from| {
        sum + get_flow(&flow_map, from, sink_node) as u32
    })
}

type FlowMap = HashMap<(FlowNode, FlowNode), i32>;
fn get_flow(map: &FlowMap, from: FlowNode, to: FlowNode) -> i32 {
    if let FlowNode::IN(_) = from {
        *(map.get(&(from, to)).unwrap_or(&0))
    } else {
        -*(map.get(&(to, from)).unwrap_or(&0))
    }
}
fn add_flow(map: &mut FlowMap, from: FlowNode, to: FlowNode, delta: i32) -> () {
    let value = get_flow(map, from, to) + delta;
    if let FlowNode::IN(_) = from {
        map.insert((from, to), value);
    } else {
        map.insert((to, from), -value);
    }
}

#[derive(Clone, Copy, PartialEq, Eq, Hash, Debug)]
enum FlowNode {
    IN(Point),
    OUT(Point),
}

// parse an ascii grid: '#' is a wall, 'S' the sink, 'D' the source, anything else is walkable
#[cfg(test)]
fn read_flow_grid(ascii: &str) -> (Grid<bool>, Point, Point) {
    let lines: Vec<&str> = ascii
        .lines()
        .map(|l| l.trim())
        .filter(|l| !l.is_empty())
        .collect();

    let mut grid = Grid::<bool>::create_with_value(lines[0].len() as i8, lines.len() as i8, false);
    let mut sink = None;
    let mut source = None;

    for (y, line) in lines.iter().enumerate() {
        for (x, c) in line.chars().enumerate() {
            let p = Point::new(x as i8, y as i8);
            grid.set(p, c != '#');
            match c {
                'S' => sink = Some(p),
                'D' => source = Some(p),
                _ => {}
            }
        }
    }

    (grid, sink.unwrap(), source.unwrap())
}

#[test]
fn it_should_find_a_flow_of_1_when_sink_is_next_to_source() {
    let (grid, sink, source) = read_flow_grid("SD");
    assert_eq!(get_max_flow(&grid, sink, source), 1);
}

#[test]
fn it_should_find_a_flow_of_1_for_a_dead_end() {
    let (grid, sink, source) = read_flow_grid(
        r#"
        #S#
        #.#
        #D#
        "#,
    );
    assert_eq!(get_max_flow(&grid, sink, source), 1);
}

#[test]
fn it_should_find_a_flow_of_2_for_two_separate_corridors() {
    let (grid, sink, source) = read_flow_grid(
        r#"
        .S.
        .#.
        .D.
        "#,
    );
    assert_eq!(get_max_flow(&grid, sink, source), 2);
}

#[test]
fn it_should_find_a_flow_of_1_when_paths_share_a_cell() {
    // every path from D goes through the cell under S
    let (grid, sink, source) = read_flow_grid(
        r#"
        #S#
        #.#
        ...
        .D.
        "#,
    );
    assert_eq!(get_max_flow(&grid, sink, source), 1);
}

#[test]
fn it_should_reroute_the_first_path_to_find_a_flow_of_2() {
    // the shortest path D -> up -> up -> up -> S blocks every second path
    // the two disjoint paths only exist if the first one is rerouted
    let (grid, sink, source) = read_flow_grid(
        r#"
        ###S..#
        ###.#.#
        #...#.#
        #.#...#
        #..D###
        #######
        "#,
    );
    assert_eq!(get_max_flow(&grid, sink, source), 2);
}
