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
    colorDots: ["#ebedf0", "#B6E3FF", "#54AEFF", "#0969DA", "#0A3069"],
    colorEmpty: "#ebedf0",
    colorSnake: "purple",
  },
  "github-dark": {
    colorDotBorder: "#1b1f230a",
    colorEmpty: "#161b22",
    colorDots: ["#161b22", "#0A3069", "#0969DA", "#54AEFF", "#B6E3FF"],
    colorSnake: "purple",
  },
};

// aliases
palettes["github"] = {
  ...palettes["github-light"],
  dark: { ...palettes["github-dark"] },
};
palettes["default"] = palettes["github"];
