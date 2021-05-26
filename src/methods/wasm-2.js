import module from '../calculate/iterate.wasm';
import { getIterationsByMethod } from '../calculate/iterate';

export async function execute(WIDTH, HEIGHT, MAXITER) {
    var mod = await module({
        'module': {},
        'env': {
            'memory': new WebAssembly.Memory({ initial: 100, limit: 1000 }),
            'table': new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
        }
    });
    const { getIteration } = mod.instance.exports;

    function getIterationMethod(options) {
        return getIteration(options.width, options.height, options.x, options.y, options.maxIteration);
    }

    return getIterationsByMethod({ width: WIDTH, height: HEIGHT, maxIteration: MAXITER }, getIterationMethod);
}