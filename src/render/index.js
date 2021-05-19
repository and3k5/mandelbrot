export async function renderCanvasElement({ element, width, height, iterations, colorMap, maxIterations }) {
    const ctx=element.getContext("2d");
    
    const imagedata = ctx.createImageData(width,height);
    
    setArrayDataFromIterations(imagedata.data, iterations, maxIterations, colorMap);
    
    ctx.putImageData(imagedata,0,0);
}

export function renderBuffer({ buffer, iterations, colorMap, maxIterations}) {
    const imagedatadata = new Uint8Array(buffer);
    
    setArrayDataFromIterations(imagedatadata, iterations, maxIterations, colorMap);
}

function setArrayDataFromIterations(array, iterations, maxIterations, colorMap) {
    for (let i = 0, len=iterations.length;i<len;i++) {
        const d = colorMap(iterations[i], maxIterations);
        array[i*4+0]=d[0];
        array[i*4+1]=d[1];
        array[i*4+2]=d[2];
        array[i*4+3]=255;
    }
}