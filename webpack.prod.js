const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.s[ac]ss$/,
            use: [
                // Creates `style` nodes from JS strings
                // Extract css into files
                MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader'
            ]
        }]
    },
    output: {
        filename: '[name]-bundle-[contentHash].js', // Bust that cache with contentHash
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' })
    ]
});