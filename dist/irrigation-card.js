/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new r(i,t,s)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:n,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,v=u.trustedTypes,g=v?v.emptyScript:"",f=u.reactiveElementPolyfillSupport,m=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!n(t,e),_={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i,this[i]=r.fromAttribute(e,t.type)??this._$Ej?.get(i)??null,this._$Em=null}}requestUpdate(t,e,s){if(void 0!==t){const i=this.constructor,r=this[t];if(s??=i.getPropertyOptions(t),!((s.hasChanged??y)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[m("elementProperties")]=new Map,b[m("finalized")]=new Map,f?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=x.trustedTypes,A=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+E,C=`<${k}>`,P=document,R=()=>P.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,z="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,M=/>/g,H=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,I=/"/g,j=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),L=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),B=new WeakMap,W=P.createTreeWalker(P,129);function J(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const F=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=N;for(let e=0;e<s;e++){const s=t[e];let n,l,c=-1,d=0;for(;d<s.length&&(a.lastIndex=d,l=a.exec(s),null!==l);)d=a.lastIndex,a===N?"!--"===l[1]?a=T:void 0!==l[1]?a=M:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=H):void 0!==l[3]&&(a=H):a===H?">"===l[0]?(a=r??N,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?H:'"'===l[3]?I:D):a===I||a===D?a=H:a===T||a===M?a=N:(a=H,r=void 0);const h=a===H&&t[e+1].startsWith("/>")?" ":"";o+=a===N?s+C:c>=0?(i.push(n),s.slice(0,c)+S+s.slice(c)+E+h):s+E+(-2===c?e:h)}return[J(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const a=t.length-1,n=this.parts,[l,c]=F(t,e);if(this.el=G.createElement(l,s),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=W.nextNode())&&n.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=c[o++],s=i.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:s,ctor:"."===a[1]?X:"?"===a[1]?tt:"@"===a[1]?et:Q}),i.removeAttribute(t)}else t.startsWith(E)&&(n.push({type:6,index:r}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],R()),W.nextNode(),n.push({type:2,index:++r});i.append(t[e],R())}}}else if(8===i.nodeType)if(i.data===k)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)n.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const s=P.createElement("template");return s.innerHTML=t,s}}function K(t,e,s=t,i){if(e===L)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=U(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=K(t,r._$AS(t,e.values),r,i)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);W.currentNode=i;let r=W.nextNode(),o=0,a=0,n=s[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Y(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new st(r,this,t)),this._$AV.push(e),n=s[++a]}o!==n?.index&&(r=W.nextNode(),o++)}return W.currentNode=P,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),U(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Z(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new G(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Y(this.O(R()),this.O(R()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=K(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==L,o&&(this._$AH=t);else{const i=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=K(this,i[s+a],e,a),n===L&&(n=this._$AH[a]),o||=!U(n)||n!==this._$AH[a],n===q?t=q:t!==q&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}o&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class et extends Q{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??q)===L)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const it=x.litHtmlPolyfillSupport;it?.(G,Y),(x.litHtmlVersions??=[]).push("3.3.0");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Y(e.insertBefore(R(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.0");const nt=o`
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
  }

  .schedule-day.empty {
    background: var(--disabled-color, #ccc);
    color: var(--secondary-text-color);
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
`;class lt{constructor(t,e,s){this.baseUrl=t.replace(/\/$/,""),this.auth=btoa(`${e}:${s}`)}async makeRequest(t,e={}){const s=`${this.baseUrl}${t}`,i={Authorization:`Basic ${this.auth}`,"Content-Type":"application/json",...e.headers};try{const t=await fetch(s,{...e,headers:i});if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){throw console.error("API request failed:",t),t}}async getValves(){return this.makeRequest("/api/valves")}async getValve(t){return this.makeRequest(`/api/valves/${t}`)}async setValveStatus(t,e,s=null){const i={status:e};return null!==s&&(i.duration=s),this.makeRequest(`/api/valves/${t}/status`,{method:"POST",body:JSON.stringify(i)})}async updateSchedule(t,e,s){return this.makeRequest(`/api/valves/${t}/schedule/${e}`,{method:"PUT",body:JSON.stringify(s)})}async updateValveName(t,e){return this.makeRequest(`/api/valves/${t}/name`,{method:"PUT",body:JSON.stringify({name:e})})}async resetValve(t){return this.makeRequest(`/api/valves/${t}/reset`,{method:"POST"})}async setSkipNext(t,e){return this.makeRequest(`/api/valves/${t}/skip_next`,{method:"POST",body:JSON.stringify({skip:e})})}async getSystemStatus(){return this.makeRequest("/api/system/status")}async restartSystem(){return this.makeRequest("/api/system/restart",{method:"POST"})}async getVersion(){return this.makeRequest("/api/version")}}customElements.define("irrigation-card-editor",class extends ot{static get properties(){return{hass:{type:Object},config:{type:Object}}}static get styles(){return o`
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
    `}setConfig(t){this.config={...t}}render(){return this.config?V`
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
    `:V``}_valueChanged(t){if(!this.config||!this.hass)return;const e=t.target,s="checkbox"===e.type?e.checked:e.value;if(this.config[e.id]===s)return;const i={...this.config,[e.id]:s};Object.keys(i).forEach((t=>{""!==i[t]&&null!==i[t]&&void 0!==i[t]||delete i[t]}));const r=new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0});this.dispatchEvent(r)}});customElements.define("irrigation-card",class extends ot{static get properties(){return{hass:{type:Object},config:{type:Object},valves:{type:Array},systemStatus:{type:Object},loading:{type:Boolean},error:{type:String},lastUpdate:{type:Number}}}static get styles(){return nt}constructor(){super(),this.valves=[],this.systemStatus=null,this.loading=!0,this.error=null,this.lastUpdate=0,this.refreshInterval=null,this.api=null}setConfig(t){if(!(t&&t.url&&t.username&&t.password))throw new Error("La configurazione deve includere: url, username, password");this.config={refresh_interval:30,show_schedule:!0,show_system_info:!0,...t},this.api=new lt(this.config.url,this.config.username,this.config.password),this._setupRefresh(),this._loadData()}static getConfigElement(){return document.createElement("irrigation-card-editor")}static getStubConfig(){return{url:"https://192.168.1.100:5000",username:"admin",password:"password",title:"Sistema Irrigazione",refresh_interval:30,show_schedule:!0,show_system_info:!0}}connectedCallback(){super.connectedCallback(),this._setupRefresh(),this.api&&this._loadData()}disconnectedCallback(){super.disconnectedCallback(),this._clearRefresh()}_setupRefresh(){this._clearRefresh(),this.config&&this.config.refresh_interval&&(this.refreshInterval=setInterval((()=>{this._loadData()}),1e3*this.config.refresh_interval))}_clearRefresh(){this.refreshInterval&&(clearInterval(this.refreshInterval),this.refreshInterval=null)}async _loadData(){if(this.api)try{this.loading=!0,this.error=null;const[t,e]=await Promise.all([this.api.getValves(),this.api.getSystemStatus()]);this.valves=t.data||[],this.systemStatus=e.data||null,this.lastUpdate=Date.now()}catch(t){console.error("Errore nel caricamento dei dati:",t),this.error=`Errore di connessione: ${t.message}`}finally{this.loading=!1}}async _setValveStatus(t,e,s=null){try{await this.api.setValveStatus(t,e,s),await this._loadData()}catch(t){console.error("Errore nell'impostazione dello stato:",t),this.error=`Errore: ${t.message}`}}async _resetValve(t){try{await this.api.resetValve(t),await this._loadData()}catch(t){console.error("Errore nel reset della valvola:",t),this.error=`Errore: ${t.message}`}}async _setSkipNext(t,e){try{await this.api.setSkipNext(t,e),await this._loadData()}catch(t){console.error("Errore nell'impostazione skip next:",t),this.error=`Errore: ${t.message}`}}_getDurationValue(t){const e=this.shadowRoot.querySelector(`#duration-${t}`);return e&&parseInt(e.value)||5}_getScheduleInfo(t){const e=["Lun","Mar","Mer","Gio","Ven","Sab","Dom"];return["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].map(((s,i)=>{const r=t.schedule[s]||[];return{name:e[i],hasSchedule:r.length>0,count:r.length}}))}_formatLastUpdate(){if(!this.lastUpdate)return"";return new Date(this.lastUpdate).toLocaleTimeString()}render(){return this.loading&&!this.valves.length?V`
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
        ${this.valves.map((t=>V`
          <div class="valve-card">
            <div class="valve-header">
              <div class="valve-name">${t.name}</div>
              <div class="valve-status">
                <span class="status-indicator ${"on"===t.status?"status-online":"status-offline"}"></span>
                ${"on"===t.status?"Accesa":"Spenta"}
              </div>
            </div>

            <div class="valve-controls">
              <button 
                class="btn btn-success" 
                @click="${()=>this._setValveStatus(t.id,"on",this._getDurationValue(t.id))}"
                ?disabled="${"on"===t.status}"
              >
                🟢 Accendi
              </button>
              
              <button 
                class="btn btn-danger" 
                @click="${()=>this._setValveStatus(t.id,"off")}"
                ?disabled="${"off"===t.status}"
              >
                🔴 Spegni
              </button>

              <button 
                class="btn btn-secondary" 
                @click="${()=>this._resetValve(t.id)}"
                ?disabled="${!t.manual_override}"
              >
                🔄 Reset
              </button>

              <button 
                class="btn btn-warning" 
                @click="${()=>this._setSkipNext(t.id,!t.skip_next)}"
                title="${t.skip_next?"Riattiva prossima":"Salta prossima"}"
              >
                ${t.skip_next?"▶️ Riattiva":"⏭️ Salta"}
              </button>
            </div>

            <div class="duration-input">
              <label for="duration-${t.id}">Durata:</label>
              <input 
                type="number" 
                id="duration-${t.id}" 
                min="1" 
                max="60" 
                value="5"
                title="Durata in minuti"
              />
              <span>min</span>
            </div>

            ${t.manual_override||t.skip_next?V`
              <div class="valve-flags">
                ${t.manual_override?V`<span class="flag flag-override">Override Manuale</span>`:""}
                ${t.skip_next?V`<span class="flag flag-skip">Salterà Prossima</span>`:""}
              </div>
            `:""}

            ${this.config.show_schedule?V`
              <div class="valve-schedule">
                <div class="schedule-title">Programmazione Settimanale</div>
                <div class="schedule-days">
                  ${this._getScheduleInfo(t).map((t=>V`
                    <span 
                      class="schedule-day ${t.hasSchedule?"":"empty"}"
                      title="${t.hasSchedule?`${t.count} accensioni`:"Nessuna programmazione"}"
                    >
                      ${t.name}${t.hasSchedule?` (${t.count})`:""}
                    </span>
                  `))}
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
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"irrigation-card",name:"Irrigation Card",preview:!1,description:"Card per il controllo del sistema di irrigazione"}),console.info("%c IRRIGATION-CARD %c v1.0.0 ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");
