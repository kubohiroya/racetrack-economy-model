var Ir=Object.defineProperty;var Nr=(e,t,i)=>t in e?Ir(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var x=(e,t,i)=>(Nr(e,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();class Gi{constructor(t,i,s){x(this,"realWage");x(this,"priceIndex");x(this,"priceIndex0");x(this,"income");x(this,"income0");x(this,"AShare");x(this,"MShare");x(this,"MShare0");x(this,"nominalWage");x(this,"nominalWage0");x(this,"dMShare");x(this,"id");this.id=t,this.MShare=i,this.MShare0=i,this.dMShare=0,this.AShare=s,this.priceIndex=1,this.priceIndex0=1,this.income=1,this.income0=1,this.nominalWage=1,this.nominalWage0=1,this.realWage=1}setMShare(t){this.MShare=t}setAShare(t){this.AShare=t}changeMShare(t){this.dMShare=t,this.MShare+=this.dMShare}push(){this.income0=this.income,this.nominalWage0=this.nominalWage,this.priceIndex0=this.priceIndex,this.MShare0=this.MShare}calcIncome(t){this.income=t.pi*this.MShare*this.nominalWage+(1-t.pi)*this.AShare}calcPriceIndex(t){let i=0;t.cities.forEach(s=>{i+=s.MShare*Math.pow(s.nominalWage0*t.distanceMatrix[this.id][s.id],1-t.sigma)}),this.priceIndex=Math.pow(i,1/(1-t.sigma))}calcRealWage(t){this.realWage=this.nominalWage*Math.pow(this.priceIndex,-t.pi)}calcNominalWage(t){let i=0;t.cities.forEach(s=>{i+=s.income0*Math.pow(t.distanceMatrix[this.id][s.id],1-t.sigma)*Math.pow(s.priceIndex0,t.sigma-1)}),this.nominalWage=Math.pow(i,1/t.sigma)}calcDynamics(t){this.dMShare=t.gamma*(this.realWage-t.avgRealWage)*this.MShare}applyDynamics(t){this.MShare>1/t.cities.length/10?this.MShare+=this.dMShare:this.MShare=1/t.cities.length/10}}class Er{constructor(t,i,s,r,n){x(this,"pi");x(this,"avgRealWage");x(this,"tcost");x(this,"sigma");x(this,"distanceMatrix");x(this,"cities");x(this,"gamma");this.pi=i,this.tcost=s,this.sigma=r,this.gamma=n,this.avgRealWage=1,this.cities=new Array(t),this.distanceMatrix=new Array(t);for(let o=0;o<t;o++)this.distanceMatrix[o]=new Array(t).fill(0),this.cities[o]=new Gi(o,0,0);this.equalize(),this.calcDistanceMatrix()}reset(){const t=this.cities.length;for(let i=0;i<t;i++)this.distanceMatrix[i]=new Array(t).fill(0),this.cities[i]=new Gi(i,0,0);this.equalize(),this.calcDistanceMatrix(),this.disturb()}setSigma(t){this.sigma=t+.1}setTcost(t){this.tcost=t}setPi(t){this.pi=t}calcDistanceMatrix(){const t=this.cities.length;for(let i=0;i<t;i++)for(let s=i;s<t;s++){const r=i==s?0:2*Math.min(s-i,i+t-s)/t;this.distanceMatrix[s][i]=this.distanceMatrix[i][s]=Math.exp(Math.log(this.tcost)*r)}}equalize(){const t=this.cities.length;this.cities.forEach(i=>{i.setMShare(1/t),i.setAShare(1/t)})}disturb(){const t=this.cities.length,i=1/t*.05;for(let s=0;s<t;s++){const r=Math.floor(Math.random()*t);this.cities[r].changeMShare(i)}this.rescale()}rescale(){let t=0,i=0;this.cities.forEach(s=>{t+=s.MShare,i+=s.AShare}),this.cities.forEach(s=>{s.setMShare(s.MShare/t),s.setAShare(s.AShare/i)})}push(){this.cities.forEach(t=>{t.push()})}calcIncome(){this.cities.forEach(t=>{t.calcIncome(this)})}calcPriceIndex(){this.cities.forEach(t=>{t.calcPriceIndex(this)})}calcNominalWage(){this.cities.forEach(t=>{t.calcNominalWage(this)})}calcRealWage(){this.cities.forEach(t=>{t.calcRealWage(this)})}calcAvgRealWage(){let t=0;this.cities.forEach(i=>{t+=i.realWage*i.MShare}),this.avgRealWage=t}calcDynamics(){this.cities.forEach(t=>{t.calcDynamics(this)})}applyDynamics(){this.cities.forEach(t=>{t.applyDynamics(this)}),this.rescale()}procedure(){this.push(),this.calcIncome(),this.calcPriceIndex(),this.calcNominalWage(),this.calcRealWage(),this.calcAvgRealWage(),this.calcDynamics(),this.applyDynamics()}}var ut=(e=>(e[e.radius=0]="radius",e[e.color=1]="color",e[e.grayOuterCircle=2]="grayOuterCircle",e[e.redOuterCircle=3]="redOuterCircle",e))(ut||{}),dt=(e=>(e[e.mshare=0]="mshare",e[e.priceIndex=1]="priceIndex",e[e.nominalWage=2]="nominalWage",e[e.realWage=3]="realWage",e))(dt||{});class Or{constructor(t,i,s,r,n,o,a){x(this,"numCities");x(this,"country");x(this,"counter");x(this,"scale");x(this,"speed");x(this,"started",!1);x(this,"selectedCityIndex");x(this,"listeners",new Array);x(this,"timer",null);x(this,"bindings",new Map);this.numCities=t,this.country=this.createCountry(t,s,r,n,a),this.scale=i,this.speed=o,this.selectedCityIndex=-1,this.counter=0,this.bindings.set(0,0),this.bindings.set(1,1),this.bindings.set(2,2),this.bindings.set(3,3)}createCountry(t,i,s,r,n){return new Er(t,i,s,r,n)}reset(){this.counter=0,this.selectedCityIndex=-1,this.country.reset(),this.update()}stop(){this.started=!1,this.timer!=null&&clearInterval(this.timer),this.timer=null}start(){if(!this.started){this.started=!0;const t=this.expScale(this.speed);this.timer=setInterval(()=>{this.country.procedure(),this.counter++,this.update()},t)}}expScale(t){const i=Math.log(10),s=Math.log(3e3),r=i+(1-t)*(s-i);return Math.exp(r)}calcDistanceMatrix(){this.country.calcDistanceMatrix()}setNumCities(t,i,s,r,n){this.numCities=t,this.country=this.createCountry(this.numCities,i,s,r,n)}setScale(t){this.scale=t,this.update()}setSpeed(t){this.speed=t}setPi(t){this.country.setPi(t)}setTcost(t){this.country.setTcost(t)}setSigma(t){this.country.setSigma(t)}setSelectedCityIndex(t){this.selectedCityIndex=t}addUpdateEventListener(t){this.listeners.push(t)}update(){this.listeners.forEach(t=>{t(this)})}}function Ar(e,t,i,s,r,n){const o=t-n,a=6,l=.1;e.textAlign="right";let c=0;for(let h=0;h<=1;h+=l){const f=i-r-h*s;f>=0&&(e.fillStyle="#ddd",e.fillRect(n,f-1,o,1),e.fillStyle="#888",e.fillText(h.toFixed(1),n-2,f+3),c++)}if(c<5)for(let h=.05;h<=1;h+=l){const f=i-r-h*s;f>=0&&(e.fillRect(n,f-1,a,1),e.fillText(h.toFixed(2),n-2,f+4))}if(c<2)for(let h=.01;h<=1;h+=.01){const f=i-r-h*s;f>=0&&(e.fillRect(n,f-1,a,1),e.fillText(h.toFixed(2),n-2,f+4),c++)}}function Pr(e,t,i,s,r,n){if(e.fillStyle="#888",e.textAlign="left",r<=100)for(let a=5;a<=r;a+=5){const l=s+a*i;e.fillText(a.toString(),l,n)}else for(let a=50;a<=r;a+=50){const l=s+a*i;e.fillText(a.toString(),l,n)}}class Br{constructor(t,i){x(this,"model");x(this,"canvas");this.canvas=t,this.model=i}repaint(){const s=this.canvas.getContext("2d");if(!s||!this.model)return;const r=(this.canvas.width-25)/this.model.country.cities.length,n=(this.canvas.height-10*2)*this.model.scale;s.fillStyle="#fff",s.fillRect(0,0,25,this.canvas.height),s.fillStyle="#f4f4f4",s.fillRect(25,10,this.canvas.width-25,this.canvas.height-10*2),Ar(s,this.canvas.width,this.canvas.height,n,10,25),this.model.country.cities.forEach((o,a)=>{o.dMShare<0?s.fillStyle="#ee8888":s.fillStyle="#dd0000",s.fillRect(25+a*r,this.canvas.height-10-o.MShare*n,Math.max(r-1,1),o.MShare*n)}),s.fillStyle="#fff",s.fillRect(25,this.canvas.height-10,this.canvas.width-25,10),Pr(s,this.canvas.width,r,25,this.model.numCities,this.canvas.height-10+10),s.fillStyle="#fff",s.fillRect(0,0,this.canvas.width,10)}}const Ui=[{mapper:e=>e.MShare,ratioToMax:!0},{mapper:e=>e.priceIndex,ratioToMax:!1},{mapper:e=>e.nominalWage,ratioToMax:!1},{mapper:e=>e.realWage,ratioToMax:!1}];function pe(e,t){for(const i of[dt.mshare,dt.priceIndex,dt.nominalWage,dt.realWage])if(e.get(i)==t)return i}function Hr(e,t,i){const s=Math.atan2(t,e),r=2*Math.PI/i,n=(s+2*Math.PI+r/2)%(2*Math.PI);return Math.floor(n/r)}function zr(e,t,i,s,r,n){e.strokeStyle="",n&&(e.beginPath(),e.fillStyle="rgb(255, 255, 0, 0.5)",e.arc(t,i,40,0,2*Math.PI),e.fill(),e.closePath()),e.beginPath(),e.fillStyle=`rgb(255, 0, 0, ${r})`,e.arc(t,i,s,0,2*Math.PI),e.fill(),e.closePath()}function jr(e,t,i,s,r,n,o,a,l,c){const h=t.x+i*Math.cos(s),f=t.y+i*Math.sin(s),b=r!=null?o*l[r]:o,m=n!=null?l[n]:a;(r!=null||n!=null)&&zr(e,h,f,b,m,c)}function Wr(e,t,i,s,r){(s<100&&r%5==0||100<=s&&r%50==0)&&(e.fillStyle="rgb(5, 5, 5, .5)",e.fillText(`${r}`,t,i+3))}function qr(e,t,i,s,r,n,o,a,l){const c=pe(n.bindings,ut.radius),h=pe(n.bindings,ut.color);for(let f=0;f<e;f++){const b=f*t;jr(i,s,r,b,c,h,o,a,l[f],f===n.selectedCityIndex);const m=s.x+(r+30)*Math.cos(b)-7,k=s.y+(r+30)*Math.sin(b);Wr(i,m,k,e,f)}}function Gr(e,t,i){if(e.selectedCityIndex>=0){const n=e.country.cities[e.selectedCityIndex];t.fillStyle="black",t.fillText("share of manufacturing = "+n.MShare.toFixed(4),i.x+-70,i.y+-60),t.fillText("price index = "+n.priceIndex.toFixed(4),i.x+-70,i.y+-60+15),t.fillText("nominal wage = "+n.nominalWage.toFixed(4),i.x+-70,i.y+-60+30),t.fillText("real wage = "+n.realWage.toFixed(4),i.x+-70,i.y+-60+45)}}function Ur(e,t,i){e.beginPath(),e.strokeStyle="black",e.arc(t.x,t.y,i,0,2*Math.PI),e.stroke(),e.closePath()}function _i(e,t,i,s,r,n,o,a,l){e.beginPath(),e.strokeStyle=l;for(let c=0;c<t;c++){const h=c*i;if(o!=null){const f=s+a[c][o]*n,b=r.x+f*Math.cos(h),m=r.y+f*Math.sin(h);c==0&&e.moveTo(b,m),e.lineTo(b,m)}}e.closePath(),e.stroke()}function _r({canvas:e,left:t,top:i,diameter:s,vertices:r,vertexCircleRadiusBase:n,vertexCircleColorBase:o,model:a}){const l=e.getContext("2d");if(!l)return;l.clearRect(0,0,e.width,e.height);const c=Ui.map(L=>a.country.cities.map(L.mapper).reduce((U,_)=>_>U?_:U,0)),h=a.country.cities.map(L=>Ui.map((U,_)=>U.ratioToMax?U.mapper(L)/c[_]:U.mapper(L))),f=s/2,b={x:f+t,y:f+i},m=2*Math.PI/r;Ur(l,b,f),qr(r,m,l,b,f,a,n,o,h);const k=pe(a.bindings,ut.grayOuterCircle),$=pe(a.bindings,ut.redOuterCircle);_i(l,r,m,f,b,20,$,h,"rgb(255,0,0,0.5)"),_i(l,r,m,f,b,20,k,h,"rgb(0,0,0,0.5)"),Gr(a,l,b)}const yt=function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}}();yt.trustedTypes===void 0&&(yt.trustedTypes={createPolicy:(e,t)=>t});const Rs={configurable:!1,enumerable:!1,writable:!1};yt.FAST===void 0&&Reflect.defineProperty(yt,"FAST",Object.assign({value:Object.create(null)},Rs));const Zt=yt.FAST;if(Zt.getById===void 0){const e=Object.create(null);Reflect.defineProperty(Zt,"getById",Object.assign({value(t,i){let s=e[t];return s===void 0&&(s=i?e[t]=i():null),s}},Rs))}const _t=Object.freeze([]);function Ds(){const e=new WeakMap;return function(t){let i=e.get(t);if(i===void 0){let s=Reflect.getPrototypeOf(t);for(;i===void 0&&s!==null;)i=e.get(s),s=Reflect.getPrototypeOf(s);i=i===void 0?[]:i.slice(0),e.set(t,i)}return i}}const Ge=yt.FAST.getById(1,()=>{const e=[],t=[];function i(){if(t.length)throw t.shift()}function s(o){try{o.call()}catch(a){t.push(a),setTimeout(i,0)}}function r(){let a=0;for(;a<e.length;)if(s(e[a]),a++,a>1024){for(let l=0,c=e.length-a;l<c;l++)e[l]=e[l+a];e.length-=a,a=0}e.length=0}function n(o){e.length<1&&yt.requestAnimationFrame(r),e.push(o)}return Object.freeze({enqueue:n,process:r})}),Ms=yt.trustedTypes.createPolicy("fast-html",{createHTML:e=>e});let Ue=Ms;const Xt=`fast-${Math.random().toString(36).substring(2,8)}`,Ls=`${Xt}{`,Ci=`}${Xt}`,S=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(e){if(Ue!==Ms)throw new Error("The HTML policy can only be set once.");Ue=e},createHTML(e){return Ue.createHTML(e)},isMarker(e){return e&&e.nodeType===8&&e.data.startsWith(Xt)},extractDirectiveIndexFromMarker(e){return parseInt(e.data.replace(`${Xt}:`,""))},createInterpolationPlaceholder(e){return`${Ls}${e}${Ci}`},createCustomAttributePlaceholder(e,t){return`${e}="${this.createInterpolationPlaceholder(t)}"`},createBlockPlaceholder(e){return`<!--${Xt}:${e}-->`},queueUpdate:Ge.enqueue,processUpdates:Ge.process,nextUpdate(){return new Promise(Ge.enqueue)},setAttribute(e,t,i){i==null?e.removeAttribute(t):e.setAttribute(t,i)},setBooleanAttribute(e,t,i){i?e.setAttribute(t,""):e.removeAttribute(t)},removeChildNodes(e){for(let t=e.firstChild;t!==null;t=e.firstChild)e.removeChild(t)},createTemplateWalker(e){return document.createTreeWalker(e,133,null,!1)}});class li{constructor(t,i){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=i}has(t){return this.spillover===void 0?this.sub1===t||this.sub2===t:this.spillover.indexOf(t)!==-1}subscribe(t){const i=this.spillover;if(i===void 0){if(this.has(t))return;if(this.sub1===void 0){this.sub1=t;return}if(this.sub2===void 0){this.sub2=t;return}this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else i.indexOf(t)===-1&&i.push(t)}unsubscribe(t){const i=this.spillover;if(i===void 0)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}notify(t){const i=this.spillover,s=this.source;if(i===void 0){const r=this.sub1,n=this.sub2;r!==void 0&&r.handleChange(s,t),n!==void 0&&n.handleChange(s,t)}else for(let r=0,n=i.length;r<n;++r)i[r].handleChange(s,t)}}class Vs{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var i;const s=this.subscribers[t];s!==void 0&&s.notify(t),(i=this.sourceSubscribers)===null||i===void 0||i.notify(t)}subscribe(t,i){var s;if(i){let r=this.subscribers[i];r===void 0&&(this.subscribers[i]=r=new li(this.source)),r.subscribe(t)}else this.sourceSubscribers=(s=this.sourceSubscribers)!==null&&s!==void 0?s:new li(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,i){var s;if(i){const r=this.subscribers[i];r!==void 0&&r.unsubscribe(t)}else(s=this.sourceSubscribers)===null||s===void 0||s.unsubscribe(t)}}const R=Zt.getById(2,()=>{const e=/(:|&&|\|\||if)/,t=new WeakMap,i=S.queueUpdate;let s,r=c=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function n(c){let h=c.$fastController||t.get(c);return h===void 0&&(Array.isArray(c)?h=r(c):t.set(c,h=new Vs(c))),h}const o=Ds();class a{constructor(h){this.name=h,this.field=`_${h}`,this.callback=`${h}Changed`}getValue(h){return s!==void 0&&s.watch(h,this.name),h[this.field]}setValue(h,f){const b=this.field,m=h[b];if(m!==f){h[b]=f;const k=h[this.callback];typeof k=="function"&&k.call(h,m,f),n(h).notify(this.name)}}}class l extends li{constructor(h,f,b=!1){super(h,f),this.binding=h,this.isVolatileBinding=b,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(h,f){this.needsRefresh&&this.last!==null&&this.disconnect();const b=s;s=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const m=this.binding(h,f);return s=b,m}disconnect(){if(this.last!==null){let h=this.first;for(;h!==void 0;)h.notifier.unsubscribe(this,h.propertyName),h=h.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(h,f){const b=this.last,m=n(h),k=b===null?this.first:{};if(k.propertySource=h,k.propertyName=f,k.notifier=m,m.subscribe(this,f),b!==null){if(!this.needsRefresh){let $;s=void 0,$=b.propertySource[b.propertyName],s=this,h===$&&(this.needsRefresh=!0)}b.next=k}this.last=k}handleChange(){this.needsQueue&&(this.needsQueue=!1,i(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let h=this.first;return{next:()=>{const f=h;return f===void 0?{value:void 0,done:!0}:(h=h.next,{value:f,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(c){r=c},getNotifier:n,track(c,h){s!==void 0&&s.watch(c,h)},trackVolatile(){s!==void 0&&(s.needsRefresh=!0)},notify(c,h){n(c).notify(h)},defineProperty(c,h){typeof h=="string"&&(h=new a(h)),o(c).push(h),Reflect.defineProperty(c,h.name,{enumerable:!0,get:function(){return h.getValue(this)},set:function(f){h.setValue(this,f)}})},getAccessors:o,binding(c,h,f=this.isVolatileBinding(c)){return new l(c,h,f)},isVolatileBinding(c){return e.test(c.toString())}})});function F(e,t){R.defineProperty(e,t)}const Xi=Zt.getById(3,()=>{let e=null;return{get(){return e},set(t){e=t}}});class Jt{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return Xi.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){Xi.set(t)}}R.defineProperty(Jt.prototype,"index");R.defineProperty(Jt.prototype,"length");const Yt=Object.seal(new Jt);class Fi{constructor(){this.targetIndex=0}}class Is extends Fi{constructor(){super(...arguments),this.createPlaceholder=S.createInterpolationPlaceholder}}class Ns extends Fi{constructor(t,i,s){super(),this.name=t,this.behavior=i,this.options=s}createPlaceholder(t){return S.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function Xr(e,t){this.source=e,this.context=t,this.bindingObserver===null&&(this.bindingObserver=R.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(e,t))}function Yr(e,t){this.source=e,this.context=t,this.target.addEventListener(this.targetName,this)}function Qr(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function Zr(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const e=this.target.$fastView;e!==void 0&&e.isComposed&&(e.unbind(),e.needsBindOnly=!0)}function Jr(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function Kr(e){S.setAttribute(this.target,this.targetName,e)}function tn(e){S.setBooleanAttribute(this.target,this.targetName,e)}function en(e){if(e==null&&(e=""),e.create){this.target.textContent="";let t=this.target.$fastView;t===void 0?t=e.create():this.target.$fastTemplate!==e&&(t.isComposed&&(t.remove(),t.unbind()),t=e.create()),t.isComposed?t.needsBindOnly&&(t.needsBindOnly=!1,t.bind(this.source,this.context)):(t.isComposed=!0,t.bind(this.source,this.context),t.insertBefore(this.target),this.target.$fastView=t,this.target.$fastTemplate=e)}else{const t=this.target.$fastView;t!==void 0&&t.isComposed&&(t.isComposed=!1,t.remove(),t.needsBindOnly?t.needsBindOnly=!1:t.unbind()),this.target.textContent=e}}function sn(e){this.target[this.targetName]=e}function rn(e){const t=this.classVersions||Object.create(null),i=this.target;let s=this.version||0;if(e!=null&&e.length){const r=e.split(/\s+/);for(let n=0,o=r.length;n<o;++n){const a=r[n];a!==""&&(t[a]=s,i.classList.add(a))}}if(this.classVersions=t,this.version=s+1,s!==0){s-=1;for(const r in t)t[r]===s&&i.classList.remove(r)}}class Ti extends Is{constructor(t){super(),this.binding=t,this.bind=Xr,this.unbind=Qr,this.updateTarget=Kr,this.isBindingVolatile=R.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,t!==void 0)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=sn,this.cleanedTargetName==="innerHTML"){const i=this.binding;this.binding=(s,r)=>S.createHTML(i(s,r))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=tn;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=Yr,this.unbind=Jr;break;default:this.cleanedTargetName=t,t==="class"&&(this.updateTarget=rn);break}}targetAtContent(){this.updateTarget=en,this.unbind=Zr}createBehavior(t){return new nn(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class nn{constructor(t,i,s,r,n,o,a){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=i,this.isBindingVolatile=s,this.bind=r,this.unbind=n,this.updateTarget=o,this.targetName=a}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){Jt.setEvent(t);const i=this.binding(this.source,this.context);Jt.setEvent(null),i!==!0&&t.preventDefault()}}let _e=null;class Ri{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){_e=this}static borrow(t){const i=_e||new Ri;return i.directives=t,i.reset(),_e=null,i}}function on(e){if(e.length===1)return e[0];let t;const i=e.length,s=e.map(o=>typeof o=="string"?()=>o:(t=o.targetName||t,o.binding)),r=(o,a)=>{let l="";for(let c=0;c<i;++c)l+=s[c](o,a);return l},n=new Ti(r);return n.targetName=t,n}const an=Ci.length;function Es(e,t){const i=t.split(Ls);if(i.length===1)return null;const s=[];for(let r=0,n=i.length;r<n;++r){const o=i[r],a=o.indexOf(Ci);let l;if(a===-1)l=o;else{const c=parseInt(o.substring(0,a));s.push(e.directives[c]),l=o.substring(a+an)}l!==""&&s.push(l)}return s}function Yi(e,t,i=!1){const s=t.attributes;for(let r=0,n=s.length;r<n;++r){const o=s[r],a=o.value,l=Es(e,a);let c=null;l===null?i&&(c=new Ti(()=>a),c.targetName=o.name):c=on(l),c!==null&&(t.removeAttributeNode(o),r--,n--,e.addFactory(c))}}function ln(e,t,i){const s=Es(e,t.textContent);if(s!==null){let r=t;for(let n=0,o=s.length;n<o;++n){const a=s[n],l=n===0?t:r.parentNode.insertBefore(document.createTextNode(""),r.nextSibling);typeof a=="string"?l.textContent=a:(l.textContent=" ",e.captureContentBinding(a)),r=l,e.targetIndex++,l!==t&&i.nextNode()}e.targetIndex--}}function cn(e,t){const i=e.content;document.adoptNode(i);const s=Ri.borrow(t);Yi(s,e,!0);const r=s.behaviorFactories;s.reset();const n=S.createTemplateWalker(i);let o;for(;o=n.nextNode();)switch(s.targetIndex++,o.nodeType){case 1:Yi(s,o);break;case 3:ln(s,o,n);break;case 8:S.isMarker(o)&&s.addFactory(t[S.extractDirectiveIndexFromMarker(o)])}let a=0;(S.isMarker(i.firstChild)||i.childNodes.length===1&&t.length)&&(i.insertBefore(document.createComment(""),i.firstChild),a=-1);const l=s.behaviorFactories;return s.release(),{fragment:i,viewBehaviorFactories:l,hostBehaviorFactories:r,targetOffset:a}}const Xe=document.createRange();class hn{constructor(t,i){this.fragment=t,this.behaviors=i,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const i=this.lastChild;if(t.previousSibling===i)return;const s=t.parentNode;let r=this.firstChild,n;for(;r!==i;)n=r.nextSibling,s.insertBefore(r,t),r=n;s.insertBefore(i,t)}}remove(){const t=this.fragment,i=this.lastChild;let s=this.firstChild,r;for(;s!==i;)r=s.nextSibling,t.appendChild(s),s=r;t.appendChild(i)}dispose(){const t=this.firstChild.parentNode,i=this.lastChild;let s=this.firstChild,r;for(;s!==i;)r=s.nextSibling,t.removeChild(s),s=r;t.removeChild(i);const n=this.behaviors,o=this.source;for(let a=0,l=n.length;a<l;++a)n[a].unbind(o)}bind(t,i){const s=this.behaviors;if(this.source!==t)if(this.source!==null){const r=this.source;this.source=t,this.context=i;for(let n=0,o=s.length;n<o;++n){const a=s[n];a.unbind(r),a.bind(t,i)}}else{this.source=t,this.context=i;for(let r=0,n=s.length;r<n;++r)s[r].bind(t,i)}}unbind(){if(this.source===null)return;const t=this.behaviors,i=this.source;for(let s=0,r=t.length;s<r;++s)t[s].unbind(i);this.source=null}static disposeContiguousBatch(t){if(t.length!==0){Xe.setStartBefore(t[0].firstChild),Xe.setEndAfter(t[t.length-1].lastChild),Xe.deleteContents();for(let i=0,s=t.length;i<s;++i){const r=t[i],n=r.behaviors,o=r.source;for(let a=0,l=n.length;a<l;++a)n[a].unbind(o)}}}}class Qi{constructor(t,i){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=i}create(t){if(this.fragment===null){let c;const h=this.html;if(typeof h=="string"){c=document.createElement("template"),c.innerHTML=S.createHTML(h);const b=c.content.firstElementChild;b!==null&&b.tagName==="TEMPLATE"&&(c=b)}else c=h;const f=cn(c,this.directives);this.fragment=f.fragment,this.viewBehaviorFactories=f.viewBehaviorFactories,this.hostBehaviorFactories=f.hostBehaviorFactories,this.targetOffset=f.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const i=this.fragment.cloneNode(!0),s=this.viewBehaviorFactories,r=new Array(this.behaviorCount),n=S.createTemplateWalker(i);let o=0,a=this.targetOffset,l=n.nextNode();for(let c=s.length;o<c;++o){const h=s[o],f=h.targetIndex;for(;l!==null;)if(a===f){r[o]=h.createBehavior(l);break}else l=n.nextNode(),a++}if(this.hasHostBehaviors){const c=this.hostBehaviorFactories;for(let h=0,f=c.length;h<f;++h,++o)r[o]=c[h].createBehavior(t)}return new hn(i,r)}render(t,i,s){typeof i=="string"&&(i=document.getElementById(i)),s===void 0&&(s=i);const r=this.create(s);return r.bind(t,Yt),r.appendTo(i),r}}const un=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function et(e,...t){const i=[];let s="";for(let r=0,n=e.length-1;r<n;++r){const o=e[r];let a=t[r];if(s+=o,a instanceof Qi){const l=a;a=()=>l}if(typeof a=="function"&&(a=new Ti(a)),a instanceof Is){const l=un.exec(o);l!==null&&(a.targetName=l[2])}a instanceof Fi?(s+=a.createPlaceholder(i.length),i.push(a)):s+=a}return s+=e[e.length-1],new Qi(s,i)}class G{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=this.behaviors===null?t:this.behaviors.concat(t),this}}G.create=(()=>{if(S.supportsAdoptedStyleSheets){const e=new Map;return t=>new dn(t,e)}return e=>new gn(e)})();function Di(e){return e.map(t=>t instanceof G?Di(t.styles):[t]).reduce((t,i)=>t.concat(i),[])}function Os(e){return e.map(t=>t instanceof G?t.behaviors:null).reduce((t,i)=>i===null?t:(t===null&&(t=[]),t.concat(i)),null)}let As=(e,t)=>{e.adoptedStyleSheets=[...e.adoptedStyleSheets,...t]},Ps=(e,t)=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(i=>t.indexOf(i)===-1)};if(S.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),As=(e,t)=>{e.adoptedStyleSheets.push(...t)},Ps=(e,t)=>{for(const i of t){const s=e.adoptedStyleSheets.indexOf(i);s!==-1&&e.adoptedStyleSheets.splice(s,1)}}}catch{}class dn extends G{constructor(t,i){super(),this.styles=t,this.styleSheetCache=i,this._styleSheets=void 0,this.behaviors=Os(t)}get styleSheets(){if(this._styleSheets===void 0){const t=this.styles,i=this.styleSheetCache;this._styleSheets=Di(t).map(s=>{if(s instanceof CSSStyleSheet)return s;let r=i.get(s);return r===void 0&&(r=new CSSStyleSheet,r.replaceSync(s),i.set(s,r)),r})}return this._styleSheets}addStylesTo(t){As(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){Ps(t,this.styleSheets),super.removeStylesFrom(t)}}let fn=0;function pn(){return`fast-style-class-${++fn}`}class gn extends G{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=Os(t),this.styleSheets=Di(t),this.styleClass=pn()}addStylesTo(t){const i=this.styleSheets,s=this.styleClass;t=this.normalizeTarget(t);for(let r=0;r<i.length;r++){const n=document.createElement("style");n.innerHTML=i[r],n.className=s,t.append(n)}super.addStylesTo(t)}removeStylesFrom(t){t=this.normalizeTarget(t);const i=t.querySelectorAll(`.${this.styleClass}`);for(let s=0,r=i.length;s<r;++s)t.removeChild(i[s]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const ge=Object.freeze({locate:Ds()}),Bs={toView(e){return e?"true":"false"},fromView(e){return!(e==null||e==="false"||e===!1||e===0)}},Mi={toView(e){if(e==null)return null;const t=e*1;return isNaN(t)?null:t.toString()},fromView(e){if(e==null)return null;const t=e*1;return isNaN(t)?null:t}};class be{constructor(t,i,s=i.toLowerCase(),r="reflect",n){this.guards=new Set,this.Owner=t,this.name=i,this.attribute=s,this.mode=r,this.converter=n,this.fieldName=`_${i}`,this.callbackName=`${i}Changed`,this.hasCallback=this.callbackName in t.prototype,r==="boolean"&&n===void 0&&(this.converter=Bs)}setValue(t,i){const s=t[this.fieldName],r=this.converter;r!==void 0&&(i=r.fromView(i)),s!==i&&(t[this.fieldName]=i,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](s,i),t.$fastController.notify(this.name))}getValue(t){return R.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,i){this.guards.has(t)||(this.guards.add(t),this.setValue(t,i),this.guards.delete(t))}tryReflectToAttribute(t){const i=this.mode,s=this.guards;s.has(t)||i==="fromView"||S.queueUpdate(()=>{s.add(t);const r=t[this.fieldName];switch(i){case"reflect":const n=this.converter;S.setAttribute(t,this.attribute,n!==void 0?n.toView(r):r);break;case"boolean":S.setBooleanAttribute(t,this.attribute,r);break}s.delete(t)})}static collect(t,...i){const s=[];i.push(ge.locate(t));for(let r=0,n=i.length;r<n;++r){const o=i[r];if(o!==void 0)for(let a=0,l=o.length;a<l;++a){const c=o[a];typeof c=="string"?s.push(new be(t,c)):s.push(new be(t,c.property,c.attribute,c.mode,c.converter))}}return s}}function g(e,t){let i;function s(r,n){arguments.length>1&&(i.property=n),ge.locate(r.constructor).push(i)}if(arguments.length>1){i={},s(e,t);return}return i=e===void 0?{}:e,s}const Zi={mode:"open"},Ji={},ci=Zt.getById(4,()=>{const e=new Map;return Object.freeze({register(t){return e.has(t.type)?!1:(e.set(t.type,t),!0)},getByType(t){return e.get(t)}})});class Se{constructor(t,i=t.definition){typeof i=="string"&&(i={name:i}),this.type=t,this.name=i.name,this.template=i.template;const s=be.collect(t,i.attributes),r=new Array(s.length),n={},o={};for(let a=0,l=s.length;a<l;++a){const c=s[a];r[a]=c.attribute,n[c.name]=c,o[c.attribute]=c}this.attributes=s,this.observedAttributes=r,this.propertyLookup=n,this.attributeLookup=o,this.shadowOptions=i.shadowOptions===void 0?Zi:i.shadowOptions===null?void 0:Object.assign(Object.assign({},Zi),i.shadowOptions),this.elementOptions=i.elementOptions===void 0?Ji:Object.assign(Object.assign({},Ji),i.elementOptions),this.styles=i.styles===void 0?void 0:Array.isArray(i.styles)?G.create(i.styles):i.styles instanceof G?i.styles:G.create([i.styles])}get isDefined(){return!!ci.getByType(this.type)}define(t=customElements){const i=this.type;if(ci.register(this)){const s=this.attributes,r=i.prototype;for(let n=0,o=s.length;n<o;++n)R.defineProperty(r,s[n]);Reflect.defineProperty(i,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,i,this.elementOptions),this}}Se.forType=ci.getByType;const Hs=new WeakMap,bn={bubbles:!0,composed:!0,cancelable:!0};function Ye(e){return e.shadowRoot||Hs.get(e)||null}class Li extends Vs{constructor(t,i){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=i;const s=i.shadowOptions;if(s!==void 0){const n=t.attachShadow(s);s.mode==="closed"&&Hs.set(t,n)}const r=R.getAccessors(t);if(r.length>0){const n=this.boundObservables=Object.create(null);for(let o=0,a=r.length;o<a;++o){const l=r[o].name,c=t[l];c!==void 0&&(delete t[l],n[l]=c)}}}get isConnected(){return R.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,R.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=t,!this.needsInitialization&&t!==null&&this.addStyles(t))}addStyles(t){const i=Ye(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)i.append(t);else if(!t.isAttachedTo(i)){const s=t.behaviors;t.addStylesTo(i),s!==null&&this.addBehaviors(s)}}removeStyles(t){const i=Ye(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)i.removeChild(t);else if(t.isAttachedTo(i)){const s=t.behaviors;t.removeStylesFrom(i),s!==null&&this.removeBehaviors(s)}}addBehaviors(t){const i=this.behaviors||(this.behaviors=new Map),s=t.length,r=[];for(let n=0;n<s;++n){const o=t[n];i.has(o)?i.set(o,i.get(o)+1):(i.set(o,1),r.push(o))}if(this._isConnected){const n=this.element;for(let o=0;o<r.length;++o)r[o].bind(n,Yt)}}removeBehaviors(t,i=!1){const s=this.behaviors;if(s===null)return;const r=t.length,n=[];for(let o=0;o<r;++o){const a=t[o];if(s.has(a)){const l=s.get(a)-1;l===0||i?s.delete(a)&&n.push(a):s.set(a,l)}}if(this._isConnected){const o=this.element;for(let a=0;a<n.length;++a)n[a].unbind(o)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(t,Yt);const i=this.behaviors;if(i!==null)for(const[s]of i)s.bind(t,Yt);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;t!==null&&t.unbind();const i=this.behaviors;if(i!==null){const s=this.element;for(const[r]of i)r.unbind(s)}}onAttributeChangedCallback(t,i,s){const r=this.definition.attributeLookup[t];r!==void 0&&r.onAttributeChangedCallback(this.element,s)}emit(t,i,s){return this._isConnected?this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:i},bn),s))):!1}finishInitialization(){const t=this.element,i=this.boundObservables;if(i!==null){const r=Object.keys(i);for(let n=0,o=r.length;n<o;++n){const a=r[n];t[a]=i[a]}this.boundObservables=null}const s=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():s.template&&(this._template=s.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():s.styles&&(this._styles=s.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const i=this.element,s=Ye(i)||i;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||S.removeChildNodes(s),t&&(this.view=t.render(i,s,i))}static forCustomElement(t){const i=t.$fastController;if(i!==void 0)return i;const s=Se.forType(t.constructor);if(s===void 0)throw new Error("Missing FASTElement definition.");return t.$fastController=new Li(t,s)}}function Ki(e){return class extends e{constructor(){super(),Li.forCustomElement(this)}$emit(t,i,s){return this.$fastController.emit(t,i,s)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,i,s){this.$fastController.onAttributeChangedCallback(t,i,s)}}}const Ce=Object.assign(Ki(HTMLElement),{from(e){return Ki(e)},define(e,t){return new Se(e,t).define().type}});class Vi{createCSS(){return""}createBehavior(){}}function zs(e,t){const i=[];let s="";const r=[];for(let n=0,o=e.length-1;n<o;++n){s+=e[n];let a=t[n];if(a instanceof Vi){const l=a.createBehavior();a=a.createCSS(),l&&r.push(l)}a instanceof G||a instanceof CSSStyleSheet?(s.trim()!==""&&(i.push(s),s=""),i.push(a)):s+=a}return s+=e[e.length-1],s.trim()!==""&&i.push(s),{styles:i,behaviors:r}}function y(e,...t){const{styles:i,behaviors:s}=zs(e,t),r=G.create(i);return s.length&&r.withBehaviors(...s),r}class vn extends Vi{constructor(t,i){super(),this.behaviors=i,this.css="";const s=t.reduce((r,n)=>(typeof n=="string"?this.css+=n:r.push(n),r),[]);s.length&&(this.styles=G.create(s))}createBehavior(){return this}createCSS(){return this.css}bind(t){this.styles&&t.$fastController.addStyles(this.styles),this.behaviors.length&&t.$fastController.addBehaviors(this.behaviors)}unbind(t){this.styles&&t.$fastController.removeStyles(this.styles),this.behaviors.length&&t.$fastController.removeBehaviors(this.behaviors)}}function mn(e,...t){const{styles:i,behaviors:s}=zs(e,t);return new vn(i,s)}class yn{constructor(t,i){this.target=t,this.propertyName=i}bind(t){t[this.propertyName]=this.target}unbind(){}}function Z(e){return new Ns("fast-ref",yn,e)}const js=e=>typeof e=="function",wn=()=>null;function ts(e){return e===void 0?wn:js(e)?e:()=>e}function Ws(e,t,i){const s=js(e)?e:()=>e,r=ts(t),n=ts(i);return(o,a)=>s(o,a)?r(o,a):n(o,a)}function xn(e){return e?function(t,i,s){return t.nodeType===1&&t.matches(e)}:function(t,i,s){return t.nodeType===1}}class kn{constructor(t,i){this.target=t,this.options=i,this.source=null}bind(t){const i=this.options.property;this.shouldUpdate=R.getAccessors(t).some(s=>s.name===i),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(_t),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return this.options.filter!==void 0&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class $n extends kn{constructor(t,i){super(t,i)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function Ii(e){return typeof e=="string"&&(e={property:e}),new Ns("fast-slotted",$n,e)}class Sn{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const Cn=(e,t)=>et`
    <span
        part="end"
        ${Z("endContainer")}
        class=${i=>t.end?"end":void 0}
    >
        <slot name="end" ${Z("end")} @slotchange="${i=>i.handleEndContentChange()}">
            ${t.end||""}
        </slot>
    </span>
`,Fn=(e,t)=>et`
    <span
        part="start"
        ${Z("startContainer")}
        class="${i=>t.start?"start":void 0}"
    >
        <slot
            name="start"
            ${Z("start")}
            @slotchange="${i=>i.handleStartContentChange()}"
        >
            ${t.start||""}
        </slot>
    </span>
`;et`
    <span part="end" ${Z("endContainer")}>
        <slot
            name="end"
            ${Z("end")}
            @slotchange="${e=>e.handleEndContentChange()}"
        ></slot>
    </span>
`;et`
    <span part="start" ${Z("startContainer")}>
        <slot
            name="start"
            ${Z("start")}
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
***************************************************************************** */function p(e,t,i,s){var r=arguments.length,n=r<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,i):s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(r<3?o(n):r>3?o(t,i,n):o(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}const Qe=new Map;"metadata"in Reflect||(Reflect.metadata=function(e,t){return function(i){Reflect.defineMetadata(e,t,i)}},Reflect.defineMetadata=function(e,t,i){let s=Qe.get(i);s===void 0&&Qe.set(i,s=new Map),s.set(e,t)},Reflect.getOwnMetadata=function(e,t){const i=Qe.get(t);if(i!==void 0)return i.get(e)});class Tn{constructor(t,i){this.container=t,this.key=i}instance(t){return this.registerResolver(0,t)}singleton(t){return this.registerResolver(1,t)}transient(t){return this.registerResolver(2,t)}callback(t){return this.registerResolver(3,t)}cachedCallback(t){return this.registerResolver(3,Gs(t))}aliasTo(t){return this.registerResolver(5,t)}registerResolver(t,i){const{container:s,key:r}=this;return this.container=this.key=void 0,s.registerResolver(r,new J(r,t,i))}}function Ht(e){const t=e.slice(),i=Object.keys(e),s=i.length;let r;for(let n=0;n<s;++n)r=i[n],Us(r)||(t[r]=e[r]);return t}const Rn=Object.freeze({none(e){throw Error(`${e.toString()} not registered, did you forget to add @singleton()?`)},singleton(e){return new J(e,1,e)},transient(e){return new J(e,2,e)}}),Ze=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:Rn.singleton})}),es=new Map;function is(e){return t=>Reflect.getOwnMetadata(e,t)}let ss=null;const T=Object.freeze({createContainer(e){return new Qt(null,Object.assign({},Ze.default,e))},findResponsibleContainer(e){const t=e.$$container$$;return t&&t.responsibleForOwnerRequests?t:T.findParentContainer(e)},findParentContainer(e){const t=new CustomEvent(qs,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return e.dispatchEvent(t),t.detail.container||T.getOrCreateDOMContainer()},getOrCreateDOMContainer(e,t){return e?e.$$container$$||new Qt(e,Object.assign({},Ze.default,t,{parentLocator:T.findParentContainer})):ss||(ss=new Qt(null,Object.assign({},Ze.default,t,{parentLocator:()=>null})))},getDesignParamtypes:is("design:paramtypes"),getAnnotationParamtypes:is("di:paramtypes"),getOrCreateAnnotationParamTypes(e){let t=this.getAnnotationParamtypes(e);return t===void 0&&Reflect.defineMetadata("di:paramtypes",t=[],e),t},getDependencies(e){let t=es.get(e);if(t===void 0){const i=e.inject;if(i===void 0){const s=T.getDesignParamtypes(e),r=T.getAnnotationParamtypes(e);if(s===void 0)if(r===void 0){const n=Object.getPrototypeOf(e);typeof n=="function"&&n!==Function.prototype?t=Ht(T.getDependencies(n)):t=[]}else t=Ht(r);else if(r===void 0)t=Ht(s);else{t=Ht(s);let n=r.length,o;for(let c=0;c<n;++c)o=r[c],o!==void 0&&(t[c]=o);const a=Object.keys(r);n=a.length;let l;for(let c=0;c<n;++c)l=a[c],Us(l)||(t[l]=r[l])}}else t=Ht(i);es.set(e,t)}return t},defineProperty(e,t,i,s=!1){const r=`$di_${t}`;Reflect.defineProperty(e,t,{get:function(){let n=this[r];if(n===void 0&&(n=(this instanceof HTMLElement?T.findResponsibleContainer(this):T.getOrCreateDOMContainer()).get(i),this[r]=n,s&&this instanceof Ce)){const a=this.$fastController,l=()=>{const h=T.findResponsibleContainer(this).get(i),f=this[r];h!==f&&(this[r]=n,a.notify(t))};a.subscribe({handleChange:l},"isConnected")}return n}})},createInterface(e,t){const i=typeof e=="function"?e:t,s=typeof e=="string"?e:e&&"friendlyName"in e&&e.friendlyName||as,r=typeof e=="string"?!1:e&&"respectConnection"in e&&e.respectConnection||!1,n=function(o,a,l){if(o==null||new.target!==void 0)throw new Error(`No registration for interface: '${n.friendlyName}'`);if(a)T.defineProperty(o,a,n,r);else{const c=T.getOrCreateAnnotationParamTypes(o);c[l]=n}};return n.$isInterface=!0,n.friendlyName=s??"(anonymous)",i!=null&&(n.register=function(o,a){return i(new Tn(o,a??n))}),n.toString=function(){return`InterfaceSymbol<${n.friendlyName}>`},n},inject(...e){return function(t,i,s){if(typeof s=="number"){const r=T.getOrCreateAnnotationParamTypes(t),n=e[0];n!==void 0&&(r[s]=n)}else if(i)T.defineProperty(t,i,e[0]);else{const r=s?T.getOrCreateAnnotationParamTypes(s.value):T.getOrCreateAnnotationParamTypes(t);let n;for(let o=0;o<e.length;++o)n=e[o],n!==void 0&&(r[o]=n)}}},transient(e){return e.register=function(i){return Kt.transient(e,e).register(i)},e.registerInRequestor=!1,e},singleton(e,t=Mn){return e.register=function(s){return Kt.singleton(e,e).register(s)},e.registerInRequestor=t.scoped,e}}),Dn=T.createInterface("Container");T.inject;const Mn={scoped:!1};class J{constructor(t,i,s){this.key=t,this.strategy=i,this.state=s,this.resolving=!1}get $isResolver(){return!0}register(t){return t.registerResolver(this.key,this)}resolve(t,i){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=t.getFactory(this.state).construct(i),this.strategy=0,this.resolving=!1,this.state}case 2:{const s=t.getFactory(this.state);if(s===null)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return s.construct(i)}case 3:return this.state(t,i,this);case 4:return this.state[0].resolve(t,i);case 5:return i.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(t){var i,s,r;switch(this.strategy){case 1:case 2:return t.getFactory(this.state);case 5:return(r=(s=(i=t.getResolver(this.state))===null||i===void 0?void 0:i.getFactory)===null||s===void 0?void 0:s.call(i,t))!==null&&r!==void 0?r:null;default:return null}}}function rs(e){return this.get(e)}function Ln(e,t){return t(e)}class Vn{constructor(t,i){this.Type=t,this.dependencies=i,this.transformers=null}construct(t,i){let s;return i===void 0?s=new this.Type(...this.dependencies.map(rs,t)):s=new this.Type(...this.dependencies.map(rs,t),...i),this.transformers==null?s:this.transformers.reduce(Ln,s)}registerTransformer(t){(this.transformers||(this.transformers=[])).push(t)}}const In={$isResolver:!0,resolve(e,t){return t}};function de(e){return typeof e.register=="function"}function Nn(e){return de(e)&&typeof e.registerInRequestor=="boolean"}function ns(e){return Nn(e)&&e.registerInRequestor}function En(e){return e.prototype!==void 0}const On=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),qs="__DI_LOCATE_PARENT__",Je=new Map;class Qt{constructor(t,i){this.owner=t,this.config=i,this._parent=void 0,this.registerDepth=0,this.context=null,t!==null&&(t.$$container$$=this),this.resolvers=new Map,this.resolvers.set(Dn,In),t instanceof Node&&t.addEventListener(qs,s=>{s.composedPath()[0]!==this.owner&&(s.detail.container=this,s.stopImmediatePropagation())})}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(t,...i){return this.context=t,this.register(...i),this.context=null,this}register(...t){if(++this.registerDepth===100)throw new Error("Unable to autoregister dependency");let i,s,r,n,o;const a=this.context;for(let l=0,c=t.length;l<c;++l)if(i=t[l],!!ls(i))if(de(i))i.register(this,a);else if(En(i))Kt.singleton(i,i).register(this);else for(s=Object.keys(i),n=0,o=s.length;n<o;++n)r=i[s[n]],ls(r)&&(de(r)?r.register(this,a):this.register(r));return--this.registerDepth,this}registerResolver(t,i){ae(t);const s=this.resolvers,r=s.get(t);return r==null?s.set(t,i):r instanceof J&&r.strategy===4?r.state.push(i):s.set(t,new J(t,4,[r,i])),i}registerTransformer(t,i){const s=this.getResolver(t);if(s==null)return!1;if(s.getFactory){const r=s.getFactory(this);return r==null?!1:(r.registerTransformer(i),!0)}return!1}getResolver(t,i=!0){if(ae(t),t.resolve!==void 0)return t;let s=this,r;for(;s!=null;)if(r=s.resolvers.get(t),r==null){if(s.parent==null){const n=ns(t)?this:s;return i?this.jitRegister(t,n):null}s=s.parent}else return r;return null}has(t,i=!1){return this.resolvers.has(t)?!0:i&&this.parent!=null?this.parent.has(t,!0):!1}get(t){if(ae(t),t.$isResolver)return t.resolve(this,this);let i=this,s;for(;i!=null;)if(s=i.resolvers.get(t),s==null){if(i.parent==null){const r=ns(t)?this:i;return s=this.jitRegister(t,r),s.resolve(i,this)}i=i.parent}else return s.resolve(i,this);throw new Error(`Unable to resolve key: ${t}`)}getAll(t,i=!1){ae(t);const s=this;let r=s,n;if(i){let o=_t;for(;r!=null;)n=r.resolvers.get(t),n!=null&&(o=o.concat(os(n,r,s))),r=r.parent;return o}else for(;r!=null;)if(n=r.resolvers.get(t),n==null){if(r=r.parent,r==null)return _t}else return os(n,r,s);return _t}getFactory(t){let i=Je.get(t);if(i===void 0){if(An(t))throw new Error(`${t.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);Je.set(t,i=new Vn(t,T.getDependencies(t)))}return i}registerFactory(t,i){Je.set(t,i)}createChild(t){return new Qt(null,Object.assign({},this.config,t,{parentLocator:()=>this}))}jitRegister(t,i){if(typeof t!="function")throw new Error(`Attempted to jitRegister something that is not a constructor: '${t}'. Did you forget to register this dependency?`);if(On.has(t.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${t.name}. Did you forget to add @inject(Key)`);if(de(t)){const s=t.register(i);if(!(s instanceof Object)||s.resolve==null){const r=i.resolvers.get(t);if(r!=null)return r;throw new Error("A valid resolver was not returned from the static register method")}return s}else{if(t.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${t.friendlyName}`);{const s=this.config.defaultResolver(t,i);return i.resolvers.set(t,s),s}}}}const Ke=new WeakMap;function Gs(e){return function(t,i,s){if(Ke.has(s))return Ke.get(s);const r=e(t,i,s);return Ke.set(s,r),r}}const Kt=Object.freeze({instance(e,t){return new J(e,0,t)},singleton(e,t){return new J(e,1,t)},transient(e,t){return new J(e,2,t)},callback(e,t){return new J(e,3,t)},cachedCallback(e,t){return new J(e,3,Gs(t))},aliasTo(e,t){return new J(t,5,e)}});function ae(e){if(e==null)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function os(e,t,i){if(e instanceof J&&e.strategy===4){const s=e.state;let r=s.length;const n=new Array(r);for(;r--;)n[r]=s[r].resolve(t,i);return n}return[e.resolve(t,i)]}const as="(anonymous)";function ls(e){return typeof e=="object"&&e!==null||typeof e=="function"}const An=function(){const e=new WeakMap;let t=!1,i="",s=0;return function(r){return t=e.get(r),t===void 0&&(i=r.toString(),s=i.length,t=s>=29&&s<=100&&i.charCodeAt(s-1)===125&&i.charCodeAt(s-2)<=32&&i.charCodeAt(s-3)===93&&i.charCodeAt(s-4)===101&&i.charCodeAt(s-5)===100&&i.charCodeAt(s-6)===111&&i.charCodeAt(s-7)===99&&i.charCodeAt(s-8)===32&&i.charCodeAt(s-9)===101&&i.charCodeAt(s-10)===118&&i.charCodeAt(s-11)===105&&i.charCodeAt(s-12)===116&&i.charCodeAt(s-13)===97&&i.charCodeAt(s-14)===110&&i.charCodeAt(s-15)===88,e.set(r,t)),t}}(),le={};function Us(e){switch(typeof e){case"number":return e>=0&&(e|0)===e;case"string":{const t=le[e];if(t!==void 0)return t;const i=e.length;if(i===0)return le[e]=!1;let s=0;for(let r=0;r<i;++r)if(s=e.charCodeAt(r),r===0&&s===48&&i>1||s<48||s>57)return le[e]=!1;return le[e]=!0}default:return!1}}function cs(e){return`${e.toLowerCase()}:presentation`}const ce=new Map,_s=Object.freeze({define(e,t,i){const s=cs(e);ce.get(s)===void 0?ce.set(s,t):ce.set(s,!1),i.register(Kt.instance(s,t))},forTag(e,t){const i=cs(e),s=ce.get(i);return s===!1?T.findResponsibleContainer(t).get(i):s||null}});class Pn{constructor(t,i){this.template=t||null,this.styles=i===void 0?null:Array.isArray(i)?G.create(i):i instanceof G?i:G.create([i])}applyTo(t){const i=t.$fastController;i.template===null&&(i.template=this.template),i.styles===null&&(i.styles=this.styles)}}class it extends Ce{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return this._presentation===void 0&&(this._presentation=_s.forTag(this.tagName,this)),this._presentation}templateChanged(){this.template!==void 0&&(this.$fastController.template=this.template)}stylesChanged(){this.styles!==void 0&&(this.$fastController.styles=this.styles)}connectedCallback(){this.$presentation!==null&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(t){return(i={})=>new Bn(this===it?class extends it{}:this,t,i)}}p([F],it.prototype,"template",void 0);p([F],it.prototype,"styles",void 0);function zt(e,t,i){return typeof e=="function"?e(t,i):e}class Bn{constructor(t,i,s){this.type=t,this.elementDefinition=i,this.overrideDefinition=s,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(t,i){const s=this.definition,r=this.overrideDefinition,o=`${s.prefix||i.elementPrefix}-${s.baseName}`;i.tryDefineElement({name:o,type:this.type,baseClass:this.elementDefinition.baseClass,callback:a=>{const l=new Pn(zt(s.template,a,s),zt(s.styles,a,s));a.definePresentation(l);let c=zt(s.shadowOptions,a,s);a.shadowRootMode&&(c?r.shadowOptions||(c.mode=a.shadowRootMode):c!==null&&(c={mode:a.shadowRootMode})),a.defineElement({elementOptions:zt(s.elementOptions,a,s),shadowOptions:c,attributes:zt(s.attributes,a,s)})}})}}function Xs(e,...t){const i=ge.locate(e);t.forEach(s=>{Object.getOwnPropertyNames(s.prototype).forEach(n=>{n!=="constructor"&&Object.defineProperty(e.prototype,n,Object.getOwnPropertyDescriptor(s.prototype,n))}),ge.locate(s).forEach(n=>i.push(n))})}const H={horizontal:"horizontal",vertical:"vertical"};function Hn(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function zn(){const e=document.querySelector('meta[property="csp-nonce"]');return e?e.getAttribute("content"):null}let $t;function jn(){if(typeof $t=="boolean")return $t;if(!Hn())return $t=!1,$t;const e=document.createElement("style"),t=zn();t!==null&&e.setAttribute("nonce",t),document.head.appendChild(e);try{e.sheet.insertRule("foo:focus-visible {color:inherit}",0),$t=!0}catch{$t=!1}finally{document.head.removeChild(e)}return $t}var hs;(function(e){e[e.alt=18]="alt",e[e.arrowDown=40]="arrowDown",e[e.arrowLeft=37]="arrowLeft",e[e.arrowRight=39]="arrowRight",e[e.arrowUp=38]="arrowUp",e[e.back=8]="back",e[e.backSlash=220]="backSlash",e[e.break=19]="break",e[e.capsLock=20]="capsLock",e[e.closeBracket=221]="closeBracket",e[e.colon=186]="colon",e[e.colon2=59]="colon2",e[e.comma=188]="comma",e[e.ctrl=17]="ctrl",e[e.delete=46]="delete",e[e.end=35]="end",e[e.enter=13]="enter",e[e.equals=187]="equals",e[e.equals2=61]="equals2",e[e.equals3=107]="equals3",e[e.escape=27]="escape",e[e.forwardSlash=191]="forwardSlash",e[e.function1=112]="function1",e[e.function10=121]="function10",e[e.function11=122]="function11",e[e.function12=123]="function12",e[e.function2=113]="function2",e[e.function3=114]="function3",e[e.function4=115]="function4",e[e.function5=116]="function5",e[e.function6=117]="function6",e[e.function7=118]="function7",e[e.function8=119]="function8",e[e.function9=120]="function9",e[e.home=36]="home",e[e.insert=45]="insert",e[e.menu=93]="menu",e[e.minus=189]="minus",e[e.minus2=109]="minus2",e[e.numLock=144]="numLock",e[e.numPad0=96]="numPad0",e[e.numPad1=97]="numPad1",e[e.numPad2=98]="numPad2",e[e.numPad3=99]="numPad3",e[e.numPad4=100]="numPad4",e[e.numPad5=101]="numPad5",e[e.numPad6=102]="numPad6",e[e.numPad7=103]="numPad7",e[e.numPad8=104]="numPad8",e[e.numPad9=105]="numPad9",e[e.numPadDivide=111]="numPadDivide",e[e.numPadDot=110]="numPadDot",e[e.numPadMinus=109]="numPadMinus",e[e.numPadMultiply=106]="numPadMultiply",e[e.numPadPlus=107]="numPadPlus",e[e.openBracket=219]="openBracket",e[e.pageDown=34]="pageDown",e[e.pageUp=33]="pageUp",e[e.period=190]="period",e[e.print=44]="print",e[e.quote=222]="quote",e[e.scrollLock=145]="scrollLock",e[e.shift=16]="shift",e[e.space=32]="space",e[e.tab=9]="tab",e[e.tilde=192]="tilde",e[e.windowsLeft=91]="windowsLeft",e[e.windowsOpera=219]="windowsOpera",e[e.windowsRight=92]="windowsRight"})(hs||(hs={}));const Ni="ArrowDown",ve="ArrowLeft",me="ArrowRight",Ei="ArrowUp",Ys="Enter",Wn="Escape",qn="Home",Gn="End",Un=" ",_n="Tab",Xn={ArrowDown:Ni,ArrowLeft:ve,ArrowRight:me,ArrowUp:Ei};var A;(function(e){e.ltr="ltr",e.rtl="rtl"})(A||(A={}));function Yn(e,t,i){return Math.min(Math.max(i,e),t)}var u;(function(e){e.Canvas="Canvas",e.CanvasText="CanvasText",e.LinkText="LinkText",e.VisitedText="VisitedText",e.ActiveText="ActiveText",e.ButtonFace="ButtonFace",e.ButtonText="ButtonText",e.Field="Field",e.FieldText="FieldText",e.Highlight="Highlight",e.HighlightText="HighlightText",e.GrayText="GrayText"})(u||(u={}));class V{}p([g({attribute:"aria-atomic"})],V.prototype,"ariaAtomic",void 0);p([g({attribute:"aria-busy"})],V.prototype,"ariaBusy",void 0);p([g({attribute:"aria-controls"})],V.prototype,"ariaControls",void 0);p([g({attribute:"aria-current"})],V.prototype,"ariaCurrent",void 0);p([g({attribute:"aria-describedby"})],V.prototype,"ariaDescribedby",void 0);p([g({attribute:"aria-details"})],V.prototype,"ariaDetails",void 0);p([g({attribute:"aria-disabled"})],V.prototype,"ariaDisabled",void 0);p([g({attribute:"aria-errormessage"})],V.prototype,"ariaErrormessage",void 0);p([g({attribute:"aria-flowto"})],V.prototype,"ariaFlowto",void 0);p([g({attribute:"aria-haspopup"})],V.prototype,"ariaHaspopup",void 0);p([g({attribute:"aria-hidden"})],V.prototype,"ariaHidden",void 0);p([g({attribute:"aria-invalid"})],V.prototype,"ariaInvalid",void 0);p([g({attribute:"aria-keyshortcuts"})],V.prototype,"ariaKeyshortcuts",void 0);p([g({attribute:"aria-label"})],V.prototype,"ariaLabel",void 0);p([g({attribute:"aria-labelledby"})],V.prototype,"ariaLabelledby",void 0);p([g({attribute:"aria-live"})],V.prototype,"ariaLive",void 0);p([g({attribute:"aria-owns"})],V.prototype,"ariaOwns",void 0);p([g({attribute:"aria-relevant"})],V.prototype,"ariaRelevant",void 0);p([g({attribute:"aria-roledescription"})],V.prototype,"ariaRoledescription",void 0);const Qs=e=>{const t=e.closest("[dir]");return t!==null&&t.dir==="rtl"?A.rtl:A.ltr},Qn=(e,t)=>et`
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
        ${Z("control")}
    >
        ${Fn(e,t)}
        <span class="content" part="content">
            <slot ${Ii("defaultSlottedContent")}></slot>
        </span>
        ${Cn(e,t)}
    </button>
`,us="form-associated-proxy",ds="ElementInternals",fs=ds in window&&"setFormValue"in window[ds].prototype,ps=new WeakMap;function Oi(e){const t=class extends e{constructor(...i){super(...i),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return fs}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const i=this.proxy.labels,s=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),r=i?s.concat(Array.from(i)):s;return Object.freeze(r)}else return _t}valueChanged(i,s){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(i,s){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(i,s){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),S.queueUpdate(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(i,s){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(i,s){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),S.queueUpdate(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!fs)return null;let i=ps.get(this);return i||(i=this.attachInternals(),ps.set(this,i)),i}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){this.proxyEventsToBlock.forEach(i=>this.proxy.removeEventListener(i,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(i,s,r){this.elementInternals?this.elementInternals.setValidity(i,s,r):typeof s=="string"&&this.proxy.setCustomValidity(s)}formDisabledCallback(i){this.disabled=i}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var i;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(s=>this.proxy.addEventListener(s,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",us),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",us)),(i=this.shadowRoot)===null||i===void 0||i.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var i;this.removeChild(this.proxy),(i=this.shadowRoot)===null||i===void 0||i.removeChild(this.proxySlot)}validate(i){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,i)}setFormValue(i,s){this.elementInternals&&this.elementInternals.setFormValue(i,s||i)}_keypressHandler(i){switch(i.key){case Ys:if(this.form instanceof HTMLFormElement){const s=this.form.querySelector("[type=submit]");s==null||s.click()}break}}stopPropagation(i){i.stopPropagation()}};return g({mode:"boolean"})(t.prototype,"disabled"),g({mode:"fromView",attribute:"value"})(t.prototype,"initialValue"),g({attribute:"current-value"})(t.prototype,"currentValue"),g(t.prototype,"name"),g({mode:"boolean"})(t.prototype,"required"),F(t.prototype,"value"),t}function Zn(e){class t extends Oi(e){}class i extends t{constructor(...r){super(r),this.dirtyChecked=!1,this.checkedAttribute=!1,this.checked=!1,this.dirtyChecked=!1}checkedAttributeChanged(){this.defaultChecked=this.checkedAttribute}defaultCheckedChanged(){this.dirtyChecked||(this.checked=this.defaultChecked,this.dirtyChecked=!1)}checkedChanged(r,n){this.dirtyChecked||(this.dirtyChecked=!0),this.currentChecked=this.checked,this.updateForm(),this.proxy instanceof HTMLInputElement&&(this.proxy.checked=this.checked),r!==void 0&&this.$emit("change"),this.validate()}currentCheckedChanged(r,n){this.checked=this.currentChecked}updateForm(){const r=this.checked?this.value:null;this.setFormValue(r,r)}connectedCallback(){super.connectedCallback(),this.updateForm()}formResetCallback(){super.formResetCallback(),this.checked=!!this.checkedAttribute,this.dirtyChecked=!1}}return g({attribute:"checked",mode:"boolean"})(i.prototype,"checkedAttribute"),g({attribute:"current-checked",converter:Bs})(i.prototype,"currentChecked"),F(i.prototype,"defaultChecked"),F(i.prototype,"checked"),i}class Jn extends it{}class Kn extends Oi(Jn){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let st=class extends Kn{constructor(){super(...arguments),this.handleClick=t=>{var i;this.disabled&&((i=this.defaultSlottedContent)===null||i===void 0?void 0:i.length)<=1&&t.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const t=this.proxy.isConnected;t||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),t||this.detachProxy()},this.handleFormReset=()=>{var t;(t=this.form)===null||t===void 0||t.reset()},this.handleUnsupportedDelegatesFocus=()=>{var t;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(!((t=this.$fastController.definition.shadowOptions)===null||t===void 0)&&t.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(t,i){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),i==="submit"&&this.addEventListener("click",this.handleSubmission),t==="submit"&&this.removeEventListener("click",this.handleSubmission),i==="reset"&&this.addEventListener("click",this.handleFormReset),t==="reset"&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var t;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const i=Array.from((t=this.control)===null||t===void 0?void 0:t.children);i&&i.forEach(s=>{s.addEventListener("click",this.handleClick)})}disconnectedCallback(){var t;super.disconnectedCallback();const i=Array.from((t=this.control)===null||t===void 0?void 0:t.children);i&&i.forEach(s=>{s.removeEventListener("click",this.handleClick)})}};p([g({mode:"boolean"})],st.prototype,"autofocus",void 0);p([g({attribute:"form"})],st.prototype,"formId",void 0);p([g],st.prototype,"formaction",void 0);p([g],st.prototype,"formenctype",void 0);p([g],st.prototype,"formmethod",void 0);p([g({mode:"boolean"})],st.prototype,"formnovalidate",void 0);p([g],st.prototype,"formtarget",void 0);p([g],st.prototype,"type",void 0);p([F],st.prototype,"defaultSlottedContent",void 0);class Fe{}p([g({attribute:"aria-expanded"})],Fe.prototype,"ariaExpanded",void 0);p([g({attribute:"aria-pressed"})],Fe.prototype,"ariaPressed",void 0);Xs(Fe,V);Xs(st,Sn,Fe);function hi(e){const t=e.parentElement;if(t)return t;{const i=e.getRootNode();if(i.host instanceof HTMLElement)return i.host}return null}function to(e,t){let i=t;for(;i!==null;){if(i===e)return!0;i=hi(i)}return!1}const ft=document.createElement("div");function eo(e){return e instanceof Ce}class Ai{setProperty(t,i){S.queueUpdate(()=>this.target.setProperty(t,i))}removeProperty(t){S.queueUpdate(()=>this.target.removeProperty(t))}}class io extends Ai{constructor(t){super();const i=new CSSStyleSheet;this.target=i.cssRules[i.insertRule(":host{}")].style,t.$fastController.addStyles(G.create([i]))}}class so extends Ai{constructor(){super();const t=new CSSStyleSheet;this.target=t.cssRules[t.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,t]}}class ro extends Ai{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:t}=this.style;if(t){const i=t.insertRule(":root{}",t.cssRules.length);this.target=t.cssRules[i].style}}}class Zs{constructor(t){this.store=new Map,this.target=null;const i=t.$fastController;this.style=document.createElement("style"),i.addStyles(this.style),R.getNotifier(i).subscribe(this,"isConnected"),this.handleChange(i,"isConnected")}targetChanged(){if(this.target!==null)for(const[t,i]of this.store.entries())this.target.setProperty(t,i)}setProperty(t,i){this.store.set(t,i),S.queueUpdate(()=>{this.target!==null&&this.target.setProperty(t,i)})}removeProperty(t){this.store.delete(t),S.queueUpdate(()=>{this.target!==null&&this.target.removeProperty(t)})}handleChange(t,i){const{sheet:s}=this.style;if(s){const r=s.insertRule(":host{}",s.cssRules.length);this.target=s.cssRules[r].style}else this.target=null}}p([F],Zs.prototype,"target",void 0);class no{constructor(t){this.target=t.style}setProperty(t,i){S.queueUpdate(()=>this.target.setProperty(t,i))}removeProperty(t){S.queueUpdate(()=>this.target.removeProperty(t))}}class E{setProperty(t,i){E.properties[t]=i;for(const s of E.roots.values())Rt.getOrCreate(E.normalizeRoot(s)).setProperty(t,i)}removeProperty(t){delete E.properties[t];for(const i of E.roots.values())Rt.getOrCreate(E.normalizeRoot(i)).removeProperty(t)}static registerRoot(t){const{roots:i}=E;if(!i.has(t)){i.add(t);const s=Rt.getOrCreate(this.normalizeRoot(t));for(const r in E.properties)s.setProperty(r,E.properties[r])}}static unregisterRoot(t){const{roots:i}=E;if(i.has(t)){i.delete(t);const s=Rt.getOrCreate(E.normalizeRoot(t));for(const r in E.properties)s.removeProperty(r)}}static normalizeRoot(t){return t===ft?document:t}}E.roots=new Set;E.properties={};const ti=new WeakMap,oo=S.supportsAdoptedStyleSheets?io:Zs,Rt=Object.freeze({getOrCreate(e){if(ti.has(e))return ti.get(e);let t;return e===ft?t=new E:e instanceof Document?t=S.supportsAdoptedStyleSheets?new so:new ro:eo(e)?t=new oo(e):t=new no(e),ti.set(e,t),t}});class W extends Vi{constructor(t){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=t.name,t.cssCustomPropertyName!==null&&(this.cssCustomProperty=`--${t.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=W.uniqueId(),W.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(t){return new W({name:typeof t=="string"?t:t.name,cssCustomPropertyName:typeof t=="string"?t:t.cssCustomPropertyName===void 0?t.name:t.cssCustomPropertyName})}static isCSSDesignToken(t){return typeof t.cssCustomProperty=="string"}static isDerivedDesignTokenValue(t){return typeof t=="function"}static getTokenById(t){return W.tokensById.get(t)}getOrCreateSubscriberSet(t=this){return this.subscribers.get(t)||this.subscribers.set(t,new Set)&&this.subscribers.get(t)}createCSS(){return this.cssVar||""}getValueFor(t){const i=D.getOrCreate(t).get(this);if(i!==void 0)return i;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${t} or an ancestor of ${t}.`)}setValueFor(t,i){return this._appliedTo.add(t),i instanceof W&&(i=this.alias(i)),D.getOrCreate(t).set(this,i),this}deleteValueFor(t){return this._appliedTo.delete(t),D.existsFor(t)&&D.getOrCreate(t).delete(this),this}withDefault(t){return this.setValueFor(ft,t),this}subscribe(t,i){const s=this.getOrCreateSubscriberSet(i);i&&!D.existsFor(i)&&D.getOrCreate(i),s.has(t)||s.add(t)}unsubscribe(t,i){const s=this.subscribers.get(i||this);s&&s.has(t)&&s.delete(t)}notify(t){const i=Object.freeze({token:this,target:t});this.subscribers.has(this)&&this.subscribers.get(this).forEach(s=>s.handleChange(i)),this.subscribers.has(t)&&this.subscribers.get(t).forEach(s=>s.handleChange(i))}alias(t){return i=>t.getValueFor(i)}}W.uniqueId=(()=>{let e=0;return()=>(e++,e.toString(16))})();W.tokensById=new Map;class ao{startReflection(t,i){t.subscribe(this,i),this.handleChange({token:t,target:i})}stopReflection(t,i){t.unsubscribe(this,i),this.remove(t,i)}handleChange(t){const{token:i,target:s}=t;this.add(i,s)}add(t,i){Rt.getOrCreate(i).setProperty(t.cssCustomProperty,this.resolveCSSValue(D.getOrCreate(i).get(t)))}remove(t,i){Rt.getOrCreate(i).removeProperty(t.cssCustomProperty)}resolveCSSValue(t){return t&&typeof t.createCSS=="function"?t.createCSS():t}}class lo{constructor(t,i,s){this.source=t,this.token=i,this.node=s,this.dependencies=new Set,this.observer=R.binding(t,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){this.node.store.set(this.token,this.observer.observe(this.node.target,Yt))}}class co{constructor(){this.values=new Map}set(t,i){this.values.get(t)!==i&&(this.values.set(t,i),R.getNotifier(this).notify(t.id))}get(t){return R.track(this,t.id),this.values.get(t)}delete(t){this.values.delete(t)}all(){return this.values.entries()}}const jt=new WeakMap,Wt=new WeakMap;class D{constructor(t){this.target=t,this.store=new co,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(i,s)=>{const r=W.getTokenById(s);if(r&&(r.notify(this.target),W.isCSSDesignToken(r))){const n=this.parent,o=this.isReflecting(r);if(n){const a=n.get(r),l=i.get(r);a!==l&&!o?this.reflectToCSS(r):a===l&&o&&this.stopReflectToCSS(r)}else o||this.reflectToCSS(r)}}},jt.set(t,this),R.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),t instanceof Ce?t.$fastController.addBehaviors([this]):t.isConnected&&this.bind()}static getOrCreate(t){return jt.get(t)||new D(t)}static existsFor(t){return jt.has(t)}static findParent(t){if(ft!==t.target){let i=hi(t.target);for(;i!==null;){if(jt.has(i))return jt.get(i);i=hi(i)}return D.getOrCreate(ft)}return null}static findClosestAssignedNode(t,i){let s=i;do{if(s.has(t))return s;s=s.parent?s.parent:s.target!==ft?D.getOrCreate(ft):null}while(s!==null);return null}get parent(){return Wt.get(this)||null}has(t){return this.assignedValues.has(t)}get(t){const i=this.store.get(t);if(i!==void 0)return i;const s=this.getRaw(t);if(s!==void 0)return this.hydrate(t,s),this.get(t)}getRaw(t){var i;return this.assignedValues.has(t)?this.assignedValues.get(t):(i=D.findClosestAssignedNode(t,this))===null||i===void 0?void 0:i.getRaw(t)}set(t,i){W.isDerivedDesignTokenValue(this.assignedValues.get(t))&&this.tearDownBindingObserver(t),this.assignedValues.set(t,i),W.isDerivedDesignTokenValue(i)?this.setupBindingObserver(t,i):this.store.set(t,i)}delete(t){this.assignedValues.delete(t),this.tearDownBindingObserver(t);const i=this.getRaw(t);i?this.hydrate(t,i):this.store.delete(t)}bind(){const t=D.findParent(this);t&&t.appendChild(this);for(const i of this.assignedValues.keys())i.notify(this.target)}unbind(){this.parent&&Wt.get(this).removeChild(this)}appendChild(t){t.parent&&Wt.get(t).removeChild(t);const i=this.children.filter(s=>t.contains(s));Wt.set(t,this),this.children.push(t),i.forEach(s=>t.appendChild(s)),R.getNotifier(this.store).subscribe(t);for(const[s,r]of this.store.all())t.hydrate(s,this.bindingObservers.has(s)?this.getRaw(s):r)}removeChild(t){const i=this.children.indexOf(t);return i!==-1&&this.children.splice(i,1),R.getNotifier(this.store).unsubscribe(t),t.parent===this?Wt.delete(t):!1}contains(t){return to(this.target,t.target)}reflectToCSS(t){this.isReflecting(t)||(this.reflecting.add(t),D.cssCustomPropertyReflector.startReflection(t,this.target))}stopReflectToCSS(t){this.isReflecting(t)&&(this.reflecting.delete(t),D.cssCustomPropertyReflector.stopReflection(t,this.target))}isReflecting(t){return this.reflecting.has(t)}handleChange(t,i){const s=W.getTokenById(i);s&&this.hydrate(s,this.getRaw(s))}hydrate(t,i){if(!this.has(t)){const s=this.bindingObservers.get(t);W.isDerivedDesignTokenValue(i)?s?s.source!==i&&(this.tearDownBindingObserver(t),this.setupBindingObserver(t,i)):this.setupBindingObserver(t,i):(s&&this.tearDownBindingObserver(t),this.store.set(t,i))}}setupBindingObserver(t,i){const s=new lo(i,t,this);return this.bindingObservers.set(t,s),s}tearDownBindingObserver(t){return this.bindingObservers.has(t)?(this.bindingObservers.get(t).disconnect(),this.bindingObservers.delete(t),!0):!1}}D.cssCustomPropertyReflector=new ao;p([F],D.prototype,"children",void 0);function ho(e){return W.from(e)}const Te=Object.freeze({create:ho,notifyConnection(e){return!e.isConnected||!D.existsFor(e)?!1:(D.getOrCreate(e).bind(),!0)},notifyDisconnection(e){return e.isConnected||!D.existsFor(e)?!1:(D.getOrCreate(e).unbind(),!0)},registerRoot(e=ft){E.registerRoot(e)},unregisterRoot(e=ft){E.unregisterRoot(e)}}),ei=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),ii=new Map,fe=new Map;let Mt=null;const qt=T.createInterface(e=>e.cachedCallback(t=>(Mt===null&&(Mt=new Ks(null,t)),Mt))),Js=Object.freeze({tagFor(e){return fe.get(e)},responsibleFor(e){const t=e.$$designSystem$$;return t||T.findResponsibleContainer(e).get(qt)},getOrCreate(e){if(!e)return Mt===null&&(Mt=T.getOrCreateDOMContainer().get(qt)),Mt;const t=e.$$designSystem$$;if(t)return t;const i=T.getOrCreateDOMContainer(e);if(i.has(qt,!1))return i.get(qt);{const s=new Ks(e,i);return i.register(Kt.instance(qt,s)),s}}});function uo(e,t,i){return typeof e=="string"?{name:e,type:t,callback:i}:e}class Ks{constructor(t,i){this.owner=t,this.container=i,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>ei.definitionCallbackOnly,t!==null&&(t.$$designSystem$$=this)}withPrefix(t){return this.prefix=t,this}withShadowRootMode(t){return this.shadowRootMode=t,this}withElementDisambiguation(t){return this.disambiguate=t,this}withDesignTokenRoot(t){return this.designTokenRoot=t,this}register(...t){const i=this.container,s=[],r=this.disambiguate,n=this.shadowRootMode,o={elementPrefix:this.prefix,tryDefineElement(a,l,c){const h=uo(a,l,c),{name:f,callback:b,baseClass:m}=h;let{type:k}=h,$=f,L=ii.get($),U=!0;for(;L;){const _=r($,k,L);switch(_){case ei.ignoreDuplicate:return;case ei.definitionCallbackOnly:U=!1,L=void 0;break;default:$=_,L=ii.get($);break}}U&&((fe.has(k)||k===it)&&(k=class extends k{}),ii.set($,k),fe.set(k,$),m&&fe.set(m,$)),s.push(new fo(i,$,k,n,b,U))}};this.designTokensInitialized||(this.designTokensInitialized=!0,this.designTokenRoot!==null&&Te.registerRoot(this.designTokenRoot)),i.registerWithContext(o,...t);for(const a of s)a.callback(a),a.willDefine&&a.definition!==null&&a.definition.define();return this}}class fo{constructor(t,i,s,r,n,o){this.container=t,this.name=i,this.type=s,this.shadowRootMode=r,this.callback=n,this.willDefine=o,this.definition=null}definePresentation(t){_s.define(this.name,t,this.container)}defineElement(t){this.definition=new Se(this.type,Object.assign(Object.assign({},t),{name:this.name}))}tagFor(t){return Js.tagFor(t)}}const po=(e,t)=>et`
    <div class="positioning-region" part="positioning-region">
        ${Ws(i=>i.modal,et`
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
            ${Z("dialog")}
        >
            <slot></slot>
        </div>
    </div>
`;/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var go=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],bo=go.join(","),tr=typeof Element>"u",ye=tr?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,ui=!tr&&Element.prototype.getRootNode?function(e){return e.getRootNode()}:function(e){return e.ownerDocument},vo=function(t,i){return t.tabIndex<0&&(i||/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName)||t.isContentEditable)&&isNaN(parseInt(t.getAttribute("tabindex"),10))?0:t.tabIndex},er=function(t){return t.tagName==="INPUT"},mo=function(t){return er(t)&&t.type==="hidden"},yo=function(t){var i=t.tagName==="DETAILS"&&Array.prototype.slice.apply(t.children).some(function(s){return s.tagName==="SUMMARY"});return i},wo=function(t,i){for(var s=0;s<t.length;s++)if(t[s].checked&&t[s].form===i)return t[s]},xo=function(t){if(!t.name)return!0;var i=t.form||ui(t),s=function(a){return i.querySelectorAll('input[type="radio"][name="'+a+'"]')},r;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")r=s(window.CSS.escape(t.name));else try{r=s(t.name)}catch(o){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",o.message),!1}var n=wo(r,t.form);return!n||n===t},ko=function(t){return er(t)&&t.type==="radio"},$o=function(t){return ko(t)&&!xo(t)},gs=function(t){var i=t.getBoundingClientRect(),s=i.width,r=i.height;return s===0&&r===0},So=function(t,i){var s=i.displayCheck,r=i.getShadowRoot;if(getComputedStyle(t).visibility==="hidden")return!0;var n=ye.call(t,"details>summary:first-of-type"),o=n?t.parentElement:t;if(ye.call(o,"details:not([open]) *"))return!0;var a=ui(t).host,l=(a==null?void 0:a.ownerDocument.contains(a))||t.ownerDocument.contains(t);if(!s||s==="full"){if(typeof r=="function"){for(var c=t;t;){var h=t.parentElement,f=ui(t);if(h&&!h.shadowRoot&&r(h)===!0)return gs(t);t.assignedSlot?t=t.assignedSlot:!h&&f!==t.ownerDocument?t=f.host:t=h}t=c}if(l)return!t.getClientRects().length}else if(s==="non-zero-area")return gs(t);return!1},Co=function(t){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))for(var i=t.parentElement;i;){if(i.tagName==="FIELDSET"&&i.disabled){for(var s=0;s<i.children.length;s++){var r=i.children.item(s);if(r.tagName==="LEGEND")return ye.call(i,"fieldset[disabled] *")?!0:!r.contains(t)}return!0}i=i.parentElement}return!1},Fo=function(t,i){return!(i.disabled||mo(i)||So(i,t)||yo(i)||Co(i))},To=function(t,i){return!($o(i)||vo(i)<0||!Fo(t,i))},bs=function(t,i){if(i=i||{},!t)throw new Error("No node provided");return ye.call(t,bo)===!1?!1:To(i,t)};class tt extends it{constructor(){super(...arguments),this.modal=!0,this.hidden=!1,this.trapFocus=!0,this.trapFocusChanged=()=>{this.$fastController.isConnected&&this.updateTrapFocus()},this.isTrappingFocus=!1,this.handleDocumentKeydown=t=>{if(!t.defaultPrevented&&!this.hidden)switch(t.key){case Wn:this.dismiss(),t.preventDefault();break;case _n:this.handleTabKeyDown(t);break}},this.handleDocumentFocus=t=>{!t.defaultPrevented&&this.shouldForceFocus(t.target)&&(this.focusFirstElement(),t.preventDefault())},this.handleTabKeyDown=t=>{if(!this.trapFocus||this.hidden)return;const i=this.getTabQueueBounds();if(i.length!==0){if(i.length===1){i[0].focus(),t.preventDefault();return}t.shiftKey&&t.target===i[0]?(i[i.length-1].focus(),t.preventDefault()):!t.shiftKey&&t.target===i[i.length-1]&&(i[0].focus(),t.preventDefault())}},this.getTabQueueBounds=()=>{const t=[];return tt.reduceTabbableItems(t,this)},this.focusFirstElement=()=>{const t=this.getTabQueueBounds();t.length>0?t[0].focus():this.dialog instanceof HTMLElement&&this.dialog.focus()},this.shouldForceFocus=t=>this.isTrappingFocus&&!this.contains(t),this.shouldTrapFocus=()=>this.trapFocus&&!this.hidden,this.updateTrapFocus=t=>{const i=t===void 0?this.shouldTrapFocus():t;i&&!this.isTrappingFocus?(this.isTrappingFocus=!0,document.addEventListener("focusin",this.handleDocumentFocus),S.queueUpdate(()=>{this.shouldForceFocus(document.activeElement)&&this.focusFirstElement()})):!i&&this.isTrappingFocus&&(this.isTrappingFocus=!1,document.removeEventListener("focusin",this.handleDocumentFocus))}}dismiss(){this.$emit("dismiss"),this.$emit("cancel")}show(){this.hidden=!1}hide(){this.hidden=!0,this.$emit("close")}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleDocumentKeydown),this.notifier=R.getNotifier(this),this.notifier.subscribe(this,"hidden"),this.updateTrapFocus()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeydown),this.updateTrapFocus(!1),this.notifier.unsubscribe(this,"hidden")}handleChange(t,i){switch(i){case"hidden":this.updateTrapFocus();break}}static reduceTabbableItems(t,i){return i.getAttribute("tabindex")==="-1"?t:bs(i)||tt.isFocusableFastElement(i)&&tt.hasTabbableShadow(i)?(t.push(i),t):i.childElementCount?t.concat(Array.from(i.children).reduce(tt.reduceTabbableItems,[])):t}static isFocusableFastElement(t){var i,s;return!!(!((s=(i=t.$fastController)===null||i===void 0?void 0:i.definition.shadowOptions)===null||s===void 0)&&s.delegatesFocus)}static hasTabbableShadow(t){var i,s;return Array.from((s=(i=t.shadowRoot)===null||i===void 0?void 0:i.querySelectorAll("*"))!==null&&s!==void 0?s:[]).some(r=>bs(r))}}p([g({mode:"boolean"})],tt.prototype,"modal",void 0);p([g({mode:"boolean"})],tt.prototype,"hidden",void 0);p([g({attribute:"trap-focus",mode:"boolean"})],tt.prototype,"trapFocus",void 0);p([g({attribute:"aria-describedby"})],tt.prototype,"ariaDescribedby",void 0);p([g({attribute:"aria-labelledby"})],tt.prototype,"ariaLabelledby",void 0);p([g({attribute:"aria-label"})],tt.prototype,"ariaLabel",void 0);const Ro=(e,t)=>et`
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
                ${Ii({property:"slottedRadioButtons",filter:xn("[role=radio]")})}
            ></slot>
        </div>
    </template>
`;class xt extends it{constructor(){super(...arguments),this.orientation=H.horizontal,this.radioChangeHandler=t=>{const i=t.target;i.checked&&(this.slottedRadioButtons.forEach(s=>{s!==i&&(s.checked=!1,this.isInsideFoundationToolbar||s.setAttribute("tabindex","-1"))}),this.selectedRadio=i,this.value=i.value,i.setAttribute("tabindex","0"),this.focusedRadio=i),t.stopPropagation()},this.moveToRadioByIndex=(t,i)=>{const s=t[i];this.isInsideToolbar||(s.setAttribute("tabindex","0"),s.readOnly?this.slottedRadioButtons.forEach(r=>{r!==s&&r.setAttribute("tabindex","-1")}):(s.checked=!0,this.selectedRadio=s)),this.focusedRadio=s,s.focus()},this.moveRightOffGroup=()=>{var t;(t=this.nextElementSibling)===null||t===void 0||t.focus()},this.moveLeftOffGroup=()=>{var t;(t=this.previousElementSibling)===null||t===void 0||t.focus()},this.focusOutHandler=t=>{const i=this.slottedRadioButtons,s=t.target,r=s!==null?i.indexOf(s):0,n=this.focusedRadio?i.indexOf(this.focusedRadio):-1;return(n===0&&r===n||n===i.length-1&&n===r)&&(this.selectedRadio?(this.focusedRadio=this.selectedRadio,this.isInsideFoundationToolbar||(this.selectedRadio.setAttribute("tabindex","0"),i.forEach(o=>{o!==this.selectedRadio&&o.setAttribute("tabindex","-1")}))):(this.focusedRadio=i[0],this.focusedRadio.setAttribute("tabindex","0"),i.forEach(o=>{o!==this.focusedRadio&&o.setAttribute("tabindex","-1")}))),!0},this.clickHandler=t=>{const i=t.target;if(i){const s=this.slottedRadioButtons;i.checked||s.indexOf(i)===0?(i.setAttribute("tabindex","0"),this.selectedRadio=i):(i.setAttribute("tabindex","-1"),this.selectedRadio=null),this.focusedRadio=i}t.preventDefault()},this.shouldMoveOffGroupToTheRight=(t,i,s)=>t===i.length&&this.isInsideToolbar&&s===me,this.shouldMoveOffGroupToTheLeft=(t,i)=>(this.focusedRadio?t.indexOf(this.focusedRadio)-1:0)<0&&this.isInsideToolbar&&i===ve,this.checkFocusedRadio=()=>{this.focusedRadio!==null&&!this.focusedRadio.readOnly&&!this.focusedRadio.checked&&(this.focusedRadio.checked=!0,this.focusedRadio.setAttribute("tabindex","0"),this.focusedRadio.focus(),this.selectedRadio=this.focusedRadio)},this.moveRight=t=>{const i=this.slottedRadioButtons;let s=0;if(s=this.focusedRadio?i.indexOf(this.focusedRadio)+1:1,this.shouldMoveOffGroupToTheRight(s,i,t.key)){this.moveRightOffGroup();return}else s===i.length&&(s=0);for(;s<i.length&&i.length>1;)if(i[s].disabled){if(this.focusedRadio&&s===i.indexOf(this.focusedRadio))break;if(s+1>=i.length){if(this.isInsideToolbar)break;s=0}else s+=1}else{this.moveToRadioByIndex(i,s);break}},this.moveLeft=t=>{const i=this.slottedRadioButtons;let s=0;if(s=this.focusedRadio?i.indexOf(this.focusedRadio)-1:0,s=s<0?i.length-1:s,this.shouldMoveOffGroupToTheLeft(i,t.key)){this.moveLeftOffGroup();return}for(;s>=0&&i.length>1;)if(i[s].disabled){if(this.focusedRadio&&s===i.indexOf(this.focusedRadio))break;s-1<0?s=i.length-1:s-=1}else{this.moveToRadioByIndex(i,s);break}},this.keydownHandler=t=>{const i=t.key;if(i in Xn&&this.isInsideFoundationToolbar)return!0;switch(i){case Ys:{this.checkFocusedRadio();break}case me:case Ni:{this.direction===A.ltr?this.moveRight(t):this.moveLeft(t);break}case ve:case Ei:{this.direction===A.ltr?this.moveLeft(t):this.moveRight(t);break}default:return!0}}}readOnlyChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(t=>{this.readOnly?t.readOnly=!0:t.readOnly=!1})}disabledChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(t=>{this.disabled?t.disabled=!0:t.disabled=!1})}nameChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(t=>{t.setAttribute("name",this.name)})}valueChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(t=>{t.value===this.value&&(t.checked=!0,this.selectedRadio=t)}),this.$emit("change")}slottedRadioButtonsChanged(t,i){this.slottedRadioButtons&&this.slottedRadioButtons.length>0&&this.setupRadioButtons()}get parentToolbar(){return this.closest('[role="toolbar"]')}get isInsideToolbar(){var t;return(t=this.parentToolbar)!==null&&t!==void 0?t:!1}get isInsideFoundationToolbar(){var t;return!!(!((t=this.parentToolbar)===null||t===void 0)&&t.$fastController)}connectedCallback(){super.connectedCallback(),this.direction=Qs(this),this.setupRadioButtons()}disconnectedCallback(){this.slottedRadioButtons.forEach(t=>{t.removeEventListener("change",this.radioChangeHandler)})}setupRadioButtons(){const t=this.slottedRadioButtons.filter(r=>r.hasAttribute("checked")),i=t?t.length:0;if(i>1){const r=t[i-1];r.checked=!0}let s=!1;if(this.slottedRadioButtons.forEach(r=>{this.name!==void 0&&r.setAttribute("name",this.name),this.disabled&&(r.disabled=!0),this.readOnly&&(r.readOnly=!0),this.value&&this.value===r.value?(this.selectedRadio=r,this.focusedRadio=r,r.checked=!0,r.setAttribute("tabindex","0"),s=!0):(this.isInsideFoundationToolbar||r.setAttribute("tabindex","-1"),r.checked=!1),r.addEventListener("change",this.radioChangeHandler)}),this.value===void 0&&this.slottedRadioButtons.length>0){const r=this.slottedRadioButtons.filter(o=>o.hasAttribute("checked")),n=r!==null?r.length:0;if(n>0&&!s){const o=r[n-1];o.checked=!0,this.focusedRadio=o,o.setAttribute("tabindex","0")}else this.slottedRadioButtons[0].setAttribute("tabindex","0"),this.focusedRadio=this.slottedRadioButtons[0]}}}p([g({attribute:"readonly",mode:"boolean"})],xt.prototype,"readOnly",void 0);p([g({attribute:"disabled",mode:"boolean"})],xt.prototype,"disabled",void 0);p([g],xt.prototype,"name",void 0);p([g],xt.prototype,"value",void 0);p([g],xt.prototype,"orientation",void 0);p([F],xt.prototype,"childItems",void 0);p([F],xt.prototype,"slottedRadioButtons",void 0);const Do=(e,t)=>et`
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
            <slot ${Ii("defaultSlottedNodes")}></slot>
        </label>
    </template>
`;class Mo extends it{}class Lo extends Zn(Mo){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class Re extends Lo{constructor(){super(),this.initialValue="on",this.keypressHandler=t=>{switch(t.key){case Un:!this.checked&&!this.readOnly&&(this.checked=!0);return}return!0},this.proxy.setAttribute("type","radio")}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}defaultCheckedChanged(){var t;this.$fastController.isConnected&&!this.dirtyChecked&&(this.isInsideRadioGroup()||(this.checked=(t=this.defaultChecked)!==null&&t!==void 0?t:!1,this.dirtyChecked=!1))}connectedCallback(){var t,i;super.connectedCallback(),this.validate(),((t=this.parentElement)===null||t===void 0?void 0:t.getAttribute("role"))!=="radiogroup"&&this.getAttribute("tabindex")===null&&(this.disabled||this.setAttribute("tabindex","0")),this.checkedAttribute&&(this.dirtyChecked||this.isInsideRadioGroup()||(this.checked=(i=this.defaultChecked)!==null&&i!==void 0?i:!1,this.dirtyChecked=!1))}isInsideRadioGroup(){return this.closest("[role=radiogroup]")!==null}clickHandler(t){!this.disabled&&!this.readOnly&&!this.checked&&(this.checked=!0)}}p([g({attribute:"readonly",mode:"boolean"})],Re.prototype,"readOnly",void 0);p([F],Re.prototype,"name",void 0);p([F],Re.prototype,"defaultSlottedNodes",void 0);const Vo=(e,t)=>et`
    <template
        aria-disabled="${i=>i.disabled}"
        class="${i=>i.sliderOrientation||H.horizontal}
            ${i=>i.disabled?"disabled":""}"
    >
        <div ${Z("root")} part="root" class="root" style="${i=>i.positionStyle}">
            <div class="container">
                ${Ws(i=>!i.hideMark,et`
                        <div class="mark"></div>
                    `)}
                <div class="label">
                    <slot></slot>
                </div>
            </div>
        </div>
    </template>
`;function di(e,t,i,s){let r=Yn(0,1,(e-t)/(i-t));return s===A.rtl&&(r=1-r),r}const he={min:0,max:0,direction:A.ltr,orientation:H.horizontal,disabled:!1};let ct=class extends it{constructor(){super(...arguments),this.hideMark=!1,this.sliderDirection=A.ltr,this.getSliderConfiguration=()=>{if(!this.isSliderConfig(this.parentNode))this.sliderDirection=he.direction||A.ltr,this.sliderOrientation=he.orientation,this.sliderMaxPosition=he.max,this.sliderMinPosition=he.min;else{const t=this.parentNode,{min:i,max:s,direction:r,orientation:n,disabled:o}=t;o!==void 0&&(this.disabled=o),this.sliderDirection=r||A.ltr,this.sliderOrientation=n||H.horizontal,this.sliderMaxPosition=s,this.sliderMinPosition=i}},this.positionAsStyle=()=>{const t=this.sliderDirection?this.sliderDirection:A.ltr,i=di(Number(this.position),Number(this.sliderMinPosition),Number(this.sliderMaxPosition));let s=Math.round((1-i)*100),r=Math.round(i*100);return Number.isNaN(r)&&Number.isNaN(s)&&(s=50,r=50),this.sliderOrientation===H.horizontal?t===A.rtl?`right: ${r}%; left: ${s}%;`:`left: ${r}%; right: ${s}%;`:`top: ${r}%; bottom: ${s}%;`}}positionChanged(){this.positionStyle=this.positionAsStyle()}sliderOrientationChanged(){}connectedCallback(){super.connectedCallback(),this.getSliderConfiguration(),this.positionStyle=this.positionAsStyle(),this.notifier=R.getNotifier(this.parentNode),this.notifier.subscribe(this,"orientation"),this.notifier.subscribe(this,"direction"),this.notifier.subscribe(this,"max"),this.notifier.subscribe(this,"min")}disconnectedCallback(){super.disconnectedCallback(),this.notifier.unsubscribe(this,"orientation"),this.notifier.unsubscribe(this,"direction"),this.notifier.unsubscribe(this,"max"),this.notifier.unsubscribe(this,"min")}handleChange(t,i){switch(i){case"direction":this.sliderDirection=t.direction;break;case"orientation":this.sliderOrientation=t.orientation;break;case"max":this.sliderMaxPosition=t.max;break;case"min":this.sliderMinPosition=t.min;break}this.positionStyle=this.positionAsStyle()}isSliderConfig(t){return t.max!==void 0&&t.min!==void 0}};p([F],ct.prototype,"positionStyle",void 0);p([g],ct.prototype,"position",void 0);p([g({attribute:"hide-mark",mode:"boolean"})],ct.prototype,"hideMark",void 0);p([g({attribute:"disabled",mode:"boolean"})],ct.prototype,"disabled",void 0);p([F],ct.prototype,"sliderOrientation",void 0);p([F],ct.prototype,"sliderMinPosition",void 0);p([F],ct.prototype,"sliderMaxPosition",void 0);p([F],ct.prototype,"sliderDirection",void 0);const Io=(e,t)=>et`
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
            <div ${Z("track")} part="track-container" class="track">
                <slot name="track"></slot>
                <div part="track-start" class="track-start" style="${i=>i.position}">
                    <slot name="track-start"></slot>
                </div>
            </div>
            <slot></slot>
            <div
                ${Z("thumb")}
                part="thumb-container"
                class="thumb-container"
                style="${i=>i.position}"
            >
                <slot name="thumb">${t.thumb||""}</slot>
            </div>
        </div>
    </template>
`;class No extends it{}class Eo extends Oi(No){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const Oo={singleValue:"single-value"};class j extends Eo{constructor(){super(...arguments),this.direction=A.ltr,this.isDragging=!1,this.trackWidth=0,this.trackMinWidth=0,this.trackHeight=0,this.trackLeft=0,this.trackMinHeight=0,this.valueTextFormatter=()=>null,this.min=0,this.max=10,this.step=1,this.orientation=H.horizontal,this.mode=Oo.singleValue,this.keypressHandler=t=>{if(!this.readOnly){if(t.key===qn)t.preventDefault(),this.value=`${this.min}`;else if(t.key===Gn)t.preventDefault(),this.value=`${this.max}`;else if(!t.shiftKey)switch(t.key){case me:case Ei:t.preventDefault(),this.increment();break;case ve:case Ni:t.preventDefault(),this.decrement();break}}},this.setupTrackConstraints=()=>{const t=this.track.getBoundingClientRect();this.trackWidth=this.track.clientWidth,this.trackMinWidth=this.track.clientLeft,this.trackHeight=t.bottom,this.trackMinHeight=t.top,this.trackLeft=this.getBoundingClientRect().left,this.trackWidth===0&&(this.trackWidth=1)},this.setupListeners=(t=!1)=>{const i=`${t?"remove":"add"}EventListener`;this[i]("keydown",this.keypressHandler),this[i]("mousedown",this.handleMouseDown),this.thumb[i]("mousedown",this.handleThumbMouseDown,{passive:!0}),this.thumb[i]("touchstart",this.handleThumbMouseDown,{passive:!0}),t&&(this.handleMouseDown(null),this.handleThumbMouseDown(null))},this.initialValue="",this.handleThumbMouseDown=t=>{if(t){if(this.readOnly||this.disabled||t.defaultPrevented)return;t.target.focus()}const i=`${t!==null?"add":"remove"}EventListener`;window[i]("mouseup",this.handleWindowMouseUp),window[i]("mousemove",this.handleMouseMove,{passive:!0}),window[i]("touchmove",this.handleMouseMove,{passive:!0}),window[i]("touchend",this.handleWindowMouseUp),this.isDragging=t!==null},this.handleMouseMove=t=>{if(this.readOnly||this.disabled||t.defaultPrevented)return;const i=window.TouchEvent&&t instanceof TouchEvent?t.touches[0]:t,s=this.orientation===H.horizontal?i.pageX-document.documentElement.scrollLeft-this.trackLeft:i.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(s)}`},this.calculateNewValue=t=>{const i=di(t,this.orientation===H.horizontal?this.trackMinWidth:this.trackMinHeight,this.orientation===H.horizontal?this.trackWidth:this.trackHeight,this.direction),s=(this.max-this.min)*i+this.min;return this.convertToConstrainedValue(s)},this.handleWindowMouseUp=t=>{this.stopDragging()},this.stopDragging=()=>{this.isDragging=!1,this.handleMouseDown(null),this.handleThumbMouseDown(null)},this.handleMouseDown=t=>{const i=`${t!==null?"add":"remove"}EventListener`;if((t===null||!this.disabled&&!this.readOnly)&&(window[i]("mouseup",this.handleWindowMouseUp),window.document[i]("mouseleave",this.handleWindowMouseUp),window[i]("mousemove",this.handleMouseMove),t)){t.preventDefault(),this.setupTrackConstraints(),t.target.focus();const s=this.orientation===H.horizontal?t.pageX-document.documentElement.scrollLeft-this.trackLeft:t.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(s)}`}},this.convertToConstrainedValue=t=>{isNaN(t)&&(t=this.min);let i=t-this.min;const s=Math.round(i/this.step),r=i-s*(this.stepMultiplier*this.step)/this.stepMultiplier;return i=r>=Number(this.step)/2?i-r+Number(this.step):i-r,i+this.min}}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}get valueAsNumber(){return parseFloat(super.value)}set valueAsNumber(t){this.value=t.toString()}valueChanged(t,i){super.valueChanged(t,i),this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction),this.$emit("change")}minChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.min=`${this.min}`),this.validate()}maxChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.max=`${this.max}`),this.validate()}stepChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.step=`${this.step}`),this.updateStepMultiplier(),this.validate()}orientationChanged(){this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type","range"),this.direction=Qs(this),this.updateStepMultiplier(),this.setupTrackConstraints(),this.setupListeners(),this.setupDefaultValue(),this.setThumbPositionForOrientation(this.direction)}disconnectedCallback(){this.setupListeners(!0)}increment(){const t=this.direction!==A.rtl&&this.orientation!==H.vertical?Number(this.value)+Number(this.step):Number(this.value)-Number(this.step),i=this.convertToConstrainedValue(t),s=i<Number(this.max)?`${i}`:`${this.max}`;this.value=s}decrement(){const t=this.direction!==A.rtl&&this.orientation!==H.vertical?Number(this.value)-Number(this.step):Number(this.value)+Number(this.step),i=this.convertToConstrainedValue(t),s=i>Number(this.min)?`${i}`:`${this.min}`;this.value=s}setThumbPositionForOrientation(t){const s=(1-di(Number(this.value),Number(this.min),Number(this.max),t))*100;this.orientation===H.horizontal?this.position=this.isDragging?`right: ${s}%; transition: none;`:`right: ${s}%; transition: all 0.2s ease;`:this.position=this.isDragging?`bottom: ${s}%; transition: none;`:`bottom: ${s}%; transition: all 0.2s ease;`}updateStepMultiplier(){const t=this.step+"",i=this.step%1?t.length-t.indexOf(".")-1:0;this.stepMultiplier=Math.pow(10,i)}get midpoint(){return`${this.convertToConstrainedValue((this.max+this.min)/2)}`}setupDefaultValue(){if(typeof this.value=="string")if(this.value.length===0)this.initialValue=this.midpoint;else{const t=parseFloat(this.value);!Number.isNaN(t)&&(t<this.min||t>this.max)&&(this.value=this.midpoint)}}}p([g({attribute:"readonly",mode:"boolean"})],j.prototype,"readOnly",void 0);p([F],j.prototype,"direction",void 0);p([F],j.prototype,"isDragging",void 0);p([F],j.prototype,"position",void 0);p([F],j.prototype,"trackWidth",void 0);p([F],j.prototype,"trackMinWidth",void 0);p([F],j.prototype,"trackHeight",void 0);p([F],j.prototype,"trackLeft",void 0);p([F],j.prototype,"trackMinHeight",void 0);p([F],j.prototype,"valueTextFormatter",void 0);p([g({converter:Mi})],j.prototype,"min",void 0);p([g({converter:Mi})],j.prototype,"max",void 0);p([g({converter:Mi})],j.prototype,"step",void 0);p([g],j.prototype,"orientation",void 0);p([g],j.prototype,"mode",void 0);class Ao{constructor(t){this.listenerCache=new WeakMap,this.query=t}bind(t){const{query:i}=this,s=this.constructListener(t);s.bind(i)(),i.addListener(s),this.listenerCache.set(t,s)}unbind(t){const i=this.listenerCache.get(t);i&&(this.query.removeListener(i),this.listenerCache.delete(t))}}class re extends Ao{constructor(t,i){super(t),this.styles=i}static with(t){return i=>new re(t,i)}constructListener(t){let i=!1;const s=this.styles;return function(){const{matches:n}=this;n&&!i?(t.$fastController.addStyles(s),i=n):!n&&i&&(t.$fastController.removeStyles(s),i=n)}}unbind(t){super.unbind(t),t.$fastController.removeStyles(this.styles)}}const X=re.with(window.matchMedia("(forced-colors)"));re.with(window.matchMedia("(prefers-color-scheme: dark)"));re.with(window.matchMedia("(prefers-color-scheme: light)"));class Po{constructor(t,i,s){this.propertyName=t,this.value=i,this.styles=s}bind(t){R.getNotifier(t).subscribe(this,this.propertyName),this.handleChange(t,this.propertyName)}unbind(t){R.getNotifier(t).unsubscribe(this,this.propertyName),t.$fastController.removeStyles(this.styles)}handleChange(t,i){t[i]===this.value?t.$fastController.addStyles(this.styles):t.$fastController.removeStyles(this.styles)}}const we="not-allowed",Bo=":host([hidden]){display:none}";function ne(e){return`${Bo}:host{display:${e}}`}const C=jn()?"focus-visible":"focus";function ht(e,t,i){return isNaN(e)||e<=t?t:e>=i?i:e}function si(e,t,i){return isNaN(e)||e<=t?0:e>=i?1:e/(i-t)}function St(e,t,i){return isNaN(e)?t:t+e*(i-t)}function vs(e){return e*(Math.PI/180)}function Ho(e){return e*(180/Math.PI)}function zo(e){const t=Math.round(ht(e,0,255)).toString(16);return t.length===1?"0"+t:t}function z(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:t+e*(i-t)}function Pi(e,t,i){if(e<=0)return t%360;if(e>=1)return i%360;const s=(t-i+360)%360,r=(i-t+360)%360;return s<=r?(t-s*e+360)%360:(t+s*e+360)%360}function N(e,t){const i=Math.pow(10,t);return Math.round(e*i)/i}class Ct{constructor(t,i,s){this.h=t,this.s=i,this.l=s}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.l)?new Ct(t.h,t.s,t.l):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.l===t.l}roundToPrecision(t){return new Ct(N(this.h,t),N(this.s,t),N(this.l,t))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class te{constructor(t,i,s){this.h=t,this.s=i,this.v=s}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.v)?new te(t.h,t.s,t.v):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.v===t.v}roundToPrecision(t){return new te(N(this.h,t),N(this.s,t),N(this.v,t))}toObject(){return{h:this.h,s:this.s,v:this.v}}}class O{constructor(t,i,s){this.l=t,this.a=i,this.b=s}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.a)&&!isNaN(t.b)?new O(t.l,t.a,t.b):null}equalValue(t){return this.l===t.l&&this.a===t.a&&this.b===t.b}roundToPrecision(t){return new O(N(this.l,t),N(this.a,t),N(this.b,t))}toObject(){return{l:this.l,a:this.a,b:this.b}}}O.epsilon=216/24389;O.kappa=24389/27;class Lt{constructor(t,i,s){this.l=t,this.c=i,this.h=s}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.c)&&!isNaN(t.h)?new Lt(t.l,t.c,t.h):null}equalValue(t){return this.l===t.l&&this.c===t.c&&this.h===t.h}roundToPrecision(t){return new Lt(N(this.l,t),N(this.c,t),N(this.h,t))}toObject(){return{l:this.l,c:this.c,h:this.h}}}class M{constructor(t,i,s,r){this.r=t,this.g=i,this.b=s,this.a=typeof r=="number"&&!isNaN(r)?r:1}static fromObject(t){return t&&!isNaN(t.r)&&!isNaN(t.g)&&!isNaN(t.b)?new M(t.r,t.g,t.b,t.a):null}equalValue(t){return this.r===t.r&&this.g===t.g&&this.b===t.b&&this.a===t.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(St(this.r,0,255))},${Math.round(St(this.g,0,255))},${Math.round(St(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(St(this.r,0,255))},${Math.round(St(this.g,0,255))},${Math.round(St(this.b,0,255))},${ht(this.a,0,1)})`}roundToPrecision(t){return new M(N(this.r,t),N(this.g,t),N(this.b,t),N(this.a,t))}clamp(){return new M(ht(this.r,0,1),ht(this.g,0,1),ht(this.b,0,1),ht(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(t){return zo(St(t,0,255))}}class Y{constructor(t,i,s){this.x=t,this.y=i,this.z=s}static fromObject(t){return t&&!isNaN(t.x)&&!isNaN(t.y)&&!isNaN(t.z)?new Y(t.x,t.y,t.z):null}equalValue(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}roundToPrecision(t){return new Y(N(this.x,t),N(this.y,t),N(this.z,t))}toObject(){return{x:this.x,y:this.y,z:this.z}}}Y.whitePoint=new Y(.95047,1,1.08883);function fi(e){return e.r*.2126+e.g*.7152+e.b*.0722}function pi(e){function t(i){return i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4)}return fi(new M(t(e.r),t(e.g),t(e.b),1))}const ms=(e,t)=>(e+.05)/(t+.05);function ys(e,t){const i=pi(e),s=pi(t);return i>s?ms(i,s):ms(s,i)}function ee(e){const t=Math.max(e.r,e.g,e.b),i=Math.min(e.r,e.g,e.b),s=t-i;let r=0;s!==0&&(t===e.r?r=60*((e.g-e.b)/s%6):t===e.g?r=60*((e.b-e.r)/s+2):r=60*((e.r-e.g)/s+4)),r<0&&(r+=360);const n=(t+i)/2;let o=0;return s!==0&&(o=s/(1-Math.abs(2*n-1))),new Ct(r,o,n)}function gi(e,t=1){const i=(1-Math.abs(2*e.l-1))*e.s,s=i*(1-Math.abs(e.h/60%2-1)),r=e.l-i/2;let n=0,o=0,a=0;return e.h<60?(n=i,o=s,a=0):e.h<120?(n=s,o=i,a=0):e.h<180?(n=0,o=i,a=s):e.h<240?(n=0,o=s,a=i):e.h<300?(n=s,o=0,a=i):e.h<360&&(n=i,o=0,a=s),new M(n+r,o+r,a+r,t)}function ws(e){const t=Math.max(e.r,e.g,e.b),i=Math.min(e.r,e.g,e.b),s=t-i;let r=0;s!==0&&(t===e.r?r=60*((e.g-e.b)/s%6):t===e.g?r=60*((e.b-e.r)/s+2):r=60*((e.r-e.g)/s+4)),r<0&&(r+=360);let n=0;return t!==0&&(n=s/t),new te(r,n,t)}function jo(e,t=1){const i=e.s*e.v,s=i*(1-Math.abs(e.h/60%2-1)),r=e.v-i;let n=0,o=0,a=0;return e.h<60?(n=i,o=s,a=0):e.h<120?(n=s,o=i,a=0):e.h<180?(n=0,o=i,a=s):e.h<240?(n=0,o=s,a=i):e.h<300?(n=s,o=0,a=i):e.h<360&&(n=i,o=0,a=s),new M(n+r,o+r,a+r,t)}function Wo(e){let t=0,i=0;return e.h!==0&&(t=Math.cos(vs(e.h))*e.c,i=Math.sin(vs(e.h))*e.c),new O(e.l,t,i)}function qo(e){let t=0;(Math.abs(e.b)>.001||Math.abs(e.a)>.001)&&(t=Ho(Math.atan2(e.b,e.a))),t<0&&(t+=360);const i=Math.sqrt(e.a*e.a+e.b*e.b);return new Lt(e.l,i,t)}function Go(e){const t=(e.l+16)/116,i=t+e.a/500,s=t-e.b/200,r=Math.pow(i,3),n=Math.pow(t,3),o=Math.pow(s,3);let a=0;r>O.epsilon?a=r:a=(116*i-16)/O.kappa;let l=0;e.l>O.epsilon*O.kappa?l=n:l=e.l/O.kappa;let c=0;return o>O.epsilon?c=o:c=(116*s-16)/O.kappa,a=Y.whitePoint.x*a,l=Y.whitePoint.y*l,c=Y.whitePoint.z*c,new Y(a,l,c)}function Uo(e){function t(l){return l>O.epsilon?Math.pow(l,1/3):(O.kappa*l+16)/116}const i=t(e.x/Y.whitePoint.x),s=t(e.y/Y.whitePoint.y),r=t(e.z/Y.whitePoint.z),n=116*s-16,o=500*(i-s),a=200*(s-r);return new O(n,o,a)}function bi(e){function t(l){return l<=.04045?l/12.92:Math.pow((l+.055)/1.055,2.4)}const i=t(e.r),s=t(e.g),r=t(e.b),n=i*.4124564+s*.3575761+r*.1804375,o=i*.2126729+s*.7151522+r*.072175,a=i*.0193339+s*.119192+r*.9503041;return new Y(n,o,a)}function ir(e,t=1){function i(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}const s=i(e.x*3.2404542-e.y*1.5371385-e.z*.4985314),r=i(e.x*-.969266+e.y*1.8760108+e.z*.041556),n=i(e.x*.0556434-e.y*.2040259+e.z*1.0572252);return new M(s,r,n,t)}function vi(e){return Uo(bi(e))}function sr(e,t=1){return ir(Go(e),t)}function mi(e){return qo(vi(e))}function rr(e,t=1){return sr(Wo(e),t)}function xs(e,t,i=18){const s=mi(e);let r=s.c+t*i;return r<0&&(r=0),rr(new Lt(s.l,r,s.h))}function ri(e,t){return e*t}function ks(e,t){return new M(ri(e.r,t.r),ri(e.g,t.g),ri(e.b,t.b),1)}function ni(e,t){return e<.5?ht(2*t*e,0,1):ht(1-2*(1-t)*(1-e),0,1)}function $s(e,t){return new M(ni(e.r,t.r),ni(e.g,t.g),ni(e.b,t.b),1)}var Ss;(function(e){e[e.Burn=0]="Burn",e[e.Color=1]="Color",e[e.Darken=2]="Darken",e[e.Dodge=3]="Dodge",e[e.Lighten=4]="Lighten",e[e.Multiply=5]="Multiply",e[e.Overlay=6]="Overlay",e[e.Screen=7]="Screen"})(Ss||(Ss={}));function _o(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new M(z(e,t.r,i.r),z(e,t.g,i.g),z(e,t.b,i.b),z(e,t.a,i.a))}function Xo(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new Ct(Pi(e,t.h,i.h),z(e,t.s,i.s),z(e,t.l,i.l))}function Yo(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new te(Pi(e,t.h,i.h),z(e,t.s,i.s),z(e,t.v,i.v))}function Qo(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new Y(z(e,t.x,i.x),z(e,t.y,i.y),z(e,t.z,i.z))}function Zo(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new O(z(e,t.l,i.l),z(e,t.a,i.a),z(e,t.b,i.b))}function Jo(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new Lt(z(e,t.l,i.l),z(e,t.c,i.c),Pi(e,t.h,i.h))}var Q;(function(e){e[e.RGB=0]="RGB",e[e.HSL=1]="HSL",e[e.HSV=2]="HSV",e[e.XYZ=3]="XYZ",e[e.LAB=4]="LAB",e[e.LCH=5]="LCH"})(Q||(Q={}));function Gt(e,t,i,s){if(isNaN(e)||e<=0)return i;if(e>=1)return s;switch(t){case Q.HSL:return gi(Xo(e,ee(i),ee(s)));case Q.HSV:return jo(Yo(e,ws(i),ws(s)));case Q.XYZ:return ir(Qo(e,bi(i),bi(s)));case Q.LAB:return sr(Zo(e,vi(i),vi(s)));case Q.LCH:return rr(Jo(e,mi(i),mi(s)));default:return _o(e,i,s)}}class K{constructor(t){if(t==null||t.length===0)throw new Error("The stops argument must be non-empty");this.stops=this.sortColorScaleStops(t)}static createBalancedColorScale(t){if(t==null||t.length===0)throw new Error("The colors argument must be non-empty");const i=new Array(t.length);for(let s=0;s<t.length;s++)s===0?i[s]={color:t[s],position:0}:s===t.length-1?i[s]={color:t[s],position:1}:i[s]={color:t[s],position:s*(1/(t.length-1))};return new K(i)}getColor(t,i=Q.RGB){if(this.stops.length===1)return this.stops[0].color;if(t<=0)return this.stops[0].color;if(t>=1)return this.stops[this.stops.length-1].color;let s=0;for(let o=0;o<this.stops.length;o++)this.stops[o].position<=t&&(s=o);let r=s+1;r>=this.stops.length&&(r=this.stops.length-1);const n=(t-this.stops[s].position)*(1/(this.stops[r].position-this.stops[s].position));return Gt(n,i,this.stops[s].color,this.stops[r].color)}trim(t,i,s=Q.RGB){if(t<0||i>1||i<t)throw new Error("Invalid bounds");if(t===i)return new K([{color:this.getColor(t,s),position:0}]);const r=[];for(let a=0;a<this.stops.length;a++)this.stops[a].position>=t&&this.stops[a].position<=i&&r.push(this.stops[a]);if(r.length===0)return new K([{color:this.getColor(t),position:t},{color:this.getColor(i),position:i}]);r[0].position!==t&&r.unshift({color:this.getColor(t),position:t}),r[r.length-1].position!==i&&r.push({color:this.getColor(i),position:i});const n=i-t,o=new Array(r.length);for(let a=0;a<r.length;a++)o[a]={color:r[a].color,position:(r[a].position-t)/n};return new K(o)}findNextColor(t,i,s=!1,r=Q.RGB,n=.005,o=32){isNaN(t)||t<=0?t=0:t>=1&&(t=1);const a=this.getColor(t,r),l=s?0:1,c=this.getColor(l,r);if(ys(a,c)<=i)return l;let f=s?0:t,b=s?t:0,m=l,k=0;for(;k<=o;){m=Math.abs(b-f)/2+f;const $=this.getColor(m,r),L=ys(a,$);if(Math.abs(L-i)<=n)return m;L>i?s?f=m:b=m:s?b=m:f=m,k++}return m}clone(){const t=new Array(this.stops.length);for(let i=0;i<t.length;i++)t[i]={color:this.stops[i].color,position:this.stops[i].position};return new K(t)}sortColorScaleStops(t){return t.sort((i,s)=>{const r=i.position,n=s.position;return r<n?-1:r>n?1:0})}}const Ko=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;function Nt(e){const t=Ko.exec(e);if(t===null)return null;let i=t[1];if(i.length===3){const r=i.charAt(0),n=i.charAt(1),o=i.charAt(2);i=r.concat(r,n,n,o,o)}const s=parseInt(i,16);return isNaN(s)?null:new M(si((s&16711680)>>>16,0,255),si((s&65280)>>>8,0,255),si(s&255,0,255),1)}class wt{constructor(t){this.config=Object.assign({},wt.defaultPaletteConfig,t),this.palette=[],this.updatePaletteColors()}updatePaletteGenerationValues(t){let i=!1;for(const s in t)this.config[s]&&(this.config[s].equalValue?this.config[s].equalValue(t[s])||(this.config[s]=t[s],i=!0):t[s]!==this.config[s]&&(this.config[s]=t[s],i=!0));return i&&this.updatePaletteColors(),i}updatePaletteColors(){const t=this.generatePaletteColorScale();for(let i=0;i<this.config.steps;i++)this.palette[i]=t.getColor(i/(this.config.steps-1),this.config.interpolationMode)}generatePaletteColorScale(){const t=ee(this.config.baseColor),s=new K([{position:0,color:this.config.scaleColorLight},{position:.5,color:this.config.baseColor},{position:1,color:this.config.scaleColorDark}]).trim(this.config.clipLight,1-this.config.clipDark),r=s.getColor(0),n=s.getColor(1);let o=r,a=n;if(t.s>=this.config.saturationAdjustmentCutoff&&(o=xs(o,this.config.saturationLight),a=xs(a,this.config.saturationDark)),this.config.multiplyLight!==0){const l=ks(this.config.baseColor,o);o=Gt(this.config.multiplyLight,this.config.interpolationMode,o,l)}if(this.config.multiplyDark!==0){const l=ks(this.config.baseColor,a);a=Gt(this.config.multiplyDark,this.config.interpolationMode,a,l)}if(this.config.overlayLight!==0){const l=$s(this.config.baseColor,o);o=Gt(this.config.overlayLight,this.config.interpolationMode,o,l)}if(this.config.overlayDark!==0){const l=$s(this.config.baseColor,a);a=Gt(this.config.overlayDark,this.config.interpolationMode,a,l)}return this.config.baseScalePosition?this.config.baseScalePosition<=0?new K([{position:0,color:this.config.baseColor},{position:1,color:a.clamp()}]):this.config.baseScalePosition>=1?new K([{position:0,color:o.clamp()},{position:1,color:this.config.baseColor}]):new K([{position:0,color:o.clamp()},{position:this.config.baseScalePosition,color:this.config.baseColor},{position:1,color:a.clamp()}]):new K([{position:0,color:o.clamp()},{position:.5,color:this.config.baseColor},{position:1,color:a.clamp()}])}}wt.defaultPaletteConfig={baseColor:Nt("#808080"),steps:11,interpolationMode:Q.RGB,scaleColorLight:new M(1,1,1,1),scaleColorDark:new M(0,0,0,1),clipLight:.185,clipDark:.16,saturationAdjustmentCutoff:.05,saturationLight:.35,saturationDark:1.25,overlayLight:0,overlayDark:.25,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};wt.greyscalePaletteConfig={baseColor:Nt("#808080"),steps:11,interpolationMode:Q.RGB,scaleColorLight:new M(1,1,1,1),scaleColorDark:new M(0,0,0,1),clipLight:0,clipDark:0,saturationAdjustmentCutoff:0,saturationLight:0,saturationDark:0,overlayLight:0,overlayDark:0,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};wt.defaultPaletteConfig.scaleColorLight,wt.defaultPaletteConfig.scaleColorDark;class De{constructor(t){this.palette=[],this.config=Object.assign({},De.defaultPaletteConfig,t),this.regenPalettes()}regenPalettes(){let t=this.config.steps;(isNaN(t)||t<3)&&(t=3);const i=.14,s=.06,r=new M(i,i,i,1),n=94,a=new wt(Object.assign(Object.assign({},wt.greyscalePaletteConfig),{baseColor:r,baseScalePosition:(1-i)*100/n,steps:t})).palette,l=fi(this.config.baseColor),c=ee(this.config.baseColor).l,h=(l+c)/2,b=this.matchRelativeLuminanceIndex(h,a)/(t-1),k=this.matchRelativeLuminanceIndex(i,a)/(t-1),$=ee(this.config.baseColor),L=gi(Ct.fromObject({h:$.h,s:$.s,l:i})),U=gi(Ct.fromObject({h:$.h,s:$.s,l:s})),_=new Array(5);_[0]={position:0,color:new M(1,1,1,1)},_[1]={position:b,color:this.config.baseColor},_[2]={position:k,color:L},_[3]={position:.99,color:U},_[4]={position:1,color:new M(0,0,0,1)};const Lr=new K(_);this.palette=new Array(t);for(let oe=0;oe<t;oe++){const Vr=Lr.getColor(oe/(t-1),Q.RGB);this.palette[oe]=Vr}}matchRelativeLuminanceIndex(t,i){let s=Number.MAX_VALUE,r=0,n=0;const o=i.length;for(;n<o;n++){const a=Math.abs(fi(i[n])-t);a<s&&(s=a,r=n)}return r}}De.defaultPaletteConfig={baseColor:Nt("#808080"),steps:94};function nr(e,t){const i=e.relativeLuminance>t.relativeLuminance?e:t,s=e.relativeLuminance>t.relativeLuminance?t:e;return(i.relativeLuminance+.05)/(s.relativeLuminance+.05)}const kt=Object.freeze({create(e,t,i){return new xe(e,t,i)},from(e){return new xe(e.r,e.g,e.b)}});function ta(e){const t={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const i in t)if(typeof t[i]!=typeof e[i])return!1;return!0}class xe extends M{constructor(t,i,s){super(t,i,s,1),this.toColorString=this.toStringHexRGB,this.contrast=nr.bind(null,this),this.createCSS=this.toColorString,this.relativeLuminance=pi(this)}static fromObject(t){return new xe(t.r,t.g,t.b)}}function yi(e,t,i=0,s=e.length-1){if(s===i)return e[i];const r=Math.floor((s-i)/2)+i;return t(e[r])?yi(e,t,i,r):yi(e,t,r+1,s)}const ea=(-.1+Math.sqrt(.21))/2;function ia(e){return e.relativeLuminance<=ea}function Tt(e){return ia(e)?-1:1}function sa(e,t,i){return typeof e=="number"?ke.from(kt.create(e,t,i)):ke.from(e)}function ra(e){return ta(e)?$e.from(e):$e.from(kt.create(e.r,e.g,e.b))}const ke=Object.freeze({create:sa,from:ra});class $e{constructor(t,i){this.closestIndexCache=new Map,this.source=t,this.swatches=i,this.reversedSwatches=Object.freeze([...this.swatches].reverse()),this.lastIndex=this.swatches.length-1}colorContrast(t,i,s,r){s===void 0&&(s=this.closestIndexOf(t));let n=this.swatches;const o=this.lastIndex;let a=s;r===void 0&&(r=Tt(t));const l=c=>nr(t,c)>=i;return r===-1&&(n=this.reversedSwatches,a=o-a),yi(n,l,a,o)}get(t){return this.swatches[t]||this.swatches[ht(t,0,this.lastIndex)]}closestIndexOf(t){if(this.closestIndexCache.has(t.relativeLuminance))return this.closestIndexCache.get(t.relativeLuminance);let i=this.swatches.indexOf(t);if(i!==-1)return this.closestIndexCache.set(t.relativeLuminance,i),i;const s=this.swatches.reduce((r,n)=>Math.abs(n.relativeLuminance-t.relativeLuminance)<Math.abs(r.relativeLuminance-t.relativeLuminance)?n:r);return i=this.swatches.indexOf(s),this.closestIndexCache.set(t.relativeLuminance,i),i}static from(t){return new $e(t,Object.freeze(new De({baseColor:M.fromObject(t)}).palette.map(i=>{const s=Nt(i.toStringHexRGB());return kt.create(s.r,s.g,s.b)})))}}function na(e,t,i,s,r,n,o,a,l){const c=e.source,h=t.closestIndexOf(i),f=Math.max(o,a,l),b=h>=f?-1:1,k=e.closestIndexOf(c),$=k+b*-1*s,L=$+b*r,U=$+b*n;return{rest:e.get($),hover:e.get(k),active:e.get(L),focus:e.get(U)}}function oa(e,t,i,s,r,n,o){const a=e.source,l=e.closestIndexOf(a),c=Tt(t),h=l+(c===1?Math.min(s,r):Math.max(c*s,c*r)),f=e.colorContrast(t,i,h,c),b=e.closestIndexOf(f),m=b+c*Math.abs(s-r),k=c===1?s<r:c*s>c*r;let $,L;return k?($=b,L=m):($=m,L=b),{rest:e.get($),hover:e.get(L),active:e.get($+c*n),focus:e.get($+c*o)}}const Cs=kt.create(1,1,1),aa=kt.create(0,0,0),la=kt.from(Nt("#808080")),ca=kt.from(Nt("#DA1A5F"));function ha(e,t){return e.contrast(Cs)>=t?Cs:aa}function ua(e,t,i,s,r,n){const o=e.closestIndexOf(t),a=Math.max(i,s,r,n),l=o>=a?-1:1;return{rest:e.get(o+l*i),hover:e.get(o+l*s),active:e.get(o+l*r),focus:e.get(o+l*n)}}function da(e,t,i,s,r,n){const o=Tt(t),a=e.closestIndexOf(t);return{rest:e.get(a-o*i),hover:e.get(a-o*s),active:e.get(a-o*r),focus:e.get(a-o*n)}}function fa(e,t,i){const s=e.closestIndexOf(t);return e.get(s-(s<i?i*-1:i))}function pa(e,t,i,s,r,n,o,a,l,c){const h=Math.max(i,s,r,n,o,a,l,c),f=e.closestIndexOf(t),b=f>=h?-1:1;return{rest:e.get(f+b*i),hover:e.get(f+b*s),active:e.get(f+b*r),focus:e.get(f+b*n)}}function ga(e,t,i,s,r,n){const o=Tt(t),a=e.closestIndexOf(e.colorContrast(t,4.5)),l=a+o*Math.abs(i-s),c=o===1?i<s:o*i>o*s;let h,f;return c?(h=a,f=l):(h=l,f=a),{rest:e.get(h),hover:e.get(f),active:e.get(h+o*r),focus:e.get(h+o*n)}}function ba(e,t){return e.colorContrast(t,3.5)}function va(e,t,i){return e.colorContrast(i,3.5,e.closestIndexOf(e.source),Tt(t)*-1)}function ma(e,t){return e.colorContrast(t,14)}function ya(e,t){return e.colorContrast(t,4.5)}function Me(e){return kt.create(e,e,e)}const wa={LightMode:1,DarkMode:.23};function xa(e,t,i){return e.get(e.closestIndexOf(Me(t))+i)}function ka(e,t,i){const s=e.closestIndexOf(Me(t))-i;return e.get(s-i)}function $a(e,t){return e.get(e.closestIndexOf(Me(t)))}function Bi(e,t,i,s,r,n){return Math.max(e.closestIndexOf(Me(t))+i,s,r,n)}function Sa(e,t,i,s,r,n){return e.get(Bi(e,t,i,s,r,n))}function Ca(e,t,i,s,r,n){return e.get(Bi(e,t,i,s,r,n)+i)}function Fa(e,t,i,s,r,n){return e.get(Bi(e,t,i,s,r,n)+i*2)}function Ta(e,t,i,s,r,n){const o=e.closestIndexOf(t),a=Tt(t),l=o+a*i,c=l+a*(s-i),h=l+a*(r-i),f=l+a*(n-i);return{rest:e.get(l),hover:e.get(c),active:e.get(h),focus:e.get(f)}}function Ra(e,t,i){return e.get(e.closestIndexOf(t)+Tt(t)*i)}const{create:d}=Te;function v(e){return Te.create({name:e,cssCustomPropertyName:null})}const Hi=d("body-font").withDefault('aktiv-grotesk, "Segoe UI", Arial, Helvetica, sans-serif'),or=d("base-height-multiplier").withDefault(10);d("base-horizontal-spacing-multiplier").withDefault(3);const Et=d("base-layer-luminance").withDefault(wa.DarkMode),Dt=d("control-corner-radius").withDefault(4),zi=d("density").withDefault(0),I=d("design-unit").withDefault(4),oi=d("direction").withDefault(A.ltr),Le=d("disabled-opacity").withDefault(.3),q=d("stroke-width").withDefault(1),rt=d("focus-stroke-width").withDefault(2),ar=d("type-ramp-base-font-size").withDefault("14px"),lr=d("type-ramp-base-line-height").withDefault("20px");d("type-ramp-minus-1-font-size").withDefault("12px");d("type-ramp-minus-1-line-height").withDefault("16px");d("type-ramp-minus-2-font-size").withDefault("10px");d("type-ramp-minus-2-line-height").withDefault("16px");d("type-ramp-plus-1-font-size").withDefault("16px");d("type-ramp-plus-1-line-height").withDefault("24px");d("type-ramp-plus-2-font-size").withDefault("20px");d("type-ramp-plus-2-line-height").withDefault("28px");d("type-ramp-plus-3-font-size").withDefault("28px");d("type-ramp-plus-3-line-height").withDefault("36px");d("type-ramp-plus-4-font-size").withDefault("34px");d("type-ramp-plus-4-line-height").withDefault("44px");d("type-ramp-plus-5-font-size").withDefault("46px");d("type-ramp-plus-5-line-height").withDefault("56px");d("type-ramp-plus-6-font-size").withDefault("60px");d("type-ramp-plus-6-line-height").withDefault("72px");v("accent-fill-rest-delta").withDefault(0);const Da=v("accent-fill-hover-delta").withDefault(4),Ma=v("accent-fill-active-delta").withDefault(-5),La=v("accent-fill-focus-delta").withDefault(0),Va=v("accent-foreground-rest-delta").withDefault(0),Ia=v("accent-foreground-hover-delta").withDefault(6),Na=v("accent-foreground-active-delta").withDefault(-4),Ea=v("accent-foreground-focus-delta").withDefault(0),Ot=v("neutral-fill-rest-delta").withDefault(7),At=v("neutral-fill-hover-delta").withDefault(10),Pt=v("neutral-fill-active-delta").withDefault(5),cr=v("neutral-fill-focus-delta").withDefault(0),Oa=v("neutral-fill-input-rest-delta").withDefault(0),Aa=v("neutral-fill-input-hover-delta").withDefault(0),Pa=v("neutral-fill-input-active-delta").withDefault(0),Ba=v("neutral-fill-input-focus-delta").withDefault(0),Ha=v("neutral-fill-stealth-rest-delta").withDefault(0),za=v("neutral-fill-stealth-hover-delta").withDefault(5),ja=v("neutral-fill-stealth-active-delta").withDefault(3),Wa=v("neutral-fill-stealth-focus-delta").withDefault(0),qa=v("neutral-fill-strong-rest-delta").withDefault(0),Ga=v("neutral-fill-strong-hover-delta").withDefault(8),Ua=v("neutral-fill-strong-active-delta").withDefault(-5),_a=v("neutral-fill-strong-focus-delta").withDefault(0),Bt=v("neutral-fill-layer-rest-delta").withDefault(3),Xa=v("neutral-stroke-rest-delta").withDefault(25),Ya=v("neutral-stroke-hover-delta").withDefault(40),Qa=v("neutral-stroke-active-delta").withDefault(16),Za=v("neutral-stroke-focus-delta").withDefault(25),Ja=v("neutral-stroke-divider-rest-delta").withDefault(8),Ka=d("neutral-color").withDefault(la),B=v("neutral-palette").withDefault(e=>ke.from(Ka.getValueFor(e))),tl=d("accent-color").withDefault(ca),ji=v("accent-palette").withDefault(e=>ke.from(tl.getValueFor(e))),el=v("neutral-layer-card-container-recipe").withDefault({evaluate:e=>xa(B.getValueFor(e),Et.getValueFor(e),Bt.getValueFor(e))});d("neutral-layer-card-container").withDefault(e=>el.getValueFor(e).evaluate(e));const il=v("neutral-layer-floating-recipe").withDefault({evaluate:e=>ka(B.getValueFor(e),Et.getValueFor(e),Bt.getValueFor(e))});d("neutral-layer-floating").withDefault(e=>il.getValueFor(e).evaluate(e));const sl=v("neutral-layer-1-recipe").withDefault({evaluate:e=>$a(B.getValueFor(e),Et.getValueFor(e))}),rl=d("neutral-layer-1").withDefault(e=>sl.getValueFor(e).evaluate(e)),nl=v("neutral-layer-2-recipe").withDefault({evaluate:e=>Sa(B.getValueFor(e),Et.getValueFor(e),Bt.getValueFor(e),Ot.getValueFor(e),At.getValueFor(e),Pt.getValueFor(e))});d("neutral-layer-2").withDefault(e=>nl.getValueFor(e).evaluate(e));const ol=v("neutral-layer-3-recipe").withDefault({evaluate:e=>Ca(B.getValueFor(e),Et.getValueFor(e),Bt.getValueFor(e),Ot.getValueFor(e),At.getValueFor(e),Pt.getValueFor(e))});d("neutral-layer-3").withDefault(e=>ol.getValueFor(e).evaluate(e));const al=v("neutral-layer-4-recipe").withDefault({evaluate:e=>Fa(B.getValueFor(e),Et.getValueFor(e),Bt.getValueFor(e),Ot.getValueFor(e),At.getValueFor(e),Pt.getValueFor(e))});d("neutral-layer-4").withDefault(e=>al.getValueFor(e).evaluate(e));const P=d("fill-color").withDefault(e=>rl.getValueFor(e));var ie;(function(e){e[e.normal=4.5]="normal",e[e.large=7]="large"})(ie||(ie={}));const Ve=d({name:"accent-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>na(ji.getValueFor(e),B.getValueFor(e),t||P.getValueFor(e),Da.getValueFor(e),Ma.getValueFor(e),La.getValueFor(e),Ot.getValueFor(e),At.getValueFor(e),Pt.getValueFor(e))}),gt=d("accent-fill-rest").withDefault(e=>Ve.getValueFor(e).evaluate(e).rest),Vt=d("accent-fill-hover").withDefault(e=>Ve.getValueFor(e).evaluate(e).hover),It=d("accent-fill-active").withDefault(e=>Ve.getValueFor(e).evaluate(e).active),hr=d("accent-fill-focus").withDefault(e=>Ve.getValueFor(e).evaluate(e).focus),ur=e=>(t,i)=>ha(i||gt.getValueFor(t),e),Ie=v("foreground-on-accent-recipe").withDefault({evaluate:(e,t)=>ur(ie.normal)(e,t)}),wi=d("foreground-on-accent-rest").withDefault(e=>Ie.getValueFor(e).evaluate(e,gt.getValueFor(e))),xi=d("foreground-on-accent-hover").withDefault(e=>Ie.getValueFor(e).evaluate(e,Vt.getValueFor(e))),ki=d("foreground-on-accent-active").withDefault(e=>Ie.getValueFor(e).evaluate(e,It.getValueFor(e)));d("foreground-on-accent-focus").withDefault(e=>Ie.getValueFor(e).evaluate(e,hr.getValueFor(e)));const Ne=v("foreground-on-accent-large-recipe").withDefault({evaluate:(e,t)=>ur(ie.large)(e,t)});d("foreground-on-accent-rest-large").withDefault(e=>Ne.getValueFor(e).evaluate(e,gt.getValueFor(e)));d("foreground-on-accent-hover-large").withDefault(e=>Ne.getValueFor(e).evaluate(e,Vt.getValueFor(e)));d("foreground-on-accent-active-large").withDefault(e=>Ne.getValueFor(e).evaluate(e,It.getValueFor(e)));d("foreground-on-accent-focus-large").withDefault(e=>Ne.getValueFor(e).evaluate(e,hr.getValueFor(e)));const ll=e=>(t,i)=>oa(ji.getValueFor(t),i||P.getValueFor(t),e,Va.getValueFor(t),Ia.getValueFor(t),Na.getValueFor(t),Ea.getValueFor(t)),Ee=d({name:"accent-foreground-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>ll(ie.normal)(e,t)}),se=d("accent-foreground-rest").withDefault(e=>Ee.getValueFor(e).evaluate(e).rest),$i=d("accent-foreground-hover").withDefault(e=>Ee.getValueFor(e).evaluate(e).hover),Si=d("accent-foreground-active").withDefault(e=>Ee.getValueFor(e).evaluate(e).active);d("accent-foreground-focus").withDefault(e=>Ee.getValueFor(e).evaluate(e).focus);const Oe=d({name:"neutral-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>ua(B.getValueFor(e),t||P.getValueFor(e),Ot.getValueFor(e),At.getValueFor(e),Pt.getValueFor(e),cr.getValueFor(e))}),dr=d("neutral-fill-rest").withDefault(e=>Oe.getValueFor(e).evaluate(e).rest),cl=d("neutral-fill-hover").withDefault(e=>Oe.getValueFor(e).evaluate(e).hover),hl=d("neutral-fill-active").withDefault(e=>Oe.getValueFor(e).evaluate(e).active);d("neutral-fill-focus").withDefault(e=>Oe.getValueFor(e).evaluate(e).focus);const Ae=d({name:"neutral-fill-input-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>da(B.getValueFor(e),t||P.getValueFor(e),Oa.getValueFor(e),Aa.getValueFor(e),Pa.getValueFor(e),Ba.getValueFor(e))}),ul=d("neutral-fill-input-rest").withDefault(e=>Ae.getValueFor(e).evaluate(e).rest),dl=d("neutral-fill-input-hover").withDefault(e=>Ae.getValueFor(e).evaluate(e).hover),fl=d("neutral-fill-input-active").withDefault(e=>Ae.getValueFor(e).evaluate(e).active);d("neutral-fill-input-focus").withDefault(e=>Ae.getValueFor(e).evaluate(e).focus);const Pe=d({name:"neutral-fill-stealth-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>pa(B.getValueFor(e),t||P.getValueFor(e),Ha.getValueFor(e),za.getValueFor(e),ja.getValueFor(e),Wa.getValueFor(e),Ot.getValueFor(e),At.getValueFor(e),Pt.getValueFor(e),cr.getValueFor(e))}),fr=d("neutral-fill-stealth-rest").withDefault(e=>Pe.getValueFor(e).evaluate(e).rest),pl=d("neutral-fill-stealth-hover").withDefault(e=>Pe.getValueFor(e).evaluate(e).hover),gl=d("neutral-fill-stealth-active").withDefault(e=>Pe.getValueFor(e).evaluate(e).active);d("neutral-fill-stealth-focus").withDefault(e=>Pe.getValueFor(e).evaluate(e).focus);const Be=d({name:"neutral-fill-strong-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>ga(B.getValueFor(e),t||P.getValueFor(e),qa.getValueFor(e),Ga.getValueFor(e),Ua.getValueFor(e),_a.getValueFor(e))});d("neutral-fill-strong-rest").withDefault(e=>Be.getValueFor(e).evaluate(e).rest);d("neutral-fill-strong-hover").withDefault(e=>Be.getValueFor(e).evaluate(e).hover);d("neutral-fill-strong-active").withDefault(e=>Be.getValueFor(e).evaluate(e).active);d("neutral-fill-strong-focus").withDefault(e=>Be.getValueFor(e).evaluate(e).focus);const bl=v("neutral-fill-layer-recipe").withDefault({evaluate:(e,t)=>fa(B.getValueFor(e),t||P.getValueFor(e),Bt.getValueFor(e))});d("neutral-fill-layer-rest").withDefault(e=>bl.getValueFor(e).evaluate(e));const vl=v("focus-stroke-outer-recipe").withDefault({evaluate:e=>ba(B.getValueFor(e),P.getValueFor(e))}),lt=d("focus-stroke-outer").withDefault(e=>vl.getValueFor(e).evaluate(e)),ml=v("focus-stroke-inner-recipe").withDefault({evaluate:e=>va(ji.getValueFor(e),P.getValueFor(e),lt.getValueFor(e))}),yl=d("focus-stroke-inner").withDefault(e=>ml.getValueFor(e).evaluate(e)),wl=v("neutral-foreground-hint-recipe").withDefault({evaluate:e=>ya(B.getValueFor(e),P.getValueFor(e))});d("neutral-foreground-hint").withDefault(e=>wl.getValueFor(e).evaluate(e));const xl=v("neutral-foreground-recipe").withDefault({evaluate:e=>ma(B.getValueFor(e),P.getValueFor(e))}),bt=d("neutral-foreground-rest").withDefault(e=>xl.getValueFor(e).evaluate(e)),He=d({name:"neutral-stroke-recipe",cssCustomPropertyName:null}).withDefault({evaluate:e=>Ta(B.getValueFor(e),P.getValueFor(e),Xa.getValueFor(e),Ya.getValueFor(e),Qa.getValueFor(e),Za.getValueFor(e))}),Wi=d("neutral-stroke-rest").withDefault(e=>He.getValueFor(e).evaluate(e).rest),pr=d("neutral-stroke-hover").withDefault(e=>He.getValueFor(e).evaluate(e).hover),kl=d("neutral-stroke-active").withDefault(e=>He.getValueFor(e).evaluate(e).active);d("neutral-stroke-focus").withDefault(e=>He.getValueFor(e).evaluate(e).focus);const $l=v("neutral-stroke-divider-recipe").withDefault({evaluate:(e,t)=>Ra(B.getValueFor(e),t||P.getValueFor(e),Ja.getValueFor(e))});d("neutral-stroke-divider-rest").withDefault(e=>$l.getValueFor(e).evaluate(e));Te.create({name:"height-number",cssCustomPropertyName:null}).withDefault(e=>(or.getValueFor(e)+zi.getValueFor(e))*I.getValueFor(e));const pt=mn`(${or} + ${zi}) * ${I}`,Sl="0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(.11 * (2 - var(--background-luminance, 1))))",Cl="0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(.13 * (2 - var(--background-luminance, 1))))",Fl=`box-shadow: ${Sl}, ${Cl};`,Tl=y`
    ${ne("inline-flex")} :host {
        font-family: ${Hi};
        outline: none;
        font-size: ${ar};
        line-height: ${lr};
        height: calc(${pt} * 1px);
        min-width: calc(${pt} * 1px);
        background-color: ${dr};
        color: ${bt};
        border-radius: calc(${Dt} * 1px);
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
        padding: 0 calc((10 + (${I} * 2 * ${zi})) * 1px);
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
        background-color: ${cl};
    }

    :host(:active) {
        background-color: ${hl};
    }

    .control:${C} {
        border-color: ${lt};
        box-shadow: 0 0 0 calc((${rt} - ${q}) * 1px) ${lt} inset;
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
`.withBehaviors(X(y`
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
              box-shadow: 0 0 0 calc((${rt} - ${q}) * 1px) ${u.ButtonText} inset;
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
        `)),Rl=y`
    :host([appearance="accent"]) {
        background: ${gt};
        color: ${wi};
    }

    :host([appearance="accent"]:hover) {
        background: ${Vt};
        color: ${xi};
    }

    :host([appearance="accent"]:active) .control:active {
        background: ${It};
        color: ${ki};
    }

    :host([appearance="accent"]) .control:${C} {
        box-shadow: 0 0 0 calc((${rt} - ${q}) * 1px) ${lt} inset,
            0 0 0 calc((${rt} + ${q}) * 1px) ${yl} inset;
    }
`.withBehaviors(X(y`
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
                box-shadow: 0 0 0 calc(${rt} * 1px) ${u.HighlightText} inset;
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
                box-shadow: 0 0 0 calc(${rt} * 1px) ${u.HighlightText} inset;
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
        color: ${se};
        border-bottom: calc(${q} * 1px) solid ${se};
    }

    :host([appearance="hypertext"]:hover),
    :host([appearance="hypertext"]) .control:hover {
        background: transparent;
        border-bottom-color: ${$i};
    }

    :host([appearance="hypertext"]:active),
    :host([appearance="hypertext"]) .control:active {
        background: transparent;
        border-bottom-color: ${Si};
    }

    :host([appearance="hypertext"]) .control:${C} {
        border-bottom: calc(${rt} * 1px) solid ${lt};
        margin-bottom: calc(calc(${q} - ${rt}) * 1px);
    }
`.withBehaviors(X(y`
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
        `));const Dl=y`
    :host([appearance="lightweight"]) {
        background: transparent;
        color: ${se};
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
        color: ${$i};
    }

    :host([appearance="lightweight"]:active) {
        background: transparent;
        color: ${Si};
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
        background: ${$i};
    }

    :host([appearance="lightweight"]:active) .content::before {
        background: ${Si};
    }

    :host([appearance="lightweight"]) .control:${C} .content::before {
        background: ${bt};
        height: calc(${rt} * 1px);
    }
`.withBehaviors(X(y`
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
        `)),Ml=y`
    :host([appearance="outline"]) {
        background: transparent;
        border-color: ${gt};
    }

    :host([appearance="outline"]:hover) {
        border-color: ${Vt};
    }

    :host([appearance="outline"]:active) {
        border-color: ${It};
    }

    :host([appearance="outline"]) .control {
        border-color: inherit;
    }

    :host([appearance="outline"]) .control:${C} {
        box-shadow: 0 0 0 calc((${rt} - ${q}) * 1px) ${lt} inset;
        border-color: ${lt};
    }
`.withBehaviors(X(y`
            :host([appearance="outline"]) .control {
                border-color: ${u.ButtonText};
            }
            :host([appearance="outline"]) .control:${C} {
              forced-color-adjust: none;
              background-color: ${u.Highlight};
              border-color: ${u.ButtonText};
              box-shadow: 0 0 0 calc((${rt} - ${q}) * 1px) ${u.ButtonText} inset;
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
        `)),Ll=y`
    :host([appearance="stealth"]) {
        background: ${fr};
    }

    :host([appearance="stealth"]:hover) {
        background: ${pl};
    }

    :host([appearance="stealth"]:active) {
        background: ${gl};
    }
`.withBehaviors(X(y`
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
        `));class Vl{constructor(t,i){this.cache=new WeakMap,this.ltr=t,this.rtl=i}bind(t){this.attach(t)}unbind(t){const i=this.cache.get(t);i&&oi.unsubscribe(i)}attach(t){const i=this.cache.get(t)||new Il(this.ltr,this.rtl,t),s=oi.getValueFor(t);oi.subscribe(i),i.attach(s),this.cache.set(t,i)}}class Il{constructor(t,i,s){this.ltr=t,this.rtl=i,this.source=s,this.attached=null}handleChange({target:t,token:i}){this.attach(i.getValueFor(t))}attach(t){this.attached!==this[t]&&(this.attached!==null&&this.source.$fastController.removeStyles(this.attached),this.attached=this[t],this.attached!==null&&this.source.$fastController.addStyles(this.attached))}}function ue(e,t){return new Po("appearance",e,t)}const Nl=(e,t)=>y`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
            opacity: ${Le};
            background-color: ${dr};
            cursor: ${we};
        }

        ${Tl}
    `.withBehaviors(X(y`
                :host([disabled]),
                :host([disabled]) .control,
                :host([disabled]:hover),
                :host([disabled]:active) {
                    forced-color-adjust: none;
                    background-color: ${u.ButtonFace};
                    border-color: ${u.GrayText};
                    color: ${u.GrayText};
                    cursor: ${we};
                    opacity: 1;
                }
            `),ue("accent",y`
                :host([appearance="accent"][disabled]),
                :host([appearance="accent"][disabled]:hover),
                :host([appearance="accent"][disabled]:active) {
                    background: ${gt};
                }

                ${Rl}
            `.withBehaviors(X(y`
                        :host([appearance="accent"][disabled]) .control,
                        :host([appearance="accent"][disabled]) .control:hover {
                            background: ${u.ButtonFace};
                            border-color: ${u.GrayText};
                            color: ${u.GrayText};
                        }
                    `))),ue("lightweight",y`
                :host([appearance="lightweight"][disabled]:hover),
                :host([appearance="lightweight"][disabled]:active) {
                    background-color: transparent;
                    color: ${se};
                }

                :host([appearance="lightweight"][disabled]) .content::before,
                :host([appearance="lightweight"][disabled]:hover) .content::before,
                :host([appearance="lightweight"][disabled]:active) .content::before {
                    background: transparent;
                }

                ${Dl}
            `.withBehaviors(X(y`
                        :host([appearance="lightweight"].disabled) .control {
                            forced-color-adjust: none;
                            color: ${u.GrayText};
                        }

                        :host([appearance="lightweight"].disabled)
                            .control:hover
                            .content::before {
                            background: none;
                        }
                    `))),ue("outline",y`
                :host([appearance="outline"][disabled]),
                :host([appearance="outline"][disabled]:hover),
                :host([appearance="outline"][disabled]:active) {
                    background: transparent;
                    border-color: ${gt};
                }

                ${Ml}
            `.withBehaviors(X(y`
                        :host([appearance="outline"][disabled]) .control {
                            border-color: ${u.GrayText};
                        }
                    `))),ue("stealth",y`
                :host([appearance="stealth"][disabled]),
                :host([appearance="stealth"][disabled]:hover),
                :host([appearance="stealth"][disabled]:active) {
                    background: ${fr};
                }

                ${Ll}
            `.withBehaviors(X(y`
                        :host([appearance="stealth"][disabled]) {
                            background: ${u.ButtonFace};
                        }

                        :host([appearance="stealth"][disabled]) .control {
                            background: ${u.ButtonFace};
                            border-color: transparent;
                            color: ${u.GrayText};
                        }
                    `))));class gr extends st{constructor(){super(...arguments),this.appearance="neutral"}defaultSlottedContentChanged(t,i){const s=this.defaultSlottedContent.filter(r=>r.nodeType===Node.ELEMENT_NODE);s.length===1&&s[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}p([g],gr.prototype,"appearance",void 0);const El=gr.compose({baseName:"button",baseClass:st,template:Qn,styles:Nl,shadowOptions:{delegatesFocus:!0}}),Ol=(e,t)=>y`
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
        ${Fl}
        margin-top: auto;
        margin-bottom: auto;
        width: var(--dialog-width);
        height: var(--dialog-height);
        background-color: ${P};
        z-index: 1;
        border-radius: calc(${Dt} * 1px);
        border: calc(${q} * 1px) solid transparent;
    }
`,Al=tt.compose({baseName:"dialog",template:po,styles:Ol}),Pl=(e,t)=>y`
    ${ne("flex")} :host {
        align-items: flex-start;
        margin: calc(${I} * 1px) 0;
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
`,Bl=xt.compose({baseName:"radio-group",template:Ro,styles:Pl}),Hl=(e,t)=>y`
        ${ne("inline-flex")} :host {
            --input-size: calc((${pt} / 2) + ${I});
            align-items: center;
            outline: none;
            margin: calc(${I} * 1px) 0;
            /* Chromium likes to select label text or the default slot when
                the radio is clicked. Maybe there is a better solution here? */
            user-select: none;
            position: relative;
            flex-direction: row;
            transition: all 0.2s ease-in-out;
        }

        .control {
            position: relative;
            width: calc((${pt} / 2 + ${I}) * 1px);
            height: calc((${pt} / 2 + ${I}) * 1px);
            box-sizing: border-box;
            border-radius: 999px;
            border: calc(${q} * 1px) solid ${Wi};
            background: ${ul};
            outline: none;
            cursor: pointer;
        }

        .label {
            font-family: ${Hi};
            color: ${bt};
            padding-inline-start: calc(${I} * 2px + 2px);
            margin-inline-end: calc(${I} * 2px + 2px);
            cursor: pointer;
            font-size: ${ar};
            line-height: ${lr};
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
            background: ${wi};
            fill: ${wi};
            opacity: 0;
            pointer-events: none;
        }

        :host(:not([disabled])) .control:hover{
            background: ${dl};
            border-color: ${pr};
        }

        :host(:not([disabled])) .control:active {
            background: ${fl};
            border-color: ${kl};
        }

        :host(:${C}) .control {
            box-shadow: 0 0 0 2px ${P}, 0 0 0 4px ${lt};
        }

        :host([aria-checked="true"]) .control {
            background: ${gt};
            border: calc(${q} * 1px) solid ${gt};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover {
            background: ${Vt};
            border: calc(${q} * 1px) solid ${Vt};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
            background: ${xi};
            fill: ${xi};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active {
            background: ${It};
            border: calc(${q} * 1px) solid ${It};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
            background: ${ki};
            fill: ${ki};
        }

        :host([aria-checked="true"]:${C}:not([disabled])) .control {
            box-shadow: 0 0 0 2px ${P}, 0 0 0 4px ${lt};
        }

        :host([disabled]) .label,
        :host([readonly]) .label,
        :host([readonly]) .control,
        :host([disabled]) .control {
            cursor: ${we};
        }

        :host([aria-checked="true"]) .checked-indicator {
            opacity: 1;
        }

        :host([disabled]) {
            opacity: ${Le};
        }
    `.withBehaviors(X(y`
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
        `)),zl=Re.compose({baseName:"radio",template:Do,styles:Hl,checkedIndicator:`
        <div part="checked-indicator" class="checked-indicator"></div>
    `}),Fs=y`
    :host {
        align-self: start;
        grid-row: 2;
        margin-top: -2px;
        height: calc((${pt} / 2 + ${I}) * 1px);
        width: auto;
    }
    .container {
        grid-template-rows: auto auto;
        grid-template-columns: 0;
    }
    .label {
        margin: 2px 0;
    }
`,Ts=y`
    :host {
        justify-self: start;
        grid-column: 2;
        margin-left: 2px;
        height: auto;
        width: calc((${pt} / 2 + ${I}) * 1px);
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
        margin-left: calc((${I} / 2) * 3px);
        align-self: center;
    }
`,jl=(e,t)=>y`
        ${ne("block")} :host {
            font-family: ${Hi};
            color: ${bt};
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
            width: calc((${I} / 4) * 1px);
            height: calc(${pt} * 0.25 * 1px);
            background: ${Wi};
            justify-self: center;
        }
        :host(.disabled) {
            opacity: ${Le};
        }
    `.withBehaviors(X(y`
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
            `));class Wl extends ct{sliderOrientationChanged(){this.sliderOrientation===H.horizontal?(this.$fastController.addStyles(Fs),this.$fastController.removeStyles(Ts)):(this.$fastController.addStyles(Ts),this.$fastController.removeStyles(Fs))}}const ql=Wl.compose({baseName:"slider-label",baseClass:ct,template:Vo,styles:jl}),Gl=y`
    .track-start {
        left: 0;
    }
`,Ul=y`
    .track-start {
        right: 0;
    }
`,_l=(e,t)=>y`
        :host([hidden]) {
            display: none;
        }

        ${ne("inline-grid")} :host {
            --thumb-size: calc(${pt} * 0.5 - ${I});
            --thumb-translate: calc(var(--thumb-size) * -0.5 + var(--track-width) / 2);
            --track-overhang: calc((${I} / 2) * -1);
            --track-width: ${I};
            --fast-slider-height: calc(var(--thumb-size) * 10);
            align-items: center;
            width: 100%;
            margin: calc(${I} * 1px) 0;
            user-select: none;
            box-sizing: border-box;
            border-radius: calc(${Dt} * 1px);
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
            box-shadow: 0 0 0 2px ${P}, 0 0 0 4px ${lt};
        }

        .thumb-container {
            position: absolute;
            height: calc(var(--thumb-size) * 1px);
            width: calc(var(--thumb-size) * 1px);
            transition: all 0.2s ease;
            color: ${bt};
            fill: currentcolor;
        }
        .thumb-cursor {
            border: none;
            width: calc(var(--thumb-size) * 1px);
            height: calc(var(--thumb-size) * 1px);
            background: ${bt};
            border-radius: calc(${Dt} * 1px);
        }
        .thumb-cursor:hover {
            background: ${bt};
            border-color: ${pr};
        }
        .thumb-cursor:active {
            background: ${bt};
        }
        .track-start {
            background: ${se};
            position: absolute;
            height: 100%;
            left: 0;
            border-radius: calc(${Dt} * 1px);
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
            background: ${Wi};
            position: absolute;
            border-radius: calc(${Dt} * 1px);
        }
        :host([orientation="vertical"]) {
            height: calc(var(--fast-slider-height) * 1px);
            min-height: calc(var(--thumb-size) * 1px);
            min-width: calc(${I} * 20px);
        }
        :host([orientation="vertical"]) .track-start {
            height: auto;
            width: 100%;
            top: 0;
        }
        :host([disabled]), :host([readonly]) {
            cursor: ${we};
        }
        :host([disabled]) {
            opacity: ${Le};
        }
    `.withBehaviors(new Vl(Gl,Ul),X(y`
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
            `)),Xl=j.compose({baseName:"slider",template:Io,styles:_l,thumb:`
        <div class="thumb-cursor"></div>
    `});function Yl(e){return Js.getOrCreate(e).withPrefix("fast")}Yl().register(El(),zl(),Bl(),Al(),Xl({thumb:'<div style="background-color: #fff; border: solid; border-color: #777; border-width: 1px; border-radius: 3px; width: 16px; height: 16px; "></div>'}),ql());const Ql=document.getElementById("barChartCanvas"),Zl=document.getElementById("infoDialogOpenButton"),Jl=document.getElementById("infoDialogCloseButton"),br=document.getElementById("infoDialog"),vt=document.getElementById("nCitiesSlider"),nt=document.getElementById("piSlider"),ot=document.getElementById("tcostSlider"),at=document.getElementById("sigmaSlider"),vr=document.getElementById("speedSlider"),mr=document.getElementById("caseSelector"),mt=document.getElementById("visualizerCanvas"),yr=document.getElementById("nCities"),wr=document.getElementById("pi"),xr=document.getElementById("tcost"),kr=document.getElementById("sigma"),ze=document.getElementById("start"),je=document.getElementById("stop"),qi=document.getElementById("reset"),Kl=document.getElementById("counter"),$r=document.getElementById("mshareVisualizer"),Sr=document.getElementById("priceIndexVisualizer"),Cr=document.getElementById("nominalWageVisualizer"),Fr=document.getElementById("realWageVisualizer"),tc=document.getElementById("scale"),Tr=1,w=new Or(12,1,.2,2,4,.5,Tr),ec=new Br(Ql,w),Rr=40,Dr=40,Ut=320,ic=15,sc=.1;$r.value="radius";Sr.value="color";Cr.value="grayOuterCircle";Fr.value="redOuterCircle";function Ft(){_r({canvas:mt,left:Rr,top:Dr,diameter:Ut,vertices:w.numCities,vertexCircleRadiusBase:ic,vertexCircleColorBase:sc,model:w})}w.addUpdateEventListener(()=>{Kl.innerText=w.counter.toLocaleString(),ec.repaint(),Ft()});ze.className="";je.className="disabled";nt.valueAsNumber=w.country.pi;ot.valueAsNumber=w.country.tcost;at.valueAsNumber=w.country.sigma;yr.innerText=vt.value;xr.innerText=ot.value;kr.innerText=at.value;wr.innerText=nt.value;function rc(){ze.className="disabled",je.className="started",qi.className="started",w.start()}function nc(){ze.className="",je.className="disabled",qi.className="",w.stop()}function Mr(){w.reset()}function oc(){yr.innerText=vt.value,w.setNumCities(vt.valueAsNumber,nt.valueAsNumber,ot.valueAsNumber,at.valueAsNumber,Tr),w.reset()}function ac(){wr.innerText=nt.valueAsNumber.toPrecision(2),w.setPi(nt.valueAsNumber),w.calcDistanceMatrix()}function lc(){xr.innerText=ot.valueAsNumber.toPrecision(2),w.setTcost(ot.valueAsNumber),w.calcDistanceMatrix()}function cc(){kr.innerText=at.valueAsNumber.toPrecision(3),w.setSigma(at.valueAsNumber),w.calcDistanceMatrix()}function hc(){w.stop(),w.setSpeed(vr.valueAsNumber),w.start()}function uc(){switch(mr.value){case"0":vt.value="12",nt.value="0.2",ot.value="2",at.value="4",w.calcDistanceMatrix();return;case"1":vt.value="12",nt.value="0.2",ot.value="2",at.value="2",w.calcDistanceMatrix();return;case"2":vt.value="12",nt.value="0.4",ot.value="2",at.value="4",w.calcDistanceMatrix();return;case"3":vt.value="12",nt.value="0.2",ot.value="1",at.value="4",w.calcDistanceMatrix();return}}let ai=-1;function We(e){const t=mt.getBoundingClientRect(),i=mt.width/t.width,s=mt.height/t.height,r=(e.clientX-t.left)*i,n=(e.clientY-t.top)*s,o=r-Rr-Ut/2,a=n-Dr-Ut/2,l=Math.sqrt(o*o+a*a);if(l<Ut/2-30||Ut/2+30<l){w.setSelectedCityIndex(-1),ai=-1,Ft();return}const c=Hr(o,a,w.numCities);ai!=c&&(w.setSelectedCityIndex(c),Ft(),ai=c)}ze.addEventListener("click",rc);je.addEventListener("click",nc);qi.addEventListener("click",Mr);vt.addEventListener("change",oc);nt.addEventListener("change",ac);ot.addEventListener("change",lc);at.addEventListener("change",cc);vr.addEventListener("change",hc);mr.addEventListener("change",uc);mt.addEventListener("mousemove",We);mt.addEventListener("mouseenter",We);mt.addEventListener("mouseleave",We);mt.addEventListener("mouseover",We);function qe(e){switch(e.target.value){case"radius":return ut.radius;case"color":return ut.color;case"grayOuterCircle":return ut.grayOuterCircle;case"redOuterCircle":return ut.redOuterCircle;default:return}}$r.addEventListener("change",e=>{const t=qe(e);w.bindings.set(dt.mshare,t),Ft()});Sr.addEventListener("change",e=>{w.bindings.set(dt.priceIndex,qe(e)),Ft()});Cr.addEventListener("change",e=>{w.bindings.set(dt.nominalWage,qe(e)),Ft()});Fr.addEventListener("change",e=>{w.bindings.set(dt.realWage,qe(e)),Ft()});tc.addEventListener("change",e=>{const t=e.target.value,i=parseFloat(t.split(" ")[1]);w.setScale(i)});function dc(){br.show()}function fc(){br.hide()}Zl.addEventListener("click",dc);Jl.addEventListener("click",fc);Mr();
