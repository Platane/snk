import { DrawOptions as DrawOptions } from "@snk/svg-creator";

export const palettes: Record<
  string,
  Pick<
    DrawOptions,
    "colorDotBorder" | "colorEmpty" | "colorSnake" | "colorDots" | "dark"
  >
> = {
  "github-light": {
    colorDotBorder: "#1b1f230a",
    colorDots: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    colorEmpty: "#ebedf0",
    colorSnake: "purple",
  },
  "github-dark": {
    colorDotBorder: "#1b1f230a",
    colorEmpty: "#161b22",
    colorDots: ["#161b22", "#01311f", "#034525", "#0f6d31", "#00c647"],
    colorSnake: "purple",
  },
};

// aliases
palettes["github"] = {
  ...palettes["github-light"],
  dark: { ...palettes["github-dark"] },
};
palettes["default"] = palettes["github"];
