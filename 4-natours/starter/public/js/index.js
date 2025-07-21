import '@babel/polyfill';
import { login, logout } from './login.js';

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.form');
  const logOutBtn = document.querySelector('.nav__el--logout');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      login(email, password);
    });
  }

  if (logOutBtn) {
    logOutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      logout();
    });
  }
});
