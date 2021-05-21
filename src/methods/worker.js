import { CALC, DONE } from "../constants";

var worker = new Worker(new URL('../worker.js', import.meta.url));

export async function execute(WIDTH, HEIGHT, MAXITER) {

    return new Promise((res, rej) => {
        worker.addEventListener("message", function ({ data }) {
            const command = data.cmd;
            switch (command) {
                case DONE:
                    res(data.iterations);
                    break;
                default:
                    throw new Error("what");
            }
        }, { once: true });
        worker.postMessage({ cmd: CALC, options: { width: WIDTH, height: HEIGHT, maxIteration: MAXITER } });
    });
}