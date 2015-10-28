var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'build',
    filename: 'mslider.min.js'
  },
  externals: {
    'jquery': 'jQuery'
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   minimize: true
    // })
  ]
};
