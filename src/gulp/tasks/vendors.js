const configPath = '../config.js';

var config     = require(configPath),
    browserify = require('browserify'),
    vueify     = require('vueify'),
    babelify   = require('babelify'),
    envify     = require('envify/custom'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer');

module.exports = function(gulp, plugins){
    const bundle = browserify({
        global: true,
        transform: [
            vueify, 
            babelify, 
            envify({ NODE_ENV: 'production' })] 
    });

    config.vendors.forEach(lib => { bundle.require(lib) });

    bundle.bundle()
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.paths.js.dist));
}