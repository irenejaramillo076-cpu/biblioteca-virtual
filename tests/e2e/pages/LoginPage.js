const { expect } = require('@playwright/test');

function credentials() {
  return {
    email: process.env.QA_ADMIN_EMAIL,
    password: process.env.QA_ADMIN_PASSWORD,
  };
}

class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByLabel('Correo electrónico');
    this.password = page.getByLabel('Contraseña');
    this.submit = page.getByRole('button', { name: 'Iniciar sesión' });
    this.error = page.getByRole('alert');
    this.title = page.getByRole('heading', { name: 'Biblioteca Virtual' });
    this.logoutButton = page.getByRole('button', { name: 'Cerrar sesión' });
  }

  async open() {
    await this.page.goto('/login.html');
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }

  async loginAsValidUser() {
    await this.open();
    const validUser = credentials();
    await this.login(validUser.email, validUser.password);
    await expect(this.page).toHaveURL(/\/$/);
  }

  async expectInvalidCredentials() {
    await expect(this.error).toContainText('Credenciales inválidas');
    await expect(this.page).toHaveURL(/login\.html/);
  }

  async logout() {
    await this.logoutButton.click();
    await expect(this.page).toHaveURL(/login\.html/);
    await expect(this.title).toBeVisible();
  }
}

module.exports = LoginPage;
