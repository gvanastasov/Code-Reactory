import Vue from 'vue';

window.addEventListener('load', function() {
    var app = new Vue({
        el: '#app',
        mounted: function(){
            console.log('vue testing');
        }
    });
});