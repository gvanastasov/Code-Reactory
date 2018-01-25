import Vue from 'vue';

import Vuex from 'vuex';
import StoreObj from './store/store.js';

import VueBox from '../plugins/vue-box/index.js';

Vue.use(Vuex);
Vue.use(VueBox);

Vue.config.debug = true;
Vue.config.devTools = true;

var app = new Vue({
    el: '#app',
    store: new Vuex.Store(StoreObj),
    mounted: function(){
        console.log('application mounted.');
    }
});