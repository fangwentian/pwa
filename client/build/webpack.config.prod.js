const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name]_[chunkhash:8].js',
        chunkFilename: 'chunk_[name]_[chunkhash:8].js'
    }
});