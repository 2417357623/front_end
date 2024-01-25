const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = {
    entry: './src/main.jsx',
    mode: 'development',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[hash].css',
        }),
        // 創建實例 (第二步)
        new HtmlWebpackPlugin({
            // 配置 HTML 模板路徑與生成名稱 (第三步)
            template: './public/index.html',
            filename: 'index.html',
        }),
        // new DefinePlugin({
        //     // 定义 NODE_ENV 环境变量为 production
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production'),
        //     },
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: ['@babel/env'] },
                    },
                    {
                        loader: path.resolve('./src/loader.js'),
                    },
                ],

            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.*'],

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].[hash].js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        hot: true,
    },
    devtool: 'inline-source-map',

};
