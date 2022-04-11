import { parseEntry } from "../outputsOptions";

[
  "path/to/out.gif",

  "/out.svg?color_snake=orange&color_dots=#bfd6f6,#8dbdff,#64a1f4,#4b91f1,#3c7dd9",
].forEach((entry) =>
  it(`should parse ${entry}`, () => {
    expect(parseEntry(entry)).toMatchSnapshot();
  })
);
