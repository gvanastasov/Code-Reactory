const configPath = './src/gulp/config.js';

var config     = require(configPath),
    gulp       = require('gulp'),
    livereload = require('gulp-livereload'),
    webserver  = require('gulp-webserver'),
    del        = require('del'),
    browserify = require('browserify'),
    vueify     = require('vueify'),
    babelify   = require('babelify'),
    envify     = require('envify/custom'),
    source     = require('vinyl-source-stream'),
    clean      = require('gulp-rimraf');

var plugins = require('gulp-load-plugins')();

gulp.task('default', ['build'], function() {
    gulp.start('watch', 'webserver');
});

gulp.task('build', ['clean'], function(){
    gulp.start(['app', 'vendors', 'sass']);
});

// todo: put in a file
gulp.task('watch', function(){
    livereload.listen();
    
    gulp.watch(config.paths.js.src + '**/*.js', ['app']);
    gulp.watch(config.paths.css.src + '**/*.{sass,scss}', ['sass']);
    
    gulp.watch(['dist/**']).on('change', livereload.changed);
});

// todo: put in a file
gulp.task('webserver', function() {
    gulp.src('.')
      .pipe(webserver({
        fallback: 'index.html',
        port: 8081,
        livereload: true,
        directoryListing: false,
        open: true
    }));
});

// todo: put in a file
gulp.task('clean', function() {
    return gulp.src('./dist/*', {read: false}).pipe(clean());
});

// todo: loop tasks
gulp.task('app', function(){
    return getTask('app');
});
gulp.task('vendors', function(){
    return getTask('vendors');
});
gulp.task('sass', function(){
    return getTask('sass');
});

// todo: get rid of
function getTask(name) {
    return require(config.paths.tasks + name)(gulp, plugins);
}