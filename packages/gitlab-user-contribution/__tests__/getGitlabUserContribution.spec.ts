import { describe, it, expect } from "bun:test";
import { getGitlabUserContribution } from "..";

describe("getGitlabUserContribution", () => {
  const promise = getGitlabUserContribution("dzaporozhets");

  it("should resolve", async () => {
    await promise;
  });

  it("should get around 365 cells", async () => {
    const cells = await promise;

    expect(cells.length).toBeGreaterThanOrEqual(365);
    expect(cells.length).toBeLessThanOrEqual(365 + 7);
  });

  it("cells should cover a full 7-row grid with no gaps", async () => {
    const cells = await promise;

    expect(cells.length).toBeGreaterThan(300);

    const maxX = Math.max(...cells.map((c) => c.x));

    const missing = Array.from({ length: maxX }, (_, x) =>
      Array.from({ length: 7 }, (_, y) => ({ x, y })),
    )
      .flat()
      .filter(({ x, y }) => !cells.some((c) => c.x === x && c.y === y));

    expect(missing).toEqual([]);
  });

  it("cells should have level between 0 and 4", async () => {
    const cells = await promise;

    for (const c of cells) {
      expect(c.level).toBeGreaterThanOrEqual(0);
      expect(c.level).toBeLessThanOrEqual(4);
    }
  });
});
