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

// ===== HEADER SMART SCROLL =====
const header = document.querySelector('.site-header');
if (header) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Glassmorphism shadow toggle
    if (currentScroll > 50) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
    
    // Hide/Show intelligent logic (hide on scroll down, show on scroll up)
    if (currentScroll > lastScroll && currentScroll > 150) {
      // Scrolling down (Hide)
      header.classList.add('site-header--hidden');
    } else {
      // Scrolling up (Show)
      header.classList.remove('site-header--hidden');
    }
    
    // For Mobile or negative scrolling
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
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

// ===== INTERACTIVE POST COMPONENTS =====
document.addEventListener('DOMContentLoaded', () => {

  // --- QUIZ INTERACTIVO ---
  const quizzes = document.querySelectorAll('.quiz');
  quizzes.forEach(quiz => {
    let score = 0;
    let answered = 0;
    const questions = quiz.querySelectorAll('.quiz__question');
    const total = questions.length;
    const scoreEl = quiz.querySelector('.quiz__score');
    const scoreNum = quiz.querySelector('.quiz__score-number');

    quiz.querySelectorAll('.quiz__option').forEach(btn => {
      btn.addEventListener('click', function() {
        const question = this.closest('.quiz__question');
        if (question.classList.contains('quiz--answered')) return;
        question.classList.add('quiz--answered');

        const correct = question.getAttribute('data-correct');
        const selected = this.getAttribute('data-value');
        const options = question.querySelectorAll('.quiz__option');
        const feedback = question.querySelector('.quiz__feedback');

        options.forEach(opt => {
          opt.classList.add('quiz__option--answered');
          if (opt.getAttribute('data-value') === correct) {
            opt.classList.add('quiz__option--correct');
          }
        });

        if (selected === correct) {
          this.classList.add('quiz__option--correct');
          score++;
        } else {
          this.classList.add('quiz__option--incorrect');
        }

        if (feedback) feedback.classList.add('quiz__feedback--visible');

        answered++;
        if (answered === total && scoreEl && scoreNum) {
          scoreNum.textContent = `${score}/${total}`;
          scoreEl.classList.add('quiz__score--visible');
        }
      });
    });
  });

  // --- CHECKLIST INTERACTIVO ---
  const checklists = document.querySelectorAll('.checklist');
  checklists.forEach(checklist => {
    const items = checklist.querySelectorAll('.checklist__item');
    const progressFill = checklist.querySelector('.checklist__progress-fill');
    const completeMsg = checklist.querySelector('.checklist__complete');

    items.forEach(item => {
      item.addEventListener('click', function() {
        this.classList.toggle('checklist__item--checked');
        const checkedCount = checklist.querySelectorAll('.checklist__item--checked').length;
        const pct = (checkedCount / items.length) * 100;
        
        if (progressFill) progressFill.style.width = pct + '%';
        if (completeMsg) {
          if (checkedCount === items.length) {
            completeMsg.classList.add('checklist__complete--visible');
          } else {
            completeMsg.classList.remove('checklist__complete--visible');
          }
        }
      });
    });
  });

  // --- TIMESTAMPS CLICK ---
  const timestampBtns = document.querySelectorAll('.timestamps-interactive__item');
  const videoEmbed = document.querySelector('.video-embed');
  timestampBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      timestampBtns.forEach(b => b.classList.remove('timestamps-interactive__item--active'));
      this.classList.add('timestamps-interactive__item--active');
      if (videoEmbed) {
        videoEmbed.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // --- FLIP CARDS ---
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    // Remove inline onclick if exists to avoid duplication
    card.removeAttribute('onclick');
    card.addEventListener('click', function() {
      this.classList.toggle('flip-card--flipped');
    });
  });

  // --- INFOGRAPHIC PROGRESS TRACKER ---
  const tracker = document.getElementById('progress-tracker');
  const steps = document.querySelectorAll('.infographic-step');
  
  if (tracker && steps.length && 'IntersectionObserver' in window) {
    const dots = tracker.querySelectorAll('.progress-tracker__dot');
    const lines = tracker.querySelectorAll('.progress-tracker__line');
    
    // Tracker visibility based on content area
    const articleContent = document.querySelector('.post-content');
    if (articleContent) {
      const trackerVisObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tracker.classList.add('progress-tracker--visible');
          } else {
            tracker.classList.remove('progress-tracker--visible');
          }
        });
      }, { threshold: 0.05 });
      trackerVisObserver.observe(articleContent);
    }
    
    // Step activation observer
    const stepVisObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const stepNum = entry.target.getAttribute('data-step');
        if (stepNum) {
          const idx = parseInt(stepNum) - 1;
          if (entry.isIntersecting && dots[idx]) {
            dots[idx].classList.add('progress-tracker__dot--active');
            if (lines[idx]) lines[idx].classList.add('progress-tracker__line--active');
          }
        }
      });
    }, { threshold: 0.3 });
    
    steps.forEach(step => stepVisObserver.observe(step));
  }

  // --- COUNTDOWN TIMER ---
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    // For demo purposes, we set an event date in the future
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 15); // 15 days from now
    eventDate.setHours(10, 0, 0, 0);
    const eventTime = eventDate.getTime();
    
    function updateCountdown() {
      const now = new Date().getTime();
      const diff = eventTime - now;

      if (diff <= 0) {
        const grid = countdownEl.querySelector('.countdown__grid');
        const heading = countdownEl.querySelector('.countdown__heading');
        if (grid) grid.innerHTML = '<p class="countdown__expired">El evento ya lleg&oacute;</p>';
        if (heading) heading.textContent = '';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const dEl = document.getElementById('countdown-days');
      const hEl = document.getElementById('countdown-hours');
      const mEl = document.getElementById('countdown-mins');
      const sEl = document.getElementById('countdown-secs');
      
      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // --- POLL INTERACTIVO ---
  const pollOptions = document.querySelectorAll('.poll__option');
  if (pollOptions.length > 0) {
    let pollVoted = false;
    try { pollVoted = localStorage.getItem('agape-poll-voted') === 'true'; } catch(e) {}

    const updatePollUI = (selectedChoice) => {
      pollOptions.forEach(opt => {
        opt.classList.add('poll__option--voted');
        const pct = opt.getAttribute('data-percent');
        const bar = opt.querySelector('.poll__bar');
        if (bar) {
          // small delay for animation
          setTimeout(() => { bar.style.width = pct + '%'; }, 50);
        }
        if (selectedChoice && opt.getAttribute('data-option') === selectedChoice) {
          opt.classList.add('poll__option--selected');
        }
      });
    };

    if (pollVoted) {
      let savedChoice = null;
      try { savedChoice = localStorage.getItem('agape-poll-choice'); } catch(e) {}
      updatePollUI(savedChoice);
    }

    pollOptions.forEach(btn => {
      btn.addEventListener('click', function() {
        if (pollVoted) return;
        pollVoted = true;
        const choice = this.getAttribute('data-option');
        try {
          localStorage.setItem('agape-poll-voted', 'true');
          localStorage.setItem('agape-poll-choice', choice);
        } catch(e) {}
        updatePollUI(choice);
      });
    });
  }
});

