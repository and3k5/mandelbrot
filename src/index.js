import 'bootstrap/dist/css/bootstrap.min.css';
import { SETOBJ, RENDER, DONE } from "./constants";
import { Mandelbrot } from "./mandelbrot";

const worker = new Worker(new URL('./worker.js', import.meta.url));
worker.onmessage = ({data}) => {
    const command = data.cmd;
    switch (command) {
        case DONE:
            if (imagedata != null) {
                console.log(imagedata);
                canvas.getContext("2d").putImageData(imagedata, 0, 0);
            }
            break;
    }
}

import { all, getColorMapByName } from "./colormaps"

const colorSelector = document.querySelector("#colormap");

for (const colorMap of all) {
    const option = new Option();
    option.value = colorMap.name;
    option.textContent = colorMap.name;
    colorSelector.add(option);
}

colorSelector.options[0].selected = true;

var canvas = document.querySelector("canvas");
var imagedata = null;

document.querySelector("button#submit").addEventListener("click", () => {
    const WIDTH = document.querySelector("input#width").value;
    const HEIGHT = document.querySelector("input#height").value;
    const MAXITER = document.querySelector("input#maxIter").value;
    const SCALE = document.querySelector("input#scale").value;
    const COLORMAP = getColorMapByName(colorSelector.value);
    const METHOD = document.querySelector("select#method").value;

    const mandelbrot = new Mandelbrot();
    mandelbrot.width = WIDTH;
    mandelbrot.height = HEIGHT;
    mandelbrot.maxIteration = MAXITER;
    mandelbrot.colorMap = COLORMAP;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    switch (METHOD) {
        case "script":
            console.log("render");
            mandelbrot.renderElement(canvas);
            break;
        case "worker":
            const ctx = canvas.getContext("2d");
            imagedata = ctx.createImageData(WIDTH, HEIGHT);

            worker.postMessage({ cmd: SETOBJ, mandelbrot: mandelbrot.toObj() });
            worker.postMessage({ cmd: RENDER, buffer: imagedata.data.buffer }, [imagedata.data.buffer]);
            break;
    }
});