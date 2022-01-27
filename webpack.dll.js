const { resolve } = require('path')
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    output: {
        path: resolve(__dirname, 'dll'),
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        vendor: ["cesium"],
    },
    plugins: [
        new webpack.DllPlugin({
            path: resolve(__dirname, 'dll/manifest.json'),
            name: '[name]'
        }),
    ],
}