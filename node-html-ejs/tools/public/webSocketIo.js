/**
 * @fileoverview Socket IO
 */
(function () {
  const socket = io();

  /** @type {HTMLAnchorElement} */
  const sa = document.querySelector('.link.socket');

  sa.addEventListener('click', function (event) {
    event.preventDefault();

    socket.emit('link clicked', 'emit io event');

  });

  socket.on('broadcast message', function (message) {
    console.log(message);
  });

})();

