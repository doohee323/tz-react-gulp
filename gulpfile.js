var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var webserver = require('gulp-webserver');
var open = require('gulp-open');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');

var dependencies = [
  'react',
  'react-dom'
];
// keep a count of the times a task refires
var scriptsCount = 0;

var devSrc = 'src';
var devPaths = {
    js: devSrc + '/js/**/*.js',
    css: devSrc + '/css/**/*.css',
    html : devSrc + '/html/**/*.*'
};

var buildSrc = 'web';

//Gulp tasks
//----------------------------------------------------------------------------
gulp.task('combine-js', function () {
  bundleApp(false);
});

gulp.task('deploy', function (){
  bundleApp(true);
});

gulp.task('combine-css', function () {
    return gulp.src(devPaths.css)
        .pipe(concat('styles.css'))
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest(buildSrc + '/css'));
});

gulp.task('html-move', function () {
    return gulp.src(devPaths.html)
        .pipe(gulp.dest(buildSrc));
});

gulp.task('server', ['watch'], function () {
    var options = {
        uri: "http://localhost:8000/index.html",
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
    gulp.watch(devPaths.css, ['combine-css']);
    gulp.watch(devPaths.html, ['html-move']);
});

gulp.task('clean', function () {
    return gulp.src(buildSrc, {read: false})
        .pipe(clean());
});

function bundleApp(isProduction) {
  scriptsCount++;
  var appBundler = browserify({
      entries: './src/js/app.js',
      debug: true
    })

    if (!isProduction && scriptsCount === 1){
      browserify({
      require: dependencies,
      debug: true
    })
      .bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulp.dest(buildSrc + '/js/'));
    }
    if (!isProduction){
      dependencies.forEach(function(dep){
        appBundler.external(dep);
      })
    }

    appBundler
      .transform("babelify", {presets: ["es2015", "react"]})
      .bundle()
      .on('error',gutil.log)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(buildSrc + '/js'));
    
}

gulp.task('default', ['combine-js', 'combine-css', 'html-move', 'watch']);

