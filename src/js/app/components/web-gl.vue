<script>
import scene from './scene.vue';
import quad from './quad.vue';

const contextOptions = [
    'webgl',
    'experimental-webgl',
    'webkit-3d',
    'moz-webgl'
];

var gl = {
    ctx: null,
    clearColor: function() {
        return this.ctx.COLOR_CLEAR_VALUE;
    }
}

export default {
    name: 'web-gl',
    gl,
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
            gl: null,
            glContextName: '',
            available: false
        };
    },

    mounted: function() {
        console.log('webgl element mounted');

        this.elements.canvas = this.$el.querySelector('canvas');

        if(this.elements.canvas == null){
            // todo: handle missing canvas, even if template requires it
            return;
        }
        
        this.gl = this._getGlContext();

        if(this.gl == null) {
            console.warn('WebGL is not available');
        } else {
            this.available = true;

            this.$store.dispatch('initWebGL', this.gl);
            this.$gl.c = this.gl;

            this.$bus.$emit('my-event', this.gl);
            console.log('WebGL context initialized...');
        }
        console.log(this.$gl);

    },

    created: function() {
        // from chapter 1
        window.addEventListener('keypress', this._changeClearColor, false);

        console.log('webgl element created');
        
    },

    methods: {
        _getGlContext: function() {
            var gl = null;
            for(var i = 0; i < contextOptions.length; i++) {
                var name = contextOptions[i];
                try {
                    gl = this.elements.canvas.getContext(name);    
                } catch (e) {
                    // todo: handle errors
                }
                if(gl) {
                    this.glContextName = name;
                    break;
                }
            }
            return gl;
        },

        _clear: function() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.viewport(0, 0, this.width, this.height);
        },

        _changeClearColor: function(e) {
            if(e.keyCode){
                switch(e.keyCode){
                    case 49: { // 1
                        this.gl.clearColor(0.3, 0.7, 0.2, 1.0);
                        this._clear();
                        break;
                    }
                    case 50: { // 2
                        this.gl.clearColor(0.3, 0.2, 0.7, 1.0);
                        this._clear();
                        break;
                    }
                    case 51: { // 3
                        var color = this.gl.getParameter(this.gl.COLOR_CLEAR_VALUE);

                        console.log('clear color = ' + color);
                        break;
                    }
                }
            }
        }
    }
};
</script>