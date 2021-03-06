module.exports = {
    paths: {
        tasks: './src/js/gulp/tasks/',
        js: {
            src: './src/js/app/',
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
    vendors: ['vue', 'vuex', 'gl-matrix']
}