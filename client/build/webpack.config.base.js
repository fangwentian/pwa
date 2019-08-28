const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const _ = require('./utils');
const webpack = require('webpack');
const path = require('path');
const buildConfig = require('./build.config');

const {
    MODE = 'development',
} = process.env;

const mode = MODE || 'development';

const isDev = mode === 'development';

module.exports = {
    output: {
        // vue开头的prefix区别于regularjs工程的资源
        publicPath: mode == 'development' ? buildConfig.devAssertPublicPath : '/',
        path: buildConfig.output
    },
    entry: {
        index: [
            './src/index.js'
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': _.resolve('./src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                exclude: /bower_components|node_modules\/(?!element-ui\/(packages|src))|utils\/popper\.js|utils\/date\.js/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: [
                            isDev ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader, 
                            { loader: 'css-loader' }, 
                            { loader: 'less-loader' },
                            { 
                                loader: 'sass-resources-loader',
                                options: {
                                    resources: path.join(__dirname, '../src/style/var.less')
                                }
                            }
                        ],
                        js: [{ loader: 'babel-loader' }]
                    }
                }
            },
            {
                test: /\.css$/, 
                use: [
                    isDev ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' }
                ]
            },
            { 
                test: /\.less$/, 
                use: [
                    isDev ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' }, 
                    { loader: 'less-loader' },
                    { 
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.join(__dirname, '../src/style/var.less')
                        }
                    }
                ] 
            },
            { 
                test: /\.(sa|sc)ss$/, 
                use: [
                    isDev ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' }, 
                    { loader: 'sass-loader' }
                ] 
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './static/media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),

        new webpack.DllReferencePlugin({
            context: _.resolve(),
            manifest: require(_.resolve(buildConfig.output, 'dll/manifest.json'))
        }),

        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
        }),

        new HtmlWebpackPlugin({
            template: _.resolve('./src/index.html'),
            alwaysWriteToDisk: true
        }),

        new HtmlWebpackHarddiskPlugin(),

        new AddAssetHtmlPlugin({
            filepath: _.resolve(buildConfig.output, 'dll/runtime_*.js')
        })
    ]
}