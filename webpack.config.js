'use strict';

var webpack = require('webpack');
var path = require('path');
var project = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve('./src'),
    entry: {
        jquery: 'jquery',
        main: path.join(__dirname, 'src', 'js', 'main.js'),
        popup: path.join(__dirname, 'src', 'js', 'popup.js')
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|ico)$/,
                loader: 'file-loader?name=[path][name].[ext]',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: 'css-loader'
                })
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/
            },
            { 
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "null-loader" },
			{ test: /\.(woff|woff2)$/, loader: "null-loader" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "null-loader" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "null-loader" }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new ExtractTextPlugin("css/style.css"),
        new CopyWebpackPlugin([{
            from: 'manifest.json',
            transform: function(content, path) {
                return Buffer.from(JSON.stringify({
                    description: project.description,
                    version: project.version,
                    ...JSON.parse(content.toString())
                }))
            }
        }]),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "html", "popup.html"),
            filename: "html/popup.html",
            chunks: ["popup"]
        }),
    ]
}