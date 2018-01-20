var config = require('../config.js');

module.exports = function(gulp, plugins){
    gulp.src(config.paths.css.src + 'main.scss')
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(config.paths.css.dist));
}