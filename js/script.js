/* ============================================
   KEVIN BUENO PORTFOLIO - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== TYPING EFFECT =====
  function typeText(text, element, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }

  const headline = document.getElementById('headline-typing');
  if (headline) {
    typeText("Hi, I'm Kevin", headline, 100);
  }

  // ===== BACK TO TOP BUTTON =====
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===== MOBILE NAVBAR SCROLL EFFECT =====
  const mobileNavbar = document.getElementById('mobileNavbar');
  const navItems = document.querySelectorAll('.mobile-nav-item');

  if (mobileNavbar) {
    window.addEventListener('scroll', function() {
      if (window.innerWidth <= 768) {
        if (window.scrollY > 50) {
          mobileNavbar.classList.add('scrolled');
        } else {
          mobileNavbar.classList.remove('scrolled');
        }
        highlightActiveSection();
      }
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        mobileNavbar.classList.remove('scrolled');
      }
    });
  }

  // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = mobileNavbar ? mobileNavbar.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update active state
        navItems.forEach(nav => nav.classList.remove('active'));
        if (this.classList.contains('mobile-nav-item')) {
          this.classList.add('active');
        }
      }
    });
  });

  // ===== HIGHLIGHT ACTIVE SECTION =====
  function highlightActiveSection() {
    const scrollPosition = window.scrollY + 150;
    const navbarHeight = mobileNavbar ? mobileNavbar.offsetHeight : 0;

    const sections = [
      { id: 'home', element: document.getElementById('home') || document.querySelector('.headline') },
      { id: 'about-section', element: document.getElementById('about-section') },
      { id: 'skills', element: document.getElementById('skills') },
      { id: 'projects', element: document.getElementById('projects') },
      { id: 'certificates', element: document.getElementById('certificates') },
      { id: 'contact', element: document.getElementById('contact') }
    ];

    let currentSection = null;

    sections.forEach(section => {
      if (section.element) {
        const sectionTop = section.element.offsetTop - navbarHeight;
        const sectionBottom = sectionTop + section.element.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.id;
        }
      }
    });

    // Special cases
    if (window.scrollY < 100) {
      currentSection = 'home';
    }
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      currentSection = 'contact';
    }

    // Update active states
    if (currentSection) {
      navItems.forEach(item => {
        const itemSection = item.getAttribute('data-section');
        if (itemSection === currentSection) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // Update desktop sidebar
      document.querySelectorAll('.nav-bar a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  // Initialize active state
  if (navItems.length > 0) {
    navItems[0].classList.add('active');
  }

  // Run on load
  if (window.innerWidth <= 768) {
    highlightActiveSection();
  }

  window.addEventListener('load', function() {
    if (window.innerWidth <= 768) {
      highlightActiveSection();
    }
  });

  // ===== PROJECT CAROUSEL =====
  function initProjectCarousel() {
    const carousel = document.querySelector('.projects-carousel');
    if (!carousel) return;

    const projects = document.querySelectorAll('.project-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;

    // Create dots
    projects.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    function updateCarousel() {
      const cardWidth = projects[0].offsetWidth;
      const gap = 30; // Gap between cards
      const offset = currentIndex * (cardWidth + gap);
      carousel.scrollTo({
        left: offset,
        behavior: 'smooth'
      });
      
      // Update active dot
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, projects.length - 1));
      updateCarousel();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % projects.length;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + projects.length) % projects.length;
      updateCarousel();
    }

    // Event Listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto-advance carousel
    let carouselInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    if (carousel.parentElement) {
      carousel.parentElement.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
      });

      carousel.parentElement.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
      });
    }
  }

  initProjectCarousel();

  // ===== MODAL FUNCTIONALITY =====
  function setupModal(modalId, openBtnId, closeBtnId) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);

    if (openBtn && modal) {
      openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // Setup modals
  setupModal('demoModal1', 'openDemoModal1', 'closeDemoModal1');
  setupModal('demoModal2', 'openDemoModal2', 'closeDemoModal2');

  // ===== SCROLL ANIMATIONS =====
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skills-category, .cert-card, .about-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial styles for animation
  document.querySelectorAll('.project-card, .skills-category, .cert-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Run animations
  setTimeout(animateOnScroll, 500);
  window.addEventListener('scroll', animateOnScroll);

  // ===== FORM VALIDATION (Optional Enhancement) =====
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      // Basic validation (HTML5 handles most of this)
      if (name && email && message) {
        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
          e.preventDefault();
          alert('Please fill in all fields.');
          return false;
        }
      }
      
      // Form will submit normally to Web3Forms
    });
  }

  // ===== KEYBOARD NAVIGATION =====
  document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });

  // ===== PERFORMANCE: LAZY LOADING (if needed) =====
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    // Observe all images with loading="lazy"
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ===== CONSOLE MESSAGE =====
  console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'font-size: 18px; color: #64ffda; font-weight: bold;');
  console.log('%cInterested in the code? Check out the repository on GitHub!', 'font-size: 14px; color: #8892b0;');
  console.log('%c🚀 Built with HTML, CSS, and JavaScript', 'font-size: 12px; color: #ccd6f6;');
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
infiniteTypeText("Hi, I'm Kevin", headline, 100, 100);
//               ↑               ↑        ↑    ↑
//               text          element  type  pause
//                                      speed  time