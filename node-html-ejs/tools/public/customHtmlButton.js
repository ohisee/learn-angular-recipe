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

}

customElements.define('custom-html-button', CustomHtmlButton);

