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

  function clearSearchResult() {
    while (searchResultUlEl.hasChildNodes()) {
      searchResultUlEl.removeChild(searchResultUlEl.lastChild);
    }
  }

  function createLoadingElement() {
    const liSearching = document.createElement('li');
    liSearching.innerText = 'searching...';
    searchResultUlEl.appendChild(liSearching);
    return liSearching;
  }

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
      while (resultOutputEl.hasChildNodes()) {
        resultOutputEl.removeChild(resultOutputEl.lastChild);
      }

      const spanEL = document.createElement('span');
      spanEL.innerText = event.detail.text;
      resultOutputEl.insertAdjacentElement('beforeend', spanEL);
    }
  });

})();

