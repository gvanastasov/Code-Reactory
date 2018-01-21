module.exports = {
    paths: {
        tasks: './src/js/gulp/tasks/',
        js: {
            src: './src/js/',
            dist: './dist/'
        },
        css: {
            src: './src/css/',
            dist: './dist/'
        }
    },
    filenames: {
        externalsBundle: 'vendors.js'
    },
    vendors: ['vue', 'gl-matrix']
}