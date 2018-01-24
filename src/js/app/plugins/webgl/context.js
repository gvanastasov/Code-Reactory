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

Object.defineProperty(_ctxObject, 'clearColor', {
    get: function(){
        return this.gl.getParameter(this.gl.COLOR_CLEAR_VALUE);
    }
});

export default _ctxObject;