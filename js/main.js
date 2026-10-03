// Austin Tours - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // ===== Dark Mode Toggle =====
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const html = document.documentElement;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    html.classList.add('dark');
    if (sunIcon && moonIcon) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      if (sunIcon && moonIcon) {
        sunIcon.classList.toggle('hidden', !isDark);
        moonIcon.classList.toggle('hidden', isDark);
      }
    });
  }

  // ===== Sticky Navbar Style on Scroll =====
  const navbar = document.getElementById('navbar');
  
  function updateNavbar() {
    if (!navbar) return;
    
    if (window.scrollY > 50) {
      navbar.classList.add('bg-ocean-800/90', 'nav-glass', 'shadow-lg');
      navbar.classList.remove('bg-transparent');
    } else {
      // Only transparent on homepage hero
      if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        navbar.classList.remove('bg-ocean-800/90', 'nav-glass', 'shadow-lg');
      } else {
        navbar.classList.add('bg-ocean-800/90', 'nav-glass', 'shadow-lg');
      }
    }
  }

  // Initial state for non-homepage
  if (navbar && !window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
    navbar.classList.add('bg-ocean-800/90', 'nav-glass', 'shadow-lg');
  }

  window.addEventListener('scroll', updateNavbar);
  updateNavbar();

  // ===== Mobile Menu =====
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ===== Language Toggle (hint only) =====
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    let isSpanish = false;
    langToggle.addEventListener('click', () => {
      isSpanish = !isSpanish;
      langToggle.querySelector('span').textContent = isSpanish ? 'ES' : 'EN';
      // Placeholder — full i18n would go here
    });
  }

  // ===== Destination Filters (for destinations.html) =====
  const filterButtons = document.querySelectorAll('[data-filter]');
  const destinationCards = document.querySelectorAll('[data-category]');

  if (filterButtons.length && destinationCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active state
        filterButtons.forEach(b => {
          b.classList.remove('bg-ocean-500', 'text-white');
          b.classList.add('bg-white', 'dark:bg-ocean-700', 'text-ocean-700', 'dark:text-sand-100');
        });
        btn.classList.add('bg-ocean-500', 'text-white');
        btn.classList.remove('bg-white', 'dark:bg-ocean-700', 'text-ocean-700', 'dark:text-sand-100');

        // Filter cards
        destinationCards.forEach(card => {
          if (filter === 'all' || card.dataset.category.includes(filter)) {
            card.classList.remove('hidden');
            card.classList.add('animate-fade-in');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ===== Smooth reveal on scroll (simple) =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
    observer.observe(el);
  });

  // ===== Contact Form Handler =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      // Simulate submission
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.classList.add('bg-green-500');
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.classList.remove('bg-green-500');
        }, 2500);
      }, 1200);
    });
  }
});
