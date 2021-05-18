export async function renderCanvasElement({ element, width, height, iterations, colorMap, maxIterations }) {
    const ctx=element.getContext("2d");
    
    const imagedata = ctx.createImageData(width,height);
    
    for (let i = 0, len=iterations.length;i<len;i++) {
        const d = colorMap(iterations[i], maxIterations);
        imagedata.data[i*4+0]=d[0];
        imagedata.data[i*4+1]=d[1];
        imagedata.data[i*4+2]=d[2];
        imagedata.data[i*4+3]=255;
    }
    
    ctx.putImageData(imagedata,0,0);
}

export function renderBuffer({ buffer, iterations, colorMap, maxIterations}) {
    const imagedatadata = new Uint8Array(buffer);
    
    for (let i = 0, len=iterations.length;i<len;i++) {
        const d = colorMap(iterations[i], maxIterations);
        imagedatadata[i*4+0]=d[0];
        imagedatadata[i*4+1]=d[1];
        imagedatadata[i*4+2]=d[2];
        imagedatadata[i*4+3]=255;
    }
}