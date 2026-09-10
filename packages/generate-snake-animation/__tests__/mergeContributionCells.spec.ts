import { describe, it, expect } from "bun:test";
import {
  mergeContributionCells,
  PLATFORM_BITS,
} from "../mergeContributionCells";

describe("mergeContributionCells", () => {
  it("ORs source masks and takes max intensity", () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = today.toLocaleDateString("en-CA");

    const cells = mergeContributionCells([
      {
        bit: PLATFORM_BITS.github,
        cells: [{ x: 0, y: 0, date, count: 3, level: 2 }],
      },
      {
        bit: PLATFORM_BITS.wakatime,
        cells: [{ x: 0, y: 0, date, count: 100, level: 4 }],
      },
    ]);

    const todayCell = cells.find((c) => c.date === date);
    expect(todayCell?.sources).toBe(
      PLATFORM_BITS.github | PLATFORM_BITS.wakatime,
    );
    expect(todayCell?.level).toBe(4);
  });

  it("merges same-day GH+GL with max level", () => {
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
        cells: [{ x: 0, y: 0, date, count: 1, level: 3 }],
      },
    ]);

    const todayCell = cells.find((c) => c.date === date);
    expect(todayCell?.sources).toBe(
      PLATFORM_BITS.github | PLATFORM_BITS.gitlab,
    );
    expect(todayCell?.level).toBe(3);
  });

  it("builds ~365 cells with level 0–4", () => {
    const cells = mergeContributionCells([]);
    expect(cells.length).toBeGreaterThanOrEqual(365);
    expect(cells.every((c) => c.level >= 0 && c.level <= 4)).toBe(true);
  });
});
