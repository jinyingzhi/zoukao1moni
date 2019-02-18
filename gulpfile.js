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
    return gulp.src('./src')
        .pipe(webserver({
            open: true,
            port: 8080,
            livereload: true,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                if (pathname == '/favicon.ico') {
                    return res.end();
                }
                if (pathname == '/api/data') {
                    res.end('aaa')
                } else {
                    pathname = pathname == "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "./src", pathname)));
                }
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
        .pipe(gulp.dest('./dist'))
})

gulp.task('js', function() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglifyJs())
        .pipe(concat('new.js'))
        .pipe(gulp.dest('./dist'))
})

gulp.task('watch', function() {
    return gulp.watch('./dist', gulp.series('sass', 'css'));
})

gulp.task('default', gulp.series('webserver', 'sass', 'css', 'js', 'watch'));

gulp.task('build', gulp.parallel('css', 'js'))