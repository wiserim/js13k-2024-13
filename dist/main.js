!function(){"use strict";let t={time:0,delta:1/6e4,t:0,width:c.width,height:c.height,l:c.getContext("2d"),i:{},paused:!1,o:{x:0,y:0,h:0},init:()=>{let e=t;window.p=e,e.l.translate(.5,.5),e.l.lineWidth=1,e.l.imageSmoothingEnabled=!1,c.addEventListener("mousedown",(t=>{let l=c.getBoundingClientRect();e.o.x=(t.pageX-l.x)/l.width*320,e.o.y=(t.pageY-l.y)/l.height*240,e.o.h=1})),c.addEventListener("mousemove",(t=>{let l=c.getBoundingClientRect();e.o.x=(t.pageX-l.x)/l.width*320,e.o.y=(t.pageY-l.y)/l.height*240})),e.time=performance.now(),e.update()},u(){for(let t in this.i)this.i[t].draw()},update(){let t=this,e=performance.now()-t.time;if(e<t.delta||t.paused)requestAnimationFrame(t.update.bind(t));else{t.l.clearRect(0,0,320,240),t.l.imageSmoothingEnabled=!1,t.time+=e,t.t=e;for(let e in t.i)t.i[e].update();t.u(),t.o.h=0,requestAnimationFrame(t.update.bind(t))}}};class e{scale=[1,1];angle=0;alpha=1;active=1;m=0;L=[];p=window.p;constructor(t){let e=this;e.x=t.x??0,e.y=t.y??0,e.width=t.width??0,e.height=t.height??0,e.background=t.background??0}j(){let t=this,e=[1,0,0,1,0,0],l=t.angle*Math.PI/180,a=t.x+t.width/2,r=t.y+t.height/2;e[4]+=e[0]*a+e[2]*r,e[5]+=e[1]*a+e[3]*r,e[0]*=t.scale.x,e[1]*=t.scale.x,e[2]*=t.scale.y,e[3]*=t.scale.y;let i=Math.cos(l),s=Math.sin(l),n=e[0]*i+e[2]*s,o=e[1]*i+e[3]*s,c=-e[0]*s+e[2]*i,d=-e[1]*s+e[3]*i;e[0]=n,e[1]=o,e[2]=c,e[3]=d,t.p.l.transform(e[0],e[1],e[2],e[3],e[4],e[5]),t.p.l.globalAlpha=t.alpha}update(){let t=this,e=game.o;t.active&&t.contain(e.x,e.y)&&(t.emit("hover"),e.h&&t.emit("click"))}k(){let t=this;return t.active&&t.alpha?(t.m||t.p.l.save(),t.j(),1):0}q(){this.m||this.p.l.restore()}draw(){let t=this;t.k()&&(t.p.l.beginPath(),t.p.l.fillStyle=t.background??"#00000000",t.p.l.fillRect(-t.width/2,-t.height/2,t.width,t.height),t.q())}contain(t,e){let l=this;return l.x<=t&&l.x+l.width>=t&&l.y<=e&&l.y+l.height>=e}on(t,e){let l=this;return l.L[t]=l.L[t]||[],l.L[t].push([e]),l}emit(t,e=[]){let l=this;if(l.active&&l.L[t]){for(let a of l.L[t])a[0].call(a[1],...e);return l}}}function l(t){let e=parseInt(t[0],36),l=function(t){let e=parseInt(t[0],36),l=new RegExp(`.{1,${e}}`,"g"),a=t.slice(2).split("").reduce(((t,e)=>t+parseInt(e,36).toString(2).padStart(5,0)),parseInt(t[1],36).toString(2)),r=a.length%e;return r&&(a=a.padStart(a.length+e-r,0)),a.match(l).map((t=>parseInt(t,2)-1))}(t.slice(1));return Array.from({length:Math.ceil(l.length/e)},((t,a)=>l.slice(a*e,a*e+e)))}const a={0:"32l9kqda",1:"12la",2:"32l5laba",3:"32l5l9da",4:"32j9l9cm",5:"32l9d9da",6:"32l9dada",7:"32l5ipcm",8:"32l9lada",9:"32l9l9da",M:"32cpkql6",v:"32kplad9",D:"32l9cmba",I:"32kpkqd9",E:"32l9daba",A:"32l9d6b5",P:"42d6apl5j9",Z:"32j9lad6",_:"32l6b5ja",F:"32l5iqda",T:"42iqcqb6cm",H:"32ipcmba",R:"52kqj6j6imim",B:"42iqj9l5km",C:"32l9kqda",G:"32l9lab5",Q:"42d6b9d6ja",J:"32kpkqj6",K:"32l9d9da",N:"32l6b5ip",O:"32j9kqda",S:"52imimcpcpb5",U:"52imimj6j6kq",V:"52imcpb5cpim",W:"32j9j5ip",X:"52laapb5clla",Y:"31vvv",$:"22alap",tt:"22j6ap",et:"32l5j5ap",lt:"22alb9",rt:"22j5al",it:"32ald9al"};for(let s in a)a[s]=l(a[s]);class r extends e{name;description=[];st;nt=1;constructor(t){super(t);let e=this;e.width=32,e.height=32,e.ot=document.createElement("canvas"),e.ot.width=128,e.ot.height=128,e.ct=e.ot.getContext("2d"),e.ct.translate(.5,.5),e.ct.lineWidth=1,e.ct.imageSmoothingEnabled=!1,e.on("hover",(()=>{e.alpha=.6})),e.on("click",(()=>{console.log("click")}))}dt(){let t=this;t.ct.clearRect(0,0,128,128),t.ct.fillStyle="#fff",t.ct.fillRect(0,0,128,128);let e=new Path2D("M0 128 L 40 108 L 20 88 L 20 68 L 40 48 L 88 48 L 108 68 L 108 88 L 88 108 L 128 128 Z");t.ct.fillStyle="#666",t.ct.fill(e)}draw(){let t=this;t.k()&&(t.p.l.drawImage(t.ot,t.x,t.y,t.width,t.height),t.alpha=1,t.q())}update(){this.p.o,super.update()}}class i extends e{constructor(t){super(t);this.items=t.items??[]}add(t){let e=this;e.has(t)||(e.items.push(t),t.m=1)}remove(t){let e=this,l=e.items.indexOf(t);-1!==l&&(e.items.splice(l,1),t.m=0)}has(t){return this.items.includes(t)}getAll(){return this.items}update(){let t=this;if(t.active){super.update();for(let e of t.items)e.update()}}draw(){let t=this;if(t.k()){t.p.l.beginPath(),t.p.l.globalAlpha=t.alpha,t.p.l.fillStyle=t.background,t.p.l.fillRect(t.x-t.width/2,t.y-t.height/2,t.width,t.height),t.q();for(let e of t.items)t.k(),e.draw(),t.q()}}}window.p=t,t.i.ht=new class extends i{constructor(){super({x:160,y:120,width:320,height:200});let t=this;t.background="#a50";for(let e=0;e<32;e++)t.add(new r({x:14+e%8*37,y:30+37*Math.floor(e/8)}))}},t.i.file=new class extends i{ft;constructor(){super({x:160,y:123,width:300,height:234});let t=this;t.ut=document.createElement("canvas"),t.ut.width=t.width,t.ut.height=t.height,t.ct=t.ut.getContext("2d"),t.ct.imageSmoothingEnabled=!1,t.wt()}wt(){let t=this;t.ct.clearRect(0,0,t.width,t.height);let e=new Path2D("M0 234 L 0 10 L 10 0 L 90 0 L 100 10 L 298 10 L 300 12 L 300 234 Z");t.ct.fillStyle="#dd8",t.ct.fill(e),t.ct.filter="drop-shadow(0px 0px 2px #0004)";let l=new Path2D("M15 250 L 15 14 L 295 14 L 295 250 Z");t.ct.fillStyle="#f0f0f0",t.ct.rotate(2*Math.PI/180),t.ct.fill(l),t.ct.setTransform(1,0,0,1,0,0),l=new Path2D("M10 234 L 10 20 L 20 15 L 290 15 L 290 234 Z"),t.ct.fillStyle="#f0f0f0",t.ct.fill(l);let a=t.ct.getImageData(0,0,t.width,t.height),r=a.data;for(let i=0;i<r.length;i+=4){let t=Math.floor(8*Math.random())-4;r[i]+=t,r[i+1]+=t,r[i+2]+=t}t.ct.putImageData(a,0,0)}draw(){let t=this;t.k()&&(t.p.l.drawImage(t.ut,t.x-t.width/2,t.y-t.height/2,t.width,t.height),t.q())}update(){this.p.o,super.update()}},t.i.text=new class extends e{Lt=[""];constructor(t){super(t);let e=this;e.color=t.color??"#000",e.size=t.size??1,e.padding=t.padding??[0,0],e.text=t.text??""}set text(t){let e=this,l=0;if(Array.isArray(t)){for(let e in t)t[e]=t[e].toUpperCase();e.Lt=t}else e.Lt=[t.toUpperCase()];for(let r in e.Lt){let t=[],i=0;for(let l in e.Lt[r]){let s=a[e.Lt[r].charAt(l)];s&&(t.push(s),i+=s[0].length)}i+=t.length-1,l=Math.max(l,i),e.Lt[r]=t}e.width=l*e.size+2*e.padding[0],e.height=(6*e.Lt.length-1)*e.size+2*e.padding[1]}get text(){return this.Lt}draw(){let t=this,e=t.x-t.width/2,l=t.y-t.height/2;if(t.k()){t.background&&(t.p.l.fillStyle=t.background,t.p.l.fillRect(t.x-t.width/2,t.y-t.height/2,t.width,t.height)),t.p.l.fillStyle=t.color;for(let a in t.Lt){let r=t.padding[0];for(let i in t.Lt[a]){let s=t.Lt[a][i],n=t.padding[1];for(let a in s){let i=s[a];for(let a in i)i[a]&&t.p.l.fillRect(e+r+a*t.size,l+n,t.size,t.size);n+=t.size}r+=(s[0].length+1)*t.size}l+=6*t.size}t.q()}}}({x:160,y:120,background:"#f00",text:["abcdefghijklmnopqrstvuwxyz","1234567890+-,.!?"]});for(let s of t.i.ht.getAll())s.dt();t.init(),console.log(t.i.text)}();
