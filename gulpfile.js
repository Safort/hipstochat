'use strict';

const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodemon = require('gulp-nodemon');
const Cache = require('gulp-file-cache');
const cache = new Cache();

const frontendConfig = require('./webpack-frontend.config.js');
const devServerConfig = require('./webpack-dev-server.config.js');
const onBuild = (done) => {
    return (err, stats) => {
        if (err) {
            console.log('Error', err);
        } else {
            console.log(stats.toString());
        }

        if (done) {
            done();
        }
    }
};

if (process.env.NODE_ENV !== 'production') {
    frontendConfig.devtool = 'source-map';
    frontendConfig.debug = true;
}



gulp.task('default', function() {});
gulp.task('build', ['frontend-build', 'backend-prod']);
gulp.task('watch', ['frontend-watch', 'backend-dev'], function() {

    gulp.watch('./src/backend/**/*.js', ['backend-dev']);

    nodemon({
        execMap: {
            js: 'node'
        },
        script: './app/index.js',
        ignore: [
            'node_modules/',
            'app/public/'
        ],
        watch: ['app/'],
        ext: 'js',
        env: {'NODE_ENV': 'development'}
    }).on('restart', function() {
        console.log('Restarted!');
    });

    return nodemon;
});



gulp.task('frontend-build', function(cb) {
    webpack(frontendConfig).run(onBuild(cb));
});

gulp.task('frontend-watch', function() {
    new WebpackDevServer(webpack(devServerConfig), {
        publicPath: devServerConfig.output.publicPath,
        contentBase: './app/public',
        hot: true,
        historyApiFallback: true
    }).listen(3000, 'localhost', function(err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);

        gutil.log(
            '[webpack-dev-server]',
            'http://localhost:3000/webpack-dev-server/index.html'
        );
    });
});


gulp.task('backend-prod', function() {
    return gulp
        .src('./src/backend/**/*.js', {base: './src/backend'})
        .pipe(babel())
        .pipe(gulp.dest('app/'));
});


gulp.task('backend-dev', function() {
    return gulp
        .src('./src/backend/**/*.js', {base: './src/backend'})
        .pipe(cache.filter()) // remember files
        .pipe(plumber())
        .pipe(babel())
        .pipe(cache.cache())  // cache them
        .pipe(gulp.dest('app/'));
});
