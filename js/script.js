  const toggleBtn = document.getElementById('toggleBtn');
  const sidebar = document.getElementById('sidebar');

  toggleBtn.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      // Mobile view: show/hide sidebar
      sidebar.classList.toggle('active');
    } else {
      // Desktop view: collapse/expand sidebar
      sidebar.classList.toggle('collapsed');
    }
  });

  // Function to type text character by character
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

  // Usage:
  const headline = document.getElementById('headline-typing');
  typeText("Hi, I'm Kevin", headline, 100);

