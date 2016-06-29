/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */
'use strict';
var webpack = require('webpack');
var Path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry:{
        bundle :[
            Path.resolve(__dirname, 'src/index.js')
        ]
    },
    output: {
        path: Path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: require('./config.js').publicPath
    },
    debug: false,
    devtool: false,
    stats: {
        colors: true,
        reasons: false,
        progress: true
    },
    // require without Filename Extension
    resolve: {
        extensions: ['', '.js', '.jsx'],
        /**
         * if you require something in library module, you can alias it
         * and require without path
         */
        // alias: {
        //      'angular': 'angular/angular',
        //      'lodash': 'lodash/dist/lodash'
        // },
    },
    module: {
        loaders: [
        {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            noParse: "/node_modules/",
            include: Path.join(__dirname, 'src/')
        },
        {
            test: /\.sass$/, loader: "style!css!sass"
        },
        {
            test: /\.css$/,
            loader:  ExtractTextPlugin.extract("style-loader","css-loader")
            //loader: 'style-loader!css-loader'
        },
        {
            test: /\.styl$/,
            loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader'
        },
        {
            test: /\.json$/,
            loader: 'json'
        },
        {
            test: /\.(ttf|eot|png|gif|jpg|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=8192"
        },
        {
            test: /\.(html|png)$/,
            loader: "file?name=[path][name].[ext]&context=./src"
        }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false,
            },
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            inject: 'body'
        })
    ],
};
