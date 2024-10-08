/**
 * @fileoverview web components
 */
class InfoCustomELement extends HTMLElement {

  static observedAttributes = ['color'];

  constructor() {
    super();

    this._internals = this.attachInternals();

    this.addEventListener('click', this._onClick.bind(this));
  }

  connectedCallback() {
    this._updateRendering();
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('name', name, 'oldValue', oldValue, 'newValue', newValue);
    if (name === 'color' && newValue) {
      this._updateRendering(newValue);
    }
  }

  /**
   * @param {Event} event 
   */
  _onClick(event) {
    console.log('handling event', event.type);
  }

  /**
   * @param {string | undefined} color 
   */
  _updateRendering(color) {
    this.textContent = 'Information';
    this.style.color = 'darkblue';
    this.style.fontSize = '32px';
  }
}

customElements.define('info-element', InfoCustomELement);

