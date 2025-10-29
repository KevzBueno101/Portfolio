document.addEventListener('DOMContentLoaded', function() {
  // Toggle Sidebar
  const toggleBtn = document.getElementById('toggleBtn');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  const backToTopBtn = document.querySelector('.back-to-top');

  // Toggle sidebar on button click
  toggleBtn.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      // Mobile view: show/hide sidebar
      sidebar.classList.toggle('active');
      mainContent.classList.toggle('blur');
    } else {
      // Desktop view: collapse/expand sidebar
      sidebar.classList.toggle('collapsed');
    }
  });

  // Typing Effect
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

  // Initialize typing effect
  const headline = document.getElementById('headline-typing');
  if (headline) {
    typeText("Hi, I'm Kevin", headline, 100);
  }

  // Back to Top Button
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

  // Initialize Skill Bars
  function initSkillBars() {
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
      const level = skill.getAttribute('data-level');
      const levelBar = skill.querySelector('.skill-level');
      levelBar.style.width = `${level}%`;
    });
  }

  // Initialize Project Carousel
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
      const offset = -currentIndex * 100;
      carousel.style.transform = `translateX(${offset}%)`;
      
      // Update active dot
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = (index + projects.length) % projects.length;
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
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-advance carousel
    let carouselInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    carousel.parentElement.addEventListener('mouseenter', () => {
      clearInterval(carouselInterval);
    });

    carousel.parentElement.addEventListener('mouseleave', () => {
      carouselInterval = setInterval(nextSlide, 5000);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('active');
          mainContent.classList.remove('blur');
        }
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add form submission logic here
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }

  // Initialize components
  initSkillBars();
  initProjectCarousel();

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .contact-item');
    
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
  document.querySelectorAll('.project-card, .skill-category, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Run once on load
  setTimeout(animateOnScroll, 500);
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});
// Mobile Navbar - Glassmorphism, Smooth Scroll, and Active Section Highlighting
document.addEventListener('DOMContentLoaded', function() {
  const mobileNavbar = document.getElementById('mobileNavbar');
  const navItems = document.querySelectorAll('.mobile-nav-item');

  // Glassmorphism scroll effect
  if (mobileNavbar) {
    window.addEventListener('scroll', function() {
      if (window.innerWidth <= 768) {
        if (window.scrollY > 50) {
          mobileNavbar.classList.add('scrolled');
        } else {
          mobileNavbar.classList.remove('scrolled');
        }

        // Highlight active section
        highlightActiveSection();
      }
    });

    // Remove scrolled class on resize if not mobile
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        mobileNavbar.classList.remove('scrolled');
      }
    });
  }

  // Smooth scroll to sections when clicking nav items
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = mobileNavbar ? mobileNavbar.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        // Add active class to clicked item
        this.classList.add('active');
      }
    });
  });

  // Function to highlight active section based on scroll position
  function highlightActiveSection() {
    const scrollPosition = window.scrollY + 150; // Offset for better detection
    const navbarHeight = mobileNavbar ? mobileNavbar.offsetHeight : 0;

    // Get all sections with IDs
    const sections = [
      { id: 'home', element: document.getElementById('home') || document.querySelector('.headline') },
      { id: 'about-section', element: document.getElementById('about-section') },
      { id: 'skills', element: document.getElementById('skills') },
      { id: 'projects', element: document.getElementById('projects') },
      { id: 'certificates', element: document.getElementById('certificates') },
      { id: 'contact', element: document.getElementById('contact') }
    ];

    let currentSection = null;

    // Find which section we're currently in
    sections.forEach(section => {
      if (section.element) {
        const sectionTop = section.element.offsetTop - navbarHeight;
        const sectionBottom = sectionTop + section.element.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.id;
        }
      }
    });

    // Special case: if at the very top, activate Home
    if (window.scrollY < 100) {
      currentSection = 'home';
    }

    // Special case: if at the very bottom, activate last section (contact)
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
    }
  }

  // Initialize - set first item as active
  if (navItems.length > 0) {
    navItems[0].classList.add('active');
  }

  // Run once on load
  if (window.innerWidth <= 768) {
    highlightActiveSection();
  }

  // Also run on window load to ensure all elements are loaded
  window.addEventListener('load', function() {
    if (window.innerWidth <= 768) {
      highlightActiveSection();
    }
  });
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('demoModal');
  var btn = document.getElementById('openDemoModal');
  var span = document.getElementById('closeDemoModal');

  btn.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
  }
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});