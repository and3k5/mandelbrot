import { CALC, CALC_WASM1, CALC_WASM2, DONE } from "./constants";

import * as script from "./methods/script";
import * as wasm from "./methods/wasm";
import * as wasm2 from "./methods/wasm-2";

self.onmessage = ({ data }) => {
    const command = data.cmd;

    switch (command) {
        case CALC:
            {
                const { width, height, maxIteration } = data.options;
                asPromise(script.execute(width, height, maxIteration)).then(iterations => postMessage({ cmd: DONE, iterations: iterations }));
            }
            break;
        case CALC_WASM1:
            {
                const { width, height, maxIteration } = data.options;
                asPromise(wasm.execute(width, height, maxIteration)).then(iterations => postMessage({ cmd: DONE, iterations: iterations }));
            }
            break;
        case CALC_WASM2:
            {
                const { width, height, maxIteration } = data.options;
                asPromise(wasm2.execute(width, height, maxIteration)).then(iterations => postMessage({ cmd: DONE, iterations: iterations }));
            }
            break;
    }
};

function asPromise(fnc) {
    if (fnc instanceof Promise)
        return fnc;
    return new Promise((res, rej) => res(fnc));
}