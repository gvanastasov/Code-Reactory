<script>
import quad from './quad.vue';

export default {
    name: 'scene',

    components: {
        quad,
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

            this.$ctx.width = this.width;
            this.$ctx.height = this.height;

            this.$bus.$emit('_gl_init', this.$ctx.gl);
            console.log('WebGL context initialized...');
        }
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
        }
    }
};
</script>