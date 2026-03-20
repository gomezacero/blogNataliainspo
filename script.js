// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavClose = document.querySelector('.mobile-nav-close');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ===== HEADER SHADOW ON SCROLL =====
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
  });
}

// ===== STICKY BADGE SHOW/HIDE =====
const stickyBadge = document.querySelector('.sticky-badge');
const hero = document.querySelector('.hero') || document.querySelector('.post-hero');

if (stickyBadge && hero) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stickyBadge.classList.remove('sticky-badge--visible');
      } else {
        stickyBadge.classList.add('sticky-badge--visible');
      }
    });
  }, { threshold: 0.1 });

  heroObserver.observe(hero);
}

// ===== SCROLL REVEAL (Infographic steps & general) =====
const revealElements = document.querySelectorAll('.infographic-step, .reveal');

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('infographic-step')) {
          entry.target.classList.add('infographic-step--visible');
        } else {
          entry.target.classList.add('reveal--visible');
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealElements.forEach(el => revealObserver.observe(el));
}

// ===== TIKTOK CAROUSEL NAVIGATION =====
const tiktokCarousel = document.getElementById('tiktok-carousel');
const tiktokPrev = document.getElementById('tiktok-prev');
const tiktokNext = document.getElementById('tiktok-next');

if (tiktokCarousel && tiktokPrev && tiktokNext) {
  const scrollAmount = 240;

  tiktokNext.addEventListener('click', () => {
    tiktokCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  tiktokPrev.addEventListener('click', () => {
    tiktokCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
