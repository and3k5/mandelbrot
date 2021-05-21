docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) \
  emscripten/emsdk emcc --no-entry -O1 iterate.c -o iterate.wasm -s WASM=1 -s "EXPORTED_FUNCTIONS=['_getIteration','_getIterations']"
