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


// Toggle icon change on click
 document.getElementById('toggleIcon').addEventListener('click', function () {
  this.classList.toggle('fa-angle-left');
  this.classList.toggle('fa-angle-right');
});
