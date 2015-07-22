'use strict';

var gulp = require('gulp');

var less = require('gulp-less'),
       through = require('through2'),
gutil = require('gulp-util'),
rename = require('gulp-rename'),
  flip = require('css-flip') ;

var sync = require('browser-sync');
var gulpsync = require('gulp-sync')(gulp);

var chmod = require('gulp-chmod');

var isProduction = false;
var useSourceMaps = false;

var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;

// SOURCES CONFIG 
var source = {  
    styles: {
        app: {
            main: ['src/less/app.less', '!src/less/themes/*.less'],
            dir: 'src/less',
            watch: ['src/less/*.less', 'src/less/**/*.less', '!src/less/themes/*.less']
        },
        themes: {
            main: ['src/less/themes/*.less', ignored_files],
            dir: 'src/less/themes',
            watch: ['src/less/themes/*.less']
        },
    },
    bootstrap: {
        main: 'src/less/bootstrap/bootstrap.less',
        dir: 'src/less/bootstrap',
        watch: ['src/less/bootstrap/*.less']
    },
    assets :{
        main: 'src/assets/**/*.*',
        watch: ['src/assets/**/*.*']
    }
};

// BUILD TARGET CONFIG 
var build = {
   
    styles: 'dist/css',
    asstes:'dist/assets'
   
};

// APP LESS
gulp.task('styles:app', function () {
    return gulp.src(source.styles.app.main)
        .pipe(useSourceMaps ? sourcemaps.init() : gutil.noop())
        .pipe(less({
            paths: [source.styles.app.dir]
        }))
        .on("error", handleError)
        .pipe(isProduction ? minifyCSS() : gutil.noop())
        .pipe(useSourceMaps ? sourcemaps.write() : gutil.noop())
        .pipe(chmod(666))
        .pipe(gulp.dest(build.styles));
});

// APP RTL
gulp.task('styles:app:rtl', function () {
    return gulp.src(source.styles.app.main)
        .pipe(useSourceMaps ? sourcemaps.init() : gutil.noop())
        .pipe(less({
            paths: [source.styles.app.dir]
        }))
        .on("error", handleError)
        .pipe(flipcss())
        .pipe(isProduction ? minifyCSS() : gutil.noop())
        .pipe(useSourceMaps ? sourcemaps.write() : gutil.noop())
        .pipe(rename(function (path) {
            path.basename += "-rtl";
            return path;
        }))
        .pipe(chmod(666))
        .pipe(gulp.dest(build.styles));
});

// LESS THEMES
gulp.task('styles:themes', function () {
    return gulp.src(source.styles.themes.main)
        .pipe(less({
            paths: [source.styles.themes.dir]
        }))
        .on("error", handleError)
        .pipe(chmod(666))
        .pipe(gulp.dest(build.styles));
});

// BOOSTRAP
gulp.task('bootstrap', function () {
    return gulp.src(source.bootstrap.main)
        .pipe(less({
            paths: [source.bootstrap.dir]
        }))
        .on("error", handleError)
        .pipe(chmod(666))
        .pipe(gulp.dest(build.styles));
});

// assets
gulp.task('assets', function () {
    return gulp.src(source.assets.main)        
        .on("error", handleError)
        .pipe(chmod(666))
        .pipe(gulp.dest(build.asstes));
});


gulp.task('styles', ['styles:app',
          'styles:app:rtl',
          'styles:themes',
            'bootstrap',
            'assets']);


gulp.task('watch:style', function () {
       gulp.watch(source.styles.app.watch, ['styles:app', 'styles:app:rtl', sync.reload]);
       gulp.watch(source.styles.themes.watch, ['styles:themes', sync.reload]);
       gulp.watch(source.assets.watch, ['assets', sync.reload]);
    gulp.watch(source.bootstrap.watch, ['styles:app', sync.reload]); //bootstrap     
});

// Mini gulp plugin to flip css (rtl)
function flipcss(opt) {

    if (!opt) opt = {};

    // creating a stream through which each file will pass
    var stream = through.obj(function (file, enc, cb) {
        if (file.isNull()) return cb(null, file);

        if (file.isStream()) {
            console.log("todo: isStream!");
        }

        var flippedCss = flip(String(file.contents), opt);
        file.contents = new Buffer(flippedCss);
        cb(null, file);
    });

    // returning the file stream
    return stream;
}

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}
