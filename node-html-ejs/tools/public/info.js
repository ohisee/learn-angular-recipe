/**
 * @fileoverview web components
 */
class InfoCustomELement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.textContent = 'information';
    this.style.color = 'darkblue';
    this.style.fontSize = '32px';
  }

  disconnectedCallback() {}

  attributeChangedCallback() {}
}

customElements.define('info-element', InfoCustomELement);

