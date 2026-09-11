function initPageTransitions() {
  const root = document.querySelector('.page-root');
  if (!root) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    root.classList.add('page-enter');
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('page-enter')));
  }
  if (window.__pageTransitionsBound) return;
  window.__pageTransitionsBound = true;
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('tel:') || a.target === '_blank') return;
    const currentRoot = document.querySelector('.page-root');
    if (!currentRoot || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    e.preventDefault();
    currentRoot.classList.add('page-out');
    setTimeout(() => { window.location.href = href; }, 380);
  });
}
