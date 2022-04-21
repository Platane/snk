import { parseEntry } from "../outputsOptions";

[
  "path/to/out.gif",

  "/out.svg?color_snake=orange&color_dots=#000,#111,#222,#333,#444",

  `/out.svg?{"color_snake":"yellow","color_dots":["#000","#111","#222","#333","#444"]}`,

  `/out.svg       {"color_snake":"yellow"}`,

  "/out.svg?color_snake=orange&color_dots=#000,#111,#222,#333,#444&dark_color_dots=#a00,#a11,#a22,#a33,#a44",

  "/out.svg?.gif.svg?color_snake=orange",
].forEach((entry) =>
  it(`should parse ${entry}`, () => {
    expect(parseEntry(entry)).toMatchSnapshot();
  })
);