// ===================================================================
// LUXURY UX: Custom Cursor, Magnetic Buttons, and GSAP Reveal
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. PREMIUM CUSTOM CURSOR ---
  const cursor = document.querySelector('.custom-cursor');
  if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    const speed = 0.15; // lerp speed for smooth trailing

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const moveCursor = () => {
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      requestAnimationFrame(moveCursor);
    };
    moveCursor();

    // Hover states for links and buttons
    const hoverElements = document.querySelectorAll('a, button, .quiz__option, .checklist__item, .magnetic');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Special hover state for images or cards
    const textHoverElements = document.querySelectorAll('.card, .product-card, .tiktok-card');
    textHoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover-text');
        cursor.classList.remove('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover-text');
      });
    });
  }

  // --- 2. MAGNETIC BUTTONS ---
  const magneticEls = document.querySelectorAll('.magnetic');
  // Only apply logic if GSAP is loaded
  if (typeof gsap !== 'undefined') {
    magneticEls.forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        // Calculate distance from center
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.35, // magnetic strength x
          y: y * 0.35, // magnetic strength y
          duration: 0.4,
          ease: "power3.out"
        });
      });
      
      el.addEventListener('mouseleave', () => {
        // Snap back to original position
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });
  }

  // --- 3. GSAP SCROLL REVEAL (Editorial Look) ---
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade up the Hero text (replacement for the old CSS --delay method)
    // First, clear old animations if we apply GSAP
    const heroElements = document.querySelectorAll(".hero__word, .hero__animate");
    if (heroElements.length) {
      gsap.fromTo(heroElements, 
        { y: 50, opacity: 0 }, 
        {
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power4.out", 
          delay: 0.2
        }
      );
    }

    // Scroll reveal for main titles and sections
    const sections = gsap.utils.toArray('.section__title, .about-section, .quote-section blockquote, .cards-grid');
    sections.forEach(section => {
      gsap.fromTo(section, 
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 85%", // when the top of the section hits 85% of the viewport
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      );
    });
  }
});
