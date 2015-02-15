function mandelbrot(x,y,w,h) {
	var k=0;
	for (var i=0,j=0; k++ < 256; ) if (a = i * i - j * j + ((x << 1) - 1.5 * w) / w,(j = 2 * i * j + ((y << 1) - h) / h, i = a, i * i + j * j > 4)) break
	return k;
}