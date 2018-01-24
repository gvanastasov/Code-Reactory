
import Vue from 'vue';

import Vuex from 'vuex';
import webglplugin from './plugins/webgl/webgl.js';

import WebGL from './components/web-gl.vue';

import StoreObj from './store/store.js';

Vue.use(Vuex);

Vue.config.debug = true;
Vue.config.devTools = true;

Vue.use(webglplugin);

var app = new Vue({
    el: '#app',
    components: {
        "web-gl": WebGL
    },
    store: new Vuex.Store(StoreObj),
    mounted: function(){
        console.log('application mounted.');
    }
});



