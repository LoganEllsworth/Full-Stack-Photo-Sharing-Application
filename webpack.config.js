const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, './client/index.js'),
    output: {
        path: path.resolve(__dirname, './client'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
                test: /\.(js|jsx)$/,
                resolve: { extensions: ['.js', '.jsx'] },
                options: {
                    plugins: [require.resolve("react-refresh/babel")],
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(jpg|png|svg|gif|mp3|mp4)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 30000,
                    },
                },
            },
        ],
    },
    plugins: [
        new ReactRefreshPlugin(),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            filename: './index.html',
            favicon: './client/assets/favicon.ico',
        })
    ],
    devServer: {
        port: 3000,
        static: {
            publicPath: path.join(__dirname, './client')
        },
        server: {
            type: 'https',
        },
    },
};