var Mandelbrot;(()=>{"use strict";function t({width:t,height:i,maxIteration:o}){let a=0;const n=[];for(let r,s=0;s<i;s++)for(r=0;r<t;r++)n[a++]=e({width:t,height:i,maxIteration:o,x:r,y:s});return n}function e({width:t,height:e,x:i,y:o,maxIteration:a}){let n=0,r=0,s=0;for(;n++<a;){const a=r*r-s*s+((i<<1)-1.5*t)/t;if(s=2*r*s+((o<<1)-e)/e,r=a,r*r+s*s>4)break}return n}self.onmessage=({data:e})=>{switch(e.cmd){case 1:postMessage({cmd:2,iterations:t(e.options)})}},Mandelbrot={}})();