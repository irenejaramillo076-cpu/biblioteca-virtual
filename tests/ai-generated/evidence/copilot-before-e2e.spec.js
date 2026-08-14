const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../page-objects/DashboardPage');
const CatalogSearchPage = require('../../page-objects/CatalogSearchPage');

/**
 * tryRequire: intenta cargar una clase desde varias rutas comunes para Page Objects existentes.
 * Si no encuentra, devuelve null (los tests tomarán decisiones y saltarán si hace falta).
 */
function tryRequireAny(paths) {
  for (const p of paths) {
    try {
      // eslint-disable-next-line node/no-missing-require
      const mod = require(p);
      return mod;
    } catch (e) {
      // continuar probando
    }
  }
  return null;
}

const LoginPageClass = tryRequireAny([
  '../../page-objects/LoginPage',
  '../../pages/LoginPage',
  '../../pageObjects/LoginPage',
  '../../pages/auth/LoginPage',
]);

const HomePageClass = tryRequireAny([
  '../../page-objects/HomePage',
  '../../pages/HomePage',
  '../../pageObjects/HomePage',
  '../../pages/home/HomePage',
]);

test.describe('AI-generated E2E tests (Dashboard & Catalog search)', () => {
  test('Dashboard: indicadores visibles y con valor (requiere login)', async ({ page }) => {
    if (!LoginPageClass) test.skip('LoginPage no encontrada en rutas comunes - omitiendo test de dashboard que requiere auth');
    if (!process.env.TEST_USER || !process.env.TEST_PASSWORD) test.skip('No hay credenciales en env (TEST_USER/TEST_PASSWORD) - omitiendo test de dashboard');

    const loginPage = new LoginPageClass(page);
    // Intentamos usar un método común 'login'; si firma diferente, quien mantenga el repo debe adaptarlo.
    if (typeof loginPage.login === 'function') {
      await loginPage.login(process.env.TEST_USER, process.env.TEST_PASSWORD);
    } else {
      // fallback genérico: intentar navegar a /login y usar labels accesibles
      await page.goto('/login');
      const userField = page.getByLabel(/usuario|email|correo|username/i);
      const passField = page.getByLabel(/contraseñ|password|pass/i);
      await userField.fill(process.env.TEST_USER);
      await passField.fill(process.env.TEST_PASSWORD);
      await page.getByRole('button', { name: /entrar|iniciar sesión|login/i }).click();
    }

    const dashboard = new DashboardPage(page);

    // Ir al dashboard usando HomePage si existe o open() de DashboardPage
    if (HomePageClass) {
      try {
        const home = new HomePageClass(page);
        if (typeof home.goToDashboard === 'function') {
          await home.goToDashboard();
        } else if (typeof home.open === 'function') {
          await home.open();
          // intentar localizar un enlace al dashboard
          const dashLink = page.getByRole('link', { name: /dashboard|panel/i });
          if (await dashLink.count() > 0) await dashLink.first().click();
        } else {
          await dashboard.open();
        }
      } catch (e) {
        await dashboard.open();
      }
    } else {
      await dashboard.open();
    }

    // Validaciones: indicadores clave visibles y con número
    // Ajusta los labels según tu app (se usan expresiones tolerantes)
    await dashboard.expectIndicatorVisible(/total de libros|libros en catálogo|total books/i);
    await dashboard.expectIndicatorHasNumber(/total de libros|libros en catálogo|total books/i);
    await dashboard.expectIndicatorVisible(/usuarios activos|usuarios/i);
  });

  test('Catalog: búsqueda por título muestra resultados', async ({ page }) => {
    const catalog = new CatalogSearchPage(page);
    await catalog.open();

    const sampleTitle = process.env.TEST_SEARCH_TITLE || 'Cien años de soledad';
    await catalog.searchByTitle(sampleTitle);
    await catalog.expectResultsCountGreaterThan(0);
    await catalog.expectResultsContain(sampleTitle);
  });

  test('Catalog: búsqueda por autor muestra resultados', async ({ page }) => {
    const catalog = new CatalogSearchPage(page);
    await catalog.open();

    const sampleAuthor = process.env.TEST_SEARCH_AUTHOR || 'Gabriel García Márquez';
    await catalog.searchByAuthor(sampleAuthor);
    await catalog.expectResultsCountGreaterThan(0);
    await catalog.expectResultsContain(sampleAuthor);
  });

  test('Catalog: búsqueda por ISBN devuelve estado vacío cuando no existe', async ({ page }) => {
    const catalog = new CatalogSearchPage(page);
    await catalog.open();

    const fakeIsbn = '0000000000000'; // improbable ISBN real — si tu catálogo usa otros formatos, ajusta vía env
    await catalog.searchByISBN(fakeIsbn);
    await catalog.expectNoResults();
  });
});