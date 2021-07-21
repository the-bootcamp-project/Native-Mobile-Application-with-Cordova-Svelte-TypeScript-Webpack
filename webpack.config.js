/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const SRC_DIR = path.resolve("src");

const PAGES_DIR = path.resolve(SRC_DIR, "pages");
const TEMPLATES_DIR = path.resolve(SRC_DIR, "templates");

const CSP_RULES = {
    "base-uri": "'self'",
    "object-src": "'none'",
    "script-src": ["'self'"],
    "style-src": ["'unsafe-inline'", "'self'"],
    // 'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
    // 'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
};

module.exports = {
    optimization: {
        // splitChunks: {
        //   cacheGroups: {
        //     bootstrap: {
        //       name: 'bootstrap',
        //       test: /(bootstrap|react-bootstrap|react-bootstrap-icons|bootstrap-styled|jquery|popper)/,
        //       chunks: 'all',
        //     },
        //     react: {
        //       name: 'react',
        //       test: /(react|react-checkbox-tree|react-confetti|react-dom|react-i18next|react-json-view|react-use)/,
        //       chunks: 'all',
        //     },
        //     pouchdb: {
        //       name: 'pouchdb',
        //       test: /(pouchdb|pouchdb-find)/,
        //       chunks: 'all',
        //     },
        //     crawler: {
        //       name: 'crawler',
        //       test: /(axios|cheerio|parse5|stream-http|url)/,
        //       chunks: 'all',
        //     },
        //   },
        // },
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false })],
    },

    entry: {
        welcome: path.resolve(PAGES_DIR, "welcome.tsx"),
        whats_new: path.resolve(PAGES_DIR, "whats_new.tsx"),
        dashboard: path.resolve(PAGES_DIR, "dashboard.tsx"),
        bookmarks: path.resolve(PAGES_DIR, "bookmarks.tsx"),
        documentView: path.resolve(PAGES_DIR, "documentView.tsx"),
        options: path.resolve(PAGES_DIR, "options.tsx"),
        error: path.resolve(PAGES_DIR, "error.tsx"),
    },

    externals: ["fs"],
    resolve: {
        alias: {
            // ['~']: path.resolve(__dirname, 'node_modules'),
            // ['§']: path.resolve(__dirname, 'src','components'),
            // ['@']: path.resolve(__dirname, 'src','modules')
            process: "process/browser",
        },
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
        fallback: {
            os: require.resolve("os-browserify/browser"),
            stream: require.resolve("stream-browserify"),
            // "process": require.resolve("process/browser"),
            url: require.resolve("url/"),
            path: require.resolve("path-browserify"),
            util: require.resolve("util/"),
            assert: require.resolve("assert/"),
            constants: require.resolve("constants-browserify"),
            zlib: require.resolve("browserify-zlib"),
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            crypto: require.resolve("crypto-browserify"),
        },
    },

    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/i,
                exclude: /(node_modules)/,
                use: { loader: "babel-loader" },
            },
            {
                test: /\.(c|s[ac])ss$/i,
                use: [
                    { loader: "style-loader" }, // inject CSS to page
                    { loader: "css-loader" }, // translates CSS into CommonJS modules
                    { loader: "postcss-loader" }, // Run postcss actions
                    { loader: "sass-loader" }, // compiles Sass to CSS
                ],
            },
            { test: /\.(svg|png|jpg|jpeg|gif)$/i, type: "asset/resource" },
        ],
    },

    plugins: [
        new webpack.ProvidePlugin({
            process: require.resolve("process/browser"),
        }),
        // HTML Templates
        new HtmlWebpackPlugin({
            template: path.resolve(TEMPLATES_DIR, "index.html"),
            filename: "welcome.html",
            hash: true,
            cache: true,
            chunks: ["welcome"],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(TEMPLATES_DIR, "index.html"),
            filename: "whats_new.html",
            hash: true,
            cache: true,
            chunks: ["whats_new"],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(TEMPLATES_DIR, "index.html"),
            filename: "dashboard.html",
            hash: true,
            cache: true,
            chunks: ["dashboard"],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(TEMPLATES_DIR, "index.html"),
            filename: "bookmarks.html",
            hash: true,
            cache: true,
            chunks: ["bookmarks"],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(TEMPLATES_DIR, "index.html"),
            filename: "documentView.html",
            hash: true,
            cache: true,
            chunks: ["documentView"],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(TEMPLATES_DIR, "index.html"),
            filename: "options.html",
            hash: true,
            cache: true,
            chunks: ["options"],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(TEMPLATES_DIR, "index.html"),
            filename: "error.html",
            hash: true,
            cache: true,
            chunks: ["error"],
        }),
        // Content Security Policy
        new CspHtmlWebpackPlugin(CSP_RULES, {
            enabled: true,
            hashingMethod: "sha256",
            hashEnabled: { "script-src": true, "style-src": true },
            nonceEnabled: { "script-src": true, "style-src": true },
        }),
        new ESLintPlugin(),
        new CompressionPlugin({
            algorithm: "gzip",
            // test: /\.js(\?.*)?$/i,
            // include: /\/includes/,
            // exclude: /\/excludes/,
            compressionOptions: { level: 9 },
            // threshold: 8192,
            // minRatio: 0.8,
            // deleteOriginalAssets: true,
        }),
    ],
};
