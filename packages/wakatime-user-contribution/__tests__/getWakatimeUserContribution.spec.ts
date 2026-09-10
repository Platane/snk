import { describe, it, expect } from "bun:test";
import { getWakatimeUserContribution } from "..";

const apiKey = process.env.WAKATIME_API_KEY;

describe("getWakatimeUserContribution", () => {
  it.skipIf(!apiKey)("should resolve around a year of cells", async () => {
    const cells = await getWakatimeUserContribution({ apiKey: apiKey! });

    expect(cells.length).toBeGreaterThanOrEqual(365);
    expect(cells.length).toBeLessThanOrEqual(365 + 7);

    for (const c of cells) {
      expect(c.level).toBeGreaterThanOrEqual(0);
      expect(c.level).toBeLessThanOrEqual(1);
      expect(c.y).toBeGreaterThanOrEqual(0);
      expect(c.y).toBeLessThanOrEqual(6);
    }
  });
});
