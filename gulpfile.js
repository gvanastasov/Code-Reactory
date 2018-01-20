var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    config       = require('./js/gulp/config.js');

var plugins = require('gulp-load-plugins')();

gulp.task('scripts', getTask('scripts'));
gulp.task('sass',    getTask('sass'));
gulp.task('build',   ['scripts', 'sass']);
gulp.task('default', ['build', 'watch']);

gulp.task('watch-js', function(){
    gulp.watch(config.paths.js.src + '**/*.js', ['scripts']);
});
gulp.task('watch-sass', function(){
    gulp.watch(config.paths.sass.src + '**/*.{sass,scss}', ['sass']);
});
gulp.task('watch', ['watch-js', 'watch-sass']);

function getTask(name) {
    return require(config.paths.tasks + name)(gulp, plugins);
}