import { getIteration } from "./iteration";

export function getIterations(options) {
    console.log(getIteration);
    return getIterationsByMethod(options, getIteration);
}

export function getIterationsByMethod({ width, height, maxIteration }, method) {
    let pos = 0;
    const result = [];

    for (let x, y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            result[pos++] = method({ width, height, maxIteration, x, y });
        }
    }

    return result;
}