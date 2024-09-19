/**
 * @fileoverview custom button element
 */
class CustomButton extends HTMLButtonElement {

  constructor() {
    super();

    this.addEventListener('click', this._onClick.bind(this));
  }

  /**
   * @param {Event} event 
   */
  _onClick(event) {
    console.log(event.type);
  }

}

customElements.define('custom-button', CustomButton, { extends: 'button' });

