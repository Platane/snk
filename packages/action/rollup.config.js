import esbuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import sizes from "rollup-plugin-sizes";

export default {
  plugins: [
    sizes(),
    resolve({
      moduleDirectories: ["../../node_modules"],
      extensions: [".mjs", ".js", ".json", ".ts"],
      preferBuiltins: true,
    }),
    json(),
    commonjs(),
    esbuild({
      target: "esnext",
      define: {
        "process.env.SNK_DISABLE_SVG": !!process.env.SNK_DISABLE_SVG,
        "process.env.SNK_DISABLE_GIF": !!process.env.SNK_DISABLE_GIF,
      },
    }),
  ],
  preserveEntrySignatures: false,
  input: "index.ts",
  external: ["fs", "path", "canvas", "gifsicle"],
  output: {
    dir: "dist",
    format: "cjs",
  },
};
