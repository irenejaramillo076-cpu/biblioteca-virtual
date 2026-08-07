const crypto = require('node:crypto');
const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');
const HomePage = require('./pages/HomePage');

test.describe('Autenticación', () => {
  test('el bibliotecario puede iniciar sesión con credenciales válidas', async ({ page }) => {
    const login = new LoginPage(page);

    await login.loginAsValidUser();

    await new HomePage(page).expectCatalogLoaded();
  });

  test('el sistema rechaza una contraseña incorrecta', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    await login.login(process.env.QA_ADMIN_EMAIL, crypto.randomBytes(24).toString('hex'));

    await login.expectInvalidCredentials();
  });

  test('el bibliotecario puede cerrar la sesión activa', async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginAsValidUser();

    await login.logout();

    await page.goto('/');
    await expect(page).toHaveURL(/login\.html/);
  });
});
