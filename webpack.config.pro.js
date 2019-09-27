const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const clearWebpackPlugin = require('clean-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require("webpack")
const merge = require('webpack-merge')
// const webpack=require('webpack')
const pwd = process.cwd();
const baseUrl=path.resolve(__dirname);
const outdist = 'outdist1'
const baseConfig=require('./webpack.base');
let proConfig={
    mode:'production',
    module:{
        // rules:[
        //     {
        //         test: /\.(png|svg|jpg|gif)$/,
        //         use: [{
        //             "loader":'file-loader',
        //             options:{
        //                 name:"[name].[ext]",
        //                 outputPath:'',
        //                 publicPath:''
        //             }
        //         }]
        //     },
        // ]
    },
	// output: {
    //     filename: '[name]_main_[hash].js',
    //     path: path.resolve(baseUrl,'dist'),
    //     chunkFilename: '[name]_chunk_[chunkhash].js',
    // },
	plugins: [
		// new clearWebpackPlugin(['dist'],{root: baseUrl}),
		new htmlWebpackPlugin({
            filename: path.join(baseUrl,'index.html'),
            template: path.join(baseUrl,'src/index.html'),
            inject: 'body',
            chunks:['app']
        }),//html生成
        new webpack.DefinePlugin( {
            "__OUTDIST__":JSON.stringify('/outdist')
        } )
	],
};

module.exports = merge(baseConfig,proConfig);