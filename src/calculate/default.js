



export async function getIteration({ width, height, x, y, maxIteration }) {
    return jsGetIteration(width, height, x, y, maxIteration);
}

function jsGetIteration(width, height, x, y, maxIteration) {
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