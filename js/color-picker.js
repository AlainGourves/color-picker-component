import styles from '../css/color-picker.css?inline';
const template = document.createElement('template');
template.innerHTML = `
<div class="colorPicker">
    <div id="picker-wrapper">
        <input type="color" id="picker">
    </div>
    <label for="picker"></label>
    <input type="range" id="slider" min="0" max="255">
</div>`;

export default class ColorPicker extends HTMLElement {

    constructor() {
        super();
        // Attach a shadow root to the element.
        // `mode: open` -> the shadow root's internal features are accessible from JavaScript
        let shadowRoot = this.attachShadow({
            mode: 'open',
            delegatesFocus: true
        });

        const styleTag = document.createElement("style");
        styleTag.innerHTML = styles;
        this.shadowRoot.appendChild(styleTag);

        shadowRoot.appendChild(template.content.cloneNode(true));
        this.root = shadowRoot.querySelector('div:first-of-type');

        this.picker = this.root.querySelector('#picker');
        this.pickerLabel = this.root.querySelector('label[for="picker"]');
        this.slider = this.root.querySelector('#slider');

        this.defaultColor = '#000000';
        this.defaultAlpha = 255;

        this.label;

        this.color = null;
        this.alpha = null;
        this.value = null;
    }

    // Attributes -----------------------------------
    // Specify observed attributes so that attributeChangedCallback will work
    static get observedAttributes() {
        return ['label', 'value'];
    }

    get label() {
        return this.getAttribute('label');
    }

    set label(val) {
        if (val) {
            this.setAttribute('label', val);
        } else {
            this.removeAttribute('label');
        }
    }

    get value() {
        return this.getAttribute('value');
    }

    set value(val) {
        if (val) {
            this.setAttribute('value', val);
        } else {
            this.removeAttribute('value');
        }
    }

    // Events handler
    handleEvent(ev) {
        const path = ev.path || (ev.composedPath && ev.composedPath());
        if (ev.type === 'change' || ev.type === 'input') {
            if (path.includes(this.picker)) {
                this.color = ev.target.value;
                this.shadowRoot.host.style.setProperty('--clr-grad', this.color)
            } else if (path.includes(this.slider)) {
                this.alpha = parseInt(ev.target.value);
            }
            this._setColor();
            const event = new Event(ev.type, { bubbles: true, composed: true });
            this.dispatchEvent(event);
        }
    }

    connectedCallback() {
        // Called every time the element is inserted into the DOM. Useful for running setup code, such as fetching resources or rendering.
        // Generally, you should try to delay work until this time.
        this.picker.value = this.color;
        this.slider.value = this.alpha;
        this.shadowRoot.host.style.setProperty('--clr-grad', this.color);

        // this.tabIndex = 0; // make component focusable

        // Event listeners
        this.picker.addEventListener('change', this);
        this.slider.addEventListener('change', this);
    }

    disconnectedCallback() {
        // Called every time the element is removed from the DOM.
        // Useful for running clean up code.
        // NB: will never be called if the user closes the tab
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue) {
            if (name === 'label') {
                this.label = newValue;
                this.pickerLabel.textContent = this.label;
            } else if (name === 'value') {
                // check for 3-digit hex colors (or 4 with transparency)
                let matches = newValue.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i);
                if (matches) {
                    this.color = `#${matches[1]}${matches[1]}${matches[2]}${matches[2]}${matches[3]}${matches[3]}`;
                    this.alpha = matches[4] ? parseInt(matches[4] + matches[4], 16) : this.defaultAlpha;
                } else {
                    // get the color (#rrggbb[aa])
                    matches = newValue.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i);
                    if (!matches) {
                        this.color = this.defaultColor;
                        this.alpha = this.defaultAlpha;
                        return alert(`Color value for ${this.label} is not correct!`);
                    }
                    this.color = `#${matches[1]}${matches[2]}${matches[3]}`;
                    this.alpha = matches[4] ? parseInt(matches[4], 16) : this.defaultAlpha;
                }
                this.picker.value = this.color;
                this.slider.value = this.alpha;
                this._setColor();
            }
        }
        // console.log(
        //     `Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
        // );
    }

    // Utility functions
    // NB: only public methods will be accessible from the outside
    // NB: private methods are prefixed with `_`
    _setColor() {
        this.value = `${this.color}${this.alpha.toString(16).padStart(2, '0')}`;
        this.shadowRoot.host.style.setProperty('--clr', this.value)
    }
}


window.addEventListener("load", e => {
    customElements.define('color-picker', ColorPicker);
});