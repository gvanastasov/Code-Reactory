<template>
    <div v-show="false">
        simple quad
    </div>
</template>

<script>
export default {
    name: 'quad',

    created: function() {
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
        gl_init: function($event) {
            this.$ctx.gl.clearColor(0.3, 0.7, 0.2, 1.0);
            this.$ctx.gl.clear(this.$ctx.gl.COLOR_BUFFER_BIT);
        }
    }
}
</script>