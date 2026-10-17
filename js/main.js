/**
 * Eman Portfolio - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Navbar Toggle & Auto-close
  const toggler = document.querySelector('.navbar-toggler');
  const navMenu = document.querySelector('#navMenu');
  const navLinks = document.querySelectorAll('.custom-navbar .nav-link');

  if (toggler && navMenu) {
    toggler.addEventListener('click', function () {
      navMenu.classList.toggle('show');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        if (navMenu.classList.contains('show')) {
          navMenu.classList.remove('show');
        }
      });
    });
  }

  // 2. Active Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.custom-navbar .nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);

  // 3. Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Contact Form Submission Simulation
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const message = document.getElementById('userMessage').value.trim();

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.className = 'alert alert-warning mt-3';
          formFeedback.innerHTML = '⚠️ Please fill out all fields before sending.';
          formFeedback.classList.remove('d-none');
        }
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();

        if (formFeedback) {
          formFeedback.className = 'alert alert-success mt-3';
          formFeedback.innerHTML = '🎉 Thank you, <strong>' + name + '</strong>! Your message has been sent successfully.';
          formFeedback.classList.remove('d-none');

          setTimeout(() => {
            formFeedback.classList.add('d-none');
          }, 6000);
        }
      }, 1000);
    });
  }
});
