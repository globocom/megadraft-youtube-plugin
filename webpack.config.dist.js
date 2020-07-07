/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

module.exports = {
  entry: [
    "./src/plugin.js"
  ],
  output: {
    path: "./dist",
    publicPath: "/dist/",
    filename: "youtube.js",
    library: "youtube",
    libraryTarget: "umd"
  },
  externals: {
    "megadraft": "megadraft",
    "react": "react",
    "react-dom": "react-dom"
  },
  devtool: "source-map",
  devServer: {
    inline: true,
    contentBase: "./"
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  }
};
