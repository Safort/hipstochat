const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        test: /\.(tsx?)|(jsx?)$/,
        use: [
          { loader: 'babel-loader' }
        ],
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
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
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
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  devServer: {
    contentBase: join(__dirname, 'src'),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
  },

};
