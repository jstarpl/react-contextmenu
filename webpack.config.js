/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: "production",
    output: {
        filename: "react-contextmenu.js",
        libraryTarget: 'umd',
        library: 'ReactContextMenu'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    assumptions: {
                        setPublicClassFields: true
                    },
                    presets: [
                        '@babel/preset-react',
                        ['@babel/preset-env', {
                            modules: false,
                            targets: "defaults",
                        }]
                    ],
                },
                include: [
                    path.resolve(__dirname, './src')
                ]
            }
        ]
    },
    externals: [{
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    }],
};
