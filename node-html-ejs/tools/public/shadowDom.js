/**
 * @fileoverview shadow dom
 */
class ShowYourName extends HTMLElement {

  constructor() {
    super();
  }

  _createStyleSheet() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`p { font-family: sans-serif; margin: 16px; }`);
    return sheet;
  }
}

customElements.define('show-your-name', ShowYourName);

