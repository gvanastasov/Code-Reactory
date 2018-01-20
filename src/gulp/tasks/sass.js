const configPath = '../config.js';

var config     = require(configPath);

module.exports = function(gulp, plugins){
    gulp.src(config.paths.css.src + 'main.scss')
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(plugins.rename('styles.css'))
    .pipe(gulp.dest(config.paths.css.dist));
}