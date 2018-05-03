const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  context: resolve(__dirname, 'src/client'),
  entry: './index.jsx',
  output: {
    path: resolve(__dirname, 'app/public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: join(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[local]--[hash:base64:8]',
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'HipstoChat',
      filename: 'index.html',
      template: 'templates/index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    contentBase: join(__dirname, 'app'),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true
  },

};