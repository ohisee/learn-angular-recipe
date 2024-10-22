/**
 * @fileoverview shadow dom
 */
class ShowYourName extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    console.log(`Show your name component ${this.isConnected}`);

    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `<p>Hello, ${this.getAttribute('name')} </p>`;
    const sheet = this._createStyleSheet();
    shadow.adoptedStyleSheets = [sheet];
  }

  _createStyleSheet() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`p { font-family: sans-serif; margin: 16px; }`);
    return sheet;
  }
}

customElements.define('show-your-name', ShowYourName);

