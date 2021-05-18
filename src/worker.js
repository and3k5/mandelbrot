import { CALC, DONE } from "./constants";
import { getIterations } from "./calculate/iterate";

self.onmessage = ({ data }) => {
    const command = data.cmd;

    switch (command) {
        case CALC:
            postMessage({ cmd: DONE, iterations: getIterations(data.options)});
            break;
    }
};