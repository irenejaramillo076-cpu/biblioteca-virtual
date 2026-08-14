const { test } = require('@playwright/test');

const LoginPage = require('../e2e/pages/LoginPage');
const DashboardPage = require('../../page-objects/DashboardPage');
const CatalogSearchPage = require('../../page-objects/CatalogSearchPage');

const {
  createBook,
} = require('../e2e/support/api-fixtures');

test.describe('Copilot revisado - Dashboard y búsqueda del Catálogo', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginAsValidUser();
  });


  test('COPILOT-01 - Panel muestra las estadísticas generales', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await dashboard.open();

    await dashboard.expectLoaded();
    await dashboard.expectStatisticsLoaded();
  });


  test('COPILOT-02 - búsqueda por título muestra el libro esperado', async ({
    page,
    request,
  }) => {
    const suffix = Date.now();

    const book = await createBook(request, {
      titulo: `Libro búsqueda Copilot ${suffix}`,
      autor: 'Autor Copilot',
      isbn: `COP-TITLE-${suffix}`,
    });

    await page.reload();

    const catalog = new CatalogSearchPage(page);

    await catalog.open();
    await catalog.searchByTitle(book.titulo);

    await catalog.expectResult(book.titulo);
  });


  test('COPILOT-03 - búsqueda por autor muestra resultados relacionados', async ({
    page,
    request,
  }) => {
    const suffix = Date.now();

    const author = `Autor Especial Copilot ${suffix}`;

    await createBook(request, {
      titulo: `Libro autor Copilot ${suffix}`,
      autor: author,
      isbn: `COP-AUTHOR-${suffix}`,
    });

    await page.reload();

    const catalog = new CatalogSearchPage(page);

    await catalog.open();
    await catalog.searchByAuthor(author);

    await catalog.expectResultsContain(author);
  });


  test('COPILOT-04 - búsqueda por ISBN inexistente muestra estado vacío', async ({
    page,
  }) => {
    const catalog = new CatalogSearchPage(page);

    await catalog.open();

    await catalog.searchByISBN(
      `ISBN-NO-EXISTE-${Date.now()}`
    );

    await catalog.expectEmptyState();
  });

});