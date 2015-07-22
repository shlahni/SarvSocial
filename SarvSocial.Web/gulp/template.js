'use strict';

var gulp = require('gulp');

var sync = require('browser-sync');
var gulpsync = require('gulp-sync')(gulp);


var chmod = require('gulp-chmod');

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;

// SOURCES CONFIG 
var source = {  
    templates: { //todo shahin
        app: {
            files: ['jade/index.jade'],
            watch: ['jade/index.jade', hidden_files]
        },
        views: {
            files: ['src/modules/**/*.html', 'src/core/**/*.html', ignored_files],
            watch: ['src/modules/**/*.html', 'src/core/**/*.html']
        },
        pages: {
            files: ['src/core/pages/*.html'],
            watch: ['src/core/pages/*.html']
        }
    }  
};

// BUILD TARGET CONFIG 
var build = {
    templates: { // shahin change
        app: '',
        views: 'dist/views',
        pages: 'dist/pages'
    }
};

// JADE
//gulp.task('templates:app', function () {
//    return gulp.src(source.templates.app.files)
//        //.pipe(changed(build.templates.app, { extension: '.html' })) //todo copy instead of change
//        //.pipe(jade()) //by shahin
//        .on("error", handleError)
//        .pipe(prettify({
//            indent_char: ' ',
//            indent_size: 3,
//            unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
//        }))
//        // .pipe(htmlify({
//        //     customPrefixes: ['ui-']
//        // }))
//        // .pipe(w3cjs( W3C_OPTIONS ))
//        .pipe(gulp.dest(build.templates.app))
//    ;
//});
// JADE
gulp.task('templates:pages', function () {
    return gulp.src(source.templates.pages.files)
        //.pipe(changed(build.templates.pages, { extension: '.html' }))
        //.pipe(jade())
        //.on("error", handleError)
        //.pipe(prettify({
        //    indent_char: ' ',
        //    indent_size: 3,
        //    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
        //}))
        // .pipe(htmlify({
        //     customPrefixes: ['ui-']
        // }))
        // .pipe(w3cjs( W3C_OPTIONS ))
        .pipe(chmod(666))
        .pipe(gulp.dest(build.templates.pages))
    ;
});

// JADE
gulp.task('templates:views', function () {
    return gulp.src(source.templates.views.files)
        //.pipe(changed(build.templates.views, { extension: '.html' }))
        //.pipe(jade())
        //.on("error", handleError)
        //.pipe(prettify({
        //    indent_char: ' ',
        //    indent_size: 3,
        //    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
        //}))
        // .pipe(htmlify({
        //     customPrefixes: ['ui-']
        // }))
        // .pipe(w3cjs( W3C_OPTIONS ))
        .pipe(chmod(666))
        .pipe(gulp.dest(build.templates.views))
    ;
});


gulp.task('templates', [
        //'templates:app',
          'templates:pages',
          'templates:views']);

gulp.task('watch:template', function () {
    //livereload.listen();

       gulp.watch(source.templates.pages.watch, ['templates:pages', sync.reload]);
    gulp.watch(source.templates.views.watch, ['templates:views', sync.reload]);
    gulp.watch(source.templates.app.watch, ['templates:app', sync.reload]);
 
});
