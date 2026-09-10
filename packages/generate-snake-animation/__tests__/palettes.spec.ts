import { describe, it, expect } from "bun:test";
import { blendHex, buildSourcesColorDots, SOURCE_COLORS } from "../palettes";

describe("blendHex", () => {
  it("returns the same color for a single input", () => {
    expect(blendHex(["#40c463"])).toBe("#40c463");
  });

  it("averages two colors", () => {
    expect(blendHex(["#000000", "#ffffff"])).toBe("#808080");
  });
});

describe("buildSourcesColorDots", () => {
  it("builds 8 entries for empty + 7 bitmasks", () => {
    const dots = buildSourcesColorDots("#ebedf0");
    expect(dots).toHaveLength(8);
    expect(dots[0]).toBe("#ebedf0");
    expect(dots[1]).toBe(SOURCE_COLORS.github);
    expect(dots[2]).toBe(SOURCE_COLORS.gitlab);
    expect(dots[4]).toBe(SOURCE_COLORS.wakatime);
    expect(dots[3]).toBe(blendHex([SOURCE_COLORS.github, SOURCE_COLORS.gitlab]));
    expect(dots[7]).toBe(
      blendHex([
        SOURCE_COLORS.github,
        SOURCE_COLORS.gitlab,
        SOURCE_COLORS.wakatime,
      ]),
    );
  });
});
