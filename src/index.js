import 'bootstrap/dist/css/bootstrap.min.css';
import * as colorMaps from "./colormaps"
import * as methods from "./methods";

const colorSelector = document.querySelector("#colormap");

for (const colorMap of colorMaps.all) {
    const option = new Option();
    option.value = colorMap.name;
    option.textContent = colorMap.name;
    colorSelector.add(option);
}

colorSelector.options[0].selected = true;

const methodSelector = document.querySelector("select#method");

for (const method of methods.all) {
    const option = new Option();
    option.value = method.name;
    option.textContent = method.label;
    methodSelector.add(option);
}

methodSelector.options[0].selected = true;

var canvas = document.querySelector("canvas");


import { run } from './methods';
import { renderCanvasElement } from './render';

document.querySelector("button#submit").addEventListener("click", async () => {
    const WIDTH = document.querySelector("input#width").value;
    const HEIGHT = document.querySelector("input#height").value;
    const MAXITER = document.querySelector("input#maxIter").value;
    const COLORMAP = colorMaps.getColorMapByName(colorSelector.value);
    const METHOD = methodSelector.value;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    console.debug("run");
    const start = performance.now();
    const iterations = await run(METHOD, WIDTH, HEIGHT, MAXITER, COLORMAP);
    const stop = performance.now();
    console.debug("Calculation took " + Math.round(stop - start) + "ms");
    renderCanvasElement({ element: canvas, width: WIDTH, height: HEIGHT, colorMap: COLORMAP, iterations: iterations, maxIterations: MAXITER });
});