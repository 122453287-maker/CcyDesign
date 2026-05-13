/* ========================================
   Header scroll effect
   ======================================== */
const header = document.getElementById('header');

function updateHeader() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* ========================================
   Mobile menu toggle
   ======================================== */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

function toggleMenu() {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('show');
  document.body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
}

function closeMenu() {
  navToggle.classList.remove('active');
  navMenu.classList.remove('show');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', toggleMenu);
navLinks.forEach(link => link.addEventListener('click', closeMenu));

/* ========================================
   Active nav link on scroll
   ======================================== */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

/* ========================================
   Portfolio filter
   ======================================== */
const filterButtons = document.querySelectorAll('.portfolio__filter');
const portfolioItems = document.querySelectorAll('.portfolio__item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ========================================
   Testimonial slider
   ======================================== */
const dots = document.querySelectorAll('.testimonials__dot');
const cards = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;
let autoSlideInterval;

function showTestimonial(index) {
  cards.forEach(card => card.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  cards[index].classList.add('active');
  dots[index].classList.add('active');
  currentIndex = index;
}

function nextTestimonial() {
  const next = (currentIndex + 1) % cards.length;
  showTestimonial(next);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextTestimonial, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.dataset.index);
    showTestimonial(index);
    stopAutoSlide();
    startAutoSlide();
  });
});

startAutoSlide();

/* ========================================
   Scroll reveal animation
   ======================================== */
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach(el => observer.observe(el));

/* ========================================
   Contact form
   ======================================== */
const contactForm = document.getElementById('contact-form');

function showError(input, message) {
  input.classList.add('error');
  const existing = input.parentElement.querySelector('.form__error');
  if (!existing) {
    const errorEl = document.createElement('span');
    errorEl.className = 'form__error';
    errorEl.style.cssText = 'color:#d44;font-size:0.78rem;margin-top:4px;display:block;';
    errorEl.textContent = message;
    input.parentElement.appendChild(errorEl);
  }
}

function clearError(input) {
  input.classList.remove('error');
  const existing = input.parentElement.querySelector('.form__error');
  if (existing) existing.remove();
}

function validateForm(data) {
  let valid = true;

  if (!data.name.trim()) {
    showError(document.getElementById('name'), '请输入您的姓名');
    valid = false;
  } else {
    clearError(document.getElementById('name'));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim() || !emailRegex.test(data.email.trim())) {
    showError(document.getElementById('email'), '请输入有效的邮箱地址');
    valid = false;
  } else {
    clearError(document.getElementById('email'));
  }

  if (!data.message.trim()) {
    showError(document.getElementById('message'), '请描述您的项目需求');
    valid = false;
  } else {
    clearError(document.getElementById('message'));
  }

  return valid;
}

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    projectType: document.getElementById('project-type').value,
    message: document.getElementById('message').value,
  };

  // Clear previous errors
  document.querySelectorAll('.form__error').forEach(el => el.remove());
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

  if (!validateForm(formData)) return;

  // Simulate submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalHTML = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 发送中...';
  submitBtn.disabled = true;

  setTimeout(() => {
    // Show success
    const formWrapper = document.querySelector('.contact__form-wrapper');
    formWrapper.innerHTML = `
      <div class="form__success show">
        <i class="fa-regular fa-circle-check"></i>
        <h3>咨询已发送！</h3>
        <p>感谢您的联系，我们将在24小时内回复您。</p>
      </div>
    `;
  }, 1500);
});

/* ========================================
   Mobile nav - close on outside click
   ======================================== */
document.addEventListener('click', (e) => {
  if (
    navMenu.classList.contains('show') &&
    !navMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    closeMenu();
  }
});
