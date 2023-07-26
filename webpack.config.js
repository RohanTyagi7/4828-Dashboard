const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        alias: { 
            'react/lib/ReactMount': 'react-dom/lib/ReactMount',
            process: 'process/browser',
        },
        extensions: [ '*', '.js', '.jsx', '.json'],
        modules:[__dirname, './app/js', 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /\.png$/, /\.css$/,],
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        ]
    },
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         process: 'process/browser',
    //     }),
    //     new webpack.DefinePlugin({
    //         'process.env': JSON.stringify(process.env)
    //     })
    // ]
}