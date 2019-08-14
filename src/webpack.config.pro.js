const path = require('path');
// const htmlWebpackPlugin = require('html-webpack-plugin')
const clearWebpackPlugin = require('clean-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const merge = require('webpack-merge')
// const webpack=require('webpack')

const baseUrl=path.resolve(__dirname);

const baseConfig=require('./webpack.base');
let proConfig={
	//  optimization:{
	// 	splitChunks:{
	// 		chunks: "async",
	// 		minSize: 30000,
	// 		minChunks: 1,
	// 		maxAsyncRequests: 5,
	// 		maxInitialRequests: 3,
	// 		name: true,
	// 		cacheGroups: {
	// 				default: {
	// 						minChunks: 2,
	// 						priority: -20,
	// 						reuseExistingChunk: true,
	// 				},
	// 				vendors: {
	// 						test: /[\\/]node_modules[\\/]/,
	// 						priority: -10
	// 				}
	// 		}
	// 	},
	// 	runtimeChunk: {
	// 		name: 'manifest'
	// 	}
	//  }
	// ,	
	mode:'production',
	plugins: [
		new clearWebpackPlugin(['dist'],{root: baseUrl}),
		// new htmlWebpackPlugin({
		// 	filename: path.join(baseUrl,"dist",'index-[hash].html'),
		// 	template: path.join(baseUrl,'index.html'),
		// 	inject: 'body',
		// 	chunks:['app']
		// }),
	],
};

module.exports = merge(baseConfig,proConfig);