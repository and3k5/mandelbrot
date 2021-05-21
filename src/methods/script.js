import { getIterations } from '../calculate/iterate';

export function execute(width, height, maxIteration) {
    var iterations = getIterations({ width: width, height: height, maxIteration: maxIteration });
    return iterations;
}