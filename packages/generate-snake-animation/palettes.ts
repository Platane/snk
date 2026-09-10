export type Oklch = { l: number; c: number; h: number };

/**
 * GitHub contribution ladder (dark). Step 0 = empty; 1–4 = intensity.
 * Active steps keep L/C; H is replaced by source blend.
 */
export const GH_LADDER: readonly Oklch[] = [
  { l: 0.3103, c: 0.0227, h: 256.41 }, // #29313C empty
  { l: 0.3563, c: 0.0803, h: 146.33 },
  { l: 0.4679, c: 0.1112, h: 145.24 },
  { l: 0.6017, c: 0.1336, h: 144.9 },
  { l: 0.7435, c: 0.1501, h: 144.1 }, // #6BC46C
] as const;

/** Dark empty from ladder step 0. */
export const EMPTY_DARK = "oklch(31.03% 0.0227 256.41)";

/** Light empty (unchanged hex — fine in SVG). */
export const EMPTY_LIGHT = "#ebedf0";

/** Brightest GitHub step — legend swatches / level 4. */
export const GH_ACTIVE: Oklch = GH_LADDER[4]!;

const STROKE_L_DELTA = 0.04;

/** Format OKLCH as a CSS/SVG color (percent lightness). */
export const formatOklch = ({ l, c, h }: Oklch): string => {
  const lp = (l <= 1 ? l * 100 : l).toFixed(2).replace(/\.?0+$/, "");
  const cp = Number(c.toFixed(4));
  const hp = Number(h.toFixed(2));
  return `oklch(${lp}% ${cp} ${hp})`;
};

/** Parse `oklch(...)` or fall back to hex→OKLCH for brand seed hues. */
export const parseOklch = (color: string): Oklch => {
  const m = color
    .trim()
    .match(/^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*\)$/i);
  if (m) {
    let l = parseFloat(m[1]!);
    if (l > 1) l = l / 100;
    return { l, c: parseFloat(m[2]!), h: parseFloat(m[3]!) };
  }
  return hexToOklch(color);
};

const lin = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

const parseHex = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ];
};

/** sRGB hex → OKLCH (seed brand hues from `#fc6D26` / `#f1e05a`). */
export const hexToOklch = (hex: string): Oklch => {
  const [r8, g8, b8] = parseHex(hex);
  const r = lin(r8);
  const g = lin(g8);
  const b = lin(b8);

  const l_ = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m_ = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s_ = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l = Math.cbrt(l_);
  const m = Math.cbrt(m_);
  const s = Math.cbrt(s_);

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bLab = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  const c = Math.sqrt(a * a + bLab * bLab);
  let h = (Math.atan2(bLab, a) * 180) / Math.PI;
  if (h < 0) h += 360;

  return { l: L, c, h };
};

export const withHue = (base: Oklch, h: number): Oklch => ({
  l: base.l,
  c: base.c,
  h: ((h % 360) + 360) % 360,
});

export const hueOf = (color: string): number => parseOklch(color).h;

/** Circular mean of hues in degrees. */
export const circularMeanHue = (hues: number[]): number => {
  if (hues.length === 0) return 0;
  let x = 0;
  let y = 0;
  for (const h of hues) {
    const r = (h * Math.PI) / 180;
    x += Math.cos(r);
    y += Math.sin(r);
  }
  const n = hues.length;
  let deg = (Math.atan2(y / n, x / n) * 180) / Math.PI;
  if (deg < 0) deg += 360;
  return deg;
};

/**
 * Presence mix in OKLCH: average L, C, and circular-mean H.
 * Returns an `oklch(...)` CSS color string (valid in SVG fills).
 */
export const blendOklch = (colors: string[]): string => {
  if (colors.length === 0) return "oklch(0% 0 0)";
  if (colors.length === 1) return formatOklch(parseOklch(colors[0]!));

  const parts = colors.map(parseOklch);
  const n = parts.length;
  const l = parts.reduce((s, p) => s + p.l, 0) / n;
  const c = parts.reduce((s, p) => s + p.c, 0) / n;
  const h = circularMeanHue(parts.map((p) => p.h));
  return formatOklch({ l, c, h });
};

/** @deprecated Alias — blends in OKLCH and returns `oklch(...)`. */
export const blendHex = blendOklch;

const GITLAB_BRAND_HEX = "#fc6D26";
const WAKATIME_BRAND_HEX = "#f1e05a";

/** Source hues (degrees) for bitmask blending. */
export const SOURCE_HUES = {
  github: GH_ACTIVE.h,
  gitlab: hueOf(GITLAB_BRAND_HEX),
  wakatime: hueOf(WAKATIME_BRAND_HEX),
} as const;

export type SourceColorKey = keyof typeof SOURCE_HUES;

export const SOURCE_BIT_TO_KEY: Record<number, SourceColorKey> = {
  1: "github",
  2: "gitlab",
  4: "wakatime",
};

export const hueForSources = (sources: number): number => {
  const hues: number[] = [];
  for (const [bit, key] of Object.entries(SOURCE_BIT_TO_KEY)) {
    if (sources & Number(bit)) hues.push(SOURCE_HUES[key]);
  }
  return hues.length ? circularMeanHue(hues) : GH_LADDER[0]!.h;
};

export const oklchForCell = (sources: number, level: number): Oklch => {
  const lv = Math.max(0, Math.min(4, Math.round(level))) as 0 | 1 | 2 | 3 | 4;
  const step = GH_LADDER[lv]!;
  if (lv === 0 || sources === 0) return { ...GH_LADDER[0]! };
  return withHue(step, hueForSources(sources));
};

