var config = require('../config.js');

module.exports = function(gulp, plugins){
    gulp.src(config.paths.sass.src + 'main.scss')
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(config.paths.sass.dist));
}