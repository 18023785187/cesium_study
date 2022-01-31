const { resolve, join } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const WebpackBar = require('webpackbar');

// cseium配置 1.创建路径
const cesiumSource = './node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'

module.exports = {
    entry: './src/index.ts',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'cesium_study.js'
    },
    amd: {
        toUrlUndefined: true
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    //图片小于8kb，就会被base64处理
                    //优点：减小请求数量
                    //缺点：图片体积会更大
                    limit: 8 * 1024,
                    /*url-loader默认使用es6模块化解析，而html-loader引入图片是使用common.js，
                      解析时会出现问题:[object Module]
                      解决方案：关闭url-loader的es6模块化，使用common.js
                    */
                    esModule: false,
                    //给图片进行重命名 [hash:10]取哈希值前10位，[ext]取原来的扩展名
                    // name: '[hash:10].[ext]',
                    //打包到build文件夹下面的images文件夹内
                    outputPath: 'images'
                }
            },
            {
                test: /\.html$/,
                //处理html文件的img图片(负责引入img，从而能被url-loader处理)
                loader: 'html-loader',
                options: {
                    esModule: false,
                }
            },
            //打包其他资源（除了html，css，js）
            {
                //排除html,css,js文件
                exclude: /\.(html|css|js|ts|json|jpg|png|gif)$/,
                loader: 'file-loader'
            },
            {
                //ts文件使用了babel，ts-loader
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                                        },
                                        'corejs': '3',
                                        'useBuiltIns': 'usage'
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                pulgins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    }
                ]
            }
        ],
        unknownContextCritical: false
    },
    plugins: [
        new WebpackBar(),
        // cseium配置 2.把cesium库中的以下目录拷贝出来
        new CopyWebpackPlugin({
            patterns: [{ from: join(cesiumSource, cesiumWorkers), to: 'Workers' }]
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: join(cesiumSource, 'Assets'), to: 'Assets' }]
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: join(cesiumSource, 'Widgets'), to: 'Widgets' }]
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' }]
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: join(cesiumSource, 'Core'), to: 'Core' }]
        }),
        // cseium配置 3. 配置CESIUM_BASE_URL路径
        new webpack.DefinePlugin({
            CESIUM_BASE_URL: JSON.stringify('')
        }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'public/index.html'),
            collapseWhitespace: true,
            removeComments: true,
            inject: 'body'
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dll/manifest.json'),
        }),
        //将某个文件打包出去，并在html中自动引入
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/vendor.js'),
            outputPath: 'dll',
            publicPath: 'dll',
            includeSourcemap: false
        }),
        new CssMinimizerWebpackPlugin()
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            'test': '@/test',
            'assets': '@/assets',
            'utils': '@/utils',
            'constants': '@/constants',
            'cases': '@/cases',
            'cesium': resolve(__dirname, 'node_modules/cesium')
        },
        extensions: ['.ts', '.js', '.json'],
    },
    optimization: {
        // 表示只导出那些外部使用了的那些成员
        usedExports: true,
        // 压缩模块
        // minimize: true,
        // 合并模块
        // concatenateModules: true
    },
}