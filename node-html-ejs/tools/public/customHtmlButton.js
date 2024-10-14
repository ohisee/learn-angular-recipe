/**
 * @fileoverview custom html button
 */
class CustomHtmlButton extends HTMLElement {

  static formAssociated = true;
  static observedAttributes = ['disabled'];

  constructor() {
    super();

    this._internals = this.attachInternals();

    this.addEventListener('click', this._onClick.bind(this));
  }

  get name() {
    return this.getAttribute('name');
  }

  get disabled() {
    return this.getAttribute('disabled');
  }

  set disabled(flag) {
    this.toggleAttribute('disabled', Boolean(flag));
  }

  connectedCallback() {
    this.innerHTML = `<span>Custom Button ${this.name}</span>`;
  }

  disconnectedCallback() {
  }

  /**
   * @param {Event} event 
   */
  _onClick(event) {
    event.preventDefault();
    const pointerEvent = new PointerEvent('pointerdown', {
      bubbles: true,
      cancelable: true
    });
    this.dispatchEvent(pointerEvent);
  }
}

customElements.define('custom-html-button', CustomHtmlButton);

