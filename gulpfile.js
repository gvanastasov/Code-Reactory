const configPath = './src/js/gulp/config.js';

var config     = require(configPath),
    gulp       = require('gulp'),
    livereload = require('gulp-livereload'),
    webserver  = require('gulp-webserver'),
    del        = require('del'),
    browserify = require('browserify'),
    vueify     = require('vueify'),
    babelify   = require('babelify'),
    envify     = require('envify/custom'),
    source     = require('vinyl-source-stream'),
    clean      = require('gulp-rimraf'),
    fs         = require('fs');

var plugins = require('gulp-load-plugins')();

gulp.task('default', ['build'], function() {
    return gulp.start('watch');
});

gulp.task('build', ['clean'], function(){
    gulp.start(['app', 'vendors', 'sass']);
});

// todo: put in a file
gulp.task('watch', function(){
    livereload.listen();
    
    gulp.watch(config.paths.js.src + '**/*.{js,vue}', ['app']);
    gulp.watch(config.paths.css.src + '**/*.{sass,scss}', ['sass']);
    
    gulp.watch(['./dist/**', './index.html']).on('change', livereload.changed);

    gulp.start('webserver');
});

// todo: put in a file
gulp.task('webserver', function() {
    gulp.src('.')
      .pipe(webserver({
        fallback: 'index.html',
        port: 8081,
        livereload: true,
        directoryListing: false,
        open: true
    }));
});

// todo: put in a file
gulp.task('clean', function() {
    return gulp.src('./dist/*', {read: false}).pipe(clean());
});

// todo: loop tasks
gulp.task('app', function(){
    return getTask('app');
});
gulp.task('vendors', function(){
    return getTask('vendors');
});
gulp.task('sass', function(){
    return getTask('sass');
});

// todo: get rid of
function getTask(name) {
    return require(config.paths.tasks + name)(gulp, plugins);
}

gulp.task('shaders', function(){
    var shaders = {};

    shaders.default = {
        vert:  fs.readFileSync("./src/js/plugins/vue-box/shaders/vert.glsl", "utf8"),
        frag:  fs.readFileSync("./src/js/plugins/vue-box/shaders/frag.glsl", "utf8")
    }

    var result = 'export default ' + JSON.stringify(shaders);
    fs.writeFileSync('./src/js/plugins/vue-box/shaders.js', result);
});

