let gulp = require('gulp'),
    pat = require('path'),
    $ = require('gulp-load-plugins')(),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    rimraf = require('rimraf'),
    // WebpackDevServer = require('webpack-dev-server'),
    path = require('path'),
    open = require('gulp-open');
merge = require('merge-stream'),
    childProcess = require('child_process'),
    env = require('gulp-env'),
    chalk = require('chalk'); // jshint ignore:line

const DEV_MODE = !(gutil.env._[0] === 'p' || gutil.env._[0] === 'pp');      // jshint ignore:line

function log(str) {
    if (DEV_MODE) console.log(chalk.black.bgYellow(str));
    else console.log(chalk.bgCyan.white.bold(str));
}

if (DEV_MODE) {
    var str = `
    ########  ######## ##     ## 
    ##     ## ##       ##     ## 
    ##     ## ##       ##     ## 
    ##     ## ######   ##     ## 
    ##     ## ##        ##   ##  
    ##     ## ##         ## ##   
    ########  ########    ###    
    `;
    log(str);
} else {
    var str = `
    ########  ########   #######  
    ##     ## ##     ## ##     ## 
    ##     ## ##     ## ##     ## 
    ########  ########  ##     ## 
    ##        ##   ##   ##     ## 
    ##        ##    ##  ##     ## 
    ##        ##     ##  #######   `;
    log(str);
}


gulp.task('m', () => {
    log('m');
    const IMG_SRC = ['src/img_src/**/*.+(jpg|png)', '!src/img_src/_*'];
    const OTHER_IMG = ['!src/img_src/**/*.(jpg|png)', 'src/img_src/_*'];
    const DIST = 'src/img';
    const imageminPngquant = require('imagemin-pngquant');
    const imageminMozjpeg = require('imagemin-mozjpeg');

    const taskOtherIMG = gulp.src(OTHER_IMG)
        .pipe($.changed(DIST))
        .pipe($.size({
            title: '',
            showFiles: true,
        }))
        .pipe(gulp.dest(DIST));

    const taskIMGSRC = gulp.src(IMG_SRC)
        .pipe($.changed(DIST))
        .pipe($.size({
            title: '',
            showFiles: true,
        }))
        .pipe($.imagemin([
            imageminMozjpeg({ quality: 80 }),
            imageminPngquant({ quality: 80 }),
        ]))
        .pipe(gulp.dest(DIST))
        .pipe($.size({
            title: 'dist',
        }));
    return merge(taskOtherIMG, taskIMGSRC);
});

gulp.task('rimraf', (cb) => {
    log('rimraf');
    rimraf('./dist', cb);
    // cb();
});

/*
gulp.task('webpack-dev-server', (cb) => {
    log('webpack-dev-server');
    process.env.NODE_ENV = 'development';
    // var ifs = require('os').networkInterfaces();
    // let host = '' + Object.keys( ifs ).map( x => ifs[ x ].filter( x => x.family === 'IPv4' && !x.internal )[ 0 ] ).filter( x => x )[ 0 ].address;
    const host = 'localhost';
    const port = 3000;
    const URI = `http://${host}:${port}/`;

    const config = require('./webpack.config');
    config.devtool = 'cheap-module-eval-source-map';
    // config.devtool = "source-map";
    // config.devtool = "inline-source-map";
    // config.devtool = "inline-source-map";

    for (const a in config.entry) {
        config.entry[a].push(`webpack-dev-server/client?${URI}`, 'webpack/hot/dev-server');
    }

    const server = new WebpackDevServer(webpack(config), config.devServer);
    server.listen(port, host, (err) => {
        if (err)            { console.log(err); }
        gutil.log('[webpack-dev-server]', URI);

        cb();
        if (gutil.env._[0] === 'd') {
            return gulp.src('./')
                .pipe(open({ uri: `${URI}?debug=milkmidi` }));
        }
    });
});*/


// production
gulp.task('p', ['rimraf'], (cb) => {
    log('p');
    process.env.NODE_ENV = 'production';
    const config = require('./webpack.config');
    /* config.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
        })
    );*/

    webpack(config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({ colors: true, progress: true, chunkModules: false }));
        cb();
    });
});
/* gulp.task( 'pp', [ 'p' ], () => {
    log('pp');
    var fileZillaBAT =  path.resolve( __dirname, './___FTP.bat' );
    childProcess.exec( fileZillaBAT, ( error, stdout, stderr ) => {
        return gulp.src( './' )
            .pipe( open( { uri: 'http://www.sony-xperia.com.tw/XZ?debug=milkmidi' }) );
    });
});
*/
gulp.task('watch', () => {
    gulp.watch('src/img_src/**/*', ['m']);
});


gulp.task('d', ['watch', 'webpack-dev-server'], () => {
});

gulp.task('default', ['d']);
