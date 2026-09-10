import { describe, it, expect } from "bun:test";
import {
  blendOklch,
  buildSourcesColorDots,
  EMPTY_DARK,
  EMPTY_LIGHT,
  formatOklch,
  GH_ACTIVE,
  parseOklch,
  SOURCE_COLORS,
  SOURCE_LEGEND_ORDER,
  withHue,
} from "../palettes";

describe("formatOklch / parseOklch", () => {
  it("formats GH_ACTIVE as an oklch() CSS color", () => {
    expect(formatOklch(GH_ACTIVE)).toMatch(/^oklch\(/);
    expect(SOURCE_COLORS.github).toBe(formatOklch(GH_ACTIVE));
  });

  it("round-trips oklch strings", () => {
    const s = formatOklch(GH_ACTIVE);
    const parsed = parseOklch(s);
    expect(parsed.l).toBeCloseTo(GH_ACTIVE.l, 3);
    expect(parsed.c).toBeCloseTo(GH_ACTIVE.c, 3);
    expect(parsed.h).toBeCloseTo(GH_ACTIVE.h, 1);
  });

  it("preserves L/C when withHue is applied", () => {
    const shifted = withHue(GH_ACTIVE, 40);
    expect(shifted.l).toBe(GH_ACTIVE.l);
    expect(shifted.c).toBe(GH_ACTIVE.c);
    expect(shifted.h).toBe(40);
  });
});

describe("blendOklch", () => {
  it("returns oklch() for a single input", () => {
    expect(blendOklch([SOURCE_COLORS.github])).toMatch(/^oklch\(/);
    expect(parseOklch(blendOklch([SOURCE_COLORS.github])).h).toBeCloseTo(
      GH_ACTIVE.h,
      1,
    );
  });

  it("averages L and circular-mean H in OKLCH space", () => {
    const mixed = parseOklch(blendOklch(["#000000", "#ffffff"]));
    expect(mixed.l).toBeGreaterThan(0.4);
    expect(mixed.l).toBeLessThan(0.6);
  });

  it("blends two source colors by averaging L and C", () => {
    const mixed = parseOklch(
      blendOklch([SOURCE_COLORS.github, SOURCE_COLORS.gitlab]),
    );
    const gh = parseOklch(SOURCE_COLORS.github);
    const gl = parseOklch(SOURCE_COLORS.gitlab);
    expect(mixed.l).toBeCloseTo((gh.l + gl.l) / 2, 5);
    expect(mixed.c).toBeCloseTo((gh.c + gl.c) / 2, 5);
  });
});

describe("SOURCE_COLORS", () => {
  it("emits oklch() strings for every source", () => {
    expect(SOURCE_COLORS.github).toMatch(/^oklch\(/);
    expect(SOURCE_COLORS.gitlab).toMatch(/^oklch\(/);
    expect(SOURCE_COLORS.wakatime).toMatch(/^oklch\(/);
  });

  it("keeps shared L/C across sources (hue-only shift)", () => {
    const gh = parseOklch(SOURCE_COLORS.github);
    const gl = parseOklch(SOURCE_COLORS.gitlab);
    const wt = parseOklch(SOURCE_COLORS.wakatime);
    expect(gl.l).toBeCloseTo(gh.l, 4);
    expect(gl.c).toBeCloseTo(gh.c, 4);
    expect(wt.l).toBeCloseTo(gh.l, 4);
    expect(wt.c).toBeCloseTo(gh.c, 4);
    expect(gl.h).not.toBeCloseTo(gh.h, 0);
    expect(wt.h).not.toBeCloseTo(gh.h, 0);
  });
});

describe("SOURCE_LEGEND_ORDER", () => {
  it("places WakaTime between GitHub and GitLab", () => {
    expect([...SOURCE_LEGEND_ORDER]).toEqual([
      "github",
      "wakatime",
      "gitlab",
    ]);
  });
});

describe("buildSourcesColorDots", () => {
  it("builds 8 entries for empty + 7 bitmasks", () => {
    const dots = buildSourcesColorDots(EMPTY_LIGHT);
    expect(dots).toHaveLength(8);
    expect(dots[0]).toBe(EMPTY_LIGHT);
    expect(dots[1]).toBe(SOURCE_COLORS.github);
    expect(dots[2]).toBe(SOURCE_COLORS.gitlab);
    expect(dots[4]).toBe(SOURCE_COLORS.wakatime);
    expect(dots[3]).toBe(
      blendOklch([SOURCE_COLORS.github, SOURCE_COLORS.gitlab]),
    );
    expect(dots[7]).toBe(
      blendOklch([
        SOURCE_COLORS.github,
        SOURCE_COLORS.gitlab,
        SOURCE_COLORS.wakatime,
      ]),
    );
  });

  it("uses dark empty oklch from the GitHub ladder", () => {
    expect(EMPTY_DARK).toBe("oklch(31.03% 0.0227 256.41)");
    const dots = buildSourcesColorDots(EMPTY_DARK);
    expect(dots[0]).toBe(EMPTY_DARK);
  });
});
