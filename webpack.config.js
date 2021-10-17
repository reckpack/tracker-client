const { VueLoaderPlugin } = require("vue-loader");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const path = require("path");

const devMode = process.env.NODE_ENV !== "production";
module.exports = {
    entry: {
        main: "./src/main.js",
    },
    output: {
        path: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                loader: "file-loader",
                options: {
                    name: "[name][contenthash:8].[ext]",
                },
            },
            {
                test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
                loader: "file-loader",
                options: {
                    outputPath: "assets",
                    esModule: false,
                },
            },
            {
              test: /\.s?css$/,
              use: [
                devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                {
                  loader: "postcss-loader",
                  options: {
                    postcssOptions: {
                        plugins:  [autoprefixer],
                    },
                  },
                },
                "sass-loader",
              ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
            chunkFilename: "[name].[contenthash:8].css",
          }),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
            favicon: "./public/favicon.ico",
        }),
    ],
    resolve: {
        alias: {
            vue$: "vue/dist/vue.runtime.esm.js",
        },
        extensions: ["*", ".js", ".vue", ".json"],
    },
    optimization: {
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              priority: -10,
              chunks: "all",
            },
          },
        },
      },
};