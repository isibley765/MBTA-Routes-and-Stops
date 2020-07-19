var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/build_finals/');
var APP_DIR = __dirname;

var config = {
    entry: {
        build: `${APP_DIR}/src/react/Main/main.jsx`,
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            include: APP_DIR,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['@babel/preset-react'],
            },
        }, {
            test: /\.css$/,
            use: ['style-loader', {loader: 'css-loader', options: {modules: { localIdentName: '[name]__[local]___[hash:base64:8]'}}}],
        }],
    },
    watchOptions: {
        aggregateTimeout: 200,
        ignored: ['node_modules/**', 'src/build_finals/**']
    }
};

module.exports = config;