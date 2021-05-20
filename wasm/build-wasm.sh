docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) \
  emscripten/emsdk emcc -O1 iterate.c -o iterate.wasm -s WASM=1 
