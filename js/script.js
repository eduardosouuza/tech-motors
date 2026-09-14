const message = encodeURIComponent('Olá! Vim pelo site da Tech Motors e gostaria de solicitar um orçamento.');
document.querySelectorAll('[data-whatsapp]').forEach(link => link.href = `https://wa.me/5551992102079?text=${message}`);

const header = document.querySelector('.header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 25), { passive: true });

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const process = document.querySelector('.process-track');
const fill = document.querySelector('.track-fill');
const processObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; fill.style.width = '100%'; process.querySelectorAll('article').forEach((step, i) => setTimeout(() => step.classList.add('active'), i * 150)); processObserver.unobserve(process); }), { threshold: .35 });
processObserver.observe(process);
