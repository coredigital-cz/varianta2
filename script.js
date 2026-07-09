/* ADC Acoperisuri de Calitate — script.js */
document.addEventListener('DOMContentLoaded', () => {

  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30));

  const hb = document.getElementById('hb'), nl = document.getElementById('nl');
  if (hb && nl) hb.addEventListener('click', () => { hb.classList.toggle('open'); nl.classList.toggle('open'); });
  if (nl) nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hb && hb.classList.remove('open'); nl.classList.remove('open');
  }));

  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero stagger with bounce
    gsap.utils.toArray('.hero .rv').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: .85, delay: .12 * i, ease: 'back.out(1.4)' });
    });

    // Hero background subtle zoom-out on load
    gsap.fromTo('.hero-bg img', { scale: 1.18 }, { scale: 1.08, duration: 2.2, ease: 'power2.out' });

    // Trust bar items stagger
    ScrollTrigger.batch('.trust-item', {
      start: 'top 92%',
      onEnter: b => gsap.fromTo(b, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5, stagger: .08, ease: 'back.out(1.6)', overwrite: true })
    });

    // Cards bouncy pop-in
    document.querySelectorAll('.cards').forEach(grid => {
      ScrollTrigger.batch(grid.querySelectorAll('.card'), {
        start: 'top 88%',
        onEnter: b => gsap.fromTo(b, { opacity: 0, y: 26, scale: .92 }, { opacity: 1, y: 0, scale: 1, duration: .65, stagger: .1, ease: 'back.out(1.5)', overwrite: true })
      });
    });

    // Split images: scale + rotate pop
    gsap.utils.toArray('.split-media').forEach(el => {
      gsap.fromTo(el, { opacity: 0, scale: .88, rotate: -2 }, {
        opacity: 1, scale: 1, rotate: 0, duration: .9, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
    // Split image parallax drift
    gsap.utils.toArray('.split-media img').forEach(img => {
      gsap.fromTo(img, { y: -14 }, {
        y: 14, ease: 'none',
        scrollTrigger: { trigger: img.closest('.split-media'), start: 'top bottom', end: 'bottom top', scrub: 1.4 }
      });
    });

    // Gallery bouncy stagger
    ScrollTrigger.batch('.g-item', {
      start: 'top 92%',
      onEnter: b => gsap.fromTo(b, { opacity: 0, scale: .8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: .6, stagger: .06, ease: 'back.out(1.6)', overwrite: true })
    });

    // Color swatches pop
    ScrollTrigger.batch('.color-chip', {
      start: 'top 92%',
      onEnter: b => gsap.fromTo(b, { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .5, stagger: .07, ease: 'back.out(2)', overwrite: true })
    });

    // Generic reveal for everything else
    gsap.utils.toArray('.rv').forEach(el => {
      if (el.closest('.hero') || el.classList.contains('card') || el.classList.contains('split-media') || el.classList.contains('g-item') || el.classList.contains('color-chip') || el.classList.contains('trust-item')) return;
      gsap.fromTo(el, { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, duration: .7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });

    // Animated counters
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dec = el.dataset.count.includes('.');
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.6, delay: .6, ease: 'power2.out',
        onUpdate: () => el.textContent = (dec ? obj.v.toFixed(1) : Math.round(obj.v)) + suffix
      });
    });
  }
});

function openLB(el) {
  const i = el.querySelector('img'); if (!i) return;
  document.getElementById('lb-img').src = i.src;
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLB() {
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow = '';
}
