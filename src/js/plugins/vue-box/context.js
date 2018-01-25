import shaders from './shaders.js'

var _ctx = {
    gl: null,
    options: [
        'webgl',
        'experimental-webgl',
        'webkit-3d',
        'moz-webgl'
    ],
    type: '',
    available: false,
    width: 0,
    height: 0,

    clearWithColor: function(color) {
        this.gl.clearColor(
            Math.round(color[0]*100)/100,
            Math.round(color[1]*100)/100,
            Math.round(color[2]*100)/100,
            Math.round(color[3]*100)/100);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    },

    getShader: function(gl, t) {

        var str = shaders.default[t];
    
        var shader;
        if (t == "frag") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (t == "vert") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }
    
        gl.shaderSource(shader, str);
        gl.compileShader(shader);
    
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }
}


_ctx.renderLoop = function(draw, utils) {
    console.log(this);
    
    utils.requestAnimFrame(this.renderLoop);
    console.log('frame');
}

Object.defineProperty(_ctx, 'clearColor', {
    get: function(){
        return this.gl.getParameter(this.gl.COLOR_CLEAR_VALUE);
    }
});

export default _ctx;