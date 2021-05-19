import 'bootstrap/dist/css/bootstrap.min.css';
import { CALC, DONE } from "./constants";

const worker = new Worker(new URL('./worker.js', import.meta.url));

import { all, getColorMapByName } from "./colormaps"
import { renderCanvasElement } from './render';
import { getIterations } from './calculate/iterate';

const colorSelector = document.querySelector("#colormap");

for (const colorMap of all) {
    const option = new Option();
    option.value = colorMap.name;
    option.textContent = colorMap.name;
    colorSelector.add(option);
}

colorSelector.options[0].selected = true;

var canvas = document.querySelector("canvas");

document.querySelector("button#submit").addEventListener("click", () => {
    const WIDTH = document.querySelector("input#width").value;
    const HEIGHT = document.querySelector("input#height").value;
    const MAXITER = document.querySelector("input#maxIter").value;
    const COLORMAP = getColorMapByName(colorSelector.value);
    const METHOD = document.querySelector("select#method").value;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    switch (METHOD) {
        case "script":
            console.log("render");
            requestAnimationFrame(function () {
                var iterations = getIterations({ width: WIDTH, height: HEIGHT, maxIteration: MAXITER });
                renderCanvasElement({ element: canvas, width: WIDTH, height: HEIGHT, colorMap: COLORMAP, iterations: iterations, maxIterations: MAXITER });
            });
            break;
        case "worker":
            worker.addEventListener("message",function ({data}) {
                const command = data.cmd;
                switch (command) {
                    case DONE:
                        renderCanvasElement({ element: canvas, width: WIDTH, height: HEIGHT, colorMap: COLORMAP, iterations: data.iterations, maxIterations: MAXITER });
                        break;
                    default:
                        throw new Error("what");
                }
            },{once: true});
            worker.postMessage({ cmd: CALC, options: { width: WIDTH, height: HEIGHT, maxIteration: MAXITER } });
            break;
    }
});