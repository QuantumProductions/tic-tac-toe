var LessPluginCleanCSS = require('less-plugin-clean-css');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: './entry.js',
  output: {
    path: '.static/',
    filename: 'ttt.js',
    publicPath: '/.static/',
  },
  //resolve: {
  //  riot: require.resolve('./node_modules/riot/riot.js')
  //},
  module: {
    loaders: [
      //{ test: /\.(tag)$/, loader: "tag" },
      { test: /\.(png|woff|ttf|svg|eot|jpg)$/, loader: "file?name=[name].[hash:8].[ext]" },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, loader: "babel-loader" },
      { test: /\.less$/, loader: ExtractTextPlugin.extract("css?minimize!less?config=lessLoaderCustom") }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ],
  lessLoader: {
    lessPlugins: [
      new LessPluginCleanCSS({advanced: true})
    ]
  }
}
