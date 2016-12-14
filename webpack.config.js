const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

let entry;

if (isDev) {
  entry = [
    'webpack-dev-server/client?http://localhost:3000/',
    'webpack/hot/dev-server',
    './js/index'
  ];
} else {
  entry = './js/index';
}

const output = {
  path: path.resolve(__dirname, 'app/public'),
  publicPath: '/',
  filename: 'bundle.js',
  libraryTarget: 'umd',
};

const plugins = [
  new webpack.NoErrorsPlugin(),
  new HtmlWebpackPlugin({
    title: 'Title',
    filename: 'index.html',
    template: 'templates/index.html',
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  }),
  new ExtractTextPlugin('style.css', { allChunks: true }),
];

if (isDev) {
  plugins.unshift(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    })
  );
}


module.exports = {
  context: path.join(__dirname, '/src/frontend'),
  entry,
  output,
  watch: isDev,
  devtool: isDev ? 'source-map' : null,
  plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test:   /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        ),
      },
    ],
  },

  postcss() {
    return [precss, autoprefixer];
  },

  devServer: {
    host: 'localhost',
    port: 3000,
    contentBase: './app/public',
    historyApiFallback: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
};
