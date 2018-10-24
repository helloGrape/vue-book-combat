const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config');
const {VueLoaderPlugin} = require('vue-loader');

webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: '/dist/',
    filename: '[name].[hash].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    // 定义当前node环境为生成环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      filename: '../index_prod.html',
      template: './index.ejs',
      inject: false
    }),
    new VueLoaderPlugin()
  ]
})