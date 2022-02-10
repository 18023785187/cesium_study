const { resolve } = require('path')
const { merge } = require('webpack-merge');
const commonConfig = require('./merge');

module.exports = merge(commonConfig, {
    mode: "development",
    devtool: "source-map",
    devServer: {
        compress: true,
        port: 8001,
        open: true
    }
})
