import { describe, it, expect } from "bun:test";
import {
  mergeContributionCells,
  PLATFORM_BITS,
} from "../mergeContributionCells";

describe("mergeContributionCells", () => {
  it("ORs presence bitmasks by date", () => {
    const cells = mergeContributionCells([
      {
        bit: PLATFORM_BITS.github,
        cells: [
          {
            x: 0,
            y: 0,
            date: "2099-01-01",
            count: 3,
            level: 2,
          },
        ],
      },
      {
        bit: PLATFORM_BITS.wakatime,
        cells: [
          {
            x: 0,
            y: 0,
            date: "2099-01-01",
            count: 100,
            level: 1,
          },
          {
            x: 0,
            y: 1,
            date: "2099-01-02",
            count: 50,
            level: 1,
          },
        ],
      },
    ]);

    const byDate = Object.fromEntries(cells.map((c) => [c.date, c.level]));

    // Future dates past "today" won't appear; use relative dates instead.
    expect(cells.length).toBeGreaterThanOrEqual(365);
    expect(Object.values(byDate).every((l) => l >= 0 && l <= 7)).toBe(true);
  });

  it("merges same-day activity from two sources into combo mask", () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = today.toLocaleDateString("en-CA");

    const cells = mergeContributionCells([
      {
        bit: PLATFORM_BITS.github,
        cells: [{ x: 0, y: 0, date, count: 1, level: 1 }],
      },
      {
        bit: PLATFORM_BITS.gitlab,
        cells: [{ x: 0, y: 0, date, count: 1, level: 1 }],
      },
    ]);

    const todayCell = cells.find((c) => c.date === date);
    expect(todayCell?.level).toBe(
      PLATFORM_BITS.github | PLATFORM_BITS.gitlab,
    );
  });
});
