/* 
buf32[y * WIDTH + x] =
		(255   << 24) |	// alpha
		(k << 16) |	// blue
		(k>63?256:k*4 <<  8) |	// green
		(k>31?256:k*8);		// red
		
		*/
self.addEventListener('message', function(e) {
//e.data[0] = Width
//e.data[1] = Height
//e.data[2] = Width worker division
//e.data[3] = Height worker division
//e.data[4] = Quality division
//e.data[5] = Max Iterations
var quality=e.data[4];
var i,z;
var proc_id=0;
var processors=[];
for (i=0;i<=Math.floor(e.data[0]/e.data[4]);i+=Math.floor((Math.floor(e.data[0]/e.data[4]))/e.data[2])) {
	for (z=0;z<=Math.floor(Math.floor(e.data[1]/e.data[4])/2);z+=Math.floor((Math.floor(e.data[1]/e.data[4])/2)/e.data[3])) {
		mandelbrot(i,z,Math.floor((Math.floor(e.data[0]/e.data[4]))/e.data[2]),Math.floor((Math.floor(e.data[1]/e.data[4])/2)/e.data[3]),{width:Math.floor(e.data[0]/e.data[4]),height:Math.floor(e.data[1]/e.data[4]),quality:e.data[4],maxi:e.data[5]},proc_id);
		processors[proc_id]="running";
		proc_id++;
	}

}

//self.postMessage();
},false);