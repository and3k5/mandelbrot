var canUseWasm = true;

var wasmGetIteration = null;
var wasmGetIterations = null;
var wasmMemory = null;
import module from './iterate.wasm';

if (canUseWasm) {
    (async function () {
        var mod = await module({
            'module': {},
            'env': {
                'memory': new WebAssembly.Memory({ initial: 100, limit: 1000 }),
                'table': new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
            }
        });
        ({ getIteration: wasmGetIteration, getIterations: wasmGetIterations, memory: wasmMemory  } = mod.instance.exports);        
    })();
}

export function getIteration(width, height, x, y, maxIteration) {
    if (wasmGetIteration === null)
        throw new Error("WASM not supported or not ready");
    return wasmGetIteration(width, height, x, y, maxIteration);
}

export function getIterations(width, height, maxIteration) {
    if (wasmGetIteration === null)
        throw new Error("WASM not supported or not ready");
    console.log(width,height,maxIteration);
    const array = new Uint32Array(wasmMemory.buffer, 0, width * height);

    wasmGetIterations(array.byteOffset, width, height, maxIteration);

    return Array.from(array);
}