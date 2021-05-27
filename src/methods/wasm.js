import { getIterations } from "../calculate/wasm"

export async function execute(WIDTH, HEIGHT, MAXITER) {
    return getIterations(WIDTH, HEIGHT, MAXITER);
}