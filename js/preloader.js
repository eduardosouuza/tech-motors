(() => {
  const loader = document.querySelector('#preloader');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let finished = false;
  let exiting = false;
  let release;
  window.siteReady = new Promise(resolve => { release = resolve; });
  loader.hidden = false;

  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(safetyTimer);
    loader.remove();
    release();
  }

  // Never leave the page covered if a library, image or third-party iframe stalls.
  const safetyTimer = setTimeout(finish, 3000);
  window.dismissPreloader = () => {
    if (finished || exiting) return;
    exiting = true;
    if (window.gsap && !reducedMotion.matches) {
      gsap.timeline({ onComplete: finish })
        .to('.preloader-track span', { scaleX: 1, duration: .2 })
        .to('.preloader-content', { y: -16, opacity: 0, duration: .25 })
        .to(loader, { yPercent: -100, duration: .55, ease: 'power3.inOut' }, '-=.1');
    } else {
      finish();
    }
  };
  addEventListener('pageshow', event => { if (event.persisted) finish(); });
})();
