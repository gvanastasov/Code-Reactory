var config = require('../config.js');

module.exports = function(gulp, plugins){
    gulp.src(config.paths.js.src + 'main.js')
    .pipe(gulp.dest(config.paths.js.dist));
}