var gr=Object.defineProperty;var br=(e,t,i)=>t in e?gr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var x=(e,t,i)=>(br(e,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();class Ii{constructor(t,i,s){x(this,"realWage");x(this,"priceIndex");x(this,"priceIndex0");x(this,"income");x(this,"income0");x(this,"AShare");x(this,"MShare");x(this,"MShare0");x(this,"nominalWage");x(this,"nominalWage0");x(this,"dMShare");x(this,"id");this.id=t,this.MShare=i,this.MShare0=i,this.dMShare=0,this.AShare=s,this.priceIndex=1,this.priceIndex0=1,this.income=1,this.income0=1,this.nominalWage=1,this.nominalWage0=1,this.realWage=1}setMShare(t){this.MShare=t}setAShare(t){this.AShare=t}changeMShare(t){this.dMShare=t,this.MShare+=this.dMShare}push(){this.income0=this.income,this.nominalWage0=this.nominalWage,this.priceIndex0=this.priceIndex,this.MShare0=this.MShare}calcIncome(t){this.income=t.pi*this.MShare*this.nominalWage+(1-t.pi)*this.AShare}calcPriceIndex(t){let i=0;t.cities.forEach(s=>{i+=s.MShare*Math.pow(s.nominalWage0*t.distanceMatrix[this.id][s.id],1-t.sigma)}),this.priceIndex=Math.pow(i,1/(1-t.sigma))}calcRealWage(t){this.realWage=this.nominalWage*Math.pow(this.priceIndex,-t.pi)}calcNominalWage(t){let i=0;t.cities.forEach(s=>{i+=s.income0*Math.pow(t.distanceMatrix[this.id][s.id],1-t.sigma)*Math.pow(s.priceIndex0,t.sigma-1)}),this.nominalWage=Math.pow(i,1/t.sigma)}calcDynamics(t){this.dMShare=t.gamma*(this.realWage-t.avgRealWage)*this.MShare}applyDynamics(t){this.MShare>1/t.cities.length/10?this.MShare+=this.dMShare:this.MShare=1/t.cities.length/10}}class vr{constructor(t,i,s,r,n){x(this,"pi");x(this,"avgRealWage");x(this,"tcost");x(this,"sigma");x(this,"distanceMatrix");x(this,"cities");x(this,"gamma");this.pi=i,this.tcost=s,this.sigma=r,this.gamma=n,this.avgRealWage=1,this.cities=new Array(t),this.distanceMatrix=new Array(t);for(let a=0;a<t;a++)this.distanceMatrix[a]=new Array(t).fill(0),this.cities[a]=new Ii(a,0,0);this.equalize(),this.calcDistanceMatrix()}reset(){const t=this.cities.length;for(let i=0;i<t;i++)this.distanceMatrix[i]=new Array(t).fill(0),this.cities[i]=new Ii(i,0,0);this.equalize(),this.calcDistanceMatrix(),this.disturb()}setSigma(t){this.sigma=t+.1}setTcost(t){this.tcost=t}setPi(t){this.pi=t}calcDistanceMatrix(){const t=this.cities.length;for(let i=0;i<t;i++)for(let s=i;s<t;s++){const r=i==s?0:2*Math.min(s-i,i+t-s)/t;this.distanceMatrix[s][i]=this.distanceMatrix[i][s]=Math.exp(Math.log(this.tcost)*r)}}equalize(){const t=this.cities.length;this.cities.forEach(i=>{i.setMShare(1/t),i.setAShare(1/t)})}disturb(){const t=this.cities.length,i=1/t*.05;for(let s=0;s<t;s++){const r=Math.floor(Math.random()*t);this.cities[r].changeMShare(i)}this.rescale()}rescale(){let t=0,i=0;this.cities.forEach(s=>{t+=s.MShare,i+=s.AShare}),this.cities.forEach(s=>{s.setMShare(s.MShare/t),s.setAShare(s.AShare/i)})}push(){this.cities.forEach(t=>{t.push()})}calcIncome(){this.cities.forEach(t=>{t.calcIncome(this)})}calcPriceIndex(){this.cities.forEach(t=>{t.calcPriceIndex(this)})}calcNominalWage(){this.cities.forEach(t=>{t.calcNominalWage(this)})}calcRealWage(){this.cities.forEach(t=>{t.calcRealWage(this)})}calcAvgRealWage(){let t=0;this.cities.forEach(i=>{t+=i.realWage*i.MShare}),this.avgRealWage=t}calcDynamics(){this.cities.forEach(t=>{t.calcDynamics(this)})}applyDynamics(){this.cities.forEach(t=>{t.applyDynamics(this)}),this.rescale()}procedure(){this.push(),this.calcIncome(),this.calcPriceIndex(),this.calcNominalWage(),this.calcRealWage(),this.calcAvgRealWage(),this.calcDynamics(),this.applyDynamics()}}class mr{constructor(t,i,s,r,n,a){x(this,"numCities");x(this,"country");x(this,"counter");x(this,"scale");x(this,"started",!1);x(this,"listeners",new Array);x(this,"timer",null);this.numCities=t,this.country=this.createCountry(t,s,r,n,a),this.scale=i,this.counter=0}createCountry(t,i,s,r,n){return new vr(t,i,s,r,n)}reset(){this.counter=0,this.country.reset(),this.update()}stop(){this.started=!1,this.timer!=null&&clearInterval(this.timer),this.timer=null}start(){this.started||(this.started=!0,this.timer=setInterval(()=>{this.country.procedure(),this.counter++,this.update()},10))}calcDistanceMatrix(){this.country.calcDistanceMatrix()}setNumCities(t,i,s,r,n){this.numCities=t,this.country=this.createCountry(this.numCities,i,s,r,n)}setScale(t){this.scale=t,this.update()}setPi(t){this.country.setPi(t)}setTcost(t){this.country.setTcost(t)}setSigma(t){this.country.setSigma(t)}addUpdateEventListener(t){this.listeners.push(t)}update(){this.listeners.forEach(t=>{t(this)})}}function yr(e,t,i,s,r,n){const a=t-n,o=6,l=.1;e.textAlign="right";let c=0;for(let u=0;u<=1;u+=l){const f=i-r-u*s;f>=0&&(e.fillStyle="#ddd",e.fillRect(n,f-1,a,1),e.fillStyle="#888",e.fillText(u.toFixed(1),n-2,f+3),c++)}if(c<5)for(let u=.05;u<=1;u+=l){const f=i-r-u*s;f>=0&&(e.fillRect(n,f-1,o,1),e.fillText(u.toFixed(2),n-2,f+4))}if(c<2)for(let u=.01;u<=1;u+=.01){const f=i-r-u*s;f>=0&&(e.fillRect(n,f-1,o,1),e.fillText(u.toFixed(2),n-2,f+4),c++)}}function wr(e,t,i,s,r,n){if(e.fillStyle="#888",e.textAlign="left",r<=100)for(let o=5;o<=r;o+=5){const l=s+o*i;e.fillText(o.toString(),l,n)}else for(let o=50;o<=r;o+=50){const l=s+o*i;e.fillText(o.toString(),l,n)}}class xr{constructor(t,i){x(this,"model");x(this,"canvas");this.canvas=t,this.model=i}repaint(){const s=this.canvas.getContext("2d");if(!s||!this.model)return;const r=(this.canvas.width-25)/this.model.country.cities.length,n=(this.canvas.height-10*2)*this.model.scale;s.fillStyle="#fff",s.fillRect(0,0,25,this.canvas.height),s.fillStyle="#f4f4f4",s.fillRect(25,10,this.canvas.width-25,this.canvas.height-10*2),yr(s,this.canvas.width,this.canvas.height,n,10,25),this.model.country.cities.forEach((a,o)=>{a.dMShare<0?s.fillStyle="#ee8888":s.fillStyle="#dd0000",s.fillRect(25+o*r,this.canvas.height-10-a.MShare*n,Math.max(r-1,1),a.MShare*n)}),s.fillStyle="#fff",s.fillRect(25,this.canvas.height-10,this.canvas.width-25,10),wr(s,this.canvas.width,r,25,this.model.numCities,this.canvas.height-10+10),s.fillStyle="#fff",s.fillRect(0,0,this.canvas.width,10)}}function $r({canvas:e,diameter:t,vertices:i,vertexCircleRadius:s,vertexCircleValueSource:r}){const o=e.getContext("2d");if(!o)return;o.clearRect(0,0,e.width,e.height);const l=t/2,c={x:l,y:l},u=2*Math.PI/i;o.beginPath(),o.arc(20+c.x,20+c.y,l,0,2*Math.PI),o.stroke(),o.beginPath();for(let f=0;f<i;f++){const v=c.x+l*Math.cos(f*u),k=c.y+l*Math.sin(f*u);f===0?o.moveTo(20+v,20+k):o.lineTo(20+v,20+k),o.beginPath(),o.arc(20+v,20+k,s,0,2*Math.PI),o.fillStyle=`rgb(255, 0, 0, ${r[f]})`,o.fill();const w=c.x+(l+15)*Math.cos(f*u)-7,y=c.y+(l+15)*Math.sin(f*u);o.fillStyle="rgb(5, 5, 5, .5)",(i<100&&f%5==0||100<=i&&f%50==0)&&o.fillText(`${f}`,20+w,20+y+3)}o.closePath()}const gt=function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}}();gt.trustedTypes===void 0&&(gt.trustedTypes={createPolicy:(e,t)=>t});const vs={configurable:!1,enumerable:!1,writable:!1};gt.FAST===void 0&&Reflect.defineProperty(gt,"FAST",Object.assign({value:Object.create(null)},vs));const Ut=gt.FAST;if(Ut.getById===void 0){const e=Object.create(null);Reflect.defineProperty(Ut,"getById",Object.assign({value(t,i){let s=e[t];return s===void 0&&(s=i?e[t]=i():null),s}},vs))}const jt=Object.freeze([]);function ms(){const e=new WeakMap;return function(t){let i=e.get(t);if(i===void 0){let s=Reflect.getPrototypeOf(t);for(;i===void 0&&s!==null;)i=e.get(s),s=Reflect.getPrototypeOf(s);i=i===void 0?[]:i.slice(0),e.set(t,i)}return i}}const Oe=gt.FAST.getById(1,()=>{const e=[],t=[];function i(){if(t.length)throw t.shift()}function s(a){try{a.call()}catch(o){t.push(o),setTimeout(i,0)}}function r(){let o=0;for(;o<e.length;)if(s(e[o]),o++,o>1024){for(let l=0,c=e.length-o;l<c;l++)e[l]=e[l+o];e.length-=o,o=0}e.length=0}function n(a){e.length<1&&gt.requestAnimationFrame(r),e.push(a)}return Object.freeze({enqueue:n,process:r})}),ys=gt.trustedTypes.createPolicy("fast-html",{createHTML:e=>e});let Pe=ys;const Wt=`fast-${Math.random().toString(36).substring(2,8)}`,ws=`${Wt}{`,bi=`}${Wt}`,$=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(e){if(Pe!==ys)throw new Error("The HTML policy can only be set once.");Pe=e},createHTML(e){return Pe.createHTML(e)},isMarker(e){return e&&e.nodeType===8&&e.data.startsWith(Wt)},extractDirectiveIndexFromMarker(e){return parseInt(e.data.replace(`${Wt}:`,""))},createInterpolationPlaceholder(e){return`${ws}${e}${bi}`},createCustomAttributePlaceholder(e,t){return`${e}="${this.createInterpolationPlaceholder(t)}"`},createBlockPlaceholder(e){return`<!--${Wt}:${e}-->`},queueUpdate:Oe.enqueue,processUpdates:Oe.process,nextUpdate(){return new Promise(Oe.enqueue)},setAttribute(e,t,i){i==null?e.removeAttribute(t):e.setAttribute(t,i)},setBooleanAttribute(e,t,i){i?e.setAttribute(t,""):e.removeAttribute(t)},removeChildNodes(e){for(let t=e.firstChild;t!==null;t=e.firstChild)e.removeChild(t)},createTemplateWalker(e){return document.createTreeWalker(e,133,null,!1)}});class Ke{constructor(t,i){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=i}has(t){return this.spillover===void 0?this.sub1===t||this.sub2===t:this.spillover.indexOf(t)!==-1}subscribe(t){const i=this.spillover;if(i===void 0){if(this.has(t))return;if(this.sub1===void 0){this.sub1=t;return}if(this.sub2===void 0){this.sub2=t;return}this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else i.indexOf(t)===-1&&i.push(t)}unsubscribe(t){const i=this.spillover;if(i===void 0)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}notify(t){const i=this.spillover,s=this.source;if(i===void 0){const r=this.sub1,n=this.sub2;r!==void 0&&r.handleChange(s,t),n!==void 0&&n.handleChange(s,t)}else for(let r=0,n=i.length;r<n;++r)i[r].handleChange(s,t)}}class xs{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var i;const s=this.subscribers[t];s!==void 0&&s.notify(t),(i=this.sourceSubscribers)===null||i===void 0||i.notify(t)}subscribe(t,i){var s;if(i){let r=this.subscribers[i];r===void 0&&(this.subscribers[i]=r=new Ke(this.source)),r.subscribe(t)}else this.sourceSubscribers=(s=this.sourceSubscribers)!==null&&s!==void 0?s:new Ke(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,i){var s;if(i){const r=this.subscribers[i];r!==void 0&&r.unsubscribe(t)}else(s=this.sourceSubscribers)===null||s===void 0||s.unsubscribe(t)}}const R=Ut.getById(2,()=>{const e=/(:|&&|\|\||if)/,t=new WeakMap,i=$.queueUpdate;let s,r=c=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function n(c){let u=c.$fastController||t.get(c);return u===void 0&&(Array.isArray(c)?u=r(c):t.set(c,u=new xs(c))),u}const a=ms();class o{constructor(u){this.name=u,this.field=`_${u}`,this.callback=`${u}Changed`}getValue(u){return s!==void 0&&s.watch(u,this.name),u[this.field]}setValue(u,f){const v=this.field,k=u[v];if(k!==f){u[v]=f;const w=u[this.callback];typeof w=="function"&&w.call(u,k,f),n(u).notify(this.name)}}}class l extends Ke{constructor(u,f,v=!1){super(u,f),this.binding=u,this.isVolatileBinding=v,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(u,f){this.needsRefresh&&this.last!==null&&this.disconnect();const v=s;s=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const k=this.binding(u,f);return s=v,k}disconnect(){if(this.last!==null){let u=this.first;for(;u!==void 0;)u.notifier.unsubscribe(this,u.propertyName),u=u.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(u,f){const v=this.last,k=n(u),w=v===null?this.first:{};if(w.propertySource=u,w.propertyName=f,w.notifier=k,k.subscribe(this,f),v!==null){if(!this.needsRefresh){let y;s=void 0,y=v.propertySource[v.propertyName],s=this,u===y&&(this.needsRefresh=!0)}v.next=w}this.last=w}handleChange(){this.needsQueue&&(this.needsQueue=!1,i(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let u=this.first;return{next:()=>{const f=u;return f===void 0?{value:void 0,done:!0}:(u=u.next,{value:f,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(c){r=c},getNotifier:n,track(c,u){s!==void 0&&s.watch(c,u)},trackVolatile(){s!==void 0&&(s.needsRefresh=!0)},notify(c,u){n(c).notify(u)},defineProperty(c,u){typeof u=="string"&&(u=new o(u)),a(c).push(u),Reflect.defineProperty(c,u.name,{enumerable:!0,get:function(){return u.getValue(this)},set:function(f){u.setValue(this,f)}})},getAccessors:a,binding(c,u,f=this.isVolatileBinding(c)){return new l(c,u,f)},isVolatileBinding(c){return e.test(c.toString())}})});function C(e,t){R.defineProperty(e,t)}const Oi=Ut.getById(3,()=>{let e=null;return{get(){return e},set(t){e=t}}});class _t{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return Oi.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){Oi.set(t)}}R.defineProperty(_t.prototype,"index");R.defineProperty(_t.prototype,"length");const qt=Object.seal(new _t);class vi{constructor(){this.targetIndex=0}}class $s extends vi{constructor(){super(...arguments),this.createPlaceholder=$.createInterpolationPlaceholder}}class ks extends vi{constructor(t,i,s){super(),this.name=t,this.behavior=i,this.options=s}createPlaceholder(t){return $.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function kr(e,t){this.source=e,this.context=t,this.bindingObserver===null&&(this.bindingObserver=R.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(e,t))}function Sr(e,t){this.source=e,this.context=t,this.target.addEventListener(this.targetName,this)}function Cr(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function Fr(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const e=this.target.$fastView;e!==void 0&&e.isComposed&&(e.unbind(),e.needsBindOnly=!0)}function Tr(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function Rr(e){$.setAttribute(this.target,this.targetName,e)}function Dr(e){$.setBooleanAttribute(this.target,this.targetName,e)}function Mr(e){if(e==null&&(e=""),e.create){this.target.textContent="";let t=this.target.$fastView;t===void 0?t=e.create():this.target.$fastTemplate!==e&&(t.isComposed&&(t.remove(),t.unbind()),t=e.create()),t.isComposed?t.needsBindOnly&&(t.needsBindOnly=!1,t.bind(this.source,this.context)):(t.isComposed=!0,t.bind(this.source,this.context),t.insertBefore(this.target),this.target.$fastView=t,this.target.$fastTemplate=e)}else{const t=this.target.$fastView;t!==void 0&&t.isComposed&&(t.isComposed=!1,t.remove(),t.needsBindOnly?t.needsBindOnly=!1:t.unbind()),this.target.textContent=e}}function Vr(e){this.target[this.targetName]=e}function Lr(e){const t=this.classVersions||Object.create(null),i=this.target;let s=this.version||0;if(e!=null&&e.length){const r=e.split(/\s+/);for(let n=0,a=r.length;n<a;++n){const o=r[n];o!==""&&(t[o]=s,i.classList.add(o))}}if(this.classVersions=t,this.version=s+1,s!==0){s-=1;for(const r in t)t[r]===s&&i.classList.remove(r)}}class mi extends $s{constructor(t){super(),this.binding=t,this.bind=kr,this.unbind=Cr,this.updateTarget=Rr,this.isBindingVolatile=R.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,t!==void 0)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=Vr,this.cleanedTargetName==="innerHTML"){const i=this.binding;this.binding=(s,r)=>$.createHTML(i(s,r))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=Dr;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=Sr,this.unbind=Tr;break;default:this.cleanedTargetName=t,t==="class"&&(this.updateTarget=Lr);break}}targetAtContent(){this.updateTarget=Mr,this.unbind=Fr}createBehavior(t){return new Nr(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class Nr{constructor(t,i,s,r,n,a,o){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=i,this.isBindingVolatile=s,this.bind=r,this.unbind=n,this.updateTarget=a,this.targetName=o}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){_t.setEvent(t);const i=this.binding(this.source,this.context);_t.setEvent(null),i!==!0&&t.preventDefault()}}let Be=null;class yi{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){Be=this}static borrow(t){const i=Be||new yi;return i.directives=t,i.reset(),Be=null,i}}function Ar(e){if(e.length===1)return e[0];let t;const i=e.length,s=e.map(a=>typeof a=="string"?()=>a:(t=a.targetName||t,a.binding)),r=(a,o)=>{let l="";for(let c=0;c<i;++c)l+=s[c](a,o);return l},n=new mi(r);return n.targetName=t,n}const Er=bi.length;function Ss(e,t){const i=t.split(ws);if(i.length===1)return null;const s=[];for(let r=0,n=i.length;r<n;++r){const a=i[r],o=a.indexOf(bi);let l;if(o===-1)l=a;else{const c=parseInt(a.substring(0,o));s.push(e.directives[c]),l=a.substring(o+Er)}l!==""&&s.push(l)}return s}function Pi(e,t,i=!1){const s=t.attributes;for(let r=0,n=s.length;r<n;++r){const a=s[r],o=a.value,l=Ss(e,o);let c=null;l===null?i&&(c=new mi(()=>o),c.targetName=a.name):c=Ar(l),c!==null&&(t.removeAttributeNode(a),r--,n--,e.addFactory(c))}}function Ir(e,t,i){const s=Ss(e,t.textContent);if(s!==null){let r=t;for(let n=0,a=s.length;n<a;++n){const o=s[n],l=n===0?t:r.parentNode.insertBefore(document.createTextNode(""),r.nextSibling);typeof o=="string"?l.textContent=o:(l.textContent=" ",e.captureContentBinding(o)),r=l,e.targetIndex++,l!==t&&i.nextNode()}e.targetIndex--}}function Or(e,t){const i=e.content;document.adoptNode(i);const s=yi.borrow(t);Pi(s,e,!0);const r=s.behaviorFactories;s.reset();const n=$.createTemplateWalker(i);let a;for(;a=n.nextNode();)switch(s.targetIndex++,a.nodeType){case 1:Pi(s,a);break;case 3:Ir(s,a,n);break;case 8:$.isMarker(a)&&s.addFactory(t[$.extractDirectiveIndexFromMarker(a)])}let o=0;($.isMarker(i.firstChild)||i.childNodes.length===1&&t.length)&&(i.insertBefore(document.createComment(""),i.firstChild),o=-1);const l=s.behaviorFactories;return s.release(),{fragment:i,viewBehaviorFactories:l,hostBehaviorFactories:r,targetOffset:o}}const He=document.createRange();class Pr{constructor(t,i){this.fragment=t,this.behaviors=i,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const i=this.lastChild;if(t.previousSibling===i)return;const s=t.parentNode;let r=this.firstChild,n;for(;r!==i;)n=r.nextSibling,s.insertBefore(r,t),r=n;s.insertBefore(i,t)}}remove(){const t=this.fragment,i=this.lastChild;let s=this.firstChild,r;for(;s!==i;)r=s.nextSibling,t.appendChild(s),s=r;t.appendChild(i)}dispose(){const t=this.firstChild.parentNode,i=this.lastChild;let s=this.firstChild,r;for(;s!==i;)r=s.nextSibling,t.removeChild(s),s=r;t.removeChild(i);const n=this.behaviors,a=this.source;for(let o=0,l=n.length;o<l;++o)n[o].unbind(a)}bind(t,i){const s=this.behaviors;if(this.source!==t)if(this.source!==null){const r=this.source;this.source=t,this.context=i;for(let n=0,a=s.length;n<a;++n){const o=s[n];o.unbind(r),o.bind(t,i)}}else{this.source=t,this.context=i;for(let r=0,n=s.length;r<n;++r)s[r].bind(t,i)}}unbind(){if(this.source===null)return;const t=this.behaviors,i=this.source;for(let s=0,r=t.length;s<r;++s)t[s].unbind(i);this.source=null}static disposeContiguousBatch(t){if(t.length!==0){He.setStartBefore(t[0].firstChild),He.setEndAfter(t[t.length-1].lastChild),He.deleteContents();for(let i=0,s=t.length;i<s;++i){const r=t[i],n=r.behaviors,a=r.source;for(let o=0,l=n.length;o<l;++o)n[o].unbind(a)}}}}class Bi{constructor(t,i){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=i}create(t){if(this.fragment===null){let c;const u=this.html;if(typeof u=="string"){c=document.createElement("template"),c.innerHTML=$.createHTML(u);const v=c.content.firstElementChild;v!==null&&v.tagName==="TEMPLATE"&&(c=v)}else c=u;const f=Or(c,this.directives);this.fragment=f.fragment,this.viewBehaviorFactories=f.viewBehaviorFactories,this.hostBehaviorFactories=f.hostBehaviorFactories,this.targetOffset=f.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const i=this.fragment.cloneNode(!0),s=this.viewBehaviorFactories,r=new Array(this.behaviorCount),n=$.createTemplateWalker(i);let a=0,o=this.targetOffset,l=n.nextNode();for(let c=s.length;a<c;++a){const u=s[a],f=u.targetIndex;for(;l!==null;)if(o===f){r[a]=u.createBehavior(l);break}else l=n.nextNode(),o++}if(this.hasHostBehaviors){const c=this.hostBehaviorFactories;for(let u=0,f=c.length;u<f;++u,++a)r[a]=c[u].createBehavior(t)}return new Pr(i,r)}render(t,i,s){typeof i=="string"&&(i=document.getElementById(i)),s===void 0&&(s=i);const r=this.create(s);return r.bind(t,qt),r.appendTo(i),r}}const Br=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function K(e,...t){const i=[];let s="";for(let r=0,n=e.length-1;r<n;++r){const a=e[r];let o=t[r];if(s+=a,o instanceof Bi){const l=o;o=()=>l}if(typeof o=="function"&&(o=new mi(o)),o instanceof $s){const l=Br.exec(a);l!==null&&(o.targetName=l[2])}o instanceof vi?(s+=o.createPlaceholder(i.length),i.push(o)):s+=o}return s+=e[e.length-1],new Bi(s,i)}class G{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=this.behaviors===null?t:this.behaviors.concat(t),this}}G.create=(()=>{if($.supportsAdoptedStyleSheets){const e=new Map;return t=>new Hr(t,e)}return e=>new Wr(e)})();function wi(e){return e.map(t=>t instanceof G?wi(t.styles):[t]).reduce((t,i)=>t.concat(i),[])}function Cs(e){return e.map(t=>t instanceof G?t.behaviors:null).reduce((t,i)=>i===null?t:(t===null&&(t=[]),t.concat(i)),null)}let Fs=(e,t)=>{e.adoptedStyleSheets=[...e.adoptedStyleSheets,...t]},Ts=(e,t)=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(i=>t.indexOf(i)===-1)};if($.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),Fs=(e,t)=>{e.adoptedStyleSheets.push(...t)},Ts=(e,t)=>{for(const i of t){const s=e.adoptedStyleSheets.indexOf(i);s!==-1&&e.adoptedStyleSheets.splice(s,1)}}}catch{}class Hr extends G{constructor(t,i){super(),this.styles=t,this.styleSheetCache=i,this._styleSheets=void 0,this.behaviors=Cs(t)}get styleSheets(){if(this._styleSheets===void 0){const t=this.styles,i=this.styleSheetCache;this._styleSheets=wi(t).map(s=>{if(s instanceof CSSStyleSheet)return s;let r=i.get(s);return r===void 0&&(r=new CSSStyleSheet,r.replaceSync(s),i.set(s,r)),r})}return this._styleSheets}addStylesTo(t){Fs(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){Ts(t,this.styleSheets),super.removeStylesFrom(t)}}let zr=0;function jr(){return`fast-style-class-${++zr}`}class Wr extends G{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=Cs(t),this.styleSheets=wi(t),this.styleClass=jr()}addStylesTo(t){const i=this.styleSheets,s=this.styleClass;t=this.normalizeTarget(t);for(let r=0;r<i.length;r++){const n=document.createElement("style");n.innerHTML=i[r],n.className=s,t.append(n)}super.addStylesTo(t)}removeStylesFrom(t){t=this.normalizeTarget(t);const i=t.querySelectorAll(`.${this.styleClass}`);for(let s=0,r=i.length;s<r;++s)t.removeChild(i[s]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const ce=Object.freeze({locate:ms()}),Rs={toView(e){return e?"true":"false"},fromView(e){return!(e==null||e==="false"||e===!1||e===0)}},xi={toView(e){if(e==null)return null;const t=e*1;return isNaN(t)?null:t.toString()},fromView(e){if(e==null)return null;const t=e*1;return isNaN(t)?null:t}};class he{constructor(t,i,s=i.toLowerCase(),r="reflect",n){this.guards=new Set,this.Owner=t,this.name=i,this.attribute=s,this.mode=r,this.converter=n,this.fieldName=`_${i}`,this.callbackName=`${i}Changed`,this.hasCallback=this.callbackName in t.prototype,r==="boolean"&&n===void 0&&(this.converter=Rs)}setValue(t,i){const s=t[this.fieldName],r=this.converter;r!==void 0&&(i=r.fromView(i)),s!==i&&(t[this.fieldName]=i,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](s,i),t.$fastController.notify(this.name))}getValue(t){return R.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,i){this.guards.has(t)||(this.guards.add(t),this.setValue(t,i),this.guards.delete(t))}tryReflectToAttribute(t){const i=this.mode,s=this.guards;s.has(t)||i==="fromView"||$.queueUpdate(()=>{s.add(t);const r=t[this.fieldName];switch(i){case"reflect":const n=this.converter;$.setAttribute(t,this.attribute,n!==void 0?n.toView(r):r);break;case"boolean":$.setBooleanAttribute(t,this.attribute,r);break}s.delete(t)})}static collect(t,...i){const s=[];i.push(ce.locate(t));for(let r=0,n=i.length;r<n;++r){const a=i[r];if(a!==void 0)for(let o=0,l=a.length;o<l;++o){const c=a[o];typeof c=="string"?s.push(new he(t,c)):s.push(new he(t,c.property,c.attribute,c.mode,c.converter))}}return s}}function g(e,t){let i;function s(r,n){arguments.length>1&&(i.property=n),ce.locate(r.constructor).push(i)}if(arguments.length>1){i={},s(e,t);return}return i=e===void 0?{}:e,s}const Hi={mode:"open"},zi={},ti=Ut.getById(4,()=>{const e=new Map;return Object.freeze({register(t){return e.has(t.type)?!1:(e.set(t.type,t),!0)},getByType(t){return e.get(t)}})});class me{constructor(t,i=t.definition){typeof i=="string"&&(i={name:i}),this.type=t,this.name=i.name,this.template=i.template;const s=he.collect(t,i.attributes),r=new Array(s.length),n={},a={};for(let o=0,l=s.length;o<l;++o){const c=s[o];r[o]=c.attribute,n[c.name]=c,a[c.attribute]=c}this.attributes=s,this.observedAttributes=r,this.propertyLookup=n,this.attributeLookup=a,this.shadowOptions=i.shadowOptions===void 0?Hi:i.shadowOptions===null?void 0:Object.assign(Object.assign({},Hi),i.shadowOptions),this.elementOptions=i.elementOptions===void 0?zi:Object.assign(Object.assign({},zi),i.elementOptions),this.styles=i.styles===void 0?void 0:Array.isArray(i.styles)?G.create(i.styles):i.styles instanceof G?i.styles:G.create([i.styles])}get isDefined(){return!!ti.getByType(this.type)}define(t=customElements){const i=this.type;if(ti.register(this)){const s=this.attributes,r=i.prototype;for(let n=0,a=s.length;n<a;++n)R.defineProperty(r,s[n]);Reflect.defineProperty(i,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,i,this.elementOptions),this}}me.forType=ti.getByType;const Ds=new WeakMap,qr={bubbles:!0,composed:!0,cancelable:!0};function ze(e){return e.shadowRoot||Ds.get(e)||null}class $i extends xs{constructor(t,i){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=i;const s=i.shadowOptions;if(s!==void 0){const n=t.attachShadow(s);s.mode==="closed"&&Ds.set(t,n)}const r=R.getAccessors(t);if(r.length>0){const n=this.boundObservables=Object.create(null);for(let a=0,o=r.length;a<o;++a){const l=r[a].name,c=t[l];c!==void 0&&(delete t[l],n[l]=c)}}}get isConnected(){return R.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,R.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=t,!this.needsInitialization&&t!==null&&this.addStyles(t))}addStyles(t){const i=ze(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)i.append(t);else if(!t.isAttachedTo(i)){const s=t.behaviors;t.addStylesTo(i),s!==null&&this.addBehaviors(s)}}removeStyles(t){const i=ze(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)i.removeChild(t);else if(t.isAttachedTo(i)){const s=t.behaviors;t.removeStylesFrom(i),s!==null&&this.removeBehaviors(s)}}addBehaviors(t){const i=this.behaviors||(this.behaviors=new Map),s=t.length,r=[];for(let n=0;n<s;++n){const a=t[n];i.has(a)?i.set(a,i.get(a)+1):(i.set(a,1),r.push(a))}if(this._isConnected){const n=this.element;for(let a=0;a<r.length;++a)r[a].bind(n,qt)}}removeBehaviors(t,i=!1){const s=this.behaviors;if(s===null)return;const r=t.length,n=[];for(let a=0;a<r;++a){const o=t[a];if(s.has(o)){const l=s.get(o)-1;l===0||i?s.delete(o)&&n.push(o):s.set(o,l)}}if(this._isConnected){const a=this.element;for(let o=0;o<n.length;++o)n[o].unbind(a)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(t,qt);const i=this.behaviors;if(i!==null)for(const[s]of i)s.bind(t,qt);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;t!==null&&t.unbind();const i=this.behaviors;if(i!==null){const s=this.element;for(const[r]of i)r.unbind(s)}}onAttributeChangedCallback(t,i,s){const r=this.definition.attributeLookup[t];r!==void 0&&r.onAttributeChangedCallback(this.element,s)}emit(t,i,s){return this._isConnected?this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:i},qr),s))):!1}finishInitialization(){const t=this.element,i=this.boundObservables;if(i!==null){const r=Object.keys(i);for(let n=0,a=r.length;n<a;++n){const o=r[n];t[o]=i[o]}this.boundObservables=null}const s=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():s.template&&(this._template=s.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():s.styles&&(this._styles=s.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const i=this.element,s=ze(i)||i;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||$.removeChildNodes(s),t&&(this.view=t.render(i,s,i))}static forCustomElement(t){const i=t.$fastController;if(i!==void 0)return i;const s=me.forType(t.constructor);if(s===void 0)throw new Error("Missing FASTElement definition.");return t.$fastController=new $i(t,s)}}function ji(e){return class extends e{constructor(){super(),$i.forCustomElement(this)}$emit(t,i,s){return this.$fastController.emit(t,i,s)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,i,s){this.$fastController.onAttributeChangedCallback(t,i,s)}}}const ye=Object.assign(ji(HTMLElement),{from(e){return ji(e)},define(e,t){return new me(e,t).define().type}});class ki{createCSS(){return""}createBehavior(){}}function Ms(e,t){const i=[];let s="";const r=[];for(let n=0,a=e.length-1;n<a;++n){s+=e[n];let o=t[n];if(o instanceof ki){const l=o.createBehavior();o=o.createCSS(),l&&r.push(l)}o instanceof G||o instanceof CSSStyleSheet?(s.trim()!==""&&(i.push(s),s=""),i.push(o)):s+=o}return s+=e[e.length-1],s.trim()!==""&&i.push(s),{styles:i,behaviors:r}}function m(e,...t){const{styles:i,behaviors:s}=Ms(e,t),r=G.create(i);return s.length&&r.withBehaviors(...s),r}class Gr extends ki{constructor(t,i){super(),this.behaviors=i,this.css="";const s=t.reduce((r,n)=>(typeof n=="string"?this.css+=n:r.push(n),r),[]);s.length&&(this.styles=G.create(s))}createBehavior(){return this}createCSS(){return this.css}bind(t){this.styles&&t.$fastController.addStyles(this.styles),this.behaviors.length&&t.$fastController.addBehaviors(this.behaviors)}unbind(t){this.styles&&t.$fastController.removeStyles(this.styles),this.behaviors.length&&t.$fastController.removeBehaviors(this.behaviors)}}function Ur(e,...t){const{styles:i,behaviors:s}=Ms(e,t);return new Gr(i,s)}class _r{constructor(t,i){this.target=t,this.propertyName=i}bind(t){t[this.propertyName]=this.target}unbind(){}}function Y(e){return new ks("fast-ref",_r,e)}const Vs=e=>typeof e=="function",Xr=()=>null;function Wi(e){return e===void 0?Xr:Vs(e)?e:()=>e}function Ls(e,t,i){const s=Vs(e)?e:()=>e,r=Wi(t),n=Wi(i);return(a,o)=>s(a,o)?r(a,o):n(a,o)}function Yr(e){return e?function(t,i,s){return t.nodeType===1&&t.matches(e)}:function(t,i,s){return t.nodeType===1}}class Qr{constructor(t,i){this.target=t,this.options=i,this.source=null}bind(t){const i=this.options.property;this.shouldUpdate=R.getAccessors(t).some(s=>s.name===i),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(jt),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return this.options.filter!==void 0&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class Zr extends Qr{constructor(t,i){super(t,i)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function Si(e){return typeof e=="string"&&(e={property:e}),new ks("fast-slotted",Zr,e)}class Jr{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const Kr=(e,t)=>K`
    <span
        part="end"
        ${Y("endContainer")}
        class=${i=>t.end?"end":void 0}
    >
        <slot name="end" ${Y("end")} @slotchange="${i=>i.handleEndContentChange()}">
            ${t.end||""}
        </slot>
    </span>
`,tn=(e,t)=>K`
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
***************************************************************************** */function p(e,t,i,s){var r=arguments.length,n=r<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,i):s,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,s);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}const je=new Map;"metadata"in Reflect||(Reflect.metadata=function(e,t){return function(i){Reflect.defineMetadata(e,t,i)}},Reflect.defineMetadata=function(e,t,i){let s=je.get(i);s===void 0&&je.set(i,s=new Map),s.set(e,t)},Reflect.getOwnMetadata=function(e,t){const i=je.get(t);if(i!==void 0)return i.get(e)});class en{constructor(t,i){this.container=t,this.key=i}instance(t){return this.registerResolver(0,t)}singleton(t){return this.registerResolver(1,t)}transient(t){return this.registerResolver(2,t)}callback(t){return this.registerResolver(3,t)}cachedCallback(t){return this.registerResolver(3,As(t))}aliasTo(t){return this.registerResolver(5,t)}registerResolver(t,i){const{container:s,key:r}=this;return this.container=this.key=void 0,s.registerResolver(r,new Q(r,t,i))}}function It(e){const t=e.slice(),i=Object.keys(e),s=i.length;let r;for(let n=0;n<s;++n)r=i[n],Es(r)||(t[r]=e[r]);return t}const sn=Object.freeze({none(e){throw Error(`${e.toString()} not registered, did you forget to add @singleton()?`)},singleton(e){return new Q(e,1,e)},transient(e){return new Q(e,2,e)}}),We=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:sn.singleton})}),qi=new Map;function Gi(e){return t=>Reflect.getOwnMetadata(e,t)}let Ui=null;const T=Object.freeze({createContainer(e){return new Gt(null,Object.assign({},We.default,e))},findResponsibleContainer(e){const t=e.$$container$$;return t&&t.responsibleForOwnerRequests?t:T.findParentContainer(e)},findParentContainer(e){const t=new CustomEvent(Ns,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return e.dispatchEvent(t),t.detail.container||T.getOrCreateDOMContainer()},getOrCreateDOMContainer(e,t){return e?e.$$container$$||new Gt(e,Object.assign({},We.default,t,{parentLocator:T.findParentContainer})):Ui||(Ui=new Gt(null,Object.assign({},We.default,t,{parentLocator:()=>null})))},getDesignParamtypes:Gi("design:paramtypes"),getAnnotationParamtypes:Gi("di:paramtypes"),getOrCreateAnnotationParamTypes(e){let t=this.getAnnotationParamtypes(e);return t===void 0&&Reflect.defineMetadata("di:paramtypes",t=[],e),t},getDependencies(e){let t=qi.get(e);if(t===void 0){const i=e.inject;if(i===void 0){const s=T.getDesignParamtypes(e),r=T.getAnnotationParamtypes(e);if(s===void 0)if(r===void 0){const n=Object.getPrototypeOf(e);typeof n=="function"&&n!==Function.prototype?t=It(T.getDependencies(n)):t=[]}else t=It(r);else if(r===void 0)t=It(s);else{t=It(s);let n=r.length,a;for(let c=0;c<n;++c)a=r[c],a!==void 0&&(t[c]=a);const o=Object.keys(r);n=o.length;let l;for(let c=0;c<n;++c)l=o[c],Es(l)||(t[l]=r[l])}}else t=It(i);qi.set(e,t)}return t},defineProperty(e,t,i,s=!1){const r=`$di_${t}`;Reflect.defineProperty(e,t,{get:function(){let n=this[r];if(n===void 0&&(n=(this instanceof HTMLElement?T.findResponsibleContainer(this):T.getOrCreateDOMContainer()).get(i),this[r]=n,s&&this instanceof ye)){const o=this.$fastController,l=()=>{const u=T.findResponsibleContainer(this).get(i),f=this[r];u!==f&&(this[r]=n,o.notify(t))};o.subscribe({handleChange:l},"isConnected")}return n}})},createInterface(e,t){const i=typeof e=="function"?e:t,s=typeof e=="string"?e:e&&"friendlyName"in e&&e.friendlyName||Qi,r=typeof e=="string"?!1:e&&"respectConnection"in e&&e.respectConnection||!1,n=function(a,o,l){if(a==null||new.target!==void 0)throw new Error(`No registration for interface: '${n.friendlyName}'`);if(o)T.defineProperty(a,o,n,r);else{const c=T.getOrCreateAnnotationParamTypes(a);c[l]=n}};return n.$isInterface=!0,n.friendlyName=s??"(anonymous)",i!=null&&(n.register=function(a,o){return i(new en(a,o??n))}),n.toString=function(){return`InterfaceSymbol<${n.friendlyName}>`},n},inject(...e){return function(t,i,s){if(typeof s=="number"){const r=T.getOrCreateAnnotationParamTypes(t),n=e[0];n!==void 0&&(r[s]=n)}else if(i)T.defineProperty(t,i,e[0]);else{const r=s?T.getOrCreateAnnotationParamTypes(s.value):T.getOrCreateAnnotationParamTypes(t);let n;for(let a=0;a<e.length;++a)n=e[a],n!==void 0&&(r[a]=n)}}},transient(e){return e.register=function(i){return Xt.transient(e,e).register(i)},e.registerInRequestor=!1,e},singleton(e,t=nn){return e.register=function(s){return Xt.singleton(e,e).register(s)},e.registerInRequestor=t.scoped,e}}),rn=T.createInterface("Container");T.inject;const nn={scoped:!1};class Q{constructor(t,i,s){this.key=t,this.strategy=i,this.state=s,this.resolving=!1}get $isResolver(){return!0}register(t){return t.registerResolver(this.key,this)}resolve(t,i){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=t.getFactory(this.state).construct(i),this.strategy=0,this.resolving=!1,this.state}case 2:{const s=t.getFactory(this.state);if(s===null)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return s.construct(i)}case 3:return this.state(t,i,this);case 4:return this.state[0].resolve(t,i);case 5:return i.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(t){var i,s,r;switch(this.strategy){case 1:case 2:return t.getFactory(this.state);case 5:return(r=(s=(i=t.getResolver(this.state))===null||i===void 0?void 0:i.getFactory)===null||s===void 0?void 0:s.call(i,t))!==null&&r!==void 0?r:null;default:return null}}}function _i(e){return this.get(e)}function on(e,t){return t(e)}class an{constructor(t,i){this.Type=t,this.dependencies=i,this.transformers=null}construct(t,i){let s;return i===void 0?s=new this.Type(...this.dependencies.map(_i,t)):s=new this.Type(...this.dependencies.map(_i,t),...i),this.transformers==null?s:this.transformers.reduce(on,s)}registerTransformer(t){(this.transformers||(this.transformers=[])).push(t)}}const ln={$isResolver:!0,resolve(e,t){return t}};function ae(e){return typeof e.register=="function"}function cn(e){return ae(e)&&typeof e.registerInRequestor=="boolean"}function Xi(e){return cn(e)&&e.registerInRequestor}function hn(e){return e.prototype!==void 0}const un=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),Ns="__DI_LOCATE_PARENT__",qe=new Map;class Gt{constructor(t,i){this.owner=t,this.config=i,this._parent=void 0,this.registerDepth=0,this.context=null,t!==null&&(t.$$container$$=this),this.resolvers=new Map,this.resolvers.set(rn,ln),t instanceof Node&&t.addEventListener(Ns,s=>{s.composedPath()[0]!==this.owner&&(s.detail.container=this,s.stopImmediatePropagation())})}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(t,...i){return this.context=t,this.register(...i),this.context=null,this}register(...t){if(++this.registerDepth===100)throw new Error("Unable to autoregister dependency");let i,s,r,n,a;const o=this.context;for(let l=0,c=t.length;l<c;++l)if(i=t[l],!!Zi(i))if(ae(i))i.register(this,o);else if(hn(i))Xt.singleton(i,i).register(this);else for(s=Object.keys(i),n=0,a=s.length;n<a;++n)r=i[s[n]],Zi(r)&&(ae(r)?r.register(this,o):this.register(r));return--this.registerDepth,this}registerResolver(t,i){ie(t);const s=this.resolvers,r=s.get(t);return r==null?s.set(t,i):r instanceof Q&&r.strategy===4?r.state.push(i):s.set(t,new Q(t,4,[r,i])),i}registerTransformer(t,i){const s=this.getResolver(t);if(s==null)return!1;if(s.getFactory){const r=s.getFactory(this);return r==null?!1:(r.registerTransformer(i),!0)}return!1}getResolver(t,i=!0){if(ie(t),t.resolve!==void 0)return t;let s=this,r;for(;s!=null;)if(r=s.resolvers.get(t),r==null){if(s.parent==null){const n=Xi(t)?this:s;return i?this.jitRegister(t,n):null}s=s.parent}else return r;return null}has(t,i=!1){return this.resolvers.has(t)?!0:i&&this.parent!=null?this.parent.has(t,!0):!1}get(t){if(ie(t),t.$isResolver)return t.resolve(this,this);let i=this,s;for(;i!=null;)if(s=i.resolvers.get(t),s==null){if(i.parent==null){const r=Xi(t)?this:i;return s=this.jitRegister(t,r),s.resolve(i,this)}i=i.parent}else return s.resolve(i,this);throw new Error(`Unable to resolve key: ${t}`)}getAll(t,i=!1){ie(t);const s=this;let r=s,n;if(i){let a=jt;for(;r!=null;)n=r.resolvers.get(t),n!=null&&(a=a.concat(Yi(n,r,s))),r=r.parent;return a}else for(;r!=null;)if(n=r.resolvers.get(t),n==null){if(r=r.parent,r==null)return jt}else return Yi(n,r,s);return jt}getFactory(t){let i=qe.get(t);if(i===void 0){if(dn(t))throw new Error(`${t.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);qe.set(t,i=new an(t,T.getDependencies(t)))}return i}registerFactory(t,i){qe.set(t,i)}createChild(t){return new Gt(null,Object.assign({},this.config,t,{parentLocator:()=>this}))}jitRegister(t,i){if(typeof t!="function")throw new Error(`Attempted to jitRegister something that is not a constructor: '${t}'. Did you forget to register this dependency?`);if(un.has(t.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${t.name}. Did you forget to add @inject(Key)`);if(ae(t)){const s=t.register(i);if(!(s instanceof Object)||s.resolve==null){const r=i.resolvers.get(t);if(r!=null)return r;throw new Error("A valid resolver was not returned from the static register method")}return s}else{if(t.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${t.friendlyName}`);{const s=this.config.defaultResolver(t,i);return i.resolvers.set(t,s),s}}}}const Ge=new WeakMap;function As(e){return function(t,i,s){if(Ge.has(s))return Ge.get(s);const r=e(t,i,s);return Ge.set(s,r),r}}const Xt=Object.freeze({instance(e,t){return new Q(e,0,t)},singleton(e,t){return new Q(e,1,t)},transient(e,t){return new Q(e,2,t)},callback(e,t){return new Q(e,3,t)},cachedCallback(e,t){return new Q(e,3,As(t))},aliasTo(e,t){return new Q(t,5,e)}});function ie(e){if(e==null)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function Yi(e,t,i){if(e instanceof Q&&e.strategy===4){const s=e.state;let r=s.length;const n=new Array(r);for(;r--;)n[r]=s[r].resolve(t,i);return n}return[e.resolve(t,i)]}const Qi="(anonymous)";function Zi(e){return typeof e=="object"&&e!==null||typeof e=="function"}const dn=function(){const e=new WeakMap;let t=!1,i="",s=0;return function(r){return t=e.get(r),t===void 0&&(i=r.toString(),s=i.length,t=s>=29&&s<=100&&i.charCodeAt(s-1)===125&&i.charCodeAt(s-2)<=32&&i.charCodeAt(s-3)===93&&i.charCodeAt(s-4)===101&&i.charCodeAt(s-5)===100&&i.charCodeAt(s-6)===111&&i.charCodeAt(s-7)===99&&i.charCodeAt(s-8)===32&&i.charCodeAt(s-9)===101&&i.charCodeAt(s-10)===118&&i.charCodeAt(s-11)===105&&i.charCodeAt(s-12)===116&&i.charCodeAt(s-13)===97&&i.charCodeAt(s-14)===110&&i.charCodeAt(s-15)===88,e.set(r,t)),t}}(),se={};function Es(e){switch(typeof e){case"number":return e>=0&&(e|0)===e;case"string":{const t=se[e];if(t!==void 0)return t;const i=e.length;if(i===0)return se[e]=!1;let s=0;for(let r=0;r<i;++r)if(s=e.charCodeAt(r),r===0&&s===48&&i>1||s<48||s>57)return se[e]=!1;return se[e]=!0}default:return!1}}function Ji(e){return`${e.toLowerCase()}:presentation`}const re=new Map,Is=Object.freeze({define(e,t,i){const s=Ji(e);re.get(s)===void 0?re.set(s,t):re.set(s,!1),i.register(Xt.instance(s,t))},forTag(e,t){const i=Ji(e),s=re.get(i);return s===!1?T.findResponsibleContainer(t).get(i):s||null}});class fn{constructor(t,i){this.template=t||null,this.styles=i===void 0?null:Array.isArray(i)?G.create(i):i instanceof G?i:G.create([i])}applyTo(t){const i=t.$fastController;i.template===null&&(i.template=this.template),i.styles===null&&(i.styles=this.styles)}}class tt extends ye{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return this._presentation===void 0&&(this._presentation=Is.forTag(this.tagName,this)),this._presentation}templateChanged(){this.template!==void 0&&(this.$fastController.template=this.template)}stylesChanged(){this.styles!==void 0&&(this.$fastController.styles=this.styles)}connectedCallback(){this.$presentation!==null&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(t){return(i={})=>new pn(this===tt?class extends tt{}:this,t,i)}}p([C],tt.prototype,"template",void 0);p([C],tt.prototype,"styles",void 0);function Ot(e,t,i){return typeof e=="function"?e(t,i):e}class pn{constructor(t,i,s){this.type=t,this.elementDefinition=i,this.overrideDefinition=s,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(t,i){const s=this.definition,r=this.overrideDefinition,a=`${s.prefix||i.elementPrefix}-${s.baseName}`;i.tryDefineElement({name:a,type:this.type,baseClass:this.elementDefinition.baseClass,callback:o=>{const l=new fn(Ot(s.template,o,s),Ot(s.styles,o,s));o.definePresentation(l);let c=Ot(s.shadowOptions,o,s);o.shadowRootMode&&(c?r.shadowOptions||(c.mode=o.shadowRootMode):c!==null&&(c={mode:o.shadowRootMode})),o.defineElement({elementOptions:Ot(s.elementOptions,o,s),shadowOptions:c,attributes:Ot(s.attributes,o,s)})}})}}function Os(e,...t){const i=ce.locate(e);t.forEach(s=>{Object.getOwnPropertyNames(s.prototype).forEach(n=>{n!=="constructor"&&Object.defineProperty(e.prototype,n,Object.getOwnPropertyDescriptor(s.prototype,n))}),ce.locate(s).forEach(n=>i.push(n))})}const B={horizontal:"horizontal",vertical:"vertical"};function gn(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function bn(){const e=document.querySelector('meta[property="csp-nonce"]');return e?e.getAttribute("content"):null}let wt;function vn(){if(typeof wt=="boolean")return wt;if(!gn())return wt=!1,wt;const e=document.createElement("style"),t=bn();t!==null&&e.setAttribute("nonce",t),document.head.appendChild(e);try{e.sheet.insertRule("foo:focus-visible {color:inherit}",0),wt=!0}catch{wt=!1}finally{document.head.removeChild(e)}return wt}var Ki;(function(e){e[e.alt=18]="alt",e[e.arrowDown=40]="arrowDown",e[e.arrowLeft=37]="arrowLeft",e[e.arrowRight=39]="arrowRight",e[e.arrowUp=38]="arrowUp",e[e.back=8]="back",e[e.backSlash=220]="backSlash",e[e.break=19]="break",e[e.capsLock=20]="capsLock",e[e.closeBracket=221]="closeBracket",e[e.colon=186]="colon",e[e.colon2=59]="colon2",e[e.comma=188]="comma",e[e.ctrl=17]="ctrl",e[e.delete=46]="delete",e[e.end=35]="end",e[e.enter=13]="enter",e[e.equals=187]="equals",e[e.equals2=61]="equals2",e[e.equals3=107]="equals3",e[e.escape=27]="escape",e[e.forwardSlash=191]="forwardSlash",e[e.function1=112]="function1",e[e.function10=121]="function10",e[e.function11=122]="function11",e[e.function12=123]="function12",e[e.function2=113]="function2",e[e.function3=114]="function3",e[e.function4=115]="function4",e[e.function5=116]="function5",e[e.function6=117]="function6",e[e.function7=118]="function7",e[e.function8=119]="function8",e[e.function9=120]="function9",e[e.home=36]="home",e[e.insert=45]="insert",e[e.menu=93]="menu",e[e.minus=189]="minus",e[e.minus2=109]="minus2",e[e.numLock=144]="numLock",e[e.numPad0=96]="numPad0",e[e.numPad1=97]="numPad1",e[e.numPad2=98]="numPad2",e[e.numPad3=99]="numPad3",e[e.numPad4=100]="numPad4",e[e.numPad5=101]="numPad5",e[e.numPad6=102]="numPad6",e[e.numPad7=103]="numPad7",e[e.numPad8=104]="numPad8",e[e.numPad9=105]="numPad9",e[e.numPadDivide=111]="numPadDivide",e[e.numPadDot=110]="numPadDot",e[e.numPadMinus=109]="numPadMinus",e[e.numPadMultiply=106]="numPadMultiply",e[e.numPadPlus=107]="numPadPlus",e[e.openBracket=219]="openBracket",e[e.pageDown=34]="pageDown",e[e.pageUp=33]="pageUp",e[e.period=190]="period",e[e.print=44]="print",e[e.quote=222]="quote",e[e.scrollLock=145]="scrollLock",e[e.shift=16]="shift",e[e.space=32]="space",e[e.tab=9]="tab",e[e.tilde=192]="tilde",e[e.windowsLeft=91]="windowsLeft",e[e.windowsOpera=219]="windowsOpera",e[e.windowsRight=92]="windowsRight"})(Ki||(Ki={}));const Ci="ArrowDown",ue="ArrowLeft",de="ArrowRight",Fi="ArrowUp",Ps="Enter",mn="Escape",yn="Home",wn="End",xn=" ",$n="Tab",kn={ArrowDown:Ci,ArrowLeft:ue,ArrowRight:de,ArrowUp:Fi};var I;(function(e){e.ltr="ltr",e.rtl="rtl"})(I||(I={}));function Sn(e,t,i){return Math.min(Math.max(i,e),t)}var h;(function(e){e.Canvas="Canvas",e.CanvasText="CanvasText",e.LinkText="LinkText",e.VisitedText="VisitedText",e.ActiveText="ActiveText",e.ButtonFace="ButtonFace",e.ButtonText="ButtonText",e.Field="Field",e.FieldText="FieldText",e.Highlight="Highlight",e.HighlightText="HighlightText",e.GrayText="GrayText"})(h||(h={}));class V{}p([g({attribute:"aria-atomic"})],V.prototype,"ariaAtomic",void 0);p([g({attribute:"aria-busy"})],V.prototype,"ariaBusy",void 0);p([g({attribute:"aria-controls"})],V.prototype,"ariaControls",void 0);p([g({attribute:"aria-current"})],V.prototype,"ariaCurrent",void 0);p([g({attribute:"aria-describedby"})],V.prototype,"ariaDescribedby",void 0);p([g({attribute:"aria-details"})],V.prototype,"ariaDetails",void 0);p([g({attribute:"aria-disabled"})],V.prototype,"ariaDisabled",void 0);p([g({attribute:"aria-errormessage"})],V.prototype,"ariaErrormessage",void 0);p([g({attribute:"aria-flowto"})],V.prototype,"ariaFlowto",void 0);p([g({attribute:"aria-haspopup"})],V.prototype,"ariaHaspopup",void 0);p([g({attribute:"aria-hidden"})],V.prototype,"ariaHidden",void 0);p([g({attribute:"aria-invalid"})],V.prototype,"ariaInvalid",void 0);p([g({attribute:"aria-keyshortcuts"})],V.prototype,"ariaKeyshortcuts",void 0);p([g({attribute:"aria-label"})],V.prototype,"ariaLabel",void 0);p([g({attribute:"aria-labelledby"})],V.prototype,"ariaLabelledby",void 0);p([g({attribute:"aria-live"})],V.prototype,"ariaLive",void 0);p([g({attribute:"aria-owns"})],V.prototype,"ariaOwns",void 0);p([g({attribute:"aria-relevant"})],V.prototype,"ariaRelevant",void 0);p([g({attribute:"aria-roledescription"})],V.prototype,"ariaRoledescription",void 0);const Bs=e=>{const t=e.closest("[dir]");return t!==null&&t.dir==="rtl"?I.rtl:I.ltr},Cn=(e,t)=>K`
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
        ${tn(e,t)}
        <span class="content" part="content">
            <slot ${Si("defaultSlottedContent")}></slot>
        </span>
        ${Kr(e,t)}
    </button>
`,ts="form-associated-proxy",es="ElementInternals",is=es in window&&"setFormValue"in window[es].prototype,ss=new WeakMap;function Ti(e){const t=class extends e{constructor(...i){super(...i),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return is}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const i=this.proxy.labels,s=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),r=i?s.concat(Array.from(i)):s;return Object.freeze(r)}else return jt}valueChanged(i,s){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(i,s){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(i,s){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),$.queueUpdate(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(i,s){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(i,s){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),$.queueUpdate(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!is)return null;let i=ss.get(this);return i||(i=this.attachInternals(),ss.set(this,i)),i}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){this.proxyEventsToBlock.forEach(i=>this.proxy.removeEventListener(i,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(i,s,r){this.elementInternals?this.elementInternals.setValidity(i,s,r):typeof s=="string"&&this.proxy.setCustomValidity(s)}formDisabledCallback(i){this.disabled=i}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var i;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(s=>this.proxy.addEventListener(s,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",ts),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",ts)),(i=this.shadowRoot)===null||i===void 0||i.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var i;this.removeChild(this.proxy),(i=this.shadowRoot)===null||i===void 0||i.removeChild(this.proxySlot)}validate(i){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,i)}setFormValue(i,s){this.elementInternals&&this.elementInternals.setFormValue(i,s||i)}_keypressHandler(i){switch(i.key){case Ps:if(this.form instanceof HTMLFormElement){const s=this.form.querySelector("[type=submit]");s==null||s.click()}break}}stopPropagation(i){i.stopPropagation()}};return g({mode:"boolean"})(t.prototype,"disabled"),g({mode:"fromView",attribute:"value"})(t.prototype,"initialValue"),g({attribute:"current-value"})(t.prototype,"currentValue"),g(t.prototype,"name"),g({mode:"boolean"})(t.prototype,"required"),C(t.prototype,"value"),t}function Fn(e){class t extends Ti(e){}class i extends t{constructor(...r){super(r),this.dirtyChecked=!1,this.checkedAttribute=!1,this.checked=!1,this.dirtyChecked=!1}checkedAttributeChanged(){this.defaultChecked=this.checkedAttribute}defaultCheckedChanged(){this.dirtyChecked||(this.checked=this.defaultChecked,this.dirtyChecked=!1)}checkedChanged(r,n){this.dirtyChecked||(this.dirtyChecked=!0),this.currentChecked=this.checked,this.updateForm(),this.proxy instanceof HTMLInputElement&&(this.proxy.checked=this.checked),r!==void 0&&this.$emit("change"),this.validate()}currentCheckedChanged(r,n){this.checked=this.currentChecked}updateForm(){const r=this.checked?this.value:null;this.setFormValue(r,r)}connectedCallback(){super.connectedCallback(),this.updateForm()}formResetCallback(){super.formResetCallback(),this.checked=!!this.checkedAttribute,this.dirtyChecked=!1}}return g({attribute:"checked",mode:"boolean"})(i.prototype,"checkedAttribute"),g({attribute:"current-checked",converter:Rs})(i.prototype,"currentChecked"),C(i.prototype,"defaultChecked"),C(i.prototype,"checked"),i}class Tn extends tt{}class Rn extends Ti(Tn){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let et=class extends Rn{constructor(){super(...arguments),this.handleClick=t=>{var i;this.disabled&&((i=this.defaultSlottedContent)===null||i===void 0?void 0:i.length)<=1&&t.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const t=this.proxy.isConnected;t||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),t||this.detachProxy()},this.handleFormReset=()=>{var t;(t=this.form)===null||t===void 0||t.reset()},this.handleUnsupportedDelegatesFocus=()=>{var t;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(!((t=this.$fastController.definition.shadowOptions)===null||t===void 0)&&t.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(t,i){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),i==="submit"&&this.addEventListener("click",this.handleSubmission),t==="submit"&&this.removeEventListener("click",this.handleSubmission),i==="reset"&&this.addEventListener("click",this.handleFormReset),t==="reset"&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var t;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const i=Array.from((t=this.control)===null||t===void 0?void 0:t.children);i&&i.forEach(s=>{s.addEventListener("click",this.handleClick)})}disconnectedCallback(){var t;super.disconnectedCallback();const i=Array.from((t=this.control)===null||t===void 0?void 0:t.children);i&&i.forEach(s=>{s.removeEventListener("click",this.handleClick)})}};p([g({mode:"boolean"})],et.prototype,"autofocus",void 0);p([g({attribute:"form"})],et.prototype,"formId",void 0);p([g],et.prototype,"formaction",void 0);p([g],et.prototype,"formenctype",void 0);p([g],et.prototype,"formmethod",void 0);p([g({mode:"boolean"})],et.prototype,"formnovalidate",void 0);p([g],et.prototype,"formtarget",void 0);p([g],et.prototype,"type",void 0);p([C],et.prototype,"defaultSlottedContent",void 0);class we{}p([g({attribute:"aria-expanded"})],we.prototype,"ariaExpanded",void 0);p([g({attribute:"aria-pressed"})],we.prototype,"ariaPressed",void 0);Os(we,V);Os(et,Jr,we);function ei(e){const t=e.parentElement;if(t)return t;{const i=e.getRootNode();if(i.host instanceof HTMLElement)return i.host}return null}function Dn(e,t){let i=t;for(;i!==null;){if(i===e)return!0;i=ei(i)}return!1}const ht=document.createElement("div");function Mn(e){return e instanceof ye}class Ri{setProperty(t,i){$.queueUpdate(()=>this.target.setProperty(t,i))}removeProperty(t){$.queueUpdate(()=>this.target.removeProperty(t))}}class Vn extends Ri{constructor(t){super();const i=new CSSStyleSheet;this.target=i.cssRules[i.insertRule(":host{}")].style,t.$fastController.addStyles(G.create([i]))}}class Ln extends Ri{constructor(){super();const t=new CSSStyleSheet;this.target=t.cssRules[t.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,t]}}class Nn extends Ri{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:t}=this.style;if(t){const i=t.insertRule(":root{}",t.cssRules.length);this.target=t.cssRules[i].style}}}class Hs{constructor(t){this.store=new Map,this.target=null;const i=t.$fastController;this.style=document.createElement("style"),i.addStyles(this.style),R.getNotifier(i).subscribe(this,"isConnected"),this.handleChange(i,"isConnected")}targetChanged(){if(this.target!==null)for(const[t,i]of this.store.entries())this.target.setProperty(t,i)}setProperty(t,i){this.store.set(t,i),$.queueUpdate(()=>{this.target!==null&&this.target.setProperty(t,i)})}removeProperty(t){this.store.delete(t),$.queueUpdate(()=>{this.target!==null&&this.target.removeProperty(t)})}handleChange(t,i){const{sheet:s}=this.style;if(s){const r=s.insertRule(":host{}",s.cssRules.length);this.target=s.cssRules[r].style}else this.target=null}}p([C],Hs.prototype,"target",void 0);class An{constructor(t){this.target=t.style}setProperty(t,i){$.queueUpdate(()=>this.target.setProperty(t,i))}removeProperty(t){$.queueUpdate(()=>this.target.removeProperty(t))}}class A{setProperty(t,i){A.properties[t]=i;for(const s of A.roots.values())St.getOrCreate(A.normalizeRoot(s)).setProperty(t,i)}removeProperty(t){delete A.properties[t];for(const i of A.roots.values())St.getOrCreate(A.normalizeRoot(i)).removeProperty(t)}static registerRoot(t){const{roots:i}=A;if(!i.has(t)){i.add(t);const s=St.getOrCreate(this.normalizeRoot(t));for(const r in A.properties)s.setProperty(r,A.properties[r])}}static unregisterRoot(t){const{roots:i}=A;if(i.has(t)){i.delete(t);const s=St.getOrCreate(A.normalizeRoot(t));for(const r in A.properties)s.removeProperty(r)}}static normalizeRoot(t){return t===ht?document:t}}A.roots=new Set;A.properties={};const Ue=new WeakMap,En=$.supportsAdoptedStyleSheets?Vn:Hs,St=Object.freeze({getOrCreate(e){if(Ue.has(e))return Ue.get(e);let t;return e===ht?t=new A:e instanceof Document?t=$.supportsAdoptedStyleSheets?new Ln:new Nn:Mn(e)?t=new En(e):t=new An(e),Ue.set(e,t),t}});class W extends ki{constructor(t){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=t.name,t.cssCustomPropertyName!==null&&(this.cssCustomProperty=`--${t.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=W.uniqueId(),W.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(t){return new W({name:typeof t=="string"?t:t.name,cssCustomPropertyName:typeof t=="string"?t:t.cssCustomPropertyName===void 0?t.name:t.cssCustomPropertyName})}static isCSSDesignToken(t){return typeof t.cssCustomProperty=="string"}static isDerivedDesignTokenValue(t){return typeof t=="function"}static getTokenById(t){return W.tokensById.get(t)}getOrCreateSubscriberSet(t=this){return this.subscribers.get(t)||this.subscribers.set(t,new Set)&&this.subscribers.get(t)}createCSS(){return this.cssVar||""}getValueFor(t){const i=D.getOrCreate(t).get(this);if(i!==void 0)return i;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${t} or an ancestor of ${t}.`)}setValueFor(t,i){return this._appliedTo.add(t),i instanceof W&&(i=this.alias(i)),D.getOrCreate(t).set(this,i),this}deleteValueFor(t){return this._appliedTo.delete(t),D.existsFor(t)&&D.getOrCreate(t).delete(this),this}withDefault(t){return this.setValueFor(ht,t),this}subscribe(t,i){const s=this.getOrCreateSubscriberSet(i);i&&!D.existsFor(i)&&D.getOrCreate(i),s.has(t)||s.add(t)}unsubscribe(t,i){const s=this.subscribers.get(i||this);s&&s.has(t)&&s.delete(t)}notify(t){const i=Object.freeze({token:this,target:t});this.subscribers.has(this)&&this.subscribers.get(this).forEach(s=>s.handleChange(i)),this.subscribers.has(t)&&this.subscribers.get(t).forEach(s=>s.handleChange(i))}alias(t){return i=>t.getValueFor(i)}}W.uniqueId=(()=>{let e=0;return()=>(e++,e.toString(16))})();W.tokensById=new Map;class In{startReflection(t,i){t.subscribe(this,i),this.handleChange({token:t,target:i})}stopReflection(t,i){t.unsubscribe(this,i),this.remove(t,i)}handleChange(t){const{token:i,target:s}=t;this.add(i,s)}add(t,i){St.getOrCreate(i).setProperty(t.cssCustomProperty,this.resolveCSSValue(D.getOrCreate(i).get(t)))}remove(t,i){St.getOrCreate(i).removeProperty(t.cssCustomProperty)}resolveCSSValue(t){return t&&typeof t.createCSS=="function"?t.createCSS():t}}class On{constructor(t,i,s){this.source=t,this.token=i,this.node=s,this.dependencies=new Set,this.observer=R.binding(t,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){this.node.store.set(this.token,this.observer.observe(this.node.target,qt))}}class Pn{constructor(){this.values=new Map}set(t,i){this.values.get(t)!==i&&(this.values.set(t,i),R.getNotifier(this).notify(t.id))}get(t){return R.track(this,t.id),this.values.get(t)}delete(t){this.values.delete(t)}all(){return this.values.entries()}}const Pt=new WeakMap,Bt=new WeakMap;class D{constructor(t){this.target=t,this.store=new Pn,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(i,s)=>{const r=W.getTokenById(s);if(r&&(r.notify(this.target),W.isCSSDesignToken(r))){const n=this.parent,a=this.isReflecting(r);if(n){const o=n.get(r),l=i.get(r);o!==l&&!a?this.reflectToCSS(r):o===l&&a&&this.stopReflectToCSS(r)}else a||this.reflectToCSS(r)}}},Pt.set(t,this),R.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),t instanceof ye?t.$fastController.addBehaviors([this]):t.isConnected&&this.bind()}static getOrCreate(t){return Pt.get(t)||new D(t)}static existsFor(t){return Pt.has(t)}static findParent(t){if(ht!==t.target){let i=ei(t.target);for(;i!==null;){if(Pt.has(i))return Pt.get(i);i=ei(i)}return D.getOrCreate(ht)}return null}static findClosestAssignedNode(t,i){let s=i;do{if(s.has(t))return s;s=s.parent?s.parent:s.target!==ht?D.getOrCreate(ht):null}while(s!==null);return null}get parent(){return Bt.get(this)||null}has(t){return this.assignedValues.has(t)}get(t){const i=this.store.get(t);if(i!==void 0)return i;const s=this.getRaw(t);if(s!==void 0)return this.hydrate(t,s),this.get(t)}getRaw(t){var i;return this.assignedValues.has(t)?this.assignedValues.get(t):(i=D.findClosestAssignedNode(t,this))===null||i===void 0?void 0:i.getRaw(t)}set(t,i){W.isDerivedDesignTokenValue(this.assignedValues.get(t))&&this.tearDownBindingObserver(t),this.assignedValues.set(t,i),W.isDerivedDesignTokenValue(i)?this.setupBindingObserver(t,i):this.store.set(t,i)}delete(t){this.assignedValues.delete(t),this.tearDownBindingObserver(t);const i=this.getRaw(t);i?this.hydrate(t,i):this.store.delete(t)}bind(){const t=D.findParent(this);t&&t.appendChild(this);for(const i of this.assignedValues.keys())i.notify(this.target)}unbind(){this.parent&&Bt.get(this).removeChild(this)}appendChild(t){t.parent&&Bt.get(t).removeChild(t);const i=this.children.filter(s=>t.contains(s));Bt.set(t,this),this.children.push(t),i.forEach(s=>t.appendChild(s)),R.getNotifier(this.store).subscribe(t);for(const[s,r]of this.store.all())t.hydrate(s,this.bindingObservers.has(s)?this.getRaw(s):r)}removeChild(t){const i=this.children.indexOf(t);return i!==-1&&this.children.splice(i,1),R.getNotifier(this.store).unsubscribe(t),t.parent===this?Bt.delete(t):!1}contains(t){return Dn(this.target,t.target)}reflectToCSS(t){this.isReflecting(t)||(this.reflecting.add(t),D.cssCustomPropertyReflector.startReflection(t,this.target))}stopReflectToCSS(t){this.isReflecting(t)&&(this.reflecting.delete(t),D.cssCustomPropertyReflector.stopReflection(t,this.target))}isReflecting(t){return this.reflecting.has(t)}handleChange(t,i){const s=W.getTokenById(i);s&&this.hydrate(s,this.getRaw(s))}hydrate(t,i){if(!this.has(t)){const s=this.bindingObservers.get(t);W.isDerivedDesignTokenValue(i)?s?s.source!==i&&(this.tearDownBindingObserver(t),this.setupBindingObserver(t,i)):this.setupBindingObserver(t,i):(s&&this.tearDownBindingObserver(t),this.store.set(t,i))}}setupBindingObserver(t,i){const s=new On(i,t,this);return this.bindingObservers.set(t,s),s}tearDownBindingObserver(t){return this.bindingObservers.has(t)?(this.bindingObservers.get(t).disconnect(),this.bindingObservers.delete(t),!0):!1}}D.cssCustomPropertyReflector=new In;p([C],D.prototype,"children",void 0);function Bn(e){return W.from(e)}const xe=Object.freeze({create:Bn,notifyConnection(e){return!e.isConnected||!D.existsFor(e)?!1:(D.getOrCreate(e).bind(),!0)},notifyDisconnection(e){return e.isConnected||!D.existsFor(e)?!1:(D.getOrCreate(e).unbind(),!0)},registerRoot(e=ht){A.registerRoot(e)},unregisterRoot(e=ht){A.unregisterRoot(e)}}),_e=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),Xe=new Map,le=new Map;let Ft=null;const Ht=T.createInterface(e=>e.cachedCallback(t=>(Ft===null&&(Ft=new js(null,t)),Ft))),zs=Object.freeze({tagFor(e){return le.get(e)},responsibleFor(e){const t=e.$$designSystem$$;return t||T.findResponsibleContainer(e).get(Ht)},getOrCreate(e){if(!e)return Ft===null&&(Ft=T.getOrCreateDOMContainer().get(Ht)),Ft;const t=e.$$designSystem$$;if(t)return t;const i=T.getOrCreateDOMContainer(e);if(i.has(Ht,!1))return i.get(Ht);{const s=new js(e,i);return i.register(Xt.instance(Ht,s)),s}}});function Hn(e,t,i){return typeof e=="string"?{name:e,type:t,callback:i}:e}class js{constructor(t,i){this.owner=t,this.container=i,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>_e.definitionCallbackOnly,t!==null&&(t.$$designSystem$$=this)}withPrefix(t){return this.prefix=t,this}withShadowRootMode(t){return this.shadowRootMode=t,this}withElementDisambiguation(t){return this.disambiguate=t,this}withDesignTokenRoot(t){return this.designTokenRoot=t,this}register(...t){const i=this.container,s=[],r=this.disambiguate,n=this.shadowRootMode,a={elementPrefix:this.prefix,tryDefineElement(o,l,c){const u=Hn(o,l,c),{name:f,callback:v,baseClass:k}=u;let{type:w}=u,y=f,j=Xe.get(y),yt=!0;for(;j;){const lt=r(y,w,j);switch(lt){case _e.ignoreDuplicate:return;case _e.definitionCallbackOnly:yt=!1,j=void 0;break;default:y=lt,j=Xe.get(y);break}}yt&&((le.has(w)||w===tt)&&(w=class extends w{}),Xe.set(y,w),le.set(w,y),k&&le.set(k,y)),s.push(new zn(i,y,w,n,v,yt))}};this.designTokensInitialized||(this.designTokensInitialized=!0,this.designTokenRoot!==null&&xe.registerRoot(this.designTokenRoot)),i.registerWithContext(a,...t);for(const o of s)o.callback(o),o.willDefine&&o.definition!==null&&o.definition.define();return this}}class zn{constructor(t,i,s,r,n,a){this.container=t,this.name=i,this.type=s,this.shadowRootMode=r,this.callback=n,this.willDefine=a,this.definition=null}definePresentation(t){Is.define(this.name,t,this.container)}defineElement(t){this.definition=new me(this.type,Object.assign(Object.assign({},t),{name:this.name}))}tagFor(t){return zs.tagFor(t)}}const jn=(e,t)=>K`
    <div class="positioning-region" part="positioning-region">
        ${Ls(i=>i.modal,K`
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
*/var Wn=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],qn=Wn.join(","),Ws=typeof Element>"u",fe=Ws?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,ii=!Ws&&Element.prototype.getRootNode?function(e){return e.getRootNode()}:function(e){return e.ownerDocument},Gn=function(t,i){return t.tabIndex<0&&(i||/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName)||t.isContentEditable)&&isNaN(parseInt(t.getAttribute("tabindex"),10))?0:t.tabIndex},qs=function(t){return t.tagName==="INPUT"},Un=function(t){return qs(t)&&t.type==="hidden"},_n=function(t){var i=t.tagName==="DETAILS"&&Array.prototype.slice.apply(t.children).some(function(s){return s.tagName==="SUMMARY"});return i},Xn=function(t,i){for(var s=0;s<t.length;s++)if(t[s].checked&&t[s].form===i)return t[s]},Yn=function(t){if(!t.name)return!0;var i=t.form||ii(t),s=function(o){return i.querySelectorAll('input[type="radio"][name="'+o+'"]')},r;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")r=s(window.CSS.escape(t.name));else try{r=s(t.name)}catch(a){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",a.message),!1}var n=Xn(r,t.form);return!n||n===t},Qn=function(t){return qs(t)&&t.type==="radio"},Zn=function(t){return Qn(t)&&!Yn(t)},rs=function(t){var i=t.getBoundingClientRect(),s=i.width,r=i.height;return s===0&&r===0},Jn=function(t,i){var s=i.displayCheck,r=i.getShadowRoot;if(getComputedStyle(t).visibility==="hidden")return!0;var n=fe.call(t,"details>summary:first-of-type"),a=n?t.parentElement:t;if(fe.call(a,"details:not([open]) *"))return!0;var o=ii(t).host,l=(o==null?void 0:o.ownerDocument.contains(o))||t.ownerDocument.contains(t);if(!s||s==="full"){if(typeof r=="function"){for(var c=t;t;){var u=t.parentElement,f=ii(t);if(u&&!u.shadowRoot&&r(u)===!0)return rs(t);t.assignedSlot?t=t.assignedSlot:!u&&f!==t.ownerDocument?t=f.host:t=u}t=c}if(l)return!t.getClientRects().length}else if(s==="non-zero-area")return rs(t);return!1},Kn=function(t){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))for(var i=t.parentElement;i;){if(i.tagName==="FIELDSET"&&i.disabled){for(var s=0;s<i.children.length;s++){var r=i.children.item(s);if(r.tagName==="LEGEND")return fe.call(i,"fieldset[disabled] *")?!0:!r.contains(t)}return!0}i=i.parentElement}return!1},to=function(t,i){return!(i.disabled||Un(i)||Jn(i,t)||_n(i)||Kn(i))},eo=function(t,i){return!(Zn(i)||Gn(i)<0||!to(t,i))},ns=function(t,i){if(i=i||{},!t)throw new Error("No node provided");return fe.call(t,qn)===!1?!1:eo(i,t)};class J extends tt{constructor(){super(...arguments),this.modal=!0,this.hidden=!1,this.trapFocus=!0,this.trapFocusChanged=()=>{this.$fastController.isConnected&&this.updateTrapFocus()},this.isTrappingFocus=!1,this.handleDocumentKeydown=t=>{if(!t.defaultPrevented&&!this.hidden)switch(t.key){case mn:this.dismiss(),t.preventDefault();break;case $n:this.handleTabKeyDown(t);break}},this.handleDocumentFocus=t=>{!t.defaultPrevented&&this.shouldForceFocus(t.target)&&(this.focusFirstElement(),t.preventDefault())},this.handleTabKeyDown=t=>{if(!this.trapFocus||this.hidden)return;const i=this.getTabQueueBounds();if(i.length!==0){if(i.length===1){i[0].focus(),t.preventDefault();return}t.shiftKey&&t.target===i[0]?(i[i.length-1].focus(),t.preventDefault()):!t.shiftKey&&t.target===i[i.length-1]&&(i[0].focus(),t.preventDefault())}},this.getTabQueueBounds=()=>{const t=[];return J.reduceTabbableItems(t,this)},this.focusFirstElement=()=>{const t=this.getTabQueueBounds();t.length>0?t[0].focus():this.dialog instanceof HTMLElement&&this.dialog.focus()},this.shouldForceFocus=t=>this.isTrappingFocus&&!this.contains(t),this.shouldTrapFocus=()=>this.trapFocus&&!this.hidden,this.updateTrapFocus=t=>{const i=t===void 0?this.shouldTrapFocus():t;i&&!this.isTrappingFocus?(this.isTrappingFocus=!0,document.addEventListener("focusin",this.handleDocumentFocus),$.queueUpdate(()=>{this.shouldForceFocus(document.activeElement)&&this.focusFirstElement()})):!i&&this.isTrappingFocus&&(this.isTrappingFocus=!1,document.removeEventListener("focusin",this.handleDocumentFocus))}}dismiss(){this.$emit("dismiss"),this.$emit("cancel")}show(){this.hidden=!1}hide(){this.hidden=!0,this.$emit("close")}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleDocumentKeydown),this.notifier=R.getNotifier(this),this.notifier.subscribe(this,"hidden"),this.updateTrapFocus()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeydown),this.updateTrapFocus(!1),this.notifier.unsubscribe(this,"hidden")}handleChange(t,i){switch(i){case"hidden":this.updateTrapFocus();break}}static reduceTabbableItems(t,i){return i.getAttribute("tabindex")==="-1"?t:ns(i)||J.isFocusableFastElement(i)&&J.hasTabbableShadow(i)?(t.push(i),t):i.childElementCount?t.concat(Array.from(i.children).reduce(J.reduceTabbableItems,[])):t}static isFocusableFastElement(t){var i,s;return!!(!((s=(i=t.$fastController)===null||i===void 0?void 0:i.definition.shadowOptions)===null||s===void 0)&&s.delegatesFocus)}static hasTabbableShadow(t){var i,s;return Array.from((s=(i=t.shadowRoot)===null||i===void 0?void 0:i.querySelectorAll("*"))!==null&&s!==void 0?s:[]).some(r=>ns(r))}}p([g({mode:"boolean"})],J.prototype,"modal",void 0);p([g({mode:"boolean"})],J.prototype,"hidden",void 0);p([g({attribute:"trap-focus",mode:"boolean"})],J.prototype,"trapFocus",void 0);p([g({attribute:"aria-describedby"})],J.prototype,"ariaDescribedby",void 0);p([g({attribute:"aria-labelledby"})],J.prototype,"ariaLabelledby",void 0);p([g({attribute:"aria-label"})],J.prototype,"ariaLabel",void 0);const io=(e,t)=>K`
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
            class="positioning-region ${i=>i.orientation===B.horizontal?"horizontal":"vertical"}"
            part="positioning-region"
        >
            <slot
                ${Si({property:"slottedRadioButtons",filter:Yr("[role=radio]")})}
            ></slot>
        </div>
    </template>
`;class vt extends tt{constructor(){super(...arguments),this.orientation=B.horizontal,this.radioChangeHandler=t=>{const i=t.target;i.checked&&(this.slottedRadioButtons.forEach(s=>{s!==i&&(s.checked=!1,this.isInsideFoundationToolbar||s.setAttribute("tabindex","-1"))}),this.selectedRadio=i,this.value=i.value,i.setAttribute("tabindex","0"),this.focusedRadio=i),t.stopPropagation()},this.moveToRadioByIndex=(t,i)=>{const s=t[i];this.isInsideToolbar||(s.setAttribute("tabindex","0"),s.readOnly?this.slottedRadioButtons.forEach(r=>{r!==s&&r.setAttribute("tabindex","-1")}):(s.checked=!0,this.selectedRadio=s)),this.focusedRadio=s,s.focus()},this.moveRightOffGroup=()=>{var t;(t=this.nextElementSibling)===null||t===void 0||t.focus()},this.moveLeftOffGroup=()=>{var t;(t=this.previousElementSibling)===null||t===void 0||t.focus()},this.focusOutHandler=t=>{const i=this.slottedRadioButtons,s=t.target,r=s!==null?i.indexOf(s):0,n=this.focusedRadio?i.indexOf(this.focusedRadio):-1;return(n===0&&r===n||n===i.length-1&&n===r)&&(this.selectedRadio?(this.focusedRadio=this.selectedRadio,this.isInsideFoundationToolbar||(this.selectedRadio.setAttribute("tabindex","0"),i.forEach(a=>{a!==this.selectedRadio&&a.setAttribute("tabindex","-1")}))):(this.focusedRadio=i[0],this.focusedRadio.setAttribute("tabindex","0"),i.forEach(a=>{a!==this.focusedRadio&&a.setAttribute("tabindex","-1")}))),!0},this.clickHandler=t=>{const i=t.target;if(i){const s=this.slottedRadioButtons;i.checked||s.indexOf(i)===0?(i.setAttribute("tabindex","0"),this.selectedRadio=i):(i.setAttribute("tabindex","-1"),this.selectedRadio=null),this.focusedRadio=i}t.preventDefault()},this.shouldMoveOffGroupToTheRight=(t,i,s)=>t===i.length&&this.isInsideToolbar&&s===de,this.shouldMoveOffGroupToTheLeft=(t,i)=>(this.focusedRadio?t.indexOf(this.focusedRadio)-1:0)<0&&this.isInsideToolbar&&i===ue,this.checkFocusedRadio=()=>{this.focusedRadio!==null&&!this.focusedRadio.readOnly&&!this.focusedRadio.checked&&(this.focusedRadio.checked=!0,this.focusedRadio.setAttribute("tabindex","0"),this.focusedRadio.focus(),this.selectedRadio=this.focusedRadio)},this.moveRight=t=>{const i=this.slottedRadioButtons;let s=0;if(s=this.focusedRadio?i.indexOf(this.focusedRadio)+1:1,this.shouldMoveOffGroupToTheRight(s,i,t.key)){this.moveRightOffGroup();return}else s===i.length&&(s=0);for(;s<i.length&&i.length>1;)if(i[s].disabled){if(this.focusedRadio&&s===i.indexOf(this.focusedRadio))break;if(s+1>=i.length){if(this.isInsideToolbar)break;s=0}else s+=1}else{this.moveToRadioByIndex(i,s);break}},this.moveLeft=t=>{const i=this.slottedRadioButtons;let s=0;if(s=this.focusedRadio?i.indexOf(this.focusedRadio)-1:0,s=s<0?i.length-1:s,this.shouldMoveOffGroupToTheLeft(i,t.key)){this.moveLeftOffGroup();return}for(;s>=0&&i.length>1;)if(i[s].disabled){if(this.focusedRadio&&s===i.indexOf(this.focusedRadio))break;s-1<0?s=i.length-1:s-=1}else{this.moveToRadioByIndex(i,s);break}},this.keydownHandler=t=>{const i=t.key;if(i in kn&&this.isInsideFoundationToolbar)return!0;switch(i){case Ps:{this.checkFocusedRadio();break}case de:case Ci:{this.direction===I.ltr?this.moveRight(t):this.moveLeft(t);break}case ue:case Fi:{this.direction===I.ltr?this.moveLeft(t):this.moveRight(t);break}default:return!0}}}readOnlyChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(t=>{this.readOnly?t.readOnly=!0:t.readOnly=!1})}disabledChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(t=>{this.disabled?t.disabled=!0:t.disabled=!1})}nameChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(t=>{t.setAttribute("name",this.name)})}valueChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(t=>{t.value===this.value&&(t.checked=!0,this.selectedRadio=t)}),this.$emit("change")}slottedRadioButtonsChanged(t,i){this.slottedRadioButtons&&this.slottedRadioButtons.length>0&&this.setupRadioButtons()}get parentToolbar(){return this.closest('[role="toolbar"]')}get isInsideToolbar(){var t;return(t=this.parentToolbar)!==null&&t!==void 0?t:!1}get isInsideFoundationToolbar(){var t;return!!(!((t=this.parentToolbar)===null||t===void 0)&&t.$fastController)}connectedCallback(){super.connectedCallback(),this.direction=Bs(this),this.setupRadioButtons()}disconnectedCallback(){this.slottedRadioButtons.forEach(t=>{t.removeEventListener("change",this.radioChangeHandler)})}setupRadioButtons(){const t=this.slottedRadioButtons.filter(r=>r.hasAttribute("checked")),i=t?t.length:0;if(i>1){const r=t[i-1];r.checked=!0}let s=!1;if(this.slottedRadioButtons.forEach(r=>{this.name!==void 0&&r.setAttribute("name",this.name),this.disabled&&(r.disabled=!0),this.readOnly&&(r.readOnly=!0),this.value&&this.value===r.value?(this.selectedRadio=r,this.focusedRadio=r,r.checked=!0,r.setAttribute("tabindex","0"),s=!0):(this.isInsideFoundationToolbar||r.setAttribute("tabindex","-1"),r.checked=!1),r.addEventListener("change",this.radioChangeHandler)}),this.value===void 0&&this.slottedRadioButtons.length>0){const r=this.slottedRadioButtons.filter(a=>a.hasAttribute("checked")),n=r!==null?r.length:0;if(n>0&&!s){const a=r[n-1];a.checked=!0,this.focusedRadio=a,a.setAttribute("tabindex","0")}else this.slottedRadioButtons[0].setAttribute("tabindex","0"),this.focusedRadio=this.slottedRadioButtons[0]}}}p([g({attribute:"readonly",mode:"boolean"})],vt.prototype,"readOnly",void 0);p([g({attribute:"disabled",mode:"boolean"})],vt.prototype,"disabled",void 0);p([g],vt.prototype,"name",void 0);p([g],vt.prototype,"value",void 0);p([g],vt.prototype,"orientation",void 0);p([C],vt.prototype,"childItems",void 0);p([C],vt.prototype,"slottedRadioButtons",void 0);const so=(e,t)=>K`
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
            <slot ${Si("defaultSlottedNodes")}></slot>
        </label>
    </template>
`;class ro extends tt{}class no extends Fn(ro){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class $e extends no{constructor(){super(),this.initialValue="on",this.keypressHandler=t=>{switch(t.key){case xn:!this.checked&&!this.readOnly&&(this.checked=!0);return}return!0},this.proxy.setAttribute("type","radio")}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}defaultCheckedChanged(){var t;this.$fastController.isConnected&&!this.dirtyChecked&&(this.isInsideRadioGroup()||(this.checked=(t=this.defaultChecked)!==null&&t!==void 0?t:!1,this.dirtyChecked=!1))}connectedCallback(){var t,i;super.connectedCallback(),this.validate(),((t=this.parentElement)===null||t===void 0?void 0:t.getAttribute("role"))!=="radiogroup"&&this.getAttribute("tabindex")===null&&(this.disabled||this.setAttribute("tabindex","0")),this.checkedAttribute&&(this.dirtyChecked||this.isInsideRadioGroup()||(this.checked=(i=this.defaultChecked)!==null&&i!==void 0?i:!1,this.dirtyChecked=!1))}isInsideRadioGroup(){return this.closest("[role=radiogroup]")!==null}clickHandler(t){!this.disabled&&!this.readOnly&&!this.checked&&(this.checked=!0)}}p([g({attribute:"readonly",mode:"boolean"})],$e.prototype,"readOnly",void 0);p([C],$e.prototype,"name",void 0);p([C],$e.prototype,"defaultSlottedNodes",void 0);const oo=(e,t)=>K`
    <template
        aria-disabled="${i=>i.disabled}"
        class="${i=>i.sliderOrientation||B.horizontal}
            ${i=>i.disabled?"disabled":""}"
    >
        <div ${Y("root")} part="root" class="root" style="${i=>i.positionStyle}">
            <div class="container">
                ${Ls(i=>!i.hideMark,K`
                        <div class="mark"></div>
                    `)}
                <div class="label">
                    <slot></slot>
                </div>
            </div>
        </div>
    </template>
`;function si(e,t,i,s){let r=Sn(0,1,(e-t)/(i-t));return s===I.rtl&&(r=1-r),r}const ne={min:0,max:0,direction:I.ltr,orientation:B.horizontal,disabled:!1};let at=class extends tt{constructor(){super(...arguments),this.hideMark=!1,this.sliderDirection=I.ltr,this.getSliderConfiguration=()=>{if(!this.isSliderConfig(this.parentNode))this.sliderDirection=ne.direction||I.ltr,this.sliderOrientation=ne.orientation,this.sliderMaxPosition=ne.max,this.sliderMinPosition=ne.min;else{const t=this.parentNode,{min:i,max:s,direction:r,orientation:n,disabled:a}=t;a!==void 0&&(this.disabled=a),this.sliderDirection=r||I.ltr,this.sliderOrientation=n||B.horizontal,this.sliderMaxPosition=s,this.sliderMinPosition=i}},this.positionAsStyle=()=>{const t=this.sliderDirection?this.sliderDirection:I.ltr,i=si(Number(this.position),Number(this.sliderMinPosition),Number(this.sliderMaxPosition));let s=Math.round((1-i)*100),r=Math.round(i*100);return Number.isNaN(r)&&Number.isNaN(s)&&(s=50,r=50),this.sliderOrientation===B.horizontal?t===I.rtl?`right: ${r}%; left: ${s}%;`:`left: ${r}%; right: ${s}%;`:`top: ${r}%; bottom: ${s}%;`}}positionChanged(){this.positionStyle=this.positionAsStyle()}sliderOrientationChanged(){}connectedCallback(){super.connectedCallback(),this.getSliderConfiguration(),this.positionStyle=this.positionAsStyle(),this.notifier=R.getNotifier(this.parentNode),this.notifier.subscribe(this,"orientation"),this.notifier.subscribe(this,"direction"),this.notifier.subscribe(this,"max"),this.notifier.subscribe(this,"min")}disconnectedCallback(){super.disconnectedCallback(),this.notifier.unsubscribe(this,"orientation"),this.notifier.unsubscribe(this,"direction"),this.notifier.unsubscribe(this,"max"),this.notifier.unsubscribe(this,"min")}handleChange(t,i){switch(i){case"direction":this.sliderDirection=t.direction;break;case"orientation":this.sliderOrientation=t.orientation;break;case"max":this.sliderMaxPosition=t.max;break;case"min":this.sliderMinPosition=t.min;break}this.positionStyle=this.positionAsStyle()}isSliderConfig(t){return t.max!==void 0&&t.min!==void 0}};p([C],at.prototype,"positionStyle",void 0);p([g],at.prototype,"position",void 0);p([g({attribute:"hide-mark",mode:"boolean"})],at.prototype,"hideMark",void 0);p([g({attribute:"disabled",mode:"boolean"})],at.prototype,"disabled",void 0);p([C],at.prototype,"sliderOrientation",void 0);p([C],at.prototype,"sliderMinPosition",void 0);p([C],at.prototype,"sliderMaxPosition",void 0);p([C],at.prototype,"sliderDirection",void 0);const ao=(e,t)=>K`
    <template
        role="slider"
        class="${i=>i.readOnly?"readonly":""}
        ${i=>i.orientation||B.horizontal}"
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
`;class lo extends tt{}class co extends Ti(lo){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const ho={singleValue:"single-value"};class z extends co{constructor(){super(...arguments),this.direction=I.ltr,this.isDragging=!1,this.trackWidth=0,this.trackMinWidth=0,this.trackHeight=0,this.trackLeft=0,this.trackMinHeight=0,this.valueTextFormatter=()=>null,this.min=0,this.max=10,this.step=1,this.orientation=B.horizontal,this.mode=ho.singleValue,this.keypressHandler=t=>{if(!this.readOnly){if(t.key===yn)t.preventDefault(),this.value=`${this.min}`;else if(t.key===wn)t.preventDefault(),this.value=`${this.max}`;else if(!t.shiftKey)switch(t.key){case de:case Fi:t.preventDefault(),this.increment();break;case ue:case Ci:t.preventDefault(),this.decrement();break}}},this.setupTrackConstraints=()=>{const t=this.track.getBoundingClientRect();this.trackWidth=this.track.clientWidth,this.trackMinWidth=this.track.clientLeft,this.trackHeight=t.bottom,this.trackMinHeight=t.top,this.trackLeft=this.getBoundingClientRect().left,this.trackWidth===0&&(this.trackWidth=1)},this.setupListeners=(t=!1)=>{const i=`${t?"remove":"add"}EventListener`;this[i]("keydown",this.keypressHandler),this[i]("mousedown",this.handleMouseDown),this.thumb[i]("mousedown",this.handleThumbMouseDown,{passive:!0}),this.thumb[i]("touchstart",this.handleThumbMouseDown,{passive:!0}),t&&(this.handleMouseDown(null),this.handleThumbMouseDown(null))},this.initialValue="",this.handleThumbMouseDown=t=>{if(t){if(this.readOnly||this.disabled||t.defaultPrevented)return;t.target.focus()}const i=`${t!==null?"add":"remove"}EventListener`;window[i]("mouseup",this.handleWindowMouseUp),window[i]("mousemove",this.handleMouseMove,{passive:!0}),window[i]("touchmove",this.handleMouseMove,{passive:!0}),window[i]("touchend",this.handleWindowMouseUp),this.isDragging=t!==null},this.handleMouseMove=t=>{if(this.readOnly||this.disabled||t.defaultPrevented)return;const i=window.TouchEvent&&t instanceof TouchEvent?t.touches[0]:t,s=this.orientation===B.horizontal?i.pageX-document.documentElement.scrollLeft-this.trackLeft:i.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(s)}`},this.calculateNewValue=t=>{const i=si(t,this.orientation===B.horizontal?this.trackMinWidth:this.trackMinHeight,this.orientation===B.horizontal?this.trackWidth:this.trackHeight,this.direction),s=(this.max-this.min)*i+this.min;return this.convertToConstrainedValue(s)},this.handleWindowMouseUp=t=>{this.stopDragging()},this.stopDragging=()=>{this.isDragging=!1,this.handleMouseDown(null),this.handleThumbMouseDown(null)},this.handleMouseDown=t=>{const i=`${t!==null?"add":"remove"}EventListener`;if((t===null||!this.disabled&&!this.readOnly)&&(window[i]("mouseup",this.handleWindowMouseUp),window.document[i]("mouseleave",this.handleWindowMouseUp),window[i]("mousemove",this.handleMouseMove),t)){t.preventDefault(),this.setupTrackConstraints(),t.target.focus();const s=this.orientation===B.horizontal?t.pageX-document.documentElement.scrollLeft-this.trackLeft:t.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(s)}`}},this.convertToConstrainedValue=t=>{isNaN(t)&&(t=this.min);let i=t-this.min;const s=Math.round(i/this.step),r=i-s*(this.stepMultiplier*this.step)/this.stepMultiplier;return i=r>=Number(this.step)/2?i-r+Number(this.step):i-r,i+this.min}}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}get valueAsNumber(){return parseFloat(super.value)}set valueAsNumber(t){this.value=t.toString()}valueChanged(t,i){super.valueChanged(t,i),this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction),this.$emit("change")}minChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.min=`${this.min}`),this.validate()}maxChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.max=`${this.max}`),this.validate()}stepChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.step=`${this.step}`),this.updateStepMultiplier(),this.validate()}orientationChanged(){this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type","range"),this.direction=Bs(this),this.updateStepMultiplier(),this.setupTrackConstraints(),this.setupListeners(),this.setupDefaultValue(),this.setThumbPositionForOrientation(this.direction)}disconnectedCallback(){this.setupListeners(!0)}increment(){const t=this.direction!==I.rtl&&this.orientation!==B.vertical?Number(this.value)+Number(this.step):Number(this.value)-Number(this.step),i=this.convertToConstrainedValue(t),s=i<Number(this.max)?`${i}`:`${this.max}`;this.value=s}decrement(){const t=this.direction!==I.rtl&&this.orientation!==B.vertical?Number(this.value)-Number(this.step):Number(this.value)+Number(this.step),i=this.convertToConstrainedValue(t),s=i>Number(this.min)?`${i}`:`${this.min}`;this.value=s}setThumbPositionForOrientation(t){const s=(1-si(Number(this.value),Number(this.min),Number(this.max),t))*100;this.orientation===B.horizontal?this.position=this.isDragging?`right: ${s}%; transition: none;`:`right: ${s}%; transition: all 0.2s ease;`:this.position=this.isDragging?`bottom: ${s}%; transition: none;`:`bottom: ${s}%; transition: all 0.2s ease;`}updateStepMultiplier(){const t=this.step+"",i=this.step%1?t.length-t.indexOf(".")-1:0;this.stepMultiplier=Math.pow(10,i)}get midpoint(){return`${this.convertToConstrainedValue((this.max+this.min)/2)}`}setupDefaultValue(){if(typeof this.value=="string")if(this.value.length===0)this.initialValue=this.midpoint;else{const t=parseFloat(this.value);!Number.isNaN(t)&&(t<this.min||t>this.max)&&(this.value=this.midpoint)}}}p([g({attribute:"readonly",mode:"boolean"})],z.prototype,"readOnly",void 0);p([C],z.prototype,"direction",void 0);p([C],z.prototype,"isDragging",void 0);p([C],z.prototype,"position",void 0);p([C],z.prototype,"trackWidth",void 0);p([C],z.prototype,"trackMinWidth",void 0);p([C],z.prototype,"trackHeight",void 0);p([C],z.prototype,"trackLeft",void 0);p([C],z.prototype,"trackMinHeight",void 0);p([C],z.prototype,"valueTextFormatter",void 0);p([g({converter:xi})],z.prototype,"min",void 0);p([g({converter:xi})],z.prototype,"max",void 0);p([g({converter:xi})],z.prototype,"step",void 0);p([g],z.prototype,"orientation",void 0);p([g],z.prototype,"mode",void 0);class uo{constructor(t){this.listenerCache=new WeakMap,this.query=t}bind(t){const{query:i}=this,s=this.constructListener(t);s.bind(i)(),i.addListener(s),this.listenerCache.set(t,s)}unbind(t){const i=this.listenerCache.get(t);i&&(this.query.removeListener(i),this.listenerCache.delete(t))}}class Kt extends uo{constructor(t,i){super(t),this.styles=i}static with(t){return i=>new Kt(t,i)}constructListener(t){let i=!1;const s=this.styles;return function(){const{matches:n}=this;n&&!i?(t.$fastController.addStyles(s),i=n):!n&&i&&(t.$fastController.removeStyles(s),i=n)}}unbind(t){super.unbind(t),t.$fastController.removeStyles(this.styles)}}const U=Kt.with(window.matchMedia("(forced-colors)"));Kt.with(window.matchMedia("(prefers-color-scheme: dark)"));Kt.with(window.matchMedia("(prefers-color-scheme: light)"));class fo{constructor(t,i,s){this.propertyName=t,this.value=i,this.styles=s}bind(t){R.getNotifier(t).subscribe(this,this.propertyName),this.handleChange(t,this.propertyName)}unbind(t){R.getNotifier(t).unsubscribe(this,this.propertyName),t.$fastController.removeStyles(this.styles)}handleChange(t,i){t[i]===this.value?t.$fastController.addStyles(this.styles):t.$fastController.removeStyles(this.styles)}}const pe="not-allowed",po=":host([hidden]){display:none}";function te(e){return`${po}:host{display:${e}}`}const S=vn()?"focus-visible":"focus";function ct(e,t,i){return isNaN(e)||e<=t?t:e>=i?i:e}function Ye(e,t,i){return isNaN(e)||e<=t?0:e>=i?1:e/(i-t)}function xt(e,t,i){return isNaN(e)?t:t+e*(i-t)}function os(e){return e*(Math.PI/180)}function go(e){return e*(180/Math.PI)}function bo(e){const t=Math.round(ct(e,0,255)).toString(16);return t.length===1?"0"+t:t}function H(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:t+e*(i-t)}function Di(e,t,i){if(e<=0)return t%360;if(e>=1)return i%360;const s=(t-i+360)%360,r=(i-t+360)%360;return s<=r?(t-s*e+360)%360:(t+s*e+360)%360}function N(e,t){const i=Math.pow(10,t);return Math.round(e*i)/i}class $t{constructor(t,i,s){this.h=t,this.s=i,this.l=s}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.l)?new $t(t.h,t.s,t.l):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.l===t.l}roundToPrecision(t){return new $t(N(this.h,t),N(this.s,t),N(this.l,t))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class Yt{constructor(t,i,s){this.h=t,this.s=i,this.v=s}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.v)?new Yt(t.h,t.s,t.v):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.v===t.v}roundToPrecision(t){return new Yt(N(this.h,t),N(this.s,t),N(this.v,t))}toObject(){return{h:this.h,s:this.s,v:this.v}}}class E{constructor(t,i,s){this.l=t,this.a=i,this.b=s}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.a)&&!isNaN(t.b)?new E(t.l,t.a,t.b):null}equalValue(t){return this.l===t.l&&this.a===t.a&&this.b===t.b}roundToPrecision(t){return new E(N(this.l,t),N(this.a,t),N(this.b,t))}toObject(){return{l:this.l,a:this.a,b:this.b}}}E.epsilon=216/24389;E.kappa=24389/27;class Tt{constructor(t,i,s){this.l=t,this.c=i,this.h=s}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.c)&&!isNaN(t.h)?new Tt(t.l,t.c,t.h):null}equalValue(t){return this.l===t.l&&this.c===t.c&&this.h===t.h}roundToPrecision(t){return new Tt(N(this.l,t),N(this.c,t),N(this.h,t))}toObject(){return{l:this.l,c:this.c,h:this.h}}}class M{constructor(t,i,s,r){this.r=t,this.g=i,this.b=s,this.a=typeof r=="number"&&!isNaN(r)?r:1}static fromObject(t){return t&&!isNaN(t.r)&&!isNaN(t.g)&&!isNaN(t.b)?new M(t.r,t.g,t.b,t.a):null}equalValue(t){return this.r===t.r&&this.g===t.g&&this.b===t.b&&this.a===t.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(xt(this.r,0,255))},${Math.round(xt(this.g,0,255))},${Math.round(xt(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(xt(this.r,0,255))},${Math.round(xt(this.g,0,255))},${Math.round(xt(this.b,0,255))},${ct(this.a,0,1)})`}roundToPrecision(t){return new M(N(this.r,t),N(this.g,t),N(this.b,t),N(this.a,t))}clamp(){return new M(ct(this.r,0,1),ct(this.g,0,1),ct(this.b,0,1),ct(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(t){return bo(xt(t,0,255))}}class _{constructor(t,i,s){this.x=t,this.y=i,this.z=s}static fromObject(t){return t&&!isNaN(t.x)&&!isNaN(t.y)&&!isNaN(t.z)?new _(t.x,t.y,t.z):null}equalValue(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}roundToPrecision(t){return new _(N(this.x,t),N(this.y,t),N(this.z,t))}toObject(){return{x:this.x,y:this.y,z:this.z}}}_.whitePoint=new _(.95047,1,1.08883);function ri(e){return e.r*.2126+e.g*.7152+e.b*.0722}function ni(e){function t(i){return i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4)}return ri(new M(t(e.r),t(e.g),t(e.b),1))}const as=(e,t)=>(e+.05)/(t+.05);function ls(e,t){const i=ni(e),s=ni(t);return i>s?as(i,s):as(s,i)}function Qt(e){const t=Math.max(e.r,e.g,e.b),i=Math.min(e.r,e.g,e.b),s=t-i;let r=0;s!==0&&(t===e.r?r=60*((e.g-e.b)/s%6):t===e.g?r=60*((e.b-e.r)/s+2):r=60*((e.r-e.g)/s+4)),r<0&&(r+=360);const n=(t+i)/2;let a=0;return s!==0&&(a=s/(1-Math.abs(2*n-1))),new $t(r,a,n)}function oi(e,t=1){const i=(1-Math.abs(2*e.l-1))*e.s,s=i*(1-Math.abs(e.h/60%2-1)),r=e.l-i/2;let n=0,a=0,o=0;return e.h<60?(n=i,a=s,o=0):e.h<120?(n=s,a=i,o=0):e.h<180?(n=0,a=i,o=s):e.h<240?(n=0,a=s,o=i):e.h<300?(n=s,a=0,o=i):e.h<360&&(n=i,a=0,o=s),new M(n+r,a+r,o+r,t)}function cs(e){const t=Math.max(e.r,e.g,e.b),i=Math.min(e.r,e.g,e.b),s=t-i;let r=0;s!==0&&(t===e.r?r=60*((e.g-e.b)/s%6):t===e.g?r=60*((e.b-e.r)/s+2):r=60*((e.r-e.g)/s+4)),r<0&&(r+=360);let n=0;return t!==0&&(n=s/t),new Yt(r,n,t)}function vo(e,t=1){const i=e.s*e.v,s=i*(1-Math.abs(e.h/60%2-1)),r=e.v-i;let n=0,a=0,o=0;return e.h<60?(n=i,a=s,o=0):e.h<120?(n=s,a=i,o=0):e.h<180?(n=0,a=i,o=s):e.h<240?(n=0,a=s,o=i):e.h<300?(n=s,a=0,o=i):e.h<360&&(n=i,a=0,o=s),new M(n+r,a+r,o+r,t)}function mo(e){let t=0,i=0;return e.h!==0&&(t=Math.cos(os(e.h))*e.c,i=Math.sin(os(e.h))*e.c),new E(e.l,t,i)}function yo(e){let t=0;(Math.abs(e.b)>.001||Math.abs(e.a)>.001)&&(t=go(Math.atan2(e.b,e.a))),t<0&&(t+=360);const i=Math.sqrt(e.a*e.a+e.b*e.b);return new Tt(e.l,i,t)}function wo(e){const t=(e.l+16)/116,i=t+e.a/500,s=t-e.b/200,r=Math.pow(i,3),n=Math.pow(t,3),a=Math.pow(s,3);let o=0;r>E.epsilon?o=r:o=(116*i-16)/E.kappa;let l=0;e.l>E.epsilon*E.kappa?l=n:l=e.l/E.kappa;let c=0;return a>E.epsilon?c=a:c=(116*s-16)/E.kappa,o=_.whitePoint.x*o,l=_.whitePoint.y*l,c=_.whitePoint.z*c,new _(o,l,c)}function xo(e){function t(l){return l>E.epsilon?Math.pow(l,1/3):(E.kappa*l+16)/116}const i=t(e.x/_.whitePoint.x),s=t(e.y/_.whitePoint.y),r=t(e.z/_.whitePoint.z),n=116*s-16,a=500*(i-s),o=200*(s-r);return new E(n,a,o)}function ai(e){function t(l){return l<=.04045?l/12.92:Math.pow((l+.055)/1.055,2.4)}const i=t(e.r),s=t(e.g),r=t(e.b),n=i*.4124564+s*.3575761+r*.1804375,a=i*.2126729+s*.7151522+r*.072175,o=i*.0193339+s*.119192+r*.9503041;return new _(n,a,o)}function Gs(e,t=1){function i(a){return a<=.0031308?a*12.92:1.055*Math.pow(a,1/2.4)-.055}const s=i(e.x*3.2404542-e.y*1.5371385-e.z*.4985314),r=i(e.x*-.969266+e.y*1.8760108+e.z*.041556),n=i(e.x*.0556434-e.y*.2040259+e.z*1.0572252);return new M(s,r,n,t)}function li(e){return xo(ai(e))}function Us(e,t=1){return Gs(wo(e),t)}function ci(e){return yo(li(e))}function _s(e,t=1){return Us(mo(e),t)}function hs(e,t,i=18){const s=ci(e);let r=s.c+t*i;return r<0&&(r=0),_s(new Tt(s.l,r,s.h))}function Qe(e,t){return e*t}function us(e,t){return new M(Qe(e.r,t.r),Qe(e.g,t.g),Qe(e.b,t.b),1)}function Ze(e,t){return e<.5?ct(2*t*e,0,1):ct(1-2*(1-t)*(1-e),0,1)}function ds(e,t){return new M(Ze(e.r,t.r),Ze(e.g,t.g),Ze(e.b,t.b),1)}var fs;(function(e){e[e.Burn=0]="Burn",e[e.Color=1]="Color",e[e.Darken=2]="Darken",e[e.Dodge=3]="Dodge",e[e.Lighten=4]="Lighten",e[e.Multiply=5]="Multiply",e[e.Overlay=6]="Overlay",e[e.Screen=7]="Screen"})(fs||(fs={}));function $o(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new M(H(e,t.r,i.r),H(e,t.g,i.g),H(e,t.b,i.b),H(e,t.a,i.a))}function ko(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new $t(Di(e,t.h,i.h),H(e,t.s,i.s),H(e,t.l,i.l))}function So(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new Yt(Di(e,t.h,i.h),H(e,t.s,i.s),H(e,t.v,i.v))}function Co(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new _(H(e,t.x,i.x),H(e,t.y,i.y),H(e,t.z,i.z))}function Fo(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new E(H(e,t.l,i.l),H(e,t.a,i.a),H(e,t.b,i.b))}function To(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new Tt(H(e,t.l,i.l),H(e,t.c,i.c),Di(e,t.h,i.h))}var X;(function(e){e[e.RGB=0]="RGB",e[e.HSL=1]="HSL",e[e.HSV=2]="HSV",e[e.XYZ=3]="XYZ",e[e.LAB=4]="LAB",e[e.LCH=5]="LCH"})(X||(X={}));function zt(e,t,i,s){if(isNaN(e)||e<=0)return i;if(e>=1)return s;switch(t){case X.HSL:return oi(ko(e,Qt(i),Qt(s)));case X.HSV:return vo(So(e,cs(i),cs(s)));case X.XYZ:return Gs(Co(e,ai(i),ai(s)));case X.LAB:return Us(Fo(e,li(i),li(s)));case X.LCH:return _s(To(e,ci(i),ci(s)));default:return $o(e,i,s)}}class Z{constructor(t){if(t==null||t.length===0)throw new Error("The stops argument must be non-empty");this.stops=this.sortColorScaleStops(t)}static createBalancedColorScale(t){if(t==null||t.length===0)throw new Error("The colors argument must be non-empty");const i=new Array(t.length);for(let s=0;s<t.length;s++)s===0?i[s]={color:t[s],position:0}:s===t.length-1?i[s]={color:t[s],position:1}:i[s]={color:t[s],position:s*(1/(t.length-1))};return new Z(i)}getColor(t,i=X.RGB){if(this.stops.length===1)return this.stops[0].color;if(t<=0)return this.stops[0].color;if(t>=1)return this.stops[this.stops.length-1].color;let s=0;for(let a=0;a<this.stops.length;a++)this.stops[a].position<=t&&(s=a);let r=s+1;r>=this.stops.length&&(r=this.stops.length-1);const n=(t-this.stops[s].position)*(1/(this.stops[r].position-this.stops[s].position));return zt(n,i,this.stops[s].color,this.stops[r].color)}trim(t,i,s=X.RGB){if(t<0||i>1||i<t)throw new Error("Invalid bounds");if(t===i)return new Z([{color:this.getColor(t,s),position:0}]);const r=[];for(let o=0;o<this.stops.length;o++)this.stops[o].position>=t&&this.stops[o].position<=i&&r.push(this.stops[o]);if(r.length===0)return new Z([{color:this.getColor(t),position:t},{color:this.getColor(i),position:i}]);r[0].position!==t&&r.unshift({color:this.getColor(t),position:t}),r[r.length-1].position!==i&&r.push({color:this.getColor(i),position:i});const n=i-t,a=new Array(r.length);for(let o=0;o<r.length;o++)a[o]={color:r[o].color,position:(r[o].position-t)/n};return new Z(a)}findNextColor(t,i,s=!1,r=X.RGB,n=.005,a=32){isNaN(t)||t<=0?t=0:t>=1&&(t=1);const o=this.getColor(t,r),l=s?0:1,c=this.getColor(l,r);if(ls(o,c)<=i)return l;let f=s?0:t,v=s?t:0,k=l,w=0;for(;w<=a;){k=Math.abs(v-f)/2+f;const y=this.getColor(k,r),j=ls(o,y);if(Math.abs(j-i)<=n)return k;j>i?s?f=k:v=k:s?v=k:f=k,w++}return k}clone(){const t=new Array(this.stops.length);for(let i=0;i<t.length;i++)t[i]={color:this.stops[i].color,position:this.stops[i].position};return new Z(t)}sortColorScaleStops(t){return t.sort((i,s)=>{const r=i.position,n=s.position;return r<n?-1:r>n?1:0})}}const Ro=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;function Mt(e){const t=Ro.exec(e);if(t===null)return null;let i=t[1];if(i.length===3){const r=i.charAt(0),n=i.charAt(1),a=i.charAt(2);i=r.concat(r,n,n,a,a)}const s=parseInt(i,16);return isNaN(s)?null:new M(Ye((s&16711680)>>>16,0,255),Ye((s&65280)>>>8,0,255),Ye(s&255,0,255),1)}class bt{constructor(t){this.config=Object.assign({},bt.defaultPaletteConfig,t),this.palette=[],this.updatePaletteColors()}updatePaletteGenerationValues(t){let i=!1;for(const s in t)this.config[s]&&(this.config[s].equalValue?this.config[s].equalValue(t[s])||(this.config[s]=t[s],i=!0):t[s]!==this.config[s]&&(this.config[s]=t[s],i=!0));return i&&this.updatePaletteColors(),i}updatePaletteColors(){const t=this.generatePaletteColorScale();for(let i=0;i<this.config.steps;i++)this.palette[i]=t.getColor(i/(this.config.steps-1),this.config.interpolationMode)}generatePaletteColorScale(){const t=Qt(this.config.baseColor),s=new Z([{position:0,color:this.config.scaleColorLight},{position:.5,color:this.config.baseColor},{position:1,color:this.config.scaleColorDark}]).trim(this.config.clipLight,1-this.config.clipDark),r=s.getColor(0),n=s.getColor(1);let a=r,o=n;if(t.s>=this.config.saturationAdjustmentCutoff&&(a=hs(a,this.config.saturationLight),o=hs(o,this.config.saturationDark)),this.config.multiplyLight!==0){const l=us(this.config.baseColor,a);a=zt(this.config.multiplyLight,this.config.interpolationMode,a,l)}if(this.config.multiplyDark!==0){const l=us(this.config.baseColor,o);o=zt(this.config.multiplyDark,this.config.interpolationMode,o,l)}if(this.config.overlayLight!==0){const l=ds(this.config.baseColor,a);a=zt(this.config.overlayLight,this.config.interpolationMode,a,l)}if(this.config.overlayDark!==0){const l=ds(this.config.baseColor,o);o=zt(this.config.overlayDark,this.config.interpolationMode,o,l)}return this.config.baseScalePosition?this.config.baseScalePosition<=0?new Z([{position:0,color:this.config.baseColor},{position:1,color:o.clamp()}]):this.config.baseScalePosition>=1?new Z([{position:0,color:a.clamp()},{position:1,color:this.config.baseColor}]):new Z([{position:0,color:a.clamp()},{position:this.config.baseScalePosition,color:this.config.baseColor},{position:1,color:o.clamp()}]):new Z([{position:0,color:a.clamp()},{position:.5,color:this.config.baseColor},{position:1,color:o.clamp()}])}}bt.defaultPaletteConfig={baseColor:Mt("#808080"),steps:11,interpolationMode:X.RGB,scaleColorLight:new M(1,1,1,1),scaleColorDark:new M(0,0,0,1),clipLight:.185,clipDark:.16,saturationAdjustmentCutoff:.05,saturationLight:.35,saturationDark:1.25,overlayLight:0,overlayDark:.25,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};bt.greyscalePaletteConfig={baseColor:Mt("#808080"),steps:11,interpolationMode:X.RGB,scaleColorLight:new M(1,1,1,1),scaleColorDark:new M(0,0,0,1),clipLight:0,clipDark:0,saturationAdjustmentCutoff:0,saturationLight:0,saturationDark:0,overlayLight:0,overlayDark:0,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};bt.defaultPaletteConfig.scaleColorLight,bt.defaultPaletteConfig.scaleColorDark;class ke{constructor(t){this.palette=[],this.config=Object.assign({},ke.defaultPaletteConfig,t),this.regenPalettes()}regenPalettes(){let t=this.config.steps;(isNaN(t)||t<3)&&(t=3);const i=.14,s=.06,r=new M(i,i,i,1),n=94,o=new bt(Object.assign(Object.assign({},bt.greyscalePaletteConfig),{baseColor:r,baseScalePosition:(1-i)*100/n,steps:t})).palette,l=ri(this.config.baseColor),c=Qt(this.config.baseColor).l,u=(l+c)/2,v=this.matchRelativeLuminanceIndex(u,o)/(t-1),w=this.matchRelativeLuminanceIndex(i,o)/(t-1),y=Qt(this.config.baseColor),j=oi($t.fromObject({h:y.h,s:y.s,l:i})),yt=oi($t.fromObject({h:y.h,s:y.s,l:s})),lt=new Array(5);lt[0]={position:0,color:new M(1,1,1,1)},lt[1]={position:v,color:this.config.baseColor},lt[2]={position:w,color:j},lt[3]={position:.99,color:yt},lt[4]={position:1,color:new M(0,0,0,1)};const fr=new Z(lt);this.palette=new Array(t);for(let ee=0;ee<t;ee++){const pr=fr.getColor(ee/(t-1),X.RGB);this.palette[ee]=pr}}matchRelativeLuminanceIndex(t,i){let s=Number.MAX_VALUE,r=0,n=0;const a=i.length;for(;n<a;n++){const o=Math.abs(ri(i[n])-t);o<s&&(s=o,r=n)}return r}}ke.defaultPaletteConfig={baseColor:Mt("#808080"),steps:94};function Xs(e,t){const i=e.relativeLuminance>t.relativeLuminance?e:t,s=e.relativeLuminance>t.relativeLuminance?t:e;return(i.relativeLuminance+.05)/(s.relativeLuminance+.05)}const mt=Object.freeze({create(e,t,i){return new ge(e,t,i)},from(e){return new ge(e.r,e.g,e.b)}});function Do(e){const t={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const i in t)if(typeof t[i]!=typeof e[i])return!1;return!0}class ge extends M{constructor(t,i,s){super(t,i,s,1),this.toColorString=this.toStringHexRGB,this.contrast=Xs.bind(null,this),this.createCSS=this.toColorString,this.relativeLuminance=ni(this)}static fromObject(t){return new ge(t.r,t.g,t.b)}}function hi(e,t,i=0,s=e.length-1){if(s===i)return e[i];const r=Math.floor((s-i)/2)+i;return t(e[r])?hi(e,t,i,r):hi(e,t,r+1,s)}const Mo=(-.1+Math.sqrt(.21))/2;function Vo(e){return e.relativeLuminance<=Mo}function kt(e){return Vo(e)?-1:1}function Lo(e,t,i){return typeof e=="number"?be.from(mt.create(e,t,i)):be.from(e)}function No(e){return Do(e)?ve.from(e):ve.from(mt.create(e.r,e.g,e.b))}const be=Object.freeze({create:Lo,from:No});class ve{constructor(t,i){this.closestIndexCache=new Map,this.source=t,this.swatches=i,this.reversedSwatches=Object.freeze([...this.swatches].reverse()),this.lastIndex=this.swatches.length-1}colorContrast(t,i,s,r){s===void 0&&(s=this.closestIndexOf(t));let n=this.swatches;const a=this.lastIndex;let o=s;r===void 0&&(r=kt(t));const l=c=>Xs(t,c)>=i;return r===-1&&(n=this.reversedSwatches,o=a-o),hi(n,l,o,a)}get(t){return this.swatches[t]||this.swatches[ct(t,0,this.lastIndex)]}closestIndexOf(t){if(this.closestIndexCache.has(t.relativeLuminance))return this.closestIndexCache.get(t.relativeLuminance);let i=this.swatches.indexOf(t);if(i!==-1)return this.closestIndexCache.set(t.relativeLuminance,i),i;const s=this.swatches.reduce((r,n)=>Math.abs(n.relativeLuminance-t.relativeLuminance)<Math.abs(r.relativeLuminance-t.relativeLuminance)?n:r);return i=this.swatches.indexOf(s),this.closestIndexCache.set(t.relativeLuminance,i),i}static from(t){return new ve(t,Object.freeze(new ke({baseColor:M.fromObject(t)}).palette.map(i=>{const s=Mt(i.toStringHexRGB());return mt.create(s.r,s.g,s.b)})))}}function Ao(e,t,i,s,r,n,a,o,l){const c=e.source,u=t.closestIndexOf(i),f=Math.max(a,o,l),v=u>=f?-1:1,w=e.closestIndexOf(c),y=w+v*-1*s,j=y+v*r,yt=y+v*n;return{rest:e.get(y),hover:e.get(w),active:e.get(j),focus:e.get(yt)}}function Eo(e,t,i,s,r,n,a){const o=e.source,l=e.closestIndexOf(o),c=kt(t),u=l+(c===1?Math.min(s,r):Math.max(c*s,c*r)),f=e.colorContrast(t,i,u,c),v=e.closestIndexOf(f),k=v+c*Math.abs(s-r),w=c===1?s<r:c*s>c*r;let y,j;return w?(y=v,j=k):(y=k,j=v),{rest:e.get(y),hover:e.get(j),active:e.get(y+c*n),focus:e.get(y+c*a)}}const ps=mt.create(1,1,1),Io=mt.create(0,0,0),Oo=mt.from(Mt("#808080")),Po=mt.from(Mt("#DA1A5F"));function Bo(e,t){return e.contrast(ps)>=t?ps:Io}function Ho(e,t,i,s,r,n){const a=e.closestIndexOf(t),o=Math.max(i,s,r,n),l=a>=o?-1:1;return{rest:e.get(a+l*i),hover:e.get(a+l*s),active:e.get(a+l*r),focus:e.get(a+l*n)}}function zo(e,t,i,s,r,n){const a=kt(t),o=e.closestIndexOf(t);return{rest:e.get(o-a*i),hover:e.get(o-a*s),active:e.get(o-a*r),focus:e.get(o-a*n)}}function jo(e,t,i){const s=e.closestIndexOf(t);return e.get(s-(s<i?i*-1:i))}function Wo(e,t,i,s,r,n,a,o,l,c){const u=Math.max(i,s,r,n,a,o,l,c),f=e.closestIndexOf(t),v=f>=u?-1:1;return{rest:e.get(f+v*i),hover:e.get(f+v*s),active:e.get(f+v*r),focus:e.get(f+v*n)}}function qo(e,t,i,s,r,n){const a=kt(t),o=e.closestIndexOf(e.colorContrast(t,4.5)),l=o+a*Math.abs(i-s),c=a===1?i<s:a*i>a*s;let u,f;return c?(u=o,f=l):(u=l,f=o),{rest:e.get(u),hover:e.get(f),active:e.get(u+a*r),focus:e.get(u+a*n)}}function Go(e,t){return e.colorContrast(t,3.5)}function Uo(e,t,i){return e.colorContrast(i,3.5,e.closestIndexOf(e.source),kt(t)*-1)}function _o(e,t){return e.colorContrast(t,14)}function Xo(e,t){return e.colorContrast(t,4.5)}function Se(e){return mt.create(e,e,e)}const Yo={LightMode:1,DarkMode:.23};function Qo(e,t,i){return e.get(e.closestIndexOf(Se(t))+i)}function Zo(e,t,i){const s=e.closestIndexOf(Se(t))-i;return e.get(s-i)}function Jo(e,t){return e.get(e.closestIndexOf(Se(t)))}function Mi(e,t,i,s,r,n){return Math.max(e.closestIndexOf(Se(t))+i,s,r,n)}function Ko(e,t,i,s,r,n){return e.get(Mi(e,t,i,s,r,n))}function ta(e,t,i,s,r,n){return e.get(Mi(e,t,i,s,r,n)+i)}function ea(e,t,i,s,r,n){return e.get(Mi(e,t,i,s,r,n)+i*2)}function ia(e,t,i,s,r,n){const a=e.closestIndexOf(t),o=kt(t),l=a+o*i,c=l+o*(s-i),u=l+o*(r-i),f=l+o*(n-i);return{rest:e.get(l),hover:e.get(c),active:e.get(u),focus:e.get(f)}}function sa(e,t,i){return e.get(e.closestIndexOf(t)+kt(t)*i)}const{create:d}=xe;function b(e){return xe.create({name:e,cssCustomPropertyName:null})}const Vi=d("body-font").withDefault('aktiv-grotesk, "Segoe UI", Arial, Helvetica, sans-serif'),Ys=d("base-height-multiplier").withDefault(10);d("base-horizontal-spacing-multiplier").withDefault(3);const Vt=d("base-layer-luminance").withDefault(Yo.DarkMode),Ct=d("control-corner-radius").withDefault(4),Li=d("density").withDefault(0),L=d("design-unit").withDefault(4),Je=d("direction").withDefault(I.ltr),Ce=d("disabled-opacity").withDefault(.3),q=d("stroke-width").withDefault(1),it=d("focus-stroke-width").withDefault(2),Qs=d("type-ramp-base-font-size").withDefault("14px"),Zs=d("type-ramp-base-line-height").withDefault("20px");d("type-ramp-minus-1-font-size").withDefault("12px");d("type-ramp-minus-1-line-height").withDefault("16px");d("type-ramp-minus-2-font-size").withDefault("10px");d("type-ramp-minus-2-line-height").withDefault("16px");d("type-ramp-plus-1-font-size").withDefault("16px");d("type-ramp-plus-1-line-height").withDefault("24px");d("type-ramp-plus-2-font-size").withDefault("20px");d("type-ramp-plus-2-line-height").withDefault("28px");d("type-ramp-plus-3-font-size").withDefault("28px");d("type-ramp-plus-3-line-height").withDefault("36px");d("type-ramp-plus-4-font-size").withDefault("34px");d("type-ramp-plus-4-line-height").withDefault("44px");d("type-ramp-plus-5-font-size").withDefault("46px");d("type-ramp-plus-5-line-height").withDefault("56px");d("type-ramp-plus-6-font-size").withDefault("60px");d("type-ramp-plus-6-line-height").withDefault("72px");b("accent-fill-rest-delta").withDefault(0);const ra=b("accent-fill-hover-delta").withDefault(4),na=b("accent-fill-active-delta").withDefault(-5),oa=b("accent-fill-focus-delta").withDefault(0),aa=b("accent-foreground-rest-delta").withDefault(0),la=b("accent-foreground-hover-delta").withDefault(6),ca=b("accent-foreground-active-delta").withDefault(-4),ha=b("accent-foreground-focus-delta").withDefault(0),Lt=b("neutral-fill-rest-delta").withDefault(7),Nt=b("neutral-fill-hover-delta").withDefault(10),At=b("neutral-fill-active-delta").withDefault(5),Js=b("neutral-fill-focus-delta").withDefault(0),ua=b("neutral-fill-input-rest-delta").withDefault(0),da=b("neutral-fill-input-hover-delta").withDefault(0),fa=b("neutral-fill-input-active-delta").withDefault(0),pa=b("neutral-fill-input-focus-delta").withDefault(0),ga=b("neutral-fill-stealth-rest-delta").withDefault(0),ba=b("neutral-fill-stealth-hover-delta").withDefault(5),va=b("neutral-fill-stealth-active-delta").withDefault(3),ma=b("neutral-fill-stealth-focus-delta").withDefault(0),ya=b("neutral-fill-strong-rest-delta").withDefault(0),wa=b("neutral-fill-strong-hover-delta").withDefault(8),xa=b("neutral-fill-strong-active-delta").withDefault(-5),$a=b("neutral-fill-strong-focus-delta").withDefault(0),Et=b("neutral-fill-layer-rest-delta").withDefault(3),ka=b("neutral-stroke-rest-delta").withDefault(25),Sa=b("neutral-stroke-hover-delta").withDefault(40),Ca=b("neutral-stroke-active-delta").withDefault(16),Fa=b("neutral-stroke-focus-delta").withDefault(25),Ta=b("neutral-stroke-divider-rest-delta").withDefault(8),Ra=d("neutral-color").withDefault(Oo),P=b("neutral-palette").withDefault(e=>be.from(Ra.getValueFor(e))),Da=d("accent-color").withDefault(Po),Ni=b("accent-palette").withDefault(e=>be.from(Da.getValueFor(e))),Ma=b("neutral-layer-card-container-recipe").withDefault({evaluate:e=>Qo(P.getValueFor(e),Vt.getValueFor(e),Et.getValueFor(e))});d("neutral-layer-card-container").withDefault(e=>Ma.getValueFor(e).evaluate(e));const Va=b("neutral-layer-floating-recipe").withDefault({evaluate:e=>Zo(P.getValueFor(e),Vt.getValueFor(e),Et.getValueFor(e))});d("neutral-layer-floating").withDefault(e=>Va.getValueFor(e).evaluate(e));const La=b("neutral-layer-1-recipe").withDefault({evaluate:e=>Jo(P.getValueFor(e),Vt.getValueFor(e))}),Na=d("neutral-layer-1").withDefault(e=>La.getValueFor(e).evaluate(e)),Aa=b("neutral-layer-2-recipe").withDefault({evaluate:e=>Ko(P.getValueFor(e),Vt.getValueFor(e),Et.getValueFor(e),Lt.getValueFor(e),Nt.getValueFor(e),At.getValueFor(e))});d("neutral-layer-2").withDefault(e=>Aa.getValueFor(e).evaluate(e));const Ea=b("neutral-layer-3-recipe").withDefault({evaluate:e=>ta(P.getValueFor(e),Vt.getValueFor(e),Et.getValueFor(e),Lt.getValueFor(e),Nt.getValueFor(e),At.getValueFor(e))});d("neutral-layer-3").withDefault(e=>Ea.getValueFor(e).evaluate(e));const Ia=b("neutral-layer-4-recipe").withDefault({evaluate:e=>ea(P.getValueFor(e),Vt.getValueFor(e),Et.getValueFor(e),Lt.getValueFor(e),Nt.getValueFor(e),At.getValueFor(e))});d("neutral-layer-4").withDefault(e=>Ia.getValueFor(e).evaluate(e));const O=d("fill-color").withDefault(e=>Na.getValueFor(e));var Zt;(function(e){e[e.normal=4.5]="normal",e[e.large=7]="large"})(Zt||(Zt={}));const Fe=d({name:"accent-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>Ao(Ni.getValueFor(e),P.getValueFor(e),t||O.getValueFor(e),ra.getValueFor(e),na.getValueFor(e),oa.getValueFor(e),Lt.getValueFor(e),Nt.getValueFor(e),At.getValueFor(e))}),dt=d("accent-fill-rest").withDefault(e=>Fe.getValueFor(e).evaluate(e).rest),Rt=d("accent-fill-hover").withDefault(e=>Fe.getValueFor(e).evaluate(e).hover),Dt=d("accent-fill-active").withDefault(e=>Fe.getValueFor(e).evaluate(e).active),Ks=d("accent-fill-focus").withDefault(e=>Fe.getValueFor(e).evaluate(e).focus),tr=e=>(t,i)=>Bo(i||dt.getValueFor(t),e),Te=b("foreground-on-accent-recipe").withDefault({evaluate:(e,t)=>tr(Zt.normal)(e,t)}),ui=d("foreground-on-accent-rest").withDefault(e=>Te.getValueFor(e).evaluate(e,dt.getValueFor(e))),di=d("foreground-on-accent-hover").withDefault(e=>Te.getValueFor(e).evaluate(e,Rt.getValueFor(e))),fi=d("foreground-on-accent-active").withDefault(e=>Te.getValueFor(e).evaluate(e,Dt.getValueFor(e)));d("foreground-on-accent-focus").withDefault(e=>Te.getValueFor(e).evaluate(e,Ks.getValueFor(e)));const Re=b("foreground-on-accent-large-recipe").withDefault({evaluate:(e,t)=>tr(Zt.large)(e,t)});d("foreground-on-accent-rest-large").withDefault(e=>Re.getValueFor(e).evaluate(e,dt.getValueFor(e)));d("foreground-on-accent-hover-large").withDefault(e=>Re.getValueFor(e).evaluate(e,Rt.getValueFor(e)));d("foreground-on-accent-active-large").withDefault(e=>Re.getValueFor(e).evaluate(e,Dt.getValueFor(e)));d("foreground-on-accent-focus-large").withDefault(e=>Re.getValueFor(e).evaluate(e,Ks.getValueFor(e)));const Oa=e=>(t,i)=>Eo(Ni.getValueFor(t),i||O.getValueFor(t),e,aa.getValueFor(t),la.getValueFor(t),ca.getValueFor(t),ha.getValueFor(t)),De=d({name:"accent-foreground-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>Oa(Zt.normal)(e,t)}),Jt=d("accent-foreground-rest").withDefault(e=>De.getValueFor(e).evaluate(e).rest),pi=d("accent-foreground-hover").withDefault(e=>De.getValueFor(e).evaluate(e).hover),gi=d("accent-foreground-active").withDefault(e=>De.getValueFor(e).evaluate(e).active);d("accent-foreground-focus").withDefault(e=>De.getValueFor(e).evaluate(e).focus);const Me=d({name:"neutral-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>Ho(P.getValueFor(e),t||O.getValueFor(e),Lt.getValueFor(e),Nt.getValueFor(e),At.getValueFor(e),Js.getValueFor(e))}),er=d("neutral-fill-rest").withDefault(e=>Me.getValueFor(e).evaluate(e).rest),Pa=d("neutral-fill-hover").withDefault(e=>Me.getValueFor(e).evaluate(e).hover),Ba=d("neutral-fill-active").withDefault(e=>Me.getValueFor(e).evaluate(e).active);d("neutral-fill-focus").withDefault(e=>Me.getValueFor(e).evaluate(e).focus);const Ve=d({name:"neutral-fill-input-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>zo(P.getValueFor(e),t||O.getValueFor(e),ua.getValueFor(e),da.getValueFor(e),fa.getValueFor(e),pa.getValueFor(e))}),Ha=d("neutral-fill-input-rest").withDefault(e=>Ve.getValueFor(e).evaluate(e).rest),za=d("neutral-fill-input-hover").withDefault(e=>Ve.getValueFor(e).evaluate(e).hover),ja=d("neutral-fill-input-active").withDefault(e=>Ve.getValueFor(e).evaluate(e).active);d("neutral-fill-input-focus").withDefault(e=>Ve.getValueFor(e).evaluate(e).focus);const Le=d({name:"neutral-fill-stealth-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>Wo(P.getValueFor(e),t||O.getValueFor(e),ga.getValueFor(e),ba.getValueFor(e),va.getValueFor(e),ma.getValueFor(e),Lt.getValueFor(e),Nt.getValueFor(e),At.getValueFor(e),Js.getValueFor(e))}),ir=d("neutral-fill-stealth-rest").withDefault(e=>Le.getValueFor(e).evaluate(e).rest),Wa=d("neutral-fill-stealth-hover").withDefault(e=>Le.getValueFor(e).evaluate(e).hover),qa=d("neutral-fill-stealth-active").withDefault(e=>Le.getValueFor(e).evaluate(e).active);d("neutral-fill-stealth-focus").withDefault(e=>Le.getValueFor(e).evaluate(e).focus);const Ne=d({name:"neutral-fill-strong-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>qo(P.getValueFor(e),t||O.getValueFor(e),ya.getValueFor(e),wa.getValueFor(e),xa.getValueFor(e),$a.getValueFor(e))});d("neutral-fill-strong-rest").withDefault(e=>Ne.getValueFor(e).evaluate(e).rest);d("neutral-fill-strong-hover").withDefault(e=>Ne.getValueFor(e).evaluate(e).hover);d("neutral-fill-strong-active").withDefault(e=>Ne.getValueFor(e).evaluate(e).active);d("neutral-fill-strong-focus").withDefault(e=>Ne.getValueFor(e).evaluate(e).focus);const Ga=b("neutral-fill-layer-recipe").withDefault({evaluate:(e,t)=>jo(P.getValueFor(e),t||O.getValueFor(e),Et.getValueFor(e))});d("neutral-fill-layer-rest").withDefault(e=>Ga.getValueFor(e).evaluate(e));const Ua=b("focus-stroke-outer-recipe").withDefault({evaluate:e=>Go(P.getValueFor(e),O.getValueFor(e))}),ot=d("focus-stroke-outer").withDefault(e=>Ua.getValueFor(e).evaluate(e)),_a=b("focus-stroke-inner-recipe").withDefault({evaluate:e=>Uo(Ni.getValueFor(e),O.getValueFor(e),ot.getValueFor(e))}),Xa=d("focus-stroke-inner").withDefault(e=>_a.getValueFor(e).evaluate(e)),Ya=b("neutral-foreground-hint-recipe").withDefault({evaluate:e=>Xo(P.getValueFor(e),O.getValueFor(e))});d("neutral-foreground-hint").withDefault(e=>Ya.getValueFor(e).evaluate(e));const Qa=b("neutral-foreground-recipe").withDefault({evaluate:e=>_o(P.getValueFor(e),O.getValueFor(e))}),ft=d("neutral-foreground-rest").withDefault(e=>Qa.getValueFor(e).evaluate(e)),Ae=d({name:"neutral-stroke-recipe",cssCustomPropertyName:null}).withDefault({evaluate:e=>ia(P.getValueFor(e),O.getValueFor(e),ka.getValueFor(e),Sa.getValueFor(e),Ca.getValueFor(e),Fa.getValueFor(e))}),Ai=d("neutral-stroke-rest").withDefault(e=>Ae.getValueFor(e).evaluate(e).rest),sr=d("neutral-stroke-hover").withDefault(e=>Ae.getValueFor(e).evaluate(e).hover),Za=d("neutral-stroke-active").withDefault(e=>Ae.getValueFor(e).evaluate(e).active);d("neutral-stroke-focus").withDefault(e=>Ae.getValueFor(e).evaluate(e).focus);const Ja=b("neutral-stroke-divider-recipe").withDefault({evaluate:(e,t)=>sa(P.getValueFor(e),t||O.getValueFor(e),Ta.getValueFor(e))});d("neutral-stroke-divider-rest").withDefault(e=>Ja.getValueFor(e).evaluate(e));xe.create({name:"height-number",cssCustomPropertyName:null}).withDefault(e=>(Ys.getValueFor(e)+Li.getValueFor(e))*L.getValueFor(e));const ut=Ur`(${Ys} + ${Li}) * ${L}`,Ka="0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(.11 * (2 - var(--background-luminance, 1))))",tl="0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(.13 * (2 - var(--background-luminance, 1))))",el=`box-shadow: ${Ka}, ${tl};`,il=m`
    ${te("inline-flex")} :host {
        font-family: ${Vi};
        outline: none;
        font-size: ${Qs};
        line-height: ${Zs};
        height: calc(${ut} * 1px);
        min-width: calc(${ut} * 1px);
        background-color: ${er};
        color: ${ft};
        border-radius: calc(${Ct} * 1px);
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
        padding: 0 calc((10 + (${L} * 2 * ${Li})) * 1px);
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
        background-color: ${Pa};
    }

    :host(:active) {
        background-color: ${Ba};
    }

    .control:${S} {
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
`.withBehaviors(U(m`
            :host .control {
              background-color: ${h.ButtonFace};
              border-color: ${h.ButtonText};
              color: ${h.ButtonText};
              fill: currentColor;
            }

            :host(:hover) .control {
              forced-color-adjust: none;
              background-color: ${h.Highlight};
              color: ${h.HighlightText};
            }

            .control:${S} {
              forced-color-adjust: none;
              background-color: ${h.Highlight};
              border-color: ${h.ButtonText};
              box-shadow: 0 0 0 calc((${it} - ${q}) * 1px) ${h.ButtonText} inset;
              color: ${h.HighlightText};
            }

            .control:hover,
            :host([appearance="outline"]) .control:hover {
              border-color: ${h.ButtonText};
            }

            :host([href]) .control {
                border-color: ${h.LinkText};
                color: ${h.LinkText};
            }

            :host([href]) .control:hover,
            :host([href]) .control:${S}{
              forced-color-adjust: none;
              background: ${h.ButtonFace};
              border-color: ${h.LinkText};
              box-shadow: 0 0 0 1px ${h.LinkText} inset;
              color: ${h.LinkText};
              fill: currentColor;
            }
        `)),sl=m`
    :host([appearance="accent"]) {
        background: ${dt};
        color: ${ui};
    }

    :host([appearance="accent"]:hover) {
        background: ${Rt};
        color: ${di};
    }

    :host([appearance="accent"]:active) .control:active {
        background: ${Dt};
        color: ${fi};
    }

    :host([appearance="accent"]) .control:${S} {
        box-shadow: 0 0 0 calc((${it} - ${q}) * 1px) ${ot} inset,
            0 0 0 calc((${it} + ${q}) * 1px) ${Xa} inset;
    }
`.withBehaviors(U(m`
            :host([appearance="accent"]) .control {
                forced-color-adjust: none;
                background: ${h.Highlight};
                color: ${h.HighlightText};
            }

            :host([appearance="accent"]) .control:hover,
            :host([appearance="accent"]:active) .control:active {
                background: ${h.HighlightText};
                border-color: ${h.Highlight};
                color: ${h.Highlight};
            }

            :host([appearance="accent"]) .control:${S} {
                border-color: ${h.Highlight};
                box-shadow: 0 0 0 calc(${it} * 1px) ${h.HighlightText} inset;
            }

            :host([appearance="accent"][href]) .control{
                background: ${h.LinkText};
                color: ${h.HighlightText};
            }

            :host([appearance="accent"][href]) .control:hover {
                background: ${h.ButtonFace};
                border-color: ${h.LinkText};
                box-shadow: none;
                color: ${h.LinkText};
                fill: currentColor;
            }

            :host([appearance="accent"][href]) .control:${S} {
                border-color: ${h.LinkText};
                box-shadow: 0 0 0 calc(${it} * 1px) ${h.HighlightText} inset;
            }
        `));m`
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
        color: ${Jt};
        border-bottom: calc(${q} * 1px) solid ${Jt};
    }

    :host([appearance="hypertext"]:hover),
    :host([appearance="hypertext"]) .control:hover {
        background: transparent;
        border-bottom-color: ${pi};
    }

    :host([appearance="hypertext"]:active),
    :host([appearance="hypertext"]) .control:active {
        background: transparent;
        border-bottom-color: ${gi};
    }

    :host([appearance="hypertext"]) .control:${S} {
        border-bottom: calc(${it} * 1px) solid ${ot};
        margin-bottom: calc(calc(${q} - ${it}) * 1px);
    }
`.withBehaviors(U(m`
            :host([appearance="hypertext"]:hover) {
                background-color: ${h.ButtonFace};
                color: ${h.ButtonText};
            }
            :host([appearance="hypertext"][href]) .control:hover,
            :host([appearance="hypertext"][href]) .control:active,
            :host([appearance="hypertext"][href]) .control:${S} {
                color: ${h.LinkText};
                border-bottom-color: ${h.LinkText};
                box-shadow: none;
            }
        `));const rl=m`
    :host([appearance="lightweight"]) {
        background: transparent;
        color: ${Jt};
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
        color: ${pi};
    }

    :host([appearance="lightweight"]:active) {
        background: transparent;
        color: ${gi};
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
        background: ${pi};
    }

    :host([appearance="lightweight"]:active) .content::before {
        background: ${gi};
    }

    :host([appearance="lightweight"]) .control:${S} .content::before {
        background: ${ft};
        height: calc(${it} * 1px);
    }
`.withBehaviors(U(m`
            :host([appearance="lightweight"]) .control:hover,
            :host([appearance="lightweight"]) .control:${S} {
                forced-color-adjust: none;
                background: ${h.ButtonFace};
                color: ${h.Highlight};
            }
            :host([appearance="lightweight"]) .control:hover .content::before,
            :host([appearance="lightweight"]) .control:${S} .content::before {
                background: ${h.Highlight};
            }

            :host([appearance="lightweight"][href]) .control:hover,
            :host([appearance="lightweight"][href]) .control:${S} {
                background: ${h.ButtonFace};
                box-shadow: none;
                color: ${h.LinkText};
            }

            :host([appearance="lightweight"][href]) .control:hover .content::before,
            :host([appearance="lightweight"][href]) .control:${S} .content::before {
                background: ${h.LinkText};
            }
        `)),nl=m`
    :host([appearance="outline"]) {
        background: transparent;
        border-color: ${dt};
    }

    :host([appearance="outline"]:hover) {
        border-color: ${Rt};
    }

    :host([appearance="outline"]:active) {
        border-color: ${Dt};
    }

    :host([appearance="outline"]) .control {
        border-color: inherit;
    }

    :host([appearance="outline"]) .control:${S} {
        box-shadow: 0 0 0 calc((${it} - ${q}) * 1px) ${ot} inset;
        border-color: ${ot};
    }
`.withBehaviors(U(m`
            :host([appearance="outline"]) .control {
                border-color: ${h.ButtonText};
            }
            :host([appearance="outline"]) .control:${S} {
              forced-color-adjust: none;
              background-color: ${h.Highlight};
              border-color: ${h.ButtonText};
              box-shadow: 0 0 0 calc((${it} - ${q}) * 1px) ${h.ButtonText} inset;
              color: ${h.HighlightText};
              fill: currentColor;
            }
            :host([appearance="outline"][href]) .control {
                background: ${h.ButtonFace};
                border-color: ${h.LinkText};
                color: ${h.LinkText};
                fill: currentColor;
            }
            :host([appearance="outline"][href]) .control:hover,
            :host([appearance="outline"][href]) .control:${S} {
              forced-color-adjust: none;
              border-color: ${h.LinkText};
              box-shadow: 0 0 0 1px ${h.LinkText} inset;
            }
        `)),ol=m`
    :host([appearance="stealth"]) {
        background: ${ir};
    }

    :host([appearance="stealth"]:hover) {
        background: ${Wa};
    }

    :host([appearance="stealth"]:active) {
        background: ${qa};
    }
`.withBehaviors(U(m`
            :host([appearance="stealth"]),
            :host([appearance="stealth"]) .control {
                forced-color-adjust: none;
                background: ${h.ButtonFace};
                border-color: transparent;
                color: ${h.ButtonText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:hover) .control {
                background: ${h.Highlight};
                border-color: ${h.Highlight};
                color: ${h.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:${S}) .control {
                background: ${h.Highlight};
                box-shadow: 0 0 0 1px ${h.Highlight};
                color: ${h.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]) .control {
                color: ${h.LinkText};
            }

            :host([appearance="stealth"][href]:hover) .control,
            :host([appearance="stealth"][href]:${S}) .control {
                background: ${h.LinkText};
                border-color: ${h.LinkText};
                color: ${h.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]:${S}) .control {
                forced-color-adjust: none;
                box-shadow: 0 0 0 1px ${h.LinkText};
            }
        `));class al{constructor(t,i){this.cache=new WeakMap,this.ltr=t,this.rtl=i}bind(t){this.attach(t)}unbind(t){const i=this.cache.get(t);i&&Je.unsubscribe(i)}attach(t){const i=this.cache.get(t)||new ll(this.ltr,this.rtl,t),s=Je.getValueFor(t);Je.subscribe(i),i.attach(s),this.cache.set(t,i)}}class ll{constructor(t,i,s){this.ltr=t,this.rtl=i,this.source=s,this.attached=null}handleChange({target:t,token:i}){this.attach(i.getValueFor(t))}attach(t){this.attached!==this[t]&&(this.attached!==null&&this.source.$fastController.removeStyles(this.attached),this.attached=this[t],this.attached!==null&&this.source.$fastController.addStyles(this.attached))}}function oe(e,t){return new fo("appearance",e,t)}const cl=(e,t)=>m`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
            opacity: ${Ce};
            background-color: ${er};
            cursor: ${pe};
        }

        ${il}
    `.withBehaviors(U(m`
                :host([disabled]),
                :host([disabled]) .control,
                :host([disabled]:hover),
                :host([disabled]:active) {
                    forced-color-adjust: none;
                    background-color: ${h.ButtonFace};
                    border-color: ${h.GrayText};
                    color: ${h.GrayText};
                    cursor: ${pe};
                    opacity: 1;
                }
            `),oe("accent",m`
                :host([appearance="accent"][disabled]),
                :host([appearance="accent"][disabled]:hover),
                :host([appearance="accent"][disabled]:active) {
                    background: ${dt};
                }

                ${sl}
            `.withBehaviors(U(m`
                        :host([appearance="accent"][disabled]) .control,
                        :host([appearance="accent"][disabled]) .control:hover {
                            background: ${h.ButtonFace};
                            border-color: ${h.GrayText};
                            color: ${h.GrayText};
                        }
                    `))),oe("lightweight",m`
                :host([appearance="lightweight"][disabled]:hover),
                :host([appearance="lightweight"][disabled]:active) {
                    background-color: transparent;
                    color: ${Jt};
                }

                :host([appearance="lightweight"][disabled]) .content::before,
                :host([appearance="lightweight"][disabled]:hover) .content::before,
                :host([appearance="lightweight"][disabled]:active) .content::before {
                    background: transparent;
                }

                ${rl}
            `.withBehaviors(U(m`
                        :host([appearance="lightweight"].disabled) .control {
                            forced-color-adjust: none;
                            color: ${h.GrayText};
                        }

                        :host([appearance="lightweight"].disabled)
                            .control:hover
                            .content::before {
                            background: none;
                        }
                    `))),oe("outline",m`
                :host([appearance="outline"][disabled]),
                :host([appearance="outline"][disabled]:hover),
                :host([appearance="outline"][disabled]:active) {
                    background: transparent;
                    border-color: ${dt};
                }

                ${nl}
            `.withBehaviors(U(m`
                        :host([appearance="outline"][disabled]) .control {
                            border-color: ${h.GrayText};
                        }
                    `))),oe("stealth",m`
                :host([appearance="stealth"][disabled]),
                :host([appearance="stealth"][disabled]:hover),
                :host([appearance="stealth"][disabled]:active) {
                    background: ${ir};
                }

                ${ol}
            `.withBehaviors(U(m`
                        :host([appearance="stealth"][disabled]) {
                            background: ${h.ButtonFace};
                        }

                        :host([appearance="stealth"][disabled]) .control {
                            background: ${h.ButtonFace};
                            border-color: transparent;
                            color: ${h.GrayText};
                        }
                    `))));class rr extends et{constructor(){super(...arguments),this.appearance="neutral"}defaultSlottedContentChanged(t,i){const s=this.defaultSlottedContent.filter(r=>r.nodeType===Node.ELEMENT_NODE);s.length===1&&s[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}p([g],rr.prototype,"appearance",void 0);const hl=rr.compose({baseName:"button",baseClass:et,template:Cn,styles:cl,shadowOptions:{delegatesFocus:!0}}),ul=(e,t)=>m`
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
        ${el}
        margin-top: auto;
        margin-bottom: auto;
        width: var(--dialog-width);
        height: var(--dialog-height);
        background-color: ${O};
        z-index: 1;
        border-radius: calc(${Ct} * 1px);
        border: calc(${q} * 1px) solid transparent;
    }
`,dl=J.compose({baseName:"dialog",template:jn,styles:ul}),fl=(e,t)=>m`
    ${te("flex")} :host {
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
`,pl=vt.compose({baseName:"radio-group",template:io,styles:fl}),gl=(e,t)=>m`
        ${te("inline-flex")} :host {
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
            border: calc(${q} * 1px) solid ${Ai};
            background: ${Ha};
            outline: none;
            cursor: pointer;
        }

        .label {
            font-family: ${Vi};
            color: ${ft};
            padding-inline-start: calc(${L} * 2px + 2px);
            margin-inline-end: calc(${L} * 2px + 2px);
            cursor: pointer;
            font-size: ${Qs};
            line-height: ${Zs};
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
            background: ${ui};
            fill: ${ui};
            opacity: 0;
            pointer-events: none;
        }

        :host(:not([disabled])) .control:hover{
            background: ${za};
            border-color: ${sr};
        }

        :host(:not([disabled])) .control:active {
            background: ${ja};
            border-color: ${Za};
        }

        :host(:${S}) .control {
            box-shadow: 0 0 0 2px ${O}, 0 0 0 4px ${ot};
        }

        :host([aria-checked="true"]) .control {
            background: ${dt};
            border: calc(${q} * 1px) solid ${dt};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover {
            background: ${Rt};
            border: calc(${q} * 1px) solid ${Rt};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
            background: ${di};
            fill: ${di};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active {
            background: ${Dt};
            border: calc(${q} * 1px) solid ${Dt};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
            background: ${fi};
            fill: ${fi};
        }

        :host([aria-checked="true"]:${S}:not([disabled])) .control {
            box-shadow: 0 0 0 2px ${O}, 0 0 0 4px ${ot};
        }

        :host([disabled]) .label,
        :host([readonly]) .label,
        :host([readonly]) .control,
        :host([disabled]) .control {
            cursor: ${pe};
        }

        :host([aria-checked="true"]) .checked-indicator {
            opacity: 1;
        }

        :host([disabled]) {
            opacity: ${Ce};
        }
    `.withBehaviors(U(m`
            .control,
            :host([aria-checked="true"]:not([disabled])) .control {
                forced-color-adjust: none;
                border-color: ${h.FieldText};
                background: ${h.Field};
            }
            :host(:not([disabled])) .control:hover {
                border-color: ${h.Highlight};
                background: ${h.Field};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover,
            :host([aria-checked="true"]:not([disabled])) .control:active {
                border-color: ${h.Highlight};
                background: ${h.Highlight};
            }
            :host([aria-checked="true"]) .checked-indicator {
                background: ${h.Highlight};
                fill: ${h.Highlight};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator,
            :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
                background: ${h.HighlightText};
                fill: ${h.HighlightText};
            }
            :host(:${S}) .control {
                border-color: ${h.Highlight};
                box-shadow: 0 0 0 2px ${h.Field}, 0 0 0 4px ${h.FieldText};
            }
            :host([aria-checked="true"]:${S}:not([disabled])) .control {
                border-color: ${h.Highlight};
                box-shadow: 0 0 0 2px ${h.Field}, 0 0 0 4px ${h.FieldText};
            }
            :host([disabled]) {
                forced-color-adjust: none;
                opacity: 1;
            }
            :host([disabled]) .label {
                color: ${h.GrayText};
            }
            :host([disabled]) .control,
            :host([aria-checked="true"][disabled]) .control:hover, .control:active {
                background: ${h.Field};
                border-color: ${h.GrayText};
            }
            :host([disabled]) .checked-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .checked-indicator {
                fill: ${h.GrayText};
                background: ${h.GrayText};
            }
        `)),bl=$e.compose({baseName:"radio",template:so,styles:gl,checkedIndicator:`
        <div part="checked-indicator" class="checked-indicator"></div>
    `}),gs=m`
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
`,bs=m`
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
`,vl=(e,t)=>m`
        ${te("block")} :host {
            font-family: ${Vi};
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
            background: ${Ai};
            justify-self: center;
        }
        :host(.disabled) {
            opacity: ${Ce};
        }
    `.withBehaviors(U(m`
                .mark {
                    forced-color-adjust: none;
                    background: ${h.FieldText};
                }
                :host(.disabled) {
                    forced-color-adjust: none;
                    opacity: 1;
                }
                :host(.disabled) .label {
                    color: ${h.GrayText};
                }
                :host(.disabled) .mark {
                    background: ${h.GrayText};
                }
            `));class ml extends at{sliderOrientationChanged(){this.sliderOrientation===B.horizontal?(this.$fastController.addStyles(gs),this.$fastController.removeStyles(bs)):(this.$fastController.addStyles(bs),this.$fastController.removeStyles(gs))}}const yl=ml.compose({baseName:"slider-label",baseClass:at,template:oo,styles:vl}),wl=m`
    .track-start {
        left: 0;
    }
`,xl=m`
    .track-start {
        right: 0;
    }
`,$l=(e,t)=>m`
        :host([hidden]) {
            display: none;
        }

        ${te("inline-grid")} :host {
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
            border-radius: calc(${Ct} * 1px);
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

        :host(:${S}) .thumb-cursor {
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
            border-radius: calc(${Ct} * 1px);
        }
        .thumb-cursor:hover {
            background: ${ft};
            border-color: ${sr};
        }
        .thumb-cursor:active {
            background: ${ft};
        }
        .track-start {
            background: ${Jt};
            position: absolute;
            height: 100%;
            left: 0;
            border-radius: calc(${Ct} * 1px);
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
            background: ${Ai};
            position: absolute;
            border-radius: calc(${Ct} * 1px);
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
            cursor: ${pe};
        }
        :host([disabled]) {
            opacity: ${Ce};
        }
    `.withBehaviors(new al(wl,xl),U(m`
                .thumb-cursor {
                    forced-color-adjust: none;
                    border-color: ${h.FieldText};
                    background: ${h.FieldText};
                }
                .thumb-cursor:hover,
                .thumb-cursor:active {
                    background: ${h.Highlight};
                }
                .track {
                    forced-color-adjust: none;
                    background: ${h.FieldText};
                }
                :host(:${S}) .thumb-cursor {
                    border-color: ${h.Highlight};
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .track,
                :host([disabled]) .thumb-cursor {
                    forced-color-adjust: none;
                    background: ${h.GrayText};
                }

                :host(:${S}) .thumb-cursor {
                    background: ${h.Highlight};
                    border-color: ${h.Highlight};
                    box-shadow: 0 0 0 2px ${h.Field}, 0 0 0 4px ${h.FieldText};
                }
            `)),kl=z.compose({baseName:"slider",template:ao,styles:$l,thumb:`
        <div class="thumb-cursor"></div>
    `});function Sl(e){return zs.getOrCreate(e).withPrefix("fast")}Sl().register(hl(),bl(),pl(),dl(),kl({thumb:'<div style="background-color: #fff; border: solid; border-color: #777; border-width: 1px; border-radius: 3px; width: 16px; height: 16px; "></div>'}),yl());const Cl=document.getElementById("canvas"),Fl=document.getElementById("infoDialogOpenButton"),Tl=document.getElementById("infoDialogCloseButton"),nr=document.getElementById("infoDialog"),pt=document.getElementById("nCitiesSlider"),st=document.getElementById("piSlider"),rt=document.getElementById("tcostSlider"),nt=document.getElementById("sigmaSlider"),or=document.getElementById("caseSelector"),Rl=document.getElementById("visualizer"),ar=document.getElementById("nCities"),lr=document.getElementById("pi"),cr=document.getElementById("tcost"),hr=document.getElementById("sigma"),Ee=document.getElementById("start"),Ie=document.getElementById("stop"),Ei=document.getElementById("reset"),Dl=document.getElementById("counter"),ur=1,F=new mr(12,1,.2,2,4,ur),Ml=new xr(Cl,F);F.addUpdateEventListener(()=>{Dl.innerText=F.counter.toLocaleString(),Ml.repaint();const e=F.country.cities.map(t=>t.MShare).reduce((t,i)=>i>t?i:t,0);$r({canvas:Rl,diameter:340,vertices:F.numCities,vertexCircleRadius:5,vertexCircleValueSource:F.country.cities.map(t=>t.MShare/e)})});Ee.className="";Ie.className="disabled";st.valueAsNumber=F.country.pi;rt.valueAsNumber=F.country.tcost;nt.valueAsNumber=F.country.sigma;ar.innerText=pt.value;cr.innerText=rt.value;hr.innerText=nt.value;lr.innerText=st.value;function Vl(){Ee.className="disabled",Ie.className="started",Ei.className="started",F.start()}function Ll(){Ee.className="",Ie.className="disabled",Ei.className="",F.stop()}function dr(){F.reset()}function Nl(){ar.innerText=pt.value,F.setNumCities(pt.valueAsNumber,st.valueAsNumber,rt.valueAsNumber,nt.valueAsNumber,ur),F.reset()}function Al(){lr.innerText=st.valueAsNumber.toPrecision(2),F.setPi(st.valueAsNumber),F.calcDistanceMatrix()}function El(){cr.innerText=rt.valueAsNumber.toPrecision(2),F.setTcost(rt.valueAsNumber),F.calcDistanceMatrix()}function Il(){hr.innerText=nt.valueAsNumber.toPrecision(3),F.setSigma(nt.valueAsNumber),F.calcDistanceMatrix()}function Ol(){switch(or.value){case"0":pt.value="12",st.value="0.2",rt.value="2",nt.value="4",F.calcDistanceMatrix();return;case"1":pt.value="12",st.value="0.2",rt.value="2",nt.value="2",F.calcDistanceMatrix();return;case"2":pt.value="12",st.value="0.4",rt.value="2",nt.value="4",F.calcDistanceMatrix();return;case"3":pt.value="12",st.value="0.2",rt.value="1",nt.value="4",F.calcDistanceMatrix();return}}Ee.addEventListener("click",Vl);Ie.addEventListener("click",Ll);Ei.addEventListener("click",dr);pt.addEventListener("change",Nl);st.addEventListener("change",Al);rt.addEventListener("change",El);nt.addEventListener("change",Il);or.addEventListener("change",Ol);const Pl=document.getElementById("scale");Pl.addEventListener("change",e=>{const t=e.target.value,i=parseFloat(t.split(" ")[1]);F.setScale(i)});function Bl(){nr.show()}function Hl(){nr.hide()}Fl.addEventListener("click",Bl);Tl.addEventListener("click",Hl);dr();
