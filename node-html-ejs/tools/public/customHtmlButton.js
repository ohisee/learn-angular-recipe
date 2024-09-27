/**
 * @fileoverview custom html button
 */
class CustomHtmlButton extends HTMLElement {

  static formAssociated = true;
  static observedAttributes = ['disabled'];

}

customElements.define('custom-html-button', CustomHtmlButton);

