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

}

customElements.define('custom-html-button', CustomHtmlButton);

