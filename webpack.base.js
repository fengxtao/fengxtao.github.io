
const path = require('path');
const fs = require ('fs')
const webpack = require("webpack")
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseUrl=path.resolve(__dirname);

module.exports={
    entry: {
        app:'./src/index.tsx'
    },
    output: {
        filename: '[name]_main_[hash].js',
        path: path.resolve(__dirname),
        chunkFilename: '[name]_chunk_[chunkhash].js',
    },
    module: {
        rules: [
            {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
            },
            // 第三方的 soucemap 加载
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, use:["source-map-loader"]  },
            //  { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    plugins:[
        new ExtractTextPlugin('[name].style.[hash].css'),
        new htmlWebpackPlugin({
            filename: path.join(baseUrl,'index.html'),
            template: path.join(baseUrl,'src/index.html'),
            inject: 'body',
            chunks:['app']
        }),//html生成
        new webpack.DefinePlugin( {
            // "__TITLE__":JSON.stringify(titles)
        } )
    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
}