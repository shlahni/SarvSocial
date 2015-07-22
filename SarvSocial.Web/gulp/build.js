'use strict';

var gulp = require('gulp');

//var $ = require('gulp-load-plugins')({
//    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
//});


var concat = require('gulp-concat'),
uglify = require('gulp-uglify');

var path = require('path'),
changed = require('gulp-changed'),
prettify = require('gulp-html-prettify'),
w3cjs = require('gulp-w3cjs'),
rename = require('gulp-rename'),
gutil = require('gulp-util'),
htmlify = require('gulp-angular-htmlify'),
minifyCSS = require('gulp-minify-css'),
gulpFilter = require('gulp-filter'),
expect = require('gulp-expect-file'),
ngAnnotate = require('gulp-ng-annotate'),
sourcemaps = require('gulp-sourcemaps'),

PluginError = gutil.PluginError;

var chmod = require('gulp-chmod');

var sync = require('browser-sync');
var gulpsync = require('gulp-sync')(gulp);

// production mode (see build task)
var isProduction = false;
var useSourceMaps = false;


var W3C_OPTIONS = {
    // Set here your local validator if your using one. leave it empty if not
    //uri: 'http://validator/check',
    doctype: 'HTML5',
    output: 'json',
    // Remove some messages that angular will always display.
    filter: function (message) {
        //if( /Element head is missing a required instance of child element title/.test(message) )
        //  return false;
        //if( /Attribute .+ not allowed on element .+ at this point/.test(message) )
        //  return false;
        //if( /Element .+ not allowed as child of element .+ in this context/.test(message) )
        //  return false;
        //if(/Comments seen before doctype./.test(message))
        //  return false;
    }
};

var source = {
    scripts: { //todo shahin
        app: [ 'src/app.js',
                'src/*.js',

                  'src/core/controllers/*.js',
                  'src/core/directives/*.js',
                  'src/core/services/*.js',
                  'src/core/filters/*.js',

                  'src/core/**/*.js',

                  'src/modules/**/*.js',
        ],
        watch: ['src/*.js','src/core/**/*.js', 'src/modules/**/*.js']
    }
    
};

// BUILD TARGET CONFIG 
var build = {
    scripts: {
        app: {
            main: 'app.js',
            dir: 'dist/js'
        }
    }   
};


// JS APP
gulp.task('scripts:app', function () {
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.scripts.app)
        .pipe(useSourceMaps ? sourcemaps.init() : gutil.noop())
        .pipe(concat(build.scripts.app.main))
        .pipe(ngAnnotate())
        .pipe(chmod(666))
        .on("error", handleError)
        .pipe(isProduction ? uglify({ preserveComments: 'some' }) : gutil.noop())
        .on("error", handleError)
        .pipe(useSourceMaps ? sourcemaps.write() : gutil.noop())        
        .pipe(gulp.dest(build.scripts.app.dir));
});

gulp.task('watch:script', function () {
    //livereload.listen();
    gulp.watch(source.scripts.watch, ['scripts:app', sync.reload]);  
});

// Error handler
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}
