// Include gulp
var gulp = require('gulp'); 
var connect = require('gulp-connect');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var clean = require('gulp-clean');

gulp.task('copy-html-files', function() {
    //gulp.src(['./app/**/*.html', './app/**/*.css',
    //gulp.src(['./app/**/*.html', '!./app/index.html', './app/**/*.css',
    gulp.src(['./app/**/*.html', '!./app/index.html',
              './app/bower_components/fontawesome/fonts/*.otf',
              './app/bower_components/fontawesome/fonts/*.eot',
              './app/bower_components/fontawesome/fonts/*.svg',
              './app/bower_components/fontawesome/fonts/*.ttf',
              './app/bower_components/fontawesome/fonts/*.woff',
              './app/bower_components/bootstrap/dist/css/bootstrap.css.map',
              './app/bower_components/bootstrap/dist/fonts/*.eot',
              './app/bower_components/bootstrap/dist/fonts/*.svg',
              './app/bower_components/bootstrap/dist/fonts/*.ttf',
              './app/bower_components/bootstrap/dist/fonts/*.woff',
              './app/bower_components/fontawesome/css/font-awesome.css',
              './app/bower_components/bootstrap/dist/css/bootstrap.css',
              ], {base: './app'})
    .pipe(gulp.dest('build/'));
});

gulp.task('usemin', function() {
    gulp.src(['./app/index.html',
              '!./app/bower_components/fontawesome/css/font-awesome.css',
              '!./app/bower_components/bootstrap/dist/css/bootstrap.css'],
              {base: './app'})
    .pipe(usemin({
        css: [minifyCss(), 'concat', rev()],
        //js: [uglify(), rev()]
        //js: [uglify({mangle: false, preserveComments: 'some'}), rev()]
        js: [uglify({preserveComments: 'some'}), rev()]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('connect', function() {
    connect.server({
        root: 'app/'
    });
});

// Default Task
gulp.task('default', ['connect']);
gulp.task('build', ['copy-html-files', 'usemin']);
