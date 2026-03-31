// ============================================
// FOXI.KZ — Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- HEADER SCROLL ----
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // ---- BURGER MENU ----
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger?.addEventListener('click', () => {
    nav.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    if (nav.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // ---- LIVE CLOCK ----
  function updateClocks() {
    const now = new Date();
    const time = now.toLocaleTimeString('ru-RU', { hour12: false });
    const el = document.getElementById('liveClock');
    if (el) el.textContent = time;
  }
  updateClocks();
  setInterval(updateClocks, 1000);

  // ---- COUNT UP ----
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + '+';
        if (current >= target) clearInterval(timer);
      }, 24);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObserver.observe(el));

  // ---- PRODUCT TABS ----
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
      tab.classList.add('tab--active');
      document.querySelectorAll('.products__grid').forEach(g => g.classList.add('hidden'));
      const grid = document.getElementById('tab-' + tab.dataset.tab);
      if (grid) {
        grid.classList.remove('hidden');
        grid.querySelectorAll('.product-card').forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 80);
        });
      }
    });
  });

  // ---- SCROLL REVEAL ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.07 + 's';
    revealObserver.observe(el);
  });

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY
          - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  // ---- CONTACT FORM ----
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Отправка...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Заявка отправлена!';
      btn.style.background = 'var(--green)';
      btn.style.borderColor = 'var(--green)';
      btn.style.color = '#000';
      form.reset();
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 4000);
    }, 1200);
  });

  // ---- PHONE FORMAT ----
  document.getElementById('phone')?.addEventListener('input', e => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('8')) val = '7' + val.slice(1);
    if (val.startsWith('7') && val.length > 1) {
      val = '+7 (' + val.slice(1,4) + ') ' + val.slice(4,7) + '-' + val.slice(7,9) + '-' + val.slice(9,11);
    } else if (val) val = '+' + val;
    e.target.value = val;
  });

});
