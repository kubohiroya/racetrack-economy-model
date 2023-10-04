var Jr=Object.defineProperty;var Kr=(e,t,i)=>t in e?Jr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var x=(e,t,i)=>(Kr(e,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();class $i{constructor(t,i,r){x(this,"realWage");x(this,"priceIndex");x(this,"priceIndex0");x(this,"income");x(this,"income0");x(this,"AShare");x(this,"MShare");x(this,"MShare0");x(this,"nominalWage");x(this,"nominalWage0");x(this,"dMShare");x(this,"id");this.id=t,this.MShare=i,this.MShare0=i,this.dMShare=0,this.AShare=r,this.priceIndex=1,this.priceIndex0=1,this.income=1,this.income0=1,this.nominalWage=1,this.nominalWage0=1,this.realWage=1}setMShare(t){this.MShare=t}setAShare(t){this.AShare=t}changeMShare(t){this.dMShare=t,this.MShare+=this.dMShare}push(){this.income0=this.income,this.nominalWage0=this.nominalWage,this.priceIndex0=this.priceIndex,this.MShare0=this.MShare}calcIncome(t){this.income=t.pi*this.MShare*this.nominalWage+(1-t.pi)*this.AShare}calcPriceIndex(t){let i=0;t.cities.forEach(r=>{i+=r.MShare*Math.pow(r.nominalWage0*t.distanceMatrix[this.id][r.id],1-t.sigma)}),this.priceIndex=Math.pow(i,1/(1-t.sigma))}calcRealWage(t){this.realWage=this.nominalWage*Math.pow(this.priceIndex,-t.pi)}calcNominalWage(t){let i=0;t.cities.forEach(r=>{i+=r.income0*Math.pow(t.distanceMatrix[this.id][r.id],1-t.sigma)*Math.pow(r.priceIndex0,t.sigma-1)}),this.nominalWage=Math.pow(i,1/t.sigma)}calcDynamics(t){this.dMShare=t.gamma*(this.realWage-t.avgRealWage)*this.MShare}applyDynamics(t){this.MShare>1/t.cities.length/10?this.MShare+=this.dMShare:this.MShare=1/t.cities.length/10}}class ts{constructor(t,i,r,s,n){x(this,"pi");x(this,"avgRealWage");x(this,"tcost");x(this,"sigma");x(this,"distanceMatrix");x(this,"cities");x(this,"gamma");this.pi=i,this.tcost=r,this.sigma=s,this.gamma=n,this.avgRealWage=1,this.cities=new Array(t),this.distanceMatrix=new Array(t);for(let a=0;a<t;a++)this.distanceMatrix[a]=new Array(t).fill(0),this.cities[a]=new $i(a,0,0);this.equalize(),this.calcDistanceMatrix()}reset(){const t=this.cities.length;for(let i=0;i<t;i++)this.distanceMatrix[i]=new Array(t).fill(0),this.cities[i]=new $i(i,0,0);this.equalize(),this.calcDistanceMatrix(),this.disturb()}setSigma(t){this.sigma=t+.1}setTcost(t){this.tcost=t}setPi(t){this.pi=t}calcDistanceMatrix(){const t=this.cities.length;for(let i=0;i<t;i++)for(let r=i;r<t;r++){const s=i==r?0:2*Math.min(r-i,i+t-r)/t;this.distanceMatrix[r][i]=this.distanceMatrix[i][r]=Math.exp(Math.log(this.tcost)*s)}}equalize(){const t=this.cities.length;this.cities.forEach(i=>{i.setMShare(1/t),i.setAShare(1/t)})}disturb(){const t=this.cities.length,i=1/t*.05;for(let r=0;r<t;r++){const s=Math.floor(Math.random()*t);this.cities[s].changeMShare(i)}this.rescale()}rescale(){let t=0,i=0;this.cities.forEach(r=>{t+=r.MShare,i+=r.AShare}),this.cities.forEach(r=>{r.setMShare(r.MShare/t),r.setAShare(r.AShare/i)})}push(){this.cities.forEach(t=>{t.push()})}calcIncome(){this.cities.forEach(t=>{t.calcIncome(this)})}calcPriceIndex(){this.cities.forEach(t=>{t.calcPriceIndex(this)})}calcNominalWage(){this.cities.forEach(t=>{t.calcNominalWage(this)})}calcRealWage(){this.cities.forEach(t=>{t.calcRealWage(this)})}calcAvgRealWage(){let t=0;this.cities.forEach(i=>{t+=i.realWage*i.MShare}),this.avgRealWage=t}calcDynamics(){this.cities.forEach(t=>{t.calcDynamics(this)})}applyDynamics(){this.cities.forEach(t=>{t.applyDynamics(this)}),this.rescale()}procedure(){this.push(),this.calcIncome(),this.calcPriceIndex(),this.calcNominalWage(),this.calcRealWage(),this.calcAvgRealWage(),this.calcDynamics(),this.applyDynamics()}}class es{constructor(t,i,r,s,n,a){x(this,"numCities");x(this,"country");x(this,"counter");x(this,"scale");x(this,"started",!1);x(this,"listeners",new Array);x(this,"timer",null);this.numCities=t,this.country=this.createCountry(t,r,s,n,a),this.scale=i,this.counter=0}createCountry(t,i,r,s,n){return new ts(t,i,r,s,n)}reset(){this.counter=0,this.country.reset(),this.update()}stop(){this.started=!1,this.timer!=null&&clearInterval(this.timer),this.timer=null}start(){this.started||(this.started=!0,this.timer=setInterval(()=>{this.country.procedure(),this.counter++,this.update()},10))}calcDistanceMatrix(){this.country.calcDistanceMatrix()}setNumCities(t,i,r,s,n){this.numCities=t,this.country=this.createCountry(this.numCities,i,r,s,n)}setScale(t){this.scale=t,this.update()}setPi(t){this.country.setPi(t)}setTcost(t){this.country.setTcost(t)}setSigma(t){this.country.setSigma(t)}addUpdateEventListener(t){this.listeners.push(t)}update(){this.listeners.forEach(t=>{t(this)})}}function is(e,t,i,r,s,n){const a=t-n,o=6,l=.1;e.textAlign="right";let c=0;for(let h=0;h<=1;h+=l){const f=i-s-h*r;f>=0&&(e.fillStyle="#ddd",e.fillRect(n,f-1,a,1),e.fillStyle="#888",e.fillText(h.toFixed(1),n-2,f+3),c++)}if(c<5)for(let h=.05;h<=1;h+=l){const f=i-s-h*r;f>=0&&(e.fillRect(n,f-1,o,1),e.fillText(h.toFixed(2),n-2,f+4))}if(c<2)for(let h=.01;h<=1;h+=.01){const f=i-s-h*r;f>=0&&(e.fillRect(n,f-1,o,1),e.fillText(h.toFixed(2),n-2,f+4),c++)}}function rs(e,t,i,r,s,n){if(e.fillStyle="#888",e.textAlign="left",s<=100)for(let o=5;o<=s;o+=5){const l=r+o*i;e.fillText(o.toString(),l,n)}else for(let o=50;o<=s;o+=50){const l=r+o*i;e.fillText(o.toString(),l,n)}}class ss{constructor(t,i){x(this,"model");x(this,"canvas");this.canvas=t,this.model=i}repaint(){const r=this.canvas.getContext("2d");if(!r||!this.model)return;const s=(this.canvas.width-25)/this.model.country.cities.length,n=(this.canvas.height-10*2)*this.model.scale;r.fillStyle="#fff",r.fillRect(0,0,25,this.canvas.height),r.fillStyle="#f4f4f4",r.fillRect(25,10,this.canvas.width-25,this.canvas.height-10*2),is(r,this.canvas.width,this.canvas.height,n,10,25),this.model.country.cities.forEach((a,o)=>{a.dMShare<0?r.fillStyle="#ee8888":r.fillStyle="#dd0000",r.fillRect(25+o*s,this.canvas.height-10-a.MShare*n,Math.max(s-1,1),a.MShare*n)}),r.fillStyle="#fff",r.fillRect(25,this.canvas.height-10,this.canvas.width-25,10),rs(r,this.canvas.width,s,25,this.model.numCities,this.canvas.height-10+10),r.fillStyle="#fff",r.fillRect(0,0,this.canvas.width,10)}}function ns({canvas:e,diameter:t,vertices:i,vertexCircleRadius:r,vertexCircleValueSource:s}){const o=e.getContext("2d");if(!o)return;o.clearRect(0,0,e.width,e.height);const l=t/2,c={x:l,y:l},h=2*Math.PI/i;o.beginPath(),o.arc(20+c.x,20+c.y,l,0,2*Math.PI),o.stroke(),o.beginPath();for(let f=0;f<i;f++){const v=c.x+l*Math.cos(f*h),$=c.y+l*Math.sin(f*h);f===0?o.moveTo(20+v,20+$):o.lineTo(20+v,20+$),o.beginPath(),o.arc(20+v,20+$,r,0,2*Math.PI),o.fillStyle=`rgb(255, 0, 0, ${s[f]})`,o.fill();const w=c.x+(l+15)*Math.cos(f*h)-7,y=c.y+(l+15)*Math.sin(f*h);o.fillStyle="rgb(5, 5, 5, .5)",(i<100&&f%5==0||100<=i&&f%50==0)&&o.fillText(`${f}`,20+w,20+y+3)}o.closePath()}const at=function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}}();at.trustedTypes===void 0&&(at.trustedTypes={createPolicy:(e,t)=>t});const sr={configurable:!1,enumerable:!1,writable:!1};at.FAST===void 0&&Reflect.defineProperty(at,"FAST",Object.assign({value:Object.create(null)},sr));const zt=at.FAST;if(zt.getById===void 0){const e=Object.create(null);Reflect.defineProperty(zt,"getById",Object.assign({value(t,i){let r=e[t];return r===void 0&&(r=i?e[t]=i():null),r}},sr))}const Ot=Object.freeze([]);function nr(){const e=new WeakMap;return function(t){let i=e.get(t);if(i===void 0){let r=Reflect.getPrototypeOf(t);for(;i===void 0&&r!==null;)i=e.get(r),r=Reflect.getPrototypeOf(r);i=i===void 0?[]:i.slice(0),e.set(t,i)}return i}}const Ve=at.FAST.getById(1,()=>{const e=[],t=[];function i(){if(t.length)throw t.shift()}function r(a){try{a.call()}catch(o){t.push(o),setTimeout(i,0)}}function s(){let o=0;for(;o<e.length;)if(r(e[o]),o++,o>1024){for(let l=0,c=e.length-o;l<c;l++)e[l]=e[l+o];e.length-=o,o=0}e.length=0}function n(a){e.length<1&&at.requestAnimationFrame(s),e.push(a)}return Object.freeze({enqueue:n,process:s})}),or=at.trustedTypes.createPolicy("fast-html",{createHTML:e=>e});let Re=or;const Bt=`fast-${Math.random().toString(36).substring(2,8)}`,ar=`${Bt}{`,ai=`}${Bt}`,S=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(e){if(Re!==or)throw new Error("The HTML policy can only be set once.");Re=e},createHTML(e){return Re.createHTML(e)},isMarker(e){return e&&e.nodeType===8&&e.data.startsWith(Bt)},extractDirectiveIndexFromMarker(e){return parseInt(e.data.replace(`${Bt}:`,""))},createInterpolationPlaceholder(e){return`${ar}${e}${ai}`},createCustomAttributePlaceholder(e,t){return`${e}="${this.createInterpolationPlaceholder(t)}"`},createBlockPlaceholder(e){return`<!--${Bt}:${e}-->`},queueUpdate:Ve.enqueue,processUpdates:Ve.process,nextUpdate(){return new Promise(Ve.enqueue)},setAttribute(e,t,i){i==null?e.removeAttribute(t):e.setAttribute(t,i)},setBooleanAttribute(e,t,i){i?e.setAttribute(t,""):e.removeAttribute(t)},removeChildNodes(e){for(let t=e.firstChild;t!==null;t=e.firstChild)e.removeChild(t)},createTemplateWalker(e){return document.createTreeWalker(e,133,null,!1)}});class Ge{constructor(t,i){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=i}has(t){return this.spillover===void 0?this.sub1===t||this.sub2===t:this.spillover.indexOf(t)!==-1}subscribe(t){const i=this.spillover;if(i===void 0){if(this.has(t))return;if(this.sub1===void 0){this.sub1=t;return}if(this.sub2===void 0){this.sub2=t;return}this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else i.indexOf(t)===-1&&i.push(t)}unsubscribe(t){const i=this.spillover;if(i===void 0)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}notify(t){const i=this.spillover,r=this.source;if(i===void 0){const s=this.sub1,n=this.sub2;s!==void 0&&s.handleChange(r,t),n!==void 0&&n.handleChange(r,t)}else for(let s=0,n=i.length;s<n;++s)i[s].handleChange(r,t)}}class lr{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var i;const r=this.subscribers[t];r!==void 0&&r.notify(t),(i=this.sourceSubscribers)===null||i===void 0||i.notify(t)}subscribe(t,i){var r;if(i){let s=this.subscribers[i];s===void 0&&(this.subscribers[i]=s=new Ge(this.source)),s.subscribe(t)}else this.sourceSubscribers=(r=this.sourceSubscribers)!==null&&r!==void 0?r:new Ge(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,i){var r;if(i){const s=this.subscribers[i];s!==void 0&&s.unsubscribe(t)}else(r=this.sourceSubscribers)===null||r===void 0||r.unsubscribe(t)}}const C=zt.getById(2,()=>{const e=/(:|&&|\|\||if)/,t=new WeakMap,i=S.queueUpdate;let r,s=c=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function n(c){let h=c.$fastController||t.get(c);return h===void 0&&(Array.isArray(c)?h=s(c):t.set(c,h=new lr(c))),h}const a=nr();class o{constructor(h){this.name=h,this.field=`_${h}`,this.callback=`${h}Changed`}getValue(h){return r!==void 0&&r.watch(h,this.name),h[this.field]}setValue(h,f){const v=this.field,$=h[v];if($!==f){h[v]=f;const w=h[this.callback];typeof w=="function"&&w.call(h,$,f),n(h).notify(this.name)}}}class l extends Ge{constructor(h,f,v=!1){super(h,f),this.binding=h,this.isVolatileBinding=v,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(h,f){this.needsRefresh&&this.last!==null&&this.disconnect();const v=r;r=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const $=this.binding(h,f);return r=v,$}disconnect(){if(this.last!==null){let h=this.first;for(;h!==void 0;)h.notifier.unsubscribe(this,h.propertyName),h=h.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(h,f){const v=this.last,$=n(h),w=v===null?this.first:{};if(w.propertySource=h,w.propertyName=f,w.notifier=$,$.subscribe(this,f),v!==null){if(!this.needsRefresh){let y;r=void 0,y=v.propertySource[v.propertyName],r=this,h===y&&(this.needsRefresh=!0)}v.next=w}this.last=w}handleChange(){this.needsQueue&&(this.needsQueue=!1,i(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let h=this.first;return{next:()=>{const f=h;return f===void 0?{value:void 0,done:!0}:(h=h.next,{value:f,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(c){s=c},getNotifier:n,track(c,h){r!==void 0&&r.watch(c,h)},trackVolatile(){r!==void 0&&(r.needsRefresh=!0)},notify(c,h){n(c).notify(h)},defineProperty(c,h){typeof h=="string"&&(h=new o(h)),a(c).push(h),Reflect.defineProperty(c,h.name,{enumerable:!0,get:function(){return h.getValue(this)},set:function(f){h.setValue(this,f)}})},getAccessors:a,binding(c,h,f=this.isVolatileBinding(c)){return new l(c,h,f)},isVolatileBinding(c){return e.test(c.toString())}})});function V(e,t){C.defineProperty(e,t)}const Fi=zt.getById(3,()=>{let e=null;return{get(){return e},set(t){e=t}}});class Wt{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return Fi.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){Fi.set(t)}}C.defineProperty(Wt.prototype,"index");C.defineProperty(Wt.prototype,"length");const Ht=Object.seal(new Wt);class li{constructor(){this.targetIndex=0}}class cr extends li{constructor(){super(...arguments),this.createPlaceholder=S.createInterpolationPlaceholder}}class hr extends li{constructor(t,i,r){super(),this.name=t,this.behavior=i,this.options=r}createPlaceholder(t){return S.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function os(e,t){this.source=e,this.context=t,this.bindingObserver===null&&(this.bindingObserver=C.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(e,t))}function as(e,t){this.source=e,this.context=t,this.target.addEventListener(this.targetName,this)}function ls(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function cs(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const e=this.target.$fastView;e!==void 0&&e.isComposed&&(e.unbind(),e.needsBindOnly=!0)}function hs(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function us(e){S.setAttribute(this.target,this.targetName,e)}function ds(e){S.setBooleanAttribute(this.target,this.targetName,e)}function fs(e){if(e==null&&(e=""),e.create){this.target.textContent="";let t=this.target.$fastView;t===void 0?t=e.create():this.target.$fastTemplate!==e&&(t.isComposed&&(t.remove(),t.unbind()),t=e.create()),t.isComposed?t.needsBindOnly&&(t.needsBindOnly=!1,t.bind(this.source,this.context)):(t.isComposed=!0,t.bind(this.source,this.context),t.insertBefore(this.target),this.target.$fastView=t,this.target.$fastTemplate=e)}else{const t=this.target.$fastView;t!==void 0&&t.isComposed&&(t.isComposed=!1,t.remove(),t.needsBindOnly?t.needsBindOnly=!1:t.unbind()),this.target.textContent=e}}function ps(e){this.target[this.targetName]=e}function gs(e){const t=this.classVersions||Object.create(null),i=this.target;let r=this.version||0;if(e!=null&&e.length){const s=e.split(/\s+/);for(let n=0,a=s.length;n<a;++n){const o=s[n];o!==""&&(t[o]=r,i.classList.add(o))}}if(this.classVersions=t,this.version=r+1,r!==0){r-=1;for(const s in t)t[s]===r&&i.classList.remove(s)}}class ci extends cr{constructor(t){super(),this.binding=t,this.bind=os,this.unbind=ls,this.updateTarget=us,this.isBindingVolatile=C.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,t!==void 0)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=ps,this.cleanedTargetName==="innerHTML"){const i=this.binding;this.binding=(r,s)=>S.createHTML(i(r,s))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=ds;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=as,this.unbind=hs;break;default:this.cleanedTargetName=t,t==="class"&&(this.updateTarget=gs);break}}targetAtContent(){this.updateTarget=fs,this.unbind=cs}createBehavior(t){return new bs(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class bs{constructor(t,i,r,s,n,a,o){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=i,this.isBindingVolatile=r,this.bind=s,this.unbind=n,this.updateTarget=a,this.targetName=o}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){Wt.setEvent(t);const i=this.binding(this.source,this.context);Wt.setEvent(null),i!==!0&&t.preventDefault()}}let Le=null;class hi{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){Le=this}static borrow(t){const i=Le||new hi;return i.directives=t,i.reset(),Le=null,i}}function vs(e){if(e.length===1)return e[0];let t;const i=e.length,r=e.map(a=>typeof a=="string"?()=>a:(t=a.targetName||t,a.binding)),s=(a,o)=>{let l="";for(let c=0;c<i;++c)l+=r[c](a,o);return l},n=new ci(s);return n.targetName=t,n}const ms=ai.length;function ur(e,t){const i=t.split(ar);if(i.length===1)return null;const r=[];for(let s=0,n=i.length;s<n;++s){const a=i[s],o=a.indexOf(ai);let l;if(o===-1)l=a;else{const c=parseInt(a.substring(0,o));r.push(e.directives[c]),l=a.substring(o+ms)}l!==""&&r.push(l)}return r}function ki(e,t,i=!1){const r=t.attributes;for(let s=0,n=r.length;s<n;++s){const a=r[s],o=a.value,l=ur(e,o);let c=null;l===null?i&&(c=new ci(()=>o),c.targetName=a.name):c=vs(l),c!==null&&(t.removeAttributeNode(a),s--,n--,e.addFactory(c))}}function ys(e,t,i){const r=ur(e,t.textContent);if(r!==null){let s=t;for(let n=0,a=r.length;n<a;++n){const o=r[n],l=n===0?t:s.parentNode.insertBefore(document.createTextNode(""),s.nextSibling);typeof o=="string"?l.textContent=o:(l.textContent=" ",e.captureContentBinding(o)),s=l,e.targetIndex++,l!==t&&i.nextNode()}e.targetIndex--}}function ws(e,t){const i=e.content;document.adoptNode(i);const r=hi.borrow(t);ki(r,e,!0);const s=r.behaviorFactories;r.reset();const n=S.createTemplateWalker(i);let a;for(;a=n.nextNode();)switch(r.targetIndex++,a.nodeType){case 1:ki(r,a);break;case 3:ys(r,a,n);break;case 8:S.isMarker(a)&&r.addFactory(t[S.extractDirectiveIndexFromMarker(a)])}let o=0;(S.isMarker(i.firstChild)||i.childNodes.length===1&&t.length)&&(i.insertBefore(document.createComment(""),i.firstChild),o=-1);const l=r.behaviorFactories;return r.release(),{fragment:i,viewBehaviorFactories:l,hostBehaviorFactories:s,targetOffset:o}}const Ne=document.createRange();class xs{constructor(t,i){this.fragment=t,this.behaviors=i,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const i=this.lastChild;if(t.previousSibling===i)return;const r=t.parentNode;let s=this.firstChild,n;for(;s!==i;)n=s.nextSibling,r.insertBefore(s,t),s=n;r.insertBefore(i,t)}}remove(){const t=this.fragment,i=this.lastChild;let r=this.firstChild,s;for(;r!==i;)s=r.nextSibling,t.appendChild(r),r=s;t.appendChild(i)}dispose(){const t=this.firstChild.parentNode,i=this.lastChild;let r=this.firstChild,s;for(;r!==i;)s=r.nextSibling,t.removeChild(r),r=s;t.removeChild(i);const n=this.behaviors,a=this.source;for(let o=0,l=n.length;o<l;++o)n[o].unbind(a)}bind(t,i){const r=this.behaviors;if(this.source!==t)if(this.source!==null){const s=this.source;this.source=t,this.context=i;for(let n=0,a=r.length;n<a;++n){const o=r[n];o.unbind(s),o.bind(t,i)}}else{this.source=t,this.context=i;for(let s=0,n=r.length;s<n;++s)r[s].bind(t,i)}}unbind(){if(this.source===null)return;const t=this.behaviors,i=this.source;for(let r=0,s=t.length;r<s;++r)t[r].unbind(i);this.source=null}static disposeContiguousBatch(t){if(t.length!==0){Ne.setStartBefore(t[0].firstChild),Ne.setEndAfter(t[t.length-1].lastChild),Ne.deleteContents();for(let i=0,r=t.length;i<r;++i){const s=t[i],n=s.behaviors,a=s.source;for(let o=0,l=n.length;o<l;++o)n[o].unbind(a)}}}}class Ci{constructor(t,i){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=i}create(t){if(this.fragment===null){let c;const h=this.html;if(typeof h=="string"){c=document.createElement("template"),c.innerHTML=S.createHTML(h);const v=c.content.firstElementChild;v!==null&&v.tagName==="TEMPLATE"&&(c=v)}else c=h;const f=ws(c,this.directives);this.fragment=f.fragment,this.viewBehaviorFactories=f.viewBehaviorFactories,this.hostBehaviorFactories=f.hostBehaviorFactories,this.targetOffset=f.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const i=this.fragment.cloneNode(!0),r=this.viewBehaviorFactories,s=new Array(this.behaviorCount),n=S.createTemplateWalker(i);let a=0,o=this.targetOffset,l=n.nextNode();for(let c=r.length;a<c;++a){const h=r[a],f=h.targetIndex;for(;l!==null;)if(o===f){s[a]=h.createBehavior(l);break}else l=n.nextNode(),o++}if(this.hasHostBehaviors){const c=this.hostBehaviorFactories;for(let h=0,f=c.length;h<f;++h,++a)s[a]=c[h].createBehavior(t)}return new xs(i,s)}render(t,i,r){typeof i=="string"&&(i=document.getElementById(i)),r===void 0&&(r=i);const s=this.create(r);return s.bind(t,Ht),s.appendTo(i),s}}const Ss=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function et(e,...t){const i=[];let r="";for(let s=0,n=e.length-1;s<n;++s){const a=e[s];let o=t[s];if(r+=a,o instanceof Ci){const l=o;o=()=>l}if(typeof o=="function"&&(o=new ci(o)),o instanceof cr){const l=Ss.exec(a);l!==null&&(o.targetName=l[2])}o instanceof li?(r+=o.createPlaceholder(i.length),i.push(o)):r+=o}return r+=e[e.length-1],new Ci(r,i)}class j{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=this.behaviors===null?t:this.behaviors.concat(t),this}}j.create=(()=>{if(S.supportsAdoptedStyleSheets){const e=new Map;return t=>new $s(t,e)}return e=>new Cs(e)})();function ui(e){return e.map(t=>t instanceof j?ui(t.styles):[t]).reduce((t,i)=>t.concat(i),[])}function dr(e){return e.map(t=>t instanceof j?t.behaviors:null).reduce((t,i)=>i===null?t:(t===null&&(t=[]),t.concat(i)),null)}let fr=(e,t)=>{e.adoptedStyleSheets=[...e.adoptedStyleSheets,...t]},pr=(e,t)=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(i=>t.indexOf(i)===-1)};if(S.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),fr=(e,t)=>{e.adoptedStyleSheets.push(...t)},pr=(e,t)=>{for(const i of t){const r=e.adoptedStyleSheets.indexOf(i);r!==-1&&e.adoptedStyleSheets.splice(r,1)}}}catch{}class $s extends j{constructor(t,i){super(),this.styles=t,this.styleSheetCache=i,this._styleSheets=void 0,this.behaviors=dr(t)}get styleSheets(){if(this._styleSheets===void 0){const t=this.styles,i=this.styleSheetCache;this._styleSheets=ui(t).map(r=>{if(r instanceof CSSStyleSheet)return r;let s=i.get(r);return s===void 0&&(s=new CSSStyleSheet,s.replaceSync(r),i.set(r,s)),s})}return this._styleSheets}addStylesTo(t){fr(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){pr(t,this.styleSheets),super.removeStylesFrom(t)}}let Fs=0;function ks(){return`fast-style-class-${++Fs}`}class Cs extends j{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=dr(t),this.styleSheets=ui(t),this.styleClass=ks()}addStylesTo(t){const i=this.styleSheets,r=this.styleClass;t=this.normalizeTarget(t);for(let s=0;s<i.length;s++){const n=document.createElement("style");n.innerHTML=i[s],n.className=r,t.append(n)}super.addStylesTo(t)}removeStylesFrom(t){t=this.normalizeTarget(t);const i=t.querySelectorAll(`.${this.styleClass}`);for(let r=0,s=i.length;r<s;++r)t.removeChild(i[r]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const se=Object.freeze({locate:nr()}),Ts={toView(e){return e?"true":"false"},fromView(e){return!(e==null||e==="false"||e===!1||e===0)}},di={toView(e){if(e==null)return null;const t=e*1;return isNaN(t)?null:t.toString()},fromView(e){if(e==null)return null;const t=e*1;return isNaN(t)?null:t}};class ne{constructor(t,i,r=i.toLowerCase(),s="reflect",n){this.guards=new Set,this.Owner=t,this.name=i,this.attribute=r,this.mode=s,this.converter=n,this.fieldName=`_${i}`,this.callbackName=`${i}Changed`,this.hasCallback=this.callbackName in t.prototype,s==="boolean"&&n===void 0&&(this.converter=Ts)}setValue(t,i){const r=t[this.fieldName],s=this.converter;s!==void 0&&(i=s.fromView(i)),r!==i&&(t[this.fieldName]=i,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](r,i),t.$fastController.notify(this.name))}getValue(t){return C.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,i){this.guards.has(t)||(this.guards.add(t),this.setValue(t,i),this.guards.delete(t))}tryReflectToAttribute(t){const i=this.mode,r=this.guards;r.has(t)||i==="fromView"||S.queueUpdate(()=>{r.add(t);const s=t[this.fieldName];switch(i){case"reflect":const n=this.converter;S.setAttribute(t,this.attribute,n!==void 0?n.toView(s):s);break;case"boolean":S.setBooleanAttribute(t,this.attribute,s);break}r.delete(t)})}static collect(t,...i){const r=[];i.push(se.locate(t));for(let s=0,n=i.length;s<n;++s){const a=i[s];if(a!==void 0)for(let o=0,l=a.length;o<l;++o){const c=a[o];typeof c=="string"?r.push(new ne(t,c)):r.push(new ne(t,c.property,c.attribute,c.mode,c.converter))}}return r}}function g(e,t){let i;function r(s,n){arguments.length>1&&(i.property=n),se.locate(s.constructor).push(i)}if(arguments.length>1){i={},r(e,t);return}return i=e===void 0?{}:e,r}const Ti={mode:"open"},Di={},_e=zt.getById(4,()=>{const e=new Map;return Object.freeze({register(t){return e.has(t.type)?!1:(e.set(t.type,t),!0)},getByType(t){return e.get(t)}})});class ue{constructor(t,i=t.definition){typeof i=="string"&&(i={name:i}),this.type=t,this.name=i.name,this.template=i.template;const r=ne.collect(t,i.attributes),s=new Array(r.length),n={},a={};for(let o=0,l=r.length;o<l;++o){const c=r[o];s[o]=c.attribute,n[c.name]=c,a[c.attribute]=c}this.attributes=r,this.observedAttributes=s,this.propertyLookup=n,this.attributeLookup=a,this.shadowOptions=i.shadowOptions===void 0?Ti:i.shadowOptions===null?void 0:Object.assign(Object.assign({},Ti),i.shadowOptions),this.elementOptions=i.elementOptions===void 0?Di:Object.assign(Object.assign({},Di),i.elementOptions),this.styles=i.styles===void 0?void 0:Array.isArray(i.styles)?j.create(i.styles):i.styles instanceof j?i.styles:j.create([i.styles])}get isDefined(){return!!_e.getByType(this.type)}define(t=customElements){const i=this.type;if(_e.register(this)){const r=this.attributes,s=i.prototype;for(let n=0,a=r.length;n<a;++n)C.defineProperty(s,r[n]);Reflect.defineProperty(i,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,i,this.elementOptions),this}}ue.forType=_e.getByType;const gr=new WeakMap,Ds={bubbles:!0,composed:!0,cancelable:!0};function Pe(e){return e.shadowRoot||gr.get(e)||null}class fi extends lr{constructor(t,i){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=i;const r=i.shadowOptions;if(r!==void 0){const n=t.attachShadow(r);r.mode==="closed"&&gr.set(t,n)}const s=C.getAccessors(t);if(s.length>0){const n=this.boundObservables=Object.create(null);for(let a=0,o=s.length;a<o;++a){const l=s[a].name,c=t[l];c!==void 0&&(delete t[l],n[l]=c)}}}get isConnected(){return C.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,C.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=t,!this.needsInitialization&&t!==null&&this.addStyles(t))}addStyles(t){const i=Pe(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)i.append(t);else if(!t.isAttachedTo(i)){const r=t.behaviors;t.addStylesTo(i),r!==null&&this.addBehaviors(r)}}removeStyles(t){const i=Pe(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)i.removeChild(t);else if(t.isAttachedTo(i)){const r=t.behaviors;t.removeStylesFrom(i),r!==null&&this.removeBehaviors(r)}}addBehaviors(t){const i=this.behaviors||(this.behaviors=new Map),r=t.length,s=[];for(let n=0;n<r;++n){const a=t[n];i.has(a)?i.set(a,i.get(a)+1):(i.set(a,1),s.push(a))}if(this._isConnected){const n=this.element;for(let a=0;a<s.length;++a)s[a].bind(n,Ht)}}removeBehaviors(t,i=!1){const r=this.behaviors;if(r===null)return;const s=t.length,n=[];for(let a=0;a<s;++a){const o=t[a];if(r.has(o)){const l=r.get(o)-1;l===0||i?r.delete(o)&&n.push(o):r.set(o,l)}}if(this._isConnected){const a=this.element;for(let o=0;o<n.length;++o)n[o].unbind(a)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(t,Ht);const i=this.behaviors;if(i!==null)for(const[r]of i)r.bind(t,Ht);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;t!==null&&t.unbind();const i=this.behaviors;if(i!==null){const r=this.element;for(const[s]of i)s.unbind(r)}}onAttributeChangedCallback(t,i,r){const s=this.definition.attributeLookup[t];s!==void 0&&s.onAttributeChangedCallback(this.element,r)}emit(t,i,r){return this._isConnected?this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:i},Ds),r))):!1}finishInitialization(){const t=this.element,i=this.boundObservables;if(i!==null){const s=Object.keys(i);for(let n=0,a=s.length;n<a;++n){const o=s[n];t[o]=i[o]}this.boundObservables=null}const r=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():r.template&&(this._template=r.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():r.styles&&(this._styles=r.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const i=this.element,r=Pe(i)||i;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||S.removeChildNodes(r),t&&(this.view=t.render(i,r,i))}static forCustomElement(t){const i=t.$fastController;if(i!==void 0)return i;const r=ue.forType(t.constructor);if(r===void 0)throw new Error("Missing FASTElement definition.");return t.$fastController=new fi(t,r)}}function Mi(e){return class extends e{constructor(){super(),fi.forCustomElement(this)}$emit(t,i,r){return this.$fastController.emit(t,i,r)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,i,r){this.$fastController.onAttributeChangedCallback(t,i,r)}}}const de=Object.assign(Mi(HTMLElement),{from(e){return Mi(e)},define(e,t){return new ue(e,t).define().type}});class pi{createCSS(){return""}createBehavior(){}}function br(e,t){const i=[];let r="";const s=[];for(let n=0,a=e.length-1;n<a;++n){r+=e[n];let o=t[n];if(o instanceof pi){const l=o.createBehavior();o=o.createCSS(),l&&s.push(l)}o instanceof j||o instanceof CSSStyleSheet?(r.trim()!==""&&(i.push(r),r=""),i.push(o)):r+=o}return r+=e[e.length-1],r.trim()!==""&&i.push(r),{styles:i,behaviors:s}}function m(e,...t){const{styles:i,behaviors:r}=br(e,t),s=j.create(i);return r.length&&s.withBehaviors(...r),s}class Ms extends pi{constructor(t,i){super(),this.behaviors=i,this.css="";const r=t.reduce((s,n)=>(typeof n=="string"?this.css+=n:s.push(n),s),[]);r.length&&(this.styles=j.create(r))}createBehavior(){return this}createCSS(){return this.css}bind(t){this.styles&&t.$fastController.addStyles(this.styles),this.behaviors.length&&t.$fastController.addBehaviors(this.behaviors)}unbind(t){this.styles&&t.$fastController.removeStyles(this.styles),this.behaviors.length&&t.$fastController.removeBehaviors(this.behaviors)}}function Vs(e,...t){const{styles:i,behaviors:r}=br(e,t);return new Ms(i,r)}class Rs{constructor(t,i){this.target=t,this.propertyName=i}bind(t){t[this.propertyName]=this.target}unbind(){}}function _(e){return new hr("fast-ref",Rs,e)}const vr=e=>typeof e=="function",Ls=()=>null;function Vi(e){return e===void 0?Ls:vr(e)?e:()=>e}function mr(e,t,i){const r=vr(e)?e:()=>e,s=Vi(t),n=Vi(i);return(a,o)=>r(a,o)?s(a,o):n(a,o)}class Ns{constructor(t,i){this.target=t,this.options=i,this.source=null}bind(t){const i=this.options.property;this.shouldUpdate=C.getAccessors(t).some(r=>r.name===i),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(Ot),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return this.options.filter!==void 0&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class Ps extends Ns{constructor(t,i){super(t,i)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function Es(e){return typeof e=="string"&&(e={property:e}),new hr("fast-slotted",Ps,e)}class Is{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const As=(e,t)=>et`
    <span
        part="end"
        ${_("endContainer")}
        class=${i=>t.end?"end":void 0}
    >
        <slot name="end" ${_("end")} @slotchange="${i=>i.handleEndContentChange()}">
            ${t.end||""}
        </slot>
    </span>
`,Os=(e,t)=>et`
    <span
        part="start"
        ${_("startContainer")}
        class="${i=>t.start?"start":void 0}"
    >
        <slot
            name="start"
            ${_("start")}
            @slotchange="${i=>i.handleStartContentChange()}"
        >
            ${t.start||""}
        </slot>
    </span>
`;et`
    <span part="end" ${_("endContainer")}>
        <slot
            name="end"
            ${_("end")}
            @slotchange="${e=>e.handleEndContentChange()}"
        ></slot>
    </span>
`;et`
    <span part="start" ${_("startContainer")}>
        <slot
            name="start"
            ${_("start")}
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
***************************************************************************** */function p(e,t,i,r){var s=arguments.length,n=s<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(n=(s<3?a(n):s>3?a(t,i,n):a(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n}const Ee=new Map;"metadata"in Reflect||(Reflect.metadata=function(e,t){return function(i){Reflect.defineMetadata(e,t,i)}},Reflect.defineMetadata=function(e,t,i){let r=Ee.get(i);r===void 0&&Ee.set(i,r=new Map),r.set(e,t)},Reflect.getOwnMetadata=function(e,t){const i=Ee.get(t);if(i!==void 0)return i.get(e)});class Bs{constructor(t,i){this.container=t,this.key=i}instance(t){return this.registerResolver(0,t)}singleton(t){return this.registerResolver(1,t)}transient(t){return this.registerResolver(2,t)}callback(t){return this.registerResolver(3,t)}cachedCallback(t){return this.registerResolver(3,wr(t))}aliasTo(t){return this.registerResolver(5,t)}registerResolver(t,i){const{container:r,key:s}=this;return this.container=this.key=void 0,r.registerResolver(s,new X(s,t,i))}}function Lt(e){const t=e.slice(),i=Object.keys(e),r=i.length;let s;for(let n=0;n<r;++n)s=i[n],xr(s)||(t[s]=e[s]);return t}const Hs=Object.freeze({none(e){throw Error(`${e.toString()} not registered, did you forget to add @singleton()?`)},singleton(e){return new X(e,1,e)},transient(e){return new X(e,2,e)}}),Ie=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:Hs.singleton})}),Ri=new Map;function Li(e){return t=>Reflect.getOwnMetadata(e,t)}let Ni=null;const F=Object.freeze({createContainer(e){return new jt(null,Object.assign({},Ie.default,e))},findResponsibleContainer(e){const t=e.$$container$$;return t&&t.responsibleForOwnerRequests?t:F.findParentContainer(e)},findParentContainer(e){const t=new CustomEvent(yr,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return e.dispatchEvent(t),t.detail.container||F.getOrCreateDOMContainer()},getOrCreateDOMContainer(e,t){return e?e.$$container$$||new jt(e,Object.assign({},Ie.default,t,{parentLocator:F.findParentContainer})):Ni||(Ni=new jt(null,Object.assign({},Ie.default,t,{parentLocator:()=>null})))},getDesignParamtypes:Li("design:paramtypes"),getAnnotationParamtypes:Li("di:paramtypes"),getOrCreateAnnotationParamTypes(e){let t=this.getAnnotationParamtypes(e);return t===void 0&&Reflect.defineMetadata("di:paramtypes",t=[],e),t},getDependencies(e){let t=Ri.get(e);if(t===void 0){const i=e.inject;if(i===void 0){const r=F.getDesignParamtypes(e),s=F.getAnnotationParamtypes(e);if(r===void 0)if(s===void 0){const n=Object.getPrototypeOf(e);typeof n=="function"&&n!==Function.prototype?t=Lt(F.getDependencies(n)):t=[]}else t=Lt(s);else if(s===void 0)t=Lt(r);else{t=Lt(r);let n=s.length,a;for(let c=0;c<n;++c)a=s[c],a!==void 0&&(t[c]=a);const o=Object.keys(s);n=o.length;let l;for(let c=0;c<n;++c)l=o[c],xr(l)||(t[l]=s[l])}}else t=Lt(i);Ri.set(e,t)}return t},defineProperty(e,t,i,r=!1){const s=`$di_${t}`;Reflect.defineProperty(e,t,{get:function(){let n=this[s];if(n===void 0&&(n=(this instanceof HTMLElement?F.findResponsibleContainer(this):F.getOrCreateDOMContainer()).get(i),this[s]=n,r&&this instanceof de)){const o=this.$fastController,l=()=>{const h=F.findResponsibleContainer(this).get(i),f=this[s];h!==f&&(this[s]=n,o.notify(t))};o.subscribe({handleChange:l},"isConnected")}return n}})},createInterface(e,t){const i=typeof e=="function"?e:t,r=typeof e=="string"?e:e&&"friendlyName"in e&&e.friendlyName||Ai,s=typeof e=="string"?!1:e&&"respectConnection"in e&&e.respectConnection||!1,n=function(a,o,l){if(a==null||new.target!==void 0)throw new Error(`No registration for interface: '${n.friendlyName}'`);if(o)F.defineProperty(a,o,n,s);else{const c=F.getOrCreateAnnotationParamTypes(a);c[l]=n}};return n.$isInterface=!0,n.friendlyName=r??"(anonymous)",i!=null&&(n.register=function(a,o){return i(new Bs(a,o??n))}),n.toString=function(){return`InterfaceSymbol<${n.friendlyName}>`},n},inject(...e){return function(t,i,r){if(typeof r=="number"){const s=F.getOrCreateAnnotationParamTypes(t),n=e[0];n!==void 0&&(s[r]=n)}else if(i)F.defineProperty(t,i,e[0]);else{const s=r?F.getOrCreateAnnotationParamTypes(r.value):F.getOrCreateAnnotationParamTypes(t);let n;for(let a=0;a<e.length;++a)n=e[a],n!==void 0&&(s[a]=n)}}},transient(e){return e.register=function(i){return qt.transient(e,e).register(i)},e.registerInRequestor=!1,e},singleton(e,t=zs){return e.register=function(r){return qt.singleton(e,e).register(r)},e.registerInRequestor=t.scoped,e}}),js=F.createInterface("Container");F.inject;const zs={scoped:!1};class X{constructor(t,i,r){this.key=t,this.strategy=i,this.state=r,this.resolving=!1}get $isResolver(){return!0}register(t){return t.registerResolver(this.key,this)}resolve(t,i){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=t.getFactory(this.state).construct(i),this.strategy=0,this.resolving=!1,this.state}case 2:{const r=t.getFactory(this.state);if(r===null)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return r.construct(i)}case 3:return this.state(t,i,this);case 4:return this.state[0].resolve(t,i);case 5:return i.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(t){var i,r,s;switch(this.strategy){case 1:case 2:return t.getFactory(this.state);case 5:return(s=(r=(i=t.getResolver(this.state))===null||i===void 0?void 0:i.getFactory)===null||r===void 0?void 0:r.call(i,t))!==null&&s!==void 0?s:null;default:return null}}}function Pi(e){return this.get(e)}function Ws(e,t){return t(e)}class qs{constructor(t,i){this.Type=t,this.dependencies=i,this.transformers=null}construct(t,i){let r;return i===void 0?r=new this.Type(...this.dependencies.map(Pi,t)):r=new this.Type(...this.dependencies.map(Pi,t),...i),this.transformers==null?r:this.transformers.reduce(Ws,r)}registerTransformer(t){(this.transformers||(this.transformers=[])).push(t)}}const Us={$isResolver:!0,resolve(e,t){return t}};function ie(e){return typeof e.register=="function"}function Gs(e){return ie(e)&&typeof e.registerInRequestor=="boolean"}function Ei(e){return Gs(e)&&e.registerInRequestor}function _s(e){return e.prototype!==void 0}const Xs=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),yr="__DI_LOCATE_PARENT__",Ae=new Map;class jt{constructor(t,i){this.owner=t,this.config=i,this._parent=void 0,this.registerDepth=0,this.context=null,t!==null&&(t.$$container$$=this),this.resolvers=new Map,this.resolvers.set(js,Us),t instanceof Node&&t.addEventListener(yr,r=>{r.composedPath()[0]!==this.owner&&(r.detail.container=this,r.stopImmediatePropagation())})}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(t,...i){return this.context=t,this.register(...i),this.context=null,this}register(...t){if(++this.registerDepth===100)throw new Error("Unable to autoregister dependency");let i,r,s,n,a;const o=this.context;for(let l=0,c=t.length;l<c;++l)if(i=t[l],!!Oi(i))if(ie(i))i.register(this,o);else if(_s(i))qt.singleton(i,i).register(this);else for(r=Object.keys(i),n=0,a=r.length;n<a;++n)s=i[r[n]],Oi(s)&&(ie(s)?s.register(this,o):this.register(s));return--this.registerDepth,this}registerResolver(t,i){Zt(t);const r=this.resolvers,s=r.get(t);return s==null?r.set(t,i):s instanceof X&&s.strategy===4?s.state.push(i):r.set(t,new X(t,4,[s,i])),i}registerTransformer(t,i){const r=this.getResolver(t);if(r==null)return!1;if(r.getFactory){const s=r.getFactory(this);return s==null?!1:(s.registerTransformer(i),!0)}return!1}getResolver(t,i=!0){if(Zt(t),t.resolve!==void 0)return t;let r=this,s;for(;r!=null;)if(s=r.resolvers.get(t),s==null){if(r.parent==null){const n=Ei(t)?this:r;return i?this.jitRegister(t,n):null}r=r.parent}else return s;return null}has(t,i=!1){return this.resolvers.has(t)?!0:i&&this.parent!=null?this.parent.has(t,!0):!1}get(t){if(Zt(t),t.$isResolver)return t.resolve(this,this);let i=this,r;for(;i!=null;)if(r=i.resolvers.get(t),r==null){if(i.parent==null){const s=Ei(t)?this:i;return r=this.jitRegister(t,s),r.resolve(i,this)}i=i.parent}else return r.resolve(i,this);throw new Error(`Unable to resolve key: ${t}`)}getAll(t,i=!1){Zt(t);const r=this;let s=r,n;if(i){let a=Ot;for(;s!=null;)n=s.resolvers.get(t),n!=null&&(a=a.concat(Ii(n,s,r))),s=s.parent;return a}else for(;s!=null;)if(n=s.resolvers.get(t),n==null){if(s=s.parent,s==null)return Ot}else return Ii(n,s,r);return Ot}getFactory(t){let i=Ae.get(t);if(i===void 0){if(Ys(t))throw new Error(`${t.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);Ae.set(t,i=new qs(t,F.getDependencies(t)))}return i}registerFactory(t,i){Ae.set(t,i)}createChild(t){return new jt(null,Object.assign({},this.config,t,{parentLocator:()=>this}))}jitRegister(t,i){if(typeof t!="function")throw new Error(`Attempted to jitRegister something that is not a constructor: '${t}'. Did you forget to register this dependency?`);if(Xs.has(t.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${t.name}. Did you forget to add @inject(Key)`);if(ie(t)){const r=t.register(i);if(!(r instanceof Object)||r.resolve==null){const s=i.resolvers.get(t);if(s!=null)return s;throw new Error("A valid resolver was not returned from the static register method")}return r}else{if(t.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${t.friendlyName}`);{const r=this.config.defaultResolver(t,i);return i.resolvers.set(t,r),r}}}}const Oe=new WeakMap;function wr(e){return function(t,i,r){if(Oe.has(r))return Oe.get(r);const s=e(t,i,r);return Oe.set(r,s),s}}const qt=Object.freeze({instance(e,t){return new X(e,0,t)},singleton(e,t){return new X(e,1,t)},transient(e,t){return new X(e,2,t)},callback(e,t){return new X(e,3,t)},cachedCallback(e,t){return new X(e,3,wr(t))},aliasTo(e,t){return new X(t,5,e)}});function Zt(e){if(e==null)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function Ii(e,t,i){if(e instanceof X&&e.strategy===4){const r=e.state;let s=r.length;const n=new Array(s);for(;s--;)n[s]=r[s].resolve(t,i);return n}return[e.resolve(t,i)]}const Ai="(anonymous)";function Oi(e){return typeof e=="object"&&e!==null||typeof e=="function"}const Ys=function(){const e=new WeakMap;let t=!1,i="",r=0;return function(s){return t=e.get(s),t===void 0&&(i=s.toString(),r=i.length,t=r>=29&&r<=100&&i.charCodeAt(r-1)===125&&i.charCodeAt(r-2)<=32&&i.charCodeAt(r-3)===93&&i.charCodeAt(r-4)===101&&i.charCodeAt(r-5)===100&&i.charCodeAt(r-6)===111&&i.charCodeAt(r-7)===99&&i.charCodeAt(r-8)===32&&i.charCodeAt(r-9)===101&&i.charCodeAt(r-10)===118&&i.charCodeAt(r-11)===105&&i.charCodeAt(r-12)===116&&i.charCodeAt(r-13)===97&&i.charCodeAt(r-14)===110&&i.charCodeAt(r-15)===88,e.set(s,t)),t}}(),Jt={};function xr(e){switch(typeof e){case"number":return e>=0&&(e|0)===e;case"string":{const t=Jt[e];if(t!==void 0)return t;const i=e.length;if(i===0)return Jt[e]=!1;let r=0;for(let s=0;s<i;++s)if(r=e.charCodeAt(s),s===0&&r===48&&i>1||r<48||r>57)return Jt[e]=!1;return Jt[e]=!0}default:return!1}}function Bi(e){return`${e.toLowerCase()}:presentation`}const Kt=new Map,Sr=Object.freeze({define(e,t,i){const r=Bi(e);Kt.get(r)===void 0?Kt.set(r,t):Kt.set(r,!1),i.register(qt.instance(r,t))},forTag(e,t){const i=Bi(e),r=Kt.get(i);return r===!1?F.findResponsibleContainer(t).get(i):r||null}});class Qs{constructor(t,i){this.template=t||null,this.styles=i===void 0?null:Array.isArray(i)?j.create(i):i instanceof j?i:j.create([i])}applyTo(t){const i=t.$fastController;i.template===null&&(i.template=this.template),i.styles===null&&(i.styles=this.styles)}}class it extends de{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return this._presentation===void 0&&(this._presentation=Sr.forTag(this.tagName,this)),this._presentation}templateChanged(){this.template!==void 0&&(this.$fastController.template=this.template)}stylesChanged(){this.styles!==void 0&&(this.$fastController.styles=this.styles)}connectedCallback(){this.$presentation!==null&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(t){return(i={})=>new Zs(this===it?class extends it{}:this,t,i)}}p([V],it.prototype,"template",void 0);p([V],it.prototype,"styles",void 0);function Nt(e,t,i){return typeof e=="function"?e(t,i):e}class Zs{constructor(t,i,r){this.type=t,this.elementDefinition=i,this.overrideDefinition=r,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(t,i){const r=this.definition,s=this.overrideDefinition,a=`${r.prefix||i.elementPrefix}-${r.baseName}`;i.tryDefineElement({name:a,type:this.type,baseClass:this.elementDefinition.baseClass,callback:o=>{const l=new Qs(Nt(r.template,o,r),Nt(r.styles,o,r));o.definePresentation(l);let c=Nt(r.shadowOptions,o,r);o.shadowRootMode&&(c?s.shadowOptions||(c.mode=o.shadowRootMode):c!==null&&(c={mode:o.shadowRootMode})),o.defineElement({elementOptions:Nt(r.elementOptions,o,r),shadowOptions:c,attributes:Nt(r.attributes,o,r)})}})}}function $r(e,...t){const i=se.locate(e);t.forEach(r=>{Object.getOwnPropertyNames(r.prototype).forEach(n=>{n!=="constructor"&&Object.defineProperty(e.prototype,n,Object.getOwnPropertyDescriptor(r.prototype,n))}),se.locate(r).forEach(n=>i.push(n))})}const W={horizontal:"horizontal",vertical:"vertical"};function Js(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function Ks(){const e=document.querySelector('meta[property="csp-nonce"]');return e?e.getAttribute("content"):null}let dt;function tn(){if(typeof dt=="boolean")return dt;if(!Js())return dt=!1,dt;const e=document.createElement("style"),t=Ks();t!==null&&e.setAttribute("nonce",t),document.head.appendChild(e);try{e.sheet.insertRule("foo:focus-visible {color:inherit}",0),dt=!0}catch{dt=!1}finally{document.head.removeChild(e)}return dt}var Hi;(function(e){e[e.alt=18]="alt",e[e.arrowDown=40]="arrowDown",e[e.arrowLeft=37]="arrowLeft",e[e.arrowRight=39]="arrowRight",e[e.arrowUp=38]="arrowUp",e[e.back=8]="back",e[e.backSlash=220]="backSlash",e[e.break=19]="break",e[e.capsLock=20]="capsLock",e[e.closeBracket=221]="closeBracket",e[e.colon=186]="colon",e[e.colon2=59]="colon2",e[e.comma=188]="comma",e[e.ctrl=17]="ctrl",e[e.delete=46]="delete",e[e.end=35]="end",e[e.enter=13]="enter",e[e.equals=187]="equals",e[e.equals2=61]="equals2",e[e.equals3=107]="equals3",e[e.escape=27]="escape",e[e.forwardSlash=191]="forwardSlash",e[e.function1=112]="function1",e[e.function10=121]="function10",e[e.function11=122]="function11",e[e.function12=123]="function12",e[e.function2=113]="function2",e[e.function3=114]="function3",e[e.function4=115]="function4",e[e.function5=116]="function5",e[e.function6=117]="function6",e[e.function7=118]="function7",e[e.function8=119]="function8",e[e.function9=120]="function9",e[e.home=36]="home",e[e.insert=45]="insert",e[e.menu=93]="menu",e[e.minus=189]="minus",e[e.minus2=109]="minus2",e[e.numLock=144]="numLock",e[e.numPad0=96]="numPad0",e[e.numPad1=97]="numPad1",e[e.numPad2=98]="numPad2",e[e.numPad3=99]="numPad3",e[e.numPad4=100]="numPad4",e[e.numPad5=101]="numPad5",e[e.numPad6=102]="numPad6",e[e.numPad7=103]="numPad7",e[e.numPad8=104]="numPad8",e[e.numPad9=105]="numPad9",e[e.numPadDivide=111]="numPadDivide",e[e.numPadDot=110]="numPadDot",e[e.numPadMinus=109]="numPadMinus",e[e.numPadMultiply=106]="numPadMultiply",e[e.numPadPlus=107]="numPadPlus",e[e.openBracket=219]="openBracket",e[e.pageDown=34]="pageDown",e[e.pageUp=33]="pageUp",e[e.period=190]="period",e[e.print=44]="print",e[e.quote=222]="quote",e[e.scrollLock=145]="scrollLock",e[e.shift=16]="shift",e[e.space=32]="space",e[e.tab=9]="tab",e[e.tilde=192]="tilde",e[e.windowsLeft=91]="windowsLeft",e[e.windowsOpera=219]="windowsOpera",e[e.windowsRight=92]="windowsRight"})(Hi||(Hi={}));const en="ArrowDown",rn="ArrowLeft",sn="ArrowRight",nn="ArrowUp",on="Enter",an="Escape",ln="Home",cn="End",hn="Tab";var H;(function(e){e.ltr="ltr",e.rtl="rtl"})(H||(H={}));function un(e,t,i){return Math.min(Math.max(i,e),t)}var u;(function(e){e.Canvas="Canvas",e.CanvasText="CanvasText",e.LinkText="LinkText",e.VisitedText="VisitedText",e.ActiveText="ActiveText",e.ButtonFace="ButtonFace",e.ButtonText="ButtonText",e.Field="Field",e.FieldText="FieldText",e.Highlight="Highlight",e.HighlightText="HighlightText",e.GrayText="GrayText"})(u||(u={}));class R{}p([g({attribute:"aria-atomic"})],R.prototype,"ariaAtomic",void 0);p([g({attribute:"aria-busy"})],R.prototype,"ariaBusy",void 0);p([g({attribute:"aria-controls"})],R.prototype,"ariaControls",void 0);p([g({attribute:"aria-current"})],R.prototype,"ariaCurrent",void 0);p([g({attribute:"aria-describedby"})],R.prototype,"ariaDescribedby",void 0);p([g({attribute:"aria-details"})],R.prototype,"ariaDetails",void 0);p([g({attribute:"aria-disabled"})],R.prototype,"ariaDisabled",void 0);p([g({attribute:"aria-errormessage"})],R.prototype,"ariaErrormessage",void 0);p([g({attribute:"aria-flowto"})],R.prototype,"ariaFlowto",void 0);p([g({attribute:"aria-haspopup"})],R.prototype,"ariaHaspopup",void 0);p([g({attribute:"aria-hidden"})],R.prototype,"ariaHidden",void 0);p([g({attribute:"aria-invalid"})],R.prototype,"ariaInvalid",void 0);p([g({attribute:"aria-keyshortcuts"})],R.prototype,"ariaKeyshortcuts",void 0);p([g({attribute:"aria-label"})],R.prototype,"ariaLabel",void 0);p([g({attribute:"aria-labelledby"})],R.prototype,"ariaLabelledby",void 0);p([g({attribute:"aria-live"})],R.prototype,"ariaLive",void 0);p([g({attribute:"aria-owns"})],R.prototype,"ariaOwns",void 0);p([g({attribute:"aria-relevant"})],R.prototype,"ariaRelevant",void 0);p([g({attribute:"aria-roledescription"})],R.prototype,"ariaRoledescription",void 0);const dn=e=>{const t=e.closest("[dir]");return t!==null&&t.dir==="rtl"?H.rtl:H.ltr},fn=(e,t)=>et`
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
        ${_("control")}
    >
        ${Os(e,t)}
        <span class="content" part="content">
            <slot ${Es("defaultSlottedContent")}></slot>
        </span>
        ${As(e,t)}
    </button>
`,ji="form-associated-proxy",zi="ElementInternals",Wi=zi in window&&"setFormValue"in window[zi].prototype,qi=new WeakMap;function Fr(e){const t=class extends e{constructor(...i){super(...i),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return Wi}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const i=this.proxy.labels,r=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),s=i?r.concat(Array.from(i)):r;return Object.freeze(s)}else return Ot}valueChanged(i,r){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(i,r){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(i,r){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),S.queueUpdate(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(i,r){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(i,r){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),S.queueUpdate(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!Wi)return null;let i=qi.get(this);return i||(i=this.attachInternals(),qi.set(this,i)),i}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){this.proxyEventsToBlock.forEach(i=>this.proxy.removeEventListener(i,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(i,r,s){this.elementInternals?this.elementInternals.setValidity(i,r,s):typeof r=="string"&&this.proxy.setCustomValidity(r)}formDisabledCallback(i){this.disabled=i}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var i;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(r=>this.proxy.addEventListener(r,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",ji),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",ji)),(i=this.shadowRoot)===null||i===void 0||i.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var i;this.removeChild(this.proxy),(i=this.shadowRoot)===null||i===void 0||i.removeChild(this.proxySlot)}validate(i){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,i)}setFormValue(i,r){this.elementInternals&&this.elementInternals.setFormValue(i,r||i)}_keypressHandler(i){switch(i.key){case on:if(this.form instanceof HTMLFormElement){const r=this.form.querySelector("[type=submit]");r==null||r.click()}break}}stopPropagation(i){i.stopPropagation()}};return g({mode:"boolean"})(t.prototype,"disabled"),g({mode:"fromView",attribute:"value"})(t.prototype,"initialValue"),g({attribute:"current-value"})(t.prototype,"currentValue"),g(t.prototype,"name"),g({mode:"boolean"})(t.prototype,"required"),V(t.prototype,"value"),t}class pn extends it{}class gn extends Fr(pn){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let J=class extends gn{constructor(){super(...arguments),this.handleClick=t=>{var i;this.disabled&&((i=this.defaultSlottedContent)===null||i===void 0?void 0:i.length)<=1&&t.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const t=this.proxy.isConnected;t||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),t||this.detachProxy()},this.handleFormReset=()=>{var t;(t=this.form)===null||t===void 0||t.reset()},this.handleUnsupportedDelegatesFocus=()=>{var t;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(!((t=this.$fastController.definition.shadowOptions)===null||t===void 0)&&t.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(t,i){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),i==="submit"&&this.addEventListener("click",this.handleSubmission),t==="submit"&&this.removeEventListener("click",this.handleSubmission),i==="reset"&&this.addEventListener("click",this.handleFormReset),t==="reset"&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var t;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const i=Array.from((t=this.control)===null||t===void 0?void 0:t.children);i&&i.forEach(r=>{r.addEventListener("click",this.handleClick)})}disconnectedCallback(){var t;super.disconnectedCallback();const i=Array.from((t=this.control)===null||t===void 0?void 0:t.children);i&&i.forEach(r=>{r.removeEventListener("click",this.handleClick)})}};p([g({mode:"boolean"})],J.prototype,"autofocus",void 0);p([g({attribute:"form"})],J.prototype,"formId",void 0);p([g],J.prototype,"formaction",void 0);p([g],J.prototype,"formenctype",void 0);p([g],J.prototype,"formmethod",void 0);p([g({mode:"boolean"})],J.prototype,"formnovalidate",void 0);p([g],J.prototype,"formtarget",void 0);p([g],J.prototype,"type",void 0);p([V],J.prototype,"defaultSlottedContent",void 0);class fe{}p([g({attribute:"aria-expanded"})],fe.prototype,"ariaExpanded",void 0);p([g({attribute:"aria-pressed"})],fe.prototype,"ariaPressed",void 0);$r(fe,R);$r(J,Is,fe);function Xe(e){const t=e.parentElement;if(t)return t;{const i=e.getRootNode();if(i.host instanceof HTMLElement)return i.host}return null}function bn(e,t){let i=t;for(;i!==null;){if(i===e)return!0;i=Xe(i)}return!1}const ot=document.createElement("div");function vn(e){return e instanceof de}class gi{setProperty(t,i){S.queueUpdate(()=>this.target.setProperty(t,i))}removeProperty(t){S.queueUpdate(()=>this.target.removeProperty(t))}}class mn extends gi{constructor(t){super();const i=new CSSStyleSheet;this.target=i.cssRules[i.insertRule(":host{}")].style,t.$fastController.addStyles(j.create([i]))}}class yn extends gi{constructor(){super();const t=new CSSStyleSheet;this.target=t.cssRules[t.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,t]}}class wn extends gi{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:t}=this.style;if(t){const i=t.insertRule(":root{}",t.cssRules.length);this.target=t.cssRules[i].style}}}class kr{constructor(t){this.store=new Map,this.target=null;const i=t.$fastController;this.style=document.createElement("style"),i.addStyles(this.style),C.getNotifier(i).subscribe(this,"isConnected"),this.handleChange(i,"isConnected")}targetChanged(){if(this.target!==null)for(const[t,i]of this.store.entries())this.target.setProperty(t,i)}setProperty(t,i){this.store.set(t,i),S.queueUpdate(()=>{this.target!==null&&this.target.setProperty(t,i)})}removeProperty(t){this.store.delete(t),S.queueUpdate(()=>{this.target!==null&&this.target.removeProperty(t)})}handleChange(t,i){const{sheet:r}=this.style;if(r){const s=r.insertRule(":host{}",r.cssRules.length);this.target=r.cssRules[s].style}else this.target=null}}p([V],kr.prototype,"target",void 0);class xn{constructor(t){this.target=t.style}setProperty(t,i){S.queueUpdate(()=>this.target.setProperty(t,i))}removeProperty(t){S.queueUpdate(()=>this.target.removeProperty(t))}}class N{setProperty(t,i){N.properties[t]=i;for(const r of N.roots.values())mt.getOrCreate(N.normalizeRoot(r)).setProperty(t,i)}removeProperty(t){delete N.properties[t];for(const i of N.roots.values())mt.getOrCreate(N.normalizeRoot(i)).removeProperty(t)}static registerRoot(t){const{roots:i}=N;if(!i.has(t)){i.add(t);const r=mt.getOrCreate(this.normalizeRoot(t));for(const s in N.properties)r.setProperty(s,N.properties[s])}}static unregisterRoot(t){const{roots:i}=N;if(i.has(t)){i.delete(t);const r=mt.getOrCreate(N.normalizeRoot(t));for(const s in N.properties)r.removeProperty(s)}}static normalizeRoot(t){return t===ot?document:t}}N.roots=new Set;N.properties={};const Be=new WeakMap,Sn=S.supportsAdoptedStyleSheets?mn:kr,mt=Object.freeze({getOrCreate(e){if(Be.has(e))return Be.get(e);let t;return e===ot?t=new N:e instanceof Document?t=S.supportsAdoptedStyleSheets?new yn:new wn:vn(e)?t=new Sn(e):t=new xn(e),Be.set(e,t),t}});class B extends pi{constructor(t){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=t.name,t.cssCustomPropertyName!==null&&(this.cssCustomProperty=`--${t.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=B.uniqueId(),B.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(t){return new B({name:typeof t=="string"?t:t.name,cssCustomPropertyName:typeof t=="string"?t:t.cssCustomPropertyName===void 0?t.name:t.cssCustomPropertyName})}static isCSSDesignToken(t){return typeof t.cssCustomProperty=="string"}static isDerivedDesignTokenValue(t){return typeof t=="function"}static getTokenById(t){return B.tokensById.get(t)}getOrCreateSubscriberSet(t=this){return this.subscribers.get(t)||this.subscribers.set(t,new Set)&&this.subscribers.get(t)}createCSS(){return this.cssVar||""}getValueFor(t){const i=T.getOrCreate(t).get(this);if(i!==void 0)return i;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${t} or an ancestor of ${t}.`)}setValueFor(t,i){return this._appliedTo.add(t),i instanceof B&&(i=this.alias(i)),T.getOrCreate(t).set(this,i),this}deleteValueFor(t){return this._appliedTo.delete(t),T.existsFor(t)&&T.getOrCreate(t).delete(this),this}withDefault(t){return this.setValueFor(ot,t),this}subscribe(t,i){const r=this.getOrCreateSubscriberSet(i);i&&!T.existsFor(i)&&T.getOrCreate(i),r.has(t)||r.add(t)}unsubscribe(t,i){const r=this.subscribers.get(i||this);r&&r.has(t)&&r.delete(t)}notify(t){const i=Object.freeze({token:this,target:t});this.subscribers.has(this)&&this.subscribers.get(this).forEach(r=>r.handleChange(i)),this.subscribers.has(t)&&this.subscribers.get(t).forEach(r=>r.handleChange(i))}alias(t){return i=>t.getValueFor(i)}}B.uniqueId=(()=>{let e=0;return()=>(e++,e.toString(16))})();B.tokensById=new Map;class $n{startReflection(t,i){t.subscribe(this,i),this.handleChange({token:t,target:i})}stopReflection(t,i){t.unsubscribe(this,i),this.remove(t,i)}handleChange(t){const{token:i,target:r}=t;this.add(i,r)}add(t,i){mt.getOrCreate(i).setProperty(t.cssCustomProperty,this.resolveCSSValue(T.getOrCreate(i).get(t)))}remove(t,i){mt.getOrCreate(i).removeProperty(t.cssCustomProperty)}resolveCSSValue(t){return t&&typeof t.createCSS=="function"?t.createCSS():t}}class Fn{constructor(t,i,r){this.source=t,this.token=i,this.node=r,this.dependencies=new Set,this.observer=C.binding(t,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){this.node.store.set(this.token,this.observer.observe(this.node.target,Ht))}}class kn{constructor(){this.values=new Map}set(t,i){this.values.get(t)!==i&&(this.values.set(t,i),C.getNotifier(this).notify(t.id))}get(t){return C.track(this,t.id),this.values.get(t)}delete(t){this.values.delete(t)}all(){return this.values.entries()}}const Pt=new WeakMap,Et=new WeakMap;class T{constructor(t){this.target=t,this.store=new kn,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(i,r)=>{const s=B.getTokenById(r);if(s&&(s.notify(this.target),B.isCSSDesignToken(s))){const n=this.parent,a=this.isReflecting(s);if(n){const o=n.get(s),l=i.get(s);o!==l&&!a?this.reflectToCSS(s):o===l&&a&&this.stopReflectToCSS(s)}else a||this.reflectToCSS(s)}}},Pt.set(t,this),C.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),t instanceof de?t.$fastController.addBehaviors([this]):t.isConnected&&this.bind()}static getOrCreate(t){return Pt.get(t)||new T(t)}static existsFor(t){return Pt.has(t)}static findParent(t){if(ot!==t.target){let i=Xe(t.target);for(;i!==null;){if(Pt.has(i))return Pt.get(i);i=Xe(i)}return T.getOrCreate(ot)}return null}static findClosestAssignedNode(t,i){let r=i;do{if(r.has(t))return r;r=r.parent?r.parent:r.target!==ot?T.getOrCreate(ot):null}while(r!==null);return null}get parent(){return Et.get(this)||null}has(t){return this.assignedValues.has(t)}get(t){const i=this.store.get(t);if(i!==void 0)return i;const r=this.getRaw(t);if(r!==void 0)return this.hydrate(t,r),this.get(t)}getRaw(t){var i;return this.assignedValues.has(t)?this.assignedValues.get(t):(i=T.findClosestAssignedNode(t,this))===null||i===void 0?void 0:i.getRaw(t)}set(t,i){B.isDerivedDesignTokenValue(this.assignedValues.get(t))&&this.tearDownBindingObserver(t),this.assignedValues.set(t,i),B.isDerivedDesignTokenValue(i)?this.setupBindingObserver(t,i):this.store.set(t,i)}delete(t){this.assignedValues.delete(t),this.tearDownBindingObserver(t);const i=this.getRaw(t);i?this.hydrate(t,i):this.store.delete(t)}bind(){const t=T.findParent(this);t&&t.appendChild(this);for(const i of this.assignedValues.keys())i.notify(this.target)}unbind(){this.parent&&Et.get(this).removeChild(this)}appendChild(t){t.parent&&Et.get(t).removeChild(t);const i=this.children.filter(r=>t.contains(r));Et.set(t,this),this.children.push(t),i.forEach(r=>t.appendChild(r)),C.getNotifier(this.store).subscribe(t);for(const[r,s]of this.store.all())t.hydrate(r,this.bindingObservers.has(r)?this.getRaw(r):s)}removeChild(t){const i=this.children.indexOf(t);return i!==-1&&this.children.splice(i,1),C.getNotifier(this.store).unsubscribe(t),t.parent===this?Et.delete(t):!1}contains(t){return bn(this.target,t.target)}reflectToCSS(t){this.isReflecting(t)||(this.reflecting.add(t),T.cssCustomPropertyReflector.startReflection(t,this.target))}stopReflectToCSS(t){this.isReflecting(t)&&(this.reflecting.delete(t),T.cssCustomPropertyReflector.stopReflection(t,this.target))}isReflecting(t){return this.reflecting.has(t)}handleChange(t,i){const r=B.getTokenById(i);r&&this.hydrate(r,this.getRaw(r))}hydrate(t,i){if(!this.has(t)){const r=this.bindingObservers.get(t);B.isDerivedDesignTokenValue(i)?r?r.source!==i&&(this.tearDownBindingObserver(t),this.setupBindingObserver(t,i)):this.setupBindingObserver(t,i):(r&&this.tearDownBindingObserver(t),this.store.set(t,i))}}setupBindingObserver(t,i){const r=new Fn(i,t,this);return this.bindingObservers.set(t,r),r}tearDownBindingObserver(t){return this.bindingObservers.has(t)?(this.bindingObservers.get(t).disconnect(),this.bindingObservers.delete(t),!0):!1}}T.cssCustomPropertyReflector=new $n;p([V],T.prototype,"children",void 0);function Cn(e){return B.from(e)}const pe=Object.freeze({create:Cn,notifyConnection(e){return!e.isConnected||!T.existsFor(e)?!1:(T.getOrCreate(e).bind(),!0)},notifyDisconnection(e){return e.isConnected||!T.existsFor(e)?!1:(T.getOrCreate(e).unbind(),!0)},registerRoot(e=ot){N.registerRoot(e)},unregisterRoot(e=ot){N.unregisterRoot(e)}}),He=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),je=new Map,re=new Map;let wt=null;const It=F.createInterface(e=>e.cachedCallback(t=>(wt===null&&(wt=new Tr(null,t)),wt))),Cr=Object.freeze({tagFor(e){return re.get(e)},responsibleFor(e){const t=e.$$designSystem$$;return t||F.findResponsibleContainer(e).get(It)},getOrCreate(e){if(!e)return wt===null&&(wt=F.getOrCreateDOMContainer().get(It)),wt;const t=e.$$designSystem$$;if(t)return t;const i=F.getOrCreateDOMContainer(e);if(i.has(It,!1))return i.get(It);{const r=new Tr(e,i);return i.register(qt.instance(It,r)),r}}});function Tn(e,t,i){return typeof e=="string"?{name:e,type:t,callback:i}:e}class Tr{constructor(t,i){this.owner=t,this.container=i,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>He.definitionCallbackOnly,t!==null&&(t.$$designSystem$$=this)}withPrefix(t){return this.prefix=t,this}withShadowRootMode(t){return this.shadowRootMode=t,this}withElementDisambiguation(t){return this.disambiguate=t,this}withDesignTokenRoot(t){return this.designTokenRoot=t,this}register(...t){const i=this.container,r=[],s=this.disambiguate,n=this.shadowRootMode,a={elementPrefix:this.prefix,tryDefineElement(o,l,c){const h=Tn(o,l,c),{name:f,callback:v,baseClass:$}=h;let{type:w}=h,y=f,O=je.get(y),ut=!0;for(;O;){const st=s(y,w,O);switch(st){case He.ignoreDuplicate:return;case He.definitionCallbackOnly:ut=!1,O=void 0;break;default:y=st,O=je.get(y);break}}ut&&((re.has(w)||w===it)&&(w=class extends w{}),je.set(y,w),re.set(w,y),$&&re.set($,y)),r.push(new Dn(i,y,w,n,v,ut))}};this.designTokensInitialized||(this.designTokensInitialized=!0,this.designTokenRoot!==null&&pe.registerRoot(this.designTokenRoot)),i.registerWithContext(a,...t);for(const o of r)o.callback(o),o.willDefine&&o.definition!==null&&o.definition.define();return this}}class Dn{constructor(t,i,r,s,n,a){this.container=t,this.name=i,this.type=r,this.shadowRootMode=s,this.callback=n,this.willDefine=a,this.definition=null}definePresentation(t){Sr.define(this.name,t,this.container)}defineElement(t){this.definition=new ue(this.type,Object.assign(Object.assign({},t),{name:this.name}))}tagFor(t){return Cr.tagFor(t)}}const Mn=(e,t)=>et`
    <div class="positioning-region" part="positioning-region">
        ${mr(i=>i.modal,et`
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
            ${_("dialog")}
        >
            <slot></slot>
        </div>
    </div>
`;/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var Vn=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],Rn=Vn.join(","),Dr=typeof Element>"u",oe=Dr?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,Ye=!Dr&&Element.prototype.getRootNode?function(e){return e.getRootNode()}:function(e){return e.ownerDocument},Ln=function(t,i){return t.tabIndex<0&&(i||/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName)||t.isContentEditable)&&isNaN(parseInt(t.getAttribute("tabindex"),10))?0:t.tabIndex},Mr=function(t){return t.tagName==="INPUT"},Nn=function(t){return Mr(t)&&t.type==="hidden"},Pn=function(t){var i=t.tagName==="DETAILS"&&Array.prototype.slice.apply(t.children).some(function(r){return r.tagName==="SUMMARY"});return i},En=function(t,i){for(var r=0;r<t.length;r++)if(t[r].checked&&t[r].form===i)return t[r]},In=function(t){if(!t.name)return!0;var i=t.form||Ye(t),r=function(o){return i.querySelectorAll('input[type="radio"][name="'+o+'"]')},s;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")s=r(window.CSS.escape(t.name));else try{s=r(t.name)}catch(a){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",a.message),!1}var n=En(s,t.form);return!n||n===t},An=function(t){return Mr(t)&&t.type==="radio"},On=function(t){return An(t)&&!In(t)},Ui=function(t){var i=t.getBoundingClientRect(),r=i.width,s=i.height;return r===0&&s===0},Bn=function(t,i){var r=i.displayCheck,s=i.getShadowRoot;if(getComputedStyle(t).visibility==="hidden")return!0;var n=oe.call(t,"details>summary:first-of-type"),a=n?t.parentElement:t;if(oe.call(a,"details:not([open]) *"))return!0;var o=Ye(t).host,l=(o==null?void 0:o.ownerDocument.contains(o))||t.ownerDocument.contains(t);if(!r||r==="full"){if(typeof s=="function"){for(var c=t;t;){var h=t.parentElement,f=Ye(t);if(h&&!h.shadowRoot&&s(h)===!0)return Ui(t);t.assignedSlot?t=t.assignedSlot:!h&&f!==t.ownerDocument?t=f.host:t=h}t=c}if(l)return!t.getClientRects().length}else if(r==="non-zero-area")return Ui(t);return!1},Hn=function(t){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))for(var i=t.parentElement;i;){if(i.tagName==="FIELDSET"&&i.disabled){for(var r=0;r<i.children.length;r++){var s=i.children.item(r);if(s.tagName==="LEGEND")return oe.call(i,"fieldset[disabled] *")?!0:!s.contains(t)}return!0}i=i.parentElement}return!1},jn=function(t,i){return!(i.disabled||Nn(i)||Bn(i,t)||Pn(i)||Hn(i))},zn=function(t,i){return!(On(i)||Ln(i)<0||!jn(t,i))},Gi=function(t,i){if(i=i||{},!t)throw new Error("No node provided");return oe.call(t,Rn)===!1?!1:zn(i,t)};class Z extends it{constructor(){super(...arguments),this.modal=!0,this.hidden=!1,this.trapFocus=!0,this.trapFocusChanged=()=>{this.$fastController.isConnected&&this.updateTrapFocus()},this.isTrappingFocus=!1,this.handleDocumentKeydown=t=>{if(!t.defaultPrevented&&!this.hidden)switch(t.key){case an:this.dismiss(),t.preventDefault();break;case hn:this.handleTabKeyDown(t);break}},this.handleDocumentFocus=t=>{!t.defaultPrevented&&this.shouldForceFocus(t.target)&&(this.focusFirstElement(),t.preventDefault())},this.handleTabKeyDown=t=>{if(!this.trapFocus||this.hidden)return;const i=this.getTabQueueBounds();if(i.length!==0){if(i.length===1){i[0].focus(),t.preventDefault();return}t.shiftKey&&t.target===i[0]?(i[i.length-1].focus(),t.preventDefault()):!t.shiftKey&&t.target===i[i.length-1]&&(i[0].focus(),t.preventDefault())}},this.getTabQueueBounds=()=>{const t=[];return Z.reduceTabbableItems(t,this)},this.focusFirstElement=()=>{const t=this.getTabQueueBounds();t.length>0?t[0].focus():this.dialog instanceof HTMLElement&&this.dialog.focus()},this.shouldForceFocus=t=>this.isTrappingFocus&&!this.contains(t),this.shouldTrapFocus=()=>this.trapFocus&&!this.hidden,this.updateTrapFocus=t=>{const i=t===void 0?this.shouldTrapFocus():t;i&&!this.isTrappingFocus?(this.isTrappingFocus=!0,document.addEventListener("focusin",this.handleDocumentFocus),S.queueUpdate(()=>{this.shouldForceFocus(document.activeElement)&&this.focusFirstElement()})):!i&&this.isTrappingFocus&&(this.isTrappingFocus=!1,document.removeEventListener("focusin",this.handleDocumentFocus))}}dismiss(){this.$emit("dismiss"),this.$emit("cancel")}show(){this.hidden=!1}hide(){this.hidden=!0,this.$emit("close")}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleDocumentKeydown),this.notifier=C.getNotifier(this),this.notifier.subscribe(this,"hidden"),this.updateTrapFocus()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeydown),this.updateTrapFocus(!1),this.notifier.unsubscribe(this,"hidden")}handleChange(t,i){switch(i){case"hidden":this.updateTrapFocus();break}}static reduceTabbableItems(t,i){return i.getAttribute("tabindex")==="-1"?t:Gi(i)||Z.isFocusableFastElement(i)&&Z.hasTabbableShadow(i)?(t.push(i),t):i.childElementCount?t.concat(Array.from(i.children).reduce(Z.reduceTabbableItems,[])):t}static isFocusableFastElement(t){var i,r;return!!(!((r=(i=t.$fastController)===null||i===void 0?void 0:i.definition.shadowOptions)===null||r===void 0)&&r.delegatesFocus)}static hasTabbableShadow(t){var i,r;return Array.from((r=(i=t.shadowRoot)===null||i===void 0?void 0:i.querySelectorAll("*"))!==null&&r!==void 0?r:[]).some(s=>Gi(s))}}p([g({mode:"boolean"})],Z.prototype,"modal",void 0);p([g({mode:"boolean"})],Z.prototype,"hidden",void 0);p([g({attribute:"trap-focus",mode:"boolean"})],Z.prototype,"trapFocus",void 0);p([g({attribute:"aria-describedby"})],Z.prototype,"ariaDescribedby",void 0);p([g({attribute:"aria-labelledby"})],Z.prototype,"ariaLabelledby",void 0);p([g({attribute:"aria-label"})],Z.prototype,"ariaLabel",void 0);const Wn=(e,t)=>et`
    <template
        aria-disabled="${i=>i.disabled}"
        class="${i=>i.sliderOrientation||W.horizontal}
            ${i=>i.disabled?"disabled":""}"
    >
        <div ${_("root")} part="root" class="root" style="${i=>i.positionStyle}">
            <div class="container">
                ${mr(i=>!i.hideMark,et`
                        <div class="mark"></div>
                    `)}
                <div class="label">
                    <slot></slot>
                </div>
            </div>
        </div>
    </template>
`;function Qe(e,t,i,r){let s=un(0,1,(e-t)/(i-t));return r===H.rtl&&(s=1-s),s}const te={min:0,max:0,direction:H.ltr,orientation:W.horizontal,disabled:!1};let rt=class extends it{constructor(){super(...arguments),this.hideMark=!1,this.sliderDirection=H.ltr,this.getSliderConfiguration=()=>{if(!this.isSliderConfig(this.parentNode))this.sliderDirection=te.direction||H.ltr,this.sliderOrientation=te.orientation,this.sliderMaxPosition=te.max,this.sliderMinPosition=te.min;else{const t=this.parentNode,{min:i,max:r,direction:s,orientation:n,disabled:a}=t;a!==void 0&&(this.disabled=a),this.sliderDirection=s||H.ltr,this.sliderOrientation=n||W.horizontal,this.sliderMaxPosition=r,this.sliderMinPosition=i}},this.positionAsStyle=()=>{const t=this.sliderDirection?this.sliderDirection:H.ltr,i=Qe(Number(this.position),Number(this.sliderMinPosition),Number(this.sliderMaxPosition));let r=Math.round((1-i)*100),s=Math.round(i*100);return Number.isNaN(s)&&Number.isNaN(r)&&(r=50,s=50),this.sliderOrientation===W.horizontal?t===H.rtl?`right: ${s}%; left: ${r}%;`:`left: ${s}%; right: ${r}%;`:`top: ${s}%; bottom: ${r}%;`}}positionChanged(){this.positionStyle=this.positionAsStyle()}sliderOrientationChanged(){}connectedCallback(){super.connectedCallback(),this.getSliderConfiguration(),this.positionStyle=this.positionAsStyle(),this.notifier=C.getNotifier(this.parentNode),this.notifier.subscribe(this,"orientation"),this.notifier.subscribe(this,"direction"),this.notifier.subscribe(this,"max"),this.notifier.subscribe(this,"min")}disconnectedCallback(){super.disconnectedCallback(),this.notifier.unsubscribe(this,"orientation"),this.notifier.unsubscribe(this,"direction"),this.notifier.unsubscribe(this,"max"),this.notifier.unsubscribe(this,"min")}handleChange(t,i){switch(i){case"direction":this.sliderDirection=t.direction;break;case"orientation":this.sliderOrientation=t.orientation;break;case"max":this.sliderMaxPosition=t.max;break;case"min":this.sliderMinPosition=t.min;break}this.positionStyle=this.positionAsStyle()}isSliderConfig(t){return t.max!==void 0&&t.min!==void 0}};p([V],rt.prototype,"positionStyle",void 0);p([g],rt.prototype,"position",void 0);p([g({attribute:"hide-mark",mode:"boolean"})],rt.prototype,"hideMark",void 0);p([g({attribute:"disabled",mode:"boolean"})],rt.prototype,"disabled",void 0);p([V],rt.prototype,"sliderOrientation",void 0);p([V],rt.prototype,"sliderMinPosition",void 0);p([V],rt.prototype,"sliderMaxPosition",void 0);p([V],rt.prototype,"sliderDirection",void 0);const qn=(e,t)=>et`
    <template
        role="slider"
        class="${i=>i.readOnly?"readonly":""}
        ${i=>i.orientation||W.horizontal}"
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
            <div ${_("track")} part="track-container" class="track">
                <slot name="track"></slot>
                <div part="track-start" class="track-start" style="${i=>i.position}">
                    <slot name="track-start"></slot>
                </div>
            </div>
            <slot></slot>
            <div
                ${_("thumb")}
                part="thumb-container"
                class="thumb-container"
                style="${i=>i.position}"
            >
                <slot name="thumb">${t.thumb||""}</slot>
            </div>
        </div>
    </template>
`;class Un extends it{}class Gn extends Fr(Un){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const _n={singleValue:"single-value"};class A extends Gn{constructor(){super(...arguments),this.direction=H.ltr,this.isDragging=!1,this.trackWidth=0,this.trackMinWidth=0,this.trackHeight=0,this.trackLeft=0,this.trackMinHeight=0,this.valueTextFormatter=()=>null,this.min=0,this.max=10,this.step=1,this.orientation=W.horizontal,this.mode=_n.singleValue,this.keypressHandler=t=>{if(!this.readOnly){if(t.key===ln)t.preventDefault(),this.value=`${this.min}`;else if(t.key===cn)t.preventDefault(),this.value=`${this.max}`;else if(!t.shiftKey)switch(t.key){case sn:case nn:t.preventDefault(),this.increment();break;case rn:case en:t.preventDefault(),this.decrement();break}}},this.setupTrackConstraints=()=>{const t=this.track.getBoundingClientRect();this.trackWidth=this.track.clientWidth,this.trackMinWidth=this.track.clientLeft,this.trackHeight=t.bottom,this.trackMinHeight=t.top,this.trackLeft=this.getBoundingClientRect().left,this.trackWidth===0&&(this.trackWidth=1)},this.setupListeners=(t=!1)=>{const i=`${t?"remove":"add"}EventListener`;this[i]("keydown",this.keypressHandler),this[i]("mousedown",this.handleMouseDown),this.thumb[i]("mousedown",this.handleThumbMouseDown,{passive:!0}),this.thumb[i]("touchstart",this.handleThumbMouseDown,{passive:!0}),t&&(this.handleMouseDown(null),this.handleThumbMouseDown(null))},this.initialValue="",this.handleThumbMouseDown=t=>{if(t){if(this.readOnly||this.disabled||t.defaultPrevented)return;t.target.focus()}const i=`${t!==null?"add":"remove"}EventListener`;window[i]("mouseup",this.handleWindowMouseUp),window[i]("mousemove",this.handleMouseMove,{passive:!0}),window[i]("touchmove",this.handleMouseMove,{passive:!0}),window[i]("touchend",this.handleWindowMouseUp),this.isDragging=t!==null},this.handleMouseMove=t=>{if(this.readOnly||this.disabled||t.defaultPrevented)return;const i=window.TouchEvent&&t instanceof TouchEvent?t.touches[0]:t,r=this.orientation===W.horizontal?i.pageX-document.documentElement.scrollLeft-this.trackLeft:i.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(r)}`},this.calculateNewValue=t=>{const i=Qe(t,this.orientation===W.horizontal?this.trackMinWidth:this.trackMinHeight,this.orientation===W.horizontal?this.trackWidth:this.trackHeight,this.direction),r=(this.max-this.min)*i+this.min;return this.convertToConstrainedValue(r)},this.handleWindowMouseUp=t=>{this.stopDragging()},this.stopDragging=()=>{this.isDragging=!1,this.handleMouseDown(null),this.handleThumbMouseDown(null)},this.handleMouseDown=t=>{const i=`${t!==null?"add":"remove"}EventListener`;if((t===null||!this.disabled&&!this.readOnly)&&(window[i]("mouseup",this.handleWindowMouseUp),window.document[i]("mouseleave",this.handleWindowMouseUp),window[i]("mousemove",this.handleMouseMove),t)){t.preventDefault(),this.setupTrackConstraints(),t.target.focus();const r=this.orientation===W.horizontal?t.pageX-document.documentElement.scrollLeft-this.trackLeft:t.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(r)}`}},this.convertToConstrainedValue=t=>{isNaN(t)&&(t=this.min);let i=t-this.min;const r=Math.round(i/this.step),s=i-r*(this.stepMultiplier*this.step)/this.stepMultiplier;return i=s>=Number(this.step)/2?i-s+Number(this.step):i-s,i+this.min}}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}get valueAsNumber(){return parseFloat(super.value)}set valueAsNumber(t){this.value=t.toString()}valueChanged(t,i){super.valueChanged(t,i),this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction),this.$emit("change")}minChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.min=`${this.min}`),this.validate()}maxChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.max=`${this.max}`),this.validate()}stepChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.step=`${this.step}`),this.updateStepMultiplier(),this.validate()}orientationChanged(){this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type","range"),this.direction=dn(this),this.updateStepMultiplier(),this.setupTrackConstraints(),this.setupListeners(),this.setupDefaultValue(),this.setThumbPositionForOrientation(this.direction)}disconnectedCallback(){this.setupListeners(!0)}increment(){const t=this.direction!==H.rtl&&this.orientation!==W.vertical?Number(this.value)+Number(this.step):Number(this.value)-Number(this.step),i=this.convertToConstrainedValue(t),r=i<Number(this.max)?`${i}`:`${this.max}`;this.value=r}decrement(){const t=this.direction!==H.rtl&&this.orientation!==W.vertical?Number(this.value)-Number(this.step):Number(this.value)+Number(this.step),i=this.convertToConstrainedValue(t),r=i>Number(this.min)?`${i}`:`${this.min}`;this.value=r}setThumbPositionForOrientation(t){const r=(1-Qe(Number(this.value),Number(this.min),Number(this.max),t))*100;this.orientation===W.horizontal?this.position=this.isDragging?`right: ${r}%; transition: none;`:`right: ${r}%; transition: all 0.2s ease;`:this.position=this.isDragging?`bottom: ${r}%; transition: none;`:`bottom: ${r}%; transition: all 0.2s ease;`}updateStepMultiplier(){const t=this.step+"",i=this.step%1?t.length-t.indexOf(".")-1:0;this.stepMultiplier=Math.pow(10,i)}get midpoint(){return`${this.convertToConstrainedValue((this.max+this.min)/2)}`}setupDefaultValue(){if(typeof this.value=="string")if(this.value.length===0)this.initialValue=this.midpoint;else{const t=parseFloat(this.value);!Number.isNaN(t)&&(t<this.min||t>this.max)&&(this.value=this.midpoint)}}}p([g({attribute:"readonly",mode:"boolean"})],A.prototype,"readOnly",void 0);p([V],A.prototype,"direction",void 0);p([V],A.prototype,"isDragging",void 0);p([V],A.prototype,"position",void 0);p([V],A.prototype,"trackWidth",void 0);p([V],A.prototype,"trackMinWidth",void 0);p([V],A.prototype,"trackHeight",void 0);p([V],A.prototype,"trackLeft",void 0);p([V],A.prototype,"trackMinHeight",void 0);p([V],A.prototype,"valueTextFormatter",void 0);p([g({converter:di})],A.prototype,"min",void 0);p([g({converter:di})],A.prototype,"max",void 0);p([g({converter:di})],A.prototype,"step",void 0);p([g],A.prototype,"orientation",void 0);p([g],A.prototype,"mode",void 0);class Xn{constructor(t){this.listenerCache=new WeakMap,this.query=t}bind(t){const{query:i}=this,r=this.constructListener(t);r.bind(i)(),i.addListener(r),this.listenerCache.set(t,r)}unbind(t){const i=this.listenerCache.get(t);i&&(this.query.removeListener(i),this.listenerCache.delete(t))}}class Yt extends Xn{constructor(t,i){super(t),this.styles=i}static with(t){return i=>new Yt(t,i)}constructListener(t){let i=!1;const r=this.styles;return function(){const{matches:n}=this;n&&!i?(t.$fastController.addStyles(r),i=n):!n&&i&&(t.$fastController.removeStyles(r),i=n)}}unbind(t){super.unbind(t),t.$fastController.removeStyles(this.styles)}}const U=Yt.with(window.matchMedia("(forced-colors)"));Yt.with(window.matchMedia("(prefers-color-scheme: dark)"));Yt.with(window.matchMedia("(prefers-color-scheme: light)"));class Yn{constructor(t,i,r){this.propertyName=t,this.value=i,this.styles=r}bind(t){C.getNotifier(t).subscribe(this,this.propertyName),this.handleChange(t,this.propertyName)}unbind(t){C.getNotifier(t).unsubscribe(this,this.propertyName),t.$fastController.removeStyles(this.styles)}handleChange(t,i){t[i]===this.value?t.$fastController.addStyles(this.styles):t.$fastController.removeStyles(this.styles)}}const Ze="not-allowed",Qn=":host([hidden]){display:none}";function bi(e){return`${Qn}:host{display:${e}}`}const k=tn()?"focus-visible":"focus";function nt(e,t,i){return isNaN(e)||e<=t?t:e>=i?i:e}function ze(e,t,i){return isNaN(e)||e<=t?0:e>=i?1:e/(i-t)}function ft(e,t,i){return isNaN(e)?t:t+e*(i-t)}function _i(e){return e*(Math.PI/180)}function Zn(e){return e*(180/Math.PI)}function Jn(e){const t=Math.round(nt(e,0,255)).toString(16);return t.length===1?"0"+t:t}function I(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:t+e*(i-t)}function vi(e,t,i){if(e<=0)return t%360;if(e>=1)return i%360;const r=(t-i+360)%360,s=(i-t+360)%360;return r<=s?(t-r*e+360)%360:(t+r*e+360)%360}function L(e,t){const i=Math.pow(10,t);return Math.round(e*i)/i}class gt{constructor(t,i,r){this.h=t,this.s=i,this.l=r}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.l)?new gt(t.h,t.s,t.l):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.l===t.l}roundToPrecision(t){return new gt(L(this.h,t),L(this.s,t),L(this.l,t))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class Ut{constructor(t,i,r){this.h=t,this.s=i,this.v=r}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.v)?new Ut(t.h,t.s,t.v):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.v===t.v}roundToPrecision(t){return new Ut(L(this.h,t),L(this.s,t),L(this.v,t))}toObject(){return{h:this.h,s:this.s,v:this.v}}}class P{constructor(t,i,r){this.l=t,this.a=i,this.b=r}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.a)&&!isNaN(t.b)?new P(t.l,t.a,t.b):null}equalValue(t){return this.l===t.l&&this.a===t.a&&this.b===t.b}roundToPrecision(t){return new P(L(this.l,t),L(this.a,t),L(this.b,t))}toObject(){return{l:this.l,a:this.a,b:this.b}}}P.epsilon=216/24389;P.kappa=24389/27;class xt{constructor(t,i,r){this.l=t,this.c=i,this.h=r}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.c)&&!isNaN(t.h)?new xt(t.l,t.c,t.h):null}equalValue(t){return this.l===t.l&&this.c===t.c&&this.h===t.h}roundToPrecision(t){return new xt(L(this.l,t),L(this.c,t),L(this.h,t))}toObject(){return{l:this.l,c:this.c,h:this.h}}}class D{constructor(t,i,r,s){this.r=t,this.g=i,this.b=r,this.a=typeof s=="number"&&!isNaN(s)?s:1}static fromObject(t){return t&&!isNaN(t.r)&&!isNaN(t.g)&&!isNaN(t.b)?new D(t.r,t.g,t.b,t.a):null}equalValue(t){return this.r===t.r&&this.g===t.g&&this.b===t.b&&this.a===t.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(ft(this.r,0,255))},${Math.round(ft(this.g,0,255))},${Math.round(ft(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(ft(this.r,0,255))},${Math.round(ft(this.g,0,255))},${Math.round(ft(this.b,0,255))},${nt(this.a,0,1)})`}roundToPrecision(t){return new D(L(this.r,t),L(this.g,t),L(this.b,t),L(this.a,t))}clamp(){return new D(nt(this.r,0,1),nt(this.g,0,1),nt(this.b,0,1),nt(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(t){return Jn(ft(t,0,255))}}class q{constructor(t,i,r){this.x=t,this.y=i,this.z=r}static fromObject(t){return t&&!isNaN(t.x)&&!isNaN(t.y)&&!isNaN(t.z)?new q(t.x,t.y,t.z):null}equalValue(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}roundToPrecision(t){return new q(L(this.x,t),L(this.y,t),L(this.z,t))}toObject(){return{x:this.x,y:this.y,z:this.z}}}q.whitePoint=new q(.95047,1,1.08883);function Je(e){return e.r*.2126+e.g*.7152+e.b*.0722}function Ke(e){function t(i){return i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4)}return Je(new D(t(e.r),t(e.g),t(e.b),1))}const Xi=(e,t)=>(e+.05)/(t+.05);function Yi(e,t){const i=Ke(e),r=Ke(t);return i>r?Xi(i,r):Xi(r,i)}function Gt(e){const t=Math.max(e.r,e.g,e.b),i=Math.min(e.r,e.g,e.b),r=t-i;let s=0;r!==0&&(t===e.r?s=60*((e.g-e.b)/r%6):t===e.g?s=60*((e.b-e.r)/r+2):s=60*((e.r-e.g)/r+4)),s<0&&(s+=360);const n=(t+i)/2;let a=0;return r!==0&&(a=r/(1-Math.abs(2*n-1))),new gt(s,a,n)}function ti(e,t=1){const i=(1-Math.abs(2*e.l-1))*e.s,r=i*(1-Math.abs(e.h/60%2-1)),s=e.l-i/2;let n=0,a=0,o=0;return e.h<60?(n=i,a=r,o=0):e.h<120?(n=r,a=i,o=0):e.h<180?(n=0,a=i,o=r):e.h<240?(n=0,a=r,o=i):e.h<300?(n=r,a=0,o=i):e.h<360&&(n=i,a=0,o=r),new D(n+s,a+s,o+s,t)}function Qi(e){const t=Math.max(e.r,e.g,e.b),i=Math.min(e.r,e.g,e.b),r=t-i;let s=0;r!==0&&(t===e.r?s=60*((e.g-e.b)/r%6):t===e.g?s=60*((e.b-e.r)/r+2):s=60*((e.r-e.g)/r+4)),s<0&&(s+=360);let n=0;return t!==0&&(n=r/t),new Ut(s,n,t)}function Kn(e,t=1){const i=e.s*e.v,r=i*(1-Math.abs(e.h/60%2-1)),s=e.v-i;let n=0,a=0,o=0;return e.h<60?(n=i,a=r,o=0):e.h<120?(n=r,a=i,o=0):e.h<180?(n=0,a=i,o=r):e.h<240?(n=0,a=r,o=i):e.h<300?(n=r,a=0,o=i):e.h<360&&(n=i,a=0,o=r),new D(n+s,a+s,o+s,t)}function to(e){let t=0,i=0;return e.h!==0&&(t=Math.cos(_i(e.h))*e.c,i=Math.sin(_i(e.h))*e.c),new P(e.l,t,i)}function eo(e){let t=0;(Math.abs(e.b)>.001||Math.abs(e.a)>.001)&&(t=Zn(Math.atan2(e.b,e.a))),t<0&&(t+=360);const i=Math.sqrt(e.a*e.a+e.b*e.b);return new xt(e.l,i,t)}function io(e){const t=(e.l+16)/116,i=t+e.a/500,r=t-e.b/200,s=Math.pow(i,3),n=Math.pow(t,3),a=Math.pow(r,3);let o=0;s>P.epsilon?o=s:o=(116*i-16)/P.kappa;let l=0;e.l>P.epsilon*P.kappa?l=n:l=e.l/P.kappa;let c=0;return a>P.epsilon?c=a:c=(116*r-16)/P.kappa,o=q.whitePoint.x*o,l=q.whitePoint.y*l,c=q.whitePoint.z*c,new q(o,l,c)}function ro(e){function t(l){return l>P.epsilon?Math.pow(l,1/3):(P.kappa*l+16)/116}const i=t(e.x/q.whitePoint.x),r=t(e.y/q.whitePoint.y),s=t(e.z/q.whitePoint.z),n=116*r-16,a=500*(i-r),o=200*(r-s);return new P(n,a,o)}function ei(e){function t(l){return l<=.04045?l/12.92:Math.pow((l+.055)/1.055,2.4)}const i=t(e.r),r=t(e.g),s=t(e.b),n=i*.4124564+r*.3575761+s*.1804375,a=i*.2126729+r*.7151522+s*.072175,o=i*.0193339+r*.119192+s*.9503041;return new q(n,a,o)}function Vr(e,t=1){function i(a){return a<=.0031308?a*12.92:1.055*Math.pow(a,1/2.4)-.055}const r=i(e.x*3.2404542-e.y*1.5371385-e.z*.4985314),s=i(e.x*-.969266+e.y*1.8760108+e.z*.041556),n=i(e.x*.0556434-e.y*.2040259+e.z*1.0572252);return new D(r,s,n,t)}function ii(e){return ro(ei(e))}function Rr(e,t=1){return Vr(io(e),t)}function ri(e){return eo(ii(e))}function Lr(e,t=1){return Rr(to(e),t)}function Zi(e,t,i=18){const r=ri(e);let s=r.c+t*i;return s<0&&(s=0),Lr(new xt(r.l,s,r.h))}function We(e,t){return e*t}function Ji(e,t){return new D(We(e.r,t.r),We(e.g,t.g),We(e.b,t.b),1)}function qe(e,t){return e<.5?nt(2*t*e,0,1):nt(1-2*(1-t)*(1-e),0,1)}function Ki(e,t){return new D(qe(e.r,t.r),qe(e.g,t.g),qe(e.b,t.b),1)}var tr;(function(e){e[e.Burn=0]="Burn",e[e.Color=1]="Color",e[e.Darken=2]="Darken",e[e.Dodge=3]="Dodge",e[e.Lighten=4]="Lighten",e[e.Multiply=5]="Multiply",e[e.Overlay=6]="Overlay",e[e.Screen=7]="Screen"})(tr||(tr={}));function so(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new D(I(e,t.r,i.r),I(e,t.g,i.g),I(e,t.b,i.b),I(e,t.a,i.a))}function no(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new gt(vi(e,t.h,i.h),I(e,t.s,i.s),I(e,t.l,i.l))}function oo(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new Ut(vi(e,t.h,i.h),I(e,t.s,i.s),I(e,t.v,i.v))}function ao(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new q(I(e,t.x,i.x),I(e,t.y,i.y),I(e,t.z,i.z))}function lo(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new P(I(e,t.l,i.l),I(e,t.a,i.a),I(e,t.b,i.b))}function co(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new xt(I(e,t.l,i.l),I(e,t.c,i.c),vi(e,t.h,i.h))}var G;(function(e){e[e.RGB=0]="RGB",e[e.HSL=1]="HSL",e[e.HSV=2]="HSV",e[e.XYZ=3]="XYZ",e[e.LAB=4]="LAB",e[e.LCH=5]="LCH"})(G||(G={}));function At(e,t,i,r){if(isNaN(e)||e<=0)return i;if(e>=1)return r;switch(t){case G.HSL:return ti(no(e,Gt(i),Gt(r)));case G.HSV:return Kn(oo(e,Qi(i),Qi(r)));case G.XYZ:return Vr(ao(e,ei(i),ei(r)));case G.LAB:return Rr(lo(e,ii(i),ii(r)));case G.LCH:return Lr(co(e,ri(i),ri(r)));default:return so(e,i,r)}}class Y{constructor(t){if(t==null||t.length===0)throw new Error("The stops argument must be non-empty");this.stops=this.sortColorScaleStops(t)}static createBalancedColorScale(t){if(t==null||t.length===0)throw new Error("The colors argument must be non-empty");const i=new Array(t.length);for(let r=0;r<t.length;r++)r===0?i[r]={color:t[r],position:0}:r===t.length-1?i[r]={color:t[r],position:1}:i[r]={color:t[r],position:r*(1/(t.length-1))};return new Y(i)}getColor(t,i=G.RGB){if(this.stops.length===1)return this.stops[0].color;if(t<=0)return this.stops[0].color;if(t>=1)return this.stops[this.stops.length-1].color;let r=0;for(let a=0;a<this.stops.length;a++)this.stops[a].position<=t&&(r=a);let s=r+1;s>=this.stops.length&&(s=this.stops.length-1);const n=(t-this.stops[r].position)*(1/(this.stops[s].position-this.stops[r].position));return At(n,i,this.stops[r].color,this.stops[s].color)}trim(t,i,r=G.RGB){if(t<0||i>1||i<t)throw new Error("Invalid bounds");if(t===i)return new Y([{color:this.getColor(t,r),position:0}]);const s=[];for(let o=0;o<this.stops.length;o++)this.stops[o].position>=t&&this.stops[o].position<=i&&s.push(this.stops[o]);if(s.length===0)return new Y([{color:this.getColor(t),position:t},{color:this.getColor(i),position:i}]);s[0].position!==t&&s.unshift({color:this.getColor(t),position:t}),s[s.length-1].position!==i&&s.push({color:this.getColor(i),position:i});const n=i-t,a=new Array(s.length);for(let o=0;o<s.length;o++)a[o]={color:s[o].color,position:(s[o].position-t)/n};return new Y(a)}findNextColor(t,i,r=!1,s=G.RGB,n=.005,a=32){isNaN(t)||t<=0?t=0:t>=1&&(t=1);const o=this.getColor(t,s),l=r?0:1,c=this.getColor(l,s);if(Yi(o,c)<=i)return l;let f=r?0:t,v=r?t:0,$=l,w=0;for(;w<=a;){$=Math.abs(v-f)/2+f;const y=this.getColor($,s),O=Yi(o,y);if(Math.abs(O-i)<=n)return $;O>i?r?f=$:v=$:r?v=$:f=$,w++}return $}clone(){const t=new Array(this.stops.length);for(let i=0;i<t.length;i++)t[i]={color:this.stops[i].color,position:this.stops[i].position};return new Y(t)}sortColorScaleStops(t){return t.sort((i,r)=>{const s=i.position,n=r.position;return s<n?-1:s>n?1:0})}}const ho=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;function Ct(e){const t=ho.exec(e);if(t===null)return null;let i=t[1];if(i.length===3){const s=i.charAt(0),n=i.charAt(1),a=i.charAt(2);i=s.concat(s,n,n,a,a)}const r=parseInt(i,16);return isNaN(r)?null:new D(ze((r&16711680)>>>16,0,255),ze((r&65280)>>>8,0,255),ze(r&255,0,255),1)}class lt{constructor(t){this.config=Object.assign({},lt.defaultPaletteConfig,t),this.palette=[],this.updatePaletteColors()}updatePaletteGenerationValues(t){let i=!1;for(const r in t)this.config[r]&&(this.config[r].equalValue?this.config[r].equalValue(t[r])||(this.config[r]=t[r],i=!0):t[r]!==this.config[r]&&(this.config[r]=t[r],i=!0));return i&&this.updatePaletteColors(),i}updatePaletteColors(){const t=this.generatePaletteColorScale();for(let i=0;i<this.config.steps;i++)this.palette[i]=t.getColor(i/(this.config.steps-1),this.config.interpolationMode)}generatePaletteColorScale(){const t=Gt(this.config.baseColor),r=new Y([{position:0,color:this.config.scaleColorLight},{position:.5,color:this.config.baseColor},{position:1,color:this.config.scaleColorDark}]).trim(this.config.clipLight,1-this.config.clipDark),s=r.getColor(0),n=r.getColor(1);let a=s,o=n;if(t.s>=this.config.saturationAdjustmentCutoff&&(a=Zi(a,this.config.saturationLight),o=Zi(o,this.config.saturationDark)),this.config.multiplyLight!==0){const l=Ji(this.config.baseColor,a);a=At(this.config.multiplyLight,this.config.interpolationMode,a,l)}if(this.config.multiplyDark!==0){const l=Ji(this.config.baseColor,o);o=At(this.config.multiplyDark,this.config.interpolationMode,o,l)}if(this.config.overlayLight!==0){const l=Ki(this.config.baseColor,a);a=At(this.config.overlayLight,this.config.interpolationMode,a,l)}if(this.config.overlayDark!==0){const l=Ki(this.config.baseColor,o);o=At(this.config.overlayDark,this.config.interpolationMode,o,l)}return this.config.baseScalePosition?this.config.baseScalePosition<=0?new Y([{position:0,color:this.config.baseColor},{position:1,color:o.clamp()}]):this.config.baseScalePosition>=1?new Y([{position:0,color:a.clamp()},{position:1,color:this.config.baseColor}]):new Y([{position:0,color:a.clamp()},{position:this.config.baseScalePosition,color:this.config.baseColor},{position:1,color:o.clamp()}]):new Y([{position:0,color:a.clamp()},{position:.5,color:this.config.baseColor},{position:1,color:o.clamp()}])}}lt.defaultPaletteConfig={baseColor:Ct("#808080"),steps:11,interpolationMode:G.RGB,scaleColorLight:new D(1,1,1,1),scaleColorDark:new D(0,0,0,1),clipLight:.185,clipDark:.16,saturationAdjustmentCutoff:.05,saturationLight:.35,saturationDark:1.25,overlayLight:0,overlayDark:.25,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};lt.greyscalePaletteConfig={baseColor:Ct("#808080"),steps:11,interpolationMode:G.RGB,scaleColorLight:new D(1,1,1,1),scaleColorDark:new D(0,0,0,1),clipLight:0,clipDark:0,saturationAdjustmentCutoff:0,saturationLight:0,saturationDark:0,overlayLight:0,overlayDark:0,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};lt.defaultPaletteConfig.scaleColorLight,lt.defaultPaletteConfig.scaleColorDark;class ge{constructor(t){this.palette=[],this.config=Object.assign({},ge.defaultPaletteConfig,t),this.regenPalettes()}regenPalettes(){let t=this.config.steps;(isNaN(t)||t<3)&&(t=3);const i=.14,r=.06,s=new D(i,i,i,1),n=94,o=new lt(Object.assign(Object.assign({},lt.greyscalePaletteConfig),{baseColor:s,baseScalePosition:(1-i)*100/n,steps:t})).palette,l=Je(this.config.baseColor),c=Gt(this.config.baseColor).l,h=(l+c)/2,v=this.matchRelativeLuminanceIndex(h,o)/(t-1),w=this.matchRelativeLuminanceIndex(i,o)/(t-1),y=Gt(this.config.baseColor),O=ti(gt.fromObject({h:y.h,s:y.s,l:i})),ut=ti(gt.fromObject({h:y.h,s:y.s,l:r})),st=new Array(5);st[0]={position:0,color:new D(1,1,1,1)},st[1]={position:v,color:this.config.baseColor},st[2]={position:w,color:O},st[3]={position:.99,color:ut},st[4]={position:1,color:new D(0,0,0,1)};const Qr=new Y(st);this.palette=new Array(t);for(let Qt=0;Qt<t;Qt++){const Zr=Qr.getColor(Qt/(t-1),G.RGB);this.palette[Qt]=Zr}}matchRelativeLuminanceIndex(t,i){let r=Number.MAX_VALUE,s=0,n=0;const a=i.length;for(;n<a;n++){const o=Math.abs(Je(i[n])-t);o<r&&(r=o,s=n)}return s}}ge.defaultPaletteConfig={baseColor:Ct("#808080"),steps:94};function Nr(e,t){const i=e.relativeLuminance>t.relativeLuminance?e:t,r=e.relativeLuminance>t.relativeLuminance?t:e;return(i.relativeLuminance+.05)/(r.relativeLuminance+.05)}const ht=Object.freeze({create(e,t,i){return new ae(e,t,i)},from(e){return new ae(e.r,e.g,e.b)}});function uo(e){const t={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const i in t)if(typeof t[i]!=typeof e[i])return!1;return!0}class ae extends D{constructor(t,i,r){super(t,i,r,1),this.toColorString=this.toStringHexRGB,this.contrast=Nr.bind(null,this),this.createCSS=this.toColorString,this.relativeLuminance=Ke(this)}static fromObject(t){return new ae(t.r,t.g,t.b)}}function si(e,t,i=0,r=e.length-1){if(r===i)return e[i];const s=Math.floor((r-i)/2)+i;return t(e[s])?si(e,t,i,s):si(e,t,s+1,r)}const fo=(-.1+Math.sqrt(.21))/2;function po(e){return e.relativeLuminance<=fo}function vt(e){return po(e)?-1:1}function go(e,t,i){return typeof e=="number"?le.from(ht.create(e,t,i)):le.from(e)}function bo(e){return uo(e)?ce.from(e):ce.from(ht.create(e.r,e.g,e.b))}const le=Object.freeze({create:go,from:bo});class ce{constructor(t,i){this.closestIndexCache=new Map,this.source=t,this.swatches=i,this.reversedSwatches=Object.freeze([...this.swatches].reverse()),this.lastIndex=this.swatches.length-1}colorContrast(t,i,r,s){r===void 0&&(r=this.closestIndexOf(t));let n=this.swatches;const a=this.lastIndex;let o=r;s===void 0&&(s=vt(t));const l=c=>Nr(t,c)>=i;return s===-1&&(n=this.reversedSwatches,o=a-o),si(n,l,o,a)}get(t){return this.swatches[t]||this.swatches[nt(t,0,this.lastIndex)]}closestIndexOf(t){if(this.closestIndexCache.has(t.relativeLuminance))return this.closestIndexCache.get(t.relativeLuminance);let i=this.swatches.indexOf(t);if(i!==-1)return this.closestIndexCache.set(t.relativeLuminance,i),i;const r=this.swatches.reduce((s,n)=>Math.abs(n.relativeLuminance-t.relativeLuminance)<Math.abs(s.relativeLuminance-t.relativeLuminance)?n:s);return i=this.swatches.indexOf(r),this.closestIndexCache.set(t.relativeLuminance,i),i}static from(t){return new ce(t,Object.freeze(new ge({baseColor:D.fromObject(t)}).palette.map(i=>{const r=Ct(i.toStringHexRGB());return ht.create(r.r,r.g,r.b)})))}}function vo(e,t,i,r,s,n,a,o,l){const c=e.source,h=t.closestIndexOf(i),f=Math.max(a,o,l),v=h>=f?-1:1,w=e.closestIndexOf(c),y=w+v*-1*r,O=y+v*s,ut=y+v*n;return{rest:e.get(y),hover:e.get(w),active:e.get(O),focus:e.get(ut)}}function mo(e,t,i,r,s,n,a){const o=e.source,l=e.closestIndexOf(o),c=vt(t),h=l+(c===1?Math.min(r,s):Math.max(c*r,c*s)),f=e.colorContrast(t,i,h,c),v=e.closestIndexOf(f),$=v+c*Math.abs(r-s),w=c===1?r<s:c*r>c*s;let y,O;return w?(y=v,O=$):(y=$,O=v),{rest:e.get(y),hover:e.get(O),active:e.get(y+c*n),focus:e.get(y+c*a)}}const er=ht.create(1,1,1),yo=ht.create(0,0,0),wo=ht.from(Ct("#808080")),xo=ht.from(Ct("#DA1A5F"));function So(e,t){return e.contrast(er)>=t?er:yo}function $o(e,t,i,r,s,n){const a=e.closestIndexOf(t),o=Math.max(i,r,s,n),l=a>=o?-1:1;return{rest:e.get(a+l*i),hover:e.get(a+l*r),active:e.get(a+l*s),focus:e.get(a+l*n)}}function Fo(e,t,i,r,s,n){const a=vt(t),o=e.closestIndexOf(t);return{rest:e.get(o-a*i),hover:e.get(o-a*r),active:e.get(o-a*s),focus:e.get(o-a*n)}}function ko(e,t,i){const r=e.closestIndexOf(t);return e.get(r-(r<i?i*-1:i))}function Co(e,t,i,r,s,n,a,o,l,c){const h=Math.max(i,r,s,n,a,o,l,c),f=e.closestIndexOf(t),v=f>=h?-1:1;return{rest:e.get(f+v*i),hover:e.get(f+v*r),active:e.get(f+v*s),focus:e.get(f+v*n)}}function To(e,t,i,r,s,n){const a=vt(t),o=e.closestIndexOf(e.colorContrast(t,4.5)),l=o+a*Math.abs(i-r),c=a===1?i<r:a*i>a*r;let h,f;return c?(h=o,f=l):(h=l,f=o),{rest:e.get(h),hover:e.get(f),active:e.get(h+a*s),focus:e.get(h+a*n)}}function Do(e,t){return e.colorContrast(t,3.5)}function Mo(e,t,i){return e.colorContrast(i,3.5,e.closestIndexOf(e.source),vt(t)*-1)}function Vo(e,t){return e.colorContrast(t,14)}function Ro(e,t){return e.colorContrast(t,4.5)}function be(e){return ht.create(e,e,e)}const Lo={LightMode:1,DarkMode:.23};function No(e,t,i){return e.get(e.closestIndexOf(be(t))+i)}function Po(e,t,i){const r=e.closestIndexOf(be(t))-i;return e.get(r-i)}function Eo(e,t){return e.get(e.closestIndexOf(be(t)))}function mi(e,t,i,r,s,n){return Math.max(e.closestIndexOf(be(t))+i,r,s,n)}function Io(e,t,i,r,s,n){return e.get(mi(e,t,i,r,s,n))}function Ao(e,t,i,r,s,n){return e.get(mi(e,t,i,r,s,n)+i)}function Oo(e,t,i,r,s,n){return e.get(mi(e,t,i,r,s,n)+i*2)}function Bo(e,t,i,r,s,n){const a=e.closestIndexOf(t),o=vt(t),l=a+o*i,c=l+o*(r-i),h=l+o*(s-i),f=l+o*(n-i);return{rest:e.get(l),hover:e.get(c),active:e.get(h),focus:e.get(f)}}function Ho(e,t,i){return e.get(e.closestIndexOf(t)+vt(t)*i)}const{create:d}=pe;function b(e){return pe.create({name:e,cssCustomPropertyName:null})}const Pr=d("body-font").withDefault('aktiv-grotesk, "Segoe UI", Arial, Helvetica, sans-serif'),Er=d("base-height-multiplier").withDefault(10);d("base-horizontal-spacing-multiplier").withDefault(3);const Tt=d("base-layer-luminance").withDefault(Lo.DarkMode),yt=d("control-corner-radius").withDefault(4),yi=d("density").withDefault(0),Q=d("design-unit").withDefault(4),Ue=d("direction").withDefault(H.ltr),wi=d("disabled-opacity").withDefault(.3),tt=d("stroke-width").withDefault(1),K=d("focus-stroke-width").withDefault(2),jo=d("type-ramp-base-font-size").withDefault("14px"),zo=d("type-ramp-base-line-height").withDefault("20px");d("type-ramp-minus-1-font-size").withDefault("12px");d("type-ramp-minus-1-line-height").withDefault("16px");d("type-ramp-minus-2-font-size").withDefault("10px");d("type-ramp-minus-2-line-height").withDefault("16px");d("type-ramp-plus-1-font-size").withDefault("16px");d("type-ramp-plus-1-line-height").withDefault("24px");d("type-ramp-plus-2-font-size").withDefault("20px");d("type-ramp-plus-2-line-height").withDefault("28px");d("type-ramp-plus-3-font-size").withDefault("28px");d("type-ramp-plus-3-line-height").withDefault("36px");d("type-ramp-plus-4-font-size").withDefault("34px");d("type-ramp-plus-4-line-height").withDefault("44px");d("type-ramp-plus-5-font-size").withDefault("46px");d("type-ramp-plus-5-line-height").withDefault("56px");d("type-ramp-plus-6-font-size").withDefault("60px");d("type-ramp-plus-6-line-height").withDefault("72px");b("accent-fill-rest-delta").withDefault(0);const Wo=b("accent-fill-hover-delta").withDefault(4),qo=b("accent-fill-active-delta").withDefault(-5),Uo=b("accent-fill-focus-delta").withDefault(0),Go=b("accent-foreground-rest-delta").withDefault(0),_o=b("accent-foreground-hover-delta").withDefault(6),Xo=b("accent-foreground-active-delta").withDefault(-4),Yo=b("accent-foreground-focus-delta").withDefault(0),Dt=b("neutral-fill-rest-delta").withDefault(7),Mt=b("neutral-fill-hover-delta").withDefault(10),Vt=b("neutral-fill-active-delta").withDefault(5),Ir=b("neutral-fill-focus-delta").withDefault(0),Qo=b("neutral-fill-input-rest-delta").withDefault(0),Zo=b("neutral-fill-input-hover-delta").withDefault(0),Jo=b("neutral-fill-input-active-delta").withDefault(0),Ko=b("neutral-fill-input-focus-delta").withDefault(0),ta=b("neutral-fill-stealth-rest-delta").withDefault(0),ea=b("neutral-fill-stealth-hover-delta").withDefault(5),ia=b("neutral-fill-stealth-active-delta").withDefault(3),ra=b("neutral-fill-stealth-focus-delta").withDefault(0),sa=b("neutral-fill-strong-rest-delta").withDefault(0),na=b("neutral-fill-strong-hover-delta").withDefault(8),oa=b("neutral-fill-strong-active-delta").withDefault(-5),aa=b("neutral-fill-strong-focus-delta").withDefault(0),Rt=b("neutral-fill-layer-rest-delta").withDefault(3),la=b("neutral-stroke-rest-delta").withDefault(25),ca=b("neutral-stroke-hover-delta").withDefault(40),ha=b("neutral-stroke-active-delta").withDefault(16),ua=b("neutral-stroke-focus-delta").withDefault(25),da=b("neutral-stroke-divider-rest-delta").withDefault(8),fa=d("neutral-color").withDefault(wo),E=b("neutral-palette").withDefault(e=>le.from(fa.getValueFor(e))),pa=d("accent-color").withDefault(xo),xi=b("accent-palette").withDefault(e=>le.from(pa.getValueFor(e))),ga=b("neutral-layer-card-container-recipe").withDefault({evaluate:e=>No(E.getValueFor(e),Tt.getValueFor(e),Rt.getValueFor(e))});d("neutral-layer-card-container").withDefault(e=>ga.getValueFor(e).evaluate(e));const ba=b("neutral-layer-floating-recipe").withDefault({evaluate:e=>Po(E.getValueFor(e),Tt.getValueFor(e),Rt.getValueFor(e))});d("neutral-layer-floating").withDefault(e=>ba.getValueFor(e).evaluate(e));const va=b("neutral-layer-1-recipe").withDefault({evaluate:e=>Eo(E.getValueFor(e),Tt.getValueFor(e))}),ma=d("neutral-layer-1").withDefault(e=>va.getValueFor(e).evaluate(e)),ya=b("neutral-layer-2-recipe").withDefault({evaluate:e=>Io(E.getValueFor(e),Tt.getValueFor(e),Rt.getValueFor(e),Dt.getValueFor(e),Mt.getValueFor(e),Vt.getValueFor(e))});d("neutral-layer-2").withDefault(e=>ya.getValueFor(e).evaluate(e));const wa=b("neutral-layer-3-recipe").withDefault({evaluate:e=>Ao(E.getValueFor(e),Tt.getValueFor(e),Rt.getValueFor(e),Dt.getValueFor(e),Mt.getValueFor(e),Vt.getValueFor(e))});d("neutral-layer-3").withDefault(e=>wa.getValueFor(e).evaluate(e));const xa=b("neutral-layer-4-recipe").withDefault({evaluate:e=>Oo(E.getValueFor(e),Tt.getValueFor(e),Rt.getValueFor(e),Dt.getValueFor(e),Mt.getValueFor(e),Vt.getValueFor(e))});d("neutral-layer-4").withDefault(e=>xa.getValueFor(e).evaluate(e));const z=d("fill-color").withDefault(e=>ma.getValueFor(e));var _t;(function(e){e[e.normal=4.5]="normal",e[e.large=7]="large"})(_t||(_t={}));const ve=d({name:"accent-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>vo(xi.getValueFor(e),E.getValueFor(e),t||z.getValueFor(e),Wo.getValueFor(e),qo.getValueFor(e),Uo.getValueFor(e),Dt.getValueFor(e),Mt.getValueFor(e),Vt.getValueFor(e))}),bt=d("accent-fill-rest").withDefault(e=>ve.getValueFor(e).evaluate(e).rest),me=d("accent-fill-hover").withDefault(e=>ve.getValueFor(e).evaluate(e).hover),ye=d("accent-fill-active").withDefault(e=>ve.getValueFor(e).evaluate(e).active),Ar=d("accent-fill-focus").withDefault(e=>ve.getValueFor(e).evaluate(e).focus),Or=e=>(t,i)=>So(i||bt.getValueFor(t),e),we=b("foreground-on-accent-recipe").withDefault({evaluate:(e,t)=>Or(_t.normal)(e,t)}),Sa=d("foreground-on-accent-rest").withDefault(e=>we.getValueFor(e).evaluate(e,bt.getValueFor(e))),$a=d("foreground-on-accent-hover").withDefault(e=>we.getValueFor(e).evaluate(e,me.getValueFor(e))),Fa=d("foreground-on-accent-active").withDefault(e=>we.getValueFor(e).evaluate(e,ye.getValueFor(e)));d("foreground-on-accent-focus").withDefault(e=>we.getValueFor(e).evaluate(e,Ar.getValueFor(e)));const xe=b("foreground-on-accent-large-recipe").withDefault({evaluate:(e,t)=>Or(_t.large)(e,t)});d("foreground-on-accent-rest-large").withDefault(e=>xe.getValueFor(e).evaluate(e,bt.getValueFor(e)));d("foreground-on-accent-hover-large").withDefault(e=>xe.getValueFor(e).evaluate(e,me.getValueFor(e)));d("foreground-on-accent-active-large").withDefault(e=>xe.getValueFor(e).evaluate(e,ye.getValueFor(e)));d("foreground-on-accent-focus-large").withDefault(e=>xe.getValueFor(e).evaluate(e,Ar.getValueFor(e)));const ka=e=>(t,i)=>mo(xi.getValueFor(t),i||z.getValueFor(t),e,Go.getValueFor(t),_o.getValueFor(t),Xo.getValueFor(t),Yo.getValueFor(t)),Se=d({name:"accent-foreground-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>ka(_t.normal)(e,t)}),Xt=d("accent-foreground-rest").withDefault(e=>Se.getValueFor(e).evaluate(e).rest),ni=d("accent-foreground-hover").withDefault(e=>Se.getValueFor(e).evaluate(e).hover),oi=d("accent-foreground-active").withDefault(e=>Se.getValueFor(e).evaluate(e).active);d("accent-foreground-focus").withDefault(e=>Se.getValueFor(e).evaluate(e).focus);const $e=d({name:"neutral-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>$o(E.getValueFor(e),t||z.getValueFor(e),Dt.getValueFor(e),Mt.getValueFor(e),Vt.getValueFor(e),Ir.getValueFor(e))}),Br=d("neutral-fill-rest").withDefault(e=>$e.getValueFor(e).evaluate(e).rest),Ca=d("neutral-fill-hover").withDefault(e=>$e.getValueFor(e).evaluate(e).hover),Ta=d("neutral-fill-active").withDefault(e=>$e.getValueFor(e).evaluate(e).active);d("neutral-fill-focus").withDefault(e=>$e.getValueFor(e).evaluate(e).focus);const Fe=d({name:"neutral-fill-input-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>Fo(E.getValueFor(e),t||z.getValueFor(e),Qo.getValueFor(e),Zo.getValueFor(e),Jo.getValueFor(e),Ko.getValueFor(e))});d("neutral-fill-input-rest").withDefault(e=>Fe.getValueFor(e).evaluate(e).rest);d("neutral-fill-input-hover").withDefault(e=>Fe.getValueFor(e).evaluate(e).hover);d("neutral-fill-input-active").withDefault(e=>Fe.getValueFor(e).evaluate(e).active);d("neutral-fill-input-focus").withDefault(e=>Fe.getValueFor(e).evaluate(e).focus);const ke=d({name:"neutral-fill-stealth-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>Co(E.getValueFor(e),t||z.getValueFor(e),ta.getValueFor(e),ea.getValueFor(e),ia.getValueFor(e),ra.getValueFor(e),Dt.getValueFor(e),Mt.getValueFor(e),Vt.getValueFor(e),Ir.getValueFor(e))}),Hr=d("neutral-fill-stealth-rest").withDefault(e=>ke.getValueFor(e).evaluate(e).rest),Da=d("neutral-fill-stealth-hover").withDefault(e=>ke.getValueFor(e).evaluate(e).hover),Ma=d("neutral-fill-stealth-active").withDefault(e=>ke.getValueFor(e).evaluate(e).active);d("neutral-fill-stealth-focus").withDefault(e=>ke.getValueFor(e).evaluate(e).focus);const Ce=d({name:"neutral-fill-strong-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>To(E.getValueFor(e),t||z.getValueFor(e),sa.getValueFor(e),na.getValueFor(e),oa.getValueFor(e),aa.getValueFor(e))});d("neutral-fill-strong-rest").withDefault(e=>Ce.getValueFor(e).evaluate(e).rest);d("neutral-fill-strong-hover").withDefault(e=>Ce.getValueFor(e).evaluate(e).hover);d("neutral-fill-strong-active").withDefault(e=>Ce.getValueFor(e).evaluate(e).active);d("neutral-fill-strong-focus").withDefault(e=>Ce.getValueFor(e).evaluate(e).focus);const Va=b("neutral-fill-layer-recipe").withDefault({evaluate:(e,t)=>ko(E.getValueFor(e),t||z.getValueFor(e),Rt.getValueFor(e))});d("neutral-fill-layer-rest").withDefault(e=>Va.getValueFor(e).evaluate(e));const Ra=b("focus-stroke-outer-recipe").withDefault({evaluate:e=>Do(E.getValueFor(e),z.getValueFor(e))}),ct=d("focus-stroke-outer").withDefault(e=>Ra.getValueFor(e).evaluate(e)),La=b("focus-stroke-inner-recipe").withDefault({evaluate:e=>Mo(xi.getValueFor(e),z.getValueFor(e),ct.getValueFor(e))}),Na=d("focus-stroke-inner").withDefault(e=>La.getValueFor(e).evaluate(e)),Pa=b("neutral-foreground-hint-recipe").withDefault({evaluate:e=>Ro(E.getValueFor(e),z.getValueFor(e))});d("neutral-foreground-hint").withDefault(e=>Pa.getValueFor(e).evaluate(e));const Ea=b("neutral-foreground-recipe").withDefault({evaluate:e=>Vo(E.getValueFor(e),z.getValueFor(e))}),pt=d("neutral-foreground-rest").withDefault(e=>Ea.getValueFor(e).evaluate(e)),Te=d({name:"neutral-stroke-recipe",cssCustomPropertyName:null}).withDefault({evaluate:e=>Bo(E.getValueFor(e),z.getValueFor(e),la.getValueFor(e),ca.getValueFor(e),ha.getValueFor(e),ua.getValueFor(e))}),jr=d("neutral-stroke-rest").withDefault(e=>Te.getValueFor(e).evaluate(e).rest),Ia=d("neutral-stroke-hover").withDefault(e=>Te.getValueFor(e).evaluate(e).hover);d("neutral-stroke-active").withDefault(e=>Te.getValueFor(e).evaluate(e).active);d("neutral-stroke-focus").withDefault(e=>Te.getValueFor(e).evaluate(e).focus);const Aa=b("neutral-stroke-divider-recipe").withDefault({evaluate:(e,t)=>Ho(E.getValueFor(e),t||z.getValueFor(e),da.getValueFor(e))});d("neutral-stroke-divider-rest").withDefault(e=>Aa.getValueFor(e).evaluate(e));pe.create({name:"height-number",cssCustomPropertyName:null}).withDefault(e=>(Er.getValueFor(e)+yi.getValueFor(e))*Q.getValueFor(e));const St=Vs`(${Er} + ${yi}) * ${Q}`,Oa="0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(.11 * (2 - var(--background-luminance, 1))))",Ba="0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(.13 * (2 - var(--background-luminance, 1))))",Ha=`box-shadow: ${Oa}, ${Ba};`,ja=m`
    ${bi("inline-flex")} :host {
        font-family: ${Pr};
        outline: none;
        font-size: ${jo};
        line-height: ${zo};
        height: calc(${St} * 1px);
        min-width: calc(${St} * 1px);
        background-color: ${Br};
        color: ${pt};
        border-radius: calc(${yt} * 1px);
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
        padding: 0 calc((10 + (${Q} * 2 * ${yi})) * 1px);
        white-space: nowrap;
        outline: none;
        text-decoration: none;
        border: calc(${tt} * 1px) solid transparent;
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
        background-color: ${Ca};
    }

    :host(:active) {
        background-color: ${Ta};
    }

    .control:${k} {
        border-color: ${ct};
        box-shadow: 0 0 0 calc((${K} - ${tt}) * 1px) ${ct} inset;
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

            .control:${k} {
              forced-color-adjust: none;
              background-color: ${u.Highlight};
              border-color: ${u.ButtonText};
              box-shadow: 0 0 0 calc((${K} - ${tt}) * 1px) ${u.ButtonText} inset;
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
            :host([href]) .control:${k}{
              forced-color-adjust: none;
              background: ${u.ButtonFace};
              border-color: ${u.LinkText};
              box-shadow: 0 0 0 1px ${u.LinkText} inset;
              color: ${u.LinkText};
              fill: currentColor;
            }
        `)),za=m`
    :host([appearance="accent"]) {
        background: ${bt};
        color: ${Sa};
    }

    :host([appearance="accent"]:hover) {
        background: ${me};
        color: ${$a};
    }

    :host([appearance="accent"]:active) .control:active {
        background: ${ye};
        color: ${Fa};
    }

    :host([appearance="accent"]) .control:${k} {
        box-shadow: 0 0 0 calc((${K} - ${tt}) * 1px) ${ct} inset,
            0 0 0 calc((${K} + ${tt}) * 1px) ${Na} inset;
    }
`.withBehaviors(U(m`
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

            :host([appearance="accent"]) .control:${k} {
                border-color: ${u.Highlight};
                box-shadow: 0 0 0 calc(${K} * 1px) ${u.HighlightText} inset;
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

            :host([appearance="accent"][href]) .control:${k} {
                border-color: ${u.LinkText};
                box-shadow: 0 0 0 calc(${K} * 1px) ${u.HighlightText} inset;
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
        color: ${Xt};
        border-bottom: calc(${tt} * 1px) solid ${Xt};
    }

    :host([appearance="hypertext"]:hover),
    :host([appearance="hypertext"]) .control:hover {
        background: transparent;
        border-bottom-color: ${ni};
    }

    :host([appearance="hypertext"]:active),
    :host([appearance="hypertext"]) .control:active {
        background: transparent;
        border-bottom-color: ${oi};
    }

    :host([appearance="hypertext"]) .control:${k} {
        border-bottom: calc(${K} * 1px) solid ${ct};
        margin-bottom: calc(calc(${tt} - ${K}) * 1px);
    }
`.withBehaviors(U(m`
            :host([appearance="hypertext"]:hover) {
                background-color: ${u.ButtonFace};
                color: ${u.ButtonText};
            }
            :host([appearance="hypertext"][href]) .control:hover,
            :host([appearance="hypertext"][href]) .control:active,
            :host([appearance="hypertext"][href]) .control:${k} {
                color: ${u.LinkText};
                border-bottom-color: ${u.LinkText};
                box-shadow: none;
            }
        `));const Wa=m`
    :host([appearance="lightweight"]) {
        background: transparent;
        color: ${Xt};
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
        color: ${ni};
    }

    :host([appearance="lightweight"]:active) {
        background: transparent;
        color: ${oi};
    }

    :host([appearance="lightweight"]) .content {
        position: relative;
    }

    :host([appearance="lightweight"]) .content::before {
        content: "";
        display: block;
        height: calc(${tt} * 1px);
        position: absolute;
        top: calc(1em + 4px);
        width: 100%;
    }

    :host([appearance="lightweight"]:hover) .content::before {
        background: ${ni};
    }

    :host([appearance="lightweight"]:active) .content::before {
        background: ${oi};
    }

    :host([appearance="lightweight"]) .control:${k} .content::before {
        background: ${pt};
        height: calc(${K} * 1px);
    }
`.withBehaviors(U(m`
            :host([appearance="lightweight"]) .control:hover,
            :host([appearance="lightweight"]) .control:${k} {
                forced-color-adjust: none;
                background: ${u.ButtonFace};
                color: ${u.Highlight};
            }
            :host([appearance="lightweight"]) .control:hover .content::before,
            :host([appearance="lightweight"]) .control:${k} .content::before {
                background: ${u.Highlight};
            }

            :host([appearance="lightweight"][href]) .control:hover,
            :host([appearance="lightweight"][href]) .control:${k} {
                background: ${u.ButtonFace};
                box-shadow: none;
                color: ${u.LinkText};
            }

            :host([appearance="lightweight"][href]) .control:hover .content::before,
            :host([appearance="lightweight"][href]) .control:${k} .content::before {
                background: ${u.LinkText};
            }
        `)),qa=m`
    :host([appearance="outline"]) {
        background: transparent;
        border-color: ${bt};
    }

    :host([appearance="outline"]:hover) {
        border-color: ${me};
    }

    :host([appearance="outline"]:active) {
        border-color: ${ye};
    }

    :host([appearance="outline"]) .control {
        border-color: inherit;
    }

    :host([appearance="outline"]) .control:${k} {
        box-shadow: 0 0 0 calc((${K} - ${tt}) * 1px) ${ct} inset;
        border-color: ${ct};
    }
`.withBehaviors(U(m`
            :host([appearance="outline"]) .control {
                border-color: ${u.ButtonText};
            }
            :host([appearance="outline"]) .control:${k} {
              forced-color-adjust: none;
              background-color: ${u.Highlight};
              border-color: ${u.ButtonText};
              box-shadow: 0 0 0 calc((${K} - ${tt}) * 1px) ${u.ButtonText} inset;
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
            :host([appearance="outline"][href]) .control:${k} {
              forced-color-adjust: none;
              border-color: ${u.LinkText};
              box-shadow: 0 0 0 1px ${u.LinkText} inset;
            }
        `)),Ua=m`
    :host([appearance="stealth"]) {
        background: ${Hr};
    }

    :host([appearance="stealth"]:hover) {
        background: ${Da};
    }

    :host([appearance="stealth"]:active) {
        background: ${Ma};
    }
`.withBehaviors(U(m`
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

            :host([appearance="stealth"]:${k}) .control {
                background: ${u.Highlight};
                box-shadow: 0 0 0 1px ${u.Highlight};
                color: ${u.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]) .control {
                color: ${u.LinkText};
            }

            :host([appearance="stealth"][href]:hover) .control,
            :host([appearance="stealth"][href]:${k}) .control {
                background: ${u.LinkText};
                border-color: ${u.LinkText};
                color: ${u.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]:${k}) .control {
                forced-color-adjust: none;
                box-shadow: 0 0 0 1px ${u.LinkText};
            }
        `));class Ga{constructor(t,i){this.cache=new WeakMap,this.ltr=t,this.rtl=i}bind(t){this.attach(t)}unbind(t){const i=this.cache.get(t);i&&Ue.unsubscribe(i)}attach(t){const i=this.cache.get(t)||new _a(this.ltr,this.rtl,t),r=Ue.getValueFor(t);Ue.subscribe(i),i.attach(r),this.cache.set(t,i)}}class _a{constructor(t,i,r){this.ltr=t,this.rtl=i,this.source=r,this.attached=null}handleChange({target:t,token:i}){this.attach(i.getValueFor(t))}attach(t){this.attached!==this[t]&&(this.attached!==null&&this.source.$fastController.removeStyles(this.attached),this.attached=this[t],this.attached!==null&&this.source.$fastController.addStyles(this.attached))}}function ee(e,t){return new Yn("appearance",e,t)}const Xa=(e,t)=>m`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
            opacity: ${wi};
            background-color: ${Br};
            cursor: ${Ze};
        }

        ${ja}
    `.withBehaviors(U(m`
                :host([disabled]),
                :host([disabled]) .control,
                :host([disabled]:hover),
                :host([disabled]:active) {
                    forced-color-adjust: none;
                    background-color: ${u.ButtonFace};
                    border-color: ${u.GrayText};
                    color: ${u.GrayText};
                    cursor: ${Ze};
                    opacity: 1;
                }
            `),ee("accent",m`
                :host([appearance="accent"][disabled]),
                :host([appearance="accent"][disabled]:hover),
                :host([appearance="accent"][disabled]:active) {
                    background: ${bt};
                }

                ${za}
            `.withBehaviors(U(m`
                        :host([appearance="accent"][disabled]) .control,
                        :host([appearance="accent"][disabled]) .control:hover {
                            background: ${u.ButtonFace};
                            border-color: ${u.GrayText};
                            color: ${u.GrayText};
                        }
                    `))),ee("lightweight",m`
                :host([appearance="lightweight"][disabled]:hover),
                :host([appearance="lightweight"][disabled]:active) {
                    background-color: transparent;
                    color: ${Xt};
                }

                :host([appearance="lightweight"][disabled]) .content::before,
                :host([appearance="lightweight"][disabled]:hover) .content::before,
                :host([appearance="lightweight"][disabled]:active) .content::before {
                    background: transparent;
                }

                ${Wa}
            `.withBehaviors(U(m`
                        :host([appearance="lightweight"].disabled) .control {
                            forced-color-adjust: none;
                            color: ${u.GrayText};
                        }

                        :host([appearance="lightweight"].disabled)
                            .control:hover
                            .content::before {
                            background: none;
                        }
                    `))),ee("outline",m`
                :host([appearance="outline"][disabled]),
                :host([appearance="outline"][disabled]:hover),
                :host([appearance="outline"][disabled]:active) {
                    background: transparent;
                    border-color: ${bt};
                }

                ${qa}
            `.withBehaviors(U(m`
                        :host([appearance="outline"][disabled]) .control {
                            border-color: ${u.GrayText};
                        }
                    `))),ee("stealth",m`
                :host([appearance="stealth"][disabled]),
                :host([appearance="stealth"][disabled]:hover),
                :host([appearance="stealth"][disabled]:active) {
                    background: ${Hr};
                }

                ${Ua}
            `.withBehaviors(U(m`
                        :host([appearance="stealth"][disabled]) {
                            background: ${u.ButtonFace};
                        }

                        :host([appearance="stealth"][disabled]) .control {
                            background: ${u.ButtonFace};
                            border-color: transparent;
                            color: ${u.GrayText};
                        }
                    `))));class zr extends J{constructor(){super(...arguments),this.appearance="neutral"}defaultSlottedContentChanged(t,i){const r=this.defaultSlottedContent.filter(s=>s.nodeType===Node.ELEMENT_NODE);r.length===1&&r[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}p([g],zr.prototype,"appearance",void 0);const Ya=zr.compose({baseName:"button",baseClass:J,template:fn,styles:Xa,shadowOptions:{delegatesFocus:!0}}),Qa=(e,t)=>m`
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
        ${Ha}
        margin-top: auto;
        margin-bottom: auto;
        width: var(--dialog-width);
        height: var(--dialog-height);
        background-color: ${z};
        z-index: 1;
        border-radius: calc(${yt} * 1px);
        border: calc(${tt} * 1px) solid transparent;
    }
`,Za=Z.compose({baseName:"dialog",template:Mn,styles:Qa}),ir=m`
    :host {
        align-self: start;
        grid-row: 2;
        margin-top: -2px;
        height: calc((${St} / 2 + ${Q}) * 1px);
        width: auto;
    }
    .container {
        grid-template-rows: auto auto;
        grid-template-columns: 0;
    }
    .label {
        margin: 2px 0;
    }
`,rr=m`
    :host {
        justify-self: start;
        grid-column: 2;
        margin-left: 2px;
        height: auto;
        width: calc((${St} / 2 + ${Q}) * 1px);
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
        margin-left: calc((${Q} / 2) * 3px);
        align-self: center;
    }
`,Ja=(e,t)=>m`
        ${bi("block")} :host {
            font-family: ${Pr};
            color: ${pt};
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
            width: calc((${Q} / 4) * 1px);
            height: calc(${St} * 0.25 * 1px);
            background: ${jr};
            justify-self: center;
        }
        :host(.disabled) {
            opacity: ${wi};
        }
    `.withBehaviors(U(m`
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
            `));class Ka extends rt{sliderOrientationChanged(){this.sliderOrientation===W.horizontal?(this.$fastController.addStyles(ir),this.$fastController.removeStyles(rr)):(this.$fastController.addStyles(rr),this.$fastController.removeStyles(ir))}}const tl=Ka.compose({baseName:"slider-label",baseClass:rt,template:Wn,styles:Ja}),el=m`
    .track-start {
        left: 0;
    }
`,il=m`
    .track-start {
        right: 0;
    }
`,rl=(e,t)=>m`
        :host([hidden]) {
            display: none;
        }

        ${bi("inline-grid")} :host {
            --thumb-size: calc(${St} * 0.5 - ${Q});
            --thumb-translate: calc(var(--thumb-size) * -0.5 + var(--track-width) / 2);
            --track-overhang: calc((${Q} / 2) * -1);
            --track-width: ${Q};
            --fast-slider-height: calc(var(--thumb-size) * 10);
            align-items: center;
            width: 100%;
            margin: calc(${Q} * 1px) 0;
            user-select: none;
            box-sizing: border-box;
            border-radius: calc(${yt} * 1px);
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

        :host(:${k}) .thumb-cursor {
            box-shadow: 0 0 0 2px ${z}, 0 0 0 4px ${ct};
        }

        .thumb-container {
            position: absolute;
            height: calc(var(--thumb-size) * 1px);
            width: calc(var(--thumb-size) * 1px);
            transition: all 0.2s ease;
            color: ${pt};
            fill: currentcolor;
        }
        .thumb-cursor {
            border: none;
            width: calc(var(--thumb-size) * 1px);
            height: calc(var(--thumb-size) * 1px);
            background: ${pt};
            border-radius: calc(${yt} * 1px);
        }
        .thumb-cursor:hover {
            background: ${pt};
            border-color: ${Ia};
        }
        .thumb-cursor:active {
            background: ${pt};
        }
        .track-start {
            background: ${Xt};
            position: absolute;
            height: 100%;
            left: 0;
            border-radius: calc(${yt} * 1px);
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
            background: ${jr};
            position: absolute;
            border-radius: calc(${yt} * 1px);
        }
        :host([orientation="vertical"]) {
            height: calc(var(--fast-slider-height) * 1px);
            min-height: calc(var(--thumb-size) * 1px);
            min-width: calc(${Q} * 20px);
        }
        :host([orientation="vertical"]) .track-start {
            height: auto;
            width: 100%;
            top: 0;
        }
        :host([disabled]), :host([readonly]) {
            cursor: ${Ze};
        }
        :host([disabled]) {
            opacity: ${wi};
        }
    `.withBehaviors(new Ga(el,il),U(m`
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
                :host(:${k}) .thumb-cursor {
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

                :host(:${k}) .thumb-cursor {
                    background: ${u.Highlight};
                    border-color: ${u.Highlight};
                    box-shadow: 0 0 0 2px ${u.Field}, 0 0 0 4px ${u.FieldText};
                }
            `)),sl=A.compose({baseName:"slider",template:qn,styles:rl,thumb:`
        <div class="thumb-cursor"></div>
    `});function nl(e){return Cr.getOrCreate(e).withPrefix("fast")}nl().register(sl({thumb:'<div style="background-color: #fff; border: solid; border-color: #777; border-width: 1px; border-radius: 3px; width: 16px; height: 16px; "></div>'}),tl(),Za({}),Ya());const ol=document.getElementById("canvas"),al=document.getElementById("infoDialogOpenButton"),ll=document.getElementById("infoDialogCloseButton"),Wr=document.getElementById("infoDialog"),he=document.getElementById("nCitiesSlider"),$t=document.getElementById("piSlider"),Ft=document.getElementById("tcostSlider"),kt=document.getElementById("sigmaSlider"),cl=document.getElementById("visualizer"),qr=document.getElementById("nCities"),Ur=document.getElementById("pi"),Gr=document.getElementById("tcost"),_r=document.getElementById("sigma"),De=document.getElementById("start"),Me=document.getElementById("stop"),Si=document.getElementById("reset"),hl=document.getElementById("counter"),Xr=1,M=new es(50,1,.4,5,10,Xr),ul=new ss(ol,M);M.addUpdateEventListener(()=>{hl.innerText=M.counter.toLocaleString(),ul.repaint();const e=M.country.cities.map(t=>t.MShare).reduce((t,i)=>i>t?i:t,0);ns({canvas:cl,diameter:300,vertices:M.numCities,vertexCircleRadius:5,vertexCircleValueSource:M.country.cities.map(t=>t.MShare/e)})});De.className="";Me.className="disabled";$t.valueAsNumber=M.country.pi;Ft.valueAsNumber=M.country.tcost;kt.valueAsNumber=M.country.sigma;qr.innerText=he.value;Gr.innerText=Ft.value;_r.innerText=kt.value;Ur.innerText=$t.value;function dl(){De.className="disabled",Me.className="started",Si.className="started",M.start()}function fl(){De.className="",Me.className="disabled",Si.className="",M.stop()}function Yr(){M.reset()}function pl(){qr.innerText=he.value,M.setNumCities(he.valueAsNumber,$t.valueAsNumber,Ft.valueAsNumber,kt.valueAsNumber,Xr),M.reset()}function gl(){Ur.innerText=$t.valueAsNumber.toPrecision(2),M.setPi($t.valueAsNumber)}function bl(){Gr.innerText=Ft.valueAsNumber.toPrecision(2),M.setTcost(Ft.valueAsNumber),M.calcDistanceMatrix()}function vl(){_r.innerText=kt.valueAsNumber.toPrecision(3),M.setSigma(kt.valueAsNumber),M.calcDistanceMatrix()}De.addEventListener("click",dl);Me.addEventListener("click",fl);Si.addEventListener("click",Yr);he.addEventListener("change",pl);$t.addEventListener("change",gl);Ft.addEventListener("change",bl);kt.addEventListener("change",vl);const ml=document.getElementById("scale");ml.addEventListener("change",e=>{const t=e.target.value,i=parseFloat(t.split(" ")[1]);M.setScale(i)});function yl(){Wr.show()}function wl(){Wr.hide()}al.addEventListener("click",yl);ll.addEventListener("click",wl);Yr();
