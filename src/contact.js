export const handleContactForm = () => {
  const firstNameInput = document.getElementById('ime');
  const lastNameInput = document.getElementById('prezime');
  const emailInput = document.getElementById('email1');
  const messageInput = document.getElementById('message');

  if (firstNameInput && lastNameInput && emailInput && messageInput) {
    firstNameInput.addEventListener('input', function () {
      validateName(this, 25, 'fname-error', 'First name cannot exceed 25 characters and must contain only letters');
    });

    lastNameInput.addEventListener('input', function () {
      validateName(this, 40, 'lname-error', 'Last name cannot exceed 40 characters and must contain only letters');
    });

    emailInput.addEventListener('input', function () {
      const isValidEmailValue = isValidEmail(this.value.trim());
      validateErrorMessage(isValidEmailValue, 'email-error', 'Please enter a valid email (example@domain.com)');
    });

    messageInput.addEventListener('input', function () {
      validateMessageWordCount(this, 'message-error', 'Message must contain at least 2 words');
    });
  }

  const submitButton = document.getElementById('submitForm');
  if (submitButton) {
    submitButton.addEventListener('click', function (event) {
      event.preventDefault();

      // Get form input values
      const firstName = firstNameInput.value.trim();
      const lastName = lastNameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.innerHTML.trim();

      let isValid = true;

      isValid = validateErrorMessage(firstName, 'fname-error', 'Please enter your first name') && isValid;
      isValid = validateErrorMessage(lastName, 'lname-error', 'Please enter your last name') && isValid;
      isValid = validateErrorMessage(isValidEmail(email), 'email-error', 'Please enter a valid email (example@domain.com)') && isValid;
      isValid = validateErrorMessage(message, 'message-error', 'Please enter your message') && isValid;

      if (isValid) {
        const formData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          message: message
        };
        sendDataToServer(formData);
        alert('Your message is successfully sent');
      }
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateName(input, maxLength, errorId, errorMessage) {
    const inputValue = input.value.trim();
    const errElement = document.getElementById(errorId);
    errElement.textContent = '';

    const validCharactersRegex = /^[A-Za-z]+$/;

    if (inputValue.length > maxLength || !validCharactersRegex.test(inputValue)) {
      errElement.textContent = errorMessage;
      errElement.style.color = 'red';
    }
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

  function validateMessageWordCount(input, errorId, errorMessage) {
    const inputValue = input.innerHTML.trim();
    const errElement = document.getElementById(errorId);
    errElement.textContent = '';

    const words = inputValue.split(/\s+/);
    const wordCount = words.filter(word => word.length > 0).length;

    if (wordCount < 2) {
      errElement.textContent = errorMessage;
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

  function sendDataToServer(formData) {
    const url = 'https://65ad65a9adbd5aa31be0b5f5.mockapi.io/contact';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data sent successfully:', data);
        window.location.reload()
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  }
};
