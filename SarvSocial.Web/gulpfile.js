'use strict';

var gulp = require('gulp'),
gutil = require('gulp-util');

var sync = require('browser-sync');
var gulpsync = require('gulp-sync')(gulp);

gulp.paths = {
    src: 'src',
    dist: 'dist', 
    bower: 'bower_components',
    tmp: '.tmp',
e2e: 'e2e'
};

require('require-dir')('./gulp');

// production mode (see build task)
var isProduction = false;
var useSourceMaps = false;

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;


// SOURCES CONFIG 


//---------------
// DEFAULT TASK
//---------------


// build for production (minify)
gulp.task('build', ['prod', 'default']);
gulp.task('prod', function () { isProduction = true; });

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function () { useSourceMaps = true; });



// default (no minify)
gulp.task('default', gulpsync.sync([
          'scripts:vendor',
          'scripts:app',
          'start'
]), function () {

    gutil.log(gutil.colors.cyan('************'));
    gutil.log(gutil.colors.cyan('* All Done *'), 'You can start editing your code, LiveReload will update your browser after any change..');
    gutil.log(gutil.colors.cyan('************'));

});

// default (no minify)
gulp.task('compile', gulpsync.sync([         
          'scripts:app',
          'start'
]), function () {

    gutil.log(gutil.colors.cyan('************'));
    gutil.log(gutil.colors.cyan('* All Done *'), 'You can start editing your code, LiveReload will update your browser after any change..');
    gutil.log(gutil.colors.cyan('************'));

});
gulp.task('start', [
          'styles',         
          'templates',
          'sync',
          'watch'
]);



gulp.task('watch', [
        'watch:script',
          'watch:template',
          'watch:style']);

gulp.task('sync', function () {
    sync({
        server: {
            baseDir: "./"
        },port:3001
    });
});

//  livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
// LiveReload port. Change it only if there's a conflict
//var lvr_port = 35729;



//---------------
// WATCH
//---------------

//// Rerun the task when a file changes
//gulp.task('watch', function () {
//    //livereload.listen();

//    gulp.watch(source.scripts.watch, ['scripts:app', sync.reload]);
//    gulp.watch(source.styles.app.watch, ['styles:app', 'styles:app:rtl', sync.reload]);
//    gulp.watch(source.styles.themes.watch, ['styles:themes', sync.reload]);
//    gulp.watch(source.bootstrap.watch, ['styles:app', sync.reload]); //bootstrap
//    gulp.watch(source.templates.pages.watch, ['templates:pages', sync.reload]);
//    gulp.watch(source.templates.views.watch, ['templates:views', sync.reload]);
//    gulp.watch(source.templates.app.watch, ['templates:app', sync.reload]);

//    gulp.watch([

//        'dist/**'

//    ]).on('change', function (event) {
//        // livereload.changed( event.path );
//    });
//});





gulp.task('done', function () {
    console.log('All Done!! You can start editing your code, LiveReload will update your browser after any change..');
});

// Error handler
