// js
(function() {
  /** @type {HTMLDivElement} */
  const main = document.querySelector(".main_header");

  main.addEventListener("click", function () {
    if (main.style.background === '') {
      main.style.background = "#d2c9c9";
    } else {
      main.style.background = '';
    }
  });

})();

