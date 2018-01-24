import context from './context.js';

export default {
    install : function (Vue, options) {

        (function createBus() {
            const EventBus = new Vue()
    
            Object.defineProperties(Vue.prototype, {
                $bus: {
                    get: function () {
                        return EventBus
                    }
                }
            })
        })();

        Vue.mixin({ beforeMount: injectContext });

        // todo: arguments check, warnings and etc.
        function injectContext() {
            const options = this.$options;
            
            // injection
            if (options.name === 'web-gl') {
                this.$ctx = context;
            } else if (options.parent && options.parent.$ctx) {
                this.$ctx = options.parent.$ctx;
                
                // event handlers if present on instance
                if(this.gl_init){
                    this.$bus.$on('_gl_init', this.gl_init);
                }
            }
        }
    }
}