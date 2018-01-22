<template>
    <div v-cloak>
        simple quad
    </div>
</template>

<script>
export default {
    name: 'quad',

    mounted: function() {
        // this.$gl.ctx.clearColor(0.3, 0.7, 0.2, 1.0);
        // this.$gl.ctx.clear(this.gl.ctx.COLOR_BUFFER_BIT);
        this.$el.addEventListener('_gl_init', function(e){
            console.log('quad init gl:' + e);
        }, false);
    },

    created: function() {
        this.$bus.$on('my-event', this._gl_init);
    },

    data: function(){
        return {
            vertices: [
                -50.0, 50.0, 0.0, 
                -50.0,-50.0, 0.0, 
                50.0,-50.0, 0.0, 
                50.0, 50.0, 0.0
            ]
        }
    },

    methods: {
        _gl_init: function($event) {
            console.log('Quad recieved event', $event)

            $event.clearColor(0.3, 0.7, 0.2, 1.0);
            $event.clear($event.COLOR_BUFFER_BIT);
        }
    }
}
</script>