export function initScrollToTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-to-top-btn';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
