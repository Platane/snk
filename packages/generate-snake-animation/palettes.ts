export const SOURCE_COLORS = {
  github: "#40c463",
  gitlab: "#fc6D26",
  wakatime: "#292FBB",
} as const;

export type SourceColorKey = keyof typeof SOURCE_COLORS;

export const SOURCE_LABELS: Record<SourceColorKey, string> = {
  github: "GitHub",
  gitlab: "GitLab",
  wakatime: "WakaTime",
};

/** Average RGB of hex colors (presence mix). */
export const blendHex = (colors: string[]): string => {
  if (colors.length === 0) return "#000000";
  if (colors.length === 1) return colors[0]!.toLowerCase();

  let r = 0;
  let g = 0;
  let b = 0;

  for (const hex of colors) {
    const h = hex.replace("#", "");
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    r += parseInt(full.slice(0, 2), 16);
    g += parseInt(full.slice(2, 4), 16);
    b += parseInt(full.slice(4, 6), 16);
  }

  const n = colors.length;
  const toHex = (v: number) =>
    Math.round(v / n)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Build colorDots[0..7] for bitmask cells:
 * 0 empty, 1 GH, 2 GL, 3 GH+GL, 4 WT, 5 GH+WT, 6 GL+WT, 7 all
 */
export const buildSourcesColorDots = (
  empty: string,
  brands: Partial<Record<SourceColorKey, string>> = SOURCE_COLORS,
): string[] => {
  const gh = brands.github ?? SOURCE_COLORS.github;
  const gl = brands.gitlab ?? SOURCE_COLORS.gitlab;
  const wt = brands.wakatime ?? SOURCE_COLORS.wakatime;

  return [
    empty, // 0
    gh, // 1 GitHub
    gl, // 2 GitLab
    blendHex([gh, gl]), // 3
    wt, // 4 WakaTime
    blendHex([gh, wt]), // 5
    blendHex([gl, wt]), // 6
    blendHex([gh, gl, wt]), // 7
  ];
};

const sourcesLightDots = buildSourcesColorDots("#ebedf0");
const sourcesDarkDots = buildSourcesColorDots("#161b22");

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
    colorDotBorder: "#1b1f230a",
    colorEmpty: "#ebedf0",
    colorDots: sourcesLightDots,
    colorSnake: "#6e40c9",
  },
  "sources-dark": {
    colorBackground: "#0c1116",
    colorDotBorder: "#1b1f230a",
    colorEmpty: "#161b22",
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
