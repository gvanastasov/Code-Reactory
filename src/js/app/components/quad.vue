<template>
    <div v-show="false">
        simple cone
    </div>
</template>

<script>
import shaders from '../plugins/webgl/shaders.js'

var utils = new utilsObject();
	
function utilsObject(){}
utilsObject.prototype.getShader = function(gl, t) {

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

utilsObject.prototype.requestAnimFrame = function(o){
    requestAnimFrame(o);
}

utilsObject.prototype.requestAnimFrame = (function() {

    if(window.requestAnimationFrame){
        return window.requestAnimationFrame;
    }

    var crossBrowserPrefixes = ['webkit', 'moz', 'o', 'ms'];

    for(var i = 0; i < crossBrowserPrefixes.length; i++){
        var animFrameKey = crossBrowserPrefixes[i] + 'RequestAnimationFrame';

        if(window[animFrameKey]){
            return window[animFrameKey];
        }
    }

    return function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
        window.setTimeout(callback, 1000/60);
    };
})();

export default {
    name: 'quad',

    data: function(){
        return {
            vertices: [
                -0.5,0.5,0.0, 	//Vertex 0
		-0.5,-0.5,0.0, 	//Vertex 1
		0.5,-0.5,0.0, 	//Vertex 2
		0.5,0.5,0.0 	//Vertex 3
            ],
            indices: [3,2,1,3,1,0],
            buffers: {
                VBO: null, // Vertex Buffer Object
                IBO: null  // Index Buffer Object
            },
            mvMatrix: null,
            pMatrix: null
        }
    },

    methods: {
        gl_init: function($event) {
            

            console.log('cone gl init callback');
            this._init_program();
            this._init_buffers();
            this.renderLoop();
            //this.$ctx.renderLoop(this.draw, utils);
        },
        renderLoop: function (){
            utils.requestAnimFrame.call(window, this.renderLoop);
            this.draw();
        },

        draw: function(){
            var gl = this.$ctx.gl;
            var prg = this.$ctx.prg;

            var c_width = 800;
            var c_height = 500;

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);
        
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.viewport(0,0,c_width, c_height);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.VBO);
            gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(prg.vertexPosition);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.IBO);
            gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT,0);
        },
        _init_buffers: function(){
            var gl = this.$ctx.gl;

            this.buffers.VBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.VBO);
            gl.bufferData(
                gl.ARRAY_BUFFER, 
                new Float32Array(this.vertices), 
                gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            this.buffers.IBO = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.IBO);
            gl.bufferData(
                gl.ELEMENT_ARRAY_BUFFER, 
                new Uint16Array(this.indices), 
                gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        },
        _init_program(){
            var gl = this.$ctx.gl;
            var fgShader = utils.getShader(gl, "frag");
            var vxShader = utils.getShader(gl, "vert");

            var prg = gl.createProgram();
            gl.attachShader(prg, vxShader);
            gl.attachShader(prg, fgShader);
            gl.linkProgram(prg);

            if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
                alert("Could not initialise shaders");
            }

            gl.useProgram(prg);

            //The following lines allow us obtaining a reference to the uniforms and attributes defined in the shaders.
            //This is a necessary step as the shaders are NOT written in JavaScript but in a 
            //specialized language called GLSL. More about this on chapter 3.
            prg.vertexPosition = gl.getAttribLocation(prg, "aVertexPosition");

            this.$ctx.prg = prg;
        }
    }
}
</script>