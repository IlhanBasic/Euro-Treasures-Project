let jsSHA = require("jssha");

export const hash = (text) => {
  const hashObj = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
  hashObj.update(text);
  const hash = hashObj.getHash("HEX");
  return hash;
};

export const handleLogin = () => {
  const passwordInput = document.getElementById('password');
  const errorElem1 = document.getElementById('password-error');
  const usernameInput = document.getElementById('username');
  const errorElem2 = document.getElementById('username-error');
  const btn = document.getElementById('btn');
  const loginLink = document.getElementById('loginLink');

  const ulogovan = JSON.parse(localStorage.getItem('ulogovan'));

  if (ulogovan) {
    if (loginLink) {
      loginLink.innerHTML = `Welcome, ${ulogovan.username}! <a href="#" id="logoutLink">Logout</a>`;
  

      const logoutLink = document.getElementById('logoutLink');
      if (logoutLink) {
        logoutLink.addEventListener('click', function () {
          localStorage.setItem('ulogovan', null);
          window.location.reload();
        });
      }
      loginLink.href = "#";
    }
  } else {
    if (passwordInput && usernameInput && btn) {
      passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        errorElem1.textContent = '';
        const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRequirements.test(password) && password.length > 0) {
          errorElem1.textContent = 'Password must be longer than 6 characters and must contain lowercase letters, at least one uppercase letter, and a number';
          errorElem1.style.color = 'red';
        }
      });

      usernameInput.addEventListener('input', () => {
        const username = usernameInput.value;
        errorElem2.textContent = '';
        if (username.length > 25) {
          errorElem2.textContent = 'Username must not be longer than 25 characters';
          errorElem2.style.color = 'red';
        }
      });

      btn.addEventListener('click', (event) => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!passwordRequirements.test(password) || username.length > 25) {
          event.preventDefault();
          errorElem1.textContent = 'Password must be longer than 6 characters and must contain lowercase letters, at least one uppercase letter, and a number';
          errorElem1.style.color = 'red';
          if (username.length > 25) {
            errorElem2.textContent = 'Username must not be longer than 25 characters';
            errorElem2.style.color = 'red';
          }
        } else {
          checkUser(username, password);
          console.log(hash(password));
        }
      });
    }
  }
};

export const checkUser = (username, password) => {
  fetch('https://65ad65a9adbd5aa31be0b5f5.mockapi.io/users')
    .then(response => response.json())
    .then(data => {
      if (data) {
        const users = data;

        const user = users.find(u => u.username === username);

        if (!user) {
          alert("The user with the entered name does not exist");
          return;
        }

        const hashedPassword = hash(password);

        if (user.password === hashedPassword) {
          const loginLink = document.getElementById('loginLink');
          if (loginLink) {
            loginLink.innerHTML = `Welcome, ${username}! <a href="#" id="logoutLink">Logout</a>`;

            const logoutLink = document.getElementById('logoutLink');
            if (logoutLink) {
              logoutLink.addEventListener('click', function () {
                localStorage.setItem('ulogovan', null);
                window.location.reload();
              });
            }
          }

          alert("Uspešno logovanje");
          localStorage.setItem('ulogovan', JSON.stringify(user));
          window.location.href = "../index.html";
        } else {
          alert("The password is not valid");
        }
      } else {
        alert("There is no data");
      }
    })
    .catch(error => console.log(error));
};
