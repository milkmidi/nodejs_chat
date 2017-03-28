const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const chalk = require('chalk');
const autoprefixer = require('autoprefixer');
    // copyWebpackPlugin = require('copy-webpack-plugin'),
    // ScriptExtHtmlWebpackPlugin = require( 'script-ext-html-webpack-plugin' ),
    // HtmlWebpackPlugin = require('html-webpack-plugin');
const DEV_MODE = process.env.NODE_ENV === 'development';
// DEV_MODE = true;
let colorFun;
if (DEV_MODE) {
    colorFun = chalk.black.bgYellow;
} else {
    colorFun = chalk.bgCyan.white;
}
console.log(colorFun(`DEV_MODE = ${DEV_MODE}`));
console.log(colorFun(`process.env.NODE_ENV = ${process.env.NODE_ENV}`));

// const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const config = {
    context: path.resolve('src'),
    entry: {
        app: ['./js/app.js'],
        login: ['./js/login.js'],
        vendor: [
            'Vue',
            'Vuex',
            'axios',
        ],
    },
    output: {
        filename: 'asset/js/[name].js?[hash]',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
    },
    resolveLoader: {
        moduleExtensions: ['-loader'],
    },
    resolve: {
        alias: {
            // 'jquery': path.resolve('src/lib/jquery-3.1.1.min.js'),
        },
        modules: [
            path.resolve('src/vue'),
            path.resolve('src/html'),
            path.resolve('src/img'),
            path.resolve('src/css'),
            path.resolve('src/asset'),
            path.resolve('src/js'),
            path.resolve('src'),
            path.resolve('node_modules'),
        ],
        extensions: ['.js', '.vue'],
    },
    // https://webpack.js.org/configuration/dev-server/#devserver
    devServer: {
        proxy: {
            /* '/api': {
                target: 'http://localhost:3014',
                changeOrigin: true,
            },*/
        },
        historyApiFallback: false,
        noInfo: true,
        hot: true,
        inline: true,
        // https://webpack.js.org/configuration/stats/
        stats: {
            colors: true,
            hash: false, // add the hash of the compilation
            version: false, // add webpack version information
            timings: true, // add timing information
            assets: true, // add assets information
            chunks: false, // add chunk information
            chunkModules: false, // add built modules information to chunk information
            modules: false, // add built modules information
            cached: false, // add also information about cached (not built) modules
            reasons: false, // add information about the reasons why modules are included
            source: false, // add the source code of modules
            error: true,
            errorDetails: true, // add details to errors (like resolving log)
            chunkOrigins: false, // add the origins of chunks and chunk merging info
        },
    },
};
config.module = {
    // https://webpack.js.org/configuration/module/#module-rules
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            include: path.resolve('src/vue'),
            exclude: /node_modules/,
            options: {
                /* loaders: {
                    stylus:"css!stylus"
                },*/
                /* loaders: {
                    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
                    // https://github.com/webpack/extract-text-webpack-plugin
                    sass: ExtractTextPlugin.extract( {
                        loader: 'css-loader!sass-loader',
                        fallbackLoader: 'vue-style-loader', // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        publicPath:"../../"
                    })
                },*/
                // https://github.com/vuejs/vue-loader/blob/master/docs/en/features/postcss.md
                postcss: [
                   /* require('autoprefixer')({
                        browsers: ['last 5 version', 'iOS >=8', 'Safari >=8'],
                    }),
                    require('cssnano')({
                        zindex: false,
                        calc: false,
                        reduceIdents: false,
                    }),*/
                ],
            },
        },
        {
            test: /\.js$/,
            loader: 'babel',
            include: [
                path.resolve('src/js'),
                path.resolve('src/lib'),
                path.resolve('src/vue'),
                path.resolve('src'),
            ],
            exclude: /node_modules/,
        },
        {
            test: /\.styl$/,
            use: [
                'style',
                // 'css',
                'css?importLoaders=1&sourceMap',
                'postcss',
                'stylus',
            ],
            // 用 use 或是寫 loader 串在一起，都是一樣的
            // loader: 'style!css!stylus',
            include: [
                path.resolve('src/css'),
            ],
            exclude: /node_modules/,
        },
        {
            test: /\.(png|jpg|gif|svg|ico)$/,
            include: path.resolve('src/img'),
            loader: 'url',
            exclude: /node_modules/,
            options: {
                limit: 2048,
                name: 'asset/[path][name].[ext]?[hash:8]',
            },
        },
        {
            loader: 'file',
            include: path.resolve('src/asset'),
            exclude: /node_modules/,
            options: {
                name: '[name].[ext]',
            },
        },
    ],
};

config.plugins = [
    // new ExtractTextPlugin("asset/css/[name].css"),
    // src/asset 裡面有什麼就 copy 到 dist/ 下
    /* copyWebpackPlugin([
        { from: './asset', to: './' },
    ]),*/
    /* new HtmlWebpackPlugin({
        minify: false,
        xhtml: true,
        chunks: ['app' ],
        filename:"index.html",
        template: 'pug-loader?pretty=true!src/html/index.template.pug',
    }),
    new HtmlWebpackPlugin({
        minify: false,
        xhtml: true,
        chunks: [ 'login' ],
        filename:"login.html",
        template: 'pug-loader?pretty=true!src/html/login.template.pug',
    }),*/
    /* new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
    }),*/
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'root.jQuery': 'jquery',
    }),
    /* new webpack.optimize.CommonsChunkPlugin( {
        name: 'vendor',
        filename: 'asset/js/vendor.js?[hash]',
        minChunks: Infinity
    }),  */
    // new webpack.optimize.CommonsChunkPlugin( 'vendor','asset/js/vendor.js?[hash]', Infinity),
    new webpack.DefinePlugin({
        __DEV__: DEV_MODE,
        'process.env.NODE_ENV': DEV_MODE ? "'development'" : '"production"',
    }),
    //  http://vue-loader.vuejs.org/en/workflow/production.html
    ...DEV_MODE ? [
        new webpack.HotModuleReplacementPlugin(),
    ] : [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
            },
        }),
        // optimize module ids by occurence count
        // 以下這個還不知道要做什麼
        new webpack.LoaderOptionsPlugin({
            test: /\.css$/, // optionally pass test, include and exclude, default affects all loaders
            minimize: true,
            debug: false,
            options: {
            },
        }),
    ],
];


 // 不要將這裡打包到你的 js 檔裡, 可以用 extensions ，然後自己 script src, 或是用 addVendor 的方法，二選一
config.externals = {
    jquery: '$',
    vue: 'Vue',
    vuex: 'Vuex',
    axios: 'axios',
    'vue-router': 'VueRouter',
};
module.exports = config;
