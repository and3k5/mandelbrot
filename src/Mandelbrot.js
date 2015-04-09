function Mandelbrot() {
	
}

Mandelbrot.COLORMAP = {};

Mandelbrot.COLORMAP.COLORED = function COLORED(i) {
	var result = [0,0,0];
	
	if(i != this.maxIteration) {
		var c = 3 * Math.log(i)/Math.log(this.maxIteration - 1.0);
		if (c < 1) {
			result[0] = 255*c;
			return result;
		}
		result[0] = 255;
		result[1] = 255;
		if ( c < 2 ) {
			result[1] *= c-1;
		}else{
			result[2] = 255*(c-2);
		}
		return result;
	}
	return result;
};

Mandelbrot.COLORMAP.DEFAULT = function DEFAULT(i) {
	var scale = ((i/this.maxIteration)*255)&255;
	return [scale,scale,scale];
};

Mandelbrot.prototype.colorMap = Mandelbrot.COLORMAP.DEFAULT;


Mandelbrot.prototype.maxIteration = 1024;
Mandelbrot.prototype.width = 100;
Mandelbrot.prototype.height = 100;

Mandelbrot.prototype.toObj = function () {
	return {width:this.width,height:this.height,maxIteration:this.maxIteration,colorMap:this.colorMap.name};
};

Mandelbrot.prototype.getIterations = function () {
	var width			=	this.width,
		height			=	this.height,
		maxIteration	=	this.maxIteration,
		iteration,
		pos				=	0,
		result			= [];
	
	for (var x,y=0;y<height;y++) {
        for (x=0;x<width;x++) {        
        	iteration = 0;
        	var i=0,j=0;
			while(iteration++ < maxIteration) {
				var a = i * i - j * j + ((x << 1) - 1.5 * width) / width;
				j = 2 * i * j + ((y << 1) - height) / height;
				i = a;
				if (i * i + j * j > 4) { 
					break;
				}
			}
			result[pos++]=iteration;
        }
	}
	
	
	return result;
};

Mandelbrot.prototype.render = function (element) {
    var ctx=element.getContext("2d");
    
    var imagedata = ctx.createImageData(this.width,this.height);
    
    
    var iterations = this.getIterations();
    
    for (var i = 0,len=iterations.length;i<len;i++) {
        var d = this.colorMap(iterations[i]);
        imagedata.data[i*4+0]=d[0];
        imagedata.data[i*4+1]=d[1];
        imagedata.data[i*4+2]=d[2];
        imagedata.data[i*4+3]=255;
    }
    
    ctx.putImageData(imagedata,0,0);
};

var SETOBJ = 0;
var RENDER = 1;
var DONE = 2;

if (!this.window&&this.constructor.name.toLowerCase().indexOf("worker")!=-1) {
	var current = null;
	
	Mandelbrot.prototype.render = function (buffer) {
	    var imagedatadata = new Uint8Array(buffer);
	    
	    var iterations = this.getIterations();
	    
	    for (var i = 0,len=iterations.length;i<len;i++) {
	        var d = this.colorMap(iterations[i]);
	        imagedatadata[i*4+0]=d[0];
	        imagedatadata[i*4+1]=d[1];
	        imagedatadata[i*4+2]=d[2];
	        imagedatadata[i*4+3]=255;
	    }
	};
	
	this.onmessage = function (e) {
		var command = e.data.cmd;
		
		switch (command) {
			case SETOBJ:
				var mandelbrot_obj = e.data.mandelbrot;
				var mandelbrot = new Mandelbrot();
				for (var i in mandelbrot_obj) {
					mandelbrot[i] = mandelbrot_obj[i];
				}
				
				mandelbrot.colorMap = Mandelbrot.COLORMAP[mandelbrot.colorMap];
				
				current=mandelbrot;
				break;
			case RENDER:
				var buffer = e.data.buffer;
				current.render(buffer);
				postMessage({cmd:DONE});
				break;
		}
	};
}
