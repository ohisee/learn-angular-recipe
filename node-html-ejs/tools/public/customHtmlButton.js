/**
 * @fileoverview custom html button
 */
class CustomHtmlButton extends HTMLElement {

  static formAssociated = true;
  static observedAttributes = ['disabled'];

  constructor() {
    super();

    this._internals = this.attachInternals();
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
    console.log('connected call back');
  }

  disconnectedCallback() {
    console.log('disconnected call back');
  }

  /**
   * @param {Event} event 
   */
  _onClick(event) {
    event.preventDefault();
    const pointerEvent = new PointerEvent('click', {
      bubbles: true,
      cancelable: true
    });
    this.dispatchEvent(pointerEvent);
  }
}

customElements.define('custom-html-button', CustomHtmlButton);

