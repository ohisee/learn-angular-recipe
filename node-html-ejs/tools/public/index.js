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

})();

