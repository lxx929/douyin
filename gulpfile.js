/*
 * @Author: 刘祥祥 
 * @Date: 2019-02-18 09:17:07 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-18 09:49:28
 */

var gulp = require('gulp');
var sass = require('gulp-sass'); //编译scss
var webserver = require('gulp-webserver'); //启服务
var concat = require('gulp-concat'); //合并
var clean = require('gulp-clean-css'); //压缩css
var uglify = require('gulp-uglify'); //压缩js

gulp.task('scss', function() { //编译scss
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('scss'));
});

gulp.task('server', function() { //启服务
    return gulp.src('./src')
        .pipe(webserver({
            port: 8989,
            open: true,
            livereload: true,
            fullback: 'index.html'
        }));
});

gulp.task('default', gulp.series('scss', 'server', 'watch'));

gulp.task('scssmin', function() { //压缩scss
    return gulp.src('./src/scss/*.scss')
        .pipe(clean())
        .pipe(gulp.dest('./dist'));
});

gulp.task('jsmin', function() { //压缩js
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', gulp.series('scssmin', 'jsmin'));