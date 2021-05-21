
import * as script from "./script";
import * as worker from "./worker";
import * as wasm from "./wasm";
// import * as wasm2 from "./wasm-2";
// import * as wasmWorker from "./wasm-worker";
// import * as wasm2Worker from "./wasm-2-worker";

export const all = [
    {
        name: "script",
        label: "Script",
        execute: script.execute,
    },
    {
        name: "worker",
        label: "Web worker",
        execute: worker.execute,
    },
    {
        name: "wasm",
        label: "WebAssembly",
        execute: wasm.execute,
    },
    // {
    //     name: "wasm-2",
    //     label: "WebAssembly 2",
    //     execute: wasm2.execute,
    // },
    // {
    //     name: "wasm-worker",
    //     label: "WebAssembly with worker",
    //     execute: wasmWorker.execute,
    // },
    // {
    //     name: "wasm-worker-2",
    //     label: "WebAssembly 2 with worker",
    //     execute: wasm2Worker.execute,
    // }
]

function getMethodByName(name) {
    return all.find(m => m.name === name);
}

export async function run(METHOD, WIDTH, HEIGHT, MAXITER) {
    var method = getMethodByName(METHOD);
    var iterations = method.execute(WIDTH, HEIGHT, MAXITER);
    if (iterations instanceof Promise) {
        iterations = await iterations;
    }
    return iterations;
}