/** Fill color for a multi-source intensity cell. */
export const colorForCell = (sources: number, level: number): string =>
  formatOklch(oklchForCell(sources, level));

/** 1px stroke: same H/C, slightly darker L. */
export const strokeForCell = (sources: number, level: number): string => {
  const fill = oklchForCell(sources, level);
  return formatOklch({
    ...fill,
    l: Math.max(0, fill.l - STROKE_L_DELTA),
  });
};

/** Full-intensity swatches for the source legend. */
export const SOURCE_COLORS = {
  github: colorForCell(1, 4),
  gitlab: colorForCell(2, 4),
  wakatime: colorForCell(4, 4),
} as const;

/** Fixed legend order: WakaTime between GitHub and GitLab. */
export const SOURCE_LEGEND_ORDER: readonly SourceColorKey[] = [
  "github",
  "wakatime",
  "gitlab",
];

export const SOURCE_LABELS: Record<SourceColorKey, string> = {
  github: "GitHub",
  gitlab: "GitLab",
  wakatime: "WakaTime",
};

/** Intensity legend swatches (GitHub hue ladder, levels 0–4). */
export const INTENSITY_LEGEND_COLORS = GH_LADDER.map((_, i) =>
  colorForCell(1, i),
);

/**
 * Stack / solver palette: empty + intensity 1–4 at GitHub hue
 * (pathfinding uses intensity only).
 */
export const buildIntensityColorDots = (empty: string): string[] => [
  empty,
  colorForCell(1, 1),
  colorForCell(1, 2),
  colorForCell(1, 3),
  colorForCell(1, 4),
];

/** @deprecated Prefer colorForCell; kept for callers expecting 8 bitmask slots. */
export const buildSourcesColorDots = (
  empty: string,
  _brands?: Partial<Record<SourceColorKey, string>>,
): string[] => buildIntensityColorDots(empty);

const sourcesLightDots = buildIntensityColorDots(EMPTY_LIGHT);
const sourcesDarkDots = buildIntensityColorDots(EMPTY_DARK);

export const basePalettes = {
  "github-light": {
    colorBackground: "#ffffff",
    colorDotBorder: "#1b1f230a",
    colorDots: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    colorEmpty: "#ebedf0",
    colorSnake: "purple",
  },
  "github-dark": {
    colorBackground: "#0c1116",
    colorDotBorder: "#1b1f230a",
    colorEmpty: "#161b22",
    colorDots: ["#161b22", "#01311f", "#034525", "#0f6d31", "#00c647"],
    colorSnake: "purple",
  },
  "forgejo-light": {
    colorBackground: "#ffffff",
    colorDotBorder: "#00000010",
    colorEmpty: "#d4d4d8",
    colorDots: ["#d4d4d8", "#fdba74", "#f97316", "#c2410c", "#7c2d12"],
    colorSnake: "#7c2d12",
  },
  "forgejo-dark": {
    colorBackground: "#1f2937",
    colorDotBorder: "#ffffff10",
    colorEmpty: "#2b3642",
    colorDots: ["#2b3642", "#9a3412", "#ea580c", "#fb923c", "#fed7aa"],
    colorSnake: "#fed7aa",
  },
  "codeberg-light": {
    colorBackground: "#ffffff",
    colorDotBorder: "#00000010",
    colorEmpty: "#d0d7de",
    colorDots: ["#d0d7de", "#8db5dc", "#679cd0", "#4183c4", "#254f77"],
    colorSnake: "#254f77",
  },
  "codeberg-dark": {
    colorBackground: "#161b22",
    colorDotBorder: "#ffffff10",
    colorEmpty: "#3b444a",
    colorDots: ["#3b444a", "#254f77", "#31699f", "#4183c4", "#8db5dc"],
    colorSnake: "#8db5dc",
  },
  "gitlab-light": {
    colorBackground: "#ffffff",
    colorDotBorder: "#00000010",
    colorEmpty: "#edebe6",
    colorDots: ["#edebe6", "#9dc7f1", "#428fdc", "#2f68b4", "#284779"],
    colorSnake: "#284779",
  },
  "gitlab-dark": {
    colorBackground: "#1f1e24",
    colorDotBorder: "#ffffff10",
    colorEmpty: "#2a2a36",
    colorDots: ["#2a2a36", "#284779", "#2f68b4", "#428fdc", "#9dc7f1"],
    colorSnake: "#9dc7f1",
  },
  "sources-light": {
    colorBackground: "#ffffff",
    colorDotBorder: strokeForCell(0, 0),
    colorEmpty: EMPTY_LIGHT,
    colorDots: sourcesLightDots,
    colorSnake: "#6e40c9",
  },
  "sources-dark": {
    colorBackground: "#0c1116",
    colorDotBorder: strokeForCell(0, 0),
    colorEmpty: EMPTY_DARK,
    colorDots: sourcesDarkDots,
    colorSnake: "#a371f7",
  },
};

// aliases
export const palettes = {
  ...basePalettes,

  // aliases
  github: basePalettes["github-light"],
  forgejo: basePalettes["forgejo-light"],
  codeberg: basePalettes["codeberg-light"],
  gitlab: basePalettes["gitlab-light"],
  sources: basePalettes["sources-light"],
  default: basePalettes["github-light"],
};
