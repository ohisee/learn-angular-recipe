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
  /** @type {HTMLDivElement} */
  const resultOutputEl = document.querySelector('.search__result__output');
  /** @type {String} li clicked event */
  const resultItemClickedEvent = 'resultItemClicked';

  inputEL.addEventListener('input', function () {
    searchResultDivEl.classList.add('with_border');

    // const liEl = document.createElement('li');
    // liEl.innerText = 'new element';
    // searchResultUlEl.insertAdjacentElement('beforeend', liEl);


    if (this.value) {
      fetch('/service/api/simple/query/options').then(res => res.json()).then(
        res => {
          const options = res['result'];
          if (options) {
            for (let resultOption of options) {
              const liEl = document.createElement('li');
              liEl.innerText = resultOption;
              liEl.onclick = function (event) {
                const customEvent = new CustomEvent(resultItemClickedEvent, {
                  bubbles: true,
                  detail: { text: resultOption }
                });
                event.target.dispatchEvent(customEvent);
              };
              searchResultUlEl.insertAdjacentElement('beforeend', liEl);
            }
          }
        }
      );
    }
  });

  inputEL.addEventListener('blur', function () {
    if (this.value === '') {
      searchResultDivEl.classList.remove('with_border');

      while (searchResultUlEl.hasChildNodes()) {
        searchResultUlEl.removeChild(searchResultUlEl.lastChild);
      }
    }
  });

  searchResultDivEl.addEventListener(resultItemClickedEvent, function (event) {
    if (event.detail.text) {
    }
  });


})();

