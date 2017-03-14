/**
 * Created by tuomas on 6.3.2017.
 */

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: "/dist/"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: [
          'es2015',
          'react'
        ]
      }
    },
    {
        test: /\.(css|scss)$/,
        loader: 'style-loader!css-loader!sass-loader'
    },
    {
        test: /\.(jpg|png)$/,
        loader: 'url-loader'
    },
    {
      test: /\.html$/,
      loader: 'raw-loader'
    }
    ]
  }
};