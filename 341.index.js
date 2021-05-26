var Mandelbrot;(()=>{var e={340:e=>{var t=new ArrayBuffer(694);new Uint8Array(t).set([0,97,115,109,1,0,0,0,1,33,6,96,0,1,127,96,0,0,96,1,127,0,96,4,127,127,127,127,0,96,1,127,1,127,96,5,127,127,127,127,127,1,127,3,8,7,1,5,3,0,2,4,0,4,5,1,112,1,2,2,5,6,1,1,128,2,128,2,6,9,1,127,1,65,144,136,192,2,11,7,142,1,9,6,109,101,109,111,114,121,2,0,12,103,101,116,73,116,101,114,97,116,105,111,110,0,1,13,103,101,116,73,116,101,114,97,116,105,111,110,115,0,2,25,95,95,105,110,100,105,114,101,99,116,95,102,117,110,99,116,105,111,110,95,116,97,98,108,101,1,0,11,95,105,110,105,116,105,97,108,105,122,101,0,0,16,95,95,101,114,114,110,111,95,108,111,99,97,116,105,111,110,0,6,9,115,116,97,99,107,83,97,118,101,0,3,12,115,116,97,99,107,82,101,115,116,111,114,101,0,4,10,115,116,97,99,107,65,108,108,111,99,0,5,9,7,1,0,65,1,11,1,0,10,202,3,7,3,0,1,11,160,1,1,6,124,32,2,65,1,116,183,32,0,183,34,5,68,0,0,0,0,0,0,248,191,162,160,32,5,163,33,8,65,0,33,2,32,4,65,0,32,4,65,0,74,27,34,0,65,1,106,33,4,32,3,65,1,116,183,32,1,183,34,5,161,32,5,163,33,9,68,0,0,0,0,0,0,0,0,33,5,3,64,32,0,32,2,70,4,64,32,4,15,11,32,2,65,1,106,33,2,32,6,32,6,162,33,10,32,9,32,6,32,5,32,5,160,162,160,34,7,33,6,32,8,32,5,32,5,162,32,10,161,160,34,5,32,5,162,32,7,32,7,162,160,68,0,0,0,0,0,0,16,64,100,69,13,0,11,32,2,11,254,1,2,9,124,5,127,2,64,32,2,65,1,72,13,0,32,1,65,1,72,13,0,32,1,183,34,8,68,0,0,0,0,0,0,248,63,162,33,9,32,3,65,0,32,3,65,0,74,27,34,16,65,1,106,33,17,32,2,183,33,6,3,64,32,13,65,1,116,183,32,6,161,32,6,163,33,10,65,0,33,15,3,64,32,15,65,1,116,183,32,9,161,32,8,163,33,11,68,0,0,0,0,0,0,0,0,33,5,68,0,0,0,0,0,0,0,0,33,4,65,0,33,3,3,64,2,64,32,3,32,16,70,4,64,32,17,33,3,12,1,11,32,3,65,1,106,33,3,32,5,32,5,162,33,12,32,10,32,5,32,4,32,4,160,162,160,34,7,33,5,32,11,32,4,32,4,162,32,12,161,160,34,4,32,4,162,32,7,32,7,162,160,68,0,0,0,0,0,0,16,64,100,69,13,1,11,11,32,0,32,14,65,2,116,106,32,3,54,2,0,32,14,65,1,106,33,14,32,15,65,1,106,34,15,32,1,71,13,0,11,32,13,65,1,106,34,13,32,2,71,13,0,11,11,11,4,0,35,0,11,6,0,32,0,36,0,11,16,0,35,0,32,0,107,65,112,113,34,0,36,0,32,0,11,5,0,65,128,8,11]);const{Module:n,instantiate:i,Memory:r,Table:a}=WebAssembly;e.exports=function(e={global:{},env:{memory:new r({initial:10,limit:100}),table:new a({initial:0,element:"anyfunc"})}}){return i(t,e)}}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e({width:e,height:t,maxIteration:n},i){let r=0;const a=[];for(let o,s=0;s<t;s++)for(o=0;o<e;o++)a[r++]=i({width:e,height:t,maxIteration:n,x:o,y:s});return a}function t({width:e,height:t,x:n,y:i,maxIteration:r}){let a=0,o=0,s=0;for(;a++<r;){const r=o*o-s*s+((n<<1)-1.5*e)/e;if(s=2*o*s+((i<<1)-t)/t,o=r,o*o+s*s>4)break}return a}var i=n(340),r=n.n(i);function a(e){return e instanceof Promise?e:new Promise(((t,n)=>t(e)))}self.onmessage=({data:n})=>{switch(n.cmd){case 1:{const{width:i,height:r,maxIteration:o}=n.options;a(function(n,i,r){return e({width:n,height:i,maxIteration:r},t)}(i,r,o)).then((e=>postMessage({cmd:2,iterations:e})))}break;case 3:{const{width:e,height:t,maxIteration:i}=n.options;a(async function(e,t,n){var i=await r()({module:{},env:{memory:new WebAssembly.Memory({initial:100,limit:1e3}),table:new WebAssembly.Table({initial:0,element:"anyfunc"})}});const{getIterations:a,memory:o}=i.instance.exports,s=new Uint32Array(o.buffer,0,e*t);return a(s.byteOffset,e,t,n),Array.from(s)}(e,t,i)).then((e=>postMessage({cmd:2,iterations:e})))}break;case 4:{const{width:t,height:i,maxIteration:o}=n.options;a(async function(t,n,i){var a=await r()({module:{},env:{memory:new WebAssembly.Memory({initial:100,limit:1e3}),table:new WebAssembly.Table({initial:0,element:"anyfunc"})}});const{getIteration:o}=a.instance.exports;return e({width:t,height:n,maxIteration:i},(function(e){return o(e.width,e.height,e.x,e.y,e.maxIteration)}))}(t,i,o)).then((e=>postMessage({cmd:2,iterations:e})))}}}})(),Mandelbrot={}})();