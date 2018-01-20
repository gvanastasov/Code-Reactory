const configPath = './src/gulp/config.js';

var gulp         = require('gulp'),
    config       = require(configPath);

var plugins = require('gulp-load-plugins')();

gulp.task('default', ['build', 'watch']);

gulp.task('app', getTask('app'));
gulp.task('vendors', getTask('vendors'));
gulp.task('scripts', ['app', 'vendors']);

gulp.task('sass',    getTask('sass'));

gulp.task('build',   ['scripts', 'sass']);

gulp.task('watch', function(){
    gulp.watch(config.paths.js.src + '**/*.js', ['scripts']);
    gulp.watch(config.paths.css.src + '**/*.{sass,scss}', ['sass']);
});

function getTask(name) {
    return require(config.paths.tasks + name)(gulp, plugins);
}