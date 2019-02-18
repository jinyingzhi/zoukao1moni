var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglifyJs = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var webserver = require('gulp-webserver');

var fs = require('fs');
var url = require('url');
var path = require('path');

gulp.task('webserver', function() {
    return gulp.src('./')
        .pipe(webserver({
            open: true,
            port: 8080,
            livereload: true,
            middleware: function(req, res) {

            }
        }))
})

gulp.task('sass', function() {
    return gulp.src('./src/scss/demo.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('css', function() {
    return gulp.src('./src/css/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('js', function() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglifyJs())
        .pipe(concat('new.js'))
        .pipe(gulp.dest('./src/scripts/libs'))
})