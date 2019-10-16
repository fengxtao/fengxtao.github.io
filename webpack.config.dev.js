const path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin')
var baseUrl=process.cwd();
var webpack=require('webpack')

const merge = require('webpack-merge')
const baseConfig=require('./webpack.base');

const net_init=require('./proxy/net_init')



let devConfig={
  mode:'development',
  module:{
    rules:[
   
    ]
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),//代码模块热替换
    new htmlWebpackPlugin({
      filename: path.join(baseUrl,'outdist/index.html'),
      template: path.join(baseUrl,'src/index.html'),
      inject: 'body',
      chunks:['app']
  }),//html生成
  ],
  devtool: 'inline-source-map',//开发助手
  devServer: {
		contentBase: baseUrl+'/outdist',
		hot: true,
		inline: true,
		port: 3000,
		host: '127.0.0.1',
		// Required for webpack-dev-server.
		// outputPath: path.resolve(__dirname, 'dist'),
    disableHostCheck: true,
    // proxy: {
    //   '/post': {
    //     // target: 'http://localhost:2000',
    //     bypass: function(req, res, proxyOptions) {
    //       // net_init(req,res);
    //       setTimeout(function(){
    //         res.end(s)
    //       },100)
          
    //     }
    //   }
    // }
  },
}

module.exports = merge(baseConfig,devConfig)
