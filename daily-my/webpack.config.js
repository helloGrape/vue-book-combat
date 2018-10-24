const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const config = {
  entry: {
    main: './main'
  },
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader:"vue-loader",
        options:{
          loaders:{
            css: [
              'vue-style-loader',
              'mini-css-extract-plugin',
              'css-loader'
            ]
          }
        }
      },
      // 除非您要自定义 entry point(入口点) ，否则无需指定babel-loader。
      /*{
        test: /\.js$/,
        loader:"babel-loader",
        exclude: /node_modules/
      },*/
      {
        test: /\.css$/,
        use: [//数组形式的话，编译是从后往前。
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
        /*use: ExtractTextPlugin.extract({ //数组形式的话，编译是从后往前。
          use: 'css-loader',
          fallback: 'style-loader'
        })*/
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader:"url-loader?limit=1024"//文件小于1k就以base64形式加载
      }
    ]
  },
  plugins: [
    /*new ExtractTextPlugin({
      filename:'main.css',//重命名提取后的css文件
      allChunks: true
    })*/
    new MiniCssExtractPlugin('main.css'),
    new VueLoaderPlugin()
  ]
};

module.exports = config;
//export default config;