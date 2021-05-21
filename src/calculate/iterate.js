export function getIterations(options) {
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

export function getIteration({ width, height, x, y, maxIteration }) {
    let iteration = 0;
    let i = 0;
    let j = 0;
    while (iteration++ < maxIteration) {
        const a = i * i - j * j + ((x << 1) - 1.5 * width) / width;
        j = 2 * i * j + ((y << 1) - height) / height;
        i = a;
        if (i * i + j * j > 4) {
            break;
        }
    }
    return iteration;
}