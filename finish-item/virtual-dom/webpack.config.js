const {resolve}  = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry:"./main.js",
    mode:"development",
    output:{
        path: resolve(__dirname,"dist"),
        filename:"main.js"
    },
    devtool:"source-map",
    resolveLoader:{
        modules:['node_modules', resolve(__dirname, './')]
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
}
