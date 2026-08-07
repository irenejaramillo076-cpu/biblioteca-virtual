const { test } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');
const HomePage = require('./pages/HomePage');
const UsuariosPage = require('./pages/UsuariosPage');

test('permite registrar un lector con datos válidos', async ({ page }, testInfo) => {
  const suffix = `${testInfo.workerIndex}-${Date.now()}`;
  await new LoginPage(page).loginAsValidUser();
  await new HomePage(page).goToReaders();

  await new UsuariosPage(page).createReader({
    name: `Lector Automatizado ${suffix}`,
    email: `lector-${suffix}@example.test`,
    phone: '6000-0000',
  });
});
