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

for (const i in Mandelbrot.COLORMAP) {
    const option = new Option();
    option.value = i;
    option.textContent = i;
    document.querySelector("#colormap").add(option);
}

document.querySelector("#colormap").querySelector("option[value=DEFAULT]").selected = true;

var canvas = document.querySelector("canvas");
var imagedata = null;

document.querySelector("input#submit").addEventListener("click", () => {
    const WIDTH = document.querySelector("input#width").value;
    const HEIGHT = document.querySelector("input#height").value;
    const MAXITER = document.querySelector("input#maxIter").value;
    const SCALE = document.querySelector("input#scale").value;
    const COLORMAP = Mandelbrot.COLORMAP[document.querySelector("select#colormap").value];
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