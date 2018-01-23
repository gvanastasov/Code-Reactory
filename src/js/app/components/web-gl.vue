<script>
import scene from './scene.vue';
import quad from './quad.vue';

export default {
    name: 'web-gl',

    components: {
        scene,
        quad
    },

    props: {
        width: {
            type: Number,
            default: 800
        },
        height: {
            type: Number,
            default: 600
        }
    },

    data: function() {
        return {
            elements: {
                canvas: null
            },
        };
    },

    mounted: function() {
        this.elements.canvas = this.$el.querySelector('canvas');

        if(this.elements.canvas == null){
            // todo: handle missing canvas, even if template requires it
            return;
        }
        
        var gl = this._getGlContext();

        if(gl == null) {
            console.warn('WebGL is not available');
        } else {
            this.$ctx.gl = gl;
            this.$ctx.available = true;

            this.$bus.$emit('_gl_init', this.$ctx.gl);
            console.log('WebGL context initialized...');
        }
    },

    created: function() {
        // from chapter 1
        window.addEventListener('keypress', this._changeClearColor, false);
    },

    methods: {
        _getGlContext: function() {
            var gl = null;
            for(var i = 0; i < this.$ctx.options.length; i++) {
                var name = this.$ctx.options[i];
                try {
                    gl = this.elements.canvas.getContext(name);    
                } catch (e) {
                    // todo: handle errors
                }
                if(gl) {
                    this.$ctx.type = name;
                    break;
                }
            }
            return gl;
        },

        _clear: function() {
            this.$ctx.gl.clearColor(0.3, 0.7, 0.2, 1.0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.viewport(0, 0, this.width, this.height);
        },

        _changeClearColor: function(e) {
            if(e.keyCode){
                switch(e.keyCode){
                    case 49: { // 1
                        var greenish = vec4.fromValues(0.3, 0.7, 0.2, 1.0);
                        this.$ctx.clearWithColor(greenish);
                        break;
                    }
                    case 50: { // 2
                        var blueish = vec4.fromValues(0.7, 0.3, 0.2, 1.0);
                        this.$ctx.clearWithColor(blueish);
                        break;
                    }
                    case 51: { // 3
                        console.log('clear color = ' + this.$ctx.clearColor);
                        break;
                    }
                }
            }
        }
    }
};
</script>