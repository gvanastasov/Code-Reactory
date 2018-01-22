export default {
    install : function (Vue, options) {
        Vue.mixin({ beforeMount: registerGL });

        function registerGL() {
            const options = this.$options;

            // injection
            if (options.gl) {
                console.log('assign gl');
                
                options.gl.init = new Event('_gl_init');

                this.$gl = options.gl;

                Object.defineProperty(this.$gl, 'c', {
                    get: function() {
                        console.log('get the ctx');
                        return this.ctx;
                    },
                    set: function(x) {
                        console.log('setting the ctx');
                        this.ctx = x;
                    }
                });


            } else if (options.parent && options.parent.$gl) {
                console.log('inject gl');
                this.$gl = options.parent.$gl;
            }
        }
    }
}