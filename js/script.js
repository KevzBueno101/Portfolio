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
