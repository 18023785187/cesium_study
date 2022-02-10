const { resolve } = require('path')
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    output: {
        path: resolve('./', 'dll'),
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        vendor: ["cesium"],
    },
    plugins: [
        new webpack.DllPlugin({
            path: resolve('./', 'dll/manifest.json'),
            name: '[name]'
        }),
    ],
}