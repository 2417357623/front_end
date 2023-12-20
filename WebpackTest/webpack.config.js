const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // JavaScript 执行入口文件
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    // devtool: 'inline-source-map',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: '[name].bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
        clean: true,
    },
    devServer: {
        port: '8081', // 设置端口号为8088
        hot: true, // 文件修改后实时刷新
        historyApiFallback: true, //不跳转
        static: './dist'
    },
    mode:"development",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
    },
};