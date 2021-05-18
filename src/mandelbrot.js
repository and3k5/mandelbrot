import { getIterations } from "./calculate/iterate";

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
        return getIterations({ width: this.width, height: this.height, maxIteration: this.maxIteration });
    }

    async renderElement(element) {
        return await renderCanvasElement({ element, width: this.width, height: this.height, colorMap: this.colorMap, iterations: this.getIterations(), maxIterations: this.maxIteration });
    }

    renderBuffer(buffer) {
        return renderBuffer({ buffer,colorMap: this.colorMap, iterations: this.getIterations(), maxIterations: this.maxIteration });
	}
}

Mandelbrot.COLORMAP = {};

import { Colored, Default } from "./colormaps";
import { renderBuffer, renderCanvasElement } from "./render";

Mandelbrot.COLORMAP.COLORED = Colored;

Mandelbrot.COLORMAP.DEFAULT = Default;


