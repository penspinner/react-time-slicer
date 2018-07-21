const { resolve } = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin([resolve(__dirname, 'dist')])],
};
