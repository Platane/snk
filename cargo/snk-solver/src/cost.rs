use std::ops::{Add, AddAssign, Mul};

use snk_grid::color::Color;

#[derive(Debug, Copy, Clone, PartialEq, Eq, PartialOrd, Ord)]
pub struct Cost(pub u64);

impl Add for Cost {
    type Output = Self;

    fn add(self, rhs: Self) -> Self {
        Self(self.0 + rhs.0)
    }
}
impl AddAssign for Cost {
    fn add_assign(&mut self, rhs: Self) {
        self.0 += rhs.0;
    }
}
impl Mul<u64> for Cost {
    type Output = Self;

    fn mul(self, rhs: u64) -> Self {
        Self(self.0 * rhs)
    }
}

impl From<Color> for Cost {
    fn from(color: Color) -> Self {
        match color {
            Color::Empty => Cost(1),
            Color::Color1 => Cost(256),
            Color::Color2 => Cost(256 * 200),
            Color::Color3 => Cost(256 * 200 * 200),
            Color::Color4 => Cost(256 * 200 * 200 * 200),
        }
    }
}

impl Cost {
    pub fn zero() -> Self {
        Self(0)
    }
    pub fn max() -> Self {
        Self(u64::MAX)
    }
    pub fn very_large() -> Self {
        Self(u64::MAX / 8)
    }
    pub fn is_free(&self) -> bool {
        self.0 < 256
    }
    pub fn set_empty_to_zero(&self) -> Self {
        Self((self.0 / 256) * 256)
    }

    // return the count for the given color
    pub fn get_color_count(&self, color: Color) -> u64 {
        match color {
            Color::Empty => self.0 % 256,
            Color::Color1 => (self.0 / 256) % 200,
            Color::Color2 => (self.0 / (256 * 200)) % 200,
            Color::Color3 => (self.0 / (256 * 200 * 200)) % 200,
            Color::Color4 => (self.0 / (256 * 200 * 200 * 200)) % 200,
        }
    }
}

#[test]
fn it_should_not_overflow() {
    // it should not panic
    let very_large_cost = Cost::from(Color::Color4) * 256;
    assert!(very_large_cost < Cost::max())
}

#[test]
fn it_should_sum_cost() {
    let mut c = Cost::zero();
    c = c + Color::Color1.into();
    assert!(Cost::zero() < c);
}
#[test]
fn it_should_extract_color_count() {
    let c = Cost::zero()
        + Cost::from(Color::Color2) * 6
        + Cost::from(Color::Color1) * 2
        + Cost::from(Color::Color1) * 17
        + Cost::from(Color::Color4) * 25;
    assert_eq!(c.get_color_count(Color::Color1), 19);
    assert_eq!(c.get_color_count(Color::Color2), 6);
    assert_eq!(c.get_color_count(Color::Color3), 0);
    assert_eq!(c.get_color_count(Color::Color4), 25);
}
