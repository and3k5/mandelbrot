
function mandelbrot(startX,startY,width,height,fullimg,procid) {
    
	var stepX=0,stepY=0;
	stepX=startX;
	stepY=startY;
	var stopX=startX+width;
	var stopY=startY+height;
	function mand1() {
		var x,y,x1,y1,s1, t, s, i, c;
		x = stepX+=1;
		y = stepY;
		if (stepX>stopX) {
			stepX=startX;
			stepY+=1;
		}
		if (stepY>=stopY) {
			processors[procid]="stopped";
			return 0;
		}
		x1 = x / fullimg.width * 3 - 2;
		y1 = y / fullimg.height * 2 - 1;
		i = 0;
		s = x1;
		t = y1;
		setTimeout(function () {
			s1 = s * s - t * t + x1;
			t = 2 * s * t + y1;
			s = s1;
			i = i + 1;
			if (((s * s + t * t)<4)&&(i<fullimg.maxi)) {
				arguments.callee();
				return 0;
			}
			//c = co[i/2];
			c = 3*Math.log(i)/Math.log(fullimg.maxi - 1.0);
			if (c>=1) {
				var style = "rgb("+["255,255,"+Math.round(255*(c-2)),""+Math.round(255*c)+",0,0","255,"+Math.round(255*(c-1))+",0"][((((c<1)+0)*1)+(((c<2)+0)*2))]+")";
				var w=1*fullimg.quality,h=1*fullimg.quality;
				var pos=[x*fullimg.quality,y*fullimg.quality,w,h];
				self.postMessage(JSON.stringify([pos,style]));
			};
			mand1();
	},0);
	}
	mand1();
}
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