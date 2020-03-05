const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.(s*)css$/,
      use: [
        miniCss.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              autoprefixer({
                overrideBrowserslist: ['last 2 version']
              }),
            ],
            sourceMap: true
          }
        },
        'sass-loader',
      ],
    },
    {
      test: /\.(jpg|png|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'images',
        esModule: false
      },
    },
    {
      test: /\.html$/,
      use: ['html-loader']
    },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'settings.html',
      template: './src/settings.html'
    }),
    new miniCss({
      filename: 'style.css',
    }),
  ],
  devServer: {
    port: 8080,
    contentBase: './src',
    watchContentBase: true
  }
};