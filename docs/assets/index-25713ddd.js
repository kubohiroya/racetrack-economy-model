var Sr=Object.defineProperty;var Cr=(e,t,i)=>t in e?Sr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var $=(e,t,i)=>(Cr(e,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();class zi{constructor(t,i,s){$(this,"realWage");$(this,"priceIndex");$(this,"priceIndex0");$(this,"income");$(this,"income0");$(this,"AShare");$(this,"MShare");$(this,"MShare0");$(this,"nominalWage");$(this,"nominalWage0");$(this,"dMShare");$(this,"id");this.id=t,this.MShare=i,this.MShare0=i,this.dMShare=0,this.AShare=s,this.priceIndex=1,this.priceIndex0=1,this.income=1,this.income0=1,this.nominalWage=1,this.nominalWage0=1,this.realWage=1}setMShare(t){this.MShare=t}setAShare(t){this.AShare=t}changeMShare(t){this.dMShare=t,this.MShare+=this.dMShare}push(){this.income0=this.income,this.nominalWage0=this.nominalWage,this.priceIndex0=this.priceIndex,this.MShare0=this.MShare}calcIncome(t){this.income=t.pi*this.MShare*this.nominalWage+(1-t.pi)*this.AShare}calcPriceIndex(t){let i=0;t.cities.forEach(s=>{i+=s.MShare*Math.pow(s.nominalWage0*t.distanceMatrix[this.id][s.id],1-t.sigma)}),this.priceIndex=Math.pow(i,1/(1-t.sigma))}calcRealWage(t){this.realWage=this.nominalWage*Math.pow(this.priceIndex,-t.pi)}calcNominalWage(t){let i=0;t.cities.forEach(s=>{i+=s.income0*Math.pow(t.distanceMatrix[this.id][s.id],1-t.sigma)*Math.pow(s.priceIndex0,t.sigma-1)}),this.nominalWage=Math.pow(i,1/t.sigma)}calcDynamics(t){this.dMShare=t.gamma*(this.realWage-t.avgRealWage)*this.MShare}applyDynamics(t){this.MShare>1/t.cities.length/10?this.MShare+=this.dMShare:this.MShare=1/t.cities.length/10}}class Fr{constructor(t,i,s,r,n){$(this,"pi");$(this,"avgRealWage");$(this,"tcost");$(this,"sigma");$(this,"distanceMatrix");$(this,"cities");$(this,"gamma");this.pi=i,this.tcost=s,this.sigma=r,this.gamma=n,this.avgRealWage=1,this.cities=new Array(t),this.distanceMatrix=new Array(t);for(let o=0;o<t;o++)this.distanceMatrix[o]=new Array(t).fill(0),this.cities[o]=new zi(o,0,0);this.equalize(),this.calcDistanceMatrix()}reset(){const t=this.cities.length;for(let i=0;i<t;i++)this.distanceMatrix[i]=new Array(t).fill(0),this.cities[i]=new zi(i,0,0);this.equalize(),this.calcDistanceMatrix(),this.disturb()}setSigma(t){this.sigma=t+.1}setTcost(t){this.tcost=t}setPi(t){this.pi=t}calcDistanceMatrix(){const t=this.cities.length;for(let i=0;i<t;i++)for(let s=i;s<t;s++){const r=i==s?0:2*Math.min(s-i,i+t-s)/t;this.distanceMatrix[s][i]=this.distanceMatrix[i][s]=Math.exp(Math.log(this.tcost)*r)}}equalize(){const t=this.cities.length;this.cities.forEach(i=>{i.setMShare(1/t),i.setAShare(1/t)})}disturb(){const t=this.cities.length,i=1/t*.05;for(let s=0;s<t;s++){const r=Math.floor(Math.random()*t);this.cities[r].changeMShare(i)}this.rescale()}rescale(){let t=0,i=0;this.cities.forEach(s=>{t+=s.MShare,i+=s.AShare}),this.cities.forEach(s=>{s.setMShare(s.MShare/t),s.setAShare(s.AShare/i)})}push(){this.cities.forEach(t=>{t.push()})}calcIncome(){this.cities.forEach(t=>{t.calcIncome(this)})}calcPriceIndex(){this.cities.forEach(t=>{t.calcPriceIndex(this)})}calcNominalWage(){this.cities.forEach(t=>{t.calcNominalWage(this)})}calcRealWage(){this.cities.forEach(t=>{t.calcRealWage(this)})}calcAvgRealWage(){let t=0;this.cities.forEach(i=>{t+=i.realWage*i.MShare}),this.avgRealWage=t}calcDynamics(){this.cities.forEach(t=>{t.calcDynamics(this)})}applyDynamics(){this.cities.forEach(t=>{t.applyDynamics(this)}),this.rescale()}procedure(){this.push(),this.calcIncome(),this.calcPriceIndex(),this.calcNominalWage(),this.calcRealWage(),this.calcAvgRealWage(),this.calcDynamics(),this.applyDynamics()}}class Tr{constructor(t,i,s,r,n,o,a){$(this,"numCities");$(this,"country");$(this,"counter");$(this,"scale");$(this,"speed");$(this,"started",!1);$(this,"selectedCityIndex");$(this,"listeners",new Array);$(this,"timer",null);this.numCities=t,this.country=this.createCountry(t,s,r,n,a),this.scale=i,this.speed=o,this.selectedCityIndex=-1,this.counter=0}createCountry(t,i,s,r,n){return new Fr(t,i,s,r,n)}reset(){this.counter=0,this.selectedCityIndex=-1,this.country.reset(),this.update()}stop(){this.started=!1,this.timer!=null&&clearInterval(this.timer),this.timer=null}start(){if(!this.started){this.started=!0;const t=this.expScale(this.speed);this.timer=setInterval(()=>{this.country.procedure(),this.counter++,this.update()},t)}}expScale(t){const i=Math.log(10),s=Math.log(3e3),r=i+(1-t)*(s-i);return Math.exp(r)}calcDistanceMatrix(){this.country.calcDistanceMatrix()}setNumCities(t,i,s,r,n){this.numCities=t,this.country=this.createCountry(this.numCities,i,s,r,n)}setScale(t){this.scale=t,this.update()}setSpeed(t){this.speed=t}setPi(t){this.country.setPi(t)}setTcost(t){this.country.setTcost(t)}setSigma(t){this.country.setSigma(t)}setSelectedCityIndex(t){this.selectedCityIndex=t}addUpdateEventListener(t){this.listeners.push(t)}update(){this.listeners.forEach(t=>{t(this)})}}function Rr(e,t,i,s,r,n){const o=t-n,a=6,l=.1;e.textAlign="right";let c=0;for(let h=0;h<=1;h+=l){const p=i-r-h*s;p>=0&&(e.fillStyle="#ddd",e.fillRect(n,p-1,o,1),e.fillStyle="#888",e.fillText(h.toFixed(1),n-2,p+3),c++)}if(c<5)for(let h=.05;h<=1;h+=l){const p=i-r-h*s;p>=0&&(e.fillRect(n,p-1,a,1),e.fillText(h.toFixed(2),n-2,p+4))}if(c<2)for(let h=.01;h<=1;h+=.01){const p=i-r-h*s;p>=0&&(e.fillRect(n,p-1,a,1),e.fillText(h.toFixed(2),n-2,p+4),c++)}}function Dr(e,t,i,s,r,n){if(e.fillStyle="#888",e.textAlign="left",r<=100)for(let a=5;a<=r;a+=5){const l=s+a*i;e.fillText(a.toString(),l,n)}else for(let a=50;a<=r;a+=50){const l=s+a*i;e.fillText(a.toString(),l,n)}}class Mr{constructor(t,i){$(this,"model");$(this,"canvas");this.canvas=t,this.model=i}repaint(){const s=this.canvas.getContext("2d");if(!s||!this.model)return;const r=(this.canvas.width-25)/this.model.country.cities.length,n=(this.canvas.height-10*2)*this.model.scale;s.fillStyle="#fff",s.fillRect(0,0,25,this.canvas.height),s.fillStyle="#f4f4f4",s.fillRect(25,10,this.canvas.width-25,this.canvas.height-10*2),Rr(s,this.canvas.width,this.canvas.height,n,10,25),this.model.country.cities.forEach((o,a)=>{o.dMShare<0?s.fillStyle="#ee8888":s.fillStyle="#dd0000",s.fillRect(25+a*r,this.canvas.height-10-o.MShare*n,Math.max(r-1,1),o.MShare*n)}),s.fillStyle="#fff",s.fillRect(25,this.canvas.height-10,this.canvas.width-25,10),Dr(s,this.canvas.width,r,25,this.model.numCities,this.canvas.height-10+10),s.fillStyle="#fff",s.fillRect(0,0,this.canvas.width,10)}}function Vr({canvas:e,left:t,top:i,diameter:s,vertices:r,vertexCircleRadiusBase:n,src:o,model:a}){const l=e.getContext("2d");if(!l)return;l.clearRect(0,0,e.width,e.height);const c=s/2,h={x:c+t,y:c+i},p=2*Math.PI/r;l.beginPath(),l.strokeStyle="black",l.arc(h.x,h.y,c,0,2*Math.PI),l.stroke();for(let b=0;b<r;b++){const k=b*p;ji(l,h,c,n,k,o,b,b===a.selectedCityIndex);const m=h.x+(c+30)*Math.cos(k)-7,w=h.y+(c+30)*Math.sin(k);Ir(l,m,w,r,b)}if(a.selectedCityIndex>=0){ji(l,{x:h.x,y:h.y+30},0,n,0,o,a.selectedCityIndex,!1);const m=a.country.cities[a.selectedCityIndex];l.fillStyle="black",l.fillText("share of manufacturing = "+m.MShare.toFixed(4),h.x+-70,h.y+-60),l.fillText("price index = "+m.priceIndex.toFixed(4),h.x+-70,h.y+-60+15),l.fillText("nominal wage = "+m.nominalWage.toFixed(4),h.x+-70,h.y+-60+30),l.fillText("real wage = "+m.realWage.toFixed(4),h.x+-70,h.y+-60+45),l.beginPath(),l.fillStyle=`rgb(255, 0, 0, ${o[a.selectedCityIndex][0]})`,l.arc(h.x+-70-12,h.y+-60-5,5,0,2*Math.PI),l.fill(),l.closePath(),l.beginPath(),l.strokeStyle="rgb(255, 0, 0, 0.5)",l.arc(h.x+-70-12,h.y+-60+10,8,0,2*Math.PI),l.stroke(),l.fill(),l.closePath(),l.beginPath(),l.fillStyle="",l.strokeStyle="rgb(255, 0, 0, 0.5)",l.arc(h.x+-70-12,h.y+-60+25,5,0,2*Math.PI),l.stroke(),l.closePath(),l.beginPath(),l.strokeStyle="rgb(5, 5, 5, 0.3)",l.arc(h.x+-70-12,h.y+-60+40,5,0,2*Math.PI),l.stroke(),l.closePath()}}function Lr(e,t,i){const s=Math.atan2(t,e),r=2*Math.PI/i,n=(s+2*Math.PI+r/2)%(2*Math.PI);return Math.floor(n/r)}function ji(e,t,i,s,r,n,o,a){const l=s*n[o][1],c=t.x+i*Math.cos(r),h=t.y+i*Math.sin(r);Pr(e,c,h,l,n[o][0],a);const p=i-l*n[o][2]+l,b=t.x+p*Math.cos(r),k=t.y+p*Math.sin(r);Nr(e,b,k,l);const m=i-l*n[o][3]+l,w=t.x+m*Math.cos(r),N=t.y+m*Math.sin(r);Ar(e,w,N,l)}function Ir(e,t,i,s,r){(s<100&&r%5==0||100<=s&&r%50==0)&&(e.fillStyle="rgb(5, 5, 5, .5)",e.fillText(`${r}`,t,i+3))}function Pr(e,t,i,s,r,n){e.strokeStyle="",n&&(e.beginPath(),e.fillStyle="rgb(255, 255, 0, 0.5)",e.arc(t,i,40,0,2*Math.PI),e.fill(),e.closePath()),e.beginPath(),e.fillStyle=`rgb(255, 0, 0, ${r})`,e.arc(t,i,s,0,2*Math.PI),e.fill(),e.closePath()}function Nr(e,t,i,s){e.beginPath(),e.fillStyle="",e.strokeStyle="rgb(255, 0, 0, 0.5)",e.arc(t,i,s,0,2*Math.PI),e.stroke(),e.closePath()}function Ar(e,t,i,s){e.beginPath(),e.fillStyle="",e.strokeStyle="rgb(5, 5, 5, 0.3)",e.arc(t,i,s,0,2*Math.PI),e.stroke(),e.closePath()}const bt=function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}}();bt.trustedTypes===void 0&&(bt.trustedTypes={createPolicy:(e,t)=>t});const $s={configurable:!1,enumerable:!1,writable:!1};bt.FAST===void 0&&Reflect.defineProperty(bt,"FAST",Object.assign({value:Object.create(null)},$s));const Xt=bt.FAST;if(Xt.getById===void 0){const e=Object.create(null);Reflect.defineProperty(Xt,"getById",Object.assign({value(t,i){let s=e[t];return s===void 0&&(s=i?e[t]=i():null),s}},$s))}const qt=Object.freeze([]);function Ss(){const e=new WeakMap;return function(t){let i=e.get(t);if(i===void 0){let s=Reflect.getPrototypeOf(t);for(;i===void 0&&s!==null;)i=e.get(s),s=Reflect.getPrototypeOf(s);i=i===void 0?[]:i.slice(0),e.set(t,i)}return i}}const He=bt.FAST.getById(1,()=>{const e=[],t=[];function i(){if(t.length)throw t.shift()}function s(o){try{o.call()}catch(a){t.push(a),setTimeout(i,0)}}function r(){let a=0;for(;a<e.length;)if(s(e[a]),a++,a>1024){for(let l=0,c=e.length-a;l<c;l++)e[l]=e[l+a];e.length-=a,a=0}e.length=0}function n(o){e.length<1&&bt.requestAnimationFrame(r),e.push(o)}return Object.freeze({enqueue:n,process:r})}),Cs=bt.trustedTypes.createPolicy("fast-html",{createHTML:e=>e});let ze=Cs;const Gt=`fast-${Math.random().toString(36).substring(2,8)}`,Fs=`${Gt}{`,xi=`}${Gt}`,S=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(e){if(ze!==Cs)throw new Error("The HTML policy can only be set once.");ze=e},createHTML(e){return ze.createHTML(e)},isMarker(e){return e&&e.nodeType===8&&e.data.startsWith(Gt)},extractDirectiveIndexFromMarker(e){return parseInt(e.data.replace(`${Gt}:`,""))},createInterpolationPlaceholder(e){return`${Fs}${e}${xi}`},createCustomAttributePlaceholder(e,t){return`${e}="${this.createInterpolationPlaceholder(t)}"`},createBlockPlaceholder(e){return`<!--${Gt}:${e}-->`},queueUpdate:He.enqueue,processUpdates:He.process,nextUpdate(){return new Promise(He.enqueue)},setAttribute(e,t,i){i==null?e.removeAttribute(t):e.setAttribute(t,i)},setBooleanAttribute(e,t,i){i?e.setAttribute(t,""):e.removeAttribute(t)},removeChildNodes(e){for(let t=e.firstChild;t!==null;t=e.firstChild)e.removeChild(t)},createTemplateWalker(e){return document.createTreeWalker(e,133,null,!1)}});class si{constructor(t,i){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=i}has(t){return this.spillover===void 0?this.sub1===t||this.sub2===t:this.spillover.indexOf(t)!==-1}subscribe(t){const i=this.spillover;if(i===void 0){if(this.has(t))return;if(this.sub1===void 0){this.sub1=t;return}if(this.sub2===void 0){this.sub2=t;return}this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else i.indexOf(t)===-1&&i.push(t)}unsubscribe(t){const i=this.spillover;if(i===void 0)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}notify(t){const i=this.spillover,s=this.source;if(i===void 0){const r=this.sub1,n=this.sub2;r!==void 0&&r.handleChange(s,t),n!==void 0&&n.handleChange(s,t)}else for(let r=0,n=i.length;r<n;++r)i[r].handleChange(s,t)}}class Ts{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var i;const s=this.subscribers[t];s!==void 0&&s.notify(t),(i=this.sourceSubscribers)===null||i===void 0||i.notify(t)}subscribe(t,i){var s;if(i){let r=this.subscribers[i];r===void 0&&(this.subscribers[i]=r=new si(this.source)),r.subscribe(t)}else this.sourceSubscribers=(s=this.sourceSubscribers)!==null&&s!==void 0?s:new si(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,i){var s;if(i){const r=this.subscribers[i];r!==void 0&&r.unsubscribe(t)}else(s=this.sourceSubscribers)===null||s===void 0||s.unsubscribe(t)}}const R=Xt.getById(2,()=>{const e=/(:|&&|\|\||if)/,t=new WeakMap,i=S.queueUpdate;let s,r=c=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function n(c){let h=c.$fastController||t.get(c);return h===void 0&&(Array.isArray(c)?h=r(c):t.set(c,h=new Ts(c))),h}const o=Ss();class a{constructor(h){this.name=h,this.field=`_${h}`,this.callback=`${h}Changed`}getValue(h){return s!==void 0&&s.watch(h,this.name),h[this.field]}setValue(h,p){const b=this.field,k=h[b];if(k!==p){h[b]=p;const m=h[this.callback];typeof m=="function"&&m.call(h,k,p),n(h).notify(this.name)}}}class l extends si{constructor(h,p,b=!1){super(h,p),this.binding=h,this.isVolatileBinding=b,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(h,p){this.needsRefresh&&this.last!==null&&this.disconnect();const b=s;s=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const k=this.binding(h,p);return s=b,k}disconnect(){if(this.last!==null){let h=this.first;for(;h!==void 0;)h.notifier.unsubscribe(this,h.propertyName),h=h.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(h,p){const b=this.last,k=n(h),m=b===null?this.first:{};if(m.propertySource=h,m.propertyName=p,m.notifier=k,k.subscribe(this,p),b!==null){if(!this.needsRefresh){let w;s=void 0,w=b.propertySource[b.propertyName],s=this,h===w&&(this.needsRefresh=!0)}b.next=m}this.last=m}handleChange(){this.needsQueue&&(this.needsQueue=!1,i(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let h=this.first;return{next:()=>{const p=h;return p===void 0?{value:void 0,done:!0}:(h=h.next,{value:p,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(c){r=c},getNotifier:n,track(c,h){s!==void 0&&s.watch(c,h)},trackVolatile(){s!==void 0&&(s.needsRefresh=!0)},notify(c,h){n(c).notify(h)},defineProperty(c,h){typeof h=="string"&&(h=new a(h)),o(c).push(h),Reflect.defineProperty(c,h.name,{enumerable:!0,get:function(){return h.getValue(this)},set:function(p){h.setValue(this,p)}})},getAccessors:o,binding(c,h,p=this.isVolatileBinding(c)){return new l(c,h,p)},isVolatileBinding(c){return e.test(c.toString())}})});function F(e,t){R.defineProperty(e,t)}const Wi=Xt.getById(3,()=>{let e=null;return{get(){return e},set(t){e=t}}});class Yt{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return Wi.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){Wi.set(t)}}R.defineProperty(Yt.prototype,"index");R.defineProperty(Yt.prototype,"length");const Ut=Object.seal(new Yt);class ki{constructor(){this.targetIndex=0}}class Rs extends ki{constructor(){super(...arguments),this.createPlaceholder=S.createInterpolationPlaceholder}}class Ds extends ki{constructor(t,i,s){super(),this.name=t,this.behavior=i,this.options=s}createPlaceholder(t){return S.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function Er(e,t){this.source=e,this.context=t,this.bindingObserver===null&&(this.bindingObserver=R.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(e,t))}function Or(e,t){this.source=e,this.context=t,this.target.addEventListener(this.targetName,this)}function Br(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function Hr(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const e=this.target.$fastView;e!==void 0&&e.isComposed&&(e.unbind(),e.needsBindOnly=!0)}function zr(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function jr(e){S.setAttribute(this.target,this.targetName,e)}function Wr(e){S.setBooleanAttribute(this.target,this.targetName,e)}function qr(e){if(e==null&&(e=""),e.create){this.target.textContent="";let t=this.target.$fastView;t===void 0?t=e.create():this.target.$fastTemplate!==e&&(t.isComposed&&(t.remove(),t.unbind()),t=e.create()),t.isComposed?t.needsBindOnly&&(t.needsBindOnly=!1,t.bind(this.source,this.context)):(t.isComposed=!0,t.bind(this.source,this.context),t.insertBefore(this.target),this.target.$fastView=t,this.target.$fastTemplate=e)}else{const t=this.target.$fastView;t!==void 0&&t.isComposed&&(t.isComposed=!1,t.remove(),t.needsBindOnly?t.needsBindOnly=!1:t.unbind()),this.target.textContent=e}}function Gr(e){this.target[this.targetName]=e}function Ur(e){const t=this.classVersions||Object.create(null),i=this.target;let s=this.version||0;if(e!=null&&e.length){const r=e.split(/\s+/);for(let n=0,o=r.length;n<o;++n){const a=r[n];a!==""&&(t[a]=s,i.classList.add(a))}}if(this.classVersions=t,this.version=s+1,s!==0){s-=1;for(const r in t)t[r]===s&&i.classList.remove(r)}}class $i extends Rs{constructor(t){super(),this.binding=t,this.bind=Er,this.unbind=Br,this.updateTarget=jr,this.isBindingVolatile=R.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,t!==void 0)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=Gr,this.cleanedTargetName==="innerHTML"){const i=this.binding;this.binding=(s,r)=>S.createHTML(i(s,r))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=Wr;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=Or,this.unbind=zr;break;default:this.cleanedTargetName=t,t==="class"&&(this.updateTarget=Ur);break}}targetAtContent(){this.updateTarget=qr,this.unbind=Hr}createBehavior(t){return new _r(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class _r{constructor(t,i,s,r,n,o,a){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=i,this.isBindingVolatile=s,this.bind=r,this.unbind=n,this.updateTarget=o,this.targetName=a}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){Yt.setEvent(t);const i=this.binding(this.source,this.context);Yt.setEvent(null),i!==!0&&t.preventDefault()}}let je=null;class Si{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){je=this}static borrow(t){const i=je||new Si;return i.directives=t,i.reset(),je=null,i}}function Xr(e){if(e.length===1)return e[0];let t;const i=e.length,s=e.map(o=>typeof o=="string"?()=>o:(t=o.targetName||t,o.binding)),r=(o,a)=>{let l="";for(let c=0;c<i;++c)l+=s[c](o,a);return l},n=new $i(r);return n.targetName=t,n}const Yr=xi.length;function Ms(e,t){const i=t.split(Fs);if(i.length===1)return null;const s=[];for(let r=0,n=i.length;r<n;++r){const o=i[r],a=o.indexOf(xi);let l;if(a===-1)l=o;else{const c=parseInt(o.substring(0,a));s.push(e.directives[c]),l=o.substring(a+Yr)}l!==""&&s.push(l)}return s}function qi(e,t,i=!1){const s=t.attributes;for(let r=0,n=s.length;r<n;++r){const o=s[r],a=o.value,l=Ms(e,a);let c=null;l===null?i&&(c=new $i(()=>a),c.targetName=o.name):c=Xr(l),c!==null&&(t.removeAttributeNode(o),r--,n--,e.addFactory(c))}}function Qr(e,t,i){const s=Ms(e,t.textContent);if(s!==null){let r=t;for(let n=0,o=s.length;n<o;++n){const a=s[n],l=n===0?t:r.parentNode.insertBefore(document.createTextNode(""),r.nextSibling);typeof a=="string"?l.textContent=a:(l.textContent=" ",e.captureContentBinding(a)),r=l,e.targetIndex++,l!==t&&i.nextNode()}e.targetIndex--}}function Zr(e,t){const i=e.content;document.adoptNode(i);const s=Si.borrow(t);qi(s,e,!0);const r=s.behaviorFactories;s.reset();const n=S.createTemplateWalker(i);let o;for(;o=n.nextNode();)switch(s.targetIndex++,o.nodeType){case 1:qi(s,o);break;case 3:Qr(s,o,n);break;case 8:S.isMarker(o)&&s.addFactory(t[S.extractDirectiveIndexFromMarker(o)])}let a=0;(S.isMarker(i.firstChild)||i.childNodes.length===1&&t.length)&&(i.insertBefore(document.createComment(""),i.firstChild),a=-1);const l=s.behaviorFactories;return s.release(),{fragment:i,viewBehaviorFactories:l,hostBehaviorFactories:r,targetOffset:a}}const We=document.createRange();class Jr{constructor(t,i){this.fragment=t,this.behaviors=i,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const i=this.lastChild;if(t.previousSibling===i)return;const s=t.parentNode;let r=this.firstChild,n;for(;r!==i;)n=r.nextSibling,s.insertBefore(r,t),r=n;s.insertBefore(i,t)}}remove(){const t=this.fragment,i=this.lastChild;let s=this.firstChild,r;for(;s!==i;)r=s.nextSibling,t.appendChild(s),s=r;t.appendChild(i)}dispose(){const t=this.firstChild.parentNode,i=this.lastChild;let s=this.firstChild,r;for(;s!==i;)r=s.nextSibling,t.removeChild(s),s=r;t.removeChild(i);const n=this.behaviors,o=this.source;for(let a=0,l=n.length;a<l;++a)n[a].unbind(o)}bind(t,i){const s=this.behaviors;if(this.source!==t)if(this.source!==null){const r=this.source;this.source=t,this.context=i;for(let n=0,o=s.length;n<o;++n){const a=s[n];a.unbind(r),a.bind(t,i)}}else{this.source=t,this.context=i;for(let r=0,n=s.length;r<n;++r)s[r].bind(t,i)}}unbind(){if(this.source===null)return;const t=this.behaviors,i=this.source;for(let s=0,r=t.length;s<r;++s)t[s].unbind(i);this.source=null}static disposeContiguousBatch(t){if(t.length!==0){We.setStartBefore(t[0].firstChild),We.setEndAfter(t[t.length-1].lastChild),We.deleteContents();for(let i=0,s=t.length;i<s;++i){const r=t[i],n=r.behaviors,o=r.source;for(let a=0,l=n.length;a<l;++a)n[a].unbind(o)}}}}class Gi{constructor(t,i){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=i}create(t){if(this.fragment===null){let c;const h=this.html;if(typeof h=="string"){c=document.createElement("template"),c.innerHTML=S.createHTML(h);const b=c.content.firstElementChild;b!==null&&b.tagName==="TEMPLATE"&&(c=b)}else c=h;const p=Zr(c,this.directives);this.fragment=p.fragment,this.viewBehaviorFactories=p.viewBehaviorFactories,this.hostBehaviorFactories=p.hostBehaviorFactories,this.targetOffset=p.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const i=this.fragment.cloneNode(!0),s=this.viewBehaviorFactories,r=new Array(this.behaviorCount),n=S.createTemplateWalker(i);let o=0,a=this.targetOffset,l=n.nextNode();for(let c=s.length;o<c;++o){const h=s[o],p=h.targetIndex;for(;l!==null;)if(a===p){r[o]=h.createBehavior(l);break}else l=n.nextNode(),a++}if(this.hasHostBehaviors){const c=this.hostBehaviorFactories;for(let h=0,p=c.length;h<p;++h,++o)r[o]=c[h].createBehavior(t)}return new Jr(i,r)}render(t,i,s){typeof i=="string"&&(i=document.getElementById(i)),s===void 0&&(s=i);const r=this.create(s);return r.bind(t,Ut),r.appendTo(i),r}}const Kr=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function K(e,...t){const i=[];let s="";for(let r=0,n=e.length-1;r<n;++r){const o=e[r];let a=t[r];if(s+=o,a instanceof Gi){const l=a;a=()=>l}if(typeof a=="function"&&(a=new $i(a)),a instanceof Rs){const l=Kr.exec(o);l!==null&&(a.targetName=l[2])}a instanceof ki?(s+=a.createPlaceholder(i.length),i.push(a)):s+=a}return s+=e[e.length-1],new Gi(s,i)}class G{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=this.behaviors===null?t:this.behaviors.concat(t),this}}G.create=(()=>{if(S.supportsAdoptedStyleSheets){const e=new Map;return t=>new tn(t,e)}return e=>new rn(e)})();function Ci(e){return e.map(t=>t instanceof G?Ci(t.styles):[t]).reduce((t,i)=>t.concat(i),[])}function Vs(e){return e.map(t=>t instanceof G?t.behaviors:null).reduce((t,i)=>i===null?t:(t===null&&(t=[]),t.concat(i)),null)}let Ls=(e,t)=>{e.adoptedStyleSheets=[...e.adoptedStyleSheets,...t]},Is=(e,t)=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(i=>t.indexOf(i)===-1)};if(S.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),Ls=(e,t)=>{e.adoptedStyleSheets.push(...t)},Is=(e,t)=>{for(const i of t){const s=e.adoptedStyleSheets.indexOf(i);s!==-1&&e.adoptedStyleSheets.splice(s,1)}}}catch{}class tn extends G{constructor(t,i){super(),this.styles=t,this.styleSheetCache=i,this._styleSheets=void 0,this.behaviors=Vs(t)}get styleSheets(){if(this._styleSheets===void 0){const t=this.styles,i=this.styleSheetCache;this._styleSheets=Ci(t).map(s=>{if(s instanceof CSSStyleSheet)return s;let r=i.get(s);return r===void 0&&(r=new CSSStyleSheet,r.replaceSync(s),i.set(s,r)),r})}return this._styleSheets}addStylesTo(t){Ls(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){Is(t,this.styleSheets),super.removeStylesFrom(t)}}let en=0;function sn(){return`fast-style-class-${++en}`}class rn extends G{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=Vs(t),this.styleSheets=Ci(t),this.styleClass=sn()}addStylesTo(t){const i=this.styleSheets,s=this.styleClass;t=this.normalizeTarget(t);for(let r=0;r<i.length;r++){const n=document.createElement("style");n.innerHTML=i[r],n.className=s,t.append(n)}super.addStylesTo(t)}removeStylesFrom(t){t=this.normalizeTarget(t);const i=t.querySelectorAll(`.${this.styleClass}`);for(let s=0,r=i.length;s<r;++s)t.removeChild(i[s]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const ue=Object.freeze({locate:Ss()}),Ps={toView(e){return e?"true":"false"},fromView(e){return!(e==null||e==="false"||e===!1||e===0)}},Fi={toView(e){if(e==null)return null;const t=e*1;return isNaN(t)?null:t.toString()},fromView(e){if(e==null)return null;const t=e*1;return isNaN(t)?null:t}};class de{constructor(t,i,s=i.toLowerCase(),r="reflect",n){this.guards=new Set,this.Owner=t,this.name=i,this.attribute=s,this.mode=r,this.converter=n,this.fieldName=`_${i}`,this.callbackName=`${i}Changed`,this.hasCallback=this.callbackName in t.prototype,r==="boolean"&&n===void 0&&(this.converter=Ps)}setValue(t,i){const s=t[this.fieldName],r=this.converter;r!==void 0&&(i=r.fromView(i)),s!==i&&(t[this.fieldName]=i,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](s,i),t.$fastController.notify(this.name))}getValue(t){return R.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,i){this.guards.has(t)||(this.guards.add(t),this.setValue(t,i),this.guards.delete(t))}tryReflectToAttribute(t){const i=this.mode,s=this.guards;s.has(t)||i==="fromView"||S.queueUpdate(()=>{s.add(t);const r=t[this.fieldName];switch(i){case"reflect":const n=this.converter;S.setAttribute(t,this.attribute,n!==void 0?n.toView(r):r);break;case"boolean":S.setBooleanAttribute(t,this.attribute,r);break}s.delete(t)})}static collect(t,...i){const s=[];i.push(ue.locate(t));for(let r=0,n=i.length;r<n;++r){const o=i[r];if(o!==void 0)for(let a=0,l=o.length;a<l;++a){const c=o[a];typeof c=="string"?s.push(new de(t,c)):s.push(new de(t,c.property,c.attribute,c.mode,c.converter))}}return s}}function g(e,t){let i;function s(r,n){arguments.length>1&&(i.property=n),ue.locate(r.constructor).push(i)}if(arguments.length>1){i={},s(e,t);return}return i=e===void 0?{}:e,s}const Ui={mode:"open"},_i={},ri=Xt.getById(4,()=>{const e=new Map;return Object.freeze({register(t){return e.has(t.type)?!1:(e.set(t.type,t),!0)},getByType(t){return e.get(t)}})});class we{constructor(t,i=t.definition){typeof i=="string"&&(i={name:i}),this.type=t,this.name=i.name,this.template=i.template;const s=de.collect(t,i.attributes),r=new Array(s.length),n={},o={};for(let a=0,l=s.length;a<l;++a){const c=s[a];r[a]=c.attribute,n[c.name]=c,o[c.attribute]=c}this.attributes=s,this.observedAttributes=r,this.propertyLookup=n,this.attributeLookup=o,this.shadowOptions=i.shadowOptions===void 0?Ui:i.shadowOptions===null?void 0:Object.assign(Object.assign({},Ui),i.shadowOptions),this.elementOptions=i.elementOptions===void 0?_i:Object.assign(Object.assign({},_i),i.elementOptions),this.styles=i.styles===void 0?void 0:Array.isArray(i.styles)?G.create(i.styles):i.styles instanceof G?i.styles:G.create([i.styles])}get isDefined(){return!!ri.getByType(this.type)}define(t=customElements){const i=this.type;if(ri.register(this)){const s=this.attributes,r=i.prototype;for(let n=0,o=s.length;n<o;++n)R.defineProperty(r,s[n]);Reflect.defineProperty(i,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,i,this.elementOptions),this}}we.forType=ri.getByType;const Ns=new WeakMap,nn={bubbles:!0,composed:!0,cancelable:!0};function qe(e){return e.shadowRoot||Ns.get(e)||null}class Ti extends Ts{constructor(t,i){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=i;const s=i.shadowOptions;if(s!==void 0){const n=t.attachShadow(s);s.mode==="closed"&&Ns.set(t,n)}const r=R.getAccessors(t);if(r.length>0){const n=this.boundObservables=Object.create(null);for(let o=0,a=r.length;o<a;++o){const l=r[o].name,c=t[l];c!==void 0&&(delete t[l],n[l]=c)}}}get isConnected(){return R.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,R.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=t,!this.needsInitialization&&t!==null&&this.addStyles(t))}addStyles(t){const i=qe(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)i.append(t);else if(!t.isAttachedTo(i)){const s=t.behaviors;t.addStylesTo(i),s!==null&&this.addBehaviors(s)}}removeStyles(t){const i=qe(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)i.removeChild(t);else if(t.isAttachedTo(i)){const s=t.behaviors;t.removeStylesFrom(i),s!==null&&this.removeBehaviors(s)}}addBehaviors(t){const i=this.behaviors||(this.behaviors=new Map),s=t.length,r=[];for(let n=0;n<s;++n){const o=t[n];i.has(o)?i.set(o,i.get(o)+1):(i.set(o,1),r.push(o))}if(this._isConnected){const n=this.element;for(let o=0;o<r.length;++o)r[o].bind(n,Ut)}}removeBehaviors(t,i=!1){const s=this.behaviors;if(s===null)return;const r=t.length,n=[];for(let o=0;o<r;++o){const a=t[o];if(s.has(a)){const l=s.get(a)-1;l===0||i?s.delete(a)&&n.push(a):s.set(a,l)}}if(this._isConnected){const o=this.element;for(let a=0;a<n.length;++a)n[a].unbind(o)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(t,Ut);const i=this.behaviors;if(i!==null)for(const[s]of i)s.bind(t,Ut);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;t!==null&&t.unbind();const i=this.behaviors;if(i!==null){const s=this.element;for(const[r]of i)r.unbind(s)}}onAttributeChangedCallback(t,i,s){const r=this.definition.attributeLookup[t];r!==void 0&&r.onAttributeChangedCallback(this.element,s)}emit(t,i,s){return this._isConnected?this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:i},nn),s))):!1}finishInitialization(){const t=this.element,i=this.boundObservables;if(i!==null){const r=Object.keys(i);for(let n=0,o=r.length;n<o;++n){const a=r[n];t[a]=i[a]}this.boundObservables=null}const s=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():s.template&&(this._template=s.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():s.styles&&(this._styles=s.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const i=this.element,s=qe(i)||i;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||S.removeChildNodes(s),t&&(this.view=t.render(i,s,i))}static forCustomElement(t){const i=t.$fastController;if(i!==void 0)return i;const s=we.forType(t.constructor);if(s===void 0)throw new Error("Missing FASTElement definition.");return t.$fastController=new Ti(t,s)}}function Xi(e){return class extends e{constructor(){super(),Ti.forCustomElement(this)}$emit(t,i,s){return this.$fastController.emit(t,i,s)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,i,s){this.$fastController.onAttributeChangedCallback(t,i,s)}}}const xe=Object.assign(Xi(HTMLElement),{from(e){return Xi(e)},define(e,t){return new we(e,t).define().type}});class Ri{createCSS(){return""}createBehavior(){}}function As(e,t){const i=[];let s="";const r=[];for(let n=0,o=e.length-1;n<o;++n){s+=e[n];let a=t[n];if(a instanceof Ri){const l=a.createBehavior();a=a.createCSS(),l&&r.push(l)}a instanceof G||a instanceof CSSStyleSheet?(s.trim()!==""&&(i.push(s),s=""),i.push(a)):s+=a}return s+=e[e.length-1],s.trim()!==""&&i.push(s),{styles:i,behaviors:r}}function y(e,...t){const{styles:i,behaviors:s}=As(e,t),r=G.create(i);return s.length&&r.withBehaviors(...s),r}class on extends Ri{constructor(t,i){super(),this.behaviors=i,this.css="";const s=t.reduce((r,n)=>(typeof n=="string"?this.css+=n:r.push(n),r),[]);s.length&&(this.styles=G.create(s))}createBehavior(){return this}createCSS(){return this.css}bind(t){this.styles&&t.$fastController.addStyles(this.styles),this.behaviors.length&&t.$fastController.addBehaviors(this.behaviors)}unbind(t){this.styles&&t.$fastController.removeStyles(this.styles),this.behaviors.length&&t.$fastController.removeBehaviors(this.behaviors)}}function an(e,...t){const{styles:i,behaviors:s}=As(e,t);return new on(i,s)}class ln{constructor(t,i){this.target=t,this.propertyName=i}bind(t){t[this.propertyName]=this.target}unbind(){}}function Y(e){return new Ds("fast-ref",ln,e)}const Es=e=>typeof e=="function",cn=()=>null;function Yi(e){return e===void 0?cn:Es(e)?e:()=>e}function Os(e,t,i){const s=Es(e)?e:()=>e,r=Yi(t),n=Yi(i);return(o,a)=>s(o,a)?r(o,a):n(o,a)}function hn(e){return e?function(t,i,s){return t.nodeType===1&&t.matches(e)}:function(t,i,s){return t.nodeType===1}}class un{constructor(t,i){this.target=t,this.options=i,this.source=null}bind(t){const i=this.options.property;this.shouldUpdate=R.getAccessors(t).some(s=>s.name===i),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(qt),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return this.options.filter!==void 0&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class dn extends un{constructor(t,i){super(t,i)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function Di(e){return typeof e=="string"&&(e={property:e}),new Ds("fast-slotted",dn,e)}class fn{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const pn=(e,t)=>K`
    <span
        part="end"
        ${Y("endContainer")}
        class=${i=>t.end?"end":void 0}
    >
        <slot name="end" ${Y("end")} @slotchange="${i=>i.handleEndContentChange()}">
            ${t.end||""}
        </slot>
    </span>
`,gn=(e,t)=>K`
    <span
        part="start"
        ${Y("startContainer")}
        class="${i=>t.start?"start":void 0}"
    >
        <slot
            name="start"
            ${Y("start")}
            @slotchange="${i=>i.handleStartContentChange()}"
        >
            ${t.start||""}
        </slot>
    </span>
`;K`
    <span part="end" ${Y("endContainer")}>
        <slot
            name="end"
            ${Y("end")}
            @slotchange="${e=>e.handleEndContentChange()}"
        ></slot>
    </span>
`;K`
    <span part="start" ${Y("startContainer")}>
        <slot
            name="start"
            ${Y("start")}
            @slotchange="${e=>e.handleStartContentChange()}"
        ></slot>
    </span>
`;/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function f(e,t,i,s){var r=arguments.length,n=r<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,i):s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(r<3?o(n):r>3?o(t,i,n):o(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}const Ge=new Map;"metadata"in Reflect||(Reflect.metadata=function(e,t){return function(i){Reflect.defineMetadata(e,t,i)}},Reflect.defineMetadata=function(e,t,i){let s=Ge.get(i);s===void 0&&Ge.set(i,s=new Map),s.set(e,t)},Reflect.getOwnMetadata=function(e,t){const i=Ge.get(t);if(i!==void 0)return i.get(e)});class bn{constructor(t,i){this.container=t,this.key=i}instance(t){return this.registerResolver(0,t)}singleton(t){return this.registerResolver(1,t)}transient(t){return this.registerResolver(2,t)}callback(t){return this.registerResolver(3,t)}cachedCallback(t){return this.registerResolver(3,Hs(t))}aliasTo(t){return this.registerResolver(5,t)}registerResolver(t,i){const{container:s,key:r}=this;return this.container=this.key=void 0,s.registerResolver(r,new Q(r,t,i))}}function Et(e){const t=e.slice(),i=Object.keys(e),s=i.length;let r;for(let n=0;n<s;++n)r=i[n],zs(r)||(t[r]=e[r]);return t}const vn=Object.freeze({none(e){throw Error(`${e.toString()} not registered, did you forget to add @singleton()?`)},singleton(e){return new Q(e,1,e)},transient(e){return new Q(e,2,e)}}),Ue=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:vn.singleton})}),Qi=new Map;function Zi(e){return t=>Reflect.getOwnMetadata(e,t)}let Ji=null;const T=Object.freeze({createContainer(e){return new _t(null,Object.assign({},Ue.default,e))},findResponsibleContainer(e){const t=e.$$container$$;return t&&t.responsibleForOwnerRequests?t:T.findParentContainer(e)},findParentContainer(e){const t=new CustomEvent(Bs,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return e.dispatchEvent(t),t.detail.container||T.getOrCreateDOMContainer()},getOrCreateDOMContainer(e,t){return e?e.$$container$$||new _t(e,Object.assign({},Ue.default,t,{parentLocator:T.findParentContainer})):Ji||(Ji=new _t(null,Object.assign({},Ue.default,t,{parentLocator:()=>null})))},getDesignParamtypes:Zi("design:paramtypes"),getAnnotationParamtypes:Zi("di:paramtypes"),getOrCreateAnnotationParamTypes(e){let t=this.getAnnotationParamtypes(e);return t===void 0&&Reflect.defineMetadata("di:paramtypes",t=[],e),t},getDependencies(e){let t=Qi.get(e);if(t===void 0){const i=e.inject;if(i===void 0){const s=T.getDesignParamtypes(e),r=T.getAnnotationParamtypes(e);if(s===void 0)if(r===void 0){const n=Object.getPrototypeOf(e);typeof n=="function"&&n!==Function.prototype?t=Et(T.getDependencies(n)):t=[]}else t=Et(r);else if(r===void 0)t=Et(s);else{t=Et(s);let n=r.length,o;for(let c=0;c<n;++c)o=r[c],o!==void 0&&(t[c]=o);const a=Object.keys(r);n=a.length;let l;for(let c=0;c<n;++c)l=a[c],zs(l)||(t[l]=r[l])}}else t=Et(i);Qi.set(e,t)}return t},defineProperty(e,t,i,s=!1){const r=`$di_${t}`;Reflect.defineProperty(e,t,{get:function(){let n=this[r];if(n===void 0&&(n=(this instanceof HTMLElement?T.findResponsibleContainer(this):T.getOrCreateDOMContainer()).get(i),this[r]=n,s&&this instanceof xe)){const a=this.$fastController,l=()=>{const h=T.findResponsibleContainer(this).get(i),p=this[r];h!==p&&(this[r]=n,a.notify(t))};a.subscribe({handleChange:l},"isConnected")}return n}})},createInterface(e,t){const i=typeof e=="function"?e:t,s=typeof e=="string"?e:e&&"friendlyName"in e&&e.friendlyName||is,r=typeof e=="string"?!1:e&&"respectConnection"in e&&e.respectConnection||!1,n=function(o,a,l){if(o==null||new.target!==void 0)throw new Error(`No registration for interface: '${n.friendlyName}'`);if(a)T.defineProperty(o,a,n,r);else{const c=T.getOrCreateAnnotationParamTypes(o);c[l]=n}};return n.$isInterface=!0,n.friendlyName=s??"(anonymous)",i!=null&&(n.register=function(o,a){return i(new bn(o,a??n))}),n.toString=function(){return`InterfaceSymbol<${n.friendlyName}>`},n},inject(...e){return function(t,i,s){if(typeof s=="number"){const r=T.getOrCreateAnnotationParamTypes(t),n=e[0];n!==void 0&&(r[s]=n)}else if(i)T.defineProperty(t,i,e[0]);else{const r=s?T.getOrCreateAnnotationParamTypes(s.value):T.getOrCreateAnnotationParamTypes(t);let n;for(let o=0;o<e.length;++o)n=e[o],n!==void 0&&(r[o]=n)}}},transient(e){return e.register=function(i){return Qt.transient(e,e).register(i)},e.registerInRequestor=!1,e},singleton(e,t=yn){return e.register=function(s){return Qt.singleton(e,e).register(s)},e.registerInRequestor=t.scoped,e}}),mn=T.createInterface("Container");T.inject;const yn={scoped:!1};class Q{constructor(t,i,s){this.key=t,this.strategy=i,this.state=s,this.resolving=!1}get $isResolver(){return!0}register(t){return t.registerResolver(this.key,this)}resolve(t,i){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=t.getFactory(this.state).construct(i),this.strategy=0,this.resolving=!1,this.state}case 2:{const s=t.getFactory(this.state);if(s===null)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return s.construct(i)}case 3:return this.state(t,i,this);case 4:return this.state[0].resolve(t,i);case 5:return i.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(t){var i,s,r;switch(this.strategy){case 1:case 2:return t.getFactory(this.state);case 5:return(r=(s=(i=t.getResolver(this.state))===null||i===void 0?void 0:i.getFactory)===null||s===void 0?void 0:s.call(i,t))!==null&&r!==void 0?r:null;default:return null}}}function Ki(e){return this.get(e)}function wn(e,t){return t(e)}class xn{constructor(t,i){this.Type=t,this.dependencies=i,this.transformers=null}construct(t,i){let s;return i===void 0?s=new this.Type(...this.dependencies.map(Ki,t)):s=new this.Type(...this.dependencies.map(Ki,t),...i),this.transformers==null?s:this.transformers.reduce(wn,s)}registerTransformer(t){(this.transformers||(this.transformers=[])).push(t)}}const kn={$isResolver:!0,resolve(e,t){return t}};function ce(e){return typeof e.register=="function"}function $n(e){return ce(e)&&typeof e.registerInRequestor=="boolean"}function ts(e){return $n(e)&&e.registerInRequestor}function Sn(e){return e.prototype!==void 0}const Cn=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),Bs="__DI_LOCATE_PARENT__",_e=new Map;class _t{constructor(t,i){this.owner=t,this.config=i,this._parent=void 0,this.registerDepth=0,this.context=null,t!==null&&(t.$$container$$=this),this.resolvers=new Map,this.resolvers.set(mn,kn),t instanceof Node&&t.addEventListener(Bs,s=>{s.composedPath()[0]!==this.owner&&(s.detail.container=this,s.stopImmediatePropagation())})}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(t,...i){return this.context=t,this.register(...i),this.context=null,this}register(...t){if(++this.registerDepth===100)throw new Error("Unable to autoregister dependency");let i,s,r,n,o;const a=this.context;for(let l=0,c=t.length;l<c;++l)if(i=t[l],!!ss(i))if(ce(i))i.register(this,a);else if(Sn(i))Qt.singleton(i,i).register(this);else for(s=Object.keys(i),n=0,o=s.length;n<o;++n)r=i[s[n]],ss(r)&&(ce(r)?r.register(this,a):this.register(r));return--this.registerDepth,this}registerResolver(t,i){re(t);const s=this.resolvers,r=s.get(t);return r==null?s.set(t,i):r instanceof Q&&r.strategy===4?r.state.push(i):s.set(t,new Q(t,4,[r,i])),i}registerTransformer(t,i){const s=this.getResolver(t);if(s==null)return!1;if(s.getFactory){const r=s.getFactory(this);return r==null?!1:(r.registerTransformer(i),!0)}return!1}getResolver(t,i=!0){if(re(t),t.resolve!==void 0)return t;let s=this,r;for(;s!=null;)if(r=s.resolvers.get(t),r==null){if(s.parent==null){const n=ts(t)?this:s;return i?this.jitRegister(t,n):null}s=s.parent}else return r;return null}has(t,i=!1){return this.resolvers.has(t)?!0:i&&this.parent!=null?this.parent.has(t,!0):!1}get(t){if(re(t),t.$isResolver)return t.resolve(this,this);let i=this,s;for(;i!=null;)if(s=i.resolvers.get(t),s==null){if(i.parent==null){const r=ts(t)?this:i;return s=this.jitRegister(t,r),s.resolve(i,this)}i=i.parent}else return s.resolve(i,this);throw new Error(`Unable to resolve key: ${t}`)}getAll(t,i=!1){re(t);const s=this;let r=s,n;if(i){let o=qt;for(;r!=null;)n=r.resolvers.get(t),n!=null&&(o=o.concat(es(n,r,s))),r=r.parent;return o}else for(;r!=null;)if(n=r.resolvers.get(t),n==null){if(r=r.parent,r==null)return qt}else return es(n,r,s);return qt}getFactory(t){let i=_e.get(t);if(i===void 0){if(Fn(t))throw new Error(`${t.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);_e.set(t,i=new xn(t,T.getDependencies(t)))}return i}registerFactory(t,i){_e.set(t,i)}createChild(t){return new _t(null,Object.assign({},this.config,t,{parentLocator:()=>this}))}jitRegister(t,i){if(typeof t!="function")throw new Error(`Attempted to jitRegister something that is not a constructor: '${t}'. Did you forget to register this dependency?`);if(Cn.has(t.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${t.name}. Did you forget to add @inject(Key)`);if(ce(t)){const s=t.register(i);if(!(s instanceof Object)||s.resolve==null){const r=i.resolvers.get(t);if(r!=null)return r;throw new Error("A valid resolver was not returned from the static register method")}return s}else{if(t.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${t.friendlyName}`);{const s=this.config.defaultResolver(t,i);return i.resolvers.set(t,s),s}}}}const Xe=new WeakMap;function Hs(e){return function(t,i,s){if(Xe.has(s))return Xe.get(s);const r=e(t,i,s);return Xe.set(s,r),r}}const Qt=Object.freeze({instance(e,t){return new Q(e,0,t)},singleton(e,t){return new Q(e,1,t)},transient(e,t){return new Q(e,2,t)},callback(e,t){return new Q(e,3,t)},cachedCallback(e,t){return new Q(e,3,Hs(t))},aliasTo(e,t){return new Q(t,5,e)}});function re(e){if(e==null)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function es(e,t,i){if(e instanceof Q&&e.strategy===4){const s=e.state;let r=s.length;const n=new Array(r);for(;r--;)n[r]=s[r].resolve(t,i);return n}return[e.resolve(t,i)]}const is="(anonymous)";function ss(e){return typeof e=="object"&&e!==null||typeof e=="function"}const Fn=function(){const e=new WeakMap;let t=!1,i="",s=0;return function(r){return t=e.get(r),t===void 0&&(i=r.toString(),s=i.length,t=s>=29&&s<=100&&i.charCodeAt(s-1)===125&&i.charCodeAt(s-2)<=32&&i.charCodeAt(s-3)===93&&i.charCodeAt(s-4)===101&&i.charCodeAt(s-5)===100&&i.charCodeAt(s-6)===111&&i.charCodeAt(s-7)===99&&i.charCodeAt(s-8)===32&&i.charCodeAt(s-9)===101&&i.charCodeAt(s-10)===118&&i.charCodeAt(s-11)===105&&i.charCodeAt(s-12)===116&&i.charCodeAt(s-13)===97&&i.charCodeAt(s-14)===110&&i.charCodeAt(s-15)===88,e.set(r,t)),t}}(),ne={};function zs(e){switch(typeof e){case"number":return e>=0&&(e|0)===e;case"string":{const t=ne[e];if(t!==void 0)return t;const i=e.length;if(i===0)return ne[e]=!1;let s=0;for(let r=0;r<i;++r)if(s=e.charCodeAt(r),r===0&&s===48&&i>1||s<48||s>57)return ne[e]=!1;return ne[e]=!0}default:return!1}}function rs(e){return`${e.toLowerCase()}:presentation`}const oe=new Map,js=Object.freeze({define(e,t,i){const s=rs(e);oe.get(s)===void 0?oe.set(s,t):oe.set(s,!1),i.register(Qt.instance(s,t))},forTag(e,t){const i=rs(e),s=oe.get(i);return s===!1?T.findResponsibleContainer(t).get(i):s||null}});class Tn{constructor(t,i){this.template=t||null,this.styles=i===void 0?null:Array.isArray(i)?G.create(i):i instanceof G?i:G.create([i])}applyTo(t){const i=t.$fastController;i.template===null&&(i.template=this.template),i.styles===null&&(i.styles=this.styles)}}class tt extends xe{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return this._presentation===void 0&&(this._presentation=js.forTag(this.tagName,this)),this._presentation}templateChanged(){this.template!==void 0&&(this.$fastController.template=this.template)}stylesChanged(){this.styles!==void 0&&(this.$fastController.styles=this.styles)}connectedCallback(){this.$presentation!==null&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(t){return(i={})=>new Rn(this===tt?class extends tt{}:this,t,i)}}f([F],tt.prototype,"template",void 0);f([F],tt.prototype,"styles",void 0);function Ot(e,t,i){return typeof e=="function"?e(t,i):e}class Rn{constructor(t,i,s){this.type=t,this.elementDefinition=i,this.overrideDefinition=s,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(t,i){const s=this.definition,r=this.overrideDefinition,o=`${s.prefix||i.elementPrefix}-${s.baseName}`;i.tryDefineElement({name:o,type:this.type,baseClass:this.elementDefinition.baseClass,callback:a=>{const l=new Tn(Ot(s.template,a,s),Ot(s.styles,a,s));a.definePresentation(l);let c=Ot(s.shadowOptions,a,s);a.shadowRootMode&&(c?r.shadowOptions||(c.mode=a.shadowRootMode):c!==null&&(c={mode:a.shadowRootMode})),a.defineElement({elementOptions:Ot(s.elementOptions,a,s),shadowOptions:c,attributes:Ot(s.attributes,a,s)})}})}}function Ws(e,...t){const i=ue.locate(e);t.forEach(s=>{Object.getOwnPropertyNames(s.prototype).forEach(n=>{n!=="constructor"&&Object.defineProperty(e.prototype,n,Object.getOwnPropertyDescriptor(s.prototype,n))}),ue.locate(s).forEach(n=>i.push(n))})}const H={horizontal:"horizontal",vertical:"vertical"};function Dn(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function Mn(){const e=document.querySelector('meta[property="csp-nonce"]');return e?e.getAttribute("content"):null}let xt;function Vn(){if(typeof xt=="boolean")return xt;if(!Dn())return xt=!1,xt;const e=document.createElement("style"),t=Mn();t!==null&&e.setAttribute("nonce",t),document.head.appendChild(e);try{e.sheet.insertRule("foo:focus-visible {color:inherit}",0),xt=!0}catch{xt=!1}finally{document.head.removeChild(e)}return xt}var ns;(function(e){e[e.alt=18]="alt",e[e.arrowDown=40]="arrowDown",e[e.arrowLeft=37]="arrowLeft",e[e.arrowRight=39]="arrowRight",e[e.arrowUp=38]="arrowUp",e[e.back=8]="back",e[e.backSlash=220]="backSlash",e[e.break=19]="break",e[e.capsLock=20]="capsLock",e[e.closeBracket=221]="closeBracket",e[e.colon=186]="colon",e[e.colon2=59]="colon2",e[e.comma=188]="comma",e[e.ctrl=17]="ctrl",e[e.delete=46]="delete",e[e.end=35]="end",e[e.enter=13]="enter",e[e.equals=187]="equals",e[e.equals2=61]="equals2",e[e.equals3=107]="equals3",e[e.escape=27]="escape",e[e.forwardSlash=191]="forwardSlash",e[e.function1=112]="function1",e[e.function10=121]="function10",e[e.function11=122]="function11",e[e.function12=123]="function12",e[e.function2=113]="function2",e[e.function3=114]="function3",e[e.function4=115]="function4",e[e.function5=116]="function5",e[e.function6=117]="function6",e[e.function7=118]="function7",e[e.function8=119]="function8",e[e.function9=120]="function9",e[e.home=36]="home",e[e.insert=45]="insert",e[e.menu=93]="menu",e[e.minus=189]="minus",e[e.minus2=109]="minus2",e[e.numLock=144]="numLock",e[e.numPad0=96]="numPad0",e[e.numPad1=97]="numPad1",e[e.numPad2=98]="numPad2",e[e.numPad3=99]="numPad3",e[e.numPad4=100]="numPad4",e[e.numPad5=101]="numPad5",e[e.numPad6=102]="numPad6",e[e.numPad7=103]="numPad7",e[e.numPad8=104]="numPad8",e[e.numPad9=105]="numPad9",e[e.numPadDivide=111]="numPadDivide",e[e.numPadDot=110]="numPadDot",e[e.numPadMinus=109]="numPadMinus",e[e.numPadMultiply=106]="numPadMultiply",e[e.numPadPlus=107]="numPadPlus",e[e.openBracket=219]="openBracket",e[e.pageDown=34]="pageDown",e[e.pageUp=33]="pageUp",e[e.period=190]="period",e[e.print=44]="print",e[e.quote=222]="quote",e[e.scrollLock=145]="scrollLock",e[e.shift=16]="shift",e[e.space=32]="space",e[e.tab=9]="tab",e[e.tilde=192]="tilde",e[e.windowsLeft=91]="windowsLeft",e[e.windowsOpera=219]="windowsOpera",e[e.windowsRight=92]="windowsRight"})(ns||(ns={}));const Mi="ArrowDown",fe="ArrowLeft",pe="ArrowRight",Vi="ArrowUp",qs="Enter",Ln="Escape",In="Home",Pn="End",Nn=" ",An="Tab",En={ArrowDown:Mi,ArrowLeft:fe,ArrowRight:pe,ArrowUp:Vi};var E;(function(e){e.ltr="ltr",e.rtl="rtl"})(E||(E={}));function On(e,t,i){return Math.min(Math.max(i,e),t)}var u;(function(e){e.Canvas="Canvas",e.CanvasText="CanvasText",e.LinkText="LinkText",e.VisitedText="VisitedText",e.ActiveText="ActiveText",e.ButtonFace="ButtonFace",e.ButtonText="ButtonText",e.Field="Field",e.FieldText="FieldText",e.Highlight="Highlight",e.HighlightText="HighlightText",e.GrayText="GrayText"})(u||(u={}));class V{}f([g({attribute:"aria-atomic"})],V.prototype,"ariaAtomic",void 0);f([g({attribute:"aria-busy"})],V.prototype,"ariaBusy",void 0);f([g({attribute:"aria-controls"})],V.prototype,"ariaControls",void 0);f([g({attribute:"aria-current"})],V.prototype,"ariaCurrent",void 0);f([g({attribute:"aria-describedby"})],V.prototype,"ariaDescribedby",void 0);f([g({attribute:"aria-details"})],V.prototype,"ariaDetails",void 0);f([g({attribute:"aria-disabled"})],V.prototype,"ariaDisabled",void 0);f([g({attribute:"aria-errormessage"})],V.prototype,"ariaErrormessage",void 0);f([g({attribute:"aria-flowto"})],V.prototype,"ariaFlowto",void 0);f([g({attribute:"aria-haspopup"})],V.prototype,"ariaHaspopup",void 0);f([g({attribute:"aria-hidden"})],V.prototype,"ariaHidden",void 0);f([g({attribute:"aria-invalid"})],V.prototype,"ariaInvalid",void 0);f([g({attribute:"aria-keyshortcuts"})],V.prototype,"ariaKeyshortcuts",void 0);f([g({attribute:"aria-label"})],V.prototype,"ariaLabel",void 0);f([g({attribute:"aria-labelledby"})],V.prototype,"ariaLabelledby",void 0);f([g({attribute:"aria-live"})],V.prototype,"ariaLive",void 0);f([g({attribute:"aria-owns"})],V.prototype,"ariaOwns",void 0);f([g({attribute:"aria-relevant"})],V.prototype,"ariaRelevant",void 0);f([g({attribute:"aria-roledescription"})],V.prototype,"ariaRoledescription",void 0);const Gs=e=>{const t=e.closest("[dir]");return t!==null&&t.dir==="rtl"?E.rtl:E.ltr},Bn=(e,t)=>K`
    <button
        class="control"
        part="control"
        ?autofocus="${i=>i.autofocus}"
        ?disabled="${i=>i.disabled}"
        form="${i=>i.formId}"
        formaction="${i=>i.formaction}"
        formenctype="${i=>i.formenctype}"
        formmethod="${i=>i.formmethod}"
        formnovalidate="${i=>i.formnovalidate}"
        formtarget="${i=>i.formtarget}"
        name="${i=>i.name}"
        type="${i=>i.type}"
        value="${i=>i.value}"
        aria-atomic="${i=>i.ariaAtomic}"
        aria-busy="${i=>i.ariaBusy}"
        aria-controls="${i=>i.ariaControls}"
        aria-current="${i=>i.ariaCurrent}"
        aria-describedby="${i=>i.ariaDescribedby}"
        aria-details="${i=>i.ariaDetails}"
        aria-disabled="${i=>i.ariaDisabled}"
        aria-errormessage="${i=>i.ariaErrormessage}"
        aria-expanded="${i=>i.ariaExpanded}"
        aria-flowto="${i=>i.ariaFlowto}"
        aria-haspopup="${i=>i.ariaHaspopup}"
        aria-hidden="${i=>i.ariaHidden}"
        aria-invalid="${i=>i.ariaInvalid}"
        aria-keyshortcuts="${i=>i.ariaKeyshortcuts}"
        aria-label="${i=>i.ariaLabel}"
        aria-labelledby="${i=>i.ariaLabelledby}"
        aria-live="${i=>i.ariaLive}"
        aria-owns="${i=>i.ariaOwns}"
        aria-pressed="${i=>i.ariaPressed}"
        aria-relevant="${i=>i.ariaRelevant}"
        aria-roledescription="${i=>i.ariaRoledescription}"
        ${Y("control")}
    >
        ${gn(e,t)}
        <span class="content" part="content">
            <slot ${Di("defaultSlottedContent")}></slot>
        </span>
        ${pn(e,t)}
    </button>
`,os="form-associated-proxy",as="ElementInternals",ls=as in window&&"setFormValue"in window[as].prototype,cs=new WeakMap;function Li(e){const t=class extends e{constructor(...i){super(...i),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return ls}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const i=this.proxy.labels,s=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),r=i?s.concat(Array.from(i)):s;return Object.freeze(r)}else return qt}valueChanged(i,s){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(i,s){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(i,s){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),S.queueUpdate(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(i,s){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(i,s){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),S.queueUpdate(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!ls)return null;let i=cs.get(this);return i||(i=this.attachInternals(),cs.set(this,i)),i}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){this.proxyEventsToBlock.forEach(i=>this.proxy.removeEventListener(i,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(i,s,r){this.elementInternals?this.elementInternals.setValidity(i,s,r):typeof s=="string"&&this.proxy.setCustomValidity(s)}formDisabledCallback(i){this.disabled=i}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var i;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(s=>this.proxy.addEventListener(s,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",os),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",os)),(i=this.shadowRoot)===null||i===void 0||i.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var i;this.removeChild(this.proxy),(i=this.shadowRoot)===null||i===void 0||i.removeChild(this.proxySlot)}validate(i){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,i)}setFormValue(i,s){this.elementInternals&&this.elementInternals.setFormValue(i,s||i)}_keypressHandler(i){switch(i.key){case qs:if(this.form instanceof HTMLFormElement){const s=this.form.querySelector("[type=submit]");s==null||s.click()}break}}stopPropagation(i){i.stopPropagation()}};return g({mode:"boolean"})(t.prototype,"disabled"),g({mode:"fromView",attribute:"value"})(t.prototype,"initialValue"),g({attribute:"current-value"})(t.prototype,"currentValue"),g(t.prototype,"name"),g({mode:"boolean"})(t.prototype,"required"),F(t.prototype,"value"),t}function Hn(e){class t extends Li(e){}class i extends t{constructor(...r){super(r),this.dirtyChecked=!1,this.checkedAttribute=!1,this.checked=!1,this.dirtyChecked=!1}checkedAttributeChanged(){this.defaultChecked=this.checkedAttribute}defaultCheckedChanged(){this.dirtyChecked||(this.checked=this.defaultChecked,this.dirtyChecked=!1)}checkedChanged(r,n){this.dirtyChecked||(this.dirtyChecked=!0),this.currentChecked=this.checked,this.updateForm(),this.proxy instanceof HTMLInputElement&&(this.proxy.checked=this.checked),r!==void 0&&this.$emit("change"),this.validate()}currentCheckedChanged(r,n){this.checked=this.currentChecked}updateForm(){const r=this.checked?this.value:null;this.setFormValue(r,r)}connectedCallback(){super.connectedCallback(),this.updateForm()}formResetCallback(){super.formResetCallback(),this.checked=!!this.checkedAttribute,this.dirtyChecked=!1}}return g({attribute:"checked",mode:"boolean"})(i.prototype,"checkedAttribute"),g({attribute:"current-checked",converter:Ps})(i.prototype,"currentChecked"),F(i.prototype,"defaultChecked"),F(i.prototype,"checked"),i}class zn extends tt{}class jn extends Li(zn){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let et=class extends jn{constructor(){super(...arguments),this.handleClick=t=>{var i;this.disabled&&((i=this.defaultSlottedContent)===null||i===void 0?void 0:i.length)<=1&&t.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const t=this.proxy.isConnected;t||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),t||this.detachProxy()},this.handleFormReset=()=>{var t;(t=this.form)===null||t===void 0||t.reset()},this.handleUnsupportedDelegatesFocus=()=>{var t;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(!((t=this.$fastController.definition.shadowOptions)===null||t===void 0)&&t.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(t,i){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),i==="submit"&&this.addEventListener("click",this.handleSubmission),t==="submit"&&this.removeEventListener("click",this.handleSubmission),i==="reset"&&this.addEventListener("click",this.handleFormReset),t==="reset"&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var t;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const i=Array.from((t=this.control)===null||t===void 0?void 0:t.children);i&&i.forEach(s=>{s.addEventListener("click",this.handleClick)})}disconnectedCallback(){var t;super.disconnectedCallback();const i=Array.from((t=this.control)===null||t===void 0?void 0:t.children);i&&i.forEach(s=>{s.removeEventListener("click",this.handleClick)})}};f([g({mode:"boolean"})],et.prototype,"autofocus",void 0);f([g({attribute:"form"})],et.prototype,"formId",void 0);f([g],et.prototype,"formaction",void 0);f([g],et.prototype,"formenctype",void 0);f([g],et.prototype,"formmethod",void 0);f([g({mode:"boolean"})],et.prototype,"formnovalidate",void 0);f([g],et.prototype,"formtarget",void 0);f([g],et.prototype,"type",void 0);f([F],et.prototype,"defaultSlottedContent",void 0);class ke{}f([g({attribute:"aria-expanded"})],ke.prototype,"ariaExpanded",void 0);f([g({attribute:"aria-pressed"})],ke.prototype,"ariaPressed",void 0);Ws(ke,V);Ws(et,fn,ke);function ni(e){const t=e.parentElement;if(t)return t;{const i=e.getRootNode();if(i.host instanceof HTMLElement)return i.host}return null}function Wn(e,t){let i=t;for(;i!==null;){if(i===e)return!0;i=ni(i)}return!1}const ht=document.createElement("div");function qn(e){return e instanceof xe}class Ii{setProperty(t,i){S.queueUpdate(()=>this.target.setProperty(t,i))}removeProperty(t){S.queueUpdate(()=>this.target.removeProperty(t))}}class Gn extends Ii{constructor(t){super();const i=new CSSStyleSheet;this.target=i.cssRules[i.insertRule(":host{}")].style,t.$fastController.addStyles(G.create([i]))}}class Un extends Ii{constructor(){super();const t=new CSSStyleSheet;this.target=t.cssRules[t.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,t]}}class _n extends Ii{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:t}=this.style;if(t){const i=t.insertRule(":root{}",t.cssRules.length);this.target=t.cssRules[i].style}}}class Us{constructor(t){this.store=new Map,this.target=null;const i=t.$fastController;this.style=document.createElement("style"),i.addStyles(this.style),R.getNotifier(i).subscribe(this,"isConnected"),this.handleChange(i,"isConnected")}targetChanged(){if(this.target!==null)for(const[t,i]of this.store.entries())this.target.setProperty(t,i)}setProperty(t,i){this.store.set(t,i),S.queueUpdate(()=>{this.target!==null&&this.target.setProperty(t,i)})}removeProperty(t){this.store.delete(t),S.queueUpdate(()=>{this.target!==null&&this.target.removeProperty(t)})}handleChange(t,i){const{sheet:s}=this.style;if(s){const r=s.insertRule(":host{}",s.cssRules.length);this.target=s.cssRules[r].style}else this.target=null}}f([F],Us.prototype,"target",void 0);class Xn{constructor(t){this.target=t.style}setProperty(t,i){S.queueUpdate(()=>this.target.setProperty(t,i))}removeProperty(t){S.queueUpdate(()=>this.target.removeProperty(t))}}class P{setProperty(t,i){P.properties[t]=i;for(const s of P.roots.values())Ct.getOrCreate(P.normalizeRoot(s)).setProperty(t,i)}removeProperty(t){delete P.properties[t];for(const i of P.roots.values())Ct.getOrCreate(P.normalizeRoot(i)).removeProperty(t)}static registerRoot(t){const{roots:i}=P;if(!i.has(t)){i.add(t);const s=Ct.getOrCreate(this.normalizeRoot(t));for(const r in P.properties)s.setProperty(r,P.properties[r])}}static unregisterRoot(t){const{roots:i}=P;if(i.has(t)){i.delete(t);const s=Ct.getOrCreate(P.normalizeRoot(t));for(const r in P.properties)s.removeProperty(r)}}static normalizeRoot(t){return t===ht?document:t}}P.roots=new Set;P.properties={};const Ye=new WeakMap,Yn=S.supportsAdoptedStyleSheets?Gn:Us,Ct=Object.freeze({getOrCreate(e){if(Ye.has(e))return Ye.get(e);let t;return e===ht?t=new P:e instanceof Document?t=S.supportsAdoptedStyleSheets?new Un:new _n:qn(e)?t=new Yn(e):t=new Xn(e),Ye.set(e,t),t}});class W extends Ri{constructor(t){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=t.name,t.cssCustomPropertyName!==null&&(this.cssCustomProperty=`--${t.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=W.uniqueId(),W.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(t){return new W({name:typeof t=="string"?t:t.name,cssCustomPropertyName:typeof t=="string"?t:t.cssCustomPropertyName===void 0?t.name:t.cssCustomPropertyName})}static isCSSDesignToken(t){return typeof t.cssCustomProperty=="string"}static isDerivedDesignTokenValue(t){return typeof t=="function"}static getTokenById(t){return W.tokensById.get(t)}getOrCreateSubscriberSet(t=this){return this.subscribers.get(t)||this.subscribers.set(t,new Set)&&this.subscribers.get(t)}createCSS(){return this.cssVar||""}getValueFor(t){const i=D.getOrCreate(t).get(this);if(i!==void 0)return i;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${t} or an ancestor of ${t}.`)}setValueFor(t,i){return this._appliedTo.add(t),i instanceof W&&(i=this.alias(i)),D.getOrCreate(t).set(this,i),this}deleteValueFor(t){return this._appliedTo.delete(t),D.existsFor(t)&&D.getOrCreate(t).delete(this),this}withDefault(t){return this.setValueFor(ht,t),this}subscribe(t,i){const s=this.getOrCreateSubscriberSet(i);i&&!D.existsFor(i)&&D.getOrCreate(i),s.has(t)||s.add(t)}unsubscribe(t,i){const s=this.subscribers.get(i||this);s&&s.has(t)&&s.delete(t)}notify(t){const i=Object.freeze({token:this,target:t});this.subscribers.has(this)&&this.subscribers.get(this).forEach(s=>s.handleChange(i)),this.subscribers.has(t)&&this.subscribers.get(t).forEach(s=>s.handleChange(i))}alias(t){return i=>t.getValueFor(i)}}W.uniqueId=(()=>{let e=0;return()=>(e++,e.toString(16))})();W.tokensById=new Map;class Qn{startReflection(t,i){t.subscribe(this,i),this.handleChange({token:t,target:i})}stopReflection(t,i){t.unsubscribe(this,i),this.remove(t,i)}handleChange(t){const{token:i,target:s}=t;this.add(i,s)}add(t,i){Ct.getOrCreate(i).setProperty(t.cssCustomProperty,this.resolveCSSValue(D.getOrCreate(i).get(t)))}remove(t,i){Ct.getOrCreate(i).removeProperty(t.cssCustomProperty)}resolveCSSValue(t){return t&&typeof t.createCSS=="function"?t.createCSS():t}}class Zn{constructor(t,i,s){this.source=t,this.token=i,this.node=s,this.dependencies=new Set,this.observer=R.binding(t,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){this.node.store.set(this.token,this.observer.observe(this.node.target,Ut))}}class Jn{constructor(){this.values=new Map}set(t,i){this.values.get(t)!==i&&(this.values.set(t,i),R.getNotifier(this).notify(t.id))}get(t){return R.track(this,t.id),this.values.get(t)}delete(t){this.values.delete(t)}all(){return this.values.entries()}}const Bt=new WeakMap,Ht=new WeakMap;class D{constructor(t){this.target=t,this.store=new Jn,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(i,s)=>{const r=W.getTokenById(s);if(r&&(r.notify(this.target),W.isCSSDesignToken(r))){const n=this.parent,o=this.isReflecting(r);if(n){const a=n.get(r),l=i.get(r);a!==l&&!o?this.reflectToCSS(r):a===l&&o&&this.stopReflectToCSS(r)}else o||this.reflectToCSS(r)}}},Bt.set(t,this),R.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),t instanceof xe?t.$fastController.addBehaviors([this]):t.isConnected&&this.bind()}static getOrCreate(t){return Bt.get(t)||new D(t)}static existsFor(t){return Bt.has(t)}static findParent(t){if(ht!==t.target){let i=ni(t.target);for(;i!==null;){if(Bt.has(i))return Bt.get(i);i=ni(i)}return D.getOrCreate(ht)}return null}static findClosestAssignedNode(t,i){let s=i;do{if(s.has(t))return s;s=s.parent?s.parent:s.target!==ht?D.getOrCreate(ht):null}while(s!==null);return null}get parent(){return Ht.get(this)||null}has(t){return this.assignedValues.has(t)}get(t){const i=this.store.get(t);if(i!==void 0)return i;const s=this.getRaw(t);if(s!==void 0)return this.hydrate(t,s),this.get(t)}getRaw(t){var i;return this.assignedValues.has(t)?this.assignedValues.get(t):(i=D.findClosestAssignedNode(t,this))===null||i===void 0?void 0:i.getRaw(t)}set(t,i){W.isDerivedDesignTokenValue(this.assignedValues.get(t))&&this.tearDownBindingObserver(t),this.assignedValues.set(t,i),W.isDerivedDesignTokenValue(i)?this.setupBindingObserver(t,i):this.store.set(t,i)}delete(t){this.assignedValues.delete(t),this.tearDownBindingObserver(t);const i=this.getRaw(t);i?this.hydrate(t,i):this.store.delete(t)}bind(){const t=D.findParent(this);t&&t.appendChild(this);for(const i of this.assignedValues.keys())i.notify(this.target)}unbind(){this.parent&&Ht.get(this).removeChild(this)}appendChild(t){t.parent&&Ht.get(t).removeChild(t);const i=this.children.filter(s=>t.contains(s));Ht.set(t,this),this.children.push(t),i.forEach(s=>t.appendChild(s)),R.getNotifier(this.store).subscribe(t);for(const[s,r]of this.store.all())t.hydrate(s,this.bindingObservers.has(s)?this.getRaw(s):r)}removeChild(t){const i=this.children.indexOf(t);return i!==-1&&this.children.splice(i,1),R.getNotifier(this.store).unsubscribe(t),t.parent===this?Ht.delete(t):!1}contains(t){return Wn(this.target,t.target)}reflectToCSS(t){this.isReflecting(t)||(this.reflecting.add(t),D.cssCustomPropertyReflector.startReflection(t,this.target))}stopReflectToCSS(t){this.isReflecting(t)&&(this.reflecting.delete(t),D.cssCustomPropertyReflector.stopReflection(t,this.target))}isReflecting(t){return this.reflecting.has(t)}handleChange(t,i){const s=W.getTokenById(i);s&&this.hydrate(s,this.getRaw(s))}hydrate(t,i){if(!this.has(t)){const s=this.bindingObservers.get(t);W.isDerivedDesignTokenValue(i)?s?s.source!==i&&(this.tearDownBindingObserver(t),this.setupBindingObserver(t,i)):this.setupBindingObserver(t,i):(s&&this.tearDownBindingObserver(t),this.store.set(t,i))}}setupBindingObserver(t,i){const s=new Zn(i,t,this);return this.bindingObservers.set(t,s),s}tearDownBindingObserver(t){return this.bindingObservers.has(t)?(this.bindingObservers.get(t).disconnect(),this.bindingObservers.delete(t),!0):!1}}D.cssCustomPropertyReflector=new Qn;f([F],D.prototype,"children",void 0);function Kn(e){return W.from(e)}const $e=Object.freeze({create:Kn,notifyConnection(e){return!e.isConnected||!D.existsFor(e)?!1:(D.getOrCreate(e).bind(),!0)},notifyDisconnection(e){return e.isConnected||!D.existsFor(e)?!1:(D.getOrCreate(e).unbind(),!0)},registerRoot(e=ht){P.registerRoot(e)},unregisterRoot(e=ht){P.unregisterRoot(e)}}),Qe=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),Ze=new Map,he=new Map;let Tt=null;const zt=T.createInterface(e=>e.cachedCallback(t=>(Tt===null&&(Tt=new Xs(null,t)),Tt))),_s=Object.freeze({tagFor(e){return he.get(e)},responsibleFor(e){const t=e.$$designSystem$$;return t||T.findResponsibleContainer(e).get(zt)},getOrCreate(e){if(!e)return Tt===null&&(Tt=T.getOrCreateDOMContainer().get(zt)),Tt;const t=e.$$designSystem$$;if(t)return t;const i=T.getOrCreateDOMContainer(e);if(i.has(zt,!1))return i.get(zt);{const s=new Xs(e,i);return i.register(Qt.instance(zt,s)),s}}});function to(e,t,i){return typeof e=="string"?{name:e,type:t,callback:i}:e}class Xs{constructor(t,i){this.owner=t,this.container=i,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>Qe.definitionCallbackOnly,t!==null&&(t.$$designSystem$$=this)}withPrefix(t){return this.prefix=t,this}withShadowRootMode(t){return this.shadowRootMode=t,this}withElementDisambiguation(t){return this.disambiguate=t,this}withDesignTokenRoot(t){return this.designTokenRoot=t,this}register(...t){const i=this.container,s=[],r=this.disambiguate,n=this.shadowRootMode,o={elementPrefix:this.prefix,tryDefineElement(a,l,c){const h=to(a,l,c),{name:p,callback:b,baseClass:k}=h;let{type:m}=h,w=p,N=Ze.get(w),wt=!0;for(;N;){const lt=r(w,m,N);switch(lt){case Qe.ignoreDuplicate:return;case Qe.definitionCallbackOnly:wt=!1,N=void 0;break;default:w=lt,N=Ze.get(w);break}}wt&&((he.has(m)||m===tt)&&(m=class extends m{}),Ze.set(w,m),he.set(m,w),k&&he.set(k,w)),s.push(new eo(i,w,m,n,b,wt))}};this.designTokensInitialized||(this.designTokensInitialized=!0,this.designTokenRoot!==null&&$e.registerRoot(this.designTokenRoot)),i.registerWithContext(o,...t);for(const a of s)a.callback(a),a.willDefine&&a.definition!==null&&a.definition.define();return this}}class eo{constructor(t,i,s,r,n,o){this.container=t,this.name=i,this.type=s,this.shadowRootMode=r,this.callback=n,this.willDefine=o,this.definition=null}definePresentation(t){js.define(this.name,t,this.container)}defineElement(t){this.definition=new we(this.type,Object.assign(Object.assign({},t),{name:this.name}))}tagFor(t){return _s.tagFor(t)}}const io=(e,t)=>K`
    <div class="positioning-region" part="positioning-region">
        ${Os(i=>i.modal,K`
                <div
                    class="overlay"
                    part="overlay"
                    role="presentation"
                    @click="${i=>i.dismiss()}"
                ></div>
            `)}
        <div
            role="dialog"
            tabindex="-1"
            class="control"
            part="control"
            aria-modal="${i=>i.modal}"
            aria-describedby="${i=>i.ariaDescribedby}"
            aria-labelledby="${i=>i.ariaLabelledby}"
            aria-label="${i=>i.ariaLabel}"
            ${Y("dialog")}
        >
            <slot></slot>
        </div>
    </div>
`;/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var so=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],ro=so.join(","),Ys=typeof Element>"u",ge=Ys?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,oi=!Ys&&Element.prototype.getRootNode?function(e){return e.getRootNode()}:function(e){return e.ownerDocument},no=function(t,i){return t.tabIndex<0&&(i||/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName)||t.isContentEditable)&&isNaN(parseInt(t.getAttribute("tabindex"),10))?0:t.tabIndex},Qs=function(t){return t.tagName==="INPUT"},oo=function(t){return Qs(t)&&t.type==="hidden"},ao=function(t){var i=t.tagName==="DETAILS"&&Array.prototype.slice.apply(t.children).some(function(s){return s.tagName==="SUMMARY"});return i},lo=function(t,i){for(var s=0;s<t.length;s++)if(t[s].checked&&t[s].form===i)return t[s]},co=function(t){if(!t.name)return!0;var i=t.form||oi(t),s=function(a){return i.querySelectorAll('input[type="radio"][name="'+a+'"]')},r;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")r=s(window.CSS.escape(t.name));else try{r=s(t.name)}catch(o){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",o.message),!1}var n=lo(r,t.form);return!n||n===t},ho=function(t){return Qs(t)&&t.type==="radio"},uo=function(t){return ho(t)&&!co(t)},hs=function(t){var i=t.getBoundingClientRect(),s=i.width,r=i.height;return s===0&&r===0},fo=function(t,i){var s=i.displayCheck,r=i.getShadowRoot;if(getComputedStyle(t).visibility==="hidden")return!0;var n=ge.call(t,"details>summary:first-of-type"),o=n?t.parentElement:t;if(ge.call(o,"details:not([open]) *"))return!0;var a=oi(t).host,l=(a==null?void 0:a.ownerDocument.contains(a))||t.ownerDocument.contains(t);if(!s||s==="full"){if(typeof r=="function"){for(var c=t;t;){var h=t.parentElement,p=oi(t);if(h&&!h.shadowRoot&&r(h)===!0)return hs(t);t.assignedSlot?t=t.assignedSlot:!h&&p!==t.ownerDocument?t=p.host:t=h}t=c}if(l)return!t.getClientRects().length}else if(s==="non-zero-area")return hs(t);return!1},po=function(t){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))for(var i=t.parentElement;i;){if(i.tagName==="FIELDSET"&&i.disabled){for(var s=0;s<i.children.length;s++){var r=i.children.item(s);if(r.tagName==="LEGEND")return ge.call(i,"fieldset[disabled] *")?!0:!r.contains(t)}return!0}i=i.parentElement}return!1},go=function(t,i){return!(i.disabled||oo(i)||fo(i,t)||ao(i)||po(i))},bo=function(t,i){return!(uo(i)||no(i)<0||!go(t,i))},us=function(t,i){if(i=i||{},!t)throw new Error("No node provided");return ge.call(t,ro)===!1?!1:bo(i,t)};class J extends tt{constructor(){super(...arguments),this.modal=!0,this.hidden=!1,this.trapFocus=!0,this.trapFocusChanged=()=>{this.$fastController.isConnected&&this.updateTrapFocus()},this.isTrappingFocus=!1,this.handleDocumentKeydown=t=>{if(!t.defaultPrevented&&!this.hidden)switch(t.key){case Ln:this.dismiss(),t.preventDefault();break;case An:this.handleTabKeyDown(t);break}},this.handleDocumentFocus=t=>{!t.defaultPrevented&&this.shouldForceFocus(t.target)&&(this.focusFirstElement(),t.preventDefault())},this.handleTabKeyDown=t=>{if(!this.trapFocus||this.hidden)return;const i=this.getTabQueueBounds();if(i.length!==0){if(i.length===1){i[0].focus(),t.preventDefault();return}t.shiftKey&&t.target===i[0]?(i[i.length-1].focus(),t.preventDefault()):!t.shiftKey&&t.target===i[i.length-1]&&(i[0].focus(),t.preventDefault())}},this.getTabQueueBounds=()=>{const t=[];return J.reduceTabbableItems(t,this)},this.focusFirstElement=()=>{const t=this.getTabQueueBounds();t.length>0?t[0].focus():this.dialog instanceof HTMLElement&&this.dialog.focus()},this.shouldForceFocus=t=>this.isTrappingFocus&&!this.contains(t),this.shouldTrapFocus=()=>this.trapFocus&&!this.hidden,this.updateTrapFocus=t=>{const i=t===void 0?this.shouldTrapFocus():t;i&&!this.isTrappingFocus?(this.isTrappingFocus=!0,document.addEventListener("focusin",this.handleDocumentFocus),S.queueUpdate(()=>{this.shouldForceFocus(document.activeElement)&&this.focusFirstElement()})):!i&&this.isTrappingFocus&&(this.isTrappingFocus=!1,document.removeEventListener("focusin",this.handleDocumentFocus))}}dismiss(){this.$emit("dismiss"),this.$emit("cancel")}show(){this.hidden=!1}hide(){this.hidden=!0,this.$emit("close")}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleDocumentKeydown),this.notifier=R.getNotifier(this),this.notifier.subscribe(this,"hidden"),this.updateTrapFocus()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeydown),this.updateTrapFocus(!1),this.notifier.unsubscribe(this,"hidden")}handleChange(t,i){switch(i){case"hidden":this.updateTrapFocus();break}}static reduceTabbableItems(t,i){return i.getAttribute("tabindex")==="-1"?t:us(i)||J.isFocusableFastElement(i)&&J.hasTabbableShadow(i)?(t.push(i),t):i.childElementCount?t.concat(Array.from(i.children).reduce(J.reduceTabbableItems,[])):t}static isFocusableFastElement(t){var i,s;return!!(!((s=(i=t.$fastController)===null||i===void 0?void 0:i.definition.shadowOptions)===null||s===void 0)&&s.delegatesFocus)}static hasTabbableShadow(t){var i,s;return Array.from((s=(i=t.shadowRoot)===null||i===void 0?void 0:i.querySelectorAll("*"))!==null&&s!==void 0?s:[]).some(r=>us(r))}}f([g({mode:"boolean"})],J.prototype,"modal",void 0);f([g({mode:"boolean"})],J.prototype,"hidden",void 0);f([g({attribute:"trap-focus",mode:"boolean"})],J.prototype,"trapFocus",void 0);f([g({attribute:"aria-describedby"})],J.prototype,"ariaDescribedby",void 0);f([g({attribute:"aria-labelledby"})],J.prototype,"ariaLabelledby",void 0);f([g({attribute:"aria-label"})],J.prototype,"ariaLabel",void 0);const vo=(e,t)=>K`
    <template
        role="radiogroup"
        aria-disabled="${i=>i.disabled}"
        aria-readonly="${i=>i.readOnly}"
        @click="${(i,s)=>i.clickHandler(s.event)}"
        @keydown="${(i,s)=>i.keydownHandler(s.event)}"
        @focusout="${(i,s)=>i.focusOutHandler(s.event)}"
    >
        <slot name="label"></slot>
        <div
            class="positioning-region ${i=>i.orientation===H.horizontal?"horizontal":"vertical"}"
            part="positioning-region"
        >
            <slot
                ${Di({property:"slottedRadioButtons",filter:hn("[role=radio]")})}
            ></slot>
        </div>
    </template>
`;class mt extends tt{constructor(){super(...arguments),this.orientation=H.horizontal,this.radioChangeHandler=t=>{const i=t.target;i.checked&&(this.slottedRadioButtons.forEach(s=>{s!==i&&(s.checked=!1,this.isInsideFoundationToolbar||s.setAttribute("tabindex","-1"))}),this.selectedRadio=i,this.value=i.value,i.setAttribute("tabindex","0"),this.focusedRadio=i),t.stopPropagation()},this.moveToRadioByIndex=(t,i)=>{const s=t[i];this.isInsideToolbar||(s.setAttribute("tabindex","0"),s.readOnly?this.slottedRadioButtons.forEach(r=>{r!==s&&r.setAttribute("tabindex","-1")}):(s.checked=!0,this.selectedRadio=s)),this.focusedRadio=s,s.focus()},this.moveRightOffGroup=()=>{var t;(t=this.nextElementSibling)===null||t===void 0||t.focus()},this.moveLeftOffGroup=()=>{var t;(t=this.previousElementSibling)===null||t===void 0||t.focus()},this.focusOutHandler=t=>{const i=this.slottedRadioButtons,s=t.target,r=s!==null?i.indexOf(s):0,n=this.focusedRadio?i.indexOf(this.focusedRadio):-1;return(n===0&&r===n||n===i.length-1&&n===r)&&(this.selectedRadio?(this.focusedRadio=this.selectedRadio,this.isInsideFoundationToolbar||(this.selectedRadio.setAttribute("tabindex","0"),i.forEach(o=>{o!==this.selectedRadio&&o.setAttribute("tabindex","-1")}))):(this.focusedRadio=i[0],this.focusedRadio.setAttribute("tabindex","0"),i.forEach(o=>{o!==this.focusedRadio&&o.setAttribute("tabindex","-1")}))),!0},this.clickHandler=t=>{const i=t.target;if(i){const s=this.slottedRadioButtons;i.checked||s.indexOf(i)===0?(i.setAttribute("tabindex","0"),this.selectedRadio=i):(i.setAttribute("tabindex","-1"),this.selectedRadio=null),this.focusedRadio=i}t.preventDefault()},this.shouldMoveOffGroupToTheRight=(t,i,s)=>t===i.length&&this.isInsideToolbar&&s===pe,this.shouldMoveOffGroupToTheLeft=(t,i)=>(this.focusedRadio?t.indexOf(this.focusedRadio)-1:0)<0&&this.isInsideToolbar&&i===fe,this.checkFocusedRadio=()=>{this.focusedRadio!==null&&!this.focusedRadio.readOnly&&!this.focusedRadio.checked&&(this.focusedRadio.checked=!0,this.focusedRadio.setAttribute("tabindex","0"),this.focusedRadio.focus(),this.selectedRadio=this.focusedRadio)},this.moveRight=t=>{const i=this.slottedRadioButtons;let s=0;if(s=this.focusedRadio?i.indexOf(this.focusedRadio)+1:1,this.shouldMoveOffGroupToTheRight(s,i,t.key)){this.moveRightOffGroup();return}else s===i.length&&(s=0);for(;s<i.length&&i.length>1;)if(i[s].disabled){if(this.focusedRadio&&s===i.indexOf(this.focusedRadio))break;if(s+1>=i.length){if(this.isInsideToolbar)break;s=0}else s+=1}else{this.moveToRadioByIndex(i,s);break}},this.moveLeft=t=>{const i=this.slottedRadioButtons;let s=0;if(s=this.focusedRadio?i.indexOf(this.focusedRadio)-1:0,s=s<0?i.length-1:s,this.shouldMoveOffGroupToTheLeft(i,t.key)){this.moveLeftOffGroup();return}for(;s>=0&&i.length>1;)if(i[s].disabled){if(this.focusedRadio&&s===i.indexOf(this.focusedRadio))break;s-1<0?s=i.length-1:s-=1}else{this.moveToRadioByIndex(i,s);break}},this.keydownHandler=t=>{const i=t.key;if(i in En&&this.isInsideFoundationToolbar)return!0;switch(i){case qs:{this.checkFocusedRadio();break}case pe:case Mi:{this.direction===E.ltr?this.moveRight(t):this.moveLeft(t);break}case fe:case Vi:{this.direction===E.ltr?this.moveLeft(t):this.moveRight(t);break}default:return!0}}}readOnlyChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(t=>{this.readOnly?t.readOnly=!0:t.readOnly=!1})}disabledChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(t=>{this.disabled?t.disabled=!0:t.disabled=!1})}nameChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(t=>{t.setAttribute("name",this.name)})}valueChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(t=>{t.value===this.value&&(t.checked=!0,this.selectedRadio=t)}),this.$emit("change")}slottedRadioButtonsChanged(t,i){this.slottedRadioButtons&&this.slottedRadioButtons.length>0&&this.setupRadioButtons()}get parentToolbar(){return this.closest('[role="toolbar"]')}get isInsideToolbar(){var t;return(t=this.parentToolbar)!==null&&t!==void 0?t:!1}get isInsideFoundationToolbar(){var t;return!!(!((t=this.parentToolbar)===null||t===void 0)&&t.$fastController)}connectedCallback(){super.connectedCallback(),this.direction=Gs(this),this.setupRadioButtons()}disconnectedCallback(){this.slottedRadioButtons.forEach(t=>{t.removeEventListener("change",this.radioChangeHandler)})}setupRadioButtons(){const t=this.slottedRadioButtons.filter(r=>r.hasAttribute("checked")),i=t?t.length:0;if(i>1){const r=t[i-1];r.checked=!0}let s=!1;if(this.slottedRadioButtons.forEach(r=>{this.name!==void 0&&r.setAttribute("name",this.name),this.disabled&&(r.disabled=!0),this.readOnly&&(r.readOnly=!0),this.value&&this.value===r.value?(this.selectedRadio=r,this.focusedRadio=r,r.checked=!0,r.setAttribute("tabindex","0"),s=!0):(this.isInsideFoundationToolbar||r.setAttribute("tabindex","-1"),r.checked=!1),r.addEventListener("change",this.radioChangeHandler)}),this.value===void 0&&this.slottedRadioButtons.length>0){const r=this.slottedRadioButtons.filter(o=>o.hasAttribute("checked")),n=r!==null?r.length:0;if(n>0&&!s){const o=r[n-1];o.checked=!0,this.focusedRadio=o,o.setAttribute("tabindex","0")}else this.slottedRadioButtons[0].setAttribute("tabindex","0"),this.focusedRadio=this.slottedRadioButtons[0]}}}f([g({attribute:"readonly",mode:"boolean"})],mt.prototype,"readOnly",void 0);f([g({attribute:"disabled",mode:"boolean"})],mt.prototype,"disabled",void 0);f([g],mt.prototype,"name",void 0);f([g],mt.prototype,"value",void 0);f([g],mt.prototype,"orientation",void 0);f([F],mt.prototype,"childItems",void 0);f([F],mt.prototype,"slottedRadioButtons",void 0);const mo=(e,t)=>K`
    <template
        role="radio"
        class="${i=>i.checked?"checked":""} ${i=>i.readOnly?"readonly":""}"
        aria-checked="${i=>i.checked}"
        aria-required="${i=>i.required}"
        aria-disabled="${i=>i.disabled}"
        aria-readonly="${i=>i.readOnly}"
        @keypress="${(i,s)=>i.keypressHandler(s.event)}"
        @click="${(i,s)=>i.clickHandler(s.event)}"
    >
        <div part="control" class="control">
            <slot name="checked-indicator">
                ${t.checkedIndicator||""}
            </slot>
        </div>
        <label
            part="label"
            class="${i=>i.defaultSlottedNodes&&i.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot ${Di("defaultSlottedNodes")}></slot>
        </label>
    </template>
`;class yo extends tt{}class wo extends Hn(yo){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class Se extends wo{constructor(){super(),this.initialValue="on",this.keypressHandler=t=>{switch(t.key){case Nn:!this.checked&&!this.readOnly&&(this.checked=!0);return}return!0},this.proxy.setAttribute("type","radio")}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}defaultCheckedChanged(){var t;this.$fastController.isConnected&&!this.dirtyChecked&&(this.isInsideRadioGroup()||(this.checked=(t=this.defaultChecked)!==null&&t!==void 0?t:!1,this.dirtyChecked=!1))}connectedCallback(){var t,i;super.connectedCallback(),this.validate(),((t=this.parentElement)===null||t===void 0?void 0:t.getAttribute("role"))!=="radiogroup"&&this.getAttribute("tabindex")===null&&(this.disabled||this.setAttribute("tabindex","0")),this.checkedAttribute&&(this.dirtyChecked||this.isInsideRadioGroup()||(this.checked=(i=this.defaultChecked)!==null&&i!==void 0?i:!1,this.dirtyChecked=!1))}isInsideRadioGroup(){return this.closest("[role=radiogroup]")!==null}clickHandler(t){!this.disabled&&!this.readOnly&&!this.checked&&(this.checked=!0)}}f([g({attribute:"readonly",mode:"boolean"})],Se.prototype,"readOnly",void 0);f([F],Se.prototype,"name",void 0);f([F],Se.prototype,"defaultSlottedNodes",void 0);const xo=(e,t)=>K`
    <template
        aria-disabled="${i=>i.disabled}"
        class="${i=>i.sliderOrientation||H.horizontal}
            ${i=>i.disabled?"disabled":""}"
    >
        <div ${Y("root")} part="root" class="root" style="${i=>i.positionStyle}">
            <div class="container">
                ${Os(i=>!i.hideMark,K`
                        <div class="mark"></div>
                    `)}
                <div class="label">
                    <slot></slot>
                </div>
            </div>
        </div>
    </template>
`;function ai(e,t,i,s){let r=On(0,1,(e-t)/(i-t));return s===E.rtl&&(r=1-r),r}const ae={min:0,max:0,direction:E.ltr,orientation:H.horizontal,disabled:!1};let at=class extends tt{constructor(){super(...arguments),this.hideMark=!1,this.sliderDirection=E.ltr,this.getSliderConfiguration=()=>{if(!this.isSliderConfig(this.parentNode))this.sliderDirection=ae.direction||E.ltr,this.sliderOrientation=ae.orientation,this.sliderMaxPosition=ae.max,this.sliderMinPosition=ae.min;else{const t=this.parentNode,{min:i,max:s,direction:r,orientation:n,disabled:o}=t;o!==void 0&&(this.disabled=o),this.sliderDirection=r||E.ltr,this.sliderOrientation=n||H.horizontal,this.sliderMaxPosition=s,this.sliderMinPosition=i}},this.positionAsStyle=()=>{const t=this.sliderDirection?this.sliderDirection:E.ltr,i=ai(Number(this.position),Number(this.sliderMinPosition),Number(this.sliderMaxPosition));let s=Math.round((1-i)*100),r=Math.round(i*100);return Number.isNaN(r)&&Number.isNaN(s)&&(s=50,r=50),this.sliderOrientation===H.horizontal?t===E.rtl?`right: ${r}%; left: ${s}%;`:`left: ${r}%; right: ${s}%;`:`top: ${r}%; bottom: ${s}%;`}}positionChanged(){this.positionStyle=this.positionAsStyle()}sliderOrientationChanged(){}connectedCallback(){super.connectedCallback(),this.getSliderConfiguration(),this.positionStyle=this.positionAsStyle(),this.notifier=R.getNotifier(this.parentNode),this.notifier.subscribe(this,"orientation"),this.notifier.subscribe(this,"direction"),this.notifier.subscribe(this,"max"),this.notifier.subscribe(this,"min")}disconnectedCallback(){super.disconnectedCallback(),this.notifier.unsubscribe(this,"orientation"),this.notifier.unsubscribe(this,"direction"),this.notifier.unsubscribe(this,"max"),this.notifier.unsubscribe(this,"min")}handleChange(t,i){switch(i){case"direction":this.sliderDirection=t.direction;break;case"orientation":this.sliderOrientation=t.orientation;break;case"max":this.sliderMaxPosition=t.max;break;case"min":this.sliderMinPosition=t.min;break}this.positionStyle=this.positionAsStyle()}isSliderConfig(t){return t.max!==void 0&&t.min!==void 0}};f([F],at.prototype,"positionStyle",void 0);f([g],at.prototype,"position",void 0);f([g({attribute:"hide-mark",mode:"boolean"})],at.prototype,"hideMark",void 0);f([g({attribute:"disabled",mode:"boolean"})],at.prototype,"disabled",void 0);f([F],at.prototype,"sliderOrientation",void 0);f([F],at.prototype,"sliderMinPosition",void 0);f([F],at.prototype,"sliderMaxPosition",void 0);f([F],at.prototype,"sliderDirection",void 0);const ko=(e,t)=>K`
    <template
        role="slider"
        class="${i=>i.readOnly?"readonly":""}
        ${i=>i.orientation||H.horizontal}"
        tabindex="${i=>i.disabled?null:0}"
        aria-valuetext="${i=>i.valueTextFormatter(i.value)}"
        aria-valuenow="${i=>i.value}"
        aria-valuemin="${i=>i.min}"
        aria-valuemax="${i=>i.max}"
        aria-disabled="${i=>i.disabled?!0:void 0}"
        aria-readonly="${i=>i.readOnly?!0:void 0}"
        aria-orientation="${i=>i.orientation}"
        class="${i=>i.orientation}"
    >
        <div part="positioning-region" class="positioning-region">
            <div ${Y("track")} part="track-container" class="track">
                <slot name="track"></slot>
                <div part="track-start" class="track-start" style="${i=>i.position}">
                    <slot name="track-start"></slot>
                </div>
            </div>
            <slot></slot>
            <div
                ${Y("thumb")}
                part="thumb-container"
                class="thumb-container"
                style="${i=>i.position}"
            >
                <slot name="thumb">${t.thumb||""}</slot>
            </div>
        </div>
    </template>
`;class $o extends tt{}class So extends Li($o){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const Co={singleValue:"single-value"};class j extends So{constructor(){super(...arguments),this.direction=E.ltr,this.isDragging=!1,this.trackWidth=0,this.trackMinWidth=0,this.trackHeight=0,this.trackLeft=0,this.trackMinHeight=0,this.valueTextFormatter=()=>null,this.min=0,this.max=10,this.step=1,this.orientation=H.horizontal,this.mode=Co.singleValue,this.keypressHandler=t=>{if(!this.readOnly){if(t.key===In)t.preventDefault(),this.value=`${this.min}`;else if(t.key===Pn)t.preventDefault(),this.value=`${this.max}`;else if(!t.shiftKey)switch(t.key){case pe:case Vi:t.preventDefault(),this.increment();break;case fe:case Mi:t.preventDefault(),this.decrement();break}}},this.setupTrackConstraints=()=>{const t=this.track.getBoundingClientRect();this.trackWidth=this.track.clientWidth,this.trackMinWidth=this.track.clientLeft,this.trackHeight=t.bottom,this.trackMinHeight=t.top,this.trackLeft=this.getBoundingClientRect().left,this.trackWidth===0&&(this.trackWidth=1)},this.setupListeners=(t=!1)=>{const i=`${t?"remove":"add"}EventListener`;this[i]("keydown",this.keypressHandler),this[i]("mousedown",this.handleMouseDown),this.thumb[i]("mousedown",this.handleThumbMouseDown,{passive:!0}),this.thumb[i]("touchstart",this.handleThumbMouseDown,{passive:!0}),t&&(this.handleMouseDown(null),this.handleThumbMouseDown(null))},this.initialValue="",this.handleThumbMouseDown=t=>{if(t){if(this.readOnly||this.disabled||t.defaultPrevented)return;t.target.focus()}const i=`${t!==null?"add":"remove"}EventListener`;window[i]("mouseup",this.handleWindowMouseUp),window[i]("mousemove",this.handleMouseMove,{passive:!0}),window[i]("touchmove",this.handleMouseMove,{passive:!0}),window[i]("touchend",this.handleWindowMouseUp),this.isDragging=t!==null},this.handleMouseMove=t=>{if(this.readOnly||this.disabled||t.defaultPrevented)return;const i=window.TouchEvent&&t instanceof TouchEvent?t.touches[0]:t,s=this.orientation===H.horizontal?i.pageX-document.documentElement.scrollLeft-this.trackLeft:i.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(s)}`},this.calculateNewValue=t=>{const i=ai(t,this.orientation===H.horizontal?this.trackMinWidth:this.trackMinHeight,this.orientation===H.horizontal?this.trackWidth:this.trackHeight,this.direction),s=(this.max-this.min)*i+this.min;return this.convertToConstrainedValue(s)},this.handleWindowMouseUp=t=>{this.stopDragging()},this.stopDragging=()=>{this.isDragging=!1,this.handleMouseDown(null),this.handleThumbMouseDown(null)},this.handleMouseDown=t=>{const i=`${t!==null?"add":"remove"}EventListener`;if((t===null||!this.disabled&&!this.readOnly)&&(window[i]("mouseup",this.handleWindowMouseUp),window.document[i]("mouseleave",this.handleWindowMouseUp),window[i]("mousemove",this.handleMouseMove),t)){t.preventDefault(),this.setupTrackConstraints(),t.target.focus();const s=this.orientation===H.horizontal?t.pageX-document.documentElement.scrollLeft-this.trackLeft:t.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(s)}`}},this.convertToConstrainedValue=t=>{isNaN(t)&&(t=this.min);let i=t-this.min;const s=Math.round(i/this.step),r=i-s*(this.stepMultiplier*this.step)/this.stepMultiplier;return i=r>=Number(this.step)/2?i-r+Number(this.step):i-r,i+this.min}}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}get valueAsNumber(){return parseFloat(super.value)}set valueAsNumber(t){this.value=t.toString()}valueChanged(t,i){super.valueChanged(t,i),this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction),this.$emit("change")}minChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.min=`${this.min}`),this.validate()}maxChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.max=`${this.max}`),this.validate()}stepChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.step=`${this.step}`),this.updateStepMultiplier(),this.validate()}orientationChanged(){this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type","range"),this.direction=Gs(this),this.updateStepMultiplier(),this.setupTrackConstraints(),this.setupListeners(),this.setupDefaultValue(),this.setThumbPositionForOrientation(this.direction)}disconnectedCallback(){this.setupListeners(!0)}increment(){const t=this.direction!==E.rtl&&this.orientation!==H.vertical?Number(this.value)+Number(this.step):Number(this.value)-Number(this.step),i=this.convertToConstrainedValue(t),s=i<Number(this.max)?`${i}`:`${this.max}`;this.value=s}decrement(){const t=this.direction!==E.rtl&&this.orientation!==H.vertical?Number(this.value)-Number(this.step):Number(this.value)+Number(this.step),i=this.convertToConstrainedValue(t),s=i>Number(this.min)?`${i}`:`${this.min}`;this.value=s}setThumbPositionForOrientation(t){const s=(1-ai(Number(this.value),Number(this.min),Number(this.max),t))*100;this.orientation===H.horizontal?this.position=this.isDragging?`right: ${s}%; transition: none;`:`right: ${s}%; transition: all 0.2s ease;`:this.position=this.isDragging?`bottom: ${s}%; transition: none;`:`bottom: ${s}%; transition: all 0.2s ease;`}updateStepMultiplier(){const t=this.step+"",i=this.step%1?t.length-t.indexOf(".")-1:0;this.stepMultiplier=Math.pow(10,i)}get midpoint(){return`${this.convertToConstrainedValue((this.max+this.min)/2)}`}setupDefaultValue(){if(typeof this.value=="string")if(this.value.length===0)this.initialValue=this.midpoint;else{const t=parseFloat(this.value);!Number.isNaN(t)&&(t<this.min||t>this.max)&&(this.value=this.midpoint)}}}f([g({attribute:"readonly",mode:"boolean"})],j.prototype,"readOnly",void 0);f([F],j.prototype,"direction",void 0);f([F],j.prototype,"isDragging",void 0);f([F],j.prototype,"position",void 0);f([F],j.prototype,"trackWidth",void 0);f([F],j.prototype,"trackMinWidth",void 0);f([F],j.prototype,"trackHeight",void 0);f([F],j.prototype,"trackLeft",void 0);f([F],j.prototype,"trackMinHeight",void 0);f([F],j.prototype,"valueTextFormatter",void 0);f([g({converter:Fi})],j.prototype,"min",void 0);f([g({converter:Fi})],j.prototype,"max",void 0);f([g({converter:Fi})],j.prototype,"step",void 0);f([g],j.prototype,"orientation",void 0);f([g],j.prototype,"mode",void 0);class Fo{constructor(t){this.listenerCache=new WeakMap,this.query=t}bind(t){const{query:i}=this,s=this.constructListener(t);s.bind(i)(),i.addListener(s),this.listenerCache.set(t,s)}unbind(t){const i=this.listenerCache.get(t);i&&(this.query.removeListener(i),this.listenerCache.delete(t))}}class ee extends Fo{constructor(t,i){super(t),this.styles=i}static with(t){return i=>new ee(t,i)}constructListener(t){let i=!1;const s=this.styles;return function(){const{matches:n}=this;n&&!i?(t.$fastController.addStyles(s),i=n):!n&&i&&(t.$fastController.removeStyles(s),i=n)}}unbind(t){super.unbind(t),t.$fastController.removeStyles(this.styles)}}const U=ee.with(window.matchMedia("(forced-colors)"));ee.with(window.matchMedia("(prefers-color-scheme: dark)"));ee.with(window.matchMedia("(prefers-color-scheme: light)"));class To{constructor(t,i,s){this.propertyName=t,this.value=i,this.styles=s}bind(t){R.getNotifier(t).subscribe(this,this.propertyName),this.handleChange(t,this.propertyName)}unbind(t){R.getNotifier(t).unsubscribe(this,this.propertyName),t.$fastController.removeStyles(this.styles)}handleChange(t,i){t[i]===this.value?t.$fastController.addStyles(this.styles):t.$fastController.removeStyles(this.styles)}}const be="not-allowed",Ro=":host([hidden]){display:none}";function ie(e){return`${Ro}:host{display:${e}}`}const C=Vn()?"focus-visible":"focus";function ct(e,t,i){return isNaN(e)||e<=t?t:e>=i?i:e}function Je(e,t,i){return isNaN(e)||e<=t?0:e>=i?1:e/(i-t)}function kt(e,t,i){return isNaN(e)?t:t+e*(i-t)}function ds(e){return e*(Math.PI/180)}function Do(e){return e*(180/Math.PI)}function Mo(e){const t=Math.round(ct(e,0,255)).toString(16);return t.length===1?"0"+t:t}function z(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:t+e*(i-t)}function Pi(e,t,i){if(e<=0)return t%360;if(e>=1)return i%360;const s=(t-i+360)%360,r=(i-t+360)%360;return s<=r?(t-s*e+360)%360:(t+s*e+360)%360}function I(e,t){const i=Math.pow(10,t);return Math.round(e*i)/i}class $t{constructor(t,i,s){this.h=t,this.s=i,this.l=s}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.l)?new $t(t.h,t.s,t.l):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.l===t.l}roundToPrecision(t){return new $t(I(this.h,t),I(this.s,t),I(this.l,t))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class Zt{constructor(t,i,s){this.h=t,this.s=i,this.v=s}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.v)?new Zt(t.h,t.s,t.v):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.v===t.v}roundToPrecision(t){return new Zt(I(this.h,t),I(this.s,t),I(this.v,t))}toObject(){return{h:this.h,s:this.s,v:this.v}}}class A{constructor(t,i,s){this.l=t,this.a=i,this.b=s}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.a)&&!isNaN(t.b)?new A(t.l,t.a,t.b):null}equalValue(t){return this.l===t.l&&this.a===t.a&&this.b===t.b}roundToPrecision(t){return new A(I(this.l,t),I(this.a,t),I(this.b,t))}toObject(){return{l:this.l,a:this.a,b:this.b}}}A.epsilon=216/24389;A.kappa=24389/27;class Rt{constructor(t,i,s){this.l=t,this.c=i,this.h=s}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.c)&&!isNaN(t.h)?new Rt(t.l,t.c,t.h):null}equalValue(t){return this.l===t.l&&this.c===t.c&&this.h===t.h}roundToPrecision(t){return new Rt(I(this.l,t),I(this.c,t),I(this.h,t))}toObject(){return{l:this.l,c:this.c,h:this.h}}}class M{constructor(t,i,s,r){this.r=t,this.g=i,this.b=s,this.a=typeof r=="number"&&!isNaN(r)?r:1}static fromObject(t){return t&&!isNaN(t.r)&&!isNaN(t.g)&&!isNaN(t.b)?new M(t.r,t.g,t.b,t.a):null}equalValue(t){return this.r===t.r&&this.g===t.g&&this.b===t.b&&this.a===t.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(kt(this.r,0,255))},${Math.round(kt(this.g,0,255))},${Math.round(kt(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(kt(this.r,0,255))},${Math.round(kt(this.g,0,255))},${Math.round(kt(this.b,0,255))},${ct(this.a,0,1)})`}roundToPrecision(t){return new M(I(this.r,t),I(this.g,t),I(this.b,t),I(this.a,t))}clamp(){return new M(ct(this.r,0,1),ct(this.g,0,1),ct(this.b,0,1),ct(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(t){return Mo(kt(t,0,255))}}class _{constructor(t,i,s){this.x=t,this.y=i,this.z=s}static fromObject(t){return t&&!isNaN(t.x)&&!isNaN(t.y)&&!isNaN(t.z)?new _(t.x,t.y,t.z):null}equalValue(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}roundToPrecision(t){return new _(I(this.x,t),I(this.y,t),I(this.z,t))}toObject(){return{x:this.x,y:this.y,z:this.z}}}_.whitePoint=new _(.95047,1,1.08883);function li(e){return e.r*.2126+e.g*.7152+e.b*.0722}function ci(e){function t(i){return i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4)}return li(new M(t(e.r),t(e.g),t(e.b),1))}const fs=(e,t)=>(e+.05)/(t+.05);function ps(e,t){const i=ci(e),s=ci(t);return i>s?fs(i,s):fs(s,i)}function Jt(e){const t=Math.max(e.r,e.g,e.b),i=Math.min(e.r,e.g,e.b),s=t-i;let r=0;s!==0&&(t===e.r?r=60*((e.g-e.b)/s%6):t===e.g?r=60*((e.b-e.r)/s+2):r=60*((e.r-e.g)/s+4)),r<0&&(r+=360);const n=(t+i)/2;let o=0;return s!==0&&(o=s/(1-Math.abs(2*n-1))),new $t(r,o,n)}function hi(e,t=1){const i=(1-Math.abs(2*e.l-1))*e.s,s=i*(1-Math.abs(e.h/60%2-1)),r=e.l-i/2;let n=0,o=0,a=0;return e.h<60?(n=i,o=s,a=0):e.h<120?(n=s,o=i,a=0):e.h<180?(n=0,o=i,a=s):e.h<240?(n=0,o=s,a=i):e.h<300?(n=s,o=0,a=i):e.h<360&&(n=i,o=0,a=s),new M(n+r,o+r,a+r,t)}function gs(e){const t=Math.max(e.r,e.g,e.b),i=Math.min(e.r,e.g,e.b),s=t-i;let r=0;s!==0&&(t===e.r?r=60*((e.g-e.b)/s%6):t===e.g?r=60*((e.b-e.r)/s+2):r=60*((e.r-e.g)/s+4)),r<0&&(r+=360);let n=0;return t!==0&&(n=s/t),new Zt(r,n,t)}function Vo(e,t=1){const i=e.s*e.v,s=i*(1-Math.abs(e.h/60%2-1)),r=e.v-i;let n=0,o=0,a=0;return e.h<60?(n=i,o=s,a=0):e.h<120?(n=s,o=i,a=0):e.h<180?(n=0,o=i,a=s):e.h<240?(n=0,o=s,a=i):e.h<300?(n=s,o=0,a=i):e.h<360&&(n=i,o=0,a=s),new M(n+r,o+r,a+r,t)}function Lo(e){let t=0,i=0;return e.h!==0&&(t=Math.cos(ds(e.h))*e.c,i=Math.sin(ds(e.h))*e.c),new A(e.l,t,i)}function Io(e){let t=0;(Math.abs(e.b)>.001||Math.abs(e.a)>.001)&&(t=Do(Math.atan2(e.b,e.a))),t<0&&(t+=360);const i=Math.sqrt(e.a*e.a+e.b*e.b);return new Rt(e.l,i,t)}function Po(e){const t=(e.l+16)/116,i=t+e.a/500,s=t-e.b/200,r=Math.pow(i,3),n=Math.pow(t,3),o=Math.pow(s,3);let a=0;r>A.epsilon?a=r:a=(116*i-16)/A.kappa;let l=0;e.l>A.epsilon*A.kappa?l=n:l=e.l/A.kappa;let c=0;return o>A.epsilon?c=o:c=(116*s-16)/A.kappa,a=_.whitePoint.x*a,l=_.whitePoint.y*l,c=_.whitePoint.z*c,new _(a,l,c)}function No(e){function t(l){return l>A.epsilon?Math.pow(l,1/3):(A.kappa*l+16)/116}const i=t(e.x/_.whitePoint.x),s=t(e.y/_.whitePoint.y),r=t(e.z/_.whitePoint.z),n=116*s-16,o=500*(i-s),a=200*(s-r);return new A(n,o,a)}function ui(e){function t(l){return l<=.04045?l/12.92:Math.pow((l+.055)/1.055,2.4)}const i=t(e.r),s=t(e.g),r=t(e.b),n=i*.4124564+s*.3575761+r*.1804375,o=i*.2126729+s*.7151522+r*.072175,a=i*.0193339+s*.119192+r*.9503041;return new _(n,o,a)}function Zs(e,t=1){function i(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}const s=i(e.x*3.2404542-e.y*1.5371385-e.z*.4985314),r=i(e.x*-.969266+e.y*1.8760108+e.z*.041556),n=i(e.x*.0556434-e.y*.2040259+e.z*1.0572252);return new M(s,r,n,t)}function di(e){return No(ui(e))}function Js(e,t=1){return Zs(Po(e),t)}function fi(e){return Io(di(e))}function Ks(e,t=1){return Js(Lo(e),t)}function bs(e,t,i=18){const s=fi(e);let r=s.c+t*i;return r<0&&(r=0),Ks(new Rt(s.l,r,s.h))}function Ke(e,t){return e*t}function vs(e,t){return new M(Ke(e.r,t.r),Ke(e.g,t.g),Ke(e.b,t.b),1)}function ti(e,t){return e<.5?ct(2*t*e,0,1):ct(1-2*(1-t)*(1-e),0,1)}function ms(e,t){return new M(ti(e.r,t.r),ti(e.g,t.g),ti(e.b,t.b),1)}var ys;(function(e){e[e.Burn=0]="Burn",e[e.Color=1]="Color",e[e.Darken=2]="Darken",e[e.Dodge=3]="Dodge",e[e.Lighten=4]="Lighten",e[e.Multiply=5]="Multiply",e[e.Overlay=6]="Overlay",e[e.Screen=7]="Screen"})(ys||(ys={}));function Ao(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new M(z(e,t.r,i.r),z(e,t.g,i.g),z(e,t.b,i.b),z(e,t.a,i.a))}function Eo(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new $t(Pi(e,t.h,i.h),z(e,t.s,i.s),z(e,t.l,i.l))}function Oo(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new Zt(Pi(e,t.h,i.h),z(e,t.s,i.s),z(e,t.v,i.v))}function Bo(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new _(z(e,t.x,i.x),z(e,t.y,i.y),z(e,t.z,i.z))}function Ho(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new A(z(e,t.l,i.l),z(e,t.a,i.a),z(e,t.b,i.b))}function zo(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new Rt(z(e,t.l,i.l),z(e,t.c,i.c),Pi(e,t.h,i.h))}var X;(function(e){e[e.RGB=0]="RGB",e[e.HSL=1]="HSL",e[e.HSV=2]="HSV",e[e.XYZ=3]="XYZ",e[e.LAB=4]="LAB",e[e.LCH=5]="LCH"})(X||(X={}));function jt(e,t,i,s){if(isNaN(e)||e<=0)return i;if(e>=1)return s;switch(t){case X.HSL:return hi(Eo(e,Jt(i),Jt(s)));case X.HSV:return Vo(Oo(e,gs(i),gs(s)));case X.XYZ:return Zs(Bo(e,ui(i),ui(s)));case X.LAB:return Js(Ho(e,di(i),di(s)));case X.LCH:return Ks(zo(e,fi(i),fi(s)));default:return Ao(e,i,s)}}class Z{constructor(t){if(t==null||t.length===0)throw new Error("The stops argument must be non-empty");this.stops=this.sortColorScaleStops(t)}static createBalancedColorScale(t){if(t==null||t.length===0)throw new Error("The colors argument must be non-empty");const i=new Array(t.length);for(let s=0;s<t.length;s++)s===0?i[s]={color:t[s],position:0}:s===t.length-1?i[s]={color:t[s],position:1}:i[s]={color:t[s],position:s*(1/(t.length-1))};return new Z(i)}getColor(t,i=X.RGB){if(this.stops.length===1)return this.stops[0].color;if(t<=0)return this.stops[0].color;if(t>=1)return this.stops[this.stops.length-1].color;let s=0;for(let o=0;o<this.stops.length;o++)this.stops[o].position<=t&&(s=o);let r=s+1;r>=this.stops.length&&(r=this.stops.length-1);const n=(t-this.stops[s].position)*(1/(this.stops[r].position-this.stops[s].position));return jt(n,i,this.stops[s].color,this.stops[r].color)}trim(t,i,s=X.RGB){if(t<0||i>1||i<t)throw new Error("Invalid bounds");if(t===i)return new Z([{color:this.getColor(t,s),position:0}]);const r=[];for(let a=0;a<this.stops.length;a++)this.stops[a].position>=t&&this.stops[a].position<=i&&r.push(this.stops[a]);if(r.length===0)return new Z([{color:this.getColor(t),position:t},{color:this.getColor(i),position:i}]);r[0].position!==t&&r.unshift({color:this.getColor(t),position:t}),r[r.length-1].position!==i&&r.push({color:this.getColor(i),position:i});const n=i-t,o=new Array(r.length);for(let a=0;a<r.length;a++)o[a]={color:r[a].color,position:(r[a].position-t)/n};return new Z(o)}findNextColor(t,i,s=!1,r=X.RGB,n=.005,o=32){isNaN(t)||t<=0?t=0:t>=1&&(t=1);const a=this.getColor(t,r),l=s?0:1,c=this.getColor(l,r);if(ps(a,c)<=i)return l;let p=s?0:t,b=s?t:0,k=l,m=0;for(;m<=o;){k=Math.abs(b-p)/2+p;const w=this.getColor(k,r),N=ps(a,w);if(Math.abs(N-i)<=n)return k;N>i?s?p=k:b=k:s?b=k:p=k,m++}return k}clone(){const t=new Array(this.stops.length);for(let i=0;i<t.length;i++)t[i]={color:this.stops[i].color,position:this.stops[i].position};return new Z(t)}sortColorScaleStops(t){return t.sort((i,s)=>{const r=i.position,n=s.position;return r<n?-1:r>n?1:0})}}const jo=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;function Vt(e){const t=jo.exec(e);if(t===null)return null;let i=t[1];if(i.length===3){const r=i.charAt(0),n=i.charAt(1),o=i.charAt(2);i=r.concat(r,n,n,o,o)}const s=parseInt(i,16);return isNaN(s)?null:new M(Je((s&16711680)>>>16,0,255),Je((s&65280)>>>8,0,255),Je(s&255,0,255),1)}class vt{constructor(t){this.config=Object.assign({},vt.defaultPaletteConfig,t),this.palette=[],this.updatePaletteColors()}updatePaletteGenerationValues(t){let i=!1;for(const s in t)this.config[s]&&(this.config[s].equalValue?this.config[s].equalValue(t[s])||(this.config[s]=t[s],i=!0):t[s]!==this.config[s]&&(this.config[s]=t[s],i=!0));return i&&this.updatePaletteColors(),i}updatePaletteColors(){const t=this.generatePaletteColorScale();for(let i=0;i<this.config.steps;i++)this.palette[i]=t.getColor(i/(this.config.steps-1),this.config.interpolationMode)}generatePaletteColorScale(){const t=Jt(this.config.baseColor),s=new Z([{position:0,color:this.config.scaleColorLight},{position:.5,color:this.config.baseColor},{position:1,color:this.config.scaleColorDark}]).trim(this.config.clipLight,1-this.config.clipDark),r=s.getColor(0),n=s.getColor(1);let o=r,a=n;if(t.s>=this.config.saturationAdjustmentCutoff&&(o=bs(o,this.config.saturationLight),a=bs(a,this.config.saturationDark)),this.config.multiplyLight!==0){const l=vs(this.config.baseColor,o);o=jt(this.config.multiplyLight,this.config.interpolationMode,o,l)}if(this.config.multiplyDark!==0){const l=vs(this.config.baseColor,a);a=jt(this.config.multiplyDark,this.config.interpolationMode,a,l)}if(this.config.overlayLight!==0){const l=ms(this.config.baseColor,o);o=jt(this.config.overlayLight,this.config.interpolationMode,o,l)}if(this.config.overlayDark!==0){const l=ms(this.config.baseColor,a);a=jt(this.config.overlayDark,this.config.interpolationMode,a,l)}return this.config.baseScalePosition?this.config.baseScalePosition<=0?new Z([{position:0,color:this.config.baseColor},{position:1,color:a.clamp()}]):this.config.baseScalePosition>=1?new Z([{position:0,color:o.clamp()},{position:1,color:this.config.baseColor}]):new Z([{position:0,color:o.clamp()},{position:this.config.baseScalePosition,color:this.config.baseColor},{position:1,color:a.clamp()}]):new Z([{position:0,color:o.clamp()},{position:.5,color:this.config.baseColor},{position:1,color:a.clamp()}])}}vt.defaultPaletteConfig={baseColor:Vt("#808080"),steps:11,interpolationMode:X.RGB,scaleColorLight:new M(1,1,1,1),scaleColorDark:new M(0,0,0,1),clipLight:.185,clipDark:.16,saturationAdjustmentCutoff:.05,saturationLight:.35,saturationDark:1.25,overlayLight:0,overlayDark:.25,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};vt.greyscalePaletteConfig={baseColor:Vt("#808080"),steps:11,interpolationMode:X.RGB,scaleColorLight:new M(1,1,1,1),scaleColorDark:new M(0,0,0,1),clipLight:0,clipDark:0,saturationAdjustmentCutoff:0,saturationLight:0,saturationDark:0,overlayLight:0,overlayDark:0,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};vt.defaultPaletteConfig.scaleColorLight,vt.defaultPaletteConfig.scaleColorDark;class Ce{constructor(t){this.palette=[],this.config=Object.assign({},Ce.defaultPaletteConfig,t),this.regenPalettes()}regenPalettes(){let t=this.config.steps;(isNaN(t)||t<3)&&(t=3);const i=.14,s=.06,r=new M(i,i,i,1),n=94,a=new vt(Object.assign(Object.assign({},vt.greyscalePaletteConfig),{baseColor:r,baseScalePosition:(1-i)*100/n,steps:t})).palette,l=li(this.config.baseColor),c=Jt(this.config.baseColor).l,h=(l+c)/2,b=this.matchRelativeLuminanceIndex(h,a)/(t-1),m=this.matchRelativeLuminanceIndex(i,a)/(t-1),w=Jt(this.config.baseColor),N=hi($t.fromObject({h:w.h,s:w.s,l:i})),wt=hi($t.fromObject({h:w.h,s:w.s,l:s})),lt=new Array(5);lt[0]={position:0,color:new M(1,1,1,1)},lt[1]={position:b,color:this.config.baseColor},lt[2]={position:m,color:N},lt[3]={position:.99,color:wt},lt[4]={position:1,color:new M(0,0,0,1)};const kr=new Z(lt);this.palette=new Array(t);for(let se=0;se<t;se++){const $r=kr.getColor(se/(t-1),X.RGB);this.palette[se]=$r}}matchRelativeLuminanceIndex(t,i){let s=Number.MAX_VALUE,r=0,n=0;const o=i.length;for(;n<o;n++){const a=Math.abs(li(i[n])-t);a<s&&(s=a,r=n)}return r}}Ce.defaultPaletteConfig={baseColor:Vt("#808080"),steps:94};function tr(e,t){const i=e.relativeLuminance>t.relativeLuminance?e:t,s=e.relativeLuminance>t.relativeLuminance?t:e;return(i.relativeLuminance+.05)/(s.relativeLuminance+.05)}const yt=Object.freeze({create(e,t,i){return new ve(e,t,i)},from(e){return new ve(e.r,e.g,e.b)}});function Wo(e){const t={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const i in t)if(typeof t[i]!=typeof e[i])return!1;return!0}class ve extends M{constructor(t,i,s){super(t,i,s,1),this.toColorString=this.toStringHexRGB,this.contrast=tr.bind(null,this),this.createCSS=this.toColorString,this.relativeLuminance=ci(this)}static fromObject(t){return new ve(t.r,t.g,t.b)}}function pi(e,t,i=0,s=e.length-1){if(s===i)return e[i];const r=Math.floor((s-i)/2)+i;return t(e[r])?pi(e,t,i,r):pi(e,t,r+1,s)}const qo=(-.1+Math.sqrt(.21))/2;function Go(e){return e.relativeLuminance<=qo}function St(e){return Go(e)?-1:1}function Uo(e,t,i){return typeof e=="number"?me.from(yt.create(e,t,i)):me.from(e)}function _o(e){return Wo(e)?ye.from(e):ye.from(yt.create(e.r,e.g,e.b))}const me=Object.freeze({create:Uo,from:_o});class ye{constructor(t,i){this.closestIndexCache=new Map,this.source=t,this.swatches=i,this.reversedSwatches=Object.freeze([...this.swatches].reverse()),this.lastIndex=this.swatches.length-1}colorContrast(t,i,s,r){s===void 0&&(s=this.closestIndexOf(t));let n=this.swatches;const o=this.lastIndex;let a=s;r===void 0&&(r=St(t));const l=c=>tr(t,c)>=i;return r===-1&&(n=this.reversedSwatches,a=o-a),pi(n,l,a,o)}get(t){return this.swatches[t]||this.swatches[ct(t,0,this.lastIndex)]}closestIndexOf(t){if(this.closestIndexCache.has(t.relativeLuminance))return this.closestIndexCache.get(t.relativeLuminance);let i=this.swatches.indexOf(t);if(i!==-1)return this.closestIndexCache.set(t.relativeLuminance,i),i;const s=this.swatches.reduce((r,n)=>Math.abs(n.relativeLuminance-t.relativeLuminance)<Math.abs(r.relativeLuminance-t.relativeLuminance)?n:r);return i=this.swatches.indexOf(s),this.closestIndexCache.set(t.relativeLuminance,i),i}static from(t){return new ye(t,Object.freeze(new Ce({baseColor:M.fromObject(t)}).palette.map(i=>{const s=Vt(i.toStringHexRGB());return yt.create(s.r,s.g,s.b)})))}}function Xo(e,t,i,s,r,n,o,a,l){const c=e.source,h=t.closestIndexOf(i),p=Math.max(o,a,l),b=h>=p?-1:1,m=e.closestIndexOf(c),w=m+b*-1*s,N=w+b*r,wt=w+b*n;return{rest:e.get(w),hover:e.get(m),active:e.get(N),focus:e.get(wt)}}function Yo(e,t,i,s,r,n,o){const a=e.source,l=e.closestIndexOf(a),c=St(t),h=l+(c===1?Math.min(s,r):Math.max(c*s,c*r)),p=e.colorContrast(t,i,h,c),b=e.closestIndexOf(p),k=b+c*Math.abs(s-r),m=c===1?s<r:c*s>c*r;let w,N;return m?(w=b,N=k):(w=k,N=b),{rest:e.get(w),hover:e.get(N),active:e.get(w+c*n),focus:e.get(w+c*o)}}const ws=yt.create(1,1,1),Qo=yt.create(0,0,0),Zo=yt.from(Vt("#808080")),Jo=yt.from(Vt("#DA1A5F"));function Ko(e,t){return e.contrast(ws)>=t?ws:Qo}function ta(e,t,i,s,r,n){const o=e.closestIndexOf(t),a=Math.max(i,s,r,n),l=o>=a?-1:1;return{rest:e.get(o+l*i),hover:e.get(o+l*s),active:e.get(o+l*r),focus:e.get(o+l*n)}}function ea(e,t,i,s,r,n){const o=St(t),a=e.closestIndexOf(t);return{rest:e.get(a-o*i),hover:e.get(a-o*s),active:e.get(a-o*r),focus:e.get(a-o*n)}}function ia(e,t,i){const s=e.closestIndexOf(t);return e.get(s-(s<i?i*-1:i))}function sa(e,t,i,s,r,n,o,a,l,c){const h=Math.max(i,s,r,n,o,a,l,c),p=e.closestIndexOf(t),b=p>=h?-1:1;return{rest:e.get(p+b*i),hover:e.get(p+b*s),active:e.get(p+b*r),focus:e.get(p+b*n)}}function ra(e,t,i,s,r,n){const o=St(t),a=e.closestIndexOf(e.colorContrast(t,4.5)),l=a+o*Math.abs(i-s),c=o===1?i<s:o*i>o*s;let h,p;return c?(h=a,p=l):(h=l,p=a),{rest:e.get(h),hover:e.get(p),active:e.get(h+o*r),focus:e.get(h+o*n)}}function na(e,t){return e.colorContrast(t,3.5)}function oa(e,t,i){return e.colorContrast(i,3.5,e.closestIndexOf(e.source),St(t)*-1)}function aa(e,t){return e.colorContrast(t,14)}function la(e,t){return e.colorContrast(t,4.5)}function Fe(e){return yt.create(e,e,e)}const ca={LightMode:1,DarkMode:.23};function ha(e,t,i){return e.get(e.closestIndexOf(Fe(t))+i)}function ua(e,t,i){const s=e.closestIndexOf(Fe(t))-i;return e.get(s-i)}function da(e,t){return e.get(e.closestIndexOf(Fe(t)))}function Ni(e,t,i,s,r,n){return Math.max(e.closestIndexOf(Fe(t))+i,s,r,n)}function fa(e,t,i,s,r,n){return e.get(Ni(e,t,i,s,r,n))}function pa(e,t,i,s,r,n){return e.get(Ni(e,t,i,s,r,n)+i)}function ga(e,t,i,s,r,n){return e.get(Ni(e,t,i,s,r,n)+i*2)}function ba(e,t,i,s,r,n){const o=e.closestIndexOf(t),a=St(t),l=o+a*i,c=l+a*(s-i),h=l+a*(r-i),p=l+a*(n-i);return{rest:e.get(l),hover:e.get(c),active:e.get(h),focus:e.get(p)}}function va(e,t,i){return e.get(e.closestIndexOf(t)+St(t)*i)}const{create:d}=$e;function v(e){return $e.create({name:e,cssCustomPropertyName:null})}const Ai=d("body-font").withDefault('aktiv-grotesk, "Segoe UI", Arial, Helvetica, sans-serif'),er=d("base-height-multiplier").withDefault(10);d("base-horizontal-spacing-multiplier").withDefault(3);const Lt=d("base-layer-luminance").withDefault(ca.DarkMode),Ft=d("control-corner-radius").withDefault(4),Ei=d("density").withDefault(0),L=d("design-unit").withDefault(4),ei=d("direction").withDefault(E.ltr),Te=d("disabled-opacity").withDefault(.3),q=d("stroke-width").withDefault(1),it=d("focus-stroke-width").withDefault(2),ir=d("type-ramp-base-font-size").withDefault("14px"),sr=d("type-ramp-base-line-height").withDefault("20px");d("type-ramp-minus-1-font-size").withDefault("12px");d("type-ramp-minus-1-line-height").withDefault("16px");d("type-ramp-minus-2-font-size").withDefault("10px");d("type-ramp-minus-2-line-height").withDefault("16px");d("type-ramp-plus-1-font-size").withDefault("16px");d("type-ramp-plus-1-line-height").withDefault("24px");d("type-ramp-plus-2-font-size").withDefault("20px");d("type-ramp-plus-2-line-height").withDefault("28px");d("type-ramp-plus-3-font-size").withDefault("28px");d("type-ramp-plus-3-line-height").withDefault("36px");d("type-ramp-plus-4-font-size").withDefault("34px");d("type-ramp-plus-4-line-height").withDefault("44px");d("type-ramp-plus-5-font-size").withDefault("46px");d("type-ramp-plus-5-line-height").withDefault("56px");d("type-ramp-plus-6-font-size").withDefault("60px");d("type-ramp-plus-6-line-height").withDefault("72px");v("accent-fill-rest-delta").withDefault(0);const ma=v("accent-fill-hover-delta").withDefault(4),ya=v("accent-fill-active-delta").withDefault(-5),wa=v("accent-fill-focus-delta").withDefault(0),xa=v("accent-foreground-rest-delta").withDefault(0),ka=v("accent-foreground-hover-delta").withDefault(6),$a=v("accent-foreground-active-delta").withDefault(-4),Sa=v("accent-foreground-focus-delta").withDefault(0),It=v("neutral-fill-rest-delta").withDefault(7),Pt=v("neutral-fill-hover-delta").withDefault(10),Nt=v("neutral-fill-active-delta").withDefault(5),rr=v("neutral-fill-focus-delta").withDefault(0),Ca=v("neutral-fill-input-rest-delta").withDefault(0),Fa=v("neutral-fill-input-hover-delta").withDefault(0),Ta=v("neutral-fill-input-active-delta").withDefault(0),Ra=v("neutral-fill-input-focus-delta").withDefault(0),Da=v("neutral-fill-stealth-rest-delta").withDefault(0),Ma=v("neutral-fill-stealth-hover-delta").withDefault(5),Va=v("neutral-fill-stealth-active-delta").withDefault(3),La=v("neutral-fill-stealth-focus-delta").withDefault(0),Ia=v("neutral-fill-strong-rest-delta").withDefault(0),Pa=v("neutral-fill-strong-hover-delta").withDefault(8),Na=v("neutral-fill-strong-active-delta").withDefault(-5),Aa=v("neutral-fill-strong-focus-delta").withDefault(0),At=v("neutral-fill-layer-rest-delta").withDefault(3),Ea=v("neutral-stroke-rest-delta").withDefault(25),Oa=v("neutral-stroke-hover-delta").withDefault(40),Ba=v("neutral-stroke-active-delta").withDefault(16),Ha=v("neutral-stroke-focus-delta").withDefault(25),za=v("neutral-stroke-divider-rest-delta").withDefault(8),ja=d("neutral-color").withDefault(Zo),B=v("neutral-palette").withDefault(e=>me.from(ja.getValueFor(e))),Wa=d("accent-color").withDefault(Jo),Oi=v("accent-palette").withDefault(e=>me.from(Wa.getValueFor(e))),qa=v("neutral-layer-card-container-recipe").withDefault({evaluate:e=>ha(B.getValueFor(e),Lt.getValueFor(e),At.getValueFor(e))});d("neutral-layer-card-container").withDefault(e=>qa.getValueFor(e).evaluate(e));const Ga=v("neutral-layer-floating-recipe").withDefault({evaluate:e=>ua(B.getValueFor(e),Lt.getValueFor(e),At.getValueFor(e))});d("neutral-layer-floating").withDefault(e=>Ga.getValueFor(e).evaluate(e));const Ua=v("neutral-layer-1-recipe").withDefault({evaluate:e=>da(B.getValueFor(e),Lt.getValueFor(e))}),_a=d("neutral-layer-1").withDefault(e=>Ua.getValueFor(e).evaluate(e)),Xa=v("neutral-layer-2-recipe").withDefault({evaluate:e=>fa(B.getValueFor(e),Lt.getValueFor(e),At.getValueFor(e),It.getValueFor(e),Pt.getValueFor(e),Nt.getValueFor(e))});d("neutral-layer-2").withDefault(e=>Xa.getValueFor(e).evaluate(e));const Ya=v("neutral-layer-3-recipe").withDefault({evaluate:e=>pa(B.getValueFor(e),Lt.getValueFor(e),At.getValueFor(e),It.getValueFor(e),Pt.getValueFor(e),Nt.getValueFor(e))});d("neutral-layer-3").withDefault(e=>Ya.getValueFor(e).evaluate(e));const Qa=v("neutral-layer-4-recipe").withDefault({evaluate:e=>ga(B.getValueFor(e),Lt.getValueFor(e),At.getValueFor(e),It.getValueFor(e),Pt.getValueFor(e),Nt.getValueFor(e))});d("neutral-layer-4").withDefault(e=>Qa.getValueFor(e).evaluate(e));const O=d("fill-color").withDefault(e=>_a.getValueFor(e));var Kt;(function(e){e[e.normal=4.5]="normal",e[e.large=7]="large"})(Kt||(Kt={}));const Re=d({name:"accent-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>Xo(Oi.getValueFor(e),B.getValueFor(e),t||O.getValueFor(e),ma.getValueFor(e),ya.getValueFor(e),wa.getValueFor(e),It.getValueFor(e),Pt.getValueFor(e),Nt.getValueFor(e))}),dt=d("accent-fill-rest").withDefault(e=>Re.getValueFor(e).evaluate(e).rest),Dt=d("accent-fill-hover").withDefault(e=>Re.getValueFor(e).evaluate(e).hover),Mt=d("accent-fill-active").withDefault(e=>Re.getValueFor(e).evaluate(e).active),nr=d("accent-fill-focus").withDefault(e=>Re.getValueFor(e).evaluate(e).focus),or=e=>(t,i)=>Ko(i||dt.getValueFor(t),e),De=v("foreground-on-accent-recipe").withDefault({evaluate:(e,t)=>or(Kt.normal)(e,t)}),gi=d("foreground-on-accent-rest").withDefault(e=>De.getValueFor(e).evaluate(e,dt.getValueFor(e))),bi=d("foreground-on-accent-hover").withDefault(e=>De.getValueFor(e).evaluate(e,Dt.getValueFor(e))),vi=d("foreground-on-accent-active").withDefault(e=>De.getValueFor(e).evaluate(e,Mt.getValueFor(e)));d("foreground-on-accent-focus").withDefault(e=>De.getValueFor(e).evaluate(e,nr.getValueFor(e)));const Me=v("foreground-on-accent-large-recipe").withDefault({evaluate:(e,t)=>or(Kt.large)(e,t)});d("foreground-on-accent-rest-large").withDefault(e=>Me.getValueFor(e).evaluate(e,dt.getValueFor(e)));d("foreground-on-accent-hover-large").withDefault(e=>Me.getValueFor(e).evaluate(e,Dt.getValueFor(e)));d("foreground-on-accent-active-large").withDefault(e=>Me.getValueFor(e).evaluate(e,Mt.getValueFor(e)));d("foreground-on-accent-focus-large").withDefault(e=>Me.getValueFor(e).evaluate(e,nr.getValueFor(e)));const Za=e=>(t,i)=>Yo(Oi.getValueFor(t),i||O.getValueFor(t),e,xa.getValueFor(t),ka.getValueFor(t),$a.getValueFor(t),Sa.getValueFor(t)),Ve=d({name:"accent-foreground-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>Za(Kt.normal)(e,t)}),te=d("accent-foreground-rest").withDefault(e=>Ve.getValueFor(e).evaluate(e).rest),mi=d("accent-foreground-hover").withDefault(e=>Ve.getValueFor(e).evaluate(e).hover),yi=d("accent-foreground-active").withDefault(e=>Ve.getValueFor(e).evaluate(e).active);d("accent-foreground-focus").withDefault(e=>Ve.getValueFor(e).evaluate(e).focus);const Le=d({name:"neutral-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>ta(B.getValueFor(e),t||O.getValueFor(e),It.getValueFor(e),Pt.getValueFor(e),Nt.getValueFor(e),rr.getValueFor(e))}),ar=d("neutral-fill-rest").withDefault(e=>Le.getValueFor(e).evaluate(e).rest),Ja=d("neutral-fill-hover").withDefault(e=>Le.getValueFor(e).evaluate(e).hover),Ka=d("neutral-fill-active").withDefault(e=>Le.getValueFor(e).evaluate(e).active);d("neutral-fill-focus").withDefault(e=>Le.getValueFor(e).evaluate(e).focus);const Ie=d({name:"neutral-fill-input-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>ea(B.getValueFor(e),t||O.getValueFor(e),Ca.getValueFor(e),Fa.getValueFor(e),Ta.getValueFor(e),Ra.getValueFor(e))}),tl=d("neutral-fill-input-rest").withDefault(e=>Ie.getValueFor(e).evaluate(e).rest),el=d("neutral-fill-input-hover").withDefault(e=>Ie.getValueFor(e).evaluate(e).hover),il=d("neutral-fill-input-active").withDefault(e=>Ie.getValueFor(e).evaluate(e).active);d("neutral-fill-input-focus").withDefault(e=>Ie.getValueFor(e).evaluate(e).focus);const Pe=d({name:"neutral-fill-stealth-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>sa(B.getValueFor(e),t||O.getValueFor(e),Da.getValueFor(e),Ma.getValueFor(e),Va.getValueFor(e),La.getValueFor(e),It.getValueFor(e),Pt.getValueFor(e),Nt.getValueFor(e),rr.getValueFor(e))}),lr=d("neutral-fill-stealth-rest").withDefault(e=>Pe.getValueFor(e).evaluate(e).rest),sl=d("neutral-fill-stealth-hover").withDefault(e=>Pe.getValueFor(e).evaluate(e).hover),rl=d("neutral-fill-stealth-active").withDefault(e=>Pe.getValueFor(e).evaluate(e).active);d("neutral-fill-stealth-focus").withDefault(e=>Pe.getValueFor(e).evaluate(e).focus);const Ne=d({name:"neutral-fill-strong-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>ra(B.getValueFor(e),t||O.getValueFor(e),Ia.getValueFor(e),Pa.getValueFor(e),Na.getValueFor(e),Aa.getValueFor(e))});d("neutral-fill-strong-rest").withDefault(e=>Ne.getValueFor(e).evaluate(e).rest);d("neutral-fill-strong-hover").withDefault(e=>Ne.getValueFor(e).evaluate(e).hover);d("neutral-fill-strong-active").withDefault(e=>Ne.getValueFor(e).evaluate(e).active);d("neutral-fill-strong-focus").withDefault(e=>Ne.getValueFor(e).evaluate(e).focus);const nl=v("neutral-fill-layer-recipe").withDefault({evaluate:(e,t)=>ia(B.getValueFor(e),t||O.getValueFor(e),At.getValueFor(e))});d("neutral-fill-layer-rest").withDefault(e=>nl.getValueFor(e).evaluate(e));const ol=v("focus-stroke-outer-recipe").withDefault({evaluate:e=>na(B.getValueFor(e),O.getValueFor(e))}),ot=d("focus-stroke-outer").withDefault(e=>ol.getValueFor(e).evaluate(e)),al=v("focus-stroke-inner-recipe").withDefault({evaluate:e=>oa(Oi.getValueFor(e),O.getValueFor(e),ot.getValueFor(e))}),ll=d("focus-stroke-inner").withDefault(e=>al.getValueFor(e).evaluate(e)),cl=v("neutral-foreground-hint-recipe").withDefault({evaluate:e=>la(B.getValueFor(e),O.getValueFor(e))});d("neutral-foreground-hint").withDefault(e=>cl.getValueFor(e).evaluate(e));const hl=v("neutral-foreground-recipe").withDefault({evaluate:e=>aa(B.getValueFor(e),O.getValueFor(e))}),ft=d("neutral-foreground-rest").withDefault(e=>hl.getValueFor(e).evaluate(e)),Ae=d({name:"neutral-stroke-recipe",cssCustomPropertyName:null}).withDefault({evaluate:e=>ba(B.getValueFor(e),O.getValueFor(e),Ea.getValueFor(e),Oa.getValueFor(e),Ba.getValueFor(e),Ha.getValueFor(e))}),Bi=d("neutral-stroke-rest").withDefault(e=>Ae.getValueFor(e).evaluate(e).rest),cr=d("neutral-stroke-hover").withDefault(e=>Ae.getValueFor(e).evaluate(e).hover),ul=d("neutral-stroke-active").withDefault(e=>Ae.getValueFor(e).evaluate(e).active);d("neutral-stroke-focus").withDefault(e=>Ae.getValueFor(e).evaluate(e).focus);const dl=v("neutral-stroke-divider-recipe").withDefault({evaluate:(e,t)=>va(B.getValueFor(e),t||O.getValueFor(e),za.getValueFor(e))});d("neutral-stroke-divider-rest").withDefault(e=>dl.getValueFor(e).evaluate(e));$e.create({name:"height-number",cssCustomPropertyName:null}).withDefault(e=>(er.getValueFor(e)+Ei.getValueFor(e))*L.getValueFor(e));const ut=an`(${er} + ${Ei}) * ${L}`,fl="0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(.11 * (2 - var(--background-luminance, 1))))",pl="0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(.13 * (2 - var(--background-luminance, 1))))",gl=`box-shadow: ${fl}, ${pl};`,bl=y`
    ${ie("inline-flex")} :host {
        font-family: ${Ai};
        outline: none;
        font-size: ${ir};
        line-height: ${sr};
        height: calc(${ut} * 1px);
        min-width: calc(${ut} * 1px);
        background-color: ${ar};
        color: ${ft};
        border-radius: calc(${Ft} * 1px);
        fill: currentcolor;
        cursor: pointer;
    }

    .control {
        background: transparent;
        height: inherit;
        flex-grow: 1;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: center;
        align-items: baseline;
        padding: 0 calc((10 + (${L} * 2 * ${Ei})) * 1px);
        white-space: nowrap;
        outline: none;
        text-decoration: none;
        border: calc(${q} * 1px) solid transparent;
        color: inherit;
        border-radius: inherit;
        fill: inherit;
        cursor: inherit;
        font-weight: inherit;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }

    :host(:hover) {
        background-color: ${Ja};
    }

    :host(:active) {
        background-color: ${Ka};
    }

    .control:${C} {
        border-color: ${ot};
        box-shadow: 0 0 0 calc((${it} - ${q}) * 1px) ${ot} inset;
    }

    .control::-moz-focus-inner {
        border: 0;
    }

    .start,
    .content,
    .end {
        align-self: center;
    }

    .start,
    .end {
        display: flex;
    }

    .control.icon-only {
        padding: 0;
        line-height: 0;
    }

    ::slotted(svg) {
        ${""} width: 16px;
        height: 16px;
        pointer-events: none;
    }

    .start {
        margin-inline-end: 11px;
    }

    .end {
        margin-inline-start: 11px;
    }
`.withBehaviors(U(y`
            :host .control {
              background-color: ${u.ButtonFace};
              border-color: ${u.ButtonText};
              color: ${u.ButtonText};
              fill: currentColor;
            }

            :host(:hover) .control {
              forced-color-adjust: none;
              background-color: ${u.Highlight};
              color: ${u.HighlightText};
            }

            .control:${C} {
              forced-color-adjust: none;
              background-color: ${u.Highlight};
              border-color: ${u.ButtonText};
              box-shadow: 0 0 0 calc((${it} - ${q}) * 1px) ${u.ButtonText} inset;
              color: ${u.HighlightText};
            }

            .control:hover,
            :host([appearance="outline"]) .control:hover {
              border-color: ${u.ButtonText};
            }

            :host([href]) .control {
                border-color: ${u.LinkText};
                color: ${u.LinkText};
            }

            :host([href]) .control:hover,
            :host([href]) .control:${C}{
              forced-color-adjust: none;
              background: ${u.ButtonFace};
              border-color: ${u.LinkText};
              box-shadow: 0 0 0 1px ${u.LinkText} inset;
              color: ${u.LinkText};
              fill: currentColor;
            }
        `)),vl=y`
    :host([appearance="accent"]) {
        background: ${dt};
        color: ${gi};
    }

    :host([appearance="accent"]:hover) {
        background: ${Dt};
        color: ${bi};
    }

    :host([appearance="accent"]:active) .control:active {
        background: ${Mt};
        color: ${vi};
    }

    :host([appearance="accent"]) .control:${C} {
        box-shadow: 0 0 0 calc((${it} - ${q}) * 1px) ${ot} inset,
            0 0 0 calc((${it} + ${q}) * 1px) ${ll} inset;
    }
`.withBehaviors(U(y`
            :host([appearance="accent"]) .control {
                forced-color-adjust: none;
                background: ${u.Highlight};
                color: ${u.HighlightText};
            }

            :host([appearance="accent"]) .control:hover,
            :host([appearance="accent"]:active) .control:active {
                background: ${u.HighlightText};
                border-color: ${u.Highlight};
                color: ${u.Highlight};
            }

            :host([appearance="accent"]) .control:${C} {
                border-color: ${u.Highlight};
                box-shadow: 0 0 0 calc(${it} * 1px) ${u.HighlightText} inset;
            }

            :host([appearance="accent"][href]) .control{
                background: ${u.LinkText};
                color: ${u.HighlightText};
            }

            :host([appearance="accent"][href]) .control:hover {
                background: ${u.ButtonFace};
                border-color: ${u.LinkText};
                box-shadow: none;
                color: ${u.LinkText};
                fill: currentColor;
            }

            :host([appearance="accent"][href]) .control:${C} {
                border-color: ${u.LinkText};
                box-shadow: 0 0 0 calc(${it} * 1px) ${u.HighlightText} inset;
            }
        `));y`
    :host([appearance="hypertext"]) {
        font-size: inherit;
        line-height: inherit;
        height: auto;
        min-width: 0;
        background: transparent;
    }

    :host([appearance="hypertext"]) .control {
        display: inline;
        padding: 0;
        border: none;
        box-shadow: none;
        border-radius: 0;
        line-height: 1;
    }

    :host a.control:not(:link) {
        background-color: transparent;
        cursor: default;
    }
    :host([appearance="hypertext"]) .control:link,
    :host([appearance="hypertext"]) .control:visited {
        background: transparent;
        color: ${te};
        border-bottom: calc(${q} * 1px) solid ${te};
    }

    :host([appearance="hypertext"]:hover),
    :host([appearance="hypertext"]) .control:hover {
        background: transparent;
        border-bottom-color: ${mi};
    }

    :host([appearance="hypertext"]:active),
    :host([appearance="hypertext"]) .control:active {
        background: transparent;
        border-bottom-color: ${yi};
    }

    :host([appearance="hypertext"]) .control:${C} {
        border-bottom: calc(${it} * 1px) solid ${ot};
        margin-bottom: calc(calc(${q} - ${it}) * 1px);
    }
`.withBehaviors(U(y`
            :host([appearance="hypertext"]:hover) {
                background-color: ${u.ButtonFace};
                color: ${u.ButtonText};
            }
            :host([appearance="hypertext"][href]) .control:hover,
            :host([appearance="hypertext"][href]) .control:active,
            :host([appearance="hypertext"][href]) .control:${C} {
                color: ${u.LinkText};
                border-bottom-color: ${u.LinkText};
                box-shadow: none;
            }
        `));const ml=y`
    :host([appearance="lightweight"]) {
        background: transparent;
        color: ${te};
    }

    :host([appearance="lightweight"]) .control {
        padding: 0;
        height: initial;
        border: none;
        box-shadow: none;
        border-radius: 0;
    }

    :host([appearance="lightweight"]:hover) {
        background: transparent;
        color: ${mi};
    }

    :host([appearance="lightweight"]:active) {
        background: transparent;
        color: ${yi};
    }

    :host([appearance="lightweight"]) .content {
        position: relative;
    }

    :host([appearance="lightweight"]) .content::before {
        content: "";
        display: block;
        height: calc(${q} * 1px);
        position: absolute;
        top: calc(1em + 4px);
        width: 100%;
    }

    :host([appearance="lightweight"]:hover) .content::before {
        background: ${mi};
    }

    :host([appearance="lightweight"]:active) .content::before {
        background: ${yi};
    }

    :host([appearance="lightweight"]) .control:${C} .content::before {
        background: ${ft};
        height: calc(${it} * 1px);
    }
`.withBehaviors(U(y`
            :host([appearance="lightweight"]) .control:hover,
            :host([appearance="lightweight"]) .control:${C} {
                forced-color-adjust: none;
                background: ${u.ButtonFace};
                color: ${u.Highlight};
            }
            :host([appearance="lightweight"]) .control:hover .content::before,
            :host([appearance="lightweight"]) .control:${C} .content::before {
                background: ${u.Highlight};
            }

            :host([appearance="lightweight"][href]) .control:hover,
            :host([appearance="lightweight"][href]) .control:${C} {
                background: ${u.ButtonFace};
                box-shadow: none;
                color: ${u.LinkText};
            }

            :host([appearance="lightweight"][href]) .control:hover .content::before,
            :host([appearance="lightweight"][href]) .control:${C} .content::before {
                background: ${u.LinkText};
            }
        `)),yl=y`
    :host([appearance="outline"]) {
        background: transparent;
        border-color: ${dt};
    }

    :host([appearance="outline"]:hover) {
        border-color: ${Dt};
    }

    :host([appearance="outline"]:active) {
        border-color: ${Mt};
    }

    :host([appearance="outline"]) .control {
        border-color: inherit;
    }

    :host([appearance="outline"]) .control:${C} {
        box-shadow: 0 0 0 calc((${it} - ${q}) * 1px) ${ot} inset;
        border-color: ${ot};
    }
`.withBehaviors(U(y`
            :host([appearance="outline"]) .control {
                border-color: ${u.ButtonText};
            }
            :host([appearance="outline"]) .control:${C} {
              forced-color-adjust: none;
              background-color: ${u.Highlight};
              border-color: ${u.ButtonText};
              box-shadow: 0 0 0 calc((${it} - ${q}) * 1px) ${u.ButtonText} inset;
              color: ${u.HighlightText};
              fill: currentColor;
            }
            :host([appearance="outline"][href]) .control {
                background: ${u.ButtonFace};
                border-color: ${u.LinkText};
                color: ${u.LinkText};
                fill: currentColor;
            }
            :host([appearance="outline"][href]) .control:hover,
            :host([appearance="outline"][href]) .control:${C} {
              forced-color-adjust: none;
              border-color: ${u.LinkText};
              box-shadow: 0 0 0 1px ${u.LinkText} inset;
            }
        `)),wl=y`
    :host([appearance="stealth"]) {
        background: ${lr};
    }

    :host([appearance="stealth"]:hover) {
        background: ${sl};
    }

    :host([appearance="stealth"]:active) {
        background: ${rl};
    }
`.withBehaviors(U(y`
            :host([appearance="stealth"]),
            :host([appearance="stealth"]) .control {
                forced-color-adjust: none;
                background: ${u.ButtonFace};
                border-color: transparent;
                color: ${u.ButtonText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:hover) .control {
                background: ${u.Highlight};
                border-color: ${u.Highlight};
                color: ${u.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:${C}) .control {
                background: ${u.Highlight};
                box-shadow: 0 0 0 1px ${u.Highlight};
                color: ${u.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]) .control {
                color: ${u.LinkText};
            }

            :host([appearance="stealth"][href]:hover) .control,
            :host([appearance="stealth"][href]:${C}) .control {
                background: ${u.LinkText};
                border-color: ${u.LinkText};
                color: ${u.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]:${C}) .control {
                forced-color-adjust: none;
                box-shadow: 0 0 0 1px ${u.LinkText};
            }
        `));class xl{constructor(t,i){this.cache=new WeakMap,this.ltr=t,this.rtl=i}bind(t){this.attach(t)}unbind(t){const i=this.cache.get(t);i&&ei.unsubscribe(i)}attach(t){const i=this.cache.get(t)||new kl(this.ltr,this.rtl,t),s=ei.getValueFor(t);ei.subscribe(i),i.attach(s),this.cache.set(t,i)}}class kl{constructor(t,i,s){this.ltr=t,this.rtl=i,this.source=s,this.attached=null}handleChange({target:t,token:i}){this.attach(i.getValueFor(t))}attach(t){this.attached!==this[t]&&(this.attached!==null&&this.source.$fastController.removeStyles(this.attached),this.attached=this[t],this.attached!==null&&this.source.$fastController.addStyles(this.attached))}}function le(e,t){return new To("appearance",e,t)}const $l=(e,t)=>y`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
            opacity: ${Te};
            background-color: ${ar};
            cursor: ${be};
        }

        ${bl}
    `.withBehaviors(U(y`
                :host([disabled]),
                :host([disabled]) .control,
                :host([disabled]:hover),
                :host([disabled]:active) {
                    forced-color-adjust: none;
                    background-color: ${u.ButtonFace};
                    border-color: ${u.GrayText};
                    color: ${u.GrayText};
                    cursor: ${be};
                    opacity: 1;
                }
            `),le("accent",y`
                :host([appearance="accent"][disabled]),
                :host([appearance="accent"][disabled]:hover),
                :host([appearance="accent"][disabled]:active) {
                    background: ${dt};
                }

                ${vl}
            `.withBehaviors(U(y`
                        :host([appearance="accent"][disabled]) .control,
                        :host([appearance="accent"][disabled]) .control:hover {
                            background: ${u.ButtonFace};
                            border-color: ${u.GrayText};
                            color: ${u.GrayText};
                        }
                    `))),le("lightweight",y`
                :host([appearance="lightweight"][disabled]:hover),
                :host([appearance="lightweight"][disabled]:active) {
                    background-color: transparent;
                    color: ${te};
                }

                :host([appearance="lightweight"][disabled]) .content::before,
                :host([appearance="lightweight"][disabled]:hover) .content::before,
                :host([appearance="lightweight"][disabled]:active) .content::before {
                    background: transparent;
                }

                ${ml}
            `.withBehaviors(U(y`
                        :host([appearance="lightweight"].disabled) .control {
                            forced-color-adjust: none;
                            color: ${u.GrayText};
                        }

                        :host([appearance="lightweight"].disabled)
                            .control:hover
                            .content::before {
                            background: none;
                        }
                    `))),le("outline",y`
                :host([appearance="outline"][disabled]),
                :host([appearance="outline"][disabled]:hover),
                :host([appearance="outline"][disabled]:active) {
                    background: transparent;
                    border-color: ${dt};
                }

                ${yl}
            `.withBehaviors(U(y`
                        :host([appearance="outline"][disabled]) .control {
                            border-color: ${u.GrayText};
                        }
                    `))),le("stealth",y`
                :host([appearance="stealth"][disabled]),
                :host([appearance="stealth"][disabled]:hover),
                :host([appearance="stealth"][disabled]:active) {
                    background: ${lr};
                }

                ${wl}
            `.withBehaviors(U(y`
                        :host([appearance="stealth"][disabled]) {
                            background: ${u.ButtonFace};
                        }

                        :host([appearance="stealth"][disabled]) .control {
                            background: ${u.ButtonFace};
                            border-color: transparent;
                            color: ${u.GrayText};
                        }
                    `))));class hr extends et{constructor(){super(...arguments),this.appearance="neutral"}defaultSlottedContentChanged(t,i){const s=this.defaultSlottedContent.filter(r=>r.nodeType===Node.ELEMENT_NODE);s.length===1&&s[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}f([g],hr.prototype,"appearance",void 0);const Sl=hr.compose({baseName:"button",baseClass:et,template:Bn,styles:$l,shadowOptions:{delegatesFocus:!0}}),Cl=(e,t)=>y`
    :host([hidden]) {
        display: none;
    }

    :host {
        --elevation: 14;
        --dialog-height: 480px;
        --dialog-width: 640px;
        display: block;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        touch-action: none;
    }

    .positioning-region {
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;
    }

    .control {
        ${gl}
        margin-top: auto;
        margin-bottom: auto;
        width: var(--dialog-width);
        height: var(--dialog-height);
        background-color: ${O};
        z-index: 1;
        border-radius: calc(${Ft} * 1px);
        border: calc(${q} * 1px) solid transparent;
    }
`,Fl=J.compose({baseName:"dialog",template:io,styles:Cl}),Tl=(e,t)=>y`
    ${ie("flex")} :host {
        align-items: flex-start;
        margin: calc(${L} * 1px) 0;
        flex-direction: column;
    }
    .positioning-region {
        display: flex;
        flex-wrap: wrap;
    }
    :host([orientation="vertical"]) .positioning-region {
        flex-direction: column;
    }
    :host([orientation="horizontal"]) .positioning-region {
        flex-direction: row;
    }
`,Rl=mt.compose({baseName:"radio-group",template:vo,styles:Tl}),Dl=(e,t)=>y`
        ${ie("inline-flex")} :host {
            --input-size: calc((${ut} / 2) + ${L});
            align-items: center;
            outline: none;
            margin: calc(${L} * 1px) 0;
            /* Chromium likes to select label text or the default slot when
                the radio is clicked. Maybe there is a better solution here? */
            user-select: none;
            position: relative;
            flex-direction: row;
            transition: all 0.2s ease-in-out;
        }

        .control {
            position: relative;
            width: calc((${ut} / 2 + ${L}) * 1px);
            height: calc((${ut} / 2 + ${L}) * 1px);
            box-sizing: border-box;
            border-radius: 999px;
            border: calc(${q} * 1px) solid ${Bi};
            background: ${tl};
            outline: none;
            cursor: pointer;
        }

        .label {
            font-family: ${Ai};
            color: ${ft};
            padding-inline-start: calc(${L} * 2px + 2px);
            margin-inline-end: calc(${L} * 2px + 2px);
            cursor: pointer;
            font-size: ${ir};
            line-height: ${sr};
        }

        .label__hidden {
            display: none;
            visibility: hidden;
        }

        .control, .checked-indicator {
            flex-shrink: 0;
        }

        .checked-indicator {
            position: absolute;
            top: 5px;
            left: 5px;
            right: 5px;
            bottom: 5px;
            border-radius: 999px;
            display: inline-block;
            background: ${gi};
            fill: ${gi};
            opacity: 0;
            pointer-events: none;
        }

        :host(:not([disabled])) .control:hover{
            background: ${el};
            border-color: ${cr};
        }

        :host(:not([disabled])) .control:active {
            background: ${il};
            border-color: ${ul};
        }

        :host(:${C}) .control {
            box-shadow: 0 0 0 2px ${O}, 0 0 0 4px ${ot};
        }

        :host([aria-checked="true"]) .control {
            background: ${dt};
            border: calc(${q} * 1px) solid ${dt};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover {
            background: ${Dt};
            border: calc(${q} * 1px) solid ${Dt};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
            background: ${bi};
            fill: ${bi};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active {
            background: ${Mt};
            border: calc(${q} * 1px) solid ${Mt};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
            background: ${vi};
            fill: ${vi};
        }

        :host([aria-checked="true"]:${C}:not([disabled])) .control {
            box-shadow: 0 0 0 2px ${O}, 0 0 0 4px ${ot};
        }

        :host([disabled]) .label,
        :host([readonly]) .label,
        :host([readonly]) .control,
        :host([disabled]) .control {
            cursor: ${be};
        }

        :host([aria-checked="true"]) .checked-indicator {
            opacity: 1;
        }

        :host([disabled]) {
            opacity: ${Te};
        }
    `.withBehaviors(U(y`
            .control,
            :host([aria-checked="true"]:not([disabled])) .control {
                forced-color-adjust: none;
                border-color: ${u.FieldText};
                background: ${u.Field};
            }
            :host(:not([disabled])) .control:hover {
                border-color: ${u.Highlight};
                background: ${u.Field};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover,
            :host([aria-checked="true"]:not([disabled])) .control:active {
                border-color: ${u.Highlight};
                background: ${u.Highlight};
            }
            :host([aria-checked="true"]) .checked-indicator {
                background: ${u.Highlight};
                fill: ${u.Highlight};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator,
            :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
                background: ${u.HighlightText};
                fill: ${u.HighlightText};
            }
            :host(:${C}) .control {
                border-color: ${u.Highlight};
                box-shadow: 0 0 0 2px ${u.Field}, 0 0 0 4px ${u.FieldText};
            }
            :host([aria-checked="true"]:${C}:not([disabled])) .control {
                border-color: ${u.Highlight};
                box-shadow: 0 0 0 2px ${u.Field}, 0 0 0 4px ${u.FieldText};
            }
            :host([disabled]) {
                forced-color-adjust: none;
                opacity: 1;
            }
            :host([disabled]) .label {
                color: ${u.GrayText};
            }
            :host([disabled]) .control,
            :host([aria-checked="true"][disabled]) .control:hover, .control:active {
                background: ${u.Field};
                border-color: ${u.GrayText};
            }
            :host([disabled]) .checked-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .checked-indicator {
                fill: ${u.GrayText};
                background: ${u.GrayText};
            }
        `)),Ml=Se.compose({baseName:"radio",template:mo,styles:Dl,checkedIndicator:`
        <div part="checked-indicator" class="checked-indicator"></div>
    `}),xs=y`
    :host {
        align-self: start;
        grid-row: 2;
        margin-top: -2px;
        height: calc((${ut} / 2 + ${L}) * 1px);
        width: auto;
    }
    .container {
        grid-template-rows: auto auto;
        grid-template-columns: 0;
    }
    .label {
        margin: 2px 0;
    }
`,ks=y`
    :host {
        justify-self: start;
        grid-column: 2;
        margin-left: 2px;
        height: auto;
        width: calc((${ut} / 2 + ${L}) * 1px);
    }
    .container {
        grid-template-columns: auto auto;
        grid-template-rows: 0;
        min-width: calc(var(--thumb-size) * 1px);
        height: calc(var(--thumb-size) * 1px);
    }
    .mark {
        transform: rotate(90deg);
        align-self: center;
    }
    .label {
        margin-left: calc((${L} / 2) * 3px);
        align-self: center;
    }
`,Vl=(e,t)=>y`
        ${ie("block")} :host {
            font-family: ${Ai};
            color: ${ft};
            fill: currentcolor;
        }
        .root {
            position: absolute;
            display: grid;
        }
        .container {
            display: grid;
            justify-self: center;
        }
        .label {
            justify-self: center;
            align-self: center;
            white-space: nowrap;
            max-width: 30px;
        }
        .mark {
            width: calc((${L} / 4) * 1px);
            height: calc(${ut} * 0.25 * 1px);
            background: ${Bi};
            justify-self: center;
        }
        :host(.disabled) {
            opacity: ${Te};
        }
    `.withBehaviors(U(y`
                .mark {
                    forced-color-adjust: none;
                    background: ${u.FieldText};
                }
                :host(.disabled) {
                    forced-color-adjust: none;
                    opacity: 1;
                }
                :host(.disabled) .label {
                    color: ${u.GrayText};
                }
                :host(.disabled) .mark {
                    background: ${u.GrayText};
                }
            `));class Ll extends at{sliderOrientationChanged(){this.sliderOrientation===H.horizontal?(this.$fastController.addStyles(xs),this.$fastController.removeStyles(ks)):(this.$fastController.addStyles(ks),this.$fastController.removeStyles(xs))}}const Il=Ll.compose({baseName:"slider-label",baseClass:at,template:xo,styles:Vl}),Pl=y`
    .track-start {
        left: 0;
    }
`,Nl=y`
    .track-start {
        right: 0;
    }
`,Al=(e,t)=>y`
        :host([hidden]) {
            display: none;
        }

        ${ie("inline-grid")} :host {
            --thumb-size: calc(${ut} * 0.5 - ${L});
            --thumb-translate: calc(var(--thumb-size) * -0.5 + var(--track-width) / 2);
            --track-overhang: calc((${L} / 2) * -1);
            --track-width: ${L};
            --fast-slider-height: calc(var(--thumb-size) * 10);
            align-items: center;
            width: 100%;
            margin: calc(${L} * 1px) 0;
            user-select: none;
            box-sizing: border-box;
            border-radius: calc(${Ft} * 1px);
            outline: none;
            cursor: pointer;
        }
        :host([orientation="horizontal"]) .positioning-region {
            position: relative;
            margin: 0 8px;
            display: grid;
            grid-template-rows: calc(var(--thumb-size) * 1px) 1fr;
        }
        :host([orientation="vertical"]) .positioning-region {
            position: relative;
            margin: 0 8px;
            display: grid;
            height: 100%;
            grid-template-columns: calc(var(--thumb-size) * 1px) 1fr;
        }

        :host(:${C}) .thumb-cursor {
            box-shadow: 0 0 0 2px ${O}, 0 0 0 4px ${ot};
        }

        .thumb-container {
            position: absolute;
            height: calc(var(--thumb-size) * 1px);
            width: calc(var(--thumb-size) * 1px);
            transition: all 0.2s ease;
            color: ${ft};
            fill: currentcolor;
        }
        .thumb-cursor {
            border: none;
            width: calc(var(--thumb-size) * 1px);
            height: calc(var(--thumb-size) * 1px);
            background: ${ft};
            border-radius: calc(${Ft} * 1px);
        }
        .thumb-cursor:hover {
            background: ${ft};
            border-color: ${cr};
        }
        .thumb-cursor:active {
            background: ${ft};
        }
        .track-start {
            background: ${te};
            position: absolute;
            height: 100%;
            left: 0;
            border-radius: calc(${Ft} * 1px);
        }
        :host([orientation="horizontal"]) .thumb-container {
            transform: translateX(calc(var(--thumb-size) * 0.5px)) translateY(calc(var(--thumb-translate) * 1px));
        }
        :host([orientation="vertical"]) .thumb-container {
            transform: translateX(calc(var(--thumb-translate) * 1px)) translateY(calc(var(--thumb-size) * 0.5px));
        }
        :host([orientation="horizontal"]) {
            min-width: calc(var(--thumb-size) * 1px);
        }
        :host([orientation="horizontal"]) .track {
            right: calc(var(--track-overhang) * 1px);
            left: calc(var(--track-overhang) * 1px);
            align-self: start;
            height: calc(var(--track-width) * 1px);
        }
        :host([orientation="vertical"]) .track {
            top: calc(var(--track-overhang) * 1px);
            bottom: calc(var(--track-overhang) * 1px);
            width: calc(var(--track-width) * 1px);
            height: 100%;
        }
        .track {
            background: ${Bi};
            position: absolute;
            border-radius: calc(${Ft} * 1px);
        }
        :host([orientation="vertical"]) {
            height: calc(var(--fast-slider-height) * 1px);
            min-height: calc(var(--thumb-size) * 1px);
            min-width: calc(${L} * 20px);
        }
        :host([orientation="vertical"]) .track-start {
            height: auto;
            width: 100%;
            top: 0;
        }
        :host([disabled]), :host([readonly]) {
            cursor: ${be};
        }
        :host([disabled]) {
            opacity: ${Te};
        }
    `.withBehaviors(new xl(Pl,Nl),U(y`
                .thumb-cursor {
                    forced-color-adjust: none;
                    border-color: ${u.FieldText};
                    background: ${u.FieldText};
                }
                .thumb-cursor:hover,
                .thumb-cursor:active {
                    background: ${u.Highlight};
                }
                .track {
                    forced-color-adjust: none;
                    background: ${u.FieldText};
                }
                :host(:${C}) .thumb-cursor {
                    border-color: ${u.Highlight};
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .track,
                :host([disabled]) .thumb-cursor {
                    forced-color-adjust: none;
                    background: ${u.GrayText};
                }

                :host(:${C}) .thumb-cursor {
                    background: ${u.Highlight};
                    border-color: ${u.Highlight};
                    box-shadow: 0 0 0 2px ${u.Field}, 0 0 0 4px ${u.FieldText};
                }
            `)),El=j.compose({baseName:"slider",template:ko,styles:Al,thumb:`
        <div class="thumb-cursor"></div>
    `});function Ol(e){return _s.getOrCreate(e).withPrefix("fast")}Ol().register(Sl(),Ml(),Rl(),Fl(),El({thumb:'<div style="background-color: #fff; border: solid; border-color: #777; border-width: 1px; border-radius: 3px; width: 16px; height: 16px; "></div>'}),Il());const Bl=document.getElementById("barChartCanvas"),Hl=document.getElementById("infoDialogOpenButton"),zl=document.getElementById("infoDialogCloseButton"),ur=document.getElementById("infoDialog"),pt=document.getElementById("nCitiesSlider"),st=document.getElementById("piSlider"),rt=document.getElementById("tcostSlider"),nt=document.getElementById("sigmaSlider"),dr=document.getElementById("speedSlider"),fr=document.getElementById("caseSelector"),gt=document.getElementById("visualizerCanvas"),pr=document.getElementById("nCities"),gr=document.getElementById("pi"),br=document.getElementById("tcost"),vr=document.getElementById("sigma"),Ee=document.getElementById("start"),Oe=document.getElementById("stop"),Hi=document.getElementById("reset"),jl=document.getElementById("counter"),mr=1,x=new Tr(12,1,.2,2,4,.5,mr),Wl=new Mr(Bl,x),yr=40,wr=40,Wt=320,ql=15;function wi(){const e=[{mapper:i=>i.MShare,ratioToMax:!0},{mapper:i=>i.priceIndex,ratioToMax:!1},{mapper:i=>i.nominalWage,ratioToMax:!1},{mapper:i=>i.realWage,ratioToMax:!1}],t=e.map(i=>x.country.cities.map(i.mapper).reduce((s,r)=>r>s?r:s,0));Vr({canvas:gt,left:yr,top:wr,diameter:Wt,vertices:x.numCities,vertexCircleRadiusBase:ql,src:x.country.cities.map(i=>e.map((s,r)=>s.ratioToMax?s.mapper(i)/t[r]:s.mapper(i))),model:x})}x.addUpdateEventListener(()=>{jl.innerText=x.counter.toLocaleString(),Wl.repaint(),wi()});Ee.className="";Oe.className="disabled";st.valueAsNumber=x.country.pi;rt.valueAsNumber=x.country.tcost;nt.valueAsNumber=x.country.sigma;pr.innerText=pt.value;br.innerText=rt.value;vr.innerText=nt.value;gr.innerText=st.value;function Gl(){Ee.className="disabled",Oe.className="started",Hi.className="started",x.start()}function Ul(){Ee.className="",Oe.className="disabled",Hi.className="",x.stop()}function xr(){x.reset()}function _l(){pr.innerText=pt.value,x.setNumCities(pt.valueAsNumber,st.valueAsNumber,rt.valueAsNumber,nt.valueAsNumber,mr),x.reset()}function Xl(){gr.innerText=st.valueAsNumber.toPrecision(2),x.setPi(st.valueAsNumber),x.calcDistanceMatrix()}function Yl(){br.innerText=rt.valueAsNumber.toPrecision(2),x.setTcost(rt.valueAsNumber),x.calcDistanceMatrix()}function Ql(){vr.innerText=nt.valueAsNumber.toPrecision(3),x.setSigma(nt.valueAsNumber),x.calcDistanceMatrix()}function Zl(){x.stop(),x.setSpeed(dr.valueAsNumber),x.start()}function Jl(){switch(fr.value){case"0":pt.value="12",st.value="0.2",rt.value="2",nt.value="4",x.calcDistanceMatrix();return;case"1":pt.value="12",st.value="0.2",rt.value="2",nt.value="2",x.calcDistanceMatrix();return;case"2":pt.value="12",st.value="0.4",rt.value="2",nt.value="4",x.calcDistanceMatrix();return;case"3":pt.value="12",st.value="0.2",rt.value="1",nt.value="4",x.calcDistanceMatrix();return}}let ii=-1;function Be(e){const t=gt.getBoundingClientRect(),i=gt.width/t.width,s=gt.height/t.height,r=(e.clientX-t.left)*i,n=(e.clientY-t.top)*s,o=r-yr-Wt/2,a=n-wr-Wt/2,l=Math.sqrt(o*o+a*a);if(l<Wt/2-30||Wt/2+30<l){x.setSelectedCityIndex(-1),ii=-1,wi();return}const c=Lr(o,a,x.numCities);ii!=c&&(x.setSelectedCityIndex(c),wi(),ii=c)}Ee.addEventListener("click",Gl);Oe.addEventListener("click",Ul);Hi.addEventListener("click",xr);pt.addEventListener("change",_l);st.addEventListener("change",Xl);rt.addEventListener("change",Yl);nt.addEventListener("change",Ql);dr.addEventListener("change",Zl);fr.addEventListener("change",Jl);gt.addEventListener("mousemove",Be);gt.addEventListener("mouseenter",Be);gt.addEventListener("mouseleave",Be);gt.addEventListener("mouseover",Be);const Kl=document.getElementById("scale");Kl.addEventListener("change",e=>{const t=e.target.value,i=parseFloat(t.split(" ")[1]);x.setScale(i)});function tc(){ur.show()}function ec(){ur.hide()}Hl.addEventListener("click",tc);zl.addEventListener("click",ec);xr();
