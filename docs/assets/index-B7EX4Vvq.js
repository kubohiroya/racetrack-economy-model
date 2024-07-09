(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();const Ft=function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}}();Ft.trustedTypes===void 0&&(Ft.trustedTypes={createPolicy:(i,t)=>t});const gn={configurable:!1,enumerable:!1,writable:!1};Ft.FAST===void 0&&Reflect.defineProperty(Ft,"FAST",Object.assign({value:Object.create(null)},gn));const Se=Ft.FAST;if(Se.getById===void 0){const i=Object.create(null);Reflect.defineProperty(Se,"getById",Object.assign({value(t,e){let s=i[t];return s===void 0&&(s=e?i[t]=e():null),s}},gn))}const be=Object.freeze([]);function pn(){const i=new WeakMap;return function(t){let e=i.get(t);if(e===void 0){let s=Reflect.getPrototypeOf(t);for(;e===void 0&&s!==null;)e=i.get(s),s=Reflect.getPrototypeOf(s);e=e===void 0?[]:e.slice(0),i.set(t,e)}return e}}const vi=Ft.FAST.getById(1,()=>{const i=[],t=[];function e(){if(t.length)throw t.shift()}function s(o){try{o.call()}catch(a){t.push(a),setTimeout(e,0)}}function n(){let a=0;for(;a<i.length;)if(s(i[a]),a++,a>1024){for(let l=0,c=i.length-a;l<c;l++)i[l]=i[l+a];i.length-=a,a=0}i.length=0}function r(o){i.length<1&&Ft.requestAnimationFrame(n),i.push(o)}return Object.freeze({enqueue:r,process:n})}),mn=Ft.trustedTypes.createPolicy("fast-html",{createHTML:i=>i});let yi=mn;const ve=`fast-${Math.random().toString(36).substring(2,8)}`,bn=`${ve}{`,Ki=`}${ve}`,$=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(i){if(yi!==mn)throw new Error("The HTML policy can only be set once.");yi=i},createHTML(i){return yi.createHTML(i)},isMarker(i){return i&&i.nodeType===8&&i.data.startsWith(ve)},extractDirectiveIndexFromMarker(i){return parseInt(i.data.replace(`${ve}:`,""))},createInterpolationPlaceholder(i){return`${bn}${i}${Ki}`},createCustomAttributePlaceholder(i,t){return`${i}="${this.createInterpolationPlaceholder(t)}"`},createBlockPlaceholder(i){return`<!--${ve}:${i}-->`},queueUpdate:vi.enqueue,processUpdates:vi.process,nextUpdate(){return new Promise(vi.enqueue)},setAttribute(i,t,e){e==null?i.removeAttribute(t):i.setAttribute(t,e)},setBooleanAttribute(i,t,e){e?i.setAttribute(t,""):i.removeAttribute(t)},removeChildNodes(i){for(let t=i.firstChild;t!==null;t=i.firstChild)i.removeChild(t)},createTemplateWalker(i){return document.createTreeWalker(i,133,null,!1)}});class Ai{constructor(t,e){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=e}has(t){return this.spillover===void 0?this.sub1===t||this.sub2===t:this.spillover.indexOf(t)!==-1}subscribe(t){const e=this.spillover;if(e===void 0){if(this.has(t))return;if(this.sub1===void 0){this.sub1=t;return}if(this.sub2===void 0){this.sub2=t;return}this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else e.indexOf(t)===-1&&e.push(t)}unsubscribe(t){const e=this.spillover;if(e===void 0)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const s=e.indexOf(t);s!==-1&&e.splice(s,1)}}notify(t){const e=this.spillover,s=this.source;if(e===void 0){const n=this.sub1,r=this.sub2;n!==void 0&&n.handleChange(s,t),r!==void 0&&r.handleChange(s,t)}else for(let n=0,r=e.length;n<r;++n)e[n].handleChange(s,t)}}class vn{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var e;const s=this.subscribers[t];s!==void 0&&s.notify(t),(e=this.sourceSubscribers)===null||e===void 0||e.notify(t)}subscribe(t,e){var s;if(e){let n=this.subscribers[e];n===void 0&&(this.subscribers[e]=n=new Ai(this.source)),n.subscribe(t)}else this.sourceSubscribers=(s=this.sourceSubscribers)!==null&&s!==void 0?s:new Ai(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,e){var s;if(e){const n=this.subscribers[e];n!==void 0&&n.unsubscribe(t)}else(s=this.sourceSubscribers)===null||s===void 0||s.unsubscribe(t)}}const V=Se.getById(2,()=>{const i=/(:|&&|\|\||if)/,t=new WeakMap,e=$.queueUpdate;let s,n=c=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function r(c){let h=c.$fastController||t.get(c);return h===void 0&&(Array.isArray(c)?h=n(c):t.set(c,h=new vn(c))),h}const o=pn();class a{constructor(h){this.name=h,this.field=`_${h}`,this.callback=`${h}Changed`}getValue(h){return s!==void 0&&s.watch(h,this.name),h[this.field]}setValue(h,d){const u=this.field,f=h[u];if(f!==d){h[u]=d;const m=h[this.callback];typeof m=="function"&&m.call(h,f,d),r(h).notify(this.name)}}}class l extends Ai{constructor(h,d,u=!1){super(h,d),this.binding=h,this.isVolatileBinding=u,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(h,d){this.needsRefresh&&this.last!==null&&this.disconnect();const u=s;s=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const f=this.binding(h,d);return s=u,f}disconnect(){if(this.last!==null){let h=this.first;for(;h!==void 0;)h.notifier.unsubscribe(this,h.propertyName),h=h.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(h,d){const u=this.last,f=r(h),m=u===null?this.first:{};if(m.propertySource=h,m.propertyName=d,m.notifier=f,f.subscribe(this,d),u!==null){if(!this.needsRefresh){let y;s=void 0,y=u.propertySource[u.propertyName],s=this,h===y&&(this.needsRefresh=!0)}u.next=m}this.last=m}handleChange(){this.needsQueue&&(this.needsQueue=!1,e(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let h=this.first;return{next:()=>{const d=h;return d===void 0?{value:void 0,done:!0}:(h=h.next,{value:d,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(c){n=c},getNotifier:r,track(c,h){s!==void 0&&s.watch(c,h)},trackVolatile(){s!==void 0&&(s.needsRefresh=!0)},notify(c,h){r(c).notify(h)},defineProperty(c,h){typeof h=="string"&&(h=new a(h)),o(c).push(h),Reflect.defineProperty(c,h.name,{enumerable:!0,get:function(){return h.getValue(this)},set:function(d){h.setValue(this,d)}})},getAccessors:o,binding(c,h,d=this.isVolatileBinding(c)){return new l(c,h,d)},isVolatileBinding(c){return i.test(c.toString())}})});function x(i,t){V.defineProperty(i,t)}const Ms=Se.getById(3,()=>{let i=null;return{get(){return i},set(t){i=t}}});class Re{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return Ms.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){Ms.set(t)}}V.defineProperty(Re.prototype,"index");V.defineProperty(Re.prototype,"length");const ye=Object.seal(new Re);class ts{constructor(){this.targetIndex=0}}class yn extends ts{constructor(){super(...arguments),this.createPlaceholder=$.createInterpolationPlaceholder}}class wn extends ts{constructor(t,e,s){super(),this.name=t,this.behavior=e,this.options=s}createPlaceholder(t){return $.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function pr(i,t){this.source=i,this.context=t,this.bindingObserver===null&&(this.bindingObserver=V.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(i,t))}function mr(i,t){this.source=i,this.context=t,this.target.addEventListener(this.targetName,this)}function br(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function vr(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const i=this.target.$fastView;i!==void 0&&i.isComposed&&(i.unbind(),i.needsBindOnly=!0)}function yr(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function wr(i){$.setAttribute(this.target,this.targetName,i)}function xr(i){$.setBooleanAttribute(this.target,this.targetName,i)}function Sr(i){if(i==null&&(i=""),i.create){this.target.textContent="";let t=this.target.$fastView;t===void 0?t=i.create():this.target.$fastTemplate!==i&&(t.isComposed&&(t.remove(),t.unbind()),t=i.create()),t.isComposed?t.needsBindOnly&&(t.needsBindOnly=!1,t.bind(this.source,this.context)):(t.isComposed=!0,t.bind(this.source,this.context),t.insertBefore(this.target),this.target.$fastView=t,this.target.$fastTemplate=i)}else{const t=this.target.$fastView;t!==void 0&&t.isComposed&&(t.isComposed=!1,t.remove(),t.needsBindOnly?t.needsBindOnly=!1:t.unbind()),this.target.textContent=i}}function Rr(i){this.target[this.targetName]=i}function Cr(i){const t=this.classVersions||Object.create(null),e=this.target;let s=this.version||0;if(i!=null&&i.length){const n=i.split(/\s+/);for(let r=0,o=n.length;r<o;++r){const a=n[r];a!==""&&(t[a]=s,e.classList.add(a))}}if(this.classVersions=t,this.version=s+1,s!==0){s-=1;for(const n in t)t[n]===s&&e.classList.remove(n)}}class es extends yn{constructor(t){super(),this.binding=t,this.bind=pr,this.unbind=br,this.updateTarget=wr,this.isBindingVolatile=V.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,t!==void 0)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=Rr,this.cleanedTargetName==="innerHTML"){const e=this.binding;this.binding=(s,n)=>$.createHTML(e(s,n))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=xr;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=mr,this.unbind=yr;break;default:this.cleanedTargetName=t,t==="class"&&(this.updateTarget=Cr);break}}targetAtContent(){this.updateTarget=Sr,this.unbind=vr}createBehavior(t){return new kr(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class kr{constructor(t,e,s,n,r,o,a){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=e,this.isBindingVolatile=s,this.bind=n,this.unbind=r,this.updateTarget=o,this.targetName=a}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){Re.setEvent(t);const e=this.binding(this.source,this.context);Re.setEvent(null),e!==!0&&t.preventDefault()}}let wi=null;class is{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){wi=this}static borrow(t){const e=wi||new is;return e.directives=t,e.reset(),wi=null,e}}function Er(i){if(i.length===1)return i[0];let t;const e=i.length,s=i.map(o=>typeof o=="string"?()=>o:(t=o.targetName||t,o.binding)),n=(o,a)=>{let l="";for(let c=0;c<e;++c)l+=s[c](o,a);return l},r=new es(n);return r.targetName=t,r}const Tr=Ki.length;function xn(i,t){const e=t.split(bn);if(e.length===1)return null;const s=[];for(let n=0,r=e.length;n<r;++n){const o=e[n],a=o.indexOf(Ki);let l;if(a===-1)l=o;else{const c=parseInt(o.substring(0,a));s.push(i.directives[c]),l=o.substring(a+Tr)}l!==""&&s.push(l)}return s}function Ds(i,t,e=!1){const s=t.attributes;for(let n=0,r=s.length;n<r;++n){const o=s[n],a=o.value,l=xn(i,a);let c=null;l===null?e&&(c=new es(()=>a),c.targetName=o.name):c=Er(l),c!==null&&(t.removeAttributeNode(o),n--,r--,i.addFactory(c))}}function $r(i,t,e){const s=xn(i,t.textContent);if(s!==null){let n=t;for(let r=0,o=s.length;r<o;++r){const a=s[r],l=r===0?t:n.parentNode.insertBefore(document.createTextNode(""),n.nextSibling);typeof a=="string"?l.textContent=a:(l.textContent=" ",i.captureContentBinding(a)),n=l,i.targetIndex++,l!==t&&e.nextNode()}i.targetIndex--}}function Ir(i,t){const e=i.content;document.adoptNode(e);const s=is.borrow(t);Ds(s,i,!0);const n=s.behaviorFactories;s.reset();const r=$.createTemplateWalker(e);let o;for(;o=r.nextNode();)switch(s.targetIndex++,o.nodeType){case 1:Ds(s,o);break;case 3:$r(s,o,r);break;case 8:$.isMarker(o)&&s.addFactory(t[$.extractDirectiveIndexFromMarker(o)])}let a=0;($.isMarker(e.firstChild)||e.childNodes.length===1&&t.length)&&(e.insertBefore(document.createComment(""),e.firstChild),a=-1);const l=s.behaviorFactories;return s.release(),{fragment:e,viewBehaviorFactories:l,hostBehaviorFactories:n,targetOffset:a}}const xi=document.createRange();class Mr{constructor(t,e){this.fragment=t,this.behaviors=e,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const e=this.lastChild;if(t.previousSibling===e)return;const s=t.parentNode;let n=this.firstChild,r;for(;n!==e;)r=n.nextSibling,s.insertBefore(n,t),n=r;s.insertBefore(e,t)}}remove(){const t=this.fragment,e=this.lastChild;let s=this.firstChild,n;for(;s!==e;)n=s.nextSibling,t.appendChild(s),s=n;t.appendChild(e)}dispose(){const t=this.firstChild.parentNode,e=this.lastChild;let s=this.firstChild,n;for(;s!==e;)n=s.nextSibling,t.removeChild(s),s=n;t.removeChild(e);const r=this.behaviors,o=this.source;for(let a=0,l=r.length;a<l;++a)r[a].unbind(o)}bind(t,e){const s=this.behaviors;if(this.source!==t)if(this.source!==null){const n=this.source;this.source=t,this.context=e;for(let r=0,o=s.length;r<o;++r){const a=s[r];a.unbind(n),a.bind(t,e)}}else{this.source=t,this.context=e;for(let n=0,r=s.length;n<r;++n)s[n].bind(t,e)}}unbind(){if(this.source===null)return;const t=this.behaviors,e=this.source;for(let s=0,n=t.length;s<n;++s)t[s].unbind(e);this.source=null}static disposeContiguousBatch(t){if(t.length!==0){xi.setStartBefore(t[0].firstChild),xi.setEndAfter(t[t.length-1].lastChild),xi.deleteContents();for(let e=0,s=t.length;e<s;++e){const n=t[e],r=n.behaviors,o=n.source;for(let a=0,l=r.length;a<l;++a)r[a].unbind(o)}}}}class Ls{constructor(t,e){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=e}create(t){if(this.fragment===null){let c;const h=this.html;if(typeof h=="string"){c=document.createElement("template"),c.innerHTML=$.createHTML(h);const u=c.content.firstElementChild;u!==null&&u.tagName==="TEMPLATE"&&(c=u)}else c=h;const d=Ir(c,this.directives);this.fragment=d.fragment,this.viewBehaviorFactories=d.viewBehaviorFactories,this.hostBehaviorFactories=d.hostBehaviorFactories,this.targetOffset=d.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const e=this.fragment.cloneNode(!0),s=this.viewBehaviorFactories,n=new Array(this.behaviorCount),r=$.createTemplateWalker(e);let o=0,a=this.targetOffset,l=r.nextNode();for(let c=s.length;o<c;++o){const h=s[o],d=h.targetIndex;for(;l!==null;)if(a===d){n[o]=h.createBehavior(l);break}else l=r.nextNode(),a++}if(this.hasHostBehaviors){const c=this.hostBehaviorFactories;for(let h=0,d=c.length;h<d;++h,++o)n[o]=c[h].createBehavior(t)}return new Mr(e,n)}render(t,e,s){typeof e=="string"&&(e=document.getElementById(e)),s===void 0&&(s=e);const n=this.create(s);return n.bind(t,ye),n.appendTo(e),n}}const Dr=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function lt(i,...t){const e=[];let s="";for(let n=0,r=i.length-1;n<r;++n){const o=i[n];let a=t[n];if(s+=o,a instanceof Ls){const l=a;a=()=>l}if(typeof a=="function"&&(a=new es(a)),a instanceof yn){const l=Dr.exec(o);l!==null&&(a.targetName=l[2])}a instanceof ts?(s+=a.createPlaceholder(e.length),e.push(a)):s+=a}return s+=i[i.length-1],new Ls(s,e)}class st{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=this.behaviors===null?t:this.behaviors.concat(t),this}}st.create=(()=>{if($.supportsAdoptedStyleSheets){const i=new Map;return t=>new Lr(t,i)}return i=>new Vr(i)})();function ss(i){return i.map(t=>t instanceof st?ss(t.styles):[t]).reduce((t,e)=>t.concat(e),[])}function Sn(i){return i.map(t=>t instanceof st?t.behaviors:null).reduce((t,e)=>e===null?t:(t===null&&(t=[]),t.concat(e)),null)}let Rn=(i,t)=>{i.adoptedStyleSheets=[...i.adoptedStyleSheets,...t]},Cn=(i,t)=>{i.adoptedStyleSheets=i.adoptedStyleSheets.filter(e=>t.indexOf(e)===-1)};if($.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),Rn=(i,t)=>{i.adoptedStyleSheets.push(...t)},Cn=(i,t)=>{for(const e of t){const s=i.adoptedStyleSheets.indexOf(e);s!==-1&&i.adoptedStyleSheets.splice(s,1)}}}catch{}class Lr extends st{constructor(t,e){super(),this.styles=t,this.styleSheetCache=e,this._styleSheets=void 0,this.behaviors=Sn(t)}get styleSheets(){if(this._styleSheets===void 0){const t=this.styles,e=this.styleSheetCache;this._styleSheets=ss(t).map(s=>{if(s instanceof CSSStyleSheet)return s;let n=e.get(s);return n===void 0&&(n=new CSSStyleSheet,n.replaceSync(s),e.set(s,n)),n})}return this._styleSheets}addStylesTo(t){Rn(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){Cn(t,this.styleSheets),super.removeStylesFrom(t)}}let Fr=0;function Pr(){return`fast-style-class-${++Fr}`}class Vr extends st{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=Sn(t),this.styleSheets=ss(t),this.styleClass=Pr()}addStylesTo(t){const e=this.styleSheets,s=this.styleClass;t=this.normalizeTarget(t);for(let n=0;n<e.length;n++){const r=document.createElement("style");r.innerHTML=e[n],r.className=s,t.append(r)}super.addStylesTo(t)}removeStylesFrom(t){t=this.normalizeTarget(t);const e=t.querySelectorAll(`.${this.styleClass}`);for(let s=0,n=e.length;s<n;++s)t.removeChild(e[s]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const Ue=Object.freeze({locate:pn()}),kn={toView(i){return i?"true":"false"},fromView(i){return!(i==null||i==="false"||i===!1||i===0)}},ns={toView(i){if(i==null)return null;const t=i*1;return isNaN(t)?null:t.toString()},fromView(i){if(i==null)return null;const t=i*1;return isNaN(t)?null:t}};class We{constructor(t,e,s=e.toLowerCase(),n="reflect",r){this.guards=new Set,this.Owner=t,this.name=e,this.attribute=s,this.mode=n,this.converter=r,this.fieldName=`_${e}`,this.callbackName=`${e}Changed`,this.hasCallback=this.callbackName in t.prototype,n==="boolean"&&r===void 0&&(this.converter=kn)}setValue(t,e){const s=t[this.fieldName],n=this.converter;n!==void 0&&(e=n.fromView(e)),s!==e&&(t[this.fieldName]=e,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](s,e),t.$fastController.notify(this.name))}getValue(t){return V.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,e){this.guards.has(t)||(this.guards.add(t),this.setValue(t,e),this.guards.delete(t))}tryReflectToAttribute(t){const e=this.mode,s=this.guards;s.has(t)||e==="fromView"||$.queueUpdate(()=>{s.add(t);const n=t[this.fieldName];switch(e){case"reflect":const r=this.converter;$.setAttribute(t,this.attribute,r!==void 0?r.toView(n):n);break;case"boolean":$.setBooleanAttribute(t,this.attribute,n);break}s.delete(t)})}static collect(t,...e){const s=[];e.push(Ue.locate(t));for(let n=0,r=e.length;n<r;++n){const o=e[n];if(o!==void 0)for(let a=0,l=o.length;a<l;++a){const c=o[a];typeof c=="string"?s.push(new We(t,c)):s.push(new We(t,c.property,c.attribute,c.mode,c.converter))}}return s}}function v(i,t){let e;function s(n,r){arguments.length>1&&(e.property=r),Ue.locate(n.constructor).push(e)}if(arguments.length>1){e={},s(i,t);return}return e=i===void 0?{}:i,s}const Fs={mode:"open"},Ps={},Ni=Se.getById(4,()=>{const i=new Map;return Object.freeze({register(t){return i.has(t.type)?!1:(i.set(t.type,t),!0)},getByType(t){return i.get(t)}})});class Ke{constructor(t,e=t.definition){typeof e=="string"&&(e={name:e}),this.type=t,this.name=e.name,this.template=e.template;const s=We.collect(t,e.attributes),n=new Array(s.length),r={},o={};for(let a=0,l=s.length;a<l;++a){const c=s[a];n[a]=c.attribute,r[c.name]=c,o[c.attribute]=c}this.attributes=s,this.observedAttributes=n,this.propertyLookup=r,this.attributeLookup=o,this.shadowOptions=e.shadowOptions===void 0?Fs:e.shadowOptions===null?void 0:Object.assign(Object.assign({},Fs),e.shadowOptions),this.elementOptions=e.elementOptions===void 0?Ps:Object.assign(Object.assign({},Ps),e.elementOptions),this.styles=e.styles===void 0?void 0:Array.isArray(e.styles)?st.create(e.styles):e.styles instanceof st?e.styles:st.create([e.styles])}get isDefined(){return!!Ni.getByType(this.type)}define(t=customElements){const e=this.type;if(Ni.register(this)){const s=this.attributes,n=e.prototype;for(let r=0,o=s.length;r<o;++r)V.defineProperty(n,s[r]);Reflect.defineProperty(e,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,e,this.elementOptions),this}}Ke.forType=Ni.getByType;const En=new WeakMap,Ar={bubbles:!0,composed:!0,cancelable:!0};function Si(i){return i.shadowRoot||En.get(i)||null}class rs extends vn{constructor(t,e){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=e;const s=e.shadowOptions;if(s!==void 0){const r=t.attachShadow(s);s.mode==="closed"&&En.set(t,r)}const n=V.getAccessors(t);if(n.length>0){const r=this.boundObservables=Object.create(null);for(let o=0,a=n.length;o<a;++o){const l=n[o].name,c=t[l];c!==void 0&&(delete t[l],r[l]=c)}}}get isConnected(){return V.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,V.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=t,!this.needsInitialization&&t!==null&&this.addStyles(t))}addStyles(t){const e=Si(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.append(t);else if(!t.isAttachedTo(e)){const s=t.behaviors;t.addStylesTo(e),s!==null&&this.addBehaviors(s)}}removeStyles(t){const e=Si(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.removeChild(t);else if(t.isAttachedTo(e)){const s=t.behaviors;t.removeStylesFrom(e),s!==null&&this.removeBehaviors(s)}}addBehaviors(t){const e=this.behaviors||(this.behaviors=new Map),s=t.length,n=[];for(let r=0;r<s;++r){const o=t[r];e.has(o)?e.set(o,e.get(o)+1):(e.set(o,1),n.push(o))}if(this._isConnected){const r=this.element;for(let o=0;o<n.length;++o)n[o].bind(r,ye)}}removeBehaviors(t,e=!1){const s=this.behaviors;if(s===null)return;const n=t.length,r=[];for(let o=0;o<n;++o){const a=t[o];if(s.has(a)){const l=s.get(a)-1;l===0||e?s.delete(a)&&r.push(a):s.set(a,l)}}if(this._isConnected){const o=this.element;for(let a=0;a<r.length;++a)r[a].unbind(o)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(t,ye);const e=this.behaviors;if(e!==null)for(const[s]of e)s.bind(t,ye);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;t!==null&&t.unbind();const e=this.behaviors;if(e!==null){const s=this.element;for(const[n]of e)n.unbind(s)}}onAttributeChangedCallback(t,e,s){const n=this.definition.attributeLookup[t];n!==void 0&&n.onAttributeChangedCallback(this.element,s)}emit(t,e,s){return this._isConnected?this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:e},Ar),s))):!1}finishInitialization(){const t=this.element,e=this.boundObservables;if(e!==null){const n=Object.keys(e);for(let r=0,o=n.length;r<o;++r){const a=n[r];t[a]=e[a]}this.boundObservables=null}const s=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():s.template&&(this._template=s.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():s.styles&&(this._styles=s.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const e=this.element,s=Si(e)||e;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||$.removeChildNodes(s),t&&(this.view=t.render(e,s,e))}static forCustomElement(t){const e=t.$fastController;if(e!==void 0)return e;const s=Ke.forType(t.constructor);if(s===void 0)throw new Error("Missing FASTElement definition.");return t.$fastController=new rs(t,s)}}function Vs(i){return class extends i{constructor(){super(),rs.forCustomElement(this)}$emit(t,e,s){return this.$fastController.emit(t,e,s)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,e,s){this.$fastController.onAttributeChangedCallback(t,e,s)}}}const ti=Object.assign(Vs(HTMLElement),{from(i){return Vs(i)},define(i,t){return new Ke(i,t).define().type}});class os{createCSS(){return""}createBehavior(){}}function Tn(i,t){const e=[];let s="";const n=[];for(let r=0,o=i.length-1;r<o;++r){s+=i[r];let a=t[r];if(a instanceof os){const l=a.createBehavior();a=a.createCSS(),l&&n.push(l)}a instanceof st||a instanceof CSSStyleSheet?(s.trim()!==""&&(e.push(s),s=""),e.push(a)):s+=a}return s+=i[i.length-1],s.trim()!==""&&e.push(s),{styles:e,behaviors:n}}function R(i,...t){const{styles:e,behaviors:s}=Tn(i,t),n=st.create(e);return s.length&&n.withBehaviors(...s),n}class Nr extends os{constructor(t,e){super(),this.behaviors=e,this.css="";const s=t.reduce((n,r)=>(typeof r=="string"?this.css+=r:n.push(r),n),[]);s.length&&(this.styles=st.create(s))}createBehavior(){return this}createCSS(){return this.css}bind(t){this.styles&&t.$fastController.addStyles(this.styles),this.behaviors.length&&t.$fastController.addBehaviors(this.behaviors)}unbind(t){this.styles&&t.$fastController.removeStyles(this.styles),this.behaviors.length&&t.$fastController.removeBehaviors(this.behaviors)}}function Or(i,...t){const{styles:e,behaviors:s}=Tn(i,t);return new Nr(e,s)}class Br{constructor(t,e){this.target=t,this.propertyName=e}bind(t){t[this.propertyName]=this.target}unbind(){}}function ct(i){return new wn("fast-ref",Br,i)}const $n=i=>typeof i=="function",zr=()=>null;function As(i){return i===void 0?zr:$n(i)?i:()=>i}function as(i,t,e){const s=$n(i)?i:()=>i,n=As(t),r=As(e);return(o,a)=>s(o,a)?n(o,a):r(o,a)}function jr(i){return function(t,e,s){return t.nodeType===1&&t.matches(i)}}class Hr{constructor(t,e){this.target=t,this.options=e,this.source=null}bind(t){const e=this.options.property;this.shouldUpdate=V.getAccessors(t).some(s=>s.name===e),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(be),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return this.options.filter!==void 0&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class Ur extends Hr{constructor(t,e){super(t,e)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function ls(i){return typeof i=="string"&&(i={property:i}),new wn("fast-slotted",Ur,i)}class Wr{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const Gr=(i,t)=>lt`
    <span
        part="end"
        ${ct("endContainer")}
        class=${e=>t.end?"end":void 0}
    >
        <slot name="end" ${ct("end")} @slotchange="${e=>e.handleEndContentChange()}">
            ${t.end||""}
        </slot>
    </span>
`,qr=(i,t)=>lt`
    <span
        part="start"
        ${ct("startContainer")}
        class="${e=>t.start?"start":void 0}"
    >
        <slot
            name="start"
            ${ct("start")}
            @slotchange="${e=>e.handleStartContentChange()}"
        >
            ${t.start||""}
        </slot>
    </span>
`;lt`
    <span part="end" ${ct("endContainer")}>
        <slot
            name="end"
            ${ct("end")}
            @slotchange="${i=>i.handleEndContentChange()}"
        ></slot>
    </span>
`;lt`
    <span part="start" ${ct("startContainer")}>
        <slot
            name="start"
            ${ct("start")}
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
***************************************************************************** */function g(i,t,e,s){var n=arguments.length,r=n<3?t:s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(i,t,e,s);else for(var a=i.length-1;a>=0;a--)(o=i[a])&&(r=(n<3?o(r):n>3?o(t,e,r):o(t,e))||r);return n>3&&r&&Object.defineProperty(t,e,r),r}const Ri=new Map;"metadata"in Reflect||(Reflect.metadata=function(i,t){return function(e){Reflect.defineMetadata(i,t,e)}},Reflect.defineMetadata=function(i,t,e){let s=Ri.get(e);s===void 0&&Ri.set(e,s=new Map),s.set(i,t)},Reflect.getOwnMetadata=function(i,t){const e=Ri.get(t);if(e!==void 0)return e.get(i)});class _r{constructor(t,e){this.container=t,this.key=e}instance(t){return this.registerResolver(0,t)}singleton(t){return this.registerResolver(1,t)}transient(t){return this.registerResolver(2,t)}callback(t){return this.registerResolver(3,t)}cachedCallback(t){return this.registerResolver(3,Mn(t))}aliasTo(t){return this.registerResolver(5,t)}registerResolver(t,e){const{container:s,key:n}=this;return this.container=this.key=void 0,s.registerResolver(n,new mt(n,t,e))}}function le(i){const t=i.slice(),e=Object.keys(i),s=e.length;let n;for(let r=0;r<s;++r)n=e[r],Dn(n)||(t[n]=i[n]);return t}const Yr=Object.freeze({none(i){throw Error(`${i.toString()} not registered, did you forget to add @singleton()?`)},singleton(i){return new mt(i,1,i)},transient(i){return new mt(i,2,i)}}),Ci=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:Yr.singleton})}),Ns=new Map;function Os(i){return t=>Reflect.getOwnMetadata(i,t)}let Bs=null;const F=Object.freeze({createContainer(i){return new we(null,Object.assign({},Ci.default,i))},findResponsibleContainer(i){const t=i.$$container$$;return t&&t.responsibleForOwnerRequests?t:F.findParentContainer(i)},findParentContainer(i){const t=new CustomEvent(In,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return i.dispatchEvent(t),t.detail.container||F.getOrCreateDOMContainer()},getOrCreateDOMContainer(i,t){return i?i.$$container$$||new we(i,Object.assign({},Ci.default,t,{parentLocator:F.findParentContainer})):Bs||(Bs=new we(null,Object.assign({},Ci.default,t,{parentLocator:()=>null})))},getDesignParamtypes:Os("design:paramtypes"),getAnnotationParamtypes:Os("di:paramtypes"),getOrCreateAnnotationParamTypes(i){let t=this.getAnnotationParamtypes(i);return t===void 0&&Reflect.defineMetadata("di:paramtypes",t=[],i),t},getDependencies(i){let t=Ns.get(i);if(t===void 0){const e=i.inject;if(e===void 0){const s=F.getDesignParamtypes(i),n=F.getAnnotationParamtypes(i);if(s===void 0)if(n===void 0){const r=Object.getPrototypeOf(i);typeof r=="function"&&r!==Function.prototype?t=le(F.getDependencies(r)):t=[]}else t=le(n);else if(n===void 0)t=le(s);else{t=le(s);let r=n.length,o;for(let c=0;c<r;++c)o=n[c],o!==void 0&&(t[c]=o);const a=Object.keys(n);r=a.length;let l;for(let c=0;c<r;++c)l=a[c],Dn(l)||(t[l]=n[l])}}else t=le(e);Ns.set(i,t)}return t},defineProperty(i,t,e,s=!1){const n=`$di_${t}`;Reflect.defineProperty(i,t,{get:function(){let r=this[n];if(r===void 0&&(r=(this instanceof HTMLElement?F.findResponsibleContainer(this):F.getOrCreateDOMContainer()).get(e),this[n]=r,s&&this instanceof ti)){const a=this.$fastController,l=()=>{const h=F.findResponsibleContainer(this).get(e),d=this[n];h!==d&&(this[n]=r,a.notify(t))};a.subscribe({handleChange:l},"isConnected")}return r}})},createInterface(i,t){const e=typeof i=="function"?i:t,s=typeof i=="string"?i:i&&"friendlyName"in i&&i.friendlyName||Us,n=typeof i=="string"?!1:i&&"respectConnection"in i&&i.respectConnection||!1,r=function(o,a,l){if(o==null||new.target!==void 0)throw new Error(`No registration for interface: '${r.friendlyName}'`);if(a)F.defineProperty(o,a,r,n);else{const c=F.getOrCreateAnnotationParamTypes(o);c[l]=r}};return r.$isInterface=!0,r.friendlyName=s??"(anonymous)",e!=null&&(r.register=function(o,a){return e(new _r(o,a??r))}),r.toString=function(){return`InterfaceSymbol<${r.friendlyName}>`},r},inject(...i){return function(t,e,s){if(typeof s=="number"){const n=F.getOrCreateAnnotationParamTypes(t),r=i[0];r!==void 0&&(n[s]=r)}else if(e)F.defineProperty(t,e,i[0]);else{const n=s?F.getOrCreateAnnotationParamTypes(s.value):F.getOrCreateAnnotationParamTypes(t);let r;for(let o=0;o<i.length;++o)r=i[o],r!==void 0&&(n[o]=r)}}},transient(i){return i.register=function(e){return Ce.transient(i,i).register(e)},i.registerInRequestor=!1,i},singleton(i,t=Qr){return i.register=function(s){return Ce.singleton(i,i).register(s)},i.registerInRequestor=t.scoped,i}}),Xr=F.createInterface("Container");F.inject;const Qr={scoped:!1};class mt{constructor(t,e,s){this.key=t,this.strategy=e,this.state=s,this.resolving=!1}get $isResolver(){return!0}register(t){return t.registerResolver(this.key,this)}resolve(t,e){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=t.getFactory(this.state).construct(e),this.strategy=0,this.resolving=!1,this.state}case 2:{const s=t.getFactory(this.state);if(s===null)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return s.construct(e)}case 3:return this.state(t,e,this);case 4:return this.state[0].resolve(t,e);case 5:return e.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(t){var e,s,n;switch(this.strategy){case 1:case 2:return t.getFactory(this.state);case 5:return(n=(s=(e=t.getResolver(this.state))===null||e===void 0?void 0:e.getFactory)===null||s===void 0?void 0:s.call(e,t))!==null&&n!==void 0?n:null;default:return null}}}function zs(i){return this.get(i)}function Zr(i,t){return t(i)}class Jr{constructor(t,e){this.Type=t,this.dependencies=e,this.transformers=null}construct(t,e){let s;return e===void 0?s=new this.Type(...this.dependencies.map(zs,t)):s=new this.Type(...this.dependencies.map(zs,t),...e),this.transformers==null?s:this.transformers.reduce(Zr,s)}registerTransformer(t){(this.transformers||(this.transformers=[])).push(t)}}const Kr={$isResolver:!0,resolve(i,t){return t}};function ze(i){return typeof i.register=="function"}function to(i){return ze(i)&&typeof i.registerInRequestor=="boolean"}function js(i){return to(i)&&i.registerInRequestor}function eo(i){return i.prototype!==void 0}const io=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),In="__DI_LOCATE_PARENT__",ki=new Map;class we{constructor(t,e){this.owner=t,this.config=e,this._parent=void 0,this.registerDepth=0,this.context=null,t!==null&&(t.$$container$$=this),this.resolvers=new Map,this.resolvers.set(Xr,Kr),t instanceof Node&&t.addEventListener(In,s=>{s.composedPath()[0]!==this.owner&&(s.detail.container=this,s.stopImmediatePropagation())})}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(t,...e){return this.context=t,this.register(...e),this.context=null,this}register(...t){if(++this.registerDepth===100)throw new Error("Unable to autoregister dependency");let e,s,n,r,o;const a=this.context;for(let l=0,c=t.length;l<c;++l)if(e=t[l],!!Ws(e))if(ze(e))e.register(this,a);else if(eo(e))Ce.singleton(e,e).register(this);else for(s=Object.keys(e),r=0,o=s.length;r<o;++r)n=e[s[r]],Ws(n)&&(ze(n)?n.register(this,a):this.register(n));return--this.registerDepth,this}registerResolver(t,e){Pe(t);const s=this.resolvers,n=s.get(t);return n==null?s.set(t,e):n instanceof mt&&n.strategy===4?n.state.push(e):s.set(t,new mt(t,4,[n,e])),e}registerTransformer(t,e){const s=this.getResolver(t);if(s==null)return!1;if(s.getFactory){const n=s.getFactory(this);return n==null?!1:(n.registerTransformer(e),!0)}return!1}getResolver(t,e=!0){if(Pe(t),t.resolve!==void 0)return t;let s=this,n;for(;s!=null;)if(n=s.resolvers.get(t),n==null){if(s.parent==null){const r=js(t)?this:s;return e?this.jitRegister(t,r):null}s=s.parent}else return n;return null}has(t,e=!1){return this.resolvers.has(t)?!0:e&&this.parent!=null?this.parent.has(t,!0):!1}get(t){if(Pe(t),t.$isResolver)return t.resolve(this,this);let e=this,s;for(;e!=null;)if(s=e.resolvers.get(t),s==null){if(e.parent==null){const n=js(t)?this:e;return s=this.jitRegister(t,n),s.resolve(e,this)}e=e.parent}else return s.resolve(e,this);throw new Error(`Unable to resolve key: ${t}`)}getAll(t,e=!1){Pe(t);const s=this;let n=s,r;if(e){let o=be;for(;n!=null;)r=n.resolvers.get(t),r!=null&&(o=o.concat(Hs(r,n,s))),n=n.parent;return o}else for(;n!=null;)if(r=n.resolvers.get(t),r==null){if(n=n.parent,n==null)return be}else return Hs(r,n,s);return be}getFactory(t){let e=ki.get(t);if(e===void 0){if(so(t))throw new Error(`${t.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);ki.set(t,e=new Jr(t,F.getDependencies(t)))}return e}registerFactory(t,e){ki.set(t,e)}createChild(t){return new we(null,Object.assign({},this.config,t,{parentLocator:()=>this}))}jitRegister(t,e){if(typeof t!="function")throw new Error(`Attempted to jitRegister something that is not a constructor: '${t}'. Did you forget to register this dependency?`);if(io.has(t.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${t.name}. Did you forget to add @inject(Key)`);if(ze(t)){const s=t.register(e);if(!(s instanceof Object)||s.resolve==null){const n=e.resolvers.get(t);if(n!=null)return n;throw new Error("A valid resolver was not returned from the static register method")}return s}else{if(t.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${t.friendlyName}`);{const s=this.config.defaultResolver(t,e);return e.resolvers.set(t,s),s}}}}const Ei=new WeakMap;function Mn(i){return function(t,e,s){if(Ei.has(s))return Ei.get(s);const n=i(t,e,s);return Ei.set(s,n),n}}const Ce=Object.freeze({instance(i,t){return new mt(i,0,t)},singleton(i,t){return new mt(i,1,t)},transient(i,t){return new mt(i,2,t)},callback(i,t){return new mt(i,3,t)},cachedCallback(i,t){return new mt(i,3,Mn(t))},aliasTo(i,t){return new mt(t,5,i)}});function Pe(i){if(i==null)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function Hs(i,t,e){if(i instanceof mt&&i.strategy===4){const s=i.state;let n=s.length;const r=new Array(n);for(;n--;)r[n]=s[n].resolve(t,e);return r}return[i.resolve(t,e)]}const Us="(anonymous)";function Ws(i){return typeof i=="object"&&i!==null||typeof i=="function"}const so=function(){const i=new WeakMap;let t=!1,e="",s=0;return function(n){return t=i.get(n),t===void 0&&(e=n.toString(),s=e.length,t=s>=29&&s<=100&&e.charCodeAt(s-1)===125&&e.charCodeAt(s-2)<=32&&e.charCodeAt(s-3)===93&&e.charCodeAt(s-4)===101&&e.charCodeAt(s-5)===100&&e.charCodeAt(s-6)===111&&e.charCodeAt(s-7)===99&&e.charCodeAt(s-8)===32&&e.charCodeAt(s-9)===101&&e.charCodeAt(s-10)===118&&e.charCodeAt(s-11)===105&&e.charCodeAt(s-12)===116&&e.charCodeAt(s-13)===97&&e.charCodeAt(s-14)===110&&e.charCodeAt(s-15)===88,i.set(n,t)),t}}(),Ve={};function Dn(i){switch(typeof i){case"number":return i>=0&&(i|0)===i;case"string":{const t=Ve[i];if(t!==void 0)return t;const e=i.length;if(e===0)return Ve[i]=!1;let s=0;for(let n=0;n<e;++n)if(s=i.charCodeAt(n),n===0&&s===48&&e>1||s<48||s>57)return Ve[i]=!1;return Ve[i]=!0}default:return!1}}function Gs(i){return`${i.toLowerCase()}:presentation`}const Ae=new Map,Ln=Object.freeze({define(i,t,e){const s=Gs(i);Ae.get(s)===void 0?Ae.set(s,t):Ae.set(s,!1),e.register(Ce.instance(s,t))},forTag(i,t){const e=Gs(i),s=Ae.get(e);return s===!1?F.findResponsibleContainer(t).get(e):s||null}});class no{constructor(t,e){this.template=t||null,this.styles=e===void 0?null:Array.isArray(e)?st.create(e):e instanceof st?e:st.create([e])}applyTo(t){const e=t.$fastController;e.template===null&&(e.template=this.template),e.styles===null&&(e.styles=this.styles)}}class ht extends ti{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return this._presentation===void 0&&(this._presentation=Ln.forTag(this.tagName,this)),this._presentation}templateChanged(){this.template!==void 0&&(this.$fastController.template=this.template)}stylesChanged(){this.styles!==void 0&&(this.$fastController.styles=this.styles)}connectedCallback(){this.$presentation!==null&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(t){return(e={})=>new ro(this===ht?class extends ht{}:this,t,e)}}g([x],ht.prototype,"template",void 0);g([x],ht.prototype,"styles",void 0);function ce(i,t,e){return typeof i=="function"?i(t,e):i}class ro{constructor(t,e,s){this.type=t,this.elementDefinition=e,this.overrideDefinition=s,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(t,e){const s=this.definition,n=this.overrideDefinition,o=`${s.prefix||e.elementPrefix}-${s.baseName}`;e.tryDefineElement({name:o,type:this.type,baseClass:this.elementDefinition.baseClass,callback:a=>{const l=new no(ce(s.template,a,s),ce(s.styles,a,s));a.definePresentation(l);let c=ce(s.shadowOptions,a,s);a.shadowRootMode&&(c?n.shadowOptions||(c.mode=a.shadowRootMode):c!==null&&(c={mode:a.shadowRootMode})),a.defineElement({elementOptions:ce(s.elementOptions,a,s),shadowOptions:c,attributes:ce(s.attributes,a,s)})}})}}function Fn(i,...t){const e=Ue.locate(i);t.forEach(s=>{Object.getOwnPropertyNames(s.prototype).forEach(r=>{r!=="constructor"&&Object.defineProperty(i.prototype,r,Object.getOwnPropertyDescriptor(s.prototype,r))}),Ue.locate(s).forEach(r=>e.push(r))})}const Z={horizontal:"horizontal",vertical:"vertical"};function oo(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function ao(){const i=document.querySelector('meta[property="csp-nonce"]');return i?i.getAttribute("content"):null}let zt;function lo(){if(typeof zt=="boolean")return zt;if(!oo())return zt=!1,zt;const i=document.createElement("style"),t=ao();t!==null&&i.setAttribute("nonce",t),document.head.appendChild(i);try{i.sheet.insertRule("foo:focus-visible {color:inherit}",0),zt=!0}catch{zt=!1}finally{document.head.removeChild(i)}return zt}const qs="resize",_s="scroll";var Ys;(function(i){i[i.alt=18]="alt",i[i.arrowDown=40]="arrowDown",i[i.arrowLeft=37]="arrowLeft",i[i.arrowRight=39]="arrowRight",i[i.arrowUp=38]="arrowUp",i[i.back=8]="back",i[i.backSlash=220]="backSlash",i[i.break=19]="break",i[i.capsLock=20]="capsLock",i[i.closeBracket=221]="closeBracket",i[i.colon=186]="colon",i[i.colon2=59]="colon2",i[i.comma=188]="comma",i[i.ctrl=17]="ctrl",i[i.delete=46]="delete",i[i.end=35]="end",i[i.enter=13]="enter",i[i.equals=187]="equals",i[i.equals2=61]="equals2",i[i.equals3=107]="equals3",i[i.escape=27]="escape",i[i.forwardSlash=191]="forwardSlash",i[i.function1=112]="function1",i[i.function10=121]="function10",i[i.function11=122]="function11",i[i.function12=123]="function12",i[i.function2=113]="function2",i[i.function3=114]="function3",i[i.function4=115]="function4",i[i.function5=116]="function5",i[i.function6=117]="function6",i[i.function7=118]="function7",i[i.function8=119]="function8",i[i.function9=120]="function9",i[i.home=36]="home",i[i.insert=45]="insert",i[i.menu=93]="menu",i[i.minus=189]="minus",i[i.minus2=109]="minus2",i[i.numLock=144]="numLock",i[i.numPad0=96]="numPad0",i[i.numPad1=97]="numPad1",i[i.numPad2=98]="numPad2",i[i.numPad3=99]="numPad3",i[i.numPad4=100]="numPad4",i[i.numPad5=101]="numPad5",i[i.numPad6=102]="numPad6",i[i.numPad7=103]="numPad7",i[i.numPad8=104]="numPad8",i[i.numPad9=105]="numPad9",i[i.numPadDivide=111]="numPadDivide",i[i.numPadDot=110]="numPadDot",i[i.numPadMinus=109]="numPadMinus",i[i.numPadMultiply=106]="numPadMultiply",i[i.numPadPlus=107]="numPadPlus",i[i.openBracket=219]="openBracket",i[i.pageDown=34]="pageDown",i[i.pageUp=33]="pageUp",i[i.period=190]="period",i[i.print=44]="print",i[i.quote=222]="quote",i[i.scrollLock=145]="scrollLock",i[i.shift=16]="shift",i[i.space=32]="space",i[i.tab=9]="tab",i[i.tilde=192]="tilde",i[i.windowsLeft=91]="windowsLeft",i[i.windowsOpera=219]="windowsOpera",i[i.windowsRight=92]="windowsRight"})(Ys||(Ys={}));const cs="ArrowDown",Ge="ArrowLeft",qe="ArrowRight",hs="ArrowUp",Pn="Enter",Vn="Escape",co="Home",ho="End",uo=" ",fo="Tab",go={ArrowDown:cs,ArrowLeft:Ge,ArrowRight:qe,ArrowUp:hs};var O;(function(i){i.ltr="ltr",i.rtl="rtl"})(O||(O={}));function po(i,t,e){return Math.min(Math.max(e,i),t)}var p;(function(i){i.Canvas="Canvas",i.CanvasText="CanvasText",i.LinkText="LinkText",i.VisitedText="VisitedText",i.ActiveText="ActiveText",i.ButtonFace="ButtonFace",i.ButtonText="ButtonText",i.Field="Field",i.FieldText="FieldText",i.Highlight="Highlight",i.HighlightText="HighlightText",i.GrayText="GrayText"})(p||(p={}));class B{}g([v({attribute:"aria-atomic"})],B.prototype,"ariaAtomic",void 0);g([v({attribute:"aria-busy"})],B.prototype,"ariaBusy",void 0);g([v({attribute:"aria-controls"})],B.prototype,"ariaControls",void 0);g([v({attribute:"aria-current"})],B.prototype,"ariaCurrent",void 0);g([v({attribute:"aria-describedby"})],B.prototype,"ariaDescribedby",void 0);g([v({attribute:"aria-details"})],B.prototype,"ariaDetails",void 0);g([v({attribute:"aria-disabled"})],B.prototype,"ariaDisabled",void 0);g([v({attribute:"aria-errormessage"})],B.prototype,"ariaErrormessage",void 0);g([v({attribute:"aria-flowto"})],B.prototype,"ariaFlowto",void 0);g([v({attribute:"aria-haspopup"})],B.prototype,"ariaHaspopup",void 0);g([v({attribute:"aria-hidden"})],B.prototype,"ariaHidden",void 0);g([v({attribute:"aria-invalid"})],B.prototype,"ariaInvalid",void 0);g([v({attribute:"aria-keyshortcuts"})],B.prototype,"ariaKeyshortcuts",void 0);g([v({attribute:"aria-label"})],B.prototype,"ariaLabel",void 0);g([v({attribute:"aria-labelledby"})],B.prototype,"ariaLabelledby",void 0);g([v({attribute:"aria-live"})],B.prototype,"ariaLive",void 0);g([v({attribute:"aria-owns"})],B.prototype,"ariaOwns",void 0);g([v({attribute:"aria-relevant"})],B.prototype,"ariaRelevant",void 0);g([v({attribute:"aria-roledescription"})],B.prototype,"ariaRoledescription",void 0);const ke=i=>{const t=i.closest("[dir]");return t!==null&&t.dir==="rtl"?O.rtl:O.ltr};class mo{constructor(){this.intersectionDetector=null,this.observedElements=new Map,this.requestPosition=(t,e)=>{var s;if(this.intersectionDetector!==null){if(this.observedElements.has(t)){(s=this.observedElements.get(t))===null||s===void 0||s.push(e);return}this.observedElements.set(t,[e]),this.intersectionDetector.observe(t)}},this.cancelRequestPosition=(t,e)=>{const s=this.observedElements.get(t);if(s!==void 0){const n=s.indexOf(e);n!==-1&&s.splice(n,1)}},this.initializeIntersectionDetector=()=>{Ft.IntersectionObserver&&(this.intersectionDetector=new IntersectionObserver(this.handleIntersection,{root:null,rootMargin:"0px",threshold:[0,1]}))},this.handleIntersection=t=>{if(this.intersectionDetector===null)return;const e=[],s=[];t.forEach(n=>{var r;(r=this.intersectionDetector)===null||r===void 0||r.unobserve(n.target);const o=this.observedElements.get(n.target);o!==void 0&&(o.forEach(a=>{let l=e.indexOf(a);l===-1&&(l=e.length,e.push(a),s.push([])),s[l].push(n)}),this.observedElements.delete(n.target))}),e.forEach((n,r)=>{n(s[r])})},this.initializeIntersectionDetector()}}class I extends ht{constructor(){super(...arguments),this.anchor="",this.viewport="",this.horizontalPositioningMode="uncontrolled",this.horizontalDefaultPosition="unset",this.horizontalViewportLock=!1,this.horizontalInset=!1,this.horizontalScaling="content",this.verticalPositioningMode="uncontrolled",this.verticalDefaultPosition="unset",this.verticalViewportLock=!1,this.verticalInset=!1,this.verticalScaling="content",this.fixedPlacement=!1,this.autoUpdateMode="anchor",this.anchorElement=null,this.viewportElement=null,this.initialLayoutComplete=!1,this.resizeDetector=null,this.baseHorizontalOffset=0,this.baseVerticalOffset=0,this.pendingPositioningUpdate=!1,this.pendingReset=!1,this.currentDirection=O.ltr,this.regionVisible=!1,this.forceUpdate=!1,this.updateThreshold=.5,this.update=()=>{this.pendingPositioningUpdate||this.requestPositionUpdates()},this.startObservers=()=>{this.stopObservers(),this.anchorElement!==null&&(this.requestPositionUpdates(),this.resizeDetector!==null&&(this.resizeDetector.observe(this.anchorElement),this.resizeDetector.observe(this)))},this.requestPositionUpdates=()=>{this.anchorElement===null||this.pendingPositioningUpdate||(I.intersectionService.requestPosition(this,this.handleIntersection),I.intersectionService.requestPosition(this.anchorElement,this.handleIntersection),this.viewportElement!==null&&I.intersectionService.requestPosition(this.viewportElement,this.handleIntersection),this.pendingPositioningUpdate=!0)},this.stopObservers=()=>{this.pendingPositioningUpdate&&(this.pendingPositioningUpdate=!1,I.intersectionService.cancelRequestPosition(this,this.handleIntersection),this.anchorElement!==null&&I.intersectionService.cancelRequestPosition(this.anchorElement,this.handleIntersection),this.viewportElement!==null&&I.intersectionService.cancelRequestPosition(this.viewportElement,this.handleIntersection)),this.resizeDetector!==null&&this.resizeDetector.disconnect()},this.getViewport=()=>typeof this.viewport!="string"||this.viewport===""?document.documentElement:document.getElementById(this.viewport),this.getAnchor=()=>document.getElementById(this.anchor),this.handleIntersection=t=>{this.pendingPositioningUpdate&&(this.pendingPositioningUpdate=!1,this.applyIntersectionEntries(t)&&this.updateLayout())},this.applyIntersectionEntries=t=>{const e=t.find(r=>r.target===this),s=t.find(r=>r.target===this.anchorElement),n=t.find(r=>r.target===this.viewportElement);return e===void 0||n===void 0||s===void 0?!1:!this.regionVisible||this.forceUpdate||this.regionRect===void 0||this.anchorRect===void 0||this.viewportRect===void 0||this.isRectDifferent(this.anchorRect,s.boundingClientRect)||this.isRectDifferent(this.viewportRect,n.boundingClientRect)||this.isRectDifferent(this.regionRect,e.boundingClientRect)?(this.regionRect=e.boundingClientRect,this.anchorRect=s.boundingClientRect,this.viewportElement===document.documentElement?this.viewportRect=new DOMRectReadOnly(n.boundingClientRect.x+document.documentElement.scrollLeft,n.boundingClientRect.y+document.documentElement.scrollTop,n.boundingClientRect.width,n.boundingClientRect.height):this.viewportRect=n.boundingClientRect,this.updateRegionOffset(),this.forceUpdate=!1,!0):!1},this.updateRegionOffset=()=>{this.anchorRect&&this.regionRect&&(this.baseHorizontalOffset=this.baseHorizontalOffset+(this.anchorRect.left-this.regionRect.left)+(this.translateX-this.baseHorizontalOffset),this.baseVerticalOffset=this.baseVerticalOffset+(this.anchorRect.top-this.regionRect.top)+(this.translateY-this.baseVerticalOffset))},this.isRectDifferent=(t,e)=>Math.abs(t.top-e.top)>this.updateThreshold||Math.abs(t.right-e.right)>this.updateThreshold||Math.abs(t.bottom-e.bottom)>this.updateThreshold||Math.abs(t.left-e.left)>this.updateThreshold,this.handleResize=t=>{this.update()},this.reset=()=>{this.pendingReset&&(this.pendingReset=!1,this.anchorElement===null&&(this.anchorElement=this.getAnchor()),this.viewportElement===null&&(this.viewportElement=this.getViewport()),this.currentDirection=ke(this),this.startObservers())},this.updateLayout=()=>{let t,e;if(this.horizontalPositioningMode!=="uncontrolled"){const r=this.getPositioningOptions(this.horizontalInset);if(this.horizontalDefaultPosition==="center")e="center";else if(this.horizontalDefaultPosition!=="unset"){let u=this.horizontalDefaultPosition;if(u==="start"||u==="end"){const f=ke(this);if(f!==this.currentDirection){this.currentDirection=f,this.initialize();return}this.currentDirection===O.ltr?u=u==="start"?"left":"right":u=u==="start"?"right":"left"}switch(u){case"left":e=this.horizontalInset?"insetStart":"start";break;case"right":e=this.horizontalInset?"insetEnd":"end";break}}const o=this.horizontalThreshold!==void 0?this.horizontalThreshold:this.regionRect!==void 0?this.regionRect.width:0,a=this.anchorRect!==void 0?this.anchorRect.left:0,l=this.anchorRect!==void 0?this.anchorRect.right:0,c=this.anchorRect!==void 0?this.anchorRect.width:0,h=this.viewportRect!==void 0?this.viewportRect.left:0,d=this.viewportRect!==void 0?this.viewportRect.right:0;(e===void 0||this.horizontalPositioningMode!=="locktodefault"&&this.getAvailableSpace(e,a,l,c,h,d)<o)&&(e=this.getAvailableSpace(r[0],a,l,c,h,d)>this.getAvailableSpace(r[1],a,l,c,h,d)?r[0]:r[1])}if(this.verticalPositioningMode!=="uncontrolled"){const r=this.getPositioningOptions(this.verticalInset);if(this.verticalDefaultPosition==="center")t="center";else if(this.verticalDefaultPosition!=="unset")switch(this.verticalDefaultPosition){case"top":t=this.verticalInset?"insetStart":"start";break;case"bottom":t=this.verticalInset?"insetEnd":"end";break}const o=this.verticalThreshold!==void 0?this.verticalThreshold:this.regionRect!==void 0?this.regionRect.height:0,a=this.anchorRect!==void 0?this.anchorRect.top:0,l=this.anchorRect!==void 0?this.anchorRect.bottom:0,c=this.anchorRect!==void 0?this.anchorRect.height:0,h=this.viewportRect!==void 0?this.viewportRect.top:0,d=this.viewportRect!==void 0?this.viewportRect.bottom:0;(t===void 0||this.verticalPositioningMode!=="locktodefault"&&this.getAvailableSpace(t,a,l,c,h,d)<o)&&(t=this.getAvailableSpace(r[0],a,l,c,h,d)>this.getAvailableSpace(r[1],a,l,c,h,d)?r[0]:r[1])}const s=this.getNextRegionDimension(e,t),n=this.horizontalPosition!==e||this.verticalPosition!==t;if(this.setHorizontalPosition(e,s),this.setVerticalPosition(t,s),this.updateRegionStyle(),!this.initialLayoutComplete){this.initialLayoutComplete=!0,this.requestPositionUpdates();return}this.regionVisible||(this.regionVisible=!0,this.style.removeProperty("pointer-events"),this.style.removeProperty("opacity"),this.classList.toggle("loaded",!0),this.$emit("loaded",this,{bubbles:!1})),this.updatePositionClasses(),n&&this.$emit("positionchange",this,{bubbles:!1})},this.updateRegionStyle=()=>{this.style.width=this.regionWidth,this.style.height=this.regionHeight,this.style.transform=`translate(${this.translateX}px, ${this.translateY}px)`},this.updatePositionClasses=()=>{this.classList.toggle("top",this.verticalPosition==="start"),this.classList.toggle("bottom",this.verticalPosition==="end"),this.classList.toggle("inset-top",this.verticalPosition==="insetStart"),this.classList.toggle("inset-bottom",this.verticalPosition==="insetEnd"),this.classList.toggle("vertical-center",this.verticalPosition==="center"),this.classList.toggle("left",this.horizontalPosition==="start"),this.classList.toggle("right",this.horizontalPosition==="end"),this.classList.toggle("inset-left",this.horizontalPosition==="insetStart"),this.classList.toggle("inset-right",this.horizontalPosition==="insetEnd"),this.classList.toggle("horizontal-center",this.horizontalPosition==="center")},this.setHorizontalPosition=(t,e)=>{if(t===void 0||this.regionRect===void 0||this.anchorRect===void 0||this.viewportRect===void 0)return;let s=0;switch(this.horizontalScaling){case"anchor":case"fill":s=this.horizontalViewportLock?this.viewportRect.width:e.width,this.regionWidth=`${s}px`;break;case"content":s=this.regionRect.width,this.regionWidth="unset";break}let n=0;switch(t){case"start":this.translateX=this.baseHorizontalOffset-s,this.horizontalViewportLock&&this.anchorRect.left>this.viewportRect.right&&(this.translateX=this.translateX-(this.anchorRect.left-this.viewportRect.right));break;case"insetStart":this.translateX=this.baseHorizontalOffset-s+this.anchorRect.width,this.horizontalViewportLock&&this.anchorRect.right>this.viewportRect.right&&(this.translateX=this.translateX-(this.anchorRect.right-this.viewportRect.right));break;case"insetEnd":this.translateX=this.baseHorizontalOffset,this.horizontalViewportLock&&this.anchorRect.left<this.viewportRect.left&&(this.translateX=this.translateX-(this.anchorRect.left-this.viewportRect.left));break;case"end":this.translateX=this.baseHorizontalOffset+this.anchorRect.width,this.horizontalViewportLock&&this.anchorRect.right<this.viewportRect.left&&(this.translateX=this.translateX-(this.anchorRect.right-this.viewportRect.left));break;case"center":if(n=(this.anchorRect.width-s)/2,this.translateX=this.baseHorizontalOffset+n,this.horizontalViewportLock){const r=this.anchorRect.left+n,o=this.anchorRect.right-n;r<this.viewportRect.left&&!(o>this.viewportRect.right)?this.translateX=this.translateX-(r-this.viewportRect.left):o>this.viewportRect.right&&!(r<this.viewportRect.left)&&(this.translateX=this.translateX-(o-this.viewportRect.right))}break}this.horizontalPosition=t},this.setVerticalPosition=(t,e)=>{if(t===void 0||this.regionRect===void 0||this.anchorRect===void 0||this.viewportRect===void 0)return;let s=0;switch(this.verticalScaling){case"anchor":case"fill":s=this.verticalViewportLock?this.viewportRect.height:e.height,this.regionHeight=`${s}px`;break;case"content":s=this.regionRect.height,this.regionHeight="unset";break}let n=0;switch(t){case"start":this.translateY=this.baseVerticalOffset-s,this.verticalViewportLock&&this.anchorRect.top>this.viewportRect.bottom&&(this.translateY=this.translateY-(this.anchorRect.top-this.viewportRect.bottom));break;case"insetStart":this.translateY=this.baseVerticalOffset-s+this.anchorRect.height,this.verticalViewportLock&&this.anchorRect.bottom>this.viewportRect.bottom&&(this.translateY=this.translateY-(this.anchorRect.bottom-this.viewportRect.bottom));break;case"insetEnd":this.translateY=this.baseVerticalOffset,this.verticalViewportLock&&this.anchorRect.top<this.viewportRect.top&&(this.translateY=this.translateY-(this.anchorRect.top-this.viewportRect.top));break;case"end":this.translateY=this.baseVerticalOffset+this.anchorRect.height,this.verticalViewportLock&&this.anchorRect.bottom<this.viewportRect.top&&(this.translateY=this.translateY-(this.anchorRect.bottom-this.viewportRect.top));break;case"center":if(n=(this.anchorRect.height-s)/2,this.translateY=this.baseVerticalOffset+n,this.verticalViewportLock){const r=this.anchorRect.top+n,o=this.anchorRect.bottom-n;r<this.viewportRect.top&&!(o>this.viewportRect.bottom)?this.translateY=this.translateY-(r-this.viewportRect.top):o>this.viewportRect.bottom&&!(r<this.viewportRect.top)&&(this.translateY=this.translateY-(o-this.viewportRect.bottom))}}this.verticalPosition=t},this.getPositioningOptions=t=>t?["insetStart","insetEnd"]:["start","end"],this.getAvailableSpace=(t,e,s,n,r,o)=>{const a=e-r,l=o-(e+n);switch(t){case"start":return a;case"insetStart":return a+n;case"insetEnd":return l+n;case"end":return l;case"center":return Math.min(a,l)*2+n}},this.getNextRegionDimension=(t,e)=>{const s={height:this.regionRect!==void 0?this.regionRect.height:0,width:this.regionRect!==void 0?this.regionRect.width:0};return t!==void 0&&this.horizontalScaling==="fill"?s.width=this.getAvailableSpace(t,this.anchorRect!==void 0?this.anchorRect.left:0,this.anchorRect!==void 0?this.anchorRect.right:0,this.anchorRect!==void 0?this.anchorRect.width:0,this.viewportRect!==void 0?this.viewportRect.left:0,this.viewportRect!==void 0?this.viewportRect.right:0):this.horizontalScaling==="anchor"&&(s.width=this.anchorRect!==void 0?this.anchorRect.width:0),e!==void 0&&this.verticalScaling==="fill"?s.height=this.getAvailableSpace(e,this.anchorRect!==void 0?this.anchorRect.top:0,this.anchorRect!==void 0?this.anchorRect.bottom:0,this.anchorRect!==void 0?this.anchorRect.height:0,this.viewportRect!==void 0?this.viewportRect.top:0,this.viewportRect!==void 0?this.viewportRect.bottom:0):this.verticalScaling==="anchor"&&(s.height=this.anchorRect!==void 0?this.anchorRect.height:0),s},this.startAutoUpdateEventListeners=()=>{window.addEventListener(qs,this.update,{passive:!0}),window.addEventListener(_s,this.update,{passive:!0,capture:!0}),this.resizeDetector!==null&&this.viewportElement!==null&&this.resizeDetector.observe(this.viewportElement)},this.stopAutoUpdateEventListeners=()=>{window.removeEventListener(qs,this.update),window.removeEventListener(_s,this.update),this.resizeDetector!==null&&this.viewportElement!==null&&this.resizeDetector.unobserve(this.viewportElement)}}anchorChanged(){this.initialLayoutComplete&&(this.anchorElement=this.getAnchor())}viewportChanged(){this.initialLayoutComplete&&(this.viewportElement=this.getViewport())}horizontalPositioningModeChanged(){this.requestReset()}horizontalDefaultPositionChanged(){this.updateForAttributeChange()}horizontalViewportLockChanged(){this.updateForAttributeChange()}horizontalInsetChanged(){this.updateForAttributeChange()}horizontalThresholdChanged(){this.updateForAttributeChange()}horizontalScalingChanged(){this.updateForAttributeChange()}verticalPositioningModeChanged(){this.requestReset()}verticalDefaultPositionChanged(){this.updateForAttributeChange()}verticalViewportLockChanged(){this.updateForAttributeChange()}verticalInsetChanged(){this.updateForAttributeChange()}verticalThresholdChanged(){this.updateForAttributeChange()}verticalScalingChanged(){this.updateForAttributeChange()}fixedPlacementChanged(){this.$fastController.isConnected&&this.initialLayoutComplete&&this.initialize()}autoUpdateModeChanged(t,e){this.$fastController.isConnected&&this.initialLayoutComplete&&(t==="auto"&&this.stopAutoUpdateEventListeners(),e==="auto"&&this.startAutoUpdateEventListeners())}anchorElementChanged(){this.requestReset()}viewportElementChanged(){this.$fastController.isConnected&&this.initialLayoutComplete&&this.initialize()}connectedCallback(){super.connectedCallback(),this.autoUpdateMode==="auto"&&this.startAutoUpdateEventListeners(),this.initialize()}disconnectedCallback(){super.disconnectedCallback(),this.autoUpdateMode==="auto"&&this.stopAutoUpdateEventListeners(),this.stopObservers(),this.disconnectResizeDetector()}adoptedCallback(){this.initialize()}disconnectResizeDetector(){this.resizeDetector!==null&&(this.resizeDetector.disconnect(),this.resizeDetector=null)}initializeResizeDetector(){this.disconnectResizeDetector(),this.resizeDetector=new window.ResizeObserver(this.handleResize)}updateForAttributeChange(){this.$fastController.isConnected&&this.initialLayoutComplete&&(this.forceUpdate=!0,this.update())}initialize(){this.initializeResizeDetector(),this.anchorElement===null&&(this.anchorElement=this.getAnchor()),this.requestReset()}requestReset(){this.$fastController.isConnected&&this.pendingReset===!1&&(this.setInitialState(),$.queueUpdate(()=>this.reset()),this.pendingReset=!0)}setInitialState(){this.initialLayoutComplete=!1,this.regionVisible=!1,this.translateX=0,this.translateY=0,this.baseHorizontalOffset=0,this.baseVerticalOffset=0,this.viewportRect=void 0,this.regionRect=void 0,this.anchorRect=void 0,this.verticalPosition=void 0,this.horizontalPosition=void 0,this.style.opacity="0",this.style.pointerEvents="none",this.forceUpdate=!1,this.style.position=this.fixedPlacement?"fixed":"absolute",this.updatePositionClasses(),this.updateRegionStyle()}}I.intersectionService=new mo;g([v],I.prototype,"anchor",void 0);g([v],I.prototype,"viewport",void 0);g([v({attribute:"horizontal-positioning-mode"})],I.prototype,"horizontalPositioningMode",void 0);g([v({attribute:"horizontal-default-position"})],I.prototype,"horizontalDefaultPosition",void 0);g([v({attribute:"horizontal-viewport-lock",mode:"boolean"})],I.prototype,"horizontalViewportLock",void 0);g([v({attribute:"horizontal-inset",mode:"boolean"})],I.prototype,"horizontalInset",void 0);g([v({attribute:"horizontal-threshold"})],I.prototype,"horizontalThreshold",void 0);g([v({attribute:"horizontal-scaling"})],I.prototype,"horizontalScaling",void 0);g([v({attribute:"vertical-positioning-mode"})],I.prototype,"verticalPositioningMode",void 0);g([v({attribute:"vertical-default-position"})],I.prototype,"verticalDefaultPosition",void 0);g([v({attribute:"vertical-viewport-lock",mode:"boolean"})],I.prototype,"verticalViewportLock",void 0);g([v({attribute:"vertical-inset",mode:"boolean"})],I.prototype,"verticalInset",void 0);g([v({attribute:"vertical-threshold"})],I.prototype,"verticalThreshold",void 0);g([v({attribute:"vertical-scaling"})],I.prototype,"verticalScaling",void 0);g([v({attribute:"fixed-placement",mode:"boolean"})],I.prototype,"fixedPlacement",void 0);g([v({attribute:"auto-update-mode"})],I.prototype,"autoUpdateMode",void 0);g([x],I.prototype,"anchorElement",void 0);g([x],I.prototype,"viewportElement",void 0);g([x],I.prototype,"initialLayoutComplete",void 0);const bo=(i,t)=>lt`
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
        ${ct("control")}
    >
        ${qr(i,t)}
        <span class="content" part="content">
            <slot ${ls("defaultSlottedContent")}></slot>
        </span>
        ${Gr(i,t)}
    </button>
`,Xs="form-associated-proxy",Qs="ElementInternals",Zs=Qs in window&&"setFormValue"in window[Qs].prototype,Js=new WeakMap;function ds(i){const t=class extends i{constructor(...e){super(...e),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return Zs}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const e=this.proxy.labels,s=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),n=e?s.concat(Array.from(e)):s;return Object.freeze(n)}else return be}valueChanged(e,s){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(e,s){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(e,s){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),$.queueUpdate(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(e,s){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(e,s){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),$.queueUpdate(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!Zs)return null;let e=Js.get(this);return e||(e=this.attachInternals(),Js.set(this,e)),e}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){this.proxyEventsToBlock.forEach(e=>this.proxy.removeEventListener(e,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(e,s,n){this.elementInternals?this.elementInternals.setValidity(e,s,n):typeof s=="string"&&this.proxy.setCustomValidity(s)}formDisabledCallback(e){this.disabled=e}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var e;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(s=>this.proxy.addEventListener(s,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",Xs),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",Xs)),(e=this.shadowRoot)===null||e===void 0||e.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var e;this.removeChild(this.proxy),(e=this.shadowRoot)===null||e===void 0||e.removeChild(this.proxySlot)}validate(e){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,e)}setFormValue(e,s){this.elementInternals&&this.elementInternals.setFormValue(e,s||e)}_keypressHandler(e){switch(e.key){case Pn:if(this.form instanceof HTMLFormElement){const s=this.form.querySelector("[type=submit]");s?.click()}break}}stopPropagation(e){e.stopPropagation()}};return v({mode:"boolean"})(t.prototype,"disabled"),v({mode:"fromView",attribute:"value"})(t.prototype,"initialValue"),v({attribute:"current-value"})(t.prototype,"currentValue"),v(t.prototype,"name"),v({mode:"boolean"})(t.prototype,"required"),x(t.prototype,"value"),t}function vo(i){class t extends ds(i){}class e extends t{constructor(...n){super(n),this.dirtyChecked=!1,this.checkedAttribute=!1,this.checked=!1,this.dirtyChecked=!1}checkedAttributeChanged(){this.defaultChecked=this.checkedAttribute}defaultCheckedChanged(){this.dirtyChecked||(this.checked=this.defaultChecked,this.dirtyChecked=!1)}checkedChanged(n,r){this.dirtyChecked||(this.dirtyChecked=!0),this.currentChecked=this.checked,this.updateForm(),this.proxy instanceof HTMLInputElement&&(this.proxy.checked=this.checked),n!==void 0&&this.$emit("change"),this.validate()}currentCheckedChanged(n,r){this.checked=this.currentChecked}updateForm(){const n=this.checked?this.value:null;this.setFormValue(n,n)}connectedCallback(){super.connectedCallback(),this.updateForm()}formResetCallback(){super.formResetCallback(),this.checked=!!this.checkedAttribute,this.dirtyChecked=!1}}return v({attribute:"checked",mode:"boolean"})(e.prototype,"checkedAttribute"),v({attribute:"current-checked",converter:kn})(e.prototype,"currentChecked"),x(e.prototype,"defaultChecked"),x(e.prototype,"checked"),e}class yo extends ht{}class wo extends ds(yo){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let xt=class extends wo{constructor(){super(...arguments),this.handleClick=t=>{var e;this.disabled&&((e=this.defaultSlottedContent)===null||e===void 0?void 0:e.length)<=1&&t.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const t=this.proxy.isConnected;t||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),t||this.detachProxy()},this.handleFormReset=()=>{var t;(t=this.form)===null||t===void 0||t.reset()},this.handleUnsupportedDelegatesFocus=()=>{var t;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(!((t=this.$fastController.definition.shadowOptions)===null||t===void 0)&&t.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(t,e){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),e==="submit"&&this.addEventListener("click",this.handleSubmission),t==="submit"&&this.removeEventListener("click",this.handleSubmission),e==="reset"&&this.addEventListener("click",this.handleFormReset),t==="reset"&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var t;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const e=Array.from((t=this.control)===null||t===void 0?void 0:t.children);e&&e.forEach(s=>{s.addEventListener("click",this.handleClick)})}disconnectedCallback(){var t;super.disconnectedCallback();const e=Array.from((t=this.control)===null||t===void 0?void 0:t.children);e&&e.forEach(s=>{s.removeEventListener("click",this.handleClick)})}};g([v({mode:"boolean"})],xt.prototype,"autofocus",void 0);g([v({attribute:"form"})],xt.prototype,"formId",void 0);g([v],xt.prototype,"formaction",void 0);g([v],xt.prototype,"formenctype",void 0);g([v],xt.prototype,"formmethod",void 0);g([v({mode:"boolean"})],xt.prototype,"formnovalidate",void 0);g([v],xt.prototype,"formtarget",void 0);g([v],xt.prototype,"type",void 0);g([x],xt.prototype,"defaultSlottedContent",void 0);class ei{}g([v({attribute:"aria-expanded"})],ei.prototype,"ariaExpanded",void 0);g([v({attribute:"aria-pressed"})],ei.prototype,"ariaPressed",void 0);Fn(ei,B);Fn(xt,Wr,ei);function Oi(i){const t=i.parentElement;if(t)return t;{const e=i.getRootNode();if(e.host instanceof HTMLElement)return e.host}return null}function xo(i,t){let e=t;for(;e!==null;){if(e===i)return!0;e=Oi(e)}return!1}const Mt=document.createElement("div");function So(i){return i instanceof ti}class us{setProperty(t,e){$.queueUpdate(()=>this.target.setProperty(t,e))}removeProperty(t){$.queueUpdate(()=>this.target.removeProperty(t))}}class Ro extends us{constructor(t){super();const e=new CSSStyleSheet;this.target=e.cssRules[e.insertRule(":host{}")].style,t.$fastController.addStyles(st.create([e]))}}class Co extends us{constructor(){super();const t=new CSSStyleSheet;this.target=t.cssRules[t.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,t]}}class ko extends us{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:t}=this.style;if(t){const e=t.insertRule(":root{}",t.cssRules.length);this.target=t.cssRules[e].style}}}class An{constructor(t){this.store=new Map,this.target=null;const e=t.$fastController;this.style=document.createElement("style"),e.addStyles(this.style),V.getNotifier(e).subscribe(this,"isConnected"),this.handleChange(e,"isConnected")}targetChanged(){if(this.target!==null)for(const[t,e]of this.store.entries())this.target.setProperty(t,e)}setProperty(t,e){this.store.set(t,e),$.queueUpdate(()=>{this.target!==null&&this.target.setProperty(t,e)})}removeProperty(t){this.store.delete(t),$.queueUpdate(()=>{this.target!==null&&this.target.removeProperty(t)})}handleChange(t,e){const{sheet:s}=this.style;if(s){const n=s.insertRule(":host{}",s.cssRules.length);this.target=s.cssRules[n].style}else this.target=null}}g([x],An.prototype,"target",void 0);class Eo{constructor(t){this.target=t.style}setProperty(t,e){$.queueUpdate(()=>this.target.setProperty(t,e))}removeProperty(t){$.queueUpdate(()=>this.target.removeProperty(t))}}class G{setProperty(t,e){G.properties[t]=e;for(const s of G.roots.values())Yt.getOrCreate(G.normalizeRoot(s)).setProperty(t,e)}removeProperty(t){delete G.properties[t];for(const e of G.roots.values())Yt.getOrCreate(G.normalizeRoot(e)).removeProperty(t)}static registerRoot(t){const{roots:e}=G;if(!e.has(t)){e.add(t);const s=Yt.getOrCreate(this.normalizeRoot(t));for(const n in G.properties)s.setProperty(n,G.properties[n])}}static unregisterRoot(t){const{roots:e}=G;if(e.has(t)){e.delete(t);const s=Yt.getOrCreate(G.normalizeRoot(t));for(const n in G.properties)s.removeProperty(n)}}static normalizeRoot(t){return t===Mt?document:t}}G.roots=new Set;G.properties={};const Ti=new WeakMap,To=$.supportsAdoptedStyleSheets?Ro:An,Yt=Object.freeze({getOrCreate(i){if(Ti.has(i))return Ti.get(i);let t;return i===Mt?t=new G:i instanceof Document?t=$.supportsAdoptedStyleSheets?new Co:new ko:So(i)?t=new To(i):t=new Eo(i),Ti.set(i,t),t}});class et extends os{constructor(t){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=t.name,t.cssCustomPropertyName!==null&&(this.cssCustomProperty=`--${t.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=et.uniqueId(),et.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(t){return new et({name:typeof t=="string"?t:t.name,cssCustomPropertyName:typeof t=="string"?t:t.cssCustomPropertyName===void 0?t.name:t.cssCustomPropertyName})}static isCSSDesignToken(t){return typeof t.cssCustomProperty=="string"}static isDerivedDesignTokenValue(t){return typeof t=="function"}static getTokenById(t){return et.tokensById.get(t)}getOrCreateSubscriberSet(t=this){return this.subscribers.get(t)||this.subscribers.set(t,new Set)&&this.subscribers.get(t)}createCSS(){return this.cssVar||""}getValueFor(t){const e=A.getOrCreate(t).get(this);if(e!==void 0)return e;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${t} or an ancestor of ${t}.`)}setValueFor(t,e){return this._appliedTo.add(t),e instanceof et&&(e=this.alias(e)),A.getOrCreate(t).set(this,e),this}deleteValueFor(t){return this._appliedTo.delete(t),A.existsFor(t)&&A.getOrCreate(t).delete(this),this}withDefault(t){return this.setValueFor(Mt,t),this}subscribe(t,e){const s=this.getOrCreateSubscriberSet(e);e&&!A.existsFor(e)&&A.getOrCreate(e),s.has(t)||s.add(t)}unsubscribe(t,e){const s=this.subscribers.get(e||this);s&&s.has(t)&&s.delete(t)}notify(t){const e=Object.freeze({token:this,target:t});this.subscribers.has(this)&&this.subscribers.get(this).forEach(s=>s.handleChange(e)),this.subscribers.has(t)&&this.subscribers.get(t).forEach(s=>s.handleChange(e))}alias(t){return e=>t.getValueFor(e)}}et.uniqueId=(()=>{let i=0;return()=>(i++,i.toString(16))})();et.tokensById=new Map;class $o{startReflection(t,e){t.subscribe(this,e),this.handleChange({token:t,target:e})}stopReflection(t,e){t.unsubscribe(this,e),this.remove(t,e)}handleChange(t){const{token:e,target:s}=t;this.add(e,s)}add(t,e){Yt.getOrCreate(e).setProperty(t.cssCustomProperty,this.resolveCSSValue(A.getOrCreate(e).get(t)))}remove(t,e){Yt.getOrCreate(e).removeProperty(t.cssCustomProperty)}resolveCSSValue(t){return t&&typeof t.createCSS=="function"?t.createCSS():t}}class Io{constructor(t,e,s){this.source=t,this.token=e,this.node=s,this.dependencies=new Set,this.observer=V.binding(t,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){this.node.store.set(this.token,this.observer.observe(this.node.target,ye))}}class Mo{constructor(){this.values=new Map}set(t,e){this.values.get(t)!==e&&(this.values.set(t,e),V.getNotifier(this).notify(t.id))}get(t){return V.track(this,t.id),this.values.get(t)}delete(t){this.values.delete(t)}all(){return this.values.entries()}}const he=new WeakMap,de=new WeakMap;class A{constructor(t){this.target=t,this.store=new Mo,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(e,s)=>{const n=et.getTokenById(s);if(n&&(n.notify(this.target),et.isCSSDesignToken(n))){const r=this.parent,o=this.isReflecting(n);if(r){const a=r.get(n),l=e.get(n);a!==l&&!o?this.reflectToCSS(n):a===l&&o&&this.stopReflectToCSS(n)}else o||this.reflectToCSS(n)}}},he.set(t,this),V.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),t instanceof ti?t.$fastController.addBehaviors([this]):t.isConnected&&this.bind()}static getOrCreate(t){return he.get(t)||new A(t)}static existsFor(t){return he.has(t)}static findParent(t){if(Mt!==t.target){let e=Oi(t.target);for(;e!==null;){if(he.has(e))return he.get(e);e=Oi(e)}return A.getOrCreate(Mt)}return null}static findClosestAssignedNode(t,e){let s=e;do{if(s.has(t))return s;s=s.parent?s.parent:s.target!==Mt?A.getOrCreate(Mt):null}while(s!==null);return null}get parent(){return de.get(this)||null}has(t){return this.assignedValues.has(t)}get(t){const e=this.store.get(t);if(e!==void 0)return e;const s=this.getRaw(t);if(s!==void 0)return this.hydrate(t,s),this.get(t)}getRaw(t){var e;return this.assignedValues.has(t)?this.assignedValues.get(t):(e=A.findClosestAssignedNode(t,this))===null||e===void 0?void 0:e.getRaw(t)}set(t,e){et.isDerivedDesignTokenValue(this.assignedValues.get(t))&&this.tearDownBindingObserver(t),this.assignedValues.set(t,e),et.isDerivedDesignTokenValue(e)?this.setupBindingObserver(t,e):this.store.set(t,e)}delete(t){this.assignedValues.delete(t),this.tearDownBindingObserver(t);const e=this.getRaw(t);e?this.hydrate(t,e):this.store.delete(t)}bind(){const t=A.findParent(this);t&&t.appendChild(this);for(const e of this.assignedValues.keys())e.notify(this.target)}unbind(){this.parent&&de.get(this).removeChild(this)}appendChild(t){t.parent&&de.get(t).removeChild(t);const e=this.children.filter(s=>t.contains(s));de.set(t,this),this.children.push(t),e.forEach(s=>t.appendChild(s)),V.getNotifier(this.store).subscribe(t);for(const[s,n]of this.store.all())t.hydrate(s,this.bindingObservers.has(s)?this.getRaw(s):n)}removeChild(t){const e=this.children.indexOf(t);return e!==-1&&this.children.splice(e,1),V.getNotifier(this.store).unsubscribe(t),t.parent===this?de.delete(t):!1}contains(t){return xo(this.target,t.target)}reflectToCSS(t){this.isReflecting(t)||(this.reflecting.add(t),A.cssCustomPropertyReflector.startReflection(t,this.target))}stopReflectToCSS(t){this.isReflecting(t)&&(this.reflecting.delete(t),A.cssCustomPropertyReflector.stopReflection(t,this.target))}isReflecting(t){return this.reflecting.has(t)}handleChange(t,e){const s=et.getTokenById(e);s&&this.hydrate(s,this.getRaw(s))}hydrate(t,e){if(!this.has(t)){const s=this.bindingObservers.get(t);et.isDerivedDesignTokenValue(e)?s?s.source!==e&&(this.tearDownBindingObserver(t),this.setupBindingObserver(t,e)):this.setupBindingObserver(t,e):(s&&this.tearDownBindingObserver(t),this.store.set(t,e))}}setupBindingObserver(t,e){const s=new Io(e,t,this);return this.bindingObservers.set(t,s),s}tearDownBindingObserver(t){return this.bindingObservers.has(t)?(this.bindingObservers.get(t).disconnect(),this.bindingObservers.delete(t),!0):!1}}A.cssCustomPropertyReflector=new $o;g([x],A.prototype,"children",void 0);function Do(i){return et.from(i)}const ii=Object.freeze({create:Do,notifyConnection(i){return!i.isConnected||!A.existsFor(i)?!1:(A.getOrCreate(i).bind(),!0)},notifyDisconnection(i){return i.isConnected||!A.existsFor(i)?!1:(A.getOrCreate(i).unbind(),!0)},registerRoot(i=Mt){G.registerRoot(i)},unregisterRoot(i=Mt){G.unregisterRoot(i)}}),$i=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),Ii=new Map,je=new Map;let Qt=null;const ue=F.createInterface(i=>i.cachedCallback(t=>(Qt===null&&(Qt=new On(null,t)),Qt))),Nn=Object.freeze({tagFor(i){return je.get(i)},responsibleFor(i){const t=i.$$designSystem$$;return t||F.findResponsibleContainer(i).get(ue)},getOrCreate(i){if(!i)return Qt===null&&(Qt=F.getOrCreateDOMContainer().get(ue)),Qt;const t=i.$$designSystem$$;if(t)return t;const e=F.getOrCreateDOMContainer(i);if(e.has(ue,!1))return e.get(ue);{const s=new On(i,e);return e.register(Ce.instance(ue,s)),s}}});function Lo(i,t,e){return typeof i=="string"?{name:i,type:t,callback:e}:i}class On{constructor(t,e){this.owner=t,this.container=e,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>$i.definitionCallbackOnly,t!==null&&(t.$$designSystem$$=this)}withPrefix(t){return this.prefix=t,this}withShadowRootMode(t){return this.shadowRootMode=t,this}withElementDisambiguation(t){return this.disambiguate=t,this}withDesignTokenRoot(t){return this.designTokenRoot=t,this}register(...t){const e=this.container,s=[],n=this.disambiguate,r=this.shadowRootMode,o={elementPrefix:this.prefix,tryDefineElement(a,l,c){const h=Lo(a,l,c),{name:d,callback:u,baseClass:f}=h;let{type:m}=h,y=d,S=Ii.get(y),E=!0;for(;S;){const P=n(y,m,S);switch(P){case $i.ignoreDuplicate:return;case $i.definitionCallbackOnly:E=!1,S=void 0;break;default:y=P,S=Ii.get(y);break}}E&&((je.has(m)||m===ht)&&(m=class extends m{}),Ii.set(y,m),je.set(m,y),f&&je.set(f,y)),s.push(new Fo(e,y,m,r,u,E))}};this.designTokensInitialized||(this.designTokensInitialized=!0,this.designTokenRoot!==null&&ii.registerRoot(this.designTokenRoot)),e.registerWithContext(o,...t);for(const a of s)a.callback(a),a.willDefine&&a.definition!==null&&a.definition.define();return this}}class Fo{constructor(t,e,s,n,r,o){this.container=t,this.name=e,this.type=s,this.shadowRootMode=n,this.callback=r,this.willDefine=o,this.definition=null}definePresentation(t){Ln.define(this.name,t,this.container)}defineElement(t){this.definition=new Ke(this.type,Object.assign(Object.assign({},t),{name:this.name}))}tagFor(t){return Nn.tagFor(t)}}const Po=(i,t)=>lt`
    <div class="positioning-region" part="positioning-region">
        ${as(e=>e.modal,lt`
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
            ${ct("dialog")}
        >
            <slot></slot>
        </div>
    </div>
`;/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var Vo=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],Ao=Vo.join(","),Bn=typeof Element>"u",_e=Bn?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,Bi=!Bn&&Element.prototype.getRootNode?function(i){return i.getRootNode()}:function(i){return i.ownerDocument},No=function(t,e){return t.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName)||t.isContentEditable)&&isNaN(parseInt(t.getAttribute("tabindex"),10))?0:t.tabIndex},zn=function(t){return t.tagName==="INPUT"},Oo=function(t){return zn(t)&&t.type==="hidden"},Bo=function(t){var e=t.tagName==="DETAILS"&&Array.prototype.slice.apply(t.children).some(function(s){return s.tagName==="SUMMARY"});return e},zo=function(t,e){for(var s=0;s<t.length;s++)if(t[s].checked&&t[s].form===e)return t[s]},jo=function(t){if(!t.name)return!0;var e=t.form||Bi(t),s=function(a){return e.querySelectorAll('input[type="radio"][name="'+a+'"]')},n;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")n=s(window.CSS.escape(t.name));else try{n=s(t.name)}catch(o){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",o.message),!1}var r=zo(n,t.form);return!r||r===t},Ho=function(t){return zn(t)&&t.type==="radio"},Uo=function(t){return Ho(t)&&!jo(t)},Ks=function(t){var e=t.getBoundingClientRect(),s=e.width,n=e.height;return s===0&&n===0},Wo=function(t,e){var s=e.displayCheck,n=e.getShadowRoot;if(getComputedStyle(t).visibility==="hidden")return!0;var r=_e.call(t,"details>summary:first-of-type"),o=r?t.parentElement:t;if(_e.call(o,"details:not([open]) *"))return!0;var a=Bi(t).host,l=a?.ownerDocument.contains(a)||t.ownerDocument.contains(t);if(!s||s==="full"){if(typeof n=="function"){for(var c=t;t;){var h=t.parentElement,d=Bi(t);if(h&&!h.shadowRoot&&n(h)===!0)return Ks(t);t.assignedSlot?t=t.assignedSlot:!h&&d!==t.ownerDocument?t=d.host:t=h}t=c}if(l)return!t.getClientRects().length}else if(s==="non-zero-area")return Ks(t);return!1},Go=function(t){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))for(var e=t.parentElement;e;){if(e.tagName==="FIELDSET"&&e.disabled){for(var s=0;s<e.children.length;s++){var n=e.children.item(s);if(n.tagName==="LEGEND")return _e.call(e,"fieldset[disabled] *")?!0:!n.contains(t)}return!0}e=e.parentElement}return!1},qo=function(t,e){return!(e.disabled||Oo(e)||Wo(e,t)||Bo(e)||Go(e))},_o=function(t,e){return!(Uo(e)||No(e)<0||!qo(t,e))},tn=function(t,e){if(e=e||{},!t)throw new Error("No node provided");return _e.call(t,Ao)===!1?!1:_o(e,t)};class yt extends ht{constructor(){super(...arguments),this.modal=!0,this.hidden=!1,this.trapFocus=!0,this.trapFocusChanged=()=>{this.$fastController.isConnected&&this.updateTrapFocus()},this.isTrappingFocus=!1,this.handleDocumentKeydown=t=>{if(!t.defaultPrevented&&!this.hidden)switch(t.key){case Vn:this.dismiss(),t.preventDefault();break;case fo:this.handleTabKeyDown(t);break}},this.handleDocumentFocus=t=>{!t.defaultPrevented&&this.shouldForceFocus(t.target)&&(this.focusFirstElement(),t.preventDefault())},this.handleTabKeyDown=t=>{if(!this.trapFocus||this.hidden)return;const e=this.getTabQueueBounds();if(e.length!==0){if(e.length===1){e[0].focus(),t.preventDefault();return}t.shiftKey&&t.target===e[0]?(e[e.length-1].focus(),t.preventDefault()):!t.shiftKey&&t.target===e[e.length-1]&&(e[0].focus(),t.preventDefault())}},this.getTabQueueBounds=()=>{const t=[];return yt.reduceTabbableItems(t,this)},this.focusFirstElement=()=>{const t=this.getTabQueueBounds();t.length>0?t[0].focus():this.dialog instanceof HTMLElement&&this.dialog.focus()},this.shouldForceFocus=t=>this.isTrappingFocus&&!this.contains(t),this.shouldTrapFocus=()=>this.trapFocus&&!this.hidden,this.updateTrapFocus=t=>{const e=t===void 0?this.shouldTrapFocus():t;e&&!this.isTrappingFocus?(this.isTrappingFocus=!0,document.addEventListener("focusin",this.handleDocumentFocus),$.queueUpdate(()=>{this.shouldForceFocus(document.activeElement)&&this.focusFirstElement()})):!e&&this.isTrappingFocus&&(this.isTrappingFocus=!1,document.removeEventListener("focusin",this.handleDocumentFocus))}}dismiss(){this.$emit("dismiss"),this.$emit("cancel")}show(){this.hidden=!1}hide(){this.hidden=!0,this.$emit("close")}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleDocumentKeydown),this.notifier=V.getNotifier(this),this.notifier.subscribe(this,"hidden"),this.updateTrapFocus()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeydown),this.updateTrapFocus(!1),this.notifier.unsubscribe(this,"hidden")}handleChange(t,e){switch(e){case"hidden":this.updateTrapFocus();break}}static reduceTabbableItems(t,e){return e.getAttribute("tabindex")==="-1"?t:tn(e)||yt.isFocusableFastElement(e)&&yt.hasTabbableShadow(e)?(t.push(e),t):e.childElementCount?t.concat(Array.from(e.children).reduce(yt.reduceTabbableItems,[])):t}static isFocusableFastElement(t){var e,s;return!!(!((s=(e=t.$fastController)===null||e===void 0?void 0:e.definition.shadowOptions)===null||s===void 0)&&s.delegatesFocus)}static hasTabbableShadow(t){var e,s;return Array.from((s=(e=t.shadowRoot)===null||e===void 0?void 0:e.querySelectorAll("*"))!==null&&s!==void 0?s:[]).some(n=>tn(n))}}g([v({mode:"boolean"})],yt.prototype,"modal",void 0);g([v({mode:"boolean"})],yt.prototype,"hidden",void 0);g([v({attribute:"trap-focus",mode:"boolean"})],yt.prototype,"trapFocus",void 0);g([v({attribute:"aria-describedby"})],yt.prototype,"ariaDescribedby",void 0);g([v({attribute:"aria-labelledby"})],yt.prototype,"ariaLabelledby",void 0);g([v({attribute:"aria-label"})],yt.prototype,"ariaLabel",void 0);const Yo=(i,t)=>lt`
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
            class="positioning-region ${e=>e.orientation===Z.horizontal?"horizontal":"vertical"}"
            part="positioning-region"
        >
            <slot
                ${ls({property:"slottedRadioButtons",filter:jr("[role=radio]")})}
            ></slot>
        </div>
    </template>
`;class Ot extends ht{constructor(){super(...arguments),this.orientation=Z.horizontal,this.radioChangeHandler=t=>{const e=t.target;e.checked&&(this.slottedRadioButtons.forEach(s=>{s!==e&&(s.checked=!1,this.isInsideFoundationToolbar||s.setAttribute("tabindex","-1"))}),this.selectedRadio=e,this.value=e.value,e.setAttribute("tabindex","0"),this.focusedRadio=e),t.stopPropagation()},this.moveToRadioByIndex=(t,e)=>{const s=t[e];this.isInsideToolbar||(s.setAttribute("tabindex","0"),s.readOnly?this.slottedRadioButtons.forEach(n=>{n!==s&&n.setAttribute("tabindex","-1")}):(s.checked=!0,this.selectedRadio=s)),this.focusedRadio=s,s.focus()},this.moveRightOffGroup=()=>{var t;(t=this.nextElementSibling)===null||t===void 0||t.focus()},this.moveLeftOffGroup=()=>{var t;(t=this.previousElementSibling)===null||t===void 0||t.focus()},this.focusOutHandler=t=>{const e=this.slottedRadioButtons,s=t.target,n=s!==null?e.indexOf(s):0,r=this.focusedRadio?e.indexOf(this.focusedRadio):-1;return(r===0&&n===r||r===e.length-1&&r===n)&&(this.selectedRadio?(this.focusedRadio=this.selectedRadio,this.isInsideFoundationToolbar||(this.selectedRadio.setAttribute("tabindex","0"),e.forEach(o=>{o!==this.selectedRadio&&o.setAttribute("tabindex","-1")}))):(this.focusedRadio=e[0],this.focusedRadio.setAttribute("tabindex","0"),e.forEach(o=>{o!==this.focusedRadio&&o.setAttribute("tabindex","-1")}))),!0},this.clickHandler=t=>{const e=t.target;if(e){const s=this.slottedRadioButtons;e.checked||s.indexOf(e)===0?(e.setAttribute("tabindex","0"),this.selectedRadio=e):(e.setAttribute("tabindex","-1"),this.selectedRadio=null),this.focusedRadio=e}t.preventDefault()},this.shouldMoveOffGroupToTheRight=(t,e,s)=>t===e.length&&this.isInsideToolbar&&s===qe,this.shouldMoveOffGroupToTheLeft=(t,e)=>(this.focusedRadio?t.indexOf(this.focusedRadio)-1:0)<0&&this.isInsideToolbar&&e===Ge,this.checkFocusedRadio=()=>{this.focusedRadio!==null&&!this.focusedRadio.readOnly&&!this.focusedRadio.checked&&(this.focusedRadio.checked=!0,this.focusedRadio.setAttribute("tabindex","0"),this.focusedRadio.focus(),this.selectedRadio=this.focusedRadio)},this.moveRight=t=>{const e=this.slottedRadioButtons;let s=0;if(s=this.focusedRadio?e.indexOf(this.focusedRadio)+1:1,this.shouldMoveOffGroupToTheRight(s,e,t.key)){this.moveRightOffGroup();return}else s===e.length&&(s=0);for(;s<e.length&&e.length>1;)if(e[s].disabled){if(this.focusedRadio&&s===e.indexOf(this.focusedRadio))break;if(s+1>=e.length){if(this.isInsideToolbar)break;s=0}else s+=1}else{this.moveToRadioByIndex(e,s);break}},this.moveLeft=t=>{const e=this.slottedRadioButtons;let s=0;if(s=this.focusedRadio?e.indexOf(this.focusedRadio)-1:0,s=s<0?e.length-1:s,this.shouldMoveOffGroupToTheLeft(e,t.key)){this.moveLeftOffGroup();return}for(;s>=0&&e.length>1;)if(e[s].disabled){if(this.focusedRadio&&s===e.indexOf(this.focusedRadio))break;s-1<0?s=e.length-1:s-=1}else{this.moveToRadioByIndex(e,s);break}},this.keydownHandler=t=>{const e=t.key;if(e in go&&this.isInsideFoundationToolbar)return!0;switch(e){case Pn:{this.checkFocusedRadio();break}case qe:case cs:{this.direction===O.ltr?this.moveRight(t):this.moveLeft(t);break}case Ge:case hs:{this.direction===O.ltr?this.moveLeft(t):this.moveRight(t);break}default:return!0}}}readOnlyChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(t=>{this.readOnly?t.readOnly=!0:t.readOnly=!1})}disabledChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(t=>{this.disabled?t.disabled=!0:t.disabled=!1})}nameChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(t=>{t.setAttribute("name",this.name)})}valueChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(t=>{t.value===this.value&&(t.checked=!0,this.selectedRadio=t)}),this.$emit("change")}slottedRadioButtonsChanged(t,e){this.slottedRadioButtons&&this.slottedRadioButtons.length>0&&this.setupRadioButtons()}get parentToolbar(){return this.closest('[role="toolbar"]')}get isInsideToolbar(){var t;return(t=this.parentToolbar)!==null&&t!==void 0?t:!1}get isInsideFoundationToolbar(){var t;return!!(!((t=this.parentToolbar)===null||t===void 0)&&t.$fastController)}connectedCallback(){super.connectedCallback(),this.direction=ke(this),this.setupRadioButtons()}disconnectedCallback(){this.slottedRadioButtons.forEach(t=>{t.removeEventListener("change",this.radioChangeHandler)})}setupRadioButtons(){const t=this.slottedRadioButtons.filter(n=>n.hasAttribute("checked")),e=t?t.length:0;if(e>1){const n=t[e-1];n.checked=!0}let s=!1;if(this.slottedRadioButtons.forEach(n=>{this.name!==void 0&&n.setAttribute("name",this.name),this.disabled&&(n.disabled=!0),this.readOnly&&(n.readOnly=!0),this.value&&this.value===n.value?(this.selectedRadio=n,this.focusedRadio=n,n.checked=!0,n.setAttribute("tabindex","0"),s=!0):(this.isInsideFoundationToolbar||n.setAttribute("tabindex","-1"),n.checked=!1),n.addEventListener("change",this.radioChangeHandler)}),this.value===void 0&&this.slottedRadioButtons.length>0){const n=this.slottedRadioButtons.filter(o=>o.hasAttribute("checked")),r=n!==null?n.length:0;if(r>0&&!s){const o=n[r-1];o.checked=!0,this.focusedRadio=o,o.setAttribute("tabindex","0")}else this.slottedRadioButtons[0].setAttribute("tabindex","0"),this.focusedRadio=this.slottedRadioButtons[0]}}}g([v({attribute:"readonly",mode:"boolean"})],Ot.prototype,"readOnly",void 0);g([v({attribute:"disabled",mode:"boolean"})],Ot.prototype,"disabled",void 0);g([v],Ot.prototype,"name",void 0);g([v],Ot.prototype,"value",void 0);g([v],Ot.prototype,"orientation",void 0);g([x],Ot.prototype,"childItems",void 0);g([x],Ot.prototype,"slottedRadioButtons",void 0);const Xo=(i,t)=>lt`
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
            <slot ${ls("defaultSlottedNodes")}></slot>
        </label>
    </template>
`;class Qo extends ht{}class Zo extends vo(Qo){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class si extends Zo{constructor(){super(),this.initialValue="on",this.keypressHandler=t=>{switch(t.key){case uo:!this.checked&&!this.readOnly&&(this.checked=!0);return}return!0},this.proxy.setAttribute("type","radio")}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}defaultCheckedChanged(){var t;this.$fastController.isConnected&&!this.dirtyChecked&&(this.isInsideRadioGroup()||(this.checked=(t=this.defaultChecked)!==null&&t!==void 0?t:!1,this.dirtyChecked=!1))}connectedCallback(){var t,e;super.connectedCallback(),this.validate(),((t=this.parentElement)===null||t===void 0?void 0:t.getAttribute("role"))!=="radiogroup"&&this.getAttribute("tabindex")===null&&(this.disabled||this.setAttribute("tabindex","0")),this.checkedAttribute&&(this.dirtyChecked||this.isInsideRadioGroup()||(this.checked=(e=this.defaultChecked)!==null&&e!==void 0?e:!1,this.dirtyChecked=!1))}isInsideRadioGroup(){return this.closest("[role=radiogroup]")!==null}clickHandler(t){!this.disabled&&!this.readOnly&&!this.checked&&(this.checked=!0)}}g([v({attribute:"readonly",mode:"boolean"})],si.prototype,"readOnly",void 0);g([x],si.prototype,"name",void 0);g([x],si.prototype,"defaultSlottedNodes",void 0);const Jo=(i,t)=>lt`
    <template
        aria-disabled="${e=>e.disabled}"
        class="${e=>e.sliderOrientation||Z.horizontal}
            ${e=>e.disabled?"disabled":""}"
    >
        <div ${ct("root")} part="root" class="root" style="${e=>e.positionStyle}">
            <div class="container">
                ${as(e=>!e.hideMark,lt`
                        <div class="mark"></div>
                    `)}
                <div class="label">
                    <slot></slot>
                </div>
            </div>
        </div>
    </template>
`;function zi(i,t,e,s){let n=po(0,1,(i-t)/(e-t));return s===O.rtl&&(n=1-n),n}const Ne={min:0,max:0,direction:O.ltr,orientation:Z.horizontal,disabled:!1};let Tt=class extends ht{constructor(){super(...arguments),this.hideMark=!1,this.sliderDirection=O.ltr,this.getSliderConfiguration=()=>{if(!this.isSliderConfig(this.parentNode))this.sliderDirection=Ne.direction||O.ltr,this.sliderOrientation=Ne.orientation,this.sliderMaxPosition=Ne.max,this.sliderMinPosition=Ne.min;else{const t=this.parentNode,{min:e,max:s,direction:n,orientation:r,disabled:o}=t;o!==void 0&&(this.disabled=o),this.sliderDirection=n||O.ltr,this.sliderOrientation=r||Z.horizontal,this.sliderMaxPosition=s,this.sliderMinPosition=e}},this.positionAsStyle=()=>{const t=this.sliderDirection?this.sliderDirection:O.ltr,e=zi(Number(this.position),Number(this.sliderMinPosition),Number(this.sliderMaxPosition));let s=Math.round((1-e)*100),n=Math.round(e*100);return Number.isNaN(n)&&Number.isNaN(s)&&(s=50,n=50),this.sliderOrientation===Z.horizontal?t===O.rtl?`right: ${n}%; left: ${s}%;`:`left: ${n}%; right: ${s}%;`:`top: ${n}%; bottom: ${s}%;`}}positionChanged(){this.positionStyle=this.positionAsStyle()}sliderOrientationChanged(){}connectedCallback(){super.connectedCallback(),this.getSliderConfiguration(),this.positionStyle=this.positionAsStyle(),this.notifier=V.getNotifier(this.parentNode),this.notifier.subscribe(this,"orientation"),this.notifier.subscribe(this,"direction"),this.notifier.subscribe(this,"max"),this.notifier.subscribe(this,"min")}disconnectedCallback(){super.disconnectedCallback(),this.notifier.unsubscribe(this,"orientation"),this.notifier.unsubscribe(this,"direction"),this.notifier.unsubscribe(this,"max"),this.notifier.unsubscribe(this,"min")}handleChange(t,e){switch(e){case"direction":this.sliderDirection=t.direction;break;case"orientation":this.sliderOrientation=t.orientation;break;case"max":this.sliderMaxPosition=t.max;break;case"min":this.sliderMinPosition=t.min;break}this.positionStyle=this.positionAsStyle()}isSliderConfig(t){return t.max!==void 0&&t.min!==void 0}};g([x],Tt.prototype,"positionStyle",void 0);g([v],Tt.prototype,"position",void 0);g([v({attribute:"hide-mark",mode:"boolean"})],Tt.prototype,"hideMark",void 0);g([v({attribute:"disabled",mode:"boolean"})],Tt.prototype,"disabled",void 0);g([x],Tt.prototype,"sliderOrientation",void 0);g([x],Tt.prototype,"sliderMinPosition",void 0);g([x],Tt.prototype,"sliderMaxPosition",void 0);g([x],Tt.prototype,"sliderDirection",void 0);const Ko=(i,t)=>lt`
    <template
        role="slider"
        class="${e=>e.readOnly?"readonly":""}
        ${e=>e.orientation||Z.horizontal}"
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
            <div ${ct("track")} part="track-container" class="track">
                <slot name="track"></slot>
                <div part="track-start" class="track-start" style="${e=>e.position}">
                    <slot name="track-start"></slot>
                </div>
            </div>
            <slot></slot>
            <div
                ${ct("thumb")}
                part="thumb-container"
                class="thumb-container"
                style="${e=>e.position}"
            >
                <slot name="thumb">${t.thumb||""}</slot>
            </div>
        </div>
    </template>
`;class ta extends ht{}class ea extends ds(ta){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const ia={singleValue:"single-value"};class tt extends ea{constructor(){super(...arguments),this.direction=O.ltr,this.isDragging=!1,this.trackWidth=0,this.trackMinWidth=0,this.trackHeight=0,this.trackLeft=0,this.trackMinHeight=0,this.valueTextFormatter=()=>null,this.min=0,this.max=10,this.step=1,this.orientation=Z.horizontal,this.mode=ia.singleValue,this.keypressHandler=t=>{if(!this.readOnly){if(t.key===co)t.preventDefault(),this.value=`${this.min}`;else if(t.key===ho)t.preventDefault(),this.value=`${this.max}`;else if(!t.shiftKey)switch(t.key){case qe:case hs:t.preventDefault(),this.increment();break;case Ge:case cs:t.preventDefault(),this.decrement();break}}},this.setupTrackConstraints=()=>{const t=this.track.getBoundingClientRect();this.trackWidth=this.track.clientWidth,this.trackMinWidth=this.track.clientLeft,this.trackHeight=t.bottom,this.trackMinHeight=t.top,this.trackLeft=this.getBoundingClientRect().left,this.trackWidth===0&&(this.trackWidth=1)},this.setupListeners=(t=!1)=>{const e=`${t?"remove":"add"}EventListener`;this[e]("keydown",this.keypressHandler),this[e]("mousedown",this.handleMouseDown),this.thumb[e]("mousedown",this.handleThumbMouseDown,{passive:!0}),this.thumb[e]("touchstart",this.handleThumbMouseDown,{passive:!0}),t&&(this.handleMouseDown(null),this.handleThumbMouseDown(null))},this.initialValue="",this.handleThumbMouseDown=t=>{if(t){if(this.readOnly||this.disabled||t.defaultPrevented)return;t.target.focus()}const e=`${t!==null?"add":"remove"}EventListener`;window[e]("mouseup",this.handleWindowMouseUp),window[e]("mousemove",this.handleMouseMove,{passive:!0}),window[e]("touchmove",this.handleMouseMove,{passive:!0}),window[e]("touchend",this.handleWindowMouseUp),this.isDragging=t!==null},this.handleMouseMove=t=>{if(this.readOnly||this.disabled||t.defaultPrevented)return;const e=window.TouchEvent&&t instanceof TouchEvent?t.touches[0]:t,s=this.orientation===Z.horizontal?e.pageX-document.documentElement.scrollLeft-this.trackLeft:e.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(s)}`},this.calculateNewValue=t=>{const e=zi(t,this.orientation===Z.horizontal?this.trackMinWidth:this.trackMinHeight,this.orientation===Z.horizontal?this.trackWidth:this.trackHeight,this.direction),s=(this.max-this.min)*e+this.min;return this.convertToConstrainedValue(s)},this.handleWindowMouseUp=t=>{this.stopDragging()},this.stopDragging=()=>{this.isDragging=!1,this.handleMouseDown(null),this.handleThumbMouseDown(null)},this.handleMouseDown=t=>{const e=`${t!==null?"add":"remove"}EventListener`;if((t===null||!this.disabled&&!this.readOnly)&&(window[e]("mouseup",this.handleWindowMouseUp),window.document[e]("mouseleave",this.handleWindowMouseUp),window[e]("mousemove",this.handleMouseMove),t)){t.preventDefault(),this.setupTrackConstraints(),t.target.focus();const s=this.orientation===Z.horizontal?t.pageX-document.documentElement.scrollLeft-this.trackLeft:t.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(s)}`}},this.convertToConstrainedValue=t=>{isNaN(t)&&(t=this.min);let e=t-this.min;const s=Math.round(e/this.step),n=e-s*(this.stepMultiplier*this.step)/this.stepMultiplier;return e=n>=Number(this.step)/2?e-n+Number(this.step):e-n,e+this.min}}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}get valueAsNumber(){return parseFloat(super.value)}set valueAsNumber(t){this.value=t.toString()}valueChanged(t,e){super.valueChanged(t,e),this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction),this.$emit("change")}minChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.min=`${this.min}`),this.validate()}maxChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.max=`${this.max}`),this.validate()}stepChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.step=`${this.step}`),this.updateStepMultiplier(),this.validate()}orientationChanged(){this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type","range"),this.direction=ke(this),this.updateStepMultiplier(),this.setupTrackConstraints(),this.setupListeners(),this.setupDefaultValue(),this.setThumbPositionForOrientation(this.direction)}disconnectedCallback(){this.setupListeners(!0)}increment(){const t=this.direction!==O.rtl&&this.orientation!==Z.vertical?Number(this.value)+Number(this.step):Number(this.value)-Number(this.step),e=this.convertToConstrainedValue(t),s=e<Number(this.max)?`${e}`:`${this.max}`;this.value=s}decrement(){const t=this.direction!==O.rtl&&this.orientation!==Z.vertical?Number(this.value)-Number(this.step):Number(this.value)+Number(this.step),e=this.convertToConstrainedValue(t),s=e>Number(this.min)?`${e}`:`${this.min}`;this.value=s}setThumbPositionForOrientation(t){const s=(1-zi(Number(this.value),Number(this.min),Number(this.max),t))*100;this.orientation===Z.horizontal?this.position=this.isDragging?`right: ${s}%; transition: none;`:`right: ${s}%; transition: all 0.2s ease;`:this.position=this.isDragging?`bottom: ${s}%; transition: none;`:`bottom: ${s}%; transition: all 0.2s ease;`}updateStepMultiplier(){const t=this.step+"",e=this.step%1?t.length-t.indexOf(".")-1:0;this.stepMultiplier=Math.pow(10,e)}get midpoint(){return`${this.convertToConstrainedValue((this.max+this.min)/2)}`}setupDefaultValue(){if(typeof this.value=="string")if(this.value.length===0)this.initialValue=this.midpoint;else{const t=parseFloat(this.value);!Number.isNaN(t)&&(t<this.min||t>this.max)&&(this.value=this.midpoint)}}}g([v({attribute:"readonly",mode:"boolean"})],tt.prototype,"readOnly",void 0);g([x],tt.prototype,"direction",void 0);g([x],tt.prototype,"isDragging",void 0);g([x],tt.prototype,"position",void 0);g([x],tt.prototype,"trackWidth",void 0);g([x],tt.prototype,"trackMinWidth",void 0);g([x],tt.prototype,"trackHeight",void 0);g([x],tt.prototype,"trackLeft",void 0);g([x],tt.prototype,"trackMinHeight",void 0);g([x],tt.prototype,"valueTextFormatter",void 0);g([v({converter:ns})],tt.prototype,"min",void 0);g([v({converter:ns})],tt.prototype,"max",void 0);g([v({converter:ns})],tt.prototype,"step",void 0);g([v],tt.prototype,"orientation",void 0);g([v],tt.prototype,"mode",void 0);const sa=(i,t)=>lt`
        ${as(e=>e.tooltipVisible,lt`
            <${i.tagFor(I)}
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
                ${ct("region")}
            >
                <div class="tooltip" part="tooltip" role="tooltip">
                    <slot></slot>
                </div>
            </${i.tagFor(I)}>
        `)}
    `,ot={top:"top",right:"right",bottom:"bottom",left:"left",start:"start",end:"end",topLeft:"top-left",topRight:"top-right",bottomLeft:"bottom-left",bottomRight:"bottom-right",topStart:"top-start",topEnd:"top-end",bottomStart:"bottom-start",bottomEnd:"bottom-end"};class z extends ht{constructor(){super(...arguments),this.anchor="",this.delay=300,this.autoUpdateMode="anchor",this.anchorElement=null,this.viewportElement=null,this.verticalPositioningMode="dynamic",this.horizontalPositioningMode="dynamic",this.horizontalInset="false",this.verticalInset="false",this.horizontalScaling="content",this.verticalScaling="content",this.verticalDefaultPosition=void 0,this.horizontalDefaultPosition=void 0,this.tooltipVisible=!1,this.currentDirection=O.ltr,this.showDelayTimer=null,this.hideDelayTimer=null,this.isAnchorHoveredFocused=!1,this.isRegionHovered=!1,this.handlePositionChange=t=>{this.classList.toggle("top",this.region.verticalPosition==="start"),this.classList.toggle("bottom",this.region.verticalPosition==="end"),this.classList.toggle("inset-top",this.region.verticalPosition==="insetStart"),this.classList.toggle("inset-bottom",this.region.verticalPosition==="insetEnd"),this.classList.toggle("center-vertical",this.region.verticalPosition==="center"),this.classList.toggle("left",this.region.horizontalPosition==="start"),this.classList.toggle("right",this.region.horizontalPosition==="end"),this.classList.toggle("inset-left",this.region.horizontalPosition==="insetStart"),this.classList.toggle("inset-right",this.region.horizontalPosition==="insetEnd"),this.classList.toggle("center-horizontal",this.region.horizontalPosition==="center")},this.handleRegionMouseOver=t=>{this.isRegionHovered=!0},this.handleRegionMouseOut=t=>{this.isRegionHovered=!1,this.startHideDelayTimer()},this.handleAnchorMouseOver=t=>{if(this.tooltipVisible){this.isAnchorHoveredFocused=!0;return}this.startShowDelayTimer()},this.handleAnchorMouseOut=t=>{this.isAnchorHoveredFocused=!1,this.clearShowDelayTimer(),this.startHideDelayTimer()},this.handleAnchorFocusIn=t=>{this.startShowDelayTimer()},this.handleAnchorFocusOut=t=>{this.isAnchorHoveredFocused=!1,this.clearShowDelayTimer(),this.startHideDelayTimer()},this.startHideDelayTimer=()=>{this.clearHideDelayTimer(),this.tooltipVisible&&(this.hideDelayTimer=window.setTimeout(()=>{this.updateTooltipVisibility()},60))},this.clearHideDelayTimer=()=>{this.hideDelayTimer!==null&&(clearTimeout(this.hideDelayTimer),this.hideDelayTimer=null)},this.startShowDelayTimer=()=>{if(!this.isAnchorHoveredFocused){if(this.delay>1){this.showDelayTimer===null&&(this.showDelayTimer=window.setTimeout(()=>{this.startHover()},this.delay));return}this.startHover()}},this.startHover=()=>{this.isAnchorHoveredFocused=!0,this.updateTooltipVisibility()},this.clearShowDelayTimer=()=>{this.showDelayTimer!==null&&(clearTimeout(this.showDelayTimer),this.showDelayTimer=null)},this.getAnchor=()=>{const t=this.getRootNode();return t instanceof ShadowRoot?t.getElementById(this.anchor):document.getElementById(this.anchor)},this.handleDocumentKeydown=t=>{if(!t.defaultPrevented&&this.tooltipVisible)switch(t.key){case Vn:this.isAnchorHoveredFocused=!1,this.updateTooltipVisibility(),this.$emit("dismiss");break}},this.updateTooltipVisibility=()=>{if(this.visible===!1)this.hideTooltip();else if(this.visible===!0){this.showTooltip();return}else{if(this.isAnchorHoveredFocused||this.isRegionHovered){this.showTooltip();return}this.hideTooltip()}},this.showTooltip=()=>{this.tooltipVisible||(this.currentDirection=ke(this),this.tooltipVisible=!0,document.addEventListener("keydown",this.handleDocumentKeydown),$.queueUpdate(this.setRegionProps))},this.hideTooltip=()=>{this.tooltipVisible&&(this.clearHideDelayTimer(),this.region!==null&&this.region!==void 0&&(this.region.removeEventListener("positionchange",this.handlePositionChange),this.region.viewportElement=null,this.region.anchorElement=null,this.region.removeEventListener("mouseover",this.handleRegionMouseOver),this.region.removeEventListener("mouseout",this.handleRegionMouseOut)),document.removeEventListener("keydown",this.handleDocumentKeydown),this.tooltipVisible=!1)},this.setRegionProps=()=>{this.tooltipVisible&&(this.region.viewportElement=this.viewportElement,this.region.anchorElement=this.anchorElement,this.region.addEventListener("positionchange",this.handlePositionChange),this.region.addEventListener("mouseover",this.handleRegionMouseOver,{passive:!0}),this.region.addEventListener("mouseout",this.handleRegionMouseOut,{passive:!0}))}}visibleChanged(){this.$fastController.isConnected&&(this.updateTooltipVisibility(),this.updateLayout())}anchorChanged(){this.$fastController.isConnected&&(this.anchorElement=this.getAnchor())}positionChanged(){this.$fastController.isConnected&&this.updateLayout()}anchorElementChanged(t){if(this.$fastController.isConnected){if(t!=null&&(t.removeEventListener("mouseover",this.handleAnchorMouseOver),t.removeEventListener("mouseout",this.handleAnchorMouseOut),t.removeEventListener("focusin",this.handleAnchorFocusIn),t.removeEventListener("focusout",this.handleAnchorFocusOut)),this.anchorElement!==null&&this.anchorElement!==void 0){this.anchorElement.addEventListener("mouseover",this.handleAnchorMouseOver,{passive:!0}),this.anchorElement.addEventListener("mouseout",this.handleAnchorMouseOut,{passive:!0}),this.anchorElement.addEventListener("focusin",this.handleAnchorFocusIn,{passive:!0}),this.anchorElement.addEventListener("focusout",this.handleAnchorFocusOut,{passive:!0});const e=this.anchorElement.id;this.anchorElement.parentElement!==null&&this.anchorElement.parentElement.querySelectorAll(":hover").forEach(s=>{s.id===e&&this.startShowDelayTimer()})}this.region!==null&&this.region!==void 0&&this.tooltipVisible&&(this.region.anchorElement=this.anchorElement),this.updateLayout()}}viewportElementChanged(){this.region!==null&&this.region!==void 0&&(this.region.viewportElement=this.viewportElement),this.updateLayout()}connectedCallback(){super.connectedCallback(),this.anchorElement=this.getAnchor(),this.updateTooltipVisibility()}disconnectedCallback(){this.hideTooltip(),this.clearShowDelayTimer(),this.clearHideDelayTimer(),super.disconnectedCallback()}updateLayout(){switch(this.verticalPositioningMode="locktodefault",this.horizontalPositioningMode="locktodefault",this.position){case ot.top:case ot.bottom:this.verticalDefaultPosition=this.position,this.horizontalDefaultPosition="center";break;case ot.right:case ot.left:case ot.start:case ot.end:this.verticalDefaultPosition="center",this.horizontalDefaultPosition=this.position;break;case ot.topLeft:this.verticalDefaultPosition="top",this.horizontalDefaultPosition="left";break;case ot.topRight:this.verticalDefaultPosition="top",this.horizontalDefaultPosition="right";break;case ot.bottomLeft:this.verticalDefaultPosition="bottom",this.horizontalDefaultPosition="left";break;case ot.bottomRight:this.verticalDefaultPosition="bottom",this.horizontalDefaultPosition="right";break;case ot.topStart:this.verticalDefaultPosition="top",this.horizontalDefaultPosition="start";break;case ot.topEnd:this.verticalDefaultPosition="top",this.horizontalDefaultPosition="end";break;case ot.bottomStart:this.verticalDefaultPosition="bottom",this.horizontalDefaultPosition="start";break;case ot.bottomEnd:this.verticalDefaultPosition="bottom",this.horizontalDefaultPosition="end";break;default:this.verticalPositioningMode="dynamic",this.horizontalPositioningMode="dynamic",this.verticalDefaultPosition=void 0,this.horizontalDefaultPosition="center";break}}}g([v({mode:"boolean"})],z.prototype,"visible",void 0);g([v],z.prototype,"anchor",void 0);g([v],z.prototype,"delay",void 0);g([v],z.prototype,"position",void 0);g([v({attribute:"auto-update-mode"})],z.prototype,"autoUpdateMode",void 0);g([v({attribute:"horizontal-viewport-lock"})],z.prototype,"horizontalViewportLock",void 0);g([v({attribute:"vertical-viewport-lock"})],z.prototype,"verticalViewportLock",void 0);g([x],z.prototype,"anchorElement",void 0);g([x],z.prototype,"viewportElement",void 0);g([x],z.prototype,"verticalPositioningMode",void 0);g([x],z.prototype,"horizontalPositioningMode",void 0);g([x],z.prototype,"horizontalInset",void 0);g([x],z.prototype,"verticalInset",void 0);g([x],z.prototype,"horizontalScaling",void 0);g([x],z.prototype,"verticalScaling",void 0);g([x],z.prototype,"verticalDefaultPosition",void 0);g([x],z.prototype,"horizontalDefaultPosition",void 0);g([x],z.prototype,"tooltipVisible",void 0);g([x],z.prototype,"currentDirection",void 0);class na{constructor(t){this.listenerCache=new WeakMap,this.query=t}bind(t){const{query:e}=this,s=this.constructListener(t);s.bind(e)(),e.addListener(s),this.listenerCache.set(t,s)}unbind(t){const e=this.listenerCache.get(t);e&&(this.query.removeListener(e),this.listenerCache.delete(t))}}class Me extends na{constructor(t,e){super(t),this.styles=e}static with(t){return e=>new Me(t,e)}constructListener(t){let e=!1;const s=this.styles;return function(){const{matches:r}=this;r&&!e?(t.$fastController.addStyles(s),e=r):!r&&e&&(t.$fastController.removeStyles(s),e=r)}}unbind(t){super.unbind(t),t.$fastController.removeStyles(this.styles)}}const it=Me.with(window.matchMedia("(forced-colors)"));Me.with(window.matchMedia("(prefers-color-scheme: dark)"));Me.with(window.matchMedia("(prefers-color-scheme: light)"));class ra{constructor(t,e,s){this.propertyName=t,this.value=e,this.styles=s}bind(t){V.getNotifier(t).subscribe(this,this.propertyName),this.handleChange(t,this.propertyName)}unbind(t){V.getNotifier(t).unsubscribe(this,this.propertyName),t.$fastController.removeStyles(this.styles)}handleChange(t,e){t[e]===this.value?t.$fastController.addStyles(this.styles):t.$fastController.removeStyles(this.styles)}}const Ye="not-allowed",oa=":host([hidden]){display:none}";function De(i){return`${oa}:host{display:${i}}`}const L=lo()?"focus-visible":"focus";function It(i,t,e){return isNaN(i)||i<=t?t:i>=e?e:i}function Mi(i,t,e){return isNaN(i)||i<=t?0:i>=e?1:i/(e-t)}function jt(i,t,e){return isNaN(i)?t:t+i*(e-t)}function en(i){return i*(Math.PI/180)}function aa(i){return i*(180/Math.PI)}function la(i){const t=Math.round(It(i,0,255)).toString(16);return t.length===1?"0"+t:t}function J(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:t+i*(e-t)}function fs(i,t,e){if(i<=0)return t%360;if(i>=1)return e%360;const s=(t-e+360)%360,n=(e-t+360)%360;return s<=n?(t-s*i+360)%360:(t+s*i+360)%360}function U(i,t){const e=Math.pow(10,t);return Math.round(i*e)/e}class Ut{constructor(t,e,s){this.h=t,this.s=e,this.l=s}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.l)?new Ut(t.h,t.s,t.l):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.l===t.l}roundToPrecision(t){return new Ut(U(this.h,t),U(this.s,t),U(this.l,t))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class Ee{constructor(t,e,s){this.h=t,this.s=e,this.v=s}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.v)?new Ee(t.h,t.s,t.v):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.v===t.v}roundToPrecision(t){return new Ee(U(this.h,t),U(this.s,t),U(this.v,t))}toObject(){return{h:this.h,s:this.s,v:this.v}}}class Y{constructor(t,e,s){this.l=t,this.a=e,this.b=s}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.a)&&!isNaN(t.b)?new Y(t.l,t.a,t.b):null}equalValue(t){return this.l===t.l&&this.a===t.a&&this.b===t.b}roundToPrecision(t){return new Y(U(this.l,t),U(this.a,t),U(this.b,t))}toObject(){return{l:this.l,a:this.a,b:this.b}}}Y.epsilon=216/24389;Y.kappa=24389/27;class Jt{constructor(t,e,s){this.l=t,this.c=e,this.h=s}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.c)&&!isNaN(t.h)?new Jt(t.l,t.c,t.h):null}equalValue(t){return this.l===t.l&&this.c===t.c&&this.h===t.h}roundToPrecision(t){return new Jt(U(this.l,t),U(this.c,t),U(this.h,t))}toObject(){return{l:this.l,c:this.c,h:this.h}}}class N{constructor(t,e,s,n){this.r=t,this.g=e,this.b=s,this.a=typeof n=="number"&&!isNaN(n)?n:1}static fromObject(t){return t&&!isNaN(t.r)&&!isNaN(t.g)&&!isNaN(t.b)?new N(t.r,t.g,t.b,t.a):null}equalValue(t){return this.r===t.r&&this.g===t.g&&this.b===t.b&&this.a===t.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(jt(this.r,0,255))},${Math.round(jt(this.g,0,255))},${Math.round(jt(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(jt(this.r,0,255))},${Math.round(jt(this.g,0,255))},${Math.round(jt(this.b,0,255))},${It(this.a,0,1)})`}roundToPrecision(t){return new N(U(this.r,t),U(this.g,t),U(this.b,t),U(this.a,t))}clamp(){return new N(It(this.r,0,1),It(this.g,0,1),It(this.b,0,1),It(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(t){return la(jt(t,0,255))}}class at{constructor(t,e,s){this.x=t,this.y=e,this.z=s}static fromObject(t){return t&&!isNaN(t.x)&&!isNaN(t.y)&&!isNaN(t.z)?new at(t.x,t.y,t.z):null}equalValue(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}roundToPrecision(t){return new at(U(this.x,t),U(this.y,t),U(this.z,t))}toObject(){return{x:this.x,y:this.y,z:this.z}}}at.whitePoint=new at(.95047,1,1.08883);function ji(i){return i.r*.2126+i.g*.7152+i.b*.0722}function Hi(i){function t(e){return e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4)}return ji(new N(t(i.r),t(i.g),t(i.b),1))}const sn=(i,t)=>(i+.05)/(t+.05);function nn(i,t){const e=Hi(i),s=Hi(t);return e>s?sn(e,s):sn(s,e)}function Te(i){const t=Math.max(i.r,i.g,i.b),e=Math.min(i.r,i.g,i.b),s=t-e;let n=0;s!==0&&(t===i.r?n=60*((i.g-i.b)/s%6):t===i.g?n=60*((i.b-i.r)/s+2):n=60*((i.r-i.g)/s+4)),n<0&&(n+=360);const r=(t+e)/2;let o=0;return s!==0&&(o=s/(1-Math.abs(2*r-1))),new Ut(n,o,r)}function Ui(i,t=1){const e=(1-Math.abs(2*i.l-1))*i.s,s=e*(1-Math.abs(i.h/60%2-1)),n=i.l-e/2;let r=0,o=0,a=0;return i.h<60?(r=e,o=s,a=0):i.h<120?(r=s,o=e,a=0):i.h<180?(r=0,o=e,a=s):i.h<240?(r=0,o=s,a=e):i.h<300?(r=s,o=0,a=e):i.h<360&&(r=e,o=0,a=s),new N(r+n,o+n,a+n,t)}function rn(i){const t=Math.max(i.r,i.g,i.b),e=Math.min(i.r,i.g,i.b),s=t-e;let n=0;s!==0&&(t===i.r?n=60*((i.g-i.b)/s%6):t===i.g?n=60*((i.b-i.r)/s+2):n=60*((i.r-i.g)/s+4)),n<0&&(n+=360);let r=0;return t!==0&&(r=s/t),new Ee(n,r,t)}function ca(i,t=1){const e=i.s*i.v,s=e*(1-Math.abs(i.h/60%2-1)),n=i.v-e;let r=0,o=0,a=0;return i.h<60?(r=e,o=s,a=0):i.h<120?(r=s,o=e,a=0):i.h<180?(r=0,o=e,a=s):i.h<240?(r=0,o=s,a=e):i.h<300?(r=s,o=0,a=e):i.h<360&&(r=e,o=0,a=s),new N(r+n,o+n,a+n,t)}function ha(i){let t=0,e=0;return i.h!==0&&(t=Math.cos(en(i.h))*i.c,e=Math.sin(en(i.h))*i.c),new Y(i.l,t,e)}function da(i){let t=0;(Math.abs(i.b)>.001||Math.abs(i.a)>.001)&&(t=aa(Math.atan2(i.b,i.a))),t<0&&(t+=360);const e=Math.sqrt(i.a*i.a+i.b*i.b);return new Jt(i.l,e,t)}function ua(i){const t=(i.l+16)/116,e=t+i.a/500,s=t-i.b/200,n=Math.pow(e,3),r=Math.pow(t,3),o=Math.pow(s,3);let a=0;n>Y.epsilon?a=n:a=(116*e-16)/Y.kappa;let l=0;i.l>Y.epsilon*Y.kappa?l=r:l=i.l/Y.kappa;let c=0;return o>Y.epsilon?c=o:c=(116*s-16)/Y.kappa,a=at.whitePoint.x*a,l=at.whitePoint.y*l,c=at.whitePoint.z*c,new at(a,l,c)}function fa(i){function t(l){return l>Y.epsilon?Math.pow(l,1/3):(Y.kappa*l+16)/116}const e=t(i.x/at.whitePoint.x),s=t(i.y/at.whitePoint.y),n=t(i.z/at.whitePoint.z),r=116*s-16,o=500*(e-s),a=200*(s-n);return new Y(r,o,a)}function Wi(i){function t(l){return l<=.04045?l/12.92:Math.pow((l+.055)/1.055,2.4)}const e=t(i.r),s=t(i.g),n=t(i.b),r=e*.4124564+s*.3575761+n*.1804375,o=e*.2126729+s*.7151522+n*.072175,a=e*.0193339+s*.119192+n*.9503041;return new at(r,o,a)}function jn(i,t=1){function e(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}const s=e(i.x*3.2404542-i.y*1.5371385-i.z*.4985314),n=e(i.x*-.969266+i.y*1.8760108+i.z*.041556),r=e(i.x*.0556434-i.y*.2040259+i.z*1.0572252);return new N(s,n,r,t)}function Gi(i){return fa(Wi(i))}function Hn(i,t=1){return jn(ua(i),t)}function qi(i){return da(Gi(i))}function Un(i,t=1){return Hn(ha(i),t)}function on(i,t,e=18){const s=qi(i);let n=s.c+t*e;return n<0&&(n=0),Un(new Jt(s.l,n,s.h))}function Di(i,t){return i*t}function an(i,t){return new N(Di(i.r,t.r),Di(i.g,t.g),Di(i.b,t.b),1)}function Li(i,t){return i<.5?It(2*t*i,0,1):It(1-2*(1-t)*(1-i),0,1)}function ln(i,t){return new N(Li(i.r,t.r),Li(i.g,t.g),Li(i.b,t.b),1)}var cn;(function(i){i[i.Burn=0]="Burn",i[i.Color=1]="Color",i[i.Darken=2]="Darken",i[i.Dodge=3]="Dodge",i[i.Lighten=4]="Lighten",i[i.Multiply=5]="Multiply",i[i.Overlay=6]="Overlay",i[i.Screen=7]="Screen"})(cn||(cn={}));function ga(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new N(J(i,t.r,e.r),J(i,t.g,e.g),J(i,t.b,e.b),J(i,t.a,e.a))}function pa(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new Ut(fs(i,t.h,e.h),J(i,t.s,e.s),J(i,t.l,e.l))}function ma(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new Ee(fs(i,t.h,e.h),J(i,t.s,e.s),J(i,t.v,e.v))}function ba(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new at(J(i,t.x,e.x),J(i,t.y,e.y),J(i,t.z,e.z))}function va(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new Y(J(i,t.l,e.l),J(i,t.a,e.a),J(i,t.b,e.b))}function ya(i,t,e){return isNaN(i)||i<=0?t:i>=1?e:new Jt(J(i,t.l,e.l),J(i,t.c,e.c),fs(i,t.h,e.h))}var ut;(function(i){i[i.RGB=0]="RGB",i[i.HSL=1]="HSL",i[i.HSV=2]="HSV",i[i.XYZ=3]="XYZ",i[i.LAB=4]="LAB",i[i.LCH=5]="LCH"})(ut||(ut={}));function me(i,t,e,s){if(isNaN(i)||i<=0)return e;if(i>=1)return s;switch(t){case ut.HSL:return Ui(pa(i,Te(e),Te(s)));case ut.HSV:return ca(ma(i,rn(e),rn(s)));case ut.XYZ:return jn(ba(i,Wi(e),Wi(s)));case ut.LAB:return Hn(va(i,Gi(e),Gi(s)));case ut.LCH:return Un(ya(i,qi(e),qi(s)));default:return ga(i,e,s)}}class vt{constructor(t){if(t==null||t.length===0)throw new Error("The stops argument must be non-empty");this.stops=this.sortColorScaleStops(t)}static createBalancedColorScale(t){if(t==null||t.length===0)throw new Error("The colors argument must be non-empty");const e=new Array(t.length);for(let s=0;s<t.length;s++)s===0?e[s]={color:t[s],position:0}:s===t.length-1?e[s]={color:t[s],position:1}:e[s]={color:t[s],position:s*(1/(t.length-1))};return new vt(e)}getColor(t,e=ut.RGB){if(this.stops.length===1)return this.stops[0].color;if(t<=0)return this.stops[0].color;if(t>=1)return this.stops[this.stops.length-1].color;let s=0;for(let o=0;o<this.stops.length;o++)this.stops[o].position<=t&&(s=o);let n=s+1;n>=this.stops.length&&(n=this.stops.length-1);const r=(t-this.stops[s].position)*(1/(this.stops[n].position-this.stops[s].position));return me(r,e,this.stops[s].color,this.stops[n].color)}trim(t,e,s=ut.RGB){if(t<0||e>1||e<t)throw new Error("Invalid bounds");if(t===e)return new vt([{color:this.getColor(t,s),position:0}]);const n=[];for(let a=0;a<this.stops.length;a++)this.stops[a].position>=t&&this.stops[a].position<=e&&n.push(this.stops[a]);if(n.length===0)return new vt([{color:this.getColor(t),position:t},{color:this.getColor(e),position:e}]);n[0].position!==t&&n.unshift({color:this.getColor(t),position:t}),n[n.length-1].position!==e&&n.push({color:this.getColor(e),position:e});const r=e-t,o=new Array(n.length);for(let a=0;a<n.length;a++)o[a]={color:n[a].color,position:(n[a].position-t)/r};return new vt(o)}findNextColor(t,e,s=!1,n=ut.RGB,r=.005,o=32){isNaN(t)||t<=0?t=0:t>=1&&(t=1);const a=this.getColor(t,n),l=s?0:1,c=this.getColor(l,n);if(nn(a,c)<=e)return l;let d=s?0:t,u=s?t:0,f=l,m=0;for(;m<=o;){f=Math.abs(u-d)/2+d;const y=this.getColor(f,n),S=nn(a,y);if(Math.abs(S-e)<=r)return f;S>e?s?d=f:u=f:s?u=f:d=f,m++}return f}clone(){const t=new Array(this.stops.length);for(let e=0;e<t.length;e++)t[e]={color:this.stops[e].color,position:this.stops[e].position};return new vt(t)}sortColorScaleStops(t){return t.sort((e,s)=>{const n=e.position,r=s.position;return n<r?-1:n>r?1:0})}}const wa=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;function ee(i){const t=wa.exec(i);if(t===null)return null;let e=t[1];if(e.length===3){const n=e.charAt(0),r=e.charAt(1),o=e.charAt(2);e=n.concat(n,r,r,o,o)}const s=parseInt(e,16);return isNaN(s)?null:new N(Mi((s&16711680)>>>16,0,255),Mi((s&65280)>>>8,0,255),Mi(s&255,0,255),1)}class Nt{constructor(t){this.config=Object.assign({},Nt.defaultPaletteConfig,t),this.palette=[],this.updatePaletteColors()}updatePaletteGenerationValues(t){let e=!1;for(const s in t)this.config[s]&&(this.config[s].equalValue?this.config[s].equalValue(t[s])||(this.config[s]=t[s],e=!0):t[s]!==this.config[s]&&(this.config[s]=t[s],e=!0));return e&&this.updatePaletteColors(),e}updatePaletteColors(){const t=this.generatePaletteColorScale();for(let e=0;e<this.config.steps;e++)this.palette[e]=t.getColor(e/(this.config.steps-1),this.config.interpolationMode)}generatePaletteColorScale(){const t=Te(this.config.baseColor),s=new vt([{position:0,color:this.config.scaleColorLight},{position:.5,color:this.config.baseColor},{position:1,color:this.config.scaleColorDark}]).trim(this.config.clipLight,1-this.config.clipDark),n=s.getColor(0),r=s.getColor(1);let o=n,a=r;if(t.s>=this.config.saturationAdjustmentCutoff&&(o=on(o,this.config.saturationLight),a=on(a,this.config.saturationDark)),this.config.multiplyLight!==0){const l=an(this.config.baseColor,o);o=me(this.config.multiplyLight,this.config.interpolationMode,o,l)}if(this.config.multiplyDark!==0){const l=an(this.config.baseColor,a);a=me(this.config.multiplyDark,this.config.interpolationMode,a,l)}if(this.config.overlayLight!==0){const l=ln(this.config.baseColor,o);o=me(this.config.overlayLight,this.config.interpolationMode,o,l)}if(this.config.overlayDark!==0){const l=ln(this.config.baseColor,a);a=me(this.config.overlayDark,this.config.interpolationMode,a,l)}return this.config.baseScalePosition?this.config.baseScalePosition<=0?new vt([{position:0,color:this.config.baseColor},{position:1,color:a.clamp()}]):this.config.baseScalePosition>=1?new vt([{position:0,color:o.clamp()},{position:1,color:this.config.baseColor}]):new vt([{position:0,color:o.clamp()},{position:this.config.baseScalePosition,color:this.config.baseColor},{position:1,color:a.clamp()}]):new vt([{position:0,color:o.clamp()},{position:.5,color:this.config.baseColor},{position:1,color:a.clamp()}])}}Nt.defaultPaletteConfig={baseColor:ee("#808080"),steps:11,interpolationMode:ut.RGB,scaleColorLight:new N(1,1,1,1),scaleColorDark:new N(0,0,0,1),clipLight:.185,clipDark:.16,saturationAdjustmentCutoff:.05,saturationLight:.35,saturationDark:1.25,overlayLight:0,overlayDark:.25,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};Nt.greyscalePaletteConfig={baseColor:ee("#808080"),steps:11,interpolationMode:ut.RGB,scaleColorLight:new N(1,1,1,1),scaleColorDark:new N(0,0,0,1),clipLight:0,clipDark:0,saturationAdjustmentCutoff:0,saturationLight:0,saturationDark:0,overlayLight:0,overlayDark:0,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};Nt.defaultPaletteConfig.scaleColorLight,Nt.defaultPaletteConfig.scaleColorDark;class ni{constructor(t){this.palette=[],this.config=Object.assign({},ni.defaultPaletteConfig,t),this.regenPalettes()}regenPalettes(){let t=this.config.steps;(isNaN(t)||t<3)&&(t=3);const e=.14,s=.06,n=new N(e,e,e,1),r=94,a=new Nt(Object.assign(Object.assign({},Nt.greyscalePaletteConfig),{baseColor:n,baseScalePosition:(1-e)*100/r,steps:t})).palette,l=ji(this.config.baseColor),c=Te(this.config.baseColor).l,h=(l+c)/2,u=this.matchRelativeLuminanceIndex(h,a)/(t-1),m=this.matchRelativeLuminanceIndex(e,a)/(t-1),y=Te(this.config.baseColor),S=Ui(Ut.fromObject({h:y.h,s:y.s,l:e})),E=Ui(Ut.fromObject({h:y.h,s:y.s,l:s})),P=new Array(5);P[0]={position:0,color:new N(1,1,1,1)},P[1]={position:u,color:this.config.baseColor},P[2]={position:m,color:S},P[3]={position:.99,color:E},P[4]={position:1,color:new N(0,0,0,1)};const nt=new vt(P);this.palette=new Array(t);for(let C=0;C<t;C++){const M=nt.getColor(C/(t-1),ut.RGB);this.palette[C]=M}}matchRelativeLuminanceIndex(t,e){let s=Number.MAX_VALUE,n=0,r=0;const o=e.length;for(;r<o;r++){const a=Math.abs(ji(e[r])-t);a<s&&(s=a,n=r)}return n}}ni.defaultPaletteConfig={baseColor:ee("#808080"),steps:94};function Wn(i,t){const e=i.relativeLuminance>t.relativeLuminance?i:t,s=i.relativeLuminance>t.relativeLuminance?t:i;return(e.relativeLuminance+.05)/(s.relativeLuminance+.05)}const Bt=Object.freeze({create(i,t,e){return new Xe(i,t,e)},from(i){return new Xe(i.r,i.g,i.b)}});function xa(i){const t={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const e in t)if(typeof t[e]!=typeof i[e])return!1;return!0}class Xe extends N{constructor(t,e,s){super(t,e,s,1),this.toColorString=this.toStringHexRGB,this.contrast=Wn.bind(null,this),this.createCSS=this.toColorString,this.relativeLuminance=Hi(this)}static fromObject(t){return new Xe(t.r,t.g,t.b)}}function _i(i,t,e=0,s=i.length-1){if(s===e)return i[e];const n=Math.floor((s-e)/2)+e;return t(i[n])?_i(i,t,e,n):_i(i,t,n+1,s)}const Sa=(-.1+Math.sqrt(.21))/2;function Ra(i){return i.relativeLuminance<=Sa}function Wt(i){return Ra(i)?-1:1}function Ca(i,t,e){return typeof i=="number"?Qe.from(Bt.create(i,t,e)):Qe.from(i)}function ka(i){return xa(i)?Ze.from(i):Ze.from(Bt.create(i.r,i.g,i.b))}const Qe=Object.freeze({create:Ca,from:ka});class Ze{constructor(t,e){this.closestIndexCache=new Map,this.source=t,this.swatches=e,this.reversedSwatches=Object.freeze([...this.swatches].reverse()),this.lastIndex=this.swatches.length-1}colorContrast(t,e,s,n){s===void 0&&(s=this.closestIndexOf(t));let r=this.swatches;const o=this.lastIndex;let a=s;n===void 0&&(n=Wt(t));const l=c=>Wn(t,c)>=e;return n===-1&&(r=this.reversedSwatches,a=o-a),_i(r,l,a,o)}get(t){return this.swatches[t]||this.swatches[It(t,0,this.lastIndex)]}closestIndexOf(t){if(this.closestIndexCache.has(t.relativeLuminance))return this.closestIndexCache.get(t.relativeLuminance);let e=this.swatches.indexOf(t);if(e!==-1)return this.closestIndexCache.set(t.relativeLuminance,e),e;const s=this.swatches.reduce((n,r)=>Math.abs(r.relativeLuminance-t.relativeLuminance)<Math.abs(n.relativeLuminance-t.relativeLuminance)?r:n);return e=this.swatches.indexOf(s),this.closestIndexCache.set(t.relativeLuminance,e),e}static from(t){return new Ze(t,Object.freeze(new ni({baseColor:N.fromObject(t)}).palette.map(e=>{const s=ee(e.toStringHexRGB());return Bt.create(s.r,s.g,s.b)})))}}function Ea(i,t,e,s,n,r,o,a,l){const c=i.source,h=t.closestIndexOf(e),d=Math.max(o,a,l),u=h>=d?-1:1,m=i.closestIndexOf(c),y=m+u*-1*s,S=y+u*n,E=y+u*r;return{rest:i.get(y),hover:i.get(m),active:i.get(S),focus:i.get(E)}}function Ta(i,t,e,s,n,r,o){const a=i.source,l=i.closestIndexOf(a),c=Wt(t),h=l+(c===1?Math.min(s,n):Math.max(c*s,c*n)),d=i.colorContrast(t,e,h,c),u=i.closestIndexOf(d),f=u+c*Math.abs(s-n),m=c===1?s<n:c*s>c*n;let y,S;return m?(y=u,S=f):(y=f,S=u),{rest:i.get(y),hover:i.get(S),active:i.get(y+c*r),focus:i.get(y+c*o)}}const hn=Bt.create(1,1,1),$a=Bt.create(0,0,0),Ia=Bt.from(ee("#808080")),Ma=Bt.from(ee("#DA1A5F"));function Da(i,t){return i.contrast(hn)>=t?hn:$a}function La(i,t,e,s,n,r){const o=i.closestIndexOf(t),a=Math.max(e,s,n,r),l=o>=a?-1:1;return{rest:i.get(o+l*e),hover:i.get(o+l*s),active:i.get(o+l*n),focus:i.get(o+l*r)}}function Fa(i,t,e,s,n,r){const o=Wt(t),a=i.closestIndexOf(t);return{rest:i.get(a-o*e),hover:i.get(a-o*s),active:i.get(a-o*n),focus:i.get(a-o*r)}}function Pa(i,t,e){const s=i.closestIndexOf(t);return i.get(s-(s<e?e*-1:e))}function Va(i,t,e,s,n,r,o,a,l,c){const h=Math.max(e,s,n,r,o,a,l,c),d=i.closestIndexOf(t),u=d>=h?-1:1;return{rest:i.get(d+u*e),hover:i.get(d+u*s),active:i.get(d+u*n),focus:i.get(d+u*r)}}function Aa(i,t,e,s,n,r){const o=Wt(t),a=i.closestIndexOf(i.colorContrast(t,4.5)),l=a+o*Math.abs(e-s),c=o===1?e<s:o*e>o*s;let h,d;return c?(h=a,d=l):(h=l,d=a),{rest:i.get(h),hover:i.get(d),active:i.get(h+o*n),focus:i.get(h+o*r)}}function Na(i,t){return i.colorContrast(t,3.5)}function Oa(i,t,e){return i.colorContrast(e,3.5,i.closestIndexOf(i.source),Wt(t)*-1)}function Ba(i,t){return i.colorContrast(t,14)}function za(i,t){return i.colorContrast(t,4.5)}function ri(i){return Bt.create(i,i,i)}const ja={LightMode:1,DarkMode:.23};function Ha(i,t,e){return i.get(i.closestIndexOf(ri(t))+e)}function Ua(i,t,e){const s=i.closestIndexOf(ri(t))-e;return i.get(s-e)}function Wa(i,t){return i.get(i.closestIndexOf(ri(t)))}function gs(i,t,e,s,n,r){return Math.max(i.closestIndexOf(ri(t))+e,s,n,r)}function Ga(i,t,e,s,n,r){return i.get(gs(i,t,e,s,n,r))}function qa(i,t,e,s,n,r){return i.get(gs(i,t,e,s,n,r)+e)}function _a(i,t,e,s,n,r){return i.get(gs(i,t,e,s,n,r)+e*2)}function Ya(i,t,e,s,n,r){const o=i.closestIndexOf(t),a=Wt(t),l=o+a*e,c=l+a*(s-e),h=l+a*(n-e),d=l+a*(r-e);return{rest:i.get(l),hover:i.get(c),active:i.get(h),focus:i.get(d)}}function Xa(i,t,e){return i.get(i.closestIndexOf(t)+Wt(t)*e)}const{create:b}=ii;function w(i){return ii.create({name:i,cssCustomPropertyName:null})}const oi=b("body-font").withDefault('aktiv-grotesk, "Segoe UI", Arial, Helvetica, sans-serif'),Gn=b("base-height-multiplier").withDefault(10);b("base-horizontal-spacing-multiplier").withDefault(3);const ie=b("base-layer-luminance").withDefault(ja.DarkMode),Ht=b("control-corner-radius").withDefault(4),ps=b("density").withDefault(0),H=b("design-unit").withDefault(4),Fi=b("direction").withDefault(O.ltr),ai=b("disabled-opacity").withDefault(.3),K=b("stroke-width").withDefault(1),Rt=b("focus-stroke-width").withDefault(2),ms=b("type-ramp-base-font-size").withDefault("14px"),bs=b("type-ramp-base-line-height").withDefault("20px");b("type-ramp-minus-1-font-size").withDefault("12px");b("type-ramp-minus-1-line-height").withDefault("16px");b("type-ramp-minus-2-font-size").withDefault("10px");b("type-ramp-minus-2-line-height").withDefault("16px");b("type-ramp-plus-1-font-size").withDefault("16px");b("type-ramp-plus-1-line-height").withDefault("24px");b("type-ramp-plus-2-font-size").withDefault("20px");b("type-ramp-plus-2-line-height").withDefault("28px");b("type-ramp-plus-3-font-size").withDefault("28px");b("type-ramp-plus-3-line-height").withDefault("36px");b("type-ramp-plus-4-font-size").withDefault("34px");b("type-ramp-plus-4-line-height").withDefault("44px");b("type-ramp-plus-5-font-size").withDefault("46px");b("type-ramp-plus-5-line-height").withDefault("56px");b("type-ramp-plus-6-font-size").withDefault("60px");b("type-ramp-plus-6-line-height").withDefault("72px");w("accent-fill-rest-delta").withDefault(0);const Qa=w("accent-fill-hover-delta").withDefault(4),Za=w("accent-fill-active-delta").withDefault(-5),Ja=w("accent-fill-focus-delta").withDefault(0),Ka=w("accent-foreground-rest-delta").withDefault(0),tl=w("accent-foreground-hover-delta").withDefault(6),el=w("accent-foreground-active-delta").withDefault(-4),il=w("accent-foreground-focus-delta").withDefault(0),se=w("neutral-fill-rest-delta").withDefault(7),ne=w("neutral-fill-hover-delta").withDefault(10),re=w("neutral-fill-active-delta").withDefault(5),qn=w("neutral-fill-focus-delta").withDefault(0),sl=w("neutral-fill-input-rest-delta").withDefault(0),nl=w("neutral-fill-input-hover-delta").withDefault(0),rl=w("neutral-fill-input-active-delta").withDefault(0),ol=w("neutral-fill-input-focus-delta").withDefault(0),al=w("neutral-fill-stealth-rest-delta").withDefault(0),ll=w("neutral-fill-stealth-hover-delta").withDefault(5),cl=w("neutral-fill-stealth-active-delta").withDefault(3),hl=w("neutral-fill-stealth-focus-delta").withDefault(0),dl=w("neutral-fill-strong-rest-delta").withDefault(0),ul=w("neutral-fill-strong-hover-delta").withDefault(8),fl=w("neutral-fill-strong-active-delta").withDefault(-5),gl=w("neutral-fill-strong-focus-delta").withDefault(0),oe=w("neutral-fill-layer-rest-delta").withDefault(3),pl=w("neutral-stroke-rest-delta").withDefault(25),ml=w("neutral-stroke-hover-delta").withDefault(40),bl=w("neutral-stroke-active-delta").withDefault(16),vl=w("neutral-stroke-focus-delta").withDefault(25),yl=w("neutral-stroke-divider-rest-delta").withDefault(8),wl=b("neutral-color").withDefault(Ia),Q=w("neutral-palette").withDefault(i=>Qe.from(wl.getValueFor(i))),xl=b("accent-color").withDefault(Ma),vs=w("accent-palette").withDefault(i=>Qe.from(xl.getValueFor(i))),Sl=w("neutral-layer-card-container-recipe").withDefault({evaluate:i=>Ha(Q.getValueFor(i),ie.getValueFor(i),oe.getValueFor(i))});b("neutral-layer-card-container").withDefault(i=>Sl.getValueFor(i).evaluate(i));const Rl=w("neutral-layer-floating-recipe").withDefault({evaluate:i=>Ua(Q.getValueFor(i),ie.getValueFor(i),oe.getValueFor(i))});b("neutral-layer-floating").withDefault(i=>Rl.getValueFor(i).evaluate(i));const Cl=w("neutral-layer-1-recipe").withDefault({evaluate:i=>Wa(Q.getValueFor(i),ie.getValueFor(i))}),kl=b("neutral-layer-1").withDefault(i=>Cl.getValueFor(i).evaluate(i)),El=w("neutral-layer-2-recipe").withDefault({evaluate:i=>Ga(Q.getValueFor(i),ie.getValueFor(i),oe.getValueFor(i),se.getValueFor(i),ne.getValueFor(i),re.getValueFor(i))});b("neutral-layer-2").withDefault(i=>El.getValueFor(i).evaluate(i));const Tl=w("neutral-layer-3-recipe").withDefault({evaluate:i=>qa(Q.getValueFor(i),ie.getValueFor(i),oe.getValueFor(i),se.getValueFor(i),ne.getValueFor(i),re.getValueFor(i))});b("neutral-layer-3").withDefault(i=>Tl.getValueFor(i).evaluate(i));const $l=w("neutral-layer-4-recipe").withDefault({evaluate:i=>_a(Q.getValueFor(i),ie.getValueFor(i),oe.getValueFor(i),se.getValueFor(i),ne.getValueFor(i),re.getValueFor(i))});b("neutral-layer-4").withDefault(i=>$l.getValueFor(i).evaluate(i));const X=b("fill-color").withDefault(i=>kl.getValueFor(i));var $e;(function(i){i[i.normal=4.5]="normal",i[i.large=7]="large"})($e||($e={}));const li=b({name:"accent-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>Ea(vs.getValueFor(i),Q.getValueFor(i),t||X.getValueFor(i),Qa.getValueFor(i),Za.getValueFor(i),Ja.getValueFor(i),se.getValueFor(i),ne.getValueFor(i),re.getValueFor(i))}),Pt=b("accent-fill-rest").withDefault(i=>li.getValueFor(i).evaluate(i).rest),Kt=b("accent-fill-hover").withDefault(i=>li.getValueFor(i).evaluate(i).hover),te=b("accent-fill-active").withDefault(i=>li.getValueFor(i).evaluate(i).active),_n=b("accent-fill-focus").withDefault(i=>li.getValueFor(i).evaluate(i).focus),Yn=i=>(t,e)=>Da(e||Pt.getValueFor(t),i),ci=w("foreground-on-accent-recipe").withDefault({evaluate:(i,t)=>Yn($e.normal)(i,t)}),Yi=b("foreground-on-accent-rest").withDefault(i=>ci.getValueFor(i).evaluate(i,Pt.getValueFor(i))),Xi=b("foreground-on-accent-hover").withDefault(i=>ci.getValueFor(i).evaluate(i,Kt.getValueFor(i))),Qi=b("foreground-on-accent-active").withDefault(i=>ci.getValueFor(i).evaluate(i,te.getValueFor(i)));b("foreground-on-accent-focus").withDefault(i=>ci.getValueFor(i).evaluate(i,_n.getValueFor(i)));const hi=w("foreground-on-accent-large-recipe").withDefault({evaluate:(i,t)=>Yn($e.large)(i,t)});b("foreground-on-accent-rest-large").withDefault(i=>hi.getValueFor(i).evaluate(i,Pt.getValueFor(i)));b("foreground-on-accent-hover-large").withDefault(i=>hi.getValueFor(i).evaluate(i,Kt.getValueFor(i)));b("foreground-on-accent-active-large").withDefault(i=>hi.getValueFor(i).evaluate(i,te.getValueFor(i)));b("foreground-on-accent-focus-large").withDefault(i=>hi.getValueFor(i).evaluate(i,_n.getValueFor(i)));const Il=i=>(t,e)=>Ta(vs.getValueFor(t),e||X.getValueFor(t),i,Ka.getValueFor(t),tl.getValueFor(t),el.getValueFor(t),il.getValueFor(t)),di=b({name:"accent-foreground-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>Il($e.normal)(i,t)}),Ie=b("accent-foreground-rest").withDefault(i=>di.getValueFor(i).evaluate(i).rest),Zi=b("accent-foreground-hover").withDefault(i=>di.getValueFor(i).evaluate(i).hover),Ji=b("accent-foreground-active").withDefault(i=>di.getValueFor(i).evaluate(i).active);b("accent-foreground-focus").withDefault(i=>di.getValueFor(i).evaluate(i).focus);const ui=b({name:"neutral-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>La(Q.getValueFor(i),t||X.getValueFor(i),se.getValueFor(i),ne.getValueFor(i),re.getValueFor(i),qn.getValueFor(i))}),ys=b("neutral-fill-rest").withDefault(i=>ui.getValueFor(i).evaluate(i).rest),Ml=b("neutral-fill-hover").withDefault(i=>ui.getValueFor(i).evaluate(i).hover),Dl=b("neutral-fill-active").withDefault(i=>ui.getValueFor(i).evaluate(i).active);b("neutral-fill-focus").withDefault(i=>ui.getValueFor(i).evaluate(i).focus);const fi=b({name:"neutral-fill-input-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>Fa(Q.getValueFor(i),t||X.getValueFor(i),sl.getValueFor(i),nl.getValueFor(i),rl.getValueFor(i),ol.getValueFor(i))}),Ll=b("neutral-fill-input-rest").withDefault(i=>fi.getValueFor(i).evaluate(i).rest),Fl=b("neutral-fill-input-hover").withDefault(i=>fi.getValueFor(i).evaluate(i).hover),Pl=b("neutral-fill-input-active").withDefault(i=>fi.getValueFor(i).evaluate(i).active);b("neutral-fill-input-focus").withDefault(i=>fi.getValueFor(i).evaluate(i).focus);const gi=b({name:"neutral-fill-stealth-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>Va(Q.getValueFor(i),t||X.getValueFor(i),al.getValueFor(i),ll.getValueFor(i),cl.getValueFor(i),hl.getValueFor(i),se.getValueFor(i),ne.getValueFor(i),re.getValueFor(i),qn.getValueFor(i))}),Xn=b("neutral-fill-stealth-rest").withDefault(i=>gi.getValueFor(i).evaluate(i).rest),Vl=b("neutral-fill-stealth-hover").withDefault(i=>gi.getValueFor(i).evaluate(i).hover),Al=b("neutral-fill-stealth-active").withDefault(i=>gi.getValueFor(i).evaluate(i).active);b("neutral-fill-stealth-focus").withDefault(i=>gi.getValueFor(i).evaluate(i).focus);const pi=b({name:"neutral-fill-strong-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(i,t)=>Aa(Q.getValueFor(i),t||X.getValueFor(i),dl.getValueFor(i),ul.getValueFor(i),fl.getValueFor(i),gl.getValueFor(i))});b("neutral-fill-strong-rest").withDefault(i=>pi.getValueFor(i).evaluate(i).rest);b("neutral-fill-strong-hover").withDefault(i=>pi.getValueFor(i).evaluate(i).hover);b("neutral-fill-strong-active").withDefault(i=>pi.getValueFor(i).evaluate(i).active);b("neutral-fill-strong-focus").withDefault(i=>pi.getValueFor(i).evaluate(i).focus);const Nl=w("neutral-fill-layer-recipe").withDefault({evaluate:(i,t)=>Pa(Q.getValueFor(i),t||X.getValueFor(i),oe.getValueFor(i))});b("neutral-fill-layer-rest").withDefault(i=>Nl.getValueFor(i).evaluate(i));const Ol=w("focus-stroke-outer-recipe").withDefault({evaluate:i=>Na(Q.getValueFor(i),X.getValueFor(i))}),wt=b("focus-stroke-outer").withDefault(i=>Ol.getValueFor(i).evaluate(i)),Bl=w("focus-stroke-inner-recipe").withDefault({evaluate:i=>Oa(vs.getValueFor(i),X.getValueFor(i),wt.getValueFor(i))}),zl=b("focus-stroke-inner").withDefault(i=>Bl.getValueFor(i).evaluate(i)),jl=w("neutral-foreground-hint-recipe").withDefault({evaluate:i=>za(Q.getValueFor(i),X.getValueFor(i))});b("neutral-foreground-hint").withDefault(i=>jl.getValueFor(i).evaluate(i));const Hl=w("neutral-foreground-recipe").withDefault({evaluate:i=>Ba(Q.getValueFor(i),X.getValueFor(i))}),Dt=b("neutral-foreground-rest").withDefault(i=>Hl.getValueFor(i).evaluate(i)),mi=b({name:"neutral-stroke-recipe",cssCustomPropertyName:null}).withDefault({evaluate:i=>Ya(Q.getValueFor(i),X.getValueFor(i),pl.getValueFor(i),ml.getValueFor(i),bl.getValueFor(i),vl.getValueFor(i))}),ws=b("neutral-stroke-rest").withDefault(i=>mi.getValueFor(i).evaluate(i).rest),Qn=b("neutral-stroke-hover").withDefault(i=>mi.getValueFor(i).evaluate(i).hover),Ul=b("neutral-stroke-active").withDefault(i=>mi.getValueFor(i).evaluate(i).active);b("neutral-stroke-focus").withDefault(i=>mi.getValueFor(i).evaluate(i).focus);const Wl=w("neutral-stroke-divider-recipe").withDefault({evaluate:(i,t)=>Xa(Q.getValueFor(i),t||X.getValueFor(i),yl.getValueFor(i))});b("neutral-stroke-divider-rest").withDefault(i=>Wl.getValueFor(i).evaluate(i));ii.create({name:"height-number",cssCustomPropertyName:null}).withDefault(i=>(Gn.getValueFor(i)+ps.getValueFor(i))*H.getValueFor(i));const Lt=Or`(${Gn} + ${ps}) * ${H}`,Gl="0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(.11 * (2 - var(--background-luminance, 1))))",ql="0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(.13 * (2 - var(--background-luminance, 1))))",_l=`box-shadow: ${Gl}, ${ql};`,Yl=R`
    ${De("inline-flex")} :host {
        font-family: ${oi};
        outline: none;
        font-size: ${ms};
        line-height: ${bs};
        height: calc(${Lt} * 1px);
        min-width: calc(${Lt} * 1px);
        background-color: ${ys};
        color: ${Dt};
        border-radius: calc(${Ht} * 1px);
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
        padding: 0 calc((10 + (${H} * 2 * ${ps})) * 1px);
        white-space: nowrap;
        outline: none;
        text-decoration: none;
        border: calc(${K} * 1px) solid transparent;
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
        background-color: ${Ml};
    }

    :host(:active) {
        background-color: ${Dl};
    }

    .control:${L} {
        border-color: ${wt};
        box-shadow: 0 0 0 calc((${Rt} - ${K}) * 1px) ${wt} inset;
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
`.withBehaviors(it(R`
            :host .control {
              background-color: ${p.ButtonFace};
              border-color: ${p.ButtonText};
              color: ${p.ButtonText};
              fill: currentColor;
            }

            :host(:hover) .control {
              forced-color-adjust: none;
              background-color: ${p.Highlight};
              color: ${p.HighlightText};
            }

            .control:${L} {
              forced-color-adjust: none;
              background-color: ${p.Highlight};
              border-color: ${p.ButtonText};
              box-shadow: 0 0 0 calc((${Rt} - ${K}) * 1px) ${p.ButtonText} inset;
              color: ${p.HighlightText};
            }

            .control:hover,
            :host([appearance="outline"]) .control:hover {
              border-color: ${p.ButtonText};
            }

            :host([href]) .control {
                border-color: ${p.LinkText};
                color: ${p.LinkText};
            }

            :host([href]) .control:hover,
            :host([href]) .control:${L}{
              forced-color-adjust: none;
              background: ${p.ButtonFace};
              border-color: ${p.LinkText};
              box-shadow: 0 0 0 1px ${p.LinkText} inset;
              color: ${p.LinkText};
              fill: currentColor;
            }
        `)),Xl=R`
    :host([appearance="accent"]) {
        background: ${Pt};
        color: ${Yi};
    }

    :host([appearance="accent"]:hover) {
        background: ${Kt};
        color: ${Xi};
    }

    :host([appearance="accent"]:active) .control:active {
        background: ${te};
        color: ${Qi};
    }

    :host([appearance="accent"]) .control:${L} {
        box-shadow: 0 0 0 calc((${Rt} - ${K}) * 1px) ${wt} inset,
            0 0 0 calc((${Rt} + ${K}) * 1px) ${zl} inset;
    }
`.withBehaviors(it(R`
            :host([appearance="accent"]) .control {
                forced-color-adjust: none;
                background: ${p.Highlight};
                color: ${p.HighlightText};
            }

            :host([appearance="accent"]) .control:hover,
            :host([appearance="accent"]:active) .control:active {
                background: ${p.HighlightText};
                border-color: ${p.Highlight};
                color: ${p.Highlight};
            }

            :host([appearance="accent"]) .control:${L} {
                border-color: ${p.Highlight};
                box-shadow: 0 0 0 calc(${Rt} * 1px) ${p.HighlightText} inset;
            }

            :host([appearance="accent"][href]) .control{
                background: ${p.LinkText};
                color: ${p.HighlightText};
            }

            :host([appearance="accent"][href]) .control:hover {
                background: ${p.ButtonFace};
                border-color: ${p.LinkText};
                box-shadow: none;
                color: ${p.LinkText};
                fill: currentColor;
            }

            :host([appearance="accent"][href]) .control:${L} {
                border-color: ${p.LinkText};
                box-shadow: 0 0 0 calc(${Rt} * 1px) ${p.HighlightText} inset;
            }
        `));R`
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
        color: ${Ie};
        border-bottom: calc(${K} * 1px) solid ${Ie};
    }

    :host([appearance="hypertext"]:hover),
    :host([appearance="hypertext"]) .control:hover {
        background: transparent;
        border-bottom-color: ${Zi};
    }

    :host([appearance="hypertext"]:active),
    :host([appearance="hypertext"]) .control:active {
        background: transparent;
        border-bottom-color: ${Ji};
    }

    :host([appearance="hypertext"]) .control:${L} {
        border-bottom: calc(${Rt} * 1px) solid ${wt};
        margin-bottom: calc(calc(${K} - ${Rt}) * 1px);
    }
`.withBehaviors(it(R`
            :host([appearance="hypertext"]:hover) {
                background-color: ${p.ButtonFace};
                color: ${p.ButtonText};
            }
            :host([appearance="hypertext"][href]) .control:hover,
            :host([appearance="hypertext"][href]) .control:active,
            :host([appearance="hypertext"][href]) .control:${L} {
                color: ${p.LinkText};
                border-bottom-color: ${p.LinkText};
                box-shadow: none;
            }
        `));const Ql=R`
    :host([appearance="lightweight"]) {
        background: transparent;
        color: ${Ie};
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
        color: ${Zi};
    }

    :host([appearance="lightweight"]:active) {
        background: transparent;
        color: ${Ji};
    }

    :host([appearance="lightweight"]) .content {
        position: relative;
    }

    :host([appearance="lightweight"]) .content::before {
        content: "";
        display: block;
        height: calc(${K} * 1px);
        position: absolute;
        top: calc(1em + 4px);
        width: 100%;
    }

    :host([appearance="lightweight"]:hover) .content::before {
        background: ${Zi};
    }

    :host([appearance="lightweight"]:active) .content::before {
        background: ${Ji};
    }

    :host([appearance="lightweight"]) .control:${L} .content::before {
        background: ${Dt};
        height: calc(${Rt} * 1px);
    }
`.withBehaviors(it(R`
            :host([appearance="lightweight"]) .control:hover,
            :host([appearance="lightweight"]) .control:${L} {
                forced-color-adjust: none;
                background: ${p.ButtonFace};
                color: ${p.Highlight};
            }
            :host([appearance="lightweight"]) .control:hover .content::before,
            :host([appearance="lightweight"]) .control:${L} .content::before {
                background: ${p.Highlight};
            }

            :host([appearance="lightweight"][href]) .control:hover,
            :host([appearance="lightweight"][href]) .control:${L} {
                background: ${p.ButtonFace};
                box-shadow: none;
                color: ${p.LinkText};
            }

            :host([appearance="lightweight"][href]) .control:hover .content::before,
            :host([appearance="lightweight"][href]) .control:${L} .content::before {
                background: ${p.LinkText};
            }
        `)),Zl=R`
    :host([appearance="outline"]) {
        background: transparent;
        border-color: ${Pt};
    }

    :host([appearance="outline"]:hover) {
        border-color: ${Kt};
    }

    :host([appearance="outline"]:active) {
        border-color: ${te};
    }

    :host([appearance="outline"]) .control {
        border-color: inherit;
    }

    :host([appearance="outline"]) .control:${L} {
        box-shadow: 0 0 0 calc((${Rt} - ${K}) * 1px) ${wt} inset;
        border-color: ${wt};
    }
`.withBehaviors(it(R`
            :host([appearance="outline"]) .control {
                border-color: ${p.ButtonText};
            }
            :host([appearance="outline"]) .control:${L} {
              forced-color-adjust: none;
              background-color: ${p.Highlight};
              border-color: ${p.ButtonText};
              box-shadow: 0 0 0 calc((${Rt} - ${K}) * 1px) ${p.ButtonText} inset;
              color: ${p.HighlightText};
              fill: currentColor;
            }
            :host([appearance="outline"][href]) .control {
                background: ${p.ButtonFace};
                border-color: ${p.LinkText};
                color: ${p.LinkText};
                fill: currentColor;
            }
            :host([appearance="outline"][href]) .control:hover,
            :host([appearance="outline"][href]) .control:${L} {
              forced-color-adjust: none;
              border-color: ${p.LinkText};
              box-shadow: 0 0 0 1px ${p.LinkText} inset;
            }
        `)),Jl=R`
    :host([appearance="stealth"]) {
        background: ${Xn};
    }

    :host([appearance="stealth"]:hover) {
        background: ${Vl};
    }

    :host([appearance="stealth"]:active) {
        background: ${Al};
    }
`.withBehaviors(it(R`
            :host([appearance="stealth"]),
            :host([appearance="stealth"]) .control {
                forced-color-adjust: none;
                background: ${p.ButtonFace};
                border-color: transparent;
                color: ${p.ButtonText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:hover) .control {
                background: ${p.Highlight};
                border-color: ${p.Highlight};
                color: ${p.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:${L}) .control {
                background: ${p.Highlight};
                box-shadow: 0 0 0 1px ${p.Highlight};
                color: ${p.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]) .control {
                color: ${p.LinkText};
            }

            :host([appearance="stealth"][href]:hover) .control,
            :host([appearance="stealth"][href]:${L}) .control {
                background: ${p.LinkText};
                border-color: ${p.LinkText};
                color: ${p.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]:${L}) .control {
                forced-color-adjust: none;
                box-shadow: 0 0 0 1px ${p.LinkText};
            }
        `));class Kl{constructor(t,e){this.cache=new WeakMap,this.ltr=t,this.rtl=e}bind(t){this.attach(t)}unbind(t){const e=this.cache.get(t);e&&Fi.unsubscribe(e)}attach(t){const e=this.cache.get(t)||new tc(this.ltr,this.rtl,t),s=Fi.getValueFor(t);Fi.subscribe(e),e.attach(s),this.cache.set(t,e)}}class tc{constructor(t,e,s){this.ltr=t,this.rtl=e,this.source=s,this.attached=null}handleChange({target:t,token:e}){this.attach(e.getValueFor(t))}attach(t){this.attached!==this[t]&&(this.attached!==null&&this.source.$fastController.removeStyles(this.attached),this.attached=this[t],this.attached!==null&&this.source.$fastController.addStyles(this.attached))}}function Oe(i,t){return new ra("appearance",i,t)}const ec=(i,t)=>R`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
            opacity: ${ai};
            background-color: ${ys};
            cursor: ${Ye};
        }

        ${Yl}
    `.withBehaviors(it(R`
                :host([disabled]),
                :host([disabled]) .control,
                :host([disabled]:hover),
                :host([disabled]:active) {
                    forced-color-adjust: none;
                    background-color: ${p.ButtonFace};
                    border-color: ${p.GrayText};
                    color: ${p.GrayText};
                    cursor: ${Ye};
                    opacity: 1;
                }
            `),Oe("accent",R`
                :host([appearance="accent"][disabled]),
                :host([appearance="accent"][disabled]:hover),
                :host([appearance="accent"][disabled]:active) {
                    background: ${Pt};
                }

                ${Xl}
            `.withBehaviors(it(R`
                        :host([appearance="accent"][disabled]) .control,
                        :host([appearance="accent"][disabled]) .control:hover {
                            background: ${p.ButtonFace};
                            border-color: ${p.GrayText};
                            color: ${p.GrayText};
                        }
                    `))),Oe("lightweight",R`
                :host([appearance="lightweight"][disabled]:hover),
                :host([appearance="lightweight"][disabled]:active) {
                    background-color: transparent;
                    color: ${Ie};
                }

                :host([appearance="lightweight"][disabled]) .content::before,
                :host([appearance="lightweight"][disabled]:hover) .content::before,
                :host([appearance="lightweight"][disabled]:active) .content::before {
                    background: transparent;
                }

                ${Ql}
            `.withBehaviors(it(R`
                        :host([appearance="lightweight"].disabled) .control {
                            forced-color-adjust: none;
                            color: ${p.GrayText};
                        }

                        :host([appearance="lightweight"].disabled)
                            .control:hover
                            .content::before {
                            background: none;
                        }
                    `))),Oe("outline",R`
                :host([appearance="outline"][disabled]),
                :host([appearance="outline"][disabled]:hover),
                :host([appearance="outline"][disabled]:active) {
                    background: transparent;
                    border-color: ${Pt};
                }

                ${Zl}
            `.withBehaviors(it(R`
                        :host([appearance="outline"][disabled]) .control {
                            border-color: ${p.GrayText};
                        }
                    `))),Oe("stealth",R`
                :host([appearance="stealth"][disabled]),
                :host([appearance="stealth"][disabled]:hover),
                :host([appearance="stealth"][disabled]:active) {
                    background: ${Xn};
                }

                ${Jl}
            `.withBehaviors(it(R`
                        :host([appearance="stealth"][disabled]) {
                            background: ${p.ButtonFace};
                        }

                        :host([appearance="stealth"][disabled]) .control {
                            background: ${p.ButtonFace};
                            border-color: transparent;
                            color: ${p.GrayText};
                        }
                    `))));class Zn extends xt{constructor(){super(...arguments),this.appearance="neutral"}defaultSlottedContentChanged(t,e){const s=this.defaultSlottedContent.filter(n=>n.nodeType===Node.ELEMENT_NODE);s.length===1&&s[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}g([v],Zn.prototype,"appearance",void 0);const ic=Zn.compose({baseName:"button",baseClass:xt,template:bo,styles:ec,shadowOptions:{delegatesFocus:!0}}),sc=(i,t)=>R`
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
        ${_l}
        margin-top: auto;
        margin-bottom: auto;
        width: var(--dialog-width);
        height: var(--dialog-height);
        background-color: ${X};
        z-index: 1;
        border-radius: calc(${Ht} * 1px);
        border: calc(${K} * 1px) solid transparent;
    }
`,nc=yt.compose({baseName:"dialog",template:Po,styles:sc}),rc=(i,t)=>R`
    ${De("flex")} :host {
        align-items: flex-start;
        margin: calc(${H} * 1px) 0;
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
`,oc=Ot.compose({baseName:"radio-group",template:Yo,styles:rc}),ac=(i,t)=>R`
        ${De("inline-flex")} :host {
            --input-size: calc((${Lt} / 2) + ${H});
            align-items: center;
            outline: none;
            margin: calc(${H} * 1px) 0;
            /* Chromium likes to select label text or the default slot when
                the radio is clicked. Maybe there is a better solution here? */
            user-select: none;
            position: relative;
            flex-direction: row;
            transition: all 0.2s ease-in-out;
        }

        .control {
            position: relative;
            width: calc((${Lt} / 2 + ${H}) * 1px);
            height: calc((${Lt} / 2 + ${H}) * 1px);
            box-sizing: border-box;
            border-radius: 999px;
            border: calc(${K} * 1px) solid ${ws};
            background: ${Ll};
            outline: none;
            cursor: pointer;
        }

        .label {
            font-family: ${oi};
            color: ${Dt};
            padding-inline-start: calc(${H} * 2px + 2px);
            margin-inline-end: calc(${H} * 2px + 2px);
            cursor: pointer;
            font-size: ${ms};
            line-height: ${bs};
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
            background: ${Yi};
            fill: ${Yi};
            opacity: 0;
            pointer-events: none;
        }

        :host(:not([disabled])) .control:hover{
            background: ${Fl};
            border-color: ${Qn};
        }

        :host(:not([disabled])) .control:active {
            background: ${Pl};
            border-color: ${Ul};
        }

        :host(:${L}) .control {
            box-shadow: 0 0 0 2px ${X}, 0 0 0 4px ${wt};
        }

        :host([aria-checked="true"]) .control {
            background: ${Pt};
            border: calc(${K} * 1px) solid ${Pt};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover {
            background: ${Kt};
            border: calc(${K} * 1px) solid ${Kt};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
            background: ${Xi};
            fill: ${Xi};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active {
            background: ${te};
            border: calc(${K} * 1px) solid ${te};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
            background: ${Qi};
            fill: ${Qi};
        }

        :host([aria-checked="true"]:${L}:not([disabled])) .control {
            box-shadow: 0 0 0 2px ${X}, 0 0 0 4px ${wt};
        }

        :host([disabled]) .label,
        :host([readonly]) .label,
        :host([readonly]) .control,
        :host([disabled]) .control {
            cursor: ${Ye};
        }

        :host([aria-checked="true"]) .checked-indicator {
            opacity: 1;
        }

        :host([disabled]) {
            opacity: ${ai};
        }
    `.withBehaviors(it(R`
            .control,
            :host([aria-checked="true"]:not([disabled])) .control {
                forced-color-adjust: none;
                border-color: ${p.FieldText};
                background: ${p.Field};
            }
            :host(:not([disabled])) .control:hover {
                border-color: ${p.Highlight};
                background: ${p.Field};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover,
            :host([aria-checked="true"]:not([disabled])) .control:active {
                border-color: ${p.Highlight};
                background: ${p.Highlight};
            }
            :host([aria-checked="true"]) .checked-indicator {
                background: ${p.Highlight};
                fill: ${p.Highlight};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator,
            :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
                background: ${p.HighlightText};
                fill: ${p.HighlightText};
            }
            :host(:${L}) .control {
                border-color: ${p.Highlight};
                box-shadow: 0 0 0 2px ${p.Field}, 0 0 0 4px ${p.FieldText};
            }
            :host([aria-checked="true"]:${L}:not([disabled])) .control {
                border-color: ${p.Highlight};
                box-shadow: 0 0 0 2px ${p.Field}, 0 0 0 4px ${p.FieldText};
            }
            :host([disabled]) {
                forced-color-adjust: none;
                opacity: 1;
            }
            :host([disabled]) .label {
                color: ${p.GrayText};
            }
            :host([disabled]) .control,
            :host([aria-checked="true"][disabled]) .control:hover, .control:active {
                background: ${p.Field};
                border-color: ${p.GrayText};
            }
            :host([disabled]) .checked-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .checked-indicator {
                fill: ${p.GrayText};
                background: ${p.GrayText};
            }
        `)),lc=si.compose({baseName:"radio",template:Xo,styles:ac,checkedIndicator:`
        <div part="checked-indicator" class="checked-indicator"></div>
    `}),dn=R`
    :host {
        align-self: start;
        grid-row: 2;
        margin-top: -2px;
        height: calc((${Lt} / 2 + ${H}) * 1px);
        width: auto;
    }
    .container {
        grid-template-rows: auto auto;
        grid-template-columns: 0;
    }
    .label {
        margin: 2px 0;
    }
`,un=R`
    :host {
        justify-self: start;
        grid-column: 2;
        margin-left: 2px;
        height: auto;
        width: calc((${Lt} / 2 + ${H}) * 1px);
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
        margin-left: calc((${H} / 2) * 3px);
        align-self: center;
    }
`,cc=(i,t)=>R`
        ${De("block")} :host {
            font-family: ${oi};
            color: ${Dt};
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
            width: calc((${H} / 4) * 1px);
            height: calc(${Lt} * 0.25 * 1px);
            background: ${ws};
            justify-self: center;
        }
        :host(.disabled) {
            opacity: ${ai};
        }
    `.withBehaviors(it(R`
                .mark {
                    forced-color-adjust: none;
                    background: ${p.FieldText};
                }
                :host(.disabled) {
                    forced-color-adjust: none;
                    opacity: 1;
                }
                :host(.disabled) .label {
                    color: ${p.GrayText};
                }
                :host(.disabled) .mark {
                    background: ${p.GrayText};
                }
            `));class hc extends Tt{sliderOrientationChanged(){this.sliderOrientation===Z.horizontal?(this.$fastController.addStyles(dn),this.$fastController.removeStyles(un)):(this.$fastController.addStyles(un),this.$fastController.removeStyles(dn))}}const dc=hc.compose({baseName:"slider-label",baseClass:Tt,template:Jo,styles:cc}),uc=R`
    .track-start {
        left: 0;
    }
`,fc=R`
    .track-start {
        right: 0;
    }
`,gc=(i,t)=>R`
        :host([hidden]) {
            display: none;
        }

        ${De("inline-grid")} :host {
            --thumb-size: calc(${Lt} * 0.5 - ${H});
            --thumb-translate: calc(var(--thumb-size) * -0.5 + var(--track-width) / 2);
            --track-overhang: calc((${H} / 2) * -1);
            --track-width: ${H};
            --fast-slider-height: calc(var(--thumb-size) * 10);
            align-items: center;
            width: 100%;
            margin: calc(${H} * 1px) 0;
            user-select: none;
            box-sizing: border-box;
            border-radius: calc(${Ht} * 1px);
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

        :host(:${L}) .thumb-cursor {
            box-shadow: 0 0 0 2px ${X}, 0 0 0 4px ${wt};
        }

        .thumb-container {
            position: absolute;
            height: calc(var(--thumb-size) * 1px);
            width: calc(var(--thumb-size) * 1px);
            transition: all 0.2s ease;
            color: ${Dt};
            fill: currentcolor;
        }
        .thumb-cursor {
            border: none;
            width: calc(var(--thumb-size) * 1px);
            height: calc(var(--thumb-size) * 1px);
            background: ${Dt};
            border-radius: calc(${Ht} * 1px);
        }
        .thumb-cursor:hover {
            background: ${Dt};
            border-color: ${Qn};
        }
        .thumb-cursor:active {
            background: ${Dt};
        }
        .track-start {
            background: ${Ie};
            position: absolute;
            height: 100%;
            left: 0;
            border-radius: calc(${Ht} * 1px);
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
            background: ${ws};
            position: absolute;
            border-radius: calc(${Ht} * 1px);
        }
        :host([orientation="vertical"]) {
            height: calc(var(--fast-slider-height) * 1px);
            min-height: calc(var(--thumb-size) * 1px);
            min-width: calc(${H} * 20px);
        }
        :host([orientation="vertical"]) .track-start {
            height: auto;
            width: 100%;
            top: 0;
        }
        :host([disabled]), :host([readonly]) {
            cursor: ${Ye};
        }
        :host([disabled]) {
            opacity: ${ai};
        }
    `.withBehaviors(new Kl(uc,fc),it(R`
                .thumb-cursor {
                    forced-color-adjust: none;
                    border-color: ${p.FieldText};
                    background: ${p.FieldText};
                }
                .thumb-cursor:hover,
                .thumb-cursor:active {
                    background: ${p.Highlight};
                }
                .track {
                    forced-color-adjust: none;
                    background: ${p.FieldText};
                }
                :host(:${L}) .thumb-cursor {
                    border-color: ${p.Highlight};
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .track,
                :host([disabled]) .thumb-cursor {
                    forced-color-adjust: none;
                    background: ${p.GrayText};
                }

                :host(:${L}) .thumb-cursor {
                    background: ${p.Highlight};
                    border-color: ${p.Highlight};
                    box-shadow: 0 0 0 2px ${p.Field}, 0 0 0 4px ${p.FieldText};
                }
            `)),pc=tt.compose({baseName:"slider",template:Ko,styles:gc,thumb:`
        <div class="thumb-cursor"></div>
    `}),mc=(i,t)=>{const e=i.tagFor(I);return R`
            :host {
                contain: size;
                overflow: visible;
                height: 0;
                width: 0;
            }

            .tooltip {
                box-sizing: border-box;
                border-radius: calc(${Ht} * 1px);
                border: calc(${K} * 1px) solid ${wt};
                box-shadow: 0 0 0 1px ${wt} inset;
                background: ${ys};
                color: ${Dt};
                padding: 4px;
                height: fit-content;
                width: fit-content;
                font-family: ${oi};
                font-size: ${ms};
                line-height: ${bs};
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

        `.withBehaviors(it(R`
                :host([disabled]) {
                    opacity: 1;
                }
            `))},bc=z.compose({baseName:"tooltip",template:sa,styles:mc});function vc(i){return Nn.getOrCreate(i).withPrefix("fast")}const xs=document.getElementById("raceTrackTitle"),Ss=document.getElementById("graphTitle"),yc=document.getElementById("infoDialogCloseButton"),Jn=document.getElementById("raceTrack"),Kn=document.getElementById("graphCountry"),tr=document.getElementById("raceTrackDialog"),er=document.getElementById("graphDialog"),Rs=document.getElementById("infoDialog");function ir(i){xs.className="enabled",Ss.className="disabled",Jn.style.display="block",Kn.style.display="none",tr.style.display="block",er.style.display="none",or("raceTrack"),i&&Rs.show()}function sr(i){xs.className="disabled",Ss.className="enabled",Jn.style.display="none",Kn.style.display="block",tr.style.display="none",er.style.display="block",or("graph"),i&&Rs.show()}function wc(){Rs.hide()}xs.addEventListener("click",()=>ir(!0));Ss.addEventListener("click",()=>sr(!0));yc.addEventListener("click",wc);const nr=new Map;function rr(i,t,e){nr.set(i,{startFunc:t,stopFunc:e})}function or(i){const t=nr.get(i);t&&t.startFunc()}var ft=(i=>(i[i.radius=0]="radius",i[i.color=1]="color",i[i.gray=2]="gray",i[i.red=3]="red",i[i.dot=4]="dot",i))(ft||{}),D=(i=>(i[i.manufacturingShare=0]="manufacturingShare",i[i.income=1]="income",i[i.priceIndex=2]="priceIndex",i[i.nominalWage=3]="nominalWage",i[i.realWage=4]="realWage",i))(D||{});const fe=i=>i.target.value,ge=i=>{switch(i){case"radius":return ft.radius;case"color":return ft.color;case"gray":return ft.gray;case"red":return ft.red;case"dot":return ft.dot;default:return}};function pe(i,t){for(const e of[D.manufacturingShare,D.income,D.priceIndex,D.nominalWage,D.realWage])if(i.get(e)==t)return e}class xc{model;manufacturingShareVisualizer;incomeVisualizer;priceIndexVisualizer;nominalWageVisualizer;realWageVisualizer;incomeLabel;priceIndexLabel;nominalWageLabel;realWageLabel;constructor(){this.manufacturingShareVisualizer=document.getElementById("mshareVisualizer"),this.incomeVisualizer=document.getElementById("incomeVisualizer"),this.priceIndexVisualizer=document.getElementById("priceIndexVisualizer"),this.nominalWageVisualizer=document.getElementById("nominalWageVisualizer"),this.realWageVisualizer=document.getElementById("realWageVisualizer"),this.incomeLabel=document.getElementById("incomeLabel"),this.priceIndexLabel=document.getElementById("priceIndexLabel"),this.nominalWageLabel=document.getElementById("nominalWageLabel"),this.realWageLabel=document.getElementById("realWageLabel"),this.manufacturingShareVisualizer.value="radius",this.incomeVisualizer.value="gray",this.priceIndexVisualizer.value="",this.nominalWageVisualizer.value="",this.realWageVisualizer.value="",this.manufacturingShareVisualizer.addEventListener("change",t=>{const e=fe(t);this.changeManufacturingShareVisualizer(e)}),this.incomeVisualizer.addEventListener("change",t=>{const e=fe(t);this.changeIncomeVisualizer(e)}),this.priceIndexVisualizer.addEventListener("change",t=>{const e=fe(t);this.changePriceIndexVisualizer(e)}),this.nominalWageVisualizer.addEventListener("change",t=>{const e=fe(t);this.changeNominalWageVisualizer(e)}),this.realWageVisualizer.addEventListener("change",t=>{const e=fe(t);this.changeRealWageVisualizer(e)})}updateTextDecoration(t,e){e!==D.manufacturingShare&&(this.manufacturingShareVisualizer.style.textDecoration=this.incomeVisualizer.value==t?"line-through":""),e!==D.income&&(this.incomeVisualizer.style.textDecoration=this.incomeVisualizer.value==t?"line-through":""),e!==D.priceIndex&&(this.priceIndexLabel.style.textDecoration=this.priceIndexVisualizer.value==t?"line-through":""),e!==D.nominalWage&&(this.nominalWageLabel.style.textDecoration=this.nominalWageVisualizer.value==t?"line-through":""),e!==D.realWage&&(this.realWageLabel.style.textDecoration=this.realWageVisualizer.value==t?"line-through":"")}changeManufacturingShareVisualizer(t){const e=ge(t);this.model.bindings.set(D.manufacturingShare,e),this.updateTextDecoration(t,D.manufacturingShare)}changeIncomeVisualizer(t){const e=ge(t);this.model.bindings.set(D.income,e),this.updateTextDecoration(t,D.income)}changePriceIndexVisualizer(t){const e=ge(t);this.model.bindings.set(D.priceIndex,e),this.updateTextDecoration(t,D.priceIndex)}changeNominalWageVisualizer(t){const e=ge(t);this.model.bindings.set(D.nominalWage,e),this.updateTextDecoration(t,D.nominalWage)}changeRealWageVisualizer(t){const e=ge(t);this.model.bindings.set(D.realWage,e),this.updateTextDecoration(t,D.realWage)}setModel(t){this.model=t,t.bindings.set(D.manufacturingShare,ft.radius),t.bindings.set(D.income,ft.gray),t.bindings.set(D.priceIndex,void 0),t.bindings.set(D.nominalWage,void 0),t.bindings.set(D.realWage,void 0)}}var bt=(i=>(i[i.passThrough=0]="passThrough",i[i.multiply100=1]="multiply100",i[i.priceIndex=2]="priceIndex",i[i.ratioToMax=3]="ratioToMax",i[i.multiply100aroundOne=4]="multiply100aroundOne",i[i.multiply1000aroundOne=5]="multiply1000aroundOne",i))(bt||{});function Sc(i){return[{mapper:t=>t.manufacturingShare,type:bt.ratioToMax},{mapper:t=>t.income,type:bt.multiply100},{mapper:t=>t.priceIndex,type:bt.multiply100aroundOne},{mapper:t=>t.nominalWage,type:bt.multiply1000aroundOne},{mapper:t=>t.realWage,type:bt.multiply1000aroundOne}]}function ar(i,t,e){if(i.focusedRegionIds.length>0){t.save();const s=-80,n=-60,r=i.country.regions[i.focusedRegionIds[0]];if(!r)return;t.fillStyle="black",["Region #"+r.id," Share of manufacturing = "+r.manufacturingShare.toFixed(4)," Share of agriculture = "+r.agricultureShare.toFixed(4)," Income = "+r.income.toFixed(4)," Price index = "+r.priceIndex.toFixed(4)," Nominal wage = "+r.nominalWage.toFixed(4)," Real wage = "+r.realWage.toFixed(4)].forEach((o,a)=>{const l=new DOMPoint(e.x+s,e.y+n+a*15);t.fillText(o,l.x,l.y)}),t.restore()}}var T=(i=>(i.SELECTED="selected",i.FOCUSED="focused",i))(T||{});class Rc{canvas;model;diameter=0;mappers;constructor(){this.canvas=document.getElementById("raceTrackCanvas"),this.canvas.addEventListener("mousemove",t=>this.onMouseMove(t)),this.canvas.addEventListener("mouseenter",t=>this.onMouseMove(t)),this.canvas.addEventListener("mouseleave",t=>this.onMouseMove(t)),this.canvas.addEventListener("mouseover",t=>this.onMouseMove(t))}setModel(t){this.model=t,this.mappers=Sc()}onMouseMove(t){if(!this.canvas||!this.model)return;const e=this.canvas.getBoundingClientRect(),s=this.canvas.width/e.width,n=this.canvas.height/e.height,r=(t.clientX-e.left)*s,o=(t.clientY-e.top)*n,a=new DOMPoint((this.canvas.width-this.diameter)/2+this.diameter/2,(this.canvas.height-this.diameter)/2+this.diameter/2),l=r-a.x,c=o-a.y,h=Math.sqrt(l*l+c*c);if(h<this.diameter/2-30||this.diameter/2+30<h){this.model.notifyRegionSelect("raceTrackView",this.model.focusedRegionIds,T.FOCUSED,!1);return}const u=((f,m,y)=>{const S=Math.atan2(m,f),E=2*Math.PI/y,P=(S+2*Math.PI+E/2)%(2*Math.PI);return Math.floor(P/E)})(l,c,this.model.country.regions.length);this.model.notifyRegionSelect("raceTrackView",this.model.focusedRegionIds,T.FOCUSED,!1),this.model.notifyRegionSelect("raceTrackView",[u],T.FOCUSED,!0)}draw(){if(!this.model||!this.mappers)throw new Error;const t=14,e=.5,s=this.model.country.regions.length;console.log("draw:",this.model.country.numRegions,this.model.country.regions.length);const n=this.canvas.getContext("2d");if(!n)return;n.clearRect(0,0,this.canvas.width,this.canvas.height);const r=Math.min(this.canvas.width,this.canvas.height)-80;this.diameter=r;const o=r/2,a=new DOMPoint((this.canvas.width-r)/2+o,(this.canvas.height-r)/2+o),l=this.mappers.map(y=>this.model.country.regions.map(y.mapper).reduce((S,E)=>E>S?E:S,0)),c=(y,S,E,P)=>{const nt=y.mapper(E);switch(S){case bt.passThrough:return nt;case bt.multiply100:return nt*100;case bt.priceIndex:return Math.max(0,nt-1);case bt.ratioToMax:return nt/P;case bt.multiply1000aroundOne:return(nt-1)*1e3;case bt.multiply100aroundOne:return(nt-1)*100;default:return 0}},h=this.model.country.regions.map(y=>this.mappers.map((S,E)=>c(S,S.type,y,l[E]))),d=2*Math.PI/s;this.drawBaseCircle(n,a,o),this.drawVertexCitiesAndLabels(s,d,n,a,o,this.model,t,e,h);const u=pe(this.model.bindings,ft.gray),f=pe(this.model.bindings,ft.red),m=pe(this.model.bindings,ft.dot);this.drawPolygon(n,s,d,o,a,u,h,"rgb(0,0,0,0.3)"),this.drawPolygon(n,s,d,o,a,f,h,"rgb(255,0,0,0.5)"),n.setLineDash([4,8]),this.drawPolygon(n,s,d,o,a,m,h,"rgb(255,0,0,0.5)"),n.setLineDash([]),ar(this.model,n,a)}drawCircle(t,e,s,n,r,o){t.strokeStyle="",o&&(t.beginPath(),t.fillStyle="rgb(255, 255, 0, 0.5)",t.arc(e,s,40,0,2*Math.PI),t.fill(),t.closePath()),t.beginPath(),t.fillStyle=`rgb(255, 0, 0, ${r})`,t.arc(e,s,Math.max(0,n),0,2*Math.PI),t.fill(),t.closePath()}drawVertexRegion(t,e,s,n,r,o,a,l,c,h){const d=e.x+s*Math.cos(n),u=e.y+s*Math.sin(n),f=r!=null?a*c[r]:a,m=o!=null?c[o]:l;(r!=null||o!=null)&&this.drawCircle(t,d,u,f,m,h)}drawRegionLabel(t,e,s,n,r){(n<21||n<101&&r%5==0||101<n&&r%50==0)&&(t.fillStyle="rgb(5, 5, 5, .5)",t.fillText(`${r}`,e,s+3))}drawVertexCitiesAndLabels(t,e,s,n,r,o,a,l,c){const h=pe(o.bindings,ft.radius),d=pe(o.bindings,ft.color);for(let u=0;u<t;u++){const f=u*e;this.drawVertexRegion(s,n,r,f,h,d,a,l,c[u],o.focusedRegionIds.includes(u));const m=30,S=n.x+(r+m)*Math.cos(f)-7,E=n.y+(r+m)*Math.sin(f);this.drawRegionLabel(s,S,E,t,u)}}drawBaseCircle(t,e,s){if(!this.model)return;const n=this.model.focusedRegionIds,r=2*Math.PI/this.model.country.regions.length;if(n!=null&&n.length==2&&0<=n[0]&&0<=n[1]){const o=n[0]<n[1]?[n[0],n[1]]:[n[1],n[0]];if(this.model.focusEventSource!="adjacencyMatrix"||this.model.focusEventSource=="adjacencyMatrix"&&o[1]-o[0]==1||o[1]-o[0]==this.model.country.regions.length-1)if(o[1]-o[0]<this.model.country.regions.length/2){t.strokeStyle="rgb(0, 0, 0, 0.1)",t.beginPath(),t.lineWidth=1,t.arc(e.x,e.y,s,0,r*o[0]),t.stroke(),t.beginPath(),t.strokeStyle="rgb(255, 255, 0)",t.lineWidth=15,t.arc(e.x,e.y,s,r*o[0],r*o[1]),t.stroke(),t.beginPath(),t.strokeStyle="rgb(0, 0, 0, 0.1)",t.lineWidth=1,t.arc(e.x,e.y,s,r*o[1],2*Math.PI),t.stroke();return}else{t.strokeStyle="rgb(255, 255, 0)",t.beginPath(),t.lineWidth=15,t.arc(e.x,e.y,s,0,r*o[0]),t.stroke(),t.beginPath(),t.strokeStyle="rgb(0, 0, 0, 0.1)",t.lineWidth=1,t.arc(e.x,e.y,s,r*o[0],r*o[1]),t.stroke(),t.beginPath(),t.strokeStyle="rgb(255, 255, 0)",t.lineWidth=15,t.arc(e.x,e.y,s,r*o[1],2*Math.PI),t.stroke(),t.lineWidth=1;return}}t.beginPath(),t.strokeStyle="rgb(0, 0, 0, 0.1)",t.arc(e.x,e.y,s,0,2*Math.PI),t.stroke()}drawPolygon(t,e,s,n,r,o,a,l){t.beginPath(),t.strokeStyle=l;for(let c=0;c<e;c++){const h=c*s;if(o!=null){const d=n+a[c][o],u=r.x+d*Math.cos(h),f=r.y+d*Math.sin(h);c==0&&t.moveTo(u,f),t.lineTo(u,f)}}t.closePath(),t.stroke()}}var kt=(i=>(i[i.none=0]="none",i[i.focused=1]="focused",i[i.selected=2]="selected",i))(kt||{});class Cc{canvas;ctx;isDragging=!1;mouseDownPoint=null;path=new Set;constructor(t){this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.canvas instanceof HTMLElement&&(this.canvas.style.transformOrigin="0 0"),setInterval(()=>{this.draw()},100);const e=s=>{const n=s.deltaY<0?1.1:.9,r=this.ctx.getTransform().a*n;if(s.clientY>0&&s.clientY<this.canvas.height&&s.clientX>0&&s.clientX<this.canvas.width&&.1<r&&r<10){const o=this.getTransformedPoint(this.ctx,s.offsetX,s.offsetY);this.ctx.translate(o.x,o.y),this.ctx.scale(n,n),this.ctx.translate(-o.x,-o.y),this.draw(),s.preventDefault(),s.stopPropagation()}};window.addEventListener("wheel",s=>{e(s)},{passive:!1}),this.canvas.addEventListener("mousedown",this.onMouseDown.bind(this),{passive:!1}),this.canvas.addEventListener("mousemove",this.onMouseMove.bind(this),{passive:!1}),this.canvas.addEventListener("mouseup",this.onMouseUp.bind(this),{passive:!1}),this.canvas.addEventListener("mouseout",this.onMouseOut.bind(this),{passive:!1})}getTransformedPoint(t,e,s){const n=new DOMPoint(e,s);return this.ctx.getTransform().invertSelf().transformPoint(n)}onMouseDown(t){this.mouseDownPoint=new DOMPoint(t.offsetX,t.offsetY).matrixTransform(this.ctx.getTransform().invertSelf())}onMouseMove(t){}onMouseUp(t){}onMouseOut(t){}}class kc extends Cc{addNodeButton;removeNodeButton;addEdgeButton;removeEdgeButton;importButton;exportButton;model;constructor(t,e){super(t),this.model=e,this.addNodeButton=document.getElementById("addNodeButton"),this.removeNodeButton=document.getElementById("removeNodeButton"),this.addEdgeButton=document.getElementById("addEdgeButton"),this.removeEdgeButton=document.getElementById("removeEdgeButton"),this.importButton=document.getElementById("importButton"),this.exportButton=document.getElementById("exportButton"),document.getElementById("fitButton").addEventListener("click",()=>{this.fitToScreen()}),this.addNodeButton.addEventListener("click",()=>this.addNode()),this.removeNodeButton.addEventListener("click",()=>{this.doExtractNodes()}),this.addEdgeButton.addEventListener("click",()=>this.addEdge()),this.removeEdgeButton.addEventListener("click",()=>this.removeEdge()),this.updateGraphEditorButtonState()}setModel(t){this.model=t}updateGraphEditorButtonState(){if(this.model.timer?.isStarted()){this.addNodeButton.disabled=!0,this.addEdgeButton.disabled=!0,this.removeNodeButton.disabled=!0,this.removeEdgeButton.disabled=!0,this.importButton.disabled=!0,this.exportButton.disabled=!0;return}if(this.importButton.disabled=!1,this.exportButton.disabled=!1,this.model.selectedRegionIds.length>0){this.addNodeButton.disabled=!1,this.removeNodeButton.disabled=!1;let t=0;for(let e=0;e<this.model.selectedRegionIds.length;e++){const s=this.model.selectedRegionIds[e];for(let n=e+1;n<this.model.selectedRegionIds.length;n++){const r=this.model.selectedRegionIds[n],o=this.model.country.matrices.adjacencyMatrix[s][r];0<o&&o<Number.POSITIVE_INFINITY&&t++}}this.addEdgeButton.disabled=!(2<=this.model.selectedRegionIds.length&&t<(1+this.model.selectedRegionIds.length-1)*(this.model.selectedRegionIds.length-1)/2),this.removeEdgeButton.disabled=t==0;return}if(this.model.selectedRegionIds.length==0||this.model.selectedRegionIds.length==0){this.addNodeButton.disabled=!0,this.addEdgeButton.disabled=!0,this.removeNodeButton.disabled=!0,this.removeEdgeButton.disabled=!0;return}this.addNodeButton.disabled=!1,this.addEdgeButton.disabled=!0,this.removeNodeButton.disabled=!0,this.removeEdgeButton.disabled=!0}onMouseOut(t){this.model&&this.model.notifyRegionSelect("graphView",[],T.FOCUSED,!1)}onMouseDown(t){if(!this.model)throw new Error;if(super.onMouseDown(t),!this.mouseDownPoint)throw new Error;const e=this.model.findClosestElementId(this.mouseDownPoint.x,this.mouseDownPoint.y);if(e!=null){const s=this.model.country.regions[e];this.isDragging=!0,this.model.selectedRegionIds.includes(s.id)||(this.model.selectedRegionIds=[...this.model.selectedRegionIds,s.id],this.model.notifyRegionSelect("graphView",this.model.selectedRegionIds,T.SELECTED,!0))}else this.isDragging=!1,this.model.notifyRegionSelect("graphView",this.model.selectedRegionIds,T.SELECTED,!1),this.model.selectedRegionIds=[];requestAnimationFrame(this.draw.bind(this))}onMouseMove(t){if(!this.model||!this.model.country||!this.ctx)return;super.onMouseMove(t);const e=this.getTransformedPoint(this.ctx,t.offsetX,t.offsetY);this.ctx.getTransform().a;function s(r,o){return(r.x-o.x)**2+(r.y-o.y)**2}if(this.isDragging&&this.model.selectedRegionIds.length>0){const r=this.model.nodes.reduce((l,c)=>s(l,e)<s(c,e)?l:c).id,o=e.x-this.model.nodes[r].x,a=e.y-this.model.nodes[r].y;this.model.selectedRegionIds.map(l=>this.model.nodes[l]).forEach(l=>{l.x+=o,l.y+=a}),requestAnimationFrame(this.draw.bind(this));return}if(this.mouseDownPoint){const r=new DOMMatrix;r.translateSelf(e.x-this.mouseDownPoint.x,e.y-this.mouseDownPoint.y),this.ctx.setTransform(this.ctx.getTransform().multiply(r)),requestAnimationFrame(this.draw.bind(this));return}const n=this.model.findClosestElementId(e.x,e.y);n!=null?(this.canvas.style.cursor="pointer",this.model.notifyRegionSelect("graphView",[n],T.FOCUSED,!0)):(this.canvas.style.cursor="default",this.model.notifyRegionSelect("graphView",this.model.focusedRegionIds,T.FOCUSED,!1))}async onMouseUp(t){!this.model||!this.ctx||(this.mouseDownPoint=null,this.onMouseMove(t),this.model.selectedRegionIds.length>0&&this.model.notifyGraphUpdate(),this.isDragging=!1,this.updateGraphEditorButtonState())}getRadius(t,e){switch(e){case kt.none:return t;case kt.focused:return t*3;case kt.selected:return t+2;default:return t}}drawNode(t,e,s,n){t.beginPath(),t.fillStyle="white",t.fill(),t.stroke();const r=this.getRadius(s,n);if(!(r<0)){switch(t.beginPath(),n){case kt.none:t.fillStyle="rgb(128, 0, 0, 0.2)",t.arc(e.x,e.y,r,0,Math.PI*2),e.radius=r;break;case kt.focused:t.fillStyle="rgb(255, 0, 0, 0.2)",t.arc(e.x,e.y,r,0,Math.PI*2),t.fillStyle="rgb(255, 255, 0, 0.2)",t.arc(e.x,e.y,r,0,Math.PI*2),e.radius=s;break;case kt.selected:t.strokeStyle="rgb(255, 220, 0, 0.8)",t.fillStyle="",t.arc(e.x,e.y,r+5,0,Math.PI*2),t.stroke(),t.closePath(),t.beginPath(),t.fillStyle="rgb(255, 220, 0, 0.4)",t.arc(e.x,e.y,r,0,Math.PI*2),e.radius=r;break}t.fill(),t.closePath(),t.fillStyle="rgb(20,20,20,0.6)",t.fillText(e.id.toString(),e.x-3.5,e.y+3.5)}}drawShortestPathEdges(t,e){if(!this.model)return;this.ctx.beginPath(),this.ctx.strokeStyle="rgb(255,0,0,0.5)",this.ctx.lineWidth=5;const s=this.model.nodes[t];for(this.ctx.moveTo(s.x,s.y),this.path.clear();t!=e;){const n=this.model.country.matrices.predecessorMatrix[t][e];this.path.add(t<n?`${t}:${n}`:`${n}:${t}`);const r=this.model.nodes[n];this.ctx.lineTo(r.x,r.y),t=n}this.ctx.stroke()}draw(){if(this.model){if(this.ctx.save(),this.ctx.resetTransform(),this.ctx.fillStyle="#fafafa",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.restore(),this.model.focusedRegionIds.length>0){const t=this.model.focusedRegionIds[0],e=this.model.focusedRegionIds[1],s=this.model.country.matrices.adjacencyMatrix[t]&&this.model.country.matrices.adjacencyMatrix[t][e],n=this.model.country.matrices.distanceMatrix[t]&&this.model.country.matrices.distanceMatrix[t][e];s==Number.POSITIVE_INFINITY&&0<n&&n<Number.POSITIVE_INFINITY?this.drawShortestPathEdges.call(this,t,e):this.path.clear()}for(let t=0;t<this.model.nodes.length;t++){const e=this.model.nodes[t];for(let s=t+1;s<this.model.nodes.length;s++){const n=this.model.country.matrices.adjacencyMatrix[t]&&this.model.country.matrices.adjacencyMatrix[t][s];if(0<n&&n<Number.POSITIVE_INFINITY){const r=this.model.nodes[s];this.drawEdge(t,s,e,r,n)}}}this.ctx.strokeStyle="#000";for(let t of this.model.country.regions){const e=this.model.country.regions[t.id];if(!e)continue;const s=1+e.manufacturingShare*3*10,n=this.model.nodes[t.id];n&&this.drawNode(this.ctx,n,s,kt.none)}for(let t of this.model.selectedRegionIds){const e=this.model.country.regions[t];if(!e)continue;const s=(1+e.manufacturingShare)*10,n=this.model.nodes[t];n&&this.drawNode(this.ctx,n,s,kt.selected)}if(this.model.focusedRegionIds.length>0){for(let s of this.model.focusedRegionIds){const n=this.model.nodes[s],r=this.model.country.regions[s];if(n&&r){const o=(1+r.manufacturingShare)*10;this.drawNode(this.ctx,n,o,kt.focused),this.ctx.save(),this.ctx.resetTransform()}}const t=this.model.focusedRegionIds[this.model.focusedRegionIds.length-1];this.model.country.regions[t]&&this.model.nodes[t]&&ar(this.model,this.ctx,{x:this.canvas.width-120,y:this.canvas.height-80})}this.ctx.restore()}}computeTransformMatrix(t,e,s,n,r,o,a=.2,l=.2){const c=n-s,h=o-r,d=t*(1-a),u=e*(1-l),f=d/u,m=c/h,y=f>m?u/h:d/c,S=(t-c*y)*.5-s*y,E=(e-h*y)*.5-r*y,P=new DOMMatrix;return P.translateSelf(S,E).scaleSelf(y,y),P}fitToScreen(){const t=this.getGraphBounds(),e=this.computeTransformMatrix(this.canvas.width,this.canvas.height,t.minX,t.maxX,t.minY,t.maxY);this.ctx.setTransform(e),requestAnimationFrame(this.draw.bind(this))}getGraphBounds(){if(!this.model)throw new Error;let t=Number.POSITIVE_INFINITY,e=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,n=Number.NEGATIVE_INFINITY;for(let r of this.model.nodes)t=Math.min(t,r.x),e=Math.min(e,r.y),s=Math.max(s,r.x),n=Math.max(n,r.y);return{minX:t,minY:e,maxX:s,maxY:n}}async addNode(){if(!this.model||this.model.selectedRegionIds.length==0)throw new Error;const t=[...this.model.selectedRegionIds],e=1;console.log("  setNumRegions"),this.model.setNumRegions(this.model.nodes.length+e),console.log("  appendRegions"),console.log("  notifyNumRegionsChanged"),this.model.notifyNumRegionsChanged(),this.model.notifyAdjacencyMatrixChanged(),this.model.notifyRegionSelect("graph",t,T.SELECTED,!1),this.model.notifyRegionSelect("graph",[this.model.nodes.length-1],T.SELECTED,!0)}doExtractNodes(){this.extractNodes(this.model.selectedRegionIds)}extractNodes(t){if(!this.model)throw new Error;const e=[];for(let s=0;s<this.model.country.regions.length;s++)t.includes(s)||e.push(s);this.model.extractRegions(this.model.nodes.length,e)}drawEdge(t,e,s,n,r){this.ctx.beginPath(),this.ctx.strokeStyle="#ccc",this.ctx.lineWidth=1,this.ctx.moveTo(s.x,s.y),this.ctx.lineTo(n.x,n.y),this.ctx.stroke(),this.model?.isFocusedRegionIds(t,e)?(this.ctx.beginPath(),this.ctx.strokeStyle="rgb(255, 255, 0, 0.3)",this.ctx.lineWidth=10,this.ctx.moveTo(s.x,s.y),this.ctx.lineTo(n.x,n.y),this.ctx.stroke(),this.ctx.fillStyle="rgb(255,0,0,0.5)"):this.ctx.fillStyle="rgb(0,0,0,0.3)";const o=t<e?`${t}:${e}`:`${e}:${t}`;this.path.has(o)&&(this.ctx.fillStyle="rgb(255,0,255,0.5)"),this.ctx.lineWidth=1,!(this.isDragging&&(this.model.selectedRegionIds.length>=1&&(this.model.selectedRegionIds[0]==t||this.model.selectedRegionIds[0]==e)||this.model.selectedRegionIds.length>=2&&(this.model.selectedRegionIds[1]==t||this.model.selectedRegionIds[1]==e)))&&this.ctx.fillText(r.toFixed(1),(s.x+n.x)/2,(s.y+n.y)/2)}addEdge(){if(!this.model)throw new Error;this.model.addEdge(this.model.selectedRegionIds)}removeEdge(){if(!this.model)throw new Error;this.model.removeEdge(this.model.selectedRegionIds)}}const q=32,Be=16,dt=24;class Ec{canvas;barChartSelector;model;config={"Share of Manufacturing":{min:0,max:1,oy:0,ticks:[{min:0,max:1,step:.1},{min:0,max:.25,step:.05},{min:0,max:.1,step:.02}],bar:t=>t.manufacturingShare,toFixed:2},Income:{min:0,max:4,oy:0,ticks:[{min:0,max:4,step:.2},{min:0,max:.2,step:.05}],line:t=>t.income,toFixed:2},"Price Index":{min:0,max:4,oy:0,ticks:[{min:0,max:4,step:.2},{min:0,max:.2,step:.05}],line:t=>t.priceIndex,toFixed:2},"Nominal Wage":{min:.8,max:1.2,oy:1,ticks:[{min:.8,max:1.2,step:.05},{min:.95,max:1.05,step:.005}],line:t=>t.nominalWage,toFixed:3},"Real Wage":{min:.8,max:1.2,oy:1,ticks:[{min:.8,max:1.2,step:.05},{min:.9,max:1.1,step:.01},{min:.95,max:1.05,step:.005}],line:t=>t.realWage,toFixed:3}};constructor(){this.canvas=document.getElementById("barChartCanvas"),this.barChartSelector=document.getElementById("barChartSelector"),this.barChartSelector.addEventListener("change",()=>{this.model&&(this.model.barChartType=this.barChartSelector.value,this.draw())});const t=e=>{if(!this.model)return null;const s=(this.canvas.width-q-Be)/this.model.country.regions.length;if(e.offsetX<q)return null;for(let n=0;n<this.model.country.regions.length;n++)if(e.offsetX<q+(n+1)*s)return n;return null};this.canvas.addEventListener("mousemove",e=>{if(!this.model)return;const s=t(e);(s==null||!this.model.focusedRegionIds.includes(s))&&this.model.notifyRegionSelect("barChatView",this.model.focusedRegionIds,T.FOCUSED,!1),s!=null?(this.model.notifyRegionSelect("barChatView",[s],T.FOCUSED,!0),this.canvas.style.cursor="pointer"):this.canvas.style.cursor="default"}),this.canvas.addEventListener("mousedown",e=>{if(!this.model)return;const s=t(e);s!=null&&(this.model.notifyRegionSelect("barChatView",this.model.selectedRegionIds,T.SELECTED,!1),this.model.notifyRegionSelect("barChatView",[s],T.SELECTED,!0))}),this.canvas.addEventListener("mouseout",()=>{this.model&&this.model.notifyRegionSelect("barChatView",this.model.focusedRegionIds,T.FOCUSED,!1)})}setModel(t){this.model=t}drawHorizontalLabels(t,e,s,n,r){if(t.fillStyle="#888",t.textAlign="left",n<=20)for(let a=0;a<n;a+=1){const l=s+a*e;t.fillText(a.toString(),l+1,r)}else for(let a=10;a<n;a+=10){const l=s+a*e;t.fillText(a.toString(),l+1,r)}}draw(){const t=this.canvas.getContext("2d");if(!t||!this.model)return;t.clearRect(0,0,this.canvas.width,this.canvas.height),t.fillStyle="#f4f4f4",t.fillRect(q,0,this.canvas.width-q-Be,this.canvas.height-dt);const e=this.config[this.model?.barChartType],s=(this.canvas.width-q-Be)/this.model.country.regions.length;t.textAlign="right";const n=this.canvas.width-q-Be,r=this.model?.barChartScale||1,o=this.canvas.height-dt,a=c=>l(c,e.max,e.min,o,e.oy,r),l=(c,h,d,u,f=0,m=1)=>{const y=(c-f)/(h-d);return u*m*y+f*u/2};for(let c=0;c<e.ticks.length;c++){const{min:h,max:d,step:u}=e.ticks[c];let f=0;for(let m=h;m<=d;m+=u){t.fillStyle="#ddd";const y=this.canvas.height-dt-a(m);0<=y&&y<=this.canvas.height-dt&&(t.fillRect(q,y,n,1),t.fillStyle="#888",t.fillText(m.toFixed(e.toFixed),q-2,y),f++)}if(f>1)break}this.model.country.regions.forEach((c,h)=>{this.model.focusedRegionIds.includes(h)&&(t.fillStyle="rgb(255,255,0,0.3)",t.fillRect(q+h*s,0,Math.max(s-1,1),this.canvas.height));const d=e.bar?e.bar(c):null;if(d!=null){const u=d<0?"#e88":"#d00";t.strokeStyle=t.fillStyle=u;const f=a(d);0<=f&&f<=this.canvas.height-dt?t.fillRect(q+h*s,this.canvas.height-dt-f,Math.max(s-1,1),f):this.canvas.height-dt<f&&t.fillRect(q+h*s,0,Math.max(s-1,1),this.canvas.height-dt),this.model.selectedRegionIds.includes(h)&&(t.lineWidth=2,t.strokeStyle="#ff0",0<=f&&f<=this.canvas.height-dt?t.strokeRect(q+h*s+2,this.canvas.height-dt-f+2,Math.max(s-1,1)-4,f-4):this.canvas.height-dt<f&&t.strokeRect(q+h*s,0,Math.max(s-1,1),this.canvas.height-dt),t.strokeStyle=u)}}),t.beginPath(),this.model.country.regions.forEach((c,h)=>{const d=e.line?e.line(c):null;if(d!=null){const u=this.canvas.height-dt-a(d);t.strokeStyle="#e88",t.lineWidth=2,h==0?t.moveTo(q+(h+.5)*s,u):t.lineTo(q+(h+.5)*s,u)}}),t.stroke(),this.drawHorizontalLabels(t,s,q,this.model.country.regions.length,this.canvas.height-12)}}class Tc{scaleSelector;model;constructor(){this.scaleSelector=document.getElementById("scale"),this.scaleSelector.addEventListener("change",t=>this.changeScale(t))}setModel(t){this.model=t}changeScale(t){if(!this.model)throw new Error;const e=t.target.value,s=parseFloat(e.split(" ")[1]);this.model.setBarChartScale(s)}}class $c{numRegionsSlider;piSlider;transportCostSlider;sigmaSlider;numRegionsElem;piElem;transportCostElem;sigmaElem;model;constructor(){this.numRegionsSlider=document.getElementById("numRegionsSlider"),this.piSlider=document.getElementById("piSlider"),this.transportCostSlider=document.getElementById("tcostSlider"),this.sigmaSlider=document.getElementById("sigmaSlider"),this.numRegionsElem=document.getElementById("numRegions"),this.piElem=document.getElementById("pi"),this.transportCostElem=document.getElementById("tcost"),this.sigmaElem=document.getElementById("sigma"),this.numRegionsSlider.addEventListener("change",async()=>{this.onNumRegionsChanged()}),this.piSlider.addEventListener("change",()=>this.onPiChanged()),this.transportCostSlider.addEventListener("change",()=>this.onTransportCostChanged()),this.sigmaSlider.addEventListener("change",()=>this.onSigmaChanged())}setModel(t){this.model=t,this.numRegionsSlider.valueAsNumber=t.country.numRegions,this.piSlider.valueAsNumber=t.country.pi,this.transportCostSlider.valueAsNumber=t.country.transportCost,this.sigmaSlider.valueAsNumber=t.country.sigma,this.numRegionsElem.innerText=this.numRegionsSlider.value,this.transportCostElem.innerText=this.transportCostSlider.value,this.sigmaElem.innerText=this.sigmaSlider.value,this.piElem.innerText=this.piSlider.value}onNumRegionsChanged(){if(!this.model)throw new Error;const t=Math.floor(this.numRegionsSlider.valueAsNumber);this.model?.setNumRegions(t),this.numRegionsElem.innerText=`${t}`}onPiChanged(){if(!this.model)throw new Error;this.piElem.innerText=this.piSlider.valueAsNumber.toPrecision(2),this.model.setPi(this.piSlider.valueAsNumber)}onTransportCostChanged(){if(!this.model)throw new Error;this.transportCostElem.innerText=this.transportCostSlider.valueAsNumber.toPrecision(2),this.model.setTransportCost(this.transportCostSlider.valueAsNumber)}onSigmaChanged(){if(!this.model)throw new Error;this.sigmaElem.innerText=this.sigmaSlider.valueAsNumber.toPrecision(3),this.model.setSigma(this.sigmaSlider.valueAsNumber)}}class Ic{sliderSet;caseSelector;model;constructor(t){this.sliderSet=t,this.caseSelector=document.getElementById("caseSelector"),this.caseSelector.addEventListener("change",()=>this.onCaseChanged())}onCaseChanged(){if(this.model)switch(this.caseSelector.value){case"0":this.sliderSet.numRegionsSlider.value="12",this.sliderSet.piSlider.value="0.2",this.sliderSet.transportCostSlider.value="2",this.sliderSet.sigmaSlider.value="4";return;case"1":this.sliderSet.numRegionsSlider.value="12",this.sliderSet.piSlider.value="0.2",this.sliderSet.transportCostSlider.value="2",this.sliderSet.sigmaSlider.value="2";return;case"2":this.sliderSet.numRegionsSlider.value="12",this.sliderSet.piSlider.value="0.4",this.sliderSet.transportCostSlider.value="2",this.sliderSet.sigmaSlider.value="4";return;case"3":this.sliderSet.numRegionsSlider.value="12",this.sliderSet.piSlider.value="0.2",this.sliderSet.transportCostSlider.value="1",this.sliderSet.sigmaSlider.value="4";return}}setModel(t){this.model=t}}class Xt{static tick=new Xt("tick");static start=new Xt("start");static stop=new Xt("stop");static reset=new Xt("reset");type;constructor(t){this.type=t}}class _{static layoutTimer=null;static simulationTimer=null;speed;timeout;timeCounter;timeEventListeners;constructor(t=.5){this.timeCounter=0,this.speed=t,this.timeout=null,this.timeEventListeners=new Array}static getLayoutTimer(){return _.layoutTimer||(_.layoutTimer=new _(1)),_.layoutTimer}static getSimulationTimer(){return _.simulationTimer||(_.simulationTimer=new _(.5)),_.simulationTimer}isStarted(){return this.timeout!=null}changeSpeed(t){t!=this.speed&&(this.speed=t,this.timeout!=null&&this.start())}start(){this.timeout!=null&&clearInterval(this.timeout);const e=(s=>{const n=Math.log(1),r=Math.log(1e3),o=n+(1-s)*(r-n);return Math.exp(o)})(this.speed);this.timeout=setInterval(()=>this.tick(),e)}stop(){this.timeout!=null&&clearInterval(this.timeout),this.timeout=null}addTimeEventListener(t){this.timeEventListeners.push(t)}reset(){this.timeCounter=0}tick(){this.timeCounter++,this.timeEventListeners.forEach(t=>{t(Xt.tick)})}}class Mc{model;startButton;stopButton;resetButton;counterElem;speedSlider;constructor(){this.startButton=document.getElementById("start"),this.stopButton=document.getElementById("stop"),this.resetButton=document.getElementById("reset"),this.counterElem=document.getElementById("counter"),this.speedSlider=document.getElementById("speedSlider"),this.startButton.addEventListener("click",()=>this.start()),this.stopButton.addEventListener("click",()=>this.stop()),this.resetButton.addEventListener("click",()=>this.reset()),this.speedSlider.addEventListener("change",()=>{_.getSimulationTimer().changeSpeed(this.speedSlider.valueAsNumber)}),this.stopButton.disabled=!0,_.getSimulationTimer().addTimeEventListener(t=>{this.counterElem.innerText=this.model?.timer?.timeCounter.toLocaleString()||""})}setModel(t){this.model=t}start(){this.startButton.disabled=!0,this.stopButton.disabled=!1,this.stopButton.classList.add("started"),this.resetButton.classList.add("started"),this.model.start()}stop(){this.startButton.disabled=!1,this.stopButton.disabled=!0,this.startButton.classList.remove("started"),this.resetButton.classList.remove("started"),this.model.stop()}reset(){this.model.reset()}}class Pi{id;tableElement;model;constructor(t){this.id=t,this.tableElement=document.getElementById(this.id)}setModel(t){this.model=t}decorateTable(t,e,s,n){n?this.tableElement.classList.add(t):this.tableElement.classList.remove(t);const r=this.tableElement.rows[e];if(r&&r.cells)for(let o=0;o<r.cells.length;o++)n?r.cells[o].classList.add(t):r.cells[o].classList.remove(t);for(let o=0;o<this.tableElement.rows.length;o++){const a=this.tableElement.rows[o];a.cells[s]&&(n?a.cells[s].classList.add(t):a.cells[s].classList.remove(t))}}adjustTableSize(t,e,s,n){if(!this.model)return;const r=Math.min(t,s),o=Math.min(e,n);for(;r<this.tableElement.rows.length-1;)this.tableElement.deleteRow(-1);if(0<this.tableElement.rows.length&&o+1<this.tableElement.rows[0].cells.length)for(let a=0;0<this.tableElement.rows.length&&this.tableElement.rows[a]&&a<this.tableElement.rows[a].cells.length-1||a<r;a++)for(let l=o;this.tableElement.rows[a]&&l<this.tableElement.rows[a].cells.length;l++)this.tableElement.rows[a].deleteCell(-1);for(let a=this.tableElement.rows.length;a<r+1;a++){const l=document.createElement("tr");this.tableElement.appendChild(l)}for(let a=0;a<r+1;a++)for(let l=this.tableElement.rows[a].cells.length;l<o+1;l++){const c=document.createElement(a==0||l==0?"th":"td");c.textContent=a==0?l==0?"":`${l-1}`:l==0?`${a-1}`:"",this.tableElement.rows[a].appendChild(c),a==0?(c.addEventListener("mousedown",()=>{this.model?.notifyRegionSelect(this.id,this.model?.selectedRegionIds,T.SELECTED,!1),this.model?.notifyRegionSelect(this.id,[l-1],T.SELECTED,!0)}),c.addEventListener("mouseover",()=>{this.model?.notifyRegionSelect(this.id,[l-1],T.FOCUSED,!0)}),c.addEventListener("mouseout",()=>{this.model?.notifyRegionSelect(this.id,[l-1],T.FOCUSED,!1)})):l==0?(c.addEventListener("mousedown",()=>{this.model?.notifyRegionSelect(this.id,this.model?.selectedRegionIds,T.SELECTED,!1),this.model?.notifyRegionSelect(this.id,[a-1],T.SELECTED,!0)}),c.addEventListener("mouseover",()=>{this.model?.notifyRegionSelect(this.id,[a-1],T.FOCUSED,!0)}),c.addEventListener("mouseout",()=>{this.model?.notifyRegionSelect(this.id,[a-1],T.FOCUSED,!1)})):(c.addEventListener("mousedown",()=>{this.model?.notifyRegionSelect(this.id,this.model?.selectedRegionIds,T.SELECTED,!1),this.model?.notifyRegionSelect(this.id,[a-1,l-1],T.SELECTED,!0)}),c.addEventListener("mouseover",()=>{this.model?.notifyRegionSelect(this.id,[a-1,l-1],T.FOCUSED,!0)}),c.addEventListener("mouseout",()=>{this.model?.notifyRegionSelect(this.id,[a-1,l-1],T.FOCUSED,!1)}))}if(e>=n)for(let a=1;a<this.tableElement.rows.length;a++){const l=this.tableElement.rows[a].cells,c=l.length;l[c-1].textContent="..."}if(t>=s){const a=this.tableElement.rows.length;for(let l=0;l<this.tableElement.rows[a-1].cells.length;l++)this.tableElement.rows[a-1].cells[l].textContent="..."}}setTableContent(t,e,s,n){let r=0;for(let o=0;o<t.length;o++)for(let a=0;a<t[o].length;a++)t[o][a]!=Number.POSITIVE_INFINITY&&(r=Math.max(r,t[o][a]));for(let o=0;o<e-1&&o<t.length&&o<this.tableElement.rows.length-1;o++)for(let a=0;a<s-1&&a<t[o].length&&a<this.tableElement.rows[o+1].cells.length-1;a++){const l=t[o][a],c=l!=Number.POSITIVE_INFINITY?l/r:"0",h=this.tableElement.rows[o+1].cells[a+1],d=n(t[o][a]);h.textContent=d,h.setAttribute("title",d),h.style.backgroundColor=`rgba(255, 0, 0, ${c})`}}}const At=21;class Dc{adjacencyMatrix;distanceMatrix;transportCostMatrix;model;constructor(){this.adjacencyMatrix=new Pi("adjacencyMatrix"),this.distanceMatrix=new Pi("distanceMatrix"),this.transportCostMatrix=new Pi("transportCostMatrix")}setModel(t){this.model=t,this.adjacencyMatrix.setModel(t),this.distanceMatrix.setModel(t),this.transportCostMatrix.setModel(t),this.update()}updateTableSize(t){this.adjacencyMatrix.adjustTableSize(t,t,At,At),this.distanceMatrix.adjustTableSize(t,t,At,At),this.transportCostMatrix.adjustTableSize(t,t,At,At)}async updateTableContent(){this.model&&[{table:this.adjacencyMatrix,matrix:this.model.country.matrices.adjacencyMatrix},{table:this.distanceMatrix,matrix:this.model.country.matrices.distanceMatrix},{table:this.transportCostMatrix,matrix:this.model.country.matrices.transportCostMatrix}].forEach(t=>{const{table:e,matrix:s}=t;e.setTableContent(s,At,At,n=>n==Number.POSITIVE_INFINITY?"Inf":n?.toFixed(1))})}decorateTable(t,e,s,n,r){this.adjacencyMatrix.decorateTable(n,e,s,r),this.distanceMatrix.decorateTable(n,e,s,r),this.transportCostMatrix.decorateTable(n,e,s,r)}async update(){this.model&&(this.updateTableSize(this.model.country.regions.length),await this.updateTableContent())}}class Lc{typeSelector;model;constructor(){this.typeSelector=document.getElementById("barChartSelector"),this.typeSelector.addEventListener("change",t=>this.changeScale(t))}setModel(t){this.model=t,this.typeSelector.value=this.model.barChartType||""}changeScale(t){if(!this.model)throw new Error;this.model.barChartType=t.target.value}}class Fc{barChartView;visualizerTypeSelector;barChartScaleSelector;barChartTypeSelector;sliderSet;caseSelector;commandButtonSet;diagonalTableViewSet;constructor(){this.barChartView=new Ec,this.visualizerTypeSelector=new xc,this.barChartScaleSelector=new Tc,this.barChartTypeSelector=new Lc,this.sliderSet=new $c,this.caseSelector=new Ic(this.sliderSet),this.commandButtonSet=new Mc,this.diagonalTableViewSet=new Dc}setModel(t){this.barChartView.setModel(t),this.visualizerTypeSelector.setModel(t),this.barChartScaleSelector.setModel(t),this.barChartTypeSelector.setModel(t),this.sliderSet.setModel(t),this.caseSelector.setModel(t),this.commandButtonSet.setModel(t),this.diagonalTableViewSet.setModel(t)}async update(){await this.diagonalTableViewSet.update(),this.barChartView.draw()}tick(){this.barChartView.draw()}}class Pc{adjacencyMatrix;predecessorMatrix;distanceMatrix;transportCostMatrix;constructor(t){this.adjacencyMatrix=this.create2DArray(t),this.predecessorMatrix=this.create2DArray(t),this.distanceMatrix=this.create2DArray(t),this.transportCostMatrix=this.create2DArray(t)}create2DArray(t,e){const s=new Array(t);for(let n=0;n<t;n++)if(s[n]=new Array(t),s[n].fill(Number.POSITIVE_INFINITY),e&&e[n])for(let r=0;r<t;r++)e[n][r]&&(s[n][r]=e[n][r]);return s}extractDiagonal(t,e){const s=[];return e.forEach((n,r)=>{const o=Array(e.length);e.forEach((a,l)=>{t[n]&&t[n][a]&&(o[l]=t[n][a])}),o[n]=0,s.push(o)}),s}resizeMatrix(t,e){const s=new Array(e);for(let n=0;n<e;n++){s[n]=new Array(e);for(let r=0;r<e;r++)n<t.length&&r<t[n].length?s[n][r]=t[n][r]:n==r?s[n][r]=0:s[n][r]=Number.POSITIVE_INFINITY}return s}}var Gt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Vc(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}function Ac(i){if(i.__esModule)return i;var t=i.default;if(typeof t=="function"){var e=function s(){return this instanceof s?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};e.prototype=t.prototype}else e={};return Object.defineProperty(e,"__esModule",{value:!0}),Object.keys(i).forEach(function(s){var n=Object.getOwnPropertyDescriptor(i,s);Object.defineProperty(e,s,n.get?n:{enumerable:!0,get:function(){return i[s]}})}),e}var Cs={exports:{}};Cs.exports;(function(i){(function(t,e,s){function n(l){var c=this,h=a();c.next=function(){var d=2091639*c.s0+c.c*23283064365386963e-26;return c.s0=c.s1,c.s1=c.s2,c.s2=d-(c.c=d|0)},c.c=1,c.s0=h(" "),c.s1=h(" "),c.s2=h(" "),c.s0-=h(l),c.s0<0&&(c.s0+=1),c.s1-=h(l),c.s1<0&&(c.s1+=1),c.s2-=h(l),c.s2<0&&(c.s2+=1),h=null}function r(l,c){return c.c=l.c,c.s0=l.s0,c.s1=l.s1,c.s2=l.s2,c}function o(l,c){var h=new n(l),d=c&&c.state,u=h.next;return u.int32=function(){return h.next()*4294967296|0},u.double=function(){return u()+(u()*2097152|0)*11102230246251565e-32},u.quick=u,d&&(typeof d=="object"&&r(d,h),u.state=function(){return r(h,{})}),u}function a(){var l=4022871197,c=function(h){h=String(h);for(var d=0;d<h.length;d++){l+=h.charCodeAt(d);var u=.02519603282416938*l;l=u>>>0,u-=l,u*=l,l=u>>>0,u-=l,l+=u*4294967296}return(l>>>0)*23283064365386963e-26};return c}e&&e.exports?e.exports=o:this.alea=o})(Gt,i)})(Cs);var Nc=Cs.exports,ks={exports:{}};ks.exports;(function(i){(function(t,e,s){function n(a){var l=this,c="";l.x=0,l.y=0,l.z=0,l.w=0,l.next=function(){var d=l.x^l.x<<11;return l.x=l.y,l.y=l.z,l.z=l.w,l.w^=l.w>>>19^d^d>>>8},a===(a|0)?l.x=a:c+=a;for(var h=0;h<c.length+64;h++)l.x^=c.charCodeAt(h)|0,l.next()}function r(a,l){return l.x=a.x,l.y=a.y,l.z=a.z,l.w=a.w,l}function o(a,l){var c=new n(a),h=l&&l.state,d=function(){return(c.next()>>>0)/4294967296};return d.double=function(){do var u=c.next()>>>11,f=(c.next()>>>0)/4294967296,m=(u+f)/(1<<21);while(m===0);return m},d.int32=c.next,d.quick=d,h&&(typeof h=="object"&&r(h,c),d.state=function(){return r(c,{})}),d}e&&e.exports?e.exports=o:this.xor128=o})(Gt,i)})(ks);var Oc=ks.exports,Es={exports:{}};Es.exports;(function(i){(function(t,e,s){function n(a){var l=this,c="";l.next=function(){var d=l.x^l.x>>>2;return l.x=l.y,l.y=l.z,l.z=l.w,l.w=l.v,(l.d=l.d+362437|0)+(l.v=l.v^l.v<<4^(d^d<<1))|0},l.x=0,l.y=0,l.z=0,l.w=0,l.v=0,a===(a|0)?l.x=a:c+=a;for(var h=0;h<c.length+64;h++)l.x^=c.charCodeAt(h)|0,h==c.length&&(l.d=l.x<<10^l.x>>>4),l.next()}function r(a,l){return l.x=a.x,l.y=a.y,l.z=a.z,l.w=a.w,l.v=a.v,l.d=a.d,l}function o(a,l){var c=new n(a),h=l&&l.state,d=function(){return(c.next()>>>0)/4294967296};return d.double=function(){do var u=c.next()>>>11,f=(c.next()>>>0)/4294967296,m=(u+f)/(1<<21);while(m===0);return m},d.int32=c.next,d.quick=d,h&&(typeof h=="object"&&r(h,c),d.state=function(){return r(c,{})}),d}e&&e.exports?e.exports=o:this.xorwow=o})(Gt,i)})(Es);var Bc=Es.exports,Ts={exports:{}};Ts.exports;(function(i){(function(t,e,s){function n(a){var l=this;l.next=function(){var h=l.x,d=l.i,u,f;return u=h[d],u^=u>>>7,f=u^u<<24,u=h[d+1&7],f^=u^u>>>10,u=h[d+3&7],f^=u^u>>>3,u=h[d+4&7],f^=u^u<<7,u=h[d+7&7],u=u^u<<13,f^=u^u<<9,h[d]=f,l.i=d+1&7,f};function c(h,d){var u,f=[];if(d===(d|0))f[0]=d;else for(d=""+d,u=0;u<d.length;++u)f[u&7]=f[u&7]<<15^d.charCodeAt(u)+f[u+1&7]<<13;for(;f.length<8;)f.push(0);for(u=0;u<8&&f[u]===0;++u);for(u==8?f[7]=-1:f[u],h.x=f,h.i=0,u=256;u>0;--u)h.next()}c(l,a)}function r(a,l){return l.x=a.x.slice(),l.i=a.i,l}function o(a,l){a==null&&(a=+new Date);var c=new n(a),h=l&&l.state,d=function(){return(c.next()>>>0)/4294967296};return d.double=function(){do var u=c.next()>>>11,f=(c.next()>>>0)/4294967296,m=(u+f)/(1<<21);while(m===0);return m},d.int32=c.next,d.quick=d,h&&(h.x&&r(h,c),d.state=function(){return r(c,{})}),d}e&&e.exports?e.exports=o:this.xorshift7=o})(Gt,i)})(Ts);var zc=Ts.exports,$s={exports:{}};$s.exports;(function(i){(function(t,e,s){function n(a){var l=this;l.next=function(){var h=l.w,d=l.X,u=l.i,f,m;return l.w=h=h+1640531527|0,m=d[u+34&127],f=d[u=u+1&127],m^=m<<13,f^=f<<17,m^=m>>>15,f^=f>>>12,m=d[u]=m^f,l.i=u,m+(h^h>>>16)|0};function c(h,d){var u,f,m,y,S,E=[],P=128;for(d===(d|0)?(f=d,d=null):(d=d+"\0",f=0,P=Math.max(P,d.length)),m=0,y=-32;y<P;++y)d&&(f^=d.charCodeAt((y+32)%d.length)),y===0&&(S=f),f^=f<<10,f^=f>>>15,f^=f<<4,f^=f>>>13,y>=0&&(S=S+1640531527|0,u=E[y&127]^=f+S,m=u==0?m+1:0);for(m>=128&&(E[(d&&d.length||0)&127]=-1),m=127,y=4*128;y>0;--y)f=E[m+34&127],u=E[m=m+1&127],f^=f<<13,u^=u<<17,f^=f>>>15,u^=u>>>12,E[m]=f^u;h.w=S,h.X=E,h.i=m}c(l,a)}function r(a,l){return l.i=a.i,l.w=a.w,l.X=a.X.slice(),l}function o(a,l){a==null&&(a=+new Date);var c=new n(a),h=l&&l.state,d=function(){return(c.next()>>>0)/4294967296};return d.double=function(){do var u=c.next()>>>11,f=(c.next()>>>0)/4294967296,m=(u+f)/(1<<21);while(m===0);return m},d.int32=c.next,d.quick=d,h&&(h.X&&r(h,c),d.state=function(){return r(c,{})}),d}e&&e.exports?e.exports=o:this.xor4096=o})(Gt,i)})($s);var jc=$s.exports,Is={exports:{}};Is.exports;(function(i){(function(t,e,s){function n(a){var l=this,c="";l.next=function(){var d=l.b,u=l.c,f=l.d,m=l.a;return d=d<<25^d>>>7^u,u=u-f|0,f=f<<24^f>>>8^m,m=m-d|0,l.b=d=d<<20^d>>>12^u,l.c=u=u-f|0,l.d=f<<16^u>>>16^m,l.a=m-d|0},l.a=0,l.b=0,l.c=-1640531527,l.d=1367130551,a===Math.floor(a)?(l.a=a/4294967296|0,l.b=a|0):c+=a;for(var h=0;h<c.length+20;h++)l.b^=c.charCodeAt(h)|0,l.next()}function r(a,l){return l.a=a.a,l.b=a.b,l.c=a.c,l.d=a.d,l}function o(a,l){var c=new n(a),h=l&&l.state,d=function(){return(c.next()>>>0)/4294967296};return d.double=function(){do var u=c.next()>>>11,f=(c.next()>>>0)/4294967296,m=(u+f)/(1<<21);while(m===0);return m},d.int32=c.next,d.quick=d,h&&(typeof h=="object"&&r(h,c),d.state=function(){return r(c,{})}),d}e&&e.exports?e.exports=o:this.tychei=o})(Gt,i)})(Is);var Hc=Is.exports,lr={exports:{}};const Uc={},Wc=Object.freeze(Object.defineProperty({__proto__:null,default:Uc},Symbol.toStringTag,{value:"Module"})),Gc=Ac(Wc);(function(i){(function(t,e,s){var n=256,r=6,o=52,a="random",l=s.pow(n,r),c=s.pow(2,o),h=c*2,d=n-1,u;function f(C,M,rt){var W=[];M=M==!0?{entropy:!0}:M||{};var j=E(S(M.entropy?[C,nt(e)]:C??P(),3),W),gt=new m(W),St=function(){for(var pt=gt.g(r),$t=l,Ct=0;pt<c;)pt=(pt+Ct)*n,$t*=n,Ct=gt.g(1);for(;pt>=h;)pt/=2,$t/=2,Ct>>>=1;return(pt+Ct)/$t};return St.int32=function(){return gt.g(4)|0},St.quick=function(){return gt.g(4)/4294967296},St.double=St,E(nt(gt.S),e),(M.pass||rt||function(pt,$t,Ct,Vt){return Vt&&(Vt.S&&y(Vt,gt),pt.state=function(){return y(gt,{})}),Ct?(s[a]=pt,$t):pt})(St,j,"global"in M?M.global:this==s,M.state)}function m(C){var M,rt=C.length,W=this,j=0,gt=W.i=W.j=0,St=W.S=[];for(rt||(C=[rt++]);j<n;)St[j]=j++;for(j=0;j<n;j++)St[j]=St[gt=d&gt+C[j%rt]+(M=St[j])],St[gt]=M;(W.g=function(pt){for(var $t,Ct=0,Vt=W.i,Fe=W.j,ae=W.S;pt--;)$t=ae[Vt=d&Vt+1],Ct=Ct*n+ae[d&(ae[Vt]=ae[Fe=d&Fe+$t])+(ae[Fe]=$t)];return W.i=Vt,W.j=Fe,Ct})(n)}function y(C,M){return M.i=C.i,M.j=C.j,M.S=C.S.slice(),M}function S(C,M){var rt=[],W=typeof C,j;if(M&&W=="object")for(j in C)try{rt.push(S(C[j],M-1))}catch{}return rt.length?rt:W=="string"?C:C+"\0"}function E(C,M){for(var rt=C+"",W,j=0;j<rt.length;)M[d&j]=d&(W^=M[d&j]*19)+rt.charCodeAt(j++);return nt(M)}function P(){try{var C;return u&&(C=u.randomBytes)?C=C(n):(C=new Uint8Array(n),(t.crypto||t.msCrypto).getRandomValues(C)),nt(C)}catch{var M=t.navigator,rt=M&&M.plugins;return[+new Date,t,rt,t.screen,nt(e)]}}function nt(C){return String.fromCharCode.apply(0,C)}if(E(s.random(),e),i.exports){i.exports=f;try{u=Gc}catch{}}else s["seed"+a]=f})(typeof self<"u"?self:Gt,[],Math)})(lr);var qc=lr.exports,_c=Nc,Yc=Oc,Xc=Bc,Qc=zc,Zc=jc,Jc=Hc,qt=qc;qt.alea=_c;qt.xor128=Yc;qt.xorwow=Xc;qt.xorshift7=Qc;qt.xor4096=Zc;qt.tychei=Jc;var Kc=qt;const th=Vc(Kc);class eh{rng;constructor(t){t==null&&(t=Math.random().toString()),this.rng=th(t)}random(){return this.rng.double()}}const ih=new URLSearchParams(location.search).get("seed")||Math.random();let Vi=null;function Je(){return Vi||(Vi=new eh(ih)),Vi.random()}class Zt{static SPEED_OF_ADJUSTMENT=.1;static DIFF_SCALE=.05;static SIGMA_BASE=.1;numRegions;regions;matrices;pi;transportCost;sigma;constructor(t,e,s,n){this.numRegions=t,this.pi=e,this.transportCost=s,this.sigma=n,this.regions=[],this.matrices=new Pc(t),_.getSimulationTimer().addTimeEventListener(r=>{switch(r.type){case"tick":this.tick();break;case"start":break;case"stop":break;case"reset":this.resetRegions();break}})}setNumRegions(t){this.numRegions=t}setSigma(t){this.sigma=t+Zt.SIGMA_BASE}setTransportCost(t){this.transportCost=t}setPi(t){this.pi=t}resetRegions(){this.regions.forEach(t=>{t.manufacturingShare=1/this.regions.length,t.agricultureShare=1/this.regions.length,t.reset()}),this.disturb()}disturb(){if(this.numRegions>0){const t=1/this.numRegions*Zt.DIFF_SCALE;for(let e=0;e<this.numRegions;e++){const s=this.regions[Math.floor(Je()*this.numRegions)];s&&(s.manufacturingShare+=t)}}this.rescale()}rescale(){const t=this.regions.reduce((s,n)=>s+n.manufacturingShare,0),e=this.regions.reduce((s,n)=>s+n.agricultureShare,0);this.regions.forEach(s=>{s.setManufacturingShare(s.manufacturingShare/t),s.setAgricultureShare(s.agricultureShare/e)})}updateIncome(){this.regions.forEach(t=>{t.updateIncome(this.pi)})}updatePriceIndex(){this.regions.forEach(t=>{t.updatePriceIndex(this.regions,this.matrices,this.sigma)})}updateNominalWage(){this.regions.forEach(t=>{t.updateNominalWage(this.regions,this.matrices,this.sigma)})}updateRealWage(){this.regions.forEach(t=>{t.updateRealWage(this.pi)})}calculateAverageRealWage(){return this.regions.reduce((t,e)=>t+e.realWage*e.manufacturingShare,0)}updateDynamics(){const t=this.calculateAverageRealWage();this.regions.forEach(e=>{e.updateDynamics(Zt.SPEED_OF_ADJUSTMENT,t,this.numRegions)}),this.rescale()}tick(){this.updateIncome(),this.updatePriceIndex(),this.updateNominalWage(),this.updateRealWage(),this.updateDynamics()}}class cr{timer;country;barChartType=null;barChartScale;bindings;focusEventSource;focusedRegionIds=[];selectedRegionIds=[];numRegionsChangedListeners;transportCostChangeListeners;selectRegionEventListeners;startEventListeners;stopEventListeners;resetEventListeners;constructor(t,e){this.timer=_.getSimulationTimer(),this.country=t,this.barChartScale=e,this.bindings=new Map,this.focusedRegionIds=[],this.focusEventSource=null,this.selectRegionEventListeners=[],this.startEventListeners=[],this.stopEventListeners=[],this.resetEventListeners=[],this.numRegionsChangedListeners=[],this.transportCostChangeListeners=[],this.barChartType="Share of Manufacturing"}reset(){this.selectedRegionIds=[],this.country.disturb(),this.country.resetRegions(),this.timer?.reset(),this.notifyReset()}start(){this.timer?.start(),_.getLayoutTimer().stop(),this.notifyStart()}stop(){this.timer?.stop(),this.notifyStop()}setBarChartScale(t){this.barChartScale=t}setNumRegions(t){this.country.setNumRegions(t),this.notifyNumRegionsChanged()}setPi(t){this.country.setPi(t)}setTransportCost(t){this.country.setTransportCost(t),this.notifyTransportCostChange()}setSigma(t){this.country.setSigma(t)}setFocusedRegionId(t,e){this.focusEventSource=t,this.focusedRegionIds=e}setFocusedRouteIds(t,e){this.focusEventSource=t,this.focusedRegionIds=e}isFocusedRegionIds(t,e){return this.focusedRegionIds.length==0?!1:Math.min(this.focusedRegionIds[0],this.focusedRegionIds[1])==Math.min(t,e)&&Math.max(this.focusedRegionIds[0],this.focusedRegionIds[1])==Math.max(t,e)}addStartListener(t){this.startEventListeners.push(t)}notifyStart(){this.startEventListeners.forEach(t=>{t()})}addStopListener(t){this.stopEventListeners.push(t)}notifyStop(){this.stopEventListeners.forEach(t=>{t()})}addResetListener(t){this.resetEventListeners.push(t)}notifyReset(){this.resetEventListeners.forEach(t=>{t()})}addRegionSelectListener(t){this.selectRegionEventListeners.push(t)}notifyRegionSelect(t,e,s,n){this.selectRegionEventListeners.forEach(r=>{r(t,e,s,n)})}addTransportCostChangeListener(t){this.transportCostChangeListeners.push(t)}notifyTransportCostChange(){this.transportCostChangeListeners.forEach(t=>{t(this)})}addNumRegionsChangedListener(t){this.numRegionsChangedListeners.push(t)}notifyNumRegionsChanged(){this.numRegionsChangedListeners.forEach(t=>{t()})}updateAdjacencyMatrix(){this.country.matrices.adjacencyMatrix=this.createAdjacencyMatrix(this.country.numRegions)}async updateDistanceMatrixAndTransportCostMatrix(){[this.country.matrices.distanceMatrix,this.country.matrices.predecessorMatrix]=await this.createDistanceMatrix(),this.country.matrices.transportCostMatrix=this.createTransportCostMatrix()}adjustRegions(t){this.country.regions.length<t&&this.appendRegions(t),this.country.regions.length>t&&this.extractRegions(t,[...Array(t).keys()])}}function sh(i,t,e){const s=(i.x+t.x)/2,n=(i.y+t.y)/2,r=.8,o=e?e.x:(t.x-i.x)/2*r,a=e?e.y:(t.y-i.y)/2*r,l=Je()*2*Math.PI,c=Math.sqrt(Math.sqrt(Je())),h=s+c*o*Math.cos(l),d=n+c*a*Math.sin(l);return{x:h,y:d}}function nh(i,t,e,s){const{x:n,y:r}=sh(t,e,s);return{id:i,x:n,y:r,dx:0,dy:0,radius:1}}var xe=(i=>(i[i.FloydWarshall=0]="FloydWarshall",i[i.FloydWarshallGPU=1]="FloydWarshallGPU",i[i.Johnson=2]="Johnson",i))(xe||{});const Et=16,rh=`
struct Distances {
    data: array<f32>
};

@group(0) @binding(0) var<storage, read> adjMatrix: Distances;
@group(0) @binding(1) var<storage, read_write> distances: Distances;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>, @builtin(num_workgroups) num_groups: vec3<u32>) {
    let totalSize = num_groups.x * ${Et};

    let bxi = global_id.x * ${Et};
    let byj = global_id.y * ${Et};
    let bz = global_id.z;

    for (var k = 0u; k < ${Et}; k++) {
        for (var i = 0u; i < ${Et} && bxi + i < totalSize; i++) {
            for (var j = 0u; j < ${Et} && byj + j < totalSize; j++) {
                let ik = (bxi + i) * totalSize + byj + k + bz * ${Et};
                let kj = (bxi + k + bz * ${Et}) * totalSize + byj + j;
                let ij = (bxi + i) * totalSize + byj + j;

                let ikj = adjMatrix.data[ik] + adjMatrix.data[kj];
                if (ikj < adjMatrix.data[ij]) {
                    distances.data[ij] = ikj;
                }
            }
        }
    }
}
`;class oh{device;pipeline;bindGroup;bindGroupLayout;constructor(){}async computeShortestPaths(t,e){const s=new Float32Array(e*e);t.forEach((l,c)=>{s.set(l,c*e)});const[n,r]=await this.computeShortestPathsF32(s,e),o=new Array(e);for(let l=0;l<e;l++)o[l]=Array.of(n.slice(l*e,l*e+e-1));const a=new Array(e);for(let l=0;l<e;l++)a[l]=Array.of(r.slice(l*e,l*e+e-1));return[o,a]}async computeShortestPathsF32(t,e){if(await this.initialize(),!this.device||!this.pipeline||!this.bindGroupLayout)throw new Error(`WebGPU is not available device=${!!this.device}, pipeline=${this.pipeline} bindGroupLayout=${!!this.bindGroupLayout}`);const s=e*e*4,n=this.device.createBuffer({size:s,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC,mappedAtCreation:!0}),r=this.device.createBuffer({size:s,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ,mappedAtCreation:!0}),o=this.device.createBuffer({size:s,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ,mappedAtCreation:!0}),a=this.device.createCommandEncoder();a.copyBufferToBuffer(n,0,r,0,s),a.copyBufferToBuffer(n,0,o,1,s);const l=a.finish();this.device.queue.submit([l]),await r.mapAsync(GPUMapMode.READ),r.getMappedRange(),new Float32Array(r.getMappedRange()).set(t),r.unmap(),await o.mapAsync(GPUMapMode.READ),o.getMappedRange(),new Int32Array(o.getMappedRange()).fill(0),o.unmap(),this.bindGroup=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:n}}]});const c=Math.ceil(e/Et);this.dispatchShader(c,c,e);const h=e%Et;h&&(this.dispatchShader(c,h,e),this.dispatchShader(h,c,e),this.dispatchShader(h,h,e));const d=new Float32Array(e*e);await r.mapAsync(GPUMapMode.READ),d.set(new Float32Array(r.getMappedRange())),r.unmap();const u=new Int32Array(e*e);return await o.mapAsync(GPUMapMode.READ),u.set(new Float32Array(o.getMappedRange())),o.unmap(),[d,u]}async initialize(){const t=await navigator.gpu.requestAdapter();if(!t)throw new Error("GPU is not available");this.device||(this.device=await t.requestDevice(),this.bindGroupLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),this.pipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.bindGroupLayout]}),compute:{module:this.device.createShaderModule({code:rh}),entryPoint:"main"}}))}dispatchShader(t,e,s){if(!this.device||!this.pipeline||!this.bindGroupLayout||!this.bindGroup)throw new Error("WebGPU is not available");const n=this.device.createCommandEncoder(),r=n.beginComputePass();r.setPipeline(this.pipeline),r.setBindGroup(0,this.bindGroup),r.dispatchWorkgroups(t,e,s),r.end();const o=n.finish();this.device.queue.submit([o])}}const _t=16;class ah{computeShortestPaths(t){const e=t.length,s=new Array(e),n=new Array(e);for(let r=0;r<e;r++){s[r]=new Array(e),n[r]=new Array(e);for(let o=0;o<e;o++)s[r][o]=t[r][o],n[r][o]=o}for(let r=0;r<e;r+=_t)for(let o=0;o<e;o+=_t)for(let a=0;a<e;a+=_t)for(let l=r;l<Math.min(e,r+_t);l++)for(let c=o;c<Math.min(e,o+_t);c++)for(let h=a;h<Math.min(e,a+_t);h++)s[c][l]+s[l][h]<s[c][h]&&(s[c][h]=s[c][l]+s[l][h],n[c][h]=n[c][l]);for(let r=0;r<e;r++)for(let o=0;o<e;o++)for(let a=0;a<e;a++)s[o][r]+s[r][a]<s[o][a]&&(s[o][a]=s[o][r]+s[r][a],n[o][a]=n[o][r]);return[s,n]}}class lh{floydWarshall;floydWarshallGPU;constructor(){}async computeShortestPaths(t,e,s){switch(t){case xe.FloydWarshall:return this.floydWarshall||(this.floydWarshall=new ah),this.floydWarshall.computeShortestPaths(e);case xe.FloydWarshallGPU:return this.floydWarshallGPU||(this.floydWarshallGPU=new oh),await this.floydWarshallGPU.computeShortestPaths(e,s);case xe.Johnson:return Promise.resolve([]);default:throw new Error("Unsupported algorithm")}}}class bi{static MINIMUM_MANUFACTURING_SHARE_NUMERATOR=.1;id;agricultureShare;manufacturingShare;income=0;priceIndex=1;realWage=1;nominalWage=1;constructor(t,e,s){this.id=t,this.manufacturingShare=e,this.agricultureShare=s,this.reset()}reset(){this.income=0,this.priceIndex=1,this.realWage=1,this.nominalWage=1}setManufacturingShare(t){this.manufacturingShare=t}setAgricultureShare(t){this.agricultureShare=t}updateIncome(t){this.income=t*this.manufacturingShare*this.nominalWage+(1-t)*this.agricultureShare}updatePriceIndex(t,e,s){const n=t.reduce((r,o)=>e.transportCostMatrix[this.id]?r+o.manufacturingShare*Math.pow(o.nominalWage*e.transportCostMatrix[this.id][o.id],1-s):r,0);this.priceIndex=Math.pow(n,1/(1-s))}updateRealWage(t){this.realWage=this.nominalWage*Math.pow(this.priceIndex,-1*t)}updateNominalWage(t,e,s){const n=t.reduce((r,o)=>e.transportCostMatrix[this.id]?r+o.income*Math.pow(e.transportCostMatrix[this.id][o.id],1-s)*Math.pow(o.priceIndex,s-1):r,0);this.nominalWage=Math.pow(n,1/s)}updateDynamics(t,e,s){const n=t*(this.realWage-e)*this.manufacturingShare,r=bi.MINIMUM_MANUFACTURING_SHARE_NUMERATOR/s;this.manufacturingShare>r?this.manufacturingShare+=n:this.manufacturingShare=r}}function ch(i,t,e,s){const n=i.length;let r=[];for(let o=0;o<n;o++)for(let a=o+1;a<n;a++)if(e[o][a]==Number.POSITIVE_INFINITY){const c=Math.sqrt((t[o].x-t[1].x)**2+(t[0].y-t[1].y)**2);r.push([o,a,c])}if(r.sort((o,a)=>a[2]-o[2]),r.length!=0){for(let o=0;o<s&&s<r.length;o++){const a=Math.floor(Math.sqrt(Je())*r.length),l=r[o];r[o]=r[a],r[a]=l}for(let o=0;o<s;o++){const a=r[o],l=a[0],c=a[1],h=Math.sqrt(a[2]);e[l][c]=h,e[c][l]=h,o++}}}function fn(i,t,e){const s=Math.sqrt((i.x-t.x)**2+(i.y-t.y)**2);return e[i.id][t.id]=s,e[t.id][i.id]=s,e}function hh(i,t,e){return e[i.id][t.id]=Number.POSITIVE_INFINITY,e[t.id][i.id]=Number.POSITIVE_INFINITY,e}const dh=new lh;class uh extends cr{nodes;routes;graphUpdateListeners;adjacencyMatrixChangeListeners;canvas;constructor(t,e,s){super(t,e),this.canvas=s,this.nodes=[],this.routes=[],this.graphUpdateListeners=[],this.adjacencyMatrixChangeListeners=[]}addGraphUpdateListener(t){this.graphUpdateListeners.push(t)}notifyGraphUpdate(){this.graphUpdateListeners.forEach(t=>t())}addAdjacencyMatrixListener(t){this.adjacencyMatrixChangeListeners.push(t)}notifyAdjacencyMatrixChanged(){this.adjacencyMatrixChangeListeners.forEach(t=>t())}findClosestElementId(t,e){if(this.nodes.length===0)return null;let s=null,n=Number.POSITIVE_INFINITY;for(let r of this.nodes){const o=this.distance(t,e,r.x,r.y);o<r.radius+2&&o<n&&(n=o,s=r)}return s?s.id:null}createAdjacencyMatrix(t){const e=this.country.regions.length,s=new Array(t);for(let n=0;n<t;n++){const r=new Array(t);if(r.fill(Number.POSITIVE_INFINITY),n<e){for(let o=0;o<t;o++)if(this.country.matrices.adjacencyMatrix&&this.country.matrices.adjacencyMatrix[n]&&this.country.matrices.adjacencyMatrix[n][o]&&0<this.country.matrices.adjacencyMatrix[n][o]&&this.country.matrices.adjacencyMatrix[n][o]<Number.POSITIVE_INFINITY&&this.nodes[n]&&this.nodes[o]){const a=Math.sqrt((this.nodes[n].x-this.nodes[o].x)**2+(this.nodes[n].y-this.nodes[o].y)**2);r[o]=a}}r[n]=0,s[n]=r}if(1<e&&1<this.nodes.length){for(let n=e;1<=n&&n<t;n++)if(this.nodes[n]&&this.nodes[n-1]){const r=Math.sqrt((this.nodes[n].x-this.nodes[n-1].x)**2+(this.nodes[n].y-this.nodes[n-1].y)**2);s[n][n-1]=r,s[n-1][n]=r}}return s}async createDistanceMatrix(){const t=this.country.matrices.adjacencyMatrix,e=t.length;return dh.computeShortestPaths(xe.FloydWarshall,t,e)}createTransportCostMatrix(){const t=this.country.matrices.distanceMatrix.length;let e=0;for(let r=0;r<t;r++)if(this.country.matrices.distanceMatrix&&r<this.country.matrices.distanceMatrix.length)for(let o=0;o<t;o++)o<this.country.matrices.distanceMatrix[r].length&&this.country.matrices.distanceMatrix[r][o]!=Number.POSITIVE_INFINITY&&(e=Math.max(this.country.matrices.distanceMatrix[r][o],e));const s=new Array(t);for(let r=0;r<t;r++)s[r]=new Array(t);if(e==0)return s;const n=Math.log(this.country.transportCost);for(let r=0;r<t;r++)if(this.country.matrices.distanceMatrix&&r<this.country.matrices.distanceMatrix.length){for(let o=r;o<t;o++)if(o<this.country.matrices.distanceMatrix[r].length)if(this.country.matrices.distanceMatrix[r][o]!=Number.POSITIVE_INFINITY){const a=this.country.matrices.distanceMatrix[r][o]/e;s[o][r]=s[r][o]=Math.exp(n*a)}else s[o][r]=s[r][o]=Number.POSITIVE_INFINITY}return s}async addEdge(t){if(!(this.selectedRegionIds.length<2)){for(let e=0;e<this.selectedRegionIds.length;e++){const s=this.nodes[this.selectedRegionIds[e]],n=e!=this.selectedRegionIds.length-1?this.nodes[this.selectedRegionIds[e+1]]:this.nodes[0];this.country.matrices.adjacencyMatrix=fn(s,n,this.country.matrices.adjacencyMatrix)}this.updateMatrices()}}async removeEdge(t){if(this.selectedRegionIds.length!=0){for(let e=0;e<this.selectedRegionIds.length;e++){const s=this.nodes[this.selectedRegionIds[e]],n=e!=this.selectedRegionIds.length-1?this.nodes[this.selectedRegionIds[e+1]]:this.nodes[0];this.country.matrices.adjacencyMatrix=hh(s,n,this.country.matrices.adjacencyMatrix)}this.updateMatrices()}}appendRegions(t,e){const s=this.canvas.getContext("2d").getTransform().inverse(),n=s.transformPoint(new DOMPoint(this.canvas.width/2,this.canvas.height/2)),r=s.transformPoint(new DOMPoint(0,0)),o=s.transformPoint(new DOMPoint(this.canvas.width,this.canvas.height)),a=t+this.country.regions.length;for(let c=this.nodes.length;c<a;c++){const h=nh(c,r,o,c==0?n:this.nodes[c-1]);this.nodes.push(h)}for(let c=0;c<this.country.regions.length;c++)this.country.regions[c].manufacturingShare=1/a,this.country.regions[c].agricultureShare=1/a;for(let c=this.country.regions.length;c<a;c++)this.country.regions.push(new bi(c,1/a,1/a));this.country.disturb(),this.country.matrices.adjacencyMatrix=this.country.matrices.create2DArray(a,this.country.matrices.adjacencyMatrix);const l=e?Math.ceil(Math.sqrt(this.country.regions.length*2))*5:1;if(t>1)ch(this.country.regions,this.nodes,this.country.matrices.adjacencyMatrix,l);else if(this.selectedRegionIds.length>0){const c=this.selectedRegionIds[this.selectedRegionIds.length-1],h=this.nodes[c],d=this.nodes[this.nodes.length-1];this.country.matrices.adjacencyMatrix=fn(h,d,this.country.matrices.adjacencyMatrix)}this.updateMatrices()}extractRegions(t,e){this.nodes=this.nodes.filter(s=>e.includes(s.id)),this.nodes.forEach((s,n)=>s.id=n),this.country.regions=this.country.regions.filter(s=>e.includes(s.id)),this.country.regions.forEach((s,n)=>s.id=n),this.country.matrices.adjacencyMatrix=this.country.matrices.extractDiagonal(this.country.matrices.adjacencyMatrix,e),this.updateMatrices()}distance(t,e,s,n){const r=s-t,o=n-e;return Math.sqrt(r*r+o*o)}updateMatrices(){(async()=>([this.country.matrices.distanceMatrix,this.country.matrices.predecessorMatrix]=await this.createDistanceMatrix(),this.country.matrices.transportCostMatrix=this.createTransportCostMatrix(),this.notifyAdjacencyMatrixChanged()))()}}class fh extends cr{createAdjacencyMatrix(t){const e=new Array(t);if(t==0)return[[]];for(let s=0;s<t;s++)e[s]=new Array(t);e[0].fill(Number.POSITIVE_INFINITY),e[0][0]=0;for(let s=1;s<t;s++)e[s].fill(Number.POSITIVE_INFINITY),e[s][s]=0,e[s-1][s]=1,e[s][s-1]=1;return e[t-1][0]=1,e[0][t-1]=1,e}async createDistanceMatrix(){const t=this.country.regions.length,e=new Array(t),s=new Array(t);for(let n=0;n<t;n++){e[n]=new Array(t),s[n]=new Array(t);for(let r=0;r<t;r++)if(n===r)e[n][r]=0,s[n][r]=n;else{const o=Math.abs(r-n),a=t-o;e[n][r]=Math.min(o,a),s[n][r]=o<a?n+1:n-1,s[n][r]=s[n][r]==-1?t-1:s[n][r]==t?0:s[n][r]}}return[e,s]}createTransportCostMatrix(){const t=this.country.regions.length,e=new Array(t);for(let n=0;n<t;n++)e[n]=new Array(t);const s=Math.log(this.country.transportCost);for(let n=0;n<t;n++)if(this.country.matrices.distanceMatrix[n])for(let r=n;r<t;r++){const o=2*this.country.matrices.distanceMatrix[n][r]/t;e[n][r]=e[r][n]=Math.exp(s*o)}return e}appendRegions(t){const e=new Array;if(this.country.regions)for(const s of this.country.regions)s.manufacturingShare=1/t,s.agricultureShare=1/t,e.push(s);for(let s=e.length;s<t;s++)e.push(new bi(e.length,1/t,1/t));this.country.regions=e}extractRegions(t){const e=this.country.regions.slice(0,t);for(const s of e)s.manufacturingShare=1/t,s.agricultureShare=1/t;this.country.regions=e,console.log(" extractRegions",t,e.length,this.country.regions.length)}}class gh{temperature=0;model;nodes;width;height;minimumVelocityThreshold=.014;minimumVelocity=Number.POSITIVE_INFINITY;constructor(t,e,s,n){this.model=t,this.nodes=e,this.width=s,this.height=n,this.reset(),this.model.addNumRegionsChangedListener(()=>{this.reset()}),_.getLayoutTimer().addTimeEventListener(()=>{this.tick()}),_.getLayoutTimer().start()}reset(){this.minimumVelocity=Number.POSITIVE_INFINITY}calculateFrictionalForce(t){return{dx:-.1*t.x,dy:-.1*t.y}}calculateDistance(t,e){const s=t.x-e.x,n=t.y-e.y;return Math.sqrt(s*s+n*n)}tick(){if(!(this.minimumVelocity<this.minimumVelocityThreshold)){for(let t=0;t<this.nodes.length;t++){if(this.model?.focusedRegionIds.includes(t))continue;let e=0,s=0;for(let o=0;o<this.nodes.length;o++)if(t!==o){const a=this.calculateRepulsion(this.temperature,this.nodes[t],this.nodes[o]);e+=a.dx,s+=a.dy}const n=this.model?.country.matrices.adjacencyMatrix;for(let o=0;o<this.nodes.length;o++)if(n&&n.length&&n[t]&&0<n[t].length&&0<n[t][o]&&n[t][o]<Number.POSITIVE_INFINITY){n[t][o]=this.calculateDistance(this.nodes[t],this.nodes[o]);const a=this.calculateAttraction(this.temperature,this.nodes[t],this.nodes[o]);e+=a.dx,s+=a.dy}const r=this.calculateFrictionalForce({x:e,y:s});e+=r.dx,s+=r.dy,this.nodes[t].x+=e,this.nodes[t].y+=s,this.minimumVelocity=Math.min(Math.max(Math.abs(e),Math.abs(s)),this.minimumVelocity)}this.decreaseTemperature(),this.minimumVelocity<this.minimumVelocityThreshold&&(this.temperature=0,this.model.notifyGraphUpdate())}}}class ph extends gh{reset(){super.reset(),this.temperature=1}calculateRepulsion(t,e,s){const n=e.x-s.x,r=e.y-s.y,o=n*n+r*r,a=Math.sqrt(o);if(a<Number.EPSILON){const h=[{dx:0,dy:-1},{dx:1,dy:0},{dx:0,dy:1},{dx:-1,dy:0}];return h[Math.floor(Math.random()*h.length)]}const c=500/o;return{dx:c*n/a,dy:c*r/a}}calculateAttraction(t,e,s){const n=e.x-s.x,r=e.y-s.y,o=Math.sqrt(n*n+r*r);if(o<Number.EPSILON){const h=[{dx:0,dy:-1},{dx:1,dy:0},{dx:0,dy:1},{dx:-1,dy:0}];return h[Math.floor(Math.random()*h.length)]}const c=-.01*(o-100);return{dx:c*n/o,dy:c*r/o}}decreaseTemperature(){}}vc().register(bc(),ic(),lc(),oc(),nc(),pc({thumb:'<div style="background-color: #fff; border: 1px solid #777;border-radius: 3px; width: 16px; height: 16px; "></div>'}),dc());const Le=new URLSearchParams(location.search),mh=Le.get("app")||"raceTrack",He=parseInt(Le.get("K")||"12"),hr=parseFloat(Le.get("pi")||"0.2"),dr=parseFloat(Le.get("tau")||"2"),ur=parseFloat(Le.get("sigma")||"4"),k=new Fc;function fr(){const i=document.getElementById("canvasDivContainer"),t=document.getElementById("raceTrackCanvas"),e=document.getElementById("graphCanvas"),s=document.getElementById("barChartCanvas"),n=i.clientWidth-30;t.setAttribute("width",`${n*.65}`),e.setAttribute("width",`${n*.65}`),s.setAttribute("width",`${n*.35}`);const r=500;t.setAttribute("height",`${r}`),e.setAttribute("height",`${r}`),s.setAttribute("height",`${r}`)}function gr(i,t,e,s){for(let n=0;n<t.length;n++)for(let r=0;r<t.length;r++)k.diagonalTableViewSet.decorateTable(i,t[n]+1,t[r]+1,e,s)}function bh(){const i=new Zt(He,hr,dr,ur),t=new fh(i,1),e=new Rc;e.setModel(t),t.addResetListener(()=>{e.draw(),k.barChartView.draw()}),t.addRegionSelectListener((s,n,r,o)=>{gr(s,n,r,o),o?t.focusedRegionIds=n:t.focusedRegionIds=[],k.barChartView.draw(),e.draw()}),t.addNumRegionsChangedListener(async()=>{const s=k.sliderSet.numRegionsSlider.valueAsNumber;t.adjustRegions(s),t.updateAdjacencyMatrix(),await t.updateDistanceMatrixAndTransportCostMatrix(),t.country.resetRegions(),e.draw(),await k.update()}),t.addTransportCostChangeListener(async()=>{i.matrices.transportCostMatrix=t.createTransportCostMatrix(),e.draw(),await k.update()}),t.timer?.addTimeEventListener(()=>{e.draw(),k.barChartView.draw()}),window.addEventListener("resize",()=>{e.draw()}),rr("raceTrack",()=>{k.setModel(t),t.notifyNumRegionsChanged(),k.visualizerTypeSelector.incomeVisualizer.disabled=!1,k.visualizerTypeSelector.priceIndexVisualizer.disabled=!1,k.visualizerTypeSelector.nominalWageVisualizer.disabled=!1,k.visualizerTypeSelector.realWageVisualizer.disabled=!1,k.update()},()=>{t?.stop()})}async function vh(){const i=document.getElementById("graphCanvas"),t=new Zt(He,hr,dr,ur),e=new uh(t,1,i),s=new kc(i,e),n=new ph(e,e.nodes,i.width,i.height);e.addStartListener(()=>{s.updateGraphEditorButtonState()}),e.addStopListener(()=>{s.updateGraphEditorButtonState()}),e.addResetListener(()=>{s.draw(),k.barChartView.draw()}),e.addRegionSelectListener((r,o,a,l)=>{gr(r,o,a,l),l?a==T.FOCUSED?e.focusedRegionIds=o:a==T.SELECTED&&(e.selectedRegionIds=o):a==T.FOCUSED?e.focusedRegionIds=[]:e.selectedRegionIds=[],s.draw(),k.barChartView.draw()}),e.addNumRegionsChangedListener(async()=>{const r=k.sliderSet.numRegionsSlider.valueAsNumber;await e.adjustRegions(r),e.updateAdjacencyMatrix(),await e.updateDistanceMatrixAndTransportCostMatrix(),await k.diagonalTableViewSet.updateTableContent(),e.country.resetRegions(),s.draw(),k.sliderSet.numRegionsElem.innerText=`${e.nodes.length}`,await k.update()}),e.addGraphUpdateListener(async()=>{e.updateAdjacencyMatrix(),await e.updateDistanceMatrixAndTransportCostMatrix(),await k.diagonalTableViewSet.updateTableContent(),s.draw(),await k.update()}),e.addAdjacencyMatrixListener(async()=>{await k.diagonalTableViewSet.updateTableContent(),await k.update(),s.draw()}),e.addTransportCostChangeListener(async()=>{await k.diagonalTableViewSet.updateTableContent(),await k.update(),s.draw()}),e.timer?.addTimeEventListener(async()=>{s.draw(),k.tick()}),s.setModel(e),e.appendRegions(He,!0),s.fitToScreen(),s.draw(),window.addEventListener("resize",()=>{n.reset(),s.draw()}),rr("graph",()=>{k.setModel(e),e.setNumRegions(He),k.visualizerTypeSelector.incomeVisualizer.disabled=!0,k.visualizerTypeSelector.priceIndexVisualizer.disabled=!0,k.visualizerTypeSelector.nominalWageVisualizer.disabled=!0,k.visualizerTypeSelector.realWageVisualizer.disabled=!0,_.getLayoutTimer().start(),k.update()},()=>{e?.stop()})}window.addEventListener("resize",()=>{fr(),k.barChartView.draw()});window.addEventListener("load",async()=>{switch(fr(),bh(),await vh(),mh){case"raceTrack":ir(!1);break;case"graph":default:sr(!1);break}});
