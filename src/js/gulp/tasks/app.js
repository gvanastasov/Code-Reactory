const configPath = '../config.js';

var config     = require(configPath),
    browserify = require('browserify'),
    vueify     = require('vueify'),
    babelify   = require('babelify'),
    envify     = require('envify/custom'),
    source     = require('vinyl-source-stream');

module.exports = function(gulp, plugins){
    browserify({
        global: true,
        entries: config.paths.js.src + 'app.js',
        transform: [
            vueify, 
            babelify, 
            envify({ NODE_ENV: 'production' })]
    })
    .external(config.vendors)
    .bundle()
    .on('error', function(error){
        plugins.gutil.log("Browserify Error", plugins.gutil.colors.red(err.message))
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest(config.paths.js.dist));
}