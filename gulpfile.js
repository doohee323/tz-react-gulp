var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var webserver = require('gulp-webserver');
var open = require('gulp-open');

var devSrc = 'src';
var devPaths = {
    js: devSrc + '/js/**/*.js',
    css: devSrc + '/css/**/*.css',
    html : devSrc + '/html/**/*.*'
};

var buildSrc = 'build';

gulp.task('combine-js', function () {
    return gulp.src(devPaths.js)
        .pipe(concat('compiled.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildSrc + '/js'));
});

gulp.task('compile-sass', function () {
    return gulp.src(devPaths.css)
        .pipe(concat('styles.css'))
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest(buildSrc + '/css'));
});

gulp.task('html-move', function () {
    return gulp.src(devPaths.html)
        .pipe(gulp.dest(buildSrc + '/html'));
});

gulp.task('server', ['watch'], function () {
    var options = {
        uri: "http://localhost:8000/html/index.html",
        app: 'chrome'
    };
    return gulp.src(buildSrc + "/")
        .pipe(webserver({
            livereload : true
        }))
        .pipe(open(options));
});

gulp.task('watch', function () {
    gulp.watch(devPaths.js, ['combine-js']);
    gulp.watch(devPaths.css, ['compile-sass']);
    gulp.watch(devPaths.html, ['html-move']);
});


gulp.task('clean', function () {
    return gulp.src(buildSrc, {read: false})
        .pipe(clean());
});

gulp.task('compile', ['combine-js', 'compile-sass', 'html-move'], function(){
  gulp.start('server')
});

gulp.task('compile2', ['combine-js', 'compile-sass', 'html-move'], function(){
});

gulp.task('default', ['clean'], function(){
    gulp.start('compile2');
});