const form = document.getElementById('login-form');
const errorMessage = document.getElementById('login-error');

if (localStorage.getItem('biblioteca_token')) {
  window.location.replace('/');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorMessage.hidden = true;

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    errorMessage.textContent = 'Completa el correo y la contraseña.';
    errorMessage.hidden = false;
    return;
  }

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'No fue posible iniciar sesión');
    }

    localStorage.setItem('biblioteca_token', data.token);
    window.location.replace('/');
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.hidden = false;
  }
});
