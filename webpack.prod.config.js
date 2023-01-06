/**
 * Configuration file for production
 */

const path = require("path");
const dotenv = require("dotenv-webpack");

module.exports = {
    mode: "production",
    entry: "./www/js/index.js",
    devtool: "inline-source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "www/dist"),
    },
    plugins: [new dotenv()],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                        },
                    },
                ],
            },
        ],
    },
};
