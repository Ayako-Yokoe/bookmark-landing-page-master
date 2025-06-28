const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const menu = document.querySelector('.menu');
const logoOriginal = document.getElementById('logo-oriignal');
const questions = document.querySelectorAll('.question');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

// Hamburger Menu
openBtn.addEventListener('click', () => {
  menu.classList.add('active');
  openBtn.setAttribute('aria-expanded', 'true');
  closeBtn.setAttribute('aria-expanded', 'false');
  logoOriginal.style.visibility = 'hidden';
  openBtn.style.visibility = 'hidden';

});

closeBtn.addEventListener('click', () => {
  menu.classList.remove('active');
  openBtn.setAttribute('aria-expanded', 'false');
  closeBtn.setAttribute('aria-expanded', 'true');
  logoOriginal.style.visibility = 'visible';
  openBtn.style.visibility = 'visible';
});

// Tab
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tabButtons.forEach((tabButton) => tabButton.classList.remove('active'));
    tabPanels.forEach((tabPanel) => tabPanel.classList.remove('active'));
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(`tab-${tabId}`).classList.add('active');
  })
});

// Accordion
questions.forEach((question) => {
  question.addEventListener('click', toggleAnswer);
});

function toggleAnswer() {
  const targetId = this.getAttribute('aria-controls');
  const targetAnswer = document.getElementById(targetId);
  let isExpanded = this.getAttribute('aria-expanded') === 'true';

  this.setAttribute('aria-expanded', !isExpanded);

  targetAnswer.classList.toggle('accordion-hidden', isExpanded);
  targetAnswer.classList.toggle('accordion-visible', !isExpanded);

  const ansOpenIcon = this.querySelector('.toggle-ans-icon-open');
  const ansCloseIcon = this.querySelector('.toggle-ans-icon-close');

  ansOpenIcon.classList.toggle('toggle-ans-icon-hidden', !isExpanded);
  ansOpenIcon.classList.toggle('toggle-ans-icon-visible', isExpanded);

  ansCloseIcon.classList.toggle('toggle-ans-icon-hidden', isExpanded);
  ansCloseIcon.classList.toggle('toggle-ans-icon-visible', !isExpanded);
}

// Subscription Error
function validateEmail(input) {
  const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexp.test(input.value);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const inputlWrapper = document.querySelector('.input-wrapper');
  const errorWrapper = document.querySelector('.error-wrapper');
  const errorIcon = document.querySelector('.error-icon');
  const contactBtn = document.getElementById('contact-btn');

  emailInput.addEventListener('input', () => {
    if (validateEmail(emailInput)) {
      errorWrapper.classList.remove('visible');
      emailInput.removeAttribute('aria-invalid');
      inputlWrapper.classList.remove('input-error');
      errorIcon.style.display = 'none';
      contactBtn.disabled = false;
    } else {
      errorWrapper.classList.add('visible');
      emailInput.setAttribute('aria-invalid', 'true');
      inputlWrapper.classList.add('input-error');
      errorIcon.style.display = 'block';
      contactBtn.disabled = true;
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    if (validateEmail(emailInput)) {
      console.log("Form submitted");

      emailInput.value = '';
      emailError.classList.remove('visible');
      emailInput.removeAttribute('aria-invalid');
      contactBtn.disabled = true;
    }
  })
});
