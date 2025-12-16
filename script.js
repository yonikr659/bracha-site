// Mobile menu toggle (accessible + close on outside/scroll/resize/escape)
(function () {
  const btn = document.querySelector('[data-burger]');
  const panel = document.querySelector('[data-mobile-panel]');
  if (!btn || !panel) return;

  const isOpen = () => btn.getAttribute('aria-expanded') === 'true';

  const setExpanded = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;

    if (open) {
      const first = panel.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
      if (first && typeof first.focus === 'function') first.focus();
    }
  };

  setExpanded(false);

  // Toggle
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // שלא ייסגר מיד בגלל "לחיצה מחוץ"
    setExpanded(!isOpen());
  });

  // Close when clicking a link inside the mobile panel
  panel.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a');
    if (a) setExpanded(false);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    const clickedInside = panel.contains(e.target) || btn.contains(e.target);
    if (!clickedInside) setExpanded(false);
  });

  // Close on scroll
  window.addEventListener('scroll', () => {
    if (isOpen()) setExpanded(false);
  }, { passive: true });

  // Close on resize
  window.addEventListener('resize', () => {
    if (isOpen()) setExpanded(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setExpanded(false);
      btn.focus();
    }
  });
})();

// Contact form -> open WhatsApp with pre-filled message
(function () {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;

    const name = form.querySelector('#name')?.value?.trim() || '';
    const phone = form.querySelector('#phone')?.value?.trim() || '';
    const date = form.querySelector('#date')?.value?.trim() || '';
    const type = form.querySelector('#type')?.value?.trim() || '';
    const msg = form.querySelector('#message')?.value?.trim() || '';

    const text =
      `היי ברכה,\n\n` +
      `שמי ${name || '---'}\n` +
      `טלפון: ${phone || '---'}\n` +
      (date ? `תאריך: ${date}\n` : '') +
      (type ? `סוג איפור: ${type}\n` : '') +
      `\nהודעה: ${msg || '---'}\n`;

    const waNumber = '972587158190';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

    window.open(waUrl, '_blank', 'noopener');
  });
})();
