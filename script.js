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

// ===== HERO PARALLAX + FADE =====
const heroSection = document.querySelector('.hero');
const heroBg = document.querySelector('.hero__bg');
const heroContent = document.querySelector('.hero__content');

if (heroSection && heroBg && heroContent) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  if (!prefersReducedMotion && !isMobile) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = heroSection.offsetHeight;

          if (scrollY <= heroHeight) {
            heroBg.style.transform = 'translateY(' + (scrollY * 0.35) + 'px)';
            heroContent.style.opacity = 1 - (scrollY / (heroHeight * 0.7));
            heroContent.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
          }

          ticking = false;
        });
        ticking = true;
      }
    });
  }
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
