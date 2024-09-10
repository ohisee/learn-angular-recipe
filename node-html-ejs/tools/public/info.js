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

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback() {}

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

