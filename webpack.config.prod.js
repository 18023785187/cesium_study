const { merge } = require('webpack-merge');
const webpack = require('webpack')
const commonConfig = require('./webpack.config.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(commonConfig, {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            //对输出的css进行重命名
            filename: 'css/cesium_study.css'
        })
    ]
})