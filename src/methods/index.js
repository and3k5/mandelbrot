import * as wasm from "./wasm";

export const all = [
    {
        name: "wasm",
        label: "WebAssembly",
        execute: wasm.execute,
    },
];

function getMethodByName(name) {
    return all.find((m) => m.name === name);
}

export async function run(METHOD, WIDTH, HEIGHT, MAXITER) {
    var method = getMethodByName(METHOD);
    var iterations = method.execute(WIDTH, HEIGHT, MAXITER);
    if (iterations instanceof Promise) {
        iterations = await iterations;
    }
    return iterations;
}
