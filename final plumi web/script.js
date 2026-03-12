/* ══════════════════════════════════════════
   PLUMI — Interactions
   ══════════════════════════════════════════ */

// ── Navbar scroll effect ─────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Hamburger menu ───────────────────────
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  const navCta   = document.querySelector('.nav-cta');

  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  if (navLinks.style.display === 'flex') {
    navLinks.style.flexDirection = 'column';
    navLinks.style.position      = 'absolute';
    navLinks.style.top           = '70px';
    navLinks.style.left          = '0';
    navLinks.style.right         = '0';
    navLinks.style.background    = 'rgba(108,56,133,0.98)';
    navLinks.style.padding       = '24px';
    navLinks.style.gap           = '20px';
    navLinks.style.borderRadius  = '0 0 16px 16px';
    navCta.style.display         = 'block';
    navCta.style.margin          = '0 24px 24px';
  } else {
    navCta.style.display = '';
  }
});

// ── Fade-up scroll animations ────────────
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Apply fade-up to key sections
const animateTargets = [
  '.product-card',
  '.feature-card',
  '.testimonial-card',
  '.about-text',
  '.about-visual',
  '.section-header',
  '.stat',
];

animateTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${i * 80}ms`;
    observer.observe(el);
  });
});

// ── Product filter ───────────────────────
const filterBtns  = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Wishlist toggle ──────────────────────
document.querySelectorAll('.product-wish').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
  });
});

// ── Add to cart feedback ─────────────────
document.querySelectorAll('.btn-small').forEach(btn => {
  btn.addEventListener('click', () => {
    const original = btn.textContent;
    btn.textContent = 'Added! ✓';
    btn.style.background = '#27ae60';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
    }, 1800);
  });
});

// ── Newsletter form ──────────────────────
const nlForm = document.getElementById('nlForm');

nlForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = nlForm.querySelector('input');
  const btn   = nlForm.querySelector('button');

  btn.textContent     = 'Subscribed ✓';
  btn.style.background = '#27ae60';
  input.value          = '';
  input.placeholder    = 'You\'re on the list!';
  input.disabled       = true;

  setTimeout(() => {
    btn.textContent     = 'Subscribe';
    btn.style.background = '';
    input.placeholder    = 'your@email.com';
    input.disabled       = false;
  }, 3000);
});

// ── Smooth scroll for nav links ──────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Add to cart — nav cta ────────────────
document.querySelector('.nav-cta').addEventListener('click', () => {
  document.querySelector('#products').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
