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
    })
    .external(config.vendors)
    .transform([
        vueify, 
        babelify, 
        envify({ NODE_ENV: 'production' })]) 
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(config.paths.js.dist));
}