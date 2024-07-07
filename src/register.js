import { hash } from './login.js';

export const handleRegisterForm = () => {
  const fullNameInput = document.getElementById('fullName');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  if (fullNameInput && usernameInput && passwordInput) {
    fullNameInput.addEventListener('input', function () {
      validateInputWithoutNumbers(this, 50, 'fullName-error', 'Full name cannot exceed 50 characters and cannot contain numbers');
    });

    usernameInput.addEventListener('input', function () {
      validateInput(this, 25, 'username-error', 'Username cannot exceed 25 characters');
    });

    passwordInput.addEventListener('input', function () {
      validatePasswordInput(this, 'password-error');
    });
  }

  const registerButton = document.getElementById('btn-register');
  if (registerButton) {
    registerButton.addEventListener('click', function (event) {
      event.preventDefault();

      const fullName = fullNameInput.value;
      const username = usernameInput.value;
      const password = hash(passwordInput.value);


      let isValid = true;

      isValid = validateErrorMessage(fullName, 'fullName-error', 'Please enter your full name') && isValid;
      isValid = validateErrorMessage(username, 'username-error', 'Please enter a username') && isValid;
      isValid = validateErrorMessage(password, 'password-error', 'Please enter a password') && isValid;


      if (isValid) {
        getAllUsers()
          .then(users => {
            const existingUsername = users.some(user => user.username === username);
            if (!existingUsername) {
              const formData = { fullName, username, password };

              saveDataToLocal(formData);
            } else {
              alert('Username already exists. Please choose a different username.');
            }
          })
          .catch(error => {
            console.error('Error getting users:', error);
          });
      }
    });
  }

  function validateInput(input, maxLength, errorId, errorMessage) {
    const inputValue = input.value.trim();
    const errElement = document.getElementById(errorId);
    errElement.textContent = '';

    if (inputValue.length > maxLength) {
      errElement.textContent = errorMessage;
      errElement.style.color = 'red';
    }
  }

  function validateInputWithoutNumbers(input, maxLength, errorId, errorMessage) {
    const inputValue = input.value.trim();
    const errElement = document.getElementById(errorId);
    errElement.textContent = '';

    const hasNonLetters = /[^a-zA-Z\s]/.test(inputValue);

    if (inputValue.length > maxLength || hasNonLetters) {
      errElement.textContent = errorMessage;
      errElement.style.color = 'red';
    }
  }

  function validatePasswordInput(input, errorId) {
    const value = input.value.trim();
    const errElement = document.getElementById(errorId);
    errElement.textContent = '';

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(value)) {
      errElement.textContent = 'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.';
      errElement.style.color = 'red';
    }
  }

  function validateErrorMessage(value, errorId, errorMessage) {
    const errElement = document.getElementById(errorId);
    errElement.textContent = '';

    if (!value) {
      errElement.textContent = errorMessage;
      errElement.style.color = 'red';
      return false;
    }

    return true;
  }


  function getAllUsers() {
    const serverEndpoint = 'https://65ad65a9adbd5aa31be0b5f5.mockapi.io/users';
    return fetch(serverEndpoint)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching users:', error);
        throw error;
      });
  }

  function saveDataToLocal(formData) {
    const serverEndpoint = 'https://65ad65a9adbd5aa31be0b5f5.mockapi.io/users';

    fetch(serverEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
        alert('Registration successful! You will now be redirected to login.');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
};
