const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    // devtool: 'none', // removes eval in bundle.js for 
    entry: {
        main: './src/js/index.js',
        vendor: './src/js/vendor.js'
    },
    // [
    //     './src/js/main.jsx',
    //     './src/css/main.scss'
    // ],
    module: {
        rules: [{
            test: /\.html$/,
            use: ['html-loader']
        },
        {
            test: /\.(gif|ico|jpe?g|png|svg)/,
            use: {
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name(file) {
                        return process.env.NODE_ENV === 'development' ?
                            '[name].[ext]' :
                            '[name]-[hash].[ext]';
                    },
                    // name: '[name]-[hash].[ext]',
                    outputPath: 'assets/images'
                }
            }
        },
        {
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
                presets: ['@babel/preset-react']
            },
            test: /\.jsx?$/
        }
        ]
    },
    plugins: [
        // new CopyWebpackPlugin([{ from: './src/favicon.ico', to: '' }]),
        // Allows html to use appropriate bundle.js
        new HtmlWebpackPlugin({
            favicon: './src/favicon.ico',
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css'],
        modules: [
            'node_modules'
        ]
    },
    watch: false,
    watchOptions: {
        ignored: ['/node_modules/']
    }
};
