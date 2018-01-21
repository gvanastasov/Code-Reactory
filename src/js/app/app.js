import Vue from 'vue';

import WebGL from './components/web-gl.vue';
import webglplugin from './plugins/webgl/webgl.js';

Vue.use(webglplugin);

var app = new Vue({
    el: '#app',
    components: {
        "web-gl": WebGL
    },
    mounted: function(){
        console.log('application mounted.');
    }
});