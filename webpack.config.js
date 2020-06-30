const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");

const ENTRY_POINT=path.join(__dirname, "src/components/index.tsx");

module.exports={
  mode: "development",
  entry: ENTRY_POINT,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.jsx",
    publicPath: "",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|jpe?g|gif)$/,
        loader: "url-loader?limit=8000&name=images/[name].[ext]",
        exclude: /(node_module)/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss", ".css"],
  },
  devServer: {
    port: 9000
  }
};
