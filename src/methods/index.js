import * as wasm from "./wasm";

export async function run(WIDTH, HEIGHT, MAXITER) {
    var iterations = wasm.execute(WIDTH, HEIGHT, MAXITER);
    if (iterations instanceof Promise) {
        iterations = await iterations;
    }
    return iterations;
}
