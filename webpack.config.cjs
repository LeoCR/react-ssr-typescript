const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      filename: "./index.html",
      template: "./public/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["src", "node_modules"],
  },
};

const client = Object.assign({}, config, {
  name: "client",
  target: "web",
  entry: path.resolve(__dirname, "src/client/index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
});

const server = Object.assign({}, config, {
  name: "server",
  target: "node",
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, "src/server/index.tsx"),
  output: {
    filename: "server.cjs",
    path: path.resolve(__dirname, "private/build"),
  },
});

module.exports = [client, server];
