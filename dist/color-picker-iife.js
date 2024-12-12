(function(){"use strict";const o='*,*:before,*:after{margin:0;padding:0;box-sizing:border-box}:host{--min-height: clamp(.75rem, .5rem + 1vw, 2rem);--padding: .75em;--picker-width: clamp(2rem, 1.5rem + 1vw, 5rem);--drop-shadow: 2px 2px 4px #0005;--output-arrow: 4px;--clr-grad: #000;--clr-base: #eae5dc;--dark-grey: #909090;--light-grey: #f0f0f4;color-scheme:light dark;container-type:inline-size;display:inline-grid;width:calc(100% - 2*var(--padding));padding:var(--padding);font-family:system-ui,sans-serif;font-size:var(--min-height);font-weight:600;line-height:1;color:color-mix(in oklch,var(--clr-base),black 60%);text-shadow:0 0 2px var(--light-grey);background:var(--clr-base)}@supports (font-size:1cqi){:host{--min-height: clamp(.75rem, .5rem + 1.5cqi, 2rem);--picker-width: clamp(2rem, 1.5rem + 3cqi, 5rem);--drop-shadow: .3cqi .3cqi .6cqi #0005;--output-arrow: 1.5cqi}}@media (prefers-color-scheme: dark){:host{--dark-grey: #f0f0f4;--light-grey: #909090;color:var(--clr-base);background:color-mix(in oklch,var(--clr-base),black 60%)}}.colorPicker{display:inline-grid;grid-template-columns:var(--picker-width) auto;align-items:center;justify-items:flex-start;gap:var(--padding)}input{cursor:pointer;background-color:transparent;-webkit-appearance:none;-moz-appearance:none;appearance:none}input,#picker-wrapper{outline-width:0;outline-color:#0000;transition:outline .25s ease-in-out}input:focus{outline:none}input:focus-visible,#picker-wrapper:has(:focus-within):has(:focus-visible){outline-width:max(1px,.43em);outline-style:auto;outline-color:Highlight;outline-color:-webkit-focus-ring-color;outline-offset:.2em}input[type=color]{inline-size:var(--picker-width);block-size:var(--picker-width);border:0;opacity:0;pointer-events:initial}input[type=color]::-webkit-color-swatch-wrapper{padding:0;margin:0;border:0}input[type=color]::-webkit-color-swatch{border:none}input[type=color]::-moz-color-swatch{border:none}label{text-wrap:nowrap}#picker-wrapper{--rad: 4px;--marg: 2px;inline-size:var(--picker-width);block-size:var(--picker-width);position:relative;pointer-events:none;border-radius:var(--rad)}#picker-wrapper:before,#picker-wrapper:after{content:"";position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}#picker-wrapper:before{background:#fff;border:1px solid var(--dark-grey);border-radius:var(--rad)}#picker-wrapper:after{background:var(--clr, #000);margin:var(--marg);border-radius:calc(var(--rad) - var(--marg))}#slider-wrapper{--thumb-h: calc(var(--min-height)*4/3);grid-column:1/-1;width:100%;position:relative}input[type=range]{width:100%}input[type=range]::-webkit-slider-runnable-track{box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:var(--min-height);border-radius:2px;background-image:linear-gradient(to right,transparent,var(--clr-grad, #000)),repeating-conic-gradient(var(--light-grey) 0 90deg,var(--dark-grey) 90deg 180deg);background-size:100%,var(--min-height) var(--min-height)}input[type=range]::-webkit-slider-thumb{box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:var(--thumb-h);width:calc(var(--thumb-h)/2);margin-block-start:calc(.5 * (var(--min-height) - var(--thumb-h)));border:none;border-radius:2px;background:var(--light-grey);box-shadow:0 0 4px var(--dark-grey) inset,0 0 0 1px var(--dark-grey) inset,1px 1px 3px #111c,0 0 1px #0d0d0d;cursor:ew-resize}input[type=range]::-moz-range-track{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:var(--min-height);border-radius:2px;background-image:linear-gradient(to right,transparent,var(--clr-grad, #000)),repeating-conic-gradient(var(--light-grey) 0 90deg,var(--dark-grey) 90deg 180deg);background-size:100%,var(--min-height) var(--min-height)}input[type=range]::-moz-range-thumb{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:calc(var(--thumb-h)/2);height:var(--thumb-h);border:none;border-radius:2px;background:var(--light-grey);box-shadow:0 0 0 1px var(--dark-grey) inset,1px 1px 3px #111,0 0 1px #0d0d0d;cursor:ew-resize}input[type=range]:hover+output,input[type=range]:focus+output{opacity:1;top:130%;filter:drop-shadow(var(--drop-shadow))}output{position:absolute;display:grid;place-content:center;background:var(--dark-grey);left:calc((var(--slider-val) * 1%) + ((50 - var(--slider-val))/100)*8px);top:200%;transform:translate(-50%);padding:.25em .5em;min-width:4ch;line-height:1;color:var(--light-grey);font-size:max(12px,.75em);text-shadow:none;border-radius:.25em;pointer-events:none;opacity:0;z-index:100;filter:drop-shadow(0 0 0 #0000);transition:filter .4s cubic-bezier(.4,0,.2,1),opacity .4s cubic-bezier(.4,0,.2,1),top .4s cubic-bezier(.4,0,.2,1)}output:after{content:"";position:absolute;width:var(--output-arrow);aspect-ratio:1;background:inherit;left:50%;top:0;transform:translate(-50%,-50%) rotate(45deg)}',a=document.createElement("template");a.innerHTML=`
<div class="colorPicker">
    <div id="picker-wrapper">
        <input type="color" id="picker">
    </div>
    <label for="picker"></label>
    <div id="slider-wrapper">
        <input type="range" id="slider" min="0" max="255" aria-label="Transparency value">
        <output for="slider"></output>
    </div>
</div>`;class n extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open",delegatesFocus:!0});const r=document.createElement("style");r.innerHTML=o,this.shadowRoot.appendChild(r),e.appendChild(a.content.cloneNode(!0)),this.root=e.querySelector("div:first-of-type"),this.picker=this.root.querySelector("#picker"),this.pickerLabel=this.root.querySelector('label[for="picker"]'),this.slider=this.root.querySelector("#slider"),this.output=this.root.querySelector('output[for="slider"]'),this.defaultColor="#000000",this.defaultAlpha=255,this.label,this.color=null,this.alpha=null,this.value=null}static get observedAttributes(){return["label","value"]}get label(){return this.getAttribute("label")}set label(e){e?this.setAttribute("label",e):this.removeAttribute("label")}get value(){return this.getAttribute("value")}set value(e){e?this.setAttribute("value",e):this.removeAttribute("value")}handleEvent(e){const r=e.path||e.composedPath&&e.composedPath();if(e.type==="change"||e.type==="input"){r.includes(this.picker)?(this.color=e.target.value,this.shadowRoot.host.style.setProperty("--clr-grad",this.color)):r.includes(this.slider)&&(this.alpha=parseInt(e.target.value),this.output.textContent=this.alpha,this.shadowRoot.host.style.setProperty("--slider-val",this.alpha/255*100)),this._setColor();const i=new Event(e.type,{bubbles:!0,composed:!0});this.dispatchEvent(i)}}connectedCallback(){this.picker.value=this.color,this.slider.value=this.alpha,this.shadowRoot.host.style.setProperty("--slider-val",this.alpha/255*100),this.output.textContent=this.alpha,this.shadowRoot.host.style.setProperty("--clr-grad",this.color),this.picker.addEventListener("input",this),this.picker.addEventListener("change",this),this.slider.addEventListener("input",this),this.slider.addEventListener("change",this)}disconnectedCallback(){}attributeChangedCallback(e,r,i){if(r!=i){if(e==="label")this.label=i,this.pickerLabel.textContent=this.label;else if(e==="value"){let t=i.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i);if(t)this.color=`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`,this.alpha=t[4]?parseInt(t[4]+t[4],16):this.defaultAlpha;else{if(t=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i),!t)return this.color=this.defaultColor,this.alpha=this.defaultAlpha,alert(`Color value for ${this.label} is not correct!`);this.color=`#${t[1]}${t[2]}${t[3]}`,this.alpha=t[4]?parseInt(t[4],16):this.defaultAlpha}this.picker.value=this.color,this.slider.value=this.alpha,this._setColor()}}}_setColor(){this.value=`${this.color}${this.alpha.toString(16).padStart(2,"0")}`,this.shadowRoot.host.style.setProperty("--clr",this.value)}}window.addEventListener("load",s=>{customElements.define("color-picker",n)})})();
