const { test, expect } = require('@playwright/test');

test.describe('IA - Seguridad del módulo Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
  });

  test('SEC-AUTH-01 - rechaza credenciales vacías', async ({ page }) => {
    await page
      .getByRole('button', { name: 'Iniciar sesión' })
      .click();

    await expect(page.getByRole('alert'))
      .toContainText('Completa el correo y la contraseña');

    await expect(page).toHaveURL(/login\.html/);
  });


  test('SEC-AUTH-03 - rechaza SQL Injection en correo', async ({ page }) => {
    await page
      .getByLabel('Correo electrónico')
      .fill("' OR '1'='1' --");

    await page
      .getByLabel('Contraseña')
      .fill('cualquierValor');

    await page
      .getByRole('button', { name: 'Iniciar sesión' })
      .click();

    await expect(page.getByRole('alert'))
      .toContainText('Credenciales inválidas');

    await expect(page).toHaveURL(/login\.html/);
  });


  test('SEC-AUTH-04 - rechaza SQL Injection en contraseña', async ({ page }) => {
    await page
      .getByLabel('Correo electrónico')
      .fill('usuario@example.com');

    await page
      .getByLabel('Contraseña')
      .fill("' OR '1'='1' --");

    await page
      .getByRole('button', { name: 'Iniciar sesión' })
      .click();

    await expect(page.getByRole('alert'))
      .toContainText('Credenciales inválidas');

    await expect(page).toHaveURL(/login\.html/);
  });


  test('SEC-AUTH-05 - no ejecuta payload XSS en el login', async ({ page }) => {
    let dialogDetected = false;

    page.on('dialog', async dialog => {
      dialogDetected = true;
      await dialog.dismiss();
    });

    await page
      .getByLabel('Correo electrónico')
      .fill('<script>alert("XSS")</script>');

    await page
      .getByLabel('Contraseña')
      .fill('Prueba123!');

    await page
      .getByRole('button', { name: 'Iniciar sesión' })
      .click();

    await expect(page.getByRole('alert'))
      .toContainText('Credenciales inválidas');

    expect(dialogDetected).toBe(false);

    await expect(page).toHaveURL(/login\.html/);
  });


  test('SEC-AUTH-06 - rechaza credenciales extremadamente largas', async ({ page }) => {
    const longValue = 'A'.repeat(5000);

    await page
      .getByLabel('Correo electrónico')
      .fill(`${longValue}@example.com`);

    await page
      .getByLabel('Contraseña')
      .fill(longValue);

    await page
      .getByRole('button', { name: 'Iniciar sesión' })
      .click();

    await expect(page.getByRole('alert'))
      .toContainText('Credenciales inválidas');

    await expect(page).toHaveURL(/login\.html/);
  });

});