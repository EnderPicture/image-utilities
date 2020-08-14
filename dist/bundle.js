!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){e.exports=function(){return new Worker(n.p+"worker.js")}},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o);n(2),new Vue({el:"#app",data:{formats:[{name:"jpeg",extension:"jpg"},{name:"jpeg 2000",extension:"jp2"},{name:"png",extension:"png"},{name:"png8",extension:"png"},{name:"tiff",extension:"tif"},{name:"gif",extension:"gif"},{name:"bmp",extension:"bmp"},{name:"webp",extension:"webp"}],currentFormat:0,processedFiles:[],quality:90},computed:{format(){return this.formats[this.currentFormat]}},methods:{inputFileEvent(e){let t=e.target.files;console.log(t),this.run(t),e.target.value=""},dropEvent(e){let t=e.dataTransfer.files;this.run(t)},dropOverEvent(e){},run(e){this.processedFiles.length=0;for(let t=0;t<e.length;t++){let n=e[t],o=new r.a,s=n.name,i=n.name.split(".")[0],a=(n.name.split(".").pop(),`${i}-out.${this.format.extension}`);this.processedFiles.push({saveButtonText:`processing ${s} ...`,processing:!0,resultImageUrl:"",failed:!1,newFileName:a});let l=`convert '${s}' `;"jpeg"==this.format.name?l+=`-quality ${this.quality} `:"png8"==this.format.name&&(l+="-colors 256 png8:"),l+=`'${a}'`,console.log(l);let u={index:t,input:n,command:l,extension:this.format.extension};o.postMessage(u),o.onmessage=e=>{let t=this.processedFiles[e.data.index];console.log(this.processedFiles),"good"==e.data.status?(t.processing=!1,t.resultImageUrl=URL.createObjectURL(e.data.output),t.saveButtonText="Save "+t.newFileName):(t.processing=!1,t.failed=!0,t.saveButtonText="Failed processing "+t.newFileName)}}}}})},function(e,t,n){}]);