const fs = require("fs");
console.log("DEM");
(async function () {
    const importObject = {};

    const wasm = await WebAssembly.compile(
        fs.readFileSync("./iterate.wasm?init")
    );
    const instance = await WebAssembly.instantiate(wasm, importObject);

    const width = 800;
    const height = 600;
    const maxIteration = 1024;

    const { getIterations, memory } = instance.exports;

    const array = new Uint32Array(memory.buffer, 0, width * height);

    const start = new Date().getTime();
    getIterations(array.byteOffset, width, height, maxIteration);
    const end = new Date().getTime();
    console.log(end - start);
})();
