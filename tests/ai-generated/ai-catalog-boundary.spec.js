const { test, expect } = require('@playwright/test');

const LoginPage = require('../e2e/pages/LoginPage');
const HomePage = require('../e2e/pages/HomePage');

test.describe('IA - Valores límite y pruebas negativas del Catálogo', () => {

  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).loginAsValidUser();
    await new HomePage(page).goToCatalog();
  });


  test('CAT-AI-01 - impide registrar un libro con título vacío', async ({ page }) => {
    await page.getByRole('button', { name: 'Añadir libro' }).click();

    const modal = page.locator('#modal');
    const title = modal.getByLabel('Título');

    await modal.getByLabel('Autor').fill('Autor QA');
    await modal.getByLabel('ISBN').fill(`EMPTY-TITLE-${Date.now()}`);
    await modal.getByLabel('Ejemplares').fill('2');

    await modal
      .getByRole('button', { name: 'Añadir al catálogo' })
      .click();

    expect(await title.evaluate(input => input.checkValidity())).toBe(false);

    await expect(modal).toBeVisible();
  });


  test('CAT-AI-02 - impide registrar un libro con autor vacío', async ({ page }) => {
    await page.getByRole('button', { name: 'Añadir libro' }).click();

    const modal = page.locator('#modal');
    const author = modal.getByLabel('Autor');

    await modal.getByLabel('Título').fill(`Libro sin autor ${Date.now()}`);
    await modal.getByLabel('ISBN').fill(`EMPTY-AUTHOR-${Date.now()}`);
    await modal.getByLabel('Ejemplares').fill('2');

    await modal
      .getByRole('button', { name: 'Añadir al catálogo' })
      .click();

    expect(await author.evaluate(input => input.checkValidity())).toBe(false);

    await expect(modal).toBeVisible();
  });


  test('CAT-AI-03 - rechaza un ISBN duplicado', async ({ page, request }) => {
    const isbn = `DUPLICATE-${Date.now()}`;

    const firstResponse = await request.post('/api/libros', {
      data: {
        titulo: 'Libro original IA',
        autor: 'Autor IA',
        isbn,
        ejemplares_totales: 2,
      },
    });

    expect(firstResponse.status()).toBe(201);

    await page.reload();

    await page.getByRole('button', { name: 'Catálogo' }).click();
    await page.getByRole('button', { name: 'Añadir libro' }).click();

    const modal = page.locator('#modal');

    await modal.getByLabel('Título').fill('Libro duplicado IA');
    await modal.getByLabel('Autor').fill('Otro autor');
    await modal.getByLabel('ISBN').fill(isbn);
    await modal.getByLabel('Ejemplares').fill('2');

    await modal
      .getByRole('button', { name: 'Añadir al catálogo' })
      .click();

    await expect(page.locator('#toast'))
      .toContainText('Ya existe un libro con ese ISBN');

    await expect(modal).toBeVisible();
  });


  test('CAT-AI-04 - impide registrar cero ejemplares desde la interfaz', async ({ page }) => {
    await page.getByRole('button', { name: 'Añadir libro' }).click();

    const modal = page.locator('#modal');
    const copies = modal.getByLabel('Ejemplares');

    await modal.getByLabel('Título').fill(`Libro cero ejemplares ${Date.now()}`);
    await modal.getByLabel('Autor').fill('Autor QA');
    await modal.getByLabel('ISBN').fill(`ZERO-${Date.now()}`);
    await copies.fill('0');

    await modal
      .getByRole('button', { name: 'Añadir al catálogo' })
      .click();

    expect(await copies.evaluate(input => input.checkValidity())).toBe(false);

    await expect(modal).toBeVisible();
  });


  test('CAT-AI-05 - admite título y autor con caracteres Unicode', async ({ page }) => {
    const suffix = Date.now();
    const title = `Cien años de soledad 日本語 📚 ${suffix}`;
    const author = 'Gabriel García Márquez — 李小龍';

    await page.getByRole('button', { name: 'Añadir libro' }).click();

    const modal = page.locator('#modal');

    await modal.getByLabel('Título').fill(title);
    await modal.getByLabel('Autor').fill(author);
    await modal.getByLabel('ISBN').fill(`UNICODE-${suffix}`);
    await modal.getByLabel('Ejemplares').fill('1');

    await modal
      .getByRole('button', { name: 'Añadir al catálogo' })
      .click();

    await expect(
      page.locator('.libro-card').filter({ hasText: title })
    ).toBeVisible();

    await expect(
      page.locator('.libro-card').filter({ hasText: author })
    ).toBeVisible();
  });

});