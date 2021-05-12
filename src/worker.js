let current = null;

import { Mandelbrot } from "./mandelbrot";
import { SETOBJ, RENDER, DONE } from "./constants";

self.onmessage = ({ data }) => {
    const command = data.cmd;

    switch (command) {
        case SETOBJ:
            const mandelbrot_obj = data.mandelbrot;
            const mandelbrot = new Mandelbrot();
            for (const i in mandelbrot_obj) {
                mandelbrot[i] = mandelbrot_obj[i];
            }

            mandelbrot.colorMap = Mandelbrot.COLORMAP[mandelbrot.colorMap];

            current = mandelbrot;
            break;
        case RENDER:
            const buffer = data.buffer;
            current.renderBuffer(buffer);
            postMessage({ cmd: DONE });
            break;
    }
};