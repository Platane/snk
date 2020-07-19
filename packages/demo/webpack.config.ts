import * as path from "path";

// @ts-ignore
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration } from "webpack";

const basePathname = (process.env.BASE_PATHNAME || "")
  .split("/")
  .filter(Boolean);

const config: Configuration = {
  mode: "development",
  entry: "./index",
  resolve: { extensions: [".ts", ".js"] },
  output: {
    path: path.join(__dirname, "dist", "demo"),
    filename: "[contenthash].js",
    publicPath: "/" + basePathname.map((x) => x + "/").join(""),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|ts)$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    // game
    new HtmlWebpackPlugin({
      title: "demo",
      filename: "index.html",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
    }),
  ],

  devtool: false,
  stats: "errors-only",

  // @ts-ignore
  devServer: {},
};

export default config;
