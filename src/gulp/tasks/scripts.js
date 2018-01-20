const configPath = '../config.js';

var config     = require(configPath),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream');

module.exports = function(gulp, plugins){
    browserify(config.paths.js.src + 'app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(config.paths.js.dist));
}