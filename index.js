var Mandelbrot;(()=>{"use strict";var t={m:{},u:t=>t+".index.js"};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),t.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),t.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var o=t.g.document;if(!e&&o&&(o.currentScript&&(e=o.currentScript.src),!e)){var r=o.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.b=document.baseURI||self.location.href;var e={};(()=>{t.r(e);class o{constructor(){this.colorMap=o.COLORMAP.DEFAULT,this.maxIteration=1024,this.width=100,this.height=100}toObj(){return{width:this.width,height:this.height,maxIteration:this.maxIteration,colorMap:this.colorMap.name}}getIterations(){const t=this.width,e=this.height,o=this.maxIteration;let r,n=0;const a=[];for(let c,i=0;i<e;i++)for(c=0;c<t;c++){r=0;let s=0,l=0;for(;r++<o;){const o=s*s-l*l+((c<<1)-1.5*t)/t;if(l=2*s*l+((i<<1)-e)/e,s=o,s*s+l*l>4)break}a[n++]=r}return a}async renderElement(t){const e=t.getContext("2d"),o=e.createImageData(this.width,this.height),r=this.getIterations();for(let t=0,e=r.length;t<e;t++){const e=this.colorMap(r[t]);o.data[4*t+0]=e[0],o.data[4*t+1]=e[1],o.data[4*t+2]=e[2],o.data[4*t+3]=255}e.putImageData(o,0,0)}renderBuffer(t){const e=new Uint8Array(t),o=this.getIterations();for(let t=0,r=o.length;t<r;t++){const r=this.colorMap(o[t]);e[4*t+0]=r[0],e[4*t+1]=r[1],e[4*t+2]=r[2],e[4*t+3]=255}}}o.COLORMAP={},o.COLORMAP.COLORED=function(t){const e=[0,0,0];if(t!=this.maxIteration){const o=3*Math.log(t)/Math.log(this.maxIteration-1);return o<1?(e[0]=255*o,e):(e[0]=255,e[1]=255,o<2?e[1]*=o-1:e[2]=255*(o-2),e)}return e},o.COLORMAP.DEFAULT=function(t){const e=t/this.maxIteration*255&255;return[e,e,e]};const r=new Worker(new URL(t.p+t.u(816),t.b));r.onmessage=({data:t})=>{switch(t.cmd){case 2:null!=a&&(console.log(a),n.getContext("2d").putImageData(a,0,0))}};for(const t in o.COLORMAP){const e=new Option;e.value=t,e.textContent=t,document.querySelector("#colormap").add(e)}document.querySelector("#colormap").querySelector("option[value=DEFAULT]").selected=!0;var n=document.querySelector("canvas"),a=null;document.querySelector("input#submit").addEventListener("click",(()=>{const t=document.querySelector("input#width").value,e=document.querySelector("input#height").value,c=document.querySelector("input#maxIter").value,i=(document.querySelector("input#scale").value,o.COLORMAP[document.querySelector("select#colormap").value]),s=document.querySelector("select#method").value,l=new o;switch(l.width=t,l.height=e,l.maxIteration=c,l.colorMap=i,n.width=t,n.height=e,s){case"script":console.log("render"),l.renderElement(n);break;case"worker":const o=n.getContext("2d");a=o.createImageData(t,e),r.postMessage({cmd:0,mandelbrot:l.toObj()}),r.postMessage({cmd:1,buffer:a.data.buffer},[a.data.buffer])}}))})(),Mandelbrot=e})();