#[derive(Copy, Clone, Debug, PartialEq, PartialOrd)]
#[repr(u8)]
pub enum Color {
    Empty = 0,
    Color1 = 1,
    Color2 = 2,
    Color3 = 3,
    Color4 = 4,
}
impl Default for Color {
    fn default() -> Self {
        Color::Empty
    }
}
impl Color {
    pub fn is_walkable(&self, walkable: Color) -> bool {
        *self <= walkable
    }
    pub fn is_empty(&self) -> bool {
        *self == Color::Empty
    }
}

#[test]
fn it_should_sort_cell() {
    assert_eq!(Color::Empty < Color::Color1, true);
    assert_eq!(Color::Color1 < Color::Color2, true);
    assert_eq!(Color::Color2 < Color::Color3, true);
    assert_eq!(Color::Color3 < Color::Color4, true);
}
