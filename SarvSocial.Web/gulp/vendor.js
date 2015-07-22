'use strict';

var gulp = require('gulp'),
concat = require('gulp-concat'),
path = require('path'),
 expect = require('gulp-expect-file'),
     gulpFilter = require('gulp-filter'),
         minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify')
;


var chmod = require('gulp-chmod');


// VENDOR CONFIG
var vendor = {
    // vendor scripts required to start the app
    base: {
        source: require('../vendor.base.json'),
        dest: 'dist/js',
        name: 'base.js'
    },
    // vendor scripts to make to app work. Usually via lazy loading
    app: {
        source: require('../vendor.json'),
        dest: './vendor'
    }
};



// VENDOR BUILD
gulp.task('scripts:vendor', ['scripts:vendor:base', 'scripts:vendor:app']);

//  This will be included vendor files statically
gulp.task('scripts:vendor:base', function () {

    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(vendor.base.source)
        .pipe(expect(vendor.base.source))
        .pipe(uglify())
        .pipe(concat(vendor.base.name))
        .pipe(chmod(666))
        .pipe(gulp.dest(vendor.base.dest))
    ;
});

// copy file from bower folder into the app vendor folder
gulp.task('scripts:vendor:app', function () {

    var jsFilter = gulpFilter('**/*.js');
    var cssFilter = gulpFilter('**/*.css');

    return gulp.src(vendor.app.source, { base: 'bower_components' })
        .pipe(expect(vendor.app.source))
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(minifyCSS())
        .pipe(cssFilter.restore())
        .pipe(chmod(666))
        .pipe(gulp.dest(vendor.app.dest));

});
