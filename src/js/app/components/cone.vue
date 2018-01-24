<template>
    <div v-show="false">
        simple cone
    </div>
</template>

<script>

	var utils = new utilsObject();
	
	function utilsObject(){}
utilsObject.prototype.getShader = function(gl, id) {
       var script = document.getElementById(id);
       if (!script) {
           return null;
       }

		var str = "";
		var k = script.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (script.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (script.type == "x-shader/x-vertex") {
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
    
    utils.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           window.setTimeout(callback, 1000/60);
         };
    })();
    

export default {
    name: 'cone',

    data: function(){
        return {
            vertices: [
                1.5, 0, 0, 
                -1.5, 1, 0, 
                -1.5, 0.809017,  0.587785,
                -1.5, 0.309017,  0.951057, 
                -1.5, -0.309017, 0.951057, 
                -1.5, -0.809017, 0.587785,
                -1.5, -1, 0.0, 
                -1.5, -0.809017, -0.587785,
                -1.5, -0.309017, -0.951057, 
                -1.5, 0.309017,  -0.951057, 
                -1.5, 0.809017,  -0.587785
            ],
            indices: [
                0, 1, 2,
                0, 2, 3,
                0, 3, 4,
                0, 4, 5,
                0, 5, 6,
                0, 6, 7,
                0, 7, 8,
                0, 8, 9,
                0, 9, 10,
                0, 10, 1
            ],
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
            renderLoop();
        },
        renderLoop: function (){
            utils.requestAnimFrame(this.renderLoop);
            draw();
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
            var frag = utils.getShader(gl, 'shader-fs');
            var vert = utils.getShader(gl, 'shader-vs');

            var prg = gl.createProgram();
            gl.attachShader(prg, frag);
            gl.attachShader(prg, frag);
            gl.linkProgram(prg);

            if(!gl.getProgramParameter(prg, gl.LINK_STATUS)){
                console.error('could not initialize shaders');
            }

            gl.useProgram(prg);

            prg.vertexPositionAttribute = gl.getAttribLocation(prg, 'aVertexPosition');
            prg.pMatrixUniform = gl.getUniformLocation(prg, 'uPMatrix');
            prg.mvMatrixUniform = gl.getUniformLocation(prg, 'uMVMatrix');

            this.$ctx.prg = prg;
        },

        draw: function(){
            var gl = this.$ctx.gl;
            var prg = this.$ctx.prg;

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.viewport(0, 0, 800, 600);

            mat4.perspective(45, 800 / 600, 0.1, 10000.0, this.pMatrix);
            mat4.identity(this.mvMatrix);	
            mat4.translate(this.mvMatrix, [0.0, 0.0, -5.0]);

            gl.uniformMatrix4fv(prg.pMatrixUniform, false, this.pMatrix);
            gl.uniformMatrix4fv(prg.mvMatrixUniform, false, this.mvMatrix);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.VBO);
            gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(prg.vertexPositionAttribute);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.IBO);
            gl.drawElements(gl.LINE_LOOP, this.indices.length, gl.UNSIGNED_SHORT,0);
        }
    }
}
</script>