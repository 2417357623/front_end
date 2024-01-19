const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/main.jsx',
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
    filename: `[name]_[contenthash:8].css`,
  })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
          loader: 'babel-loader',
            options: { presets: ['@babel/env'] }
          },
          {
            loader:path.resolve('./src/loader.js')
          }
        ],

      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'style-loader','css-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 9000
  },
  devtool: 'eval-source-map',

}
