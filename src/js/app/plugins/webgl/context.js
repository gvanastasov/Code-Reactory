var _ctxObject = {
    gl: null,
    options: [
        'webgl',
        'experimental-webgl',
        'webkit-3d',
        'moz-webgl'
    ],
    type: '',
    available: false,

    clearWithColor: function(color) {
        this.gl.clearColor(
            Math.round(color[0]*100)/100,
            Math.round(color[1]*100)/100,
            Math.round(color[2]*100)/100,
            Math.round(color[3]*100)/100);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}

_ctxObject.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           window.setTimeout(callback, 1000/60);
         };
})();

_ctxObject.renderLoop = function(draw) {
    this.requestAnimFrame(this.renderLoop);
    draw();
}

Object.defineProperty(_ctxObject, 'clearColor', {
    get: function(){
        return this.gl.getParameter(this.gl.COLOR_CLEAR_VALUE);
    }
});

export default _ctxObject;