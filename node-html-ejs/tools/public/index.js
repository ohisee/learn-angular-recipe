// js
(function () {
  /** @type {HTMLDivElement} */
  const main = document.querySelector(".main_header");
  /** @type {HTMLDivElement} */
  const backdrop = document.querySelector('.backdrop');
  /** @type {HTMLButtonElement} */
  const buttonBackdrop = document.querySelector('.b_backdrop');
  /** @type {HTMLFormElement} */
  const searchInputForm = document.querySelector('.search_input_form');
  /** @type {HTMLInputElement} */
  const searchInput = document.querySelector('#query');
  /** @type {HTMLDivElement} */
  const result = document.querySelector('.out_result');
  /** @type {HTMLDivElement} */
  const customElementContainer = document.querySelector('.custom__component__container');

  /**
   * Call service
   * @returns {Promise<{isReady: boolean}>}
   */
  function callService() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ isReady: true });
      }, 1000)
    });
  }

  main.addEventListener('click', function () {
    if (main.style.background === '') {
      main.style.background = "#d2c9c9";
    } else {
      main.style.background = '';
    }
  });

  buttonBackdrop.addEventListener('click', function () {
    backdrop.style.display = 'block';
  });

  backdrop.addEventListener('click', function () {
    backdrop.style.display = 'none';
  });

  searchInputForm.addEventListener('submit', function (event) {
    event.preventDefault();

    while (result.hasChildNodes()) {
      result.removeChild(result.lastChild)
    }

    const spanEl = document.createElement('span')
    spanEl.textContent = 'waiting...';
    result.insertAdjacentElement('beforeend', spanEl);

    callService().then(resp => {
      if (resp.isReady) {
        result.removeChild(spanEl);
        spanEl.textContent = 'got a response';
        result.insertAdjacentElement('beforeend', spanEl);
      }
    });
  });

  searchInput.addEventListener('focus', function(event) {
    event.preventDefault();

    const sug = document.createElement('span');
    sug.textContent = 'here is something';
    resultSuggestion.insertAdjacentElement('beforeend', sug);
  });

  searchInput.addEventListener('blur', function(event) {
    event.preventDefault();

    while(resultSuggestion.hasChildNodes()) {
      resultSuggestion.removeChild(resultSuggestion.lastChild);
    }
  });

  searchInput.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.target.value);

    resultSuggestion.textContent = this.value;
  });

})();

