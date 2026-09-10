import { describe, it, expect } from "bun:test";
import {
  blendHex,
  buildSourcesColorDots,
  SOURCE_COLORS,
  SOURCE_LEGEND_ORDER,
} from "../palettes";

describe("blendHex", () => {
  it("returns the same color for a single input", () => {
    expect(blendHex(["#40c463"])).toBe("#40c463");
  });

  it("averages two colors", () => {
    expect(blendHex(["#000000", "#ffffff"])).toBe("#808080");
  });
});

describe("SOURCE_COLORS", () => {
  it("uses yellow for WakaTime", () => {
    expect(SOURCE_COLORS.wakatime).toBe("#f1e05a");
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

  it("uses restored dark empty color #2d333b", () => {
    const dots = buildSourcesColorDots("#2d333b");
    expect(dots[0]).toBe("#2d333b");
  });
});
