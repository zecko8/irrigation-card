/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const s=this.t;if(t&&void 0===e){const t=void 0!==s&&1===s.length;t&&(e=i.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&i.set(s,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1]),e[0]);return new r(i,e,s)},a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:n,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,v=p.trustedTypes,g=v?v.emptyScript:"",m=p.reactiveElementPolyfillSupport,f=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},b=(e,t)=>!n(e,t),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&l(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:r}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const o=i?.call(this);r?.call(this,t),this.requestUpdate(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(t)s.adoptedStyleSheets=i.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const t of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(t,s.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=i,this[i]=r.fromAttribute(t,e.type)??this._$Ej?.get(i)??null,this._$Em=null}}requestUpdate(e,t,s){if(void 0!==e){const i=this.constructor,r=this[e];if(s??=i.getPropertyOptions(e),!((s.hasChanged??b)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((e=>e.hostUpdate?.())),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[f("elementProperties")]=new Map,_[f("finalized")]=new Map,m?.({ReactiveElement:_}),(p.reactiveElementVersions??=[]).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=x.trustedTypes,S=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+k,C=`<${E}>`,P=document,O=()=>P.createComment(""),R=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,z="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,M=/>/g,D=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,I=/"/g,j=/^(?:script|style|textarea|title)$/i,V=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),L=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),F=new WeakMap,B=P.createTreeWalker(P,129);function W(e,t){if(!U(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const s=e.length-1,i=[];let r,o=2===t?"<svg>":3===t?"<math>":"",a=N;for(let t=0;t<s;t++){const s=e[t];let n,l,c=-1,d=0;for(;d<s.length&&(a.lastIndex=d,l=a.exec(s),null!==l);)d=a.lastIndex,a===N?"!--"===l[1]?a=T:void 0!==l[1]?a=M:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=D):void 0!==l[3]&&(a=D):a===D?">"===l[0]?(a=r??N,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?D:'"'===l[3]?I:H):a===I||a===H?a=D:a===T||a===M?a=N:(a=D,r=void 0);const h=a===D&&e[t+1].startsWith("/>")?" ":"";o+=a===N?s+C:c>=0?(i.push(n),s.slice(0,c)+A+s.slice(c)+k+h):s+k+(-2===c?t:h)}return[W(e,o+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class G{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,o=0;const a=e.length-1,n=this.parts,[l,c]=J(e,t);if(this.el=G.createElement(l,s),B.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=B.nextNode())&&n.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(A)){const t=c[o++],s=i.getAttribute(e).split(k),a=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:a[2],strings:s,ctor:"."===a[1]?X:"?"===a[1]?ee:"@"===a[1]?te:Q}),i.removeAttribute(e)}else e.startsWith(k)&&(n.push({type:6,index:r}),i.removeAttribute(e));if(j.test(i.tagName)){const e=i.textContent.split(k),t=e.length-1;if(t>0){i.textContent=w?w.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],O()),B.nextNode(),n.push({type:2,index:++r});i.append(e[t],O())}}}else if(8===i.nodeType)if(i.data===E)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(k,e+1));)n.push({type:7,index:r}),e+=k.length-1}r++}}static createElement(e,t){const s=P.createElement("template");return s.innerHTML=e,s}}function K(e,t,s=e,i){if(t===L)return t;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=R(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(t=K(e,r._$AS(e,t.values),r,i)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??P).importNode(t,!0);B.currentNode=i;let r=B.nextNode(),o=0,a=0,n=s[0];for(;void 0!==n;){if(o===n.index){let t;2===n.type?t=new Z(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new se(r,this,e)),this._$AV.push(t),n=s[++a]}o!==n?.index&&(r=B.nextNode(),o++)}return B.currentNode=P,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),R(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==L&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>U(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=G.createElement(W(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Y(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=F.get(e.strings);return void 0===t&&F.set(e.strings,t=new G(e)),t}k(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new Z(this.O(O()),this.O(O()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(e,t=this,s,i){const r=this.strings;let o=!1;if(void 0===r)e=K(this,e,t,0),o=!R(e)||e!==this._$AH&&e!==L,o&&(this._$AH=e);else{const i=e;let a,n;for(e=r[0],a=0;a<r.length-1;a++)n=K(this,i[s+a],t,a),n===L&&(n=this._$AH[a]),o||=!R(n)||n!==this._$AH[a],n===q?e=q:e!==q&&(e+=(n??"")+r[a+1]),this._$AH[a]=n}o&&!i&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ee extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class te extends Q{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??q)===L)return;const s=this._$AH,i=e===q&&s!==q||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}}const ie=x.litHtmlPolyfillSupport;ie?.(G,Z),(x.litHtmlVersions??=[]).push("3.3.0");const re=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class oe extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=s?.renderBefore??null;i._$litPart$=r=new Z(t.insertBefore(O(),e),e,void 0,s??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}oe._$litElement$=!0,oe.finalized=!0,re.litElementHydrateSupport?.({LitElement:oe});const ae=re.litElementPolyfillSupport;ae?.({LitElement:oe}),(re.litElementVersions??=[]).push("4.2.0");const ne=o`
  :host {
    display: block;
    padding: 16px;
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow, none);
    border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color));
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--divider-color);
  }

  .card-title {
    font-size: 1.2em;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
  }

  .system-info {
    display: flex;
    gap: 12px;
    font-size: 0.8em;
    color: var(--secondary-text-color);
  }

  .status-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 4px;
  }

  .status-online {
    background-color: var(--success-color, #4caf50);
  }

  .status-offline {
    background-color: var(--error-color, #f44336);
  }

  .valves-container {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .valve-card {
    background: var(--secondary-background-color);
    border-radius: 8px;
    padding: 16px;
    border: 1px solid var(--divider-color);
  }

  .valve-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .valve-name {
    font-weight: 500;
    color: var(--primary-text-color);
    font-size: 1em;
  }

  .valve-status {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8em;
    color: var(--secondary-text-color);
  }

  .valve-controls {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  .btn {
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8em;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .btn-primary {
    background: var(--primary-color);
    color: var(--text-primary-color);
  }

  .btn-success {
    background: var(--success-color, #4caf50);
    color: white;
  }

  .btn-danger {
    background: var(--error-color, #f44336);
    color: white;
  }

  .btn-secondary {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    border: 1px solid var(--divider-color);
  }

  .btn-warning {
    background: var(--warning-color, #ff9800);
    color: white;
  }

  .valve-schedule {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--divider-color);
  }

  .schedule-title {
    font-size: 0.8em;
    font-weight: 500;
    color: var(--secondary-text-color);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .schedule-days {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .schedule-day {
    background: var(--primary-color);
    color: var(--text-primary-color);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7em;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .schedule-day:hover {
    background: var(--primary-color-dark, var(--primary-color));
    transform: translateY(-1px);
  }

  .schedule-day.empty {
    background: var(--disabled-color, #ccc);
    color: var(--secondary-text-color);
  }

  .schedule-day.empty:hover {
    background: var(--primary-color);
    color: var(--text-primary-color);
  }

  .error-message {
    background: var(--error-color);
    color: white;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 16px;
    font-size: 0.9em;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: var(--secondary-text-color);
  }

  .duration-input {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  .duration-input input {
    width: 60px;
    padding: 4px 8px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }

  .duration-input label {
    font-size: 0.8em;
    color: var(--secondary-text-color);
  }

  .valve-flags {
    display: flex;
    gap: 4px;
    margin-top: 8px;
  }

  .flag {
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7em;
    font-weight: 500;
  }

  .flag-override {
    background: var(--warning-color, #ff9800);
    color: white;
  }

  .flag-skip {
    background: var(--info-color, #2196f3);
    color: white;
  }

  @media (max-width: 600px) {
    .valves-container {
      grid-template-columns: 1fr;
    }
    
    .valve-controls {
      flex-direction: column;
    }
    
    .btn {
      width: 100%;
      justify-content: center;
    }
  }

  /* Stili per l'editor di programmazione */
  .schedule-editor-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .schedule-editor {
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: 12px;
    padding: 24px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .schedule-editor-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--divider-color);
  }

  .schedule-editor-title {
    font-size: 1.1em;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
  }

  .schedule-entries {
    margin: 16px 0;
  }

  .schedule-entry {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--secondary-background-color);
    border-radius: 8px;
    margin-bottom: 8px;
  }

  .schedule-entry-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .schedule-entry-label {
    font-size: 0.8em;
    color: var(--secondary-text-color);
    font-weight: 500;
  }

  .schedule-entry-input {
    padding: 6px 8px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    background: var(--ha-card-background, white);
    color: var(--primary-text-color);
    font-size: 0.9em;
  }

  .schedule-entry-input:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  .schedule-entry-remove {
    background: var(--error-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
  }

  .schedule-editor-actions {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--divider-color);
  }

  .add-schedule-btn {
    background: var(--success-color);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8em;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .add-schedule-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .schedule-editor-buttons {
    display: flex;
    gap: 8px;
  }

  .btn-close {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    border: 1px solid var(--divider-color);
  }

  .btn-save {
    background: var(--primary-color);
    color: var(--text-primary-color);
  }
`;class le{constructor(e,t,s){this.baseUrl=e.replace(/\/$/,""),this.auth=btoa(`${t}:${s}`)}async makeRequest(e,t={}){const s=`${this.baseUrl}${e}`,i={Authorization:`Basic ${this.auth}`,"Content-Type":"application/json",...t.headers};try{const e=await fetch(s,{...t,headers:i});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){throw console.error("API request failed:",e),e}}async getValves(){return this.makeRequest("/api/valves")}async getValve(e){return this.makeRequest(`/api/valves/${e}`)}async setValveStatus(e,t,s=null){const i={status:t};return null!==s&&(i.duration=s),this.makeRequest(`/api/valves/${e}/status`,{method:"POST",body:JSON.stringify(i)})}async updateSchedule(e,t,s){return this.makeRequest(`/api/valves/${e}/schedule/${t}`,{method:"PUT",body:JSON.stringify(s)})}async updateValveName(e,t){return this.makeRequest(`/api/valves/${e}/name`,{method:"PUT",body:JSON.stringify({name:t})})}async resetValve(e){return this.makeRequest(`/api/valves/${e}/reset`,{method:"POST"})}async setSkipNext(e,t){return this.makeRequest(`/api/valves/${e}/skip_next`,{method:"POST",body:JSON.stringify({skip:t})})}async getSystemStatus(){return this.makeRequest("/api/system/status")}async restartSystem(){return this.makeRequest("/api/system/restart",{method:"POST"})}async getVersion(){return this.makeRequest("/api/version")}}customElements.define("irrigation-card-editor",class extends oe{static get properties(){return{hass:{type:Object},config:{type:Object}}}static get styles(){return o`
      .config-section {
        margin-bottom: 16px;
      }

      .config-label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .config-input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
      }

      .config-input:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .config-description {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      .config-checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
      }

      .config-checkbox input {
        margin: 0;
      }
    `}setConfig(e){this.config={...e}}render(){return this.config?V`
      <div class="config-section">
        <label class="config-label" for="url">URL Backend</label>
        <input
          type="url"
          id="url"
          class="config-input"
          .value="${this.config.url||""}"
          @input="${this._valueChanged}"
          placeholder="https://192.168.1.100:5000"
        />
        <div class="config-description">
          URL completo del tuo backend di irrigazione (incluso https:// e porta)
        </div>
      </div>

      <div class="config-section">
        <label class="config-label" for="username">Username</label>
        <input
          type="text"
          id="username"
          class="config-input"
          .value="${this.config.username||""}"
          @input="${this._valueChanged}"
          placeholder="admin"
        />
        <div class="config-description">
          Nome utente per l'autenticazione al backend
        </div>
      </div>

      <div class="config-section">
        <label class="config-label" for="password">Password</label>
        <input
          type="password"
          id="password"
          class="config-input"
          .value="${this.config.password||""}"
          @input="${this._valueChanged}"
          placeholder="password"
        />
        <div class="config-description">
          Password per l'autenticazione al backend
        </div>
      </div>

      <div class="config-section">
        <label class="config-label" for="title">Titolo Card (opzionale)</label>
        <input
          type="text"
          id="title"
          class="config-input"
          .value="${this.config.title||""}"
          @input="${this._valueChanged}"
          placeholder="Sistema Irrigazione"
        />
        <div class="config-description">
          Titolo personalizzato da mostrare nella card
        </div>
      </div>

      <div class="config-section">
        <label class="config-label" for="refresh_interval">Intervallo Aggiornamento (secondi)</label>
        <input
          type="number"
          id="refresh_interval"
          class="config-input"
          .value="${this.config.refresh_interval||30}"
          @input="${this._valueChanged}"
          min="5"
          max="300"
          placeholder="30"
        />
        <div class="config-description">
          Frequenza di aggiornamento automatico (5-300 secondi)
        </div>
      </div>

      <div class="config-section">
        <div class="config-checkbox">
          <input
            type="checkbox"
            id="show_schedule"
            .checked="${!1!==this.config.show_schedule}"
            @change="${this._valueChanged}"
          />
          <label for="show_schedule">Mostra programmazione valvole</label>
        </div>
        <div class="config-description">
          Mostra informazioni sulla programmazione settimanale delle valvole
        </div>
      </div>

      <div class="config-section">
        <div class="config-checkbox">
          <input
            type="checkbox"
            id="show_system_info"
            .checked="${!1!==this.config.show_system_info}"
            @change="${this._valueChanged}"
          />
          <label for="show_system_info">Mostra informazioni sistema</label>
        </div>
        <div class="config-description">
          Mostra stato del sistema, versione e uptime
        </div>
      </div>
    `:V``}_valueChanged(e){if(!this.config||!this.hass)return;const t=e.target,s="checkbox"===t.type?t.checked:t.value;if(this.config[t.id]===s)return;const i={...this.config,[t.id]:s};Object.keys(i).forEach((e=>{""!==i[e]&&null!==i[e]&&void 0!==i[e]||delete i[e]}));const r=new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0});this.dispatchEvent(r)}});customElements.define("irrigation-card",class extends oe{static get properties(){return{hass:{type:Object},config:{type:Object},valves:{type:Array},systemStatus:{type:Object},loading:{type:Boolean},error:{type:String},lastUpdate:{type:Number},editingSchedule:{type:Object},scheduleForm:{type:Object}}}static get styles(){return ne}constructor(){super(),this.valves=[],this.systemStatus=null,this.loading=!0,this.error=null,this.lastUpdate=0,this.refreshInterval=null,this.api=null,this.editingSchedule=null,this.scheduleForm={}}setConfig(e){if(!(e&&e.url&&e.username&&e.password))throw new Error("La configurazione deve includere: url, username, password");this.config={refresh_interval:30,show_schedule:!0,show_system_info:!0,...e},this.api=new le(this.config.url,this.config.username,this.config.password),this._setupRefresh(),this._loadData()}static getConfigElement(){return document.createElement("irrigation-card-editor")}static getStubConfig(){return{url:"https://192.168.1.100:5000",username:"admin",password:"password",title:"Sistema Irrigazione",refresh_interval:30,show_schedule:!0,show_system_info:!0}}connectedCallback(){super.connectedCallback(),this._setupRefresh(),this.api&&this._loadData()}disconnectedCallback(){super.disconnectedCallback(),this._clearRefresh()}_setupRefresh(){this._clearRefresh(),this.config&&this.config.refresh_interval&&(this.refreshInterval=setInterval((()=>{this._loadData()}),1e3*this.config.refresh_interval))}_clearRefresh(){this.refreshInterval&&(clearInterval(this.refreshInterval),this.refreshInterval=null)}async _loadData(){if(this.api)try{this.loading=!0,this.error=null,console.log("Loading data from:",this.config.url);const[e,t]=await Promise.all([this.api.getValves(),this.api.getSystemStatus()]);console.log("Valves response:",e),console.log("System response:",t),this.valves=e.data||[],this.systemStatus=t.data||null,this.lastUpdate=Date.now()}catch(e){console.error("Errore nel caricamento dei dati:",e),console.error("Error details:",{message:e.message,stack:e.stack,url:this.config.url}),this.error=`Errore di connessione: ${e.message}`}finally{this.loading=!1}}async _setValveStatus(e,t,s=null){try{await this.api.setValveStatus(e,t,s),await this._loadData()}catch(e){console.error("Errore nell'impostazione dello stato:",e),this.error=`Errore: ${e.message}`}}async _resetValve(e){try{await this.api.resetValve(e),await this._loadData()}catch(e){console.error("Errore nel reset della valvola:",e),this.error=`Errore: ${e.message}`}}async _setSkipNext(e,t){try{await this.api.setSkipNext(e,t),await this._loadData()}catch(e){console.error("Errore nell'impostazione skip next:",e),this.error=`Errore: ${e.message}`}}_openScheduleEditor(e,t){const s=this.valves.find((t=>t.id===e));if(!s)return;this.editingSchedule={valveId:e,day:t};const i=s.schedule[t]||[];this.scheduleForm={schedules:i.length>0?[...i]:[{start_time:"06:00",duration:10}]}}_closeScheduleEditor(){this.editingSchedule=null,this.scheduleForm={}}_addScheduleEntry(){this.scheduleForm.schedules||(this.scheduleForm.schedules=[]),this.scheduleForm.schedules.length<5&&(this.scheduleForm.schedules.push({start_time:"06:00",duration:10}),this.requestUpdate())}_removeScheduleEntry(e){this.scheduleForm.schedules&&this.scheduleForm.schedules.length>e&&(this.scheduleForm.schedules.splice(e,1),this.requestUpdate())}_updateScheduleEntry(e,t,s){this.scheduleForm.schedules&&this.scheduleForm.schedules[e]&&(this.scheduleForm.schedules[e][t]="duration"===t?parseInt(s):s,this.requestUpdate())}async _saveSchedule(){if(this.editingSchedule&&this.scheduleForm.schedules)try{for(const e of this.scheduleForm.schedules)if(!e.start_time||!e.duration||e.duration<1||e.duration>60)return void(this.error="Dati non validi: orario richiesto e durata 1-60 minuti");await this.api.updateSchedule(this.editingSchedule.valveId,this.editingSchedule.day,this.scheduleForm.schedules),await this._loadData(),this._closeScheduleEditor()}catch(e){console.error("Errore nel salvataggio della programmazione:",e),this.error=`Errore: ${e.message}`}}_getDurationValue(e){const t=this.shadowRoot.querySelector(`#duration-${e}`);return t&&parseInt(t.value)||5}_getScheduleInfo(e){const t=["Lun","Mar","Mer","Gio","Ven","Sab","Dom"];return["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].map(((s,i)=>{const r=e.schedule[s]||[];return{name:t[i],hasSchedule:r.length>0,count:r.length}}))}_formatLastUpdate(){if(!this.lastUpdate)return"";return new Date(this.lastUpdate).toLocaleTimeString()}render(){return this.loading&&!this.valves.length?V`
        <div class="loading">
          <div>Caricamento...</div>
        </div>
      `:this.error&&!this.valves.length?V`
        <div class="error-message">
          ${this.error}
          <button class="btn btn-secondary" @click="${this._loadData}" style="margin-top: 8px;">
            Riprova
          </button>
        </div>
      `:V`
      <div class="card-header">
        <h2 class="card-title">${this.config.title||"Sistema Irrigazione"}</h2>
        ${this.config.show_system_info?V`
          <div class="system-info">
            <span>
              <span class="status-indicator ${this.systemStatus?"status-online":"status-offline"}"></span>
              ${this.systemStatus?"Online":"Offline"}
            </span>
            ${this.systemStatus?V`
              <span>v${this.systemStatus.version||"N/A"}</span>
              <span>↻ ${this._formatLastUpdate()}</span>
            `:""}
          </div>
        `:""}
      </div>

      ${this.error?V`
        <div class="error-message">
          ${this.error}
          <button class="btn btn-secondary" @click="${()=>{this.error=null,this._loadData()}}" style="margin-top: 8px;">
            Riprova
          </button>
        </div>
      `:""}

      <div class="valves-container">
        ${this.valves.map((e=>V`
          <div class="valve-card">
            <div class="valve-header">
              <div class="valve-name">${e.name}</div>
              <div class="valve-status">
                <span class="status-indicator ${"on"===e.status?"status-online":"status-offline"}"></span>
                ${"on"===e.status?"Accesa":"Spenta"}
              </div>
            </div>

            <div class="valve-controls">
              <button 
                class="btn btn-success" 
                @click="${()=>this._setValveStatus(e.id,"on",this._getDurationValue(e.id))}"
                ?disabled="${"on"===e.status}"
              >
                🟢 Accendi
              </button>
              
              <button 
                class="btn btn-danger" 
                @click="${()=>this._setValveStatus(e.id,"off")}"
                ?disabled="${"off"===e.status}"
              >
                🔴 Spegni
              </button>

              <button 
                class="btn btn-secondary" 
                @click="${()=>this._resetValve(e.id)}"
                ?disabled="${!e.manual_override}"
              >
                🔄 Reset
              </button>

              <button 
                class="btn btn-warning" 
                @click="${()=>this._setSkipNext(e.id,!e.skip_next)}"
                title="${e.skip_next?"Riattiva prossima":"Salta prossima"}"
              >
                ${e.skip_next?"▶️ Riattiva":"⏭️ Salta"}
              </button>
            </div>

            <div class="duration-input">
              <label for="duration-${e.id}">Durata:</label>
              <input 
                type="number" 
                id="duration-${e.id}" 
                min="1" 
                max="60" 
                value="5"
                title="Durata in minuti"
              />
              <span>min</span>
            </div>

            ${e.manual_override||e.skip_next?V`
              <div class="valve-flags">
                ${e.manual_override?V`<span class="flag flag-override">Override Manuale</span>`:""}
                ${e.skip_next?V`<span class="flag flag-skip">Salterà Prossima</span>`:""}
              </div>
            `:""}

            ${this.config.show_schedule?V`
              <div class="valve-schedule">
                <div class="schedule-title">Programmazione Settimanale</div>
                <div class="schedule-days">
                  ${this._getScheduleInfo(e).map(((t,s)=>{const i=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"][s];return V`
                      <span 
                        class="schedule-day ${t.hasSchedule?"":"empty"}"
                        title="${t.hasSchedule?`${t.count} accensioni - Clicca per modificare`:"Nessuna programmazione - Clicca per aggiungere"}"
                        @click="${()=>this._openScheduleEditor(e.id,i)}"
                      >
                        ${t.name}${t.hasSchedule?` (${t.count})`:""}
                      </span>
                    `}))}
                </div>
              </div>
            `:""}
          </div>
        `))}
      </div>

      ${0===this.valves.length?V`
        <div class="loading">
          <div>Nessuna valvola trovata</div>
        </div>
      `:""}

      ${this.editingSchedule?V`
        <div class="schedule-editor-overlay" @click="${e=>e.target===e.currentTarget&&this._closeScheduleEditor()}">
          <div class="schedule-editor">
            <div class="schedule-editor-header">
              <h3 class="schedule-editor-title">
                Programmazione ${this.valves.find((e=>e.id===this.editingSchedule.valveId))?.name} - 
                ${["Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato","Domenica"][["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].indexOf(this.editingSchedule.day)]}
              </h3>
            </div>

            <div class="schedule-entries">
              ${this.scheduleForm.schedules?.map(((e,t)=>V`
                <div class="schedule-entry">
                  <div class="schedule-entry-field">
                    <label class="schedule-entry-label">Orario</label>
                    <input 
                      type="time" 
                      class="schedule-entry-input"
                      .value="${e.start_time}"
                      @input="${e=>this._updateScheduleEntry(t,"start_time",e.target.value)}"
                    />
                  </div>
                  <div class="schedule-entry-field">
                    <label class="schedule-entry-label">Durata (min)</label>
                    <input 
                      type="number" 
                      class="schedule-entry-input"
                      min="1" 
                      max="60"
                      .value="${e.duration}"
                      @input="${e=>this._updateScheduleEntry(t,"duration",e.target.value)}"
                    />
                  </div>
                  <button 
                    class="schedule-entry-remove" 
                    @click="${()=>this._removeScheduleEntry(t)}"
                    title="Rimuovi"
                  >
                    ×
                  </button>
                </div>
              `))||V`<div>Nessuna programmazione</div>`}
            </div>

            <div class="schedule-editor-actions">
              <button 
                class="add-schedule-btn"
                @click="${this._addScheduleEntry}"
                ?disabled="${(this.scheduleForm.schedules?.length||0)>=5}"
              >
                + Aggiungi orario
              </button>

              <div class="schedule-editor-buttons">
                <button class="btn btn-close" @click="${this._closeScheduleEditor}">
                  Annulla
                </button>
                <button class="btn btn-save" @click="${this._saveSchedule}">
                  Salva
                </button>
              </div>
            </div>
          </div>
        </div>
      `:""}
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"irrigation-card",name:"Irrigation Card",preview:!1,description:"Card per il controllo del sistema di irrigazione"}),console.info("%c IRRIGATION-CARD %c v1.0.0 ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");
