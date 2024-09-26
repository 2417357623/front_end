const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')

module.exports = {
    entry:"./src/index.js",
    mode:"development",
    output:{
        path:resolve(__dirname,'dist'),
        filename:'index.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve(__dirname, 'public/index.html')
        })
    ],
    devServer:{
        hot:true
    },
    devtool:"source-map"
}