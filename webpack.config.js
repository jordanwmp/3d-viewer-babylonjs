const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    cache: false,
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: '/node_modules'
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(glb|gltf)$/,
                exclude: '/node_modules',
                use: [
                    {
                        loader: 'file-loader'
                    },
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'babylonjs-loaders': path.resolve(__dirname, 'node_modules/babylonjs-loaders'),
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        port: 8000,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Jordan Willian'
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //       { from: 'public/models', to: 'models' }
        //     ],
        //   }),
    ]
}