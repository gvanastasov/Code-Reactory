module.exports = {
    paths: {
        tasks: './src/gulp/tasks/',
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