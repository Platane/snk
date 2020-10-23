import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

import type { Configuration } from "webpack";

const basePathname = (process.env.BASE_PATHNAME || "")
  .split("/")
  .filter(Boolean);

const demos: string[] = require("./demo.json");

const config: Configuration = {
  mode: "development",
  entry: Object.fromEntries(
    demos.map((demo: string) => [demo, `./demo.${demo}`])
  ),
  resolve: { extensions: [".ts", ".js"] },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[contenthash].js",
    publicPath: "/" + basePathname.map((x) => x + "/").join(""),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          compilerOptions: {
            lib: ["dom", "es2020"],
            target: "es5",
          },
        },
      },
    ],
  },
  plugins: [
    ...demos.map(
      (demo) =>
        new HtmlWebpackPlugin({
          filename: `${demo}.html`,
          chunks: [demo],
        })
    ),
  ],

  devtool: false,
  stats: "errors-only",
};

export default config;
