export default {
    install : function (Vue, options) {
        const version = Number(Vue.version.split('.')[0]);
        Vue.mixin({ beforeCreate: webgl })

        function webgl() {
            const options = this.$options;

            // injection
            if (options.webgl) {
                this.$webgl = typeof options.webgl === 'function' 
                    ? options.webgl() 
                    : options.webgl;
            } else if (options.parent && options.parent.$webgl) {
                this.$webgl = options.parent.$webgl
            }
        }
    }
}