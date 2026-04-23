/* =========================================
   KINOMORI MAIN ENGINE — Multi-page
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Wait for components injection ---------- */
  setTimeout(() => {
    initNavbar();
    initMobileMenu();
    initCartListeners();
  }, 50);

  initReveal();
  initShopFilters();
  initHeroParallax();

  /* ---------- Navbar Glass Effect ---------- */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    function handleScroll() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ---------- Mobile Menu ---------- */
  function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
      });

      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('mobile-open');
        });
      });
    }
  }

  /* ---------- Cart Drawer Listeners (re-bind after injection) ---------- */
  function initCartListeners() {
    document.getElementById('cartTrigger')?.addEventListener('click', openCart);
    document.getElementById('closeCart')?.addEventListener('click', closeCart);
    document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  }

  /* ---------- Scroll Reveal ---------- */
  function initReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ---------- Shop Filters ---------- */
  function initShopFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    if (!filterBtns.length || !productCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        productCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ---------- Hero Parallax ---------- */
  function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (hero && !window.matchMedia('(pointer: coarse)').matches) {
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        hero.style.setProperty('--mx', x + 'px');
        hero.style.setProperty('--my', y + 'px');
      });
    }
  }

});
