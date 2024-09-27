const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports={
    mode:"development",
    entry:"./src/main.js",
    output:{
        path: resolve(__dirname,'.dist'),
        filename:"main.js"
    },
    resolve:{
        extensions:['.ts','.js','.vue']
    },
    module:{
        rules:[]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'public/index.html')
        })
    ],
    devServer:{
        hot:true
    }

}