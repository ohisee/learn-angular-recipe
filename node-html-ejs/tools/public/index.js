// js
(function() {
  /** @type {HTMLDivElement} */
  const main = document.querySelector(".main_header");
  /** @type {HTMLDivElement} */
  const backdrop = document.querySelector('.backdrop');
  /** @type {HTMLButtonElement} */
  const buttonBackdrop = document.querySelector('.b_backdrop');

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

})();

