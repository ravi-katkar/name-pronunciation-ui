const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //entry: path.join(__dirname, "src", "index.js"),
  mode: 'development',
  entry: {
    index: path.join(__dirname, "src", "index.js")
  },
  output: {
    path:path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.?js$|\.jsx$|\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  },
}