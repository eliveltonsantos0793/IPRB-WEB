(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav');
  const links = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
  const topButton = document.querySelector('.to-top');
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  function closeMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('open');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
      nav.classList.toggle('open', !open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (innerWidth > 760) closeMenu(); });
  }
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(s => sectionObserver.observe(s));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }
  if (topButton) {
    const update = () => topButton.classList.toggle('visible', window.scrollY > 500);
    window.addEventListener('scroll', update, { passive: true }); update();
    topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
})();