const message = encodeURIComponent('Olá! Vim pelo site da Tech Motors e gostaria de solicitar um orçamento.');
document.querySelectorAll('[data-whatsapp]').forEach(link => link.href = `https://wa.me/5551992102079?text=${message}`);

const header = document.querySelector('.header');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const syncHeader = () => header.classList.toggle('scrolled', scrollY > 25);
addEventListener('scroll', syncHeader, { passive: true });
syncHeader();
function setMenu(open, restoreFocus = false) {
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  if (open && window.gsap && !reducedMotion.matches) {
    gsap.fromTo(nav.querySelectorAll('a'), { opacity: 0, x: -12 }, {
      opacity: 1, x: 0, duration: .25, stagger: .035, overwrite: true, clearProps: 'all'
    });
  }
  if (restoreFocus) menu.focus();
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', event => { if (!header.contains(event.target)) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) setMenu(false, true);
});
header.addEventListener('focusout', event => { if (!header.contains(event.relatedTarget)) setMenu(false); });
matchMedia('(max-width: 1100px)').addEventListener('change', () => setMenu(false));

// Content remains visible when animation libraries are unavailable.
(window.siteReady || Promise.resolve()).then(() => {
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const motion = gsap.matchMedia();
  motion.add({ animate: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1101px)' }, context => {
    if (!context.conditions.animate) return;
    gsap.timeline({ defaults: { duration: .7, ease: 'power3.out' } })
      .from('.hero-content > .reveal', { y: 28, opacity: 0, stagger: .12, clearProps: 'transform,opacity' })
      .from('.hero-image', { scale: 1.06, duration: 1.4, ease: 'power2.out', clearProps: 'transform' }, 0);
    gsap.utils.toArray('.reveal').filter(el => !el.closest('.hero')).forEach(el => {
      gsap.from(el, {
        y: 30, opacity: 0, duration: .65, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: el, start: 'top 94%', once: true }
      });
    });
    gsap.from('.trust-items p', {
      y: 15, opacity: 0, stagger: .1, duration: .5, clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '.trust-bar', start: 'top 92%', once: true }
    });
    gsap.from('.red-corner', {
      scale: .6, opacity: 0, duration: .9, ease: 'power2.out', clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '.about-visual', start: 'top 80%', once: true }
    });
    gsap.timeline({ scrollTrigger: { trigger: '.process-track', start: 'top 85%', once: true } })
      .to('.track-fill', { width: '100%', duration: 1.2, ease: 'power1.inOut' })
      .to('.process-track b', { backgroundColor: '#ff1a1a', stagger: .12, duration: .3 }, 0);
    // Keep native touch scrolling and reserve parallax for larger screens.
    if (context.conditions.desktop) {
      ['.wide-cta-bg', '.final-bg'].forEach(selector => {
        gsap.fromTo(selector, { yPercent: -6, scale: 1.14 }, {
          yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: document.querySelector(selector).parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 }
        });
      });
    }
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
});

// Wait for the hero image, without depending on maps or other external embeds.
const heroPhoto = new Image();
heroPhoto.onload = heroPhoto.onerror = () => window.dismissPreloader?.();
heroPhoto.src = 'assets/oficina.jpg';
