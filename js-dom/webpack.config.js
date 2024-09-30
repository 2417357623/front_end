const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
    mode:"development",
    entry:"./src/main.js",
    output:{
        path: resolve(__dirname, 'dist'),
        filename:"main.js"
    },
    resolve:{
        extensions:['.ts','.js','.vue','.json']
    },
    resolveLoader:{
        modules:['node_modules', resolve(__dirname, './modules')]
    },
    module:{
        rules:[
            {
                test:/.vue$/i,
                loader:"vue-loader"
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'public/index.html')
        })
    ],
    devServer:{
        hot:true
    },
    devtool:"source-map"
}