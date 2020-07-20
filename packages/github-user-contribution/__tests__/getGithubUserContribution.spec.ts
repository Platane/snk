import { getGithubUserContribution } from "..";

it("should get user contribution", async () => {
  const { cells, colorScheme } = await getGithubUserContribution("platane");

  expect(cells.length).toBeGreaterThan(300);
  expect(colorScheme).toEqual([
    "#ebedf0",
    "#9be9a8",
    "#40c463",
    "#30a14e",
    "#216e39",
  ]);
});
