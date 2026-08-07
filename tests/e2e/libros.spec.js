const { test } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');
const HomePage = require('./pages/HomePage');
const LibrosPage = require('./pages/LibrosPage');
const { createBook } = require('./support/api-fixtures');

test.describe('Gestión del catálogo', () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).loginAsValidUser();
    await new HomePage(page).goToCatalog();
  });

  test('permite registrar un libro con datos válidos', async ({ page }, testInfo) => {
    const books = new LibrosPage(page);
    const suffix = `${testInfo.workerIndex}-${Date.now()}`;

    await books.createBook({
      title: `Automatización Playwright ${suffix}`,
      author: 'Irene Jaramillo',
      isbn: `E2E-CREATE-${suffix}`,
      copies: 2,
    });
  });

  test('encuentra un libro existente por su título', async ({ page, request }, testInfo) => {
    const title = `Libro buscable ${testInfo.workerIndex}-${Date.now()}`;
    await createBook(request, { titulo: title });
    const books = new LibrosPage(page);
    await page.reload();

    await books.searchBook(title);

    await books.expectBook(title);
  });

  test('muestra un estado vacío al buscar un libro inexistente', async ({ page }) => {
    const books = new LibrosPage(page);

    await books.searchBook(`NO-EXISTE-${Date.now()}`);

    await books.expectNoResults();
  });

  test('permite editar el título de un libro existente', async ({ page, request }, testInfo) => {
    const suffix = `${testInfo.workerIndex}-${Date.now()}`;
    const originalTitle = `Libro original ${suffix}`;
    const updatedTitle = `Libro actualizado ${suffix}`;
    await createBook(request, { titulo: originalTitle, isbn: `E2E-EDIT-${suffix}` });
    const books = new LibrosPage(page);
    await page.reload();

    await books.editBook(originalTitle, updatedTitle);
  });

  test('permite eliminar un libro sin préstamos asociados', async ({ page, request }, testInfo) => {
    const suffix = `${testInfo.workerIndex}-${Date.now()}`;
    const title = `Libro eliminable ${suffix}`;
    await createBook(request, { titulo: title, isbn: `E2E-DELETE-${suffix}` });
    const books = new LibrosPage(page);
    await page.reload();

    await books.deleteBook(title);
  });
});
