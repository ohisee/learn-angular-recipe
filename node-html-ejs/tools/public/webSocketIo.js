/**
 * @fileoverview Socket IO
 */
(function () {
  const socket = io();

  /** @type {HTMLAnchorElement} */
  const sa = document.querySelector('.link.socket');
  /** @type {HTMLAnchorElement} */
  const bm = document.querySelector('.link.broadcast');
  /** @type {HTMLUListElement} */
  const container = document.querySelector('.message__list');

  sa.addEventListener('click', function (event) {
    event.preventDefault();

    socket.emit('link clicked', 'emit io event');

  });

  bm.addEventListener('click', function (event) {
    event.preventDefault();

    socket.emit('broadcast message', 'name is runner');
  });

  socket.on('broadcast message', function (message) {
    const liEL = document.createElement('li');
    liEL.textContent = message;
  });

})();

