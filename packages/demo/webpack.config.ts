import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

const demos: string[] = require("./demo.json");

const webpackDevServerConfiguration: WebpackDevServerConfiguration = {
  open: true,
  openPage: demos[1] + ".html",
};

const webpackConfiguration: WebpackConfiguration = {
  mode: "development",
  entry: Object.fromEntries(
    demos.map((demo: string) => [demo, `./demo.${demo}`])
  ),
  target: ["web", "es2019"],
  resolve: { extensions: [".ts", ".js"] },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[contenthash].js",
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
            target: "es2019",
          },
        },
      },
    ],
  },
  plugins: [
    ...demos.map(
      (demo) =>
        new HtmlWebpackPlugin({
          title: "snk - " + demo,
          filename: `${demo}.html`,
          chunks: [demo],
        })
    ),
    new HtmlWebpackPlugin({
      title: "snk - " + demos[0],
      filename: `index.html`,
      chunks: [demos[0]],
    }),
  ],

  devtool: false,
};

export default {
  ...webpackConfiguration,
  devServer: webpackDevServerConfiguration,
};
