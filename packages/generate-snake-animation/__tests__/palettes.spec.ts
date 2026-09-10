import { describe, it, expect } from "bun:test";
import {
  buildIntensityColorDots,
  buildIntensityLegendColors,
  colorAtHue,
  colorForCell,
  dominantHueFromCells,
  EMPTY_DARK,
  EMPTY_LIGHT,
  formatOklch,
  GH_ACTIVE,
  GH_LADDER,
  INTENSITY_LEGEND_COLORS,
  parseOklch,
  SOURCE_COLORS,
  SOURCE_HUES,
  SOURCE_LEGEND_ORDER,
  strokeForCell,
  withHue,
} from "../palettes";

describe("GH_LADDER", () => {
  it("has 5 steps matching the GitHub dark scale", () => {
    expect(GH_LADDER).toHaveLength(5);
    expect(GH_ACTIVE).toEqual(GH_LADDER[4]);
    expect(formatOklch(GH_LADDER[0]!)).toBe(EMPTY_DARK);
  });
});

describe("colorForCell / strokeForCell", () => {
  it("uses ladder L/C with GitHub hue at level 4", () => {
    const c = parseOklch(colorForCell(1, 4));
    expect(c.l).toBeCloseTo(GH_LADDER[4]!.l, 3);
    expect(c.c).toBeCloseTo(GH_LADDER[4]!.c, 3);
    expect(c.h).toBeCloseTo(GH_LADDER[4]!.h, 1);
  });

  it("changes only hue for GitLab / WakaTime at same level", () => {
    const gh = parseOklch(colorForCell(1, 3));
    const gl = parseOklch(colorForCell(2, 3));
    const wt = parseOklch(colorForCell(4, 3));
    expect(gl.l).toBeCloseTo(gh.l, 4);
    expect(gl.c).toBeCloseTo(gh.c, 4);
    expect(wt.l).toBeCloseTo(gh.l, 4);
    expect(gl.h).not.toBeCloseTo(gh.h, 0);
    expect(wt.h).not.toBeCloseTo(gh.h, 0);
  });

  it("blends hue for multi-source masks", () => {
    const mixed = parseOklch(colorForCell(1 | 4, 4));
    const gh = parseOklch(colorForCell(1, 4));
    const wt = parseOklch(colorForCell(4, 4));
    expect(mixed.l).toBeCloseTo(gh.l, 4);
    // circular mean sits between the two hues
    const lo = Math.min(gh.h, wt.h);
    const hi = Math.max(gh.h, wt.h);
    expect(mixed.h).toBeGreaterThan(lo);
    expect(mixed.h).toBeLessThan(hi);
  });

  it("makes stroke slightly darker in L than fill", () => {
    const fill = parseOklch(colorForCell(1, 4));
    const stroke = parseOklch(strokeForCell(1, 4));
    expect(stroke.l).toBeLessThan(fill.l);
    expect(stroke.h).toBeCloseTo(fill.h, 2);
    expect(stroke.c).toBeCloseTo(fill.c, 4);
  });

  it("preserves L/C with withHue", () => {
    const shifted = withHue(GH_ACTIVE, 40);
    expect(shifted.l).toBe(GH_ACTIVE.l);
    expect(shifted.c).toBe(GH_ACTIVE.c);
    expect(shifted.h).toBe(40);
  });
});

describe("dominantHueFromCells", () => {
  const angularDist = (a: number, b: number) => {
    const d = Math.abs(a - b) % 360;
    return Math.min(d, 360 - d);
  };

  it("falls back to GitHub hue when there is no activity", () => {
    expect(dominantHueFromCells([])).toBeCloseTo(GH_ACTIVE.h, 5);
    expect(
      dominantHueFromCells([{ sources: 0, level: 0 }, { sources: 1, level: 0 }]),
    ).toBeCloseTo(GH_ACTIVE.h, 5);
  });

  it("pushes toward GitHub when GH-heavy", () => {
    const hue = dominantHueFromCells([
      { sources: 1, level: 4 },
      { sources: 1, level: 4 },
      { sources: 1, level: 3 },
      { sources: 2, level: 1 },
    ]);
    expect(angularDist(hue, SOURCE_HUES.github)).toBeLessThan(
      angularDist(hue, SOURCE_HUES.gitlab),
    );
  });

  it("pushes toward GitLab when GL-heavy", () => {
    const hue = dominantHueFromCells([
      { sources: 2, level: 4 },
      { sources: 2, level: 4 },
      { sources: 2, level: 3 },
      { sources: 1, level: 1 },
    ]);
    expect(angularDist(hue, SOURCE_HUES.gitlab)).toBeLessThan(
      angularDist(hue, SOURCE_HUES.github),
    );
  });

  it("weights by intensity across set bits", () => {
    const hue = dominantHueFromCells([{ sources: 1 | 2, level: 4 }]);
    const lo = Math.min(SOURCE_HUES.github, SOURCE_HUES.gitlab);
    const hi = Math.max(SOURCE_HUES.github, SOURCE_HUES.gitlab);
    expect(hue).toBeGreaterThan(lo);
    expect(hue).toBeLessThan(hi);
  });
});

describe("SOURCE_COLORS / legends", () => {
  it("emits oklch() for every source", () => {
    expect(SOURCE_COLORS.github).toMatch(/^oklch\(/);
    expect(SOURCE_COLORS.gitlab).toMatch(/^oklch\(/);
    expect(SOURCE_COLORS.wakatime).toMatch(/^oklch\(/);
  });

  it("places WakaTime between GitHub and GitLab", () => {
    expect([...SOURCE_LEGEND_ORDER]).toEqual([
      "github",
      "wakatime",
      "gitlab",
    ]);
  });

  it("builds intensity legend with 5 ladder colors", () => {
    expect(INTENSITY_LEGEND_COLORS).toHaveLength(5);
  });

  it("builds intensity colorDots empty + 4 levels", () => {
    const dots = buildIntensityColorDots(EMPTY_LIGHT);
    expect(dots).toHaveLength(5);
    expect(dots[0]).toBe(EMPTY_LIGHT);
  });

  it("tints stack and Less/More with the given hue at levels 1–4", () => {
    const hue = SOURCE_HUES.gitlab;
    const dots = buildIntensityColorDots(EMPTY_LIGHT, hue);
    const legend = buildIntensityLegendColors(hue);
    for (let lv = 1; lv <= 4; lv++) {
      expect(parseOklch(dots[lv]!).h).toBeCloseTo(hue, 1);
      expect(parseOklch(legend[lv]!).h).toBeCloseTo(hue, 1);
      expect(dots[lv]).toMatch(/^oklch\(/);
      expect(legend[lv]).toBe(colorAtHue(lv, hue));
    }
  });
});
