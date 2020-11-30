import { formatParams } from "../formatParams";

[
  //
  [{}, ""],
  [{ year: 2017 }, "from=2017-01-01&to=2017-12-31"],
  [{ from: new Date("2017-12-03") }, "from=2017-12-03"],
  [{ from: "2017-12-03" }, "from=2017-12-03"],
  [{ to: "2017-12-03" }, "to=2017-12-03"],
].forEach(([params, res]) =>
  it(`should format ${JSON.stringify(params)}`, () => {
    expect(formatParams(params)).toBe(res);
  })
);

it("should fail if the date is in the future", () => {
  expect(() => formatParams({ to: new Date() })).toThrow(Error);
});
