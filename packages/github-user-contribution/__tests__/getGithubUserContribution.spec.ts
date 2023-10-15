import { getGithubUserContribution } from "..";
import { config } from "dotenv";
config({ path: __dirname + "/../../../.env" });

describe("getGithubUserContribution", () => {
  const promise = getGithubUserContribution("platane", {
    githubToken: process.env.GITHUB_TOKEN!,
  });

  it("should resolve", async () => {
    await promise;
  });

  it("should get around 365 cells", async () => {
    const cells = await promise;

    expect(cells.length).toBeGreaterThanOrEqual(365);
    expect(cells.length).toBeLessThanOrEqual(365 + 7);
  });

  it("cells should have x / y coords representing to a 7 x (365/7) (minus unfilled last row)", async () => {
    const cells = await promise;

    expect(cells.length).toBeGreaterThan(300);

    const undefinedDays = Array.from({ length: Math.floor(365 / 7) })
      .map((x) => Array.from({ length: 7 }).map((y) => ({ x, y })))
      .flat()
      .filter(({ x, y }) => cells.some((c: any) => c.x === x && c.y === y));

    expect(undefinedDays).toEqual([]);
  });
});
