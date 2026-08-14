const { test } = require('@playwright/test');
const percySnapshot = require('@percy/playwright');

const LoginPage = require('../e2e/pages/LoginPage');
const HomePage = require('../e2e/pages/HomePage');

test.describe('Visual Regression Testing - Percy', () => {

  test('VISUAL-01 - Catálogo de Biblioteca Virtual', async ({ page }) => {
    const login = new LoginPage(page);

    await login.loginAsValidUser();

    const home = new HomePage(page);
    await home.expectCatalogLoaded();

    await percySnapshot(
      page,
      'Biblioteca Virtual - Catalogo',
      {
        widths: [1280],
      }
    );
  });

});