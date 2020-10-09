require('dotenv').config();
const path = require('path');
const HtmlWPPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Stylish = require('webpack-stylish');
const webpack = require('webpack');
const Env = require('dotenv-webpack');
const Brotli = require('brotli-webpack-plugin');

console.log(process.env.NODE_ENV)

const HtmlPlugin = new HtmlWPPlugin({
  template: './public/index.html',
  filename: './index.html',
});

const CssPlugin = new MiniCssExtractPlugin({
  filename: 'css/[name].css',
  chunkFilename: 'css/[id].css',
});
const Named = new webpack.NamedChunksPlugin();
const Style = new Stylish();
const DotEnv = new Env();

const BrotliPlugin = !!(process.env.NODE_ENV !== 'development')
  ? new Brotli({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    })
  : new webpack.EnvironmentPlugin();

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    app: './src/index.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, './'),
    publicPath: '/',
    hot: true,
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: MiniCssExtractPlugin.loader,
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },

  plugins: [HtmlPlugin, CssPlugin, Named, Style, DotEnv, BrotliPlugin],
};
