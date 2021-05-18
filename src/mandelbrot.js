export class Mandelbrot {
	constructor() {
		this.colorMap = Mandelbrot.COLORMAP.DEFAULT;
		this.maxIteration = 1024;
		this.width = 100;
		this.height = 100;
	}

    toObj() {
        return {width:this.width,height:this.height,maxIteration:this.maxIteration,colorMap:this.colorMap.name};
    }

    getIterations() {
        const width			=	this.width;
        const height			=	this.height;
        const maxIteration	=	this.maxIteration;
        let iteration;
        let pos				=	0;
        const result			= [];

        for (let x, y=0;y<height;y++) {
            for (x=0;x<width;x++) {
                iteration = 0;
                let i=0;
                let j=0;
                while(iteration++ < maxIteration) {
                    const a = i * i - j * j + ((x << 1) - 1.5 * width) / width;
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
    }

    async renderElement(element) {
        const ctx=element.getContext("2d");
        
        const imagedata = ctx.createImageData(this.width,this.height);
        
        const iterations = this.getIterations();
        
        for (let i = 0, len=iterations.length;i<len;i++) {
            const d = this.colorMap(iterations[i]);
            imagedata.data[i*4+0]=d[0];
            imagedata.data[i*4+1]=d[1];
            imagedata.data[i*4+2]=d[2];
            imagedata.data[i*4+3]=255;
        }
        
        ctx.putImageData(imagedata,0,0);
    }

    renderBuffer(buffer) {
	    const imagedatadata = new Uint8Array(buffer);
	    
	    const iterations = this.getIterations();
	    
	    for (let i = 0, len=iterations.length;i<len;i++) {
	        const d = this.colorMap(iterations[i]);
	        imagedatadata[i*4+0]=d[0];
	        imagedatadata[i*4+1]=d[1];
	        imagedatadata[i*4+2]=d[2];
	        imagedatadata[i*4+3]=255;
	    }
	}
}

Mandelbrot.COLORMAP = {};

import { Colored, Default } from "./colormaps";

Mandelbrot.COLORMAP.COLORED = Colored;

Mandelbrot.COLORMAP.DEFAULT = Default;


