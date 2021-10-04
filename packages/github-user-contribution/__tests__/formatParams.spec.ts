import { formatParams } from "../formatParams";

const params = [
  //
  [{}, ""],
  [{ year: 2017 }, "from=2017-01-01&to=2017-12-31"],
  [{ from: "2017-12-03" }, "from=2017-12-03"],
  [{ to: "2017-12-03" }, "to=2017-12-03"],
] as const;

params.forEach(([params, res]) =>
  it(`should format ${JSON.stringify(params)}`, () => {
    expect(formatParams(params)).toBe(res);
  })
);

it("should fail if the date is in the future", () => {
  expect(() => formatParams({ to: "9999-01-01" })).toThrow(Error);
});
