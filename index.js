const forma = document.getElementsByClassName('form-inline')[0];
if (forma) {
  forma.addEventListener('submit', event => {
    event.preventDefault();
    performSearch();
  });
}

import './src/buttonscroll.js';
import { subscribeToNewsletter } from './src/newsletter.js';
import { handleContactForm } from './src/contact.js';
import { handleLogin } from './src/login.js';
import { createCard, performSearch } from './src/search.js';
import {handleRegisterForm} from './src/register.js';
document.addEventListener('DOMContentLoaded', function () {
  handleContactForm();
  handleLogin();
  handleRegisterForm();
  subscribeToNewsletter();
});
