import Vue from 'vue';
import Vuex from 'vuex';

import WebGL from './components/web-gl.vue';
import webglplugin from './plugins/webgl/webgl.js';
Vue.use(webglplugin);

import StoreObj from './store/store.js';

Vue.use(Vuex);

Vue.config.debug = true;
Vue.config.devTools = true;

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

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