const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require("path");

module.exports = function ({ mode = "production" }) {

    const commonConfig = {
        mode: mode,
    };

    if (mode === "development") {
        commonConfig.devtool = "inline-source-map";
    }

    var cssLoader = {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
    };

    var htmlLoader = {
        test: /\.html$/,
        use: {
            loader: "html-loader",
            options: {
                
            }
        }
    };

    var jsLoader = {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                root: "../../"
            }
        }
    };

    var imgLoader = {
        test: /\.svg$/,
        use: {
            loader: "file-loader",
            options: {
                outputPath: "img"
            }
        }
    };

    const webConfig = Object.assign({}, commonConfig, {
        entry: path.resolve(__dirname, "src", "index.js"),
        module: {
            rules: [
                cssLoader,
                htmlLoader,
                jsLoader,
                imgLoader
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Mandelbrot",
                template: path.resolve(__dirname, "index.html"),
                filename: path.resolve(__dirname, "dist", "index.html"),
            })
        ],
        output: {
            library: "Mandelbrot",
            path: path.resolve(__dirname, "dist"),
            filename: "index.js",
        }
    });
    return webConfig;
}
