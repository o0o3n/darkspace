const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.service-card');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');
const choices = document.querySelectorAll('.choice');
const resultTitle = document.querySelector('#resultTitle');
const resultCopy = document.querySelector('#resultCopy');
const themeToggle = document.querySelector('.theme-toggle');

if (localStorage.getItem('darkspace-theme') === 'dark') {
  document.body.dataset.theme = 'dark';
  themeToggle?.setAttribute('aria-pressed', 'true');
}

themeToggle?.addEventListener('click', () => {
  const isDark = document.body.dataset.theme === 'dark';
  document.body.dataset.theme = isDark ? 'light' : 'dark';
  localStorage.setItem('darkspace-theme', isDark ? 'light' : 'dark');
  themeToggle.setAttribute('aria-pressed', String(!isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Включить чёрную тему' : 'Выключить чёрную тему');
});

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;

    cards.forEach((card) => {
      const visible = category === 'all' || card.dataset.category === category;
      card.classList.toggle('hidden', !visible);
    });
  });
});

choices.forEach((choice) => {
  choice.addEventListener('click', () => {
    choices.forEach((item) => item.classList.remove('active'));
    choice.classList.add('active');
    resultTitle.textContent = choice.dataset.result;
    resultCopy.textContent = choice.dataset.copy;
  });
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mainNav.classList.toggle('open', !isOpen);
});

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.textContent = 'Спасибо! Мы свяжемся с вами в течение рабочего дня.';
    contactForm.reset();
  });
}
