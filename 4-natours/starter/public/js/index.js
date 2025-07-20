import { login } from './login.js';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      login(email, password);
    });
  }
});
