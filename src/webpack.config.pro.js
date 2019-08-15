const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const clearWebpackPlugin = require('clean-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const merge = require('webpack-merge')
// const webpack=require('webpack')

const baseUrl=path.resolve(__dirname);

const baseConfig=require('./webpack.base');
let proConfig={
	mode:'production',
	output: {
        filename: '[name]_main_[hash].js',
        path: path.resolve(baseUrl, '../'),
        chunkFilename: '[name]_chunk_[chunkhash].js',
    },
	plugins: [
		new clearWebpackPlugin(['dist'],{root: baseUrl}),
		new htmlWebpackPlugin({
            filename: path.join(baseUrl,"../",'index1.html'),
            template: path.join(baseUrl,'index.html'),
            inject: 'body',
            chunks:['app']
        }),//html生成
	],
};

module.exports = merge(baseConfig,proConfig);