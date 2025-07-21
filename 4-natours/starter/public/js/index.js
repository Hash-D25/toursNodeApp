import '@babel/polyfill';
import { login, logout } from './login.js';
import { updateData } from './updateSettings';

// DOM elements

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.form--login');
  const logOutBtn = document.querySelector('.nav__el--logout');
  const userDataForm = document.querySelector('.form-user-data');

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

  if (userDataForm) {
    userDataForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      updateData(name, email);
    });
  }
});
