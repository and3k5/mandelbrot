// int[] getIterations({ width, height, maxIteration }) {
//     let pos				=	0;
//     const result			= [];

//     for (let x, y=0;y<height;y++) {
//         for (x=0;x<width;x++) {
//             result[pos++]=getIteration({width, height, maxIteration, x,y});
//         }
//     }

//     return result;
// }

int main(int a) {
    return a+42;
}

int getIteration(int width, int height, int x, int y, int maxIteration) {
    int iteration = 0;
    int i=0;
    int j=0;
    while(iteration++ < maxIteration) {
        int a = i * i - j * j + ((x << 1) - 1.5 * width) / width;
        j = 2 * i * j + ((y << 1) - height) / height;
        i = a;
        if (i * i + j * j > 4) { 
            break;
        }
    }
    return iteration;
}