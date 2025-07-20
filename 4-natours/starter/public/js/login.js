const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      // Redirect to homepage or dashboard
      location.assign('/');
    }
  } catch (err) {
    alert(err.response.data.message || 'Login failed!');
  }
};

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
