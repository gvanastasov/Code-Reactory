import Vue from 'vue';

import WebGL from './components/webgl.vue';

var app = new Vue({
    el: '#app',
    components: {
        'web-gl': WebGL
    },
    mounted: function(){
        console.log('application mounted.');
    }
});