var Ea=Object.defineProperty;var Ra=(i,t,e)=>t in i?Ea(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var X=(i,t,e)=>(Ra(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerpolicy&&(n.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?n.credentials="include":s.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();class Ys{constructor(t,e,o){X(this,"realWage");X(this,"priceIndex");X(this,"priceIndex0");X(this,"income");X(this,"income0");X(this,"AShare");X(this,"MShare");X(this,"MShare0");X(this,"nominalWage");X(this,"nominalWage0");X(this,"dMShare");X(this,"id");this.id=t,this.MShare=e,this.MShare0=e,this.dMShare=0,this.AShare=o,this.priceIndex=1,this.priceIndex0=1,this.income=1,this.income0=1,this.nominalWage=1,this.nominalWage0=1,this.realWage=1}setMShare(t){this.MShare=t}setAShare(t){this.AShare=t}changeMShare(t){this.dMShare=t,this.MShare+=this.dMShare}push(){this.income0=this.income,this.nominalWage0=this.nominalWage,this.priceIndex0=this.priceIndex,this.MShare0=this.MShare}calcIncome(t){this.income=t.pi*this.MShare*this.nominalWage+(1-t.pi)*this.AShare}calcPriceIndex(t){let e=0;t.cities.forEach(o=>{e+=o.MShare*Math.pow(o.nominalWage0*t.distanceMatrix[this.id][o.id],1-t.sigma)}),this.priceIndex=Math.pow(e,1/(1-t.sigma))}calcRealWage(t){this.realWage=this.nominalWage*Math.pow(this.priceIndex,-t.pi)}calcNominalWage(t){let e=0;t.cities.forEach(o=>{e+=o.income0*Math.pow(t.distanceMatrix[this.id][o.id],1-t.sigma)*Math.pow(o.priceIndex0,t.sigma-1)}),this.nominalWage=Math.pow(e,1/t.sigma)}calcDynamics(t){this.dMShare=t.gamma*(this.realWage-t.avgRealWage)*this.MShare}applyDynamics(t){this.MShare>1/t.cities.length/10?this.MShare+=this.dMShare:this.MShare=1/t.cities.length/10}}class Oa{constructor(t,e,o,s,n){X(this,"pi");X(this,"avgRealWage");X(this,"tcost");X(this,"sigma");X(this,"distanceMatrix");X(this,"cities");X(this,"gamma");this.pi=e,this.tcost=o,this.sigma=s,this.gamma=n,this.avgRealWage=1,this.cities=new Array(t),this.distanceMatrix=new Array(t);for(let a=0;a<t;a++)this.distanceMatrix[a]=new Array(t).fill(0),this.cities[a]=new Ys(a,0,0);this.equalize(),this.calcDistanceMatrix()}reset(){const t=this.cities.length;for(let e=0;e<t;e++)this.distanceMatrix[e]=new Array(t).fill(0),this.cities[e]=new Ys(e,0,0);this.equalize(),this.calcDistanceMatrix(),this.disturb()}setSigma(t){this.sigma=t+.1}setTcost(t){this.tcost=t}setPi(t){this.pi=t}calcDistanceMatrix(){const t=this.cities.length;for(let e=0;e<t;e++)for(let o=e;o<t;o++){const s=e==o?0:2*Math.min(o-e,e+t-o)/t;this.distanceMatrix[o][e]=this.distanceMatrix[e][o]=Math.exp(Math.log(this.tcost)*s)}}equalize(){const t=this.cities.length;this.cities.forEach(e=>{e.setMShare(1/t),e.setAShare(1/t)})}disturb(){const t=this.cities.length,e=1/t*.05;for(let o=0;o<t;o++){const s=Math.floor(Math.random()*t);this.cities[s].changeMShare(e)}this.rescale()}rescale(){let t=0,e=0;this.cities.forEach(o=>{t+=o.MShare,e+=o.AShare}),this.cities.forEach(o=>{o.setMShare(o.MShare/t),o.setAShare(o.AShare/e)})}push(){this.cities.forEach(t=>{t.push()})}calcIncome(){this.cities.forEach(t=>{t.calcIncome(this)})}calcPriceIndex(){this.cities.forEach(t=>{t.calcPriceIndex(this)})}calcNominalWage(){this.cities.forEach(t=>{t.calcNominalWage(this)})}calcRealWage(){this.cities.forEach(t=>{t.calcRealWage(this)})}calcAvgRealWage(){let t=0;this.cities.forEach(e=>{t+=e.realWage*e.MShare}),this.avgRealWage=t}calcDynamics(){this.cities.forEach(t=>{t.calcDynamics(this)})}applyDynamics(){this.cities.forEach(t=>{t.applyDynamics(this)}),this.rescale()}procedure(){this.push(),this.calcIncome(),this.calcPriceIndex(),this.calcNominalWage(),this.calcRealWage(),this.calcAvgRealWage(),this.calcDynamics(),this.applyDynamics()}}class La{constructor(t,e,o,s,n,a){X(this,"numCities");X(this,"country");X(this,"counter");X(this,"scale");X(this,"started",!1);X(this,"listeners",new Array);X(this,"timer",null);this.numCities=t,this.country=this.createCountry(t,o,s,n,a),this.scale=e,this.counter=0}createCountry(t,e,o,s,n){return new Oa(t,e,o,s,n)}reset(){this.counter=0,this.country.reset(),this.update()}stop(){this.started=!1,this.timer&&clearInterval(this.timer),this.timer=null}start(){this.started||(this.started=!0,this.timer=setInterval(()=>{this.country.procedure(),this.counter++,this.update()},10))}calcDistanceMatrix(){this.country.calcDistanceMatrix()}setNumCities(t,e,o,s,n){this.numCities=t,this.country=this.createCountry(this.numCities,e,o,s,n)}setScale(t){this.scale=t,this.update()}setPi(t){this.country.setPi(t)}setTcost(t){this.country.setTcost(t)}setSigma(t){this.country.setSigma(t)}addUpdateEventListener(t){this.listeners.push(t)}update(){this.listeners.forEach(t=>{t(this)})}}function Aa(i,t,e,o,s,n){const a=t-n,l=6,h=.1;i.textAlign="right";let u=0;for(let p=0;p<=1;p+=h){const g=e-s-p*o;g>=0&&(i.fillStyle="#ddd",i.fillRect(n,g-1,a,1),i.fillStyle="#888",i.fillText(p.toFixed(1),n-2,g+3),u++)}if(u<5)for(let p=.05;p<=1;p+=h){const g=e-s-p*o;g>=0&&(i.fillRect(n,g-1,l,1),i.fillText(p.toFixed(2),n-2,g+4))}if(u<2)for(let p=.01;p<=1;p+=.01){const g=e-s-p*o;g>=0&&(i.fillRect(n,g-1,l,1),i.fillText(p.toFixed(2),n-2,g+4),u++)}}function Pa(i,t,e,o,s,n){if(i.fillStyle="#888",i.textAlign="left",s<=100)for(let l=5;l<=s;l+=5){const h=o+l*e;i.fillText(l.toString(),h,n)}else for(let l=50;l<=s;l+=50){const h=o+l*e;i.fillText(l.toString(),h,n)}}class Ma{constructor(t,e){X(this,"model");X(this,"canvas");this.canvas=t,this.model=e}repaint(){const o=this.canvas.getContext("2d");if(!o||!this.model)return;const s=(this.canvas.width-25)/this.model.country.cities.length,n=(this.canvas.height-10*2)*this.model.scale;o.fillStyle="#fff",o.fillRect(0,0,25,this.canvas.height),o.fillStyle="#f4f4f4",o.fillRect(25,10,this.canvas.width-25,this.canvas.height-10*2),Aa(o,this.canvas.width,this.canvas.height,n,10,25),this.model.country.cities.forEach((a,l)=>{a.dMShare<0?o.fillStyle="#ee8888":o.fillStyle="#dd0000",o.fillRect(25+l*s,this.canvas.height-10-a.MShare*n,Math.max(s-1,1),a.MShare*n)}),o.fillStyle="#fff",o.fillRect(25,this.canvas.height-10,this.canvas.width-25,10),Pa(o,this.canvas.width,s,25,this.model.numCities,this.canvas.height-10+10),o.fillStyle="#fff",o.fillRect(0,0,this.canvas.width,10)}}const pe=function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}}();pe.trustedTypes===void 0&&(pe.trustedTypes={createPolicy:(i,t)=>t});const Un={configurable:!1,enumerable:!1,writable:!1};pe.FAST===void 0&&Reflect.defineProperty(pe,"FAST",Object.assign({value:Object.create(null)},Un));const Ri=pe.FAST;if(Ri.getById===void 0){const i=Object.create(null);Reflect.defineProperty(Ri,"getById",Object.assign({value(t,e){let o=i[t];return o===void 0&&(o=e?i[t]=e():null),o}},Un))}const Pe=Object.freeze([]);function Gn(){const i=new WeakMap;return function(t){let e=i.get(t);if(e===void 0){let o=Reflect.getPrototypeOf(t);for(;e===void 0&&o!==null;)e=i.get(o),o=Reflect.getPrototypeOf(o);e=e===void 0?[]:e.slice(0),i.set(t,e)}return e}}const Uo=pe.FAST.getById(1,()=>{const i=[],t=[];function e(){if(t.length)throw t.shift()}function o(a){try{a.call()}catch(l){t.push(l),setTimeout(e,0)}}function s(){let l=0;for(;l<i.length;)if(o(i[l]),l++,l>1024){for(let h=0,u=i.length-l;h<u;h++)i[h]=i[h+l];i.length-=l,l=0}i.length=0}function n(a){i.length<1&&pe.requestAnimationFrame(s),i.push(a)}return Object.freeze({enqueue:n,process:s})}),Wn=pe.trustedTypes.createPolicy("fast-html",{createHTML:i=>i});let Go=Wn;const Si=`fast-${Math.random().toString(36).substring(2,8)}`,Xn=`${Si}{`,$s=`}${Si}`,S=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(i){if(Go!==Wn)throw new Error("The HTML policy can only be set once.");Go=i},createHTML(i){return Go.createHTML(i)},isMarker(i){return i&&i.nodeType===8&&i.data.startsWith(Si)},extractDirectiveIndexFromMarker(i){return parseInt(i.data.replace(`${Si}:`,""))},createInterpolationPlaceholder(i){return`${Xn}${i}${$s}`},createCustomAttributePlaceholder(i,t){return`${i}="${this.createInterpolationPlaceholder(t)}"`},createBlockPlaceholder(i){return`<!--${Si}:${i}-->`},queueUpdate:Uo.enqueue,processUpdates:Uo.process,nextUpdate(){return new Promise(Uo.enqueue)},setAttribute(i,t,e){e==null?i.removeAttribute(t):i.setAttribute(t,e)},setBooleanAttribute(i,t,e){e?i.setAttribute(t,""):i.removeAttribute(t)},removeChildNodes(i){for(let t=i.firstChild;t!==null;t=i.firstChild)i.removeChild(t)},createTemplateWalker(i){return document.createTreeWalker(i,133,null,!1)}});class no{constructor(t,e){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=e}has(t){return this.spillover===void 0?this.sub1===t||this.sub2===t:this.spillover.indexOf(t)!==-1}subscribe(t){const e=this.spillover;if(e===void 0){if(this.has(t))return;if(this.sub1===void 0){this.sub1=t;return}if(this.sub2===void 0){this.sub2=t;return}this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else e.indexOf(t)===-1&&e.push(t)}unsubscribe(t){const e=this.spillover;if(e===void 0)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const o=e.indexOf(t);o!==-1&&e.splice(o,1)}}notify(t){const e=this.spillover,o=this.source;if(e===void 0){const s=this.sub1,n=this.sub2;s!==void 0&&s.handleChange(o,t),n!==void 0&&n.handleChange(o,t)}else for(let s=0,n=e.length;s<n;++s)e[s].handleChange(o,t)}}class Yn{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var e;const o=this.subscribers[t];o!==void 0&&o.notify(t),(e=this.sourceSubscribers)===null||e===void 0||e.notify(t)}subscribe(t,e){var o;if(e){let s=this.subscribers[e];s===void 0&&(this.subscribers[e]=s=new no(this.source)),s.subscribe(t)}else this.sourceSubscribers=(o=this.sourceSubscribers)!==null&&o!==void 0?o:new no(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,e){var o;if(e){const s=this.subscribers[e];s!==void 0&&s.unsubscribe(t)}else(o=this.sourceSubscribers)===null||o===void 0||o.unsubscribe(t)}}const R=Ri.getById(2,()=>{const i=/(:|&&|\|\||if)/,t=new WeakMap,e=S.queueUpdate;let o,s=u=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function n(u){let p=u.$fastController||t.get(u);return p===void 0&&(Array.isArray(u)?p=s(u):t.set(u,p=new Yn(u))),p}const a=Gn();class l{constructor(p){this.name=p,this.field=`_${p}`,this.callback=`${p}Changed`}getValue(p){return o!==void 0&&o.watch(p,this.name),p[this.field]}setValue(p,g){const y=this.field,E=p[y];if(E!==g){p[y]=g;const M=p[this.callback];typeof M=="function"&&M.call(p,E,g),n(p).notify(this.name)}}}class h extends no{constructor(p,g,y=!1){super(p,g),this.binding=p,this.isVolatileBinding=y,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(p,g){this.needsRefresh&&this.last!==null&&this.disconnect();const y=o;o=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const E=this.binding(p,g);return o=y,E}disconnect(){if(this.last!==null){let p=this.first;for(;p!==void 0;)p.notifier.unsubscribe(this,p.propertyName),p=p.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(p,g){const y=this.last,E=n(p),M=y===null?this.first:{};if(M.propertySource=p,M.propertyName=g,M.notifier=E,E.subscribe(this,g),y!==null){if(!this.needsRefresh){let V;o=void 0,V=y.propertySource[y.propertyName],o=this,p===V&&(this.needsRefresh=!0)}y.next=M}this.last=M}handleChange(){this.needsQueue&&(this.needsQueue=!1,e(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let p=this.first;return{next:()=>{const g=p;return g===void 0?{value:void 0,done:!0}:(p=p.next,{value:g,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(u){s=u},getNotifier:n,track(u,p){o!==void 0&&o.watch(u,p)},trackVolatile(){o!==void 0&&(o.needsRefresh=!0)},notify(u,p){n(u).notify(p)},defineProperty(u,p){typeof p=="string"&&(p=new l(p)),a(u).push(p),Reflect.defineProperty(u,p.name,{enumerable:!0,get:function(){return p.getValue(this)},set:function(g){p.setValue(this,g)}})},getAccessors:a,binding(u,p,g=this.isVolatileBinding(u)){return new h(u,p,g)},isVolatileBinding(u){return i.test(u.toString())}})});function f(i,t){R.defineProperty(i,t)}function Va(i,t,e){return Object.assign({},e,{get:function(){return R.trackVolatile(),e.get.apply(this)}})}const Qs=Ri.getById(3,()=>{let i=null;return{get(){return i},set(t){i=t}}});class Oi{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return Qs.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){Qs.set(t)}}R.defineProperty(Oi.prototype,"index");R.defineProperty(Oi.prototype,"length");const Fi=Object.seal(new Oi);class po{constructor(){this.targetIndex=0}}class Qn extends po{constructor(){super(...arguments),this.createPlaceholder=S.createInterpolationPlaceholder}}class ws extends po{constructor(t,e,o){super(),this.name=t,this.behavior=e,this.options=o}createPlaceholder(t){return S.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function Ha(i,t){this.source=i,this.context=t,this.bindingObserver===null&&(this.bindingObserver=R.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(i,t))}function za(i,t){this.source=i,this.context=t,this.target.addEventListener(this.targetName,this)}function Ba(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function Na(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const i=this.target.$fastView;i!==void 0&&i.isComposed&&(i.unbind(),i.needsBindOnly=!0)}function ja(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function _a(i){S.setAttribute(this.target,this.targetName,i)}function qa(i){S.setBooleanAttribute(this.target,this.targetName,i)}function Ua(i){if(i==null&&(i=""),i.create){this.target.textContent="";let t=this.target.$fastView;t===void 0?t=i.create():this.target.$fastTemplate!==i&&(t.isComposed&&(t.remove(),t.unbind()),t=i.create()),t.isComposed?t.needsBindOnly&&(t.needsBindOnly=!1,t.bind(this.source,this.context)):(t.isComposed=!0,t.bind(this.source,this.context),t.insertBefore(this.target),this.target.$fastView=t,this.target.$fastTemplate=i)}else{const t=this.target.$fastView;t!==void 0&&t.isComposed&&(t.isComposed=!1,t.remove(),t.needsBindOnly?t.needsBindOnly=!1:t.unbind()),this.target.textContent=i}}function Ga(i){this.target[this.targetName]=i}function Wa(i){const t=this.classVersions||Object.create(null),e=this.target;let o=this.version||0;if(i!=null&&i.length){const s=i.split(/\s+/);for(let n=0,a=s.length;n<a;++n){const l=s[n];l!==""&&(t[l]=o,e.classList.add(l))}}if(this.classVersions=t,this.version=o+1,o!==0){o-=1;for(const s in t)t[s]===o&&e.classList.remove(s)}}class ks extends Qn{constructor(t){super(),this.binding=t,this.bind=Ha,this.unbind=Ba,this.updateTarget=_a,this.isBindingVolatile=R.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,t!==void 0)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=Ga,this.cleanedTargetName==="innerHTML"){const e=this.binding;this.binding=(o,s)=>S.createHTML(e(o,s))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=qa;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=za,this.unbind=ja;break;default:this.cleanedTargetName=t,t==="class"&&(this.updateTarget=Wa);break}}targetAtContent(){this.updateTarget=Ua,this.unbind=Na}createBehavior(t){return new Xa(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class Xa{constructor(t,e,o,s,n,a,l){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=e,this.isBindingVolatile=o,this.bind=s,this.unbind=n,this.updateTarget=a,this.targetName=l}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){Oi.setEvent(t);const e=this.binding(this.source,this.context);Oi.setEvent(null),e!==!0&&t.preventDefault()}}let Wo=null;class Cs{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){Wo=this}static borrow(t){const e=Wo||new Cs;return e.directives=t,e.reset(),Wo=null,e}}function Ya(i){if(i.length===1)return i[0];let t;const e=i.length,o=i.map(a=>typeof a=="string"?()=>a:(t=a.targetName||t,a.binding)),s=(a,l)=>{let h="";for(let u=0;u<e;++u)h+=o[u](a,l);return h},n=new ks(s);return n.targetName=t,n}const Qa=$s.length;function Zn(i,t){const e=t.split(Xn);if(e.length===1)return null;const o=[];for(let s=0,n=e.length;s<n;++s){const a=e[s],l=a.indexOf($s);let h;if(l===-1)h=a;else{const u=parseInt(a.substring(0,l));o.push(i.directives[u]),h=a.substring(l+Qa)}h!==""&&o.push(h)}return o}function Zs(i,t,e=!1){const o=t.attributes;for(let s=0,n=o.length;s<n;++s){const a=o[s],l=a.value,h=Zn(i,l);let u=null;h===null?e&&(u=new ks(()=>l),u.targetName=a.name):u=Ya(h),u!==null&&(t.removeAttributeNode(a),s--,n--,i.addFactory(u))}}function Za(i,t,e){const o=Zn(i,t.textContent);if(o!==null){let s=t;for(let n=0,a=o.length;n<a;++n){const l=o[n],h=n===0?t:s.parentNode.insertBefore(document.createTextNode(""),s.nextSibling);typeof l=="string"?h.textContent=l:(h.textContent=" ",i.captureContentBinding(l)),s=h,i.targetIndex++,h!==t&&e.nextNode()}i.targetIndex--}}function Ja(i,t){const e=i.content;document.adoptNode(e);const o=Cs.borrow(t);Zs(o,i,!0);const s=o.behaviorFactories;o.reset();const n=S.createTemplateWalker(e);let a;for(;a=n.nextNode();)switch(o.targetIndex++,a.nodeType){case 1:Zs(o,a);break;case 3:Za(o,a,n);break;case 8:S.isMarker(a)&&o.addFactory(t[S.extractDirectiveIndexFromMarker(a)])}let l=0;(S.isMarker(e.firstChild)||e.childNodes.length===1&&t.length)&&(e.insertBefore(document.createComment(""),e.firstChild),l=-1);const h=o.behaviorFactories;return o.release(),{fragment:e,viewBehaviorFactories:h,hostBehaviorFactories:s,targetOffset:l}}const Xo=document.createRange();class Jn{constructor(t,e){this.fragment=t,this.behaviors=e,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const e=this.lastChild;if(t.previousSibling===e)return;const o=t.parentNode;let s=this.firstChild,n;for(;s!==e;)n=s.nextSibling,o.insertBefore(s,t),s=n;o.insertBefore(e,t)}}remove(){const t=this.fragment,e=this.lastChild;let o=this.firstChild,s;for(;o!==e;)s=o.nextSibling,t.appendChild(o),o=s;t.appendChild(e)}dispose(){const t=this.firstChild.parentNode,e=this.lastChild;let o=this.firstChild,s;for(;o!==e;)s=o.nextSibling,t.removeChild(o),o=s;t.removeChild(e);const n=this.behaviors,a=this.source;for(let l=0,h=n.length;l<h;++l)n[l].unbind(a)}bind(t,e){const o=this.behaviors;if(this.source!==t)if(this.source!==null){const s=this.source;this.source=t,this.context=e;for(let n=0,a=o.length;n<a;++n){const l=o[n];l.unbind(s),l.bind(t,e)}}else{this.source=t,this.context=e;for(let s=0,n=o.length;s<n;++s)o[s].bind(t,e)}}unbind(){if(this.source===null)return;const t=this.behaviors,e=this.source;for(let o=0,s=t.length;o<s;++o)t[o].unbind(e);this.source=null}static disposeContiguousBatch(t){if(t.length!==0){Xo.setStartBefore(t[0].firstChild),Xo.setEndAfter(t[t.length-1].lastChild),Xo.deleteContents();for(let e=0,o=t.length;e<o;++e){const s=t[e],n=s.behaviors,a=s.source;for(let l=0,h=n.length;l<h;++l)n[l].unbind(a)}}}}class Js{constructor(t,e){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=e}create(t){if(this.fragment===null){let u;const p=this.html;if(typeof p=="string"){u=document.createElement("template"),u.innerHTML=S.createHTML(p);const y=u.content.firstElementChild;y!==null&&y.tagName==="TEMPLATE"&&(u=y)}else u=p;const g=Ja(u,this.directives);this.fragment=g.fragment,this.viewBehaviorFactories=g.viewBehaviorFactories,this.hostBehaviorFactories=g.hostBehaviorFactories,this.targetOffset=g.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const e=this.fragment.cloneNode(!0),o=this.viewBehaviorFactories,s=new Array(this.behaviorCount),n=S.createTemplateWalker(e);let a=0,l=this.targetOffset,h=n.nextNode();for(let u=o.length;a<u;++a){const p=o[a],g=p.targetIndex;for(;h!==null;)if(l===g){s[a]=p.createBehavior(h);break}else h=n.nextNode(),l++}if(this.hasHostBehaviors){const u=this.hostBehaviorFactories;for(let p=0,g=u.length;p<g;++p,++a)s[a]=u[p].createBehavior(t)}return new Jn(e,s)}render(t,e,o){typeof e=="string"&&(e=document.getElementById(e)),o===void 0&&(o=e);const s=this.create(o);return s.bind(t,Fi),s.appendTo(e),s}}const Ka=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function b(i,...t){const e=[];let o="";for(let s=0,n=i.length-1;s<n;++s){const a=i[s];let l=t[s];if(o+=a,l instanceof Js){const h=l;l=()=>h}if(typeof l=="function"&&(l=new ks(l)),l instanceof Qn){const h=Ka.exec(a);h!==null&&(l.targetName=h[2])}l instanceof po?(o+=l.createPlaceholder(e.length),e.push(l)):o+=l}return o+=i[i.length-1],new Js(o,e)}class St{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=this.behaviors===null?t:this.behaviors.concat(t),this}}St.create=(()=>{if(S.supportsAdoptedStyleSheets){const i=new Map;return t=>new tl(t,i)}return i=>new ol(i)})();function Is(i){return i.map(t=>t instanceof St?Is(t.styles):[t]).reduce((t,e)=>t.concat(e),[])}function Kn(i){return i.map(t=>t instanceof St?t.behaviors:null).reduce((t,e)=>e===null?t:(t===null&&(t=[]),t.concat(e)),null)}class tl extends St{constructor(t,e){super(),this.styles=t,this.styleSheetCache=e,this._styleSheets=void 0,this.behaviors=Kn(t)}get styleSheets(){if(this._styleSheets===void 0){const t=this.styles,e=this.styleSheetCache;this._styleSheets=Is(t).map(o=>{if(o instanceof CSSStyleSheet)return o;let s=e.get(o);return s===void 0&&(s=new CSSStyleSheet,s.replaceSync(o),e.set(o,s)),s})}return this._styleSheets}addStylesTo(t){t.adoptedStyleSheets=[...t.adoptedStyleSheets,...this.styleSheets],super.addStylesTo(t)}removeStylesFrom(t){const e=this.styleSheets;t.adoptedStyleSheets=t.adoptedStyleSheets.filter(o=>e.indexOf(o)===-1),super.removeStylesFrom(t)}}let el=0;function il(){return`fast-style-class-${++el}`}class ol extends St{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=Kn(t),this.styleSheets=Is(t),this.styleClass=il()}addStylesTo(t){const e=this.styleSheets,o=this.styleClass;t=this.normalizeTarget(t);for(let s=0;s<e.length;s++){const n=document.createElement("style");n.innerHTML=e[s],n.className=o,t.append(n)}super.addStylesTo(t)}removeStylesFrom(t){t=this.normalizeTarget(t);const e=t.querySelectorAll(`.${this.styleClass}`);for(let o=0,s=e.length;o<s;++o)t.removeChild(e[o]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const ro=Object.freeze({locate:Gn()}),fo={toView(i){return i?"true":"false"},fromView(i){return!(i==null||i==="false"||i===!1||i===0)}},w={toView(i){if(i==null)return null;const t=i*1;return isNaN(t)?null:t.toString()},fromView(i){if(i==null)return null;const t=i*1;return isNaN(t)?null:t}};class ao{constructor(t,e,o=e.toLowerCase(),s="reflect",n){this.guards=new Set,this.Owner=t,this.name=e,this.attribute=o,this.mode=s,this.converter=n,this.fieldName=`_${e}`,this.callbackName=`${e}Changed`,this.hasCallback=this.callbackName in t.prototype,s==="boolean"&&n===void 0&&(this.converter=fo)}setValue(t,e){const o=t[this.fieldName],s=this.converter;s!==void 0&&(e=s.fromView(e)),o!==e&&(t[this.fieldName]=e,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](o,e),t.$fastController.notify(this.name))}getValue(t){return R.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,e){this.guards.has(t)||(this.guards.add(t),this.setValue(t,e),this.guards.delete(t))}tryReflectToAttribute(t){const e=this.mode,o=this.guards;o.has(t)||e==="fromView"||S.queueUpdate(()=>{o.add(t);const s=t[this.fieldName];switch(e){case"reflect":const n=this.converter;S.setAttribute(t,this.attribute,n!==void 0?n.toView(s):s);break;case"boolean":S.setBooleanAttribute(t,this.attribute,s);break}o.delete(t)})}static collect(t,...e){const o=[];e.push(ro.locate(t));for(let s=0,n=e.length;s<n;++s){const a=e[s];if(a!==void 0)for(let l=0,h=a.length;l<h;++l){const u=a[l];typeof u=="string"?o.push(new ao(t,u)):o.push(new ao(t,u.property,u.attribute,u.mode,u.converter))}}return o}}function d(i,t){let e;function o(s,n){arguments.length>1&&(e.property=n),ro.locate(s.constructor).push(e)}if(arguments.length>1){e={},o(i,t);return}return e=i===void 0?{}:i,o}const Ks={mode:"open"},tn={},as=Ri.getById(4,()=>{const i=new Map;return Object.freeze({register(t){return i.has(t.type)?!1:(i.set(t.type,t),!0)},getByType(t){return i.get(t)}})});class go{constructor(t,e=t.definition){typeof e=="string"&&(e={name:e}),this.type=t,this.name=e.name,this.template=e.template;const o=ao.collect(t,e.attributes),s=new Array(o.length),n={},a={};for(let l=0,h=o.length;l<h;++l){const u=o[l];s[l]=u.attribute,n[u.name]=u,a[u.attribute]=u}this.attributes=o,this.observedAttributes=s,this.propertyLookup=n,this.attributeLookup=a,this.shadowOptions=e.shadowOptions===void 0?Ks:e.shadowOptions===null?void 0:Object.assign(Object.assign({},Ks),e.shadowOptions),this.elementOptions=e.elementOptions===void 0?tn:Object.assign(Object.assign({},tn),e.elementOptions),this.styles=e.styles===void 0?void 0:Array.isArray(e.styles)?St.create(e.styles):e.styles instanceof St?e.styles:St.create([e.styles])}get isDefined(){return!!as.getByType(this.type)}define(t=customElements){const e=this.type;if(as.register(this)){const o=this.attributes,s=e.prototype;for(let n=0,a=o.length;n<a;++n)R.defineProperty(s,o[n]);Reflect.defineProperty(e,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,e,this.elementOptions),this}}go.forType=as.getByType;const tr=new WeakMap,sl={bubbles:!0,composed:!0,cancelable:!0};function Yo(i){return i.shadowRoot||tr.get(i)||null}class Ts extends Yn{constructor(t,e){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=e;const o=e.shadowOptions;if(o!==void 0){const n=t.attachShadow(o);o.mode==="closed"&&tr.set(t,n)}const s=R.getAccessors(t);if(s.length>0){const n=this.boundObservables=Object.create(null);for(let a=0,l=s.length;a<l;++a){const h=s[a].name,u=t[h];u!==void 0&&(delete t[h],n[h]=u)}}}get isConnected(){return R.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,R.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=t,!this.needsInitialization&&t!==null&&this.addStyles(t))}addStyles(t){const e=Yo(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.append(t);else if(!t.isAttachedTo(e)){const o=t.behaviors;t.addStylesTo(e),o!==null&&this.addBehaviors(o)}}removeStyles(t){const e=Yo(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.removeChild(t);else if(t.isAttachedTo(e)){const o=t.behaviors;t.removeStylesFrom(e),o!==null&&this.removeBehaviors(o)}}addBehaviors(t){const e=this.behaviors||(this.behaviors=new Map),o=t.length,s=[];for(let n=0;n<o;++n){const a=t[n];e.has(a)?e.set(a,e.get(a)+1):(e.set(a,1),s.push(a))}if(this._isConnected){const n=this.element;for(let a=0;a<s.length;++a)s[a].bind(n,Fi)}}removeBehaviors(t,e=!1){const o=this.behaviors;if(o===null)return;const s=t.length,n=[];for(let a=0;a<s;++a){const l=t[a];if(o.has(l)){const h=o.get(l)-1;h===0||e?o.delete(l)&&n.push(l):o.set(l,h)}}if(this._isConnected){const a=this.element;for(let l=0;l<n.length;++l)n[l].unbind(a)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(t,Fi);const e=this.behaviors;if(e!==null)for(const[o]of e)o.bind(t,Fi);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;t!==null&&t.unbind();const e=this.behaviors;if(e!==null){const o=this.element;for(const[s]of e)s.unbind(o)}}onAttributeChangedCallback(t,e,o){const s=this.definition.attributeLookup[t];s!==void 0&&s.onAttributeChangedCallback(this.element,o)}emit(t,e,o){return this._isConnected?this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:e},sl),o))):!1}finishInitialization(){const t=this.element,e=this.boundObservables;if(e!==null){const s=Object.keys(e);for(let n=0,a=s.length;n<a;++n){const l=s[n];t[l]=e[l]}this.boundObservables=null}const o=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():o.template&&(this._template=o.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():o.styles&&(this._styles=o.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const e=this.element,o=Yo(e)||e;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||S.removeChildNodes(o),t&&(this.view=t.render(e,o,e))}static forCustomElement(t){const e=t.$fastController;if(e!==void 0)return e;const o=go.forType(t.constructor);if(o===void 0)throw new Error("Missing FASTElement definition.");return t.$fastController=new Ts(t,o)}}function en(i){return class extends i{constructor(){super(),Ts.forCustomElement(this)}$emit(t,e,o){return this.$fastController.emit(t,e,o)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,e,o){this.$fastController.onAttributeChangedCallback(t,e,o)}}}const mo=Object.assign(en(HTMLElement),{from(i){return en(i)},define(i,t){return new go(i,t).define().type}});class Ss{createCSS(){return""}createBehavior(){}}function er(i,t){const e=[];let o="";const s=[];for(let n=0,a=i.length-1;n<a;++n){o+=i[n];let l=t[n];if(l instanceof Ss){const h=l.createBehavior();l=l.createCSS(),h&&s.push(h)}l instanceof St||l instanceof CSSStyleSheet?(o.trim()!==""&&(e.push(o),o=""),e.push(l)):o+=l}return o+=i[i.length-1],o.trim()!==""&&e.push(o),{styles:e,behaviors:s}}function m(i,...t){const{styles:e,behaviors:o}=er(i,t),s=St.create(e);return o.length&&s.withBehaviors(...o),s}class nl extends Ss{constructor(t,e){super(),this.behaviors=e,this.css="";const o=t.reduce((s,n)=>(typeof n=="string"?this.css+=n:s.push(n),s),[]);o.length&&(this.styles=St.create(o))}createBehavior(){return this}createCSS(){return this.css}bind(t){this.styles&&t.$fastController.addStyles(this.styles),this.behaviors.length&&t.$fastController.addBehaviors(this.behaviors)}unbind(t){this.styles&&t.$fastController.removeStyles(this.styles),this.behaviors.length&&t.$fastController.removeBehaviors(this.behaviors)}}function ir(i,...t){const{styles:e,behaviors:o}=er(i,t);return new nl(e,o)}function Zt(i,t,e){return{index:i,removed:t,addedCount:e}}const or=0,sr=1,ls=2,cs=3;function rl(i,t,e,o,s,n){const a=n-s+1,l=e-t+1,h=new Array(a);let u,p;for(let g=0;g<a;++g)h[g]=new Array(l),h[g][0]=g;for(let g=0;g<l;++g)h[0][g]=g;for(let g=1;g<a;++g)for(let y=1;y<l;++y)i[t+y-1]===o[s+g-1]?h[g][y]=h[g-1][y-1]:(u=h[g-1][y]+1,p=h[g][y-1]+1,h[g][y]=u<p?u:p);return h}function al(i){let t=i.length-1,e=i[0].length-1,o=i[t][e];const s=[];for(;t>0||e>0;){if(t===0){s.push(ls),e--;continue}if(e===0){s.push(cs),t--;continue}const n=i[t-1][e-1],a=i[t-1][e],l=i[t][e-1];let h;a<l?h=a<n?a:n:h=l<n?l:n,h===n?(n===o?s.push(or):(s.push(sr),o=n),t--,e--):h===a?(s.push(cs),t--,o=a):(s.push(ls),e--,o=l)}return s.reverse(),s}function ll(i,t,e){for(let o=0;o<e;++o)if(i[o]!==t[o])return o;return e}function cl(i,t,e){let o=i.length,s=t.length,n=0;for(;n<e&&i[--o]===t[--s];)n++;return n}function hl(i,t,e,o){return t<e||o<i?-1:t===e||o===i?0:i<e?t<o?t-e:o-e:o<t?o-i:t-i}function nr(i,t,e,o,s,n){let a=0,l=0;const h=Math.min(e-t,n-s);if(t===0&&s===0&&(a=ll(i,o,h)),e===i.length&&n===o.length&&(l=cl(i,o,h-a)),t+=a,s+=a,e-=l,n-=l,e-t===0&&n-s===0)return Pe;if(t===e){const M=Zt(t,[],0);for(;s<n;)M.removed.push(o[s++]);return[M]}else if(s===n)return[Zt(t,[],e-t)];const u=al(rl(i,t,e,o,s,n)),p=[];let g,y=t,E=s;for(let M=0;M<u.length;++M)switch(u[M]){case or:g!==void 0&&(p.push(g),g=void 0),y++,E++;break;case sr:g===void 0&&(g=Zt(y,[],0)),g.addedCount++,y++,g.removed.push(o[E]),E++;break;case ls:g===void 0&&(g=Zt(y,[],0)),g.addedCount++,y++;break;case cs:g===void 0&&(g=Zt(y,[],0)),g.removed.push(o[E]),E++;break}return g!==void 0&&p.push(g),p}const on=Array.prototype.push;function dl(i,t,e,o){const s=Zt(t,e,o);let n=!1,a=0;for(let l=0;l<i.length;l++){const h=i[l];if(h.index+=a,n)continue;const u=hl(s.index,s.index+s.removed.length,h.index,h.index+h.addedCount);if(u>=0){i.splice(l,1),l--,a-=h.addedCount-h.removed.length,s.addedCount+=h.addedCount-u;const p=s.removed.length+h.removed.length-u;if(!s.addedCount&&!p)n=!0;else{let g=h.removed;if(s.index<h.index){const y=s.removed.slice(0,h.index-s.index);on.apply(y,g),g=y}if(s.index+s.removed.length>h.index+h.addedCount){const y=s.removed.slice(h.index+h.addedCount-s.index);on.apply(g,y)}s.removed=g,h.index<s.index&&(s.index=h.index)}}else if(s.index<h.index){n=!0,i.splice(l,0,s),l++;const p=s.addedCount-s.removed.length;h.index+=p,a+=p}}n||i.push(s)}function ul(i){const t=[];for(let e=0,o=i.length;e<o;e++){const s=i[e];dl(t,s.index,s.removed,s.addedCount)}return t}function pl(i,t){let e=[];const o=ul(t);for(let s=0,n=o.length;s<n;++s){const a=o[s];if(a.addedCount===1&&a.removed.length===1){a.removed[0]!==i[a.index]&&e.push(a);continue}e=e.concat(nr(i,a.index,a.index+a.addedCount,a.removed,0,a.removed.length))}return e}let sn=!1;function Qo(i,t){let e=i.index;const o=t.length;return e>o?e=o-i.addedCount:e<0&&(e=o+i.removed.length+e-i.addedCount),e<0&&(e=0),i.index=e,i}class fl extends no{constructor(t){super(t),this.oldCollection=void 0,this.splices=void 0,this.needsQueue=!0,this.call=this.flush,Reflect.defineProperty(t,"$fastController",{value:this,enumerable:!1})}subscribe(t){this.flush(),super.subscribe(t)}addSplice(t){this.splices===void 0?this.splices=[t]:this.splices.push(t),this.needsQueue&&(this.needsQueue=!1,S.queueUpdate(this))}reset(t){this.oldCollection=t,this.needsQueue&&(this.needsQueue=!1,S.queueUpdate(this))}flush(){const t=this.splices,e=this.oldCollection;if(t===void 0&&e===void 0)return;this.needsQueue=!0,this.splices=void 0,this.oldCollection=void 0;const o=e===void 0?pl(this.source,t):nr(this.source,0,this.source.length,e,0,e.length);this.notify(o)}}function gl(){if(sn)return;sn=!0,R.setArrayObserverFactory(h=>new fl(h));const i=Array.prototype;if(i.$fastPatch)return;Reflect.defineProperty(i,"$fastPatch",{value:1,enumerable:!1});const t=i.pop,e=i.push,o=i.reverse,s=i.shift,n=i.sort,a=i.splice,l=i.unshift;i.pop=function(){const h=this.length>0,u=t.apply(this,arguments),p=this.$fastController;return p!==void 0&&h&&p.addSplice(Zt(this.length,[u],0)),u},i.push=function(){const h=e.apply(this,arguments),u=this.$fastController;return u!==void 0&&u.addSplice(Qo(Zt(this.length-arguments.length,[],arguments.length),this)),h},i.reverse=function(){let h;const u=this.$fastController;u!==void 0&&(u.flush(),h=this.slice());const p=o.apply(this,arguments);return u!==void 0&&u.reset(h),p},i.shift=function(){const h=this.length>0,u=s.apply(this,arguments),p=this.$fastController;return p!==void 0&&h&&p.addSplice(Zt(0,[u],0)),u},i.sort=function(){let h;const u=this.$fastController;u!==void 0&&(u.flush(),h=this.slice());const p=n.apply(this,arguments);return u!==void 0&&u.reset(h),p},i.splice=function(){const h=a.apply(this,arguments),u=this.$fastController;return u!==void 0&&u.addSplice(Qo(Zt(+arguments[0],h,arguments.length>2?arguments.length-2:0),this)),h},i.unshift=function(){const h=l.apply(this,arguments),u=this.$fastController;return u!==void 0&&u.addSplice(Qo(Zt(0,[],arguments.length),this)),h}}class ml{constructor(t,e){this.target=t,this.propertyName=e}bind(t){t[this.propertyName]=this.target}unbind(){}}function N(i){return new ws("fast-ref",ml,i)}function G(i,t){const e=typeof t=="function"?t:()=>t;return(o,s)=>i(o,s)?e(o,s):null}const nn=Object.freeze({positioning:!1,recycle:!0});function bl(i,t,e,o){i.bind(t[e],o)}function vl(i,t,e,o){const s=Object.create(o);s.index=e,s.length=t.length,i.bind(t[e],s)}class yl{constructor(t,e,o,s,n,a){this.location=t,this.itemsBinding=e,this.templateBinding=s,this.options=a,this.source=null,this.views=[],this.items=null,this.itemsObserver=null,this.originalContext=void 0,this.childContext=void 0,this.bindView=bl,this.itemsBindingObserver=R.binding(e,this,o),this.templateBindingObserver=R.binding(s,this,n),a.positioning&&(this.bindView=vl)}bind(t,e){this.source=t,this.originalContext=e,this.childContext=Object.create(e),this.childContext.parent=t,this.childContext.parentContext=this.originalContext,this.items=this.itemsBindingObserver.observe(t,this.originalContext),this.template=this.templateBindingObserver.observe(t,this.originalContext),this.observeItems(!0),this.refreshAllViews()}unbind(){this.source=null,this.items=null,this.itemsObserver!==null&&this.itemsObserver.unsubscribe(this),this.unbindAllViews(),this.itemsBindingObserver.disconnect(),this.templateBindingObserver.disconnect()}handleChange(t,e){t===this.itemsBinding?(this.items=this.itemsBindingObserver.observe(this.source,this.originalContext),this.observeItems(),this.refreshAllViews()):t===this.templateBinding?(this.template=this.templateBindingObserver.observe(this.source,this.originalContext),this.refreshAllViews(!0)):this.updateViews(e)}observeItems(t=!1){if(!this.items){this.items=Pe;return}const e=this.itemsObserver,o=this.itemsObserver=R.getNotifier(this.items),s=e!==o;s&&e!==null&&e.unsubscribe(this),(s||t)&&o.subscribe(this)}updateViews(t){const e=this.childContext,o=this.views,s=this.bindView,n=this.items,a=this.template,l=this.options.recycle,h=[];let u=0,p=0;for(let g=0,y=t.length;g<y;++g){const E=t[g],M=E.removed;let V=0,U=E.index;const Nt=U+E.addedCount,Ct=o.splice(E.index,M.length),_o=p=h.length+Ct.length;for(;U<Nt;++U){const Oe=o[U],qo=Oe?Oe.firstChild:this.location;let oi;l&&p>0?(V<=_o&&Ct.length>0?(oi=Ct[V],V++):(oi=h[u],u++),p--):oi=a.create(),o.splice(U,0,oi),s(oi,n,U,e),oi.insertBefore(qo)}Ct[V]&&h.push(...Ct.slice(V))}for(let g=u,y=h.length;g<y;++g)h[g].dispose();if(this.options.positioning)for(let g=0,y=o.length;g<y;++g){const E=o[g].context;E.length=y,E.index=g}}refreshAllViews(t=!1){const e=this.items,o=this.childContext,s=this.template,n=this.location,a=this.bindView;let l=e.length,h=this.views,u=h.length;if((l===0||t||!this.options.recycle)&&(Jn.disposeContiguousBatch(h),u=0),u===0){this.views=h=new Array(l);for(let p=0;p<l;++p){const g=s.create();a(g,e,p,o),h[p]=g,g.insertBefore(n)}}else{let p=0;for(;p<l;++p)if(p<u){const y=h[p];a(y,e,p,o)}else{const y=s.create();a(y,e,p,o),h.push(y),y.insertBefore(n)}const g=h.splice(p,u-p);for(p=0,l=g.length;p<l;++p)g[p].dispose()}}unbindAllViews(){const t=this.views;for(let e=0,o=t.length;e<o;++e)t[e].unbind()}}class Li extends po{constructor(t,e,o){super(),this.itemsBinding=t,this.templateBinding=e,this.options=o,this.createPlaceholder=S.createBlockPlaceholder,gl(),this.isItemsBindingVolatile=R.isVolatileBinding(t),this.isTemplateBindingVolatile=R.isVolatileBinding(e)}createBehavior(t){return new yl(t,this.itemsBinding,this.isItemsBindingVolatile,this.templateBinding,this.isTemplateBindingVolatile,this.options)}}function ri(i,t,e=nn){const o=typeof t=="function"?t:()=>t;return new Li(i,o,Object.assign(Object.assign({},nn),e))}function fe(i){return i?function(t,e,o){return t.nodeType===1&&t.matches(i)}:function(t,e,o){return t.nodeType===1}}class rr{constructor(t,e){this.target=t,this.options=e,this.source=null}bind(t){const e=this.options.property;this.shouldUpdate=R.getAccessors(t).some(o=>o.name===e),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(Pe),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return this.options.filter!==void 0&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class xl extends rr{constructor(t,e){super(t,e)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function Z(i){return typeof i=="string"&&(i={property:i}),new ws("fast-slotted",xl,i)}class $l extends rr{constructor(t,e){super(t,e),this.observer=null,e.childList=!0}observe(){this.observer===null&&(this.observer=new MutationObserver(this.handleEvent.bind(this))),this.observer.observe(this.target,this.options)}disconnect(){this.observer.disconnect()}getNodes(){return"subtree"in this.options?Array.from(this.target.querySelectorAll(this.options.selector)):Array.from(this.target.childNodes)}}function bo(i){return typeof i=="string"&&(i={property:i}),new ws("fast-children",$l,i)}class Lt{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const Ft=(i,t)=>b`
    <span
        part="end"
        ${N("endContainer")}
        class=${e=>t.end?"end":void 0}
    >
        <slot name="end" ${N("end")} @slotchange="${e=>e.handleEndContentChange()}">
            ${t.end||""}
        </slot>
    </span>
`,Dt=(i,t)=>b`
    <span
        part="start"
        ${N("startContainer")}
        class="${e=>t.start?"start":void 0}"
    >
        <slot
            name="start"
            ${N("start")}
            @slotchange="${e=>e.handleStartContentChange()}"
        >
            ${t.start||""}
        </slot>
    </span>
`,wl=b`
    <span part="end" ${N("endContainer")}>
        <slot
            name="end"
            ${N("end")}
            @slotchange="${i=>i.handleEndContentChange()}"
        ></slot>
    </span>
`,kl=b`
    <span part="start" ${N("startContainer")}>
        <slot
            name="start"
            ${N("start")}
            @slotchange="${i=>i.handleStartContentChange()}"
        ></slot>
    </span>
`,Cl=(i,t)=>b`
    <template class="${e=>e.expanded?"expanded":""}">
        <div
            class="heading"
            part="heading"
            role="heading"
            aria-level="${e=>e.headinglevel}"
        >
            <button
                class="button"
                part="button"
                ${N("expandbutton")}
                aria-expanded="${e=>e.expanded}"
                aria-controls="${e=>e.id}-panel"
                id="${e=>e.id}"
                @click="${(e,o)=>e.clickHandler(o.event)}"
            >
                <span class="heading-content" part="heading-content">
                    <slot name="heading"></slot>
                </span>
            </button>
            ${Dt(i,t)}
            ${Ft(i,t)}
            <span class="icon" part="icon" aria-hidden="true">
                <slot name="expanded-icon" part="expanded-icon">
                    ${t.expandedIcon||""}
                </slot>
                <slot name="collapsed-icon" part="collapsed-icon">
                    ${t.collapsedIcon||""}
                </slot>
            <span>
        </div>
        <div
            class="region"
            part="region"
            id="${e=>e.id}-panel"
            role="region"
            aria-labelledby="${e=>e.id}"
        >
            <slot></slot>
        </div>
    </template>
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
***************************************************************************** */function r(i,t,e,o){var s=arguments.length,n=s<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,e):o,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(i,t,e,o);else for(var l=i.length-1;l>=0;l--)(a=i[l])&&(n=(s<3?a(n):s>3?a(t,e,n):a(t,e))||n);return s>3&&n&&Object.defineProperty(t,e,n),n}const Zo=new Map;"metadata"in Reflect||(Reflect.metadata=function(i,t){return function(e){Reflect.defineMetadata(i,t,e)}},Reflect.defineMetadata=function(i,t,e){let o=Zo.get(e);o===void 0&&Zo.set(e,o=new Map),o.set(i,t)},Reflect.getOwnMetadata=function(i,t){const e=Zo.get(t);if(e!==void 0)return e.get(i)});class Il{constructor(t,e){this.container=t,this.key=e}instance(t){return this.registerResolver(0,t)}singleton(t){return this.registerResolver(1,t)}transient(t){return this.registerResolver(2,t)}callback(t){return this.registerResolver(3,t)}cachedCallback(t){return this.registerResolver(3,lr(t))}aliasTo(t){return this.registerResolver(5,t)}registerResolver(t,e){const{container:o,key:s}=this;return this.container=this.key=void 0,o.registerResolver(s,new jt(s,t,e))}}function $i(i){const t=i.slice(),e=Object.keys(i),o=e.length;let s;for(let n=0;n<o;++n)s=e[n],cr(s)||(t[s]=i[s]);return t}const Tl=Object.freeze({none(i){throw Error(`${i.toString()} not registered, did you forget to add @singleton()?`)},singleton(i){return new jt(i,1,i)},transient(i){return new jt(i,2,i)}}),Jo=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:Tl.singleton})}),rn=new Map;function an(i){return t=>Reflect.getOwnMetadata(i,t)}let ln=null;const et=Object.freeze({createContainer(i){return new Di(null,Object.assign({},Jo.default,i))},findResponsibleContainer(i){const t=i.$$container$$;return t&&t.responsibleForOwnerRequests?t:et.findParentContainer(i)},findParentContainer(i){const t=new CustomEvent(ar,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return i.dispatchEvent(t),t.detail.container||et.getOrCreateDOMContainer()},getOrCreateDOMContainer(i,t){return i?i.$$container$$||new Di(i,Object.assign({},Jo.default,t,{parentLocator:et.findParentContainer})):ln||(ln=new Di(null,Object.assign({},Jo.default,t,{parentLocator:()=>null})))},getDesignParamtypes:an("design:paramtypes"),getAnnotationParamtypes:an("di:paramtypes"),getOrCreateAnnotationParamTypes(i){let t=this.getAnnotationParamtypes(i);return t===void 0&&Reflect.defineMetadata("di:paramtypes",t=[],i),t},getDependencies(i){let t=rn.get(i);if(t===void 0){const e=i.inject;if(e===void 0){const o=et.getDesignParamtypes(i),s=et.getAnnotationParamtypes(i);if(o===void 0)if(s===void 0){const n=Object.getPrototypeOf(i);typeof n=="function"&&n!==Function.prototype?t=$i(et.getDependencies(n)):t=[]}else t=$i(s);else if(s===void 0)t=$i(o);else{t=$i(o);let n=s.length,a;for(let u=0;u<n;++u)a=s[u],a!==void 0&&(t[u]=a);const l=Object.keys(s);n=l.length;let h;for(let u=0;u<n;++u)h=l[u],cr(h)||(t[h]=s[h])}}else t=$i(e);rn.set(i,t)}return t},defineProperty(i,t,e,o=!1){const s=`$di_${t}`;Reflect.defineProperty(i,t,{get:function(){let n=this[s];if(n===void 0&&(n=(this instanceof HTMLElement?et.findResponsibleContainer(this):et.getOrCreateDOMContainer()).get(e),this[s]=n,o&&this instanceof mo)){const l=this.$fastController,h=()=>{const p=et.findResponsibleContainer(this).get(e),g=this[s];p!==g&&(this[s]=n,l.notify(t))};l.subscribe({handleChange:h},"isConnected")}return n}})},createInterface(i,t){const e=typeof i=="function"?i:t,o=typeof i=="string"?i:i&&"friendlyName"in i&&i.friendlyName||un,s=typeof i=="string"?!1:i&&"respectConnection"in i&&i.respectConnection||!1,n=function(a,l,h){if(a==null||new.target!==void 0)throw new Error(`No registration for interface: '${n.friendlyName}'`);if(l)et.defineProperty(a,l,n,s);else{const u=et.getOrCreateAnnotationParamTypes(a);u[h]=n}};return n.$isInterface=!0,n.friendlyName=o??"(anonymous)",e!=null&&(n.register=function(a,l){return e(new Il(a,l??n))}),n.toString=function(){return`InterfaceSymbol<${n.friendlyName}>`},n},inject(...i){return function(t,e,o){if(typeof o=="number"){const s=et.getOrCreateAnnotationParamTypes(t),n=i[0];n!==void 0&&(s[o]=n)}else if(e)et.defineProperty(t,e,i[0]);else{const s=o?et.getOrCreateAnnotationParamTypes(o.value):et.getOrCreateAnnotationParamTypes(t);let n;for(let a=0;a<i.length;++a)n=i[a],n!==void 0&&(s[a]=n)}}},transient(i){return i.register=function(e){return Ai.transient(i,i).register(e)},i.registerInRequestor=!1,i},singleton(i,t=Fl){return i.register=function(o){return Ai.singleton(i,i).register(o)},i.registerInRequestor=t.scoped,i}}),Sl=et.createInterface("Container");et.inject;const Fl={scoped:!1};class jt{constructor(t,e,o){this.key=t,this.strategy=e,this.state=o,this.resolving=!1}get $isResolver(){return!0}register(t){return t.registerResolver(this.key,this)}resolve(t,e){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=t.getFactory(this.state).construct(e),this.strategy=0,this.resolving=!1,this.state}case 2:{const o=t.getFactory(this.state);if(o===null)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return o.construct(e)}case 3:return this.state(t,e,this);case 4:return this.state[0].resolve(t,e);case 5:return e.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(t){var e,o,s;switch(this.strategy){case 1:case 2:return t.getFactory(this.state);case 5:return(s=(o=(e=t.getResolver(this.state))===null||e===void 0?void 0:e.getFactory)===null||o===void 0?void 0:o.call(e,t))!==null&&s!==void 0?s:null;default:return null}}}function cn(i){return this.get(i)}function Dl(i,t){return t(i)}class El{constructor(t,e){this.Type=t,this.dependencies=e,this.transformers=null}construct(t,e){let o;return e===void 0?o=new this.Type(...this.dependencies.map(cn,t)):o=new this.Type(...this.dependencies.map(cn,t),...e),this.transformers==null?o:this.transformers.reduce(Dl,o)}registerTransformer(t){(this.transformers||(this.transformers=[])).push(t)}}const Rl={$isResolver:!0,resolve(i,t){return t}};function io(i){return typeof i.register=="function"}function Ol(i){return io(i)&&typeof i.registerInRequestor=="boolean"}function hn(i){return Ol(i)&&i.registerInRequestor}function Ll(i){return i.prototype!==void 0}const Al=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),ar="__DI_LOCATE_PARENT__",Ko=new Map;class Di{constructor(t,e){this.owner=t,this.config=e,this._parent=void 0,this.registerDepth=0,this.context=null,t!==null&&(t.$$container$$=this),this.resolvers=new Map,this.resolvers.set(Sl,Rl),t instanceof Node&&t.addEventListener(ar,o=>{o.composedPath()[0]!==this.owner&&(o.detail.container=this,o.stopImmediatePropagation())})}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(t,...e){return this.context=t,this.register(...e),this.context=null,this}register(...t){if(++this.registerDepth===100)throw new Error("Unable to autoregister dependency");let e,o,s,n,a;const l=this.context;for(let h=0,u=t.length;h<u;++h)if(e=t[h],!!pn(e))if(io(e))e.register(this,l);else if(Ll(e))Ai.singleton(e,e).register(this);else for(o=Object.keys(e),n=0,a=o.length;n<a;++n)s=e[o[n]],pn(s)&&(io(s)?s.register(this,l):this.register(s));return--this.registerDepth,this}registerResolver(t,e){Yi(t);const o=this.resolvers,s=o.get(t);return s==null?o.set(t,e):s instanceof jt&&s.strategy===4?s.state.push(e):o.set(t,new jt(t,4,[s,e])),e}registerTransformer(t,e){const o=this.getResolver(t);if(o==null)return!1;if(o.getFactory){const s=o.getFactory(this);return s==null?!1:(s.registerTransformer(e),!0)}return!1}getResolver(t,e=!0){if(Yi(t),t.resolve!==void 0)return t;let o=this,s;for(;o!=null;)if(s=o.resolvers.get(t),s==null){if(o.parent==null){const n=hn(t)?this:o;return e?this.jitRegister(t,n):null}o=o.parent}else return s;return null}has(t,e=!1){return this.resolvers.has(t)?!0:e&&this.parent!=null?this.parent.has(t,!0):!1}get(t){if(Yi(t),t.$isResolver)return t.resolve(this,this);let e=this,o;for(;e!=null;)if(o=e.resolvers.get(t),o==null){if(e.parent==null){const s=hn(t)?this:e;return o=this.jitRegister(t,s),o.resolve(e,this)}e=e.parent}else return o.resolve(e,this);throw new Error(`Unable to resolve key: ${t}`)}getAll(t,e=!1){Yi(t);const o=this;let s=o,n;if(e){let a=Pe;for(;s!=null;)n=s.resolvers.get(t),n!=null&&(a=a.concat(dn(n,s,o))),s=s.parent;return a}else for(;s!=null;)if(n=s.resolvers.get(t),n==null){if(s=s.parent,s==null)return Pe}else return dn(n,s,o);return Pe}getFactory(t){let e=Ko.get(t);if(e===void 0){if(Pl(t))throw new Error(`${t.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);Ko.set(t,e=new El(t,et.getDependencies(t)))}return e}registerFactory(t,e){Ko.set(t,e)}createChild(t){return new Di(null,Object.assign({},this.config,t,{parentLocator:()=>this}))}jitRegister(t,e){if(typeof t!="function")throw new Error(`Attempted to jitRegister something that is not a constructor: '${t}'. Did you forget to register this dependency?`);if(Al.has(t.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${t.name}. Did you forget to add @inject(Key)`);if(io(t)){const o=t.register(e);if(!(o instanceof Object)||o.resolve==null){const s=e.resolvers.get(t);if(s!=null)return s;throw new Error("A valid resolver was not returned from the static register method")}return o}else{if(t.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${t.friendlyName}`);{const o=this.config.defaultResolver(t,e);return e.resolvers.set(t,o),o}}}}const ts=new WeakMap;function lr(i){return function(t,e,o){if(ts.has(o))return ts.get(o);const s=i(t,e,o);return ts.set(o,s),s}}const Ai=Object.freeze({instance(i,t){return new jt(i,0,t)},singleton(i,t){return new jt(i,1,t)},transient(i,t){return new jt(i,2,t)},callback(i,t){return new jt(i,3,t)},cachedCallback(i,t){return new jt(i,3,lr(t))},aliasTo(i,t){return new jt(t,5,i)}});function Yi(i){if(i==null)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function dn(i,t,e){if(i instanceof jt&&i.strategy===4){const o=i.state;let s=o.length;const n=new Array(s);for(;s--;)n[s]=o[s].resolve(t,e);return n}return[i.resolve(t,e)]}const un="(anonymous)";function pn(i){return typeof i=="object"&&i!==null||typeof i=="function"}const Pl=function(){const i=new WeakMap;let t=!1,e="",o=0;return function(s){return t=i.get(s),t===void 0&&(e=s.toString(),o=e.length,t=o>=29&&o<=100&&e.charCodeAt(o-1)===125&&e.charCodeAt(o-2)<=32&&e.charCodeAt(o-3)===93&&e.charCodeAt(o-4)===101&&e.charCodeAt(o-5)===100&&e.charCodeAt(o-6)===111&&e.charCodeAt(o-7)===99&&e.charCodeAt(o-8)===32&&e.charCodeAt(o-9)===101&&e.charCodeAt(o-10)===118&&e.charCodeAt(o-11)===105&&e.charCodeAt(o-12)===116&&e.charCodeAt(o-13)===97&&e.charCodeAt(o-14)===110&&e.charCodeAt(o-15)===88,i.set(s,t)),t}}(),Qi={};function cr(i){switch(typeof i){case"number":return i>=0&&(i|0)===i;case"string":{const t=Qi[i];if(t!==void 0)return t;const e=i.length;if(e===0)return Qi[i]=!1;let o=0;for(let s=0;s<e;++s)if(o=i.charCodeAt(s),s===0&&o===48&&e>1||o<48||o>57)return Qi[i]=!1;return Qi[i]=!0}default:return!1}}function fn(i){return`${i.toLowerCase()}:presentation`}const Zi=new Map,hr=Object.freeze({define(i,t,e){const o=fn(i);Zi.get(o)===void 0?Zi.set(o,t):Zi.set(o,!1),e.register(Ai.instance(o,t))},forTag(i,t){const e=fn(i),o=Zi.get(e);return o===!1?et.findResponsibleContainer(t).get(e):o||null}});class Ml{constructor(t,e){this.template=t||null,this.styles=e===void 0?null:Array.isArray(e)?St.create(e):e instanceof St?e:St.create([e])}applyTo(t){const e=t.$fastController;e.template===null&&(e.template=this.template),e.styles===null&&(e.styles=this.styles)}}class D extends mo{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return this._presentation===void 0&&(this._presentation=hr.forTag(this.tagName,this)),this._presentation}templateChanged(){this.template!==void 0&&(this.$fastController.template=this.template)}stylesChanged(){this.styles!==void 0&&(this.$fastController.styles=this.styles)}connectedCallback(){this.$presentation!==null&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(t){return(e={})=>new Vl(this===D?class extends D{}:this,t,e)}}r([f],D.prototype,"template",void 0);r([f],D.prototype,"styles",void 0);function wi(i,t,e){return typeof i=="function"?i(t,e):i}class Vl{constructor(t,e,o){this.type=t,this.elementDefinition=e,this.overrideDefinition=o,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(t,e){const o=this.definition,s=this.overrideDefinition,a=`${o.prefix||e.elementPrefix}-${o.baseName}`;e.tryDefineElement({name:a,type:this.type,baseClass:this.elementDefinition.baseClass,callback:l=>{const h=new Ml(wi(o.template,l,o),wi(o.styles,l,o));l.definePresentation(h);let u=wi(o.shadowOptions,l,o);l.shadowRootMode&&(u?s.shadowOptions||(u.mode=l.shadowRootMode):u!==null&&(u={mode:l.shadowRootMode})),l.defineElement({elementOptions:wi(o.elementOptions,l,o),shadowOptions:u,attributes:wi(o.attributes,l,o)})}})}}function tt(i,...t){const e=ro.locate(i);t.forEach(o=>{Object.getOwnPropertyNames(o.prototype).forEach(n=>{n!=="constructor"&&Object.defineProperty(i.prototype,n,Object.getOwnPropertyDescriptor(o.prototype,n))}),ro.locate(o).forEach(n=>e.push(n))})}class Me extends D{constructor(){super(...arguments),this.headinglevel=2,this.expanded=!1,this.clickHandler=t=>{this.expanded=!this.expanded,this.change()},this.change=()=>{this.$emit("change")}}}r([d({attribute:"heading-level",mode:"fromView",converter:w})],Me.prototype,"headinglevel",void 0);r([d({mode:"boolean"})],Me.prototype,"expanded",void 0);r([d],Me.prototype,"id",void 0);tt(Me,Lt);const Hl=(i,t)=>b`
    <template>
        <slot ${Z({property:"accordionItems",filter:fe()})}></slot>
        <slot name="item" part="item" ${Z("accordionItems")}></slot>
    </template>
`,it={horizontal:"horizontal",vertical:"vertical"};function zl(i,t){let e=i.length;for(;e--;)if(t(i[e],e,i))return e;return-1}function Bl(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function ci(...i){return i.every(t=>t instanceof HTMLElement)}function Nl(i,t){return!i||!t||!ci(i)?void 0:Array.from(i.querySelectorAll(t)).filter(o=>o.offsetParent!==null)}function jl(){const i=document.querySelector('meta[property="csp-nonce"]');return i?i.getAttribute("content"):null}let Le;function _l(){if(typeof Le=="boolean")return Le;if(!Bl())return Le=!1,Le;const i=document.createElement("style"),t=jl();t!==null&&i.setAttribute("nonce",t),document.head.appendChild(i);try{i.sheet.insertRule("foo:focus-visible {color:inherit}",0),Le=!0}catch{Le=!1}finally{document.head.removeChild(i)}return Le}const gn="focus",mn="focusin",hi="focusout",di="keydown",bn="resize",vn="scroll";var yn;(function(i){i[i.alt=18]="alt",i[i.arrowDown=40]="arrowDown",i[i.arrowLeft=37]="arrowLeft",i[i.arrowRight=39]="arrowRight",i[i.arrowUp=38]="arrowUp",i[i.back=8]="back",i[i.backSlash=220]="backSlash",i[i.break=19]="break",i[i.capsLock=20]="capsLock",i[i.closeBracket=221]="closeBracket",i[i.colon=186]="colon",i[i.colon2=59]="colon2",i[i.comma=188]="comma",i[i.ctrl=17]="ctrl",i[i.delete=46]="delete",i[i.end=35]="end",i[i.enter=13]="enter",i[i.equals=187]="equals",i[i.equals2=61]="equals2",i[i.equals3=107]="equals3",i[i.escape=27]="escape",i[i.forwardSlash=191]="forwardSlash",i[i.function1=112]="function1",i[i.function10=121]="function10",i[i.function11=122]="function11",i[i.function12=123]="function12",i[i.function2=113]="function2",i[i.function3=114]="function3",i[i.function4=115]="function4",i[i.function5=116]="function5",i[i.function6=117]="function6",i[i.function7=118]="function7",i[i.function8=119]="function8",i[i.function9=120]="function9",i[i.home=36]="home",i[i.insert=45]="insert",i[i.menu=93]="menu",i[i.minus=189]="minus",i[i.minus2=109]="minus2",i[i.numLock=144]="numLock",i[i.numPad0=96]="numPad0",i[i.numPad1=97]="numPad1",i[i.numPad2=98]="numPad2",i[i.numPad3=99]="numPad3",i[i.numPad4=100]="numPad4",i[i.numPad5=101]="numPad5",i[i.numPad6=102]="numPad6",i[i.numPad7=103]="numPad7",i[i.numPad8=104]="numPad8",i[i.numPad9=105]="numPad9",i[i.numPadDivide=111]="numPadDivide",i[i.numPadDot=110]="numPadDot",i[i.numPadMinus=109]="numPadMinus",i[i.numPadMultiply=106]="numPadMultiply",i[i.numPadPlus=107]="numPadPlus",i[i.openBracket=219]="openBracket",i[i.pageDown=34]="pageDown",i[i.pageUp=33]="pageUp",i[i.period=190]="period",i[i.print=44]="print",i[i.quote=222]="quote",i[i.scrollLock=145]="scrollLock",i[i.shift=16]="shift",i[i.space=32]="space",i[i.tab=9]="tab",i[i.tilde=192]="tilde",i[i.windowsLeft=91]="windowsLeft",i[i.windowsOpera=219]="windowsOpera",i[i.windowsRight=92]="windowsRight"})(yn||(yn={}));const Vt="ArrowDown",ge="ArrowLeft",me="ArrowRight",Ht="ArrowUp",Jt="Enter",Ne="Escape",ne="Home",re="End",ql="F2",Ul="PageDown",Gl="PageUp",je=" ",vo="Tab",Wl="Backspace",Xl="Delete",si={ArrowDown:Vt,ArrowLeft:ge,ArrowRight:me,ArrowUp:Ht};var J;(function(i){i.ltr="ltr",i.rtl="rtl"})(J||(J={}));function dr(i,t,e){return e<i?t:e>t?i:e}function Fs(i,t,e){return Math.min(Math.max(e,i),t)}function Ji(i,t,e=0){return[t,e]=[t,e].sort((o,s)=>o-s),t<=i&&i<e}let Yl=0;function Ve(i=""){return`${i}${Yl++}`}var c;(function(i){i.Canvas="Canvas",i.CanvasText="CanvasText",i.LinkText="LinkText",i.VisitedText="VisitedText",i.ActiveText="ActiveText",i.ButtonFace="ButtonFace",i.ButtonText="ButtonText",i.Field="Field",i.FieldText="FieldText",i.Highlight="Highlight",i.HighlightText="HighlightText",i.GrayText="GrayText"})(c||(c={}));const xn={single:"single",multi:"multi"};class Ds extends D{constructor(){super(...arguments),this.expandmode=xn.multi,this.activeItemIndex=0,this.change=()=>{this.$emit("change",this.activeid)},this.setItems=()=>{var t;this.accordionItems.length!==0&&(this.accordionIds=this.getItemIds(),this.accordionItems.forEach((e,o)=>{e instanceof Me&&(e.addEventListener("change",this.activeItemChange),this.isSingleExpandMode()&&(this.activeItemIndex!==o?e.expanded=!1:e.expanded=!0));const s=this.accordionIds[o];e.setAttribute("id",typeof s!="string"?`accordion-${o+1}`:s),this.activeid=this.accordionIds[this.activeItemIndex],e.addEventListener("keydown",this.handleItemKeyDown),e.addEventListener("focus",this.handleItemFocus)}),this.isSingleExpandMode()&&((t=this.findExpandedItem())!==null&&t!==void 0?t:this.accordionItems[0]).setAttribute("aria-disabled","true"))},this.removeItemListeners=t=>{t.forEach((e,o)=>{e.removeEventListener("change",this.activeItemChange),e.removeEventListener("keydown",this.handleItemKeyDown),e.removeEventListener("focus",this.handleItemFocus)})},this.activeItemChange=t=>{if(t.defaultPrevented||t.target!==t.currentTarget)return;t.preventDefault();const e=t.target;this.activeid=e.getAttribute("id"),this.isSingleExpandMode()&&(this.resetItems(),e.expanded=!0,e.setAttribute("aria-disabled","true"),this.accordionItems.forEach(o=>{!o.hasAttribute("disabled")&&o.id!==this.activeid&&o.removeAttribute("aria-disabled")})),this.activeItemIndex=Array.from(this.accordionItems).indexOf(e),this.change()},this.handleItemKeyDown=t=>{if(t.target===t.currentTarget)switch(this.accordionIds=this.getItemIds(),t.key){case Ht:t.preventDefault(),this.adjust(-1);break;case Vt:t.preventDefault(),this.adjust(1);break;case ne:this.activeItemIndex=0,this.focusItem();break;case re:this.activeItemIndex=this.accordionItems.length-1,this.focusItem();break}},this.handleItemFocus=t=>{if(t.target===t.currentTarget){const e=t.target,o=this.activeItemIndex=Array.from(this.accordionItems).indexOf(e);this.activeItemIndex!==o&&o!==-1&&(this.activeItemIndex=o,this.activeid=this.accordionIds[this.activeItemIndex])}}}accordionItemsChanged(t,e){this.$fastController.isConnected&&(this.removeItemListeners(t),this.setItems())}findExpandedItem(){for(let t=0;t<this.accordionItems.length;t++)if(this.accordionItems[t].getAttribute("expanded")==="true")return this.accordionItems[t];return null}resetItems(){this.accordionItems.forEach((t,e)=>{t.expanded=!1})}getItemIds(){return this.accordionItems.map(t=>t.getAttribute("id"))}isSingleExpandMode(){return this.expandmode===xn.single}adjust(t){this.activeItemIndex=dr(0,this.accordionItems.length-1,this.activeItemIndex+t),this.focusItem()}focusItem(){const t=this.accordionItems[this.activeItemIndex];t instanceof Me&&t.expandbutton.focus()}}r([d({attribute:"expand-mode"})],Ds.prototype,"expandmode",void 0);r([f],Ds.prototype,"accordionItems",void 0);const ur=(i,t)=>b`
    <a
        class="control"
        part="control"
        download="${e=>e.download}"
        href="${e=>e.href}"
        hreflang="${e=>e.hreflang}"
        ping="${e=>e.ping}"
        referrerpolicy="${e=>e.referrerpolicy}"
        rel="${e=>e.rel}"
        target="${e=>e.target}"
        type="${e=>e.type}"
        aria-atomic="${e=>e.ariaAtomic}"
        aria-busy="${e=>e.ariaBusy}"
        aria-controls="${e=>e.ariaControls}"
        aria-current="${e=>e.ariaCurrent}"
        aria-describedby="${e=>e.ariaDescribedby}"
        aria-details="${e=>e.ariaDetails}"
        aria-disabled="${e=>e.ariaDisabled}"
        aria-errormessage="${e=>e.ariaErrormessage}"
        aria-expanded="${e=>e.ariaExpanded}"
        aria-flowto="${e=>e.ariaFlowto}"
        aria-haspopup="${e=>e.ariaHaspopup}"
        aria-hidden="${e=>e.ariaHidden}"
        aria-invalid="${e=>e.ariaInvalid}"
        aria-keyshortcuts="${e=>e.ariaKeyshortcuts}"
        aria-label="${e=>e.ariaLabel}"
        aria-labelledby="${e=>e.ariaLabelledby}"
        aria-live="${e=>e.ariaLive}"
        aria-owns="${e=>e.ariaOwns}"
        aria-relevant="${e=>e.ariaRelevant}"
        aria-roledescription="${e=>e.ariaRoledescription}"
        ${N("control")}
    >
        ${Dt(i,t)}
        <span class="content" part="content">
            <slot ${Z("defaultSlottedContent")}></slot>
        </span>
        ${Ft(i,t)}
    </a>
`;class K{}r([d({attribute:"aria-atomic"})],K.prototype,"ariaAtomic",void 0);r([d({attribute:"aria-busy"})],K.prototype,"ariaBusy",void 0);r([d({attribute:"aria-controls"})],K.prototype,"ariaControls",void 0);r([d({attribute:"aria-current"})],K.prototype,"ariaCurrent",void 0);r([d({attribute:"aria-describedby"})],K.prototype,"ariaDescribedby",void 0);r([d({attribute:"aria-details"})],K.prototype,"ariaDetails",void 0);r([d({attribute:"aria-disabled"})],K.prototype,"ariaDisabled",void 0);r([d({attribute:"aria-errormessage"})],K.prototype,"ariaErrormessage",void 0);r([d({attribute:"aria-flowto"})],K.prototype,"ariaFlowto",void 0);r([d({attribute:"aria-haspopup"})],K.prototype,"ariaHaspopup",void 0);r([d({attribute:"aria-hidden"})],K.prototype,"ariaHidden",void 0);r([d({attribute:"aria-invalid"})],K.prototype,"ariaInvalid",void 0);r([d({attribute:"aria-keyshortcuts"})],K.prototype,"ariaKeyshortcuts",void 0);r([d({attribute:"aria-label"})],K.prototype,"ariaLabel",void 0);r([d({attribute:"aria-labelledby"})],K.prototype,"ariaLabelledby",void 0);r([d({attribute:"aria-live"})],K.prototype,"ariaLive",void 0);r([d({attribute:"aria-owns"})],K.prototype,"ariaOwns",void 0);r([d({attribute:"aria-relevant"})],K.prototype,"ariaRelevant",void 0);r([d({attribute:"aria-roledescription"})],K.prototype,"ariaRoledescription",void 0);let zt=class extends D{constructor(){super(...arguments),this.handleUnsupportedDelegatesFocus=()=>{var t;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(!((t=this.$fastController.definition.shadowOptions)===null||t===void 0)&&t.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}connectedCallback(){super.connectedCallback(),this.handleUnsupportedDelegatesFocus()}};r([d],zt.prototype,"download",void 0);r([d],zt.prototype,"href",void 0);r([d],zt.prototype,"hreflang",void 0);r([d],zt.prototype,"ping",void 0);r([d],zt.prototype,"referrerpolicy",void 0);r([d],zt.prototype,"rel",void 0);r([d],zt.prototype,"target",void 0);r([d],zt.prototype,"type",void 0);r([f],zt.prototype,"defaultSlottedContent",void 0);class yo{}r([d({attribute:"aria-expanded"})],yo.prototype,"ariaExpanded",void 0);tt(yo,K);tt(zt,Lt,yo);const Ql=(i,t)=>b`
    <template class="${e=>e.initialLayoutComplete?"loaded":""}">
        ${G(e=>e.initialLayoutComplete,b`
                <slot></slot>
            `)}
    </template>
`,He=i=>{const t=i.closest("[dir]");return t!==null&&t.dir==="rtl"?J.rtl:J.ltr};class Zl{constructor(){this.intersectionDetector=null,this.observedElements=new Map,this.requestPosition=(t,e)=>{var o;if(this.intersectionDetector!==null){if(this.observedElements.has(t)){(o=this.observedElements.get(t))===null||o===void 0||o.push(e);return}this.observedElements.set(t,[e]),this.intersectionDetector.observe(t)}},this.cancelRequestPosition=(t,e)=>{const o=this.observedElements.get(t);if(o!==void 0){const s=o.indexOf(e);s!==-1&&o.splice(s,1)}},this.initializeIntersectionDetector=()=>{pe.IntersectionObserver&&(this.intersectionDetector=new IntersectionObserver(this.handleIntersection,{root:null,rootMargin:"0px",threshold:[0,1]}))},this.handleIntersection=t=>{if(this.intersectionDetector===null)return;const e=[],o=[];t.forEach(s=>{var n;(n=this.intersectionDetector)===null||n===void 0||n.unobserve(s.target);const a=this.observedElements.get(s.target);a!==void 0&&(a.forEach(l=>{let h=e.indexOf(l);h===-1&&(h=e.length,e.push(l),o.push([])),o[h].push(s)}),this.observedElements.delete(s.target))}),e.forEach((s,n)=>{s(o[n])})},this.initializeIntersectionDetector()}}class j extends D{constructor(){super(...arguments),this.anchor="",this.viewport="",this.horizontalPositioningMode="uncontrolled",this.horizontalDefaultPosition="unset",this.horizontalViewportLock=!1,this.horizontalInset=!1,this.horizontalScaling="content",this.verticalPositioningMode="uncontrolled",this.verticalDefaultPosition="unset",this.verticalViewportLock=!1,this.verticalInset=!1,this.verticalScaling="content",this.fixedPlacement=!1,this.autoUpdateMode="anchor",this.anchorElement=null,this.viewportElement=null,this.initialLayoutComplete=!1,this.resizeDetector=null,this.baseHorizontalOffset=0,this.baseVerticalOffset=0,this.pendingPositioningUpdate=!1,this.pendingReset=!1,this.currentDirection=J.ltr,this.regionVisible=!1,this.forceUpdate=!1,this.updateThreshold=.5,this.update=()=>{this.pendingPositioningUpdate||this.requestPositionUpdates()},this.startObservers=()=>{this.stopObservers(),this.anchorElement!==null&&(this.requestPositionUpdates(),this.resizeDetector!==null&&(this.resizeDetector.observe(this.anchorElement),this.resizeDetector.observe(this)))},this.requestPositionUpdates=()=>{this.anchorElement===null||this.pendingPositioningUpdate||(j.intersectionService.requestPosition(this,this.handleIntersection),j.intersectionService.requestPosition(this.anchorElement,this.handleIntersection),this.viewportElement!==null&&j.intersectionService.requestPosition(this.viewportElement,this.handleIntersection),this.pendingPositioningUpdate=!0)},this.stopObservers=()=>{this.pendingPositioningUpdate&&(this.pendingPositioningUpdate=!1,j.intersectionService.cancelRequestPosition(this,this.handleIntersection),this.anchorElement!==null&&j.intersectionService.cancelRequestPosition(this.anchorElement,this.handleIntersection),this.viewportElement!==null&&j.intersectionService.cancelRequestPosition(this.viewportElement,this.handleIntersection)),this.resizeDetector!==null&&this.resizeDetector.disconnect()},this.getViewport=()=>typeof this.viewport!="string"||this.viewport===""?document.documentElement:document.getElementById(this.viewport),this.getAnchor=()=>document.getElementById(this.anchor),this.handleIntersection=t=>{this.pendingPositioningUpdate&&(this.pendingPositioningUpdate=!1,this.applyIntersectionEntries(t)&&this.updateLayout())},this.applyIntersectionEntries=t=>{const e=t.find(n=>n.target===this),o=t.find(n=>n.target===this.anchorElement),s=t.find(n=>n.target===this.viewportElement);return e===void 0||s===void 0||o===void 0?!1:!this.regionVisible||this.forceUpdate||this.regionRect===void 0||this.anchorRect===void 0||this.viewportRect===void 0||this.isRectDifferent(this.anchorRect,o.boundingClientRect)||this.isRectDifferent(this.viewportRect,s.boundingClientRect)||this.isRectDifferent(this.regionRect,e.boundingClientRect)?(this.regionRect=e.boundingClientRect,this.anchorRect=o.boundingClientRect,this.viewportElement===document.documentElement?this.viewportRect=new DOMRectReadOnly(s.boundingClientRect.x+document.documentElement.scrollLeft,s.boundingClientRect.y+document.documentElement.scrollTop,s.boundingClientRect.width,s.boundingClientRect.height):this.viewportRect=s.boundingClientRect,this.updateRegionOffset(),this.forceUpdate=!1,!0):!1},this.updateRegionOffset=()=>{this.anchorRect&&this.regionRect&&(this.baseHorizontalOffset=this.baseHorizontalOffset+(this.anchorRect.left-this.regionRect.left)+(this.translateX-this.baseHorizontalOffset),this.baseVerticalOffset=this.baseVerticalOffset+(this.anchorRect.top-this.regionRect.top)+(this.translateY-this.baseVerticalOffset))},this.isRectDifferent=(t,e)=>Math.abs(t.top-e.top)>this.updateThreshold||Math.abs(t.right-e.right)>this.updateThreshold||Math.abs(t.bottom-e.bottom)>this.updateThreshold||Math.abs(t.left-e.left)>this.updateThreshold,this.handleResize=t=>{this.update()},this.reset=()=>{this.pendingReset&&(this.pendingReset=!1,this.anchorElement===null&&(this.anchorElement=this.getAnchor()),this.viewportElement===null&&(this.viewportElement=this.getViewport()),this.currentDirection=He(this),this.startObservers())},this.updateLayout=()=>{let t,e;if(this.horizontalPositioningMode!=="uncontrolled"){const n=this.getPositioningOptions(this.horizontalInset);if(this.horizontalDefaultPosition==="center")e="center";else if(this.horizontalDefaultPosition!=="unset"){let y=this.horizontalDefaultPosition;if(y==="start"||y==="end"){const E=He(this);if(E!==this.currentDirection){this.currentDirection=E,this.initialize();return}this.currentDirection===J.ltr?y=y==="start"?"left":"right":y=y==="start"?"right":"left"}switch(y){case"left":e=this.horizontalInset?"insetStart":"start";break;case"right":e=this.horizontalInset?"insetEnd":"end";break}}const a=this.horizontalThreshold!==void 0?this.horizontalThreshold:this.regionRect!==void 0?this.regionRect.width:0,l=this.anchorRect!==void 0?this.anchorRect.left:0,h=this.anchorRect!==void 0?this.anchorRect.right:0,u=this.anchorRect!==void 0?this.anchorRect.width:0,p=this.viewportRect!==void 0?this.viewportRect.left:0,g=this.viewportRect!==void 0?this.viewportRect.right:0;(e===void 0||this.horizontalPositioningMode!=="locktodefault"&&this.getAvailableSpace(e,l,h,u,p,g)<a)&&(e=this.getAvailableSpace(n[0],l,h,u,p,g)>this.getAvailableSpace(n[1],l,h,u,p,g)?n[0]:n[1])}if(this.verticalPositioningMode!=="uncontrolled"){const n=this.getPositioningOptions(this.verticalInset);if(this.verticalDefaultPosition==="center")t="center";else if(this.verticalDefaultPosition!=="unset")switch(this.verticalDefaultPosition){case"top":t=this.verticalInset?"insetStart":"start";break;case"bottom":t=this.verticalInset?"insetEnd":"end";break}const a=this.verticalThreshold!==void 0?this.verticalThreshold:this.regionRect!==void 0?this.regionRect.height:0,l=this.anchorRect!==void 0?this.anchorRect.top:0,h=this.anchorRect!==void 0?this.anchorRect.bottom:0,u=this.anchorRect!==void 0?this.anchorRect.height:0,p=this.viewportRect!==void 0?this.viewportRect.top:0,g=this.viewportRect!==void 0?this.viewportRect.bottom:0;(t===void 0||this.verticalPositioningMode!=="locktodefault"&&this.getAvailableSpace(t,l,h,u,p,g)<a)&&(t=this.getAvailableSpace(n[0],l,h,u,p,g)>this.getAvailableSpace(n[1],l,h,u,p,g)?n[0]:n[1])}const o=this.getNextRegionDimension(e,t),s=this.horizontalPosition!==e||this.verticalPosition!==t;if(this.setHorizontalPosition(e,o),this.setVerticalPosition(t,o),this.updateRegionStyle(),!this.initialLayoutComplete){this.initialLayoutComplete=!0,this.requestPositionUpdates();return}this.regionVisible||(this.regionVisible=!0,this.style.removeProperty("pointer-events"),this.style.removeProperty("opacity"),this.classList.toggle("loaded",!0),this.$emit("loaded",this,{bubbles:!1})),this.updatePositionClasses(),s&&this.$emit("positionchange",this,{bubbles:!1})},this.updateRegionStyle=()=>{this.style.width=this.regionWidth,this.style.height=this.regionHeight,this.style.transform=`translate(${this.translateX}px, ${this.translateY}px)`},this.updatePositionClasses=()=>{this.classList.toggle("top",this.verticalPosition==="start"),this.classList.toggle("bottom",this.verticalPosition==="end"),this.classList.toggle("inset-top",this.verticalPosition==="insetStart"),this.classList.toggle("inset-bottom",this.verticalPosition==="insetEnd"),this.classList.toggle("vertical-center",this.verticalPosition==="center"),this.classList.toggle("left",this.horizontalPosition==="start"),this.classList.toggle("right",this.horizontalPosition==="end"),this.classList.toggle("inset-left",this.horizontalPosition==="insetStart"),this.classList.toggle("inset-right",this.horizontalPosition==="insetEnd"),this.classList.toggle("horizontal-center",this.horizontalPosition==="center")},this.setHorizontalPosition=(t,e)=>{if(t===void 0||this.regionRect===void 0||this.anchorRect===void 0||this.viewportRect===void 0)return;let o=0;switch(this.horizontalScaling){case"anchor":case"fill":o=this.horizontalViewportLock?this.viewportRect.width:e.width,this.regionWidth=`${o}px`;break;case"content":o=this.regionRect.width,this.regionWidth="unset";break}let s=0;switch(t){case"start":this.translateX=this.baseHorizontalOffset-o,this.horizontalViewportLock&&this.anchorRect.left>this.viewportRect.right&&(this.translateX=this.translateX-(this.anchorRect.left-this.viewportRect.right));break;case"insetStart":this.translateX=this.baseHorizontalOffset-o+this.anchorRect.width,this.horizontalViewportLock&&this.anchorRect.right>this.viewportRect.right&&(this.translateX=this.translateX-(this.anchorRect.right-this.viewportRect.right));break;case"insetEnd":this.translateX=this.baseHorizontalOffset,this.horizontalViewportLock&&this.anchorRect.left<this.viewportRect.left&&(this.translateX=this.translateX-(this.anchorRect.left-this.viewportRect.left));break;case"end":this.translateX=this.baseHorizontalOffset+this.anchorRect.width,this.horizontalViewportLock&&this.anchorRect.right<this.viewportRect.left&&(this.translateX=this.translateX-(this.anchorRect.right-this.viewportRect.left));break;case"center":if(s=(this.anchorRect.width-o)/2,this.translateX=this.baseHorizontalOffset+s,this.horizontalViewportLock){const n=this.anchorRect.left+s,a=this.anchorRect.right-s;n<this.viewportRect.left&&!(a>this.viewportRect.right)?this.translateX=this.translateX-(n-this.viewportRect.left):a>this.viewportRect.right&&!(n<this.viewportRect.left)&&(this.translateX=this.translateX-(a-this.viewportRect.right))}break}this.horizontalPosition=t},this.setVerticalPosition=(t,e)=>{if(t===void 0||this.regionRect===void 0||this.anchorRect===void 0||this.viewportRect===void 0)return;let o=0;switch(this.verticalScaling){case"anchor":case"fill":o=this.verticalViewportLock?this.viewportRect.height:e.height,this.regionHeight=`${o}px`;break;case"content":o=this.regionRect.height,this.regionHeight="unset";break}let s=0;switch(t){case"start":this.translateY=this.baseVerticalOffset-o,this.verticalViewportLock&&this.anchorRect.top>this.viewportRect.bottom&&(this.translateY=this.translateY-(this.anchorRect.top-this.viewportRect.bottom));break;case"insetStart":this.translateY=this.baseVerticalOffset-o+this.anchorRect.height,this.verticalViewportLock&&this.anchorRect.bottom>this.viewportRect.bottom&&(this.translateY=this.translateY-(this.anchorRect.bottom-this.viewportRect.bottom));break;case"insetEnd":this.translateY=this.baseVerticalOffset,this.verticalViewportLock&&this.anchorRect.top<this.viewportRect.top&&(this.translateY=this.translateY-(this.anchorRect.top-this.viewportRect.top));break;case"end":this.translateY=this.baseVerticalOffset+this.anchorRect.height,this.verticalViewportLock&&this.anchorRect.bottom<this.viewportRect.top&&(this.translateY=this.translateY-(this.anchorRect.bottom-this.viewportRect.top));break;case"center":if(s=(this.anchorRect.height-o)/2,this.translateY=this.baseVerticalOffset+s,this.verticalViewportLock){const n=this.anchorRect.top+s,a=this.anchorRect.bottom-s;n<this.viewportRect.top&&!(a>this.viewportRect.bottom)?this.translateY=this.translateY-(n-this.viewportRect.top):a>this.viewportRect.bottom&&!(n<this.viewportRect.top)&&(this.translateY=this.translateY-(a-this.viewportRect.bottom))}}this.verticalPosition=t},this.getPositioningOptions=t=>t?["insetStart","insetEnd"]:["start","end"],this.getAvailableSpace=(t,e,o,s,n,a)=>{const l=e-n,h=a-(e+s);switch(t){case"start":return l;case"insetStart":return l+s;case"insetEnd":return h+s;case"end":return h;case"center":return Math.min(l,h)*2+s}},this.getNextRegionDimension=(t,e)=>{const o={height:this.regionRect!==void 0?this.regionRect.height:0,width:this.regionRect!==void 0?this.regionRect.width:0};return t!==void 0&&this.horizontalScaling==="fill"?o.width=this.getAvailableSpace(t,this.anchorRect!==void 0?this.anchorRect.left:0,this.anchorRect!==void 0?this.anchorRect.right:0,this.anchorRect!==void 0?this.anchorRect.width:0,this.viewportRect!==void 0?this.viewportRect.left:0,this.viewportRect!==void 0?this.viewportRect.right:0):this.horizontalScaling==="anchor"&&(o.width=this.anchorRect!==void 0?this.anchorRect.width:0),e!==void 0&&this.verticalScaling==="fill"?o.height=this.getAvailableSpace(e,this.anchorRect!==void 0?this.anchorRect.top:0,this.anchorRect!==void 0?this.anchorRect.bottom:0,this.anchorRect!==void 0?this.anchorRect.height:0,this.viewportRect!==void 0?this.viewportRect.top:0,this.viewportRect!==void 0?this.viewportRect.bottom:0):this.verticalScaling==="anchor"&&(o.height=this.anchorRect!==void 0?this.anchorRect.height:0),o},this.startAutoUpdateEventListeners=()=>{window.addEventListener(bn,this.update,{passive:!0}),window.addEventListener(vn,this.update,{passive:!0,capture:!0}),this.resizeDetector!==null&&this.viewportElement!==null&&this.resizeDetector.observe(this.viewportElement)},this.stopAutoUpdateEventListeners=()=>{window.removeEventListener(bn,this.update),window.removeEventListener(vn,this.update),this.resizeDetector!==null&&this.viewportElement!==null&&this.resizeDetector.unobserve(this.viewportElement)}}anchorChanged(){this.initialLayoutComplete&&(this.anchorElement=this.getAnchor())}viewportChanged(){this.initialLayoutComplete&&(this.viewportElement=this.getViewport())}horizontalPositioningModeChanged(){this.requestReset()}horizontalDefaultPositionChanged(){this.updateForAttributeChange()}horizontalViewportLockChanged(){this.updateForAttributeChange()}horizontalInsetChanged(){this.updateForAttributeChange()}horizontalThresholdChanged(){this.updateForAttributeChange()}horizontalScalingChanged(){this.updateForAttributeChange()}verticalPositioningModeChanged(){this.requestReset()}verticalDefaultPositionChanged(){this.updateForAttributeChange()}verticalViewportLockChanged(){this.updateForAttributeChange()}verticalInsetChanged(){this.updateForAttributeChange()}verticalThresholdChanged(){this.updateForAttributeChange()}verticalScalingChanged(){this.updateForAttributeChange()}fixedPlacementChanged(){this.$fastController.isConnected&&this.initialLayoutComplete&&this.initialize()}autoUpdateModeChanged(t,e){this.$fastController.isConnected&&this.initialLayoutComplete&&(t==="auto"&&this.stopAutoUpdateEventListeners(),e==="auto"&&this.startAutoUpdateEventListeners())}anchorElementChanged(){this.requestReset()}viewportElementChanged(){this.$fastController.isConnected&&this.initialLayoutComplete&&this.initialize()}connectedCallback(){super.connectedCallback(),this.autoUpdateMode==="auto"&&this.startAutoUpdateEventListeners(),this.initialize()}disconnectedCallback(){super.disconnectedCallback(),this.autoUpdateMode==="auto"&&this.stopAutoUpdateEventListeners(),this.stopObservers(),this.disconnectResizeDetector()}adoptedCallback(){this.initialize()}disconnectResizeDetector(){this.resizeDetector!==null&&(this.resizeDetector.disconnect(),this.resizeDetector=null)}initializeResizeDetector(){this.disconnectResizeDetector(),this.resizeDetector=new window.ResizeObserver(this.handleResize)}updateForAttributeChange(){this.$fastController.isConnected&&this.initialLayoutComplete&&(this.forceUpdate=!0,this.update())}initialize(){this.initializeResizeDetector(),this.anchorElement===null&&(this.anchorElement=this.getAnchor()),this.requestReset()}requestReset(){this.$fastController.isConnected&&this.pendingReset===!1&&(this.setInitialState(),S.queueUpdate(()=>this.reset()),this.pendingReset=!0)}setInitialState(){this.initialLayoutComplete=!1,this.regionVisible=!1,this.translateX=0,this.translateY=0,this.baseHorizontalOffset=0,this.baseVerticalOffset=0,this.viewportRect=void 0,this.regionRect=void 0,this.anchorRect=void 0,this.verticalPosition=void 0,this.horizontalPosition=void 0,this.style.opacity="0",this.style.pointerEvents="none",this.forceUpdate=!1,this.style.position=this.fixedPlacement?"fixed":"absolute",this.updatePositionClasses(),this.updateRegionStyle()}}j.intersectionService=new Zl;r([d],j.prototype,"anchor",void 0);r([d],j.prototype,"viewport",void 0);r([d({attribute:"horizontal-positioning-mode"})],j.prototype,"horizontalPositioningMode",void 0);r([d({attribute:"horizontal-default-position"})],j.prototype,"horizontalDefaultPosition",void 0);r([d({attribute:"horizontal-viewport-lock",mode:"boolean"})],j.prototype,"horizontalViewportLock",void 0);r([d({attribute:"horizontal-inset",mode:"boolean"})],j.prototype,"horizontalInset",void 0);r([d({attribute:"horizontal-threshold"})],j.prototype,"horizontalThreshold",void 0);r([d({attribute:"horizontal-scaling"})],j.prototype,"horizontalScaling",void 0);r([d({attribute:"vertical-positioning-mode"})],j.prototype,"verticalPositioningMode",void 0);r([d({attribute:"vertical-default-position"})],j.prototype,"verticalDefaultPosition",void 0);r([d({attribute:"vertical-viewport-lock",mode:"boolean"})],j.prototype,"verticalViewportLock",void 0);r([d({attribute:"vertical-inset",mode:"boolean"})],j.prototype,"verticalInset",void 0);r([d({attribute:"vertical-threshold"})],j.prototype,"verticalThreshold",void 0);r([d({attribute:"vertical-scaling"})],j.prototype,"verticalScaling",void 0);r([d({attribute:"fixed-placement",mode:"boolean"})],j.prototype,"fixedPlacement",void 0);r([d({attribute:"auto-update-mode"})],j.prototype,"autoUpdateMode",void 0);r([f],j.prototype,"anchorElement",void 0);r([f],j.prototype,"viewportElement",void 0);r([f],j.prototype,"initialLayoutComplete",void 0);const Es={horizontalDefaultPosition:"center",horizontalPositioningMode:"locktodefault",horizontalInset:!1,horizontalScaling:"anchor"},pr=Object.assign(Object.assign({},Es),{verticalDefaultPosition:"top",verticalPositioningMode:"locktodefault",verticalInset:!1,verticalScaling:"content"}),fr=Object.assign(Object.assign({},Es),{verticalDefaultPosition:"bottom",verticalPositioningMode:"locktodefault",verticalInset:!1,verticalScaling:"content"}),gr=Object.assign(Object.assign({},Es),{verticalPositioningMode:"dynamic",verticalInset:!1,verticalScaling:"content"}),Jl=Object.assign(Object.assign({},pr),{verticalScaling:"fill"}),$n=Object.assign(Object.assign({},fr),{verticalScaling:"fill"}),Kl=Object.assign(Object.assign({},gr),{verticalScaling:"fill"}),tc=(i,t)=>b`
    <div
        class="backplate ${e=>e.shape}"
        part="backplate"
        style="${e=>e.fill?`background-color: var(--avatar-fill-${e.fill});`:void 0}"
    >
        <a
            class="link"
            part="link"
            href="${e=>e.link?e.link:void 0}"
            style="${e=>e.color?`color: var(--avatar-color-${e.color});`:void 0}"
        >
            <slot name="media" part="media">${t.media||""}</slot>
            <slot class="content" part="content"><slot>
        </a>
    </div>
    <slot name="badge" part="badge"></slot>
`;let vi=class extends D{connectedCallback(){super.connectedCallback(),this.shape||(this.shape="circle")}};r([d],vi.prototype,"fill",void 0);r([d],vi.prototype,"color",void 0);r([d],vi.prototype,"link",void 0);r([d],vi.prototype,"shape",void 0);const ec=(i,t)=>b`
    <template class="${e=>e.circular?"circular":""}">
        <div class="control" part="control" style="${e=>e.generateBadgeStyle()}">
            <slot></slot>
        </div>
    </template>
`;class _e extends D{constructor(){super(...arguments),this.generateBadgeStyle=()=>{if(!this.fill&&!this.color)return;const t=`background-color: var(--badge-fill-${this.fill});`,e=`color: var(--badge-color-${this.color});`;return this.fill&&!this.color?t:this.color&&!this.fill?e:`${e} ${t}`}}}r([d({attribute:"fill"})],_e.prototype,"fill",void 0);r([d({attribute:"color"})],_e.prototype,"color",void 0);r([d({mode:"boolean"})],_e.prototype,"circular",void 0);const ic=(i,t)=>b`
    <div role="listitem" class="listitem" part="listitem">
        ${G(e=>e.href&&e.href.length>0,b`
                ${ur(i,t)}
            `)}
        ${G(e=>!e.href,b`
                ${Dt(i,t)}
                <slot></slot>
                ${Ft(i,t)}
            `)}
        ${G(e=>e.separator,b`
                <span class="separator" part="separator" aria-hidden="true">
                    <slot name="separator">${t.separator||""}</slot>
                </span>
            `)}
    </div>
`;class Pi extends zt{constructor(){super(...arguments),this.separator=!0}}r([f],Pi.prototype,"separator",void 0);tt(Pi,Lt,yo);const oc=(i,t)=>b`
    <template role="navigation">
        <div role="list" class="list" part="list">
            <slot
                ${Z({property:"slottedBreadcrumbItems",filter:fe()})}
            ></slot>
        </div>
    </template>
`;class mr extends D{slottedBreadcrumbItemsChanged(){if(this.$fastController.isConnected){if(this.slottedBreadcrumbItems===void 0||this.slottedBreadcrumbItems.length===0)return;const t=this.slottedBreadcrumbItems[this.slottedBreadcrumbItems.length-1];this.slottedBreadcrumbItems.forEach(e=>{const o=e===t;this.setItemSeparator(e,o),this.setAriaCurrent(e,o)})}}setItemSeparator(t,e){t instanceof Pi&&(t.separator=!e)}findChildWithHref(t){var e,o;return t.childElementCount>0?t.querySelector("a[href]"):!((e=t.shadowRoot)===null||e===void 0)&&e.childElementCount?(o=t.shadowRoot)===null||o===void 0?void 0:o.querySelector("a[href]"):null}setAriaCurrent(t,e){const o=this.findChildWithHref(t);o===null&&t.hasAttribute("href")&&t instanceof Pi?e?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current"):o!==null&&(e?o.setAttribute("aria-current","page"):o.removeAttribute("aria-current"))}}r([f],mr.prototype,"slottedBreadcrumbItems",void 0);const sc=(i,t)=>b`
    <button
        class="control"
        part="control"
        ?autofocus="${e=>e.autofocus}"
        ?disabled="${e=>e.disabled}"
        form="${e=>e.formId}"
        formaction="${e=>e.formaction}"
        formenctype="${e=>e.formenctype}"
        formmethod="${e=>e.formmethod}"
        formnovalidate="${e=>e.formnovalidate}"
        formtarget="${e=>e.formtarget}"
        name="${e=>e.name}"
        type="${e=>e.type}"
        value="${e=>e.value}"
        aria-atomic="${e=>e.ariaAtomic}"
        aria-busy="${e=>e.ariaBusy}"
        aria-controls="${e=>e.ariaControls}"
        aria-current="${e=>e.ariaCurrent}"
        aria-describedby="${e=>e.ariaDescribedby}"
        aria-details="${e=>e.ariaDetails}"
        aria-disabled="${e=>e.ariaDisabled}"
        aria-errormessage="${e=>e.ariaErrormessage}"
        aria-expanded="${e=>e.ariaExpanded}"
        aria-flowto="${e=>e.ariaFlowto}"
        aria-haspopup="${e=>e.ariaHaspopup}"
        aria-hidden="${e=>e.ariaHidden}"
        aria-invalid="${e=>e.ariaInvalid}"
        aria-keyshortcuts="${e=>e.ariaKeyshortcuts}"
        aria-label="${e=>e.ariaLabel}"
        aria-labelledby="${e=>e.ariaLabelledby}"
        aria-live="${e=>e.ariaLive}"
        aria-owns="${e=>e.ariaOwns}"
        aria-pressed="${e=>e.ariaPressed}"
        aria-relevant="${e=>e.ariaRelevant}"
        aria-roledescription="${e=>e.ariaRoledescription}"
        ${N("control")}
    >
        ${Dt(i,t)}
        <span class="content" part="content">
            <slot ${Z("defaultSlottedContent")}></slot>
        </span>
        ${Ft(i,t)}
    </button>
`,wn="form-associated-proxy",kn="ElementInternals",Cn=kn in window&&"setFormValue"in window[kn].prototype,In=new WeakMap;function ae(i){const t=class extends i{constructor(...e){super(...e),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return Cn}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const e=this.proxy.labels,o=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),s=e?o.concat(Array.from(e)):o;return Object.freeze(s)}else return Pe}valueChanged(e,o){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(e,o){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(e,o){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),S.queueUpdate(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(e,o){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(e,o){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),S.queueUpdate(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!Cn)return null;let e=In.get(this);return e||(e=this.attachInternals(),In.set(this,e)),e}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){this.proxyEventsToBlock.forEach(e=>this.proxy.removeEventListener(e,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(e,o,s){this.elementInternals?this.elementInternals.setValidity(e,o,s):typeof o=="string"&&this.proxy.setCustomValidity(o)}formDisabledCallback(e){this.disabled=e}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var e;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(o=>this.proxy.addEventListener(o,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",wn),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",wn)),(e=this.shadowRoot)===null||e===void 0||e.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var e;this.removeChild(this.proxy),(e=this.shadowRoot)===null||e===void 0||e.removeChild(this.proxySlot)}validate(e){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,e)}setFormValue(e,o){this.elementInternals&&this.elementInternals.setFormValue(e,o||e)}_keypressHandler(e){switch(e.key){case Jt:if(this.form instanceof HTMLFormElement){const o=this.form.querySelector("[type=submit]");o==null||o.click()}break}}stopPropagation(e){e.stopPropagation()}};return d({mode:"boolean"})(t.prototype,"disabled"),d({mode:"fromView",attribute:"value"})(t.prototype,"initialValue"),d({attribute:"current-value"})(t.prototype,"currentValue"),d(t.prototype,"name"),d({mode:"boolean"})(t.prototype,"required"),f(t.prototype,"value"),t}function Rs(i){class t extends ae(i){}class e extends t{constructor(...s){super(s),this.dirtyChecked=!1,this.checkedAttribute=!1,this.checked=!1,this.dirtyChecked=!1}checkedAttributeChanged(){this.defaultChecked=this.checkedAttribute}defaultCheckedChanged(){this.dirtyChecked||(this.checked=this.defaultChecked,this.dirtyChecked=!1)}checkedChanged(s,n){this.dirtyChecked||(this.dirtyChecked=!0),this.currentChecked=this.checked,this.updateForm(),this.proxy instanceof HTMLInputElement&&(this.proxy.checked=this.checked),s!==void 0&&this.$emit("change"),this.validate()}currentCheckedChanged(s,n){this.checked=this.currentChecked}updateForm(){const s=this.checked?this.value:null;this.setFormValue(s,s)}connectedCallback(){super.connectedCallback(),this.updateForm()}formResetCallback(){super.formResetCallback(),this.checked=!!this.checkedAttribute,this.dirtyChecked=!1}}return d({attribute:"checked",mode:"boolean"})(e.prototype,"checkedAttribute"),d({attribute:"current-checked",converter:fo})(e.prototype,"currentChecked"),f(e.prototype,"defaultChecked"),f(e.prototype,"checked"),e}class nc extends D{}class rc extends ae(nc){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let Xt=class extends rc{constructor(){super(...arguments),this.handleClick=t=>{var e;this.disabled&&((e=this.defaultSlottedContent)===null||e===void 0?void 0:e.length)<=1&&t.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const t=this.proxy.isConnected;t||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),t||this.detachProxy()},this.handleFormReset=()=>{var t;(t=this.form)===null||t===void 0||t.reset()},this.handleUnsupportedDelegatesFocus=()=>{var t;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(!((t=this.$fastController.definition.shadowOptions)===null||t===void 0)&&t.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(t,e){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),e==="submit"&&this.addEventListener("click",this.handleSubmission),t==="submit"&&this.removeEventListener("click",this.handleSubmission),e==="reset"&&this.addEventListener("click",this.handleFormReset),t==="reset"&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var t;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const e=Array.from((t=this.control)===null||t===void 0?void 0:t.children);e&&e.forEach(o=>{o.addEventListener("click",this.handleClick)})}disconnectedCallback(){var t;super.disconnectedCallback();const e=Array.from((t=this.control)===null||t===void 0?void 0:t.children);e&&e.forEach(o=>{o.removeEventListener("click",this.handleClick)})}};r([d({mode:"boolean"})],Xt.prototype,"autofocus",void 0);r([d({attribute:"form"})],Xt.prototype,"formId",void 0);r([d],Xt.prototype,"formaction",void 0);r([d],Xt.prototype,"formenctype",void 0);r([d],Xt.prototype,"formmethod",void 0);r([d({mode:"boolean"})],Xt.prototype,"formnovalidate",void 0);r([d],Xt.prototype,"formtarget",void 0);r([d],Xt.prototype,"type",void 0);r([f],Xt.prototype,"defaultSlottedContent",void 0);class xo{}r([d({attribute:"aria-expanded"})],xo.prototype,"ariaExpanded",void 0);r([d({attribute:"aria-pressed"})],xo.prototype,"ariaPressed",void 0);tt(xo,K);tt(Xt,Lt,xo);class ac{constructor(t){if(this.dayFormat="numeric",this.weekdayFormat="long",this.monthFormat="long",this.yearFormat="numeric",this.date=new Date,t)for(const e in t){const o=t[e];e==="date"?this.date=this.getDateObject(o):this[e]=o}}getDateObject(t){if(typeof t=="string"){const e=t.split(/[/-]/);return e.length<3?new Date:new Date(parseInt(e[2],10),parseInt(e[0],10)-1,parseInt(e[1],10))}else if("day"in t&&"month"in t&&"year"in t){const{day:e,month:o,year:s}=t;return new Date(s,o-1,e)}return t}getDate(t=this.date,e={weekday:this.weekdayFormat,month:this.monthFormat,day:this.dayFormat,year:this.yearFormat},o=this.locale){const s=this.getDateObject(t),n=Object.assign({timeZone:"utc"},e);return new Intl.DateTimeFormat(o,n).format(s)}getDay(t=this.date.getDate(),e=this.dayFormat,o=this.locale){return this.getDate({month:1,day:t,year:2020},{day:e},o)}getMonth(t=this.date.getMonth()+1,e=this.monthFormat,o=this.locale){return this.getDate({month:t,day:2,year:2020},{month:e},o)}getYear(t=this.date.getFullYear(),e=this.yearFormat,o=this.locale){return this.getDate({month:2,day:2,year:t},{year:e},o)}getWeekday(t=0,e=this.weekdayFormat,o=this.locale){const s=`1-${t+1}-2017`;return this.getDate(s,{weekday:e},o)}getWeekdays(t=this.weekdayFormat,e=this.locale){return Array(7).fill(null).map((o,s)=>this.getWeekday(s,t,e))}}class Yt extends D{constructor(){super(...arguments),this.dateFormatter=new ac,this.readonly=!1,this.locale="en-US",this.month=new Date().getMonth()+1,this.year=new Date().getFullYear(),this.dayFormat="numeric",this.weekdayFormat="short",this.monthFormat="long",this.yearFormat="numeric",this.minWeeks=0,this.disabledDates="",this.selectedDates="",this.oneDayInMs=864e5}localeChanged(){this.dateFormatter.locale=this.locale}dayFormatChanged(){this.dateFormatter.dayFormat=this.dayFormat}weekdayFormatChanged(){this.dateFormatter.weekdayFormat=this.weekdayFormat}monthFormatChanged(){this.dateFormatter.monthFormat=this.monthFormat}yearFormatChanged(){this.dateFormatter.yearFormat=this.yearFormat}getMonthInfo(t=this.month,e=this.year){const o=h=>new Date(h.getFullYear(),h.getMonth(),1).getDay(),s=h=>{const u=new Date(h.getFullYear(),h.getMonth()+1,1);return new Date(u.getTime()-this.oneDayInMs).getDate()},n=new Date(e,t-1),a=new Date(e,t),l=new Date(e,t-2);return{length:s(n),month:t,start:o(n),year:e,previous:{length:s(l),month:l.getMonth()+1,start:o(l),year:l.getFullYear()},next:{length:s(a),month:a.getMonth()+1,start:o(a),year:a.getFullYear()}}}getDays(t=this.getMonthInfo(),e=this.minWeeks){e=e>10?10:e;const{start:o,length:s,previous:n,next:a}=t,l=[];let h=1-o;for(;h<s+1||l.length<e||l[l.length-1].length%7!==0;){const{month:u,year:p}=h<1?n:h>s?a:t,g=h<1?n.length+h:h>s?h-s:h,y=`${u}-${g}-${p}`,E=this.dateInString(y,this.disabledDates),M=this.dateInString(y,this.selectedDates),V={day:g,month:u,year:p,disabled:E,selected:M},U=l[l.length-1];l.length===0||U.length%7===0?l.push([V]):U.push(V),h++}return l}dateInString(t,e){const o=e.split(",").map(s=>s.trim());return t=typeof t=="string"?t:`${t.getMonth()+1}-${t.getDate()}-${t.getFullYear()}`,o.some(s=>s===t)}getDayClassNames(t,e){const{day:o,month:s,year:n,disabled:a,selected:l}=t,h=e===`${s}-${o}-${n}`,u=this.month!==s;return["day",h&&"today",u&&"inactive",a&&"disabled",l&&"selected"].filter(Boolean).join(" ")}getWeekdayText(){const t=this.dateFormatter.getWeekdays().map(e=>({text:e}));if(this.weekdayFormat!=="long"){const e=this.dateFormatter.getWeekdays("long");t.forEach((o,s)=>{o.abbr=e[s]})}return t}handleDateSelect(t,e){t.preventDefault,this.$emit("dateselected",e)}handleKeydown(t,e){return t.key===Jt&&this.handleDateSelect(t,e),!0}}r([d({mode:"boolean"})],Yt.prototype,"readonly",void 0);r([d],Yt.prototype,"locale",void 0);r([d({converter:w})],Yt.prototype,"month",void 0);r([d({converter:w})],Yt.prototype,"year",void 0);r([d({attribute:"day-format",mode:"fromView"})],Yt.prototype,"dayFormat",void 0);r([d({attribute:"weekday-format",mode:"fromView"})],Yt.prototype,"weekdayFormat",void 0);r([d({attribute:"month-format",mode:"fromView"})],Yt.prototype,"monthFormat",void 0);r([d({attribute:"year-format",mode:"fromView"})],Yt.prototype,"yearFormat",void 0);r([d({attribute:"min-weeks",converter:w})],Yt.prototype,"minWeeks",void 0);r([d({attribute:"disabled-dates"})],Yt.prototype,"disabledDates",void 0);r([d({attribute:"selected-dates"})],Yt.prototype,"selectedDates",void 0);const Ki={none:"none",default:"default",sticky:"sticky"},ke={default:"default",columnHeader:"columnheader",rowHeader:"rowheader"},Ei={default:"default",header:"header",stickyHeader:"sticky-header"};class vt extends D{constructor(){super(...arguments),this.rowType=Ei.default,this.rowData=null,this.columnDefinitions=null,this.isActiveRow=!1,this.cellsRepeatBehavior=null,this.cellsPlaceholder=null,this.focusColumnIndex=0,this.refocusOnLoad=!1,this.updateRowStyle=()=>{this.style.gridTemplateColumns=this.gridTemplateColumns}}gridTemplateColumnsChanged(){this.$fastController.isConnected&&this.updateRowStyle()}rowTypeChanged(){this.$fastController.isConnected&&this.updateItemTemplate()}rowDataChanged(){if(this.rowData!==null&&this.isActiveRow){this.refocusOnLoad=!0;return}}cellItemTemplateChanged(){this.updateItemTemplate()}headerCellItemTemplateChanged(){this.updateItemTemplate()}connectedCallback(){super.connectedCallback(),this.cellsRepeatBehavior===null&&(this.cellsPlaceholder=document.createComment(""),this.appendChild(this.cellsPlaceholder),this.updateItemTemplate(),this.cellsRepeatBehavior=new Li(t=>t.columnDefinitions,t=>t.activeCellItemTemplate,{positioning:!0}).createBehavior(this.cellsPlaceholder),this.$fastController.addBehaviors([this.cellsRepeatBehavior])),this.addEventListener("cell-focused",this.handleCellFocus),this.addEventListener(hi,this.handleFocusout),this.addEventListener(di,this.handleKeydown),this.updateRowStyle(),this.refocusOnLoad&&(this.refocusOnLoad=!1,this.cellElements.length>this.focusColumnIndex&&this.cellElements[this.focusColumnIndex].focus())}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("cell-focused",this.handleCellFocus),this.removeEventListener(hi,this.handleFocusout),this.removeEventListener(di,this.handleKeydown)}handleFocusout(t){this.contains(t.target)||(this.isActiveRow=!1,this.focusColumnIndex=0)}handleCellFocus(t){this.isActiveRow=!0,this.focusColumnIndex=this.cellElements.indexOf(t.target),this.$emit("row-focused",this)}handleKeydown(t){if(t.defaultPrevented)return;let e=0;switch(t.key){case ge:e=Math.max(0,this.focusColumnIndex-1),this.cellElements[e].focus(),t.preventDefault();break;case me:e=Math.min(this.cellElements.length-1,this.focusColumnIndex+1),this.cellElements[e].focus(),t.preventDefault();break;case ne:t.ctrlKey||(this.cellElements[0].focus(),t.preventDefault());break;case re:t.ctrlKey||(this.cellElements[this.cellElements.length-1].focus(),t.preventDefault());break}}updateItemTemplate(){this.activeCellItemTemplate=this.rowType===Ei.default&&this.cellItemTemplate!==void 0?this.cellItemTemplate:this.rowType===Ei.default&&this.cellItemTemplate===void 0?this.defaultCellItemTemplate:this.headerCellItemTemplate!==void 0?this.headerCellItemTemplate:this.defaultHeaderCellItemTemplate}}r([d({attribute:"grid-template-columns"})],vt.prototype,"gridTemplateColumns",void 0);r([d({attribute:"row-type"})],vt.prototype,"rowType",void 0);r([f],vt.prototype,"rowData",void 0);r([f],vt.prototype,"columnDefinitions",void 0);r([f],vt.prototype,"cellItemTemplate",void 0);r([f],vt.prototype,"headerCellItemTemplate",void 0);r([f],vt.prototype,"rowIndex",void 0);r([f],vt.prototype,"isActiveRow",void 0);r([f],vt.prototype,"activeCellItemTemplate",void 0);r([f],vt.prototype,"defaultCellItemTemplate",void 0);r([f],vt.prototype,"defaultHeaderCellItemTemplate",void 0);r([f],vt.prototype,"cellElements",void 0);function lc(i){const t=i.tagFor(vt);return b`
    <${t}
        :rowData="${e=>e}"
        :cellItemTemplate="${(e,o)=>o.parent.cellItemTemplate}"
        :headerCellItemTemplate="${(e,o)=>o.parent.headerCellItemTemplate}"
    ></${t}>
`}const cc=(i,t)=>{const e=lc(i),o=i.tagFor(vt);return b`
        <template
            role="grid"
            tabindex="0"
            :rowElementTag="${()=>o}"
            :defaultRowItemTemplate="${e}"
            ${bo({property:"rowElements",filter:fe("[role=row]")})}
        >
            <slot></slot>
        </template>
    `};class ut extends D{constructor(){super(),this.noTabbing=!1,this.generateHeader=Ki.default,this.rowsData=[],this.columnDefinitions=null,this.focusRowIndex=0,this.focusColumnIndex=0,this.rowsPlaceholder=null,this.generatedHeader=null,this.isUpdatingFocus=!1,this.pendingFocusUpdate=!1,this.rowindexUpdateQueued=!1,this.columnDefinitionsStale=!0,this.generatedGridTemplateColumns="",this.focusOnCell=(t,e,o)=>{if(this.rowElements.length===0){this.focusRowIndex=0,this.focusColumnIndex=0;return}const s=Math.max(0,Math.min(this.rowElements.length-1,t)),a=this.rowElements[s].querySelectorAll('[role="cell"], [role="gridcell"], [role="columnheader"], [role="rowheader"]'),l=Math.max(0,Math.min(a.length-1,e)),h=a[l];o&&this.scrollHeight!==this.clientHeight&&(s<this.focusRowIndex&&this.scrollTop>0||s>this.focusRowIndex&&this.scrollTop<this.scrollHeight-this.clientHeight)&&h.scrollIntoView({block:"center",inline:"center"}),h.focus()},this.onChildListChange=(t,e)=>{t&&t.length&&(t.forEach(o=>{o.addedNodes.forEach(s=>{s.nodeType===1&&s.getAttribute("role")==="row"&&(s.columnDefinitions=this.columnDefinitions)})}),this.queueRowIndexUpdate())},this.queueRowIndexUpdate=()=>{this.rowindexUpdateQueued||(this.rowindexUpdateQueued=!0,S.queueUpdate(this.updateRowIndexes))},this.updateRowIndexes=()=>{let t=this.gridTemplateColumns;if(t===void 0){if(this.generatedGridTemplateColumns===""&&this.rowElements.length>0){const e=this.rowElements[0];this.generatedGridTemplateColumns=new Array(e.cellElements.length).fill("1fr").join(" ")}t=this.generatedGridTemplateColumns}this.rowElements.forEach((e,o)=>{const s=e;s.rowIndex=o,s.gridTemplateColumns=t,this.columnDefinitionsStale&&(s.columnDefinitions=this.columnDefinitions)}),this.rowindexUpdateQueued=!1,this.columnDefinitionsStale=!1}}static generateTemplateColumns(t){let e="";return t.forEach(o=>{e=`${e}${e===""?"":" "}1fr`}),e}noTabbingChanged(){this.$fastController.isConnected&&(this.noTabbing?this.setAttribute("tabIndex","-1"):this.setAttribute("tabIndex",this.contains(document.activeElement)||this===document.activeElement?"-1":"0"))}generateHeaderChanged(){this.$fastController.isConnected&&this.toggleGeneratedHeader()}gridTemplateColumnsChanged(){this.$fastController.isConnected&&this.updateRowIndexes()}rowsDataChanged(){this.columnDefinitions===null&&this.rowsData.length>0&&(this.columnDefinitions=ut.generateColumns(this.rowsData[0])),this.$fastController.isConnected&&this.toggleGeneratedHeader()}columnDefinitionsChanged(){if(this.columnDefinitions===null){this.generatedGridTemplateColumns="";return}this.generatedGridTemplateColumns=ut.generateTemplateColumns(this.columnDefinitions),this.$fastController.isConnected&&(this.columnDefinitionsStale=!0,this.queueRowIndexUpdate())}headerCellItemTemplateChanged(){this.$fastController.isConnected&&this.generatedHeader!==null&&(this.generatedHeader.headerCellItemTemplate=this.headerCellItemTemplate)}focusRowIndexChanged(){this.$fastController.isConnected&&this.queueFocusUpdate()}focusColumnIndexChanged(){this.$fastController.isConnected&&this.queueFocusUpdate()}connectedCallback(){super.connectedCallback(),this.rowItemTemplate===void 0&&(this.rowItemTemplate=this.defaultRowItemTemplate),this.rowsPlaceholder=document.createComment(""),this.appendChild(this.rowsPlaceholder),this.toggleGeneratedHeader(),this.rowsRepeatBehavior=new Li(t=>t.rowsData,t=>t.rowItemTemplate,{positioning:!0}).createBehavior(this.rowsPlaceholder),this.$fastController.addBehaviors([this.rowsRepeatBehavior]),this.addEventListener("row-focused",this.handleRowFocus),this.addEventListener(gn,this.handleFocus),this.addEventListener(di,this.handleKeydown),this.addEventListener(hi,this.handleFocusOut),this.observer=new MutationObserver(this.onChildListChange),this.observer.observe(this,{childList:!0}),this.noTabbing&&this.setAttribute("tabindex","-1"),S.queueUpdate(this.queueRowIndexUpdate)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("row-focused",this.handleRowFocus),this.removeEventListener(gn,this.handleFocus),this.removeEventListener(di,this.handleKeydown),this.removeEventListener(hi,this.handleFocusOut),this.observer.disconnect(),this.rowsPlaceholder=null,this.generatedHeader=null}handleRowFocus(t){this.isUpdatingFocus=!0;const e=t.target;this.focusRowIndex=this.rowElements.indexOf(e),this.focusColumnIndex=e.focusColumnIndex,this.setAttribute("tabIndex","-1"),this.isUpdatingFocus=!1}handleFocus(t){this.focusOnCell(this.focusRowIndex,this.focusColumnIndex,!0)}handleFocusOut(t){(t.relatedTarget===null||!this.contains(t.relatedTarget))&&this.setAttribute("tabIndex",this.noTabbing?"-1":"0")}handleKeydown(t){if(t.defaultPrevented)return;let e;const o=this.rowElements.length-1,s=this.offsetHeight+this.scrollTop,n=this.rowElements[o];switch(t.key){case Ht:t.preventDefault(),this.focusOnCell(this.focusRowIndex-1,this.focusColumnIndex,!0);break;case Vt:t.preventDefault(),this.focusOnCell(this.focusRowIndex+1,this.focusColumnIndex,!0);break;case Gl:if(t.preventDefault(),this.rowElements.length===0){this.focusOnCell(0,0,!1);break}if(this.focusRowIndex===0){this.focusOnCell(0,this.focusColumnIndex,!1);return}for(e=this.focusRowIndex-1,e;e>=0;e--){const a=this.rowElements[e];if(a.offsetTop<this.scrollTop){this.scrollTop=a.offsetTop+a.clientHeight-this.clientHeight;break}}this.focusOnCell(e,this.focusColumnIndex,!1);break;case Ul:if(t.preventDefault(),this.rowElements.length===0){this.focusOnCell(0,0,!1);break}if(this.focusRowIndex>=o||n.offsetTop+n.offsetHeight<=s){this.focusOnCell(o,this.focusColumnIndex,!1);return}for(e=this.focusRowIndex+1,e;e<=o;e++){const a=this.rowElements[e];if(a.offsetTop+a.offsetHeight>s){let l=0;this.generateHeader===Ki.sticky&&this.generatedHeader!==null&&(l=this.generatedHeader.clientHeight),this.scrollTop=a.offsetTop-l;break}}this.focusOnCell(e,this.focusColumnIndex,!1);break;case ne:t.ctrlKey&&(t.preventDefault(),this.focusOnCell(0,0,!0));break;case re:t.ctrlKey&&this.columnDefinitions!==null&&(t.preventDefault(),this.focusOnCell(this.rowElements.length-1,this.columnDefinitions.length-1,!0));break}}queueFocusUpdate(){this.isUpdatingFocus&&(this.contains(document.activeElement)||this===document.activeElement)||this.pendingFocusUpdate===!1&&(this.pendingFocusUpdate=!0,S.queueUpdate(()=>this.updateFocus()))}updateFocus(){this.pendingFocusUpdate=!1,this.focusOnCell(this.focusRowIndex,this.focusColumnIndex,!0)}toggleGeneratedHeader(){if(this.generatedHeader!==null&&(this.removeChild(this.generatedHeader),this.generatedHeader=null),this.generateHeader!==Ki.none&&this.rowsData.length>0){const t=document.createElement(this.rowElementTag);this.generatedHeader=t,this.generatedHeader.columnDefinitions=this.columnDefinitions,this.generatedHeader.gridTemplateColumns=this.gridTemplateColumns,this.generatedHeader.rowType=this.generateHeader===Ki.sticky?Ei.stickyHeader:Ei.header,(this.firstChild!==null||this.rowsPlaceholder!==null)&&this.insertBefore(t,this.firstChild!==null?this.firstChild:this.rowsPlaceholder);return}}}ut.generateColumns=i=>Object.getOwnPropertyNames(i).map((t,e)=>({columnDataKey:t,gridColumn:`${e}`}));r([d({attribute:"no-tabbing",mode:"boolean"})],ut.prototype,"noTabbing",void 0);r([d({attribute:"generate-header"})],ut.prototype,"generateHeader",void 0);r([d({attribute:"grid-template-columns"})],ut.prototype,"gridTemplateColumns",void 0);r([f],ut.prototype,"rowsData",void 0);r([f],ut.prototype,"columnDefinitions",void 0);r([f],ut.prototype,"rowItemTemplate",void 0);r([f],ut.prototype,"cellItemTemplate",void 0);r([f],ut.prototype,"headerCellItemTemplate",void 0);r([f],ut.prototype,"focusRowIndex",void 0);r([f],ut.prototype,"focusColumnIndex",void 0);r([f],ut.prototype,"defaultRowItemTemplate",void 0);r([f],ut.prototype,"rowElementTag",void 0);r([f],ut.prototype,"rowElements",void 0);const hc=b`
    <template>
        ${i=>i.rowData===null||i.columnDefinition===null||i.columnDefinition.columnDataKey===null?null:i.rowData[i.columnDefinition.columnDataKey]}
    </template>
`,dc=b`
    <template>
        ${i=>i.columnDefinition===null?null:i.columnDefinition.title===void 0?i.columnDefinition.columnDataKey:i.columnDefinition.title}
    </template>
`;class be extends D{constructor(){super(...arguments),this.cellType=ke.default,this.rowData=null,this.columnDefinition=null,this.isActiveCell=!1,this.customCellView=null,this.updateCellStyle=()=>{this.style.gridColumn=this.gridColumn}}cellTypeChanged(){this.$fastController.isConnected&&this.updateCellView()}gridColumnChanged(){this.$fastController.isConnected&&this.updateCellStyle()}columnDefinitionChanged(t,e){this.$fastController.isConnected&&this.updateCellView()}connectedCallback(){var t;super.connectedCallback(),this.addEventListener(mn,this.handleFocusin),this.addEventListener(hi,this.handleFocusout),this.addEventListener(di,this.handleKeydown),this.style.gridColumn=`${((t=this.columnDefinition)===null||t===void 0?void 0:t.gridColumn)===void 0?0:this.columnDefinition.gridColumn}`,this.updateCellView(),this.updateCellStyle()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(mn,this.handleFocusin),this.removeEventListener(hi,this.handleFocusout),this.removeEventListener(di,this.handleKeydown),this.disconnectCellView()}handleFocusin(t){if(!this.isActiveCell){switch(this.isActiveCell=!0,this.cellType){case ke.columnHeader:if(this.columnDefinition!==null&&this.columnDefinition.headerCellInternalFocusQueue!==!0&&typeof this.columnDefinition.headerCellFocusTargetCallback=="function"){const e=this.columnDefinition.headerCellFocusTargetCallback(this);e!==null&&e.focus()}break;default:if(this.columnDefinition!==null&&this.columnDefinition.cellInternalFocusQueue!==!0&&typeof this.columnDefinition.cellFocusTargetCallback=="function"){const e=this.columnDefinition.cellFocusTargetCallback(this);e!==null&&e.focus()}break}this.$emit("cell-focused",this)}}handleFocusout(t){this!==document.activeElement&&!this.contains(document.activeElement)&&(this.isActiveCell=!1)}handleKeydown(t){if(!(t.defaultPrevented||this.columnDefinition===null||this.cellType===ke.default&&this.columnDefinition.cellInternalFocusQueue!==!0||this.cellType===ke.columnHeader&&this.columnDefinition.headerCellInternalFocusQueue!==!0))switch(t.key){case Jt:case ql:if(this.contains(document.activeElement)&&document.activeElement!==this)return;switch(this.cellType){case ke.columnHeader:if(this.columnDefinition.headerCellFocusTargetCallback!==void 0){const e=this.columnDefinition.headerCellFocusTargetCallback(this);e!==null&&e.focus(),t.preventDefault()}break;default:if(this.columnDefinition.cellFocusTargetCallback!==void 0){const e=this.columnDefinition.cellFocusTargetCallback(this);e!==null&&e.focus(),t.preventDefault()}break}break;case Ne:this.contains(document.activeElement)&&document.activeElement!==this&&(this.focus(),t.preventDefault());break}}updateCellView(){if(this.disconnectCellView(),this.columnDefinition!==null)switch(this.cellType){case ke.columnHeader:this.columnDefinition.headerCellTemplate!==void 0?this.customCellView=this.columnDefinition.headerCellTemplate.render(this,this):this.customCellView=dc.render(this,this);break;case void 0:case ke.rowHeader:case ke.default:this.columnDefinition.cellTemplate!==void 0?this.customCellView=this.columnDefinition.cellTemplate.render(this,this):this.customCellView=hc.render(this,this);break}}disconnectCellView(){this.customCellView!==null&&(this.customCellView.dispose(),this.customCellView=null)}}r([d({attribute:"cell-type"})],be.prototype,"cellType",void 0);r([d({attribute:"grid-column"})],be.prototype,"gridColumn",void 0);r([f],be.prototype,"rowData",void 0);r([f],be.prototype,"columnDefinition",void 0);function uc(i){const t=i.tagFor(be);return b`
    <${t}
        cell-type="${e=>e.isRowHeader?"rowheader":void 0}"
        grid-column="${(e,o)=>o.index+1}"
        :rowData="${(e,o)=>o.parent.rowData}"
        :columnDefinition="${e=>e}"
    ></${t}>
`}function pc(i){const t=i.tagFor(be);return b`
    <${t}
        cell-type="columnheader"
        grid-column="${(e,o)=>o.index+1}"
        :columnDefinition="${e=>e}"
    ></${t}>
`}const fc=(i,t)=>{const e=uc(i),o=pc(i);return b`
        <template
            role="row"
            class="${s=>s.rowType!=="default"?s.rowType:""}"
            :defaultCellItemTemplate="${e}"
            :defaultHeaderCellItemTemplate="${o}"
            ${bo({property:"cellElements",filter:fe('[role="cell"],[role="gridcell"],[role="columnheader"],[role="rowheader"]')})}
        >
            <slot ${Z("slottedCellElements")}></slot>
        </template>
    `},gc=(i,t)=>b`
        <template
            tabindex="-1"
            role="${e=>!e.cellType||e.cellType==="default"?"gridcell":e.cellType}"
            class="
            ${e=>e.cellType==="columnheader"?"column-header":e.cellType==="rowheader"?"row-header":""}
            "
        >
            <slot></slot>
        </template>
    `,mc=b`
    <div
        class="title"
        part="title"
        aria-label="${i=>i.dateFormatter.getDate(`${i.month}-2-${i.year}`,{month:"long",year:"numeric"})}"
    >
        <span part="month">
            ${i=>i.dateFormatter.getMonth(i.month)}
        </span>
        <span part="year">${i=>i.dateFormatter.getYear(i.year)}</span>
    </div>
`,bc=i=>{const t=i.tagFor(be);return b`
        <${t}
            class="week-day"
            part="week-day"
            tabindex="-1"
            grid-column="${(e,o)=>o.index+1}"
            abbr="${e=>e.abbr}"
        >
            ${e=>e.text}
        </${t}>
    `},vc=(i,t)=>{const e=i.tagFor(be);return b`
        <${e}
            class="${(o,s)=>s.parentContext.parent.getDayClassNames(o,t)}"
            part="day"
            tabindex="-1"
            role="gridcell"
            grid-column="${(o,s)=>s.index+1}"
            @click="${(o,s)=>s.parentContext.parent.handleDateSelect(s.event,o)}"
            @keydown="${(o,s)=>s.parentContext.parent.handleKeydown(s.event,o)}"
            aria-label="${(o,s)=>s.parentContext.parent.dateFormatter.getDate(`${o.month}-${o.day}-${o.year}`,{month:"long",day:"numeric"})}"
        >
            <div
                class="date"
                part="${o=>t===`${o.month}-${o.day}-${o.year}`?"today":"date"}"
            >
                ${(o,s)=>s.parentContext.parent.dateFormatter.getDay(o.day)}
            </div>
            <slot name="${o=>o.month}-${o=>o.day}-${o=>o.year}"></slot>
        </${e}>
    `},yc=(i,t)=>{const e=i.tagFor(vt);return b`
        <${e}
            class="week"
            part="week"
            role="row"
            role-type="default"
            grid-template-columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        >
        ${ri(o=>o,vc(i,t),{positioning:!0})}
        </${e}>
    `},xc=(i,t)=>{const e=i.tagFor(ut),o=i.tagFor(vt);return b`
    <${e} class="days interact" part="days" generate-header="none">
        <${o}
            class="week-days"
            part="week-days"
            role="row"
            row-type="header"
            grid-template-columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        >
            ${ri(s=>s.getWeekdayText(),bc(i),{positioning:!0})}
        </${o}>
        ${ri(s=>s.getDays(),yc(i,t))}
    </${e}>
`},$c=i=>b`
        <div class="days" part="days">
            <div class="week-days" part="week-days">
                ${ri(t=>t.getWeekdayText(),b`
                        <div class="week-day" part="week-day" abbr="${t=>t.abbr}">
                            ${t=>t.text}
                        </div>
                    `)}
            </div>
            ${ri(t=>t.getDays(),b`
                    <div class="week">
                        ${ri(t=>t,b`
                                <div
                                    class="${(t,e)=>e.parentContext.parent.getDayClassNames(t,i)}"
                                    part="day"
                                    aria-label="${(t,e)=>e.parentContext.parent.dateFormatter.getDate(`${t.month}-${t.day}-${t.year}`,{month:"long",day:"numeric"})}"
                                >
                                    <div
                                        class="date"
                                        part="${t=>i===`${t.month}-${t.day}-${t.year}`?"today":"date"}"
                                    >
                                        ${(t,e)=>e.parentContext.parent.dateFormatter.getDay(t.day)}
                                    </div>
                                    <slot
                                        name="${t=>t.month}-${t=>t.day}-${t=>t.year}"
                                    ></slot>
                                </div>
                            `)}
                    </div>
                `)}
        </div>
    `,wc=(i,t)=>{var e;const o=new Date,s=`${o.getMonth()+1}-${o.getDate()}-${o.getFullYear()}`;return b`
        <template>
            ${kl}
            ${t.title instanceof Function?t.title(i,t):(e=t.title)!==null&&e!==void 0?e:""}
            <slot></slot>
            ${G(n=>n.readonly===!1,xc(i,s))}
            ${G(n=>n.readonly===!0,$c(s))}
            ${wl}
        </template>
    `},kc=(i,t)=>b`
    <slot></slot>
`;let br=class extends D{};const Cc=(i,t)=>b`
    <template
        role="checkbox"
        aria-checked="${e=>e.checked}"
        aria-required="${e=>e.required}"
        aria-disabled="${e=>e.disabled}"
        aria-readonly="${e=>e.readOnly}"
        tabindex="${e=>e.disabled?null:0}"
        @keypress="${(e,o)=>e.keypressHandler(o.event)}"
        @click="${(e,o)=>e.clickHandler(o.event)}"
        class="${e=>e.readOnly?"readonly":""} ${e=>e.checked?"checked":""} ${e=>e.indeterminate?"indeterminate":""}"
    >
        <div part="control" class="control">
            <slot name="checked-indicator">
                ${t.checkedIndicator||""}
            </slot>
            <slot name="indeterminate-indicator">
                ${t.indeterminateIndicator||""}
            </slot>
        </div>
        <label
            part="label"
            class="${e=>e.defaultSlottedNodes&&e.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot ${Z("defaultSlottedNodes")}></slot>
        </label>
    </template>
`;class Ic extends D{}class Tc extends Rs(Ic){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class $o extends Tc{constructor(){super(),this.initialValue="on",this.indeterminate=!1,this.keypressHandler=t=>{if(!this.readOnly)switch(t.key){case je:this.indeterminate&&(this.indeterminate=!1),this.checked=!this.checked;break}},this.clickHandler=t=>{!this.disabled&&!this.readOnly&&(this.indeterminate&&(this.indeterminate=!1),this.checked=!this.checked)},this.proxy.setAttribute("type","checkbox")}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}}r([d({attribute:"readonly",mode:"boolean"})],$o.prototype,"readOnly",void 0);r([f],$o.prototype,"defaultSlottedNodes",void 0);r([f],$o.prototype,"indeterminate",void 0);function vr(i){return ci(i)&&(i.getAttribute("role")==="option"||i instanceof HTMLOptionElement)}class Kt extends D{constructor(t,e,o,s){super(),this.defaultSelected=!1,this.dirtySelected=!1,this.selected=this.defaultSelected,this.dirtyValue=!1,t&&(this.textContent=t),e&&(this.initialValue=e),o&&(this.defaultSelected=o),s&&(this.selected=s),this.proxy=new Option(`${this.textContent}`,this.initialValue,this.defaultSelected,this.selected),this.proxy.disabled=this.disabled}checkedChanged(t,e){if(typeof e=="boolean"){this.ariaChecked=e?"true":"false";return}this.ariaChecked=null}contentChanged(t,e){this.proxy instanceof HTMLOptionElement&&(this.proxy.textContent=this.textContent),this.$emit("contentchange",null,{bubbles:!0})}defaultSelectedChanged(){this.dirtySelected||(this.selected=this.defaultSelected,this.proxy instanceof HTMLOptionElement&&(this.proxy.selected=this.defaultSelected))}disabledChanged(t,e){this.ariaDisabled=this.disabled?"true":"false",this.proxy instanceof HTMLOptionElement&&(this.proxy.disabled=this.disabled)}selectedAttributeChanged(){this.defaultSelected=this.selectedAttribute,this.proxy instanceof HTMLOptionElement&&(this.proxy.defaultSelected=this.defaultSelected)}selectedChanged(){this.ariaSelected=this.selected?"true":"false",this.dirtySelected||(this.dirtySelected=!0),this.proxy instanceof HTMLOptionElement&&(this.proxy.selected=this.selected)}initialValueChanged(t,e){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}get label(){var t;return(t=this.value)!==null&&t!==void 0?t:this.text}get text(){var t,e;return(e=(t=this.textContent)===null||t===void 0?void 0:t.replace(/\s+/g," ").trim())!==null&&e!==void 0?e:""}set value(t){const e=`${t??""}`;this._value=e,this.dirtyValue=!0,this.proxy instanceof HTMLOptionElement&&(this.proxy.value=e),R.notify(this,"value")}get value(){var t;return R.track(this,"value"),(t=this._value)!==null&&t!==void 0?t:this.text}get form(){return this.proxy?this.proxy.form:null}}r([f],Kt.prototype,"checked",void 0);r([f],Kt.prototype,"content",void 0);r([f],Kt.prototype,"defaultSelected",void 0);r([d({mode:"boolean"})],Kt.prototype,"disabled",void 0);r([d({attribute:"selected",mode:"boolean"})],Kt.prototype,"selectedAttribute",void 0);r([f],Kt.prototype,"selected",void 0);r([d({attribute:"value",mode:"fromView"})],Kt.prototype,"initialValue",void 0);class yi{}r([f],yi.prototype,"ariaChecked",void 0);r([f],yi.prototype,"ariaPosInSet",void 0);r([f],yi.prototype,"ariaSelected",void 0);r([f],yi.prototype,"ariaSetSize",void 0);tt(yi,K);tt(Kt,Lt,yi);let $t=class extends D{constructor(){super(...arguments),this._options=[],this.selectedIndex=-1,this.selectedOptions=[],this.shouldSkipFocus=!1,this.typeaheadBuffer="",this.typeaheadExpired=!0,this.typeaheadTimeout=-1}get firstSelectedOption(){var t;return(t=this.selectedOptions[0])!==null&&t!==void 0?t:null}get hasSelectableOptions(){return this.options.length>0&&!this.options.every(t=>t.disabled)}get length(){var t,e;return(e=(t=this.options)===null||t===void 0?void 0:t.length)!==null&&e!==void 0?e:0}get options(){return R.track(this,"options"),this._options}set options(t){this._options=t,R.notify(this,"options")}get typeAheadExpired(){return this.typeaheadExpired}set typeAheadExpired(t){this.typeaheadExpired=t}clickHandler(t){const e=t.target.closest("option,[role=option]");if(e&&!e.disabled)return this.selectedIndex=this.options.indexOf(e),!0}focusAndScrollOptionIntoView(t=this.firstSelectedOption){this.contains(document.activeElement)&&t!==null&&(t.focus(),requestAnimationFrame(()=>{t.scrollIntoView({block:"nearest"})}))}focusinHandler(t){!this.shouldSkipFocus&&t.target===t.currentTarget&&(this.setSelectedOptions(),this.focusAndScrollOptionIntoView()),this.shouldSkipFocus=!1}getTypeaheadMatches(){const t=this.typeaheadBuffer.replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&"),e=new RegExp(`^${t}`,"gi");return this.options.filter(o=>o.text.trim().match(e))}getSelectableIndex(t=this.selectedIndex,e){const o=t>e?-1:t<e?1:0,s=t+o;let n=null;switch(o){case-1:{n=this.options.reduceRight((a,l,h)=>!a&&!l.disabled&&h<s?l:a,n);break}case 1:{n=this.options.reduce((a,l,h)=>!a&&!l.disabled&&h>s?l:a,n);break}}return this.options.indexOf(n)}handleChange(t,e){switch(e){case"selected":{$t.slottedOptionFilter(t)&&(this.selectedIndex=this.options.indexOf(t)),this.setSelectedOptions();break}}}handleTypeAhead(t){this.typeaheadTimeout&&window.clearTimeout(this.typeaheadTimeout),this.typeaheadTimeout=window.setTimeout(()=>this.typeaheadExpired=!0,$t.TYPE_AHEAD_TIMEOUT_MS),!(t.length>1)&&(this.typeaheadBuffer=`${this.typeaheadExpired?"":this.typeaheadBuffer}${t}`)}keydownHandler(t){if(this.disabled)return!0;this.shouldSkipFocus=!1;const e=t.key;switch(e){case ne:{t.shiftKey||(t.preventDefault(),this.selectFirstOption());break}case Vt:{t.shiftKey||(t.preventDefault(),this.selectNextOption());break}case Ht:{t.shiftKey||(t.preventDefault(),this.selectPreviousOption());break}case re:{t.preventDefault(),this.selectLastOption();break}case vo:return this.focusAndScrollOptionIntoView(),!0;case Jt:case Ne:return!0;case je:if(this.typeaheadExpired)return!0;default:return e.length===1&&this.handleTypeAhead(`${e}`),!0}}mousedownHandler(t){return this.shouldSkipFocus=!this.contains(document.activeElement),!0}multipleChanged(t,e){this.ariaMultiSelectable=e?"true":null}selectedIndexChanged(t,e){var o;if(!this.hasSelectableOptions){this.selectedIndex=-1;return}if(!((o=this.options[this.selectedIndex])===null||o===void 0)&&o.disabled&&typeof t=="number"){const s=this.getSelectableIndex(t,e),n=s>-1?s:t;this.selectedIndex=n,e===n&&this.selectedIndexChanged(e,n);return}this.setSelectedOptions()}selectedOptionsChanged(t,e){var o;const s=e.filter($t.slottedOptionFilter);(o=this.options)===null||o===void 0||o.forEach(n=>{const a=R.getNotifier(n);a.unsubscribe(this,"selected"),n.selected=s.includes(n),a.subscribe(this,"selected")})}selectFirstOption(){var t,e;this.disabled||(this.selectedIndex=(e=(t=this.options)===null||t===void 0?void 0:t.findIndex(o=>!o.disabled))!==null&&e!==void 0?e:-1)}selectLastOption(){this.disabled||(this.selectedIndex=zl(this.options,t=>!t.disabled))}selectNextOption(){!this.disabled&&this.selectedIndex<this.options.length-1&&(this.selectedIndex+=1)}selectPreviousOption(){!this.disabled&&this.selectedIndex>0&&(this.selectedIndex=this.selectedIndex-1)}setDefaultSelectedOption(){var t,e;this.selectedIndex=(e=(t=this.options)===null||t===void 0?void 0:t.findIndex(o=>o.defaultSelected))!==null&&e!==void 0?e:-1}setSelectedOptions(){var t,e,o;!((t=this.options)===null||t===void 0)&&t.length&&(this.selectedOptions=[this.options[this.selectedIndex]],this.ariaActiveDescendant=(o=(e=this.firstSelectedOption)===null||e===void 0?void 0:e.id)!==null&&o!==void 0?o:"",this.focusAndScrollOptionIntoView())}slottedOptionsChanged(t,e){this.options=e.reduce((s,n)=>(vr(n)&&s.push(n),s),[]);const o=`${this.options.length}`;this.options.forEach((s,n)=>{s.id||(s.id=Ve("option-")),s.ariaPosInSet=`${n+1}`,s.ariaSetSize=o}),this.$fastController.isConnected&&(this.setSelectedOptions(),this.setDefaultSelectedOption())}typeaheadBufferChanged(t,e){if(this.$fastController.isConnected){const o=this.getTypeaheadMatches();if(o.length){const s=this.options.indexOf(o[0]);s>-1&&(this.selectedIndex=s)}this.typeaheadExpired=!1}}};$t.slottedOptionFilter=i=>vr(i)&&!i.hidden;$t.TYPE_AHEAD_TIMEOUT_MS=1e3;r([d({mode:"boolean"})],$t.prototype,"disabled",void 0);r([f],$t.prototype,"selectedIndex",void 0);r([f],$t.prototype,"selectedOptions",void 0);r([f],$t.prototype,"slottedOptions",void 0);r([f],$t.prototype,"typeaheadBuffer",void 0);class Se{}r([f],Se.prototype,"ariaActiveDescendant",void 0);r([f],Se.prototype,"ariaDisabled",void 0);r([f],Se.prototype,"ariaExpanded",void 0);r([f],Se.prototype,"ariaMultiSelectable",void 0);tt(Se,K);tt($t,Se);const ai={above:"above",below:"below"};class Sc extends $t{}class Fc extends ae(Sc){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const to={inline:"inline",list:"list",both:"both",none:"none"};let ve=class extends Fc{constructor(){super(...arguments),this._value="",this.filteredOptions=[],this.filter="",this.forcedPosition=!1,this.listboxId=Ve("listbox-"),this.maxHeight=0,this.open=!1}formResetCallback(){super.formResetCallback(),this.setDefaultSelectedOption(),this.updateValue()}validate(){super.validate(this.control)}get isAutocompleteInline(){return this.autocomplete===to.inline||this.isAutocompleteBoth}get isAutocompleteList(){return this.autocomplete===to.list||this.isAutocompleteBoth}get isAutocompleteBoth(){return this.autocomplete===to.both}openChanged(){if(this.open){this.ariaControls=this.listboxId,this.ariaExpanded="true",this.setPositioning(),this.focusAndScrollOptionIntoView(),S.queueUpdate(()=>this.focus());return}this.ariaControls="",this.ariaExpanded="false"}get options(){return R.track(this,"options"),this.filteredOptions.length?this.filteredOptions:this._options}set options(t){this._options=t,R.notify(this,"options")}placeholderChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.placeholder=this.placeholder)}positionChanged(t,e){this.positionAttribute=e,this.setPositioning()}get value(){return R.track(this,"value"),this._value}set value(t){var e,o,s;const n=`${this._value}`;if(this.$fastController.isConnected&&this.options){const a=this.options.findIndex(u=>u.text.toLowerCase()===t.toLowerCase()),l=(e=this.options[this.selectedIndex])===null||e===void 0?void 0:e.text,h=(o=this.options[a])===null||o===void 0?void 0:o.text;this.selectedIndex=l!==h?a:this.selectedIndex,t=((s=this.firstSelectedOption)===null||s===void 0?void 0:s.text)||t}n!==t&&(this._value=t,super.valueChanged(n,t),R.notify(this,"value"))}clickHandler(t){if(!this.disabled){if(this.open){const e=t.target.closest("option,[role=option]");if(!e||e.disabled)return;this.selectedOptions=[e],this.control.value=e.text,this.clearSelectionRange(),this.updateValue(!0)}return this.open=!this.open,this.open&&this.control.focus(),!0}}connectedCallback(){super.connectedCallback(),this.forcedPosition=!!this.positionAttribute,this.value&&(this.initialValue=this.value)}disabledChanged(t,e){super.disabledChanged&&super.disabledChanged(t,e),this.ariaDisabled=this.disabled?"true":"false"}filterOptions(){(!this.autocomplete||this.autocomplete===to.none)&&(this.filter="");const t=this.filter.toLowerCase();this.filteredOptions=this._options.filter(e=>e.text.toLowerCase().startsWith(this.filter.toLowerCase())),this.isAutocompleteList&&(!this.filteredOptions.length&&!t&&(this.filteredOptions=this._options),this._options.forEach(e=>{e.hidden=!this.filteredOptions.includes(e)}))}focusAndScrollOptionIntoView(){this.contains(document.activeElement)&&(this.control.focus(),this.firstSelectedOption&&requestAnimationFrame(()=>{var t;(t=this.firstSelectedOption)===null||t===void 0||t.scrollIntoView({block:"nearest"})}))}focusoutHandler(t){if(this.syncValue(),!this.open)return!0;const e=t.relatedTarget;if(this.isSameNode(e)){this.focus();return}(!this.options||!this.options.includes(e))&&(this.open=!1)}inputHandler(t){if(this.filter=this.control.value,this.filterOptions(),this.isAutocompleteInline||(this.selectedIndex=this.options.map(e=>e.text).indexOf(this.control.value)),t.inputType.includes("deleteContent")||!this.filter.length)return!0;this.isAutocompleteList&&!this.open&&(this.open=!0),this.isAutocompleteInline&&(this.filteredOptions.length?(this.selectedOptions=[this.filteredOptions[0]],this.selectedIndex=this.options.indexOf(this.firstSelectedOption),this.setInlineSelection()):this.selectedIndex=-1)}keydownHandler(t){const e=t.key;if(t.ctrlKey||t.shiftKey)return!0;switch(e){case"Enter":{this.syncValue(),this.isAutocompleteInline&&(this.filter=this.value),this.open=!1,this.clearSelectionRange();break}case"Escape":{if(this.isAutocompleteInline||(this.selectedIndex=-1),this.open){this.open=!1;break}this.value="",this.control.value="",this.filter="",this.filterOptions();break}case"Tab":{if(this.setInputToSelection(),!this.open)return!0;t.preventDefault(),this.open=!1;break}case"ArrowUp":case"ArrowDown":{if(this.filterOptions(),!this.open){this.open=!0;break}this.filteredOptions.length>0&&super.keydownHandler(t),this.isAutocompleteInline&&this.setInlineSelection();break}default:return!0}}keyupHandler(t){switch(t.key){case"ArrowLeft":case"ArrowRight":case"Backspace":case"Delete":case"Home":case"End":{this.filter=this.control.value,this.selectedIndex=-1,this.filterOptions();break}}}selectedIndexChanged(t,e){if(this.$fastController.isConnected){if(e=Fs(-1,this.options.length-1,e),e!==this.selectedIndex){this.selectedIndex=e;return}super.selectedIndexChanged(t,e)}}selectPreviousOption(){!this.disabled&&this.selectedIndex>=0&&(this.selectedIndex=this.selectedIndex-1)}setDefaultSelectedOption(){if(this.$fastController.isConnected&&this.options){const t=this.options.findIndex(e=>e.getAttribute("selected")!==null||e.selected);this.selectedIndex=t,!this.dirtyValue&&this.firstSelectedOption&&(this.value=this.firstSelectedOption.text),this.setSelectedOptions()}}setInputToSelection(){this.firstSelectedOption&&(this.control.value=this.firstSelectedOption.text,this.control.focus())}setInlineSelection(){this.firstSelectedOption&&(this.setInputToSelection(),this.control.setSelectionRange(this.filter.length,this.control.value.length,"backward"))}syncValue(){var t;const e=this.selectedIndex>-1?(t=this.firstSelectedOption)===null||t===void 0?void 0:t.text:this.control.value;this.updateValue(this.value!==e)}setPositioning(){const t=this.getBoundingClientRect(),o=window.innerHeight-t.bottom;this.position=this.forcedPosition?this.positionAttribute:t.top>o?ai.above:ai.below,this.positionAttribute=this.forcedPosition?this.positionAttribute:this.position,this.maxHeight=this.position===ai.above?~~t.top:~~o}selectedOptionsChanged(t,e){this.$fastController.isConnected&&this._options.forEach(o=>{o.selected=e.includes(o)})}slottedOptionsChanged(t,e){super.slottedOptionsChanged(t,e),this.updateValue()}updateValue(t){var e;this.$fastController.isConnected&&(this.value=((e=this.firstSelectedOption)===null||e===void 0?void 0:e.text)||this.control.value,this.control.value=this.value),t&&this.$emit("change")}clearSelectionRange(){const t=this.control.value.length;this.control.setSelectionRange(t,t)}};r([d({attribute:"autocomplete",mode:"fromView"})],ve.prototype,"autocomplete",void 0);r([f],ve.prototype,"maxHeight",void 0);r([d({attribute:"open",mode:"boolean"})],ve.prototype,"open",void 0);r([d],ve.prototype,"placeholder",void 0);r([d({attribute:"position"})],ve.prototype,"positionAttribute",void 0);r([f],ve.prototype,"position",void 0);class wo{}r([f],wo.prototype,"ariaAutoComplete",void 0);r([f],wo.prototype,"ariaControls",void 0);tt(wo,Se);tt(ve,Lt,wo);const Dc=(i,t)=>b`
    <template
        aria-disabled="${e=>e.ariaDisabled}"
        autocomplete="${e=>e.autocomplete}"
        class="${e=>e.open?"open":""} ${e=>e.disabled?"disabled":""} ${e=>e.position}"
        ?open="${e=>e.open}"
        tabindex="${e=>e.disabled?null:"0"}"
        @click="${(e,o)=>e.clickHandler(o.event)}"
        @focusout="${(e,o)=>e.focusoutHandler(o.event)}"
        @keydown="${(e,o)=>e.keydownHandler(o.event)}"
    >
        <div class="control" part="control">
            ${Dt(i,t)}
            <slot name="control">
                <input
                    aria-activedescendant="${e=>e.open?e.ariaActiveDescendant:null}"
                    aria-autocomplete="${e=>e.ariaAutoComplete}"
                    aria-controls="${e=>e.ariaControls}"
                    aria-disabled="${e=>e.ariaDisabled}"
                    aria-expanded="${e=>e.ariaExpanded}"
                    aria-haspopup="listbox"
                    class="selected-value"
                    part="selected-value"
                    placeholder="${e=>e.placeholder}"
                    role="combobox"
                    type="text"
                    ?disabled="${e=>e.disabled}"
                    :value="${e=>e.value}"
                    @input="${(e,o)=>e.inputHandler(o.event)}"
                    @keyup="${(e,o)=>e.keyupHandler(o.event)}"
                    ${N("control")}
                />
                <div class="indicator" part="indicator" aria-hidden="true">
                    <slot name="indicator">
                        ${t.indicator||""}
                    </slot>
                </div>
            </slot>
            ${Ft(i,t)}
        </div>
        <div
            class="listbox"
            id="${e=>e.listboxId}"
            part="listbox"
            role="listbox"
            ?disabled="${e=>e.disabled}"
            ?hidden="${e=>!e.open}"
            ${N("listbox")}
        >
            <slot
                ${Z({filter:$t.slottedOptionFilter,flatten:!0,property:"slottedOptions"})}
            ></slot>
        </div>
    </template>
`;function Mi(i){const t=i.parentElement;if(t)return t;{const e=i.getRootNode();if(e.host instanceof HTMLElement)return e.host}return null}function Ec(i,t){let e=t;for(;e!==null;){if(e===i)return!0;e=Mi(e)}return!1}const ue=document.createElement("div");function Rc(i){return i instanceof mo}class Os{setProperty(t,e){S.queueUpdate(()=>this.target.setProperty(t,e))}removeProperty(t){S.queueUpdate(()=>this.target.removeProperty(t))}}class Oc extends Os{constructor(t){super();const e=new CSSStyleSheet;this.target=e.cssRules[e.insertRule(":host{}")].style,t.$fastController.addStyles(St.create([e]))}}class Lc extends Os{constructor(){super();const t=new CSSStyleSheet;this.target=t.cssRules[t.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,t]}}class Ac extends Os{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:t}=this.style;if(t){const e=t.insertRule(":root{}",t.cssRules.length);this.target=t.cssRules[e].style}}}class yr{constructor(t){this.store=new Map,this.target=null;const e=t.$fastController;this.style=document.createElement("style"),e.addStyles(this.style),R.getNotifier(e).subscribe(this,"isConnected"),this.handleChange(e,"isConnected")}targetChanged(){if(this.target!==null)for(const[t,e]of this.store.entries())this.target.setProperty(t,e)}setProperty(t,e){this.store.set(t,e),S.queueUpdate(()=>{this.target!==null&&this.target.setProperty(t,e)})}removeProperty(t){this.store.delete(t),S.queueUpdate(()=>{this.target!==null&&this.target.removeProperty(t)})}handleChange(t,e){const{sheet:o}=this.style;if(o){const s=o.insertRule(":host{}",o.cssRules.length);this.target=o.cssRules[s].style}else this.target=null}}r([f],yr.prototype,"target",void 0);class Pc{constructor(t){this.target=t.style}setProperty(t,e){S.queueUpdate(()=>this.target.setProperty(t,e))}removeProperty(t){S.queueUpdate(()=>this.target.removeProperty(t))}}class pt{setProperty(t,e){pt.properties[t]=e;for(const o of pt.roots.values())ni.getOrCreate(pt.normalizeRoot(o)).setProperty(t,e)}removeProperty(t){delete pt.properties[t];for(const e of pt.roots.values())ni.getOrCreate(pt.normalizeRoot(e)).removeProperty(t)}static registerRoot(t){const{roots:e}=pt;if(!e.has(t)){e.add(t);const o=ni.getOrCreate(this.normalizeRoot(t));for(const s in pt.properties)o.setProperty(s,pt.properties[s])}}static unregisterRoot(t){const{roots:e}=pt;if(e.has(t)){e.delete(t);const o=ni.getOrCreate(pt.normalizeRoot(t));for(const s in pt.properties)o.removeProperty(s)}}static normalizeRoot(t){return t===ue?document:t}}pt.roots=new Set;pt.properties={};const es=new WeakMap,Mc=S.supportsAdoptedStyleSheets?Oc:yr,ni=Object.freeze({getOrCreate(i){if(es.has(i))return es.get(i);let t;return i===ue?t=new pt:i instanceof Document?t=S.supportsAdoptedStyleSheets?new Lc:new Ac:Rc(i)?t=new Mc(i):t=new Pc(i),es.set(i,t),t}});class It extends Ss{constructor(t){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=t.name,t.cssCustomPropertyName!==null&&(this.cssCustomProperty=`--${t.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=It.uniqueId(),It.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(t){return new It({name:typeof t=="string"?t:t.name,cssCustomPropertyName:typeof t=="string"?t:t.cssCustomPropertyName===void 0?t.name:t.cssCustomPropertyName})}static isCSSDesignToken(t){return typeof t.cssCustomProperty=="string"}static isDerivedDesignTokenValue(t){return typeof t=="function"}static getTokenById(t){return It.tokensById.get(t)}getOrCreateSubscriberSet(t=this){return this.subscribers.get(t)||this.subscribers.set(t,new Set)&&this.subscribers.get(t)}createCSS(){return this.cssVar||""}getValueFor(t){const e=nt.getOrCreate(t).get(this);if(e!==void 0)return e;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${t} or an ancestor of ${t}.`)}setValueFor(t,e){return this._appliedTo.add(t),e instanceof It&&(e=this.alias(e)),nt.getOrCreate(t).set(this,e),this}deleteValueFor(t){return this._appliedTo.delete(t),nt.existsFor(t)&&nt.getOrCreate(t).delete(this),this}withDefault(t){return this.setValueFor(ue,t),this}subscribe(t,e){const o=this.getOrCreateSubscriberSet(e);e&&!nt.existsFor(e)&&nt.getOrCreate(e),o.has(t)||o.add(t)}unsubscribe(t,e){const o=this.subscribers.get(e||this);o&&o.has(t)&&o.delete(t)}notify(t){const e=Object.freeze({token:this,target:t});this.subscribers.has(this)&&this.subscribers.get(this).forEach(o=>o.handleChange(e)),this.subscribers.has(t)&&this.subscribers.get(t).forEach(o=>o.handleChange(e))}alias(t){return e=>t.getValueFor(e)}}It.uniqueId=(()=>{let i=0;return()=>(i++,i.toString(16))})();It.tokensById=new Map;class Vc{startReflection(t,e){t.subscribe(this,e),this.handleChange({token:t,target:e})}stopReflection(t,e){t.unsubscribe(this,e),this.remove(t,e)}handleChange(t){const{token:e,target:o}=t;this.add(e,o)}add(t,e){ni.getOrCreate(e).setProperty(t.cssCustomProperty,this.resolveCSSValue(nt.getOrCreate(e).get(t)))}remove(t,e){ni.getOrCreate(e).removeProperty(t.cssCustomProperty)}resolveCSSValue(t){return t&&typeof t.createCSS=="function"?t.createCSS():t}}class Hc{constructor(t,e,o){this.source=t,this.token=e,this.node=o,this.dependencies=new Set,this.observer=R.binding(t,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){this.node.store.set(this.token,this.observer.observe(this.node.target,Fi))}}class zc{constructor(){this.values=new Map}set(t,e){this.values.get(t)!==e&&(this.values.set(t,e),R.getNotifier(this).notify(t.id))}get(t){return R.track(this,t.id),this.values.get(t)}delete(t){this.values.delete(t)}all(){return this.values.entries()}}const ki=new WeakMap,Ci=new WeakMap;class nt{constructor(t){this.target=t,this.store=new zc,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(e,o)=>{const s=It.getTokenById(o);if(s&&(s.notify(this.target),It.isCSSDesignToken(s))){const n=this.parent,a=this.isReflecting(s);if(n){const l=n.get(s),h=e.get(s);l!==h&&!a?this.reflectToCSS(s):l===h&&a&&this.stopReflectToCSS(s)}else a||this.reflectToCSS(s)}}},ki.set(t,this),R.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),t instanceof mo?t.$fastController.addBehaviors([this]):t.isConnected&&this.bind()}static getOrCreate(t){return ki.get(t)||new nt(t)}static existsFor(t){return ki.has(t)}static findParent(t){if(ue!==t.target){let e=Mi(t.target);for(;e!==null;){if(ki.has(e))return ki.get(e);e=Mi(e)}return nt.getOrCreate(ue)}return null}static findClosestAssignedNode(t,e){let o=e;do{if(o.has(t))return o;o=o.parent?o.parent:o.target!==ue?nt.getOrCreate(ue):null}while(o!==null);return null}get parent(){return Ci.get(this)||null}has(t){return this.assignedValues.has(t)}get(t){const e=this.store.get(t);if(e!==void 0)return e;const o=this.getRaw(t);if(o!==void 0)return this.hydrate(t,o),this.get(t)}getRaw(t){var e;return this.assignedValues.has(t)?this.assignedValues.get(t):(e=nt.findClosestAssignedNode(t,this))===null||e===void 0?void 0:e.getRaw(t)}set(t,e){It.isDerivedDesignTokenValue(this.assignedValues.get(t))&&this.tearDownBindingObserver(t),this.assignedValues.set(t,e),It.isDerivedDesignTokenValue(e)?this.setupBindingObserver(t,e):this.store.set(t,e)}delete(t){this.assignedValues.delete(t),this.tearDownBindingObserver(t);const e=this.getRaw(t);e?this.hydrate(t,e):this.store.delete(t)}bind(){const t=nt.findParent(this);t&&t.appendChild(this);for(const e of this.assignedValues.keys())e.notify(this.target)}unbind(){this.parent&&Ci.get(this).removeChild(this)}appendChild(t){t.parent&&Ci.get(t).removeChild(t);const e=this.children.filter(o=>t.contains(o));Ci.set(t,this),this.children.push(t),e.forEach(o=>t.appendChild(o)),R.getNotifier(this.store).subscribe(t);for(const[o,s]of this.store.all())t.hydrate(o,this.bindingObservers.has(o)?this.getRaw(o):s)}removeChild(t){const e=this.children.indexOf(t);return e!==-1&&this.children.splice(e,1),R.getNotifier(this.store).unsubscribe(t),t.parent===this?Ci.delete(t):!1}contains(t){return Ec(this.target,t.target)}reflectToCSS(t){this.isReflecting(t)||(this.reflecting.add(t),nt.cssCustomPropertyReflector.startReflection(t,this.target))}stopReflectToCSS(t){this.isReflecting(t)&&(this.reflecting.delete(t),nt.cssCustomPropertyReflector.stopReflection(t,this.target))}isReflecting(t){return this.reflecting.has(t)}handleChange(t,e){const o=It.getTokenById(e);o&&this.hydrate(o,this.getRaw(o))}hydrate(t,e){if(!this.has(t)){const o=this.bindingObservers.get(t);It.isDerivedDesignTokenValue(e)?o?o.source!==e&&(this.tearDownBindingObserver(t),this.setupBindingObserver(t,e)):this.setupBindingObserver(t,e):(o&&this.tearDownBindingObserver(t),this.store.set(t,e))}}setupBindingObserver(t,e){const o=new Hc(e,t,this);return this.bindingObservers.set(t,o),o}tearDownBindingObserver(t){return this.bindingObservers.has(t)?(this.bindingObservers.get(t).disconnect(),this.bindingObservers.delete(t),!0):!1}}nt.cssCustomPropertyReflector=new Vc;r([f],nt.prototype,"children",void 0);function Bc(i){return It.from(i)}const Fe=Object.freeze({create:Bc,notifyConnection(i){return!i.isConnected||!nt.existsFor(i)?!1:(nt.getOrCreate(i).bind(),!0)},notifyDisconnection(i){return i.isConnected||!nt.existsFor(i)?!1:(nt.getOrCreate(i).unbind(),!0)},registerRoot(i=ue){pt.registerRoot(i)},unregisterRoot(i=ue){pt.unregisterRoot(i)}}),is=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),os=new Map,oo=new Map;let li=null;const Ii=et.createInterface(i=>i.cachedCallback(t=>(li===null&&(li=new $r(null,t)),li))),xr=Object.freeze({tagFor(i){return oo.get(i)},responsibleFor(i){const t=i.$$designSystem$$;return t||et.findResponsibleContainer(i).get(Ii)},getOrCreate(i){if(!i)return li===null&&(li=et.getOrCreateDOMContainer().get(Ii)),li;const t=i.$$designSystem$$;if(t)return t;const e=et.getOrCreateDOMContainer(i);if(e.has(Ii,!1))return e.get(Ii);{const o=new $r(i,e);return e.register(Ai.instance(Ii,o)),o}}});function Nc(i,t,e){return typeof i=="string"?{name:i,type:t,callback:e}:i}class $r{constructor(t,e){this.owner=t,this.container=e,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>is.definitionCallbackOnly,t!==null&&(t.$$designSystem$$=this)}withPrefix(t){return this.prefix=t,this}withShadowRootMode(t){return this.shadowRootMode=t,this}withElementDisambiguation(t){return this.disambiguate=t,this}withDesignTokenRoot(t){return this.designTokenRoot=t,this}register(...t){const e=this.container,o=[],s=this.disambiguate,n=this.shadowRootMode,a={elementPrefix:this.prefix,tryDefineElement(l,h,u){const p=Nc(l,h,u),{name:g,callback:y,baseClass:E}=p;let{type:M}=p,V=g,U=os.get(V),Nt=!0;for(;U;){const Ct=s(V,M,U);switch(Ct){case is.ignoreDuplicate:return;case is.definitionCallbackOnly:Nt=!1,U=void 0;break;default:V=Ct,U=os.get(V);break}}Nt&&((oo.has(M)||M===D)&&(M=class extends M{}),os.set(V,M),oo.set(M,V),E&&oo.set(E,V)),o.push(new jc(e,V,M,n,y,Nt))}};this.designTokensInitialized||(this.designTokensInitialized=!0,this.designTokenRoot!==null&&Fe.registerRoot(this.designTokenRoot)),e.registerWithContext(a,...t);for(const l of o)l.callback(l),l.willDefine&&l.definition!==null&&l.definition.define();return this}}class jc{constructor(t,e,o,s,n,a){this.container=t,this.name=e,this.type=o,this.shadowRootMode=s,this.callback=n,this.willDefine=a,this.definition=null}definePresentation(t){hr.define(this.name,t,this.container)}defineElement(t){this.definition=new go(this.type,Object.assign(Object.assign({},t),{name:this.name}))}tagFor(t){return xr.tagFor(t)}}const _c=(i,t)=>b`
    <div class="positioning-region" part="positioning-region">
        ${G(e=>e.modal,b`
                <div
                    class="overlay"
                    part="overlay"
                    role="presentation"
                    @click="${e=>e.dismiss()}"
                ></div>
            `)}
        <div
            role="dialog"
            tabindex="-1"
            class="control"
            part="control"
            aria-modal="${e=>e.modal}"
            aria-describedby="${e=>e.ariaDescribedby}"
            aria-labelledby="${e=>e.ariaLabelledby}"
            aria-label="${e=>e.ariaLabel}"
            ${N("dialog")}
        >
            <slot></slot>
        </div>
    </div>
`;/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var wr=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],qc=wr.join(","),kr=typeof Element>"u",Vi=kr?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,hs=!kr&&Element.prototype.getRootNode?function(i){return i.getRootNode()}:function(i){return i.ownerDocument},Uc=function(t,e){return t.tabIndex<0&&(e||/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName)||t.isContentEditable)&&isNaN(parseInt(t.getAttribute("tabindex"),10))?0:t.tabIndex},Cr=function(t){return t.tagName==="INPUT"},Gc=function(t){return Cr(t)&&t.type==="hidden"},Wc=function(t){var e=t.tagName==="DETAILS"&&Array.prototype.slice.apply(t.children).some(function(o){return o.tagName==="SUMMARY"});return e},Xc=function(t,e){for(var o=0;o<t.length;o++)if(t[o].checked&&t[o].form===e)return t[o]},Yc=function(t){if(!t.name)return!0;var e=t.form||hs(t),o=function(l){return e.querySelectorAll('input[type="radio"][name="'+l+'"]')},s;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")s=o(window.CSS.escape(t.name));else try{s=o(t.name)}catch(a){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",a.message),!1}var n=Xc(s,t.form);return!n||n===t},Qc=function(t){return Cr(t)&&t.type==="radio"},Zc=function(t){return Qc(t)&&!Yc(t)},Tn=function(t){var e=t.getBoundingClientRect(),o=e.width,s=e.height;return o===0&&s===0},Jc=function(t,e){var o=e.displayCheck,s=e.getShadowRoot;if(getComputedStyle(t).visibility==="hidden")return!0;var n=Vi.call(t,"details>summary:first-of-type"),a=n?t.parentElement:t;if(Vi.call(a,"details:not([open]) *"))return!0;var l=hs(t).host,h=(l==null?void 0:l.ownerDocument.contains(l))||t.ownerDocument.contains(t);if(!o||o==="full"){if(typeof s=="function"){for(var u=t;t;){var p=t.parentElement,g=hs(t);if(p&&!p.shadowRoot&&s(p)===!0)return Tn(t);t.assignedSlot?t=t.assignedSlot:!p&&g!==t.ownerDocument?t=g.host:t=p}t=u}if(h)return!t.getClientRects().length}else if(o==="non-zero-area")return Tn(t);return!1},Kc=function(t){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))for(var e=t.parentElement;e;){if(e.tagName==="FIELDSET"&&e.disabled){for(var o=0;o<e.children.length;o++){var s=e.children.item(o);if(s.tagName==="LEGEND")return Vi.call(e,"fieldset[disabled] *")?!0:!s.contains(t)}return!0}e=e.parentElement}return!1},Ir=function(t,e){return!(e.disabled||Gc(e)||Jc(e,t)||Wc(e)||Kc(e))},th=function(t,e){return!(Zc(e)||Uc(e)<0||!Ir(t,e))},Sn=function(t,e){if(e=e||{},!t)throw new Error("No node provided");return Vi.call(t,qc)===!1?!1:th(e,t)},eh=wr.concat("iframe").join(","),Fn=function(t,e){if(e=e||{},!t)throw new Error("No node provided");return Vi.call(t,eh)===!1?!1:Ir(e,t)};class qt extends D{constructor(){super(...arguments),this.modal=!0,this.hidden=!1,this.trapFocus=!0,this.trapFocusChanged=()=>{this.$fastController.isConnected&&this.updateTrapFocus()},this.isTrappingFocus=!1,this.handleDocumentKeydown=t=>{if(!t.defaultPrevented&&!this.hidden)switch(t.key){case Ne:this.dismiss(),t.preventDefault();break;case vo:this.handleTabKeyDown(t);break}},this.handleDocumentFocus=t=>{!t.defaultPrevented&&this.shouldForceFocus(t.target)&&(this.focusFirstElement(),t.preventDefault())},this.handleTabKeyDown=t=>{if(!this.trapFocus||this.hidden)return;const e=this.getTabQueueBounds();if(e.length!==0){if(e.length===1){e[0].focus(),t.preventDefault();return}t.shiftKey&&t.target===e[0]?(e[e.length-1].focus(),t.preventDefault()):!t.shiftKey&&t.target===e[e.length-1]&&(e[0].focus(),t.preventDefault())}},this.getTabQueueBounds=()=>{const t=[];return qt.reduceTabbableItems(t,this)},this.focusFirstElement=()=>{const t=this.getTabQueueBounds();t.length>0?t[0].focus():this.dialog instanceof HTMLElement&&this.dialog.focus()},this.shouldForceFocus=t=>this.isTrappingFocus&&!this.contains(t),this.shouldTrapFocus=()=>this.trapFocus&&!this.hidden,this.updateTrapFocus=t=>{const e=t===void 0?this.shouldTrapFocus():t;e&&!this.isTrappingFocus?(this.isTrappingFocus=!0,document.addEventListener("focusin",this.handleDocumentFocus),S.queueUpdate(()=>{this.shouldForceFocus(document.activeElement)&&this.focusFirstElement()})):!e&&this.isTrappingFocus&&(this.isTrappingFocus=!1,document.removeEventListener("focusin",this.handleDocumentFocus))}}dismiss(){this.$emit("dismiss"),this.$emit("cancel")}show(){this.hidden=!1}hide(){this.hidden=!0,this.$emit("close")}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleDocumentKeydown),this.notifier=R.getNotifier(this),this.notifier.subscribe(this,"hidden"),this.updateTrapFocus()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeydown),this.updateTrapFocus(!1),this.notifier.unsubscribe(this,"hidden")}handleChange(t,e){switch(e){case"hidden":this.updateTrapFocus();break}}static reduceTabbableItems(t,e){return e.getAttribute("tabindex")==="-1"?t:Sn(e)||qt.isFocusableFastElement(e)&&qt.hasTabbableShadow(e)?(t.push(e),t):e.childElementCount?t.concat(Array.from(e.children).reduce(qt.reduceTabbableItems,[])):t}static isFocusableFastElement(t){var e,o;return!!(!((o=(e=t.$fastController)===null||e===void 0?void 0:e.definition.shadowOptions)===null||o===void 0)&&o.delegatesFocus)}static hasTabbableShadow(t){var e,o;return Array.from((o=(e=t.shadowRoot)===null||e===void 0?void 0:e.querySelectorAll("*"))!==null&&o!==void 0?o:[]).some(s=>Sn(s))}}r([d({mode:"boolean"})],qt.prototype,"modal",void 0);r([d({mode:"boolean"})],qt.prototype,"hidden",void 0);r([d({attribute:"trap-focus",mode:"boolean"})],qt.prototype,"trapFocus",void 0);r([d({attribute:"aria-describedby"})],qt.prototype,"ariaDescribedby",void 0);r([d({attribute:"aria-labelledby"})],qt.prototype,"ariaLabelledby",void 0);r([d({attribute:"aria-label"})],qt.prototype,"ariaLabel",void 0);const ih=(i,t)=>b`
    <details class="disclosure" ${N("details")}>
        <summary
            class="invoker"
            role="button"
            aria-controls="disclosure-content"
            aria-expanded="${e=>e.expanded}"
        >
            <slot name="start"></slot>
            <slot name="title">${e=>e.title}</slot>
            <slot name="end"></slot>
        </summary>
        <div id="disclosure-content"><slot></slot></div>
    </details>
`;let ko=class extends D{connectedCallback(){super.connectedCallback(),this.setup()}disconnectedCallback(){super.disconnectedCallback(),this.details.removeEventListener("toggle",this.onToggle)}show(){this.details.open=!0}hide(){this.details.open=!1}toggle(){this.details.open=!this.details.open}setup(){this.onToggle=this.onToggle.bind(this),this.details.addEventListener("toggle",this.onToggle),this.expanded&&this.show()}onToggle(){this.expanded=this.details.open,this.$emit("toggle")}};r([d({mode:"boolean"})],ko.prototype,"expanded",void 0);r([d],ko.prototype,"title",void 0);const oh=(i,t)=>b`
    <template role="${e=>e.role}" aria-orientation="${e=>e.orientation}"></template>
`,sh={separator:"separator",presentation:"presentation"};class Ls extends D{constructor(){super(...arguments),this.role=sh.separator,this.orientation=it.horizontal}}r([d],Ls.prototype,"role",void 0);r([d],Ls.prototype,"orientation",void 0);const ds={next:"next",previous:"previous"},nh=(i,t)=>b`
    <template
        role="button"
        aria-disabled="${e=>e.disabled?!0:void 0}"
        tabindex="${e=>e.hiddenFromAT?-1:0}"
        class="${e=>e.direction} ${e=>e.disabled?"disabled":""}"
        @keyup="${(e,o)=>e.keyupHandler(o.event)}"
    >
        ${G(e=>e.direction===ds.next,b`
                <span part="next" class="next">
                    <slot name="next">
                        ${t.next||""}
                    </slot>
                </span>
            `)}
        ${G(e=>e.direction===ds.previous,b`
                <span part="previous" class="previous">
                    <slot name="previous">
                        ${t.previous||""}
                    </slot>
                </span>
            `)}
    </template>
`;class Ie extends D{constructor(){super(...arguments),this.hiddenFromAT=!0,this.direction=ds.next}keyupHandler(t){if(!this.hiddenFromAT){const e=t.key;(e==="Enter"||e==="Space")&&this.$emit("click",t),e==="Escape"&&this.blur()}}}r([d({mode:"boolean"})],Ie.prototype,"disabled",void 0);r([d({attribute:"aria-hidden",converter:fo})],Ie.prototype,"hiddenFromAT",void 0);r([d],Ie.prototype,"direction",void 0);const rh=(i,t)=>b`
    <template
        aria-checked="${e=>e.ariaChecked}"
        aria-disabled="${e=>e.ariaDisabled}"
        aria-posinset="${e=>e.ariaPosInSet}"
        aria-selected="${e=>e.ariaSelected}"
        aria-setsize="${e=>e.ariaSetSize}"
        class="${e=>[e.checked&&"checked",e.selected&&"selected",e.disabled&&"disabled"].filter(Boolean).join(" ")}"
        role="option"
    >
        ${Dt(i,t)}
        <span class="content" part="content">
            <slot ${Z("content")}></slot>
        </span>
        ${Ft(i,t)}
    </template>
`;class De extends $t{constructor(){super(...arguments),this.activeIndex=-1,this.rangeStartIndex=-1}get activeOption(){return this.options[this.activeIndex]}get checkedOptions(){var t;return(t=this.options)===null||t===void 0?void 0:t.filter(e=>e.checked)}get firstSelectedOptionIndex(){return this.options.indexOf(this.firstSelectedOption)}activeIndexChanged(t,e){var o,s;this.ariaActiveDescendant=(s=(o=this.options[e])===null||o===void 0?void 0:o.id)!==null&&s!==void 0?s:"",this.focusAndScrollOptionIntoView()}checkActiveIndex(){if(!this.multiple)return;const t=this.activeOption;t&&(t.checked=!0)}checkFirstOption(t=!1){t?(this.rangeStartIndex===-1&&(this.rangeStartIndex=this.activeIndex+1),this.options.forEach((e,o)=>{e.checked=Ji(o,this.rangeStartIndex)})):this.uncheckAllOptions(),this.activeIndex=0,this.checkActiveIndex()}checkLastOption(t=!1){t?(this.rangeStartIndex===-1&&(this.rangeStartIndex=this.activeIndex),this.options.forEach((e,o)=>{e.checked=Ji(o,this.rangeStartIndex,this.options.length)})):this.uncheckAllOptions(),this.activeIndex=this.options.length-1,this.checkActiveIndex()}connectedCallback(){super.connectedCallback(),this.addEventListener("focusout",this.focusoutHandler)}disconnectedCallback(){this.removeEventListener("focusout",this.focusoutHandler),super.disconnectedCallback()}checkNextOption(t=!1){t?(this.rangeStartIndex===-1&&(this.rangeStartIndex=this.activeIndex),this.options.forEach((e,o)=>{e.checked=Ji(o,this.rangeStartIndex,this.activeIndex+1)})):this.uncheckAllOptions(),this.activeIndex+=this.activeIndex<this.options.length-1?1:0,this.checkActiveIndex()}checkPreviousOption(t=!1){t?(this.rangeStartIndex===-1&&(this.rangeStartIndex=this.activeIndex),this.checkedOptions.length===1&&(this.rangeStartIndex+=1),this.options.forEach((e,o)=>{e.checked=Ji(o,this.activeIndex,this.rangeStartIndex)})):this.uncheckAllOptions(),this.activeIndex-=this.activeIndex>0?1:0,this.checkActiveIndex()}clickHandler(t){var e;if(!this.multiple)return super.clickHandler(t);const o=(e=t.target)===null||e===void 0?void 0:e.closest("[role=option]");if(!(!o||o.disabled))return this.uncheckAllOptions(),this.activeIndex=this.options.indexOf(o),this.checkActiveIndex(),this.toggleSelectedForAllCheckedOptions(),!0}focusAndScrollOptionIntoView(){super.focusAndScrollOptionIntoView(this.activeOption)}focusinHandler(t){if(!this.multiple)return super.focusinHandler(t);!this.shouldSkipFocus&&t.target===t.currentTarget&&(this.uncheckAllOptions(),this.activeIndex===-1&&(this.activeIndex=this.firstSelectedOptionIndex!==-1?this.firstSelectedOptionIndex:0),this.checkActiveIndex(),this.setSelectedOptions(),this.focusAndScrollOptionIntoView()),this.shouldSkipFocus=!1}focusoutHandler(t){this.multiple&&this.uncheckAllOptions()}keydownHandler(t){if(!this.multiple)return super.keydownHandler(t);if(this.disabled)return!0;const{key:e,shiftKey:o}=t;switch(this.shouldSkipFocus=!1,e){case ne:{this.checkFirstOption(o);return}case Vt:{this.checkNextOption(o);return}case Ht:{this.checkPreviousOption(o);return}case re:{this.checkLastOption(o);return}case vo:return this.focusAndScrollOptionIntoView(),!0;case Ne:return this.uncheckAllOptions(),this.checkActiveIndex(),!0;case je:if(t.preventDefault(),this.typeAheadExpired){this.toggleSelectedForAllCheckedOptions();return}default:return e.length===1&&this.handleTypeAhead(`${e}`),!0}}mousedownHandler(t){if(t.offsetX>=0&&t.offsetX<=this.scrollWidth)return super.mousedownHandler(t)}multipleChanged(t,e){var o;this.ariaMultiSelectable=e?"true":null,(o=this.options)===null||o===void 0||o.forEach(s=>{s.checked=e?!1:void 0}),this.setSelectedOptions()}setSelectedOptions(){if(!this.multiple){super.setSelectedOptions();return}this.$fastController.isConnected&&this.options&&(this.selectedOptions=this.options.filter(t=>t.selected),this.focusAndScrollOptionIntoView())}sizeChanged(t,e){var o;const s=Math.max(0,parseInt((o=e==null?void 0:e.toFixed())!==null&&o!==void 0?o:"",10));s!==e&&S.queueUpdate(()=>{this.size=s})}toggleSelectedForAllCheckedOptions(){const t=this.checkedOptions.filter(o=>!o.disabled),e=!t.every(o=>o.selected);t.forEach(o=>o.selected=e),this.selectedIndex=this.options.indexOf(t[t.length-1]),this.setSelectedOptions()}typeaheadBufferChanged(t,e){if(!this.multiple){super.typeaheadBufferChanged(t,e);return}if(this.$fastController.isConnected){const o=this.getTypeaheadMatches(),s=this.options.indexOf(o[0]);s>-1&&(this.activeIndex=s,this.uncheckAllOptions(),this.checkActiveIndex()),this.typeAheadExpired=!1}}uncheckAllOptions(t=!1){this.options.forEach(e=>e.checked=this.multiple?!1:void 0),t||(this.rangeStartIndex=-1)}}r([f],De.prototype,"activeIndex",void 0);r([d({mode:"boolean"})],De.prototype,"multiple",void 0);r([d({converter:w})],De.prototype,"size",void 0);const ah=(i,t)=>b`
    <template
        aria-activedescendant="${e=>e.ariaActiveDescendant}"
        aria-multiselectable="${e=>e.ariaMultiSelectable}"
        class="listbox"
        role="listbox"
        tabindex="${e=>e.disabled?null:"0"}"
        @click="${(e,o)=>e.clickHandler(o.event)}"
        @focusin="${(e,o)=>e.focusinHandler(o.event)}"
        @keydown="${(e,o)=>e.keydownHandler(o.event)}"
        @mousedown="${(e,o)=>e.mousedownHandler(o.event)}"
    >
        <slot
            ${Z({filter:De.slottedOptionFilter,flatten:!0,property:"slottedOptions"})}
        ></slot>
    </template>
`;let qe=class extends D{constructor(){super(...arguments),this.optionElements=[]}menuElementsChanged(){this.updateOptions()}headerElementsChanged(){this.updateOptions()}footerElementsChanged(){this.updateOptions()}updateOptions(){this.optionElements.splice(0,this.optionElements.length),this.addSlottedListItems(this.headerElements),this.addSlottedListItems(this.menuElements),this.addSlottedListItems(this.footerElements),this.$emit("optionsupdated",{bubbles:!1})}addSlottedListItems(t){t!==void 0&&t.forEach(e=>{e.nodeType===1&&e.getAttribute("role")==="listitem"&&(e.id=e.id||Ve("option-"),this.optionElements.push(e))})}};r([f],qe.prototype,"menuElements",void 0);r([f],qe.prototype,"headerElements",void 0);r([f],qe.prototype,"footerElements",void 0);r([f],qe.prototype,"suggestionsAvailableText",void 0);const lh=b`
    <template>
        ${i=>i.value}
    </template>
`;class _i extends D{contentsTemplateChanged(){this.$fastController.isConnected&&this.updateView()}connectedCallback(){super.connectedCallback(),this.updateView()}disconnectedCallback(){super.disconnectedCallback(),this.disconnectView()}handleClick(t){return t.defaultPrevented||this.handleInvoked(),!1}handleInvoked(){this.$emit("pickeroptioninvoked")}updateView(){var t,e;this.disconnectView(),this.customView=(e=(t=this.contentsTemplate)===null||t===void 0?void 0:t.render(this,this))!==null&&e!==void 0?e:lh.render(this,this)}disconnectView(){var t;(t=this.customView)===null||t===void 0||t.dispose(),this.customView=void 0}}r([d({attribute:"value"})],_i.prototype,"value",void 0);r([f],_i.prototype,"contentsTemplate",void 0);class us extends D{}const ch=b`
    <template>
        ${i=>i.value}
    </template>
`;class qi extends D{contentsTemplateChanged(){this.$fastController.isConnected&&this.updateView()}connectedCallback(){super.connectedCallback(),this.updateView()}disconnectedCallback(){this.disconnectView(),super.disconnectedCallback()}handleKeyDown(t){return t.defaultPrevented?!1:t.key===Jt?(this.handleInvoke(),!1):!0}handleClick(t){return t.defaultPrevented||this.handleInvoke(),!1}handleInvoke(){this.$emit("pickeriteminvoked")}updateView(){var t,e;this.disconnectView(),this.customView=(e=(t=this.contentsTemplate)===null||t===void 0?void 0:t.render(this,this))!==null&&e!==void 0?e:ch.render(this,this)}disconnectView(){var t;(t=this.customView)===null||t===void 0||t.dispose(),this.customView=void 0}}r([d({attribute:"value"})],qi.prototype,"value",void 0);r([f],qi.prototype,"contentsTemplate",void 0);function hh(i){const t=i.tagFor(qi);return b`
    <${t}
        value="${e=>e}"
        :contentsTemplate="${(e,o)=>o.parent.listItemContentsTemplate}"
    >
    </${t}>
    `}function dh(i){const t=i.tagFor(_i);return b`
    <${t}
        value="${e=>e}"
        :contentsTemplate="${(e,o)=>o.parent.menuOptionContentsTemplate}"
    >
    </${t}>
    `}const uh=(i,t)=>{const e=i.tagFor(j),o=i.tagFor(qe),s=i.tagFor(us),n=i.tagFor(us),a=hh(i),l=dh(i);return b`
        <template
            :selectedListTag="${()=>s}"
            :menuTag="${()=>o}"
            :defaultListItemTemplate="${a}"
            :defaultMenuOptionTemplate="${l}"
            @focusin="${(h,u)=>h.handleFocusIn(u.event)}"
            @focusout="${(h,u)=>h.handleFocusOut(u.event)}"
            @keydown="${(h,u)=>h.handleKeyDown(u.event)}"
            @pickeriteminvoked="${(h,u)=>h.handleItemInvoke(u.event)}"
            @pickeroptioninvoked="${(h,u)=>h.handleOptionInvoke(u.event)}"
        >
            <slot name="list-region"></slot>

            ${G(h=>h.flyoutOpen,b`
                <${e}
                    class="region"
                    part="region"
                    auto-update-mode="${h=>h.menuConfig.autoUpdateMode}"
                    fixed-placement="${h=>h.menuConfig.fixedPlacement}"
                    vertical-positioning-mode="${h=>h.menuConfig.verticalPositioningMode}"
                    vertical-default-position="${h=>h.menuConfig.verticalDefaultPosition}"
                    vertical-scaling="${h=>h.menuConfig.verticalScaling}"
                    vertical-inset="${h=>h.menuConfig.verticalInset}"
                    vertical-viewport-lock="${h=>h.menuConfig.verticalViewportLock}"
                    horizontal-positioning-mode="${h=>h.menuConfig.horizontalPositioningMode}"
                    horizontal-default-position="${h=>h.menuConfig.horizontalDefaultPosition}"
                    horizontal-scaling="${h=>h.menuConfig.horizontalScaling}"
                    horizontal-inset="${h=>h.menuConfig.horizontalInset}"
                    horizontal-viewport-lock="${h=>h.menuConfig.horizontalViewportLock}"
                    @loaded="${(h,u)=>h.handleRegionLoaded(u.event)}"
                    ${N("region")}
                >
                    ${G(h=>!h.showNoOptions&&!h.showLoading,b`
                            <slot name="menu-region"></slot>
                        `)}
                    ${G(h=>h.showNoOptions&&!h.showLoading,b`
                            <div class="no-options-display" part="no-options-display">
                                <slot name="no-options-region">
                                    ${h=>h.noSuggestionsText}
                                </slot>
                            </div>
                        `)}
                    ${G(h=>h.showLoading,b`
                            <div class="loading-display" part="loading-display">
                                <slot name="loading-region">
                                    <${n}
                                        part="loading-progress"
                                        class="loading-progress
                                        slot="loading-region"
                                    ></${n}>
                                        ${h=>h.loadingText}
                                </slot>
                            </div>
                        `)}
                </${e}>
            `)}
        </template>
    `};class ph extends D{}class fh extends ae(ph){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const gh=b`
    <input
        slot="input-region"
        role="combobox"
        type="text"
        autocapitalize="off"
        autocomplete="off"
        haspopup="list"
        aria-label="${i=>i.label}"
        aria-labelledby="${i=>i.labelledBy}"
        placeholder="${i=>i.placeholder}"
        ${N("inputElement")}
    ></input>
`;class q extends fh{constructor(){super(...arguments),this.selection="",this.filterSelected=!0,this.filterQuery=!0,this.noSuggestionsText="No suggestions available",this.suggestionsAvailableText="Suggestions available",this.loadingText="Loading suggestions",this.menuPlacement="bottom-fill",this.showLoading=!1,this.optionsList=[],this.filteredOptionsList=[],this.flyoutOpen=!1,this.menuFocusIndex=-1,this.showNoOptions=!1,this.selectedItems=[],this.inputElementView=null,this.handleTextInput=t=>{this.query=this.inputElement.value},this.handleInputClick=t=>{t.preventDefault(),this.toggleFlyout(!0)},this.setRegionProps=()=>{if(this.flyoutOpen){if(this.region===null||this.region===void 0){S.queueUpdate(this.setRegionProps);return}this.region.anchorElement=this.inputElement}},this.configLookup={top:pr,bottom:fr,tallest:gr,"top-fill":Jl,"bottom-fill":$n,"tallest-fill":Kl}}selectionChanged(){this.$fastController.isConnected&&(this.handleSelectionChange(),this.proxy instanceof HTMLInputElement&&(this.proxy.value=this.selection,this.validate()))}optionsChanged(){this.optionsList=this.options.split(",").map(t=>t.trim()).filter(t=>t!=="")}menuPlacementChanged(){this.$fastController.isConnected&&this.updateMenuConfig()}showLoadingChanged(){this.$fastController.isConnected&&S.queueUpdate(()=>{this.setFocusedOption(0)})}listItemTemplateChanged(){this.updateListItemTemplate()}defaultListItemTemplateChanged(){this.updateListItemTemplate()}menuOptionTemplateChanged(){this.updateOptionTemplate()}defaultMenuOptionTemplateChanged(){this.updateOptionTemplate()}optionsListChanged(){this.updateFilteredOptions()}queryChanged(){this.$fastController.isConnected&&(this.inputElement.value!==this.query&&(this.inputElement.value=this.query),this.updateFilteredOptions(),this.$emit("querychange",{bubbles:!1}))}filteredOptionsListChanged(){this.$fastController.isConnected&&(this.showNoOptions=this.filteredOptionsList.length===0&&this.menuElement.querySelectorAll('[role="listitem"]').length===0,this.setFocusedOption(this.showNoOptions?-1:0))}flyoutOpenChanged(){this.flyoutOpen?(S.queueUpdate(this.setRegionProps),this.$emit("menuopening",{bubbles:!1})):this.$emit("menuclosing",{bubbles:!1})}showNoOptionsChanged(){this.$fastController.isConnected&&S.queueUpdate(()=>{this.setFocusedOption(0)})}connectedCallback(){super.connectedCallback(),this.listElement=document.createElement(this.selectedListTag),this.appendChild(this.listElement),this.itemsPlaceholderElement=document.createComment(""),this.listElement.append(this.itemsPlaceholderElement),this.inputElementView=gh.render(this,this.listElement);const t=this.menuTag.toUpperCase();this.menuElement=Array.from(this.children).find(e=>e.tagName===t),this.menuElement===void 0&&(this.menuElement=document.createElement(this.menuTag),this.appendChild(this.menuElement)),this.menuElement.id===""&&(this.menuElement.id=Ve("listbox-")),this.menuId=this.menuElement.id,this.optionsPlaceholder=document.createComment(""),this.menuElement.append(this.optionsPlaceholder),this.updateMenuConfig(),S.queueUpdate(()=>this.initialize())}disconnectedCallback(){super.disconnectedCallback(),this.toggleFlyout(!1),this.inputElement.removeEventListener("input",this.handleTextInput),this.inputElement.removeEventListener("click",this.handleInputClick),this.inputElementView!==null&&(this.inputElementView.dispose(),this.inputElementView=null)}focus(){this.inputElement.focus()}initialize(){this.updateListItemTemplate(),this.updateOptionTemplate(),this.itemsRepeatBehavior=new Li(t=>t.selectedItems,t=>t.activeListItemTemplate,{positioning:!0}).createBehavior(this.itemsPlaceholderElement),this.inputElement.addEventListener("input",this.handleTextInput),this.inputElement.addEventListener("click",this.handleInputClick),this.$fastController.addBehaviors([this.itemsRepeatBehavior]),this.menuElement.suggestionsAvailableText=this.suggestionsAvailableText,this.menuElement.addEventListener("optionsupdated",this.handleMenuOptionsUpdated),this.optionsRepeatBehavior=new Li(t=>t.filteredOptionsList,t=>t.activeMenuOptionTemplate,{positioning:!0}).createBehavior(this.optionsPlaceholder),this.$fastController.addBehaviors([this.optionsRepeatBehavior]),this.handleSelectionChange()}toggleFlyout(t){if(this.flyoutOpen!==t){if(t&&document.activeElement===this.inputElement){this.flyoutOpen=t,S.queueUpdate(()=>{this.menuElement!==void 0?this.setFocusedOption(0):this.disableMenu()});return}this.flyoutOpen=!1,this.disableMenu()}}handleMenuOptionsUpdated(t){t.preventDefault(),this.flyoutOpen&&this.setFocusedOption(0)}handleKeyDown(t){if(t.defaultPrevented)return!1;switch(t.key){case Vt:{if(!this.flyoutOpen)this.toggleFlyout(!0);else{const e=this.flyoutOpen?Math.min(this.menuFocusIndex+1,this.menuElement.optionElements.length-1):0;this.setFocusedOption(e)}return!1}case Ht:{if(!this.flyoutOpen)this.toggleFlyout(!0);else{const e=this.flyoutOpen?Math.max(this.menuFocusIndex-1,0):0;this.setFocusedOption(e)}return!1}case Ne:return this.toggleFlyout(!1),!1;case Jt:return this.menuFocusIndex!==-1&&this.menuElement.optionElements.length>this.menuFocusIndex&&this.menuElement.optionElements[this.menuFocusIndex].click(),!1;case me:return document.activeElement!==this.inputElement?(this.incrementFocusedItem(1),!1):!0;case ge:return this.inputElement.selectionStart===0?(this.incrementFocusedItem(-1),!1):!0;case Xl:case Wl:{if(document.activeElement===null)return!0;if(document.activeElement===this.inputElement)return this.inputElement.selectionStart===0?(this.selection=this.selectedItems.slice(0,this.selectedItems.length-1).toString(),this.toggleFlyout(!1),!1):!0;const e=Array.from(this.listElement.children),o=e.indexOf(document.activeElement);return o>-1?(this.selection=this.selectedItems.splice(o,1).toString(),S.queueUpdate(()=>{e[Math.min(e.length,o)].focus()}),!1):!0}}return this.toggleFlyout(!0),!0}handleFocusIn(t){return!1}handleFocusOut(t){return(this.menuElement===void 0||!this.menuElement.contains(t.relatedTarget))&&this.toggleFlyout(!1),!1}handleSelectionChange(){this.selectedItems.toString()!==this.selection&&(this.selectedItems=this.selection===""?[]:this.selection.split(","),this.updateFilteredOptions(),S.queueUpdate(()=>{this.checkMaxItems()}),this.$emit("selectionchange",{bubbles:!1}))}handleRegionLoaded(t){S.queueUpdate(()=>{this.setFocusedOption(0),this.$emit("menuloaded",{bubbles:!1})})}checkMaxItems(){if(this.inputElement!==void 0)if(this.maxSelected!==void 0&&this.selectedItems.length>=this.maxSelected){if(document.activeElement===this.inputElement){const t=Array.from(this.listElement.querySelectorAll("[role='listitem']"));t[t.length-1].focus()}this.inputElement.hidden=!0}else this.inputElement.hidden=!1}handleItemInvoke(t){if(t.defaultPrevented)return!1;if(t.target instanceof qi){const o=Array.from(this.listElement.querySelectorAll("[role='listitem']")).indexOf(t.target);if(o!==-1){const s=this.selectedItems.slice();s.splice(o,1),this.selection=s.toString(),S.queueUpdate(()=>this.incrementFocusedItem(0))}return!1}return!0}handleOptionInvoke(t){return t.defaultPrevented?!1:t.target instanceof _i?(t.target.value!==void 0&&(this.selection=`${this.selection}${this.selection===""?"":","}${t.target.value}`),this.inputElement.value="",this.query="",this.inputElement.focus(),this.toggleFlyout(!1),!1):!0}incrementFocusedItem(t){if(this.selectedItems.length===0){this.inputElement.focus();return}const e=Array.from(this.listElement.querySelectorAll("[role='listitem']"));if(document.activeElement!==null){let o=e.indexOf(document.activeElement);o===-1&&(o=e.length);const s=Math.min(e.length,Math.max(0,o+t));s===e.length?this.maxSelected!==void 0&&this.selectedItems.length>=this.maxSelected?e[s-1].focus():this.inputElement.focus():e[s].focus()}}disableMenu(){var t,e,o;this.menuFocusIndex=-1,this.menuFocusOptionId=void 0,(t=this.inputElement)===null||t===void 0||t.removeAttribute("aria-activedescendant"),(e=this.inputElement)===null||e===void 0||e.removeAttribute("aria-owns"),(o=this.inputElement)===null||o===void 0||o.removeAttribute("aria-expanded")}setFocusedOption(t){if(!this.flyoutOpen||t===-1||this.showNoOptions||this.showLoading){this.disableMenu();return}if(this.menuElement.optionElements.length===0)return;this.menuElement.optionElements.forEach(o=>{o.setAttribute("aria-selected","false")}),this.menuFocusIndex=t,this.menuFocusIndex>this.menuElement.optionElements.length-1&&(this.menuFocusIndex=this.menuElement.optionElements.length-1),this.menuFocusOptionId=this.menuElement.optionElements[this.menuFocusIndex].id,this.inputElement.setAttribute("aria-owns",this.menuId),this.inputElement.setAttribute("aria-expanded","true"),this.inputElement.setAttribute("aria-activedescendant",this.menuFocusOptionId);const e=this.menuElement.optionElements[this.menuFocusIndex];e.setAttribute("aria-selected","true"),this.menuElement.scrollTo(0,e.offsetTop)}updateListItemTemplate(){var t;this.activeListItemTemplate=(t=this.listItemTemplate)!==null&&t!==void 0?t:this.defaultListItemTemplate}updateOptionTemplate(){var t;this.activeMenuOptionTemplate=(t=this.menuOptionTemplate)!==null&&t!==void 0?t:this.defaultMenuOptionTemplate}updateFilteredOptions(){this.filteredOptionsList=this.optionsList.slice(0),this.filterSelected&&(this.filteredOptionsList=this.filteredOptionsList.filter(t=>this.selectedItems.indexOf(t)===-1)),this.filterQuery&&this.query!==""&&this.query!==void 0&&(this.filteredOptionsList=this.filteredOptionsList.filter(t=>t.indexOf(this.query)!==-1))}updateMenuConfig(){let t=this.configLookup[this.menuPlacement];t===null&&(t=$n),this.menuConfig=Object.assign(Object.assign({},t),{autoUpdateMode:"auto",fixedPlacement:!0,horizontalViewportLock:!1,verticalViewportLock:!1})}}r([d({attribute:"selection"})],q.prototype,"selection",void 0);r([d({attribute:"options"})],q.prototype,"options",void 0);r([d({attribute:"filter-selected",mode:"boolean"})],q.prototype,"filterSelected",void 0);r([d({attribute:"filter-query",mode:"boolean"})],q.prototype,"filterQuery",void 0);r([d({attribute:"max-selected"})],q.prototype,"maxSelected",void 0);r([d({attribute:"no-suggestions-text"})],q.prototype,"noSuggestionsText",void 0);r([d({attribute:"suggestions-available-text"})],q.prototype,"suggestionsAvailableText",void 0);r([d({attribute:"loading-text"})],q.prototype,"loadingText",void 0);r([d({attribute:"label"})],q.prototype,"label",void 0);r([d({attribute:"labelledby"})],q.prototype,"labelledBy",void 0);r([d({attribute:"placeholder"})],q.prototype,"placeholder",void 0);r([d({attribute:"menu-placement"})],q.prototype,"menuPlacement",void 0);r([f],q.prototype,"showLoading",void 0);r([f],q.prototype,"listItemTemplate",void 0);r([f],q.prototype,"defaultListItemTemplate",void 0);r([f],q.prototype,"activeListItemTemplate",void 0);r([f],q.prototype,"menuOptionTemplate",void 0);r([f],q.prototype,"defaultMenuOptionTemplate",void 0);r([f],q.prototype,"activeMenuOptionTemplate",void 0);r([f],q.prototype,"listItemContentsTemplate",void 0);r([f],q.prototype,"menuOptionContentsTemplate",void 0);r([f],q.prototype,"optionsList",void 0);r([f],q.prototype,"query",void 0);r([f],q.prototype,"filteredOptionsList",void 0);r([f],q.prototype,"flyoutOpen",void 0);r([f],q.prototype,"menuId",void 0);r([f],q.prototype,"selectedListTag",void 0);r([f],q.prototype,"menuTag",void 0);r([f],q.prototype,"menuFocusIndex",void 0);r([f],q.prototype,"menuFocusOptionId",void 0);r([f],q.prototype,"showNoOptions",void 0);r([f],q.prototype,"menuConfig",void 0);r([f],q.prototype,"selectedItems",void 0);const mh=(i,t)=>b`
        <template role="list" slot="menu-region">
            <div class="options-display" part="options-display">
                <div class="header-region" part="header-region">
                    <slot name="header-region" ${Z("headerElements")}></slot>
                </div>

                <slot ${Z("menuElements")}></slot>
                <div class="footer-region" part="footer-region">
                    <slot name="footer-region" ${Z("footerElements")}></slot>
                </div>
                <div
                    role="alert"
                    aria-live="polite"
                    part="suggestions-available-alert"
                    class="suggestions-available-alert"
                >
                    ${e=>e.suggestionsAvailableText}
                </div>
            </div>
        </template>
    `,bh=(i,t)=>b`
        <template
            role="listitem"
            tabindex="-1"
            @click="${(e,o)=>e.handleClick(o.event)}"
        >
            <slot></slot>
        </template>
    `,vh=(i,t)=>b`
        <template slot="list-region" role="list" class="picker-list">
            <slot></slot>
            <slot name="input-region"></slot>
        </template>
    `,yh=(i,t)=>b`
        <template
            role="listitem"
            tabindex="0"
            @click="${(e,o)=>e.handleClick(o.event)}"
            @keydown="${(e,o)=>e.handleKeyDown(o.event)}"
        >
            <slot></slot>
        </template>
    `,Tt={menuitem:"menuitem",menuitemcheckbox:"menuitemcheckbox",menuitemradio:"menuitemradio"},xh={[Tt.menuitem]:"menuitem",[Tt.menuitemcheckbox]:"menuitemcheckbox",[Tt.menuitemradio]:"menuitemradio"};class Qt extends D{constructor(){super(...arguments),this.role=Tt.menuitem,this.hasSubmenu=!1,this.currentDirection=J.ltr,this.focusSubmenuOnLoad=!1,this.handleMenuItemKeyDown=t=>{if(t.defaultPrevented)return!1;switch(t.key){case Jt:case je:return this.invoke(),!1;case me:return this.expandAndFocus(),!1;case ge:if(this.expanded)return this.expanded=!1,this.focus(),!1}return!0},this.handleMenuItemClick=t=>(t.defaultPrevented||this.disabled||this.invoke(),!1),this.submenuLoaded=()=>{this.focusSubmenuOnLoad&&(this.focusSubmenuOnLoad=!1,this.hasSubmenu&&(this.submenu.focus(),this.setAttribute("tabindex","-1")))},this.handleMouseOver=t=>(this.disabled||!this.hasSubmenu||this.expanded||(this.expanded=!0),!1),this.handleMouseOut=t=>(!this.expanded||this.contains(document.activeElement)||(this.expanded=!1),!1),this.expandAndFocus=()=>{this.hasSubmenu&&(this.focusSubmenuOnLoad=!0,this.expanded=!0)},this.invoke=()=>{if(!this.disabled)switch(this.role){case Tt.menuitemcheckbox:this.checked=!this.checked;break;case Tt.menuitem:this.updateSubmenu(),this.hasSubmenu?this.expandAndFocus():this.$emit("change");break;case Tt.menuitemradio:this.checked||(this.checked=!0);break}},this.updateSubmenu=()=>{this.submenu=this.domChildren().find(t=>t.getAttribute("role")==="menu"),this.hasSubmenu=this.submenu!==void 0}}expandedChanged(t){if(this.$fastController.isConnected){if(this.submenu===void 0)return;this.expanded===!1?this.submenu.collapseExpandedItem():this.currentDirection=He(this),this.$emit("expanded-change",this,{bubbles:!1})}}checkedChanged(t,e){this.$fastController.isConnected&&this.$emit("change")}connectedCallback(){super.connectedCallback(),S.queueUpdate(()=>{this.updateSubmenu()}),this.startColumnCount||(this.startColumnCount=1),this.observer=new MutationObserver(this.updateSubmenu)}disconnectedCallback(){super.disconnectedCallback(),this.submenu=void 0,this.observer!==void 0&&(this.observer.disconnect(),this.observer=void 0)}domChildren(){return Array.from(this.children).filter(t=>!t.hasAttribute("hidden"))}}r([d({mode:"boolean"})],Qt.prototype,"disabled",void 0);r([d({mode:"boolean"})],Qt.prototype,"expanded",void 0);r([f],Qt.prototype,"startColumnCount",void 0);r([d],Qt.prototype,"role",void 0);r([d({mode:"boolean"})],Qt.prototype,"checked",void 0);r([f],Qt.prototype,"submenuRegion",void 0);r([f],Qt.prototype,"hasSubmenu",void 0);r([f],Qt.prototype,"currentDirection",void 0);r([f],Qt.prototype,"submenu",void 0);tt(Qt,Lt);const $h=(i,t)=>b`
    <template
        role="${e=>e.role}"
        aria-haspopup="${e=>e.hasSubmenu?"menu":void 0}"
        aria-checked="${e=>e.role!==Tt.menuitem?e.checked:void 0}"
        aria-disabled="${e=>e.disabled}"
        aria-expanded="${e=>e.expanded}"
        @keydown="${(e,o)=>e.handleMenuItemKeyDown(o.event)}"
        @click="${(e,o)=>e.handleMenuItemClick(o.event)}"
        @mouseover="${(e,o)=>e.handleMouseOver(o.event)}"
        @mouseout="${(e,o)=>e.handleMouseOut(o.event)}"
        class="${e=>e.disabled?"disabled":""} ${e=>e.expanded?"expanded":""} ${e=>`indent-${e.startColumnCount}`}"
    >
            ${G(e=>e.role===Tt.menuitemcheckbox,b`
                    <div part="input-container" class="input-container">
                        <span part="checkbox" class="checkbox">
                            <slot name="checkbox-indicator">
                                ${t.checkboxIndicator||""}
                            </slot>
                        </span>
                    </div>
                `)}
            ${G(e=>e.role===Tt.menuitemradio,b`
                    <div part="input-container" class="input-container">
                        <span part="radio" class="radio">
                            <slot name="radio-indicator">
                                ${t.radioIndicator||""}
                            </slot>
                        </span>
                    </div>
                `)}
        </div>
        ${Dt(i,t)}
        <span class="content" part="content">
            <slot></slot>
        </span>
        ${Ft(i,t)}
        ${G(e=>e.hasSubmenu,b`
                <div
                    part="expand-collapse-glyph-container"
                    class="expand-collapse-glyph-container"
                >
                    <span part="expand-collapse" class="expand-collapse">
                        <slot name="expand-collapse-indicator">
                            ${t.expandCollapseGlyph||""}
                        </slot>
                    </span>
                </div>
            `)}
        ${G(e=>e.expanded,b`
                <${i.tagFor(j)}
                    :anchorElement="${e=>e}"
                    vertical-positioning-mode="dynamic"
                    vertical-default-position="bottom"
                    vertical-inset="true"
                    horizontal-positioning-mode="dynamic"
                    horizontal-default-position="end"
                    class="submenu-region"
                    dir="${e=>e.currentDirection}"
                    @loaded="${e=>e.submenuLoaded()}"
                    ${N("submenuRegion")}
                    part="submenu-region"
                >
                    <slot name="submenu"></slot>
                </${i.tagFor(j)}>
            `)}
    </template>
`,wh=(i,t)=>b`
    <template
        slot="${e=>e.slot?e.slot:e.isNestedMenu()?"submenu":void 0}"
        role="menu"
        @keydown="${(e,o)=>e.handleMenuKeyDown(o.event)}"
        @focusout="${(e,o)=>e.handleFocusOut(o.event)}"
    >
        <slot ${Z("items")}></slot>
    </template>
`;let Co=class extends D{constructor(){super(...arguments),this.expandedItem=null,this.focusIndex=-1,this.isNestedMenu=()=>this.parentElement!==null&&ci(this.parentElement)&&this.parentElement.getAttribute("role")==="menuitem",this.handleFocusOut=t=>{if(!this.contains(t.relatedTarget)&&this.menuItems!==void 0){this.collapseExpandedItem();const e=this.menuItems.findIndex(this.isFocusableElement);this.menuItems[this.focusIndex].setAttribute("tabindex","-1"),this.menuItems[e].setAttribute("tabindex","0"),this.focusIndex=e}},this.handleItemFocus=t=>{const e=t.target;this.menuItems!==void 0&&e!==this.menuItems[this.focusIndex]&&(this.menuItems[this.focusIndex].setAttribute("tabindex","-1"),this.focusIndex=this.menuItems.indexOf(e),e.setAttribute("tabindex","0"))},this.handleExpandedChanged=t=>{if(t.defaultPrevented||t.target===null||this.menuItems===void 0||this.menuItems.indexOf(t.target)<0)return;t.preventDefault();const e=t.target;if(this.expandedItem!==null&&e===this.expandedItem&&e.expanded===!1){this.expandedItem=null;return}e.expanded&&(this.expandedItem!==null&&this.expandedItem!==e&&(this.expandedItem.expanded=!1),this.menuItems[this.focusIndex].setAttribute("tabindex","-1"),this.expandedItem=e,this.focusIndex=this.menuItems.indexOf(e),e.setAttribute("tabindex","0"))},this.removeItemListeners=()=>{this.menuItems!==void 0&&this.menuItems.forEach(t=>{t.removeEventListener("expanded-change",this.handleExpandedChanged),t.removeEventListener("focus",this.handleItemFocus)})},this.setItems=()=>{const t=this.domChildren();this.removeItemListeners(),this.menuItems=t;const e=this.menuItems.filter(this.isMenuItemElement);e.length&&(this.focusIndex=0);function o(n){const a=n.getAttribute("role"),l=n.querySelector("[slot=start]");return a!==Tt.menuitem&&l===null||a===Tt.menuitem&&l!==null?1:a!==Tt.menuitem&&l!==null?2:0}const s=e.reduce((n,a)=>{const l=o(a);return n>l?n:l},0);e.forEach((n,a)=>{n.setAttribute("tabindex",a===0?"0":"-1"),n.addEventListener("expanded-change",this.handleExpandedChanged),n.addEventListener("focus",this.handleItemFocus),n instanceof Qt&&(n.startColumnCount=s)})},this.changeHandler=t=>{if(this.menuItems===void 0)return;const e=t.target,o=this.menuItems.indexOf(e);if(o!==-1&&e.role==="menuitemradio"&&e.checked===!0){for(let n=o-1;n>=0;--n){const a=this.menuItems[n],l=a.getAttribute("role");if(l===Tt.menuitemradio&&(a.checked=!1),l==="separator")break}const s=this.menuItems.length-1;for(let n=o+1;n<=s;++n){const a=this.menuItems[n],l=a.getAttribute("role");if(l===Tt.menuitemradio&&(a.checked=!1),l==="separator")break}}},this.isMenuItemElement=t=>ci(t)&&Co.focusableElementRoles.hasOwnProperty(t.getAttribute("role")),this.isFocusableElement=t=>this.isMenuItemElement(t)}itemsChanged(t,e){this.$fastController.isConnected&&this.menuItems!==void 0&&this.setItems()}connectedCallback(){super.connectedCallback(),S.queueUpdate(()=>{this.setItems()}),this.addEventListener("change",this.changeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeItemListeners(),this.menuItems=void 0,this.removeEventListener("change",this.changeHandler)}focus(){this.setFocus(0,1)}collapseExpandedItem(){this.expandedItem!==null&&(this.expandedItem.expanded=!1,this.expandedItem=null)}handleMenuKeyDown(t){if(!(t.defaultPrevented||this.menuItems===void 0))switch(t.key){case Vt:this.setFocus(this.focusIndex+1,1);return;case Ht:this.setFocus(this.focusIndex-1,-1);return;case re:this.setFocus(this.menuItems.length-1,-1);return;case ne:this.setFocus(0,1);return;default:return!0}}domChildren(){return Array.from(this.children).filter(t=>!t.hasAttribute("hidden"))}setFocus(t,e){if(this.menuItems!==void 0)for(;t>=0&&t<this.menuItems.length;){const o=this.menuItems[t];if(this.isFocusableElement(o)){this.focusIndex>-1&&this.menuItems.length>=this.focusIndex-1&&this.menuItems[this.focusIndex].setAttribute("tabindex","-1"),this.focusIndex=t,o.setAttribute("tabindex","0"),o.focus();break}t+=e}}};Co.focusableElementRoles=xh;r([f],Co.prototype,"items",void 0);const kh=(i,t)=>b`
    <template class="${e=>e.readOnly?"readonly":""}">
        <label
            part="label"
            for="control"
            class="${e=>e.defaultSlottedNodes&&e.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot ${Z("defaultSlottedNodes")}></slot>
        </label>
        <div class="root" part="root">
            ${Dt(i,t)}
            <input
                class="control"
                part="control"
                id="control"
                @input="${e=>e.handleTextInput()}"
                @change="${e=>e.handleChange()}"
                @keydown="${(e,o)=>e.handleKeyDown(o.event)}"
                @blur="${(e,o)=>e.handleBlur()}"
                ?autofocus="${e=>e.autofocus}"
                ?disabled="${e=>e.disabled}"
                list="${e=>e.list}"
                maxlength="${e=>e.maxlength}"
                minlength="${e=>e.minlength}"
                placeholder="${e=>e.placeholder}"
                ?readonly="${e=>e.readOnly}"
                ?required="${e=>e.required}"
                size="${e=>e.size}"
                type="text"
                inputmode="numeric"
                min="${e=>e.min}"
                max="${e=>e.max}"
                step="${e=>e.step}"
                aria-atomic="${e=>e.ariaAtomic}"
                aria-busy="${e=>e.ariaBusy}"
                aria-controls="${e=>e.ariaControls}"
                aria-current="${e=>e.ariaCurrent}"
                aria-describedby="${e=>e.ariaDescribedby}"
                aria-details="${e=>e.ariaDetails}"
                aria-disabled="${e=>e.ariaDisabled}"
                aria-errormessage="${e=>e.ariaErrormessage}"
                aria-flowto="${e=>e.ariaFlowto}"
                aria-haspopup="${e=>e.ariaHaspopup}"
                aria-hidden="${e=>e.ariaHidden}"
                aria-invalid="${e=>e.ariaInvalid}"
                aria-keyshortcuts="${e=>e.ariaKeyshortcuts}"
                aria-label="${e=>e.ariaLabel}"
                aria-labelledby="${e=>e.ariaLabelledby}"
                aria-live="${e=>e.ariaLive}"
                aria-owns="${e=>e.ariaOwns}"
                aria-relevant="${e=>e.ariaRelevant}"
                aria-roledescription="${e=>e.ariaRoledescription}"
                ${N("control")}
            />
            ${G(e=>!e.hideStep&&!e.readOnly&&!e.disabled,b`
                    <div class="controls" part="controls">
                        <div class="step-up" part="step-up" @click="${e=>e.stepUp()}">
                            <slot name="step-up-glyph">
                                ${t.stepUpGlyph||""}
                            </slot>
                        </div>
                        <div
                            class="step-down"
                            part="step-down"
                            @click="${e=>e.stepDown()}"
                        >
                            <slot name="step-down-glyph">
                                ${t.stepDownGlyph||""}
                            </slot>
                        </div>
                    </div>
                `)}
            ${Ft(i,t)}
        </div>
    </template>
`;class Ch extends D{}class Ih extends ae(Ch){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const Th={email:"email",password:"password",tel:"tel",text:"text",url:"url"};let At=class extends Ih{constructor(){super(...arguments),this.type=Th.text}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly,this.validate())}autofocusChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.autofocus=this.autofocus,this.validate())}placeholderChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.placeholder=this.placeholder)}typeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type,this.validate())}listChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.setAttribute("list",this.list),this.validate())}maxlengthChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.maxLength=this.maxlength,this.validate())}minlengthChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.minLength=this.minlength,this.validate())}patternChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.pattern=this.pattern,this.validate())}sizeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.size=this.size)}spellcheckChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.spellcheck=this.spellcheck)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.validate(),this.autofocus&&S.queueUpdate(()=>{this.focus()})}select(){this.control.select(),this.$emit("select")}handleTextInput(){this.value=this.control.value}handleChange(){this.$emit("change")}validate(){super.validate(this.control)}};r([d({attribute:"readonly",mode:"boolean"})],At.prototype,"readOnly",void 0);r([d({mode:"boolean"})],At.prototype,"autofocus",void 0);r([d],At.prototype,"placeholder",void 0);r([d],At.prototype,"type",void 0);r([d],At.prototype,"list",void 0);r([d({converter:w})],At.prototype,"maxlength",void 0);r([d({converter:w})],At.prototype,"minlength",void 0);r([d],At.prototype,"pattern",void 0);r([d({converter:w})],At.prototype,"size",void 0);r([d({mode:"boolean"})],At.prototype,"spellcheck",void 0);r([f],At.prototype,"defaultSlottedNodes",void 0);class Io{}tt(Io,K);tt(At,Lt,Io);class Sh extends D{}class Fh extends ae(Sh){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let Et=class extends Fh{constructor(){super(...arguments),this.hideStep=!1,this.step=1,this.isUserInput=!1}maxChanged(t,e){var o;this.max=Math.max(e,(o=this.min)!==null&&o!==void 0?o:e);const s=Math.min(this.min,this.max);this.min!==void 0&&this.min!==s&&(this.min=s),this.value=this.getValidValue(this.value)}minChanged(t,e){var o;this.min=Math.min(e,(o=this.max)!==null&&o!==void 0?o:e);const s=Math.max(this.min,this.max);this.max!==void 0&&this.max!==s&&(this.max=s),this.value=this.getValidValue(this.value)}get valueAsNumber(){return parseFloat(super.value)}set valueAsNumber(t){this.value=t.toString()}valueChanged(t,e){this.value=this.getValidValue(e),e===this.value&&(this.control&&!this.isUserInput&&(this.control.value=this.value),super.valueChanged(t,this.value),t!==void 0&&!this.isUserInput&&(this.$emit("input"),this.$emit("change")),this.isUserInput=!1)}validate(){super.validate(this.control)}getValidValue(t){var e,o;let s=parseFloat(parseFloat(t).toPrecision(12));return isNaN(s)?s="":(s=Math.min(s,(e=this.max)!==null&&e!==void 0?e:s),s=Math.max(s,(o=this.min)!==null&&o!==void 0?o:s).toString()),s}stepUp(){const t=parseFloat(this.value),e=isNaN(t)?this.min>0?this.min:this.max<0?this.max:this.min?0:this.step:t+this.step;this.value=e.toString()}stepDown(){const t=parseFloat(this.value),e=isNaN(t)?this.min>0?this.min:this.max<0?this.max:this.min?0:0-this.step:t-this.step;this.value=e.toString()}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type","number"),this.validate(),this.control.value=this.value,this.autofocus&&S.queueUpdate(()=>{this.focus()})}select(){this.control.select(),this.$emit("select")}handleTextInput(){this.control.value=this.control.value.replace(/[^0-9\-+e.]/g,""),this.isUserInput=!0,this.value=this.control.value}handleChange(){this.$emit("change")}handleKeyDown(t){switch(t.key){case Ht:return this.stepUp(),!1;case Vt:return this.stepDown(),!1}return!0}handleBlur(){this.control.value=this.value}};r([d({attribute:"readonly",mode:"boolean"})],Et.prototype,"readOnly",void 0);r([d({mode:"boolean"})],Et.prototype,"autofocus",void 0);r([d({attribute:"hide-step",mode:"boolean"})],Et.prototype,"hideStep",void 0);r([d],Et.prototype,"placeholder",void 0);r([d],Et.prototype,"list",void 0);r([d({converter:w})],Et.prototype,"maxlength",void 0);r([d({converter:w})],Et.prototype,"minlength",void 0);r([d({converter:w})],Et.prototype,"size",void 0);r([d({converter:w})],Et.prototype,"step",void 0);r([d({converter:w})],Et.prototype,"max",void 0);r([d({converter:w})],Et.prototype,"min",void 0);r([f],Et.prototype,"defaultSlottedNodes",void 0);tt(Et,Lt,Io);const Dn=44,Dh=(i,t)=>b`
    <template
        role="progressbar"
        aria-valuenow="${e=>e.value}"
        aria-valuemin="${e=>e.min}"
        aria-valuemax="${e=>e.max}"
        class="${e=>e.paused?"paused":""}"
    >
        ${G(e=>typeof e.value=="number",b`
                <svg
                    class="progress"
                    part="progress"
                    viewBox="0 0 16 16"
                    slot="determinate"
                >
                    <circle
                        class="background"
                        part="background"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                    <circle
                        class="determinate"
                        part="determinate"
                        style="stroke-dasharray: ${e=>Dn*e.percentComplete/100}px ${Dn}px"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                </svg>
            `)}
        ${G(e=>typeof e.value!="number",b`
                <slot name="indeterminate" slot="indeterminate">
                    ${t.indeterminateIndicator||""}
                </slot>
            `)}
    </template>
`;class Ue extends D{constructor(){super(...arguments),this.percentComplete=0}valueChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}minChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}maxChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}connectedCallback(){super.connectedCallback(),this.updatePercentComplete()}updatePercentComplete(){const t=typeof this.min=="number"?this.min:0,e=typeof this.max=="number"?this.max:100,o=typeof this.value=="number"?this.value:0,s=e-t;this.percentComplete=s===0?0:Math.fround((o-t)/s*100)}}r([d({converter:w})],Ue.prototype,"value",void 0);r([d({converter:w})],Ue.prototype,"min",void 0);r([d({converter:w})],Ue.prototype,"max",void 0);r([d({mode:"boolean"})],Ue.prototype,"paused",void 0);r([f],Ue.prototype,"percentComplete",void 0);const Eh=(i,t)=>b`
    <template
        role="progressbar"
        aria-valuenow="${e=>e.value}"
        aria-valuemin="${e=>e.min}"
        aria-valuemax="${e=>e.max}"
        class="${e=>e.paused?"paused":""}"
    >
        ${G(e=>typeof e.value=="number",b`
                <div class="progress" part="progress" slot="determinate">
                    <div
                        class="determinate"
                        part="determinate"
                        style="width: ${e=>e.percentComplete}%"
                    ></div>
                </div>
            `)}
        ${G(e=>typeof e.value!="number",b`
                <div class="progress" part="progress" slot="indeterminate">
                    <slot class="indeterminate" name="indeterminate">
                        ${t.indeterminateIndicator1||""}
                        ${t.indeterminateIndicator2||""}
                    </slot>
                </div>
            `)}
    </template>
`,Rh=(i,t)=>b`
    <template
        role="radiogroup"
        aria-disabled="${e=>e.disabled}"
        aria-readonly="${e=>e.readOnly}"
        @click="${(e,o)=>e.clickHandler(o.event)}"
        @keydown="${(e,o)=>e.keydownHandler(o.event)}"
        @focusout="${(e,o)=>e.focusOutHandler(o.event)}"
    >
        <slot name="label"></slot>
        <div
            class="positioning-region ${e=>e.orientation===it.horizontal?"horizontal":"vertical"}"
            part="positioning-region"
        >
            <slot
                ${Z({property:"slottedRadioButtons",filter:fe("[role=radio]")})}
            ></slot>
        </div>
    </template>
`;class Ee extends D{constructor(){super(...arguments),this.orientation=it.horizontal,this.radioChangeHandler=t=>{const e=t.target;e.checked&&(this.slottedRadioButtons.forEach(o=>{o!==e&&(o.checked=!1,this.isInsideFoundationToolbar||o.setAttribute("tabindex","-1"))}),this.selectedRadio=e,this.value=e.value,e.setAttribute("tabindex","0"),this.focusedRadio=e),t.stopPropagation()},this.moveToRadioByIndex=(t,e)=>{const o=t[e];this.isInsideToolbar||(o.setAttribute("tabindex","0"),o.readOnly?this.slottedRadioButtons.forEach(s=>{s!==o&&s.setAttribute("tabindex","-1")}):(o.checked=!0,this.selectedRadio=o)),this.focusedRadio=o,o.focus()},this.moveRightOffGroup=()=>{var t;(t=this.nextElementSibling)===null||t===void 0||t.focus()},this.moveLeftOffGroup=()=>{var t;(t=this.previousElementSibling)===null||t===void 0||t.focus()},this.focusOutHandler=t=>{const e=this.slottedRadioButtons,o=t.target,s=o!==null?e.indexOf(o):0,n=this.focusedRadio?e.indexOf(this.focusedRadio):-1;return(n===0&&s===n||n===e.length-1&&n===s)&&(this.selectedRadio?(this.focusedRadio=this.selectedRadio,this.isInsideFoundationToolbar||(this.selectedRadio.setAttribute("tabindex","0"),e.forEach(a=>{a!==this.selectedRadio&&a.setAttribute("tabindex","-1")}))):(this.focusedRadio=e[0],this.focusedRadio.setAttribute("tabindex","0"),e.forEach(a=>{a!==this.focusedRadio&&a.setAttribute("tabindex","-1")}))),!0},this.clickHandler=t=>{const e=t.target;if(e){const o=this.slottedRadioButtons;e.checked||o.indexOf(e)===0?(e.setAttribute("tabindex","0"),this.selectedRadio=e):(e.setAttribute("tabindex","-1"),this.selectedRadio=null),this.focusedRadio=e}t.preventDefault()},this.shouldMoveOffGroupToTheRight=(t,e,o)=>t===e.length&&this.isInsideToolbar&&o===me,this.shouldMoveOffGroupToTheLeft=(t,e)=>(this.focusedRadio?t.indexOf(this.focusedRadio)-1:0)<0&&this.isInsideToolbar&&e===ge,this.checkFocusedRadio=()=>{this.focusedRadio!==null&&!this.focusedRadio.readOnly&&!this.focusedRadio.checked&&(this.focusedRadio.checked=!0,this.focusedRadio.setAttribute("tabindex","0"),this.focusedRadio.focus(),this.selectedRadio=this.focusedRadio)},this.moveRight=t=>{const e=this.slottedRadioButtons;let o=0;if(o=this.focusedRadio?e.indexOf(this.focusedRadio)+1:1,this.shouldMoveOffGroupToTheRight(o,e,t.key)){this.moveRightOffGroup();return}else o===e.length&&(o=0);for(;o<e.length&&e.length>1;)if(e[o].disabled){if(this.focusedRadio&&o===e.indexOf(this.focusedRadio))break;if(o+1>=e.length){if(this.isInsideToolbar)break;o=0}else o+=1}else{this.moveToRadioByIndex(e,o);break}},this.moveLeft=t=>{const e=this.slottedRadioButtons;let o=0;if(o=this.focusedRadio?e.indexOf(this.focusedRadio)-1:0,o=o<0?e.length-1:o,this.shouldMoveOffGroupToTheLeft(e,t.key)){this.moveLeftOffGroup();return}for(;o>=0&&e.length>1;)if(e[o].disabled){if(this.focusedRadio&&o===e.indexOf(this.focusedRadio))break;o-1<0?o=e.length-1:o-=1}else{this.moveToRadioByIndex(e,o);break}},this.keydownHandler=t=>{const e=t.key;if(e in si&&this.isInsideFoundationToolbar)return!0;switch(e){case Jt:{this.checkFocusedRadio();break}case me:case Vt:{this.direction===J.ltr?this.moveRight(t):this.moveLeft(t);break}case ge:case Ht:{this.direction===J.ltr?this.moveLeft(t):this.moveRight(t);break}default:return!0}}}readOnlyChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(t=>{this.readOnly?t.readOnly=!0:t.readOnly=!1})}disabledChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(t=>{this.disabled?t.disabled=!0:t.disabled=!1})}nameChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(t=>{t.setAttribute("name",this.name)})}valueChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(t=>{t.value===this.value&&(t.checked=!0,this.selectedRadio=t)}),this.$emit("change")}slottedRadioButtonsChanged(t,e){this.slottedRadioButtons&&this.slottedRadioButtons.length>0&&this.setupRadioButtons()}get parentToolbar(){return this.closest('[role="toolbar"]')}get isInsideToolbar(){var t;return(t=this.parentToolbar)!==null&&t!==void 0?t:!1}get isInsideFoundationToolbar(){var t;return!!(!((t=this.parentToolbar)===null||t===void 0)&&t.$fastController)}connectedCallback(){super.connectedCallback(),this.direction=He(this),this.setupRadioButtons()}disconnectedCallback(){this.slottedRadioButtons.forEach(t=>{t.removeEventListener("change",this.radioChangeHandler)})}setupRadioButtons(){const t=this.slottedRadioButtons.filter(s=>s.hasAttribute("checked")),e=t?t.length:0;if(e>1){const s=t[e-1];s.checked=!0}let o=!1;if(this.slottedRadioButtons.forEach(s=>{this.name!==void 0&&s.setAttribute("name",this.name),this.disabled&&(s.disabled=!0),this.readOnly&&(s.readOnly=!0),this.value&&this.value===s.value?(this.selectedRadio=s,this.focusedRadio=s,s.checked=!0,s.setAttribute("tabindex","0"),o=!0):(this.isInsideFoundationToolbar||s.setAttribute("tabindex","-1"),s.checked=!1),s.addEventListener("change",this.radioChangeHandler)}),this.value===void 0&&this.slottedRadioButtons.length>0){const s=this.slottedRadioButtons.filter(a=>a.hasAttribute("checked")),n=s!==null?s.length:0;if(n>0&&!o){const a=s[n-1];a.checked=!0,this.focusedRadio=a,a.setAttribute("tabindex","0")}else this.slottedRadioButtons[0].setAttribute("tabindex","0"),this.focusedRadio=this.slottedRadioButtons[0]}}}r([d({attribute:"readonly",mode:"boolean"})],Ee.prototype,"readOnly",void 0);r([d({attribute:"disabled",mode:"boolean"})],Ee.prototype,"disabled",void 0);r([d],Ee.prototype,"name",void 0);r([d],Ee.prototype,"value",void 0);r([d],Ee.prototype,"orientation",void 0);r([f],Ee.prototype,"childItems",void 0);r([f],Ee.prototype,"slottedRadioButtons",void 0);const Oh=(i,t)=>b`
    <template
        role="radio"
        class="${e=>e.checked?"checked":""} ${e=>e.readOnly?"readonly":""}"
        aria-checked="${e=>e.checked}"
        aria-required="${e=>e.required}"
        aria-disabled="${e=>e.disabled}"
        aria-readonly="${e=>e.readOnly}"
        @keypress="${(e,o)=>e.keypressHandler(o.event)}"
        @click="${(e,o)=>e.clickHandler(o.event)}"
    >
        <div part="control" class="control">
            <slot name="checked-indicator">
                ${t.checkedIndicator||""}
            </slot>
        </div>
        <label
            part="label"
            class="${e=>e.defaultSlottedNodes&&e.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot ${Z("defaultSlottedNodes")}></slot>
        </label>
    </template>
`;class Lh extends D{}class Ah extends Rs(Lh){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class To extends Ah{constructor(){super(),this.initialValue="on",this.keypressHandler=t=>{switch(t.key){case je:!this.checked&&!this.readOnly&&(this.checked=!0);return}return!0},this.proxy.setAttribute("type","radio")}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}defaultCheckedChanged(){var t;this.$fastController.isConnected&&!this.dirtyChecked&&(this.isInsideRadioGroup()||(this.checked=(t=this.defaultChecked)!==null&&t!==void 0?t:!1,this.dirtyChecked=!1))}connectedCallback(){var t,e;super.connectedCallback(),this.validate(),((t=this.parentElement)===null||t===void 0?void 0:t.getAttribute("role"))!=="radiogroup"&&this.getAttribute("tabindex")===null&&(this.disabled||this.setAttribute("tabindex","0")),this.checkedAttribute&&(this.dirtyChecked||this.isInsideRadioGroup()||(this.checked=(e=this.defaultChecked)!==null&&e!==void 0?e:!1,this.dirtyChecked=!1))}isInsideRadioGroup(){return this.closest("[role=radiogroup]")!==null}clickHandler(t){!this.disabled&&!this.readOnly&&!this.checked&&(this.checked=!0)}}r([d({attribute:"readonly",mode:"boolean"})],To.prototype,"readOnly",void 0);r([f],To.prototype,"name",void 0);r([f],To.prototype,"defaultSlottedNodes",void 0);let ye=class extends D{constructor(){super(...arguments),this.framesPerSecond=60,this.updatingItems=!1,this.speed=600,this.easing="ease-in-out",this.flippersHiddenFromAT=!1,this.scrolling=!1,this.resizeDetector=null}get frameTime(){return 1e3/this.framesPerSecond}scrollingChanged(t,e){if(this.scrollContainer){const o=this.scrolling==!0?"scrollstart":"scrollend";this.$emit(o,this.scrollContainer.scrollLeft)}}get isRtl(){return this.scrollItems.length>1&&this.scrollItems[0].offsetLeft>this.scrollItems[1].offsetLeft}connectedCallback(){super.connectedCallback(),this.initializeResizeDetector()}disconnectedCallback(){this.disconnectResizeDetector(),super.disconnectedCallback()}scrollItemsChanged(t,e){e&&!this.updatingItems&&S.queueUpdate(()=>this.setStops())}disconnectResizeDetector(){this.resizeDetector&&(this.resizeDetector.disconnect(),this.resizeDetector=null)}initializeResizeDetector(){this.disconnectResizeDetector(),this.resizeDetector=new window.ResizeObserver(this.resized.bind(this)),this.resizeDetector.observe(this)}updateScrollStops(){this.updatingItems=!0;const t=this.scrollItems.reduce((e,o)=>o instanceof HTMLSlotElement?e.concat(o.assignedElements()):(e.push(o),e),[]);this.scrollItems=t,this.updatingItems=!1}setStops(){this.updateScrollStops();const{scrollContainer:t}=this,{scrollLeft:e}=t,{width:o,left:s}=t.getBoundingClientRect();this.width=o;let n=0,a=this.scrollItems.map((l,h)=>{const{left:u,width:p}=l.getBoundingClientRect(),g=Math.round(u+e-s),y=Math.round(g+p);return this.isRtl?-y:(n=y,h===0?0:g)}).concat(n);a=this.fixScrollMisalign(a),a.sort((l,h)=>Math.abs(l)-Math.abs(h)),this.scrollStops=a,this.setFlippers()}fixScrollMisalign(t){if(this.isRtl&&t.some(e=>e>0)){t.sort((o,s)=>s-o);const e=t[0];t=t.map(o=>o-e)}return t}setFlippers(){var t,e;const o=this.scrollContainer.scrollLeft;if((t=this.previousFlipperContainer)===null||t===void 0||t.classList.toggle("disabled",o===0),this.scrollStops){const s=Math.abs(this.scrollStops[this.scrollStops.length-1]);(e=this.nextFlipperContainer)===null||e===void 0||e.classList.toggle("disabled",Math.abs(o)+this.width>=s)}}scrollInView(t,e=0,o){var s;if(typeof t!="number"&&t&&(t=this.scrollItems.findIndex(n=>n===t||n.contains(t))),t!==void 0){o=o??e;const{scrollContainer:n,scrollStops:a,scrollItems:l}=this,{scrollLeft:h}=this.scrollContainer,{width:u}=n.getBoundingClientRect(),p=a[t],{width:g}=l[t].getBoundingClientRect(),y=p+g,E=h+e>p;if(E||h+u-o<y){const V=(s=[...a].sort((U,Nt)=>E?Nt-U:U-Nt).find(U=>E?U+e<p:U+u-(o??0)>y))!==null&&s!==void 0?s:0;this.scrollToPosition(V)}}}keyupHandler(t){switch(t.key){case"ArrowLeft":this.scrollToPrevious();break;case"ArrowRight":this.scrollToNext();break}}scrollToPrevious(){const t=this.scrollContainer.scrollLeft,e=this.scrollStops.findIndex((n,a)=>n>=t&&(this.isRtl||a===this.scrollStops.length-1||this.scrollStops[a+1]>t)),o=Math.abs(this.scrollStops[e+1]);let s=this.scrollStops.findIndex(n=>Math.abs(n)+this.width>o);(s>=e||s===-1)&&(s=e>0?e-1:0),this.scrollToPosition(this.scrollStops[s],t)}scrollToNext(){const t=this.scrollContainer.scrollLeft,e=this.scrollStops.findIndex(n=>Math.abs(n)>=Math.abs(t)),o=this.scrollStops.findIndex(n=>Math.abs(t)+this.width<=Math.abs(n));let s=e;o>e+2?s=o-2:e<this.scrollStops.length-2&&(s=e+1),this.scrollToPosition(this.scrollStops[s],t)}scrollToPosition(t,e=this.scrollContainer.scrollLeft){var o;if(this.scrolling)return;this.scrolling=!0;const s=(o=this.duration)!==null&&o!==void 0?o:`${Math.abs(t-e)/this.speed}s`;this.content.style.setProperty("transition-duration",s);const n=parseFloat(getComputedStyle(this.content).getPropertyValue("transition-duration")),a=u=>{u&&u.target!==u.currentTarget||(this.content.style.setProperty("transition-duration","0s"),this.content.style.removeProperty("transform"),this.scrollContainer.style.setProperty("scroll-behavior","auto"),this.scrollContainer.scrollLeft=t,this.setFlippers(),this.content.removeEventListener("transitionend",a),this.scrolling=!1)};if(n===0){a();return}this.content.addEventListener("transitionend",a);const l=this.scrollContainer.scrollWidth-this.scrollContainer.clientWidth;let h=this.scrollContainer.scrollLeft-Math.min(t,l);this.isRtl&&(h=this.scrollContainer.scrollLeft+Math.min(Math.abs(t),l)),this.content.style.setProperty("transition-property","transform"),this.content.style.setProperty("transition-timing-function",this.easing),this.content.style.setProperty("transform",`translateX(${h}px)`)}resized(){this.resizeTimeout&&(this.resizeTimeout=clearTimeout(this.resizeTimeout)),this.resizeTimeout=setTimeout(()=>{this.width=this.scrollContainer.offsetWidth,this.setFlippers()},this.frameTime)}scrolled(){this.scrollTimeout&&(this.scrollTimeout=clearTimeout(this.scrollTimeout)),this.scrollTimeout=setTimeout(()=>{this.setFlippers()},this.frameTime)}};r([d({converter:w})],ye.prototype,"speed",void 0);r([d],ye.prototype,"duration",void 0);r([d],ye.prototype,"easing",void 0);r([d({attribute:"flippers-hidden-from-at",converter:fo})],ye.prototype,"flippersHiddenFromAT",void 0);r([f],ye.prototype,"scrolling",void 0);r([f],ye.prototype,"scrollItems",void 0);r([d({attribute:"view"})],ye.prototype,"view",void 0);const Ph=(i,t)=>{var e,o;return b`
    <template
        class="horizontal-scroll"
        @keyup="${(s,n)=>s.keyupHandler(n.event)}"
    >
        ${Dt(i,t)}
        <div class="scroll-area" part="scroll-area">
            <div
                class="scroll-view"
                part="scroll-view"
                @scroll="${s=>s.scrolled()}"
                ${N("scrollContainer")}
            >
                <div class="content-container" part="content-container" ${N("content")}>
                    <slot
                        ${Z({property:"scrollItems",filter:fe()})}
                    ></slot>
                </div>
            </div>
            ${G(s=>s.view!=="mobile",b`
                    <div
                        class="scroll scroll-prev"
                        part="scroll-prev"
                        ${N("previousFlipperContainer")}
                    >
                        <div class="scroll-action" part="scroll-action-previous">
                            <slot name="previous-flipper">
                                ${t.previousFlipper instanceof Function?t.previousFlipper(i,t):(e=t.previousFlipper)!==null&&e!==void 0?e:""}
                            </slot>
                        </div>
                    </div>
                    <div
                        class="scroll scroll-next"
                        part="scroll-next"
                        ${N("nextFlipperContainer")}
                    >
                        <div class="scroll-action" part="scroll-action-next">
                            <slot name="next-flipper">
                                ${t.nextFlipper instanceof Function?t.nextFlipper(i,t):(o=t.nextFlipper)!==null&&o!==void 0?o:""}
                            </slot>
                        </div>
                    </div>
                `)}
        </div>
        ${Ft(i,t)}
    </template>
`};function Tr(i,t,e){return i.nodeType!==Node.TEXT_NODE?!0:typeof i.nodeValue=="string"&&!!i.nodeValue.trim().length}const Mh=(i,t)=>b`
    <template
        class="
            ${e=>e.readOnly?"readonly":""}
        "
    >
        <label
            part="label"
            for="control"
            class="${e=>e.defaultSlottedNodes&&e.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot
                ${Z({property:"defaultSlottedNodes",filter:Tr})}
            ></slot>
        </label>
        <div class="root" part="root" ${N("root")}>
            ${Dt(i,t)}
            <div class="input-wrapper" part="input-wrapper">
                <input
                    class="control"
                    part="control"
                    id="control"
                    @input="${e=>e.handleTextInput()}"
                    @change="${e=>e.handleChange()}"
                    ?autofocus="${e=>e.autofocus}"
                    ?disabled="${e=>e.disabled}"
                    list="${e=>e.list}"
                    maxlength="${e=>e.maxlength}"
                    minlength="${e=>e.minlength}"
                    pattern="${e=>e.pattern}"
                    placeholder="${e=>e.placeholder}"
                    ?readonly="${e=>e.readOnly}"
                    ?required="${e=>e.required}"
                    size="${e=>e.size}"
                    ?spellcheck="${e=>e.spellcheck}"
                    :value="${e=>e.value}"
                    type="search"
                    aria-atomic="${e=>e.ariaAtomic}"
                    aria-busy="${e=>e.ariaBusy}"
                    aria-controls="${e=>e.ariaControls}"
                    aria-current="${e=>e.ariaCurrent}"
                    aria-describedby="${e=>e.ariaDescribedby}"
                    aria-details="${e=>e.ariaDetails}"
                    aria-disabled="${e=>e.ariaDisabled}"
                    aria-errormessage="${e=>e.ariaErrormessage}"
                    aria-flowto="${e=>e.ariaFlowto}"
                    aria-haspopup="${e=>e.ariaHaspopup}"
                    aria-hidden="${e=>e.ariaHidden}"
                    aria-invalid="${e=>e.ariaInvalid}"
                    aria-keyshortcuts="${e=>e.ariaKeyshortcuts}"
                    aria-label="${e=>e.ariaLabel}"
                    aria-labelledby="${e=>e.ariaLabelledby}"
                    aria-live="${e=>e.ariaLive}"
                    aria-owns="${e=>e.ariaOwns}"
                    aria-relevant="${e=>e.ariaRelevant}"
                    aria-roledescription="${e=>e.ariaRoledescription}"
                    ${N("control")}
                />
                <slot name="close-button">
                    <button
                        class="clear-button ${e=>e.value?"":"clear-button__hidden"}"
                        part="clear-button"
                        tabindex="-1"
                        @click=${e=>e.handleClearInput()}
                    >
                        <slot name="close-glyph">
                            <svg
                                width="9"
                                height="9"
                                viewBox="0 0 9 9"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.146447 0.146447C0.338683 -0.0478972 0.645911 -0.0270359 0.853553 0.146447L4.5 3.793L8.14645 0.146447C8.34171 -0.0488155 8.65829 -0.0488155 8.85355 0.146447C9.04882 0.341709 9.04882 0.658291 8.85355 0.853553L5.207 4.5L8.85355 8.14645C9.05934 8.35223 9.03129 8.67582 8.85355 8.85355C8.67582 9.03129 8.35409 9.02703 8.14645 8.85355L4.5 5.207L0.853553 8.85355C0.658291 9.04882 0.341709 9.04882 0.146447 8.85355C-0.0488155 8.65829 -0.0488155 8.34171 0.146447 8.14645L3.793 4.5L0.146447 0.853553C-0.0268697 0.680237 -0.0457894 0.34079 0.146447 0.146447Z"
                                />
                            </svg>
                        </slot>
                    </button>
                </slot>
            </div>
            ${Ft(i,t)}
        </div>
    </template>
`;class Vh extends D{}class Hh extends ae(Vh){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let Bt=class extends Hh{readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly,this.validate())}autofocusChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.autofocus=this.autofocus,this.validate())}placeholderChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.placeholder=this.placeholder)}listChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.setAttribute("list",this.list),this.validate())}maxlengthChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.maxLength=this.maxlength,this.validate())}minlengthChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.minLength=this.minlength,this.validate())}patternChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.pattern=this.pattern,this.validate())}sizeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.size=this.size)}spellcheckChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.spellcheck=this.spellcheck)}connectedCallback(){super.connectedCallback(),this.validate(),this.autofocus&&S.queueUpdate(()=>{this.focus()})}validate(){super.validate(this.control)}handleTextInput(){this.value=this.control.value}handleClearInput(){this.value="",this.control.focus(),this.handleChange()}handleChange(){this.$emit("change")}};r([d({attribute:"readonly",mode:"boolean"})],Bt.prototype,"readOnly",void 0);r([d({mode:"boolean"})],Bt.prototype,"autofocus",void 0);r([d],Bt.prototype,"placeholder",void 0);r([d],Bt.prototype,"list",void 0);r([d({converter:w})],Bt.prototype,"maxlength",void 0);r([d({converter:w})],Bt.prototype,"minlength",void 0);r([d],Bt.prototype,"pattern",void 0);r([d({converter:w})],Bt.prototype,"size",void 0);r([d({mode:"boolean"})],Bt.prototype,"spellcheck",void 0);r([f],Bt.prototype,"defaultSlottedNodes",void 0);class Sr{}tt(Sr,K);tt(Bt,Lt,Sr);class zh extends De{}class Bh extends ae(zh){constructor(){super(...arguments),this.proxy=document.createElement("select")}}let le=class extends Bh{constructor(){super(...arguments),this.open=!1,this.forcedPosition=!1,this.listboxId=Ve("listbox-"),this.maxHeight=0}openChanged(t,e){if(this.collapsible){if(this.open){this.ariaControls=this.listboxId,this.ariaExpanded="true",this.setPositioning(),this.focusAndScrollOptionIntoView(),this.indexWhenOpened=this.selectedIndex,S.queueUpdate(()=>this.focus());return}this.ariaControls="",this.ariaExpanded="false"}}get collapsible(){return!(this.multiple||typeof this.size=="number")}get value(){return R.track(this,"value"),this._value}set value(t){var e,o,s,n,a,l,h;const u=`${this._value}`;if(!((e=this._options)===null||e===void 0)&&e.length){const p=this._options.findIndex(E=>E.value===t),g=(s=(o=this._options[this.selectedIndex])===null||o===void 0?void 0:o.value)!==null&&s!==void 0?s:null,y=(a=(n=this._options[p])===null||n===void 0?void 0:n.value)!==null&&a!==void 0?a:null;(p===-1||g!==y)&&(t="",this.selectedIndex=p),t=(h=(l=this.firstSelectedOption)===null||l===void 0?void 0:l.value)!==null&&h!==void 0?h:t}u!==t&&(this._value=t,super.valueChanged(u,t),R.notify(this,"value"),this.updateDisplayValue())}updateValue(t){var e,o;this.$fastController.isConnected&&(this.value=(o=(e=this.firstSelectedOption)===null||e===void 0?void 0:e.value)!==null&&o!==void 0?o:""),t&&(this.$emit("input"),this.$emit("change",this,{bubbles:!0,composed:void 0}))}selectedIndexChanged(t,e){super.selectedIndexChanged(t,e),this.updateValue()}positionChanged(t,e){this.positionAttribute=e,this.setPositioning()}setPositioning(){const t=this.getBoundingClientRect(),o=window.innerHeight-t.bottom;this.position=this.forcedPosition?this.positionAttribute:t.top>o?ai.above:ai.below,this.positionAttribute=this.forcedPosition?this.positionAttribute:this.position,this.maxHeight=this.position===ai.above?~~t.top:~~o}get displayValue(){var t,e;return R.track(this,"displayValue"),(e=(t=this.firstSelectedOption)===null||t===void 0?void 0:t.text)!==null&&e!==void 0?e:""}disabledChanged(t,e){super.disabledChanged&&super.disabledChanged(t,e),this.ariaDisabled=this.disabled?"true":"false"}formResetCallback(){this.setProxyOptions(),super.setDefaultSelectedOption(),this.selectedIndex===-1&&(this.selectedIndex=0)}clickHandler(t){if(!this.disabled){if(this.open){const e=t.target.closest("option,[role=option]");if(e&&e.disabled)return}return super.clickHandler(t),this.open=this.collapsible&&!this.open,!this.open&&this.indexWhenOpened!==this.selectedIndex&&this.updateValue(!0),!0}}focusoutHandler(t){var e;if(super.focusoutHandler(t),!this.open)return!0;const o=t.relatedTarget;if(this.isSameNode(o)){this.focus();return}!((e=this.options)===null||e===void 0)&&e.includes(o)||(this.open=!1,this.indexWhenOpened!==this.selectedIndex&&this.updateValue(!0))}handleChange(t,e){super.handleChange(t,e),e==="value"&&this.updateValue()}slottedOptionsChanged(t,e){this.options.forEach(o=>{R.getNotifier(o).unsubscribe(this,"value")}),super.slottedOptionsChanged(t,e),this.options.forEach(o=>{R.getNotifier(o).subscribe(this,"value")}),this.setProxyOptions(),this.updateValue()}mousedownHandler(t){var e;return t.offsetX>=0&&t.offsetX<=((e=this.listbox)===null||e===void 0?void 0:e.scrollWidth)?super.mousedownHandler(t):this.collapsible}multipleChanged(t,e){super.multipleChanged(t,e),this.proxy&&(this.proxy.multiple=e)}selectedOptionsChanged(t,e){var o;super.selectedOptionsChanged(t,e),(o=this.options)===null||o===void 0||o.forEach((s,n)=>{var a;const l=(a=this.proxy)===null||a===void 0?void 0:a.options.item(n);l&&(l.selected=s.selected)})}setDefaultSelectedOption(){var t;const e=(t=this.options)!==null&&t!==void 0?t:Array.from(this.children).filter($t.slottedOptionFilter),o=e==null?void 0:e.findIndex(s=>s.hasAttribute("selected")||s.selected||s.value===this.value);if(o!==-1){this.selectedIndex=o;return}this.selectedIndex=0}setProxyOptions(){this.proxy instanceof HTMLSelectElement&&this.options&&(this.proxy.options.length=0,this.options.forEach(t=>{const e=t.proxy||(t instanceof HTMLOptionElement?t.cloneNode():null);e&&this.proxy.options.add(e)}))}keydownHandler(t){super.keydownHandler(t);const e=t.key||t.key.charCodeAt(0);switch(e){case je:{t.preventDefault(),this.collapsible&&this.typeAheadExpired&&(this.open=!this.open);break}case ne:case re:{t.preventDefault();break}case Jt:{t.preventDefault(),this.open=!this.open;break}case Ne:{this.collapsible&&this.open&&(t.preventDefault(),this.open=!1);break}case vo:return this.collapsible&&this.open&&(t.preventDefault(),this.open=!1),!0}return!this.open&&this.indexWhenOpened!==this.selectedIndex&&(this.updateValue(!0),this.indexWhenOpened=this.selectedIndex),!(e===Vt||e===Ht)}connectedCallback(){super.connectedCallback(),this.forcedPosition=!!this.positionAttribute,this.addEventListener("contentchange",this.updateDisplayValue)}disconnectedCallback(){this.removeEventListener("contentchange",this.updateDisplayValue),super.disconnectedCallback()}sizeChanged(t,e){super.sizeChanged(t,e),this.proxy&&(this.proxy.size=e)}updateDisplayValue(){this.collapsible&&R.notify(this,"displayValue")}};r([d({attribute:"open",mode:"boolean"})],le.prototype,"open",void 0);r([Va],le.prototype,"collapsible",null);r([f],le.prototype,"control",void 0);r([d({attribute:"position"})],le.prototype,"positionAttribute",void 0);r([f],le.prototype,"position",void 0);r([f],le.prototype,"maxHeight",void 0);class As{}r([f],As.prototype,"ariaControls",void 0);tt(As,Se);tt(le,Lt,As);const Nh=(i,t)=>b`
    <template
        class="${e=>[e.collapsible&&"collapsible",e.collapsible&&e.open&&"open",e.disabled&&"disabled",e.collapsible&&e.position].filter(Boolean).join(" ")}"
        aria-activedescendant="${e=>e.ariaActiveDescendant}"
        aria-controls="${e=>e.ariaControls}"
        aria-disabled="${e=>e.ariaDisabled}"
        aria-expanded="${e=>e.ariaExpanded}"
        aria-haspopup="${e=>e.collapsible?"listbox":null}"
        aria-multiselectable="${e=>e.ariaMultiSelectable}"
        ?open="${e=>e.open}"
        role="combobox"
        tabindex="${e=>e.disabled?null:"0"}"
        @click="${(e,o)=>e.clickHandler(o.event)}"
        @focusin="${(e,o)=>e.focusinHandler(o.event)}"
        @focusout="${(e,o)=>e.focusoutHandler(o.event)}"
        @keydown="${(e,o)=>e.keydownHandler(o.event)}"
        @mousedown="${(e,o)=>e.mousedownHandler(o.event)}"
    >
        ${G(e=>e.collapsible,b`
                <div
                    class="control"
                    part="control"
                    ?disabled="${e=>e.disabled}"
                    ${N("control")}
                >
                    ${Dt(i,t)}
                    <slot name="button-container">
                        <div class="selected-value" part="selected-value">
                            <slot name="selected-value">${e=>e.displayValue}</slot>
                        </div>
                        <div aria-hidden="true" class="indicator" part="indicator">
                            <slot name="indicator">
                                ${t.indicator||""}
                            </slot>
                        </div>
                    </slot>
                    ${Ft(i,t)}
                </div>
            `)}
        <div
            class="listbox"
            id="${e=>e.listboxId}"
            part="listbox"
            role="listbox"
            ?disabled="${e=>e.disabled}"
            ?hidden="${e=>e.collapsible?!e.open:!1}"
            ${N("listbox")}
        >
            <slot
                ${Z({filter:$t.slottedOptionFilter,flatten:!0,property:"slottedOptions"})}
            ></slot>
        </div>
    </template>
`,jh=(i,t)=>b`
    <template
        class="${e=>e.shape==="circle"?"circle":"rect"}"
        pattern="${e=>e.pattern}"
        ?shimmer="${e=>e.shimmer}"
    >
        ${G(e=>e.shimmer===!0,b`
                <span class="shimmer"></span>
            `)}
        <object type="image/svg+xml" data="${e=>e.pattern}" role="presentation">
            <img class="pattern" src="${e=>e.pattern}" />
        </object>
        <slot></slot>
    </template>
`;class Ui extends D{constructor(){super(...arguments),this.shape="rect"}}r([d],Ui.prototype,"fill",void 0);r([d],Ui.prototype,"shape",void 0);r([d],Ui.prototype,"pattern",void 0);r([d({mode:"boolean"})],Ui.prototype,"shimmer",void 0);const _h=(i,t)=>b`
    <template
        aria-disabled="${e=>e.disabled}"
        class="${e=>e.sliderOrientation||it.horizontal}
            ${e=>e.disabled?"disabled":""}"
    >
        <div ${N("root")} part="root" class="root" style="${e=>e.positionStyle}">
            <div class="container">
                ${G(e=>!e.hideMark,b`
                        <div class="mark"></div>
                    `)}
                <div class="label">
                    <slot></slot>
                </div>
            </div>
        </div>
    </template>
`;function ps(i,t,e,o){let s=Fs(0,1,(i-t)/(e-t));return o===J.rtl&&(s=1-s),s}const eo={min:0,max:0,direction:J.ltr,orientation:it.horizontal,disabled:!1};let ce=class extends D{constructor(){super(...arguments),this.hideMark=!1,this.sliderDirection=J.ltr,this.getSliderConfiguration=()=>{if(!this.isSliderConfig(this.parentNode))this.sliderDirection=eo.direction||J.ltr,this.sliderOrientation=eo.orientation,this.sliderMaxPosition=eo.max,this.sliderMinPosition=eo.min;else{const t=this.parentNode,{min:e,max:o,direction:s,orientation:n,disabled:a}=t;a!==void 0&&(this.disabled=a),this.sliderDirection=s||J.ltr,this.sliderOrientation=n||it.horizontal,this.sliderMaxPosition=o,this.sliderMinPosition=e}},this.positionAsStyle=()=>{const t=this.sliderDirection?this.sliderDirection:J.ltr,e=ps(Number(this.position),Number(this.sliderMinPosition),Number(this.sliderMaxPosition));let o=Math.round((1-e)*100),s=Math.round(e*100);return Number.isNaN(s)&&Number.isNaN(o)&&(o=50,s=50),this.sliderOrientation===it.horizontal?t===J.rtl?`right: ${s}%; left: ${o}%;`:`left: ${s}%; right: ${o}%;`:`top: ${s}%; bottom: ${o}%;`}}positionChanged(){this.positionStyle=this.positionAsStyle()}sliderOrientationChanged(){}connectedCallback(){super.connectedCallback(),this.getSliderConfiguration(),this.positionStyle=this.positionAsStyle(),this.notifier=R.getNotifier(this.parentNode),this.notifier.subscribe(this,"orientation"),this.notifier.subscribe(this,"direction"),this.notifier.subscribe(this,"max"),this.notifier.subscribe(this,"min")}disconnectedCallback(){super.disconnectedCallback(),this.notifier.unsubscribe(this,"orientation"),this.notifier.unsubscribe(this,"direction"),this.notifier.unsubscribe(this,"max"),this.notifier.unsubscribe(this,"min")}handleChange(t,e){switch(e){case"direction":this.sliderDirection=t.direction;break;case"orientation":this.sliderOrientation=t.orientation;break;case"max":this.sliderMaxPosition=t.max;break;case"min":this.sliderMinPosition=t.min;break}this.positionStyle=this.positionAsStyle()}isSliderConfig(t){return t.max!==void 0&&t.min!==void 0}};r([f],ce.prototype,"positionStyle",void 0);r([d],ce.prototype,"position",void 0);r([d({attribute:"hide-mark",mode:"boolean"})],ce.prototype,"hideMark",void 0);r([d({attribute:"disabled",mode:"boolean"})],ce.prototype,"disabled",void 0);r([f],ce.prototype,"sliderOrientation",void 0);r([f],ce.prototype,"sliderMinPosition",void 0);r([f],ce.prototype,"sliderMaxPosition",void 0);r([f],ce.prototype,"sliderDirection",void 0);const qh=(i,t)=>b`
    <template
        role="slider"
        class="${e=>e.readOnly?"readonly":""}
        ${e=>e.orientation||it.horizontal}"
        tabindex="${e=>e.disabled?null:0}"
        aria-valuetext="${e=>e.valueTextFormatter(e.value)}"
        aria-valuenow="${e=>e.value}"
        aria-valuemin="${e=>e.min}"
        aria-valuemax="${e=>e.max}"
        aria-disabled="${e=>e.disabled?!0:void 0}"
        aria-readonly="${e=>e.readOnly?!0:void 0}"
        aria-orientation="${e=>e.orientation}"
        class="${e=>e.orientation}"
    >
        <div part="positioning-region" class="positioning-region">
            <div ${N("track")} part="track-container" class="track">
                <slot name="track"></slot>
                <div part="track-start" class="track-start" style="${e=>e.position}">
                    <slot name="track-start"></slot>
                </div>
            </div>
            <slot></slot>
            <div
                ${N("thumb")}
                part="thumb-container"
                class="thumb-container"
                style="${e=>e.position}"
            >
                <slot name="thumb">${t.thumb||""}</slot>
            </div>
        </div>
    </template>
`;class Uh extends D{}class Gh extends ae(Uh){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const Wh={singleValue:"single-value"};class wt extends Gh{constructor(){super(...arguments),this.direction=J.ltr,this.isDragging=!1,this.trackWidth=0,this.trackMinWidth=0,this.trackHeight=0,this.trackLeft=0,this.trackMinHeight=0,this.valueTextFormatter=()=>null,this.min=0,this.max=10,this.step=1,this.orientation=it.horizontal,this.mode=Wh.singleValue,this.keypressHandler=t=>{if(!this.readOnly){if(t.key===ne)t.preventDefault(),this.value=`${this.min}`;else if(t.key===re)t.preventDefault(),this.value=`${this.max}`;else if(!t.shiftKey)switch(t.key){case me:case Ht:t.preventDefault(),this.increment();break;case ge:case Vt:t.preventDefault(),this.decrement();break}}},this.setupTrackConstraints=()=>{const t=this.track.getBoundingClientRect();this.trackWidth=this.track.clientWidth,this.trackMinWidth=this.track.clientLeft,this.trackHeight=t.bottom,this.trackMinHeight=t.top,this.trackLeft=this.getBoundingClientRect().left,this.trackWidth===0&&(this.trackWidth=1)},this.setupListeners=(t=!1)=>{const e=`${t?"remove":"add"}EventListener`;this[e]("keydown",this.keypressHandler),this[e]("mousedown",this.handleMouseDown),this.thumb[e]("mousedown",this.handleThumbMouseDown,{passive:!0}),this.thumb[e]("touchstart",this.handleThumbMouseDown,{passive:!0}),t&&(this.handleMouseDown(null),this.handleThumbMouseDown(null))},this.initialValue="",this.handleThumbMouseDown=t=>{if(t){if(this.readOnly||this.disabled||t.defaultPrevented)return;t.target.focus()}const e=`${t!==null?"add":"remove"}EventListener`;window[e]("mouseup",this.handleWindowMouseUp),window[e]("mousemove",this.handleMouseMove,{passive:!0}),window[e]("touchmove",this.handleMouseMove,{passive:!0}),window[e]("touchend",this.handleWindowMouseUp),this.isDragging=t!==null},this.handleMouseMove=t=>{if(this.readOnly||this.disabled||t.defaultPrevented)return;const e=window.TouchEvent&&t instanceof TouchEvent?t.touches[0]:t,o=this.orientation===it.horizontal?e.pageX-document.documentElement.scrollLeft-this.trackLeft:e.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(o)}`},this.calculateNewValue=t=>{const e=ps(t,this.orientation===it.horizontal?this.trackMinWidth:this.trackMinHeight,this.orientation===it.horizontal?this.trackWidth:this.trackHeight,this.direction),o=(this.max-this.min)*e+this.min;return this.convertToConstrainedValue(o)},this.handleWindowMouseUp=t=>{this.stopDragging()},this.stopDragging=()=>{this.isDragging=!1,this.handleMouseDown(null),this.handleThumbMouseDown(null)},this.handleMouseDown=t=>{const e=`${t!==null?"add":"remove"}EventListener`;if((t===null||!this.disabled&&!this.readOnly)&&(window[e]("mouseup",this.handleWindowMouseUp),window.document[e]("mouseleave",this.handleWindowMouseUp),window[e]("mousemove",this.handleMouseMove),t)){t.preventDefault(),this.setupTrackConstraints(),t.target.focus();const o=this.orientation===it.horizontal?t.pageX-document.documentElement.scrollLeft-this.trackLeft:t.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(o)}`}},this.convertToConstrainedValue=t=>{isNaN(t)&&(t=this.min);let e=t-this.min;const o=Math.round(e/this.step),s=e-o*(this.stepMultiplier*this.step)/this.stepMultiplier;return e=s>=Number(this.step)/2?e-s+Number(this.step):e-s,e+this.min}}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}get valueAsNumber(){return parseFloat(super.value)}set valueAsNumber(t){this.value=t.toString()}valueChanged(t,e){super.valueChanged(t,e),this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction),this.$emit("change")}minChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.min=`${this.min}`),this.validate()}maxChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.max=`${this.max}`),this.validate()}stepChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.step=`${this.step}`),this.updateStepMultiplier(),this.validate()}orientationChanged(){this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type","range"),this.direction=He(this),this.updateStepMultiplier(),this.setupTrackConstraints(),this.setupListeners(),this.setupDefaultValue(),this.setThumbPositionForOrientation(this.direction)}disconnectedCallback(){this.setupListeners(!0)}increment(){const t=this.direction!==J.rtl&&this.orientation!==it.vertical?Number(this.value)+Number(this.step):Number(this.value)-Number(this.step),e=this.convertToConstrainedValue(t),o=e<Number(this.max)?`${e}`:`${this.max}`;this.value=o}decrement(){const t=this.direction!==J.rtl&&this.orientation!==it.vertical?Number(this.value)-Number(this.step):Number(this.value)+Number(this.step),e=this.convertToConstrainedValue(t),o=e>Number(this.min)?`${e}`:`${this.min}`;this.value=o}setThumbPositionForOrientation(t){const o=(1-ps(Number(this.value),Number(this.min),Number(this.max),t))*100;this.orientation===it.horizontal?this.position=this.isDragging?`right: ${o}%; transition: none;`:`right: ${o}%; transition: all 0.2s ease;`:this.position=this.isDragging?`bottom: ${o}%; transition: none;`:`bottom: ${o}%; transition: all 0.2s ease;`}updateStepMultiplier(){const t=this.step+"",e=this.step%1?t.length-t.indexOf(".")-1:0;this.stepMultiplier=Math.pow(10,e)}get midpoint(){return`${this.convertToConstrainedValue((this.max+this.min)/2)}`}setupDefaultValue(){if(typeof this.value=="string")if(this.value.length===0)this.initialValue=this.midpoint;else{const t=parseFloat(this.value);!Number.isNaN(t)&&(t<this.min||t>this.max)&&(this.value=this.midpoint)}}}r([d({attribute:"readonly",mode:"boolean"})],wt.prototype,"readOnly",void 0);r([f],wt.prototype,"direction",void 0);r([f],wt.prototype,"isDragging",void 0);r([f],wt.prototype,"position",void 0);r([f],wt.prototype,"trackWidth",void 0);r([f],wt.prototype,"trackMinWidth",void 0);r([f],wt.prototype,"trackHeight",void 0);r([f],wt.prototype,"trackLeft",void 0);r([f],wt.prototype,"trackMinHeight",void 0);r([f],wt.prototype,"valueTextFormatter",void 0);r([d({converter:w})],wt.prototype,"min",void 0);r([d({converter:w})],wt.prototype,"max",void 0);r([d({converter:w})],wt.prototype,"step",void 0);r([d],wt.prototype,"orientation",void 0);r([d],wt.prototype,"mode",void 0);const Xh=(i,t)=>b`
    <template
        role="switch"
        aria-checked="${e=>e.checked}"
        aria-disabled="${e=>e.disabled}"
        aria-readonly="${e=>e.readOnly}"
        tabindex="${e=>e.disabled?null:0}"
        @keypress="${(e,o)=>e.keypressHandler(o.event)}"
        @click="${(e,o)=>e.clickHandler(o.event)}"
        class="${e=>e.checked?"checked":""}"
    >
        <label
            part="label"
            class="${e=>e.defaultSlottedNodes&&e.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot ${Z("defaultSlottedNodes")}></slot>
        </label>
        <div part="switch" class="switch">
            <slot name="switch">${t.switch||""}</slot>
        </div>
        <span class="status-message" part="status-message">
            <span class="checked-message" part="checked-message">
                <slot name="checked-message"></slot>
            </span>
            <span class="unchecked-message" part="unchecked-message">
                <slot name="unchecked-message"></slot>
            </span>
        </span>
    </template>
`;class Yh extends D{}class Qh extends Rs(Yh){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class Ps extends Qh{constructor(){super(),this.initialValue="on",this.keypressHandler=t=>{if(!this.readOnly)switch(t.key){case Jt:case je:this.checked=!this.checked;break}},this.clickHandler=t=>{!this.disabled&&!this.readOnly&&(this.checked=!this.checked)},this.proxy.setAttribute("type","checkbox")}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly),this.readOnly?this.classList.add("readonly"):this.classList.remove("readonly")}checkedChanged(t,e){super.checkedChanged(t,e),this.checked?this.classList.add("checked"):this.classList.remove("checked")}}r([d({attribute:"readonly",mode:"boolean"})],Ps.prototype,"readOnly",void 0);r([f],Ps.prototype,"defaultSlottedNodes",void 0);const Zh=(i,t)=>b`
    <template slot="tabpanel" role="tabpanel">
        <slot></slot>
    </template>
`;class Jh extends D{}const Kh=(i,t)=>b`
    <template slot="tab" role="tab" aria-disabled="${e=>e.disabled}">
        <slot></slot>
    </template>
`;class Fr extends D{}r([d({mode:"boolean"})],Fr.prototype,"disabled",void 0);const td=(i,t)=>b`
    <template class="${e=>e.orientation}">
        ${Dt(i,t)}
        <div class="tablist" part="tablist" role="tablist">
            <slot class="tab" name="tab" part="tab" ${Z("tabs")}></slot>

            ${G(e=>e.showActiveIndicator,b`
                    <div
                        ${N("activeIndicatorRef")}
                        class="activeIndicator"
                        part="activeIndicator"
                    ></div>
                `)}
        </div>
        ${Ft(i,t)}
        <div class="tabpanel">
            <slot name="tabpanel" part="tabpanel" ${Z("tabpanels")}></slot>
        </div>
    </template>
`,En={vertical:"vertical",horizontal:"horizontal"};class xe extends D{constructor(){super(...arguments),this.orientation=En.horizontal,this.activeindicator=!0,this.showActiveIndicator=!0,this.prevActiveTabIndex=0,this.activeTabIndex=0,this.ticking=!1,this.change=()=>{this.$emit("change",this.activetab)},this.isDisabledElement=t=>t.getAttribute("aria-disabled")==="true",this.isFocusableElement=t=>!this.isDisabledElement(t),this.setTabs=()=>{const t="gridColumn",e="gridRow",o=this.isHorizontal()?t:e;this.activeTabIndex=this.getActiveIndex(),this.showActiveIndicator=!1,this.tabs.forEach((s,n)=>{if(s.slot==="tab"){const a=this.activeTabIndex===n&&this.isFocusableElement(s);this.activeindicator&&this.isFocusableElement(s)&&(this.showActiveIndicator=!0);const l=this.tabIds[n],h=this.tabpanelIds[n];s.setAttribute("id",l),s.setAttribute("aria-selected",a?"true":"false"),s.setAttribute("aria-controls",h),s.addEventListener("click",this.handleTabClick),s.addEventListener("keydown",this.handleTabKeyDown),s.setAttribute("tabindex",a?"0":"-1"),a&&(this.activetab=s)}s.style[t]="",s.style[e]="",s.style[o]=`${n+1}`,this.isHorizontal()?s.classList.remove("vertical"):s.classList.add("vertical")})},this.setTabPanels=()=>{this.tabpanels.forEach((t,e)=>{const o=this.tabIds[e],s=this.tabpanelIds[e];t.setAttribute("id",s),t.setAttribute("aria-labelledby",o),this.activeTabIndex!==e?t.setAttribute("hidden",""):t.removeAttribute("hidden")})},this.handleTabClick=t=>{const e=t.currentTarget;e.nodeType===1&&this.isFocusableElement(e)&&(this.prevActiveTabIndex=this.activeTabIndex,this.activeTabIndex=this.tabs.indexOf(e),this.setComponent())},this.handleTabKeyDown=t=>{if(this.isHorizontal())switch(t.key){case ge:t.preventDefault(),this.adjustBackward(t);break;case me:t.preventDefault(),this.adjustForward(t);break}else switch(t.key){case Ht:t.preventDefault(),this.adjustBackward(t);break;case Vt:t.preventDefault(),this.adjustForward(t);break}switch(t.key){case ne:t.preventDefault(),this.adjust(-this.activeTabIndex);break;case re:t.preventDefault(),this.adjust(this.tabs.length-this.activeTabIndex-1);break}},this.adjustForward=t=>{const e=this.tabs;let o=0;for(o=this.activetab?e.indexOf(this.activetab)+1:1,o===e.length&&(o=0);o<e.length&&e.length>1;)if(this.isFocusableElement(e[o])){this.moveToTabByIndex(e,o);break}else{if(this.activetab&&o===e.indexOf(this.activetab))break;o+1>=e.length?o=0:o+=1}},this.adjustBackward=t=>{const e=this.tabs;let o=0;for(o=this.activetab?e.indexOf(this.activetab)-1:0,o=o<0?e.length-1:o;o>=0&&e.length>1;)if(this.isFocusableElement(e[o])){this.moveToTabByIndex(e,o);break}else o-1<0?o=e.length-1:o-=1},this.moveToTabByIndex=(t,e)=>{const o=t[e];this.activetab=o,this.prevActiveTabIndex=this.activeTabIndex,this.activeTabIndex=e,o.focus(),this.setComponent()}}orientationChanged(){this.$fastController.isConnected&&(this.setTabs(),this.setTabPanels(),this.handleActiveIndicatorPosition())}activeidChanged(t,e){this.$fastController.isConnected&&this.tabs.length<=this.tabpanels.length&&(this.prevActiveTabIndex=this.tabs.findIndex(o=>o.id===t),this.setTabs(),this.setTabPanels(),this.handleActiveIndicatorPosition())}tabsChanged(){this.$fastController.isConnected&&this.tabs.length<=this.tabpanels.length&&(this.tabIds=this.getTabIds(),this.tabpanelIds=this.getTabPanelIds(),this.setTabs(),this.setTabPanels(),this.handleActiveIndicatorPosition())}tabpanelsChanged(){this.$fastController.isConnected&&this.tabpanels.length<=this.tabs.length&&(this.tabIds=this.getTabIds(),this.tabpanelIds=this.getTabPanelIds(),this.setTabs(),this.setTabPanels(),this.handleActiveIndicatorPosition())}getActiveIndex(){return this.activeid!==void 0?this.tabIds.indexOf(this.activeid)===-1?0:this.tabIds.indexOf(this.activeid):0}getTabIds(){return this.tabs.map(t=>{var e;return(e=t.getAttribute("id"))!==null&&e!==void 0?e:`tab-${Ve()}`})}getTabPanelIds(){return this.tabpanels.map(t=>{var e;return(e=t.getAttribute("id"))!==null&&e!==void 0?e:`panel-${Ve()}`})}setComponent(){this.activeTabIndex!==this.prevActiveTabIndex&&(this.activeid=this.tabIds[this.activeTabIndex],this.focusTab(),this.change())}isHorizontal(){return this.orientation===En.horizontal}handleActiveIndicatorPosition(){this.showActiveIndicator&&this.activeindicator&&this.activeTabIndex!==this.prevActiveTabIndex&&(this.ticking?this.ticking=!1:(this.ticking=!0,this.animateActiveIndicator()))}animateActiveIndicator(){this.ticking=!0;const t=this.isHorizontal()?"gridColumn":"gridRow",e=this.isHorizontal()?"translateX":"translateY",o=this.isHorizontal()?"offsetLeft":"offsetTop",s=this.activeIndicatorRef[o];this.activeIndicatorRef.style[t]=`${this.activeTabIndex+1}`;const n=this.activeIndicatorRef[o];this.activeIndicatorRef.style[t]=`${this.prevActiveTabIndex+1}`;const a=n-s;this.activeIndicatorRef.style.transform=`${e}(${a}px)`,this.activeIndicatorRef.classList.add("activeIndicatorTransition"),this.activeIndicatorRef.addEventListener("transitionend",()=>{this.ticking=!1,this.activeIndicatorRef.style[t]=`${this.activeTabIndex+1}`,this.activeIndicatorRef.style.transform=`${e}(0px)`,this.activeIndicatorRef.classList.remove("activeIndicatorTransition")})}adjust(t){this.prevActiveTabIndex=this.activeTabIndex,this.activeTabIndex=dr(0,this.tabs.length-1,this.activeTabIndex+t),this.setComponent()}focusTab(){this.tabs[this.activeTabIndex].focus()}connectedCallback(){super.connectedCallback(),this.tabIds=this.getTabIds(),this.tabpanelIds=this.getTabPanelIds(),this.activeTabIndex=this.getActiveIndex()}}r([d],xe.prototype,"orientation",void 0);r([d],xe.prototype,"activeid",void 0);r([f],xe.prototype,"tabs",void 0);r([f],xe.prototype,"tabpanels",void 0);r([d({mode:"boolean"})],xe.prototype,"activeindicator",void 0);r([f],xe.prototype,"activeIndicatorRef",void 0);r([f],xe.prototype,"showActiveIndicator",void 0);tt(xe,Lt);class ed extends D{}class id extends ae(ed){constructor(){super(...arguments),this.proxy=document.createElement("textarea")}}const Dr={none:"none",both:"both",horizontal:"horizontal",vertical:"vertical"};let kt=class extends id{constructor(){super(...arguments),this.resize=Dr.none,this.cols=20,this.handleTextInput=()=>{this.value=this.control.value}}readOnlyChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.readOnly=this.readOnly)}autofocusChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.autofocus=this.autofocus)}listChanged(){this.proxy instanceof HTMLTextAreaElement&&this.proxy.setAttribute("list",this.list)}maxlengthChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.maxLength=this.maxlength)}minlengthChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.minLength=this.minlength)}spellcheckChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.spellcheck=this.spellcheck)}select(){this.control.select(),this.$emit("select")}handleChange(){this.$emit("change")}validate(){super.validate(this.control)}};r([d({mode:"boolean"})],kt.prototype,"readOnly",void 0);r([d],kt.prototype,"resize",void 0);r([d({mode:"boolean"})],kt.prototype,"autofocus",void 0);r([d({attribute:"form"})],kt.prototype,"formId",void 0);r([d],kt.prototype,"list",void 0);r([d({converter:w})],kt.prototype,"maxlength",void 0);r([d({converter:w})],kt.prototype,"minlength",void 0);r([d],kt.prototype,"name",void 0);r([d],kt.prototype,"placeholder",void 0);r([d({converter:w,mode:"fromView"})],kt.prototype,"cols",void 0);r([d({converter:w,mode:"fromView"})],kt.prototype,"rows",void 0);r([d({mode:"boolean"})],kt.prototype,"spellcheck",void 0);r([f],kt.prototype,"defaultSlottedNodes",void 0);tt(kt,Io);const od=(i,t)=>b`
    <template
        class="
            ${e=>e.readOnly?"readonly":""}
            ${e=>e.resize!==Dr.none?`resize-${e.resize}`:""}"
    >
        <label
            part="label"
            for="control"
            class="${e=>e.defaultSlottedNodes&&e.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot ${Z("defaultSlottedNodes")}></slot>
        </label>
        <textarea
            part="control"
            class="control"
            id="control"
            ?autofocus="${e=>e.autofocus}"
            cols="${e=>e.cols}"
            ?disabled="${e=>e.disabled}"
            form="${e=>e.form}"
            list="${e=>e.list}"
            maxlength="${e=>e.maxlength}"
            minlength="${e=>e.minlength}"
            name="${e=>e.name}"
            placeholder="${e=>e.placeholder}"
            ?readonly="${e=>e.readOnly}"
            ?required="${e=>e.required}"
            rows="${e=>e.rows}"
            ?spellcheck="${e=>e.spellcheck}"
            :value="${e=>e.value}"
            aria-atomic="${e=>e.ariaAtomic}"
            aria-busy="${e=>e.ariaBusy}"
            aria-controls="${e=>e.ariaControls}"
            aria-current="${e=>e.ariaCurrent}"
            aria-describedby="${e=>e.ariaDescribedby}"
            aria-details="${e=>e.ariaDetails}"
            aria-disabled="${e=>e.ariaDisabled}"
            aria-errormessage="${e=>e.ariaErrormessage}"
            aria-flowto="${e=>e.ariaFlowto}"
            aria-haspopup="${e=>e.ariaHaspopup}"
            aria-hidden="${e=>e.ariaHidden}"
            aria-invalid="${e=>e.ariaInvalid}"
            aria-keyshortcuts="${e=>e.ariaKeyshortcuts}"
            aria-label="${e=>e.ariaLabel}"
            aria-labelledby="${e=>e.ariaLabelledby}"
            aria-live="${e=>e.ariaLive}"
            aria-owns="${e=>e.ariaOwns}"
            aria-relevant="${e=>e.ariaRelevant}"
            aria-roledescription="${e=>e.ariaRoledescription}"
            @input="${(e,o)=>e.handleTextInput()}"
            @change="${e=>e.handleChange()}"
            ${N("control")}
        ></textarea>
    </template>
`,sd=(i,t)=>b`
    <template
        class="
            ${e=>e.readOnly?"readonly":""}
        "
    >
        <label
            part="label"
            for="control"
            class="${e=>e.defaultSlottedNodes&&e.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot
                ${Z({property:"defaultSlottedNodes",filter:Tr})}
            ></slot>
        </label>
        <div class="root" part="root">
            ${Dt(i,t)}
            <input
                class="control"
                part="control"
                id="control"
                @input="${e=>e.handleTextInput()}"
                @change="${e=>e.handleChange()}"
                ?autofocus="${e=>e.autofocus}"
                ?disabled="${e=>e.disabled}"
                list="${e=>e.list}"
                maxlength="${e=>e.maxlength}"
                minlength="${e=>e.minlength}"
                pattern="${e=>e.pattern}"
                placeholder="${e=>e.placeholder}"
                ?readonly="${e=>e.readOnly}"
                ?required="${e=>e.required}"
                size="${e=>e.size}"
                ?spellcheck="${e=>e.spellcheck}"
                :value="${e=>e.value}"
                type="${e=>e.type}"
                aria-atomic="${e=>e.ariaAtomic}"
                aria-busy="${e=>e.ariaBusy}"
                aria-controls="${e=>e.ariaControls}"
                aria-current="${e=>e.ariaCurrent}"
                aria-describedby="${e=>e.ariaDescribedby}"
                aria-details="${e=>e.ariaDetails}"
                aria-disabled="${e=>e.ariaDisabled}"
                aria-errormessage="${e=>e.ariaErrormessage}"
                aria-flowto="${e=>e.ariaFlowto}"
                aria-haspopup="${e=>e.ariaHaspopup}"
                aria-hidden="${e=>e.ariaHidden}"
                aria-invalid="${e=>e.ariaInvalid}"
                aria-keyshortcuts="${e=>e.ariaKeyshortcuts}"
                aria-label="${e=>e.ariaLabel}"
                aria-labelledby="${e=>e.ariaLabelledby}"
                aria-live="${e=>e.ariaLive}"
                aria-owns="${e=>e.ariaOwns}"
                aria-relevant="${e=>e.ariaRelevant}"
                aria-roledescription="${e=>e.ariaRoledescription}"
                ${N("control")}
            />
            ${Ft(i,t)}
        </div>
    </template>
`,nd=(i,t)=>b`
    <template
        aria-label="${e=>e.ariaLabel}"
        aria-labelledby="${e=>e.ariaLabelledby}"
        aria-orientation="${e=>e.orientation}"
        orientation="${e=>e.orientation}"
        role="toolbar"
        @click="${(e,o)=>e.clickHandler(o.event)}"
        @focusin="${(e,o)=>e.focusinHandler(o.event)}"
        @keydown="${(e,o)=>e.keydownHandler(o.event)}"
        ${bo({property:"childItems",attributeFilter:["disabled","hidden"],filter:fe(),subtree:!0})}
    >
        <slot name="label"></slot>
        <div class="positioning-region" part="positioning-region">
            ${Dt(i,t)}
            <slot
                ${Z({filter:fe(),property:"slottedItems"})}
            ></slot>
            ${Ft(i,t)}
        </div>
    </template>
`,Rn=Object.freeze({[si.ArrowUp]:{[it.vertical]:-1},[si.ArrowDown]:{[it.vertical]:1},[si.ArrowLeft]:{[it.horizontal]:{[J.ltr]:-1,[J.rtl]:1}},[si.ArrowRight]:{[it.horizontal]:{[J.ltr]:1,[J.rtl]:-1}}});let ie=class extends D{constructor(){super(...arguments),this._activeIndex=0,this.direction=J.ltr,this.orientation=it.horizontal}get activeIndex(){return R.track(this,"activeIndex"),this._activeIndex}set activeIndex(t){this.$fastController.isConnected&&(this._activeIndex=Fs(0,this.focusableElements.length-1,t),R.notify(this,"activeIndex"))}slottedItemsChanged(){this.$fastController.isConnected&&this.reduceFocusableElements()}clickHandler(t){var e;const o=(e=this.focusableElements)===null||e===void 0?void 0:e.indexOf(t.target);return o>-1&&this.activeIndex!==o&&this.setFocusedElement(o),!0}childItemsChanged(t,e){this.$fastController.isConnected&&this.reduceFocusableElements()}connectedCallback(){super.connectedCallback(),this.direction=He(this)}focusinHandler(t){const e=t.relatedTarget;!e||this.contains(e)||this.setFocusedElement()}getDirectionalIncrementer(t){var e,o,s,n,a;return(a=(s=(o=(e=Rn[t])===null||e===void 0?void 0:e[this.orientation])===null||o===void 0?void 0:o[this.direction])!==null&&s!==void 0?s:(n=Rn[t])===null||n===void 0?void 0:n[this.orientation])!==null&&a!==void 0?a:0}keydownHandler(t){const e=t.key;if(!(e in si)||t.defaultPrevented||t.shiftKey)return!0;const o=this.getDirectionalIncrementer(e);if(!o)return!t.target.closest("[role=radiogroup]");const s=this.activeIndex+o;return this.focusableElements[s]&&t.preventDefault(),this.setFocusedElement(s),!0}get allSlottedItems(){return[...this.start.assignedElements(),...this.slottedItems,...this.end.assignedElements()]}reduceFocusableElements(){var t;const e=(t=this.focusableElements)===null||t===void 0?void 0:t[this.activeIndex];this.focusableElements=this.allSlottedItems.reduce(ie.reduceFocusableItems,[]);const o=this.focusableElements.indexOf(e);this.activeIndex=Math.max(0,o),this.setFocusableElements()}setFocusedElement(t=this.activeIndex){var e;this.activeIndex=t,this.setFocusableElements(),(e=this.focusableElements[this.activeIndex])===null||e===void 0||e.focus()}static reduceFocusableItems(t,e){var o,s,n,a;const l=e.getAttribute("role")==="radio",h=(s=(o=e.$fastController)===null||o===void 0?void 0:o.definition.shadowOptions)===null||s===void 0?void 0:s.delegatesFocus,u=Array.from((a=(n=e.shadowRoot)===null||n===void 0?void 0:n.querySelectorAll("*"))!==null&&a!==void 0?a:[]).some(p=>Fn(p));return!e.hasAttribute("disabled")&&!e.hasAttribute("hidden")&&(Fn(e)||l||h||u)?(t.push(e),t):e.childElementCount?t.concat(Array.from(e.children).reduce(ie.reduceFocusableItems,[])):t}setFocusableElements(){this.$fastController.isConnected&&this.focusableElements.length>0&&this.focusableElements.forEach((t,e)=>{t.tabIndex=this.activeIndex===e?0:-1})}};r([f],ie.prototype,"direction",void 0);r([d],ie.prototype,"orientation",void 0);r([f],ie.prototype,"slottedItems",void 0);r([f],ie.prototype,"slottedLabel",void 0);r([f],ie.prototype,"childItems",void 0);class So{}r([d({attribute:"aria-labelledby"})],So.prototype,"ariaLabelledby",void 0);r([d({attribute:"aria-label"})],So.prototype,"ariaLabel",void 0);tt(So,K);tt(ie,Lt,So);const rd=(i,t)=>b`
        ${G(e=>e.tooltipVisible,b`
            <${i.tagFor(j)}
                fixed-placement="true"
                auto-update-mode="${e=>e.autoUpdateMode}"
                vertical-positioning-mode="${e=>e.verticalPositioningMode}"
                vertical-default-position="${e=>e.verticalDefaultPosition}"
                vertical-inset="${e=>e.verticalInset}"
                vertical-scaling="${e=>e.verticalScaling}"
                horizontal-positioning-mode="${e=>e.horizontalPositioningMode}"
                horizontal-default-position="${e=>e.horizontalDefaultPosition}"
                horizontal-scaling="${e=>e.horizontalScaling}"
                horizontal-inset="${e=>e.horizontalInset}"
                vertical-viewport-lock="${e=>e.horizontalViewportLock}"
                horizontal-viewport-lock="${e=>e.verticalViewportLock}"
                dir="${e=>e.currentDirection}"
                ${N("region")}
            >
                <div class="tooltip" part="tooltip" role="tooltip">
                    <slot></slot>
                </div>
            </${i.tagFor(j)}>
        `)}
    `,Rt={top:"top",right:"right",bottom:"bottom",left:"left",start:"start",end:"end",topLeft:"top-left",topRight:"top-right",bottomLeft:"bottom-left",bottomRight:"bottom-right",topStart:"top-start",topEnd:"top-end",bottomStart:"bottom-start",bottomEnd:"bottom-end"};class ht extends D{constructor(){super(...arguments),this.anchor="",this.delay=300,this.autoUpdateMode="anchor",this.anchorElement=null,this.viewportElement=null,this.verticalPositioningMode="dynamic",this.horizontalPositioningMode="dynamic",this.horizontalInset="false",this.verticalInset="false",this.horizontalScaling="content",this.verticalScaling="content",this.verticalDefaultPosition=void 0,this.horizontalDefaultPosition=void 0,this.tooltipVisible=!1,this.currentDirection=J.ltr,this.showDelayTimer=null,this.hideDelayTimer=null,this.isAnchorHoveredFocused=!1,this.isRegionHovered=!1,this.handlePositionChange=t=>{this.classList.toggle("top",this.region.verticalPosition==="start"),this.classList.toggle("bottom",this.region.verticalPosition==="end"),this.classList.toggle("inset-top",this.region.verticalPosition==="insetStart"),this.classList.toggle("inset-bottom",this.region.verticalPosition==="insetEnd"),this.classList.toggle("center-vertical",this.region.verticalPosition==="center"),this.classList.toggle("left",this.region.horizontalPosition==="start"),this.classList.toggle("right",this.region.horizontalPosition==="end"),this.classList.toggle("inset-left",this.region.horizontalPosition==="insetStart"),this.classList.toggle("inset-right",this.region.horizontalPosition==="insetEnd"),this.classList.toggle("center-horizontal",this.region.horizontalPosition==="center")},this.handleRegionMouseOver=t=>{this.isRegionHovered=!0},this.handleRegionMouseOut=t=>{this.isRegionHovered=!1,this.startHideDelayTimer()},this.handleAnchorMouseOver=t=>{if(this.tooltipVisible){this.isAnchorHoveredFocused=!0;return}this.startShowDelayTimer()},this.handleAnchorMouseOut=t=>{this.isAnchorHoveredFocused=!1,this.clearShowDelayTimer(),this.startHideDelayTimer()},this.handleAnchorFocusIn=t=>{this.startShowDelayTimer()},this.handleAnchorFocusOut=t=>{this.isAnchorHoveredFocused=!1,this.clearShowDelayTimer(),this.startHideDelayTimer()},this.startHideDelayTimer=()=>{this.clearHideDelayTimer(),this.tooltipVisible&&(this.hideDelayTimer=window.setTimeout(()=>{this.updateTooltipVisibility()},60))},this.clearHideDelayTimer=()=>{this.hideDelayTimer!==null&&(clearTimeout(this.hideDelayTimer),this.hideDelayTimer=null)},this.startShowDelayTimer=()=>{if(!this.isAnchorHoveredFocused){if(this.delay>1){this.showDelayTimer===null&&(this.showDelayTimer=window.setTimeout(()=>{this.startHover()},this.delay));return}this.startHover()}},this.startHover=()=>{this.isAnchorHoveredFocused=!0,this.updateTooltipVisibility()},this.clearShowDelayTimer=()=>{this.showDelayTimer!==null&&(clearTimeout(this.showDelayTimer),this.showDelayTimer=null)},this.getAnchor=()=>{const t=this.getRootNode();return t instanceof ShadowRoot?t.getElementById(this.anchor):document.getElementById(this.anchor)},this.handleDocumentKeydown=t=>{if(!t.defaultPrevented&&this.tooltipVisible)switch(t.key){case Ne:this.isAnchorHoveredFocused=!1,this.updateTooltipVisibility(),this.$emit("dismiss");break}},this.updateTooltipVisibility=()=>{if(this.visible===!1)this.hideTooltip();else if(this.visible===!0){this.showTooltip();return}else{if(this.isAnchorHoveredFocused||this.isRegionHovered){this.showTooltip();return}this.hideTooltip()}},this.showTooltip=()=>{this.tooltipVisible||(this.currentDirection=He(this),this.tooltipVisible=!0,document.addEventListener("keydown",this.handleDocumentKeydown),S.queueUpdate(this.setRegionProps))},this.hideTooltip=()=>{this.tooltipVisible&&(this.clearHideDelayTimer(),this.region!==null&&this.region!==void 0&&(this.region.removeEventListener("positionchange",this.handlePositionChange),this.region.viewportElement=null,this.region.anchorElement=null,this.region.removeEventListener("mouseover",this.handleRegionMouseOver),this.region.removeEventListener("mouseout",this.handleRegionMouseOut)),document.removeEventListener("keydown",this.handleDocumentKeydown),this.tooltipVisible=!1)},this.setRegionProps=()=>{this.tooltipVisible&&(this.region.viewportElement=this.viewportElement,this.region.anchorElement=this.anchorElement,this.region.addEventListener("positionchange",this.handlePositionChange),this.region.addEventListener("mouseover",this.handleRegionMouseOver,{passive:!0}),this.region.addEventListener("mouseout",this.handleRegionMouseOut,{passive:!0}))}}visibleChanged(){this.$fastController.isConnected&&(this.updateTooltipVisibility(),this.updateLayout())}anchorChanged(){this.$fastController.isConnected&&(this.anchorElement=this.getAnchor())}positionChanged(){this.$fastController.isConnected&&this.updateLayout()}anchorElementChanged(t){if(this.$fastController.isConnected){if(t!=null&&(t.removeEventListener("mouseover",this.handleAnchorMouseOver),t.removeEventListener("mouseout",this.handleAnchorMouseOut),t.removeEventListener("focusin",this.handleAnchorFocusIn),t.removeEventListener("focusout",this.handleAnchorFocusOut)),this.anchorElement!==null&&this.anchorElement!==void 0){this.anchorElement.addEventListener("mouseover",this.handleAnchorMouseOver,{passive:!0}),this.anchorElement.addEventListener("mouseout",this.handleAnchorMouseOut,{passive:!0}),this.anchorElement.addEventListener("focusin",this.handleAnchorFocusIn,{passive:!0}),this.anchorElement.addEventListener("focusout",this.handleAnchorFocusOut,{passive:!0});const e=this.anchorElement.id;this.anchorElement.parentElement!==null&&this.anchorElement.parentElement.querySelectorAll(":hover").forEach(o=>{o.id===e&&this.startShowDelayTimer()})}this.region!==null&&this.region!==void 0&&this.tooltipVisible&&(this.region.anchorElement=this.anchorElement),this.updateLayout()}}viewportElementChanged(){this.region!==null&&this.region!==void 0&&(this.region.viewportElement=this.viewportElement),this.updateLayout()}connectedCallback(){super.connectedCallback(),this.anchorElement=this.getAnchor(),this.updateTooltipVisibility()}disconnectedCallback(){this.hideTooltip(),this.clearShowDelayTimer(),this.clearHideDelayTimer(),super.disconnectedCallback()}updateLayout(){switch(this.verticalPositioningMode="locktodefault",this.horizontalPositioningMode="locktodefault",this.position){case Rt.top:case Rt.bottom:this.verticalDefaultPosition=this.position,this.horizontalDefaultPosition="center";break;case Rt.right:case Rt.left:case Rt.start:case Rt.end:this.verticalDefaultPosition="center",this.horizontalDefaultPosition=this.position;break;case Rt.topLeft:this.verticalDefaultPosition="top",this.horizontalDefaultPosition="left";break;case Rt.topRight:this.verticalDefaultPosition="top",this.horizontalDefaultPosition="right";break;case Rt.bottomLeft:this.verticalDefaultPosition="bottom",this.horizontalDefaultPosition="left";break;case Rt.bottomRight:this.verticalDefaultPosition="bottom",this.horizontalDefaultPosition="right";break;case Rt.topStart:this.verticalDefaultPosition="top",this.horizontalDefaultPosition="start";break;case Rt.topEnd:this.verticalDefaultPosition="top",this.horizontalDefaultPosition="end";break;case Rt.bottomStart:this.verticalDefaultPosition="bottom",this.horizontalDefaultPosition="start";break;case Rt.bottomEnd:this.verticalDefaultPosition="bottom",this.horizontalDefaultPosition="end";break;default:this.verticalPositioningMode="dynamic",this.horizontalPositioningMode="dynamic",this.verticalDefaultPosition=void 0,this.horizontalDefaultPosition="center";break}}}r([d({mode:"boolean"})],ht.prototype,"visible",void 0);r([d],ht.prototype,"anchor",void 0);r([d],ht.prototype,"delay",void 0);r([d],ht.prototype,"position",void 0);r([d({attribute:"auto-update-mode"})],ht.prototype,"autoUpdateMode",void 0);r([d({attribute:"horizontal-viewport-lock"})],ht.prototype,"horizontalViewportLock",void 0);r([d({attribute:"vertical-viewport-lock"})],ht.prototype,"verticalViewportLock",void 0);r([f],ht.prototype,"anchorElement",void 0);r([f],ht.prototype,"viewportElement",void 0);r([f],ht.prototype,"verticalPositioningMode",void 0);r([f],ht.prototype,"horizontalPositioningMode",void 0);r([f],ht.prototype,"horizontalInset",void 0);r([f],ht.prototype,"verticalInset",void 0);r([f],ht.prototype,"horizontalScaling",void 0);r([f],ht.prototype,"verticalScaling",void 0);r([f],ht.prototype,"verticalDefaultPosition",void 0);r([f],ht.prototype,"horizontalDefaultPosition",void 0);r([f],ht.prototype,"tooltipVisible",void 0);r([f],ht.prototype,"currentDirection",void 0);const ad=(i,t)=>b`
    <template
        role="treeitem"
        slot="${e=>e.isNestedItem()?"item":void 0}"
        tabindex="-1"
        class="${e=>e.expanded?"expanded":""} ${e=>e.selected?"selected":""} ${e=>e.nested?"nested":""}
            ${e=>e.disabled?"disabled":""}"
        aria-expanded="${e=>e.childItems&&e.childItemLength()>0?e.expanded:void 0}"
        aria-selected="${e=>e.selected}"
        aria-disabled="${e=>e.disabled}"
        @focusin="${(e,o)=>e.handleFocus(o.event)}"
        @focusout="${(e,o)=>e.handleBlur(o.event)}"
        ${bo({property:"childItems",filter:fe()})}
    >
        <div class="positioning-region" part="positioning-region">
            <div class="content-region" part="content-region">
                ${G(e=>e.childItems&&e.childItemLength()>0,b`
                        <div
                            aria-hidden="true"
                            class="expand-collapse-button"
                            part="expand-collapse-button"
                            @click="${(e,o)=>e.handleExpandCollapseButtonClick(o.event)}"
                            ${N("expandCollapseButton")}
                        >
                            <slot name="expand-collapse-glyph">
                                ${t.expandCollapseGlyph||""}
                            </slot>
                        </div>
                    `)}
                ${Dt(i,t)}
                <slot></slot>
                ${Ft(i,t)}
            </div>
        </div>
        ${G(e=>e.childItems&&e.childItemLength()>0&&(e.expanded||e.renderCollapsedChildren),b`
                <div role="group" class="items" part="items">
                    <slot name="item" ${Z("items")}></slot>
                </div>
            `)}
    </template>
`;function Ce(i){return ci(i)&&i.getAttribute("role")==="treeitem"}class st extends D{constructor(){super(...arguments),this.expanded=!1,this.focusable=!1,this.isNestedItem=()=>Ce(this.parentElement),this.handleExpandCollapseButtonClick=t=>{!this.disabled&&!t.defaultPrevented&&(this.expanded=!this.expanded)},this.handleFocus=t=>{this.setAttribute("tabindex","0")},this.handleBlur=t=>{this.setAttribute("tabindex","-1")}}expandedChanged(){this.$fastController.isConnected&&this.$emit("expanded-change",this)}selectedChanged(){this.$fastController.isConnected&&this.$emit("selected-change",this)}itemsChanged(t,e){this.$fastController.isConnected&&this.items.forEach(o=>{Ce(o)&&(o.nested=!0)})}static focusItem(t){t.focusable=!0,t.focus()}childItemLength(){const t=this.childItems.filter(e=>Ce(e));return t?t.length:0}}r([d({mode:"boolean"})],st.prototype,"expanded",void 0);r([d({mode:"boolean"})],st.prototype,"selected",void 0);r([d({mode:"boolean"})],st.prototype,"disabled",void 0);r([f],st.prototype,"focusable",void 0);r([f],st.prototype,"childItems",void 0);r([f],st.prototype,"items",void 0);r([f],st.prototype,"nested",void 0);r([f],st.prototype,"renderCollapsedChildren",void 0);tt(st,Lt);const ld=(i,t)=>b`
    <template
        role="tree"
        ${N("treeView")}
        @keydown="${(e,o)=>e.handleKeyDown(o.event)}"
        @focusin="${(e,o)=>e.handleFocus(o.event)}"
        @focusout="${(e,o)=>e.handleBlur(o.event)}"
        @click="${(e,o)=>e.handleClick(o.event)}"
        @selected-change="${(e,o)=>e.handleSelectedChange(o.event)}"
    >
        <slot ${Z("slottedTreeItems")}></slot>
    </template>
`;class Fo extends D{constructor(){super(...arguments),this.currentFocused=null,this.handleFocus=t=>{if(!(this.slottedTreeItems.length<1)){if(t.target===this){this.currentFocused===null&&(this.currentFocused=this.getValidFocusableItem()),this.currentFocused!==null&&st.focusItem(this.currentFocused);return}this.contains(t.target)&&(this.setAttribute("tabindex","-1"),this.currentFocused=t.target)}},this.handleBlur=t=>{t.target instanceof HTMLElement&&(t.relatedTarget===null||!this.contains(t.relatedTarget))&&this.setAttribute("tabindex","0")},this.handleKeyDown=t=>{if(t.defaultPrevented)return;if(this.slottedTreeItems.length<1)return!0;const e=this.getVisibleNodes();switch(t.key){case ne:e.length&&st.focusItem(e[0]);return;case re:e.length&&st.focusItem(e[e.length-1]);return;case ge:if(t.target&&this.isFocusableElement(t.target)){const o=t.target;o instanceof st&&o.childItemLength()>0&&o.expanded?o.expanded=!1:o instanceof st&&o.parentElement instanceof st&&st.focusItem(o.parentElement)}return!1;case me:if(t.target&&this.isFocusableElement(t.target)){const o=t.target;o instanceof st&&o.childItemLength()>0&&!o.expanded?o.expanded=!0:o instanceof st&&o.childItemLength()>0&&this.focusNextNode(1,t.target)}return;case Vt:t.target&&this.isFocusableElement(t.target)&&this.focusNextNode(1,t.target);return;case Ht:t.target&&this.isFocusableElement(t.target)&&this.focusNextNode(-1,t.target);return;case Jt:this.handleClick(t);return}return!0},this.handleSelectedChange=t=>{if(t.defaultPrevented)return;if(!(t.target instanceof Element)||!Ce(t.target))return!0;const e=t.target;e.selected?(this.currentSelected&&this.currentSelected!==e&&(this.currentSelected.selected=!1),this.currentSelected=e):!e.selected&&this.currentSelected===e&&(this.currentSelected=null)},this.setItems=()=>{const t=this.treeView.querySelector("[aria-selected='true']");this.currentSelected=t,(this.currentFocused===null||!this.contains(this.currentFocused))&&(this.currentFocused=this.getValidFocusableItem()),this.nested=this.checkForNestedItems(),this.getVisibleNodes().forEach(o=>{Ce(o)&&(o.nested=this.nested)})},this.isFocusableElement=t=>Ce(t),this.isSelectedElement=t=>t.selected}slottedTreeItemsChanged(){this.$fastController.isConnected&&this.setItems()}connectedCallback(){super.connectedCallback(),this.setAttribute("tabindex","0"),S.queueUpdate(()=>{this.setItems()})}handleClick(t){if(t.defaultPrevented)return;if(!(t.target instanceof Element)||!Ce(t.target))return!0;const e=t.target;e.disabled||(e.selected=!e.selected)}focusNextNode(t,e){const o=this.getVisibleNodes();if(!o)return;const s=o[o.indexOf(e)+t];ci(s)&&st.focusItem(s)}getValidFocusableItem(){const t=this.getVisibleNodes();let e=t.findIndex(this.isSelectedElement);return e===-1&&(e=t.findIndex(this.isFocusableElement)),e!==-1?t[e]:null}checkForNestedItems(){return this.slottedTreeItems.some(t=>Ce(t)&&t.querySelector("[role='treeitem']"))}getVisibleNodes(){return Nl(this,"[role='treeitem']")||[]}}r([d({attribute:"render-collapsed-nodes"})],Fo.prototype,"renderCollapsedNodes",void 0);r([f],Fo.prototype,"currentSelected",void 0);r([f],Fo.prototype,"slottedTreeItems",void 0);class cd{constructor(t){this.listenerCache=new WeakMap,this.query=t}bind(t){const{query:e}=this,o=this.constructListener(t);o.bind(e)(),e.addListener(o),this.listenerCache.set(t,o)}unbind(t){const e=this.listenerCache.get(t);e&&(this.query.removeListener(e),this.listenerCache.delete(t))}}class Gi extends cd{constructor(t,e){super(t),this.styles=e}static with(t){return e=>new Gi(t,e)}constructListener(t){let e=!1;const o=this.styles;return function(){const{matches:n}=this;n&&!e?(t.$fastController.addStyles(o),e=n):!n&&e&&(t.$fastController.removeStyles(o),e=n)}}unbind(t){super.unbind(t),t.$fastController.removeStyles(this.styles)}}const L=Gi.with(window.matchMedia("(forced-colors)"));Gi.with(window.matchMedia("(prefers-color-scheme: dark)"));Gi.with(window.matchMedia("(prefers-color-scheme: light)"));class hd{constructor(t,e,o){this.propertyName=t,this.value=e,this.styles=o}bind(t){R.getNotifier(t).subscribe(this,this.propertyName),this.handleChange(t,this.propertyName)}unbind(t){R.getNotifier(t).unsubscribe(this,this.propertyName),t.$fastController.removeStyles(this.styles)}handleChange(t,e){t[e]===this.value?t.$fastController.addStyles(this.styles):t.$fastController.removeStyles(this.styles)}}const ot="not-allowed",dd=":host([hidden]){display:none}";function H(i){return`${dd}:host{display:${i}}`}const $=_l()?"focus-visible":"focus";function he(i,t,e){return isNaN(i)||i<=t?t:i>=e?e:i}function ss(i,t,e){return isNaN(i)||i<=t?0:i>=e?1:i/(e-t)}function Ae(i,t,e){return isNaN(i)?t:t+i*(e-t)}function On(i){return i*(Math.PI/180)}function ud(i){return i*(180/Math.PI)}function pd(i){const t=Math.round(he(i,0,255)).toString(16);return t.length===1?"0"+t:t}function xt(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:t+i*(e-t)}function Ms(i,t,e){if(i<=0)return t%360;if(i>=1)return e%360;const o=(t-e+360)%360,s=(e-t+360)%360;return o<=s?(t-o*i+360)%360:(t+o*i+360)%360}function dt(i,t){const e=Math.pow(10,t);return Math.round(i*e)/e}class ze{constructor(t,e,o){this.h=t,this.s=e,this.l=o}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.l)?new ze(t.h,t.s,t.l):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.l===t.l}roundToPrecision(t){return new ze(dt(this.h,t),dt(this.s,t),dt(this.l,t))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class Hi{constructor(t,e,o){this.h=t,this.s=e,this.v=o}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.v)?new Hi(t.h,t.s,t.v):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.v===t.v}roundToPrecision(t){return new Hi(dt(this.h,t),dt(this.s,t),dt(this.v,t))}toObject(){return{h:this.h,s:this.s,v:this.v}}}class ft{constructor(t,e,o){this.l=t,this.a=e,this.b=o}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.a)&&!isNaN(t.b)?new ft(t.l,t.a,t.b):null}equalValue(t){return this.l===t.l&&this.a===t.a&&this.b===t.b}roundToPrecision(t){return new ft(dt(this.l,t),dt(this.a,t),dt(this.b,t))}toObject(){return{l:this.l,a:this.a,b:this.b}}}ft.epsilon=216/24389;ft.kappa=24389/27;class ui{constructor(t,e,o){this.l=t,this.c=e,this.h=o}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.c)&&!isNaN(t.h)?new ui(t.l,t.c,t.h):null}equalValue(t){return this.l===t.l&&this.c===t.c&&this.h===t.h}roundToPrecision(t){return new ui(dt(this.l,t),dt(this.c,t),dt(this.h,t))}toObject(){return{l:this.l,c:this.c,h:this.h}}}class rt{constructor(t,e,o,s){this.r=t,this.g=e,this.b=o,this.a=typeof s=="number"&&!isNaN(s)?s:1}static fromObject(t){return t&&!isNaN(t.r)&&!isNaN(t.g)&&!isNaN(t.b)?new rt(t.r,t.g,t.b,t.a):null}equalValue(t){return this.r===t.r&&this.g===t.g&&this.b===t.b&&this.a===t.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(Ae(this.r,0,255))},${Math.round(Ae(this.g,0,255))},${Math.round(Ae(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(Ae(this.r,0,255))},${Math.round(Ae(this.g,0,255))},${Math.round(Ae(this.b,0,255))},${he(this.a,0,1)})`}roundToPrecision(t){return new rt(dt(this.r,t),dt(this.g,t),dt(this.b,t),dt(this.a,t))}clamp(){return new rt(he(this.r,0,1),he(this.g,0,1),he(this.b,0,1),he(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(t){return pd(Ae(t,0,255))}}class Ot{constructor(t,e,o){this.x=t,this.y=e,this.z=o}static fromObject(t){return t&&!isNaN(t.x)&&!isNaN(t.y)&&!isNaN(t.z)?new Ot(t.x,t.y,t.z):null}equalValue(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}roundToPrecision(t){return new Ot(dt(this.x,t),dt(this.y,t),dt(this.z,t))}toObject(){return{x:this.x,y:this.y,z:this.z}}}Ot.whitePoint=new Ot(.95047,1,1.08883);function fs(i){return i.r*.2126+i.g*.7152+i.b*.0722}function gs(i){function t(e){return e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4)}return fs(new rt(t(i.r),t(i.g),t(i.b),1))}const Ln=(i,t)=>(i+.05)/(t+.05);function An(i,t){const e=gs(i),o=gs(t);return e>o?Ln(e,o):Ln(o,e)}function zi(i){const t=Math.max(i.r,i.g,i.b),e=Math.min(i.r,i.g,i.b),o=t-e;let s=0;o!==0&&(t===i.r?s=60*((i.g-i.b)/o%6):t===i.g?s=60*((i.b-i.r)/o+2):s=60*((i.r-i.g)/o+4)),s<0&&(s+=360);const n=(t+e)/2;let a=0;return o!==0&&(a=o/(1-Math.abs(2*n-1))),new ze(s,a,n)}function ms(i,t=1){const e=(1-Math.abs(2*i.l-1))*i.s,o=e*(1-Math.abs(i.h/60%2-1)),s=i.l-e/2;let n=0,a=0,l=0;return i.h<60?(n=e,a=o,l=0):i.h<120?(n=o,a=e,l=0):i.h<180?(n=0,a=e,l=o):i.h<240?(n=0,a=o,l=e):i.h<300?(n=o,a=0,l=e):i.h<360&&(n=e,a=0,l=o),new rt(n+s,a+s,l+s,t)}function Pn(i){const t=Math.max(i.r,i.g,i.b),e=Math.min(i.r,i.g,i.b),o=t-e;let s=0;o!==0&&(t===i.r?s=60*((i.g-i.b)/o%6):t===i.g?s=60*((i.b-i.r)/o+2):s=60*((i.r-i.g)/o+4)),s<0&&(s+=360);let n=0;return t!==0&&(n=o/t),new Hi(s,n,t)}function fd(i,t=1){const e=i.s*i.v,o=e*(1-Math.abs(i.h/60%2-1)),s=i.v-e;let n=0,a=0,l=0;return i.h<60?(n=e,a=o,l=0):i.h<120?(n=o,a=e,l=0):i.h<180?(n=0,a=e,l=o):i.h<240?(n=0,a=o,l=e):i.h<300?(n=o,a=0,l=e):i.h<360&&(n=e,a=0,l=o),new rt(n+s,a+s,l+s,t)}function gd(i){let t=0,e=0;return i.h!==0&&(t=Math.cos(On(i.h))*i.c,e=Math.sin(On(i.h))*i.c),new ft(i.l,t,e)}function md(i){let t=0;(Math.abs(i.b)>.001||Math.abs(i.a)>.001)&&(t=ud(Math.atan2(i.b,i.a))),t<0&&(t+=360);const e=Math.sqrt(i.a*i.a+i.b*i.b);return new ui(i.l,e,t)}function bd(i){const t=(i.l+16)/116,e=t+i.a/500,o=t-i.b/200,s=Math.pow(e,3),n=Math.pow(t,3),a=Math.pow(o,3);let l=0;s>ft.epsilon?l=s:l=(116*e-16)/ft.kappa;let h=0;i.l>ft.epsilon*ft.kappa?h=n:h=i.l/ft.kappa;let u=0;return a>ft.epsilon?u=a:u=(116*o-16)/ft.kappa,l=Ot.whitePoint.x*l,h=Ot.whitePoint.y*h,u=Ot.whitePoint.z*u,new Ot(l,h,u)}function vd(i){function t(h){return h>ft.epsilon?Math.pow(h,1/3):(ft.kappa*h+16)/116}const e=t(i.x/Ot.whitePoint.x),o=t(i.y/Ot.whitePoint.y),s=t(i.z/Ot.whitePoint.z),n=116*o-16,a=500*(e-o),l=200*(o-s);return new ft(n,a,l)}function bs(i){function t(h){return h<=.04045?h/12.92:Math.pow((h+.055)/1.055,2.4)}const e=t(i.r),o=t(i.g),s=t(i.b),n=e*.4124564+o*.3575761+s*.1804375,a=e*.2126729+o*.7151522+s*.072175,l=e*.0193339+o*.119192+s*.9503041;return new Ot(n,a,l)}function Er(i,t=1){function e(a){return a<=.0031308?a*12.92:1.055*Math.pow(a,1/2.4)-.055}const o=e(i.x*3.2404542-i.y*1.5371385-i.z*.4985314),s=e(i.x*-.969266+i.y*1.8760108+i.z*.041556),n=e(i.x*.0556434-i.y*.2040259+i.z*1.0572252);return new rt(o,s,n,t)}function vs(i){return vd(bs(i))}function Rr(i,t=1){return Er(bd(i),t)}function ys(i){return md(vs(i))}function Or(i,t=1){return Rr(gd(i),t)}function Mn(i,t,e=18){const o=ys(i);let s=o.c+t*e;return s<0&&(s=0),Or(new ui(o.l,s,o.h))}function ns(i,t){return i*t}function Vn(i,t){return new rt(ns(i.r,t.r),ns(i.g,t.g),ns(i.b,t.b),1)}function rs(i,t){return i<.5?he(2*t*i,0,1):he(1-2*(1-t)*(1-i),0,1)}function Hn(i,t){return new rt(rs(i.r,t.r),rs(i.g,t.g),rs(i.b,t.b),1)}var zn;(function(i){i[i.Burn=0]="Burn",i[i.Color=1]="Color",i[i.Darken=2]="Darken",i[i.Dodge=3]="Dodge",i[i.Lighten=4]="Lighten",i[i.Multiply=5]="Multiply",i[i.Overlay=6]="Overlay",i[i.Screen=7]="Screen"})(zn||(zn={}));function yd(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new rt(xt(i,t.r,e.r),xt(i,t.g,e.g),xt(i,t.b,e.b),xt(i,t.a,e.a))}function xd(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new ze(Ms(i,t.h,e.h),xt(i,t.s,e.s),xt(i,t.l,e.l))}function $d(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new Hi(Ms(i,t.h,e.h),xt(i,t.s,e.s),xt(i,t.v,e.v))}function wd(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new Ot(xt(i,t.x,e.x),xt(i,t.y,e.y),xt(i,t.z,e.z))}function kd(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new ft(xt(i,t.l,e.l),xt(i,t.a,e.a),xt(i,t.b,e.b))}function Cd(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new ui(xt(i,t.l,e.l),xt(i,t.c,e.c),Ms(i,t.h,e.h))}var Pt;(function(i){i[i.RGB=0]="RGB",i[i.HSL=1]="HSL",i[i.HSV=2]="HSV",i[i.XYZ=3]="XYZ",i[i.LAB=4]="LAB",i[i.LCH=5]="LCH"})(Pt||(Pt={}));function Ti(i,t,e,o){if(isNaN(i)||i<=0)return e;if(i>=1)return o;switch(t){case Pt.HSL:return ms(xd(i,zi(e),zi(o)));case Pt.HSV:return fd($d(i,Pn(e),Pn(o)));case Pt.XYZ:return Er(wd(i,bs(e),bs(o)));case Pt.LAB:return Rr(kd(i,vs(e),vs(o)));case Pt.LCH:return Or(Cd(i,ys(e),ys(o)));default:return yd(i,e,o)}}class _t{constructor(t){if(t==null||t.length===0)throw new Error("The stops argument must be non-empty");this.stops=this.sortColorScaleStops(t)}static createBalancedColorScale(t){if(t==null||t.length===0)throw new Error("The colors argument must be non-empty");const e=new Array(t.length);for(let o=0;o<t.length;o++)o===0?e[o]={color:t[o],position:0}:o===t.length-1?e[o]={color:t[o],position:1}:e[o]={color:t[o],position:o*(1/(t.length-1))};return new _t(e)}getColor(t,e=Pt.RGB){if(this.stops.length===1)return this.stops[0].color;if(t<=0)return this.stops[0].color;if(t>=1)return this.stops[this.stops.length-1].color;let o=0;for(let a=0;a<this.stops.length;a++)this.stops[a].position<=t&&(o=a);let s=o+1;s>=this.stops.length&&(s=this.stops.length-1);const n=(t-this.stops[o].position)*(1/(this.stops[s].position-this.stops[o].position));return Ti(n,e,this.stops[o].color,this.stops[s].color)}trim(t,e,o=Pt.RGB){if(t<0||e>1||e<t)throw new Error("Invalid bounds");if(t===e)return new _t([{color:this.getColor(t,o),position:0}]);const s=[];for(let l=0;l<this.stops.length;l++)this.stops[l].position>=t&&this.stops[l].position<=e&&s.push(this.stops[l]);if(s.length===0)return new _t([{color:this.getColor(t),position:t},{color:this.getColor(e),position:e}]);s[0].position!==t&&s.unshift({color:this.getColor(t),position:t}),s[s.length-1].position!==e&&s.push({color:this.getColor(e),position:e});const n=e-t,a=new Array(s.length);for(let l=0;l<s.length;l++)a[l]={color:s[l].color,position:(s[l].position-t)/n};return new _t(a)}findNextColor(t,e,o=!1,s=Pt.RGB,n=.005,a=32){isNaN(t)||t<=0?t=0:t>=1&&(t=1);const l=this.getColor(t,s),h=o?0:1,u=this.getColor(h,s);if(An(l,u)<=e)return h;let g=o?0:t,y=o?t:0,E=h,M=0;for(;M<=a;){E=Math.abs(y-g)/2+g;const V=this.getColor(E,s),U=An(l,V);if(Math.abs(U-e)<=n)return E;U>e?o?g=E:y=E:o?y=E:g=E,M++}return E}clone(){const t=new Array(this.stops.length);for(let e=0;e<t.length;e++)t[e]={color:this.stops[e].color,position:this.stops[e].position};return new _t(t)}sortColorScaleStops(t){return t.sort((e,o)=>{const s=e.position,n=o.position;return s<n?-1:s>n?1:0})}}const Id=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;function Ge(i){const t=Id.exec(i);if(t===null)return null;let e=t[1];if(e.length===3){const s=e.charAt(0),n=e.charAt(1),a=e.charAt(2);e=s.concat(s,n,n,a,a)}const o=parseInt(e,16);return isNaN(o)?null:new rt(ss((o&16711680)>>>16,0,255),ss((o&65280)>>>8,0,255),ss(o&255,0,255),1)}class Te{constructor(t){this.config=Object.assign({},Te.defaultPaletteConfig,t),this.palette=[],this.updatePaletteColors()}updatePaletteGenerationValues(t){let e=!1;for(const o in t)this.config[o]&&(this.config[o].equalValue?this.config[o].equalValue(t[o])||(this.config[o]=t[o],e=!0):t[o]!==this.config[o]&&(this.config[o]=t[o],e=!0));return e&&this.updatePaletteColors(),e}updatePaletteColors(){const t=this.generatePaletteColorScale();for(let e=0;e<this.config.steps;e++)this.palette[e]=t.getColor(e/(this.config.steps-1),this.config.interpolationMode)}generatePaletteColorScale(){const t=zi(this.config.baseColor),o=new _t([{position:0,color:this.config.scaleColorLight},{position:.5,color:this.config.baseColor},{position:1,color:this.config.scaleColorDark}]).trim(this.config.clipLight,1-this.config.clipDark),s=o.getColor(0),n=o.getColor(1);let a=s,l=n;if(t.s>=this.config.saturationAdjustmentCutoff&&(a=Mn(a,this.config.saturationLight),l=Mn(l,this.config.saturationDark)),this.config.multiplyLight!==0){const h=Vn(this.config.baseColor,a);a=Ti(this.config.multiplyLight,this.config.interpolationMode,a,h)}if(this.config.multiplyDark!==0){const h=Vn(this.config.baseColor,l);l=Ti(this.config.multiplyDark,this.config.interpolationMode,l,h)}if(this.config.overlayLight!==0){const h=Hn(this.config.baseColor,a);a=Ti(this.config.overlayLight,this.config.interpolationMode,a,h)}if(this.config.overlayDark!==0){const h=Hn(this.config.baseColor,l);l=Ti(this.config.overlayDark,this.config.interpolationMode,l,h)}return this.config.baseScalePosition?this.config.baseScalePosition<=0?new _t([{position:0,color:this.config.baseColor},{position:1,color:l.clamp()}]):this.config.baseScalePosition>=1?new _t([{position:0,color:a.clamp()},{position:1,color:this.config.baseColor}]):new _t([{position:0,color:a.clamp()},{position:this.config.baseScalePosition,color:this.config.baseColor},{position:1,color:l.clamp()}]):new _t([{position:0,color:a.clamp()},{position:.5,color:this.config.baseColor},{position:1,color:l.clamp()}])}}Te.defaultPaletteConfig={baseColor:Ge("#808080"),steps:11,interpolationMode:Pt.RGB,scaleColorLight:new rt(1,1,1,1),scaleColorDark:new rt(0,0,0,1),clipLight:.185,clipDark:.16,saturationAdjustmentCutoff:.05,saturationLight:.35,saturationDark:1.25,overlayLight:0,overlayDark:.25,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};Te.greyscalePaletteConfig={baseColor:Ge("#808080"),steps:11,interpolationMode:Pt.RGB,scaleColorLight:new rt(1,1,1,1),scaleColorDark:new rt(0,0,0,1),clipLight:0,clipDark:0,saturationAdjustmentCutoff:0,saturationLight:0,saturationDark:0,overlayLight:0,overlayDark:0,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};Te.defaultPaletteConfig.scaleColorLight,Te.defaultPaletteConfig.scaleColorDark;class Do{constructor(t){this.palette=[],this.config=Object.assign({},Do.defaultPaletteConfig,t),this.regenPalettes()}regenPalettes(){let t=this.config.steps;(isNaN(t)||t<3)&&(t=3);const e=.14,o=.06,s=new rt(e,e,e,1),n=94,l=new Te(Object.assign(Object.assign({},Te.greyscalePaletteConfig),{baseColor:s,baseScalePosition:(1-e)*100/n,steps:t})).palette,h=fs(this.config.baseColor),u=zi(this.config.baseColor).l,p=(h+u)/2,y=this.matchRelativeLuminanceIndex(p,l)/(t-1),M=this.matchRelativeLuminanceIndex(e,l)/(t-1),V=zi(this.config.baseColor),U=ms(ze.fromObject({h:V.h,s:V.s,l:e})),Nt=ms(ze.fromObject({h:V.h,s:V.s,l:o})),Ct=new Array(5);Ct[0]={position:0,color:new rt(1,1,1,1)},Ct[1]={position:y,color:this.config.baseColor},Ct[2]={position:M,color:U},Ct[3]={position:.99,color:Nt},Ct[4]={position:1,color:new rt(0,0,0,1)};const _o=new _t(Ct);this.palette=new Array(t);for(let Oe=0;Oe<t;Oe++){const qo=_o.getColor(Oe/(t-1),Pt.RGB);this.palette[Oe]=qo}}matchRelativeLuminanceIndex(t,e){let o=Number.MAX_VALUE,s=0,n=0;const a=e.length;for(;n<a;n++){const l=Math.abs(fs(e[n])-t);l<o&&(o=l,s=n)}return s}}Do.defaultPaletteConfig={baseColor:Ge("#808080"),steps:94};function Lr(i,t){const e=i.relativeLuminance>t.relativeLuminance?i:t,o=i.relativeLuminance>t.relativeLuminance?t:i;return(e.relativeLuminance+.05)/(o.relativeLuminance+.05)}const $e=Object.freeze({create(i,t,e){return new lo(i,t,e)},from(i){return new lo(i.r,i.g,i.b)}});function Td(i){const t={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const e in t)if(typeof t[e]!=typeof i[e])return!1;return!0}class lo extends rt{constructor(t,e,o){super(t,e,o,1),this.toColorString=this.toStringHexRGB,this.contrast=Lr.bind(null,this),this.createCSS=this.toColorString,this.relativeLuminance=gs(this)}static fromObject(t){return new lo(t.r,t.g,t.b)}}function xs(i,t,e=0,o=i.length-1){if(o===e)return i[e];const s=Math.floor((o-e)/2)+e;return t(i[s])?xs(i,t,e,s):xs(i,t,s+1,o)}const Sd=(-.1+Math.sqrt(.21))/2;function Fd(i){return i.relativeLuminance<=Sd}function We(i){return Fd(i)?-1:1}function Dd(i,t,e){return typeof i=="number"?co.from($e.create(i,t,e)):co.from(i)}function Ed(i){return Td(i)?ho.from(i):ho.from($e.create(i.r,i.g,i.b))}const co=Object.freeze({create:Dd,from:Ed});class ho{constructor(t,e){this.closestIndexCache=new Map,this.source=t,this.swatches=e,this.reversedSwatches=Object.freeze([...this.swatches].reverse()),this.lastIndex=this.swatches.length-1}colorContrast(t,e,o,s){o===void 0&&(o=this.closestIndexOf(t));let n=this.swatches;const a=this.lastIndex;let l=o;s===void 0&&(s=We(t));const h=u=>Lr(t,u)>=e;return s===-1&&(n=this.reversedSwatches,l=a-l),xs(n,h,l,a)}get(t){return this.swatches[t]||this.swatches[he(t,0,this.lastIndex)]}closestIndexOf(t){if(this.closestIndexCache.has(t.relativeLuminance))return this.closestIndexCache.get(t.relativeLuminance);let e=this.swatches.indexOf(t);if(e!==-1)return this.closestIndexCache.set(t.relativeLuminance,e),e;const o=this.swatches.reduce((s,n)=>Math.abs(n.relativeLuminance-t.relativeLuminance)<Math.abs(s.relativeLuminance-t.relativeLuminance)?n:s);return e=this.swatches.indexOf(o),this.closestIndexCache.set(t.relativeLuminance,e),e}static from(t){return new ho(t,Object.freeze(new Do({baseColor:rt.fromObject(t)}).palette.map(e=>{const o=Ge(e.toStringHexRGB());return $e.create(o.r,o.g,o.b)})))}}function Rd(i,t,e,o,s,n,a,l,h){const u=i.source,p=t.closestIndexOf(e),g=Math.max(a,l,h),y=p>=g?-1:1,M=i.closestIndexOf(u),V=M+y*-1*o,U=V+y*s,Nt=V+y*n;return{rest:i.get(V),hover:i.get(M),active:i.get(U),focus:i.get(Nt)}}function Od(i,t,e,o,s,n,a){const l=i.source,h=i.closestIndexOf(l),u=We(t),p=h+(u===1?Math.min(o,s):Math.max(u*o,u*s)),g=i.colorContrast(t,e,p,u),y=i.closestIndexOf(g),E=y+u*Math.abs(o-s),M=u===1?o<s:u*o>u*s;let V,U;return M?(V=y,U=E):(V=E,U=y),{rest:i.get(V),hover:i.get(U),active:i.get(V+u*n),focus:i.get(V+u*a)}}const Bn=$e.create(1,1,1),Ld=$e.create(0,0,0),Ad=$e.from(Ge("#808080")),Pd=$e.from(Ge("#DA1A5F"));function Md(i,t){return i.contrast(Bn)>=t?Bn:Ld}function Vd(i,t,e,o,s,n){const a=i.closestIndexOf(t),l=Math.max(e,o,s,n),h=a>=l?-1:1;return{rest:i.get(a+h*e),hover:i.get(a+h*o),active:i.get(a+h*s),focus:i.get(a+h*n)}}function Hd(i,t,e,o,s,n){const a=We(t),l=i.closestIndexOf(t);return{rest:i.get(l-a*e),hover:i.get(l-a*o),active:i.get(l-a*s),focus:i.get(l-a*n)}}function zd(i,t,e){const o=i.closestIndexOf(t);return i.get(o-(o<e?e*-1:e))}function Bd(i,t,e,o,s,n,a,l,h,u){const p=Math.max(e,o,s,n,a,l,h,u),g=i.closestIndexOf(t),y=g>=p?-1:1;return{rest:i.get(g+y*e),hover:i.get(g+y*o),active:i.get(g+y*s),focus:i.get(g+y*n)}}function Nd(i,t,e,o,s,n){const a=We(t),l=i.closestIndexOf(i.colorContrast(t,4.5)),h=l+a*Math.abs(e-o),u=a===1?e<o:a*e>a*o;let p,g;return u?(p=l,g=h):(p=h,g=l),{rest:i.get(p),hover:i.get(g),active:i.get(p+a*s),focus:i.get(p+a*n)}}function jd(i,t){return i.colorContrast(t,3.5)}function _d(i,t,e){return i.colorContrast(e,3.5,i.closestIndexOf(i.source),We(t)*-1)}function qd(i,t){return i.colorContrast(t,14)}function Ud(i,t){return i.colorContrast(t,4.5)}function Eo(i){return $e.create(i,i,i)}const Gd={LightMode:1,DarkMode:.23};function Wd(i,t,e){return i.get(i.closestIndexOf(Eo(t))+e)}function Xd(i,t,e){const o=i.closestIndexOf(Eo(t))-e;return i.get(o-e)}function Yd(i,t){return i.get(i.closestIndexOf(Eo(t)))}function Vs(i,t,e,o,s,n){return Math.max(i.closestIndexOf(Eo(t))+e,o,s,n)}function Qd(i,t,e,o,s,n){return i.get(Vs(i,t,e,o,s,n))}function Zd(i,t,e,o,s,n){return i.get(Vs(i,t,e,o,s,n)+e)}function Jd(i,t,e,o,s,n){return i.get(Vs(i,t,e,o,s,n)+e*2)}function Kd(i,t,e,o,s,n){const a=i.closestIndexOf(t),l=We(t),h=a+l*e,u=h+l*(o-e),p=h+l*(s-e),g=h+l*(n-e);return{rest:i.get(h),hover:i.get(u),active:i.get(p),focus:i.get(g)}}function tu(i,t,e){return i.get(i.closestIndexOf(t)+We(t)*e)}const{create:x}=Fe;function O(i){return Fe.create({name:i,cssCustomPropertyName:null})}const Y=x("body-font").withDefault('aktiv-grotesk, "Segoe UI", Arial, Helvetica, sans-serif'),Wi=x("base-height-multiplier").withDefault(10),eu=x("base-horizontal-spacing-multiplier").withDefault(3),Xe=x("base-layer-luminance").withDefault(Gd.DarkMode),A=x("control-corner-radius").withDefault(4),oe=x("density").withDefault(0),v=x("design-unit").withDefault(4),so=x("direction").withDefault(J.ltr),lt=x("disabled-opacity").withDefault(.3),T=x("stroke-width").withDefault(1),z=x("focus-stroke-width").withDefault(2),_=x("type-ramp-base-font-size").withDefault("14px"),W=x("type-ramp-base-line-height").withDefault("20px"),Ro=x("type-ramp-minus-1-font-size").withDefault("12px"),Oo=x("type-ramp-minus-1-line-height").withDefault("16px"),iu=x("type-ramp-minus-2-font-size").withDefault("10px"),ou=x("type-ramp-minus-2-line-height").withDefault("16px"),su=x("type-ramp-plus-1-font-size").withDefault("16px"),nu=x("type-ramp-plus-1-line-height").withDefault("24px"),ru=x("type-ramp-plus-2-font-size").withDefault("20px"),au=x("type-ramp-plus-2-line-height").withDefault("28px"),Ar=x("type-ramp-plus-3-font-size").withDefault("28px"),Pr=x("type-ramp-plus-3-line-height").withDefault("36px"),lu=x("type-ramp-plus-4-font-size").withDefault("34px"),cu=x("type-ramp-plus-4-line-height").withDefault("44px"),hu=x("type-ramp-plus-5-font-size").withDefault("46px"),du=x("type-ramp-plus-5-line-height").withDefault("56px"),uu=x("type-ramp-plus-6-font-size").withDefault("60px"),pu=x("type-ramp-plus-6-line-height").withDefault("72px"),fu=O("accent-fill-rest-delta").withDefault(0),Mr=O("accent-fill-hover-delta").withDefault(4),Vr=O("accent-fill-active-delta").withDefault(-5),Hr=O("accent-fill-focus-delta").withDefault(0),zr=O("accent-foreground-rest-delta").withDefault(0),Br=O("accent-foreground-hover-delta").withDefault(6),Nr=O("accent-foreground-active-delta").withDefault(-4),jr=O("accent-foreground-focus-delta").withDefault(0),Ye=O("neutral-fill-rest-delta").withDefault(7),Qe=O("neutral-fill-hover-delta").withDefault(10),Ze=O("neutral-fill-active-delta").withDefault(5),Hs=O("neutral-fill-focus-delta").withDefault(0),_r=O("neutral-fill-input-rest-delta").withDefault(0),qr=O("neutral-fill-input-hover-delta").withDefault(0),Ur=O("neutral-fill-input-active-delta").withDefault(0),Gr=O("neutral-fill-input-focus-delta").withDefault(0),Wr=O("neutral-fill-stealth-rest-delta").withDefault(0),Xr=O("neutral-fill-stealth-hover-delta").withDefault(5),Yr=O("neutral-fill-stealth-active-delta").withDefault(3),Qr=O("neutral-fill-stealth-focus-delta").withDefault(0),gu=O("neutral-fill-strong-rest-delta").withDefault(0),Zr=O("neutral-fill-strong-hover-delta").withDefault(8),Jr=O("neutral-fill-strong-active-delta").withDefault(-5),Kr=O("neutral-fill-strong-focus-delta").withDefault(0),Je=O("neutral-fill-layer-rest-delta").withDefault(3),ta=O("neutral-stroke-rest-delta").withDefault(25),ea=O("neutral-stroke-hover-delta").withDefault(40),ia=O("neutral-stroke-active-delta").withDefault(16),oa=O("neutral-stroke-focus-delta").withDefault(25),sa=O("neutral-stroke-divider-rest-delta").withDefault(8),na=x("neutral-color").withDefault(Ad),yt=O("neutral-palette").withDefault(i=>co.from(na.getValueFor(i))),ra=x("accent-color").withDefault(Pd),zs=O("accent-palette").withDefault(i=>co.from(ra.getValueFor(i))),mu=O("neutral-layer-card-container-recipe").withDefault({evaluate:i=>Wd(yt.getValueFor(i),Xe.getValueFor(i),Je.getValueFor(i))});x("neutral-layer-card-container").withDefault(i=>mu.getValueFor(i).evaluate(i));const bu=O("neutral-layer-floating-recipe").withDefault({evaluate:i=>Xd(yt.getValueFor(i),Xe.getValueFor(i),Je.getValueFor(i))}),Bs=x("neutral-layer-floating").withDefault(i=>bu.getValueFor(i).evaluate(i)),vu=O("neutral-layer-1-recipe").withDefault({evaluate:i=>Yd(yt.getValueFor(i),Xe.getValueFor(i))}),yu=x("neutral-layer-1").withDefault(i=>vu.getValueFor(i).evaluate(i)),xu=O("neutral-layer-2-recipe").withDefault({evaluate:i=>Qd(yt.getValueFor(i),Xe.getValueFor(i),Je.getValueFor(i),Ye.getValueFor(i),Qe.getValueFor(i),Ze.getValueFor(i))});x("neutral-layer-2").withDefault(i=>xu.getValueFor(i).evaluate(i));const $u=O("neutral-layer-3-recipe").withDefault({evaluate:i=>Zd(yt.getValueFor(i),Xe.getValueFor(i),Je.getValueFor(i),Ye.getValueFor(i),Qe.getValueFor(i),Ze.getValueFor(i))});x("neutral-layer-3").withDefault(i=>$u.getValueFor(i).evaluate(i));const wu=O("neutral-layer-4-recipe").withDefault({evaluate:i=>Jd(yt.getValueFor(i),Xe.getValueFor(i),Je.getValueFor(i),Ye.getValueFor(i),Qe.getValueFor(i),Ze.getValueFor(i))});x("neutral-layer-4").withDefault(i=>wu.getValueFor(i).evaluate(i));const B=x("fill-color").withDefault(i=>yu.getValueFor(i));var Bi;(function(i){i[i.normal=4.5]="normal",i[i.large=7]="large"})(Bi||(Bi={}));const Lo=x({name:"accent-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>Rd(zs.getValueFor(i),yt.getValueFor(i),t||B.getValueFor(i),Mr.getValueFor(i),Vr.getValueFor(i),Hr.getValueFor(i),Ye.getValueFor(i),Qe.getValueFor(i),Ze.getValueFor(i))}),Q=x("accent-fill-rest").withDefault(i=>Lo.getValueFor(i).evaluate(i).rest),ct=x("accent-fill-hover").withDefault(i=>Lo.getValueFor(i).evaluate(i).hover),at=x("accent-fill-active").withDefault(i=>Lo.getValueFor(i).evaluate(i).active),Ns=x("accent-fill-focus").withDefault(i=>Lo.getValueFor(i).evaluate(i).focus),aa=i=>(t,e)=>Md(e||Q.getValueFor(t),i),Ao=O("foreground-on-accent-recipe").withDefault({evaluate:(i,t)=>aa(Bi.normal)(i,t)}),Ut=x("foreground-on-accent-rest").withDefault(i=>Ao.getValueFor(i).evaluate(i,Q.getValueFor(i))),se=x("foreground-on-accent-hover").withDefault(i=>Ao.getValueFor(i).evaluate(i,ct.getValueFor(i))),Gt=x("foreground-on-accent-active").withDefault(i=>Ao.getValueFor(i).evaluate(i,at.getValueFor(i))),ku=x("foreground-on-accent-focus").withDefault(i=>Ao.getValueFor(i).evaluate(i,Ns.getValueFor(i))),Po=O("foreground-on-accent-large-recipe").withDefault({evaluate:(i,t)=>aa(Bi.large)(i,t)});x("foreground-on-accent-rest-large").withDefault(i=>Po.getValueFor(i).evaluate(i,Q.getValueFor(i)));x("foreground-on-accent-hover-large").withDefault(i=>Po.getValueFor(i).evaluate(i,ct.getValueFor(i)));x("foreground-on-accent-active-large").withDefault(i=>Po.getValueFor(i).evaluate(i,at.getValueFor(i)));x("foreground-on-accent-focus-large").withDefault(i=>Po.getValueFor(i).evaluate(i,Ns.getValueFor(i)));const Cu=i=>(t,e)=>Od(zs.getValueFor(t),e||B.getValueFor(t),i,zr.getValueFor(t),Br.getValueFor(t),Nr.getValueFor(t),jr.getValueFor(t)),Mo=x({name:"accent-foreground-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>Cu(Bi.normal)(i,t)}),gt=x("accent-foreground-rest").withDefault(i=>Mo.getValueFor(i).evaluate(i).rest),Be=x("accent-foreground-hover").withDefault(i=>Mo.getValueFor(i).evaluate(i).hover),ee=x("accent-foreground-active").withDefault(i=>Mo.getValueFor(i).evaluate(i).active);x("accent-foreground-focus").withDefault(i=>Mo.getValueFor(i).evaluate(i).focus);const Ke=x({name:"neutral-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>Vd(yt.getValueFor(i),t||B.getValueFor(i),Ye.getValueFor(i),Qe.getValueFor(i),Ze.getValueFor(i),Hs.getValueFor(i))}),mt=x("neutral-fill-rest").withDefault(i=>Ke.getValueFor(i).evaluate(i).rest),ti=x("neutral-fill-hover").withDefault(i=>Ke.getValueFor(i).evaluate(i).hover),js=x("neutral-fill-active").withDefault(i=>Ke.getValueFor(i).evaluate(i).active);x("neutral-fill-focus").withDefault(i=>Ke.getValueFor(i).evaluate(i).focus);const Vo=x({name:"neutral-fill-input-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>Hd(yt.getValueFor(i),t||B.getValueFor(i),_r.getValueFor(i),qr.getValueFor(i),Ur.getValueFor(i),Gr.getValueFor(i))}),we=x("neutral-fill-input-rest").withDefault(i=>Vo.getValueFor(i).evaluate(i).rest),Mt=x("neutral-fill-input-hover").withDefault(i=>Vo.getValueFor(i).evaluate(i).hover),Xi=x("neutral-fill-input-active").withDefault(i=>Vo.getValueFor(i).evaluate(i).active);x("neutral-fill-input-focus").withDefault(i=>Vo.getValueFor(i).evaluate(i).focus);const Re=x({name:"neutral-fill-stealth-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>Bd(yt.getValueFor(i),t||B.getValueFor(i),Wr.getValueFor(i),Xr.getValueFor(i),Yr.getValueFor(i),Qr.getValueFor(i),Ye.getValueFor(i),Qe.getValueFor(i),Ze.getValueFor(i),Hs.getValueFor(i))}),Wt=x("neutral-fill-stealth-rest").withDefault(i=>Re.getValueFor(i).evaluate(i).rest),ei=x("neutral-fill-stealth-hover").withDefault(i=>Re.getValueFor(i).evaluate(i).hover),ii=x("neutral-fill-stealth-active").withDefault(i=>Re.getValueFor(i).evaluate(i).active),_s=x("neutral-fill-stealth-focus").withDefault(i=>Re.getValueFor(i).evaluate(i).focus),Ho=x({name:"neutral-fill-strong-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>Nd(yt.getValueFor(i),t||B.getValueFor(i),gu.getValueFor(i),Zr.getValueFor(i),Jr.getValueFor(i),Kr.getValueFor(i))});x("neutral-fill-strong-rest").withDefault(i=>Ho.getValueFor(i).evaluate(i).rest);x("neutral-fill-strong-hover").withDefault(i=>Ho.getValueFor(i).evaluate(i).hover);x("neutral-fill-strong-active").withDefault(i=>Ho.getValueFor(i).evaluate(i).active);x("neutral-fill-strong-focus").withDefault(i=>Ho.getValueFor(i).evaluate(i).focus);const qs=O("neutral-fill-layer-recipe").withDefault({evaluate:(i,t)=>zd(yt.getValueFor(i),t||B.getValueFor(i),Je.getValueFor(i))});x("neutral-fill-layer-rest").withDefault(i=>qs.getValueFor(i).evaluate(i));const Iu=O("focus-stroke-outer-recipe").withDefault({evaluate:i=>jd(yt.getValueFor(i),B.getValueFor(i))}),P=x("focus-stroke-outer").withDefault(i=>Iu.getValueFor(i).evaluate(i)),Tu=O("focus-stroke-inner-recipe").withDefault({evaluate:i=>_d(zs.getValueFor(i),B.getValueFor(i),P.getValueFor(i))}),zo=x("focus-stroke-inner").withDefault(i=>Tu.getValueFor(i).evaluate(i)),Su=O("neutral-foreground-hint-recipe").withDefault({evaluate:i=>Ud(yt.getValueFor(i),B.getValueFor(i))}),Ni=x("neutral-foreground-hint").withDefault(i=>Su.getValueFor(i).evaluate(i)),Fu=O("neutral-foreground-recipe").withDefault({evaluate:i=>qd(yt.getValueFor(i),B.getValueFor(i))}),I=x("neutral-foreground-rest").withDefault(i=>Fu.getValueFor(i).evaluate(i)),Bo=x({name:"neutral-stroke-recipe",cssCustomPropertyName:null}).withDefault({evaluate:i=>Kd(yt.getValueFor(i),B.getValueFor(i),ta.getValueFor(i),ea.getValueFor(i),ia.getValueFor(i),oa.getValueFor(i))}),te=x("neutral-stroke-rest").withDefault(i=>Bo.getValueFor(i).evaluate(i).rest),ji=x("neutral-stroke-hover").withDefault(i=>Bo.getValueFor(i).evaluate(i).hover),Us=x("neutral-stroke-active").withDefault(i=>Bo.getValueFor(i).evaluate(i).active),Du=x("neutral-stroke-focus").withDefault(i=>Bo.getValueFor(i).evaluate(i).focus),Eu=O("neutral-stroke-divider-recipe").withDefault({evaluate:(i,t)=>tu(yt.getValueFor(i),t||B.getValueFor(i),sa.getValueFor(i))}),pi=x("neutral-stroke-divider-rest").withDefault(i=>Eu.getValueFor(i).evaluate(i)),la=Fe.create({name:"height-number",cssCustomPropertyName:null}).withDefault(i=>(Wi.getValueFor(i)+oe.getValueFor(i))*v.getValueFor(i)),Ru=(i,t)=>m`
        ${H("flex")} :host {
            box-sizing: border-box;
            flex-direction: column;
            font-family: ${Y};
            font-size: ${Ro};
            line-height: ${Oo};
            color: ${I};
            border-top: calc(${T} * 1px) solid ${pi};
        }
    `,F=ir`(${Wi} + ${oe}) * ${v}`,Ou=(i,t)=>m`
        ${H("flex")} :host {
            box-sizing: border-box;
            font-family: ${Y};
            flex-direction: column;
            font-size: ${Ro};
            line-height: ${Oo};
            border-bottom: calc(${T} * 1px) solid ${pi};
        }

        .region {
            display: none;
            padding: calc((6 + (${v} * 2 * ${oe})) * 1px);
        }

        .heading {
            display: grid;
            position: relative;
            grid-template-columns: auto 1fr auto calc(${F} * 1px);
        }

        .button {
            appearance: none;
            border: none;
            background: none;
            grid-column: 2;
            grid-row: 1;
            outline: none;
            padding: 0 calc((6 + (${v} * 2 * ${oe})) * 1px);
            text-align: left;
            height: calc(${F} * 1px);
            color: ${I};
            cursor: pointer;
            font-family: inherit;
        }

        .button:hover {
            color: ${I};
        }

        .button:active {
            color: ${I};
        }

        .button::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            cursor: pointer;
        }

        .button:${$}::before {
            outline: none;
            border: calc(${z} * 1px) solid ${P};
            border-radius: calc(${A} * 1px);
        }

        :host([expanded]) .region {
            display: block;
        }

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            grid-column: 4;
            pointer-events: none;
            position: relative;
        }

        slot[name="expanded-icon"],
        slot[name="collapsed-icon"] {
            fill: ${gt};
        }

        slot[name="collapsed-icon"] {
            display: flex;
        }

        :host([expanded]) slot[name="collapsed-icon"] {
            display: none;
        }

        slot[name="expanded-icon"] {
            display: none;
        }

        :host([expanded]) slot[name="expanded-icon"] {
            display: flex;
        }

        .start {
            display: flex;
            align-items: center;
            padding-inline-start: calc(${v} * 1px);
            justify-content: center;
            grid-column: 1;
            position: relative;
        }

        .end {
            display: flex;
            align-items: center;
            justify-content: center;
            grid-column: 3;
            position: relative;
        }
    `.withBehaviors(L(m`
            .button:${$}::before {
                border-color: ${c.Highlight};
            }
            :host slot[name="collapsed-icon"],
            :host([expanded]) slot[name="expanded-icon"] {
                fill: ${c.ButtonText};
            }
        `)),Rf=Me.compose({baseName:"accordion-item",template:Cl,styles:Ou,collapsedIcon:`
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.22 3H3.78a.78.78 0 00-.78.78v12.44c0 .43.35.78.78.78h12.44c.43 0 .78-.35.78-.78V3.78a.78.78 0 00-.78-.78zM3.78 2h12.44C17.2 2 18 2.8 18 3.78v12.44c0 .98-.8 1.78-1.78 1.78H3.78C2.8 18 2 17.2 2 16.22V3.78C2 2.8 2.8 2 3.78 2zM11 9h3v2h-3v3H9v-3H6V9h3V6h2v3z"
            />
        </svg>
    `,expandedIcon:`
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.78 3h12.44c.43 0 .78.35.78.78v12.44c0 .43-.35.78-.78.78H3.78a.78.78 0 01-.78-.78V3.78c0-.43.35-.78.78-.78zm12.44-1H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.78-.8 1.78-1.78V3.78C18 2.8 17.2 2 16.22 2zM14 9H6v2h8V9z"
            />
        </svg>
    `}),Of=Ds.compose({baseName:"accordion",template:Hl,styles:Ru}),Lu="0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(.11 * (2 - var(--background-luminance, 1))))",Au="0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(.13 * (2 - var(--background-luminance, 1))))",fi=`box-shadow: ${Lu}, ${Au};`,ca=m`
    ${H("inline-flex")} :host {
        font-family: ${Y};
        outline: none;
        font-size: ${_};
        line-height: ${W};
        height: calc(${F} * 1px);
        min-width: calc(${F} * 1px);
        background-color: ${mt};
        color: ${I};
        border-radius: calc(${A} * 1px);
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
        padding: 0 calc((10 + (${v} * 2 * ${oe})) * 1px);
        white-space: nowrap;
        outline: none;
        text-decoration: none;
        border: calc(${T} * 1px) solid transparent;
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
        background-color: ${ti};
    }

    :host(:active) {
        background-color: ${js};
    }

    .control:${$} {
        border-color: ${P};
        box-shadow: 0 0 0 calc((${z} - ${T}) * 1px) ${P} inset;
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
`.withBehaviors(L(m`
            :host .control {
              background-color: ${c.ButtonFace};
              border-color: ${c.ButtonText};
              color: ${c.ButtonText};
              fill: currentColor;
            }

            :host(:hover) .control {
              forced-color-adjust: none;
              background-color: ${c.Highlight};
              color: ${c.HighlightText};
            }

            .control:${$} {
              forced-color-adjust: none;
              background-color: ${c.Highlight};
              border-color: ${c.ButtonText};
              box-shadow: 0 0 0 calc((${z} - ${T}) * 1px) ${c.ButtonText} inset;
              color: ${c.HighlightText};
            }

            .control:hover,
            :host([appearance="outline"]) .control:hover {
              border-color: ${c.ButtonText};
            }

            :host([href]) .control {
                border-color: ${c.LinkText};
                color: ${c.LinkText};
            }

            :host([href]) .control:hover,
            :host([href]) .control:${$}{
              forced-color-adjust: none;
              background: ${c.ButtonFace};
              border-color: ${c.LinkText};
              box-shadow: 0 0 0 1px ${c.LinkText} inset;
              color: ${c.LinkText};
              fill: currentColor;
            }
        `)),ha=m`
    :host([appearance="accent"]) {
        background: ${Q};
        color: ${Ut};
    }

    :host([appearance="accent"]:hover) {
        background: ${ct};
        color: ${se};
    }

    :host([appearance="accent"]:active) .control:active {
        background: ${at};
        color: ${Gt};
    }

    :host([appearance="accent"]) .control:${$} {
        box-shadow: 0 0 0 calc((${z} - ${T}) * 1px) ${P} inset,
            0 0 0 calc((${z} + ${T}) * 1px) ${zo} inset;
    }
`.withBehaviors(L(m`
            :host([appearance="accent"]) .control {
                forced-color-adjust: none;
                background: ${c.Highlight};
                color: ${c.HighlightText};
            }

            :host([appearance="accent"]) .control:hover,
            :host([appearance="accent"]:active) .control:active {
                background: ${c.HighlightText};
                border-color: ${c.Highlight};
                color: ${c.Highlight};
            }

            :host([appearance="accent"]) .control:${$} {
                border-color: ${c.Highlight};
                box-shadow: 0 0 0 calc(${z} * 1px) ${c.HighlightText} inset;
            }

            :host([appearance="accent"][href]) .control{
                background: ${c.LinkText};
                color: ${c.HighlightText};
            }

            :host([appearance="accent"][href]) .control:hover {
                background: ${c.ButtonFace};
                border-color: ${c.LinkText};
                box-shadow: none;
                color: ${c.LinkText};
                fill: currentColor;
            }

            :host([appearance="accent"][href]) .control:${$} {
                border-color: ${c.LinkText};
                box-shadow: 0 0 0 calc(${z} * 1px) ${c.HighlightText} inset;
            }
        `)),Pu=m`
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
        color: ${gt};
        border-bottom: calc(${T} * 1px) solid ${gt};
    }

    :host([appearance="hypertext"]:hover),
    :host([appearance="hypertext"]) .control:hover {
        background: transparent;
        border-bottom-color: ${Be};
    }

    :host([appearance="hypertext"]:active),
    :host([appearance="hypertext"]) .control:active {
        background: transparent;
        border-bottom-color: ${ee};
    }

    :host([appearance="hypertext"]) .control:${$} {
        border-bottom: calc(${z} * 1px) solid ${P};
        margin-bottom: calc(calc(${T} - ${z}) * 1px);
    }
`.withBehaviors(L(m`
            :host([appearance="hypertext"]:hover) {
                background-color: ${c.ButtonFace};
                color: ${c.ButtonText};
            }
            :host([appearance="hypertext"][href]) .control:hover,
            :host([appearance="hypertext"][href]) .control:active,
            :host([appearance="hypertext"][href]) .control:${$} {
                color: ${c.LinkText};
                border-bottom-color: ${c.LinkText};
                box-shadow: none;
            }
        `)),da=m`
    :host([appearance="lightweight"]) {
        background: transparent;
        color: ${gt};
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
        color: ${Be};
    }

    :host([appearance="lightweight"]:active) {
        background: transparent;
        color: ${ee};
    }

    :host([appearance="lightweight"]) .content {
        position: relative;
    }

    :host([appearance="lightweight"]) .content::before {
        content: "";
        display: block;
        height: calc(${T} * 1px);
        position: absolute;
        top: calc(1em + 4px);
        width: 100%;
    }

    :host([appearance="lightweight"]:hover) .content::before {
        background: ${Be};
    }

    :host([appearance="lightweight"]:active) .content::before {
        background: ${ee};
    }

    :host([appearance="lightweight"]) .control:${$} .content::before {
        background: ${I};
        height: calc(${z} * 1px);
    }
`.withBehaviors(L(m`
            :host([appearance="lightweight"]) .control:hover,
            :host([appearance="lightweight"]) .control:${$} {
                forced-color-adjust: none;
                background: ${c.ButtonFace};
                color: ${c.Highlight};
            }
            :host([appearance="lightweight"]) .control:hover .content::before,
            :host([appearance="lightweight"]) .control:${$} .content::before {
                background: ${c.Highlight};
            }

            :host([appearance="lightweight"][href]) .control:hover,
            :host([appearance="lightweight"][href]) .control:${$} {
                background: ${c.ButtonFace};
                box-shadow: none;
                color: ${c.LinkText};
            }

            :host([appearance="lightweight"][href]) .control:hover .content::before,
            :host([appearance="lightweight"][href]) .control:${$} .content::before {
                background: ${c.LinkText};
            }
        `)),ua=m`
    :host([appearance="outline"]) {
        background: transparent;
        border-color: ${Q};
    }

    :host([appearance="outline"]:hover) {
        border-color: ${ct};
    }

    :host([appearance="outline"]:active) {
        border-color: ${at};
    }

    :host([appearance="outline"]) .control {
        border-color: inherit;
    }

    :host([appearance="outline"]) .control:${$} {
        box-shadow: 0 0 0 calc((${z} - ${T}) * 1px) ${P} inset;
        border-color: ${P};
    }
`.withBehaviors(L(m`
            :host([appearance="outline"]) .control {
                border-color: ${c.ButtonText};
            }
            :host([appearance="outline"]) .control:${$} {
              forced-color-adjust: none;
              background-color: ${c.Highlight};
              border-color: ${c.ButtonText};
              box-shadow: 0 0 0 calc((${z} - ${T}) * 1px) ${c.ButtonText} inset;
              color: ${c.HighlightText};
              fill: currentColor;
            }
            :host([appearance="outline"][href]) .control {
                background: ${c.ButtonFace};
                border-color: ${c.LinkText};
                color: ${c.LinkText};
                fill: currentColor;
            }
            :host([appearance="outline"][href]) .control:hover,
            :host([appearance="outline"][href]) .control:${$} {
              forced-color-adjust: none;
              border-color: ${c.LinkText};
              box-shadow: 0 0 0 1px ${c.LinkText} inset;
            }
        `)),pa=m`
    :host([appearance="stealth"]) {
        background: ${Wt};
    }

    :host([appearance="stealth"]:hover) {
        background: ${ei};
    }

    :host([appearance="stealth"]:active) {
        background: ${ii};
    }
`.withBehaviors(L(m`
            :host([appearance="stealth"]),
            :host([appearance="stealth"]) .control {
                forced-color-adjust: none;
                background: ${c.ButtonFace};
                border-color: transparent;
                color: ${c.ButtonText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:hover) .control {
                background: ${c.Highlight};
                border-color: ${c.Highlight};
                color: ${c.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:${$}) .control {
                background: ${c.Highlight};
                box-shadow: 0 0 0 1px ${c.Highlight};
                color: ${c.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]) .control {
                color: ${c.LinkText};
            }

            :host([appearance="stealth"][href]:hover) .control,
            :host([appearance="stealth"][href]:${$}) .control {
                background: ${c.LinkText};
                border-color: ${c.LinkText};
                color: ${c.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]:${$}) .control {
                forced-color-adjust: none;
                box-shadow: 0 0 0 1px ${c.LinkText};
            }
        `));class xi{constructor(t,e){this.cache=new WeakMap,this.ltr=t,this.rtl=e}bind(t){this.attach(t)}unbind(t){const e=this.cache.get(t);e&&so.unsubscribe(e)}attach(t){const e=this.cache.get(t)||new Mu(this.ltr,this.rtl,t),o=so.getValueFor(t);so.subscribe(e),e.attach(o),this.cache.set(t,e)}}class Mu{constructor(t,e,o){this.ltr=t,this.rtl=e,this.source=o,this.attached=null}handleChange({target:t,token:e}){this.attach(e.getValueFor(t))}attach(t){this.attached!==this[t]&&(this.attached!==null&&this.source.$fastController.removeStyles(this.attached),this.attached=this[t],this.attached!==null&&this.source.$fastController.addStyles(this.attached))}}function de(i,t){return new hd("appearance",i,t)}const Vu=(i,t)=>m`
        ${ca}
    `.withBehaviors(de("accent",ha),de("hypertext",Pu),de("lightweight",da),de("outline",ua),de("stealth",pa));class fa extends zt{appearanceChanged(t,e){this.$fastController.isConnected&&(this.classList.remove(t),this.classList.add(e))}connectedCallback(){super.connectedCallback(),this.appearance||(this.appearance="neutral")}defaultSlottedContentChanged(t,e){const o=this.defaultSlottedContent.filter(s=>s.nodeType===Node.ELEMENT_NODE);o.length===1&&o[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}r([d],fa.prototype,"appearance",void 0);const Lf=fa.compose({baseName:"anchor",baseClass:zt,template:ur,styles:Vu,shadowOptions:{delegatesFocus:!0}}),Hu=(i,t)=>m`
    :host {
        contain: layout;
        display: block;
    }
`,Af=j.compose({baseName:"anchored-region",template:Ql,styles:Hu}),zu=(i,t)=>m`
    ::slotted(${i.tagFor(_e)}) {
        left: 0;
    }
`,Bu=(i,t)=>m`
    ::slotted(${i.tagFor(_e)}) {
        right: 0;
    }
`,Nu=(i,t)=>m`
        ${H("flex")} :host {
            position: relative;
            height: var(--avatar-size, var(--avatar-size-default));
            max-width: var(--avatar-size, var(--avatar-size-default));
            --avatar-size-default: calc(
                (
                        (${Wi} + ${oe}) * ${v} +
                            ((${v} * 8) - 40)
                    ) * 1px
            );
            --avatar-text-size: ${_};
            --avatar-text-ratio: ${v};
        }

        .link {
            text-decoration: none;
            color: ${I};
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            min-width: 100%;
        }

        .square {
            border-radius: calc(${A} * 1px);
            min-width: 100%;
            overflow: hidden;
        }

        .circle {
            border-radius: 100%;
            min-width: 100%;
            overflow: hidden;
        }

        .backplate {
            position: relative;
            display: flex;
        }

        .media,
        ::slotted(img) {
            max-width: 100%;
            position: absolute;
            display: block;
        }

        .content {
            font-size: calc(
                (var(--avatar-text-size) + var(--avatar-size, var(--avatar-size-default))) /
                    var(--avatar-text-ratio)
            );
            line-height: var(--avatar-size, var(--avatar-size-default));
            display: block;
            min-height: var(--avatar-size, var(--avatar-size-default));
        }

        ::slotted(${i.tagFor(_e)}) {
            position: absolute;
            display: block;
        }
    `.withBehaviors(new xi(Bu(i),zu(i)));class Gs extends vi{}r([d({attribute:"src"})],Gs.prototype,"imgSrc",void 0);r([d],Gs.prototype,"alt",void 0);const ju=b`
    ${G(i=>i.imgSrc,b`
            <img
                src="${i=>i.imgSrc}"
                alt="${i=>i.alt}"
                slot="media"
                class="media"
                part="media"
            />
        `)}
`,Pf=Gs.compose({baseName:"avatar",baseClass:vi,template:tc,styles:Nu,media:ju,shadowOptions:{delegatesFocus:!0}}),_u=(i,t)=>m`
        ${H("inline-block")} :host {
            box-sizing: border-box;
            font-family: ${Y};
            font-size: ${Ro};
            line-height: ${Oo};
        }

        .control {
            border-radius: calc(${A} * 1px);
            padding: calc(((${v} * 0.5) - ${T}) * 1px)
                calc((${v} - ${T}) * 1px);
            color: ${gt};
            font-weight: 600;
            border: calc(${T} * 1px) solid transparent;
        }

        .control[style] {
            font-weight: 400;
        }

        :host([circular]) .control {
            border-radius: 100px;
            padding: 0 calc(${v} * 1px);
            height: calc((${F} - (${v} * 3)) * 1px);
            min-width: calc((${F} - (${v} * 3)) * 1px);
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
        }
    `,Mf=_e.compose({baseName:"badge",template:ec,styles:_u}),qu=(i,t)=>m`
    ${H("inline-flex")} :host {
        background: transparent;
        box-sizing: border-box;
        font-family: ${Y};
        font-size: ${_};
        fill: currentColor;
        line-height: ${W};
        min-width: calc(${F} * 1px);
        outline: none;
        color: ${I}
    }

    .listitem {
        display: flex;
        align-items: center;
        width: max-content;
    }

    .separator {
        margin: 0 6px;
        display: flex;
    }

    .control {
        align-items: center;
        box-sizing: border-box;
        color: ${gt};
        cursor: pointer;
        display: flex;
        fill: inherit;
        outline: none;
        text-decoration: none;
        white-space: nowrap;
    }

    .control:hover {
        color: ${Be};
    }

    .control:active {
        color: ${ee};
    }

    .control .content {
        position: relative;
    }

    .control .content::before {
        content: "";
        display: block;
        height: calc(${T} * 1px);
        left: 0;
        position: absolute;
        right: 0;
        top: calc(1em + 4px);
        width: 100%;
    }

    .control:hover .content::before {
        background: ${Be};
    }

    .control:active .content::before {
        background: ${ee};
    }

    .control:${$} .content::before {
        background: ${I};
        height: calc(${z} * 1px);
    }

    .control:not([href]) {
        color: ${I};
        cursor: default;
    }

    .control:not([href]) .content::before {
        background: none;
    }

    .start,
    .end {
        display: flex;
    }

    ::slotted(svg) {
        /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
        width: 16px;
        height: 16px;
    }

    .start {
        margin-inline-end: 6px;
    }

    .end {
        margin-inline-start: 6px;
    }
`.withBehaviors(L(m`
                .control:hover .content::before,
                .control:${$} .content::before {
                    background: ${c.LinkText};
                }
                .start,
                .end {
                    fill: ${c.ButtonText};
                }
            `)),Vf=Pi.compose({baseName:"breadcrumb-item",template:ic,styles:qu,separator:"/",shadowOptions:{delegatesFocus:!0}}),Uu=(i,t)=>m`
    ${H("inline-block")} :host {
        box-sizing: border-box;
        font-family: ${Y};
        font-size: ${_};
        line-height: ${W};
    }

    .list {
        display: flex;
        flex-wrap: wrap;
    }
`,Hf=mr.compose({baseName:"breadcrumb",template:oc,styles:Uu}),Gu=(i,t)=>m`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
            opacity: ${lt};
            background-color: ${mt};
            cursor: ${ot};
        }

        ${ca}
    `.withBehaviors(L(m`
                :host([disabled]),
                :host([disabled]) .control,
                :host([disabled]:hover),
                :host([disabled]:active) {
                    forced-color-adjust: none;
                    background-color: ${c.ButtonFace};
                    border-color: ${c.GrayText};
                    color: ${c.GrayText};
                    cursor: ${ot};
                    opacity: 1;
                }
            `),de("accent",m`
                :host([appearance="accent"][disabled]),
                :host([appearance="accent"][disabled]:hover),
                :host([appearance="accent"][disabled]:active) {
                    background: ${Q};
                }

                ${ha}
            `.withBehaviors(L(m`
                        :host([appearance="accent"][disabled]) .control,
                        :host([appearance="accent"][disabled]) .control:hover {
                            background: ${c.ButtonFace};
                            border-color: ${c.GrayText};
                            color: ${c.GrayText};
                        }
                    `))),de("lightweight",m`
                :host([appearance="lightweight"][disabled]:hover),
                :host([appearance="lightweight"][disabled]:active) {
                    background-color: transparent;
                    color: ${gt};
                }

                :host([appearance="lightweight"][disabled]) .content::before,
                :host([appearance="lightweight"][disabled]:hover) .content::before,
                :host([appearance="lightweight"][disabled]:active) .content::before {
                    background: transparent;
                }

                ${da}
            `.withBehaviors(L(m`
                        :host([appearance="lightweight"].disabled) .control {
                            forced-color-adjust: none;
                            color: ${c.GrayText};
                        }

                        :host([appearance="lightweight"].disabled)
                            .control:hover
                            .content::before {
                            background: none;
                        }
                    `))),de("outline",m`
                :host([appearance="outline"][disabled]),
                :host([appearance="outline"][disabled]:hover),
                :host([appearance="outline"][disabled]:active) {
                    background: transparent;
                    border-color: ${Q};
                }

                ${ua}
            `.withBehaviors(L(m`
                        :host([appearance="outline"][disabled]) .control {
                            border-color: ${c.GrayText};
                        }
                    `))),de("stealth",m`
                :host([appearance="stealth"][disabled]),
                :host([appearance="stealth"][disabled]:hover),
                :host([appearance="stealth"][disabled]:active) {
                    background: ${Wt};
                }

                ${pa}
            `.withBehaviors(L(m`
                        :host([appearance="stealth"][disabled]) {
                            background: ${c.ButtonFace};
                        }

                        :host([appearance="stealth"][disabled]) .control {
                            background: ${c.ButtonFace};
                            border-color: transparent;
                            color: ${c.GrayText};
                        }
                    `))));class ga extends Xt{constructor(){super(...arguments),this.appearance="neutral"}defaultSlottedContentChanged(t,e){const o=this.defaultSlottedContent.filter(s=>s.nodeType===Node.ELEMENT_NODE);o.length===1&&o[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}r([d],ga.prototype,"appearance",void 0);const zf=ga.compose({baseName:"button",baseClass:Xt,template:sc,styles:Gu,shadowOptions:{delegatesFocus:!0}}),Wu=m`
    ${H("block")} :host {
        --cell-border: none;
        --cell-height: calc(${F} * 1px);
        --selected-day-outline: 1px solid ${ee};
        --selected-day-color: ${ee};
        --selected-day-background: ${mt};
        --cell-padding: calc(${v} * 1px);
        --disabled-day-opacity: ${lt};
        --inactive-day-opacity: ${lt};
        font-family: ${Y};
        font-size: ${_};
        line-height: ${W};
        color: ${I};
    }

    .title {
        font-size: ${Ar};
        line-height: ${Pr};
        padding: var(--cell-padding);
        text-align: center;
    }

    .week-days,
    .week {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        border-left: var(--cell-border, none);
        border-bottom: none;
        padding: 0;
    }

    .interact .week {
        grid-gap: calc(${v} * 1px);
        margin-top: calc(${v} * 1px);
    }

    .day,
    .week-day {
        border-bottom: var(--cell-border);
        border-right: var(--cell-border);
        padding: var(--cell-padding);
    }

    .week-day {
        text-align: center;
        border-radius: 0;
        border-top: var(--cell-border);
    }

    .day {
        box-sizing: border-box;
        vertical-align: top;
        outline-offset: -1px;
        line-height: var(--cell-line-height);
        white-space: normal;
    }

    .interact .day {
        background: ${mt};
        cursor: pointer;
    }

    .day.inactive {
        background: var(--inactive-day-background);
        color: var(--inactive-day-color);
        opacity: var(--inactive-day-opacity);
        outline: var(--inactive-day-outline);
    }

    .day.disabled {
        background: var(--disabled-day-background);
        color: var(--disabled-day-color);
        cursor: ${ot};
        opacity: var(--disabled-day-opacity);
        outline: var(--disabled-day-outline);
    }

    .day.selected {
        color: var(--selected-day-color);
        background: var(--selected-day-background);
        outline: var(--selected-day-outline);
    }

    .date {
        padding: var(--cell-padding);
        text-align: center;
    }

    .interact .today,
    .today {
        color: ${Gt};
        background: ${ee};
    }

    .today.inactive .date {
        background: transparent;
        color: inherit;
        width: auto;
    }
`.withBehaviors(L(m`
            :host {
                --selected-day-outline: 1px solid ${c.Highlight};
            }

            .day,
            .week-day {
                background: ${c.Canvas};
                color: ${c.CanvasText};
                fill: currentcolor;
            }

            .day.selected {
                color: ${c.Highlight};
            }

            .today .date {
                background: ${c.Highlight};
                color: ${c.HighlightText};
            }
        `)),Bf=Yt.compose({baseName:"calendar",template:wc,styles:Wu,title:mc}),Xu=(i,t)=>m`
        ${H("block")} :host {
            --elevation: 4;
            display: block;
            contain: content;
            height: var(--card-height, 100%);
            width: var(--card-width, 100%);
            box-sizing: border-box;
            background: ${B};
            border-radius: calc(${A} * 1px);
            ${fi}
        }
    `.withBehaviors(L(m`
                :host {
                    forced-color-adjust: none;
                    background: ${c.Canvas};
                    box-shadow: 0 0 0 1px ${c.CanvasText};
                }
            `));class Yu extends br{connectedCallback(){super.connectedCallback();const t=Mi(this);t&&B.setValueFor(this,e=>qs.getValueFor(e).evaluate(e,B.getValueFor(t)))}}const Nf=Yu.compose({baseName:"card",baseClass:br,template:kc,styles:Xu}),Qu=(i,t)=>m`
        ${H("inline-flex")} :host {
            align-items: center;
            outline: none;
            margin: calc(${v} * 1px) 0;
            /* Chromium likes to select label text or the default slot when the checkbox is
                clicked. Maybe there is a better solution here? */
            user-select: none;
        }

        .control {
            position: relative;
            width: calc((${F} / 2 + ${v}) * 1px);
            height: calc((${F} / 2 + ${v}) * 1px);
            box-sizing: border-box;
            border-radius: calc(${A} * 1px);
            border: calc(${T} * 1px) solid ${te};
            background: ${we};
            outline: none;
            cursor: pointer;
        }

        .label {
            font-family: ${Y};
            color: ${I};
            padding-inline-start: calc(${v} * 2px + 2px);
            margin-inline-end: calc(${v} * 2px + 2px);
            cursor: pointer;
            font-size: ${_};
            line-height: ${W};
        }

        .label__hidden {
            display: none;
            visibility: hidden;
        }

        .checked-indicator {
            width: 100%;
            height: 100%;
            display: block;
            fill: ${Ut};
            opacity: 0;
            pointer-events: none;
        }

        .indeterminate-indicator {
            border-radius: calc(${A} * 1px);
            background: ${Ut};
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50%;
            height: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
        }

        :host(:not([disabled])) .control:hover {
            background: ${Mt};
            border-color: ${ji};
        }

        :host(:not([disabled])) .control:active {
            background: ${Xi};
            border-color: ${Us};
        }

        :host(:${$}) .control {
            box-shadow: 0 0 0 2px ${B}, 0 0 0 4px ${P};
        }

        :host([aria-checked="true"]) .control {
            background: ${Q};
            border: calc(${T} * 1px) solid ${Q};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover {
            background: ${ct};
            border: calc(${T} * 1px) solid ${ct};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
            fill: ${se};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover .indeterminate-indicator {
            background: ${se};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active {
            background: ${at};
            border: calc(${T} * 1px) solid ${at};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
            fill: ${Gt};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active .indeterminate-indicator {
            background: ${Gt};
        }

        :host([aria-checked="true"]:${$}:not([disabled])) .control {
            box-shadow: 0 0 0 2px ${B}, 0 0 0 4px ${P};
        }


        :host([disabled]) .label,
        :host([readonly]) .label,
        :host([readonly]) .control,
        :host([disabled]) .control {
            cursor: ${ot};
        }

        :host([aria-checked="true"]:not(.indeterminate)) .checked-indicator,
        :host(.indeterminate) .indeterminate-indicator {
            opacity: 1;
        }

        :host([disabled]) {
            opacity: ${lt};
        }
    `.withBehaviors(L(m`
            .control {
                forced-color-adjust: none;
                border-color: ${c.FieldText};
                background: ${c.Field};
            }
            .checked-indicator {
                fill: ${c.FieldText};
            }
            .indeterminate-indicator {
                background: ${c.FieldText};
            }
            :host(:not([disabled])) .control:hover, .control:active {
                border-color: ${c.Highlight};
                background: ${c.Field};
            }
            :host(:${$}) .control {
                box-shadow: 0 0 0 2px ${c.Field}, 0 0 0 4px ${c.FieldText};
            }
            :host([aria-checked="true"]:${$}:not([disabled])) .control {
                box-shadow: 0 0 0 2px ${c.Field}, 0 0 0 4px ${c.FieldText};
            }
            :host([aria-checked="true"]) .control {
                background: ${c.Highlight};
                border-color: ${c.Highlight};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover, .control:active {
                border-color: ${c.Highlight};
                background: ${c.HighlightText};
            }
            :host([aria-checked="true"]) .checked-indicator {
                fill: ${c.HighlightText};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
                fill: ${c.Highlight}
            }
            :host([aria-checked="true"]) .indeterminate-indicator {
                background: ${c.HighlightText};
            }
            :host([aria-checked="true"]) .control:hover .indeterminate-indicator {
                background: ${c.Highlight}
            }
            :host([disabled]) {
                opacity: 1;
            }
            :host([disabled]) .control {
                forced-color-adjust: none;
                border-color: ${c.GrayText};
                background: ${c.Field};
            }
            :host([disabled]) .indeterminate-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .indeterminate-indicator {
                forced-color-adjust: none;
                background: ${c.GrayText};
            }
            :host([disabled]) .checked-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .checked-indicator {
                forced-color-adjust: none;
                fill: ${c.GrayText};
            }
        `)),jf=$o.compose({baseName:"checkbox",template:Cc,styles:Qu,checkedIndicator:`
        <svg
            part="checked-indicator"
            class="checked-indicator"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.143 12.6697L15.235 4.5L16.8 5.90363L8.23812 15.7667L3.80005 11.2556L5.27591 9.7555L8.143 12.6697Z"
            />
        </svg>
    `,indeterminateIndicator:`
        <div part="indeterminate-indicator" class="indeterminate-indicator"></div>
    `}),ma=(i,t)=>{const e=i.tagFor(Kt),o=i.name===i.tagFor(De)?"":".listbox";return m`
        ${o?"":H("inline-flex")}

        :host ${o} {
            background: ${B};
            border: calc(${T} * 1px) solid ${te};
            border-radius: calc(${A} * 1px);
            box-sizing: border-box;
            flex-direction: column;
            padding: calc(${v} * 1px) 0;
        }

        ${o?"":m`
            :host(:focus-within:not([disabled])) {
                border-color: ${P};
                box-shadow: 0 0 0
                    calc((${z} - ${T}) * 1px)
                    ${P} inset;
            }

            :host([disabled]) ::slotted(*) {
                cursor: ${ot};
                opacity: ${lt};
                pointer-events: none;
            }
        `}

        ${o||":host([size])"} {
            max-height: calc(
                (var(--size) * ${F} + (${v} * ${T} * 2)) * 1px
            );
            overflow-y: auto;
        }

        :host([size="0"]) ${o} {
            max-height: none;
        }
    `.withBehaviors(L(m`
                :host(:not([multiple]):${$}) ::slotted(${e}[aria-selected="true"]),
                :host([multiple]:${$}) ::slotted(${e}[aria-checked="true"]) {
                    border-color: ${c.ButtonText};
                    box-shadow: 0 0 0 calc(${z} * 1px) inset ${c.HighlightText};
                }

                :host(:not([multiple]):${$}) ::slotted(${e}[aria-selected="true"]) {
                    background: ${c.Highlight};
                    color: ${c.HighlightText};
                    fill: currentcolor;
                }

                ::slotted(${e}[aria-selected="true"]:not([aria-checked="true"])) {
                    background: ${c.Highlight};
                    border-color: ${c.HighlightText};
                    color: ${c.HighlightText};
                }
            `))},ba=(i,t)=>{const e=i.name===i.tagFor(le);return m`
        ${H("inline-flex")}

        :host {
            --elevation: 14;
            background: ${we};
            border-radius: calc(${A} * 1px);
            border: calc(${T} * 1px) solid ${Q};
            box-sizing: border-box;
            color: ${I};
            font-family: ${Y};
            height: calc(${F} * 1px);
            position: relative;
            user-select: none;
            min-width: 250px;
            outline: none;
            vertical-align: top;
        }

        ${e?m`
            :host(:not([aria-haspopup])) {
                --elevation: 0;
                border: 0;
                height: auto;
                min-width: 0;
            }
        `:""}

        ${ma(i)}

        :host .listbox {
            ${fi}
            border: none;
            display: flex;
            left: 0;
            position: absolute;
            width: 100%;
            z-index: 1;
        }

        .control + .listbox {
            --stroke-size: calc(${v} * ${T} * 2);
            max-height: calc(
                (var(--listbox-max-height) * ${F} + var(--stroke-size)) * 1px
            );
        }

        ${e?m`
            :host(:not([aria-haspopup])) .listbox {
                left: auto;
                position: static;
                z-index: auto;
            }
        `:""}

        .listbox[hidden] {
            display: none;
        }

        .control {
            align-items: center;
            box-sizing: border-box;
            cursor: pointer;
            display: flex;
            font-size: ${_};
            font-family: inherit;
            line-height: ${W};
            min-height: 100%;
            padding: 0 calc(${v} * 2.25px);
            width: 100%;
        }

        :host(:not([disabled]):hover) {
            background: ${Mt};
            border-color: ${ct};
        }

        :host(:${$}) {
            border-color: ${P};
        }

        :host(:not([size]):not([multiple]):not([open]):${$}),
        :host([multiple]:${$}),
        :host([size]:${$}) {
            box-shadow: 0 0 0 calc(${z} * 1px) ${P};
        }

        :host(:not([multiple]):not([size]):${$}) ::slotted(${i.tagFor(Kt)}[aria-selected="true"]:not([disabled])) {
            box-shadow: 0 0 0 calc(${z} * 1px) inset ${zo};
            border-color: ${P};
            background: ${Ns};
            color: ${ku};
        }

        :host([disabled]) {
            cursor: ${ot};
            opacity: ${lt};
        }

        :host([disabled]) .control {
            cursor: ${ot};
            user-select: none;
        }

        :host([disabled]:hover) {
            background: ${Wt};
            color: ${I};
            fill: currentcolor;
        }

        :host(:not([disabled])) .control:active {
            background: ${Xi};
            border-color: ${at};
            border-radius: calc(${A} * 1px);
        }

        :host([open][position="above"]) .listbox {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: 0;
            bottom: calc(${F} * 1px);
        }

        :host([open][position="below"]) .listbox {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: 0;
            top: calc(${F} * 1px);
        }

        .selected-value {
            flex: 1 1 auto;
            font-family: inherit;
            min-width: calc(var(--listbox-scroll-width, 0) - (${v} * 4) * 1px);
            overflow: hidden;
            text-align: start;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .indicator {
            flex: 0 0 auto;
            margin-inline-start: 1em;
        }

        slot[name="listbox"] {
            display: none;
            width: 100%;
        }

        :host([open]) slot[name="listbox"] {
            display: flex;
            position: absolute;
            ${fi}
        }

        .end {
            margin-inline-start: auto;
        }

        .start,
        .end,
        .indicator,
        .select-indicator,
        ::slotted(svg) {
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            fill: currentcolor;
            height: 1em;
            min-height: calc(${v} * 4px);
            min-width: calc(${v} * 4px);
            width: 1em;
        }

        ::slotted([role="option"]),
        ::slotted(option) {
            flex: 0 0 auto;
        }
    `.withBehaviors(L(m`
                :host(:not([disabled]):hover),
                :host(:not([disabled]):active) {
                    border-color: ${c.Highlight};
                }

                :host(:not([disabled]):${$}) {
                    background-color: ${c.ButtonFace};
                    box-shadow: 0 0 0 calc(${z} * 1px) ${c.Highlight};
                    color: ${c.ButtonText};
                    fill: currentcolor;
                    forced-color-adjust: none;
                }

                :host(:not([disabled]):${$}) .listbox {
                    background: ${c.ButtonFace};
                }

                :host([disabled]) {
                    border-color: ${c.GrayText};
                    background-color: ${c.ButtonFace};
                    color: ${c.GrayText};
                    fill: currentcolor;
                    opacity: 1;
                    forced-color-adjust: none;
                }

                :host([disabled]:hover) {
                    background: ${c.ButtonFace};
                }

                :host([disabled]) .control {
                    color: ${c.GrayText};
                    border-color: ${c.GrayText};
                }

                :host([disabled]) .control .select-indicator {
                    fill: ${c.GrayText};
                }

                :host(:${$}) ::slotted([aria-selected="true"][role="option"]),
                :host(:${$}) ::slotted(option[aria-selected="true"]),
                :host(:${$}) ::slotted([aria-selected="true"][role="option"]:not([disabled])) {
                    background: ${c.Highlight};
                    border-color: ${c.ButtonText};
                    box-shadow: 0 0 0 calc(${z} * 1px) inset ${c.HighlightText};
                    color: ${c.HighlightText};
                    fill: currentcolor;
                }

                .start,
                .end,
                .indicator,
                .select-indicator,
                ::slotted(svg) {
                    color: ${c.ButtonText};
                    fill: currentcolor;
                }
            `))},Zu=(i,t)=>m`
    ${ba(i)}

    :host(:empty) .listbox {
        display: none;
    }

    :host([disabled]) *,
    :host([disabled]) {
        cursor: ${ot};
        user-select: none;
    }

    .selected-value {
        -webkit-appearance: none;
        background: transparent;
        border: none;
        color: inherit;
        font-size: ${_};
        line-height: ${W};
        height: calc(100% - (${T} * 1px));
        margin: auto 0;
        width: 100%;
    }

    .selected-value:hover,
    .selected-value:${$},
    .selected-value:disabled,
    .selected-value:active {
        outline: none;
    }
`;class Ju extends ve{maxHeightChanged(t,e){this.updateComputedStylesheet()}updateComputedStylesheet(){this.computedStylesheet&&this.$fastController.removeStyles(this.computedStylesheet);const t=Math.floor(this.maxHeight/la.getValueFor(this)).toString();this.computedStylesheet=m`
            :host {
                --listbox-max-height: ${t};
            }
        `,this.$fastController.addStyles(this.computedStylesheet)}}const _f=Ju.compose({baseName:"combobox",baseClass:ve,template:Dc,styles:Zu,shadowOptions:{delegatesFocus:!0},indicator:`
        <svg
            class="select-indicator"
            part="select-indicator"
            viewBox="0 0 12 7"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
            />
        </svg>
    `}),Ku=(i,t)=>m`
    :host {
        display: flex;
        position: relative;
        flex-direction: column;
    }
`,tp=(i,t)=>m`
    :host {
        display: grid;
        padding: 1px 0;
        box-sizing: border-box;
        width: 100%;
        border-bottom: calc(${T} * 1px) solid ${pi};
    }

    :host(.header) {
    }

    :host(.sticky-header) {
        background: ${mt};
        position: sticky;
        top: 0;
    }
`,ep=(i,t)=>m`
        :host {
            padding: calc(${v} * 1px) calc(${v} * 3px);
            color: ${I};
            box-sizing: border-box;
            font-family: ${Y};
            font-size: ${_};
            line-height: ${W};
            font-weight: 400;
            border: transparent calc(${z} * 1px) solid;
            overflow: hidden;
            white-space: nowrap;
            border-radius: calc(${A} * 1px);
        }

        :host(.column-header) {
            font-weight: 600;
        }

        :host(:${$}) {
            border: ${P} calc(${z} * 1px) solid;
            outline: none;
            color: ${I};
        }
    `.withBehaviors(L(m`
        :host {
            forced-color-adjust: none;
            border-color: transparent;
            background: ${c.Field};
            color: ${c.FieldText};
        }

        :host(:${$}) {
            border-color: ${c.FieldText};
            box-shadow: 0 0 0 2px inset ${c.Field};
            color: ${c.FieldText};
        }
        `)),qf=be.compose({baseName:"data-grid-cell",template:gc,styles:ep}),Uf=vt.compose({baseName:"data-grid-row",template:fc,styles:tp}),Gf=ut.compose({baseName:"data-grid",template:cc,styles:Ku}),Ws={toView(i){return i==null?null:i==null?void 0:i.toColorString()},fromView(i){if(i==null)return null;const t=Ge(i);return t?$e.create(t.r,t.g,t.b):null}},Nn=m`
    :host {
        background-color: ${B};
        color: ${I};
    }
`.withBehaviors(L(m`
            :host {
                background-color: ${c.ButtonFace};
                box-shadow: 0 0 0 1px ${c.CanvasText};
                color: ${c.ButtonText};
            }
        `));function C(i){return(t,e)=>{t[e+"Changed"]=function(o,s){s!=null?i.setValueFor(this,s):i.deleteValueFor(this)}}}class k extends D{constructor(){super(),this.noPaint=!1;const t={handleChange:this.noPaintChanged.bind(this)};R.getNotifier(this).subscribe(t,"fillColor"),R.getNotifier(this).subscribe(t,"baseLayerLuminance")}noPaintChanged(){!this.noPaint&&(this.fillColor!==void 0||this.baseLayerLuminance)?this.$fastController.addStyles(Nn):this.$fastController.removeStyles(Nn)}}r([d({attribute:"no-paint",mode:"boolean"})],k.prototype,"noPaint",void 0);r([d({attribute:"fill-color",converter:Ws}),C(B)],k.prototype,"fillColor",void 0);r([d({attribute:"accent-color",converter:Ws,mode:"fromView"}),C(ra)],k.prototype,"accentColor",void 0);r([d({attribute:"neutral-color",converter:Ws,mode:"fromView"}),C(na)],k.prototype,"neutralColor",void 0);r([d({converter:w}),C(oe)],k.prototype,"density",void 0);r([d({attribute:"design-unit",converter:w}),C(v)],k.prototype,"designUnit",void 0);r([d({attribute:"direction"}),C(so)],k.prototype,"direction",void 0);r([d({attribute:"base-height-multiplier",converter:w}),C(Wi)],k.prototype,"baseHeightMultiplier",void 0);r([d({attribute:"base-horizontal-spacing-multiplier",converter:w}),C(eu)],k.prototype,"baseHorizontalSpacingMultiplier",void 0);r([d({attribute:"control-corner-radius",converter:w}),C(A)],k.prototype,"controlCornerRadius",void 0);r([d({attribute:"stroke-width",converter:w}),C(T)],k.prototype,"strokeWidth",void 0);r([d({attribute:"focus-stroke-width",converter:w}),C(z)],k.prototype,"focusStrokeWidth",void 0);r([d({attribute:"disabled-opacity",converter:w}),C(lt)],k.prototype,"disabledOpacity",void 0);r([d({attribute:"type-ramp-minus-2-font-size"}),C(iu)],k.prototype,"typeRampMinus2FontSize",void 0);r([d({attribute:"type-ramp-minus-2-line-height"}),C(ou)],k.prototype,"typeRampMinus2LineHeight",void 0);r([d({attribute:"type-ramp-minus-1-font-size"}),C(Ro)],k.prototype,"typeRampMinus1FontSize",void 0);r([d({attribute:"type-ramp-minus-1-line-height"}),C(Oo)],k.prototype,"typeRampMinus1LineHeight",void 0);r([d({attribute:"type-ramp-base-font-size"}),C(_)],k.prototype,"typeRampBaseFontSize",void 0);r([d({attribute:"type-ramp-base-line-height"}),C(W)],k.prototype,"typeRampBaseLineHeight",void 0);r([d({attribute:"type-ramp-plus-1-font-size"}),C(su)],k.prototype,"typeRampPlus1FontSize",void 0);r([d({attribute:"type-ramp-plus-1-line-height"}),C(nu)],k.prototype,"typeRampPlus1LineHeight",void 0);r([d({attribute:"type-ramp-plus-2-font-size"}),C(ru)],k.prototype,"typeRampPlus2FontSize",void 0);r([d({attribute:"type-ramp-plus-2-line-height"}),C(au)],k.prototype,"typeRampPlus2LineHeight",void 0);r([d({attribute:"type-ramp-plus-3-font-size"}),C(Ar)],k.prototype,"typeRampPlus3FontSize",void 0);r([d({attribute:"type-ramp-plus-3-line-height"}),C(Pr)],k.prototype,"typeRampPlus3LineHeight",void 0);r([d({attribute:"type-ramp-plus-4-font-size"}),C(lu)],k.prototype,"typeRampPlus4FontSize",void 0);r([d({attribute:"type-ramp-plus-4-line-height"}),C(cu)],k.prototype,"typeRampPlus4LineHeight",void 0);r([d({attribute:"type-ramp-plus-5-font-size"}),C(hu)],k.prototype,"typeRampPlus5FontSize",void 0);r([d({attribute:"type-ramp-plus-5-line-height"}),C(du)],k.prototype,"typeRampPlus5LineHeight",void 0);r([d({attribute:"type-ramp-plus-6-font-size"}),C(uu)],k.prototype,"typeRampPlus6FontSize",void 0);r([d({attribute:"type-ramp-plus-6-line-height"}),C(pu)],k.prototype,"typeRampPlus6LineHeight",void 0);r([d({attribute:"accent-fill-rest-delta",converter:w}),C(fu)],k.prototype,"accentFillRestDelta",void 0);r([d({attribute:"accent-fill-hover-delta",converter:w}),C(Mr)],k.prototype,"accentFillHoverDelta",void 0);r([d({attribute:"accent-fill-active-delta",converter:w}),C(Vr)],k.prototype,"accentFillActiveDelta",void 0);r([d({attribute:"accent-fill-focus-delta",converter:w}),C(Hr)],k.prototype,"accentFillFocusDelta",void 0);r([d({attribute:"accent-foreground-rest-delta",converter:w}),C(zr)],k.prototype,"accentForegroundRestDelta",void 0);r([d({attribute:"accent-foreground-hover-delta",converter:w}),C(Br)],k.prototype,"accentForegroundHoverDelta",void 0);r([d({attribute:"accent-foreground-active-delta",converter:w}),C(Nr)],k.prototype,"accentForegroundActiveDelta",void 0);r([d({attribute:"accent-foreground-focus-delta",converter:w}),C(jr)],k.prototype,"accentForegroundFocusDelta",void 0);r([d({attribute:"neutral-fill-rest-delta",converter:w}),C(Ye)],k.prototype,"neutralFillRestDelta",void 0);r([d({attribute:"neutral-fill-hover-delta",converter:w}),C(Qe)],k.prototype,"neutralFillHoverDelta",void 0);r([d({attribute:"neutral-fill-active-delta",converter:w}),C(Ze)],k.prototype,"neutralFillActiveDelta",void 0);r([d({attribute:"neutral-fill-focus-delta",converter:w}),C(Hs)],k.prototype,"neutralFillFocusDelta",void 0);r([d({attribute:"neutral-fill-input-rest-delta",converter:w}),C(_r)],k.prototype,"neutralFillInputRestDelta",void 0);r([d({attribute:"neutral-fill-input-hover-delta",converter:w}),C(qr)],k.prototype,"neutralFillInputHoverDelta",void 0);r([d({attribute:"neutral-fill-input-active-delta",converter:w}),C(Ur)],k.prototype,"neutralFillInputActiveDelta",void 0);r([d({attribute:"neutral-fill-input-focus-delta",converter:w}),C(Gr)],k.prototype,"neutralFillInputFocusDelta",void 0);r([d({attribute:"neutral-fill-stealth-rest-delta",converter:w}),C(Wr)],k.prototype,"neutralFillStealthRestDelta",void 0);r([d({attribute:"neutral-fill-stealth-hover-delta",converter:w}),C(Xr)],k.prototype,"neutralFillStealthHoverDelta",void 0);r([d({attribute:"neutral-fill-stealth-active-delta",converter:w}),C(Yr)],k.prototype,"neutralFillStealthActiveDelta",void 0);r([d({attribute:"neutral-fill-stealth-focus-delta",converter:w}),C(Qr)],k.prototype,"neutralFillStealthFocusDelta",void 0);r([d({attribute:"neutral-fill-strong-hover-delta",converter:w}),C(Zr)],k.prototype,"neutralFillStrongHoverDelta",void 0);r([d({attribute:"neutral-fill-strong-active-delta",converter:w}),C(Jr)],k.prototype,"neutralFillStrongActiveDelta",void 0);r([d({attribute:"neutral-fill-strong-focus-delta",converter:w}),C(Kr)],k.prototype,"neutralFillStrongFocusDelta",void 0);r([d({attribute:"base-layer-luminance",converter:w}),C(Xe)],k.prototype,"baseLayerLuminance",void 0);r([d({attribute:"neutral-fill-layer-rest-delta",converter:w}),C(Je)],k.prototype,"neutralFillLayerRestDelta",void 0);r([d({attribute:"neutral-stroke-divider-rest-delta",converter:w}),C(sa)],k.prototype,"neutralStrokeDividerRestDelta",void 0);r([d({attribute:"neutral-stroke-rest-delta",converter:w}),C(ta)],k.prototype,"neutralStrokeRestDelta",void 0);r([d({attribute:"neutral-stroke-hover-delta",converter:w}),C(ea)],k.prototype,"neutralStrokeHoverDelta",void 0);r([d({attribute:"neutral-stroke-active-delta",converter:w}),C(ia)],k.prototype,"neutralStrokeActiveDelta",void 0);r([d({attribute:"neutral-stroke-focus-delta",converter:w}),C(oa)],k.prototype,"neutralStrokeFocusDelta",void 0);const ip=(i,t)=>b`
    <slot></slot>
`,op=(i,t)=>m`
    ${H("block")}
`,Wf=k.compose({baseName:"design-system-provider",template:ip,styles:op}),sp=(i,t)=>m`
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
        ${fi}
        margin-top: auto;
        margin-bottom: auto;
        width: var(--dialog-width);
        height: var(--dialog-height);
        background-color: ${B};
        z-index: 1;
        border-radius: calc(${A} * 1px);
        border: calc(${T} * 1px) solid transparent;
    }
`,Xf=qt.compose({baseName:"dialog",template:_c,styles:sp}),np=(i,t)=>m`
    .disclosure {
        transition: height 0.35s;
    }

    .disclosure .invoker::-webkit-details-marker {
        display: none;
    }

    .disclosure .invoker {
        list-style-type: none;
    }

    :host([appearance="accent"]) .invoker {
        background: ${Q};
        color: ${Ut};
        font-family: ${Y};
        font-size: ${_};
        border-radius: calc(${A} * 1px);
        outline: none;
        cursor: pointer;
        margin: 16px 0;
        padding: 12px;
        max-width: max-content;
    }

    :host([appearance="accent"]) .invoker:active {
        background: ${at};
        color: ${Gt};
    }

    :host([appearance="accent"]) .invoker:hover {
        background: ${ct};
        color: ${se};
    }

    :host([appearance="lightweight"]) .invoker {
        background: transparent;
        color: ${gt};
        border-bottom: calc(${T} * 1px) solid ${gt};
        cursor: pointer;
        width: max-content;
        margin: 16px 0;
    }

    :host([appearance="lightweight"]) .invoker:active {
        border-bottom-color: ${ee};
    }

    :host([appearance="lightweight"]) .invoker:hover {
        border-bottom-color: ${Be};
    }

    .disclosure[open] .invoker ~ * {
        animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;class va extends ko{constructor(){super(...arguments),this.height=0,this.totalHeight=0}connectedCallback(){super.connectedCallback(),this.appearance||(this.appearance="accent")}appearanceChanged(t,e){t!==e&&(this.classList.add(e),this.classList.remove(t))}onToggle(){super.onToggle(),this.details.style.setProperty("height",`${this.disclosureHeight}px`)}setup(){super.setup();const t=()=>this.details.getBoundingClientRect().height;this.show(),this.totalHeight=t(),this.hide(),this.height=t(),this.expanded&&this.show()}get disclosureHeight(){return this.expanded?this.totalHeight:this.height}}r([d],va.prototype,"appearance",void 0);const Yf=va.compose({baseName:"disclosure",baseClass:ko,template:ih,styles:np}),rp=(i,t)=>m`
        ${H("block")} :host {
            box-sizing: content-box;
            height: 0;
            margin: calc(${v} * 1px) 0;
            border-top: calc(${T} * 1px) solid ${pi};
            border-left: none;
        }

        :host([orientation="vertical"]) {
            height: 100%;
            margin: 0 calc(${v} * 1px);
            border-top: none;
            border-left: calc(${T} * 1px) solid ${pi};
        }
    `,Qf=Ls.compose({baseName:"divider",template:oh,styles:rp}),ap=(i,t)=>m`
    ${H("inline-flex")} :host {
        width: calc(${F} * 1px);
        height: calc(${F} * 1px);
        justify-content: center;
        align-items: center;
        margin: 0;
        position: relative;
        fill: currentcolor;
        color: ${Ut};
        background: transparent;
        outline: none;
        border: none;
        padding: 0;
    }

    :host::before {
        content: "";
        background: ${Q};
        border: calc(${T} * 1px) solid ${Q};
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        transition: all 0.1s ease-in-out;
    }

    .next,
    .previous {
        position: relative;
        /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
        width: 16px;
        height: 16px;
        display: grid;
    }

    :host([disabled]) {
        opacity: ${lt};
        cursor: ${ot};
        fill: currentcolor;
        color: ${I};
        pointer-events: none;
    }

    :host([disabled])::before,
    :host([disabled]:hover)::before,
    :host([disabled]:active)::before {
        background: ${Wt};
        border-color: ${te};
    }

    :host(:hover) {
        color: ${se};
    }

    :host(:hover)::before {
        background: ${ct};
        border-color: ${ct};
    }

    :host(:active) {
        color: ${Gt};
    }

    :host(:active)::before {
        background: ${at};
        border-color: ${at};
    }

    :host(:${$}) {
        outline: none;
    }

    :host(:${$})::before {
        box-shadow: 0 0 0 calc((${z} - ${T}) * 1px) ${P} inset,
            0 0 0 calc((${z} + ${T}) * 1px) ${zo} inset;
        border-color: ${P};
    }

    :host::-moz-focus-inner {
        border: 0;
    }
`.withBehaviors(L(m`
            :host {
                background: ${c.Canvas};
            }
            :host .next,
            :host .previous {
                color: ${c.ButtonText};
                fill: currentcolor;
            }
            :host::before {
                background: ${c.Canvas};
                border-color: ${c.ButtonText};
            }
            :host(:hover)::before {
                forced-color-adjust: none;
                background: ${c.Highlight};
                border-color: ${c.ButtonText};
                opacity: 1;
            }
            :host(:hover) .next,
            :host(:hover) .previous  {
                forced-color-adjust: none;
                color: ${c.HighlightText};
                fill: currentcolor;
            }
            :host([disabled]) {
                opacity: 1;
            }
            :host([disabled])::before,
            :host([disabled]:hover)::before,
            :host([disabled]) .next,
            :host([disabled]) .previous {
                forced-color-adjust: none;
                background: ${c.Canvas};
                border-color: ${c.GrayText};
                color: ${c.GrayText};
                fill: ${c.GrayText};
            }
            :host(:${$})::before {
                forced-color-adjust: none;
                border-color: ${c.Highlight};
                box-shadow: 0 0 0 calc((${z} - ${T}) * 1px) ${c.Highlight} inset;
            }
        `)),Zf=Ie.compose({baseName:"flipper",template:nh,styles:ap,next:`
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4.023 15.273L11.29 8 4.023.727l.704-.704L12.71 8l-7.984 7.977-.704-.704z"
            />
        </svg>
    `,previous:`
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.273 15.977L3.29 8 11.273.023l.704.704L4.71 8l7.266 7.273-.704.704z"
            />
        </svg>
    `}),lp=m`
    .scroll-prev {
        right: auto;
        left: 0;
    }

    .scroll.scroll-next::before,
    .scroll-next .scroll-action {
        left: auto;
        right: 0;
    }

    .scroll.scroll-next::before {
        background: linear-gradient(to right, transparent, var(--scroll-fade-next));
    }

    .scroll-next .scroll-action {
        transform: translate(50%, -50%);
    }
`,cp=m`
    .scroll.scroll-next {
        right: auto;
        left: 0;
    }

    .scroll.scroll-next::before {
        background: linear-gradient(to right, var(--scroll-fade-next), transparent);
        left: auto;
        right: 0;
    }

    .scroll.scroll-prev::before {
        background: linear-gradient(to right, transparent, var(--scroll-fade-previous));
    }

    .scroll-prev .scroll-action {
        left: auto;
        right: 0;
        transform: translate(50%, -50%);
    }
`,hp=m`
    .scroll-area {
        position: relative;
    }

    div.scroll-view {
        overflow-x: hidden;
    }

    .scroll {
        bottom: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        user-select: none;
        width: 100px;
    }

    .scroll.disabled {
        display: none;
    }

    .scroll::before,
    .scroll-action {
        left: 0;
        position: absolute;
    }

    .scroll::before {
        background: linear-gradient(to right, var(--scroll-fade-previous), transparent);
        content: "";
        display: block;
        height: 100%;
        width: 100%;
    }

    .scroll-action {
        pointer-events: auto;
        right: auto;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`.withBehaviors(new xi(lp,cp)),dp=(i,t)=>m`
    ${H("block")} :host {
        --scroll-align: center;
        --scroll-item-spacing: 5px;
        contain: layout;
        position: relative;
    }

    .scroll-view {
        overflow-x: auto;
        scrollbar-width: none;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    .content-container {
        align-items: var(--scroll-align);
        display: inline-flex;
        flex-wrap: nowrap;
        position: relative;
    }

    .content-container ::slotted(*) {
        margin-right: var(--scroll-item-spacing);
    }

    .content-container ::slotted(*:last-child) {
        margin-right: 0;
    }
`;class up extends ye{connectedCallback(){super.connectedCallback(),this.view!=="mobile"&&this.$fastController.addStyles(hp)}}const Jf=up.compose({baseName:"horizontal-scroll",baseClass:ye,template:Ph,styles:dp,nextFlipper:i=>b`
        <${i.tagFor(Ie)}
            @click="${t=>t.scrollToNext()}"
            aria-hidden="${t=>t.flippersHiddenFromAT}"
        ></${i.tagFor(Ie)}>
    `,previousFlipper:i=>b`
        <${i.tagFor(Ie)}
            @click="${t=>t.scrollToPrevious()}"
            direction="previous"
            aria-hidden="${t=>t.flippersHiddenFromAT}"
        ></${i.tagFor(Ie)}>
    `}),pp=(i,t)=>m`
        ${H("inline-flex")} :host {
            align-items: center;
            font-family: ${Y};
            border-radius: calc(${A} * 1px);
            border: calc(${z} * 1px) solid transparent;
            box-sizing: border-box;
            background: ${Wt};
            color: ${I};
            cursor: pointer;
            flex: 0 0 auto;
            fill: currentcolor;
            font-size: ${_};
            height: calc(${F} * 1px);
            line-height: ${W};
            margin: 0 calc((${v} - ${z}) * 1px);
            outline: none;
            overflow: hidden;
            padding: 0 1ch;
            user-select: none;
            white-space: nowrap;
        }

        :host(:not([disabled]):not([aria-selected="true"]):hover) {
            background: ${ei};
        }

        :host(:not([disabled]):not([aria-selected="true"]):active) {
            background: ${ii};
        }

        :host([aria-selected="true"]) {
            background: ${Q};
            color: ${Ut};
        }

        :host(:not([disabled])[aria-selected="true"]:hover) {
            background: ${ct};
            color: ${se};
        }

        :host(:not([disabled])[aria-selected="true"]:active) {
            background: ${at};
            color: ${Gt};
        }

        :host([disabled]) {
            cursor: ${ot};
            opacity: ${lt};
        }

        .content {
            grid-column-start: 2;
            justify-self: start;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .start,
        .end,
        ::slotted(svg) {
            display: flex;
        }

        ::slotted(svg) {
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            height: calc(${v} * 4px);
            width: calc(${v} * 4px);
        }

        ::slotted([slot="end"]) {
            margin-inline-start: 1ch;
        }

        ::slotted([slot="start"]) {
            margin-inline-end: 1ch;
        }

        :host([aria-checked="true"][aria-selected="false"]) {
            border-color: ${P};
        }

        :host([aria-checked="true"][aria-selected="true"]) {
            border-color: ${P};
            box-shadow: 0 0 0 calc(${z} * 2 * 1px) inset
                ${zo};
        }
    `.withBehaviors(L(m`
                :host {
                    border-color: transparent;
                    forced-color-adjust: none;
                    color: ${c.ButtonText};
                    fill: currentcolor;
                }

                :host(:not([aria-selected="true"]):hover),
                :host([aria-selected="true"]) {
                    background: ${c.Highlight};
                    color: ${c.HighlightText};
                }

                :host([disabled]),
                :host([disabled][aria-selected="false"]:hover) {
                    background: ${c.Canvas};
                    color: ${c.GrayText};
                    fill: currentcolor;
                    opacity: 1;
                }

                :host([aria-checked="true"][aria-selected="false"]) {
                    background: ${c.ButtonFace};
                    color: ${c.ButtonText};
                    border-color: ${c.ButtonText};
                }

                :host([aria-checked="true"][aria-selected="true"]),
                :host([aria-checked="true"][aria-selected="true"]:hover) {
                    background: ${c.Highlight};
                    color: ${c.HighlightText};
                    border-color: ${c.ButtonText};
                }
            `)),Kf=Kt.compose({baseName:"option",template:rh,styles:pp});class fp extends De{sizeChanged(t,e){super.sizeChanged(t,e),this.updateComputedStylesheet()}updateComputedStylesheet(){this.computedStylesheet&&this.$fastController.removeStyles(this.computedStylesheet);const t=`${this.size}`;this.computedStylesheet=m`
            :host {
                --size: ${t};
            }
        `,this.$fastController.addStyles(this.computedStylesheet)}}const tg=fp.compose({baseName:"listbox",baseClass:De,template:ah,styles:ma}),gp=(i,t)=>m`
        ${H("grid")} :host {
            contain: layout;
            overflow: visible;
            font-family: ${Y};
            outline: none;
            box-sizing: border-box;
            height: calc(${F} * 1px);
            grid-template-columns: minmax(42px, auto) 1fr minmax(42px, auto);
            grid-template-rows: auto;
            justify-items: center;
            align-items: center;
            padding: 0;
            margin: 0 calc(${v} * 1px);
            white-space: nowrap;
            background: ${Wt};
            color: ${I};
            fill: currentcolor;
            cursor: pointer;
            font-size: ${_};
            line-height: ${W};
            border-radius: calc(${A} * 1px);
            border: calc(${z} * 1px) solid transparent;
        }

        :host(:hover) {
            position: relative;
            z-index: 1;
        }

        :host(.indent-0) {
            grid-template-columns: auto 1fr minmax(42px, auto);
        }
        :host(.indent-0) .content {
            grid-column: 1;
            grid-row: 1;
            margin-inline-start: 10px;
        }
        :host(.indent-0) .expand-collapse-glyph-container {
            grid-column: 5;
            grid-row: 1;
        }
        :host(.indent-2) {
            grid-template-columns: minmax(42px, auto) minmax(42px, auto) 1fr minmax(42px, auto) minmax(42px, auto);
        }
        :host(.indent-2) .content {
            grid-column: 3;
            grid-row: 1;
            margin-inline-start: 10px;
        }
        :host(.indent-2) .expand-collapse-glyph-container {
            grid-column: 5;
            grid-row: 1;
        }
        :host(.indent-2) .start {
            grid-column: 2;
        }
        :host(.indent-2) .end {
            grid-column: 4;
        }

        :host(:${$}) {
            border-color: ${P};
            background: ${_s};
            color: ${I};
        }

        :host(:hover) {
            background: ${ei};
            color: ${I};
        }

        :host(:active) {
            background: ${ii};
        }

        :host([aria-checked="true"]),
        :host(.expanded) {
            background: ${mt};
            color: ${I};
        }

        :host([disabled]) {
            cursor: ${ot};
            opacity: ${lt};
        }

        :host([disabled]:hover) {
            color: ${I};
            fill: currentcolor;
            background: ${Wt};
        }

        :host([disabled]:hover) .start,
        :host([disabled]:hover) .end,
        :host([disabled]:hover)::slotted(svg) {
            fill: ${I};
        }

        .expand-collapse-glyph {
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            width: 16px;
            height: 16px;
            fill: currentcolor;
        }

        .content {
            grid-column-start: 2;
            justify-self: start;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .start,
        .end {
            display: flex;
            justify-content: center;
        }

        ::slotted(svg) {
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            width: 16px;
            height: 16px;
        }

        :host(:hover) .start,
        :host(:hover) .end,
        :host(:hover)::slotted(svg),
        :host(:active) .start,
        :host(:active) .end,
        :host(:active)::slotted(svg) {
            fill: ${I};
        }

        :host(.indent-0[aria-haspopup="menu"]) {
            display: grid;
            grid-template-columns: minmax(42px, auto) auto 1fr minmax(42px, auto) minmax(42px, auto);
            align-items: center;
            min-height: 32px;
        }

        :host(.indent-1[aria-haspopup="menu"]),
        :host(.indent-1[role="menuitemcheckbox"]),
        :host(.indent-1[role="menuitemradio"]) {
            display: grid;
            grid-template-columns: minmax(42px, auto) auto 1fr minmax(42px, auto) minmax(42px, auto);
            align-items: center;
            min-height: 32px;
        }

        :host(.indent-2:not([aria-haspopup="menu"])) .end {
            grid-column: 5;
        }

        :host .input-container,
        :host .expand-collapse-glyph-container {
            display: none;
        }

        :host([aria-haspopup="menu"]) .expand-collapse-glyph-container,
        :host([role="menuitemcheckbox"]) .input-container,
        :host([role="menuitemradio"]) .input-container {
            display: grid;
            margin-inline-end: 10px;
        }

        :host([aria-haspopup="menu"]) .content,
        :host([role="menuitemcheckbox"]) .content,
        :host([role="menuitemradio"]) .content {
            grid-column-start: 3;
        }

        :host([aria-haspopup="menu"].indent-0) .content {
            grid-column-start: 1;
        }

        :host([aria-haspopup="menu"]) .end,
        :host([role="menuitemcheckbox"]) .end,
        :host([role="menuitemradio"]) .end {
            grid-column-start: 4;
        }

        :host .expand-collapse,
        :host .checkbox,
        :host .radio {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 20px;
            height: 20px;
            box-sizing: border-box;
            outline: none;
            margin-inline-start: 10px;
        }

        :host .checkbox,
        :host .radio {
            border: calc(${T} * 1px) solid ${I};
        }

        :host([aria-checked="true"]) .checkbox,
        :host([aria-checked="true"]) .radio {
            background: ${Q};
            border-color: ${Q};
        }

        :host .checkbox {
            border-radius: calc(${A} * 1px);
        }

        :host .radio {
            border-radius: 999px;
        }

        :host .checkbox-indicator,
        :host .radio-indicator,
        :host .expand-collapse-indicator,
        ::slotted([slot="checkbox-indicator"]),
        ::slotted([slot="radio-indicator"]),
        ::slotted([slot="expand-collapse-indicator"]) {
            display: none;
        }

        ::slotted([slot="end"]:not(svg)) {
            margin-inline-end: 10px;
            color: ${Ni}
        }

        :host([aria-checked="true"]) .checkbox-indicator,
        :host([aria-checked="true"]) ::slotted([slot="checkbox-indicator"]) {
            width: 100%;
            height: 100%;
            display: block;
            fill: ${Ut};
            pointer-events: none;
        }

        :host([aria-checked="true"]) .radio-indicator {
            position: absolute;
            top: 4px;
            left: 4px;
            right: 4px;
            bottom: 4px;
            border-radius: 999px;
            display: block;
            background: ${Ut};
            pointer-events: none;
        }

        :host([aria-checked="true"]) ::slotted([slot="radio-indicator"]) {
            display: block;
            pointer-events: none;
        }
    `.withBehaviors(L(m`
            :host {
                border-color: transparent;
                color: ${c.ButtonText};
                forced-color-adjust: none;
            }

            :host(:hover) {
                background: ${c.Highlight};
                color: ${c.HighlightText};
            }

            :host(:hover) .start,
            :host(:hover) .end,
            :host(:hover)::slotted(svg),
            :host(:active) .start,
            :host(:active) .end,
            :host(:active)::slotted(svg) {
                fill: ${c.HighlightText};
            }

            :host(.expanded) {
                background: ${c.Highlight};
                border-color: ${c.Highlight};
                color: ${c.HighlightText};
            }

            :host(:${$}) {
                background: ${c.Highlight};
                border-color: ${c.ButtonText};
                box-shadow: 0 0 0 calc(${z} * 1px) inset ${c.HighlightText};
                color: ${c.HighlightText};
                fill: currentcolor;
            }

            :host([disabled]),
            :host([disabled]:hover),
            :host([disabled]:hover) .start,
            :host([disabled]:hover) .end,
            :host([disabled]:hover)::slotted(svg) {
                background: ${c.Canvas};
                color: ${c.GrayText};
                fill: currentcolor;
                opacity: 1;
            }

            :host .expanded-toggle,
            :host .checkbox,
            :host .radio{
                border-color: ${c.ButtonText};
                background: ${c.HighlightText};
            }

            :host([checked="true"]) .checkbox,
            :host([checked="true"]) .radio {
                background: ${c.HighlightText};
                border-color: ${c.HighlightText};
            }

            :host(:hover) .expanded-toggle,
            :host(:hover) .checkbox,
            :host(:hover) .radio,
            :host(:${$}) .expanded-toggle,
            :host(:${$}) .checkbox,
            :host(:${$}) .radio,
            :host([checked="true"]:hover) .checkbox,
            :host([checked="true"]:hover) .radio,
            :host([checked="true"]:${$}) .checkbox,
            :host([checked="true"]:${$}) .radio {
                border-color: ${c.HighlightText};
            }

            :host([aria-checked="true"]) {
                background: ${c.Highlight};
                color: ${c.HighlightText};
            }

            :host([aria-checked="true"]) .checkbox-indicator,
            :host([aria-checked="true"]) ::slotted([slot="checkbox-indicator"]),
            :host([aria-checked="true"]) ::slotted([slot="radio-indicator"]) {
                fill: ${c.Highlight};
            }

            :host([aria-checked="true"]) .radio-indicator {
                background: ${c.Highlight};
            }

            ::slotted([slot="end"]:not(svg)) {
                color: ${c.ButtonText};
            }

            :host(:hover) ::slotted([slot="end"]:not(svg)),
            :host(:${$}) ::slotted([slot="end"]:not(svg)) {
                color: ${c.HighlightText};
            }
        `),new xi(m`
                .expand-collapse-glyph {
                    transform: rotate(0deg);
                }
            `,m`
                .expand-collapse-glyph {
                    transform: rotate(180deg);
                }
            `)),eg=Qt.compose({baseName:"menu-item",template:$h,styles:gp,checkboxIndicator:`
        <svg
            part="checkbox-indicator"
            class="checkbox-indicator"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.143 12.6697L15.235 4.5L16.8 5.90363L8.23812 15.7667L3.80005 11.2556L5.27591 9.7555L8.143 12.6697Z"
            />
        </svg>
    `,expandCollapseGlyph:`
        <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            class="expand-collapse-glyph"
            part="expand-collapse-glyph"
        >
            <path
                d="M5.00001 12.3263C5.00124 12.5147 5.05566 12.699 5.15699 12.8578C5.25831 13.0167 5.40243 13.1437 5.57273 13.2242C5.74304 13.3047 5.9326 13.3354 6.11959 13.3128C6.30659 13.2902 6.4834 13.2152 6.62967 13.0965L10.8988 8.83532C11.0739 8.69473 11.2153 8.51658 11.3124 8.31402C11.4096 8.11146 11.46 7.88966 11.46 7.66499C11.46 7.44033 11.4096 7.21853 11.3124 7.01597C11.2153 6.81341 11.0739 6.63526 10.8988 6.49467L6.62967 2.22347C6.48274 2.10422 6.30501 2.02912 6.11712 2.00691C5.92923 1.9847 5.73889 2.01628 5.56823 2.09799C5.39757 2.17969 5.25358 2.30817 5.153 2.46849C5.05241 2.62882 4.99936 2.8144 5.00001 3.00369V12.3263Z"
            />
        </svg>
    `,radioIndicator:`
        <span part="radio-indicator" class="radio-indicator"></span>
    `}),mp=(i,t)=>m`
        ${H("block")} :host {
            --elevation: 11;
            background: ${B};
            border: calc(${T} * 1px) solid transparent;
            ${fi}
            margin: 0;
            border-radius: calc(${A} * 1px);
            padding: calc(${v} * 1px) 0;
            max-width: 368px;
            min-width: 64px;
        }

        :host([slot="submenu"]) {
            width: max-content;
            margin: 0 calc(${v} * 1px);
        }

        ::slotted(hr) {
            box-sizing: content-box;
            height: 0;
            margin: 0;
            border: none;
            border-top: calc(${T} * 1px) solid ${pi};
        }
    `.withBehaviors(L(m`
                :host {
                    background: ${c.Canvas};
                    border-color: ${c.CanvasText};
                }
            `));class bp extends Co{connectedCallback(){super.connectedCallback(),B.setValueFor(this,Bs)}}const ig=bp.compose({baseName:"menu",template:wh,styles:mp}),vp=(i,t)=>m`
    ${H("inline-block")} :host {
        font-family: ${Y};
        outline: none;
        user-select: none;
    }

    .root {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: row;
        color: ${I};
        background: ${we};
        border-radius: calc(${A} * 1px);
        border: calc(${T} * 1px) solid ${Q};
        height: calc(${F} * 1px);
        align-items: baseline;
    }

    .control {
        -webkit-appearance: none;
        font: inherit;
        background: transparent;
        border: 0;
        color: inherit;
        height: calc(100% - 4px);
        width: 100%;
        margin-top: auto;
        margin-bottom: auto;
        border: none;
        padding: 0 calc(${v} * 2px + 1px);
        font-size: ${_};
        line-height: ${W};
    }

    .control:hover,
    .control:${$},
    .control:disabled,
    .control:active {
        outline: none;
    }

    .controls {
        opacity: 0;
    }

    .label {
        display: block;
        color: ${I};
        cursor: pointer;
        font-size: ${_};
        line-height: ${W};
        margin-bottom: 4px;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .start,
    .control,
    .controls,
    .end {
        align-self: center;
    }

    .start,
    .end {
        margin: auto;
        fill: currentcolor;
    }

    .step-up-glyph,
    .step-down-glyph {
        display: block;
        padding: 4px 10px;
        cursor: pointer;
    }

    .step-up-glyph:before,
    .step-down-glyph:before {
        content: '';
        display: block;
        border: solid transparent 6px;
    }

    .step-up-glyph:before {
        border-bottom-color: ${I};
    }

    .step-down-glyph:before {
        border-top-color: ${I};
    }

    ::slotted(svg) {
        /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
        width: 16px;
        height: 16px;
    }

    .start {
        margin-inline-start: 11px;
    }

    .end {
        margin-inline-end: 11px;
    }

    :host(:hover:not([disabled])) .root {
        background: ${Mt};
        border-color: ${ct};
    }

    :host(:active:not([disabled])) .root {
        background: ${Mt};
        border-color: ${at};
    }

    :host(:focus-within:not([disabled])) .root {
        border-color: ${P};
        box-shadow: 0 0 0 calc(${z} * 1px) ${P} inset;
    }

    :host(:hover:not([disabled])) .controls,
    :host(:focus-within:not([disabled])) .controls {
        opacity: 1;
    }

    :host([appearance="filled"]) .root {
        background: ${mt};
    }

    :host([appearance="filled"]:hover:not([disabled])) .root {
        background: ${ti};
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
        cursor: ${ot};
    }

    :host([disabled]) {
        opacity: ${lt};
    }

    :host([disabled]) .control {
        border-color: ${te};
    }
`.withBehaviors(L(m`
                .root,
                :host([appearance="filled"]) .root {
                    forced-color-adjust: none;
                    background: ${c.Field};
                    border-color: ${c.FieldText};
                }
                :host(:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover) .root {
                    background: ${c.Field};
                    border-color: ${c.Highlight};
                }
                .start,
                .end {
                    fill: currentcolor;
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .root,
                :host([appearance="filled"]:hover[disabled]) .root {
                    border-color: ${c.GrayText};
                    background: ${c.Field};
                }
                :host(:focus-within:enabled) .root {
                    border-color: ${c.Highlight};
                    box-shadow: 0 0 0 1px ${c.Highlight} inset;
                }
                input::placeholder {
                    color: ${c.GrayText};
                }
            `));class ya extends Et{constructor(){super(...arguments),this.appearance="outline"}}r([d],ya.prototype,"appearance",void 0);const og=ya.compose({baseName:"number-field",baseClass:Et,styles:vp,template:kh,shadowOptions:{delegatesFocus:!0},stepDownGlyph:`
        <span class="step-down-glyph" part="step-down-glyph"></span>
    `,stepUpGlyph:`
        <span class="step-up-glyph" part="step-up-glyph"></span>
    `}),yp=(i,t)=>m`
        .region {
            z-index: 1000;
            overflow: hidden;
            display: flex;
            font-family: ${Y};
            font-size: ${_};
        }

        .loaded {
            opacity: 1;
            pointer-events: none;
        }

        .loading-display,
        .no-options-display {
            background: ${B};
            width: 100%;
            min-height: calc(${F} * 1px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-items: center;
            padding: calc(${v} * 1px);
        }

        .loading-progress {
            width: 42px;
            height: 42px;
        }

        .bottom {
            flex-direction: column;
        }

        .top {
            flex-direction: column-reverse;
        }
    `,xp=(i,t)=>m`
        :host {
            background: ${B};
            --elevation: 11;
            /* TODO: a mechanism to manage z-index across components
            https://github.com/microsoft/fast/issues/3813 */
            z-index: 1000;
            display: flex;
            width: 100%;
            max-height: 100%;
            min-height: 58px;
            box-sizing: border-box;
            flex-direction: column;
            overflow-y: auto;
            overflow-x: hidden;
            pointer-events: auto;
            border-radius: calc(${A} * 1px);
            padding: calc(${v} * 1px) 0;
            border: calc(${T} * 1px) solid transparent;
            ${fi}
        }

        .suggestions-available-alert {
            height: 0;
            opacity: 0;
            overflow: hidden;
        }
    `.withBehaviors(L(m`
                :host {
                    background: ${c.Canvas};
                    border-color: ${c.CanvasText};
                }
            `)),$p=(i,t)=>m`
        :host {
            display: flex;
            align-items: center;
            justify-items: center;
            font-family: ${Y};
            border-radius: calc(${A} * 1px);
            border: calc(${z} * 1px) solid transparent;
            box-sizing: border-box;
            background: ${Wt};
            color: ${I};
            cursor: pointer;
            fill: currentcolor;
            font-size: ${_};
            min-height: calc(${F} * 1px);
            line-height: ${W};
            margin: 0 calc(${v} * 1px);
            outline: none;
            overflow: hidden;
            padding: 0 calc(${v} * 2.25px);
            user-select: none;
            white-space: nowrap;
        }

        :host(:${$}[role="listitem"]) {
            border-color: ${P};
            background: ${_s};
        }

        :host(:hover) {
            background: ${ei};
        }

        :host(:active) {
            background: ${ii};
        }

        :host([aria-selected="true"]) {
            background: ${Q};
            color: ${Ut};
        }

        :host([aria-selected="true"]:hover) {
            background: ${ct};
            color: ${se};
        }

        :host([aria-selected="true"]:active) {
            background: ${at};
            color: ${Gt};
        }
    `.withBehaviors(L(m`
                :host {
                    border-color: transparent;
                    forced-color-adjust: none;
                    color: ${c.ButtonText};
                    fill: currentcolor;
                }

                :host(:not([aria-selected="true"]):hover),
                :host([aria-selected="true"]) {
                    background: ${c.Highlight};
                    color: ${c.HighlightText};
                }

                :host([disabled]),
                :host([disabled]:not([aria-selected="true"]):hover) {
                    background: ${c.Canvas};
                    color: ${c.GrayText};
                    fill: currentcolor;
                    opacity: 1;
                }
            `)),wp=(i,t)=>m`
        :host {
            display: flex;
            flex-direction: row;
            column-gap: calc(${v} * 1px);
            row-gap: calc(${v} * 1px);
            flex-wrap: wrap;
        }

        ::slotted([role="combobox"]) {
            min-width: 260px;
            width: auto;
            box-sizing: border-box;
            color: ${I};
            background: ${we};
            border-radius: calc(${A} * 1px);
            border: calc(${T} * 1px) solid ${Q};
            height: calc(${F} * 1px);
            font-family: ${Y};
            outline: none;
            user-select: none;
            font-size: ${_};
            line-height: ${W};
            padding: 0 calc(${v} * 2px + 1px);
        }

        ::slotted([role="combobox"]:active) { {
            background: ${Mt};
            border-color: ${at};
        }

        ::slotted([role="combobox"]:focus-within) {
            border-color: ${P};
            box-shadow: 0 0 0 1px ${P} inset;
        }
    `.withBehaviors(L(m`
                ::slotted([role="combobox"]:active) {
                    background: ${c.Field};
                    border-color: ${c.Highlight};
                }
                ::slotted([role="combobox"]:focus-within) {
                    border-color: ${c.Highlight};
                    box-shadow: 0 0 0 1px ${c.Highlight} inset;
                }
                ::slotted(input:placeholder) {
                    color: ${c.GrayText};
                }
            `)),kp=(i,t)=>m`
        :host {
            display: flex;
            align-items: center;
            justify-items: center;
            font-family: ${Y};
            border-radius: calc(${A} * 1px);
            border: calc(${z} * 1px) solid transparent;
            box-sizing: border-box;
            background: ${Wt};
            color: ${I};
            cursor: pointer;
            fill: currentcolor;
            font-size: ${_};
            height: calc(${F} * 1px);
            line-height: ${W};
            outline: none;
            overflow: hidden;
            padding: 0 calc(${v} * 2.25px);
            user-select: none;
            white-space: nowrap;
        }

        :host(:hover) {
            background: ${ei};
        }

        :host(:active) {
            background: ${ii};
        }

        :host(:${$}) {
            background: ${_s};
            border-color: ${P};
        }

        :host([aria-selected="true"]) {
            background: ${Q};
            color: ${Gt};
        }
    `.withBehaviors(L(m`
                :host {
                    border-color: transparent;
                    forced-color-adjust: none;
                    color: ${c.ButtonText};
                    fill: currentcolor;
                }

                :host(:not([aria-selected="true"]):hover),
                :host([aria-selected="true"]) {
                    background: ${c.Highlight};
                    color: ${c.HighlightText};
                }

                :host([disabled]),
                :host([disabled]:not([aria-selected="true"]):hover) {
                    background: ${c.Canvas};
                    color: ${c.GrayText};
                    fill: currentcolor;
                    opacity: 1;
                }
            `)),sg=q.compose({baseName:"picker",template:uh,styles:yp,shadowOptions:{}});class Cp extends qe{connectedCallback(){B.setValueFor(this,Bs),super.connectedCallback()}}const ng=Cp.compose({baseName:"picker-menu",baseClass:qe,template:mh,styles:xp}),rg=_i.compose({baseName:"picker-menu-option",template:bh,styles:$p}),ag=us.compose({baseName:"picker-list",template:vh,styles:wp}),lg=qi.compose({baseName:"picker-list-item",template:yh,styles:kp}),Ip=(i,t)=>m`
        ${H("flex")} :host {
            align-items: center;
            outline: none;
            height: calc(${F} * 1px);
            width: calc(${F} * 1px);
            margin: calc(${F} * 1px) 0;
        }

        .progress {
            height: 100%;
            width: 100%;
        }

        .background {
            stroke: ${mt};
            fill: none;
            stroke-width: 2px;
        }

        .determinate {
            stroke: ${gt};
            fill: none;
            stroke-width: 2px;
            stroke-linecap: round;
            transform-origin: 50% 50%;
            transform: rotate(-90deg);
            transition: all 0.2s ease-in-out;
        }

        .indeterminate-indicator-1 {
            stroke: ${gt};
            fill: none;
            stroke-width: 2px;
            stroke-linecap: round;
            transform-origin: 50% 50%;
            transform: rotate(-90deg);
            transition: all 0.2s ease-in-out;
            animation: spin-infinite 2s linear infinite;
        }

        :host([paused]) .indeterminate-indicator-1 {
            animation-play-state: paused;
            stroke: ${mt};
        }

        :host([paused]) .determinate {
            stroke: ${Ni};
        }

        @keyframes spin-infinite {
            0% {
                stroke-dasharray: 0.01px 43.97px;
                transform: rotate(0deg);
            }
            50% {
                stroke-dasharray: 21.99px 21.99px;
                transform: rotate(450deg);
            }
            100% {
                stroke-dasharray: 0.01px 43.97px;
                transform: rotate(1080deg);
            }
        }
    `.withBehaviors(L(m`
                .indeterminate-indicator-1,
                .determinate {
                    stroke: ${c.FieldText};
                }
                .background {
                    stroke: ${c.Field};
                }
                :host([paused]) .indeterminate-indicator-1 {
                    stroke: ${c.Field};
                }
                :host([paused]) .determinate {
                    stroke: ${c.GrayText};
                }
            `)),cg=Ue.compose({baseName:"progress-ring",template:Dh,styles:Ip,indeterminateIndicator:`
        <svg class="progress" part="progress" viewBox="0 0 16 16">
            <circle
                class="background"
                part="background"
                cx="8px"
                cy="8px"
                r="7px"
            ></circle>
            <circle
                class="indeterminate-indicator-1"
                part="indeterminate-indicator-1"
                cx="8px"
                cy="8px"
                r="7px"
            ></circle>
        </svg>
    `}),Tp=(i,t)=>m`
        ${H("flex")} :host {
            align-items: center;
            outline: none;
            height: calc(${v} * 1px);
            margin: calc(${v} * 1px) 0;
        }

        .progress {
            background-color: ${mt};
            border-radius: calc(${v} * 1px);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            position: relative;
        }

        .determinate {
            background-color: ${gt};
            border-radius: calc(${v} * 1px);
            height: 100%;
            transition: all 0.2s ease-in-out;
            display: flex;
        }

        .indeterminate {
            height: 100%;
            border-radius: calc(${v} * 1px);
            display: flex;
            width: 100%;
            position: relative;
            overflow: hidden;
        }

        .indeterminate-indicator-1 {
            position: absolute;
            opacity: 0;
            height: 100%;
            background-color: ${gt};
            border-radius: calc(${v} * 1px);
            animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
            width: 40%;
            animation: indeterminate-1 2s infinite;
        }

        .indeterminate-indicator-2 {
            position: absolute;
            opacity: 0;
            height: 100%;
            background-color: ${gt};
            border-radius: calc(${v} * 1px);
            animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
            width: 60%;
            animation: indeterminate-2 2s infinite;
        }

        :host([paused]) .indeterminate-indicator-1,
        :host([paused]) .indeterminate-indicator-2 {
            animation-play-state: paused;
            background-color: ${mt};
        }

        :host([paused]) .determinate {
            background-color: ${Ni};
        }

        @keyframes indeterminate-1 {
            0% {
                opacity: 1;
                transform: translateX(-100%);
            }
            70% {
                opacity: 1;
                transform: translateX(300%);
            }
            70.01% {
                opacity: 0;
            }
            100% {
                opacity: 0;
                transform: translateX(300%);
            }
        }

        @keyframes indeterminate-2 {
            0% {
                opacity: 0;
                transform: translateX(-150%);
            }
            29.99% {
                opacity: 0;
            }
            30% {
                opacity: 1;
                transform: translateX(-150%);
            }
            100% {
                transform: translateX(166.66%);
                opacity: 1;
            }
        }
    `.withBehaviors(L(m`
                .progress {
                    forced-color-adjust: none;
                    background-color: ${c.Field};
                    box-shadow: 0 0 0 1px inset ${c.FieldText};
                }
                .determinate,
                .indeterminate-indicator-1,
                .indeterminate-indicator-2 {
                    forced-color-adjust: none;
                    background-color: ${c.FieldText};
                }
                :host([paused]) .determinate,
                :host([paused]) .indeterminate-indicator-1,
                :host([paused]) .indeterminate-indicator-2 {
                    background-color: ${c.GrayText};
                }
            `)),hg=Ue.compose({baseName:"progress",template:Eh,styles:Tp,indeterminateIndicator1:`
        <span class="indeterminate-indicator-1" part="indeterminate-indicator-1"></span>
    `,indeterminateIndicator2:`
        <span class="indeterminate-indicator-1" part="indeterminate-indicator-1"></span>
    `}),Sp=(i,t)=>m`
    ${H("flex")} :host {
        align-items: flex-start;
        margin: calc(${v} * 1px) 0;
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
`,dg=Ee.compose({baseName:"radio-group",template:Rh,styles:Sp}),Fp=(i,t)=>m`
        ${H("inline-flex")} :host {
            --input-size: calc((${F} / 2) + ${v});
            align-items: center;
            outline: none;
            margin: calc(${v} * 1px) 0;
            /* Chromium likes to select label text or the default slot when
                the radio is clicked. Maybe there is a better solution here? */
            user-select: none;
            position: relative;
            flex-direction: row;
            transition: all 0.2s ease-in-out;
        }

        .control {
            position: relative;
            width: calc((${F} / 2 + ${v}) * 1px);
            height: calc((${F} / 2 + ${v}) * 1px);
            box-sizing: border-box;
            border-radius: 999px;
            border: calc(${T} * 1px) solid ${te};
            background: ${we};
            outline: none;
            cursor: pointer;
        }

        .label {
            font-family: ${Y};
            color: ${I};
            padding-inline-start: calc(${v} * 2px + 2px);
            margin-inline-end: calc(${v} * 2px + 2px);
            cursor: pointer;
            font-size: ${_};
            line-height: ${W};
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
            background: ${Ut};
            fill: ${Ut};
            opacity: 0;
            pointer-events: none;
        }

        :host(:not([disabled])) .control:hover{
            background: ${Mt};
            border-color: ${ji};
        }

        :host(:not([disabled])) .control:active {
            background: ${Xi};
            border-color: ${Us};
        }

        :host(:${$}) .control {
            box-shadow: 0 0 0 2px ${B}, 0 0 0 4px ${P};
        }

        :host([aria-checked="true"]) .control {
            background: ${Q};
            border: calc(${T} * 1px) solid ${Q};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover {
            background: ${ct};
            border: calc(${T} * 1px) solid ${ct};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
            background: ${se};
            fill: ${se};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active {
            background: ${at};
            border: calc(${T} * 1px) solid ${at};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
            background: ${Gt};
            fill: ${Gt};
        }

        :host([aria-checked="true"]:${$}:not([disabled])) .control {
            box-shadow: 0 0 0 2px ${B}, 0 0 0 4px ${P};
        }

        :host([disabled]) .label,
        :host([readonly]) .label,
        :host([readonly]) .control,
        :host([disabled]) .control {
            cursor: ${ot};
        }

        :host([aria-checked="true"]) .checked-indicator {
            opacity: 1;
        }

        :host([disabled]) {
            opacity: ${lt};
        }
    `.withBehaviors(L(m`
            .control,
            :host([aria-checked="true"]:not([disabled])) .control {
                forced-color-adjust: none;
                border-color: ${c.FieldText};
                background: ${c.Field};
            }
            :host(:not([disabled])) .control:hover {
                border-color: ${c.Highlight};
                background: ${c.Field};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover,
            :host([aria-checked="true"]:not([disabled])) .control:active {
                border-color: ${c.Highlight};
                background: ${c.Highlight};
            }
            :host([aria-checked="true"]) .checked-indicator {
                background: ${c.Highlight};
                fill: ${c.Highlight};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator,
            :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
                background: ${c.HighlightText};
                fill: ${c.HighlightText};
            }
            :host(:${$}) .control {
                border-color: ${c.Highlight};
                box-shadow: 0 0 0 2px ${c.Field}, 0 0 0 4px ${c.FieldText};
            }
            :host([aria-checked="true"]:${$}:not([disabled])) .control {
                border-color: ${c.Highlight};
                box-shadow: 0 0 0 2px ${c.Field}, 0 0 0 4px ${c.FieldText};
            }
            :host([disabled]) {
                forced-color-adjust: none;
                opacity: 1;
            }
            :host([disabled]) .label {
                color: ${c.GrayText};
            }
            :host([disabled]) .control,
            :host([aria-checked="true"][disabled]) .control:hover, .control:active {
                background: ${c.Field};
                border-color: ${c.GrayText};
            }
            :host([disabled]) .checked-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .checked-indicator {
                fill: ${c.GrayText};
                background: ${c.GrayText};
            }
        `)),ug=To.compose({baseName:"radio",template:Oh,styles:Fp,checkedIndicator:`
        <div part="checked-indicator" class="checked-indicator"></div>
    `}),Dp=Fe.create("clear-button-hover").withDefault(i=>{const t=Re.getValueFor(i),e=Ke.getValueFor(i);return t.evaluate(i,e.evaluate(i).hover).hover}),Ep=Fe.create("clear-button-active").withDefault(i=>{const t=Re.getValueFor(i),e=Ke.getValueFor(i);return t.evaluate(i,e.evaluate(i).hover).active}),Rp=(i,t)=>m`
    ${H("inline-block")} :host {
        font-family: ${Y};
        outline: none;
        user-select: none;
    }

    .root {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: row;
        color: ${I};
        background: ${we};
        border-radius: calc(${A} * 1px);
        border: calc(${T} * 1px) solid ${Q};
        height: calc(${F} * 1px);
        align-items: baseline;
    }

    .control {
        -webkit-appearance: none;
        font: inherit;
        background: transparent;
        border: 0;
        color: inherit;
        height: calc(100% - 4px);
        width: 100%;
        margin-top: auto;
        margin-bottom: auto;
        border: none;
        padding: 0 calc(${v} * 2px + 1px);
        font-size: ${_};
        line-height: ${W};
    }

    .control::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }

    .control:hover,
    .control:${$},
    .control:disabled,
    .control:active {
        outline: none;
    }

    .clear-button {
        height: calc(100% - 2px);
        opacity: 0;
        margin: 1px;
        background: transparent;
        color: ${I};
        fill: currentcolor;
        border: none;
        border-radius: calc(${A} * 1px);
        min-width: calc(${F} * 1px);
        font-size: ${_};
        line-height: ${W};
        outline: none;
        font-family: ${Y};
        padding: 0 calc((10 + (${v} * 2 * ${oe})) * 1px);
    }

    .clear-button:hover {
        background: ${ei};
    }

    .clear-button:active {
        background: ${ii};
    }

    :host([appearance="filled"]) .clear-button:hover {
        background: ${Dp};
    }

    :host([appearance="filled"]) .clear-button:active {
        background: ${Ep};
    }

    .input-wrapper {
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
    }

    .label {
        display: block;
        color: ${I};
        cursor: pointer;
        font-size: ${_};
        line-height: ${W};
        margin-bottom: 4px;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .input-wrapper,
    .start,
    .end {
        align-self: center;
    }

    .start,
    .end {
        display: flex;
        margin: 1px;
        fill: currentcolor;
    }

    ::slotted([slot="end"]) {
        height: 100%
    }

    .end {
        margin-inline-end: 1px;
        height: calc(100% - 2px);
    }

    ::slotted(svg) {
        /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
        width: 16px;
        height: 16px;
        margin-inline-end: 11px;
        margin-inline-start: 11px;
        margin-top: auto;
        margin-bottom: auto;
    }

    :host(:hover:not([disabled])) .root {
        background: ${Mt};
        border-color: ${ct};
    }

    :host(:active:not([disabled])) .root {
        background: ${Mt};
        border-color: ${at};
    }

    :host(:focus-within:not([disabled])) .root {
        border-color: ${P};
        box-shadow: 0 0 0 1px ${P} inset;
    }

    .clear-button__hidden {
        opacity: 0;
    }

    :host(:hover:not([disabled], [readOnly])) .clear-button,
    :host(:active:not([disabled], [readOnly])) .clear-button,
    :host(:focus-within:not([disabled], [readOnly])) .clear-button {
        opacity: 1;
    }

    :host(:hover:not([disabled], [readOnly])) .clear-button__hidden,
    :host(:active:not([disabled], [readOnly])) .clear-button__hidden,
    :host(:focus-within:not([disabled], [readOnly])) .clear-button__hidden {
        opacity: 0;
    }

    :host([appearance="filled"]) .root {
        background: ${B};
    }

    :host([appearance="filled"]:hover:not([disabled])) .root {
        background: ${ti};
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
        cursor: ${ot};
    }

    :host([disabled]) {
        opacity: ${lt};
    }

    :host([disabled]) .control {
        border-color: ${te};
    }
`.withBehaviors(L(m`
                .root,
                :host([appearance="filled"]) .root {
                    forced-color-adjust: none;
                    background: ${c.Field};
                    border-color: ${c.FieldText};
                }
                :host(:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover) .root {
                    background: ${c.Field};
                    border-color: ${c.Highlight};
                }
                .start,
                .end {
                    fill: currentcolor;
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .root,
                :host([appearance="filled"]:hover[disabled]) .root {
                    border-color: ${c.GrayText};
                    background: ${c.Field};
                }
                :host(:focus-within:enabled) .root {
                    border-color: ${c.Highlight};
                    box-shadow: 0 0 0 1px ${c.Highlight} inset;
                }
                input::placeholder {
                    color: ${c.GrayText};
                }
            `));class xa extends Bt{constructor(){super(...arguments),this.appearance="outline"}}r([d],xa.prototype,"appearance",void 0);const pg=xa.compose({baseName:"search",baseClass:Bt,template:Mh,styles:Rp,shadowOptions:{delegatesFocus:!0}});class $a extends le{constructor(){super(...arguments),this.listboxScrollWidth=""}connectedCallback(){super.connectedCallback(),this.listbox&&B.setValueFor(this.listbox,Bs)}get listboxMaxHeight(){return Math.floor(this.maxHeight/la.getValueFor(this)).toString()}listboxScrollWidthChanged(){this.updateComputedStylesheet()}get selectSize(){var t;return`${(t=this.size)!==null&&t!==void 0?t:this.multiple?4:0}`}multipleChanged(t,e){super.multipleChanged(t,e),this.updateComputedStylesheet()}maxHeightChanged(t,e){this.collapsible&&this.updateComputedStylesheet()}setPositioning(){super.setPositioning(),this.updateComputedStylesheet()}sizeChanged(t,e){if(super.sizeChanged(t,e),this.updateComputedStylesheet(),this.collapsible){requestAnimationFrame(()=>{this.listbox.style.setProperty("display","flex"),this.listbox.style.setProperty("overflow","visible"),this.listbox.style.setProperty("visibility","hidden"),this.listbox.style.setProperty("width","auto"),this.listbox.hidden=!1,this.listboxScrollWidth=`${this.listbox.scrollWidth}`,this.listbox.hidden=!0,this.listbox.style.removeProperty("display"),this.listbox.style.removeProperty("overflow"),this.listbox.style.removeProperty("visibility"),this.listbox.style.removeProperty("width")});return}this.listboxScrollWidth=""}updateComputedStylesheet(){this.computedStylesheet&&this.$fastController.removeStyles(this.computedStylesheet),this.computedStylesheet=m`
            :host {
                --listbox-max-height: ${this.listboxMaxHeight};
                --listbox-scroll-width: ${this.listboxScrollWidth};
                --size: ${this.selectSize};
            }
        `,this.$fastController.addStyles(this.computedStylesheet)}}r([f],$a.prototype,"listboxScrollWidth",void 0);const fg=$a.compose({baseName:"select",baseClass:le,template:Nh,styles:ba,indicator:`
        <svg
            class="select-indicator"
            part="select-indicator"
            viewBox="0 0 12 7"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
            />
        </svg>
    `}),Op=(i,t)=>m`
        ${H("block")} :host {
            --skeleton-fill-default: #e1dfdd;
            overflow: hidden;
            width: 100%;
            position: relative;
            background-color: var(--skeleton-fill, var(--skeleton-fill-default));
            --skeleton-animation-gradient-default: linear-gradient(
                270deg,
                var(--skeleton-fill, var(--skeleton-fill-default)) 0%,
                #f3f2f1 51.13%,
                var(--skeleton-fill, var(--skeleton-fill-default)) 100%
            );
            --skeleton-animation-timing-default: ease-in-out;
        }

        :host([shape="rect"]) {
            border-radius: calc(${A} * 1px);
        }

        :host([shape="circle"]) {
            border-radius: 100%;
            overflow: hidden;
        }

        object {
            position: absolute;
            width: 100%;
            height: auto;
            z-index: 2;
        }

        object img {
            width: 100%;
            height: auto;
        }

        ${H("block")} span.shimmer {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: var(
                --skeleton-animation-gradient,
                var(--skeleton-animation-gradient-default)
            );
            background-size: 0px 0px / 90% 100%;
            background-repeat: no-repeat;
            background-color: var(--skeleton-animation-fill, ${mt});
            animation: shimmer 2s infinite;
            animation-timing-function: var(
                --skeleton-animation-timing,
                var(--skeleton-timing-default)
            );
            animation-direction: normal;
            z-index: 1;
        }

        ::slotted(svg) {
            z-index: 2;
        }

        ::slotted(.pattern) {
            width: 100%;
            height: 100%;
        }

        @keyframes shimmer {
            0% {
                transform: translateX(-100%);
            }
            100% {
                transform: translateX(100%);
            }
        }
    `.withBehaviors(L(m`
                :host {
                    forced-color-adjust: none;
                    background-color: ${c.ButtonFace};
                    box-shadow: 0 0 0 1px ${c.ButtonText};
                }

                ${H("block")} span.shimmer {
                    display: none;
                }
            `)),gg=Ui.compose({baseName:"skeleton",template:jh,styles:Op}),jn=m`
    :host {
        align-self: start;
        grid-row: 2;
        margin-top: -2px;
        height: calc((${F} / 2 + ${v}) * 1px);
        width: auto;
    }
    .container {
        grid-template-rows: auto auto;
        grid-template-columns: 0;
    }
    .label {
        margin: 2px 0;
    }
`,_n=m`
    :host {
        justify-self: start;
        grid-column: 2;
        margin-left: 2px;
        height: auto;
        width: calc((${F} / 2 + ${v}) * 1px);
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
        margin-left: calc((${v} / 2) * 3px);
        align-self: center;
    }
`,Lp=(i,t)=>m`
        ${H("block")} :host {
            font-family: ${Y};
            color: ${I};
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
            width: calc((${v} / 4) * 1px);
            height: calc(${F} * 0.25 * 1px);
            background: ${te};
            justify-self: center;
        }
        :host(.disabled) {
            opacity: ${lt};
        }
    `.withBehaviors(L(m`
                .mark {
                    forced-color-adjust: none;
                    background: ${c.FieldText};
                }
                :host(.disabled) {
                    forced-color-adjust: none;
                    opacity: 1;
                }
                :host(.disabled) .label {
                    color: ${c.GrayText};
                }
                :host(.disabled) .mark {
                    background: ${c.GrayText};
                }
            `));class Ap extends ce{sliderOrientationChanged(){this.sliderOrientation===it.horizontal?(this.$fastController.addStyles(jn),this.$fastController.removeStyles(_n)):(this.$fastController.addStyles(_n),this.$fastController.removeStyles(jn))}}const Pp=Ap.compose({baseName:"slider-label",baseClass:ce,template:_h,styles:Lp}),Mp=m`
    .track-start {
        left: 0;
    }
`,Vp=m`
    .track-start {
        right: 0;
    }
`,Hp=(i,t)=>m`
        :host([hidden]) {
            display: none;
        }

        ${H("inline-grid")} :host {
            --thumb-size: calc(${F} * 0.5 - ${v});
            --thumb-translate: calc(var(--thumb-size) * -0.5 + var(--track-width) / 2);
            --track-overhang: calc((${v} / 2) * -1);
            --track-width: ${v};
            --fast-slider-height: calc(var(--thumb-size) * 10);
            align-items: center;
            width: 100%;
            margin: calc(${v} * 1px) 0;
            user-select: none;
            box-sizing: border-box;
            border-radius: calc(${A} * 1px);
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

        :host(:${$}) .thumb-cursor {
            box-shadow: 0 0 0 2px ${B}, 0 0 0 4px ${P};
        }

        .thumb-container {
            position: absolute;
            height: calc(var(--thumb-size) * 1px);
            width: calc(var(--thumb-size) * 1px);
            transition: all 0.2s ease;
            color: ${I};
            fill: currentcolor;
        }
        .thumb-cursor {
            border: none;
            width: calc(var(--thumb-size) * 1px);
            height: calc(var(--thumb-size) * 1px);
            background: ${I};
            border-radius: calc(${A} * 1px);
        }
        .thumb-cursor:hover {
            background: ${I};
            border-color: ${ji};
        }
        .thumb-cursor:active {
            background: ${I};
        }
        .track-start {
            background: ${gt};
            position: absolute;
            height: 100%;
            left: 0;
            border-radius: calc(${A} * 1px);
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
            background: ${te};
            position: absolute;
            border-radius: calc(${A} * 1px);
        }
        :host([orientation="vertical"]) {
            height: calc(var(--fast-slider-height) * 1px);
            min-height: calc(var(--thumb-size) * 1px);
            min-width: calc(${v} * 20px);
        }
        :host([orientation="vertical"]) .track-start {
            height: auto;
            width: 100%;
            top: 0;
        }
        :host([disabled]), :host([readonly]) {
            cursor: ${ot};
        }
        :host([disabled]) {
            opacity: ${lt};
        }
    `.withBehaviors(new xi(Mp,Vp),L(m`
                .thumb-cursor {
                    forced-color-adjust: none;
                    border-color: ${c.FieldText};
                    background: ${c.FieldText};
                }
                .thumb-cursor:hover,
                .thumb-cursor:active {
                    background: ${c.Highlight};
                }
                .track {
                    forced-color-adjust: none;
                    background: ${c.FieldText};
                }
                :host(:${$}) .thumb-cursor {
                    border-color: ${c.Highlight};
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .track,
                :host([disabled]) .thumb-cursor {
                    forced-color-adjust: none;
                    background: ${c.GrayText};
                }

                :host(:${$}) .thumb-cursor {
                    background: ${c.Highlight};
                    border-color: ${c.Highlight};
                    box-shadow: 0 0 0 2px ${c.Field}, 0 0 0 4px ${c.FieldText};
                }
            `)),zp=wt.compose({baseName:"slider",template:qh,styles:Hp,thumb:`
        <div class="thumb-cursor"></div>
    `}),Bp=(i,t)=>m`
        :host([hidden]) {
            display: none;
        }

        ${H("inline-flex")} :host {
            align-items: center;
            outline: none;
            font-family: ${Y};
            margin: calc(${v} * 1px) 0;
            ${""} user-select: none;
        }

        :host([disabled]) {
            opacity: ${lt};
        }

        :host([disabled]) .label,
        :host([readonly]) .label,
        :host([readonly]) .switch,
        :host([disabled]) .switch {
            cursor: ${ot};
        }

        .switch {
            position: relative;
            outline: none;
            box-sizing: border-box;
            width: calc(${F} * 1px);
            height: calc((${F} / 2 + ${v}) * 1px);
            background: ${we};
            border-radius: calc(${A} * 1px);
            border: calc(${T} * 1px) solid ${te};
        }

        .switch:hover {
            background: ${Mt};
            border-color: ${ji};
            cursor: pointer;
        }

        host([disabled]) .switch:hover,
        host([readonly]) .switch:hover {
            background: ${Mt};
            border-color: ${ji};
            cursor: ${ot};
        }

        :host(:not([disabled])) .switch:active {
            background: ${Xi};
            border-color: ${Us};
        }

        :host(:${$}) .switch {
            box-shadow: 0 0 0 2px ${B}, 0 0 0 4px ${P};
        }

        .checked-indicator {
            position: absolute;
            top: 5px;
            bottom: 5px;
            background: ${I};
            border-radius: calc(${A} * 1px);
            transition: all 0.2s ease-in-out;
        }

        .status-message {
            color: ${I};
            cursor: pointer;
            font-size: ${_};
            line-height: ${W};
        }

        :host([disabled]) .status-message,
        :host([readonly]) .status-message {
            cursor: ${ot};
        }

        .label {
            color: ${I};
            margin-inline-end: calc(${v} * 2px + 2px);
            font-size: ${_};
            line-height: ${W};
            cursor: pointer;
        }

        .label__hidden {
            display: none;
            visibility: hidden;
        }

        ::slotted([slot="checked-message"]),
        ::slotted([slot="unchecked-message"]) {
            margin-inline-start: calc(${v} * 2px + 2px);
        }

        :host([aria-checked="true"]) .checked-indicator {
            background: ${Ut};
        }

        :host([aria-checked="true"]) .switch {
            background: ${Q};
            border-color: ${Q};
        }

        :host([aria-checked="true"]:not([disabled])) .switch:hover {
            background: ${ct};
            border-color: ${ct};
        }

        :host([aria-checked="true"]:not([disabled])) .switch:hover .checked-indicator {
            background: ${se};
        }

        :host([aria-checked="true"]:not([disabled])) .switch:active {
            background: ${at};
            border-color: ${at};
        }

        :host([aria-checked="true"]:not([disabled])) .switch:active .checked-indicator {
            background: ${Gt};
        }

        :host([aria-checked="true"]:${$}:not([disabled])) .switch {
            box-shadow: 0 0 0 2px ${B}, 0 0 0 4px ${P};
        }

        .unchecked-message {
            display: block;
        }

        .checked-message {
            display: none;
        }

        :host([aria-checked="true"]) .unchecked-message {
            display: none;
        }

        :host([aria-checked="true"]) .checked-message {
            display: block;
        }
    `.withBehaviors(L(m`
            .checked-indicator,
            :host(:not([disabled])) .switch:active .checked-indicator {
                forced-color-adjust: none;
                background: ${c.FieldText};
            }
            .switch {
                forced-color-adjust: none;
                background: ${c.Field};
                border-color: ${c.FieldText};
            }
            :host(:not([disabled])) .switch:hover {
                background: ${c.HighlightText};
                border-color: ${c.Highlight};
            }
            :host([aria-checked="true"]) .switch {
                background: ${c.Highlight};
                border-color: ${c.Highlight};
            }
            :host([aria-checked="true"]:not([disabled])) .switch:hover,
            :host(:not([disabled])) .switch:active {
                background: ${c.HighlightText};
                border-color: ${c.Highlight};
            }
            :host([aria-checked="true"]) .checked-indicator {
                background: ${c.HighlightText};
            }
            :host([aria-checked="true"]:not([disabled])) .switch:hover .checked-indicator {
                background: ${c.Highlight};
            }
            :host([disabled]) {
                opacity: 1;
            }
            :host(:${$}) .switch {
                border-color: ${c.Highlight};
                box-shadow: 0 0 0 2px ${c.Field}, 0 0 0 4px ${c.FieldText};
            }
            :host([aria-checked="true"]:${$}:not([disabled])) .switch {
                box-shadow: 0 0 0 2px ${c.Field}, 0 0 0 4px ${c.FieldText};
            }
            :host([disabled]) .checked-indicator {
                background: ${c.GrayText};
            }
            :host([disabled]) .switch {
                background: ${c.Field};
                border-color: ${c.GrayText};
            }
        `),new xi(m`
                .checked-indicator {
                    left: 5px;
                    right: calc(((${F} / 2) + 1) * 1px);
                }

                :host([aria-checked="true"]) .checked-indicator {
                    left: calc(((${F} / 2) + 1) * 1px);
                    right: 5px;
                }
            `,m`
                .checked-indicator {
                    right: 5px;
                    left: calc(((${F} / 2) + 1) * 1px);
                }

                :host([aria-checked="true"]) .checked-indicator {
                    right: calc(((${F} / 2) + 1) * 1px);
                    left: 5px;
                }
            `)),mg=Ps.compose({baseName:"switch",template:Xh,styles:Bp,switch:`
        <span class="checked-indicator" part="checked-indicator"></span>
    `}),Np=(i,t)=>m`
        ${H("grid")} :host {
            box-sizing: border-box;
            font-family: ${Y};
            font-size: ${_};
            line-height: ${W};
            color: ${I};
            grid-template-columns: auto 1fr auto;
            grid-template-rows: auto 1fr;
        }

        .tablist {
            display: grid;
            grid-template-rows: auto auto;
            grid-template-columns: auto;
            position: relative;
            width: max-content;
            align-self: end;
            padding: calc(${v} * 4px) calc(${v} * 4px) 0;
            box-sizing: border-box;
        }

        .start,
        .end {
            align-self: center;
        }

        .activeIndicator {
            grid-row: 2;
            grid-column: 1;
            width: 100%;
            height: 5px;
            justify-self: center;
            background: ${Q};
            margin-top: 10px;
            border-radius: calc(${A} * 1px)
                calc(${A} * 1px) 0 0;
        }

        .activeIndicatorTransition {
            transition: transform 0.2s ease-in-out;
        }

        .tabpanel {
            grid-row: 2;
            grid-column-start: 1;
            grid-column-end: 4;
            position: relative;
        }

        :host([orientation="vertical"]) {
            grid-template-rows: auto 1fr auto;
            grid-template-columns: auto 1fr;
        }

        :host([orientation="vertical"]) .tablist {
            grid-row-start: 2;
            grid-row-end: 2;
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: auto 1fr;
            position: relative;
            width: max-content;
            justify-self: end;
            align-self: flex-start;
            width: 100%;
            padding: 0 calc(${v} * 4px)
                calc((${F} - ${v}) * 1px) 0;
        }

        :host([orientation="vertical"]) .tabpanel {
            grid-column: 2;
            grid-row-start: 1;
            grid-row-end: 4;
        }

        :host([orientation="vertical"]) .end {
            grid-row: 3;
        }

        :host([orientation="vertical"]) .activeIndicator {
            grid-column: 1;
            grid-row: 1;
            width: 5px;
            height: 100%;
            margin-inline-end: 10px;
            align-self: center;
            background: ${Q};
            margin-top: 0;
            border-radius: 0 calc(${A} * 1px)
                calc(${A} * 1px) 0;
        }

        :host([orientation="vertical"]) .activeIndicatorTransition {
            transition: transform 0.2s linear;
        }
    `.withBehaviors(L(m`
                .activeIndicator,
                :host([orientation="vertical"]) .activeIndicator {
                    forced-color-adjust: none;
                    background: ${c.Highlight};
                }
            `)),jp=(i,t)=>m`
    ${H("inline-flex")} :host {
        box-sizing: border-box;
        font-family: ${Y};
        font-size: ${_};
        line-height: ${W};
        height: calc(${F} * 1px);
        padding: calc(${v} * 5px) calc(${v} * 4px);
        color: ${Ni};
        fill: currentcolor;
        border-radius: calc(${A} * 1px);
        border: calc(${T} * 1px) solid transparent;
        align-items: center;
        justify-content: center;
        grid-row: 1;
        cursor: pointer;
    }

    :host(:hover) {
        color: ${I};
        fill: currentcolor;
    }

    :host(:active) {
        color: ${I};
        fill: currentcolor;
    }

    :host([disabled]) {
        cursor: ${ot};
        opacity: ${lt};
    }

    :host([disabled]:hover) {
        color: ${Ni};
        background: ${Wt};
    }

    :host([aria-selected="true"]) {
        background: ${mt};
        color: ${gt};
        fill: currentcolor;
    }

    :host([aria-selected="true"]:hover) {
        background: ${ti};
        color: ${Be};
        fill: currentcolor;
    }

    :host([aria-selected="true"]:active) {
        background: ${js};
        color: ${ee};
        fill: currentcolor;
    }

    :host(:${$}) {
        outline: none;
        border: calc(${T} * 1px) solid ${P};
        box-shadow: 0 0 0 calc((${z} - ${T}) * 1px)
            ${P};
    }

    :host(:focus) {
        outline: none;
    }

    :host(.vertical) {
        justify-content: end;
        grid-column: 2;
    }

    :host(.vertical[aria-selected="true"]) {
        z-index: 2;
    }

    :host(.vertical:hover) {
        color: ${I};
    }

    :host(.vertical:active) {
        color: ${I};
    }

    :host(.vertical:hover[aria-selected="true"]) {
    }
`.withBehaviors(L(m`
            :host {
                forced-color-adjust: none;
                border-color: transparent;
                color: ${c.ButtonText};
                fill: currentcolor;
            }
            :host(:hover),
            :host(.vertical:hover),
            :host([aria-selected="true"]:hover) {
                background: ${c.Highlight};
                color: ${c.HighlightText};
                fill: currentcolor;
            }
            :host([aria-selected="true"]) {
                background: ${c.HighlightText};
                color: ${c.Highlight};
                fill: currentcolor;
            }
            :host(:${$}) {
                border-color: ${c.ButtonText};
                box-shadow: none;
            }
            :host([disabled]),
            :host([disabled]:hover) {
                opacity: 1;
                color: ${c.GrayText};
                background: ${c.ButtonFace};
            }
        `)),bg=Fr.compose({baseName:"tab",template:Kh,styles:jp}),_p=(i,t)=>m`
    ${H("block")} :host {
        box-sizing: border-box;
        font-size: ${_};
        line-height: ${W};
        padding: 0 calc((6 + (${v} * 2 * ${oe})) * 1px);
    }
`,vg=Jh.compose({baseName:"tab-panel",template:Zh,styles:_p}),yg=xe.compose({baseName:"tabs",template:td,styles:Np}),qp=(i,t)=>m`
    ${H("inline-block")} :host {
        font-family: ${Y};
        outline: none;
        user-select: none;
    }

    .control {
        box-sizing: border-box;
        position: relative;
        color: ${I};
        background: ${we};
        border-radius: calc(${A} * 1px);
        border: calc(${T} * 1px) solid ${Q};
        height: calc(${F} * 2px);
        font: inherit;
        font-size: ${_};
        line-height: ${W};
        padding: calc(${v} * 2px + 1px);
        width: 100%;
        resize: none;
    }

    .control:hover:enabled {
        background: ${Mt};
        border-color: ${ct};
    }

    .control:active:enabled {
        background: ${Xi};
        border-color: ${at};
    }

    .control:hover,
    .control:${$},
    .control:disabled,
    .control:active {
        outline: none;
    }

    :host(:focus-within) .control {
        border-color: ${P};
        box-shadow: 0 0 0 1px ${P} inset;
    }

    :host([appearance="filled"]) .control {
        background: ${mt};
    }

    :host([appearance="filled"]:hover:not([disabled])) .control {
        background: ${ti};
    }

    :host([resize="both"]) .control {
        resize: both;
    }

    :host([resize="horizontal"]) .control {
        resize: horizontal;
    }

    :host([resize="vertical"]) .control {
        resize: vertical;
    }

    .label {
        display: block;
        color: ${I};
        cursor: pointer;
        font-size: ${_};
        line-height: ${W};
        margin-bottom: 4px;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
        cursor: ${ot};
    }
    :host([disabled]) {
        opacity: ${lt};
    }
    :host([disabled]) .control {
        border-color: ${te};
    }

    :host([cols]){
        width: initial;
    }

    :host([rows]) .control {
        height: initial;
    }
 `.withBehaviors(L(m`
                :host([disabled]) {
                    opacity: 1;
                }
            `));class wa extends kt{constructor(){super(...arguments),this.appearance="outline"}}r([d],wa.prototype,"appearance",void 0);const xg=wa.compose({baseName:"text-area",baseClass:kt,template:od,styles:qp,shadowOptions:{delegatesFocus:!0}}),Up=(i,t)=>m`
    ${H("inline-block")} :host {
        font-family: ${Y};
        outline: none;
        user-select: none;
    }

    .root {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: row;
        color: ${I};
        background: ${we};
        border-radius: calc(${A} * 1px);
        border: calc(${T} * 1px) solid ${Q};
        height: calc(${F} * 1px);
        align-items: baseline;
    }

    .control {
        -webkit-appearance: none;
        font: inherit;
        background: transparent;
        border: 0;
        color: inherit;
        height: calc(100% - 4px);
        width: 100%;
        margin-top: auto;
        margin-bottom: auto;
        border: none;
        padding: 0 calc(${v} * 2px + 1px);
        font-size: ${_};
        line-height: ${W};
    }

    .control:hover,
    .control:${$},
    .control:disabled,
    .control:active {
        outline: none;
    }

    .label {
        display: block;
        color: ${I};
        cursor: pointer;
        font-size: ${_};
        line-height: ${W};
        margin-bottom: 4px;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .start,
    .control,
    .end {
        align-self: center;
    }

    .start,
    .end {
        display: flex;
        margin: auto;
        fill: currentcolor;
    }

    ::slotted(svg) {
        /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
        width: 16px;
        height: 16px;
    }

    .start {
        margin-inline-start: 11px;
    }

    .end {
        margin-inline-end: 11px;
    }

    :host(:hover:not([disabled])) .root {
        background: ${Mt};
        border-color: ${ct};
    }

    :host(:active:not([disabled])) .root {
        background: ${Mt};
        border-color: ${at};
    }

    :host(:focus-within:not([disabled])) .root {
        border-color: ${P};
        box-shadow: 0 0 0 calc(${z} * 1px) ${P} inset;
    }

    :host([appearance="filled"]) .root {
        background: ${mt};
    }

    :host([appearance="filled"]:hover:not([disabled])) .root {
        background: ${ti};
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
        cursor: ${ot};
    }

    :host([disabled]) {
        opacity: ${lt};
    }

    :host([disabled]) .control {
        border-color: ${te};
    }
`.withBehaviors(L(m`
                .root,
                :host([appearance="filled"]) .root {
                    forced-color-adjust: none;
                    background: ${c.Field};
                    border-color: ${c.FieldText};
                }
                :host(:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover) .root {
                    background: ${c.Field};
                    border-color: ${c.Highlight};
                }
                .start,
                .end {
                    fill: currentcolor;
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .root,
                :host([appearance="filled"]:hover[disabled]) .root {
                    border-color: ${c.GrayText};
                    background: ${c.Field};
                }
                :host(:focus-within:enabled) .root {
                    border-color: ${c.Highlight};
                    box-shadow: 0 0 0 1px ${c.Highlight} inset;
                }
                input::placeholder {
                    color: ${c.GrayText};
                }
            `));class ka extends At{constructor(){super(...arguments),this.appearance="outline"}}r([d],ka.prototype,"appearance",void 0);const $g=ka.compose({baseName:"text-field",baseClass:At,template:sd,styles:Up,shadowOptions:{delegatesFocus:!0}}),Gp=(i,t)=>m`
        ${H("inline-flex")} :host {
            --toolbar-item-gap: calc(
                (var(--design-unit) + calc(var(--density) + 2)) * 1px
            );
            background-color: ${B};
            border-radius: calc(${A} * 1px);
            fill: currentcolor;
            padding: var(--toolbar-item-gap);
        }

        :host(${$}) {
            outline: calc(${T} * 1px) solid ${Du};
        }

        .positioning-region {
            align-items: flex-start;
            display: inline-flex;
            flex-flow: row wrap;
            justify-content: flex-start;
        }

        :host([orientation="vertical"]) .positioning-region {
            flex-direction: column;
        }

        ::slotted(:not([slot])) {
            flex: 0 0 auto;
            margin: 0 var(--toolbar-item-gap);
        }

        :host([orientation="vertical"]) ::slotted(:not([slot])) {
            margin: var(--toolbar-item-gap) 0;
        }

        .start,
        .end {
            display: flex;
            margin: auto;
            margin-inline: 0;
        }

        ::slotted(svg) {
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            width: 16px;
            height: 16px;
        }
    `.withBehaviors(L(m`
            :host(:${$}) {
                box-shadow: 0 0 0 calc(${z} * 1px) ${c.Highlight};
                color: ${c.ButtonText};
                forced-color-adjust: none;
            }
        `));class Wp extends ie{connectedCallback(){super.connectedCallback();const t=Mi(this);t&&B.setValueFor(this,e=>qs.getValueFor(e).evaluate(e,B.getValueFor(t)))}}const wg=Wp.compose({baseName:"toolbar",baseClass:ie,template:nd,styles:Gp,shadowOptions:{delegatesFocus:!0}}),Xp=(i,t)=>{const e=i.tagFor(j);return m`
            :host {
                contain: size;
                overflow: visible;
                height: 0;
                width: 0;
            }

            .tooltip {
                box-sizing: border-box;
                border-radius: calc(${A} * 1px);
                border: calc(${T} * 1px) solid ${P};
                box-shadow: 0 0 0 1px ${P} inset;
                background: ${mt};
                color: ${I};
                padding: 4px;
                height: fit-content;
                width: fit-content;
                font-family: ${Y};
                font-size: ${_};
                line-height: ${W};
                white-space: nowrap;
                /* TODO: a mechanism to manage z-index across components
                    https://github.com/microsoft/fast/issues/3813 */
                z-index: 10000;
            }

            ${e} {
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: visible;
                flex-direction: row;
            }

            ${e}.right,
            ${e}.left {
                flex-direction: column;
            }

            ${e}.top .tooltip {
                margin-bottom: 4px;
            }

            ${e}.bottom .tooltip {
                margin-top: 4px;
            }

            ${e}.left .tooltip {
                margin-right: 4px;
            }

            ${e}.right .tooltip {
                margin-left: 4px;
            }

            ${e}.top.left .tooltip,
            ${e}.top.right .tooltip {
                margin-bottom: 0px;
            }

            ${e}.bottom.left .tooltip,
            ${e}.bottom.right .tooltip {
                margin-top: 0px;
            }

            ${e}.top.left .tooltip,
            ${e}.bottom.left .tooltip {
                margin-right: 0px;
            }

            ${e}.top.right .tooltip,
            ${e}.bottom.right .tooltip {
                margin-left: 0px;
            }

        `.withBehaviors(L(m`
                :host([disabled]) {
                    opacity: 1;
                }
            `))},kg=ht.compose({baseName:"tooltip",template:rd,styles:Xp}),Yp=m`
    .expand-collapse-glyph {
        transform: rotate(0deg);
    }
    :host(.nested) .expand-collapse-button {
        left: var(--expand-collapse-button-nested-width, calc(${F} * -1px));
    }
    :host([selected])::after {
        left: calc(${z} * 1px);
    }
    :host([expanded]) > .positioning-region .expand-collapse-glyph {
        transform: rotate(45deg);
    }
`,Qp=m`
    .expand-collapse-glyph {
        transform: rotate(180deg);
    }
    :host(.nested) .expand-collapse-button {
        right: var(--expand-collapse-button-nested-width, calc(${F} * -1px));
    }
    :host([selected])::after {
        right: calc(${z} * 1px);
    }
    :host([expanded]) > .positioning-region .expand-collapse-glyph {
        transform: rotate(135deg);
    }
`,qn=ir`((${Wi} / 2) * ${v}) + ((${v} * ${oe}) / 2)`,Zp=Fe.create("tree-item-expand-collapse-hover").withDefault(i=>{const t=Re.getValueFor(i);return t.evaluate(i,t.evaluate(i).hover).hover}),Jp=Fe.create("tree-item-expand-collapse-selected-hover").withDefault(i=>{const t=Ke.getValueFor(i);return Re.getValueFor(i).evaluate(i,t.evaluate(i).rest).hover}),Kp=(i,t)=>m`
    /**
     * This animation exists because when tree item children are conditionally loaded
     * there is a visual bug where the DOM exists but styles have not yet been applied (essentially FOUC).
     * This subtle animation provides a ever so slight timing adjustment for loading that solves the issue.
     */
    @keyframes treeItemLoading {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
         }
    }

    ${H("block")} :host {
        contain: content;
        position: relative;
        outline: none;
        color: ${I};
        background: ${Wt};
        cursor: pointer;
        font-family: ${Y};
        --expand-collapse-button-size: calc(${F} * 1px);
        --tree-item-nested-width: 0;
    }

        :host(:focus) > .positioning-region {
            outline: none;
        }

        :host(:focus) .content-region {
            outline: none;
        }

        :host(:${$}) .positioning-region {
            border: ${P} calc(${T} * 1px) solid;
            border-radius: calc(${A} * 1px);
            color: ${I};
        }

        .positioning-region {
            display: flex;
            position: relative;
            box-sizing: border-box;
            background: ${Wt};
            border: transparent calc(${T} * 1px) solid;
            height: calc((${F} + 1) * 1px);
        }

        .positioning-region::before {
            content: "";
            display: block;
            width: var(--tree-item-nested-width);
            flex-shrink: 0;
        }

        :host(:not([disabled])) .positioning-region:hover {
            background: ${ei};
        }

        :host(:not([disabled])) .positioning-region:active {
            background: ${ii};
        }

        .content-region {
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
            width: 100%;
            height: calc(${F} * 1px);
            margin-inline-start: calc(${v} * 2px + 8px);
            font-size: ${_};
            line-height: ${W};
            font-weight: 400;
        }

        .items {
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            font-size: calc(1em + (${v} + 16) * 1px);
        }

        .expand-collapse-button {
            background: none;
            border: none;
            outline: none;
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            width: calc((${qn} + (${v} * 2)) * 1px);
            height: calc((${qn} + (${v} * 2)) * 1px);
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin-left: 6px;
            margin-right: 6px;
        }

        .expand-collapse-glyph {
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            width: 16px;
            height: 16px;
            transition: transform 0.1s linear;

            pointer-events: none;
            fill: currentcolor;
        }

        .start,
        .end {
            display: flex;
            fill: currentcolor;
        }

        ::slotted(svg) {
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            width: 16px;
            height: 16px;
        }

        .start {
            /* TODO: horizontalSpacing https://github.com/microsoft/fast/issues/2766 */
            margin-inline-end: calc(${v} * 2px + 2px);
        }

        .end {
            /* TODO: horizontalSpacing https://github.com/microsoft/fast/issues/2766 */
            margin-inline-start: calc(${v} * 2px + 2px);
        }

        :host([expanded]) > .items {
            animation: treeItemLoading ease-in 10ms;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
        }

        :host([disabled]) .content-region {
            opacity: ${lt};
            cursor: ${ot};
        }

        :host(.nested) .content-region {
            position: relative;
            margin-inline-start: var(--expand-collapse-button-size);
        }

        :host(.nested) .expand-collapse-button {
            position: absolute;
        }

        :host(.nested:not([disabled])) .expand-collapse-button:hover {
            background: ${Zp};
        }

        :host([selected]) .positioning-region {
            background: ${mt};
        }

        :host([selected]:not([disabled])) .positioning-region:hover {
            background: ${ti};
        }

        :host([selected]:not([disabled])) .positioning-region:active {
            background: ${js};
        }

        :host([selected]:not([disabled])) .expand-collapse-button:hover {
            background: ${Jp};
        }

        :host([selected])::after {
            /* The background needs to be calculated based on the selected background state
                for this control. We currently have no way of changing that, so setting to
                accent-foreground-rest for the time being */
            background: ${gt};
            border-radius: calc(${A} * 1px);
            content: "";
            display: block;
            position: absolute;
            top: calc((${F} / 4) * 1px);
            width: 3px;
            height: calc((${F} / 2) * 1px);
        }

        ::slotted(${i.tagFor(st)}) {
            --tree-item-nested-width: 1em;
            --expand-collapse-button-nested-width: calc(${F} * -1px);
        }
    `.withBehaviors(new xi(Yp,Qp),L(m`
            :host {
                forced-color-adjust: none;
                border-color: transparent;
                background: ${c.Field};
                color: ${c.FieldText};
            }
            :host .content-region .expand-collapse-glyph {
                fill: ${c.FieldText};
            }
            :host .positioning-region:hover,
            :host([selected]) .positioning-region {
                background: ${c.Highlight};
            }
            :host .positioning-region:hover .content-region,
            :host([selected]) .positioning-region .content-region {
                color: ${c.HighlightText};
            }
            :host .positioning-region:hover .content-region .expand-collapse-glyph,
            :host .positioning-region:hover .content-region .start,
            :host .positioning-region:hover .content-region .end,
            :host([selected]) .content-region .expand-collapse-glyph,
            :host([selected]) .content-region .start,
            :host([selected]) .content-region .end {
                fill: ${c.HighlightText};
            }
            :host([selected])::after {
                background: ${c.Field};
            }
            :host(:${$}) .positioning-region {
                border-color: ${c.FieldText};
                box-shadow: 0 0 0 2px inset ${c.Field};
                color: ${c.FieldText};
            }
            :host([disabled]) .content-region,
            :host([disabled]) .positioning-region:hover .content-region {
                opacity: 1;
                color: ${c.GrayText};
            }
            :host([disabled]) .content-region .expand-collapse-glyph,
            :host([disabled]) .content-region .start,
            :host([disabled]) .content-region .end,
            :host([disabled]) .positioning-region:hover .content-region .expand-collapse-glyph,
            :host([disabled]) .positioning-region:hover .content-region .start,
            :host([disabled]) .positioning-region:hover .content-region .end {
                fill: ${c.GrayText};
            }
            :host([disabled]) .positioning-region:hover {
                background: ${c.Field};
            }
            .expand-collapse-glyph,
            .start,
            .end {
                fill: ${c.FieldText};
            }
            :host(.nested) .expand-collapse-button:hover {
                background: ${c.Field};
            }
            :host(.nested) .expand-collapse-button:hover .expand-collapse-glyph {
                fill: ${c.FieldText};
            }
        `)),Cg=st.compose({baseName:"tree-item",template:ad,styles:Kp,expandCollapseGlyph:`
        <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            class="expand-collapse-glyph"
        >
            <path
                d="M5.00001 12.3263C5.00124 12.5147 5.05566 12.699 5.15699 12.8578C5.25831 13.0167 5.40243 13.1437 5.57273 13.2242C5.74304 13.3047 5.9326 13.3354 6.11959 13.3128C6.30659 13.2902 6.4834 13.2152 6.62967 13.0965L10.8988 8.83532C11.0739 8.69473 11.2153 8.51658 11.3124 8.31402C11.4096 8.11146 11.46 7.88966 11.46 7.66499C11.46 7.44033 11.4096 7.21853 11.3124 7.01597C11.2153 6.81341 11.0739 6.63526 10.8988 6.49467L6.62967 2.22347C6.48274 2.10422 6.30501 2.02912 6.11712 2.00691C5.92923 1.9847 5.73889 2.01628 5.56823 2.09799C5.39757 2.17969 5.25358 2.30817 5.153 2.46849C5.05241 2.62882 4.99936 2.8144 5.00001 3.00369V12.3263Z"
            />
        </svg>
    `}),tf=(i,t)=>m`
    ${H("flex")} :host {
        flex-direction: column;
        align-items: stretch;
        min-width: fit-content;
        font-size: 0;
    }

    :host:focus-visible {
        outline: none;
    }
`,Ig=Fo.compose({baseName:"tree-view",template:ld,styles:tf});function ef(i){return xr.getOrCreate(i).withPrefix("fast")}ef().register(zp({thumb:'<div style="background-color: #fff; border: solid; border-color: #777; border-width: 1px; border-radius: 3px; width: 16px; height: 16px; "></div>'}),Pp());const of=document.getElementById("canvas"),uo=document.getElementById("nCitiesSlider"),gi=document.getElementById("piSlider"),mi=document.getElementById("tcostSlider"),bi=document.getElementById("sigmaSlider"),Ca=document.getElementById("nCities"),Ia=document.getElementById("pi"),Ta=document.getElementById("tcost"),Sa=document.getElementById("sigma"),No=document.getElementById("start"),jo=document.getElementById("stop"),Xs=document.getElementById("reset"),sf=document.getElementById("counter"),Fa=1,bt=new La(50,1,.4,5,10,Fa),nf=new Ma(of,bt);bt.addUpdateEventListener(()=>{sf.innerText=bt.counter.toLocaleString(),nf.repaint()});No.className="";jo.className="disabled";gi.valueAsNumber=bt.country.pi;mi.valueAsNumber=bt.country.tcost;bi.valueAsNumber=bt.country.sigma;Ca.innerText=uo.value;Ta.innerText=mi.value;Sa.innerText=bi.value;Ia.innerText=gi.value;function rf(){No.className="disabled",jo.className="started",Xs.className="started",bt.start()}function af(){No.className="",jo.className="disabled",Xs.className="",bt.stop()}function Da(){bt.reset()}function lf(){Ca.innerText=uo.value,bt.setNumCities(uo.valueAsNumber,gi.valueAsNumber,mi.valueAsNumber,bi.valueAsNumber,Fa),bt.reset()}function cf(){Ia.innerText=gi.valueAsNumber.toPrecision(2),bt.setPi(gi.valueAsNumber)}function hf(){Ta.innerText=mi.valueAsNumber.toPrecision(2),bt.setTcost(mi.valueAsNumber),bt.calcDistanceMatrix()}function df(){Sa.innerText=bi.valueAsNumber.toPrecision(3),bt.setSigma(bi.valueAsNumber),bt.calcDistanceMatrix()}No.addEventListener("click",rf);jo.addEventListener("click",af);Xs.addEventListener("click",Da);uo.addEventListener("change",lf);gi.addEventListener("change",cf);mi.addEventListener("change",hf);bi.addEventListener("change",df);const uf=document.getElementById("scale");uf.addEventListener("change",i=>{const t=i.target.value,e=parseFloat(t.split(" ")[1]);bt.setScale(e)});Da();
