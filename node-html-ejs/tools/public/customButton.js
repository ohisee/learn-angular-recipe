/**
 * @fileoverview custom button element
 */
class CustomButton extends HTMLButtonElement {

  constructor() {
    super();

    this.addEventListener('click', this._onClick.bind(this));
  }

}

customElements.define('custom-button', CustomButton, { extends: 'button' });

