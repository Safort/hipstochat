'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const nodemon = require('gulp-nodemon');
const Cache = require('gulp-file-cache');

const cache = new Cache();


gulp.task('build', ['server-prod']);


gulp.task('watch', ['server-dev'], () => {
  gulp.watch('./src/server/**/*.js', ['server-dev']);

  nodemon({
    execMap: {
      js: 'node'
    },
    script: './app/index.js',
    ignore: [
      'node_modules/',
      'app/public/',
    ],
    watch: ['app/'],
    ext: 'js',
    env: { NODE_ENV: 'development' },
  }).on('restart', () => {
    console.log('Restarted!');
  });

  return nodemon;
});


gulp.task('server-prod', () => {
  return gulp
    .src('./src/server/**/*.js', { base: './src/server' })
    .pipe(babel())
    .pipe(gulp.dest('app/'));
});


gulp.task('server-dev', () => {
  return gulp
    .src('./src/server/**/*.js', { base: './src/server' })
    .pipe(cache.filter())
    .pipe(plumber())
    .pipe(babel())
    .pipe(cache.cache())
    .pipe(gulp.dest('app/'));
});
