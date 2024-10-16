const path = require("path");
const dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    static: "./public",
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  plugins: [new dotenv()],
};
