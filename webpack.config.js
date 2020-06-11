const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }, {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: {
                        inline: true,
                        fallback: false
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
    ],
    node: {
        fs: "empty",
        child_process: "empty",
    }
};