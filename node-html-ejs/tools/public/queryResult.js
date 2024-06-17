/**
 * @fileoverview JS file
 */
(function () {
  /** @type {HTMLInputElement} */
  const inputEL = document.querySelector('#query_result');
  /** @type {HTMLDivElement} */
  const searchResultDivEl = document.querySelector('.search__result');
  /** @type {HTMLUListElement} */
  const searchResultUlEl = document.querySelector('.search__result ul');

  inputEL.addEventListener('input', function () {
    searchResultDivEl.classList.add('with_border');

    const liEl = document.createElement('li');
    liEl.innerText = 'new element';
    searchResultUlEl.insertAdjacentElement('beforeend', liEl);
  });

  inputEL.addEventListener('blur', function () {
    if (this.value === '') {
      searchResultDivEl.classList.remove('with_border');

      while(searchResultUlEl.hasChildNodes()) {
        searchResultUlEl.removeChild(searchResultUlEl.lastChild);
      }
    }
  });

})();

