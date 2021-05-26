import module from '../calculate/iterate.wasm';

export async function execute(WIDTH, HEIGHT, MAXITER) {
    var mod = await module({
        'module': {},
        'env': {
            'memory': new WebAssembly.Memory({ initial: 100, limit: 1000 }),
            'table': new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
        }
    });
    const { getIterations, memory } = mod.instance.exports;

    const array = new Uint32Array(memory.buffer, 0, WIDTH * HEIGHT);

    getIterations(array.byteOffset, WIDTH, HEIGHT, MAXITER);

    return Array.from(array);
}