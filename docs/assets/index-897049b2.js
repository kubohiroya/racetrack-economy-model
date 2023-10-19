(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}})();class Gs{country;timeCounter;timer;barChartScale;timeSpeed;simulationStarted;bindings;matrixFactories;focusedRegionIndex;selectedRegionIndex;focusedRouteIndex;focusedRouteSource;selectedNodes=[];countryEventListeners;timeEventListeners;focusRegionEventListener;selectRegionEventListener;focusedRouteEventListener;transportCostUpdateEventListener;timerCounterUpdater;constructor(t,e,s,r){this.country=e,this.matrixFactories=t,this.barChartScale=s,this.timeSpeed=r,this.timeCounter=0,this.timer=null,this.simulationStarted=!1,this.bindings=new Map,this.focusedRegionIndex=-1,this.selectedRegionIndex=-1,this.focusedRouteIndex=null,this.focusedRouteSource=null,this.focusRegionEventListener=[],this.selectRegionEventListener=[],this.focusedRouteEventListener=[],this.countryEventListeners=new Array,this.timeEventListeners=new Array}reset(){this.timeCounter=0,this.selectedRegionIndex=-1,this.country.reset(),this.updateTime()}stop(){this.simulationStarted=!1,this.timer!=null&&clearInterval(this.timer),this.timer=null}start(){const t=e=>{const s=Math.log(10),r=Math.log(3e3),n=s+(1-e)*(r-s);return Math.exp(n)};if(!this.simulationStarted){this.simulationStarted=!0;const e=t(this.timeSpeed);this.timer=setInterval(()=>{this.country.procedure(),this.timeCounter++,this.updateTime()},e)}}setScale(t){this.barChartScale=t,this.updateTime()}setSpeed(t){this.timeSpeed=t}setNumRegions(t){this.country.updateRegions(t)}setPi(t){this.country.setPi(t)}setTransportCost(t){this.country.setTransportCost(t),(async()=>(this.country.matrices.transportCostMatrix=await this.matrixFactories.createTransportCostMatrix(),this.transportCostUpdateEventListener&&this.transportCostUpdateEventListener(this)))()}setSigma(t){this.country.setSigma(t)}setFocusedRegionIndex(t){this.focusedRegionIndex=t}setFocusedRouteIndex(t,e){this.focusedRouteIndex=t,this.focusedRouteSource=e}isFocusedRouteIndex(t,e){return this.focusedRouteIndex===null?!1:Math.min(this.focusedRouteIndex[0],this.focusedRouteIndex[1])===Math.min(t,e)&&Math.max(this.focusedRouteIndex[0],this.focusedRouteIndex[1])===Math.max(t,e)}addNotifyFocusRegionEventListener(t){this.focusRegionEventListener.push(t)}notifyFocusRegion(){this.focusRegionEventListener.forEach(t=>{t()})}addSelectRegionEventListener(t){this.selectRegionEventListener.push(t)}notifySelectRegion(){this.selectRegionEventListener.forEach(t=>{t()})}addFocusRouteEventListener(t){this.focusedRouteEventListener.push(t)}notifyFocusRoute(){this.focusedRouteEventListener.forEach(t=>{t()})}addTimeEventListener(t){this.timeEventListeners.push(t)}setTransportCostEventListener(t){this.transportCostUpdateEventListener=t}addCountryEventListener(t){this.countryEventListeners.push(t)}notifyUpdateCountry(){this.countryEventListeners.forEach(t=>{t(this)})}updateTime(){this.timerCounterUpdater&&this.timerCounterUpdater(),this.timeEventListeners.forEach(t=>{t(this)})}setTimerCounterUpdater(t){this.timerCounterUpdater=t}}const Tt=function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}}();Tt.trustedTypes===void 0&&(Tt.trustedTypes={createPolicy:(i,t)=>t});const qs={configurable:!1,enumerable:!1,writable:!1};Tt.FAST===void 0&&Reflect.defineProperty(Tt,"FAST",Object.assign({value:Object.create(null)},qs));const fe=Tt.FAST;if(fe.getById===void 0){const i=Object.create(null);Reflect.defineProperty(fe,"getById",Object.assign({value(t,e){let s=i[t];return s===void 0&&(s=e?i[t]=e():null),s}},qs))}const le=Object.freeze([]);function Ys(){const i=new WeakMap;return function(t){let e=i.get(t);if(e===void 0){let s=Reflect.getPrototypeOf(t);for(;e===void 0&&s!==null;)e=i.get(s),s=Reflect.getPrototypeOf(s);e=e===void 0?[]:e.slice(0),i.set(t,e)}return e}}const ni=Tt.FAST.getById(1,()=>{const i=[],t=[];function e(){if(t.length)throw t.shift()}function s(o){try{o.call()}catch(a){t.push(a),setTimeout(e,0)}}function r(){let a=0;for(;a<i.length;)if(s(i[a]),a++,a>1024){for(let l=0,c=i.length-a;l<c;l++)i[l]=i[l+a];i.length-=a,a=0}i.length=0}function n(o){i.length<1&&Tt.requestAnimationFrame(r),i.push(o)}return Object.freeze({enqueue:n,process:r})}),Xs=Tt.trustedTypes.createPolicy("fast-html",{createHTML:i=>i});let oi=Xs;const ce=`fast-${Math.random().toString(36).substring(2,8)}`,Qs=`${ce}{`,Oi=`}${ce}`,C=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(i){if(oi!==Xs)throw new Error("The HTML policy can only be set once.");oi=i},createHTML(i){return oi.createHTML(i)},isMarker(i){return i&&i.nodeType===8&&i.data.startsWith(ce)},extractDirectiveIndexFromMarker(i){return parseInt(i.data.replace(`${ce}:`,""))},createInterpolationPlaceholder(i){return`${Qs}${i}${Oi}`},createCustomAttributePlaceholder(i,t){return`${i}="${this.createInterpolationPlaceholder(t)}"`},createBlockPlaceholder(i){return`<!--${ce}:${i}-->`},queueUpdate:ni.enqueue,processUpdates:ni.process,nextUpdate(){return new Promise(ni.enqueue)},setAttribute(i,t,e){e==null?i.removeAttribute(t):i.setAttribute(t,e)},setBooleanAttribute(i,t,e){e?i.setAttribute(t,""):i.removeAttribute(t)},removeChildNodes(i){for(let t=i.firstChild;t!==null;t=i.firstChild)i.removeChild(t)},createTemplateWalker(i){return document.createTreeWalker(i,133,null,!1)}});class Si{constructor(t,e){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=e}has(t){return this.spillover===void 0?this.sub1===t||this.sub2===t:this.spillover.indexOf(t)!==-1}subscribe(t){const e=this.spillover;if(e===void 0){if(this.has(t))return;if(this.sub1===void 0){this.sub1=t;return}if(this.sub2===void 0){this.sub2=t;return}this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else e.indexOf(t)===-1&&e.push(t)}unsubscribe(t){const e=this.spillover;if(e===void 0)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const s=e.indexOf(t);s!==-1&&e.splice(s,1)}}notify(t){const e=this.spillover,s=this.source;if(e===void 0){const r=this.sub1,n=this.sub2;r!==void 0&&r.handleChange(s,t),n!==void 0&&n.handleChange(s,t)}else for(let r=0,n=e.length;r<n;++r)e[r].handleChange(s,t)}}class Zs{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var e;const s=this.subscribers[t];s!==void 0&&s.notify(t),(e=this.sourceSubscribers)===null||e===void 0||e.notify(t)}subscribe(t,e){var s;if(e){let r=this.subscribers[e];r===void 0&&(this.subscribers[e]=r=new Si(this.source)),r.subscribe(t)}else this.sourceSubscribers=(s=this.sourceSubscribers)!==null&&s!==void 0?s:new Si(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,e){var s;if(e){const r=this.subscribers[e];r!==void 0&&r.unsubscribe(t)}else(s=this.sourceSubscribers)===null||s===void 0||s.unsubscribe(t)}}const M=fe.getById(2,()=>{const i=/(:|&&|\|\||if)/,t=new WeakMap,e=C.queueUpdate;let s,r=c=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function n(c){let u=c.$fastController||t.get(c);return u===void 0&&(Array.isArray(c)?u=r(c):t.set(c,u=new Zs(c))),u}const o=Ys();class a{constructor(u){this.name=u,this.field=`_${u}`,this.callback=`${u}Changed`}getValue(u){return s!==void 0&&s.watch(u,this.name),u[this.field]}setValue(u,h){const d=this.field,b=u[d];if(b!==h){u[d]=h;const p=u[this.callback];typeof p=="function"&&p.call(u,b,h),n(u).notify(this.name)}}}class l extends Si{constructor(u,h,d=!1){super(u,h),this.binding=u,this.isVolatileBinding=d,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(u,h){this.needsRefresh&&this.last!==null&&this.disconnect();const d=s;s=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const b=this.binding(u,h);return s=d,b}disconnect(){if(this.last!==null){let u=this.first;for(;u!==void 0;)u.notifier.unsubscribe(this,u.propertyName),u=u.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(u,h){const d=this.last,b=n(u),p=d===null?this.first:{};if(p.propertySource=u,p.propertyName=h,p.notifier=b,b.subscribe(this,h),d!==null){if(!this.needsRefresh){let v;s=void 0,v=d.propertySource[d.propertyName],s=this,u===v&&(this.needsRefresh=!0)}d.next=p}this.last=p}handleChange(){this.needsQueue&&(this.needsQueue=!1,e(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let u=this.first;return{next:()=>{const h=u;return h===void 0?{value:void 0,done:!0}:(u=u.next,{value:h,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(c){r=c},getNotifier:n,track(c,u){s!==void 0&&s.watch(c,u)},trackVolatile(){s!==void 0&&(s.needsRefresh=!0)},notify(c,u){n(c).notify(u)},defineProperty(c,u){typeof u=="string"&&(u=new a(u)),o(c).push(u),Reflect.defineProperty(c,u.name,{enumerable:!0,get:function(){return u.getValue(this)},set:function(h){u.setValue(this,h)}})},getAccessors:o,binding(c,u,h=this.isVolatileBinding(c)){return new l(c,u,h)},isVolatileBinding(c){return i.test(c.toString())}})});function $(i,t){M.defineProperty(i,t)}const hs=fe.getById(3,()=>{let i=null;return{get(){return i},set(t){i=t}}});class ge{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return hs.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){hs.set(t)}}M.defineProperty(ge.prototype,"index");M.defineProperty(ge.prototype,"length");const he=Object.seal(new ge);class ji{constructor(){this.targetIndex=0}}class Js extends ji{constructor(){super(...arguments),this.createPlaceholder=C.createInterpolationPlaceholder}}class Ks extends ji{constructor(t,e,s){super(),this.name=t,this.behavior=e,this.options=s}createPlaceholder(t){return C.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function Gr(i,t){this.source=i,this.context=t,this.bindingObserver===null&&(this.bindingObserver=M.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(i,t))}function qr(i,t){this.source=i,this.context=t,this.target.addEventListener(this.targetName,this)}function Yr(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function Xr(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const i=this.target.$fastView;i!==void 0&&i.isComposed&&(i.unbind(),i.needsBindOnly=!0)}function Qr(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function Zr(i){C.setAttribute(this.target,this.targetName,i)}function Jr(i){C.setBooleanAttribute(this.target,this.targetName,i)}function Kr(i){if(i==null&&(i=""),i.create){this.target.textContent="";let t=this.target.$fastView;t===void 0?t=i.create():this.target.$fastTemplate!==i&&(t.isComposed&&(t.remove(),t.unbind()),t=i.create()),t.isComposed?t.needsBindOnly&&(t.needsBindOnly=!1,t.bind(this.source,this.context)):(t.isComposed=!0,t.bind(this.source,this.context),t.insertBefore(this.target),this.target.$fastView=t,this.target.$fastTemplate=i)}else{const t=this.target.$fastView;t!==void 0&&t.isComposed&&(t.isComposed=!1,t.remove(),t.needsBindOnly?t.needsBindOnly=!1:t.unbind()),this.target.textContent=i}}function tn(i){this.target[this.targetName]=i}function en(i){const t=this.classVersions||Object.create(null),e=this.target;let s=this.version||0;if(i!=null&&i.length){const r=i.split(/\s+/);for(let n=0,o=r.length;n<o;++n){const a=r[n];a!==""&&(t[a]=s,e.classList.add(a))}}if(this.classVersions=t,this.version=s+1,s!==0){s-=1;for(const r in t)t[r]===s&&e.classList.remove(r)}}class zi extends Js{constructor(t){super(),this.binding=t,this.bind=Gr,this.unbind=Yr,this.updateTarget=Zr,this.isBindingVolatile=M.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,t!==void 0)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=tn,this.cleanedTargetName==="innerHTML"){const e=this.binding;this.binding=(s,r)=>C.createHTML(e(s,r))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=Jr;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=qr,this.unbind=Qr;break;default:this.cleanedTargetName=t,t==="class"&&(this.updateTarget=en);break}}targetAtContent(){this.updateTarget=Kr,this.unbind=Xr}createBehavior(t){return new sn(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class sn{constructor(t,e,s,r,n,o,a){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=e,this.isBindingVolatile=s,this.bind=r,this.unbind=n,this.updateTarget=o,this.targetName=a}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){ge.setEvent(t);const e=this.binding(this.source,this.context);ge.setEvent(null),e!==!0&&t.preventDefault()}}let ai=null;class Wi{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){ai=this}static borrow(t){const e=ai||new Wi;return e.directives=t,e.reset(),ai=null,e}}function rn(i){if(i.length===1)return i[0];let t;const e=i.length,s=i.map(o=>typeof o=="string"?()=>o:(t=o.targetName||t,o.binding)),r=(o,a)=>{let l="";for(let c=0;c<e;++c)l+=s[c](o,a);return l},n=new zi(r);return n.targetName=t,n}const nn=Oi.length;function tr(i,t){const e=t.split(Qs);if(e.length===1)return null;const s=[];for(let r=0,n=e.length;r<n;++r){const o=e[r],a=o.indexOf(Oi);let l;if(a===-1)l=o;else{const c=parseInt(o.substring(0,a));s.push(i.directives[c]),l=o.substring(a+nn)}l!==""&&s.push(l)}return s}function us(i,t,e=!1){const s=t.attributes;for(let r=0,n=s.length;r<n;++r){const o=s[r],a=o.value,l=tr(i,a);let c=null;l===null?e&&(c=new zi(()=>a),c.targetName=o.name):c=rn(l),c!==null&&(t.removeAttributeNode(o),r--,n--,i.addFactory(c))}}function on(i,t,e){const s=tr(i,t.textContent);if(s!==null){let r=t;for(let n=0,o=s.length;n<o;++n){const a=s[n],l=n===0?t:r.parentNode.insertBefore(document.createTextNode(""),r.nextSibling);typeof a=="string"?l.textContent=a:(l.textContent=" ",i.captureContentBinding(a)),r=l,i.targetIndex++,l!==t&&e.nextNode()}i.targetIndex--}}function an(i,t){const e=i.content;document.adoptNode(e);const s=Wi.borrow(t);us(s,i,!0);const r=s.behaviorFactories;s.reset();const n=C.createTemplateWalker(e);let o;for(;o=n.nextNode();)switch(s.targetIndex++,o.nodeType){case 1:us(s,o);break;case 3:on(s,o,n);break;case 8:C.isMarker(o)&&s.addFactory(t[C.extractDirectiveIndexFromMarker(o)])}let a=0;(C.isMarker(e.firstChild)||e.childNodes.length===1&&t.length)&&(e.insertBefore(document.createComment(""),e.firstChild),a=-1);const l=s.behaviorFactories;return s.release(),{fragment:e,viewBehaviorFactories:l,hostBehaviorFactories:r,targetOffset:a}}const li=document.createRange();class ln{constructor(t,e){this.fragment=t,this.behaviors=e,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const e=this.lastChild;if(t.previousSibling===e)return;const s=t.parentNode;let r=this.firstChild,n;for(;r!==e;)n=r.nextSibling,s.insertBefore(r,t),r=n;s.insertBefore(e,t)}}remove(){const t=this.fragment,e=this.lastChild;let s=this.firstChild,r;for(;s!==e;)r=s.nextSibling,t.appendChild(s),s=r;t.appendChild(e)}dispose(){const t=this.firstChild.parentNode,e=this.lastChild;let s=this.firstChild,r;for(;s!==e;)r=s.nextSibling,t.removeChild(s),s=r;t.removeChild(e);const n=this.behaviors,o=this.source;for(let a=0,l=n.length;a<l;++a)n[a].unbind(o)}bind(t,e){const s=this.behaviors;if(this.source!==t)if(this.source!==null){const r=this.source;this.source=t,this.context=e;for(let n=0,o=s.length;n<o;++n){const a=s[n];a.unbind(r),a.bind(t,e)}}else{this.source=t,this.context=e;for(let r=0,n=s.length;r<n;++r)s[r].bind(t,e)}}unbind(){if(this.source===null)return;const t=this.behaviors,e=this.source;for(let s=0,r=t.length;s<r;++s)t[s].unbind(e);this.source=null}static disposeContiguousBatch(t){if(t.length!==0){li.setStartBefore(t[0].firstChild),li.setEndAfter(t[t.length-1].lastChild),li.deleteContents();for(let e=0,s=t.length;e<s;++e){const r=t[e],n=r.behaviors,o=r.source;for(let a=0,l=n.length;a<l;++a)n[a].unbind(o)}}}}class ds{constructor(t,e){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=e}create(t){if(this.fragment===null){let c;const u=this.html;if(typeof u=="string"){c=document.createElement("template"),c.innerHTML=C.createHTML(u);const d=c.content.firstElementChild;d!==null&&d.tagName==="TEMPLATE"&&(c=d)}else c=u;const h=an(c,this.directives);this.fragment=h.fragment,this.viewBehaviorFactories=h.viewBehaviorFactories,this.hostBehaviorFactories=h.hostBehaviorFactories,this.targetOffset=h.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const e=this.fragment.cloneNode(!0),s=this.viewBehaviorFactories,r=new Array(this.behaviorCount),n=C.createTemplateWalker(e);let o=0,a=this.targetOffset,l=n.nextNode();for(let c=s.length;o<c;++o){const u=s[o],h=u.targetIndex;for(;l!==null;)if(a===h){r[o]=u.createBehavior(l);break}else l=n.nextNode(),a++}if(this.hasHostBehaviors){const c=this.hostBehaviorFactories;for(let u=0,h=c.length;u<h;++u,++o)r[o]=c[u].createBehavior(t)}return new ln(e,r)}render(t,e,s){typeof e=="string"&&(e=document.getElementById(e)),s===void 0&&(s=e);const r=this.create(s);return r.bind(t,he),r.appendTo(e),r}}const cn=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function lt(i,...t){const e=[];let s="";for(let r=0,n=i.length-1;r<n;++r){const o=i[r];let a=t[r];if(s+=o,a instanceof ds){const l=a;a=()=>l}if(typeof a=="function"&&(a=new zi(a)),a instanceof Js){const l=cn.exec(o);l!==null&&(a.targetName=l[2])}a instanceof ji?(s+=a.createPlaceholder(e.length),e.push(a)):s+=a}return s+=i[i.length-1],new ds(s,e)}class X{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=this.behaviors===null?t:this.behaviors.concat(t),this}}X.create=(()=>{if(C.supportsAdoptedStyleSheets){const i=new Map;return t=>new hn(t,i)}return i=>new fn(i)})();function Hi(i){return i.map(t=>t instanceof X?Hi(t.styles):[t]).reduce((t,e)=>t.concat(e),[])}function er(i){return i.map(t=>t instanceof X?t.behaviors:null).reduce((t,e)=>e===null?t:(t===null&&(t=[]),t.concat(e)),null)}let ir=(i,t)=>{i.adoptedStyleSheets=[...i.adoptedStyleSheets,...t]},sr=(i,t)=>{i.adoptedStyleSheets=i.adoptedStyleSheets.filter(e=>t.indexOf(e)===-1)};if(C.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),ir=(i,t)=>{i.adoptedStyleSheets.push(...t)},sr=(i,t)=>{for(const e of t){const s=i.adoptedStyleSheets.indexOf(e);s!==-1&&i.adoptedStyleSheets.splice(s,1)}}}catch{}class hn extends X{constructor(t,e){super(),this.styles=t,this.styleSheetCache=e,this._styleSheets=void 0,this.behaviors=er(t)}get styleSheets(){if(this._styleSheets===void 0){const t=this.styles,e=this.styleSheetCache;this._styleSheets=Hi(t).map(s=>{if(s instanceof CSSStyleSheet)return s;let r=e.get(s);return r===void 0&&(r=new CSSStyleSheet,r.replaceSync(s),e.set(s,r)),r})}return this._styleSheets}addStylesTo(t){ir(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){sr(t,this.styleSheets),super.removeStylesFrom(t)}}let un=0;function dn(){return`fast-style-class-${++un}`}class fn extends X{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=er(t),this.styleSheets=Hi(t),this.styleClass=dn()}addStylesTo(t){const e=this.styleSheets,s=this.styleClass;t=this.normalizeTarget(t);for(let r=0;r<e.length;r++){const n=document.createElement("style");n.innerHTML=e[r],n.className=s,t.append(n)}super.addStylesTo(t)}removeStylesFrom(t){t=this.normalizeTarget(t);const e=t.querySelectorAll(`.${this.styleClass}`);for(let s=0,r=e.length;s<r;++s)t.removeChild(e[s]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const Me=Object.freeze({locate:Ys()}),rr={toView(i){return i?"true":"false"},fromView(i){return!(i==null||i==="false"||i===!1||i===0)}},Ui={toView(i){if(i==null)return null;const t=i*1;return isNaN(t)?null:t.toString()},fromView(i){if(i==null)return null;const t=i*1;return isNaN(t)?null:t}};class Ie{constructor(t,e,s=e.toLowerCase(),r="reflect",n){this.guards=new Set,this.Owner=t,this.name=e,this.attribute=s,this.mode=r,this.converter=n,this.fieldName=`_${e}`,this.callbackName=`${e}Changed`,this.hasCallback=this.callbackName in t.prototype,r==="boolean"&&n===void 0&&(this.converter=rr)}setValue(t,e){const s=t[this.fieldName],r=this.converter;r!==void 0&&(e=r.fromView(e)),s!==e&&(t[this.fieldName]=e,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](s,e),t.$fastController.notify(this.name))}getValue(t){return M.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,e){this.guards.has(t)||(this.guards.add(t),this.setValue(t,e),this.guards.delete(t))}tryReflectToAttribute(t){const e=this.mode,s=this.guards;s.has(t)||e==="fromView"||C.queueUpdate(()=>{s.add(t);const r=t[this.fieldName];switch(e){case"reflect":const n=this.converter;C.setAttribute(t,this.attribute,n!==void 0?n.toView(r):r);break;case"boolean":C.setBooleanAttribute(t,this.attribute,r);break}s.delete(t)})}static collect(t,...e){const s=[];e.push(Me.locate(t));for(let r=0,n=e.length;r<n;++r){const o=e[r];if(o!==void 0)for(let a=0,l=o.length;a<l;++a){const c=o[a];typeof c=="string"?s.push(new Ie(t,c)):s.push(new Ie(t,c.property,c.attribute,c.mode,c.converter))}}return s}}function y(i,t){let e;function s(r,n){arguments.length>1&&(e.property=n),Me.locate(r.constructor).push(e)}if(arguments.length>1){e={},s(i,t);return}return e=i===void 0?{}:i,s}const fs={mode:"open"},gs={},ki=fe.getById(4,()=>{const i=new Map;return Object.freeze({register(t){return i.has(t.type)?!1:(i.set(t.type,t),!0)},getByType(t){return i.get(t)}})});class je{constructor(t,e=t.definition){typeof e=="string"&&(e={name:e}),this.type=t,this.name=e.name,this.template=e.template;const s=Ie.collect(t,e.attributes),r=new Array(s.length),n={},o={};for(let a=0,l=s.length;a<l;++a){const c=s[a];r[a]=c.attribute,n[c.name]=c,o[c.attribute]=c}this.attributes=s,this.observedAttributes=r,this.propertyLookup=n,this.attributeLookup=o,this.shadowOptions=e.shadowOptions===void 0?fs:e.shadowOptions===null?void 0:Object.assign(Object.assign({},fs),e.shadowOptions),this.elementOptions=e.elementOptions===void 0?gs:Object.assign(Object.assign({},gs),e.elementOptions),this.styles=e.styles===void 0?void 0:Array.isArray(e.styles)?X.create(e.styles):e.styles instanceof X?e.styles:X.create([e.styles])}get isDefined(){return!!ki.getByType(this.type)}define(t=customElements){const e=this.type;if(ki.register(this)){const s=this.attributes,r=e.prototype;for(let n=0,o=s.length;n<o;++n)M.defineProperty(r,s[n]);Reflect.defineProperty(e,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,e,this.elementOptions),this}}je.forType=ki.getByType;const nr=new WeakMap,gn={bubbles:!0,composed:!0,cancelable:!0};function ci(i){return i.shadowRoot||nr.get(i)||null}class _i extends Zs{constructor(t,e){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=e;const s=e.shadowOptions;if(s!==void 0){const n=t.attachShadow(s);s.mode==="closed"&&nr.set(t,n)}const r=M.getAccessors(t);if(r.length>0){const n=this.boundObservables=Object.create(null);for(let o=0,a=r.length;o<a;++o){const l=r[o].name,c=t[l];c!==void 0&&(delete t[l],n[l]=c)}}}get isConnected(){return M.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,M.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=t,!this.needsInitialization&&t!==null&&this.addStyles(t))}addStyles(t){const e=ci(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.append(t);else if(!t.isAttachedTo(e)){const s=t.behaviors;t.addStylesTo(e),s!==null&&this.addBehaviors(s)}}removeStyles(t){const e=ci(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.removeChild(t);else if(t.isAttachedTo(e)){const s=t.behaviors;t.removeStylesFrom(e),s!==null&&this.removeBehaviors(s)}}addBehaviors(t){const e=this.behaviors||(this.behaviors=new Map),s=t.length,r=[];for(let n=0;n<s;++n){const o=t[n];e.has(o)?e.set(o,e.get(o)+1):(e.set(o,1),r.push(o))}if(this._isConnected){const n=this.element;for(let o=0;o<r.length;++o)r[o].bind(n,he)}}removeBehaviors(t,e=!1){const s=this.behaviors;if(s===null)return;const r=t.length,n=[];for(let o=0;o<r;++o){const a=t[o];if(s.has(a)){const l=s.get(a)-1;l===0||e?s.delete(a)&&n.push(a):s.set(a,l)}}if(this._isConnected){const o=this.element;for(let a=0;a<n.length;++a)n[a].unbind(o)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(t,he);const e=this.behaviors;if(e!==null)for(const[s]of e)s.bind(t,he);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;t!==null&&t.unbind();const e=this.behaviors;if(e!==null){const s=this.element;for(const[r]of e)r.unbind(s)}}onAttributeChangedCallback(t,e,s){const r=this.definition.attributeLookup[t];r!==void 0&&r.onAttributeChangedCallback(this.element,s)}emit(t,e,s){return this._isConnected?this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:e},gn),s))):!1}finishInitialization(){const t=this.element,e=this.boundObservables;if(e!==null){const r=Object.keys(e);for(let n=0,o=r.length;n<o;++n){const a=r[n];t[a]=e[a]}this.boundObservables=null}const s=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():s.template&&(this._template=s.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():s.styles&&(this._styles=s.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const e=this.element,s=ci(e)||e;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||C.removeChildNodes(s),t&&(this.view=t.render(e,s,e))}static forCustomElement(t){const e=t.$fastController;if(e!==void 0)return e;const s=je.forType(t.constructor);if(s===void 0)throw new Error("Missing FASTElement definition.");return t.$fastController=new _i(t,s)}}function ps(i){return class extends i{constructor(){super(),_i.forCustomElement(this)}$emit(t,e,s){return this.$fastController.emit(t,e,s)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,e,s){this.$fastController.onAttributeChangedCallback(t,e,s)}}}const ze=Object.assign(ps(HTMLElement),{from(i){return ps(i)},define(i,t){return new je(i,t).define().type}});class Gi{createCSS(){return""}createBehavior(){}}function or(i,t){const e=[];let s="";const r=[];for(let n=0,o=i.length-1;n<o;++n){s+=i[n];let a=t[n];if(a instanceof Gi){const l=a.createBehavior();a=a.createCSS(),l&&r.push(l)}a instanceof X||a instanceof CSSStyleSheet?(s.trim()!==""&&(e.push(s),s=""),e.push(a)):s+=a}return s+=i[i.length-1],s.trim()!==""&&e.push(s),{styles:e,behaviors:r}}function S(i,...t){const{styles:e,behaviors:s}=or(i,t),r=X.create(e);return s.length&&r.withBehaviors(...s),r}class pn extends Gi{constructor(t,e){super(),this.behaviors=e,this.css="";const s=t.reduce((r,n)=>(typeof n=="string"?this.css+=n:r.push(n),r),[]);s.length&&(this.styles=X.create(s))}createBehavior(){return this}createCSS(){return this.css}bind(t){this.styles&&t.$fastController.addStyles(this.styles),this.behaviors.length&&t.$fastController.addBehaviors(this.behaviors)}unbind(t){this.styles&&t.$fastController.removeStyles(this.styles),this.behaviors.length&&t.$fastController.removeBehaviors(this.behaviors)}}function mn(i,...t){const{styles:e,behaviors:s}=or(i,t);return new pn(e,s)}class bn{constructor(t,e){this.target=t,this.propertyName=e}bind(t){t[this.propertyName]=this.target}unbind(){}}function st(i){return new Ks("fast-ref",bn,i)}const ar=i=>typeof i=="function",vn=()=>null;function ms(i){return i===void 0?vn:ar(i)?i:()=>i}function lr(i,t,e){const s=ar(i)?i:()=>i,r=ms(t),n=ms(e);return(o,a)=>s(o,a)?r(o,a):n(o,a)}function yn(i){return i?function(t,e,s){return t.nodeType===1&&t.matches(i)}:function(t,e,s){return t.nodeType===1}}class wn{constructor(t,e){this.target=t,this.options=e,this.source=null}bind(t){const e=this.options.property;this.shouldUpdate=M.getAccessors(t).some(s=>s.name===e),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(le),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return this.options.filter!==void 0&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class xn extends wn{constructor(t,e){super(t,e)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function qi(i){return typeof i=="string"&&(i={property:i}),new Ks("fast-slotted",xn,i)}class Sn{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const kn=(i,t)=>lt`
    <span
        part="end"
        ${st("endContainer")}
        class=${e=>t.end?"end":void 0}
    >
        <slot name="end" ${st("end")} @slotchange="${e=>e.handleEndContentChange()}">
            ${t.end||""}
        </slot>
    </span>
`,Cn=(i,t)=>lt`
    <span
        part="start"
        ${st("startContainer")}
        class="${e=>t.start?"start":void 0}"
    >
        <slot
            name="start"
            ${st("start")}
            @slotchange="${e=>e.handleStartContentChange()}"
        >
            ${t.start||""}
        </slot>
    </span>
`;lt`
    <span part="end" ${st("endContainer")}>
        <slot
            name="end"
            ${st("end")}
            @slotchange="${i=>i.handleEndContentChange()}"
        ></slot>
    </span>
`;lt`
    <span part="start" ${st("startContainer")}>
        <slot
            name="start"
            ${st("start")}
            @slotchange="${i=>i.handleStartContentChange()}"
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
***************************************************************************** */function m(i,t,e,s){var r=arguments.length,n=r<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,e):s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(i,t,e,s);else for(var a=i.length-1;a>=0;a--)(o=i[a])&&(n=(r<3?o(n):r>3?o(t,e,n):o(t,e))||n);return r>3&&n&&Object.defineProperty(t,e,n),n}const hi=new Map;"metadata"in Reflect||(Reflect.metadata=function(i,t){return function(e){Reflect.defineMetadata(i,t,e)}},Reflect.defineMetadata=function(i,t,e){let s=hi.get(e);s===void 0&&hi.set(e,s=new Map),s.set(i,t)},Reflect.getOwnMetadata=function(i,t){const e=hi.get(t);if(e!==void 0)return e.get(i)});class Tn{constructor(t,e){this.container=t,this.key=e}instance(t){return this.registerResolver(0,t)}singleton(t){return this.registerResolver(1,t)}transient(t){return this.registerResolver(2,t)}callback(t){return this.registerResolver(3,t)}cachedCallback(t){return this.registerResolver(3,hr(t))}aliasTo(t){return this.registerResolver(5,t)}registerResolver(t,e){const{container:s,key:r}=this;return this.container=this.key=void 0,s.registerResolver(r,new nt(r,t,e))}}function Jt(i){const t=i.slice(),e=Object.keys(i),s=e.length;let r;for(let n=0;n<s;++n)r=e[n],ur(r)||(t[r]=i[r]);return t}const $n=Object.freeze({none(i){throw Error(`${i.toString()} not registered, did you forget to add @singleton()?`)},singleton(i){return new nt(i,1,i)},transient(i){return new nt(i,2,i)}}),ui=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:$n.singleton})}),bs=new Map;function vs(i){return t=>Reflect.getOwnMetadata(i,t)}let ys=null;const E=Object.freeze({createContainer(i){return new ue(null,Object.assign({},ui.default,i))},findResponsibleContainer(i){const t=i.$$container$$;return t&&t.responsibleForOwnerRequests?t:E.findParentContainer(i)},findParentContainer(i){const t=new CustomEvent(cr,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return i.dispatchEvent(t),t.detail.container||E.getOrCreateDOMContainer()},getOrCreateDOMContainer(i,t){return i?i.$$container$$||new ue(i,Object.assign({},ui.default,t,{parentLocator:E.findParentContainer})):ys||(ys=new ue(null,Object.assign({},ui.default,t,{parentLocator:()=>null})))},getDesignParamtypes:vs("design:paramtypes"),getAnnotationParamtypes:vs("di:paramtypes"),getOrCreateAnnotationParamTypes(i){let t=this.getAnnotationParamtypes(i);return t===void 0&&Reflect.defineMetadata("di:paramtypes",t=[],i),t},getDependencies(i){let t=bs.get(i);if(t===void 0){const e=i.inject;if(e===void 0){const s=E.getDesignParamtypes(i),r=E.getAnnotationParamtypes(i);if(s===void 0)if(r===void 0){const n=Object.getPrototypeOf(i);typeof n=="function"&&n!==Function.prototype?t=Jt(E.getDependencies(n)):t=[]}else t=Jt(r);else if(r===void 0)t=Jt(s);else{t=Jt(s);let n=r.length,o;for(let c=0;c<n;++c)o=r[c],o!==void 0&&(t[c]=o);const a=Object.keys(r);n=a.length;let l;for(let c=0;c<n;++c)l=a[c],ur(l)||(t[l]=r[l])}}else t=Jt(e);bs.set(i,t)}return t},defineProperty(i,t,e,s=!1){const r=`$di_${t}`;Reflect.defineProperty(i,t,{get:function(){let n=this[r];if(n===void 0&&(n=(this instanceof HTMLElement?E.findResponsibleContainer(this):E.getOrCreateDOMContainer()).get(e),this[r]=n,s&&this instanceof ze)){const a=this.$fastController,l=()=>{const u=E.findResponsibleContainer(this).get(e),h=this[r];u!==h&&(this[r]=n,a.notify(t))};a.subscribe({handleChange:l},"isConnected")}return n}})},createInterface(i,t){const e=typeof i=="function"?i:t,s=typeof i=="string"?i:i&&"friendlyName"in i&&i.friendlyName||ks,r=typeof i=="string"?!1:i&&"respectConnection"in i&&i.respectConnection||!1,n=function(o,a,l){if(o==null||new.target!==void 0)throw new Error(`No registration for interface: '${n.friendlyName}'`);if(a)E.defineProperty(o,a,n,r);else{const c=E.getOrCreateAnnotationParamTypes(o);c[l]=n}};return n.$isInterface=!0,n.friendlyName=s??"(anonymous)",e!=null&&(n.register=function(o,a){return e(new Tn(o,a??n))}),n.toString=function(){return`InterfaceSymbol<${n.friendlyName}>`},n},inject(...i){return function(t,e,s){if(typeof s=="number"){const r=E.getOrCreateAnnotationParamTypes(t),n=i[0];n!==void 0&&(r[s]=n)}else if(e)E.defineProperty(t,e,i[0]);else{const r=s?E.getOrCreateAnnotationParamTypes(s.value):E.getOrCreateAnnotationParamTypes(t);let n;for(let o=0;o<i.length;++o)n=i[o],n!==void 0&&(r[o]=n)}}},transient(i){return i.register=function(e){return pe.transient(i,i).register(e)},i.registerInRequestor=!1,i},singleton(i,t=En){return i.register=function(s){return pe.singleton(i,i).register(s)},i.registerInRequestor=t.scoped,i}}),Rn=E.createInterface("Container");E.inject;const En={scoped:!1};class nt{constructor(t,e,s){this.key=t,this.strategy=e,this.state=s,this.resolving=!1}get $isResolver(){return!0}register(t){return t.registerResolver(this.key,this)}resolve(t,e){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=t.getFactory(this.state).construct(e),this.strategy=0,this.resolving=!1,this.state}case 2:{const s=t.getFactory(this.state);if(s===null)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return s.construct(e)}case 3:return this.state(t,e,this);case 4:return this.state[0].resolve(t,e);case 5:return e.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(t){var e,s,r;switch(this.strategy){case 1:case 2:return t.getFactory(this.state);case 5:return(r=(s=(e=t.getResolver(this.state))===null||e===void 0?void 0:e.getFactory)===null||s===void 0?void 0:s.call(e,t))!==null&&r!==void 0?r:null;default:return null}}}function ws(i){return this.get(i)}function Fn(i,t){return t(i)}class Mn{constructor(t,e){this.Type=t,this.dependencies=e,this.transformers=null}construct(t,e){let s;return e===void 0?s=new this.Type(...this.dependencies.map(ws,t)):s=new this.Type(...this.dependencies.map(ws,t),...e),this.transformers==null?s:this.transformers.reduce(Fn,s)}registerTransformer(t){(this.transformers||(this.transformers=[])).push(t)}}const In={$isResolver:!0,resolve(i,t){return t}};function Ee(i){return typeof i.register=="function"}function Vn(i){return Ee(i)&&typeof i.registerInRequestor=="boolean"}function xs(i){return Vn(i)&&i.registerInRequestor}function Ln(i){return i.prototype!==void 0}const Dn=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),cr="__DI_LOCATE_PARENT__",di=new Map;class ue{constructor(t,e){this.owner=t,this.config=e,this._parent=void 0,this.registerDepth=0,this.context=null,t!==null&&(t.$$container$$=this),this.resolvers=new Map,this.resolvers.set(Rn,In),t instanceof Node&&t.addEventListener(cr,s=>{s.composedPath()[0]!==this.owner&&(s.detail.container=this,s.stopImmediatePropagation())})}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(t,...e){return this.context=t,this.register(...e),this.context=null,this}register(...t){if(++this.registerDepth===100)throw new Error("Unable to autoregister dependency");let e,s,r,n,o;const a=this.context;for(let l=0,c=t.length;l<c;++l)if(e=t[l],!!Cs(e))if(Ee(e))e.register(this,a);else if(Ln(e))pe.singleton(e,e).register(this);else for(s=Object.keys(e),n=0,o=s.length;n<o;++n)r=e[s[n]],Cs(r)&&(Ee(r)?r.register(this,a):this.register(r));return--this.registerDepth,this}registerResolver(t,e){Se(t);const s=this.resolvers,r=s.get(t);return r==null?s.set(t,e):r instanceof nt&&r.strategy===4?r.state.push(e):s.set(t,new nt(t,4,[r,e])),e}registerTransformer(t,e){const s=this.getResolver(t);if(s==null)return!1;if(s.getFactory){const r=s.getFactory(this);return r==null?!1:(r.registerTransformer(e),!0)}return!1}getResolver(t,e=!0){if(Se(t),t.resolve!==void 0)return t;let s=this,r;for(;s!=null;)if(r=s.resolvers.get(t),r==null){if(s.parent==null){const n=xs(t)?this:s;return e?this.jitRegister(t,n):null}s=s.parent}else return r;return null}has(t,e=!1){return this.resolvers.has(t)?!0:e&&this.parent!=null?this.parent.has(t,!0):!1}get(t){if(Se(t),t.$isResolver)return t.resolve(this,this);let e=this,s;for(;e!=null;)if(s=e.resolvers.get(t),s==null){if(e.parent==null){const r=xs(t)?this:e;return s=this.jitRegister(t,r),s.resolve(e,this)}e=e.parent}else return s.resolve(e,this);throw new Error(`Unable to resolve key: ${t}`)}getAll(t,e=!1){Se(t);const s=this;let r=s,n;if(e){let o=le;for(;r!=null;)n=r.resolvers.get(t),n!=null&&(o=o.concat(Ss(n,r,s))),r=r.parent;return o}else for(;r!=null;)if(n=r.resolvers.get(t),n==null){if(r=r.parent,r==null)return le}else return Ss(n,r,s);return le}getFactory(t){let e=di.get(t);if(e===void 0){if(Nn(t))throw new Error(`${t.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);di.set(t,e=new Mn(t,E.getDependencies(t)))}return e}registerFactory(t,e){di.set(t,e)}createChild(t){return new ue(null,Object.assign({},this.config,t,{parentLocator:()=>this}))}jitRegister(t,e){if(typeof t!="function")throw new Error(`Attempted to jitRegister something that is not a constructor: '${t}'. Did you forget to register this dependency?`);if(Dn.has(t.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${t.name}. Did you forget to add @inject(Key)`);if(Ee(t)){const s=t.register(e);if(!(s instanceof Object)||s.resolve==null){const r=e.resolvers.get(t);if(r!=null)return r;throw new Error("A valid resolver was not returned from the static register method")}return s}else{if(t.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${t.friendlyName}`);{const s=this.config.defaultResolver(t,e);return e.resolvers.set(t,s),s}}}}const fi=new WeakMap;function hr(i){return function(t,e,s){if(fi.has(s))return fi.get(s);const r=i(t,e,s);return fi.set(s,r),r}}const pe=Object.freeze({instance(i,t){return new nt(i,0,t)},singleton(i,t){return new nt(i,1,t)},transient(i,t){return new nt(i,2,t)},callback(i,t){return new nt(i,3,t)},cachedCallback(i,t){return new nt(i,3,hr(t))},aliasTo(i,t){return new nt(t,5,i)}});function Se(i){if(i==null)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function Ss(i,t,e){if(i instanceof nt&&i.strategy===4){const s=i.state;let r=s.length;const n=new Array(r);for(;r--;)n[r]=s[r].resolve(t,e);return n}return[i.resolve(t,e)]}const ks="(anonymous)";function Cs(i){return typeof i=="object"&&i!==null||typeof i=="function"}const Nn=function(){const i=new WeakMap;let t=!1,e="",s=0;return function(r){return t=i.get(r),t===void 0&&(e=r.toString(),s=e.length,t=s>=29&&s<=100&&e.charCodeAt(s-1)===125&&e.charCodeAt(s-2)<=32&&e.charCodeAt(s-3)===93&&e.charCodeAt(s-4)===101&&e.charCodeAt(s-5)===100&&e.charCodeAt(s-6)===111&&e.charCodeAt(s-7)===99&&e.charCodeAt(s-8)===32&&e.charCodeAt(s-9)===101&&e.charCodeAt(s-10)===118&&e.charCodeAt(s-11)===105&&e.charCodeAt(s-12)===116&&e.charCodeAt(s-13)===97&&e.charCodeAt(s-14)===110&&e.charCodeAt(s-15)===88,i.set(r,t)),t}}(),ke={};function ur(i){switch(typeof i){case"number":return i>=0&&(i|0)===i;case"string":{const t=ke[i];if(t!==void 0)return t;const e=i.length;if(e===0)return ke[i]=!1;let s=0;for(let r=0;r<e;++r)if(s=i.charCodeAt(r),r===0&&s===48&&e>1||s<48||s>57)return ke[i]=!1;return ke[i]=!0}default:return!1}}function Ts(i){return`${i.toLowerCase()}:presentation`}const Ce=new Map,dr=Object.freeze({define(i,t,e){const s=Ts(i);Ce.get(s)===void 0?Ce.set(s,t):Ce.set(s,!1),e.register(pe.instance(s,t))},forTag(i,t){const e=Ts(i),s=Ce.get(e);return s===!1?E.findResponsibleContainer(t).get(e):s||null}});class Pn{constructor(t,e){this.template=t||null,this.styles=e===void 0?null:Array.isArray(e)?X.create(e):e instanceof X?e:X.create([e])}applyTo(t){const e=t.$fastController;e.template===null&&(e.template=this.template),e.styles===null&&(e.styles=this.styles)}}class ct extends ze{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return this._presentation===void 0&&(this._presentation=dr.forTag(this.tagName,this)),this._presentation}templateChanged(){this.template!==void 0&&(this.$fastController.template=this.template)}stylesChanged(){this.styles!==void 0&&(this.$fastController.styles=this.styles)}connectedCallback(){this.$presentation!==null&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(t){return(e={})=>new Bn(this===ct?class extends ct{}:this,t,e)}}m([$],ct.prototype,"template",void 0);m([$],ct.prototype,"styles",void 0);function Kt(i,t,e){return typeof i=="function"?i(t,e):i}class Bn{constructor(t,e,s){this.type=t,this.elementDefinition=e,this.overrideDefinition=s,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(t,e){const s=this.definition,r=this.overrideDefinition,o=`${s.prefix||e.elementPrefix}-${s.baseName}`;e.tryDefineElement({name:o,type:this.type,baseClass:this.elementDefinition.baseClass,callback:a=>{const l=new Pn(Kt(s.template,a,s),Kt(s.styles,a,s));a.definePresentation(l);let c=Kt(s.shadowOptions,a,s);a.shadowRootMode&&(c?r.shadowOptions||(c.mode=a.shadowRootMode):c!==null&&(c={mode:a.shadowRootMode})),a.defineElement({elementOptions:Kt(s.elementOptions,a,s),shadowOptions:c,attributes:Kt(s.attributes,a,s)})}})}}function fr(i,...t){const e=Me.locate(i);t.forEach(s=>{Object.getOwnPropertyNames(s.prototype).forEach(n=>{n!=="constructor"&&Object.defineProperty(i.prototype,n,Object.getOwnPropertyDescriptor(s.prototype,n))}),Me.locate(s).forEach(n=>e.push(n))})}const H={horizontal:"horizontal",vertical:"vertical"};function An(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function On(){const i=document.querySelector('meta[property="csp-nonce"]');return i?i.getAttribute("content"):null}let It;function jn(){if(typeof It=="boolean")return It;if(!An())return It=!1,It;const i=document.createElement("style"),t=On();t!==null&&i.setAttribute("nonce",t),document.head.appendChild(i);try{i.sheet.insertRule("foo:focus-visible {color:inherit}",0),It=!0}catch{It=!1}finally{document.head.removeChild(i)}return It}var $s;(function(i){i[i.alt=18]="alt",i[i.arrowDown=40]="arrowDown",i[i.arrowLeft=37]="arrowLeft",i[i.arrowRight=39]="arrowRight",i[i.arrowUp=38]="arrowUp",i[i.back=8]="back",i[i.backSlash=220]="backSlash",i[i.break=19]="break",i[i.capsLock=20]="capsLock",i[i.closeBracket=221]="closeBracket",i[i.colon=186]="colon",i[i.colon2=59]="colon2",i[i.comma=188]="comma",i[i.ctrl=17]="ctrl",i[i.delete=46]="delete",i[i.end=35]="end",i[i.enter=13]="enter",i[i.equals=187]="equals",i[i.equals2=61]="equals2",i[i.equals3=107]="equals3",i[i.escape=27]="escape",i[i.forwardSlash=191]="forwardSlash",i[i.function1=112]="function1",i[i.function10=121]="function10",i[i.function11=122]="function11",i[i.function12=123]="function12",i[i.function2=113]="function2",i[i.function3=114]="function3",i[i.function4=115]="function4",i[i.function5=116]="function5",i[i.function6=117]="function6",i[i.function7=118]="function7",i[i.function8=119]="function8",i[i.function9=120]="function9",i[i.home=36]="home",i[i.insert=45]="insert",i[i.menu=93]="menu",i[i.minus=189]="minus",i[i.minus2=109]="minus2",i[i.numLock=144]="numLock",i[i.numPad0=96]="numPad0",i[i.numPad1=97]="numPad1",i[i.numPad2=98]="numPad2",i[i.numPad3=99]="numPad3",i[i.numPad4=100]="numPad4",i[i.numPad5=101]="numPad5",i[i.numPad6=102]="numPad6",i[i.numPad7=103]="numPad7",i[i.numPad8=104]="numPad8",i[i.numPad9=105]="numPad9",i[i.numPadDivide=111]="numPadDivide",i[i.numPadDot=110]="numPadDot",i[i.numPadMinus=109]="numPadMinus",i[i.numPadMultiply=106]="numPadMultiply",i[i.numPadPlus=107]="numPadPlus",i[i.openBracket=219]="openBracket",i[i.pageDown=34]="pageDown",i[i.pageUp=33]="pageUp",i[i.period=190]="period",i[i.print=44]="print",i[i.quote=222]="quote",i[i.scrollLock=145]="scrollLock",i[i.shift=16]="shift",i[i.space=32]="space",i[i.tab=9]="tab",i[i.tilde=192]="tilde",i[i.windowsLeft=91]="windowsLeft",i[i.windowsOpera=219]="windowsOpera",i[i.windowsRight=92]="windowsRight"})($s||($s={}));const Yi="ArrowDown",Ve="ArrowLeft",Le="ArrowRight",Xi="ArrowUp",gr="Enter",zn="Escape",Wn="Home",Hn="End",Un=" ",_n="Tab",Gn={ArrowDown:Yi,ArrowLeft:Ve,ArrowRight:Le,ArrowUp:Xi};var O;(function(i){i.ltr="ltr",i.rtl="rtl"})(O||(O={}));function qn(i,t,e){return Math.min(Math.max(e,i),t)}var f;(function(i){i.Canvas="Canvas",i.CanvasText="CanvasText",i.LinkText="LinkText",i.VisitedText="VisitedText",i.ActiveText="ActiveText",i.ButtonFace="ButtonFace",i.ButtonText="ButtonText",i.Field="Field",i.FieldText="FieldText",i.Highlight="Highlight",i.HighlightText="HighlightText",i.GrayText="GrayText"})(f||(f={}));class D{}m([y({attribute:"aria-atomic"})],D.prototype,"ariaAtomic",void 0);m([y({attribute:"aria-busy"})],D.prototype,"ariaBusy",void 0);m([y({attribute:"aria-controls"})],D.prototype,"ariaControls",void 0);m([y({attribute:"aria-current"})],D.prototype,"ariaCurrent",void 0);m([y({attribute:"aria-describedby"})],D.prototype,"ariaDescribedby",void 0);m([y({attribute:"aria-details"})],D.prototype,"ariaDetails",void 0);m([y({attribute:"aria-disabled"})],D.prototype,"ariaDisabled",void 0);m([y({attribute:"aria-errormessage"})],D.prototype,"ariaErrormessage",void 0);m([y({attribute:"aria-flowto"})],D.prototype,"ariaFlowto",void 0);m([y({attribute:"aria-haspopup"})],D.prototype,"ariaHaspopup",void 0);m([y({attribute:"aria-hidden"})],D.prototype,"ariaHidden",void 0);m([y({attribute:"aria-invalid"})],D.prototype,"ariaInvalid",void 0);m([y({attribute:"aria-keyshortcuts"})],D.prototype,"ariaKeyshortcuts",void 0);m([y({attribute:"aria-label"})],D.prototype,"ariaLabel",void 0);m([y({attribute:"aria-labelledby"})],D.prototype,"ariaLabelledby",void 0);m([y({attribute:"aria-live"})],D.prototype,"ariaLive",void 0);m([y({attribute:"aria-owns"})],D.prototype,"ariaOwns",void 0);m([y({attribute:"aria-relevant"})],D.prototype,"ariaRelevant",void 0);m([y({attribute:"aria-roledescription"})],D.prototype,"ariaRoledescription",void 0);const pr=i=>{const t=i.closest("[dir]");return t!==null&&t.dir==="rtl"?O.rtl:O.ltr},Yn=(i,t)=>lt`
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
        ${st("control")}
    >
        ${Cn(i,t)}
        <span class="content" part="content">
            <slot ${qi("defaultSlottedContent")}></slot>
        </span>
        ${kn(i,t)}
    </button>
`,Rs="form-associated-proxy",Es="ElementInternals",Fs=Es in window&&"setFormValue"in window[Es].prototype,Ms=new WeakMap;function Qi(i){const t=class extends i{constructor(...e){super(...e),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return Fs}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const e=this.proxy.labels,s=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),r=e?s.concat(Array.from(e)):s;return Object.freeze(r)}else return le}valueChanged(e,s){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(e,s){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(e,s){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),C.queueUpdate(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(e,s){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(e,s){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),C.queueUpdate(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!Fs)return null;let e=Ms.get(this);return e||(e=this.attachInternals(),Ms.set(this,e)),e}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){this.proxyEventsToBlock.forEach(e=>this.proxy.removeEventListener(e,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(e,s,r){this.elementInternals?this.elementInternals.setValidity(e,s,r):typeof s=="string"&&this.proxy.setCustomValidity(s)}formDisabledCallback(e){this.disabled=e}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var e;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(s=>this.proxy.addEventListener(s,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",Rs),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",Rs)),(e=this.shadowRoot)===null||e===void 0||e.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var e;this.removeChild(this.proxy),(e=this.shadowRoot)===null||e===void 0||e.removeChild(this.proxySlot)}validate(e){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,e)}setFormValue(e,s){this.elementInternals&&this.elementInternals.setFormValue(e,s||e)}_keypressHandler(e){switch(e.key){case gr:if(this.form instanceof HTMLFormElement){const s=this.form.querySelector("[type=submit]");s?.click()}break}}stopPropagation(e){e.stopPropagation()}};return y({mode:"boolean"})(t.prototype,"disabled"),y({mode:"fromView",attribute:"value"})(t.prototype,"initialValue"),y({attribute:"current-value"})(t.prototype,"currentValue"),y(t.prototype,"name"),y({mode:"boolean"})(t.prototype,"required"),$(t.prototype,"value"),t}function Xn(i){class t extends Qi(i){}class e extends t{constructor(...r){super(r),this.dirtyChecked=!1,this.checkedAttribute=!1,this.checked=!1,this.dirtyChecked=!1}checkedAttributeChanged(){this.defaultChecked=this.checkedAttribute}defaultCheckedChanged(){this.dirtyChecked||(this.checked=this.defaultChecked,this.dirtyChecked=!1)}checkedChanged(r,n){this.dirtyChecked||(this.dirtyChecked=!0),this.currentChecked=this.checked,this.updateForm(),this.proxy instanceof HTMLInputElement&&(this.proxy.checked=this.checked),r!==void 0&&this.$emit("change"),this.validate()}currentCheckedChanged(r,n){this.checked=this.currentChecked}updateForm(){const r=this.checked?this.value:null;this.setFormValue(r,r)}connectedCallback(){super.connectedCallback(),this.updateForm()}formResetCallback(){super.formResetCallback(),this.checked=!!this.checkedAttribute,this.dirtyChecked=!1}}return y({attribute:"checked",mode:"boolean"})(e.prototype,"checkedAttribute"),y({attribute:"current-checked",converter:rr})(e.prototype,"currentChecked"),$(e.prototype,"defaultChecked"),$(e.prototype,"checked"),e}class Qn extends ct{}class Zn extends Qi(Qn){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let ht=class extends Zn{constructor(){super(...arguments),this.handleClick=t=>{var e;this.disabled&&((e=this.defaultSlottedContent)===null||e===void 0?void 0:e.length)<=1&&t.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const t=this.proxy.isConnected;t||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),t||this.detachProxy()},this.handleFormReset=()=>{var t;(t=this.form)===null||t===void 0||t.reset()},this.handleUnsupportedDelegatesFocus=()=>{var t;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(!((t=this.$fastController.definition.shadowOptions)===null||t===void 0)&&t.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(t,e){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),e==="submit"&&this.addEventListener("click",this.handleSubmission),t==="submit"&&this.removeEventListener("click",this.handleSubmission),e==="reset"&&this.addEventListener("click",this.handleFormReset),t==="reset"&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var t;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const e=Array.from((t=this.control)===null||t===void 0?void 0:t.children);e&&e.forEach(s=>{s.addEventListener("click",this.handleClick)})}disconnectedCallback(){var t;super.disconnectedCallback();const e=Array.from((t=this.control)===null||t===void 0?void 0:t.children);e&&e.forEach(s=>{s.removeEventListener("click",this.handleClick)})}};m([y({mode:"boolean"})],ht.prototype,"autofocus",void 0);m([y({attribute:"form"})],ht.prototype,"formId",void 0);m([y],ht.prototype,"formaction",void 0);m([y],ht.prototype,"formenctype",void 0);m([y],ht.prototype,"formmethod",void 0);m([y({mode:"boolean"})],ht.prototype,"formnovalidate",void 0);m([y],ht.prototype,"formtarget",void 0);m([y],ht.prototype,"type",void 0);m([$],ht.prototype,"defaultSlottedContent",void 0);class We{}m([y({attribute:"aria-expanded"})],We.prototype,"ariaExpanded",void 0);m([y({attribute:"aria-pressed"})],We.prototype,"ariaPressed",void 0);fr(We,D);fr(ht,Sn,We);function Ci(i){const t=i.parentElement;if(t)return t;{const e=i.getRootNode();if(e.host instanceof HTMLElement)return e.host}return null}function Jn(i,t){let e=t;for(;e!==null;){if(e===i)return!0;e=Ci(e)}return!1}const wt=document.createElement("div");function Kn(i){return i instanceof ze}class Zi{setProperty(t,e){C.queueUpdate(()=>this.target.setProperty(t,e))}removeProperty(t){C.queueUpdate(()=>this.target.removeProperty(t))}}class to extends Zi{constructor(t){super();const e=new CSSStyleSheet;this.target=e.cssRules[e.insertRule(":host{}")].style,t.$fastController.addStyles(X.create([e]))}}class eo extends Zi{constructor(){super();const t=new CSSStyleSheet;this.target=t.cssRules[t.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,t]}}class io extends Zi{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:t}=this.style;if(t){const e=t.insertRule(":root{}",t.cssRules.length);this.target=t.cssRules[e].style}}}class mr{constructor(t){this.store=new Map,this.target=null;const e=t.$fastController;this.style=document.createElement("style"),e.addStyles(this.style),M.getNotifier(e).subscribe(this,"isConnected"),this.handleChange(e,"isConnected")}targetChanged(){if(this.target!==null)for(const[t,e]of this.store.entries())this.target.setProperty(t,e)}setProperty(t,e){this.store.set(t,e),C.queueUpdate(()=>{this.target!==null&&this.target.setProperty(t,e)})}removeProperty(t){this.store.delete(t),C.queueUpdate(()=>{this.target!==null&&this.target.removeProperty(t)})}handleChange(t,e){const{sheet:s}=this.style;if(s){const r=s.insertRule(":host{}",s.cssRules.length);this.target=s.cssRules[r].style}else this.target=null}}m([$],mr.prototype,"target",void 0);class so{constructor(t){this.target=t.style}setProperty(t,e){C.queueUpdate(()=>this.target.setProperty(t,e))}removeProperty(t){C.queueUpdate(()=>this.target.removeProperty(t))}}class B{setProperty(t,e){B.properties[t]=e;for(const s of B.roots.values())At.getOrCreate(B.normalizeRoot(s)).setProperty(t,e)}removeProperty(t){delete B.properties[t];for(const e of B.roots.values())At.getOrCreate(B.normalizeRoot(e)).removeProperty(t)}static registerRoot(t){const{roots:e}=B;if(!e.has(t)){e.add(t);const s=At.getOrCreate(this.normalizeRoot(t));for(const r in B.properties)s.setProperty(r,B.properties[r])}}static unregisterRoot(t){const{roots:e}=B;if(e.has(t)){e.delete(t);const s=At.getOrCreate(B.normalizeRoot(t));for(const r in B.properties)s.removeProperty(r)}}static normalizeRoot(t){return t===wt?document:t}}B.roots=new Set;B.properties={};const gi=new WeakMap,ro=C.supportsAdoptedStyleSheets?to:mr,At=Object.freeze({getOrCreate(i){if(gi.has(i))return gi.get(i);let t;return i===wt?t=new B:i instanceof Document?t=C.supportsAdoptedStyleSheets?new eo:new io:Kn(i)?t=new ro(i):t=new so(i),gi.set(i,t),t}});class q extends Gi{constructor(t){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=t.name,t.cssCustomPropertyName!==null&&(this.cssCustomProperty=`--${t.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=q.uniqueId(),q.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(t){return new q({name:typeof t=="string"?t:t.name,cssCustomPropertyName:typeof t=="string"?t:t.cssCustomPropertyName===void 0?t.name:t.cssCustomPropertyName})}static isCSSDesignToken(t){return typeof t.cssCustomProperty=="string"}static isDerivedDesignTokenValue(t){return typeof t=="function"}static getTokenById(t){return q.tokensById.get(t)}getOrCreateSubscriberSet(t=this){return this.subscribers.get(t)||this.subscribers.set(t,new Set)&&this.subscribers.get(t)}createCSS(){return this.cssVar||""}getValueFor(t){const e=I.getOrCreate(t).get(this);if(e!==void 0)return e;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${t} or an ancestor of ${t}.`)}setValueFor(t,e){return this._appliedTo.add(t),e instanceof q&&(e=this.alias(e)),I.getOrCreate(t).set(this,e),this}deleteValueFor(t){return this._appliedTo.delete(t),I.existsFor(t)&&I.getOrCreate(t).delete(this),this}withDefault(t){return this.setValueFor(wt,t),this}subscribe(t,e){const s=this.getOrCreateSubscriberSet(e);e&&!I.existsFor(e)&&I.getOrCreate(e),s.has(t)||s.add(t)}unsubscribe(t,e){const s=this.subscribers.get(e||this);s&&s.has(t)&&s.delete(t)}notify(t){const e=Object.freeze({token:this,target:t});this.subscribers.has(this)&&this.subscribers.get(this).forEach(s=>s.handleChange(e)),this.subscribers.has(t)&&this.subscribers.get(t).forEach(s=>s.handleChange(e))}alias(t){return e=>t.getValueFor(e)}}q.uniqueId=(()=>{let i=0;return()=>(i++,i.toString(16))})();q.tokensById=new Map;class no{startReflection(t,e){t.subscribe(this,e),this.handleChange({token:t,target:e})}stopReflection(t,e){t.unsubscribe(this,e),this.remove(t,e)}handleChange(t){const{token:e,target:s}=t;this.add(e,s)}add(t,e){At.getOrCreate(e).setProperty(t.cssCustomProperty,this.resolveCSSValue(I.getOrCreate(e).get(t)))}remove(t,e){At.getOrCreate(e).removeProperty(t.cssCustomProperty)}resolveCSSValue(t){return t&&typeof t.createCSS=="function"?t.createCSS():t}}class oo{constructor(t,e,s){this.source=t,this.token=e,this.node=s,this.dependencies=new Set,this.observer=M.binding(t,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){this.node.store.set(this.token,this.observer.observe(this.node.target,he))}}class ao{constructor(){this.values=new Map}set(t,e){this.values.get(t)!==e&&(this.values.set(t,e),M.getNotifier(this).notify(t.id))}get(t){return M.track(this,t.id),this.values.get(t)}delete(t){this.values.delete(t)}all(){return this.values.entries()}}const te=new WeakMap,ee=new WeakMap;class I{constructor(t){this.target=t,this.store=new ao,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(e,s)=>{const r=q.getTokenById(s);if(r&&(r.notify(this.target),q.isCSSDesignToken(r))){const n=this.parent,o=this.isReflecting(r);if(n){const a=n.get(r),l=e.get(r);a!==l&&!o?this.reflectToCSS(r):a===l&&o&&this.stopReflectToCSS(r)}else o||this.reflectToCSS(r)}}},te.set(t,this),M.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),t instanceof ze?t.$fastController.addBehaviors([this]):t.isConnected&&this.bind()}static getOrCreate(t){return te.get(t)||new I(t)}static existsFor(t){return te.has(t)}static findParent(t){if(wt!==t.target){let e=Ci(t.target);for(;e!==null;){if(te.has(e))return te.get(e);e=Ci(e)}return I.getOrCreate(wt)}return null}static findClosestAssignedNode(t,e){let s=e;do{if(s.has(t))return s;s=s.parent?s.parent:s.target!==wt?I.getOrCreate(wt):null}while(s!==null);return null}get parent(){return ee.get(this)||null}has(t){return this.assignedValues.has(t)}get(t){const e=this.store.get(t);if(e!==void 0)return e;const s=this.getRaw(t);if(s!==void 0)return this.hydrate(t,s),this.get(t)}getRaw(t){var e;return this.assignedValues.has(t)?this.assignedValues.get(t):(e=I.findClosestAssignedNode(t,this))===null||e===void 0?void 0:e.getRaw(t)}set(t,e){q.isDerivedDesignTokenValue(this.assignedValues.get(t))&&this.tearDownBindingObserver(t),this.assignedValues.set(t,e),q.isDerivedDesignTokenValue(e)?this.setupBindingObserver(t,e):this.store.set(t,e)}delete(t){this.assignedValues.delete(t),this.tearDownBindingObserver(t);const e=this.getRaw(t);e?this.hydrate(t,e):this.store.delete(t)}bind(){const t=I.findParent(this);t&&t.appendChild(this);for(const e of this.assignedValues.keys())e.notify(this.target)}unbind(){this.parent&&ee.get(this).removeChild(this)}appendChild(t){t.parent&&ee.get(t).removeChild(t);const e=this.children.filter(s=>t.contains(s));ee.set(t,this),this.children.push(t),e.forEach(s=>t.appendChild(s)),M.getNotifier(this.store).subscribe(t);for(const[s,r]of this.store.all())t.hydrate(s,this.bindingObservers.has(s)?this.getRaw(s):r)}removeChild(t){const e=this.children.indexOf(t);return e!==-1&&this.children.splice(e,1),M.getNotifier(this.store).unsubscribe(t),t.parent===this?ee.delete(t):!1}contains(t){return Jn(this.target,t.target)}reflectToCSS(t){this.isReflecting(t)||(this.reflecting.add(t),I.cssCustomPropertyReflector.startReflection(t,this.target))}stopReflectToCSS(t){this.isReflecting(t)&&(this.reflecting.delete(t),I.cssCustomPropertyReflector.stopReflection(t,this.target))}isReflecting(t){return this.reflecting.has(t)}handleChange(t,e){const s=q.getTokenById(e);s&&this.hydrate(s,this.getRaw(s))}hydrate(t,e){if(!this.has(t)){const s=this.bindingObservers.get(t);q.isDerivedDesignTokenValue(e)?s?s.source!==e&&(this.tearDownBindingObserver(t),this.setupBindingObserver(t,e)):this.setupBindingObserver(t,e):(s&&this.tearDownBindingObserver(t),this.store.set(t,e))}}setupBindingObserver(t,e){const s=new oo(e,t,this);return this.bindingObservers.set(t,s),s}tearDownBindingObserver(t){return this.bindingObservers.has(t)?(this.bindingObservers.get(t).disconnect(),this.bindingObservers.delete(t),!0):!1}}I.cssCustomPropertyReflector=new no;m([$],I.prototype,"children",void 0);function lo(i){return q.from(i)}const He=Object.freeze({create:lo,notifyConnection(i){return!i.isConnected||!I.existsFor(i)?!1:(I.getOrCreate(i).bind(),!0)},notifyDisconnection(i){return i.isConnected||!I.existsFor(i)?!1:(I.getOrCreate(i).unbind(),!0)},registerRoot(i=wt){B.registerRoot(i)},unregisterRoot(i=wt){B.unregisterRoot(i)}}),pi=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),mi=new Map,Fe=new Map;let jt=null;const ie=E.createInterface(i=>i.cachedCallback(t=>(jt===null&&(jt=new vr(null,t)),jt))),br=Object.freeze({tagFor(i){return Fe.get(i)},responsibleFor(i){const t=i.$$designSystem$$;return t||E.findResponsibleContainer(i).get(ie)},getOrCreate(i){if(!i)return jt===null&&(jt=E.getOrCreateDOMContainer().get(ie)),jt;const t=i.$$designSystem$$;if(t)return t;const e=E.getOrCreateDOMContainer(i);if(e.has(ie,!1))return e.get(ie);{const s=new vr(i,e);return e.register(pe.instance(ie,s)),s}}});function co(i,t,e){return typeof i=="string"?{name:i,type:t,callback:e}:i}class vr{constructor(t,e){this.owner=t,this.container=e,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>pi.definitionCallbackOnly,t!==null&&(t.$$designSystem$$=this)}withPrefix(t){return this.prefix=t,this}withShadowRootMode(t){return this.shadowRootMode=t,this}withElementDisambiguation(t){return this.disambiguate=t,this}withDesignTokenRoot(t){return this.designTokenRoot=t,this}register(...t){const e=this.container,s=[],r=this.disambiguate,n=this.shadowRootMode,o={elementPrefix:this.prefix,tryDefineElement(a,l,c){const u=co(a,l,c),{name:h,callback:d,baseClass:b}=u;let{type:p}=u,v=h,w=mi.get(v),R=!0;for(;w;){const F=r(v,p,w);switch(F){case pi.ignoreDuplicate:return;case pi.definitionCallbackOnly:R=!1,w=void 0;break;default:v=F,w=mi.get(v);break}}R&&((Fe.has(p)||p===ct)&&(p=class extends p{}),mi.set(v,p),Fe.set(p,v),b&&Fe.set(b,v)),s.push(new ho(e,v,p,n,d,R))}};this.designTokensInitialized||(this.designTokensInitialized=!0,this.designTokenRoot!==null&&He.registerRoot(this.designTokenRoot)),e.registerWithContext(o,...t);for(const a of s)a.callback(a),a.willDefine&&a.definition!==null&&a.definition.define();return this}}class ho{constructor(t,e,s,r,n,o){this.container=t,this.name=e,this.type=s,this.shadowRootMode=r,this.callback=n,this.willDefine=o,this.definition=null}definePresentation(t){dr.define(this.name,t,this.container)}defineElement(t){this.definition=new je(this.type,Object.assign(Object.assign({},t),{name:this.name}))}tagFor(t){return br.tagFor(t)}}const uo=(i,t)=>lt`
    <div class="positioning-region" part="positioning-region">
        ${lr(e=>e.modal,lt`
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
            ${st("dialog")}
        >
            <slot></slot>
        </div>
    </div>
`;/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var fo=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],go=fo.join(","),yr=typeof Element>"u",De=yr?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,Ti=!yr&&Element.prototype.getRootNode?function(i){return i.getRootNode()}:function(i){return i.ownerDocument},po=function(t,e){return t.tabIndex<0&&(e||/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName)||t.isContentEditable)&&isNaN(parseInt(t.getAttribute("tabindex"),10))?0:t.tabIndex},wr=function(t){return t.tagName==="INPUT"},mo=function(t){return wr(t)&&t.type==="hidden"},bo=function(t){var e=t.tagName==="DETAILS"&&Array.prototype.slice.apply(t.children).some(function(s){return s.tagName==="SUMMARY"});return e},vo=function(t,e){for(var s=0;s<t.length;s++)if(t[s].checked&&t[s].form===e)return t[s]},yo=function(t){if(!t.name)return!0;var e=t.form||Ti(t),s=function(a){return e.querySelectorAll('input[type="radio"][name="'+a+'"]')},r;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")r=s(window.CSS.escape(t.name));else try{r=s(t.name)}catch(o){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",o.message),!1}var n=vo(r,t.form);return!n||n===t},wo=function(t){return wr(t)&&t.type==="radio"},xo=function(t){return wo(t)&&!yo(t)},Is=function(t){var e=t.getBoundingClientRect(),s=e.width,r=e.height;return s===0&&r===0},So=function(t,e){var s=e.displayCheck,r=e.getShadowRoot;if(getComputedStyle(t).visibility==="hidden")return!0;var n=De.call(t,"details>summary:first-of-type"),o=n?t.parentElement:t;if(De.call(o,"details:not([open]) *"))return!0;var a=Ti(t).host,l=a?.ownerDocument.contains(a)||t.ownerDocument.contains(t);if(!s||s==="full"){if(typeof r=="function"){for(var c=t;t;){var u=t.parentElement,h=Ti(t);if(u&&!u.shadowRoot&&r(u)===!0)return Is(t);t.assignedSlot?t=t.assignedSlot:!u&&h!==t.ownerDocument?t=h.host:t=u}t=c}if(l)return!t.getClientRects().length}else if(s==="non-zero-area")return Is(t);return!1},ko=function(t){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))for(var e=t.parentElement;e;){if(e.tagName==="FIELDSET"&&e.disabled){for(var s=0;s<e.children.length;s++){var r=e.children.item(s);if(r.tagName==="LEGEND")return De.call(e,"fieldset[disabled] *")?!0:!r.contains(t)}return!0}e=e.parentElement}return!1},Co=function(t,e){return!(e.disabled||mo(e)||So(e,t)||bo(e)||ko(e))},To=function(t,e){return!(xo(e)||po(e)<0||!Co(t,e))},Vs=function(t,e){if(e=e||{},!t)throw new Error("No node provided");return De.call(t,go)===!1?!1:To(e,t)};class at extends ct{constructor(){super(...arguments),this.modal=!0,this.hidden=!1,this.trapFocus=!0,this.trapFocusChanged=()=>{this.$fastController.isConnected&&this.updateTrapFocus()},this.isTrappingFocus=!1,this.handleDocumentKeydown=t=>{if(!t.defaultPrevented&&!this.hidden)switch(t.key){case zn:this.dismiss(),t.preventDefault();break;case _n:this.handleTabKeyDown(t);break}},this.handleDocumentFocus=t=>{!t.defaultPrevented&&this.shouldForceFocus(t.target)&&(this.focusFirstElement(),t.preventDefault())},this.handleTabKeyDown=t=>{if(!this.trapFocus||this.hidden)return;const e=this.getTabQueueBounds();if(e.length!==0){if(e.length===1){e[0].focus(),t.preventDefault();return}t.shiftKey&&t.target===e[0]?(e[e.length-1].focus(),t.preventDefault()):!t.shiftKey&&t.target===e[e.length-1]&&(e[0].focus(),t.preventDefault())}},this.getTabQueueBounds=()=>{const t=[];return at.reduceTabbableItems(t,this)},this.focusFirstElement=()=>{const t=this.getTabQueueBounds();t.length>0?t[0].focus():this.dialog instanceof HTMLElement&&this.dialog.focus()},this.shouldForceFocus=t=>this.isTrappingFocus&&!this.contains(t),this.shouldTrapFocus=()=>this.trapFocus&&!this.hidden,this.updateTrapFocus=t=>{const e=t===void 0?this.shouldTrapFocus():t;e&&!this.isTrappingFocus?(this.isTrappingFocus=!0,document.addEventListener("focusin",this.handleDocumentFocus),C.queueUpdate(()=>{this.shouldForceFocus(document.activeElement)&&this.focusFirstElement()})):!e&&this.isTrappingFocus&&(this.isTrappingFocus=!1,document.removeEventListener("focusin",this.handleDocumentFocus))}}dismiss(){this.$emit("dismiss"),this.$emit("cancel")}show(){this.hidden=!1}hide(){this.hidden=!0,this.$emit("close")}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleDocumentKeydown),this.notifier=M.getNotifier(this),this.notifier.subscribe(this,"hidden"),this.updateTrapFocus()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeydown),this.updateTrapFocus(!1),this.notifier.unsubscribe(this,"hidden")}handleChange(t,e){switch(e){case"hidden":this.updateTrapFocus();break}}static reduceTabbableItems(t,e){return e.getAttribute("tabindex")==="-1"?t:Vs(e)||at.isFocusableFastElement(e)&&at.hasTabbableShadow(e)?(t.push(e),t):e.childElementCount?t.concat(Array.from(e.children).reduce(at.reduceTabbableItems,[])):t}static isFocusableFastElement(t){var e,s;return!!(!((s=(e=t.$fastController)===null||e===void 0?void 0:e.definition.shadowOptions)===null||s===void 0)&&s.delegatesFocus)}static hasTabbableShadow(t){var e,s;return Array.from((s=(e=t.shadowRoot)===null||e===void 0?void 0:e.querySelectorAll("*"))!==null&&s!==void 0?s:[]).some(r=>Vs(r))}}m([y({mode:"boolean"})],at.prototype,"modal",void 0);m([y({mode:"boolean"})],at.prototype,"hidden",void 0);m([y({attribute:"trap-focus",mode:"boolean"})],at.prototype,"trapFocus",void 0);m([y({attribute:"aria-describedby"})],at.prototype,"ariaDescribedby",void 0);m([y({attribute:"aria-labelledby"})],at.prototype,"ariaLabelledby",void 0);m([y({attribute:"aria-label"})],at.prototype,"ariaLabel",void 0);const $o=(i,t)=>lt`
    <template
        role="radiogroup"
        aria-disabled="${e=>e.disabled}"
        aria-readonly="${e=>e.readOnly}"
        @click="${(e,s)=>e.clickHandler(s.event)}"
        @keydown="${(e,s)=>e.keydownHandler(s.event)}"
        @focusout="${(e,s)=>e.focusOutHandler(s.event)}"
    >
        <slot name="label"></slot>
        <div
            class="positioning-region ${e=>e.orientation===H.horizontal?"horizontal":"vertical"}"
            part="positioning-region"
        >
            <slot
                ${qi({property:"slottedRadioButtons",filter:yn("[role=radio]")})}
            ></slot>
        </div>
    </template>
`;class Rt extends ct{constructor(){super(...arguments),this.orientation=H.horizontal,this.radioChangeHandler=t=>{const e=t.target;e.checked&&(this.slottedRadioButtons.forEach(s=>{s!==e&&(s.checked=!1,this.isInsideFoundationToolbar||s.setAttribute("tabindex","-1"))}),this.selectedRadio=e,this.value=e.value,e.setAttribute("tabindex","0"),this.focusedRadio=e),t.stopPropagation()},this.moveToRadioByIndex=(t,e)=>{const s=t[e];this.isInsideToolbar||(s.setAttribute("tabindex","0"),s.readOnly?this.slottedRadioButtons.forEach(r=>{r!==s&&r.setAttribute("tabindex","-1")}):(s.checked=!0,this.selectedRadio=s)),this.focusedRadio=s,s.focus()},this.moveRightOffGroup=()=>{var t;(t=this.nextElementSibling)===null||t===void 0||t.focus()},this.moveLeftOffGroup=()=>{var t;(t=this.previousElementSibling)===null||t===void 0||t.focus()},this.focusOutHandler=t=>{const e=this.slottedRadioButtons,s=t.target,r=s!==null?e.indexOf(s):0,n=this.focusedRadio?e.indexOf(this.focusedRadio):-1;return(n===0&&r===n||n===e.length-1&&n===r)&&(this.selectedRadio?(this.focusedRadio=this.selectedRadio,this.isInsideFoundationToolbar||(this.selectedRadio.setAttribute("tabindex","0"),e.forEach(o=>{o!==this.selectedRadio&&o.setAttribute("tabindex","-1")}))):(this.focusedRadio=e[0],this.focusedRadio.setAttribute("tabindex","0"),e.forEach(o=>{o!==this.focusedRadio&&o.setAttribute("tabindex","-1")}))),!0},this.clickHandler=t=>{const e=t.target;if(e){const s=this.slottedRadioButtons;e.checked||s.indexOf(e)===0?(e.setAttribute("tabindex","0"),this.selectedRadio=e):(e.setAttribute("tabindex","-1"),this.selectedRadio=null),this.focusedRadio=e}t.preventDefault()},this.shouldMoveOffGroupToTheRight=(t,e,s)=>t===e.length&&this.isInsideToolbar&&s===Le,this.shouldMoveOffGroupToTheLeft=(t,e)=>(this.focusedRadio?t.indexOf(this.focusedRadio)-1:0)<0&&this.isInsideToolbar&&e===Ve,this.checkFocusedRadio=()=>{this.focusedRadio!==null&&!this.focusedRadio.readOnly&&!this.focusedRadio.checked&&(this.focusedRadio.checked=!0,this.focusedRadio.setAttribute("tabindex","0"),this.focusedRadio.focus(),this.selectedRadio=this.focusedRadio)},this.moveRight=t=>{const e=this.slottedRadioButtons;let s=0;if(s=this.focusedRadio?e.indexOf(this.focusedRadio)+1:1,this.shouldMoveOffGroupToTheRight(s,e,t.key)){this.moveRightOffGroup();return}else s===e.length&&(s=0);for(;s<e.length&&e.length>1;)if(e[s].disabled){if(this.focusedRadio&&s===e.indexOf(this.focusedRadio))break;if(s+1>=e.length){if(this.isInsideToolbar)break;s=0}else s+=1}else{this.moveToRadioByIndex(e,s);break}},this.moveLeft=t=>{const e=this.slottedRadioButtons;let s=0;if(s=this.focusedRadio?e.indexOf(this.focusedRadio)-1:0,s=s<0?e.length-1:s,this.shouldMoveOffGroupToTheLeft(e,t.key)){this.moveLeftOffGroup();return}for(;s>=0&&e.length>1;)if(e[s].disabled){if(this.focusedRadio&&s===e.indexOf(this.focusedRadio))break;s-1<0?s=e.length-1:s-=1}else{this.moveToRadioByIndex(e,s);break}},this.keydownHandler=t=>{const e=t.key;if(e in Gn&&this.isInsideFoundationToolbar)return!0;switch(e){case gr:{this.checkFocusedRadio();break}case Le:case Yi:{this.direction===O.ltr?this.moveRight(t):this.moveLeft(t);break}case Ve:case Xi:{this.direction===O.ltr?this.moveLeft(t):this.moveRight(t);break}default:return!0}}}readOnlyChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(t=>{this.readOnly?t.readOnly=!0:t.readOnly=!1})}disabledChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(t=>{this.disabled?t.disabled=!0:t.disabled=!1})}nameChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(t=>{t.setAttribute("name",this.name)})}valueChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(t=>{t.value===this.value&&(t.checked=!0,this.selectedRadio=t)}),this.$emit("change")}slottedRadioButtonsChanged(t,e){this.slottedRadioButtons&&this.slottedRadioButtons.length>0&&this.setupRadioButtons()}get parentToolbar(){return this.closest('[role="toolbar"]')}get isInsideToolbar(){var t;return(t=this.parentToolbar)!==null&&t!==void 0?t:!1}get isInsideFoundationToolbar(){var t;return!!(!((t=this.parentToolbar)===null||t===void 0)&&t.$fastController)}connectedCallback(){super.connectedCallback(),this.direction=pr(this),this.setupRadioButtons()}disconnectedCallback(){this.slottedRadioButtons.forEach(t=>{t.removeEventListener("change",this.radioChangeHandler)})}setupRadioButtons(){const t=this.slottedRadioButtons.filter(r=>r.hasAttribute("checked")),e=t?t.length:0;if(e>1){const r=t[e-1];r.checked=!0}let s=!1;if(this.slottedRadioButtons.forEach(r=>{this.name!==void 0&&r.setAttribute("name",this.name),this.disabled&&(r.disabled=!0),this.readOnly&&(r.readOnly=!0),this.value&&this.value===r.value?(this.selectedRadio=r,this.focusedRadio=r,r.checked=!0,r.setAttribute("tabindex","0"),s=!0):(this.isInsideFoundationToolbar||r.setAttribute("tabindex","-1"),r.checked=!1),r.addEventListener("change",this.radioChangeHandler)}),this.value===void 0&&this.slottedRadioButtons.length>0){const r=this.slottedRadioButtons.filter(o=>o.hasAttribute("checked")),n=r!==null?r.length:0;if(n>0&&!s){const o=r[n-1];o.checked=!0,this.focusedRadio=o,o.setAttribute("tabindex","0")}else this.slottedRadioButtons[0].setAttribute("tabindex","0"),this.focusedRadio=this.slottedRadioButtons[0]}}}m([y({attribute:"readonly",mode:"boolean"})],Rt.prototype,"readOnly",void 0);m([y({attribute:"disabled",mode:"boolean"})],Rt.prototype,"disabled",void 0);m([y],Rt.prototype,"name",void 0);m([y],Rt.prototype,"value",void 0);m([y],Rt.prototype,"orientation",void 0);m([$],Rt.prototype,"childItems",void 0);m([$],Rt.prototype,"slottedRadioButtons",void 0);const Ro=(i,t)=>lt`
    <template
        role="radio"
        class="${e=>e.checked?"checked":""} ${e=>e.readOnly?"readonly":""}"
        aria-checked="${e=>e.checked}"
        aria-required="${e=>e.required}"
        aria-disabled="${e=>e.disabled}"
        aria-readonly="${e=>e.readOnly}"
        @keypress="${(e,s)=>e.keypressHandler(s.event)}"
        @click="${(e,s)=>e.clickHandler(s.event)}"
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
            <slot ${qi("defaultSlottedNodes")}></slot>
        </label>
    </template>
`;class Eo extends ct{}class Fo extends Xn(Eo){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class Ue extends Fo{constructor(){super(),this.initialValue="on",this.keypressHandler=t=>{switch(t.key){case Un:!this.checked&&!this.readOnly&&(this.checked=!0);return}return!0},this.proxy.setAttribute("type","radio")}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}defaultCheckedChanged(){var t;this.$fastController.isConnected&&!this.dirtyChecked&&(this.isInsideRadioGroup()||(this.checked=(t=this.defaultChecked)!==null&&t!==void 0?t:!1,this.dirtyChecked=!1))}connectedCallback(){var t,e;super.connectedCallback(),this.validate(),((t=this.parentElement)===null||t===void 0?void 0:t.getAttribute("role"))!=="radiogroup"&&this.getAttribute("tabindex")===null&&(this.disabled||this.setAttribute("tabindex","0")),this.checkedAttribute&&(this.dirtyChecked||this.isInsideRadioGroup()||(this.checked=(e=this.defaultChecked)!==null&&e!==void 0?e:!1,this.dirtyChecked=!1))}isInsideRadioGroup(){return this.closest("[role=radiogroup]")!==null}clickHandler(t){!this.disabled&&!this.readOnly&&!this.checked&&(this.checked=!0)}}m([y({attribute:"readonly",mode:"boolean"})],Ue.prototype,"readOnly",void 0);m([$],Ue.prototype,"name",void 0);m([$],Ue.prototype,"defaultSlottedNodes",void 0);const Mo=(i,t)=>lt`
    <template
        aria-disabled="${e=>e.disabled}"
        class="${e=>e.sliderOrientation||H.horizontal}
            ${e=>e.disabled?"disabled":""}"
    >
        <div ${st("root")} part="root" class="root" style="${e=>e.positionStyle}">
            <div class="container">
                ${lr(e=>!e.hideMark,lt`
                        <div class="mark"></div>
                    `)}
                <div class="label">
                    <slot></slot>
                </div>
            </div>
        </div>
    </template>
`;function $i(i,t,e,s){let r=qn(0,1,(i-t)/(e-t));return s===O.rtl&&(r=1-r),r}const Te={min:0,max:0,direction:O.ltr,orientation:H.horizontal,disabled:!1};let vt=class extends ct{constructor(){super(...arguments),this.hideMark=!1,this.sliderDirection=O.ltr,this.getSliderConfiguration=()=>{if(!this.isSliderConfig(this.parentNode))this.sliderDirection=Te.direction||O.ltr,this.sliderOrientation=Te.orientation,this.sliderMaxPosition=Te.max,this.sliderMinPosition=Te.min;else{const t=this.parentNode,{min:e,max:s,direction:r,orientation:n,disabled:o}=t;o!==void 0&&(this.disabled=o),this.sliderDirection=r||O.ltr,this.sliderOrientation=n||H.horizontal,this.sliderMaxPosition=s,this.sliderMinPosition=e}},this.positionAsStyle=()=>{const t=this.sliderDirection?this.sliderDirection:O.ltr,e=$i(Number(this.position),Number(this.sliderMinPosition),Number(this.sliderMaxPosition));let s=Math.round((1-e)*100),r=Math.round(e*100);return Number.isNaN(r)&&Number.isNaN(s)&&(s=50,r=50),this.sliderOrientation===H.horizontal?t===O.rtl?`right: ${r}%; left: ${s}%;`:`left: ${r}%; right: ${s}%;`:`top: ${r}%; bottom: ${s}%;`}}positionChanged(){this.positionStyle=this.positionAsStyle()}sliderOrientationChanged(){}connectedCallback(){super.connectedCallback(),this.getSliderConfiguration(),this.positionStyle=this.positionAsStyle(),this.notifier=M.getNotifier(this.parentNode),this.notifier.subscribe(this,"orientation"),this.notifier.subscribe(this,"direction"),this.notifier.subscribe(this,"max"),this.notifier.subscribe(this,"min")}disconnectedCallback(){super.disconnectedCallback(),this.notifier.unsubscribe(this,"orientation"),this.notifier.unsubscribe(this,"direction"),this.notifier.unsubscribe(this,"max"),this.notifier.unsubscribe(this,"min")}handleChange(t,e){switch(e){case"direction":this.sliderDirection=t.direction;break;case"orientation":this.sliderOrientation=t.orientation;break;case"max":this.sliderMaxPosition=t.max;break;case"min":this.sliderMinPosition=t.min;break}this.positionStyle=this.positionAsStyle()}isSliderConfig(t){return t.max!==void 0&&t.min!==void 0}};m([$],vt.prototype,"positionStyle",void 0);m([y],vt.prototype,"position",void 0);m([y({attribute:"hide-mark",mode:"boolean"})],vt.prototype,"hideMark",void 0);m([y({attribute:"disabled",mode:"boolean"})],vt.prototype,"disabled",void 0);m([$],vt.prototype,"sliderOrientation",void 0);m([$],vt.prototype,"sliderMinPosition",void 0);m([$],vt.prototype,"sliderMaxPosition",void 0);m([$],vt.prototype,"sliderDirection",void 0);const Io=(i,t)=>lt`
    <template
        role="slider"
        class="${e=>e.readOnly?"readonly":""}
        ${e=>e.orientation||H.horizontal}"
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
            <div ${st("track")} part="track-container" class="track">
                <slot name="track"></slot>
                <div part="track-start" class="track-start" style="${e=>e.position}">
                    <slot name="track-start"></slot>
                </div>
            </div>
            <slot></slot>
            <div
                ${st("thumb")}
                part="thumb-container"
                class="thumb-container"
                style="${e=>e.position}"
            >
                <slot name="thumb">${t.thumb||""}</slot>
            </div>
        </div>
    </template>
`;class Vo extends ct{}class Lo extends Qi(Vo){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const Do={singleValue:"single-value"};class G extends Lo{constructor(){super(...arguments),this.direction=O.ltr,this.isDragging=!1,this.trackWidth=0,this.trackMinWidth=0,this.trackHeight=0,this.trackLeft=0,this.trackMinHeight=0,this.valueTextFormatter=()=>null,this.min=0,this.max=10,this.step=1,this.orientation=H.horizontal,this.mode=Do.singleValue,this.keypressHandler=t=>{if(!this.readOnly){if(t.key===Wn)t.preventDefault(),this.value=`${this.min}`;else if(t.key===Hn)t.preventDefault(),this.value=`${this.max}`;else if(!t.shiftKey)switch(t.key){case Le:case Xi:t.preventDefault(),this.increment();break;case Ve:case Yi:t.preventDefault(),this.decrement();break}}},this.setupTrackConstraints=()=>{const t=this.track.getBoundingClientRect();this.trackWidth=this.track.clientWidth,this.trackMinWidth=this.track.clientLeft,this.trackHeight=t.bottom,this.trackMinHeight=t.top,this.trackLeft=this.getBoundingClientRect().left,this.trackWidth===0&&(this.trackWidth=1)},this.setupListeners=(t=!1)=>{const e=`${t?"remove":"add"}EventListener`;this[e]("keydown",this.keypressHandler),this[e]("mousedown",this.handleMouseDown),this.thumb[e]("mousedown",this.handleThumbMouseDown,{passive:!0}),this.thumb[e]("touchstart",this.handleThumbMouseDown,{passive:!0}),t&&(this.handleMouseDown(null),this.handleThumbMouseDown(null))},this.initialValue="",this.handleThumbMouseDown=t=>{if(t){if(this.readOnly||this.disabled||t.defaultPrevented)return;t.target.focus()}const e=`${t!==null?"add":"remove"}EventListener`;window[e]("mouseup",this.handleWindowMouseUp),window[e]("mousemove",this.handleMouseMove,{passive:!0}),window[e]("touchmove",this.handleMouseMove,{passive:!0}),window[e]("touchend",this.handleWindowMouseUp),this.isDragging=t!==null},this.handleMouseMove=t=>{if(this.readOnly||this.disabled||t.defaultPrevented)return;const e=window.TouchEvent&&t instanceof TouchEvent?t.touches[0]:t,s=this.orientation===H.horizontal?e.pageX-document.documentElement.scrollLeft-this.trackLeft:e.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(s)}`},this.calculateNewValue=t=>{const e=$i(t,this.orientation===H.horizontal?this.trackMinWidth:this.trackMinHeight,this.orientation===H.horizontal?this.trackWidth:this.trackHeight,this.direction),s=(this.max-this.min)*e+this.min;return this.convertToConstrainedValue(s)},this.handleWindowMouseUp=t=>{this.stopDragging()},this.stopDragging=()=>{this.isDragging=!1,this.handleMouseDown(null),this.handleThumbMouseDown(null)},this.handleMouseDown=t=>{const e=`${t!==null?"add":"remove"}EventListener`;if((t===null||!this.disabled&&!this.readOnly)&&(window[e]("mouseup",this.handleWindowMouseUp),window.document[e]("mouseleave",this.handleWindowMouseUp),window[e]("mousemove",this.handleMouseMove),t)){t.preventDefault(),this.setupTrackConstraints(),t.target.focus();const s=this.orientation===H.horizontal?t.pageX-document.documentElement.scrollLeft-this.trackLeft:t.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(s)}`}},this.convertToConstrainedValue=t=>{isNaN(t)&&(t=this.min);let e=t-this.min;const s=Math.round(e/this.step),r=e-s*(this.stepMultiplier*this.step)/this.stepMultiplier;return e=r>=Number(this.step)/2?e-r+Number(this.step):e-r,e+this.min}}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}get valueAsNumber(){return parseFloat(super.value)}set valueAsNumber(t){this.value=t.toString()}valueChanged(t,e){super.valueChanged(t,e),this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction),this.$emit("change")}minChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.min=`${this.min}`),this.validate()}maxChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.max=`${this.max}`),this.validate()}stepChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.step=`${this.step}`),this.updateStepMultiplier(),this.validate()}orientationChanged(){this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type","range"),this.direction=pr(this),this.updateStepMultiplier(),this.setupTrackConstraints(),this.setupListeners(),this.setupDefaultValue(),this.setThumbPositionForOrientation(this.direction)}disconnectedCallback(){this.setupListeners(!0)}increment(){const t=this.direction!==O.rtl&&this.orientation!==H.vertical?Number(this.value)+Number(this.step):Number(this.value)-Number(this.step),e=this.convertToConstrainedValue(t),s=e<Number(this.max)?`${e}`:`${this.max}`;this.value=s}decrement(){const t=this.direction!==O.rtl&&this.orientation!==H.vertical?Number(this.value)-Number(this.step):Number(this.value)+Number(this.step),e=this.convertToConstrainedValue(t),s=e>Number(this.min)?`${e}`:`${this.min}`;this.value=s}setThumbPositionForOrientation(t){const s=(1-$i(Number(this.value),Number(this.min),Number(this.max),t))*100;this.orientation===H.horizontal?this.position=this.isDragging?`right: ${s}%; transition: none;`:`right: ${s}%; transition: all 0.2s ease;`:this.position=this.isDragging?`bottom: ${s}%; transition: none;`:`bottom: ${s}%; transition: all 0.2s ease;`}updateStepMultiplier(){const t=this.step+"",e=this.step%1?t.length-t.indexOf(".")-1:0;this.stepMultiplier=Math.pow(10,e)}get midpoint(){return`${this.convertToConstrainedValue((this.max+this.min)/2)}`}setupDefaultValue(){if(typeof this.value=="string")if(this.value.length===0)this.initialValue=this.midpoint;else{const t=parseFloat(this.value);!Number.isNaN(t)&&(t<this.min||t>this.max)&&(this.value=this.midpoint)}}}m([y({attribute:"readonly",mode:"boolean"})],G.prototype,"readOnly",void 0);m([$],G.prototype,"direction",void 0);m([$],G.prototype,"isDragging",void 0);m([$],G.prototype,"position",void 0);m([$],G.prototype,"trackWidth",void 0);m([$],G.prototype,"trackMinWidth",void 0);m([$],G.prototype,"trackHeight",void 0);m([$],G.prototype,"trackLeft",void 0);m([$],G.prototype,"trackMinHeight",void 0);m([$],G.prototype,"valueTextFormatter",void 0);m([y({converter:Ui})],G.prototype,"min",void 0);m([y({converter:Ui})],G.prototype,"max",void 0);m([y({converter:Ui})],G.prototype,"step",void 0);m([y],G.prototype,"orientation",void 0);m([y],G.prototype,"mode",void 0);class No{constructor(t){this.listenerCache=new WeakMap,this.query=t}bind(t){const{query:e}=this,s=this.constructListener(t);s.bind(e)(),e.addListener(s),this.listenerCache.set(t,s)}unbind(t){const e=this.listenerCache.get(t);e&&(this.query.removeListener(e),this.listenerCache.delete(t))}}class we extends No{constructor(t,e){super(t),this.styles=e}static with(t){return e=>new we(t,e)}constructListener(t){let e=!1;const s=this.styles;return function(){const{matches:n}=this;n&&!e?(t.$fastController.addStyles(s),e=n):!n&&e&&(t.$fastController.removeStyles(s),e=n)}}unbind(t){super.unbind(t),t.$fastController.removeStyles(this.styles)}}const Z=we.with(window.matchMedia("(forced-colors)"));we.with(window.matchMedia("(prefers-color-scheme: dark)"));we.with(window.matchMedia("(prefers-color-scheme: light)"));class Po{constructor(t,e,s){this.propertyName=t,this.value=e,this.styles=s}bind(t){M.getNotifier(t).subscribe(this,this.propertyName),this.handleChange(t,this.propertyName)}unbind(t){M.getNotifier(t).unsubscribe(this,this.propertyName),t.$fastController.removeStyles(this.styles)}handleChange(t,e){t[e]===this.value?t.$fastController.addStyles(this.styles):t.$fastController.removeStyles(this.styles)}}const Ne="not-allowed",Bo=":host([hidden]){display:none}";function xe(i){return`${Bo}:host{display:${i}}`}const T=jn()?"focus-visible":"focus";function yt(i,t,e){return isNaN(i)||i<=t?t:i>=e?e:i}function bi(i,t,e){return isNaN(i)||i<=t?0:i>=e?1:i/(e-t)}function Vt(i,t,e){return isNaN(i)?t:t+i*(e-t)}function Ls(i){return i*(Math.PI/180)}function Ao(i){return i*(180/Math.PI)}function Oo(i){const t=Math.round(yt(i,0,255)).toString(16);return t.length===1?"0"+t:t}function _(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:t+i*(e-t)}function Ji(i,t,e){if(i<=0)return t%360;if(i>=1)return e%360;const s=(t-e+360)%360,r=(e-t+360)%360;return s<=r?(t-s*i+360)%360:(t+s*i+360)%360}function P(i,t){const e=Math.pow(10,t);return Math.round(i*e)/e}class Dt{constructor(t,e,s){this.h=t,this.s=e,this.l=s}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.l)?new Dt(t.h,t.s,t.l):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.l===t.l}roundToPrecision(t){return new Dt(P(this.h,t),P(this.s,t),P(this.l,t))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class me{constructor(t,e,s){this.h=t,this.s=e,this.v=s}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.v)?new me(t.h,t.s,t.v):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.v===t.v}roundToPrecision(t){return new me(P(this.h,t),P(this.s,t),P(this.v,t))}toObject(){return{h:this.h,s:this.s,v:this.v}}}class A{constructor(t,e,s){this.l=t,this.a=e,this.b=s}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.a)&&!isNaN(t.b)?new A(t.l,t.a,t.b):null}equalValue(t){return this.l===t.l&&this.a===t.a&&this.b===t.b}roundToPrecision(t){return new A(P(this.l,t),P(this.a,t),P(this.b,t))}toObject(){return{l:this.l,a:this.a,b:this.b}}}A.epsilon=216/24389;A.kappa=24389/27;class zt{constructor(t,e,s){this.l=t,this.c=e,this.h=s}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.c)&&!isNaN(t.h)?new zt(t.l,t.c,t.h):null}equalValue(t){return this.l===t.l&&this.c===t.c&&this.h===t.h}roundToPrecision(t){return new zt(P(this.l,t),P(this.c,t),P(this.h,t))}toObject(){return{l:this.l,c:this.c,h:this.h}}}class V{constructor(t,e,s,r){this.r=t,this.g=e,this.b=s,this.a=typeof r=="number"&&!isNaN(r)?r:1}static fromObject(t){return t&&!isNaN(t.r)&&!isNaN(t.g)&&!isNaN(t.b)?new V(t.r,t.g,t.b,t.a):null}equalValue(t){return this.r===t.r&&this.g===t.g&&this.b===t.b&&this.a===t.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(Vt(this.r,0,255))},${Math.round(Vt(this.g,0,255))},${Math.round(Vt(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(Vt(this.r,0,255))},${Math.round(Vt(this.g,0,255))},${Math.round(Vt(this.b,0,255))},${yt(this.a,0,1)})`}roundToPrecision(t){return new V(P(this.r,t),P(this.g,t),P(this.b,t),P(this.a,t))}clamp(){return new V(yt(this.r,0,1),yt(this.g,0,1),yt(this.b,0,1),yt(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(t){return Oo(Vt(t,0,255))}}class J{constructor(t,e,s){this.x=t,this.y=e,this.z=s}static fromObject(t){return t&&!isNaN(t.x)&&!isNaN(t.y)&&!isNaN(t.z)?new J(t.x,t.y,t.z):null}equalValue(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}roundToPrecision(t){return new J(P(this.x,t),P(this.y,t),P(this.z,t))}toObject(){return{x:this.x,y:this.y,z:this.z}}}J.whitePoint=new J(.95047,1,1.08883);function Ri(i){return i.r*.2126+i.g*.7152+i.b*.0722}function Ei(i){function t(e){return e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4)}return Ri(new V(t(i.r),t(i.g),t(i.b),1))}const Ds=(i,t)=>(i+.05)/(t+.05);function Ns(i,t){const e=Ei(i),s=Ei(t);return e>s?Ds(e,s):Ds(s,e)}function be(i){const t=Math.max(i.r,i.g,i.b),e=Math.min(i.r,i.g,i.b),s=t-e;let r=0;s!==0&&(t===i.r?r=60*((i.g-i.b)/s%6):t===i.g?r=60*((i.b-i.r)/s+2):r=60*((i.r-i.g)/s+4)),r<0&&(r+=360);const n=(t+e)/2;let o=0;return s!==0&&(o=s/(1-Math.abs(2*n-1))),new Dt(r,o,n)}function Fi(i,t=1){const e=(1-Math.abs(2*i.l-1))*i.s,s=e*(1-Math.abs(i.h/60%2-1)),r=i.l-e/2;let n=0,o=0,a=0;return i.h<60?(n=e,o=s,a=0):i.h<120?(n=s,o=e,a=0):i.h<180?(n=0,o=e,a=s):i.h<240?(n=0,o=s,a=e):i.h<300?(n=s,o=0,a=e):i.h<360&&(n=e,o=0,a=s),new V(n+r,o+r,a+r,t)}function Ps(i){const t=Math.max(i.r,i.g,i.b),e=Math.min(i.r,i.g,i.b),s=t-e;let r=0;s!==0&&(t===i.r?r=60*((i.g-i.b)/s%6):t===i.g?r=60*((i.b-i.r)/s+2):r=60*((i.r-i.g)/s+4)),r<0&&(r+=360);let n=0;return t!==0&&(n=s/t),new me(r,n,t)}function jo(i,t=1){const e=i.s*i.v,s=e*(1-Math.abs(i.h/60%2-1)),r=i.v-e;let n=0,o=0,a=0;return i.h<60?(n=e,o=s,a=0):i.h<120?(n=s,o=e,a=0):i.h<180?(n=0,o=e,a=s):i.h<240?(n=0,o=s,a=e):i.h<300?(n=s,o=0,a=e):i.h<360&&(n=e,o=0,a=s),new V(n+r,o+r,a+r,t)}function zo(i){let t=0,e=0;return i.h!==0&&(t=Math.cos(Ls(i.h))*i.c,e=Math.sin(Ls(i.h))*i.c),new A(i.l,t,e)}function Wo(i){let t=0;(Math.abs(i.b)>.001||Math.abs(i.a)>.001)&&(t=Ao(Math.atan2(i.b,i.a))),t<0&&(t+=360);const e=Math.sqrt(i.a*i.a+i.b*i.b);return new zt(i.l,e,t)}function Ho(i){const t=(i.l+16)/116,e=t+i.a/500,s=t-i.b/200,r=Math.pow(e,3),n=Math.pow(t,3),o=Math.pow(s,3);let a=0;r>A.epsilon?a=r:a=(116*e-16)/A.kappa;let l=0;i.l>A.epsilon*A.kappa?l=n:l=i.l/A.kappa;let c=0;return o>A.epsilon?c=o:c=(116*s-16)/A.kappa,a=J.whitePoint.x*a,l=J.whitePoint.y*l,c=J.whitePoint.z*c,new J(a,l,c)}function Uo(i){function t(l){return l>A.epsilon?Math.pow(l,1/3):(A.kappa*l+16)/116}const e=t(i.x/J.whitePoint.x),s=t(i.y/J.whitePoint.y),r=t(i.z/J.whitePoint.z),n=116*s-16,o=500*(e-s),a=200*(s-r);return new A(n,o,a)}function Mi(i){function t(l){return l<=.04045?l/12.92:Math.pow((l+.055)/1.055,2.4)}const e=t(i.r),s=t(i.g),r=t(i.b),n=e*.4124564+s*.3575761+r*.1804375,o=e*.2126729+s*.7151522+r*.072175,a=e*.0193339+s*.119192+r*.9503041;return new J(n,o,a)}function xr(i,t=1){function e(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}const s=e(i.x*3.2404542-i.y*1.5371385-i.z*.4985314),r=e(i.x*-.969266+i.y*1.8760108+i.z*.041556),n=e(i.x*.0556434-i.y*.2040259+i.z*1.0572252);return new V(s,r,n,t)}function Ii(i){return Uo(Mi(i))}function Sr(i,t=1){return xr(Ho(i),t)}function Vi(i){return Wo(Ii(i))}function kr(i,t=1){return Sr(zo(i),t)}function Bs(i,t,e=18){const s=Vi(i);let r=s.c+t*e;return r<0&&(r=0),kr(new zt(s.l,r,s.h))}function vi(i,t){return i*t}function As(i,t){return new V(vi(i.r,t.r),vi(i.g,t.g),vi(i.b,t.b),1)}function yi(i,t){return i<.5?yt(2*t*i,0,1):yt(1-2*(1-t)*(1-i),0,1)}function Os(i,t){return new V(yi(i.r,t.r),yi(i.g,t.g),yi(i.b,t.b),1)}var js;(function(i){i[i.Burn=0]="Burn",i[i.Color=1]="Color",i[i.Darken=2]="Darken",i[i.Dodge=3]="Dodge",i[i.Lighten=4]="Lighten",i[i.Multiply=5]="Multiply",i[i.Overlay=6]="Overlay",i[i.Screen=7]="Screen"})(js||(js={}));function _o(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new V(_(i,t.r,e.r),_(i,t.g,e.g),_(i,t.b,e.b),_(i,t.a,e.a))}function Go(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new Dt(Ji(i,t.h,e.h),_(i,t.s,e.s),_(i,t.l,e.l))}function qo(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new me(Ji(i,t.h,e.h),_(i,t.s,e.s),_(i,t.v,e.v))}function Yo(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new J(_(i,t.x,e.x),_(i,t.y,e.y),_(i,t.z,e.z))}function Xo(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new A(_(i,t.l,e.l),_(i,t.a,e.a),_(i,t.b,e.b))}function Qo(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new zt(_(i,t.l,e.l),_(i,t.c,e.c),Ji(i,t.h,e.h))}var et;(function(i){i[i.RGB=0]="RGB",i[i.HSL=1]="HSL",i[i.HSV=2]="HSV",i[i.XYZ=3]="XYZ",i[i.LAB=4]="LAB",i[i.LCH=5]="LCH"})(et||(et={}));function ae(i,t,e,s){if(isNaN(i)||i<=0)return e;if(i>=1)return s;switch(t){case et.HSL:return Fi(Go(i,be(e),be(s)));case et.HSV:return jo(qo(i,Ps(e),Ps(s)));case et.XYZ:return xr(Yo(i,Mi(e),Mi(s)));case et.LAB:return Sr(Xo(i,Ii(e),Ii(s)));case et.LCH:return kr(Qo(i,Vi(e),Vi(s)));default:return _o(i,e,s)}}class ot{constructor(t){if(t==null||t.length===0)throw new Error("The stops argument must be non-empty");this.stops=this.sortColorScaleStops(t)}static createBalancedColorScale(t){if(t==null||t.length===0)throw new Error("The colors argument must be non-empty");const e=new Array(t.length);for(let s=0;s<t.length;s++)s===0?e[s]={color:t[s],position:0}:s===t.length-1?e[s]={color:t[s],position:1}:e[s]={color:t[s],position:s*(1/(t.length-1))};return new ot(e)}getColor(t,e=et.RGB){if(this.stops.length===1)return this.stops[0].color;if(t<=0)return this.stops[0].color;if(t>=1)return this.stops[this.stops.length-1].color;let s=0;for(let o=0;o<this.stops.length;o++)this.stops[o].position<=t&&(s=o);let r=s+1;r>=this.stops.length&&(r=this.stops.length-1);const n=(t-this.stops[s].position)*(1/(this.stops[r].position-this.stops[s].position));return ae(n,e,this.stops[s].color,this.stops[r].color)}trim(t,e,s=et.RGB){if(t<0||e>1||e<t)throw new Error("Invalid bounds");if(t===e)return new ot([{color:this.getColor(t,s),position:0}]);const r=[];for(let a=0;a<this.stops.length;a++)this.stops[a].position>=t&&this.stops[a].position<=e&&r.push(this.stops[a]);if(r.length===0)return new ot([{color:this.getColor(t),position:t},{color:this.getColor(e),position:e}]);r[0].position!==t&&r.unshift({color:this.getColor(t),position:t}),r[r.length-1].position!==e&&r.push({color:this.getColor(e),position:e});const n=e-t,o=new Array(r.length);for(let a=0;a<r.length;a++)o[a]={color:r[a].color,position:(r[a].position-t)/n};return new ot(o)}findNextColor(t,e,s=!1,r=et.RGB,n=.005,o=32){isNaN(t)||t<=0?t=0:t>=1&&(t=1);const a=this.getColor(t,r),l=s?0:1,c=this.getColor(l,r);if(Ns(a,c)<=e)return l;let h=s?0:t,d=s?t:0,b=l,p=0;for(;p<=o;){b=Math.abs(d-h)/2+h;const v=this.getColor(b,r),w=Ns(a,v);if(Math.abs(w-e)<=n)return b;w>e?s?h=b:d=b:s?d=b:h=b,p++}return b}clone(){const t=new Array(this.stops.length);for(let e=0;e<t.length;e++)t[e]={color:this.stops[e].color,position:this.stops[e].position};return new ot(t)}sortColorScaleStops(t){return t.sort((e,s)=>{const r=e.position,n=s.position;return r<n?-1:r>n?1:0})}}const Zo=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;function Ut(i){const t=Zo.exec(i);if(t===null)return null;let e=t[1];if(e.length===3){const r=e.charAt(0),n=e.charAt(1),o=e.charAt(2);e=r.concat(r,n,n,o,o)}const s=parseInt(e,16);return isNaN(s)?null:new V(bi((s&16711680)>>>16,0,255),bi((s&65280)>>>8,0,255),bi(s&255,0,255),1)}class $t{constructor(t){this.config=Object.assign({},$t.defaultPaletteConfig,t),this.palette=[],this.updatePaletteColors()}updatePaletteGenerationValues(t){let e=!1;for(const s in t)this.config[s]&&(this.config[s].equalValue?this.config[s].equalValue(t[s])||(this.config[s]=t[s],e=!0):t[s]!==this.config[s]&&(this.config[s]=t[s],e=!0));return e&&this.updatePaletteColors(),e}updatePaletteColors(){const t=this.generatePaletteColorScale();for(let e=0;e<this.config.steps;e++)this.palette[e]=t.getColor(e/(this.config.steps-1),this.config.interpolationMode)}generatePaletteColorScale(){const t=be(this.config.baseColor),s=new ot([{position:0,color:this.config.scaleColorLight},{position:.5,color:this.config.baseColor},{position:1,color:this.config.scaleColorDark}]).trim(this.config.clipLight,1-this.config.clipDark),r=s.getColor(0),n=s.getColor(1);let o=r,a=n;if(t.s>=this.config.saturationAdjustmentCutoff&&(o=Bs(o,this.config.saturationLight),a=Bs(a,this.config.saturationDark)),this.config.multiplyLight!==0){const l=As(this.config.baseColor,o);o=ae(this.config.multiplyLight,this.config.interpolationMode,o,l)}if(this.config.multiplyDark!==0){const l=As(this.config.baseColor,a);a=ae(this.config.multiplyDark,this.config.interpolationMode,a,l)}if(this.config.overlayLight!==0){const l=Os(this.config.baseColor,o);o=ae(this.config.overlayLight,this.config.interpolationMode,o,l)}if(this.config.overlayDark!==0){const l=Os(this.config.baseColor,a);a=ae(this.config.overlayDark,this.config.interpolationMode,a,l)}return this.config.baseScalePosition?this.config.baseScalePosition<=0?new ot([{position:0,color:this.config.baseColor},{position:1,color:a.clamp()}]):this.config.baseScalePosition>=1?new ot([{position:0,color:o.clamp()},{position:1,color:this.config.baseColor}]):new ot([{position:0,color:o.clamp()},{position:this.config.baseScalePosition,color:this.config.baseColor},{position:1,color:a.clamp()}]):new ot([{position:0,color:o.clamp()},{position:.5,color:this.config.baseColor},{position:1,color:a.clamp()}])}}$t.defaultPaletteConfig={baseColor:Ut("#808080"),steps:11,interpolationMode:et.RGB,scaleColorLight:new V(1,1,1,1),scaleColorDark:new V(0,0,0,1),clipLight:.185,clipDark:.16,saturationAdjustmentCutoff:.05,saturationLight:.35,saturationDark:1.25,overlayLight:0,overlayDark:.25,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};$t.greyscalePaletteConfig={baseColor:Ut("#808080"),steps:11,interpolationMode:et.RGB,scaleColorLight:new V(1,1,1,1),scaleColorDark:new V(0,0,0,1),clipLight:0,clipDark:0,saturationAdjustmentCutoff:0,saturationLight:0,saturationDark:0,overlayLight:0,overlayDark:0,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};$t.defaultPaletteConfig.scaleColorLight,$t.defaultPaletteConfig.scaleColorDark;class _e{constructor(t){this.palette=[],this.config=Object.assign({},_e.defaultPaletteConfig,t),this.regenPalettes()}regenPalettes(){let t=this.config.steps;(isNaN(t)||t<3)&&(t=3);const e=.14,s=.06,r=new V(e,e,e,1),n=94,a=new $t(Object.assign(Object.assign({},$t.greyscalePaletteConfig),{baseColor:r,baseScalePosition:(1-e)*100/n,steps:t})).palette,l=Ri(this.config.baseColor),c=be(this.config.baseColor).l,u=(l+c)/2,d=this.matchRelativeLuminanceIndex(u,a)/(t-1),p=this.matchRelativeLuminanceIndex(e,a)/(t-1),v=be(this.config.baseColor),w=Fi(Dt.fromObject({h:v.h,s:v.s,l:e})),R=Fi(Dt.fromObject({h:v.h,s:v.s,l:s})),F=new Array(5);F[0]={position:0,color:new V(1,1,1,1)},F[1]={position:d,color:this.config.baseColor},F[2]={position:p,color:w},F[3]={position:.99,color:R},F[4]={position:1,color:new V(0,0,0,1)};const Ft=new ot(F);this.palette=new Array(t);for(let Mt=0;Mt<t;Mt++){const kt=Ft.getColor(Mt/(t-1),et.RGB);this.palette[Mt]=kt}}matchRelativeLuminanceIndex(t,e){let s=Number.MAX_VALUE,r=0,n=0;const o=e.length;for(;n<o;n++){const a=Math.abs(Ri(e[n])-t);a<s&&(s=a,r=n)}return r}}_e.defaultPaletteConfig={baseColor:Ut("#808080"),steps:94};function Cr(i,t){const e=i.relativeLuminance>t.relativeLuminance?i:t,s=i.relativeLuminance>t.relativeLuminance?t:i;return(e.relativeLuminance+.05)/(s.relativeLuminance+.05)}const Et=Object.freeze({create(i,t,e){return new Pe(i,t,e)},from(i){return new Pe(i.r,i.g,i.b)}});function Jo(i){const t={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const e in t)if(typeof t[e]!=typeof i[e])return!1;return!0}class Pe extends V{constructor(t,e,s){super(t,e,s,1),this.toColorString=this.toStringHexRGB,this.contrast=Cr.bind(null,this),this.createCSS=this.toColorString,this.relativeLuminance=Ei(this)}static fromObject(t){return new Pe(t.r,t.g,t.b)}}function Li(i,t,e=0,s=i.length-1){if(s===e)return i[e];const r=Math.floor((s-e)/2)+e;return t(i[r])?Li(i,t,e,r):Li(i,t,r+1,s)}const Ko=(-.1+Math.sqrt(.21))/2;function ta(i){return i.relativeLuminance<=Ko}function Nt(i){return ta(i)?-1:1}function ea(i,t,e){return typeof i=="number"?Be.from(Et.create(i,t,e)):Be.from(i)}function ia(i){return Jo(i)?Ae.from(i):Ae.from(Et.create(i.r,i.g,i.b))}const Be=Object.freeze({create:ea,from:ia});class Ae{constructor(t,e){this.closestIndexCache=new Map,this.source=t,this.swatches=e,this.reversedSwatches=Object.freeze([...this.swatches].reverse()),this.lastIndex=this.swatches.length-1}colorContrast(t,e,s,r){s===void 0&&(s=this.closestIndexOf(t));let n=this.swatches;const o=this.lastIndex;let a=s;r===void 0&&(r=Nt(t));const l=c=>Cr(t,c)>=e;return r===-1&&(n=this.reversedSwatches,a=o-a),Li(n,l,a,o)}get(t){return this.swatches[t]||this.swatches[yt(t,0,this.lastIndex)]}closestIndexOf(t){if(this.closestIndexCache.has(t.relativeLuminance))return this.closestIndexCache.get(t.relativeLuminance);let e=this.swatches.indexOf(t);if(e!==-1)return this.closestIndexCache.set(t.relativeLuminance,e),e;const s=this.swatches.reduce((r,n)=>Math.abs(n.relativeLuminance-t.relativeLuminance)<Math.abs(r.relativeLuminance-t.relativeLuminance)?n:r);return e=this.swatches.indexOf(s),this.closestIndexCache.set(t.relativeLuminance,e),e}static from(t){return new Ae(t,Object.freeze(new _e({baseColor:V.fromObject(t)}).palette.map(e=>{const s=Ut(e.toStringHexRGB());return Et.create(s.r,s.g,s.b)})))}}function sa(i,t,e,s,r,n,o,a,l){const c=i.source,u=t.closestIndexOf(e),h=Math.max(o,a,l),d=u>=h?-1:1,p=i.closestIndexOf(c),v=p+d*-1*s,w=v+d*r,R=v+d*n;return{rest:i.get(v),hover:i.get(p),active:i.get(w),focus:i.get(R)}}function ra(i,t,e,s,r,n,o){const a=i.source,l=i.closestIndexOf(a),c=Nt(t),u=l+(c===1?Math.min(s,r):Math.max(c*s,c*r)),h=i.colorContrast(t,e,u,c),d=i.closestIndexOf(h),b=d+c*Math.abs(s-r),p=c===1?s<r:c*s>c*r;let v,w;return p?(v=d,w=b):(v=b,w=d),{rest:i.get(v),hover:i.get(w),active:i.get(v+c*n),focus:i.get(v+c*o)}}const zs=Et.create(1,1,1),na=Et.create(0,0,0),oa=Et.from(Ut("#808080")),aa=Et.from(Ut("#DA1A5F"));function la(i,t){return i.contrast(zs)>=t?zs:na}function ca(i,t,e,s,r,n){const o=i.closestIndexOf(t),a=Math.max(e,s,r,n),l=o>=a?-1:1;return{rest:i.get(o+l*e),hover:i.get(o+l*s),active:i.get(o+l*r),focus:i.get(o+l*n)}}function ha(i,t,e,s,r,n){const o=Nt(t),a=i.closestIndexOf(t);return{rest:i.get(a-o*e),hover:i.get(a-o*s),active:i.get(a-o*r),focus:i.get(a-o*n)}}function ua(i,t,e){const s=i.closestIndexOf(t);return i.get(s-(s<e?e*-1:e))}function da(i,t,e,s,r,n,o,a,l,c){const u=Math.max(e,s,r,n,o,a,l,c),h=i.closestIndexOf(t),d=h>=u?-1:1;return{rest:i.get(h+d*e),hover:i.get(h+d*s),active:i.get(h+d*r),focus:i.get(h+d*n)}}function fa(i,t,e,s,r,n){const o=Nt(t),a=i.closestIndexOf(i.colorContrast(t,4.5)),l=a+o*Math.abs(e-s),c=o===1?e<s:o*e>o*s;let u,h;return c?(u=a,h=l):(u=l,h=a),{rest:i.get(u),hover:i.get(h),active:i.get(u+o*r),focus:i.get(u+o*n)}}function ga(i,t){return i.colorContrast(t,3.5)}function pa(i,t,e){return i.colorContrast(e,3.5,i.closestIndexOf(i.source),Nt(t)*-1)}function ma(i,t){return i.colorContrast(t,14)}function ba(i,t){return i.colorContrast(t,4.5)}function Ge(i){return Et.create(i,i,i)}const va={LightMode:1,DarkMode:.23};function ya(i,t,e){return i.get(i.closestIndexOf(Ge(t))+e)}function wa(i,t,e){const s=i.closestIndexOf(Ge(t))-e;return i.get(s-e)}function xa(i,t){return i.get(i.closestIndexOf(Ge(t)))}function Ki(i,t,e,s,r,n){return Math.max(i.closestIndexOf(Ge(t))+e,s,r,n)}function Sa(i,t,e,s,r,n){return i.get(Ki(i,t,e,s,r,n))}function ka(i,t,e,s,r,n){return i.get(Ki(i,t,e,s,r,n)+e)}function Ca(i,t,e,s,r,n){return i.get(Ki(i,t,e,s,r,n)+e*2)}function Ta(i,t,e,s,r,n){const o=i.closestIndexOf(t),a=Nt(t),l=o+a*e,c=l+a*(s-e),u=l+a*(r-e),h=l+a*(n-e);return{rest:i.get(l),hover:i.get(c),active:i.get(u),focus:i.get(h)}}function $a(i,t,e){return i.get(i.closestIndexOf(t)+Nt(t)*e)}const{create:g}=He;function x(i){return He.create({name:i,cssCustomPropertyName:null})}const ts=g("body-font").withDefault('aktiv-grotesk, "Segoe UI", Arial, Helvetica, sans-serif'),Tr=g("base-height-multiplier").withDefault(10);g("base-horizontal-spacing-multiplier").withDefault(3);const _t=g("base-layer-luminance").withDefault(va.DarkMode),Ot=g("control-corner-radius").withDefault(4),es=g("density").withDefault(0),N=g("design-unit").withDefault(4),wi=g("direction").withDefault(O.ltr),qe=g("disabled-opacity").withDefault(.3),Y=g("stroke-width").withDefault(1),gt=g("focus-stroke-width").withDefault(2),$r=g("type-ramp-base-font-size").withDefault("14px"),Rr=g("type-ramp-base-line-height").withDefault("20px");g("type-ramp-minus-1-font-size").withDefault("12px");g("type-ramp-minus-1-line-height").withDefault("16px");g("type-ramp-minus-2-font-size").withDefault("10px");g("type-ramp-minus-2-line-height").withDefault("16px");g("type-ramp-plus-1-font-size").withDefault("16px");g("type-ramp-plus-1-line-height").withDefault("24px");g("type-ramp-plus-2-font-size").withDefault("20px");g("type-ramp-plus-2-line-height").withDefault("28px");g("type-ramp-plus-3-font-size").withDefault("28px");g("type-ramp-plus-3-line-height").withDefault("36px");g("type-ramp-plus-4-font-size").withDefault("34px");g("type-ramp-plus-4-line-height").withDefault("44px");g("type-ramp-plus-5-font-size").withDefault("46px");g("type-ramp-plus-5-line-height").withDefault("56px");g("type-ramp-plus-6-font-size").withDefault("60px");g("type-ramp-plus-6-line-height").withDefault("72px");x("accent-fill-rest-delta").withDefault(0);const Ra=x("accent-fill-hover-delta").withDefault(4),Ea=x("accent-fill-active-delta").withDefault(-5),Fa=x("accent-fill-focus-delta").withDefault(0),Ma=x("accent-foreground-rest-delta").withDefault(0),Ia=x("accent-foreground-hover-delta").withDefault(6),Va=x("accent-foreground-active-delta").withDefault(-4),La=x("accent-foreground-focus-delta").withDefault(0),Gt=x("neutral-fill-rest-delta").withDefault(7),qt=x("neutral-fill-hover-delta").withDefault(10),Yt=x("neutral-fill-active-delta").withDefault(5),Er=x("neutral-fill-focus-delta").withDefault(0),Da=x("neutral-fill-input-rest-delta").withDefault(0),Na=x("neutral-fill-input-hover-delta").withDefault(0),Pa=x("neutral-fill-input-active-delta").withDefault(0),Ba=x("neutral-fill-input-focus-delta").withDefault(0),Aa=x("neutral-fill-stealth-rest-delta").withDefault(0),Oa=x("neutral-fill-stealth-hover-delta").withDefault(5),ja=x("neutral-fill-stealth-active-delta").withDefault(3),za=x("neutral-fill-stealth-focus-delta").withDefault(0),Wa=x("neutral-fill-strong-rest-delta").withDefault(0),Ha=x("neutral-fill-strong-hover-delta").withDefault(8),Ua=x("neutral-fill-strong-active-delta").withDefault(-5),_a=x("neutral-fill-strong-focus-delta").withDefault(0),Xt=x("neutral-fill-layer-rest-delta").withDefault(3),Ga=x("neutral-stroke-rest-delta").withDefault(25),qa=x("neutral-stroke-hover-delta").withDefault(40),Ya=x("neutral-stroke-active-delta").withDefault(16),Xa=x("neutral-stroke-focus-delta").withDefault(25),Qa=x("neutral-stroke-divider-rest-delta").withDefault(8),Za=g("neutral-color").withDefault(oa),z=x("neutral-palette").withDefault(i=>Be.from(Za.getValueFor(i))),Ja=g("accent-color").withDefault(aa),is=x("accent-palette").withDefault(i=>Be.from(Ja.getValueFor(i))),Ka=x("neutral-layer-card-container-recipe").withDefault({evaluate:i=>ya(z.getValueFor(i),_t.getValueFor(i),Xt.getValueFor(i))});g("neutral-layer-card-container").withDefault(i=>Ka.getValueFor(i).evaluate(i));const tl=x("neutral-layer-floating-recipe").withDefault({evaluate:i=>wa(z.getValueFor(i),_t.getValueFor(i),Xt.getValueFor(i))});g("neutral-layer-floating").withDefault(i=>tl.getValueFor(i).evaluate(i));const el=x("neutral-layer-1-recipe").withDefault({evaluate:i=>xa(z.getValueFor(i),_t.getValueFor(i))}),il=g("neutral-layer-1").withDefault(i=>el.getValueFor(i).evaluate(i)),sl=x("neutral-layer-2-recipe").withDefault({evaluate:i=>Sa(z.getValueFor(i),_t.getValueFor(i),Xt.getValueFor(i),Gt.getValueFor(i),qt.getValueFor(i),Yt.getValueFor(i))});g("neutral-layer-2").withDefault(i=>sl.getValueFor(i).evaluate(i));const rl=x("neutral-layer-3-recipe").withDefault({evaluate:i=>ka(z.getValueFor(i),_t.getValueFor(i),Xt.getValueFor(i),Gt.getValueFor(i),qt.getValueFor(i),Yt.getValueFor(i))});g("neutral-layer-3").withDefault(i=>rl.getValueFor(i).evaluate(i));const nl=x("neutral-layer-4-recipe").withDefault({evaluate:i=>Ca(z.getValueFor(i),_t.getValueFor(i),Xt.getValueFor(i),Gt.getValueFor(i),qt.getValueFor(i),Yt.getValueFor(i))});g("neutral-layer-4").withDefault(i=>nl.getValueFor(i).evaluate(i));const j=g("fill-color").withDefault(i=>il.getValueFor(i));var ve;(function(i){i[i.normal=4.5]="normal",i[i.large=7]="large"})(ve||(ve={}));const Ye=g({name:"accent-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>sa(is.getValueFor(i),z.getValueFor(i),t||j.getValueFor(i),Ra.getValueFor(i),Ea.getValueFor(i),Fa.getValueFor(i),Gt.getValueFor(i),qt.getValueFor(i),Yt.getValueFor(i))}),St=g("accent-fill-rest").withDefault(i=>Ye.getValueFor(i).evaluate(i).rest),Wt=g("accent-fill-hover").withDefault(i=>Ye.getValueFor(i).evaluate(i).hover),Ht=g("accent-fill-active").withDefault(i=>Ye.getValueFor(i).evaluate(i).active),Fr=g("accent-fill-focus").withDefault(i=>Ye.getValueFor(i).evaluate(i).focus),Mr=i=>(t,e)=>la(e||St.getValueFor(t),i),Xe=x("foreground-on-accent-recipe").withDefault({evaluate:(i,t)=>Mr(ve.normal)(i,t)}),Di=g("foreground-on-accent-rest").withDefault(i=>Xe.getValueFor(i).evaluate(i,St.getValueFor(i))),Ni=g("foreground-on-accent-hover").withDefault(i=>Xe.getValueFor(i).evaluate(i,Wt.getValueFor(i))),Pi=g("foreground-on-accent-active").withDefault(i=>Xe.getValueFor(i).evaluate(i,Ht.getValueFor(i)));g("foreground-on-accent-focus").withDefault(i=>Xe.getValueFor(i).evaluate(i,Fr.getValueFor(i)));const Qe=x("foreground-on-accent-large-recipe").withDefault({evaluate:(i,t)=>Mr(ve.large)(i,t)});g("foreground-on-accent-rest-large").withDefault(i=>Qe.getValueFor(i).evaluate(i,St.getValueFor(i)));g("foreground-on-accent-hover-large").withDefault(i=>Qe.getValueFor(i).evaluate(i,Wt.getValueFor(i)));g("foreground-on-accent-active-large").withDefault(i=>Qe.getValueFor(i).evaluate(i,Ht.getValueFor(i)));g("foreground-on-accent-focus-large").withDefault(i=>Qe.getValueFor(i).evaluate(i,Fr.getValueFor(i)));const ol=i=>(t,e)=>ra(is.getValueFor(t),e||j.getValueFor(t),i,Ma.getValueFor(t),Ia.getValueFor(t),Va.getValueFor(t),La.getValueFor(t)),Ze=g({name:"accent-foreground-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>ol(ve.normal)(i,t)}),ye=g("accent-foreground-rest").withDefault(i=>Ze.getValueFor(i).evaluate(i).rest),Bi=g("accent-foreground-hover").withDefault(i=>Ze.getValueFor(i).evaluate(i).hover),Ai=g("accent-foreground-active").withDefault(i=>Ze.getValueFor(i).evaluate(i).active);g("accent-foreground-focus").withDefault(i=>Ze.getValueFor(i).evaluate(i).focus);const Je=g({name:"neutral-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>ca(z.getValueFor(i),t||j.getValueFor(i),Gt.getValueFor(i),qt.getValueFor(i),Yt.getValueFor(i),Er.getValueFor(i))}),Ir=g("neutral-fill-rest").withDefault(i=>Je.getValueFor(i).evaluate(i).rest),al=g("neutral-fill-hover").withDefault(i=>Je.getValueFor(i).evaluate(i).hover),ll=g("neutral-fill-active").withDefault(i=>Je.getValueFor(i).evaluate(i).active);g("neutral-fill-focus").withDefault(i=>Je.getValueFor(i).evaluate(i).focus);const Ke=g({name:"neutral-fill-input-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>ha(z.getValueFor(i),t||j.getValueFor(i),Da.getValueFor(i),Na.getValueFor(i),Pa.getValueFor(i),Ba.getValueFor(i))}),cl=g("neutral-fill-input-rest").withDefault(i=>Ke.getValueFor(i).evaluate(i).rest),hl=g("neutral-fill-input-hover").withDefault(i=>Ke.getValueFor(i).evaluate(i).hover),ul=g("neutral-fill-input-active").withDefault(i=>Ke.getValueFor(i).evaluate(i).active);g("neutral-fill-input-focus").withDefault(i=>Ke.getValueFor(i).evaluate(i).focus);const ti=g({name:"neutral-fill-stealth-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>da(z.getValueFor(i),t||j.getValueFor(i),Aa.getValueFor(i),Oa.getValueFor(i),ja.getValueFor(i),za.getValueFor(i),Gt.getValueFor(i),qt.getValueFor(i),Yt.getValueFor(i),Er.getValueFor(i))}),Vr=g("neutral-fill-stealth-rest").withDefault(i=>ti.getValueFor(i).evaluate(i).rest),dl=g("neutral-fill-stealth-hover").withDefault(i=>ti.getValueFor(i).evaluate(i).hover),fl=g("neutral-fill-stealth-active").withDefault(i=>ti.getValueFor(i).evaluate(i).active);g("neutral-fill-stealth-focus").withDefault(i=>ti.getValueFor(i).evaluate(i).focus);const ei=g({name:"neutral-fill-strong-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>fa(z.getValueFor(i),t||j.getValueFor(i),Wa.getValueFor(i),Ha.getValueFor(i),Ua.getValueFor(i),_a.getValueFor(i))});g("neutral-fill-strong-rest").withDefault(i=>ei.getValueFor(i).evaluate(i).rest);g("neutral-fill-strong-hover").withDefault(i=>ei.getValueFor(i).evaluate(i).hover);g("neutral-fill-strong-active").withDefault(i=>ei.getValueFor(i).evaluate(i).active);g("neutral-fill-strong-focus").withDefault(i=>ei.getValueFor(i).evaluate(i).focus);const gl=x("neutral-fill-layer-recipe").withDefault({evaluate:(i,t)=>ua(z.getValueFor(i),t||j.getValueFor(i),Xt.getValueFor(i))});g("neutral-fill-layer-rest").withDefault(i=>gl.getValueFor(i).evaluate(i));const pl=x("focus-stroke-outer-recipe").withDefault({evaluate:i=>ga(z.getValueFor(i),j.getValueFor(i))}),bt=g("focus-stroke-outer").withDefault(i=>pl.getValueFor(i).evaluate(i)),ml=x("focus-stroke-inner-recipe").withDefault({evaluate:i=>pa(is.getValueFor(i),j.getValueFor(i),bt.getValueFor(i))}),bl=g("focus-stroke-inner").withDefault(i=>ml.getValueFor(i).evaluate(i)),vl=x("neutral-foreground-hint-recipe").withDefault({evaluate:i=>ba(z.getValueFor(i),j.getValueFor(i))});g("neutral-foreground-hint").withDefault(i=>vl.getValueFor(i).evaluate(i));const yl=x("neutral-foreground-recipe").withDefault({evaluate:i=>ma(z.getValueFor(i),j.getValueFor(i))}),Ct=g("neutral-foreground-rest").withDefault(i=>yl.getValueFor(i).evaluate(i)),ii=g({name:"neutral-stroke-recipe",cssCustomPropertyName:null}).withDefault({evaluate:i=>Ta(z.getValueFor(i),j.getValueFor(i),Ga.getValueFor(i),qa.getValueFor(i),Ya.getValueFor(i),Xa.getValueFor(i))}),ss=g("neutral-stroke-rest").withDefault(i=>ii.getValueFor(i).evaluate(i).rest),Lr=g("neutral-stroke-hover").withDefault(i=>ii.getValueFor(i).evaluate(i).hover),wl=g("neutral-stroke-active").withDefault(i=>ii.getValueFor(i).evaluate(i).active);g("neutral-stroke-focus").withDefault(i=>ii.getValueFor(i).evaluate(i).focus);const xl=x("neutral-stroke-divider-recipe").withDefault({evaluate:(i,t)=>$a(z.getValueFor(i),t||j.getValueFor(i),Qa.getValueFor(i))});g("neutral-stroke-divider-rest").withDefault(i=>xl.getValueFor(i).evaluate(i));He.create({name:"height-number",cssCustomPropertyName:null}).withDefault(i=>(Tr.getValueFor(i)+es.getValueFor(i))*N.getValueFor(i));const xt=mn`(${Tr} + ${es}) * ${N}`,Sl="0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(.11 * (2 - var(--background-luminance, 1))))",kl="0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(.13 * (2 - var(--background-luminance, 1))))",Cl=`box-shadow: ${Sl}, ${kl};`,Tl=S`
    ${xe("inline-flex")} :host {
        font-family: ${ts};
        outline: none;
        font-size: ${$r};
        line-height: ${Rr};
        height: calc(${xt} * 1px);
        min-width: calc(${xt} * 1px);
        background-color: ${Ir};
        color: ${Ct};
        border-radius: calc(${Ot} * 1px);
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
        padding: 0 calc((10 + (${N} * 2 * ${es})) * 1px);
        white-space: nowrap;
        outline: none;
        text-decoration: none;
        border: calc(${Y} * 1px) solid transparent;
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
        background-color: ${al};
    }

    :host(:active) {
        background-color: ${ll};
    }

    .control:${T} {
        border-color: ${bt};
        box-shadow: 0 0 0 calc((${gt} - ${Y}) * 1px) ${bt} inset;
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
`.withBehaviors(Z(S`
            :host .control {
              background-color: ${f.ButtonFace};
              border-color: ${f.ButtonText};
              color: ${f.ButtonText};
              fill: currentColor;
            }

            :host(:hover) .control {
              forced-color-adjust: none;
              background-color: ${f.Highlight};
              color: ${f.HighlightText};
            }

            .control:${T} {
              forced-color-adjust: none;
              background-color: ${f.Highlight};
              border-color: ${f.ButtonText};
              box-shadow: 0 0 0 calc((${gt} - ${Y}) * 1px) ${f.ButtonText} inset;
              color: ${f.HighlightText};
            }

            .control:hover,
            :host([appearance="outline"]) .control:hover {
              border-color: ${f.ButtonText};
            }

            :host([href]) .control {
                border-color: ${f.LinkText};
                color: ${f.LinkText};
            }

            :host([href]) .control:hover,
            :host([href]) .control:${T}{
              forced-color-adjust: none;
              background: ${f.ButtonFace};
              border-color: ${f.LinkText};
              box-shadow: 0 0 0 1px ${f.LinkText} inset;
              color: ${f.LinkText};
              fill: currentColor;
            }
        `)),$l=S`
    :host([appearance="accent"]) {
        background: ${St};
        color: ${Di};
    }

    :host([appearance="accent"]:hover) {
        background: ${Wt};
        color: ${Ni};
    }

    :host([appearance="accent"]:active) .control:active {
        background: ${Ht};
        color: ${Pi};
    }

    :host([appearance="accent"]) .control:${T} {
        box-shadow: 0 0 0 calc((${gt} - ${Y}) * 1px) ${bt} inset,
            0 0 0 calc((${gt} + ${Y}) * 1px) ${bl} inset;
    }
`.withBehaviors(Z(S`
            :host([appearance="accent"]) .control {
                forced-color-adjust: none;
                background: ${f.Highlight};
                color: ${f.HighlightText};
            }

            :host([appearance="accent"]) .control:hover,
            :host([appearance="accent"]:active) .control:active {
                background: ${f.HighlightText};
                border-color: ${f.Highlight};
                color: ${f.Highlight};
            }

            :host([appearance="accent"]) .control:${T} {
                border-color: ${f.Highlight};
                box-shadow: 0 0 0 calc(${gt} * 1px) ${f.HighlightText} inset;
            }

            :host([appearance="accent"][href]) .control{
                background: ${f.LinkText};
                color: ${f.HighlightText};
            }

            :host([appearance="accent"][href]) .control:hover {
                background: ${f.ButtonFace};
                border-color: ${f.LinkText};
                box-shadow: none;
                color: ${f.LinkText};
                fill: currentColor;
            }

            :host([appearance="accent"][href]) .control:${T} {
                border-color: ${f.LinkText};
                box-shadow: 0 0 0 calc(${gt} * 1px) ${f.HighlightText} inset;
            }
        `));S`
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
        color: ${ye};
        border-bottom: calc(${Y} * 1px) solid ${ye};
    }

    :host([appearance="hypertext"]:hover),
    :host([appearance="hypertext"]) .control:hover {
        background: transparent;
        border-bottom-color: ${Bi};
    }

    :host([appearance="hypertext"]:active),
    :host([appearance="hypertext"]) .control:active {
        background: transparent;
        border-bottom-color: ${Ai};
    }

    :host([appearance="hypertext"]) .control:${T} {
        border-bottom: calc(${gt} * 1px) solid ${bt};
        margin-bottom: calc(calc(${Y} - ${gt}) * 1px);
    }
`.withBehaviors(Z(S`
            :host([appearance="hypertext"]:hover) {
                background-color: ${f.ButtonFace};
                color: ${f.ButtonText};
            }
            :host([appearance="hypertext"][href]) .control:hover,
            :host([appearance="hypertext"][href]) .control:active,
            :host([appearance="hypertext"][href]) .control:${T} {
                color: ${f.LinkText};
                border-bottom-color: ${f.LinkText};
                box-shadow: none;
            }
        `));const Rl=S`
    :host([appearance="lightweight"]) {
        background: transparent;
        color: ${ye};
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
        color: ${Bi};
    }

    :host([appearance="lightweight"]:active) {
        background: transparent;
        color: ${Ai};
    }

    :host([appearance="lightweight"]) .content {
        position: relative;
    }

    :host([appearance="lightweight"]) .content::before {
        content: "";
        display: block;
        height: calc(${Y} * 1px);
        position: absolute;
        top: calc(1em + 4px);
        width: 100%;
    }

    :host([appearance="lightweight"]:hover) .content::before {
        background: ${Bi};
    }

    :host([appearance="lightweight"]:active) .content::before {
        background: ${Ai};
    }

    :host([appearance="lightweight"]) .control:${T} .content::before {
        background: ${Ct};
        height: calc(${gt} * 1px);
    }
`.withBehaviors(Z(S`
            :host([appearance="lightweight"]) .control:hover,
            :host([appearance="lightweight"]) .control:${T} {
                forced-color-adjust: none;
                background: ${f.ButtonFace};
                color: ${f.Highlight};
            }
            :host([appearance="lightweight"]) .control:hover .content::before,
            :host([appearance="lightweight"]) .control:${T} .content::before {
                background: ${f.Highlight};
            }

            :host([appearance="lightweight"][href]) .control:hover,
            :host([appearance="lightweight"][href]) .control:${T} {
                background: ${f.ButtonFace};
                box-shadow: none;
                color: ${f.LinkText};
            }

            :host([appearance="lightweight"][href]) .control:hover .content::before,
            :host([appearance="lightweight"][href]) .control:${T} .content::before {
                background: ${f.LinkText};
            }
        `)),El=S`
    :host([appearance="outline"]) {
        background: transparent;
        border-color: ${St};
    }

    :host([appearance="outline"]:hover) {
        border-color: ${Wt};
    }

    :host([appearance="outline"]:active) {
        border-color: ${Ht};
    }

    :host([appearance="outline"]) .control {
        border-color: inherit;
    }

    :host([appearance="outline"]) .control:${T} {
        box-shadow: 0 0 0 calc((${gt} - ${Y}) * 1px) ${bt} inset;
        border-color: ${bt};
    }
`.withBehaviors(Z(S`
            :host([appearance="outline"]) .control {
                border-color: ${f.ButtonText};
            }
            :host([appearance="outline"]) .control:${T} {
              forced-color-adjust: none;
              background-color: ${f.Highlight};
              border-color: ${f.ButtonText};
              box-shadow: 0 0 0 calc((${gt} - ${Y}) * 1px) ${f.ButtonText} inset;
              color: ${f.HighlightText};
              fill: currentColor;
            }
            :host([appearance="outline"][href]) .control {
                background: ${f.ButtonFace};
                border-color: ${f.LinkText};
                color: ${f.LinkText};
                fill: currentColor;
            }
            :host([appearance="outline"][href]) .control:hover,
            :host([appearance="outline"][href]) .control:${T} {
              forced-color-adjust: none;
              border-color: ${f.LinkText};
              box-shadow: 0 0 0 1px ${f.LinkText} inset;
            }
        `)),Fl=S`
    :host([appearance="stealth"]) {
        background: ${Vr};
    }

    :host([appearance="stealth"]:hover) {
        background: ${dl};
    }

    :host([appearance="stealth"]:active) {
        background: ${fl};
    }
`.withBehaviors(Z(S`
            :host([appearance="stealth"]),
            :host([appearance="stealth"]) .control {
                forced-color-adjust: none;
                background: ${f.ButtonFace};
                border-color: transparent;
                color: ${f.ButtonText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:hover) .control {
                background: ${f.Highlight};
                border-color: ${f.Highlight};
                color: ${f.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:${T}) .control {
                background: ${f.Highlight};
                box-shadow: 0 0 0 1px ${f.Highlight};
                color: ${f.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]) .control {
                color: ${f.LinkText};
            }

            :host([appearance="stealth"][href]:hover) .control,
            :host([appearance="stealth"][href]:${T}) .control {
                background: ${f.LinkText};
                border-color: ${f.LinkText};
                color: ${f.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]:${T}) .control {
                forced-color-adjust: none;
                box-shadow: 0 0 0 1px ${f.LinkText};
            }
        `));class Ml{constructor(t,e){this.cache=new WeakMap,this.ltr=t,this.rtl=e}bind(t){this.attach(t)}unbind(t){const e=this.cache.get(t);e&&wi.unsubscribe(e)}attach(t){const e=this.cache.get(t)||new Il(this.ltr,this.rtl,t),s=wi.getValueFor(t);wi.subscribe(e),e.attach(s),this.cache.set(t,e)}}class Il{constructor(t,e,s){this.ltr=t,this.rtl=e,this.source=s,this.attached=null}handleChange({target:t,token:e}){this.attach(e.getValueFor(t))}attach(t){this.attached!==this[t]&&(this.attached!==null&&this.source.$fastController.removeStyles(this.attached),this.attached=this[t],this.attached!==null&&this.source.$fastController.addStyles(this.attached))}}function $e(i,t){return new Po("appearance",i,t)}const Vl=(i,t)=>S`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
            opacity: ${qe};
            background-color: ${Ir};
            cursor: ${Ne};
        }

        ${Tl}
    `.withBehaviors(Z(S`
                :host([disabled]),
                :host([disabled]) .control,
                :host([disabled]:hover),
                :host([disabled]:active) {
                    forced-color-adjust: none;
                    background-color: ${f.ButtonFace};
                    border-color: ${f.GrayText};
                    color: ${f.GrayText};
                    cursor: ${Ne};
                    opacity: 1;
                }
            `),$e("accent",S`
                :host([appearance="accent"][disabled]),
                :host([appearance="accent"][disabled]:hover),
                :host([appearance="accent"][disabled]:active) {
                    background: ${St};
                }

                ${$l}
            `.withBehaviors(Z(S`
                        :host([appearance="accent"][disabled]) .control,
                        :host([appearance="accent"][disabled]) .control:hover {
                            background: ${f.ButtonFace};
                            border-color: ${f.GrayText};
                            color: ${f.GrayText};
                        }
                    `))),$e("lightweight",S`
                :host([appearance="lightweight"][disabled]:hover),
                :host([appearance="lightweight"][disabled]:active) {
                    background-color: transparent;
                    color: ${ye};
                }

                :host([appearance="lightweight"][disabled]) .content::before,
                :host([appearance="lightweight"][disabled]:hover) .content::before,
                :host([appearance="lightweight"][disabled]:active) .content::before {
                    background: transparent;
                }

                ${Rl}
            `.withBehaviors(Z(S`
                        :host([appearance="lightweight"].disabled) .control {
                            forced-color-adjust: none;
                            color: ${f.GrayText};
                        }

                        :host([appearance="lightweight"].disabled)
                            .control:hover
                            .content::before {
                            background: none;
                        }
                    `))),$e("outline",S`
                :host([appearance="outline"][disabled]),
                :host([appearance="outline"][disabled]:hover),
                :host([appearance="outline"][disabled]:active) {
                    background: transparent;
                    border-color: ${St};
                }

                ${El}
            `.withBehaviors(Z(S`
                        :host([appearance="outline"][disabled]) .control {
                            border-color: ${f.GrayText};
                        }
                    `))),$e("stealth",S`
                :host([appearance="stealth"][disabled]),
                :host([appearance="stealth"][disabled]:hover),
                :host([appearance="stealth"][disabled]:active) {
                    background: ${Vr};
                }

                ${Fl}
            `.withBehaviors(Z(S`
                        :host([appearance="stealth"][disabled]) {
                            background: ${f.ButtonFace};
                        }

                        :host([appearance="stealth"][disabled]) .control {
                            background: ${f.ButtonFace};
                            border-color: transparent;
                            color: ${f.GrayText};
                        }
                    `))));class Dr extends ht{constructor(){super(...arguments),this.appearance="neutral"}defaultSlottedContentChanged(t,e){const s=this.defaultSlottedContent.filter(r=>r.nodeType===Node.ELEMENT_NODE);s.length===1&&s[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}m([y],Dr.prototype,"appearance",void 0);const Ll=Dr.compose({baseName:"button",baseClass:ht,template:Yn,styles:Vl,shadowOptions:{delegatesFocus:!0}}),Dl=(i,t)=>S`
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
        ${Cl}
        margin-top: auto;
        margin-bottom: auto;
        width: var(--dialog-width);
        height: var(--dialog-height);
        background-color: ${j};
        z-index: 1;
        border-radius: calc(${Ot} * 1px);
        border: calc(${Y} * 1px) solid transparent;
    }
`,Nl=at.compose({baseName:"dialog",template:uo,styles:Dl}),Pl=(i,t)=>S`
    ${xe("flex")} :host {
        align-items: flex-start;
        margin: calc(${N} * 1px) 0;
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
`,Bl=Rt.compose({baseName:"radio-group",template:$o,styles:Pl}),Al=(i,t)=>S`
        ${xe("inline-flex")} :host {
            --input-size: calc((${xt} / 2) + ${N});
            align-items: center;
            outline: none;
            margin: calc(${N} * 1px) 0;
            /* Chromium likes to select label text or the default slot when
                the radio is clicked. Maybe there is a better solution here? */
            user-select: none;
            position: relative;
            flex-direction: row;
            transition: all 0.2s ease-in-out;
        }

        .control {
            position: relative;
            width: calc((${xt} / 2 + ${N}) * 1px);
            height: calc((${xt} / 2 + ${N}) * 1px);
            box-sizing: border-box;
            border-radius: 999px;
            border: calc(${Y} * 1px) solid ${ss};
            background: ${cl};
            outline: none;
            cursor: pointer;
        }

        .label {
            font-family: ${ts};
            color: ${Ct};
            padding-inline-start: calc(${N} * 2px + 2px);
            margin-inline-end: calc(${N} * 2px + 2px);
            cursor: pointer;
            font-size: ${$r};
            line-height: ${Rr};
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
            background: ${Di};
            fill: ${Di};
            opacity: 0;
            pointer-events: none;
        }

        :host(:not([disabled])) .control:hover{
            background: ${hl};
            border-color: ${Lr};
        }

        :host(:not([disabled])) .control:active {
            background: ${ul};
            border-color: ${wl};
        }

        :host(:${T}) .control {
            box-shadow: 0 0 0 2px ${j}, 0 0 0 4px ${bt};
        }

        :host([aria-checked="true"]) .control {
            background: ${St};
            border: calc(${Y} * 1px) solid ${St};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover {
            background: ${Wt};
            border: calc(${Y} * 1px) solid ${Wt};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
            background: ${Ni};
            fill: ${Ni};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active {
            background: ${Ht};
            border: calc(${Y} * 1px) solid ${Ht};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
            background: ${Pi};
            fill: ${Pi};
        }

        :host([aria-checked="true"]:${T}:not([disabled])) .control {
            box-shadow: 0 0 0 2px ${j}, 0 0 0 4px ${bt};
        }

        :host([disabled]) .label,
        :host([readonly]) .label,
        :host([readonly]) .control,
        :host([disabled]) .control {
            cursor: ${Ne};
        }

        :host([aria-checked="true"]) .checked-indicator {
            opacity: 1;
        }

        :host([disabled]) {
            opacity: ${qe};
        }
    `.withBehaviors(Z(S`
            .control,
            :host([aria-checked="true"]:not([disabled])) .control {
                forced-color-adjust: none;
                border-color: ${f.FieldText};
                background: ${f.Field};
            }
            :host(:not([disabled])) .control:hover {
                border-color: ${f.Highlight};
                background: ${f.Field};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover,
            :host([aria-checked="true"]:not([disabled])) .control:active {
                border-color: ${f.Highlight};
                background: ${f.Highlight};
            }
            :host([aria-checked="true"]) .checked-indicator {
                background: ${f.Highlight};
                fill: ${f.Highlight};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator,
            :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
                background: ${f.HighlightText};
                fill: ${f.HighlightText};
            }
            :host(:${T}) .control {
                border-color: ${f.Highlight};
                box-shadow: 0 0 0 2px ${f.Field}, 0 0 0 4px ${f.FieldText};
            }
            :host([aria-checked="true"]:${T}:not([disabled])) .control {
                border-color: ${f.Highlight};
                box-shadow: 0 0 0 2px ${f.Field}, 0 0 0 4px ${f.FieldText};
            }
            :host([disabled]) {
                forced-color-adjust: none;
                opacity: 1;
            }
            :host([disabled]) .label {
                color: ${f.GrayText};
            }
            :host([disabled]) .control,
            :host([aria-checked="true"][disabled]) .control:hover, .control:active {
                background: ${f.Field};
                border-color: ${f.GrayText};
            }
            :host([disabled]) .checked-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .checked-indicator {
                fill: ${f.GrayText};
                background: ${f.GrayText};
            }
        `)),Ol=Ue.compose({baseName:"radio",template:Ro,styles:Al,checkedIndicator:`
        <div part="checked-indicator" class="checked-indicator"></div>
    `}),Ws=S`
    :host {
        align-self: start;
        grid-row: 2;
        margin-top: -2px;
        height: calc((${xt} / 2 + ${N}) * 1px);
        width: auto;
    }
    .container {
        grid-template-rows: auto auto;
        grid-template-columns: 0;
    }
    .label {
        margin: 2px 0;
    }
`,Hs=S`
    :host {
        justify-self: start;
        grid-column: 2;
        margin-left: 2px;
        height: auto;
        width: calc((${xt} / 2 + ${N}) * 1px);
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
        margin-left: calc((${N} / 2) * 3px);
        align-self: center;
    }
`,jl=(i,t)=>S`
        ${xe("block")} :host {
            font-family: ${ts};
            color: ${Ct};
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
            width: calc((${N} / 4) * 1px);
            height: calc(${xt} * 0.25 * 1px);
            background: ${ss};
            justify-self: center;
        }
        :host(.disabled) {
            opacity: ${qe};
        }
    `.withBehaviors(Z(S`
                .mark {
                    forced-color-adjust: none;
                    background: ${f.FieldText};
                }
                :host(.disabled) {
                    forced-color-adjust: none;
                    opacity: 1;
                }
                :host(.disabled) .label {
                    color: ${f.GrayText};
                }
                :host(.disabled) .mark {
                    background: ${f.GrayText};
                }
            `));class zl extends vt{sliderOrientationChanged(){this.sliderOrientation===H.horizontal?(this.$fastController.addStyles(Ws),this.$fastController.removeStyles(Hs)):(this.$fastController.addStyles(Hs),this.$fastController.removeStyles(Ws))}}const Wl=zl.compose({baseName:"slider-label",baseClass:vt,template:Mo,styles:jl}),Hl=S`
    .track-start {
        left: 0;
    }
`,Ul=S`
    .track-start {
        right: 0;
    }
`,_l=(i,t)=>S`
        :host([hidden]) {
            display: none;
        }

        ${xe("inline-grid")} :host {
            --thumb-size: calc(${xt} * 0.5 - ${N});
            --thumb-translate: calc(var(--thumb-size) * -0.5 + var(--track-width) / 2);
            --track-overhang: calc((${N} / 2) * -1);
            --track-width: ${N};
            --fast-slider-height: calc(var(--thumb-size) * 10);
            align-items: center;
            width: 100%;
            margin: calc(${N} * 1px) 0;
            user-select: none;
            box-sizing: border-box;
            border-radius: calc(${Ot} * 1px);
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

        :host(:${T}) .thumb-cursor {
            box-shadow: 0 0 0 2px ${j}, 0 0 0 4px ${bt};
        }

        .thumb-container {
            position: absolute;
            height: calc(var(--thumb-size) * 1px);
            width: calc(var(--thumb-size) * 1px);
            transition: all 0.2s ease;
            color: ${Ct};
            fill: currentcolor;
        }
        .thumb-cursor {
            border: none;
            width: calc(var(--thumb-size) * 1px);
            height: calc(var(--thumb-size) * 1px);
            background: ${Ct};
            border-radius: calc(${Ot} * 1px);
        }
        .thumb-cursor:hover {
            background: ${Ct};
            border-color: ${Lr};
        }
        .thumb-cursor:active {
            background: ${Ct};
        }
        .track-start {
            background: ${ye};
            position: absolute;
            height: 100%;
            left: 0;
            border-radius: calc(${Ot} * 1px);
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
            background: ${ss};
            position: absolute;
            border-radius: calc(${Ot} * 1px);
        }
        :host([orientation="vertical"]) {
            height: calc(var(--fast-slider-height) * 1px);
            min-height: calc(var(--thumb-size) * 1px);
            min-width: calc(${N} * 20px);
        }
        :host([orientation="vertical"]) .track-start {
            height: auto;
            width: 100%;
            top: 0;
        }
        :host([disabled]), :host([readonly]) {
            cursor: ${Ne};
        }
        :host([disabled]) {
            opacity: ${qe};
        }
    `.withBehaviors(new Ml(Hl,Ul),Z(S`
                .thumb-cursor {
                    forced-color-adjust: none;
                    border-color: ${f.FieldText};
                    background: ${f.FieldText};
                }
                .thumb-cursor:hover,
                .thumb-cursor:active {
                    background: ${f.Highlight};
                }
                .track {
                    forced-color-adjust: none;
                    background: ${f.FieldText};
                }
                :host(:${T}) .thumb-cursor {
                    border-color: ${f.Highlight};
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .track,
                :host([disabled]) .thumb-cursor {
                    forced-color-adjust: none;
                    background: ${f.GrayText};
                }

                :host(:${T}) .thumb-cursor {
                    background: ${f.Highlight};
                    border-color: ${f.Highlight};
                    box-shadow: 0 0 0 2px ${f.Field}, 0 0 0 4px ${f.FieldText};
                }
            `)),Gl=G.compose({baseName:"slider",template:Io,styles:_l,thumb:`
        <div class="thumb-cursor"></div>
    `});function ql(i){return br.getOrCreate(i).withPrefix("fast")}const rs=document.getElementById("raceTrackTitle"),ns=document.getElementById("graphTitle"),Yl=document.getElementById("infoDialogCloseButton"),Nr=document.getElementById("raceTrackCountry"),Pr=document.getElementById("graphCountry"),Br=document.getElementById("raceTrackDialog"),Ar=document.getElementById("graphDialog"),os=document.getElementById("infoDialog");function Xl(i){rs.className="enabled",ns.className="disabled",Nr.style.display="block",Pr.style.display="none",Br.style.display="block",Ar.style.display="none",Wr("raceTrack"),i&&os.show()}function Or(i){rs.className="disabled",ns.className="enabled",Nr.style.display="none",Pr.style.display="block",Br.style.display="none",Ar.style.display="block",Wr("graph"),i&&os.show()}function Ql(){os.hide()}rs.addEventListener("click",()=>Xl(!0));ns.addEventListener("click",()=>Or(!0));Yl.addEventListener("click",Ql);const jr=new Map;function zr(i,t,e){jr.set(i,{startFunc:t,stopFunc:e})}function Wr(i){const t=jr.get(i);t&&t.startFunc()}var it=(i=>(i[i.radius=0]="radius",i[i.color=1]="color",i[i.gray=2]="gray",i[i.red=3]="red",i[i.dot=4]="dot",i))(it||{}),W=(i=>(i[i.manufacturingShare=0]="manufacturingShare",i[i.priceIndex=1]="priceIndex",i[i.nominalWage=2]="nominalWage",i[i.realWage=3]="realWage",i[i.avgRealWage=4]="avgRealWage",i))(W||{});const se=i=>i.target.value,re=i=>{switch(i){case"radius":return it.radius;case"color":return it.color;case"gray":return it.gray;case"red":return it.red;case"dot":return it.dot;default:return}};function ne(i,t){for(const e of[W.manufacturingShare,W.priceIndex,W.nominalWage,W.realWage,W.avgRealWage])if(i.get(e)==t)return e}class Zl{model;manufacturingShareVisualizer;priceIndexVisualizer;nominalWageVisualizer;realWageVisualizer;avgRealWageVisualizer;priceIndexLabel;nominalWageLabel;realWageLabel;avgRealWageLabel;constructor(){this.manufacturingShareVisualizer=document.getElementById("mshareVisualizer"),this.priceIndexVisualizer=document.getElementById("priceIndexVisualizer"),this.nominalWageVisualizer=document.getElementById("nominalWageVisualizer"),this.realWageVisualizer=document.getElementById("realWageVisualizer"),this.avgRealWageVisualizer=document.getElementById("avgRealWageVisualizer"),this.priceIndexLabel=document.getElementById("priceIndexLabel"),this.nominalWageLabel=document.getElementById("nominalWageLabel"),this.realWageLabel=document.getElementById("realWageLabel"),this.avgRealWageLabel=document.getElementById("avgRealWageLabel"),this.manufacturingShareVisualizer.value="radius",this.priceIndexVisualizer.value="gray",this.nominalWageVisualizer.value="",this.realWageVisualizer.value="",this.avgRealWageVisualizer.value="",this.manufacturingShareVisualizer.addEventListener("change",t=>{const e=se(t);this.changeAvgRealWageVisualizer(e)}),this.priceIndexVisualizer.addEventListener("change",t=>{const e=se(t);this.changePriceIndexVisualizer(e)}),this.nominalWageVisualizer.addEventListener("change",t=>{const e=se(t);this.changeNominalWageVisualizer(e)}),this.realWageVisualizer.addEventListener("change",t=>{const e=se(t);this.changeRealWageVisualizer(e)}),this.avgRealWageVisualizer.addEventListener("change",t=>{const e=se(t);this.changeAvgRealWageVisualizer(e)})}changeManufacturingShareVisualizer(t){const e=re(t);this.model.bindings.set(W.manufacturingShare,e),this.priceIndexLabel.style.textDecoration=this.priceIndexVisualizer.value==t?"line-through":"",this.nominalWageLabel.style.textDecoration=this.nominalWageVisualizer.value==t?"line-through":"",this.realWageLabel.style.textDecoration=this.realWageVisualizer.value==t?"line-through":"",this.avgRealWageLabel.style.textDecoration=this.avgRealWageVisualizer.value==t?"line-through":"",this.model.updateTime()}changePriceIndexVisualizer(t){const e=re(t);this.model.bindings.set(W.priceIndex,e),this.priceIndexLabel.style.textDecoration=this.manufacturingShareVisualizer.value==t?"line-through":"",this.nominalWageLabel.style.textDecoration=this.nominalWageVisualizer.value==t?"line-through":"",this.realWageLabel.style.textDecoration=this.realWageVisualizer.value==t?"line-through":"",this.avgRealWageLabel.style.textDecoration=this.avgRealWageVisualizer.value==t?"line-through":"",this.model.updateTime()}changeNominalWageVisualizer(t){const e=re(t);this.model.bindings.set(W.nominalWage,e),this.nominalWageLabel.style.textDecoration=this.manufacturingShareVisualizer.value==t||this.priceIndexVisualizer.value==t?"line-through":"",this.realWageLabel.style.textDecoration=this.realWageVisualizer.value==t?"line-through":"",this.avgRealWageLabel.style.textDecoration=this.avgRealWageVisualizer.value==t?"line-through":"",this.model.updateTime()}changeRealWageVisualizer(t){const e=re(t);this.model.bindings.set(W.realWage,e),this.realWageLabel.style.textDecoration=this.manufacturingShareVisualizer.value==t||this.priceIndexVisualizer.value==t||this.nominalWageVisualizer.value==t?"line-through":"",this.avgRealWageLabel.style.textDecoration=this.avgRealWageVisualizer.value==t?"line-through":"",this.model.updateTime()}changeAvgRealWageVisualizer(t){const e=re(t);this.model.bindings.set(W.avgRealWage,e),this.avgRealWageLabel.style.textDecoration=this.manufacturingShareVisualizer.value==t||this.priceIndexVisualizer.value==t||this.nominalWageVisualizer.value==t||this.realWageVisualizer.value==t?"line-through":"",this.model.updateTime()}setModel(t){this.model=t,t.bindings.set(W.manufacturingShare,it.radius),t.bindings.set(W.priceIndex,it.gray),t.bindings.set(W.nominalWage,void 0),t.bindings.set(W.realWage,void 0),t.bindings.set(W.avgRealWage,void 0)}}var ft=(i=>(i[i.passThrough=0]="passThrough",i[i.priceIndex=1]="priceIndex",i[i.ratioToMax=2]="ratioToMax",i[i.multiply100aroundOne=3]="multiply100aroundOne",i[i.multiply1000aroundOne=4]="multiply1000aroundOne",i))(ft||{});function Jl(i){return[{mapper:t=>t.manufacturingShare,type:ft.ratioToMax},{mapper:t=>t.priceIndex,type:ft.multiply100aroundOne},{mapper:t=>t.nominalWage,type:ft.multiply1000aroundOne},{mapper:t=>t.realWage,type:ft.multiply1000aroundOne},{mapper:t=>i.country.avgRealWage,type:ft.multiply1000aroundOne}]}const Us=40,_s=40,oe=320;class Kl{canvas;model;prevSegment=-1;mappers;constructor(){this.canvas=document.getElementById("raceTrackCountryCanvas"),this.canvas.addEventListener("mousemove",t=>this.onMouseMove(t)),this.canvas.addEventListener("mouseenter",t=>this.onMouseMove(t)),this.canvas.addEventListener("mouseleave",t=>this.onMouseMove(t)),this.canvas.addEventListener("mouseover",t=>this.onMouseMove(t))}setModel(t){this.model=t,this.mappers=Jl(t)}onMouseMove(t){if(!this.canvas||!this.model)return;const e=this.canvas.getBoundingClientRect(),s=this.canvas.width/e.width,r=this.canvas.height/e.height,n=(t.clientX-e.left)*s,o=(t.clientY-e.top)*r,a=n-Us-oe/2,l=o-_s-oe/2,c=Math.sqrt(a*a+l*l);if(c<oe/2-30||oe/2+30<c){this.model.setFocusedRegionIndex(-1),this.prevSegment=-1,this.model.notifyFocusRegion();return}const h=((d,b,p)=>{const v=Math.atan2(b,d),w=2*Math.PI/p,R=(v+2*Math.PI+w/2)%(2*Math.PI);return Math.floor(R/w)})(a,l,this.model.country.regions.length);this.prevSegment!=h&&(this.model.setFocusedRegionIndex(h),this.model.notifyFocusRegion(),this.prevSegment=h)}draw(){if(!this.model||!this.mappers)throw new Error;const t=14,e=.5,s=this.model.country.regions.length,r=this.canvas.getContext("2d");if(!r)return;r.clearRect(0,0,this.canvas.width,this.canvas.height);const n=this.mappers.map(p=>this.model.country.regions.map(p.mapper).reduce((v,w)=>w>v?w:v,0)),o=(p,v,w,R)=>{const F=p.mapper(w);switch(v){case ft.passThrough:return F;case ft.priceIndex:return Math.max(0,F-1);case ft.ratioToMax:return F/R;case ft.multiply1000aroundOne:return(F-1)*1e3;case ft.multiply100aroundOne:return(F-1)*100;default:return 0}},a=this.model.country.regions.map(p=>this.mappers.map((v,w)=>o(v,v.type,p,n[w]))),l=oe/2,c={x:l+Us,y:l+_s},u=2*Math.PI/s;this.drawBaseCircle(r,c,l),this.drawVertexCitiesAndLabels(s,u,r,c,l,this.model,t,e,a);const h=ne(this.model.bindings,it.gray),d=ne(this.model.bindings,it.red),b=ne(this.model.bindings,it.dot);this.drawPolygon(r,s,u,l,c,h,a,"rgb(0,0,0,0.3)"),this.drawPolygon(r,s,u,l,c,d,a,"rgb(255,0,0,0.5)"),r.setLineDash([4,8]),this.drawPolygon(r,s,u,l,c,b,a,"rgb(255,0,0,0.5)"),r.setLineDash([]),this.drawRegionState(this.model,r,c)}drawCircle(t,e,s,r,n,o){t.strokeStyle="",o&&(t.beginPath(),t.fillStyle="rgb(255, 255, 0, 0.5)",t.arc(e,s,40,0,2*Math.PI),t.fill(),t.closePath()),t.beginPath(),t.fillStyle=`rgb(255, 0, 0, ${n})`,t.arc(e,s,Math.max(0,r),0,2*Math.PI),t.fill(),t.closePath()}drawVertexRegion(t,e,s,r,n,o,a,l,c,u){const h=e.x+s*Math.cos(r),d=e.y+s*Math.sin(r),b=n!=null?a*c[n]:a,p=o!=null?c[o]:l;(n!=null||o!=null)&&this.drawCircle(t,h,d,b,p,u)}drawRegionLabel(t,e,s,r,n){(r<21||r<101&&n%5==0||101<r&&n%50==0)&&(t.fillStyle="rgb(5, 5, 5, .5)",t.fillText(`${n}`,e,s+3))}drawVertexCitiesAndLabels(t,e,s,r,n,o,a,l,c){const u=ne(o.bindings,it.radius),h=ne(o.bindings,it.color);for(let d=0;d<t;d++){const b=d*e;this.drawVertexRegion(s,r,n,b,u,h,a,l,c[d],d===o.focusedRegionIndex);const p=30,v=7,w=r.x+(n+p)*Math.cos(b)-v,R=r.y+(n+p)*Math.sin(b);this.drawRegionLabel(s,w,R,t,d)}}drawRegionState(t,e,s){if(t.focusedRegionIndex>=0){const o=t.country.regions[t.focusedRegionIndex];e.fillStyle="black";const a=o.realWage>t.country.avgRealWage?"↑":o.realWage<t.country.avgRealWage?"↓":"";["Region #"+o.id," Share of manufacturing = "+o.manufacturingShare.toFixed(4)," Share of agriculture = "+o.agricultureShare.toFixed(4)," Price index = "+o.priceIndex.toFixed(4)," Income = "+o.income.toFixed(4)," Nominal wage = "+o.nominalWage.toFixed(4)," Real wage = "+o.realWage.toFixed(4)+" "+a," Average real wage = "+t.country.avgRealWage.toFixed(4)].forEach((l,c)=>{e.fillText(l,s.x+-80,s.y+-60+c*15)})}}drawBaseCircle(t,e,s){if(!this.model)return;const r=this.model.focusedRouteIndex,n=2*Math.PI/this.model.country.regions.length;if(r!=null){const o=r[0]<r[1]?[r[0],r[1]]:[r[1],r[0]];if(this.model.focusedRouteSource!="adjacencyMatrix"||this.model.focusedRouteSource=="adjacencyMatrix"&&o[1]-o[0]==1||o[1]-o[0]==this.model.country.regions.length-1)if(o[1]-o[0]<this.model.country.regions.length/2){t.strokeStyle="rgb(0, 0, 0, 0.1)",t.beginPath(),t.lineWidth=1,t.arc(e.x,e.y,s,0,n*o[0]),t.stroke(),t.beginPath(),t.strokeStyle="rgb(255, 255, 0)",t.lineWidth=15,t.arc(e.x,e.y,s,n*o[0],n*o[1]),t.stroke(),t.beginPath(),t.strokeStyle="rgb(0, 0, 0, 0.1)",t.lineWidth=1,t.arc(e.x,e.y,s,n*o[1],2*Math.PI),t.stroke();return}else{t.strokeStyle="rgb(255, 255, 0)",t.beginPath(),t.lineWidth=15,t.arc(e.x,e.y,s,0,n*o[0]),t.stroke(),t.beginPath(),t.strokeStyle="rgb(0, 0, 0, 0.1)",t.lineWidth=1,t.arc(e.x,e.y,s,n*o[0],n*o[1]),t.stroke(),t.beginPath(),t.strokeStyle="rgb(255, 255, 0)",t.lineWidth=15,t.arc(e.x,e.y,s,n*o[1],2*Math.PI),t.stroke(),t.lineWidth=1;return}}t.beginPath(),t.strokeStyle="rgb(0, 0, 0, 0.1)",t.arc(e.x,e.y,s,0,2*Math.PI),t.stroke()}drawPolygon(t,e,s,r,n,o,a,l){t.beginPath(),t.strokeStyle=l;for(let c=0;c<e;c++){const u=c*s;if(o!=null){const h=r+a[c][o],d=n.x+h*Math.cos(u),b=n.y+h*Math.sin(u);c==0&&t.moveTo(d,b),t.lineTo(d,b)}}t.closePath(),t.stroke()}}class tc{country;constructor(t){this.country=t}createAdjacencyMatrix(){const t=this.country.regions.length,e=new Array(t);for(let s=0;s<t;s++)e[s]=new Array(t);if(t==0)return[];e[0].fill(Number.POSITIVE_INFINITY),e[0][0]=0;for(let s=1;s<t;s++)e[s].fill(Number.POSITIVE_INFINITY),e[s][s]=0,e[s-1][s]=1,e[s][s-1]=1;return e[t-1][0]=1,e[0][t-1]=1,e}async createDistanceMatrix(){const t=this.country.regions.length,e=new Array(t),s=new Array(t);for(let r=0;r<t;r++){e[r]=new Array(t),s[r]=new Array(t);for(let n=0;n<t;n++)if(r===n)e[r][n]=0,s[r][n]=r;else{const o=Math.abs(n-r),a=t-o;e[r][n]=Math.min(o,a),s[r][n]=o<a?r+1:r-1,s[r][n]=s[r][n]==-1?t-1:s[r][n]==t?0:s[r][n]}}return[e,s]}createTransportCostMatrix(){const t=this.country.regions.length,e=new Array(t);for(let r=0;r<t;r++)e[r]=new Array(t);const s=Math.log(this.country.transportCost);for(let r=0;r<t;r++)for(let n=r;n<t;n++){const o=2*this.country.matrices.distanceMatrix[r][n]/t;e[r][n]=e[n][r]=Math.exp(s*o)}return e}}var de=(i=>(i[i.FloydWarshall=0]="FloydWarshall",i[i.FloydWarshallGPU=1]="FloydWarshallGPU",i[i.Johnson=2]="Johnson",i))(de||{});const mt=16,ec=`
struct Distances {
    data: array<f32>
};

@group(0) @binding(0) var<storage, read> adjMatrix: Distances;
@group(0) @binding(1) var<storage, read_write> distances: Distances;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>, @builtin(num_workgroups) num_groups: vec3<u32>) {
    let totalSize = num_groups.x * ${mt};

    let bxi = global_id.x * ${mt};
    let byj = global_id.y * ${mt};
    let bz = global_id.z;

    for (var k = 0u; k < ${mt}; k++) {
        for (var i = 0u; i < ${mt} && bxi + i < totalSize; i++) {
            for (var j = 0u; j < ${mt} && byj + j < totalSize; j++) {
                let ik = (bxi + i) * totalSize + byj + k + bz * ${mt};
                let kj = (bxi + k + bz * ${mt}) * totalSize + byj + j;
                let ij = (bxi + i) * totalSize + byj + j;

                let ikj = adjMatrix.data[ik] + adjMatrix.data[kj];
                if (ikj < adjMatrix.data[ij]) {
                    distances.data[ij] = ikj;
                }
            }
        }
    }
}
`;class ic{device;pipeline;bindGroup;bindGroupLayout;constructor(){}async computeShortestPaths(t,e){const s=new Float32Array(e*e);t.forEach((l,c)=>{s.set(l,c*e)});const[r,n]=await this.computeShortestPathsF32(s,e),o=new Array(e);for(let l=0;l<e;l++)o[l]=Array.of(r.slice(l*e,l*e+e-1));const a=new Array(e);for(let l=0;l<e;l++)a[l]=Array.of(n.slice(l*e,l*e+e-1));return[o,a]}async computeShortestPathsF32(t,e){if(await this.initialize(),!this.device||!this.pipeline||!this.bindGroupLayout)throw new Error(`WebGPU is not available device=${!!this.device}, pipeline=${this.pipeline} bindGroupLayout=${!!this.bindGroupLayout}`);const s=e*e*4,r=this.device.createBuffer({size:s,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC,mappedAtCreation:!0}),n=this.device.createBuffer({size:s,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ,mappedAtCreation:!0}),o=this.device.createBuffer({size:s,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ,mappedAtCreation:!0}),a=this.device.createCommandEncoder();a.copyBufferToBuffer(r,0,n,0,s),a.copyBufferToBuffer(r,0,o,1,s);const l=a.finish();this.device.queue.submit([l]),await n.mapAsync(GPUMapMode.READ),n.getMappedRange(),new Float32Array(n.getMappedRange()).set(t),n.unmap(),await o.mapAsync(GPUMapMode.READ),o.getMappedRange(),new Int32Array(o.getMappedRange()).fill(0),o.unmap(),this.bindGroup=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:r}}]});const c=Math.ceil(e/mt);this.dispatchShader(c,c,e);const u=e%mt;u&&(this.dispatchShader(c,u,e),this.dispatchShader(u,c,e),this.dispatchShader(u,u,e));const h=new Float32Array(e*e);await n.mapAsync(GPUMapMode.READ),h.set(new Float32Array(n.getMappedRange())),n.unmap();const d=new Int32Array(e*e);return await o.mapAsync(GPUMapMode.READ),d.set(new Float32Array(o.getMappedRange())),o.unmap(),[h,d]}async initialize(){const t=await navigator.gpu.requestAdapter();if(!t)throw new Error("GPU is not available");this.device||(this.device=await t.requestDevice(),this.bindGroupLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),this.pipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.bindGroupLayout]}),compute:{module:this.device.createShaderModule({code:ec}),entryPoint:"main"}}))}dispatchShader(t,e,s){if(!this.device||!this.pipeline||!this.bindGroupLayout||!this.bindGroup)throw new Error("WebGPU is not available");const r=this.device.createCommandEncoder(),n=r.beginComputePass();n.setPipeline(this.pipeline),n.setBindGroup(0,this.bindGroup),n.dispatchWorkgroups(t,e,s),n.end();const o=r.finish();this.device.queue.submit([o])}}const Bt=16;class sc{computeShortestPaths(t){const e=t.length,s=new Array(e),r=new Array(e);for(let n=0;n<e;n++){s[n]=new Array(e),r[n]=new Array(e);for(let o=0;o<e;o++)s[n][o]=t[n][o],r[n][o]=o}for(let n=0;n<e;n+=Bt)for(let o=0;o<e;o+=Bt)for(let a=0;a<e;a+=Bt)for(let l=n;l<Math.min(e,n+Bt);l++)for(let c=o;c<Math.min(e,o+Bt);c++)for(let u=a;u<Math.min(e,a+Bt);u++)s[c][l]+s[l][u]<s[c][u]&&(s[c][u]=s[c][l]+s[l][u],r[c][u]=r[c][l]);for(let n=0;n<e;n++)for(let o=0;o<e;o++)for(let a=0;a<e;a++)s[o][n]+s[n][a]<s[o][a]&&(s[o][a]=s[o][n]+s[n][a],r[o][a]=r[o][n]);return[s,r]}}class rc{floydWarshall;floydWarshallGPU;constructor(){}async computeShortestPaths(t,e,s){switch(t){case de.FloydWarshall:return this.floydWarshall||(this.floydWarshall=new sc),this.floydWarshall.computeShortestPaths(e);case de.FloydWarshallGPU:return this.floydWarshallGPU||(this.floydWarshallGPU=new ic),await this.floydWarshallGPU.computeShortestPaths(e,s);case de.Johnson:return Promise.resolve([]);default:throw new Error("Unsupported algorithm")}}}var Lt=(i=>(i[i.none=0]="none",i[i.focused=1]="focused",i[i.selected=2]="selected",i))(Lt||{});class Hr{id;x;y;radius;vx;vy;constructor(t,e,s){this.id=t,this.x=e,this.y=s,this.radius=0,this.vx=0,this.vy=0}draw(t,e,s){switch(t.beginPath(),t.fillStyle="white",t.fill(),t.stroke(),t.beginPath(),s){case Lt.none:t.fillStyle="rgb(128, 0, 0, 0.2)",t.arc(this.x,this.y,e,0,Math.PI*2);break;case Lt.focused:t.fillStyle="rgb(255, 0, 0, 0.2)",t.arc(this.x,this.y,e,0,Math.PI*2),t.fillStyle="rgb(255, 255, 0, 0.2)",t.arc(this.x,this.y,e*3,0,Math.PI*2);break;case Lt.selected:t.fillStyle="rgb(235, 10, 0, 0.4)",t.arc(this.x,this.y,e,0,Math.PI*2);break}t.fill(),t.closePath(),t.fillStyle="rgb(40,40,40,0.6)",t.fillText(this.id.toString(),this.x+15,this.y-15),this.radius=e}}function nc(i,t,e=[],s=[],r,n,o){const a=e.length;s.length;const l=e.slice(0,r),c=s.filter(h=>h.start<r&&h.end<r);c.forEach((h,d)=>{(h.start>=r||h.end>=r)&&c.splice(d,1)});let u=0;for(;c.length<n&&u<r*o;){const h=Math.floor(Math.random()*r);let d=Math.floor(Math.random()*r);!c.some(p=>p.start===h&&p.end===d||p.start===d&&p.end===h)&&h!==d&&c.push({start:h,end:d}),u++}for(;l.length<r;){const h=new Hr(a+l.length,Math.random()*i,Math.random()*t);l.push(h)}return{cities:l,routes:c}}const oc=new rc;class ac{country;regionViews;canvas;routes;constructor(t,e,s){this.country=t,this.regionViews=e,this.canvas=s,this.routes=[]}createAdjacencyMatrix(){const{cities:t,routes:e}=nc(this.canvas.width,this.canvas.height,this.regionViews.regionViews,this.routes,this.regionViews.regionViews.length,this.regionViews.regionViews.length*1.1,4),s=this.regionViews.regionViews.length,r=new Array(s);for(let n=0;n<t.length;n++)r[n]=new Array(s),r[n].fill(Number.POSITIVE_INFINITY),r[n][n]=0;for(const n of e){const o=this.regionViews.regionViews[n.start],a=this.regionViews.regionViews[n.end],l=1+Math.round(Math.sqrt((o.x-a.x)**2+(o.y-a.y)**2)/50);r[n.start][n.end]=l,r[n.end][n.start]=l}return this.routes=e,r}async createDistanceMatrix(){const t=this.country.matrices.adjacencyMatrix,e=t.length;return oc.computeShortestPaths(de.FloydWarshall,t,e)}createTransportCostMatrix(){const t=this.country.matrices.distanceMatrix.length;let e=0;for(let n=0;n<t;n++)if(this.country.matrices.distanceMatrix&&n<this.country.matrices.distanceMatrix.length)for(let o=0;o<t;o++)o<this.country.matrices.distanceMatrix[n].length&&this.country.matrices.distanceMatrix[n][o]!=Number.POSITIVE_INFINITY&&(e=Math.max(this.country.matrices.distanceMatrix[n][o],e));const s=new Array(t);for(let n=0;n<t;n++)s[n]=new Array(t);if(e==0)return s;const r=Math.log(this.country.transportCost);for(let n=0;n<t;n++)if(this.country.matrices.distanceMatrix&&n<this.country.matrices.distanceMatrix.length){for(let o=n;o<t;o++)if(o<this.country.matrices.distanceMatrix[n].length)if(this.country.matrices.distanceMatrix[n][o]!=Number.POSITIVE_INFINITY){const a=this.country.matrices.distanceMatrix[n][o]/e;s[o][n]=s[n][o]=Math.exp(r*a)}else s[o][n]=s[n][o]=Number.POSITIVE_INFINITY}return s}}var Re=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ur={},_r={};Object.defineProperty(_r,"__esModule",{value:!0});(function(i){var t=Re&&Re.__createBinding||(Object.create?function(h,d,b,p){p===void 0&&(p=b),Object.defineProperty(h,p,{enumerable:!0,get:function(){return d[b]}})}:function(h,d,b,p){p===void 0&&(p=b),h[p]=d[b]}),e=Re&&Re.__exportStar||function(h,d){for(var b in h)b!=="default"&&!Object.prototype.hasOwnProperty.call(d,b)&&t(d,h,b)};Object.defineProperty(i,"__esModule",{value:!0}),i.twoFingers=i.clientToSVGElementCoords=i.clientToHTMLElementCoords=void 0,e(_r,i);const s=([h,d])=>({x:(h.clientX+d.clientX)/2,y:(h.clientY+d.clientY)/2}),r=([h,d])=>{const b=d.clientX-h.clientX,p=d.clientY-h.clientY;return Math.sqrt(b*b+p*p)},n=([h,d])=>{const b=d.clientX-h.clientX,p=d.clientY-h.clientY;return 180/Math.PI*Math.atan2(p,b)},o=(h,d)=>{const b=h.getBoundingClientRect();return{x:d.x-b.x,y:d.y-b.y}};i.clientToHTMLElementCoords=o;const a=(h,d)=>{var b;const p=(b=h.ownerSVGElement)!==null&&b!==void 0?b:h,v=p.getScreenCTM();if(!v)return;const w=v.inverse(),R=p.createSVGPoint();return R.x=d.x,R.y=d.y,R.matrixTransform(w)};i.clientToSVGElementCoords=a;function l(h,d){return Math.sign(h)*Math.min(d,Math.abs(h))}function c(h){let v=h.deltaX,w=h.deltaY;return h.shiftKey&&v===0&&([v,w]=[w,v]),h.deltaMode===WheelEvent.DOM_DELTA_LINE?(v*=8,w*=8):h.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(v*=24,w*=24),{dx:l(v,24),dy:l(w,24)}}const u=(h,{onGestureStart:d,onGestureChange:b,onGestureEnd:p}={},v=c)=>{let w,R;const F=k=>{if(!(k instanceof WheelEvent)){console.error("Expected WheelEvent, got",k);return}k.preventDefault();const{dx:ut,dy:dt}=v(k);w?(w={origin:{x:k.clientX,y:k.clientY},scale:k.ctrlKey?w.scale*(1-dt/100):1,translation:k.ctrlKey?{x:0,y:0}:{x:w.translation.x-ut,y:w.translation.y-dt}},b?.(w)):(w={scale:1,translation:{x:0,y:0},origin:{x:k.clientX,y:k.clientY}},d?.(w)),R&&window.clearTimeout(R),R=window.setTimeout(()=>{w&&(p?.(w),w=void 0)},20)};let Ft;const Mt=k=>{if(k instanceof TouchEvent&&k.touches.length===2){const ut=s(Ft),dt=s(k.touches);w={scale:k.scale!==void 0?k.scale:r(k.touches)/r(Ft),rotation:k.rotation!==void 0?k.rotation:n(k.touches)-n(Ft),translation:{x:dt.x-ut.x,y:dt.y-ut.y},origin:ut},b?.(w),k.preventDefault()}},kt=k=>{k instanceof TouchEvent&&(k.touches.length===2?(Ft=k.touches,w={scale:1,rotation:0,translation:{x:0,y:0},origin:s(Ft)},k.type==="touchstart"&&k.preventDefault(),d?.(w),h.addEventListener("touchmove",Mt,{passive:!1}),h.addEventListener("touchend",kt),h.addEventListener("touchcancel",kt)):w&&(p?.(w),w=void 0,h.removeEventListener("touchmove",Mt),h.removeEventListener("touchend",kt),h.removeEventListener("touchcancel",kt)))};h.addEventListener("wheel",F,{passive:!1}),h.addEventListener("touchstart",kt,{passive:!1});const as=({clientX:k,clientY:ut,rotation:dt,scale:Zt,preventDefault:ri})=>{d?.({translation:{x:0,y:0},scale:Zt,rotation:dt,origin:{x:k,y:ut}}),ri()},ls=({clientX:k,clientY:ut,rotation:dt,scale:Zt,preventDefault:ri})=>{b?.({translation:{x:0,y:0},scale:Zt,rotation:dt,origin:{x:k,y:ut}}),ri()},cs=({clientX:k,clientY:ut,rotation:dt,scale:Zt})=>{p?.({translation:{x:0,y:0},scale:Zt,rotation:dt,origin:{x:k,y:ut}})};return typeof window.GestureEvent<"u"&&typeof window.TouchEvent>"u"&&(h.addEventListener("gesturestart",as,{passive:!1}),h.addEventListener("gesturechange",ls,{passive:!1}),h.addEventListener("gestureend",cs)),()=>{h.removeEventListener("wheel",F),h.removeEventListener("touchstart",kt),typeof window.GestureEvent<"u"&&typeof window.TouchEvent>"u"&&(h.removeEventListener("gesturestart",as),h.removeEventListener("gesturechange",ls),h.removeEventListener("gestureend",cs))}};i.twoFingers=u})(Ur);class lc{canvas;addNodeButton;removeNodeButton;addEdgeButton;removeEdgeButton;ctx;init_m=new DOMMatrix;origin=null;isDragging=!1;model;regionViews;mouseDownPoint=null;constructor(t,e){this.canvas=t,this.regionViews=e,this.addNodeButton=document.getElementById("addNodeButton"),this.removeNodeButton=document.getElementById("removeNodeButton"),this.addEdgeButton=document.getElementById("addEdgeButton"),this.removeEdgeButton=document.getElementById("removeEdgeButton"),document.getElementById("fitButton").addEventListener("click",()=>{this.fitToScreen()}),this.addNodeButton.disabled=!0,this.removeNodeButton.disabled=!0,this.addEdgeButton.disabled=!0,this.removeEdgeButton.disabled=!0,this.ctx=this.canvas.getContext("2d"),this.canvas instanceof HTMLElement&&(this.canvas.style.transformOrigin="0 0"),this.canvas.addEventListener("mousedown",a=>this.onMouseDown(a),{passive:!1}),this.canvas.addEventListener("mousemove",a=>this.onMouseMove(a),{passive:!1}),this.canvas.addEventListener("mouseup",a=>this.onMouseUp(a),{passive:!1}),this.canvas.addEventListener("mouseout",a=>{this.model&&(this.model.focusedRegionIndex=-1,this.model.notifyFocusRegion())},{passive:!1});function r(a,l){if(a instanceof HTMLElement){let c=a.getBoundingClientRect();return{x:l.origin.x-c.x,y:l.origin.y-c.y}}if(a instanceof SVGElement&&a.ownerSVGElement){const c=a.ownerSVGElement.getScreenCTM();if(c){let u=c.inverse();return new DOMPoint(l.origin.x,l.origin.y).matrixTransform(u)}}throw new Error("Expected HTML or SVG element")}function n(a,l){return new DOMMatrix().translate(l.x,l.y).translate(a.translation.x/5||0,a.translation.y/5||0).rotate(a.rotation||0).scale(a.scale||1).translate(-l.x,-l.y)}function o(a,l){a.setTransform(l)}Ur.twoFingers(this.canvas,{onGestureStart:a=>{this.canvas.offsetLeft<a.origin.x&&a.origin.x<this.canvas.offsetLeft+this.canvas.width&&this.canvas.offsetTop<a.origin.y&&a.origin.y<this.canvas.offsetTop+this.canvas.height&&(this.origin=r(this.canvas,a),this.origin&&(this.init_m=this.ctx.getTransform()))},onGestureChange:a=>{this.origin&&o(this.ctx,n(a,a.origin).multiply(this.init_m))},onGestureEnd:a=>{this.origin}},a=>({dx:a.deltaX,dy:a.deltaY})),this.addNodeButton.addEventListener("click",()=>this.addNode()),this.removeNodeButton.addEventListener("click",()=>{this.removeNode(0)}),this.addEdgeButton.addEventListener("click",()=>this.addEdge()),this.removeEdgeButton.addEventListener("click",()=>this.removeEdge())}setModel(t){this.model=t,this.model.country.regions.length}addNode(){if(!this.model)throw new Error;this.model.country.updateRegions(this.model.country.regions.length+1)}removeNode(t){if(!this.model)throw new Error;this.model.country.updateRegions(this.model.country.regions.length-1)}addEdge(){}removeEdge(){}onMouseDown(t){if(!this.model)throw new Error;t.preventDefault();const e=new DOMPoint(t.offsetX,t.offsetY).matrixTransform(this.ctx.getTransform().invertSelf());this.mouseDownPoint=e;const s=this.regionViews.findClosestElementId(e.x,e.y);if(s!=null){const r=this.model.country.regions[s];this.isDragging=!0,this.model.selectedNodes.some(n=>r.id==n.id)?this.model.selectedNodes=this.model.selectedNodes.filter(n=>n?.id!=r.id):this.model.selectedNodes.push(r)}else this.isDragging=!1,this.model.selectedNodes.splice(-1,1);this.model.selectedNodes.length>0&&(this.addNodeButton.disabled=!1,this.removeNodeButton.disabled=!1,this.model.selectedNodes.length>1&&(this.addEdgeButton.disabled=!1,this.removeEdgeButton.disabled=!1))}onMouseMove(t){if(!this.model||!this.model.country||!this.ctx)return;t.preventDefault();const e=new DOMPoint(t.offsetX,t.offsetY).matrixTransform(this.ctx.getTransform().invertSelf());if(this.model.selectedNodes.length>0&&this.isDragging){const r=this.model.selectedNodes.at(-1).id;this.regionViews.regionViews[r].x=e.x,this.regionViews.regionViews[r].y=e.y;return}const s=this.regionViews.findClosestElementId(e.x,e.y);s!=null?(this.model.focusedRegionIndex=s,this.canvas.style.cursor="pointer",this.model.notifyFocusRegion()):(this.model.focusedRegionIndex=-1,this.canvas.style.cursor="default",this.model.notifyFocusRegion())}async onMouseUp(t){if(!this.model||!this.ctx)return;this.mouseDownPoint=null,t.preventDefault(),this.model.selectedNodes.length>0&&(this.model.country.matrices.adjacencyMatrix=this.model.matrixFactories.createAdjacencyMatrix(),this.model.notifyUpdateCountry()),this.isDragging=!1;const e=new DOMPoint(t.offsetX,t.offsetY).matrixTransform(this.ctx.getTransform().invertSelf());this.regionViews.findClosestElementId(e.x,e.y),this.model.selectedNodes.length==0&&(this.addNodeButton.disabled=!0,this.removeNodeButton.disabled=!0),this.model.selectedNodes.length<=1&&(this.addEdgeButton.disabled=!0,this.removeEdgeButton.disabled=!0)}draw(){if(this.model){for(const t of this.model.country.regions)for(const e of this.model.country.regions){if(t===e)continue;const s=this.regionViews.regionViews[t.id],r=this.regionViews.regionViews[e.id];if(!s||!r||!this.model.country.matrices.adjacencyMatrix[t.id])continue;const n=r.x-s.x,o=r.y-s.y,a=Math.sqrt(n*n+o*o)||1,l=(this.model.country.matrices.adjacencyMatrix[t.id][e.id]?.06:.02)*(a-300)/a**2,c=l*n,u=l*o;s.vx+=c,s.vy+=u,r.vx-=c,r.vy-=u}for(const t of this.model.country.regions){const e=this.regionViews.regionViews[t.id];e&&((!this.model.selectedNodes||!this.model.selectedNodes.some(s=>t.id==s.id))&&(e.x+=e.vx,e.y+=e.vy),e.vx*=.9,e.vy*=.9)}this.ctx.save(),this.ctx.resetTransform(),this.ctx.fillStyle="#fafafa",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.restore();for(let t=0;t<this.regionViews.regionViews.length;t++){const e=this.regionViews.regionViews[t];for(let s=0;s<this.regionViews.regionViews.length;s++){const r=this.model.country.matrices.adjacencyMatrix[t]&&this.model.country.matrices.adjacencyMatrix[t][s];if(0<r&&r<Number.POSITIVE_INFINITY){const n=this.regionViews.regionViews[s];this.ctx.beginPath(),this.model.isFocusedRouteIndex(t,s)?(this.ctx.strokeStyle="rgb(255,255,0,0.3)",this.ctx.lineWidth=5):(this.ctx.strokeStyle="#ccc",this.ctx.lineWidth=1),this.ctx.moveTo(e.x,e.y),this.ctx.lineTo(n.x,n.y),this.ctx.stroke(),this.ctx.fillStyle="#ccc",this.ctx.fillText(r.toFixed(1),(e.x+n.x)/2,(e.y+n.y)/2)}}}if(this.model.focusedRouteIndex){let t=this.model.focusedRouteIndex[0];const e=this.model.focusedRouteIndex[1],s=this.model.country.matrices.distanceMatrix[t]&&this.model.country.matrices.distanceMatrix[t][e];if(0<s&&s<Number.POSITIVE_INFINITY){this.ctx.beginPath(),this.ctx.strokeStyle="rgb(255,255,0,0.3)",this.ctx.lineWidth=5;const r=this.regionViews.regionViews[t];for(this.ctx.moveTo(r.x,r.y);t!=e;){const n=this.model.country.matrices.predecessorMatrix[t][e];t=n;const o=this.regionViews.regionViews[n];this.ctx.lineTo(o.x,o.y)}this.ctx.stroke()}}this.ctx.strokeStyle="#000";for(let t of this.model.country.regions){const s=(1+this.model.country.regions[t.id].manufacturingShare*3)*10,r=this.regionViews.regionViews[t.id];r&&r.draw(this.ctx,s,Lt.none)}for(let t of this.model.selectedNodes){const s=(1+this.model.country.regions[t.id].manufacturingShare)*10;this.regionViews.regionViews[t.id]?.draw(this.ctx,s,Lt.selected)}if(this.model.focusedRegionIndex!=-1){const t=this.model.country.regions[this.model.focusedRegionIndex];if(t){const e=(1+t.manufacturingShare)*10,s=this.regionViews.regionViews[this.model.focusedRegionIndex];s&&s.draw(this.ctx,e,Lt.focused)}}this.ctx.restore(),requestAnimationFrame(this.draw.bind(this))}}computeTransformMatrix(t,e,s,r,n,o,a=.2,l=.2){const c=r-s,u=o-n,h=t*(1-a),d=e*(1-l),b=h/d,p=c/u,v=b>p?d/u:h/c,w=(t-c*v)*.5-s*v,R=(e-u*v)*.5-n*v,F=new DOMMatrix;return F.translateSelf(w,R).scaleSelf(v,v),F}fitToScreen(){const t=this.getGraphBounds(),e=this.computeTransformMatrix(this.canvas.width,this.canvas.height,t.minX,t.maxX,t.minY,t.maxY);this.init_m=e,this.ctx.setTransform(e),requestAnimationFrame(this.draw.bind(this))}getGraphBounds(){if(!this.model)throw new Error;let t=Number.POSITIVE_INFINITY,e=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY;for(let n of this.regionViews.regionViews)t=Math.min(t,n.x),e=Math.min(e,n.y),s=Math.max(s,n.x),r=Math.max(r,n.y);return{minX:t,minY:e,maxX:s,maxY:r}}}const tt=25,pt=10;class cc{canvas;model;constructor(){this.canvas=document.getElementById("barChartCanvas"),this.canvas.addEventListener("mousemove",t=>{if(!this.model)return;const s=(r=>{if(!this.model)return-1;const n=(this.canvas.width-tt)/this.model.country.regions.length;if(r.offsetX<tt)return-1;for(let o=0;o<this.model.country.regions.length;o++)if(r.offsetX<tt+(o+1)*n)return o;return-1})(t);this.model?.focusedRegionIndex!=s&&(this.model.focusedRegionIndex=s,this.model.notifyFocusRegion(),this.draw())}),this.canvas.addEventListener("mouseout",t=>{this.model&&(this.model.focusedRegionIndex=-1,this.model.notifyFocusRegion(),this.draw())})}setModel(t){this.model=t}drawVerticalScales(t,e,s,r,n,o){const a=e-o,l=6,c=.1;t.textAlign="right";let u=0;for(let h=0;h<=1;h+=c){const d=s-n-h*r;d>=0&&(t.fillStyle="#ddd",t.fillRect(o,d-1,a,1),t.fillStyle="#888",t.fillText(h.toFixed(1),o-2,d+3),u++)}if(u<5)for(let h=.05;h<=1;h+=c){const d=s-n-h*r;d>=0&&(t.fillRect(o,d-1,l,1),t.fillText(h.toFixed(2),o-2,d+4))}if(u<2)for(let h=.01;h<=1;h+=.01){const d=s-n-h*r;d>=0&&(t.fillRect(o,d-1,l,1),t.fillText(h.toFixed(2),o-2,d+4),u++)}}drawHorizontalScales(t,e,s,r,n,o){if(t.fillStyle="#888",t.textAlign="left",n<=100)for(let l=5;l<=n;l+=5){const c=r+l*s;t.fillText(l.toString(),c,o)}else for(let l=50;l<=n;l+=50){const c=r+l*s;t.fillText(l.toString(),c,o)}}draw(){const t=this.canvas.getContext("2d");if(!t||!this.model)return;t.fillStyle="#fff",t.fillRect(0,0,tt,this.canvas.height),t.fillStyle="#f4f4f4",t.fillRect(tt,pt,this.canvas.width-tt,this.canvas.height-pt*2);const e=(this.canvas.width-tt)/this.model.country.regions.length,s=(this.canvas.height-pt*2)*this.model.barChartScale;this.drawVerticalScales(t,this.canvas.width,this.canvas.height,s,pt,tt),this.model.country.regions.forEach((r,n)=>{r.deltaManufacturingShare<0?t.fillStyle="#ee8888":t.fillStyle="#dd0000",t.fillRect(tt+n*e,this.canvas.height-pt-r.manufacturingShare*s,Math.max(e-1,1),r.manufacturingShare*s),this.model.focusedRegionIndex==n&&(t.fillStyle="rgb(255,255,0,0.3)",t.fillRect(tt+n*e,pt,Math.max(e-1,1),this.canvas.height))}),t.fillStyle="#fff",t.fillRect(tt,this.canvas.height-pt,this.canvas.width-tt,pt),this.drawHorizontalScales(t,this.canvas.width,e,tt,this.model.country.regions.length,this.canvas.height-pt+10),t.fillStyle="#fff",t.fillRect(0,0,this.canvas.width,pt)}}class hc{scaleSelector;model;constructor(){this.scaleSelector=document.getElementById("scale")}setModel(t){this.scaleSelector.addEventListener("change",e=>this.changeScale(e))}changeScale(t){const e=t.target.value,s=parseFloat(e.split(" ")[1]);this.model.setScale(s)}}class uc{numRegionsSlider;piSlider;transportCostSlider;sigmaSlider;numRegionsElem;piElem;transportCostElem;sigmaElem;model;listeners;constructor(){this.numRegionsSlider=document.getElementById("numRegionsSlider"),this.piSlider=document.getElementById("piSlider"),this.transportCostSlider=document.getElementById("tcostSlider"),this.sigmaSlider=document.getElementById("sigmaSlider"),this.numRegionsElem=document.getElementById("numRegions"),this.piElem=document.getElementById("pi"),this.transportCostElem=document.getElementById("tcost"),this.sigmaElem=document.getElementById("sigma"),this.numRegionsSlider.addEventListener("change",()=>this.onNCitiesChanged()),this.piSlider.addEventListener("change",()=>this.onPiChanged()),this.transportCostSlider.addEventListener("change",()=>this.onTcostChanged()),this.sigmaSlider.addEventListener("change",()=>this.onSigmaChanged()),this.listeners=[]}setModel(t){this.model=t,this.piSlider.valueAsNumber=t.country.pi,this.transportCostSlider.valueAsNumber=t.country.transportCost,this.sigmaSlider.valueAsNumber=t.country.sigma,this.numRegionsElem.innerText=this.numRegionsSlider.value,this.transportCostElem.innerText=this.transportCostSlider.value,this.sigmaElem.innerText=this.sigmaSlider.value,this.piElem.innerText=this.piSlider.value}onNCitiesChanged(){if(!this.model)throw new Error;this.numRegionsElem.innerText=this.numRegionsSlider.value;const t=this.numRegionsSlider.valueAsNumber;this.model.setNumRegions(t),this.model.notifyUpdateCountry()}onPiChanged(){if(!this.model)throw new Error;this.piElem.innerText=this.piSlider.valueAsNumber.toPrecision(2),this.model.setPi(this.piSlider.valueAsNumber)}onTcostChanged(){if(!this.model)throw new Error;this.transportCostElem.innerText=this.transportCostSlider.valueAsNumber.toPrecision(2),this.model.setTransportCost(this.transportCostSlider.valueAsNumber)}onSigmaChanged(){if(!this.model)throw new Error;this.sigmaElem.innerText=this.sigmaSlider.valueAsNumber.toPrecision(3),this.model.setSigma(this.sigmaSlider.valueAsNumber)}}class dc{sliderSet;caseSelector;model;constructor(t){this.sliderSet=t,this.caseSelector=document.getElementById("caseSelector"),this.caseSelector.addEventListener("change",()=>this.onCaseChanged())}onCaseChanged(){if(this.model)switch(this.caseSelector.value){case"0":this.sliderSet.numRegionsSlider.value="12",this.sliderSet.piSlider.value="0.2",this.sliderSet.transportCostSlider.value="2",this.sliderSet.sigmaSlider.value="4",this.model.updateTime();return;case"1":this.sliderSet.numRegionsSlider.value="12",this.sliderSet.piSlider.value="0.2",this.sliderSet.transportCostSlider.value="2",this.sliderSet.sigmaSlider.value="2",this.model.updateTime();return;case"2":this.sliderSet.numRegionsSlider.value="12",this.sliderSet.piSlider.value="0.4",this.sliderSet.transportCostSlider.value="2",this.sliderSet.sigmaSlider.value="4",this.model.updateTime();return;case"3":this.sliderSet.numRegionsSlider.value="12",this.sliderSet.piSlider.value="0.2",this.sliderSet.transportCostSlider.value="1",this.sliderSet.sigmaSlider.value="4",this.model.updateTime();return}}setModel(t){this.model=t}}class fc{model;startButton;stopButton;resetButton;counterElem;speedSlider;constructor(){this.startButton=document.getElementById("start"),this.stopButton=document.getElementById("stop"),this.resetButton=document.getElementById("reset"),this.counterElem=document.getElementById("counter"),this.speedSlider=document.getElementById("speedSlider"),this.startButton.addEventListener("click",()=>this.start()),this.stopButton.addEventListener("click",()=>this.stop()),this.resetButton.addEventListener("click",()=>this.reset()),this.speedSlider.addEventListener("change",()=>this.onSpeedChanged()),this.startButton.className="",this.stopButton.className="disabled"}setModel(t){this.model=t,t.setTimerCounterUpdater(()=>this.updateTimerCounter())}updateTimerCounter(){this.counterElem.innerText=this.model.timeCounter.toLocaleString()}start(){this.startButton.className="disabled",this.stopButton.className="started",this.resetButton.className="started",this.model.start()}stop(){this.startButton.className="",this.stopButton.className="disabled",this.resetButton.className="",this.model.stop()}reset(){this.model.reset()}onSpeedChanged(){this.model.stop(),this.model.setSpeed(this.speedSlider.valueAsNumber),this.model.start()}}class xi{constructor(t){this.id=t,this.tableElement=document.getElementById(this.id)}tableElement;model;setModel(t){this.model=t}adjustTableSize(t,e,s,r){if(!this.model)return;const n=Math.min(t+1,s+1),o=Math.min(e+1,r+1);for(let a=this.tableElement.rows.length-1;this.tableElement.rows.length<n;a++){const l=this.tableElement.insertRow(),c=l.insertCell();c.tagName==="td"&&l.cells[0].replaceWith(l.insertCell(0)),c.addEventListener("mouseover",()=>{this.model?.setFocusedRegionIndex(a),this.model?.notifyFocusRegion()}),c.addEventListener("mouseout",()=>{this.model?.setFocusedRegionIndex(-1),this.model?.notifyFocusRegion()})}for(;this.tableElement.rows.length>n;)this.tableElement.deleteRow(this.tableElement.rows.length-1);for(let a=0;a<this.tableElement.rows.length;a++){for(let l=this.tableElement.rows[a].cells.length-1;this.tableElement.rows[a].cells.length<o;l++){const c=this.tableElement.rows[a].insertCell();if(a===0||this.tableElement.rows[a].cells.length===r+1){const u=this.tableElement.rows[a].insertCell(-1);c.replaceWith(u),u.addEventListener("mouseover",()=>{this.model?.setFocusedRegionIndex(l),this.model?.notifyFocusRegion()}),u.addEventListener("mouseout",()=>{this.model?.setFocusedRegionIndex(-1),this.model?.notifyFocusRegion()})}else c.addEventListener("mouseover",()=>{this.model?.setFocusedRouteIndex([l,a-1],this.id),this.model?.notifyFocusRegion()}),c.addEventListener("mouseout",()=>{this.model?.setFocusedRouteIndex(null,null),this.model?.notifyFocusRegion()})}for(;this.tableElement.rows[a].cells.length>o;)this.tableElement.rows[a].deleteCell(this.tableElement.rows[a].cells.length-1)}for(let a=1;a<this.tableElement.rows.length;a++){const l=this.tableElement.rows[a].cells[0];l.textContent=(a-1).toString()}for(let a=1;a<this.tableElement.rows[0].cells.length;a++){const l=this.tableElement.rows[0].cells[a];l.textContent=(a-1).toString()}if(t>s-1)for(let a=0;a<this.tableElement.rows[s].cells.length;a++)this.tableElement.rows[s].cells[a].textContent="...";if(e>r-1)for(let a=0;a<this.tableElement.rows.length;a++)this.tableElement.rows[a].cells[r].textContent="..."}setTableContent(t,e,s,r){let n=0;for(let o=0;o<t.length;o++)for(let a=0;a<t[o].length;a++)t[o][a]!=Number.POSITIVE_INFINITY&&(n=Math.max(n,t[o][a]));for(let o=0;o<e-1&&o<t.length&&o<this.tableElement.rows.length-1;o++)for(let a=0;a<s-1&&a<t[o].length&&a<this.tableElement.rows[o+1].cells.length-1;a++){const l=t[o][a],c=l!=Number.POSITIVE_INFINITY?l/n:"0",u=this.tableElement.rows[o+1].cells[a+1];u.textContent=r(t[o][a]),u.style.backgroundColor=`rgba(255, 0, 0, ${c})`}}}const rt=21;class gc{adjacencyMatrix;distanceMatrix;transportCostMatrix;model;constructor(){this.adjacencyMatrix=new xi("adjacencyMatrix"),this.distanceMatrix=new xi("distanceMatrix"),this.transportCostMatrix=new xi("transportCostMatrix")}setModel(t){this.model=t,this.adjacencyMatrix.setModel(t),this.distanceMatrix.setModel(t),this.transportCostMatrix.setModel(t),this.updateTableSize(t.country.regions.length),this.updateTableContent()}updateTableSize(t){this.adjacencyMatrix.adjustTableSize(t,t,rt,rt),this.distanceMatrix.adjustTableSize(t,t,rt,rt),this.transportCostMatrix.adjustTableSize(t,t,rt,rt)}async updateTableContent(){if(!this.model)return;const t=this.model.country.matrices.adjacencyMatrix;this.adjacencyMatrix.setTableContent(t,rt,rt,r=>r==Number.POSITIVE_INFINITY?"Inf":r.toFixed(1));const e=this.model.country.matrices.distanceMatrix;if(!this.model)return;this.distanceMatrix.setTableContent(e,rt,rt,r=>r==Number.POSITIVE_INFINITY?"Inf":r?.toFixed(1));const s=this.model.country.matrices.transportCostMatrix;this.transportCostMatrix.setTableContent(s,rt,rt,r=>r==Number.POSITIVE_INFINITY?"Inf":Number.isNaN(r)?"":r?.toFixed(2))}async update(){this.updateTableSize(this.model.country.regions.length),await this.updateTableContent()}}class pc{barChartView;visualizerTypeSelector;barChartScaleSelector;sliderSet;caseSelector;commandButtonSet;diagonalTableViewSet;constructor(){this.barChartView=new cc,this.visualizerTypeSelector=new Zl,this.barChartScaleSelector=new hc,this.sliderSet=new uc,this.caseSelector=new dc(this.sliderSet),this.commandButtonSet=new fc,this.diagonalTableViewSet=new gc}setModel(t){this.barChartView.setModel(t),this.visualizerTypeSelector.setModel(t),this.barChartScaleSelector.setModel(t),this.sliderSet.setModel(t),this.caseSelector.setModel(t),this.commandButtonSet.setModel(t),this.diagonalTableViewSet.setModel(t)}notifyUpdateCountry(){this.barChartView.draw(),this.diagonalTableViewSet.update()}notifyUpdateTime(){this.barChartView.draw()}}class mc{id;manufacturingShare;manufacturingShare0;agricultureShare;priceIndex;priceIndex0;nominalWage;nominalWage0;realWage;income;income0;deltaManufacturingShare;constructor(t,e,s){this.id=t,this.manufacturingShare=e,this.manufacturingShare0=e,this.agricultureShare=s,this.priceIndex=1,this.priceIndex0=1,this.nominalWage=1,this.nominalWage0=1,this.realWage=1,this.income=1,this.income0=1,this.deltaManufacturingShare=0}setManufacturingShare(t){this.manufacturingShare=t}setAgricultureShare(t){this.agricultureShare=t}changeManufacturingShare(t){this.deltaManufacturingShare=t,this.manufacturingShare+=this.deltaManufacturingShare}backupPreviousValues(){this.income0=this.income,this.nominalWage0=this.nominalWage,this.priceIndex0=this.priceIndex,this.manufacturingShare0=this.manufacturingShare}calcIncome(t){this.income=t.pi*this.manufacturingShare*this.nominalWage+(1-t.pi)*this.agricultureShare}calcPriceIndex(t){let e=0;t.regions.forEach(s=>{e+=s.manufacturingShare*Math.pow(s.nominalWage0*t.matrices.transportCostMatrix[this.id][s.id],1-t.sigma)}),this.priceIndex=Math.pow(e,1/(1-t.sigma))}calcRealWage(t){this.realWage=this.nominalWage*Math.pow(this.priceIndex,-t.pi)}calcNominalWage(t){let e=0;t.regions.forEach(s=>{e+=s.income0*Math.pow(t.matrices.transportCostMatrix[this.id][s.id],1-t.sigma)*Math.pow(s.priceIndex0,t.sigma-1)}),this.nominalWage=Math.pow(e,1/t.sigma)}calcDynamics(t){this.deltaManufacturingShare=t.gamma*(this.realWage-t.avgRealWage)*this.manufacturingShare}applyDynamics(t){this.manufacturingShare>1/t.regions.length/10?this.manufacturingShare+=this.deltaManufacturingShare:this.manufacturingShare=1/t.regions.length/10}}class bc{adjacencyMatrix;predecessorMatrix;distanceMatrix;transportCostMatrix;constructor(t){this.adjacencyMatrix=this.create2DArray(t),this.predecessorMatrix=this.create2DArray(t),this.distanceMatrix=this.create2DArray(t),this.transportCostMatrix=this.create2DArray(t)}create2DArray(t,e){const s=new Array(t);for(let r=0;r<t;r++)if(s[r]=new Array(t),e&&e[r])for(let n=0;n<t;n++)e[r][n]&&(s[r][n]=e[r][n]);return s}}class vc{width;height;regions;matrices;pi;transportCost;sigma;gamma;avgRealWage;constructor(t,e,s,r,n){this.width=t,this.height=e,this.pi=s,this.transportCost=r,this.sigma=n,this.gamma=1,this.avgRealWage=1,this.regions=this.createRegions(0),this.matrices=new bc(0)}setSigma(t){this.sigma=t+.1}setTransportCost(t){this.transportCost=t}setPi(t){this.pi=t}reset(){this.regions=this.createRegions(this.regions.length),this.disturb()}disturb(){const t=this.regions.length,e=1/t*.05;for(let s=0;s<t;s++){const r=Math.floor(Math.random()*t);this.regions[r].changeManufacturingShare(e)}this.rescale()}rescale(){let t=0,e=0;this.regions.forEach(s=>{t+=s.manufacturingShare,e+=s.agricultureShare}),this.regions.forEach(s=>{s.setManufacturingShare(s.manufacturingShare/t),s.setAgricultureShare(s.agricultureShare/e)})}backupPreviousValues(){this.regions.forEach(t=>{t.backupPreviousValues()})}calcIncome(){this.regions.forEach(t=>{t.calcIncome(this)})}calcPriceIndex(){this.regions.forEach(t=>{t.calcPriceIndex(this)})}calcNominalWage(){this.regions.forEach(t=>{t.calcNominalWage(this)})}calcRealWage(){this.regions.forEach(t=>{t.calcRealWage(this)})}calcAvgRealWage(){let t=0;this.regions.forEach(e=>{t+=e.realWage*e.manufacturingShare}),this.avgRealWage=t}calcDynamics(){this.regions.forEach(t=>{t.calcDynamics(this)})}applyDynamics(){this.regions.forEach(t=>{t.applyDynamics(this)}),this.rescale()}procedure(){this.backupPreviousValues(),this.calcIncome(),this.calcPriceIndex(),this.calcNominalWage(),this.calcRealWage(),this.calcAvgRealWage(),this.calcDynamics(),this.applyDynamics()}createRegion(t,e,s){return new mc(t,e,s)}createRegions(t){const e=new Array(t);for(let s=0;s<t;s++)e[s]=this.createRegion(s,1/t,1/t);return e}updateRegions(t){if(this.regions.length<t){for(const e of this.regions)e.manufacturingShare=1/t,e.agricultureShare=1/t;for(;this.regions.length<t;)this.addNode(this.createRegion(this.regions.length,1/t,1/t))}else t<this.regions.length&&(this.regions=this.regions.slice(0,t-1));this.disturb()}addNode(t){this.regions.push(t)}removeNode(t){const e=this.regions.find(s=>s.id==t);if(e){this.regions=this.regions.map((s,r)=>r<e.id?s:r==e.id?null:(s.id=s.id-1,s)).filter(s=>s!=null);for(const s of this.regions)s.manufacturingShare=1/this.regions.length,s.agricultureShare=1/this.regions.length}}}class yc{width;height;regionViews;constructor(t,e){this.width=t,this.height=e,this.regionViews=[]}createRegionView(t){return new Hr(t,this.width*Math.random(),this.height*Math.random())}updateRegionViewsBySize(t){if(this.regionViews.length<t)for(;this.regionViews.length<t;)this.regionViews.push(this.createRegionView(this.regionViews.length));else t<this.regionViews.length&&(this.regionViews=this.regionViews.slice(0,t-1))}findClosestElementId(t,e){if(this.regionViews.length===0)return null;let s=null,r=Number.POSITIVE_INFINITY;for(let n of this.regionViews){const o=this.distance(t,e,n.x,n.y);o<n.radius&&o<r&&(r=o,s=n)}return s?s.id:null}distance(t,e,s,r){const n=s-t,o=r-e;return Math.sqrt(n*n+o*o)}}ql().register(Ll(),Ol(),Bl(),Nl(),Gl({thumb:'<div style="background-color: #fff; border: 1px solid #777;border-radius: 3px; width: 16px; height: 16px; "></div>'}),Wl());const L=new pc,K=new vc(600,600,.2,2,4),Qt=new Kl,U=new Gs(new tc(K),K,1,.5);U.addNotifyFocusRegionEventListener(()=>{Qt.draw(),L.barChartView.draw()});U.addFocusRouteEventListener(()=>{Qt.draw(),L.barChartView.draw()});U.addCountryEventListener(async()=>{K.matrices.adjacencyMatrix=U.matrixFactories.createAdjacencyMatrix(),[K.matrices.distanceMatrix,K.matrices.predecessorMatrix]=await U.matrixFactories.createDistanceMatrix(),K.matrices.transportCostMatrix=U.matrixFactories.createTransportCostMatrix(),U.country.reset(),Qt.draw(),L.notifyUpdateCountry()});U.setTransportCostEventListener(async()=>{K.matrices.transportCostMatrix=U.matrixFactories.createTransportCostMatrix(),Qt.draw(),L.notifyUpdateCountry()});U.addTimeEventListener(()=>{Qt.draw(),L.barChartView.draw()});Qt.setModel(U);U.setNumRegions(12);zr("raceTrack",()=>{L.setModel(U),L.visualizerTypeSelector.priceIndexVisualizer.disabled=!1,L.visualizerTypeSelector.nominalWageVisualizer.disabled=!1,L.visualizerTypeSelector.realWageVisualizer.disabled=!1,L.visualizerTypeSelector.avgRealWageVisualizer.disabled=!1,U.notifyUpdateCountry()},()=>{U?.stop()});const Oe=document.getElementById("graphCountryCanvas"),si=new yc(Oe.width,Oe.height),Pt=new lc(Oe,si),Q=new Gs(new ac(K,si,Oe),K,1,.5);si.updateRegionViewsBySize(12);Q.addNotifyFocusRegionEventListener(()=>{Pt.draw(),L.barChartView.draw()});Q.addFocusRouteEventListener(()=>{Pt.draw(),L.barChartView.draw()});Q.addCountryEventListener(async()=>{si.updateRegionViewsBySize(Q.country.regions.length),K.matrices.adjacencyMatrix=Q.matrixFactories.createAdjacencyMatrix(),[K.matrices.distanceMatrix,K.matrices.predecessorMatrix]=await Q.matrixFactories.createDistanceMatrix(),K.matrices.transportCostMatrix=Q.matrixFactories.createTransportCostMatrix(),Q.country.reset(),Pt.draw(),L.notifyUpdateCountry()});Q.setTransportCostEventListener(async()=>{K.matrices.transportCostMatrix=U.matrixFactories.createTransportCostMatrix(),Pt.draw(),L.notifyUpdateCountry()});Q.addTimeEventListener(()=>{Pt.draw(),L.notifyUpdateTime()});Pt.setModel(Q);Pt.fitToScreen();zr("graph",()=>{L.setModel(Q),L.visualizerTypeSelector.priceIndexVisualizer.disabled=!0,L.visualizerTypeSelector.nominalWageVisualizer.disabled=!0,L.visualizerTypeSelector.realWageVisualizer.disabled=!0,L.visualizerTypeSelector.avgRealWageVisualizer.disabled=!0,Q.notifyUpdateCountry()},()=>{Q?.stop()});Or(!1);
