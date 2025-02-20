import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { getGithubUserContribution } from "@snk/github-user-contribution";
import type { Configuration as WebpackConfiguration } from "webpack";
import {
  ExpressRequestHandler,
  type Configuration as WebpackDevServerConfiguration,
} from "webpack-dev-server";

const demos: string[] = require("./demo.json");

const webpackDevServerConfiguration: WebpackDevServerConfiguration = {
  open: { target: demos[1] + ".html" },
  setupMiddlewares: (ms) => [
    ...ms,
    (async (req, res, next) => {
      const userName = req.url.match(
        /\/api\/github-user-contribution\/(\w+)/
      )?.[1];
      if (userName)
        res.send(
          await getGithubUserContribution(userName, {
            githubToken: process.env.GITHUB_TOKEN!,
          })
        );
      else next();
    }) as ExpressRequestHandler,
  ],
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
    new webpack.EnvironmentPlugin({
      GITHUB_USER_CONTRIBUTION_API_ENDPOINT:
        process.env.GITHUB_USER_CONTRIBUTION_API_ENDPOINT ??
        "/api/github-user-contribution/",
    }),
  ],

  devtool: false,
};

export default {
  ...webpackConfiguration,
  devServer: webpackDevServerConfiguration,
};
