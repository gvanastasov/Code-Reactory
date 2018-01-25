import SceneComponent from './components/scene.vue';

import context from './context.js';

export default {
    install : function (Vue, options) {

        var requestAnimFrame = function(o){
            requestAnimFrame(o);
        }
        
        requestAnimFrame = (function() {
        
            if(window.requestAnimationFrame){
                return window.requestAnimationFrame;
            }
        
            var crossBrowserPrefixes = ['webkit', 'moz', 'o', 'ms'];
        
            for(var i = 0; i < crossBrowserPrefixes.length; i++){
                var animFrameKey = crossBrowserPrefixes[i] + 'RequestAnimationFrame';
        
                if(window[animFrameKey]){
                    return window[animFrameKey];
                }
            }
        
            return function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                window.setTimeout(callback, 1000/60);
            };
        })();

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
        
        Vue.component(SceneComponent.name, SceneComponent);

        Vue.mixin({ beforeMount: injectContext });

        // todo: arguments check, warnings and etc.
        function injectContext() {
            const options = this.$options;
            
            // injection
            if (options.name === 'scene') {
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