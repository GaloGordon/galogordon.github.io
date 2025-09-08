document.getElementById('year').textContent = new Date().getFullYear();
// Dropdown Tools
(function () {
  const menu = document.querySelector('.nav .menu.tools');
  if (!menu) return;

  const btn = menu.querySelector('.menu-toggle');
  const list = menu.querySelector('.menu-list');

  function open() {
    menu.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function close() {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  function toggle() {
    const isOpen = menu.classList.contains('open');
    isOpen ? close() : open();
  }

  // Click para abrir/cerrar
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggle();
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) close();
  });

  // Accesible: teclado (Esc, flechas básicas)
  menu.addEventListener('keydown', (e) => {
    const items = [...menu.querySelectorAll('.menu-list a')];
    const idx = items.indexOf(document.activeElement);

    // Abrir con ArrowDown desde el botón
    if (e.key === 'ArrowDown' && document.activeElement === btn) {
      e.preventDefault();
      open();
      (items[0] || btn).focus();
    }
    // Navegación dentro de la lista
    else if (e.key === 'ArrowDown' && idx > -1) {
      e.preventDefault();
      (items[idx + 1] || items[0]).focus();
    }
    else if (e.key === 'ArrowUp' && idx > -1) {
      e.preventDefault();
      (items[idx - 1] || items[items.length - 1]).focus();
    }
    // Cerrar con Esc
    else if (e.key === 'Escape') {
      close();
      btn.focus();
    }
  });
})();
